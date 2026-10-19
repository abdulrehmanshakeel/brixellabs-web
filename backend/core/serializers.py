import html
import re
import uuid
from rest_framework import serializers
from .models import (
    Inquiry, Service, PortfolioItem, TeamMember, SiteSetting, 
    AuditLog, NewsletterSubscriber, CrashReport, AppVersion
)

EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')


def sanitize_text(value: str, max_length: int = 500) -> str:
    """Strip, escape HTML entities, and truncate excessive input strings."""
    if not value:
        return ''
    cleaned = html.escape(str(value).strip())
    # Remove null bytes or control characters
    cleaned = re.sub(r'[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]', '', cleaned)
    return cleaned[:max_length]


class InquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inquiry
        fields = '__all__'
        read_only_fields = ('id', 'created_at', 'updated_at')

    def validate_name(self, value):
        cleaned = sanitize_text(value, 255)
        if len(cleaned) < 2:
            raise serializers.ValidationError("Full name must be at least 2 characters.")
        return cleaned

    def validate_email(self, value):
        cleaned = value.strip().lower()
        if not EMAIL_REGEX.match(cleaned):
            raise serializers.ValidationError("Please provide a valid email address.")
        if len(cleaned) > 254:
            raise serializers.ValidationError("Email address cannot exceed 254 characters.")
        return cleaned

    def validate_phone(self, value):
        return sanitize_text(value, 64)

    def validate_company(self, value):
        return sanitize_text(value, 255)

    def validate_service(self, value):
        return sanitize_text(value, 255)

    def validate_budget(self, value):
        return sanitize_text(value, 128)

    def validate_project_brief(self, value):
        return sanitize_text(value, 5000)

    def create(self, validated_data):
        # Never trust client-supplied ID or status on public inquiry creation
        request = self.context.get('request')
        is_staff = request and request.user and request.user.is_authenticated and request.user.is_staff
        
        # Enforce server-generated ID
        short_id = uuid.uuid4().hex[:8]
        validated_data['id'] = f"inq-{short_id}"
        
        # Non-staff users cannot inject pre-approved status or priority
        if not is_staff:
            validated_data['status'] = 'New'
            validated_data['priority'] = 'Medium'
            
        return super().create(validated_data)


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'

    def validate_title(self, value):
        return sanitize_text(value, 255)

    def validate_category(self, value):
        return sanitize_text(value, 128)


class PortfolioItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = PortfolioItem
        fields = '__all__'

    def validate_title(self, value):
        return sanitize_text(value, 255)

    def validate_client(self, value):
        return sanitize_text(value, 255)


class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = '__all__'

    def validate_name(self, value):
        return sanitize_text(value, 255)

    def validate_role(self, value):
        return sanitize_text(value, 255)


class SiteSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSetting
        fields = '__all__'


class AuditLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuditLog
        fields = '__all__'
        read_only_fields = ('id', 'timestamp')


class NewsletterSubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterSubscriber
        fields = '__all__'
        read_only_fields = ('created_at',)

    def validate_email(self, value):
        cleaned = value.strip().lower()
        if not EMAIL_REGEX.match(cleaned):
            raise serializers.ValidationError("Please provide a valid email address.")
        if len(cleaned) > 254:
            raise serializers.ValidationError("Email address cannot exceed 254 characters.")
        return cleaned


class CrashReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = CrashReport
        fields = '__all__'
        read_only_fields = ('id', 'incident_id', 'created_at')

    def validate_error_message(self, value):
        return sanitize_text(value, 1000)

    def validate_url(self, value):
        return sanitize_text(value, 500)

    def validate_user_agent(self, value):
        return sanitize_text(value, 500)

    def validate_severity(self, value):
        val = str(value).lower().strip()
        if val not in ('critical', 'error', 'warning'):
            return 'error'
        return val

    def validate_app_version(self, value):
        return sanitize_text(value, 32)

    def validate_stack_trace(self, value):
        return sanitize_text(value, 10000)

    def validate_component_stack(self, value):
        return sanitize_text(value, 5000)

    def validate_viewport(self, value):
        return sanitize_text(value, 64)


class AppVersionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppVersion
        fields = '__all__'
        read_only_fields = ('updated_at',)



