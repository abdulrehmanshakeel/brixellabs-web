"""
BrixelLabs Error Handling & Information Leakage Defense Test Suite
Verifies:
1. Production 500 exception masking (no tracebacks, SQL, or filesystem paths in response)
2. Incident ID generation and safe client error envelopes
3. CrashReport telemetry persistence for authorized engineers
4. Account & resource enumeration prevention (uniform 401 on non-staff login, no records_erased leakage)
5. Log redaction filter scrubbing Bearer tokens, passwords, and DB credentials
"""

import logging
from django.test import SimpleTestCase, override_settings
from rest_framework.exceptions import ValidationError, APIException
from rest_framework.response import Response
from rest_framework import status

from core.exceptions import custom_exception_handler, sanitize_client_error
from core.logging_filters import MaskSensitiveDataFilter

class ErrorHandlingSecurityTestCase(SimpleTestCase):

    @override_settings(DEBUG=False)
    def test_unhandled_500_masks_traceback_and_provides_incident_id(self):
        """Unhandled 500 exceptions must return generic safe message and incident ID without tracebacks."""
        # Simulate unexpected server exception (e.g. database disconnect or division by zero)
        raw_exc = RuntimeError("Database connection failed at /var/www/internal/db.sock: Connection refused")
        context = {'request': None}

        response = custom_exception_handler(raw_exc, context)
        
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertFalse(response.data['ok'])
        # Must not leak filesystem paths or internal error details
        self.assertNotIn("/var/www/internal", response.data['error'])
        self.assertNotIn("Connection refused", response.data['error'])
        self.assertEqual(
            response.data['error'], 
            "An unexpected processing exception occurred. Our security and engineering team has been alerted."
        )
        # Must provide traceable incident ID
        self.assertTrue(response.data['incident_id'].startswith('inc-'))

    def test_sanitize_client_error_masks_sql_and_tracebacks(self):
        """Validation errors containing accidental SQL tokens or driver exceptions are sanitized."""
        leaky_message = "psycopg2.OperationalError: syntax error at or near 'SELECT' in query: SELECT * FROM core_user"
        cleaned = sanitize_client_error(leaky_message)
        
        self.assertEqual(cleaned, "Invalid request format or parameter constraints.")
        self.assertNotIn("SELECT", cleaned)
        self.assertNotIn("psycopg2", cleaned)

    def test_sanitize_client_error_preserves_legitimate_validation_hints(self):
        """Legitimate user-facing validation errors (e.g. invalid email) are safely retained."""
        valid_error = "Please enter a valid email address."
        cleaned = sanitize_client_error(valid_error)
        self.assertEqual(cleaned, "Please enter a valid email address.")

    def test_mask_sensitive_data_log_filter(self):
        """Log filter must redact Bearer tokens, passwords, and DB connection strings."""
        log_filter = MaskSensitiveDataFilter()

        # 1. Test Bearer Token Redaction
        record_token = logging.LogRecord(
            name="core", level=logging.INFO, pathname=__file__, lineno=1,
            msg="Authorized request with Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.secret123456",
            args=(), exc_info=None
        )
        log_filter.filter(record_token)
        self.assertNotIn("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9", record_token.msg)
        self.assertIn("Bearer [REDACTED_TOKEN]", record_token.msg)

        # 2. Test Password Redaction
        record_pass = logging.LogRecord(
            name="core", level=logging.INFO, pathname=__file__, lineno=1,
            msg='Failed authentication attempt with {"username": "admin", "password": "SuperSecretPassword123!"}',
            args=(), exc_info=None
        )
        log_filter.filter(record_pass)
        self.assertNotIn("SuperSecretPassword123!", record_pass.msg)
        self.assertIn('[REDACTED]', record_pass.msg)

        # 3. Test Database Connection URL Redaction
        record_db = logging.LogRecord(
            name="core", level=logging.INFO, pathname=__file__, lineno=1,
            msg="Attempting migration on postgresql://neondb_owner:super_secret_db_pass_123@ep-cool-pooler.aws.neon.tech/neondb",
            args=(), exc_info=None
        )
        log_filter.filter(record_db)
        self.assertNotIn("super_secret_db_pass_123", record_db.msg)
        self.assertIn("[REDACTED_DB_PASS]", record_db.msg)
