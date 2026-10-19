from rest_framework import permissions

class IsAdminOrReadOnly(permissions.BasePermission):
    """
    Allow GET / read-only access for all public users,
    STRICTLY require authenticated Staff/Superuser credentials for any state mutation (POST, PUT, PATCH, DELETE).
    Never trust browser claims or non-staff users.
    """
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_authenticated and request.user.is_staff)


class InquiryPermission(permissions.BasePermission):
    """
    Allow public visitors to submit an inquiry (POST).
    STRICTLY require authenticated Staff/Superuser credentials to list, view details, edit, or delete leads.
    """
    def has_permission(self, request, view):
        if request.method == 'POST':
            return True
        # Reading or managing client leads requires staff authorization
        return bool(request.user and request.user.is_authenticated and request.user.is_staff)


class IsStrictStaffUser(permissions.BasePermission):
    """
    Strict permission requiring authenticated staff/admin credentials.
    Rejects any unauthenticated or non-staff user tokens.
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_staff)

