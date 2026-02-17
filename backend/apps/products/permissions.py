from rest_framework import permissions

class ProductPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if view.action in ['list', 'retrieve']:
            return True
        if not request.user.is_authenticated:
            return False
            
        pass_map = {
            'create': ['admin', 'editor', 'approver'],
            'update': ['admin', 'editor', 'approver'],
            'partial_update': ['admin', 'editor', 'approver'],
            'destroy': ['admin'],
            'approve': ['admin', 'approver'],
        }
        
        if view.action in pass_map:
            return request.user.role and request.user.role.name in pass_map[view.action]
            
        return True

    def has_object_permission(self, request, view, obj):
        if view.action in ['retrieve']:
            if obj.status == 'approved':
                return True
            if request.user.is_authenticated and obj.business == request.user.business:
                return True
            return False
            
        if not request.user.is_authenticated:
            return False
            
        # Edit/Delete only own business products
        if obj.business != request.user.business:
            return False
            
        return True
