from rest_framework import viewsets, filters, status
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import action
from rest_framework.response import Response
from apps.authentication.permissions import HasRolePermission
from .models import Product
from .serializers import ProductSerializer, ProductApprovalSerializer
from .permissions import ProductPermission
from .filters import ProductFilter

class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    permission_classes = [ProductPermission]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = ProductFilter
    search_fields = ['name', 'description']
    ordering_fields = ['created_at', 'price', 'name']
    
    def get_queryset(self):
        user = self.request.user
        
        detail_actions = ['retrieve', 'update', 'partial_update', 'destroy', 'approve']
        if self.action in detail_actions or (self.action == 'list_internal' and user.is_authenticated):
            if user.is_authenticated:
                return Product.objects.filter(business=user.business)
            return Product.objects.filter(status='approved')
        
        # Public list
        return Product.objects.filter(status='approved')
    
    def perform_create(self, serializer):
        # Allow initial status if provided (e.g. pending_approval)
        status = serializer.validated_data.get('status', 'draft')
        serializer.save(
            created_by=self.request.user,
            business=self.request.user.business,
            status=status
        )
    
    @action(detail=True, methods=['post'])
    def approve(self, request, pk=None):
        product = self.get_object()
        if product.status == 'approved':
            return Response({'error': 'Product already approved'}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = ProductApprovalSerializer(data=request.data)
        if serializer.is_valid():
            product.approve(request.user)
            return Response(ProductSerializer(product).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['get'])
    def list_internal(self, request):
        """List all products for internal users with filtering"""
        queryset = self.filter_queryset(Product.objects.filter(business=request.user.business))
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
