from django.contrib import admin
from .models import Inquiry, Service, PortfolioItem, TeamMember, SiteSetting, AuditLog

@admin.register(Inquiry)
class InquiryAdmin(admin.ModelAdmin):
    list_display = ('name', 'company', 'service', 'budget', 'status', 'priority', 'source', 'created_at')
    list_filter = ('status', 'priority', 'source', 'service')
    search_fields = ('name', 'email', 'company', 'project_brief', 'notes')
    readonly_fields = ('created_at', 'updated_at')


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'active', 'order', 'created_at')
    list_filter = ('active', 'category')
    search_fields = ('title', 'category', 'description')


@admin.register(PortfolioItem)
class PortfolioItemAdmin(admin.ModelAdmin):
    list_display = ('title', 'client', 'category', 'metric', 'featured', 'order', 'created_at')
    list_filter = ('featured', 'category')
    search_fields = ('title', 'client', 'description')


@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'department', 'status', 'email', 'order')
    list_filter = ('status', 'department')
    search_fields = ('name', 'role', 'email')


@admin.register(SiteSetting)
class SiteSettingAdmin(admin.ModelAdmin):
    list_display = ('key', 'description', 'updated_at')
    search_fields = ('key', 'description')


@admin.register(AuditLog)
class AuditLogAdmin(admin.ModelAdmin):
    list_display = ('action', 'user', 'ip_address', 'timestamp')
    list_filter = ('user', 'action')
    search_fields = ('action', 'details', 'user')
    readonly_fields = ('action', 'details', 'user', 'ip_address', 'timestamp')
