from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Business, Role

User = get_user_model()

class BusinessSerializer(serializers.ModelSerializer):
    class Meta:
        model = Business
        fields = ['id', 'name', 'created_at']

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ['id', 'name', 'permissions']

class UserSerializer(serializers.ModelSerializer):
    business = BusinessSerializer(read_only=True)
    role = serializers.SlugRelatedField(
        slug_field='name', 
        queryset=Role.objects.all(),
        required=False
    )
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'business', 'role', 'is_business_admin', 'password']

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = super().create(validated_data)
        if password:
            user.set_password(password)
            user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        user = super().update(instance, validated_data)
        if password:
            user.set_password(password)
            user.save()
        return user

class RegisterSerializer(serializers.ModelSerializer):
    business_name = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'business_name']

    def create(self, validated_data):
        business_name = validated_data.pop('business_name')
        business, _ = Business.objects.get_or_create(name=business_name)
        
        # Default role for new user creating business is admin
        role, _ = Role.objects.get_or_create(name='admin')
        
        user = User.objects.create_user(
            **validated_data,
            business=business,
            role=role,
            is_business_admin=True
        )
        return user
