# Project Summary & Learning Guide

## 📚 Complete Documentation Index

I've created comprehensive documentation for your project. Here's where to find what you need:

### 1. **[TECH_STACK_OVERVIEW.md](TECH_STACK_OVERVIEW.md)** 📖
   - Complete technology breakdown
   - Dependencies and versions
   - Frontend/backend architecture
   - Database models and relationships
   - Security features
   - Performance optimizations
   - **Best for**: Understanding the complete tech ecosystem

### 2. **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** ⚡
   - Quick start commands
   - API endpoints cheatsheet
   - Role permissions table
   - Environment variables
   - Common issues & solutions
   - Development tasks
   - **Best for**: Getting things done quickly

### 3. **[ARCHITECTURE.md](ARCHITECTURE.md)** 🏢
   - System architecture diagrams
   - Authentication flow
   - Authorization (RBAC)
   - Product workflow state machine
   - Chat integration flow
   - Request/response examples
   - Data update patterns
   - **Best for**: Understanding data flows

### 4. **[PROJECT_MAP.md](PROJECT_MAP.md)** 🗺️
   - Complete directory tree
   - File purpose descriptions
   - File dependency matrix
   - Component composition trees
   - Data flow between components
   - Feature addition workflow
   - **Best for**: Finding files and understanding structure

### 5. **[AI_CHATBOT_FIXES.md](AI_CHATBOT_FIXES.md)** 🤖
   - Recent fixes applied
   - API key security setup
   - Migration fixes
   - Error handling improvements
   - **Best for**: Understanding recent changes

---

## 🎓 Learning Path

### New to the project? Follow this path:

1. **Start here**: [README.md](README.md)
   - Get high-level overview
   - Understand what the project does

2. **Then**: [QUICK_REFERENCE.md](QUICK_REFERENCE.md)
   - Learn quick commands
   - See API endpoints
   - Understand user roles

3. **Deep dive**: [TECH_STACK_OVERVIEW.md](TECH_STACK_OVERVIEW.md)
   - Understand all technologies
   - Learn how components fit together
   - Review models and relationships

4. **Understand flows**: [ARCHITECTURE.md](ARCHITECTURE.md)
   - See how data moves through system
   - Learn authentication flow
   - Understand product lifecycle

5. **Find files**: [PROJECT_MAP.md](PROJECT_MAP.md)
   - Know where code lives
   - Understand file dependencies
   - See component relationships

---

## 🚀 Project Overview

### What is this?
A **multi-tenant product marketplace platform** where:
- Businesses can manage products
- Products go through approval workflows (draft → pending → approved)
- Different roles (Admin, Editor, Approver, Viewer) have different permissions
- AI chatbot helps users find products
- Built with modern tech (React + Django + PostgreSQL)

### Key Features
- ✅ User authentication with JWT tokens
- ✅ Multi-tenant architecture (each business isolated)
- ✅ Role-based access control
- ✅ Product approval workflow
- ✅ AI chatbot powered by Mistral 7B
- ✅ Real-time chat history storage
- ✅ Responsive UI with Tailwind CSS

### Current Status
- ✅ All containers running
- ✅ Database connected (Supabase)
- ✅ Products loading correctly
- ✅ Chat functionality working
- ✅ Environment variables secure (.env protected)

---

## 📱 Frontend Tech Stack (5 key technologies)

```
Next.js 14          → React framework with API routes
React 18            → UI library with hooks
TypeScript          → Type-safe JavaScript
Tailwind CSS        → Utility-first styling
React Query         → Server state management
```

**Frontend Folder**: `frontend/`
**Port**: `3000`
**Key Files**:
- `app/layout.tsx` - Root wrapper
- `components/` - Reusable UI components
- `lib/hooks/` - Custom data hooks
- `lib/api/client.ts` - HTTP client

---

## 🐍 Backend Tech Stack (5 key technologies)

```
Django 4.2          → Python web framework
Django REST         → REST API framework
SimpleJWT           → JWT authentication
PostgreSQL 15       → Relational database
Supabase            → Database hosting
```

**Backend Folder**: `backend/`
**Port**: `8000`
**Key Files**:
- `config/settings.py` - Django configuration
- `apps/authentication/` - User management
- `apps/products/` - Product management
- `apps/chat/` - Chat history storage

---

## 🏢 Database Schema (4 main tables)

```
1. User (extends Django's built-in)
   - username, email, password
   - business (FK → Business)
   - role (FK → Role)
   - is_business_admin (Boolean)

2. Business
   - name (unique, per tenant)
   - created_at, updated_at

3. Product
   - name, description, price
   - status (draft, pending, approved, rejected)
   - business (FK), created_by (FK), approved_by (FK)
   - created_at, updated_at, approved_at

4. ChatHistory
   - user_message, ai_response
   - user (FK), business (FK)
   - timestamp
```

---

## 🔐 Authentication & Authorization

### Authentication (verifying who you are)
- Uses JWT tokens (JSON Web Tokens)
- Access token valid for 1 hour
- Refresh token valid for 24 hours
- Auto-refresh on /api/auth/refresh/
- Tokens stored in browser's localStorage

### Authorization (what you can do)
- 4 roles: Admin, Editor, Approver, Viewer
- Each role has specific permissions
- Products filtered by user's business
- Endpoints check role before allowing action

**Permission Matrix**:
| Action | Admin | Editor | Approver | Viewer |
|--------|-------|--------|----------|--------|
| Create | ✅ | ✅ | ❌ | ❌ |
| Edit | ✅ | ✅ | ❌ | ❌ |
| Delete | ✅ | ❌ | ❌ | ❌ |
| Approve | ✅ | ❌ | ✅ | ❌ |
| Manage Users | ✅ | ❌ | ❌ | ❌ |

---

## 🤖 AI Chatbot System

### How it works
1. User types message in ChatWidget
2. Frontend sends to `/api/chat` (Next.js route)
3. Route fetches user's products from backend
4. Route calls OpenRouter API (Mistral 7B model)
5. AI generates response based on products
6. Response saved to ChatHistory in database
7. Displayed in ChatWidget to user

### Configuration
- **Model**: mistralai/mistral-7b-instruct:free
- **API**: OpenRouter (open-source model marketplace)
- **Context**: All products sent as JSON for context
- **Cost**: Free tier available

### Recent Fixes
- Fixed API key storage (now in .env, not docker-compose.yml)
- Fixed backend URL resolution for Docker environments
- Added error handling and logging
- Improved history retrieval with pagination

---

## 🐳 Docker & Infrastructure

### Services
```
db          PostgreSQL 15              (port 5432)
backend     Django REST API             (port 8000)
frontend    Next.js application         (port 3000)
```

### Environment Setup
```bash
# .env file contains:
NEXT_PUBLIC_API_URL=http://localhost:8000/api
OPENROUTER_API_KEY=sk-or-v1-xxxxx
DATABASE_URL=postgresql://...
DEBUG=True
```

### Common Commands
```bash
docker-compose up                       # Start all services
docker-compose logs -f backend          # View backend logs
docker-compose exec backend python manage.py createsuperuser  # Create admin
```

---

## 🔄 Typical User Journey

### As an Editor (create products)
```
1. Visit http://localhost:3000
2. Click "Get Started" → Register
3. Login with credentials
4. Go to Dashboard → Create Product
5. Fill in name, description, price
6. Submit for approval
7. Wait for Approver to review
8. Product becomes public when approved
9. Chat widget can answer questions about it
```

### As an Approver (approve products)
```
1. Login to dashboard
2. Go to Products
3. See "pending_approval" products
4. Review details
5. Click "Approve" button
6. Product now visible to public
```

### As a Customer (browse products)
```
1. Visit http://localhost:3000
2. Click "Explore Marketplace" or "Browse"
3. See approved products from all businesses
4. Use Chat widget to ask about products
5. AI provides product recommendations
```

---

## 🧪 Testing

### Frontend Tests
```bash
npm test                                # Run Jest tests
npm run test:watch                      # Watch mode
```

### Backend Tests
```bash
pytest                                  # Run all tests
pytest apps/products/test_*.py         # Specific app
```

---

## 📈 Performance Metrics

| Metric | Value | Impact |
|--------|-------|--------|
| JWT Lifetime | 1 hour | Security/UX balance |
| Page Size | 10 items | API response time |
| Cache | React Query | Reduces API calls |
| Database Indexes | 3 indexes | Fast queries |

---

## 🛡️ Security Features

1. **JWT Authentication** - Token-based, stateless
2. **CORS Protection** - Only frontend origin allowed
3. **Password Hashing** - PBKDF2 by default
4. **Environment Variables** - Secrets in .env (git-ignored)
5. **Multi-tenancy** - Automatic business filtering
6. **Email Uniqueness** - Database constraint per business
7. **Permission Checking** - Role-based on every endpoint

---

## 🚨 Important Notes

### Do NOT commit to git:
- `.env` file with API keys
- `node_modules/` folder
- `__pycache__/` folder
- `.venv/` or `venv/` folder
- Database credentials

### All already in .gitignore ✅

### Safe to commit:
- `.env.example` (template without values)
- Source code (no secrets)
- Configuration files (env-based)
- Documentation

---

## 🎯 Next Steps

### To deploy this:
1. Set up production database (Supabase/AWS)
2. Update `.env` with production values
3. Set `DEBUG=False`
4. Use production secret key
5. Configure CORS for your domain
6. Deploy with Docker (Railway, Render, AWS)

### To extend this:
1. Add new product fields → Update model & form
2. Add new user role → Update Role choices
3. Add chat features → Expand ChatHistory model
4. Add payments → Integrate Stripe/PayPal

### To maintain this:
1. Run tests before deploying
2. Check logs regularly
3. Update dependencies
4. Monitor database performance
5. Backup database regularly

---

## 📞 Quick Help

### "Where do I make changes?"
- UI changes: `frontend/components/` or `frontend/app/`
- API changes: `backend/apps/[app]/views.py`
- Database changes: `backend/apps/[app]/models.py`
- Styles: `frontend/app/globals.css` or Tailwind classes

### "How do I see what's happening?"
- Frontend errors: Browser console (F12)
- Backend errors: `docker-compose logs -f backend`
- Database issues: `docker-compose logs -f db`

### "What if something breaks?"
1. Check error messages in logs
2. Review recent code changes
3. Test in isolation (backend with Postman, frontend in browser)
4. Restart containers: `docker-compose down && docker-compose up`

### "How do I add a new API endpoint?"
1. Add model method if needed in `models.py`
2. Create ViewSet/view in `views.py`
3. Register in `urls.py`
4. Create frontend hook in `lib/hooks/`
5. Use hook in component
6. Test with curl or Postman first

---

## 🎓 Learning Resources

### Frontend Stack
- Next.js: https://nextjs.org/docs
- React: https://react.dev
- TypeScript: https://www.typescriptlang.org/docs
- Tailwind: https://tailwindcss.com/docs
- React Query: https://tanstack.com/query/latest

### Backend Stack
- Django: https://docs.djangoproject.com
- DRF: https://www.django-rest-framework.org
- Django ORM: https://docs.djangoproject.com/en/4.2/topics/db/queries/
- SimpleJWT: https://django-rest-framework-simplejwt.readthedocs.io

### Tools
- Docker: https://docs.docker.com
- PostgreSQL: https://www.postgresql.org/docs
- Postman: https://learning.postman.com

---

## 🎉 Summary

You now have:
- ✅ Complete tech stack understanding
- ✅ Architecture documentation
- ✅ File structure map
- ✅ API reference
- ✅ Security setup
- ✅ Quick reference guide
- ✅ Learning resources

**Total Documentation**: ~15,000 words across 5 markdown files

Start with [QUICK_REFERENCE.md](QUICK_REFERENCE.md) for immediate help, or read [TECH_STACK_OVERVIEW.md](TECH_STACK_OVERVIEW.md) for deep understanding.

---

**Project**: Business Product Marketplace  
**Status**: ✅ Running & Documented  
**Created**: February 19, 2026  
**Last Updated**: February 19, 2026  
**Type**: Full-Stack Multi-Tenant SaaS  
**Complexity**: Medium (scalable)
