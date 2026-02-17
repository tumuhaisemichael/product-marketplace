from rest_framework import permissions

class HasRolePermission(permissions.BasePermission):
    """
    Custom permission to check if user has specific role and permission.
    """
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        
        # Define permission mappings
        required_permissions = {
            'create_product': ['admin', 'editor'],
            'edit_product': ['admin', 'editor'],
            'approve_product': ['admin', 'approver'],
            'delete_product': ['admin'],
            'manage_users': ['admin'],
        }
        
        action = getattr(view, 'action_permission', None)
        if not action:
            return True
            
        return request.user.role.name in required_permissions.get(action, [])
