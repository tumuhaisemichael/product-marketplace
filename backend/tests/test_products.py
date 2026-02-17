import pytest
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from apps.products.models import Product
from apps.authentication.models import Role, Business

User = get_user_model()

@pytest.fixture
def api_client():
    return APIClient()

@pytest.fixture
def business():
    return Business.objects.create(name="Test Business")

@pytest.fixture
def admin_role():
    return Role.objects.create(name='admin', permissions={})

@pytest.fixture
def user(business, admin_role):
    return User.objects.create_user(username='testuser', password='password', business=business, role=admin_role)

@pytest.mark.django_db
class TestProductAPI:
    def test_create_product(self, api_client, user):
        api_client.force_authenticate(user=user)
        data = {'name': 'New Product', 'description': 'Description', 'price': '10.00', 'status': 'draft'}
        response = api_client.post('/api/products/', data)
        assert response.status_code == status.HTTP_201_CREATED
        assert Product.objects.count() == 1
        assert Product.objects.get().name == 'New Product'

    def test_unauthenticated_cannot_create_product(self, api_client):
        data = {'name': 'New Product', 'description': 'Description', 'price': '10.00'}
        response = api_client.post('/api/products/', data)
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_approve_product(self, api_client, user):
        # Setup product
        product = Product.objects.create(
            name='Draft Product', 
            description='Desc', 
            price='10.00', 
            status='draft',
            business=user.business,
            created_by=user
        )
        api_client.force_authenticate(user=user)
        
        # Approve
        url = f'/api/products/{product.id}/approve/'
        response = api_client.post(url, {'approved': True})
        
        assert response.status_code == status.HTTP_200_OK
        product.refresh_from_db()
        assert product.status == 'approved'
