"""
BrixelLabs Webhook Cryptographic Verification Engine
Prevents forgery, tampering, and replay attacks on incoming webhooks
(e.g., Cloudflare, Stripe, Resend, GitHub) using timing-safe HMAC-SHA256.
"""

import os
import hmac
import hashlib
import time
from functools import wraps
from rest_framework.response import Response
from rest_framework import status

# Maximum allowed clock drift for replay attack defense (5 minutes)
DEFAULT_TIMESTAMP_TOLERANCE_SECONDS = 300

def verify_hmac_sha256_signature(payload_bytes, signature_header, secret, timestamp_header=None, tolerance=DEFAULT_TIMESTAMP_TOLERANCE_SECONDS):
    """
    Cryptographically verifies an incoming webhook signature using HMAC-SHA256.
    Uses timing-safe comparison to prevent side-channel analysis.
    """
    if not secret or not signature_header:
        return False, "Missing signing secret or signature header."

    # Prevent Replay Attacks if timestamp header is provided
    if timestamp_header:
        try:
            ts = int(timestamp_header)
            current_time = int(time.time())
            if abs(current_time - ts) > tolerance:
                return False, f"Webhook timestamp outside valid window ({tolerance}s). Potential replay attack."
            # Append timestamp to payload if provider signs timestamp + payload
            payload_to_verify = f"{ts}.".encode('utf-8') + payload_bytes
        except ValueError:
            return False, "Invalid timestamp header format."
    else:
        payload_to_verify = payload_bytes

    # Strip provider prefixes if present (e.g. 'sha256=', 'v1=')
    cleaned_signature = signature_header
    if '=' in signature_header:
        cleaned_signature = signature_header.split('=', 1)[1]

    # Compute expected HMAC digest
    computed_digest = hmac.new(
        secret.encode('utf-8') if isinstance(secret, str) else secret,
        payload_to_verify,
        hashlib.sha256
    ).hexdigest()

    # Timing-safe comparison to prevent timing attacks
    if not hmac.compare_digest(computed_digest.lower(), cleaned_signature.lower()):
        return False, "Cryptographic signature verification failed: signature does not match."

    return True, "Valid signature."

def require_webhook_signature(secret_env_var='WEBHOOK_SIGNING_SECRET', header_name='HTTP_X_SIGNATURE'):
    """
    Decorator for DRF API views to enforce webhook signature validation.
    """
    def decorator(view_func):
        @wraps(view_func)
        def _wrapped_view(self_or_request, *args, **kwargs):
            request = self_or_request if hasattr(self_or_request, 'META') else args[0]
            secret = os.environ.get(secret_env_var)

            if not secret:
                return Response(
                    {"error": "Webhook configuration error: signing secret not set on server."},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

            signature = request.META.get(header_name) or request.META.get('HTTP_X_HUB_SIGNATURE_256')
            timestamp = request.META.get('HTTP_X_TIMESTAMP')

            is_valid, reason = verify_hmac_sha256_signature(
                request.body,
                signature,
                secret,
                timestamp_header=timestamp
            )

            if not is_valid:
                return Response(
                    {"error": f"Webhook verification rejected: {reason}"},
                    status=status.HTTP_401_UNAUTHORIZED
                )

            return view_func(self_or_request, *args, **kwargs)
        return _wrapped_view
    return decorator
