"""
BrixelLabs Enterprise Two-Factor Authentication (2FA / TOTP)
Pure Python RFC 6238 Time-Based One-Time Password Engine.
Zero external dependencies; fully compatible with Google Authenticator,
Microsoft Authenticator, Authy, and 1Password.
"""

import hmac
import hashlib
import struct
import time
import base64
import os
import secrets

# Standard RFC 6238 parameters
TIME_STEP_SECONDS = 30
DIGITS = 6

def generate_base32_secret(num_bytes=20):
    """
    Generates a cryptographically strong 160-bit random secret key encoded in Base32.
    """
    random_bytes = os.urandom(num_bytes)
    return base64.b32encode(random_bytes).decode('utf-8').replace('=', '')

def generate_backup_codes(count=6):
    """
    Generates single-use 8-digit numeric emergency backup recovery codes.
    Returns: List of plaintext codes for display to the user, and list of hashes for storage.
    """
    plaintext_codes = []
    hashed_codes = []
    for _ in range(count):
        code = f"{secrets.randbelow(100000000):08d}"
        code_formatted = f"{code[:4]}-{code[4:]}"
        plaintext_codes.append(code_formatted)
        
        # Hash code with SHA-256 for secure storage
        code_hash = hashlib.sha256(code_formatted.encode('utf-8')).hexdigest()
        hashed_codes.append(code_hash)

    return plaintext_codes, hashed_codes

def get_totp_token(secret_base32, for_time=None):
    """
    Computes the 6-digit TOTP token for a given timestamp according to RFC 6238.
    """
    if for_time is None:
        for_time = time.time()

    # Time counter step
    time_counter = int(for_time // TIME_STEP_SECONDS)

    # Pad base32 secret if needed
    secret_padded = secret_base32.upper()
    missing_padding = len(secret_padded) % 8
    if missing_padding != 0:
        secret_padded += '=' * (8 - missing_padding)

    try:
        key = base64.b32decode(secret_padded)
    except Exception:
        return None

    # Pack time counter into 8 big-endian bytes
    msg = struct.pack(">Q", time_counter)

    # Compute HMAC-SHA1 digest
    digest = hmac.new(key, msg, hashlib.sha1).digest()

    # Dynamic truncation
    offset = digest[-1] & 0x0F
    code_binary = (
        (digest[offset] & 0x7F) << 24
        | (digest[offset + 1] & 0xFF) << 16
        | (digest[offset + 2] & 0xFF) << 8
        | (digest[offset + 3] & 0xFF)
    )

    totp_value = code_binary % (10 ** DIGITS)
    return f"{totp_value:0{DIGITS}d}"

def verify_totp_code(secret_base32, user_code, window=1):
    """
    Verifies a user-entered TOTP code against the secret key.
    Includes a time window (±1 step / 30 seconds) to account for slight clock drift.
    """
    if not secret_base32 or not user_code:
        return False

    cleaned_code = str(user_code).strip().replace(' ', '').replace('-', '')
    current_time = time.time()

    # Check current step, previous step (-30s), and next step (+30s)
    for offset in range(-window, window + 1):
        test_time = current_time + (offset * TIME_STEP_SECONDS)
        valid_token = get_totp_token(secret_base32, test_time)
        if valid_token and hmac.compare_digest(valid_token, cleaned_code):
            return True

    return False

def format_otpauth_uri(secret_base32, username, issuer='BrixelLabs'):
    """
    Generates standard otpauth:// URI for rendering as a QR code in authenticator apps.
    """
    clean_issuer = issuer.replace(' ', '%20')
    clean_user = username.replace(' ', '%20')
    return f"otpauth://totp/{clean_issuer}:{clean_user}?secret={secret_base32}&issuer={clean_issuer}&algorithm=SHA1&digits={DIGITS}&period={TIME_STEP_SECONDS}"
