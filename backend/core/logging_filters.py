"""
BrixelLabs Sensitive Data Redaction Log Filter
Automatically scrubs passwords, API keys, Bearer tokens, credit cards,
and database connection credentials before log records are emitted to handlers.
"""

import re
import logging

# Regex patterns for sensitive credentials in log streams
REDACTION_PATTERNS = [
    # Bearer tokens
    (re.compile(r'Bearer\s+[a-zA-Z0-9_\-\.]{15,}', re.IGNORECASE), 'Bearer [REDACTED_TOKEN]'),
    # Passwords in query strings or JSON keys
    (re.compile(r'(["\']?(?:password|passwd|pass|secret|api_key|token)["\']?\s*[:=]\s*["\'])([^"\'\s&]+)(["\']?)', re.IGNORECASE), r'\1[REDACTED]\3'),
    # Database connection URLs with passwords
    (re.compile(r'(postgresql|postgres|mysql|sqlite)://([^:]+):([^@]+)@', re.IGNORECASE), r'\1://\2:[REDACTED_DB_PASS]@'),
    # Credit card numbers (13 to 16 digits)
    (re.compile(r'\b(?:\d{4}[ -]?){3}\d{4}\b'), '[REDACTED_CARD]'),
    # Email app passwords (16 lowercase letters e.g. Google App Passwords)
    (re.compile(r'\b[a-z]{4}\s?[a-z]{4}\s?[a-z]{4}\s?[a-z]{4}\b'), '[REDACTED_APP_SECRET]'),
]

class MaskSensitiveDataFilter(logging.Filter):
    """
    Inspects and sanitizes log message text and arguments to prevent
    accidental credential or personal data leakage in server logs.
    """
    def filter(self, record):
        try:
            if isinstance(record.msg, str):
                msg = record.msg
                for pattern, replacement in REDACTION_PATTERNS:
                    msg = pattern.sub(replacement, msg)
                record.msg = msg

            if record.args and isinstance(record.args, tuple):
                cleaned_args = []
                for arg in record.args:
                    if isinstance(arg, str):
                        clean_arg = arg
                        for pattern, replacement in REDACTION_PATTERNS:
                            clean_arg = pattern.sub(replacement, clean_arg)
                        cleaned_args.append(clean_arg)
                    else:
                        cleaned_args.append(arg)
                record.args = tuple(cleaned_args)

        except Exception:
            # If sanitization throws, don't crash the logging pipeline
            pass
        return True
