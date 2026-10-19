"""
BrixelLabs Comprehensive File Upload Security & Validation Test Suite
Tests every defensive control using benign, harmless in-memory payloads:
1. Oversized file rejection (> 5MB)
2. Disallowed extension blocking (.exe, .php, .svg, .sh, etc.)
3. Misleading extension / magic-byte spoofing rejection (e.g. text file renamed to .png)
4. Path-traversal attempt neutralization (../, ..\\, null-bytes)
5. Dangerous compound / double-extension defense (e.g. shell.php.jpg)
6. PDF active content blocking (/Launch, /JavaScript, /EmbeddedFiles)
7. Cryptographically unique non-colliding UUID storage names
8. Safe download response security headers (nosniff, sandbox, attachment)
"""

import io
from PIL import Image
from django.test import SimpleTestCase
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework.exceptions import ValidationError

from core.upload_security import (
    validate_and_sanitize_upload,
    check_filename_safety,
    verify_file_binary_signatures,
    create_secure_file_response,
    ALLOWED_SPECS
)

class FileUploadSecurityTestCase(SimpleTestCase):
    def setUp(self):
        # 1. Generate an authentic, valid benign PNG image in memory via Pillow
        png_buf = io.BytesIO()
        img = Image.new('RGB', (16, 16), color=(0, 240, 255))
        img.save(png_buf, format='PNG')
        self.valid_png_bytes = png_buf.getvalue()
        
        # 2. Valid Benign PDF file (Minimal compliant PDF)
        self.valid_pdf_bytes = (
            b'%PDF-1.4\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n'
            b'2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n'
            b'3 0 obj\n<< /Type /Page /Parent 2 0 R >>\nendobj\nxref\n0 4\n'
            b'trailer\n<< /Root 1 0 R >>\n%%EOF'
        )

    def test_valid_png_upload_passes_and_generates_uuid_name(self):
        """A valid benign PNG upload should pass and receive a random UUID filename."""
        upload = SimpleUploadedFile("sample_diagram.png", self.valid_png_bytes, content_type="image/png")
        result = validate_and_sanitize_upload(upload)
        
        self.assertTrue(result['safe_filename'].endswith('.png'))
        self.assertEqual(len(result['safe_filename']), 32 + 4) # 32-char hex UUID + '.png'
        self.assertNotIn("sample_diagram", result['safe_filename']) # User name stripped
        self.assertEqual(result['content_type'], 'image/png')

    def test_valid_pdf_upload_passes(self):
        """A benign compliant PDF upload without active scripts should pass."""
        upload = SimpleUploadedFile("project_architecture.pdf", self.valid_pdf_bytes, content_type="application/pdf")
        result = validate_and_sanitize_upload(upload, sanitize_image=False)
        
        self.assertTrue(result['safe_filename'].endswith('.pdf'))
        self.assertEqual(result['content_type'], 'application/pdf')

    def test_oversized_file_rejection(self):
        """Files exceeding the maximum threshold (5MB) must be immediately rejected."""
        # Create an in-memory 6MB harmless dummy file
        large_bytes = b'\x89PNG\r\n\x1a\n' + (b'0' * (6 * 1024 * 1024))
        oversized = SimpleUploadedFile("large_render.png", large_bytes, content_type="image/png")
        
        with self.assertRaises(ValidationError) as ctx:
            validate_and_sanitize_upload(oversized, max_size_bytes=5 * 1024 * 1024)
        
        self.assertIn("File size exceeds maximum threshold", str(ctx.exception))

    def test_disallowed_executable_extension_rejection(self):
        """Disallowed script/executable extensions (.exe, .php, .sh, .svg) must be blocked."""
        dangerous_names = [
            "script.php",
            "agent.exe",
            "deploy.sh",
            "batch.bat",
            "vector.svg",
            "payload.jsp",
            "macro.ps1",
            "config.xml",
            "page.html"
        ]
        for name in dangerous_names:
            upload = SimpleUploadedFile(name, b"echo 'harmless test';", content_type="text/plain")
            with self.assertRaises(ValidationError) as ctx:
                validate_and_sanitize_upload(upload)
            self.assertIn("Disallowed file extension", str(ctx.exception))

    def test_misleading_extension_magic_byte_mismatch(self):
        """A text/script file disguised with a .png extension must be rejected via magic bytes."""
        fake_png = SimpleUploadedFile(
            "fake_avatar.png", 
            b"<?php echo 'harmless disguise'; ?>", 
            content_type="image/png"
        )
        with self.assertRaises(ValidationError) as ctx:
            validate_and_sanitize_upload(fake_png)
        
        self.assertIn("File signature mismatch", str(ctx.exception))

    def test_path_traversal_filename_rejection(self):
        """Filenames with directory traversal sequences (../, ..\\) must be rejected."""
        traversal_attempts = [
            "../../etc/passwd.png",
            "..\\..\\windows\\win.ini.png",
            "subdir/../test.png",
            "....//test.png"
        ]
        for name in traversal_attempts:
            with self.assertRaises(ValidationError) as ctx:
                check_filename_safety(name)
            self.assertIn("Path traversal attempt detected", str(ctx.exception))

    def test_null_byte_injection_rejection(self):
        """Filenames with null bytes must be detected and rejected."""
        null_byte_name = "report.png\x00.exe"
        with self.assertRaises(ValidationError) as ctx:
            check_filename_safety(null_byte_name)
        self.assertIn("Null byte injection detected", str(ctx.exception))

    def test_compound_double_extension_rejection(self):
        """Compound double extensions (e.g. shell.php.jpg) must be rejected."""
        double_exts = [
            "backdoor.php.png",
            "invoice.exe.jpg",
            "exploit.sh.webp",
            "script.jsp.pdf"
        ]
        for name in double_exts:
            with self.assertRaises(ValidationError) as ctx:
                check_filename_safety(name)
            self.assertIn("Prohibited compound extension detected", str(ctx.exception))

    def test_pdf_active_javascript_payload_rejection(self):
        """PDF files containing active execution tokens (/Launch, /JavaScript, /JS) must be rejected."""
        malicious_pdf_bytes = (
            b'%PDF-1.4\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R /OpenAction 4 0 R >>\nendobj\n'
            b'4 0 obj\n<< /S /JavaScript /JS (app.alert("harmless test");) >>\nendobj\n%%EOF'
        )
        upload = SimpleUploadedFile("interactive_spec.pdf", malicious_pdf_bytes, content_type="application/pdf")
        with self.assertRaises(ValidationError) as ctx:
            validate_and_sanitize_upload(upload, sanitize_image=False)
        
        self.assertIn("active executable stream or embedded script", str(ctx.exception))

    def test_safe_download_headers(self):
        """create_secure_file_response must attach nosniff, CSP sandbox, and attachment disposition."""
        dummy_stream = io.BytesIO(b"harmless download content")
        response = create_secure_file_response(
            dummy_stream, 
            download_name="client_document.pdf", 
            content_type="application/pdf", 
            as_attachment=True
        )
        
        self.assertEqual(response['X-Content-Type-Options'], 'nosniff')
        self.assertEqual(response['Content-Security-Policy'], "default-src 'none'; sandbox")
        self.assertEqual(response['X-Frame-Options'], 'DENY')
        self.assertIn('attachment', response['Content-Disposition'])
        self.assertIn('client_document.pdf', response['Content-Disposition'])
