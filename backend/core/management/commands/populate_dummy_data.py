from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from apps.authentication.models import Business, Role
from apps.products.models import Product
from apps.chat.models import ChatHistory
from faker import Faker
import random

User = get_user_model()
fake = Faker()

class Command(BaseCommand):
    help = 'Populate the database with dummy data'

    def handle(self, *args, **options):
        self.stdout.write('Creating roles...')
        roles = ['admin', 'editor', 'approver', 'viewer']
        role_objs = {}
        for role_name in roles:
            role, created = Role.objects.get_or_create(name=role_name)
            role_objs[role_name] = role
        
        self.stdout.write('Creating businesses...')
        businesses = []
        for _ in range(3):
            business = Business.objects.create(name=fake.company())
            businesses.append(business)

        self.stdout.write('Creating users...')
        users = []
        for business in businesses:
            # Create users for each role in each business
            for role_name, role_obj in role_objs.items():
                username = f"{role_name}_{business.id}"
                email = f"{role_name}_{business.id}@example.com"
                if not User.objects.filter(username=username).exists():
                    user = User.objects.create_user(
                        username=username,
                        email=email,
                        password='password123',
                        business=business,
                        role=role_obj,
                        is_business_admin=(role_name == 'admin')
                    )
                    users.append(user)

        self.stdout.write('Creating products...')
        statuses = ['draft', 'pending_approval', 'approved', 'rejected']
        for _ in range(20):
            business = random.choice(businesses)
            creator = random.choice([u for u in users if u.business == business and u.role.name in ['admin', 'editor']])
            status = random.choice(statuses)
            
            product = Product.objects.create(
                name=fake.bs().title(), # 'bs' gives somewhat business-y phrases
                description=fake.catch_phrase(),
                price=round(random.uniform(10.0, 500.0), 2),
                status=status,
                business=business,
                created_by=creator
            )
            
            if status == 'approved':
                approver = random.choice([u for u in users if u.business == business and u.role.name in ['admin', 'approver']])
                product.approve(approver) # This uses the model method

        self.stdout.write('Creating chat history...')
        for _ in range(10):
            user = random.choice(users)
            ChatHistory.objects.create(
                user=user,
                business=user.business,
                user_message=fake.sentence(),
                ai_response=fake.paragraph()
            )

        self.stdout.write(self.style.SUCCESS('Successfully populated database'))
