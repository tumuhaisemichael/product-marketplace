from django.contrib.auth.models import AbstractUser
from django.db import models

class Business(models.Model):
    name = models.CharField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Role(models.Model):
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('editor', 'Editor'),
        ('approver', 'Approver'),
        ('viewer', 'Viewer'),
    ]
    name = models.CharField(max_length=50, choices=ROLE_CHOICES, unique=True)
    permissions = models.JSONField(default=dict)  # Store permissions as JSON

    def __str__(self):
        return self.name

class User(AbstractUser):
    business = models.ForeignKey(Business, on_delete=models.CASCADE, related_name='users', null=True)
    role = models.ForeignKey(Role, on_delete=models.SET_NULL, null=True)
    is_business_admin = models.BooleanField(default=False)
    
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['email', 'business'], name='unique_email_per_business')
        ]
