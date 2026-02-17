from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    business_name = serializers.CharField(source='business.name', read_only=True)
    created_by_name = serializers.CharField(source='created_by.username', read_only=True)
    
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'description', 'price', 'status',
            'business', 'business_name',
            'created_by', 'created_by_name',
            'approved_by', 'created_at', 'updated_at', 'approved_at'
        ]
        read_only_fields = ['business', 'created_by', 'approved_by', 'approved_at']

    def validate_status(self, value):
        if value == 'approved':
            # Only allowed through the specialized approve action
            raise serializers.ValidationError("Cannot set status to approved directly.")
        return value

class ProductApprovalSerializer(serializers.Serializer):
    approved = serializers.BooleanField()
