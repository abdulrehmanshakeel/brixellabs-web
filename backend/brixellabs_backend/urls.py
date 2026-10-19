"""
URL configuration for brixellabs_backend project.
"""

import os
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

# Protect internal Django admin portal URL behind an unguessable or non-default route
_admin_slug = os.environ.get('DJANGO_ADMIN_URL', 'django-admin').strip('/')

urlpatterns = [
    path(f'{_admin_slug}/', admin.site.urls),
    path('api/', include('core.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
