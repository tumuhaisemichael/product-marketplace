# Project Tech Stack & Architecture Overview

## 📋 Project Summary
**Business Product Marketplace** - A multi-tenant SaaS platform where businesses can manage products with role-based approval workflows and AI-powered chatbot assistance. Built for scalability with modern web technologies.

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         Frontend (Next.js)                       │
│         http://localhost:3000                                    │
├─────────────────────────────────────────────────────────────────┤
│                     API Gateway (Next.js API)                    │
│         /api/chat (OpenRouter AI Integration)                    │
├─────────────────────────────────────────────────────────────────┤
│           Backend REST API (Django REST Framework)               │
│         http://localhost:8000/api                                │
├─────────────────────────────────────────────────────────────────┤
│              PostgreSQL Database (Supabase)                      │
│         Multi-tenant, Role-based Access Control                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔌 Frontend Tech Stack

### Framework & Core
- **Next.js 14.1.4** - React framework with SSR, SSG, and API routes
  - App Router (not Pages Router)
  - TypeScript enabled
  - Server-side rendering for public pages
  
- **React 18** - UI library with hooks
- **TypeScript 5** - Type-safe JavaScript

### State Management & Data Fetching
- **TanStack React Query 5.28.4** - Server state management
  - Automatic caching and synchronization
  - Background refetching
  - Used in custom hooks (useProducts, useChat, useAuth, useUsers)

- **Axios 1.6.8** - HTTP client with interceptors
  - Base URL: `http://localhost:8000/api` (dynamically set from .env)
  - Auto token attachment to Authorization headers
  - Response/request logging
  - Automatic token refresh on 401

### UI & Styling
- **Tailwind CSS 3.3.0** - Utility-first CSS framework
  - Dark mode capable
  - Custom theme in tailwind.config.ts
  
- **Shadcn UI** - Headless UI components built on Radix UI
  - Button, Input, Label, Select, Textarea, Card, Form
  - Fully customizable, copy-paste component library
  
- **Lucide React 0.363.0** - Icon library
  - 363+ icons available
  - Used throughout navigation and UI components

### Form Handling & Validation
- **React Hook Form 7.51.1** - Performant form library
  - Minimal re-renders
  - Built-in validation
  
- **@hookform/resolvers 3.3.4** - Schema validation adapter
  
- **Zod 3.22.4** - TypeScript-first schema validation
  - Runtime validation
  - Type inference from schemas

### API Client Setup
```typescript
// lib/api/client.ts
- baseURL: process.env.NEXT_PUBLIC_API_URL (from .env)
- Authentication: Bearer token from localStorage
- Auto token refresh via /auth/refresh/ endpoint
- Error handling with status code checks
```

### Custom Hooks
- **useAuth()** - Authentication state, login/logout, permissions
- **useProducts()** - Product CRUD, filtering, pagination
- **useChat()** - Chat message sending, history retrieval
- **useUsers()** - User management for business admins

### Folder Structure
```
frontend/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth group (login, register)
│   ├── (public)/                 # Public group (home, products)
│   ├── dashboard/                # Protected dashboard layout
│   │   ├── products/             # List products
│   │   ├── products/create       # Create product form
│   │   ├── products/[id]         # Edit product
│   │   ├── users/                # Team management
│   │   └── settings/             # Business settings
│   ├── api/
│   │   └── chat/
│   │       └── route.ts          # Chat API endpoint (OpenRouter integration)
│   ├── layout.tsx                # Root layout with ChatWidget
│   └── globals.css               # Global Tailwind styles
├── components/
│   ├── chatbot/
│   │   ├── ChatWidget.tsx        # Chat UI component
│   │   └── MessageBubble.tsx     # Message display
│   ├── forms/
│   │   └── ProductForm.tsx       # Product creation/edit form
│   ├── products/
│   │   ├── ProductCard.tsx       # Product display card
│   │   └── ProductFilters.tsx    # Filter UI
│   └── ui/                       # Shadcn components
├── lib/
│   ├── api/
│   │   └── client.ts             # Axios instance
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useChat.ts
│   │   ├── useProducts.ts
│   │   └── useUsers.ts
│   ├── utils.ts                  # Helper functions
│   └── types/                    # TypeScript interfaces
└── public/                       # Static assets
```

---

## 🐍 Backend Tech Stack

### Framework & Core
- **Django 4.2+** - Python web framework
  - MTV (Model-Template-View) architecture
  - ORM for database operations
  - Admin panel included
  
- **Django REST Framework** - API development
  - ViewSets for CRUD operations
  - Serializers for data validation/transformation
  - Pagination and filtering built-in
  - Custom permissions and authentication

- **djangorestframework-simplejwt** - JWT authentication
  - Token-based authentication
  - Access token (1 hour default) + Refresh token (24 hours default)
  - Automatic token refresh mechanism

### Database & ORM
- **PostgreSQL 15** - Relational database
  - Hosted on Supabase (AWS, EU region)
  - Multi-tenant architecture via business foreign key
  - Database indexing on frequently queried fields
  
- **psycopg2-binary** - PostgreSQL adapter for Python
- **dj-database-url** - Database URL parsing from environment

### Additional Libraries
- **django-cors-headers** - CORS support for frontend requests
- **django-filter** - Advanced filtering for API endpoints
- **python-dotenv** - Environment variable management
- **django-extensions** - Additional management commands
- **requests** - HTTP library for external API calls
- **Faker** - Generate dummy data for testing

### API Architecture
```
Base URL: http://localhost:8000/api/

Authentication Endpoints:
├── POST   /auth/register/         - User registration
├── POST   /auth/login/            - JWT token generation
├── POST   /auth/refresh/          - Refresh access token
├── GET    /auth/me/               - Get current user profile
├── GET    /auth/users/            - List business users (admin only)
├── POST   /auth/users/            - Create user (admin only)
└── GET    /auth/roles/            - List available roles

Product Endpoints:
├── GET    /products/              - List approved products (public)
├── GET    /products/list_internal/- List business products (authenticated)
├── POST   /products/              - Create product
├── GET    /products/{id}/         - Get product details
├── PATCH  /products/{id}/         - Update product
├── DELETE /products/{id}/         - Delete product (admin)
└── POST   /products/{id}/approve/ - Approve product (approver/admin)

Chat Endpoints:
├── GET    /chat/history/          - Get chat history (paginated)
└── POST   /chat/history/          - Save new chat message
```

### Models & Database Schema

**Business** Model
```python
- id (Primary Key)
- name (String, Unique)
- created_at (DateTime)
- updated_at (DateTime)
- Relationships: users, products, chat_history
```

**Role** Model
```python
- id (Primary Key)
- name (Choice: admin, editor, approver, viewer)
- permissions (JSON - flexible permission store)
```

**User** Model (extends Django AbstractUser)
```python
- id, username, email, password (from AbstractUser)
- business (ForeignKey -> Business)
- role (ForeignKey -> Role)
- is_business_admin (Boolean)
- Constraint: unique_email_per_business
```

**Product** Model
```python
- id (Primary Key)
- name, description, price (DecimalField, 2 decimal places)
- status (Choice: draft, pending_approval, approved, rejected)
- business (ForeignKey -> Business)
- created_by (ForeignKey -> User)
- approved_by (ForeignKey -> User, nullable)
- created_at, updated_at, approved_at (DatetimeFields)
- Indexes: (business, status), (created_at)
- Methods: approve(user) - marks approved, sets approver and timestamp
```

**ChatHistory** Model
```python
- id (Primary Key)
- user_message (TextField)
- ai_response (TextField)
- user (ForeignKey -> User)
- business (ForeignKey -> Business)
- timestamp (DateTime, auto-created)
- Index: (business, timestamp) for efficient queries
```

### Permissions & Access Control

**Role-Based Access Control (RBAC)**
| Action          | Admin | Editor | Approver | Viewer |
|-----------------|-------|--------|----------|--------|
| Create Product  | ✅    | ✅     | ❌       | ❌     |
| Edit Product    | ✅    | ✅     | ❌       | ❌     |
| Delete Product  | ✅    | ❌     | ❌       | ❌     |
| Approve Product | ✅    | ❌     | ✅       | ❌     |
| Manage Users    | ✅    | ❌     | ❌       | ❌     |

**Multi-Tenancy**: All queries automatically filtered by `business=request.user.business`

### API Configuration
```python
# REST_FRAMEWORK settings (settings.py)
- Authentication: JWTAuthentication
- Default Pagination: PageNumberPagination (10 items/page)
- Filters: DjangoFilterBackend for filtering
- Permissions: IsAuthenticatedOrReadOnly (public read access)
- JWT Lifetimes: Access 1 hour, Refresh 24 hours
```

### Folder Structure
```
backend/
├── config/
│   ├── settings.py               # Django settings
│   ├── urls.py                   # Root URL configuration
│   └── wsgi.py                   # WSGI application
├── apps/
│   ├── authentication/
│   │   ├── models.py             # User, Business, Role models
│   │   ├── views.py              # Auth endpoints
│   │   ├── serializers.py        # Data validation
│   │   ├── permissions.py        # Custom permissions
│   │   └── urls.py               # Auth routes
│   ├── products/
│   │   ├── models.py             # Product model
│   │   ├── views.py              # Product ViewSet
│   │   ├── serializers.py        # Product serialization
│   │   ├── permissions.py        # Product permissions
│   │   ├── filters.py            # Product filtering
│   │   └── urls.py               # Product routes
│   ├── chat/
│   │   ├── models.py             # ChatHistory model
│   │   ├── views.py              # Chat ViewSet
│   │   ├── serializers.py        # Chat serialization
│   │   ├── urls.py               # Chat routes
│   │   └── migrations/
│   │       ├── __init__.py
│   │       └── 0001_initial.py   # Initial migration
│   └── core/
│       └── management/
│           └── commands/
│               └── populate_dummy_data.py  # Test data generation
├── requirements.txt              # Python dependencies
├── manage.py                     # Django CLI
├── pytest.ini                    # pytest configuration
└── Dockerfile                    # Docker image definition
```

---

## 🤖 AI Integration (OpenRouter via OpenAI SDK)

### Chat API Endpoint (`/api/chat`)
- **Location**: `frontend/app/api/chat/route.ts`
- **Provider**: OpenRouter (mistralai/mistral-7b-instruct:free)
- **Flow**:
  1. Frontend sends message to `/api/chat`
  2. Backend fetches business products for context
  3. Creates prompt with system instructions + user message + product data
  4. Calls OpenRouter API (free Mistral 7B model)
  5. Receives AI response and saves to ChatHistory
  6. Returns response to frontend

### Configuration
- **API Key**: `OPENROUTER_API_KEY` (from .env, exposed in frontend via NEXT_PUBLIC_APP_URL)
- **Model**: `mistralai/mistral-7b-instruct:free`
- **Temperature**: 0.7 (balanced creativity/consistency)
- **Max Tokens**: 500 per response

### Chatbot Features
- Appears as fixed widget in bottom-right corner (all pages)
- Context-aware (knows products in user's business)
- Chat history stored in database
- Auto-loads previous conversations when opened

---

## 🐳 Docker & Infrastructure

### Containerization
```dockerfile
# Services in docker-compose.yml

db:
  - PostgreSQL 15 image
  - Volume: postgres_data (persistent storage)
  - Port: 5432

backend:
  - Custom image from backend/Dockerfile
  - Python 3.11 based
  - Runs: python manage.py runserver 0.0.0.0:8000
  - Port: 8000
  - Volume: ./backend:/app (live reload)

frontend:
  - Custom image from frontend/Dockerfile
  - Node.js based (Next.js)
  - Runs: next start
  - Port: 3000
```

### Environment Configuration
```
.env file (Git-ignored, never committed)
├── Frontend Variables:
│   ├── NEXT_PUBLIC_API_URL=http://localhost:8000/api
│   ├── NEXT_PUBLIC_APP_URL=http://localhost:3000
│   └── OPENROUTER_API_KEY=sk-or-v1-xxxxx
├── Backend Variables:
│   ├── DATABASE_URL=postgresql://...
│   ├── SECRET_KEY=dev_secret_key
│   ├── DEBUG=True
│   └── CORS_ALLOWED_ORIGINS=http://localhost:3000
└── Database Variables:
    ├── POSTGRES_DB=product_marketplace
    ├── POSTGRES_USER=user
    └── POSTGRES_PASSWORD=password

.env.example (Safe to commit, no secrets)
└── Template showing all required variables
```

### Startup Commands
```bash
# Build and start all containers
docker-compose up --build

# Run migrations
docker-compose exec backend python manage.py migrate

# Create superuser
docker-compose exec backend python manage.py createsuperuser

# Generate dummy data
docker-compose exec backend python manage.py populate_dummy_data
```

---

## 📊 Data Flow

### Product Creation Workflow
```
1. User (Editor) creates product via form
   └─> Frontend POST /products/
   
2. Backend validates using ProductSerializer
   └─> Sets status='draft', created_by=user, business=user.business
   
3. Product saved to database
   └─> Status: 'draft' (only visible to business users)
   
4. User submits for approval
   └─> Status changes to: 'pending_approval'
   
5. Approver reviews and approves
   └─> Backend calls product.approve(user)
   └─> Status: 'approved', approved_by=approver, approved_at=now()
   
6. Product now visible to public
   └─> GET /products/ returns approved products
```

### Authentication Flow
```
1. User registers via /auth/register/
   └─> Hashed password, associated with business
   
2. User logs in with email+password
   └─> POST /auth/login/ (TokenObtainPairView)
   └─> Returns: {access: JWT, refresh: JWT}
   
3. Frontend stores tokens in localStorage
   └─> Attached to all API requests via Authorization header
   
4. When access token expires (1 hour)
   └─> Frontend auto-refreshes using refresh token
   └─> Transparent to user
   
5. If refresh token invalid
   └─> User redirected to /login
```

### Chat Flow
```
1. User types message in ChatWidget
   └─> Sent to /api/chat (Next.js route)
   
2. Backend fetches products for business
   └─> From /api/products/list_internal/?business={id}
   
3. Constructs prompt:
   - System: "You are a product assistant..."
   - Context: All products in JSON
   - User message: User's question
   
4. Calls OpenRouter API
   └─> Waits for AI response
   
5. Response received + saved
   └─> POST /api/chat/history/ saves user_message + ai_response
   
6. Returns response to frontend
   └─> Displayed in ChatWidget
   └─> Auto-loads history when widget reopens
```

---

## 🔐 Security Features

1. **JWT Authentication** - Stateless, secure token-based auth
2. **CORS Protection** - Only frontend origin allowed
3. **Role-Based Access Control** - Granular permission checking
4. **Multi-Tenancy** - Business isolation via database queries
5. **Password Hashing** - Django's built-in PBKDF2
6. **Environment Variables** - Sensitive data kept in .env (git-ignored)
7. **Email Uniqueness Per Business** - Database constraint prevents duplicates

---

## 📈 Performance Optimizations

1. **Database Indexing**
   - Products: (business, status), (created_at)
   - ChatHistory: (business, timestamp)
   
2. **Pagination**
   - API defaults to 10 items/page
   - Reduces payload size and API response time
   
3. **Token Caching**
   - React Query caches API responses
   - Auto-refresh in background
   
4. **Lazy Loading**
   - Product images and details loaded on demand
   - ChatWidget only loads history when opened

---

## 🧪 Testing

### Backend Testing
- **Framework**: pytest + pytest-django
- **Location**: backend/tests/test_products.py
- **Run**: `pytest` or `docker-compose exec backend pytest`

### Frontend Testing
- **Framework**: Jest + React Testing Library
- **Location**: frontend/__tests__/
- **Run**: `npm test`

---

## 📦 Dependencies Summary

### Frontend (24 packages)
- React ecosystem: react, react-dom, next, typescript
- Form handling: react-hook-form, zod, @hookform/resolvers
- API: axios, @tanstack/react-query
- UI: tailwindcss, shadcn/ui, lucide-react, class-variance-authority
- Testing: jest, @testing-library/react

### Backend (16 packages)
- Django stack: django, djangorestframework, djangorestframework-simplejwt
- Database: psycopg2-binary, dj-database-url
- Utilities: python-dotenv, django-extensions, requests
- Testing: pytest, pytest-django
- Data: Faker

---

## 🚀 Deployment Considerations

1. **Backend**
   - Use Gunicorn instead of runserver
   - Set DEBUG=False in production
   - Use environment-specific SECRET_KEY
   - Configure ALLOWED_HOSTS properly

2. **Frontend**
   - Build with `npm run build`
   - Serve with `npm start` or static host (Vercel, Netlify)
   - Set production API URL

3. **Database**
   - Already using Supabase (cloud PostgreSQL)
   - Automatic backups included
   - Scaling on demand

4. **Environment**
   - Use Docker for consistency
   - Use managed services (Vercel, Railway, Render)
   - CI/CD pipelines (GitHub Actions, etc.)

---

## 📝 File Size & Complexity

| Component | Files | LOC | Complexity |
|-----------|-------|-----|-----------|
| Frontend Components | 15+ | ~800 | Medium |
| Frontend Hooks | 4 | ~250 | Medium |
| Backend Views | 10+ | ~300 | Low-Medium |
| Backend Models | 5 | ~150 | Low |
| Backend Serializers | 8+ | ~200 | Low |
| Migrations | 1 | ~35 | Low |
| Configuration | 3 | ~200 | Low |
| **Total** | **50+** | **~2000** | **Manageable** |

---

## 🔄 Recent Fixes Applied

1. **Chat API Environment Variables** - Now reads backend URL dynamically
2. **Migration Dependency** - Fixed chat migration to not depend on nonexistent parent
3. **API Client Configuration** - Uses NEXT_PUBLIC_API_URL from .env
4. **Error Handling** - Improved error messages in chat and history endpoints
5. **Environment Management** - Moved secrets from docker-compose.yml to .env

---

## 🎯 Key Architectural Decisions

1. **Multi-Tenant via Business FK** - Scales better than separate databases
2. **JWT over Sessions** - Stateless, suitable for mobile/SPA
3. **Next.js API Routes** - Bridges frontend and backend, handles AI integration
4. **Role-Based over Attribute-Based** - Simpler to implement, sufficient for use case
5. **PostgreSQL over NoSQL** - Transactional guarantees needed for approvals
6. **Docker Compose for local dev** - Easy onboarding, environment consistency

---

This project is well-architected, uses modern best practices, and has clear separation of concerns. It's ready for scaling with proper DevOps setup.
