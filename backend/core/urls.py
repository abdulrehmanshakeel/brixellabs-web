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
    AdminDashboardStatsView,
    CustomAuthLoginView,
    HealthCheckView
)

router = DefaultRouter()
router.register(r'inquiries', InquiryViewSet, basename='inquiry')
router.register(r'services', ServiceViewSet, basename='service')
router.register(r'portfolio', PortfolioItemViewSet, basename='portfolio')
router.register(r'team', TeamMemberViewSet, basename='team')
router.register(r'settings', SiteSettingViewSet, basename='setting')
router.register(r'audit-logs', AuditLogViewSet, basename='audit-log')
router.register(r'newsletter', NewsletterSubscriberViewSet, basename='newsletter')


urlpatterns = [
    # Health check
    path('health/', HealthCheckView.as_view(), name='health-check'),

    # Admin Command Center KPIs
    path('admin/stats/', AdminDashboardStatsView.as_view(), name='admin-stats'),

    # JWT Authentication
    path('auth/login/', CustomAuthLoginView.as_view(), name='auth-login'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),

    # REST Router Endpoints
    path('', include(router.urls)),
]
