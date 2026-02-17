from django.db import models
from django.core.validators import MinValueValidator
from django.utils import timezone

class Product(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('pending_approval', 'Pending Approval'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]
    
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    
    business = models.ForeignKey('authentication.Business', on_delete=models.CASCADE, related_name='products')
    created_by = models.ForeignKey('authentication.User', on_delete=models.SET_NULL, null=True, related_name='created_products')
    approved_by = models.ForeignKey('authentication.User', on_delete=models.SET_NULL, null=True, blank=True, related_name='approved_products')
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    approved_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        indexes = [
            models.Index(fields=['business', 'status']),
            models.Index(fields=['created_at']),
        ]
        ordering = ['-created_at']
    
    def approve(self, user):
        self.status = 'approved'
        self.approved_by = user
        self.approved_at = timezone.now()
        self.save()
