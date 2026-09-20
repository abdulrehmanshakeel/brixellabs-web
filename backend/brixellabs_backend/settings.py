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


# Quick-start development settings - unsuitable for production
SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY', 'django-insecure-brixellabs-cyber-secret-key-2026-prod-ready')

DEBUG = os.environ.get('DJANGO_DEBUG', 'True') == 'True'

ALLOWED_HOSTS = ['*', '.vercel.app', 'localhost', '127.0.0.1']

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
        return dj_database_url.config(
            default=DATABASE_URL,
            conn_max_age=0 if IS_VERCEL else 600,
            conn_health_checks=True,
            ssl_require=is_cloud_db
        )
    
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

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
]

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

# Media files (Uploaded project screenshots, logos, documents)
MEDIA_URL = 'media/'
MEDIA_ROOT = BASE_DIR / 'media'

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# CORS Configuration
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOWED_ORIGINS = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
]

# Django REST Framework Configuration
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ),
    'DEFAULT_PAGINATION_CLASS': None,
}

# Simple JWT Configuration
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=7),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=30),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': False,
    'AUTH_HEADER_TYPES': ('Bearer', 'JWT'),
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


