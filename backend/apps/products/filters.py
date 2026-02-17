import django_filters
from .models import Product

class ProductFilter(django_filters.FilterSet):
    min_price = django_filters.NumberFilter(field_name="price", lookup_expr='gte')
    max_price = django_filters.NumberFilter(field_name="price", lookup_expr='lte')
    business = django_filters.CharFilter(field_name="business__name", lookup_expr='icontains')
    
    class Meta:
        model = Product
        fields = ['status', 'business', 'min_price', 'max_price']
