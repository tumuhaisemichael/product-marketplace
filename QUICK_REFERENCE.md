# Project Quick Reference Guide

## 🚀 Quick Start Commands

```bash
# Start everything
docker-compose up

# Run migrations
docker-compose exec backend python manage.py migrate

# Create admin user
docker-compose exec backend python manage.py createsuperuser

# Generate dummy data
docker-compose exec backend python manage.py populate_dummy_data

# Run backend tests
docker-compose exec backend pytest

# Run frontend tests
docker-compose exec frontend npm test

# Stop all containers
docker-compose down

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend
```

---

## 📱 Frontend Pages & Routes

| Route | Component | Auth Required | Purpose |
|-------|-----------|---|---------|
| `/` | HomePage | ❌ | Landing page, hero section |
| `/products` | PublicProductsPage | ❌ | Browse approved products |
| `/login` | LoginPage | ❌ | User login |
| `/register` | RegisterPage | ❌ | New user registration |
| `/dashboard` | DashboardLayout | ✅ | Main dashboard wrapper |
| `/dashboard/products` | ProductsListPage | ✅ | User's business products |
| `/dashboard/products/create` | CreateProductPage | ✅ | Create new product form |
| `/dashboard/products/[id]` | EditProductPage | ✅ | Edit existing product |
| `/dashboard/users` | UsersPage | ✅ | Team management (admin) |
| `/dashboard/settings` | SettingsPage | ✅ | Business settings |

---

## 🔌 API Endpoints Reference

### Authentication
```
POST   /api/auth/register/           Create account
POST   /api/auth/login/              Get JWT tokens
POST   /api/auth/refresh/            Refresh access token
GET    /api/auth/me/                 Get current user
GET    /api/auth/users/              List team members
POST   /api/auth/users/              Add team member
GET    /api/auth/roles/              List roles
```

### Products
```
GET    /api/products/                Public products (approved only)
POST   /api/products/                Create product
GET    /api/products/{id}/           Get product details
PATCH  /api/products/{id}/           Update product
DELETE /api/products/{id}/           Delete product
POST   /api/products/{id}/approve/   Approve product
GET    /api/products/list_internal/  All business products
```

### Chat
```
GET    /api/chat/history/            Get chat history (paginated)
POST   /api/chat/history/            Save message
POST   /api/chat                     Send message to AI (Next.js route)
```

---

## 🗂️ Project Structure at a Glance

```
product-marketplace/
├── frontend/                 # React/Next.js app (port 3000)
│   ├── app/                 # Next.js App Router
│   ├── components/          # Reusable UI components
│   ├── lib/                 # Utilities, hooks, API client
│   └── public/              # Static assets
│
├── backend/                 # Django REST API (port 8000)
│   ├── apps/
│   │   ├── authentication/  # Users, roles, business
│   │   ├── products/        # Product management
│   │   └── chat/            # Chat history storage
│   ├── config/              # Django settings, URLs
│   └── manage.py            # Django CLI
│
├── docker-compose.yml       # Container orchestration
├── .env                     # Environment variables (git-ignored)
├── .env.example             # Template (safe to commit)
└── README.md                # Project documentation
```

---

## 🔑 Environment Variables

### Required (.env file)
```
# Frontend
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
OPENROUTER_API_KEY=sk-or-v1-xxxxx

# Backend
DATABASE_URL=postgresql://...
SECRET_KEY=your-secret-key
DEBUG=True
CORS_ALLOWED_ORIGINS=http://localhost:3000

# Database
POSTGRES_DB=product_marketplace
POSTGRES_USER=user
POSTGRES_PASSWORD=password
```

---

## 👥 User Roles & Permissions

| Role | Create | Edit | Approve | Delete | Manage Users |
|------|--------|------|---------|--------|--------------|
| **Admin** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Editor** | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Approver** | ❌ | ❌ | ✅ | ❌ | ❌ |
| **Viewer** | ❌ | ❌ | ❌ | ❌ | ❌ |

---

## 🔄 Product Workflow States

```
┌─────┐      ┌────────────────┐      ┌──────────┐      ┌──────────┐
│Draft│ ---> │Pending Approval│ ---> │Approved  │      │Rejected  │
└─────┘      └────────────────┘      └──────────┘      └──────────┘
                                           │
                                           └──> Visible to public
```

---

## 🔐 Authentication Flow

```
1. User registers/logs in
   └─> Receives: { access: JWT, refresh: JWT }

2. Frontend stores tokens in localStorage
   └─> Attached to all API requests

3. Access token expires (1 hour)
   └─> Frontend auto-refreshes using refresh token

4. Refresh token expires (24 hours)
   └─> User must log in again
```

---

## 🤖 Chat/AI Integration

**Model**: Mistral 7B (via OpenRouter)  
**Temperature**: 0.7 (balanced creativity)  
**Max Tokens**: 500 per response  
**Context**: Business's products in JSON format

---

## 📊 Database Models

```
User
├── username, email, password
├── business (FK → Business)
├── role (FK → Role)
└── is_business_admin

Business
├── name
└── related: users, products, chat_history

Product
├── name, description, price
├── status (draft|pending_approval|approved|rejected)
├── business (FK → Business)
├── created_by (FK → User)
├── approved_by (FK → User, nullable)
└── timestamps

ChatHistory
├── user_message, ai_response
├── user (FK → User)
├── business (FK → Business)
└── timestamp
```

---

## 🧠 Key Technologies & Versions

### Frontend
- Next.js 14.1.4
- React 18
- TypeScript 5
- Tailwind CSS 3.3.0
- Axios 1.6.8
- React Query 5.28.4

### Backend
- Django 4.2+
- Django REST Framework
- PostgreSQL 15
- psycopg2-binary
- SimpleJWT

### Infrastructure
- Docker & Docker Compose
- PostgreSQL (Supabase)

---

## 🎯 Common Development Tasks

### Add a new API endpoint
1. Create view method in `apps/[app_name]/views.py`
2. Create serializer in `apps/[app_name]/serializers.py`
3. Add to router in `apps/[app_name]/urls.py`
4. Test with `curl` or Postman
5. Update frontend hook in `lib/hooks/use[Feature].ts`

### Create a new page
1. Create folder in `frontend/app/`
2. Add `page.tsx` file
3. Wrap with client component if needed (`'use client'`)
4. Use custom hooks for data fetching
5. Build UI with Shadcn components

### Add a new role/permission
1. Add to `Role.ROLE_CHOICES` in `authentication/models.py`
2. Update permission classes in views
3. Update frontend role display
4. Add migration if needed

### Fix a bug
1. Check logs: `docker-compose logs -f [service]`
2. Make code changes
3. Changes auto-reload in containers
4. Test in browser
5. Commit with clear message

---

## 🐛 Debugging Tips

```bash
# View backend logs
docker-compose logs -f backend

# View frontend logs
docker-compose logs -f frontend

# Access backend shell
docker-compose exec backend python manage.py shell

# Access database
docker-compose exec db psql -U user -d product_marketplace

# Restart a service
docker-compose restart backend

# Rebuild images
docker-compose up --build
```

---

## 📈 Performance Metrics

| Metric | Value | Impact |
|--------|-------|--------|
| JWT Lifetime | 1 hour | Security vs UX |
| Pagination Size | 10 items | API response time |
| DB Indexes | 3 indexes | Query performance |
| React Query Cache | Default | Auto-sync |

---

## ✅ Pre-deployment Checklist

- [ ] Set `DEBUG=False` in backend
- [ ] Update `ALLOWED_HOSTS` with domain
- [ ] Use strong `SECRET_KEY`
- [ ] Configure real `DATABASE_URL` (Supabase ready)
- [ ] Update `CORS_ALLOWED_ORIGINS` for production domain
- [ ] Set `OPENROUTER_API_KEY` securely
- [ ] Run `collectstatic` for static files
- [ ] Run migrations: `python manage.py migrate`
- [ ] Create superuser: `python manage.py createsuperuser`
- [ ] Test authentication flow
- [ ] Test product approval workflow
- [ ] Test chat functionality
- [ ] Run full test suite

---

## 🚨 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "API connection refused" | Check backend is running: `docker-compose ps` |
| "401 Unauthorized" | Check token in localStorage, login if expired |
| "CORS error" | Verify frontend origin in CORS_ALLOWED_ORIGINS |
| "Chat not working" | Verify OPENROUTER_API_KEY in .env |
| "Products not showing" | Check product status is 'approved' |
| "Database connection error" | Verify DATABASE_URL and db container is running |

---

## 📞 Support Resources

- Django Docs: https://docs.djangoproject.com/
- Next.js Docs: https://nextjs.org/docs
- DRF Docs: https://www.django-rest-framework.org/
- React Query: https://tanstack.com/query/latest
- Tailwind CSS: https://tailwindcss.com/docs
- OpenRouter Docs: https://openrouter.ai/docs

---

**Last Updated**: February 19, 2026  
**Project Status**: ✅ Running & Functional
