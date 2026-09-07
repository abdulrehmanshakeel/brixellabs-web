from rest_framework import permissions

class IsAdminOrReadOnly(permissions.BasePermission):
    """
    Allow GET / read-only access for all users,
    require Admin/Staff authentication for state mutations (POST, PUT, PATCH, DELETE).
    """
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(request.user and (request.user.is_authenticated or request.user.is_staff))


class InquiryPermission(permissions.BasePermission):
    """
    Allow anyone to submit an inquiry (POST),
    require authentication to list, view details, edit, or delete leads.
    """
    def has_permission(self, request, view):
        if request.method == 'POST':
            return True
        # Read/Manage requires auth
        return bool(request.user and request.user.is_authenticated)
