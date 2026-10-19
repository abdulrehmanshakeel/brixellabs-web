"""
Django settings for brixellabs_backend project.
Configured with resilient PostgreSQL database support.
"""

import os
import socket
from pathlib import Path
from datetime import timedelta
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

try:
    import dotenv
    # Load environment variables from .env file if present
    dotenv.load_dotenv(BASE_DIR / '.env', override=True)
except ImportError:
    pass

try:
    import dj_database_url
except ImportError:
    dj_database_url = None


import secrets

# ==============================================================================
# Security & Secret Key Configuration
# ==============================================================================
# If DJANGO_SECRET_KEY is not provided, generate a cryptographically secure 64-char key
SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY')
if not SECRET_KEY:
    _generated_key = secrets.token_urlsafe(64)
    SECRET_KEY = _generated_key

# Debug Mode: Strictly OFF by default. Only enable if DJANGO_DEBUG=True is explicitly set in .env
DEBUG = os.environ.get('DJANGO_DEBUG', 'False').lower() in ('true', '1', 't')

# Strict Host Header Filtering to prevent Host Header Poisoning
_raw_hosts = os.environ.get('ALLOWED_HOSTS', '')
if _raw_hosts:
    ALLOWED_HOSTS = [h.strip() for h in _raw_hosts.split(',') if h.strip()]
else:
    # Safe defaults
    ALLOWED_HOSTS = [
        'localhost', 
        '127.0.0.1', 
        '.vercel.app', 
        '.brixellabs.com', 
        'brixellabs.com'
    ]
    if DEBUG:
        ALLOWED_HOSTS.append('*')

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Third Party Packages
    'corsheaders',
    'rest_framework',
    'rest_framework_simplejwt',

    # Local Apps
    'core.apps.CoreConfig',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# Security Headers & Cookie Protection
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = 'DENY'
SECURE_REFERRER_POLICY = 'strict-origin-when-cross-origin'
SECURE_CROSS_ORIGIN_OPENER_POLICY = 'same-origin'

if not DEBUG:
    SECURE_SSL_REDIRECT = os.environ.get('SECURE_SSL_REDIRECT', 'True').lower() in ('true', '1')
    SECURE_HSTS_SECONDS = int(os.environ.get('SECURE_HSTS_SECONDS', 31536000))
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True

SESSION_COOKIE_HTTPONLY = True
CSRF_COOKIE_HTTPONLY = True
SESSION_COOKIE_SAMESITE = 'Lax'
CSRF_COOKIE_SAMESITE = 'Lax'

ROOT_URLCONF = 'brixellabs_backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'brixellabs_backend.wsgi.application'

# ==============================================================================
# Database Configuration (PostgreSQL / Supabase Engine with Auto-Detection)
# ==============================================================================
DATABASE_URL = os.environ.get('DATABASE_URL')
DB_ENGINE = os.environ.get('DB_ENGINE', 'postgresql').lower()
IS_VERCEL = 'VERCEL' in os.environ

def get_database_config():
    if DATABASE_URL and dj_database_url:
        # Require SSL when connecting to Supabase or hosted cloud postgres
        is_cloud_db = 'supabase.com' in DATABASE_URL or 'neon.tech' in DATABASE_URL or IS_VERCEL
        config = dj_database_url.config(
            default=DATABASE_URL,
            conn_max_age=0 if IS_VERCEL else 600,
            conn_health_checks=True,
            ssl_require=is_cloud_db
        )
        if is_cloud_db:
            config['DISABLE_SERVER_SIDE_CURSORS'] = True
        return config
    
    if DB_ENGINE == 'postgresql':
        host = os.environ.get('POSTGRES_HOST', 'localhost')
        port = int(os.environ.get('POSTGRES_PORT', '5432'))
        
        # Test if PostgreSQL server is currently listening on port
        try:
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            sock.settimeout(0.5)
            result = sock.connect_ex((host, port))
            sock.close()
            if result == 0:
                return {
                    'ENGINE': 'django.db.backends.postgresql',
                    'NAME': os.environ.get('POSTGRES_DB', 'brixellabs_db'),
                    'USER': os.environ.get('POSTGRES_USER', 'postgres'),
                    'PASSWORD': os.environ.get('POSTGRES_PASSWORD', 'postgres'),
                    'HOST': host,
                    'PORT': str(port),
                    'CONN_MAX_AGE': 600,
                }
        except Exception:
            pass
        
        # If Postgres is not running locally, use SQLite fallback
        print("[INFO] PostgreSQL service not detected on port 5432. Using SQLite database.")

    return {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }

DATABASES = {
    'default': get_database_config()
}

# ==============================================================================
# High-Performance Caching Layer (Redis / In-Memory LocMemCache)
# ==============================================================================
REDIS_URL = os.environ.get('REDIS_URL') or os.environ.get('KV_URL')
if REDIS_URL:
    CACHES = {
        'default': {
            'BACKEND': 'django.core.cache.backends.redis.RedisCache',
            'LOCATION': REDIS_URL,
            'TIMEOUT': 600,
            'KEY_PREFIX': 'brixel_cache',
        }
    }
else:
    CACHES = {
        'default': {
            'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
            'LOCATION': 'brixellabs-locmem-cache',
            'TIMEOUT': 600,
            'OPTIONS': {
                'MAX_ENTRIES': 5000,
                'CULL_FREQUENCY': 3,
            }
        }
    }

# Password hashing & validation
PASSWORD_HASHERS = [
    'django.contrib.auth.hashers.PBKDF2PasswordHasher',
    'django.contrib.auth.hashers.PBKDF2SHA1PasswordHasher',
    'django.contrib.auth.hashers.Argon2PasswordHasher',
    'django.contrib.auth.hashers.BCryptSHA256PasswordHasher',
]

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
        'OPTIONS': {
            'min_length': 10,
        }
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Asia/Karachi'
USE_I18N = True
USE_TZ = True


# Static files (CSS, JavaScript, Images)
STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

# ==============================================================================
# Media & File Upload Security Configuration
# ==============================================================================
# Media files (Uploaded project screenshots, logos, documents)
MEDIA_URL = 'media/'
MEDIA_ROOT = Path(os.environ.get('MEDIA_ROOT', BASE_DIR / 'media')).resolve()
SECURE_MEDIA_ROOT = Path(os.environ.get('SECURE_MEDIA_ROOT', MEDIA_ROOT)).resolve()

# Strict upload file permissions: prevent executable bits on uploaded files
FILE_UPLOAD_PERMISSIONS = 0o644
FILE_UPLOAD_DIRECTORY_PERMISSIONS = 0o755

# Server-side upload payload ceilings (Prevents buffer starvation and memory exhaustion)
FILE_UPLOAD_MAX_MEMORY_SIZE = 2 * 1024 * 1024  # 2MB in memory before spooling to disk
DATA_UPLOAD_MAX_MEMORY_SIZE = 5 * 1024 * 1024  # 5MB maximum request payload

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# ==============================================================================
# CORS (Cross-Origin Resource Sharing) Configuration
# ==============================================================================
# Never allow all origins with credentials; strictly lock down to explicit whitelist
CORS_ALLOW_ALL_ORIGINS = False
CORS_ALLOW_CREDENTIALS = True
CORS_PREFLIGHT_MAX_AGE = 86400

_custom_cors = os.environ.get('CORS_ALLOWED_ORIGINS', '')
if _custom_cors:
    CORS_ALLOWED_ORIGINS = [c.strip() for c in _custom_cors.split(',') if c.strip()]
else:
    CORS_ALLOWED_ORIGINS = [
        'http://localhost:5173',
        'http://127.0.0.1:5173',
        'http://localhost:4173',
        'http://127.0.0.1:4173',
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'https://brixellabs.com',
        'https://www.brixellabs.com',
    ]

CORS_ALLOWED_ORIGIN_REGEXES = [
    r"^https:\/\/.*\.vercel\.app$",
    r"^https:\/\/.*\.brixellabs\.com$",
]

# ==============================================================================
# Django REST Framework Configuration & API Rate Limiting / Throttling
# ==============================================================================
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ),
    # Defend against DDoS, credential stuffing, and bot form spam
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
        'rest_framework.throttling.UserRateThrottle',
        'rest_framework.throttling.ScopedRateThrottle',
    ],
    'DEFAULT_THROTTLE_RATES': {
        'anon': '60/min',
        'user': '300/min',
        'inquiry_create': '10/hour',
        'newsletter': '5/hour',
        'auth_login': '5/min',
        'crash_report': '60/min',
    },
    'DEFAULT_PAGINATION_CLASS': None,
    'EXCEPTION_HANDLER': 'core.exceptions.custom_exception_handler',
}

# Simple JWT Configuration - Enforce secure token lifetimes and Bearer header
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': False,
    'AUTH_HEADER_TYPES': ('Bearer',),
}

# ==============================================================================
# Email (SMTP) Configuration for Lead & Consultation Notifications
# ==============================================================================
EMAIL_BACKEND = os.environ.get('EMAIL_BACKEND', 'django.core.mail.backends.smtp.EmailBackend')
EMAIL_HOST = os.environ.get('EMAIL_HOST', 'smtp.gmail.com')
EMAIL_PORT = int(os.environ.get('EMAIL_PORT', 587))

# Auto-detect TLS vs SSL based on port if not explicitly set
_use_tls_env = os.environ.get('EMAIL_USE_TLS')
_use_ssl_env = os.environ.get('EMAIL_USE_SSL')

if _use_ssl_env is not None:
    EMAIL_USE_SSL = _use_ssl_env.lower() in ('true', '1', 'yes')
    EMAIL_USE_TLS = False if EMAIL_USE_SSL else (_use_tls_env.lower() in ('true', '1', 'yes') if _use_tls_env else False)
elif _use_tls_env is not None:
    EMAIL_USE_TLS = _use_tls_env.lower() in ('true', '1', 'yes')
    EMAIL_USE_SSL = False
else:
    # Defaults: Port 465 uses SSL, Port 587 uses TLS
    if EMAIL_PORT == 465:
        EMAIL_USE_SSL = True
        EMAIL_USE_TLS = False
    else:
        EMAIL_USE_TLS = True
        EMAIL_USE_SSL = False

EMAIL_HOST_USER = os.environ.get('EMAIL_HOST_USER', '').strip()
EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_HOST_PASSWORD', '').strip()
DEFAULT_FROM_EMAIL = os.environ.get('DEFAULT_FROM_EMAIL', EMAIL_HOST_USER or 'brixellabs@gmail.com').strip()
ADMIN_NOTIFICATION_EMAIL = os.environ.get('ADMIN_NOTIFICATION_EMAIL', EMAIL_HOST_USER or 'brixellabs@gmail.com').strip()
EMAIL_TIMEOUT = int(os.environ.get('EMAIL_TIMEOUT', 15))

# HTTP-based Email APIs (Bypasses Render Free Tier SMTP port blocks completely)
RESEND_API_KEY = os.environ.get('RESEND_API_KEY', '').strip()
BREVO_API_KEY = os.environ.get('BREVO_API_KEY', '').strip()

# ==============================================================================
# Security Hardened Logging Infrastructure (Redacts Passwords, Tokens, DB URLs)
# ==============================================================================
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'filters': {
        'mask_sensitive_data': {
            '()': 'core.logging_filters.MaskSensitiveDataFilter',
        },
    },
    'formatters': {
        'verbose': {
            'format': '[{asctime}] {levelname} [{name}:{lineno}] {message}',
            'style': '{',
        },
        'simple': {
            'format': '{levelname} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'filters': ['mask_sensitive_data'],
            'formatter': 'verbose',
        },
    },
    'root': {
        'handlers': ['console'],
        'level': os.environ.get('DJANGO_LOG_LEVEL', 'INFO'),
    },
    'loggers': {
        'django.request': {
            'handlers': ['console'],
            'level': 'ERROR',
            'propagate': False,
        },
        'django.security': {
            'handlers': ['console'],
            'level': 'WARNING',
            'propagate': False,
        },
        'core': {
            'handlers': ['console'],
            'level': 'INFO',
            'propagate': False,
        },
    },
}



