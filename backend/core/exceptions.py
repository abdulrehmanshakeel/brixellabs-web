"""
BrixelLabs Secure Exception Handler
Hides internal tracebacks, SQL statements, and server paths from public users
while capturing full forensic incident telemetry for authenticated engineers.
"""

import uuid
import logging
from django.conf import settings
from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status

logger = logging.getLogger(__name__)

import traceback

def sanitize_client_error(raw_error):
    """
    Recursively cleans client-facing error structures, masking filesystem paths,
    SQL tokens, and internal python signatures while preserving actionable form hints.
    """
    if isinstance(raw_error, str):
        lower = raw_error.lower()
        # Redact raw SQL, database drivers, or filesystem path leakages
        if any(token in lower for token in ['traceback', 'syntaxerror', 'select ', 'insert into', 'update ', 'delete from', 'psycopg2', 'sqlite3', 'operationalerror']) or ('\\' in raw_error and ':' in raw_error):
            return "Invalid request format or parameter constraints."
        return raw_error
    elif isinstance(raw_error, dict):
        return {k: sanitize_client_error(v) for k, v in raw_error.items()}
    elif isinstance(raw_error, list):
        return [sanitize_client_error(item) for item in raw_error]
    return raw_error

def custom_exception_handler(exc, context):
    """
    Uniform exception handler for all Django REST Framework views.
    Masks internal errors in production and logs incidents to telemetry.
    """
    response = exception_handler(exc, context)
    incident_id = f"inc-{uuid.uuid4().hex[:8]}"

    # Extract request metadata safely
    request = context.get('request')
    path = request.path if request else 'unknown'
    method = request.method if request else 'unknown'
    ip_addr = 'unknown'
    if request:
        ip_addr = request.META.get('HTTP_X_FORWARDED_FOR', '').split(',')[0].strip() or request.META.get('REMOTE_ADDR')

    # Log internal error details on server side
    logger.error(
        f"[Incident #{incident_id}] Exception on {method} {path} from {ip_addr}: {str(exc)}", 
        exc_info=True
    )

    # If DRF handled it (e.g., 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found)
    if response is not None:
        # Standardize and sanitize error envelope
        raw_error = response.data.get('detail') or response.data.get('error') or response.data
        cleaned_error = sanitize_client_error(raw_error)
        response.data = {
            'ok': False,
            'status': response.status_code,
            'error': cleaned_error,
            'incident_id': incident_id
        }
        return response

    # If unhandled server exception (500 Internal Server Error)
    # Never expose Python tracebacks, database queries, or server internals to end users!
    safe_error_message = (
        "An unexpected processing exception occurred. Our security and engineering team has been alerted."
        if not settings.DEBUG 
        else f"Debug Exception: {str(exc)}"
    )

    # Attempt to persist crash report in CrashReport model
    try:
        from .models import CrashReport
        CrashReport.objects.create(
            incident_id=incident_id,
            error_message=str(exc)[:500],
            stack_trace=traceback.format_exc(),
            severity='critical',
            url=f"{method} {path}",
            ip_address=ip_addr if ip_addr != 'unknown' else None,
            metadata={'handled_by': 'custom_exception_handler'}
        )
    except Exception as db_err:
        logger.error(f"Failed to record crash report in database: {db_err}")

    return Response(
        {
            'ok': False,
            'status': status.HTTP_500_INTERNAL_SERVER_ERROR,
            'error': safe_error_message,
            'incident_id': incident_id
        },
        status=status.HTTP_500_INTERNAL_SERVER_ERROR
    )
