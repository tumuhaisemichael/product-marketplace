# Business Product Marketplace 🚀

A complete, production-ready **multi-tenant SaaS marketplace platform** where businesses can manage products with approval workflows and get AI-powered product recommendations through an intelligent chatbot.

---

## 📝 Project Overview

### What is this project?

This is a **full-stack web application** that serves as a marketplace platform for multiple businesses to:

1. **Manage Products** - Create, edit, delete, and organize product catalogs
2. **Implement Approval Workflows** - Products go through states: Draft → Pending Approval → Approved → Public
3. **Control Access** - Role-based permissions ensure only authorized users can perform specific actions
4. **AI-Powered Chat** - An intelligent chatbot that understands products and answers customer questions
5. **Multi-Tenant Architecture** - Each business is completely isolated with their own data, users, and products

### Who would use this?

- **Businesses/Sellers**: Create and manage product listings
- **Administrators**: Oversee multiple users and products, manage approvals
- **Editors**: Create and edit products (submit for approval)
- **Approvers**: Review and approve/reject products before they go public
- **Viewers**: Browse approved products and interact with the AI chatbot
- **Customers**: Browse marketplace and get AI-powered product recommendations

### Real-World Use Case

Imagine a **B2B marketplace** where:
- Multiple retail companies list their products
- Each company's employees have different roles (admin, editor, approver)
- Products must be approved before being visible to customers
- Customers can ask an AI assistant "Do you have organic products?" and get relevant answers
- Each company's data is completely private and isolated

---

## 🎯 Key Features

### ✅ Authentication & Authorization
- **JWT Token-Based Authentication** - Secure, stateless authentication with automatic token refresh
- **4-Level Role System** - Admin, Editor, Approver, Viewer with specific permissions
- **Multi-Tenancy** - Complete data isolation per business
- **Automatic Permission Checks** - Every API endpoint validates user permissions

### ✅ Product Management System
- **Product Lifecycle States**:
  - **Draft** - Only creator and staff can see
  - **Pending Approval** - Waiting for approver review
  - **Approved** - Public marketplace visibility
  - **Rejected** - Only creator can see
- **Search & Filter** - Find products by name, price, status
- **Bulk Operations** - Manage multiple products efficiently

### ✅ AI Chatbot Integration
- **Context-Aware Responses** - AI knows about your business's products
- **Free Model** - Uses Mistral 7B via OpenRouter (free tier available)
- **Chat History** - Persistent storage of conversations
- **Real-Time Responses** - Instant AI-powered answers

### ✅ Team Management
- **User Invitations** - Admins invite team members
- **Role Assignment** - Assign appropriate roles per team member
- **Activity Tracking** - See who created/approved products

### ✅ Modern User Interface
- **Responsive Design** - Works on desktop, tablet, mobile
- **Professional Styling** - Modern, clean interface
- **Intuitive Navigation** - Clear menu structure
- **Real-Time Feedback** - Loading states, error messages, success confirmations

---

## 🛠️ Tech Stack Breakdown

### Frontend (What users see)
```
Framework:      Next.js 14.1.4 (React-based)
Language:       TypeScript (type-safe JavaScript)
Styling:        Tailwind CSS (utility-first styling)
State Mgmt:     React Query (data caching & sync)
HTTP Client:    Axios (API communication)
Forms:          React Hook Form + Zod (validation)
UI Components:  Shadcn/UI (customizable components)
Icons:          Lucide React (icon library)
Testing:        Jest + React Testing Library

URLs:
- Frontend:     http://localhost:3000
- Public site:  http://localhost:3000
- Dashboard:    http://localhost:3000/dashboard
```

### Backend (Server-side logic)
```
Framework:      Django 4.2+ (Python web framework)
API:            Django REST Framework (REST endpoints)
Authentication: SimpleJWT (JWT token management)
Database:       PostgreSQL 15 (on Supabase)
ORM:            Django ORM (database queries)
Filtering:      django-filter (advanced searching)
CORS:           django-cors-headers (cross-origin requests)

URLs:
- API Base:     http://localhost:8000/api
- API Docs:     http://localhost:8000/admin
- Endpoints:    /auth, /products, /chat
```

### Infrastructure
```
Containerization:    Docker (container images)
Orchestration:       Docker Compose (multi-container setup)
Database Hosting:    Supabase (managed PostgreSQL)
Database Region:     AWS EU West 1
Environment Config:  .env file (secrets management)
```

---

## 📊 Database Models

### User
```
- username, email, password (hashed)
- business (which company they work for)
- role (admin, editor, approver, viewer)
- is_business_admin (can manage team)
```

### Business
```
- name (company name)
- users (employees)
- products (catalog)
- chat_history (conversations)
```

### Product
```
- name, description, price
- status (draft, pending, approved, rejected)
- business (which company owns it)
- created_by (which user created it)
- approved_by (which user approved it)
- timestamps (creation, update, approval dates)
```

### ChatHistory
```
- user_message (what customer asked)
- ai_response (what AI answered)
- user, business, timestamp
```

---

## 🚀 Getting Started - Clone to Your PC

### Step 1: Prerequisites
Before you begin, make sure you have installed:

```bash
# Check if you have Git
git --version

# Check if you have Docker
docker --version
docker-compose --version
```

**If you don't have these:**
- **Git**: https://git-scm.com/download
- **Docker Desktop**: https://www.docker.com/products/docker-desktop (includes Docker Compose)

### Step 2: Clone the Repository

```bash
# Navigate to where you want the project
cd ~/Projects  # or any folder you prefer

# Clone the repository
git clone https://github.com/michael/product-marketplace.git

# Enter the project folder
cd product-marketplace
```

### Step 3: Set Up Environment Variables

The project uses a `.env` file to store secrets (API keys, database URLs, etc.).

```bash
# Copy the example file to create your own .env
cp .env.example .env
```

Now open the `.env` file and fill in your values:

```env
# === FRONTEND ===
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
OPENROUTER_API_KEY=sk-or-v1-xxxxx

# === BACKEND ===
DATABASE_URL=postgresql://user:password@host:5432/database
SECRET_KEY=your-secret-key-here
DEBUG=True
CORS_ALLOWED_ORIGINS=http://localhost:3000

# === DATABASE ===
POSTGRES_DB=product_marketplace
POSTGRES_USER=user
POSTGRES_PASSWORD=password
```

### Getting API Keys

**For OpenRouter API Key** (for AI chatbot):
1. Visit https://openrouter.ai
2. Sign up for a free account
3. Go to keys section
4. Create a new key
5. Copy the key to `OPENROUTER_API_KEY` in `.env`

**For Supabase Database** (PostgreSQL):
1. Visit https://supabase.com
2. Sign up for a free account
3. Create a new project
4. Go to database settings
5. Copy the connection string to `DATABASE_URL` in `.env`
6. Format should be: `postgresql://postgres.xxxxx:password@aws-xxxxx.supabase.co:5432/postgres`

### Step 4: Verify Your `.env` File

Make sure your `.env` file has all required values:

```bash
# Check the file exists and isn't empty
cat .env
```

### Step 5: Start the Application

```bash
# Start all services (database, backend, frontend)
# This will take 2-3 minutes on first run
docker-compose up
```

You should see:
```
backend-1    | Starting development server at http://0.0.0.0:8000
frontend-1   | Ready in 1234ms
db-1         | database system is ready to accept connections
```

**Leave this terminal running.** Open another terminal to continue.

### Step 6: Run Initial Setup (in a NEW terminal)

```bash
# Navigate to project folder (if not already there)
cd product-marketplace

# Run database migrations
docker-compose exec backend python manage.py migrate

# Create a superuser account (admin)
docker-compose exec backend python manage.py createsuperuser
```

Follow the prompts to create your admin account:
```
Username: admin
Email: admin@example.com
Password: (enter password)
```

### Step 7: (Optional) Load Dummy Data

```bash
# Load sample products for testing
docker-compose exec backend python manage.py populate_dummy_data
```

### Step 8: Access the Application

Open these in your browser:

- **Frontend/Dashboard**: http://localhost:3000
- **Backend API**: http://localhost:8000/api
- **Admin Panel**: http://localhost:8000/admin (use superuser credentials)

**Try it out**:
1. Go to http://localhost:3000
2. Log in with the superuser credentials you created
3. Create a product
4. Approve it (you have admin permissions)
5. See it appear on the marketplace
6. Chat with the AI about your products!

---

## 📖 Understanding the Project Structure

Once you've cloned and started the project, here's what you'll find:

```
product-marketplace/
│
├── frontend/                    ← What users see (React/Next.js)
│   ├── app/                    ← Pages (home, login, dashboard)
│   │   ├── (auth)/            ← Login & Register pages
│   │   ├── (public)/          ← Public marketplace pages
│   │   ├── dashboard/         ← Admin dashboard pages
│   │   └── api/               ← API routes (chat endpoint)
│   ├── components/             ← Reusable UI components
│   │   ├── chatbot/           ← Chat widget
│   │   ├── forms/             ← Form components
│   │   ├── products/          ← Product display components
│   │   └── ui/                ← Basic UI elements
│   ├── lib/                    ← Utilities & hooks
│   │   ├── api/               ← HTTP client (Axios)
│   │   ├── hooks/             ← React hooks (useAuth, useChat, etc)
│   │   └── utils/             ← Helper functions
│   └── public/                 ← Images, fonts, static files
│
├── backend/                    ← Server logic (Django)
│   ├── config/                 ← Settings, URLs
│   │   ├── settings.py        ← Django configuration
│   │   └── urls.py            ← API routes
│   ├── apps/
│   │   ├── authentication/    ← User login, roles, permissions
│   │   │   ├── models.py      ← User & Business models
│   │   │   ├── views.py       ← Login endpoints
│   │   │   └── permissions.py ← Role checking
│   │   ├── products/          ← Product management
│   │   │   ├── models.py      ← Product model
│   │   │   ├── views.py       ← CRUD endpoints
│   │   │   └── filters.py     ← Search/filtering logic
│   │   └── chat/              ← Chat history
│   │       ├── models.py      ← ChatHistory model
│   │       └── views.py       ← Endpoints
│   ├── tests/                 ← Test files
│   ├── manage.py              ← Django command-line tool
│   ├── requirements.txt       ← Python dependencies
│   └── Dockerfile             ← Container image definition
│
├── docker-compose.yml         ← Starts all services
├── .env                       ← Your secrets (NEVER commit, git-ignored)
├── .env.example              ← Safe template for sharing
└── [DOCUMENTATION FILES] ↓
    ├── QUICK_REFERENCE.md           ← Commands & endpoints cheat sheet
    ├── TECH_STACK_OVERVIEW.md       ← Detailed tech explanations
    ├── ARCHITECTURE.md              ← How data flows, auth, workflows
    ├── PROJECT_MAP.md               ← Complete file reference
    ├── PROJECT_AT_A_GLANCE.txt      ← Visual project summary
    └── README.md                    ← This file
```

---

## 📚 Documentation Guide

This project includes comprehensive documentation. Read in this order:

### 1. **PROJECT_AT_A_GLANCE.txt** (Start Here! 5 min)
Visual ASCII summary of entire project - great for getting oriented.

```bash
cat PROJECT_AT_A_GLANCE.txt
```

### 2. **QUICK_REFERENCE.md** (10 min)
Quick commands you'll use frequently:
- How to start/stop containers
- Common API endpoints
- Testing commands
- Troubleshooting tips

### 3. **TECH_STACK_OVERVIEW.md** (30 min)
Detailed breakdown of all technologies:
- Why each technology was chosen
- How they work together
- Key concepts you should know

### 4. **ARCHITECTURE.md** (30 min)
How data flows through the system:
- Authentication process
- Product approval workflow
- Chat system
- Database relationships

### 5. **PROJECT_MAP.md** (20 min)
Complete file reference:
- Where to find specific code
- What each file does
- How files relate to each other

---

## 🔐 Default Permissions Matrix

| Feature | Admin | Editor | Approver | Viewer |
|---------|-------|--------|----------|--------|
| Create Product | ✅ | ✅ | ❌ | ❌ |
| Edit Product | ✅ | ✅ | ❌ | ❌ |
| Delete Product | ✅ | ❌ | ❌ | ❌ |
| Approve Product | ✅ | ❌ | ✅ | ❌ |
| View Own Products | ✅ | ✅ | ✅ | ❌ |
| View Public Products | ✅ | ✅ | ✅ | ✅ |
| View Chat History | ✅ | ✅ | ✅ | ❌ |
| Manage Team | ✅ | ❌ | ❌ | ❌ |

---

## 🤖 How the AI Chatbot Works

1. **User types a message** in the chat widget (bottom-right of page)
2. **Frontend sends request** to `/api/chat` route
3. **API fetches all products** from the user's business
4. **Mistral AI is called** via OpenRouter with products as context
5. **AI generates response** based on products and question
6. **Conversation is saved** to database for chat history
7. **Response appears** in the chat widget instantly

**Example Flow**:
```
User: "Do you have products under $100?"
→ API gets all your products
→ Sends to Mistral AI: "Here are our products: [list]. User asked: Do you have products under $100?"
→ AI responds: "Yes! Product A is $79, Product B is $89..."
→ Saved to database
→ Displayed in chat widget
```

---

## 🧪 Testing the Application

### Quick Test Checklist

After starting the application:

1. **Create Account**
   - [ ] Go to http://localhost:3000/register
   - [ ] Create a new user account
   - [ ] Verify you can log in

2. **Create Products**
   - [ ] Go to Dashboard → Products → Create New
   - [ ] Add a product with name, description, price
   - [ ] Verify product is in "Draft" state

3. **Approve Products**
   - [ ] Go to Dashboard → Products
   - [ ] Click on a draft product
   - [ ] Click "Approve" button
   - [ ] Verify status changed to "Approved"

4. **Browse Marketplace**
   - [ ] Go to http://localhost:3000 (public page)
   - [ ] See only approved products
   - [ ] Test filtering/searching

5. **Test AI Chatbot**
   - [ ] Look for chat widget (bottom-right)
   - [ ] Ask: "What products do you have?"
   - [ ] Verify AI responds with your products

### Automated Tests

```bash
# Run backend API tests
docker-compose exec backend pytest

# Run frontend tests
docker-compose exec frontend npm test

# Run specific test
docker-compose exec backend pytest tests/test_products.py -v
```

---

## 🚨 Common Issues & Solutions

### Issue: "Connection refused" or services won't start

```bash
# Check if services are running
docker-compose ps

# Restart everything
docker-compose down
docker-compose up

# Check logs
docker-compose logs backend
docker-compose logs frontend
docker-compose logs db
```

### Issue: "Database migration error"

```bash
# Run migrations manually
docker-compose exec backend python manage.py migrate

# Check migration status
docker-compose exec backend python manage.py showmigrations

# If stuck, reset migrations (WARNING: deletes data)
docker-compose exec backend python manage.py migrate --reset
```

### Issue: "API key flagged as compromised"

```bash
# This happens if you commit .env to git
# Solution:
# 1. NEVER commit .env file
# 2. Always use .env.example for templates
# 3. Regenerate the API key on OpenRouter/Supabase
# 4. Update your local .env file
# 5. Verify .gitignore includes .env
```

### Issue: "Port 3000 or 8000 already in use"

```bash
# Find what's using the port (example for 3000)
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or use different ports in docker-compose.yml
```

### Issue: "Node modules or dependencies not installing"

```bash
# Clear cache and reinstall
docker-compose down
docker system prune -a
docker-compose up --build
```

---

## 🔒 Security Best Practices

✅ **Already Implemented:**
- `.env` file is git-ignored (secrets won't be committed to GitHub)
- `.env.example` is committed (safe template for team members)
- Passwords are hashed using Django's PBKDF2
- JWT tokens expire automatically (1 hour access, 24 hour refresh)
- CORS protection enabled
- Multi-tenancy ensures complete data isolation
- Role-based permissions on every endpoint

⚠️ **Remember:**
- Never share `.env` file with others
- Never commit `.env` to version control
- Regenerate API keys if accidentally exposed
- Use strong passwords for admin account
- Regularly update dependencies (`pip install -U`, `npm update`)

---

## 📚 Learning Resources

### Frontend Development
- **Next.js**: https://nextjs.org/learn
- **React**: https://react.dev/learn
- **TypeScript**: https://www.typescriptlang.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs

### Backend Development
- **Django**: https://docs.djangoproject.com
- **Django REST Framework**: https://www.django-rest-framework.org
- **PostgreSQL**: https://www.postgresql.org/docs

### DevOps & Tools
- **Docker**: https://docs.docker.com/get-started
- **Git**: https://git-scm.com/book/en/v2
- **Postman** (API testing): https://www.postman.com/

### AI Integration
- **OpenRouter**: https://openrouter.ai/docs
- **Mistral AI**: https://docs.mistral.ai

---

## 🤝 Contributing

Want to improve this project? Here's how:

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/my-new-feature
   ```

2. **Make your changes**
   - Write clean, readable code
   - Add comments for complex logic
   - Test thoroughly

3. **Commit with clear messages**:
   ```bash
   git commit -m "Add feature: brief description of what changed"
   ```

4. **Push and create a pull request**:
   ```bash
   git push origin feature/my-new-feature
   ```

---

## 📞 Support & Help

**For setup questions**: Check [QUICK_REFERENCE.md](QUICK_REFERENCE.md)

**For architecture questions**: Read [ARCHITECTURE.md](ARCHITECTURE.md)

**For code location questions**: See [PROJECT_MAP.md](PROJECT_MAP.md)

**For technology questions**: Review [TECH_STACK_OVERVIEW.md](TECH_STACK_OVERVIEW.md)

**For issues**: Check this README's troubleshooting section

---

## ✨ What You've Built

This is a **professional, production-ready marketplace platform** that demonstrates:

✅ Full-stack web development (frontend + backend)  
✅ Modern JavaScript/Python best practices  
✅ Database design and optimization  
✅ Authentication and security  
✅ AI/ML integration  
✅ Containerization and DevOps  
✅ Multi-tenant SaaS architecture  
✅ Responsive UI/UX design  

**Perfect for**:
- Portfolio projects demonstrating full-stack skills
- Learning modern web development
- Building a real marketplace business
- Understanding enterprise-level application design

---

## 📝 License

MIT License - Feel free to use this project for personal or commercial purposes.

---

**Status**: ✅ Fully Functional & Documented  
**Last Updated**: February 19, 2025  
**Version**: 1.0.0

**Questions?** Check the documentation files or review the code in the [PROJECT_MAP.md](PROJECT_MAP.md)
