import uuid
from django.db import models
from django.db.models import Q, CheckConstraint, Index

class Inquiry(models.Model):
    STATUS_CHOICES = [
        ('New', 'New'),
        ('In Review', 'In Review'),
        ('Contacted', 'Contacted'),
        ('Closed / Won', 'Closed / Won'),
        ('Archived', 'Archived'),
    ]

    PRIORITY_CHOICES = [
        ('Low', 'Low'),
        ('Medium', 'Medium'),
        ('High', 'High'),
        ('Urgent', 'Urgent'),
    ]

    id = models.CharField(max_length=64, primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255, db_index=True)
    email = models.EmailField(db_index=True)
    phone = models.CharField(max_length=64, blank=True, default='')
    company = models.CharField(max_length=255, blank=True, default='')
    service = models.CharField(max_length=255, default='General AI Strategy')
    budget = models.CharField(max_length=128, blank=True, default='Undisclosed')
    project_brief = models.TextField(blank=True, default='')
    status = models.CharField(max_length=32, choices=STATUS_CHOICES, default='New', db_index=True)
    priority = models.CharField(max_length=32, choices=PRIORITY_CHOICES, default='Medium', db_index=True)
    source = models.CharField(max_length=128, default='Consultation Modal')
    notes = models.TextField(blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Inquiry / Lead'
        verbose_name_plural = 'Inquiries / Leads'
        indexes = [
            Index(fields=['status', 'created_at']),
            Index(fields=['email', 'created_at']),
            Index(fields=['priority', 'created_at']),
            Index(fields=['created_at']),
        ]
        constraints = [
            CheckConstraint(
                check=Q(email__contains='@'),
                name='valid_inquiry_email_format'
            ),
        ]

    def __str__(self):
        return f"{self.name} - {self.company or self.email} ({self.status})"


class Service(models.Model):
    id = models.CharField(max_length=64, primary_key=True)
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=128, default='Engineering')
    description = models.TextField()
    bullets = models.JSONField(default=list, help_text="List of feature bullet strings")
    active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'title']
        verbose_name = 'Service'
        verbose_name_plural = 'Services'
        indexes = [
            Index(fields=['active', 'order']),
            Index(fields=['category', 'active']),
        ]

    def __str__(self):
        return self.title


class PortfolioItem(models.Model):
    id = models.CharField(max_length=64, primary_key=True)
    title = models.CharField(max_length=255)
    client = models.CharField(max_length=255, default='Confidential Client')
    category = models.CharField(max_length=128)
    metric = models.CharField(max_length=255)
    accuracy = models.CharField(max_length=128, blank=True, default='')
    description = models.TextField()
    tags = models.JSONField(default=list, help_text="List of technology tags")
    link = models.CharField(max_length=255, default='/case-studies')
    featured = models.BooleanField(default=True)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'created_at']
        verbose_name = 'Portfolio Case Study'
        verbose_name_plural = 'Portfolio Case Studies'
        indexes = [
            Index(fields=['featured', 'order']),
            Index(fields=['category', 'featured']),
        ]

    def __str__(self):
        return self.title


class TeamMember(models.Model):
    id = models.CharField(max_length=64, primary_key=True)
    name = models.CharField(max_length=255)
    role = models.CharField(max_length=255)
    department = models.CharField(max_length=128)
    status = models.CharField(max_length=32, default='Active')
    email = models.EmailField(blank=True, default='')
    avatar = models.CharField(max_length=255, blank=True, default='')
    skills = models.JSONField(default=list, help_text="List of technical skills")
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'name']
        verbose_name = 'Team Member'
        verbose_name_plural = 'Team Members'
        indexes = [
            Index(fields=['status', 'order']),
            Index(fields=['department']),
        ]

    def __str__(self):
        return f"{self.name} ({self.role})"


class SiteSetting(models.Model):
    key = models.CharField(max_length=128, primary_key=True)
    value = models.JSONField(default=dict)
    description = models.TextField(blank=True, default='')
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Site Setting'
        verbose_name_plural = 'Site Settings'

    def __str__(self):
        return self.key


class AuditLog(models.Model):
    """
    Immutable audit ledger for compliance, traceability, and forensic investigations.
    Modifications or deletions are strictly blocked at the application and DB level.
    """
    action = models.CharField(max_length=128, db_index=True)
    details = models.TextField()
    user = models.CharField(max_length=128, default='Admin', db_index=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        ordering = ['-timestamp']
        verbose_name = 'Audit Log'
        verbose_name_plural = 'Audit Logs'
        indexes = [
            Index(fields=['action', 'timestamp']),
            Index(fields=['user', 'timestamp']),
            Index(fields=['timestamp']),
        ]

    def delete(self, *args, **kwargs):
        raise PermissionError("Security Rule Violation: Audit logs are append-only and cannot be deleted.")

    def __str__(self):
        return f"[{self.timestamp.strftime('%Y-%m-%d %H:%M')}] {self.user}: {self.action}"


class NewsletterSubscriber(models.Model):
    email = models.EmailField(unique=True, db_index=True)
    source = models.CharField(max_length=128, default='Footer Newsletter')
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Newsletter Subscriber'
        verbose_name_plural = 'Newsletter Subscribers'
        indexes = [
            Index(fields=['created_at']),
            Index(fields=['source', 'created_at']),
        ]
        constraints = [
            CheckConstraint(
                check=Q(email__contains='@'),
                name='valid_newsletter_email_format'
            ),
        ]

    def __str__(self):
        return self.email


# ==============================================================================
# Crash Reporting from Day One
# ==============================================================================
class CrashReport(models.Model):
    """
    Centralized crash report telemetry for both frontend unhandled exceptions
    and backend unhandled server errors.
    """
    SEVERITY_CHOICES = [
        ('critical', 'Critical (App Crash / Whitescreen)'),
        ('error', 'Error (Failed API / Unhandled Rejection)'),
        ('warning', 'Warning (Degraded Performance / Soft Failure)'),
    ]

    id = models.CharField(max_length=64, primary_key=True, default=uuid.uuid4, editable=False)
    incident_id = models.CharField(max_length=64, db_index=True, help_text="User-facing incident reference")
    error_message = models.TextField()
    stack_trace = models.TextField(blank=True, default='')
    component_stack = models.TextField(blank=True, default='')
    severity = models.CharField(max_length=16, choices=SEVERITY_CHOICES, default='error', db_index=True)
    app_version = models.CharField(max_length=32, default='1.0.0', db_index=True)
    url = models.CharField(max_length=512, blank=True, default='')
    user_agent = models.CharField(max_length=512, blank=True, default='')
    viewport = models.CharField(max_length=64, blank=True, default='')
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    metadata = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Crash Incident Report'
        verbose_name_plural = 'Crash Incident Reports'
        indexes = [
            Index(fields=['severity', 'created_at']),
            Index(fields=['incident_id']),
        ]

    def __str__(self):
        return f"[{self.severity.upper()}] Incident #{self.incident_id}: {self.error_message[:60]}"


# ==============================================================================
# Remote App Version Control & Force Update Management
# ==============================================================================
class AppVersion(models.Model):
    """
    Controls dynamic remote versioning, force-update screens, and security releases.
    """
    platform = models.CharField(max_length=32, primary_key=True, default='web') # 'web', 'android', 'ios'
    current_version = models.CharField(max_length=32, default='2.4.0', help_text="Latest available release version")
    min_supported_version = models.CharField(max_length=32, default='2.0.0', help_text="Minimum allowed client version before forcing an update")
    force_update = models.BooleanField(default=False, help_text="When True, blocks access until updated")
    update_title = models.CharField(max_length=255, default='Mandatory Platform Update')
    update_message = models.TextField(default='A critical security and architectural update is required to continue using BrixelLabs.')
    release_notes = models.JSONField(default=list, help_text="List of bullet highlights for the new version")
    download_url = models.CharField(max_length=512, blank=True, default='/')
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'App Version & Force Update Config'
        verbose_name_plural = 'App Version & Force Update Configs'

    def __str__(self):
        return f"{self.platform.upper()} (Current: {self.current_version}, Min: {self.min_supported_version}, Force: {self.force_update})"


# ==============================================================================
# Two-Factor Authentication (2FA / TOTP)
# ==============================================================================
class Admin2FA(models.Model):
    user = models.OneToOneField('auth.User', on_delete=models.CASCADE, related_name='two_factor')
    secret_key = models.CharField(max_length=64, help_text="Base32 TOTP Secret")
    is_enabled = models.BooleanField(default=False)
    backup_codes = models.JSONField(default=list, help_text="List of SHA-256 hashed single-use recovery codes")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Admin 2FA Configuration'
        verbose_name_plural = 'Admin 2FA Configurations'

    def __str__(self):
        return f"2FA for {self.user.username} (Enabled: {self.is_enabled})"



