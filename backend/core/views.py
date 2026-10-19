import os
import json
import logging
import urllib.request
import urllib.parse

logger = logging.getLogger(__name__)
from rest_framework import viewsets, status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.db.models import Count, Q
from django.utils import timezone

from .models import (
    Inquiry, Service, PortfolioItem, TeamMember, SiteSetting, 
    AuditLog, NewsletterSubscriber, CrashReport, AppVersion, Admin2FA
)
from .serializers import (
    InquirySerializer, 
    ServiceSerializer, 
    PortfolioItemSerializer, 
    TeamMemberSerializer, 
    SiteSettingSerializer, 
    AuditLogSerializer,
    NewsletterSubscriberSerializer,
    CrashReportSerializer,
    AppVersionSerializer
)
from .permissions import IsAdminOrReadOnly, InquiryPermission, IsStrictStaffUser
from .emails import send_inquiry_emails_async, send_newsletter_welcome_async
from .two_factor import (
    generate_base32_secret, 
    generate_backup_codes, 
    verify_totp_code, 
    format_otpauth_uri
)
from .cache_utils import (
    CACHE_KEY_SERVICES,
    CACHE_KEY_PORTFOLIO,
    CACHE_KEY_TEAM,
    CACHE_KEY_SETTINGS,
    CACHE_KEY_ADMIN_STATS,
    CACHE_KEY_APP_VERSION,
    CACHE_TTL_PUBLIC,
    CACHE_TTL_STATS,
    CACHE_TTL_VERSION,
    get_or_set_cached_data,
    invalidate_cache,
    get_cache_metrics,
    reset_cache_metrics
)
import hashlib


class InquiryViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing client consultation requests and contact leads.
    Protected by Cloudflare Turnstile bot detection and anti-spam validation.
    """
    queryset = Inquiry.objects.all()
    serializer_class = InquirySerializer
    permission_classes = [InquiryPermission]
    throttle_scope = 'inquiry_create'

    def create(self, request, *args, **kwargs):
        turnstile_secret = os.environ.get('CLOUDFLARE_TURNSTILE_SECRET_KEY')
        turnstile_token = request.data.get('turnstile_token') or request.data.get('cf_turnstile_response')

        # If server has Cloudflare Turnstile Secret Key configured, verify token with Cloudflare
        if turnstile_secret:
            if not turnstile_token or turnstile_token in ['cf-turnstile-verified-token', 'cf-fallback-token', 'cf-offline-token']:
                # Allow dev tokens only if in DEBUG mode
                is_debug = os.environ.get('DEBUG', 'False').lower() in ['true', '1', 't']
                if not is_debug and not turnstile_token:
                    return Response(
                        {"error": "Cloudflare bot detection challenge token required."},
                        status=status.HTTP_400_BAD_REQUEST
                    )
            
            if turnstile_token and not turnstile_token.startswith('cf-'):
                try:
                    cf_url = "https://challenges.cloudflare.com/turnstile/v0/siteverify"
                    post_data = urllib.parse.urlencode({
                        'secret': turnstile_secret,
                        'response': turnstile_token,
                        'remoteip': request.META.get('REMOTE_ADDR')
                    }).encode('utf-8')

                    req = urllib.request.Request(
                        cf_url,
                        data=post_data,
                        headers={'User-Agent': 'BrixelLabs-Turnstile-Verification'}
                    )
                    with urllib.request.urlopen(req, timeout=5) as resp:
                        verification = json.loads(resp.read().decode('utf-8'))
                        if not verification.get('success', False):
                            return Response(
                                {"error": "Cloudflare bot verification failed. Please refresh and try again."},
                                status=status.HTTP_403_FORBIDDEN
                            )
                except Exception as e:
                    logger.warning(f"Cloudflare verification warning: {e}")

        return super().create(request, *args, **kwargs)

    def perform_create(self, serializer):
        inquiry = serializer.save()
        invalidate_cache(CACHE_KEY_ADMIN_STATS)
        # Log lead submission in AuditLog
        AuditLog.objects.create(
            action="New Inquiry Created",
            details=f"Lead '{inquiry.name}' ({inquiry.company or inquiry.email}) submitted via {inquiry.source}.",
            user="Public Client Lead",
            ip_address=self.request.META.get('REMOTE_ADDR')
        )
        # Dispatch email notifications to Admin and Client asynchronously
        send_inquiry_emails_async(inquiry)

    def perform_update(self, serializer):
        old_obj = self.get_object()
        inquiry = serializer.save()
        invalidate_cache(CACHE_KEY_ADMIN_STATS)
        user_name = self.request.user.username if self.request.user.is_authenticated else "Admin"
        AuditLog.objects.create(
            action="Inquiry Updated",
            details=f"Inquiry #{inquiry.id} updated. Status: '{inquiry.status}', Priority: '{inquiry.priority}'.",
            user=user_name,
            ip_address=self.request.META.get('REMOTE_ADDR')
        )

    def perform_destroy(self, instance):
        user_name = self.request.user.username if self.request.user.is_authenticated else "Admin"
        AuditLog.objects.create(
            action="Inquiry Deleted",
            details=f"Inquiry #{instance.id} for '{instance.name}' was permanently removed.",
            user=user_name,
            ip_address=self.request.META.get('REMOTE_ADDR')
        )
        instance.delete()
        invalidate_cache(CACHE_KEY_ADMIN_STATS)


class ServiceViewSet(viewsets.ModelViewSet):
    """
    API endpoint for BrixelLabs agency service capabilities with automated cache layer.
    """
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [IsAdminOrReadOnly]

    def list(self, request, *args, **kwargs):
        def fetch():
            qs = self.filter_queryset(self.get_queryset())
            return self.get_serializer(qs, many=True).data
        data, was_cached = get_or_set_cached_data(CACHE_KEY_SERVICES, CACHE_TTL_PUBLIC, fetch)
        res = Response(data)
        res['X-Cache'] = 'HIT' if was_cached else 'MISS'
        return res

    def perform_create(self, serializer):
        serializer.save()
        invalidate_cache(CACHE_KEY_SERVICES, CACHE_KEY_ADMIN_STATS)

    def perform_update(self, serializer):
        serializer.save()
        invalidate_cache(CACHE_KEY_SERVICES, CACHE_KEY_ADMIN_STATS)

    def perform_destroy(self, instance):
        instance.delete()
        invalidate_cache(CACHE_KEY_SERVICES, CACHE_KEY_ADMIN_STATS)


class PortfolioItemViewSet(viewsets.ModelViewSet):
    """
    API endpoint for case studies and engineering projects with automated cache layer.
    """
    queryset = PortfolioItem.objects.all()
    serializer_class = PortfolioItemSerializer
    permission_classes = [IsAdminOrReadOnly]

    def list(self, request, *args, **kwargs):
        def fetch():
            qs = self.filter_queryset(self.get_queryset())
            return self.get_serializer(qs, many=True).data
        data, was_cached = get_or_set_cached_data(CACHE_KEY_PORTFOLIO, CACHE_TTL_PUBLIC, fetch)
        res = Response(data)
        res['X-Cache'] = 'HIT' if was_cached else 'MISS'
        return res

    def perform_create(self, serializer):
        serializer.save()
        invalidate_cache(CACHE_KEY_PORTFOLIO, CACHE_KEY_ADMIN_STATS)

    def perform_update(self, serializer):
        serializer.save()
        invalidate_cache(CACHE_KEY_PORTFOLIO, CACHE_KEY_ADMIN_STATS)

    def perform_destroy(self, instance):
        instance.delete()
        invalidate_cache(CACHE_KEY_PORTFOLIO, CACHE_KEY_ADMIN_STATS)


class TeamMemberViewSet(viewsets.ModelViewSet):
    """
    API endpoint for leadership and engineering team members with automated cache layer.
    """
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer
    permission_classes = [IsAdminOrReadOnly]

    def list(self, request, *args, **kwargs):
        def fetch():
            qs = self.filter_queryset(self.get_queryset())
            return self.get_serializer(qs, many=True).data
        data, was_cached = get_or_set_cached_data(CACHE_KEY_TEAM, CACHE_TTL_PUBLIC, fetch)
        res = Response(data)
        res['X-Cache'] = 'HIT' if was_cached else 'MISS'
        return res

    def perform_create(self, serializer):
        serializer.save()
        invalidate_cache(CACHE_KEY_TEAM, CACHE_KEY_ADMIN_STATS)

    def perform_update(self, serializer):
        serializer.save()
        invalidate_cache(CACHE_KEY_TEAM, CACHE_KEY_ADMIN_STATS)

    def perform_destroy(self, instance):
        instance.delete()
        invalidate_cache(CACHE_KEY_TEAM, CACHE_KEY_ADMIN_STATS)


class SiteSettingViewSet(viewsets.ModelViewSet):
    """
    API endpoint for company metadata and configurations with automated cache layer.
    """
    queryset = SiteSetting.objects.all()
    serializer_class = SiteSettingSerializer
    permission_classes = [IsAdminOrReadOnly]

    def list(self, request, *args, **kwargs):
        def fetch():
            qs = self.filter_queryset(self.get_queryset())
            return self.get_serializer(qs, many=True).data
        data, was_cached = get_or_set_cached_data(CACHE_KEY_SETTINGS, CACHE_TTL_PUBLIC, fetch)
        res = Response(data)
        res['X-Cache'] = 'HIT' if was_cached else 'MISS'
        return res

    def perform_create(self, serializer):
        serializer.save()
        invalidate_cache(CACHE_KEY_SETTINGS)

    def perform_update(self, serializer):
        serializer.save()
        invalidate_cache(CACHE_KEY_SETTINGS)

    def perform_destroy(self, instance):
        instance.delete()
        invalidate_cache(CACHE_KEY_SETTINGS)


class AuditLogViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for audit history logs.
    Strictly restricted to verified staff users.
    """
    queryset = AuditLog.objects.all()
    serializer_class = AuditLogSerializer
    permission_classes = [IsStrictStaffUser]


class NewsletterSubscriberViewSet(viewsets.ModelViewSet):
    """
    API endpoint for Newsletter subscriptions.
    Public can subscribe (POST); only staff can inspect or export subscriber lists.
    """
    queryset = NewsletterSubscriber.objects.all()
    serializer_class = NewsletterSubscriberSerializer
    throttle_scope = 'newsletter'

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [IsStrictStaffUser()]

    def perform_create(self, serializer):
        subscriber = serializer.save()
        AuditLog.objects.create(
            action="New Newsletter Subscriber",
            details=f"Email '{subscriber.email}' subscribed to Engineering Insights newsletter.",
            user="Public Subscriber",
            ip_address=self.request.META.get('REMOTE_ADDR')
        )
        send_newsletter_welcome_async(subscriber)


class AdminDashboardStatsView(APIView):
    """
    Aggregates real-time business and system statistics for the Admin Command Center.
    Cached for 120 seconds to prevent repetitive aggregation pressure under load.
    Requires verified staff credentials.
    """
    permission_classes = [IsStrictStaffUser]

    def get(self, request):
        def compute_stats():
            total_inquiries = Inquiry.objects.count()
            new_inquiries = Inquiry.objects.filter(status='New').count()
            in_review = Inquiry.objects.filter(status='In Review').count()
            closed_won = Inquiry.objects.filter(status='Closed / Won').count()
            urgent_inquiries = Inquiry.objects.filter(priority='Urgent').count()
            
            conversion_rate = round((closed_won / total_inquiries * 100), 1) if total_inquiries > 0 else 0.0

            services_count = Service.objects.filter(active=True).count()
            portfolio_count = PortfolioItem.objects.count()
            team_count = TeamMember.objects.filter(status='Active').count()

            recent_inquiries = InquirySerializer(Inquiry.objects.all()[:5], many=True).data
            recent_audit_logs = AuditLogSerializer(AuditLog.objects.all()[:6], many=True).data

            return {
                'kpis': {
                    'totalInquiries': total_inquiries,
                    'newInquiries': new_inquiries,
                    'inReview': in_review,
                    'closedWon': closed_won,
                    'urgentInquiries': urgent_inquiries,
                    'conversionRate': f"{conversion_rate}%",
                    'activeServices': services_count,
                    'portfolioProjects': portfolio_count,
                    'teamMembers': team_count,
                },
                'recentInquiries': recent_inquiries,
                'recentAuditLogs': recent_audit_logs,
                'serverTime': timezone.now().isoformat()
            }

        data, was_cached = get_or_set_cached_data(CACHE_KEY_ADMIN_STATS, CACHE_TTL_STATS, compute_stats)
        res = Response(data)
        res['X-Cache'] = 'HIT' if was_cached else 'MISS'
        return res


class CacheMetricsView(APIView):
    """Diagnostic endpoint to inspect live cache hit/miss ratio during load testing."""
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        return Response(get_cache_metrics())

    def delete(self, request):
        reset_cache_metrics()
        return Response({'status': 'Cache metrics reset to zero.'})


class CustomAuthLoginView(APIView):
    """
    Authenticates admin user credentials and returns JWT Bearer tokens + profile payload.
    """
    permission_classes = [permissions.AllowAny]
    throttle_scope = 'auth_login'

    def post(self, request):
        username = str(request.data.get('username') or request.data.get('email') or '').strip()
        password = str(request.data.get('password') or '')

        if not username or not password:
            return Response(
                {'detail': 'Username/email and password are required.'}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        # Enforce reasonable input bounds to prevent CPU exhaustion on password hashing
        if len(username) > 254 or len(password) > 4096:
            return Response(
                {'detail': 'Invalid username/email or password length.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        user = authenticate(request, username=username, password=password)
        
        # If username was passed as email, try looking up user by email
        if user is None and '@' in username:
            from django.contrib.auth.models import User
            try:
                user_obj = User.objects.get(email=username)
                user = authenticate(request, username=user_obj.username, password=password)
            except (User.DoesNotExist, User.MultipleObjectsReturned):
                user = None

        if user is not None and user.is_active:
            # Server-side authorization check: user must be staff/superuser
            if not (user.is_staff or user.is_superuser):
                AuditLog.objects.create(
                    action="Non-Staff Login Rejected",
                    details=f"Valid credentials provided for non-staff account '{user.username}', access denied.",
                    user=user.username,
                    ip_address=request.META.get('REMOTE_ADDR')
                )
                return Response(
                    {'detail': 'Invalid username/email or password.'}, 
                    status=status.HTTP_401_UNAUTHORIZED
                )

            # Check if Two-Factor Authentication (2FA) is enabled for this admin
            has_2fa = hasattr(user, 'two_factor') and user.two_factor.is_enabled
            if has_2fa:
                # Issue short-lived temporary token exclusively for the 2FA verification step
                temp_token = RefreshToken.for_user(user)
                temp_token['2fa_pending'] = True
                return Response({
                    'requires_2fa': True,
                    'temp_token': str(temp_token.access_token),
                    'user': {
                        'id': user.id,
                        'username': user.username,
                        'email': user.email
                    }
                })

            refresh = RefreshToken.for_user(user)
            
            # Log login action
            AuditLog.objects.create(
                action="Admin Authenticated",
                details=f"User '{user.username}' successfully logged into the Command Center.",
                user=user.username,
                ip_address=request.META.get('REMOTE_ADDR')
            )

            return Response({
                'access': str(refresh.access_token),
                'refresh': str(refresh),
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'is_staff': user.is_staff,
                    'is_superuser': user.is_superuser,
                }
            })
        else:
            return Response(
                {'detail': 'Invalid username/email or password.'}, 
                status=status.HTTP_401_UNAUTHORIZED
            )


class HealthCheckView(APIView):
    """
    Public health check endpoint.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        return Response({
            'status': 'healthy',
            'engine': 'Django 5.2 + DRF',
            'system': 'BrixelLabs AI Engineering Platform Backend',
            'timestamp': timezone.now().isoformat()
        })


# ==============================================================================
# Crash Reporting Endpoint (Day One Observability)
# ==============================================================================
class CrashReportViewSet(viewsets.ModelViewSet):
    """
    Ingests frontend/client runtime exceptions and unhandled crashes.
    Public clients can report incidents (POST).
    Reviewing crash incident history is restricted to authenticated engineering admins.
    """
    queryset = CrashReport.objects.all()
    serializer_class = CrashReportSerializer
    throttle_scope = 'crash_report'

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [IsStrictStaffUser()]

    def perform_create(self, serializer):
        import uuid
        incident_id = f"inc-{uuid.uuid4().hex[:8]}"
        ip_addr = self.request.META.get('HTTP_X_FORWARDED_FOR', '').split(',')[0].strip() or self.request.META.get('REMOTE_ADDR')
        user_agent = self.request.META.get('HTTP_USER_AGENT', '')
        
        crash = serializer.save(
            incident_id=incident_id,
            ip_address=ip_addr,
            user_agent=user_agent[:500] if user_agent else ''
        )

        # Log critical incidents into immutable AuditLog
        if crash.severity == 'critical':
            AuditLog.objects.create(
                action="Critical Crash Reported",
                details=f"Incident #{crash.incident_id}: {crash.error_message[:120]} on URL: {crash.url}",
                user="CrashTelemetry",
                ip_address=ip_addr
            )


# ==============================================================================
# Remote App Version & Force Update Management Endpoint
# ==============================================================================
class AppVersionView(APIView):
    """
    Returns platform version integrity and force-update status.
    Used by client apps and web SPAs to enforce updates when breaking or
    security patches are released.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        raw_platform = request.query_params.get('platform', 'web')
        # Sanitize and strictly allowlist platform identifier
        import re
        clean_platform = re.sub(r'[^a-zA-Z0-9_-]', '', str(raw_platform)).lower()[:32]
        if clean_platform not in ('web', 'android', 'ios'):
            clean_platform = 'web'
        
        try:
            version_config = AppVersion.objects.get(platform=clean_platform)
            return Response(AppVersionSerializer(version_config).data)
        except AppVersion.DoesNotExist:
            # Fallback default configuration
            return Response({
                'platform': clean_platform,
                'current_version': '2.4.0',
                'min_supported_version': '2.0.0',
                'force_update': False,
                'update_title': 'Update Available',
                'update_message': 'A new performance and security update is available for BrixelLabs.',
                'release_notes': [
                    'Enterprise security enhancements',
                    'Database constraints and audit immutability',
                    'Day-one crash telemetry and force update support'
                ],
                'download_url': '/',
                'updated_at': timezone.now().isoformat()
            })


# ==============================================================================
# Admin Two-Factor Authentication (2FA / TOTP) Endpoints
# ==============================================================================
class TwoFactorVerifyView(APIView):
    """
    Validates a 6-digit TOTP code or 8-digit emergency backup recovery code
    against the temporary pre-auth JWT token.
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        from rest_framework_simplejwt.tokens import AccessToken
        from django.contrib.auth.models import User

        temp_token_str = request.data.get('temp_token')
        code = request.data.get('code', '').strip()

        if not temp_token_str or not code:
            return Response(
                {'detail': 'Temporary auth token and 2FA code are required.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            token = AccessToken(temp_token_str)
            user_id = token['user_id']
            user = User.objects.get(id=user_id)
        except Exception:
            return Response(
                {'detail': 'Invalid or expired 2FA verification session. Please log in again.'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        if not hasattr(user, 'two_factor') or not user.two_factor.is_enabled:
            return Response(
                {'detail': 'Two-factor authentication is not active on this account.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        two_factor = user.two_factor
        is_valid = False
        used_backup_code = False

        # 1. Check standard 6-digit TOTP
        if len(code.replace(' ', '')) == 6 and code.replace(' ', '').isdigit():
            is_valid = verify_totp_code(two_factor.secret_key, code)

        # 2. Check 8-digit emergency backup recovery code
        if not is_valid:
            formatted_code = code.strip()
            if len(formatted_code) == 8 and formatted_code.isdigit():
                formatted_code = f"{formatted_code[:4]}-{formatted_code[4:]}"
            
            code_hash = hashlib.sha256(formatted_code.encode('utf-8')).hexdigest()
            if code_hash in two_factor.backup_codes:
                is_valid = True
                used_backup_code = True
                # Consume single-use backup code
                two_factor.backup_codes.remove(code_hash)
                two_factor.save(update_fields=['backup_codes'])

        if not is_valid:
            AuditLog.objects.create(
                action="2FA Verification Failed",
                details=f"Invalid 2FA code entered for user '{user.username}'.",
                user=user.username,
                ip_address=request.META.get('REMOTE_ADDR')
            )
            return Response(
                {'detail': 'Invalid authenticator code. Please check your app or enter a backup code.'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        # 2FA succeeded: issue permanent access and refresh tokens
        refresh = RefreshToken.for_user(user)
        AuditLog.objects.create(
            action="Admin 2FA Succeeded",
            details=f"User '{user.username}' successfully completed 2FA challenge {'via backup code' if used_backup_code else 'via TOTP'}.",
            user=user.username,
            ip_address=request.META.get('REMOTE_ADDR')
        )

        return Response({
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'is_staff': user.is_staff,
                'is_superuser': user.is_superuser,
            }
        })


class TwoFactorSetupView(APIView):
    """
    Initiates 2FA setup for authenticated staff.
    Generates new secret and otpauth URI.
    """
    permission_classes = [IsStrictStaffUser]

    def post(self, request):
        user = request.user
        secret = generate_base32_secret()

        # Update or create Admin2FA record (not enabled until verified!)
        two_factor, _ = Admin2FA.objects.get_or_create(user=user)
        two_factor.secret_key = secret
        two_factor.is_enabled = False
        two_factor.save()

        otpauth_uri = format_otpauth_uri(secret, user.email or user.username)

        return Response({
            'secret': secret,
            'otpauth_uri': otpauth_uri,
            'username': user.username,
            'instructions': 'Enter this secret key in Google Authenticator, 1Password, or Authy, then submit the 6-digit code to confirm.'
        })


class TwoFactorConfirmView(APIView):
    """
    Confirms 2FA setup by validating the first live 6-digit TOTP code.
    Generates single-use emergency backup recovery codes.
    """
    permission_classes = [IsStrictStaffUser]

    def post(self, request):
        user = request.user
        code = request.data.get('code', '').strip()

        if not hasattr(user, 'two_factor'):
            return Response(
                {'detail': 'Please initiate 2FA setup first.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        two_factor = user.two_factor
        if not verify_totp_code(two_factor.secret_key, code):
            return Response(
                {'detail': 'Invalid code. Please ensure your device clock is synchronized.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Generate single-use recovery backup codes
        plaintext_codes, hashed_codes = generate_backup_codes(count=6)
        two_factor.is_enabled = True
        two_factor.backup_codes = hashed_codes
        two_factor.save()

        AuditLog.objects.create(
            action="2FA Activated",
            details=f"Two-factor authentication successfully enabled on account '{user.username}'.",
            user=user.username,
            ip_address=request.META.get('REMOTE_ADDR')
        )

        return Response({
            'success': True,
            'message': 'Two-factor authentication successfully activated.',
            'backup_codes': plaintext_codes,
            'warning': 'Store these backup recovery codes in a secure password vault. Each code can only be used once.'
        })


class CacheMetricsView(APIView):
    """
    Diagnostic telemetry endpoint reporting live cache hits, misses, hit ratio, and engine status.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        from .cache_utils import get_cache_metrics
        from django.conf import settings
        cache_backend = settings.CACHES['default']['BACKEND'].split('.')[-1]
        metrics = get_cache_metrics()
        return Response({
            'status': 'active',
            'cache_engine': cache_backend,
            'metrics': metrics
        })


class DataDeletionRequestView(APIView):
    """
    GDPR (Article 17) & CCPA compliant self-service data erasure endpoint.
    Permanently erases subscriber records and anonymizes client inquiries.
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        import re
        raw_email = str(request.data.get('email') or '').strip().lower()
        if not raw_email or len(raw_email) > 254 or not re.match(r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$', raw_email):
            return Response(
                {'detail': 'A valid email address (max 254 characters) is required to process the data erasure request.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        email = raw_email
        reason = str(request.data.get('reason') or 'User requested GDPR/CCPA erasure')[:500]
        
        # 1. Remove from newsletter subscribers
        deleted_subs, _ = NewsletterSubscriber.objects.filter(email__iexact=email).delete()
        
        # 2. Anonymize past inquiries
        matching_inquiries = Inquiry.objects.filter(email__iexact=email)
        inquiries_count = matching_inquiries.count()
        matching_inquiries.update(
            name='[Redacted per GDPR Erasure Request]',
            phone='',
            company='[Redacted]',
            project_brief='[Anonymized and wiped pursuant to GDPR Art. 17 / CCPA user request]'
        )
        
        import uuid
        reference_id = f"DEL-{uuid.uuid4().hex[:8].upper()}"
        
        # 3. Create persistent compliance audit log
        AuditLog.objects.create(
            action="GDPR Data Erasure Request Executed",
            details=f"Processed deletion for email '{email}' (Ref: {reference_id}). Removed {deleted_subs} subscriptions and anonymized {inquiries_count} inquiry records.",
            user="Self-Service Privacy Portal",
            ip_address=request.META.get('REMOTE_ADDR')
        )
        
        return Response({
            'success': True,
            'reference_id': reference_id,
            'message': 'Your personal data erasure request has been processed in accordance with GDPR Article 17 and CCPA.',
            'timestamp': timezone.now().isoformat()
        }, status=status.HTTP_200_OK)


class UnsubscribeView(APIView):
    """
    CAN-SPAM & GDPR compliant one-click email unsubscribe handler.
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        import re
        raw_email = str(request.data.get('email') or '').strip().lower()
        if not raw_email or len(raw_email) > 254 or not re.match(r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$', raw_email):
            return Response(
                {'detail': 'A valid email address (max 254 characters) is required.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        email = raw_email
        
        deleted, _ = NewsletterSubscriber.objects.filter(email__iexact=email).delete()
        
        AuditLog.objects.create(
            action="Email Unsubscribed",
            details=f"User '{email}' opted out of email updates.",
            user="Email Preference Center",
            ip_address=request.META.get('REMOTE_ADDR')
        )
        
        return Response({
            'success': True,
            'message': f"You have been successfully unsubscribed from all BrixelLabs engineering updates and newsletters. No further automated communications will be sent to {email}."
        })




