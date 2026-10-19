from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    InquiryViewSet, 
    ServiceViewSet, 
    PortfolioItemViewSet, 
    TeamMemberViewSet, 
    SiteSettingViewSet, 
    AuditLogViewSet,
    NewsletterSubscriberViewSet,
    CrashReportViewSet,
    AdminDashboardStatsView,
    CustomAuthLoginView,
    TwoFactorVerifyView,
    TwoFactorSetupView,
    TwoFactorConfirmView,
    HealthCheckView,
    AppVersionView,
    CacheMetricsView,
    DataDeletionRequestView,
    UnsubscribeView
)

router = DefaultRouter()
router.register(r'inquiries', InquiryViewSet, basename='inquiry')
router.register(r'services', ServiceViewSet, basename='service')
router.register(r'portfolio', PortfolioItemViewSet, basename='portfolio')
router.register(r'team', TeamMemberViewSet, basename='team')
router.register(r'settings', SiteSettingViewSet, basename='setting')
router.register(r'audit-logs', AuditLogViewSet, basename='audit-log')
router.register(r'newsletter', NewsletterSubscriberViewSet, basename='newsletter')
router.register(r'crashes', CrashReportViewSet, basename='crash-report')


urlpatterns = [
    # Health check
    path('health/', HealthCheckView.as_view(), name='health-check'),

    # Remote App Version & Force Update Config
    path('app-version/', AppVersionView.as_view(), name='app-version'),

    # Admin Command Center KPIs
    path('admin/stats/', AdminDashboardStatsView.as_view(), name='admin-stats'),

    # High-Performance Cache Diagnostics
    path('cache/metrics/', CacheMetricsView.as_view(), name='cache-metrics'),

    # GDPR & CCPA Self-Service Data Erasure
    path('privacy/data-deletion/', DataDeletionRequestView.as_view(), name='privacy-data-deletion'),

    # CAN-SPAM & GDPR One-Click Email Unsubscribe
    path('privacy/unsubscribe/', UnsubscribeView.as_view(), name='privacy-unsubscribe'),

    # JWT Authentication & 2FA Enforcement
    path('auth/login/', CustomAuthLoginView.as_view(), name='auth-login'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    path('auth/2fa/verify/', TwoFactorVerifyView.as_view(), name='auth-2fa-verify'),
    path('auth/2fa/setup/', TwoFactorSetupView.as_view(), name='auth-2fa-setup'),
    path('auth/2fa/confirm/', TwoFactorConfirmView.as_view(), name='auth-2fa-confirm'),

    # REST Router Endpoints
    path('', include(router.urls)),
]
