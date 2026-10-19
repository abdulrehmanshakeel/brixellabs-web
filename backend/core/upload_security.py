"""
BrixelLabs Enterprise Secure File Upload & Media Storage Engine
Comprehensive multi-layer defense:
- Strict server-side size limits
- Extension-to-MIME binding
- Deep binary magic-signature verification (independent of client Content-Type)
- Path traversal & double-extension defense
- Decompression bomb protection (PIL MAX_IMAGE_PIXELS limit)
- Active PDF payload screening (/Launch, /JavaScript, /EmbeddedFiles)
- Image EXIF metadata stripping and re-encoding safeguards
- Safe HTTP download response headers (X-Content-Type-Options, CSP sandbox, Content-Disposition)
"""

import os
import io
import re
import uuid
from pathlib import Path
from django.conf import settings
from django.http import FileResponse, Http404
from rest_framework.exceptions import ValidationError

try:
    from PIL import Image
    # Decompression bomb mitigation: reject images larger than 25 Megapixels (~5000x5000)
    Image.MAX_IMAGE_PIXELS = 25_000_000
    HAS_PIL = True
except ImportError:
    HAS_PIL = False

# Maximum allowed upload payload size: 5 Megabytes
DEFAULT_MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024

# Blacklist of dangerous executable and script extensions (checked across full filename)
DANGEROUS_EXTENSIONS_PATTERN = re.compile(
    r'\.(php\d?|phtml|py|pyc|pyw|sh|bash|exe|dll|bat|cmd|ps1|vbs|js|mjs|cgi|pl|jsp|asp|aspx|shtml|svg|xml|html|htm|xhtml|htaccess|config)$',
    re.IGNORECASE
)

# Any occurrence of these keywords in compound filenames (e.g., shell.php.jpg) triggers rejection
SUSPICIOUS_EMBEDDED_KEYWORDS = {
    'php', 'phtml', 'exe', 'sh', 'bat', 'cmd', 'ps1', 'jsp', 'asp', 'aspx', 'cgi', 'svg', 'html'
}

# Strict whitelist of allowed extensions, allowed MIME types, and binary magic signatures
ALLOWED_SPECS = {
    '.png': {
        'canonical_mime': 'image/png',
        'mimes': {'image/png'},
        'magic_headers': [b'\x89PNG\r\n\x1a\n'],
        'category': 'image',
    },
    '.jpg': {
        'canonical_mime': 'image/jpeg',
        'mimes': {'image/jpeg', 'image/pjpeg'},
        'magic_headers': [b'\xff\xd8\xff'],
        'category': 'image',
    },
    '.jpeg': {
        'canonical_mime': 'image/jpeg',
        'mimes': {'image/jpeg', 'image/pjpeg'},
        'magic_headers': [b'\xff\xd8\xff'],
        'category': 'image',
    },
    '.webp': {
        'canonical_mime': 'image/webp',
        'mimes': {'image/webp'},
        'magic_headers': [b'RIFF'],
        'category': 'image',
    },
    '.pdf': {
        'canonical_mime': 'application/pdf',
        'mimes': {'application/pdf', 'application/x-pdf'},
        'magic_headers': [b'%PDF-'],
        'category': 'document',
    },
}

def check_filename_safety(raw_name):
    """
    Checks for null bytes, path traversal sequences, and compound double-extensions.
    Returns: Cleaned extension (e.g. '.png').
    """
    if not raw_name or not isinstance(raw_name, str):
        raise ValidationError({"error": "Invalid or missing filename."})

    # 1. Null-byte injection check
    if '\x00' in raw_name or '%00' in raw_name:
        raise ValidationError({"error": "Null byte injection detected in filename."})

    # 2. Path traversal checks
    if '/' in raw_name or '\\' in raw_name or '..' in raw_name:
        raise ValidationError({"error": "Path traversal attempt detected in filename."})

    basename = os.path.basename(raw_name).strip()
    name_parts = basename.lower().split('.')

    if len(name_parts) < 2:
        raise ValidationError({"error": "File must possess a valid extension."})

    # 3. Double-extension / hidden executable check (e.g., 'payload.php.jpg')
    for part in name_parts[:-1]:
        if part in SUSPICIOUS_EMBEDDED_KEYWORDS:
            raise ValidationError({
                "error": f"Prohibited compound extension detected containing executable keyword '{part}'."
            })

    ext = f".{name_parts[-1]}"

    # 4. Check extension against allowed specifications
    if ext not in ALLOWED_SPECS or DANGEROUS_EXTENSIONS_PATTERN.search(ext):
        allowed_list = ', '.join(sorted(ALLOWED_SPECS.keys()))
        raise ValidationError({
            "error": f"Disallowed file extension '{ext}'. Only {allowed_list} are permitted."
        })

    return ext

def verify_file_binary_signatures(file_obj, ext):
    """
    Validates binary magic headers directly against the file extension spec.
    Never relies on client-provided Content-Type alone.
    """
    spec = ALLOWED_SPECS.get(ext)
    if not spec:
        raise ValidationError({"error": f"Unknown extension spec for '{ext}'."})

    initial_pos = file_obj.tell() if hasattr(file_obj, 'tell') else 0
    try:
        header = file_obj.read(32)
        if hasattr(file_obj, 'seek'):
            file_obj.seek(initial_pos)

        if not header:
            raise ValidationError({"error": "Empty file stream received."})

        # Check PNG
        if ext == '.png':
            if not header.startswith(b'\x89PNG\r\n\x1a\n'):
                raise ValidationError({"error": "File signature mismatch: expected valid PNG header."})

        # Check JPEG
        elif ext in ('.jpg', '.jpeg'):
            if not header.startswith(b'\xff\xd8\xff'):
                raise ValidationError({"error": "File signature mismatch: expected valid JPEG header."})

        # Check WEBP (RIFF at 0..3, WEBP at 8..11)
        elif ext == '.webp':
            if len(header) < 12 or not (header.startswith(b'RIFF') and header[8:12] == b'WEBP'):
                raise ValidationError({"error": "File signature mismatch: expected valid RIFF/WEBP header."})

        # Check PDF
        elif ext == '.pdf':
            if not header.startswith(b'%PDF-'):
                raise ValidationError({"error": "File signature mismatch: expected valid PDF header."})

            # Deep scan for dangerous PDF active content (/Launch, /JavaScript, /EmbeddedFiles)
            file_obj.seek(0)
            sample_content = file_obj.read(128 * 1024) # Scan first 128KB
            file_obj.seek(initial_pos)

            dangerous_pdf_tokens = [b'/Launch', b'/EmbeddedFiles', b'/JavaScript', b'/JS ']
            for token in dangerous_pdf_tokens:
                if token in sample_content:
                    raise ValidationError({
                        "error": f"PDF rejected: contains active executable stream or embedded script ({token.decode('ascii')})."
                    })

    except ValidationError:
        raise
    except Exception as e:
        if hasattr(file_obj, 'seek'):
            file_obj.seek(initial_pos)
        raise ValidationError({"error": f"Binary signature validation failed: {str(e)}"})

def verify_image_integrity_with_pillow(file_obj, ext):
    """
    Opens the image with Pillow, verifies structure, and blocks decompression bombs.
    """
    if not HAS_PIL:
        return

    if ALLOWED_SPECS.get(ext, {}).get('category') != 'image':
        return

    initial_pos = file_obj.tell() if hasattr(file_obj, 'tell') else 0
    try:
        image = Image.open(file_obj)
        image.verify()

        # Format check: ensure Pillow recognized format matches extension
        pil_format = (image.format or '').lower()
        format_map = {'jpeg': ('.jpg', '.jpeg'), 'png': ('.png',), 'webp': ('.webp',)}
        expected_exts = format_map.get(pil_format, ())

        if expected_exts and ext not in expected_exts:
            raise ValidationError({
                "error": f"Image format mismatch: file claims '{ext}' but internal image format is '{pil_format}'."
            })

        if hasattr(file_obj, 'seek'):
            file_obj.seek(initial_pos)

    except ValidationError:
        raise
    except Exception as e:
        if hasattr(file_obj, 'seek'):
            file_obj.seek(initial_pos)
        raise ValidationError({"error": f"Image integrity check failed: file appears corrupted or malformed. ({str(e)})"})

def sanitize_and_strip_image_exif(file_obj, ext):
    """
    Re-encodes an uploaded image to strip EXIF metadata, GPS coordinates,
    and embedded polyglots. Returns a clean BytesIO buffer.
    """
    if not HAS_PIL or ALLOWED_SPECS.get(ext, {}).get('category') != 'image':
        return file_obj

    initial_pos = file_obj.tell() if hasattr(file_obj, 'tell') else 0
    try:
        image = Image.open(file_obj)
        # Convert RGBA to RGB for JPEG if needed
        pil_format = 'PNG' if ext == '.png' else ('JPEG' if ext in ('.jpg', '.jpeg') else 'WEBP')
        
        if pil_format == 'JPEG' and image.mode in ('RGBA', 'P'):
            image = image.convert('RGB')

        clean_buffer = io.BytesIO()
        # Save without EXIF or extra comments
        image.save(clean_buffer, format=pil_format, quality=90, optimize=True)
        clean_buffer.seek(0)
        return clean_buffer
    except Exception:
        if hasattr(file_obj, 'seek'):
            file_obj.seek(initial_pos)
        return file_obj

def validate_and_sanitize_upload(
    uploaded_file, 
    max_size_bytes=DEFAULT_MAX_FILE_SIZE_BYTES, 
    sanitize_image=True
):
    """
    Comprehensive multi-point screening pipeline for an uploaded file.
    
    1. Size threshold validation
    2. Path traversal, null-byte, and double-extension inspection
    3. Whitelisted extension verification
    4. Client Content-Type verification
    5. Binary magic-byte header inspection (independent of client claims)
    6. PDF active content scanning
    7. Pillow structural verification & decompression bomb defense
    8. Cryptographically random UUID filename generation
    
    Returns:
        dict: {
            'safe_filename': str,
            'clean_extension': str,
            'content_type': str,
            'processed_file': BytesIO or UploadedFile,
            'size': int
        }
    """
    if not uploaded_file:
        raise ValidationError({"error": "No file payload received in request."})

    # 1. Enforce size limit
    file_size = getattr(uploaded_file, 'size', None)
    if file_size is None and hasattr(uploaded_file, 'seek') and hasattr(uploaded_file, 'tell'):
        uploaded_file.seek(0, os.SEEK_END)
        file_size = uploaded_file.tell()
        uploaded_file.seek(0)

    if file_size and file_size > max_size_bytes:
        max_mb = max_size_bytes / (1024 * 1024)
        received_mb = file_size / (1024 * 1024)
        raise ValidationError({
            "error": f"File size exceeds maximum threshold of {max_mb:.1f} MB (received {received_mb:.2f} MB)."
        })

    # 2. Filename safety & extension validation
    raw_name = getattr(uploaded_file, 'name', 'upload')
    clean_ext = check_filename_safety(raw_name)
    spec = ALLOWED_SPECS[clean_ext]

    # 3. Client Content-Type check (if provided, must match extension whitelist)
    client_content_type = getattr(uploaded_file, 'content_type', '').lower().strip()
    if client_content_type and client_content_type not in spec['mimes']:
        raise ValidationError({
            "error": f"Declared Content-Type '{client_content_type}' is invalid for extension '{clean_ext}'."
        })

    # 4. Binary signature verification
    verify_file_binary_signatures(uploaded_file, clean_ext)

    # 5. Pillow structural inspection
    verify_image_integrity_with_pillow(uploaded_file, clean_ext)

    # 6. Optional EXIF metadata stripping and re-encoding for images
    processed_stream = uploaded_file
    if sanitize_image and spec['category'] == 'image':
        processed_stream = sanitize_and_strip_image_exif(uploaded_file, clean_ext)

    # 7. Generate cryptographically isolated, non-colliding storage filename
    safe_filename = f"{uuid.uuid4().hex}{clean_ext}"

    # Determine canonical MIME type
    canonical_mime = spec.get('canonical_mime', 'application/octet-stream')

    return {
        'safe_filename': safe_filename,
        'clean_extension': clean_ext,
        'content_type': canonical_mime,
        'processed_file': processed_stream,
        'size': file_size or 0
    }

def get_secure_media_storage_path(safe_filename):
    """
    Resolves the target storage path on disk.
    Ensures storage directory is strictly outside executable paths and rejects path traversal.
    """
    media_root = getattr(settings, 'SECURE_MEDIA_ROOT', None) or getattr(settings, 'MEDIA_ROOT', None)
    if not media_root:
        media_root = Path(settings.BASE_DIR) / 'secure_uploads'

    media_root = Path(media_root).resolve()
    target_path = (media_root / safe_filename).resolve()

    # Verify path containment (prevents symlink and directory escape)
    if not str(target_path).startswith(str(media_root)):
        raise ValidationError({"error": "Path traversal violation during storage path resolution."})

    return target_path

def create_secure_file_response(file_path_or_stream, download_name, content_type=None, as_attachment=True):
    """
    Generates a hardened Django FileResponse with protective security headers:
    - X-Content-Type-Options: nosniff (Blocks MIME-sniffing)
    - Content-Disposition: attachment / inline with sanitized filename
    - Content-Security-Policy: default-src 'none'; sandbox (Blocks script execution)
    - Cache-Control: private, no-cache, no-store
    """
    clean_name = re.sub(r'[^a-zA-Z0-9_.-]', '_', download_name or 'download')
    
    if isinstance(file_path_or_stream, (str, Path)):
        resolved = Path(file_path_or_stream).resolve()
        if not resolved.exists():
            raise Http404("Requested file does not exist.")
        stream = open(resolved, 'rb')
    else:
        stream = file_path_or_stream

    response = FileResponse(
        stream, 
        as_attachment=as_attachment, 
        filename=clean_name,
        content_type=content_type or 'application/octet-stream'
    )

    # Security Headers for safe downloads
    response['X-Content-Type-Options'] = 'nosniff'
    response['Content-Security-Policy'] = "default-src 'none'; sandbox"
    response['X-Frame-Options'] = 'DENY'
    response['Cache-Control'] = 'private, no-cache, no-store, must-revalidate'

    return response
