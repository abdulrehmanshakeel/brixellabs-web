import uuid
from django.db import models

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
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=64, blank=True, default='')
    company = models.CharField(max_length=255, blank=True, default='')
    service = models.CharField(max_length=255, default='General AI Strategy')
    budget = models.CharField(max_length=128, blank=True, default='Undisclosed')
    project_brief = models.TextField(blank=True, default='')
    status = models.CharField(max_length=32, choices=STATUS_CHOICES, default='New')
    priority = models.CharField(max_length=32, choices=PRIORITY_CHOICES, default='Medium')
    source = models.CharField(max_length=128, default='Consultation Modal')
    notes = models.TextField(blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Inquiry / Lead'
        verbose_name_plural = 'Inquiries / Leads'

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
    action = models.CharField(max_length=128)
    details = models.TextField()
    user = models.CharField(max_length=128, default='Admin')
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-timestamp']
        verbose_name = 'Audit Log'
        verbose_name_plural = 'Audit Logs'

    def __str__(self):
        return f"[{self.timestamp.strftime('%Y-%m-%d %H:%M')}] {self.user}: {self.action}"


class NewsletterSubscriber(models.Model):
    email = models.EmailField(unique=True)
    source = models.CharField(max_length=128, default='Footer Newsletter')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Newsletter Subscriber'
        verbose_name_plural = 'Newsletter Subscribers'

    def __str__(self):
        return self.email

