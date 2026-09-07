from rest_framework import viewsets, status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.db.models import Count, Q
from django.utils import timezone

from .models import Inquiry, Service, PortfolioItem, TeamMember, SiteSetting, AuditLog, NewsletterSubscriber
from .serializers import (
    InquirySerializer, 
    ServiceSerializer, 
    PortfolioItemSerializer, 
    TeamMemberSerializer, 
    SiteSettingSerializer, 
    AuditLogSerializer,
    NewsletterSubscriberSerializer
)
from .permissions import IsAdminOrReadOnly, InquiryPermission
from .emails import send_inquiry_emails_async, send_newsletter_welcome_async


class InquiryViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing client consultation requests and contact leads.
    """
    queryset = Inquiry.objects.all()
    serializer_class = InquirySerializer
    permission_classes = [InquiryPermission]

    def perform_create(self, serializer):
        inquiry = serializer.save()
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


class ServiceViewSet(viewsets.ModelViewSet):
    """
    API endpoint for BrixelLabs agency service capabilities.
    """
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [IsAdminOrReadOnly]


class PortfolioItemViewSet(viewsets.ModelViewSet):
    """
    API endpoint for case studies and engineering projects.
    """
    queryset = PortfolioItem.objects.all()
    serializer_class = PortfolioItemSerializer
    permission_classes = [IsAdminOrReadOnly]


class TeamMemberViewSet(viewsets.ModelViewSet):
    """
    API endpoint for leadership and engineering team members.
    """
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer
    permission_classes = [IsAdminOrReadOnly]


class SiteSettingViewSet(viewsets.ModelViewSet):
    """
    API endpoint for company metadata and configurations.
    """
    queryset = SiteSetting.objects.all()
    serializer_class = SiteSettingSerializer
    permission_classes = [IsAdminOrReadOnly]


class AuditLogViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for audit history logs.
    """
    queryset = AuditLog.objects.all()
    serializer_class = AuditLogSerializer
    permission_classes = [permissions.IsAuthenticated]


class NewsletterSubscriberViewSet(viewsets.ModelViewSet):
    """
    API endpoint for Newsletter subscriptions.
    """
    queryset = NewsletterSubscriber.objects.all()
    serializer_class = NewsletterSubscriberSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

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
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
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

        return Response({
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
        })


class CustomAuthLoginView(APIView):
    """
    Authenticates admin user credentials and returns JWT Bearer tokens + profile payload.
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get('username') or request.data.get('email')
        password = request.data.get('password')

        if not username or not password:
            return Response(
                {'detail': 'Username/email and password are required.'}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        user = authenticate(request, username=username, password=password)
        
        # If username was passed as email, try looking up user by email
        if user is None and '@' in username:
            from django.contrib.auth.models import User
            try:
                user_obj = User.objects.get(email=username)
                user = authenticate(request, username=user_obj.username, password=password)
            except User.DoesNotExist:
                user = None

        if user is not None and user.is_active:
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
