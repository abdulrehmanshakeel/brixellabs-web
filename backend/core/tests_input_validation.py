"""
BrixelLabs Comprehensive Input Validation & Boundary Security Test Suite
Tests:
- Valid payloads across API routes
- Invalid payloads and schema validation
- Boundary value testing (min/max length, empty strings)
- Suspicious input injection (XSS, SQLi strings, null bytes, log injection, control characters)
"""

from unittest.mock import patch
from django.test import SimpleTestCase
from rest_framework.test import APIRequestFactory
from core.models import AppVersion
from core.serializers import InquirySerializer, NewsletterSubscriberSerializer, CrashReportSerializer, sanitize_text
from core.views import AppVersionView, CustomAuthLoginView, DataDeletionRequestView, UnsubscribeView


class InputSanitizationUnitTests(SimpleTestCase):
    def test_sanitize_text_strips_null_bytes_and_control_chars(self):
        malicious = "Hello\x00World\x08Test\x1FDone"
        cleaned = sanitize_text(malicious)
        self.assertEqual(cleaned, "HelloWorldTestDone")
        self.assertNotIn("\x00", cleaned)

    def test_sanitize_text_escapes_html(self):
        payload = "<script>alert('xss')</script>"
        cleaned = sanitize_text(payload)
        self.assertNotIn("<script>", cleaned)
        self.assertIn("&lt;script&gt;", cleaned)

    def test_sanitize_text_truncates_at_max_length(self):
        long_str = "A" * 1000
        cleaned = sanitize_text(long_str, max_length=50)
        self.assertEqual(len(cleaned), 50)


class SerializerValidationTests(SimpleTestCase):
    def test_valid_inquiry_payload(self):
        data = {
            "name": "Jane Doe",
            "email": "jane.doe@enterprise.com",
            "phone": "+1 415 555 0199",
            "company": "Enterprise Corp",
            "service": "AI Agents & Automation",
            "budget": "$50k+",
            "project_brief": "Automated workflow testing"
        }
        serializer = InquirySerializer(data=data)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        self.assertEqual(serializer.validated_data['name'], "Jane Doe")
        self.assertEqual(serializer.validated_data['email'], "jane.doe@enterprise.com")

    def test_inquiry_short_name_rejected(self):
        data = {
            "name": "A",
            "email": "test@domain.com"
        }
        serializer = InquirySerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("name", serializer.errors)

    def test_inquiry_invalid_email_rejected(self):
        data = {
            "name": "John Smith",
            "email": "not-an-email"
        }
        serializer = InquirySerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("email", serializer.errors)

    def test_inquiry_sqli_string_in_brief_safely_escaped(self):
        data = {
            "name": "Robert'); DROP TABLE core_inquiry;--",
            "email": "robert@tables.com",
            "project_brief": "SELECT * FROM users WHERE '1'='1';"
        }
        serializer = InquirySerializer(data=data)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        # Should be escaped and safe against HTML/SQL injection
        self.assertIn("&#x27;", serializer.validated_data['name'])
        self.assertIn("&#x27;1&#x27;=&#x27;1&#x27;", serializer.validated_data['project_brief'])

    def test_newsletter_email_validation(self):
        serializer = NewsletterSubscriberSerializer()
        # Invalid email format
        with self.assertRaises(Exception):
            serializer.validate_email("invalid@@domain..com")
        
        # Oversized email (>254 chars)
        long_email = "a" * 250 + "@domain.com"
        with self.assertRaises(Exception):
            serializer.validate_email(long_email)

        # Valid email returns cleaned lowercased string
        self.assertEqual(serializer.validate_email("  Valid.Email@Domain.Com  "), "valid.email@domain.com")

    def test_crash_report_field_bounds_and_severity_validation(self):
        serializer = CrashReportSerializer()
        # Unknown severity falls back to 'error'
        self.assertEqual(serializer.validate_severity("UNKNOWN_ATTACK_SEVERITY"), "error")
        self.assertEqual(serializer.validate_severity("critical"), "critical")
        
        # Max length truncations
        self.assertEqual(len(serializer.validate_app_version("v" + "1" * 100)), 32)
        self.assertEqual(len(serializer.validate_stack_trace("B" * 20000)), 10000)
        self.assertEqual(len(serializer.validate_component_stack("C" * 10000)), 5000)


class EndpointInputValidationTests(SimpleTestCase):
    def setUp(self):
        self.factory = APIRequestFactory()

    @patch('core.models.AppVersion.objects.get')
    def test_app_version_query_parameter_reflection_defended(self, mock_get):
        mock_get.side_effect = AppVersion.DoesNotExist
        view = AppVersionView.as_view()
        # Malicious parameter with script tags
        request = self.factory.get('/api/app-version/?platform=<script>alert("XSS")</script>')
        response = view(request)
        self.assertEqual(response.status_code, 200)
        # Platform must be normalized and defaulted to 'web', never reflecting raw tags
        self.assertEqual(response.data['platform'], 'web')
        self.assertNotIn('<script>', str(response.data))

    def test_login_rejects_oversized_passwords(self):
        view = CustomAuthLoginView.as_view()
        oversized_pass = "P" * 5000
        request = self.factory.post('/api/auth/login/', {"username": "admin", "password": oversized_pass})
        response = view(request)
        self.assertEqual(response.status_code, 400)
        self.assertIn("length", response.data.get('detail', ''))

    def test_data_deletion_rejects_invalid_or_oversized_emails(self):
        view = DataDeletionRequestView.as_view()
        
        # Missing @
        req1 = self.factory.post('/api/privacy/data-deletion/', {"email": "invalid-email"})
        resp1 = view(req1)
        self.assertEqual(resp1.status_code, 400)

        # Oversized email
        req2 = self.factory.post('/api/privacy/data-deletion/', {"email": "x" * 250 + "@brixellabs.com"})
        resp2 = view(req2)
        self.assertEqual(resp2.status_code, 400)

    def test_unsubscribe_rejects_invalid_email(self):
        view = UnsubscribeView.as_view()
        request = self.factory.post('/api/newsletter/unsubscribe/', {"email": "bad_email_format"})
        response = view(request)
        self.assertEqual(response.status_code, 400)
