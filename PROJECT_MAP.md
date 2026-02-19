# Complete Project Map & File Structure

## 📂 Full Directory Tree with Descriptions

```
product-marketplace/
│
├── 📄 README.md                          # Project overview and quick start
├── 📄 TECH_STACK_OVERVIEW.md            # Comprehensive tech stack documentation
├── 📄 QUICK_REFERENCE.md                # Quick command reference and checklists
├── 📄 ARCHITECTURE.md                   # Detailed architecture & data flows
├── 📄 AI_CHATBOT_FIXES.md              # Recent AI chatbot fixes and improvements
├── 📄 .env                              # Environment variables (SENSITIVE - git-ignored)
├── 📄 .env.example                      # Environment template (safe to commit)
├── 📄 .gitignore                        # Git ignore rules
├── 📄 docker-compose.yml                # Docker compose configuration
│
├── 📁 frontend/                         # Next.js frontend application
│   │
│   ├── 📄 package.json                  # NPM dependencies and scripts
│   ├── 📄 package-lock.json             # Dependency lock file
│   ├── 📄 tsconfig.json                 # TypeScript configuration
│   ├── 📄 tailwind.config.ts            # Tailwind CSS configuration
│   ├── 📄 postcss.config.js             # PostCSS plugins
│   ├── 📄 jest.config.js                # Jest testing configuration
│   ├── 📄 jest.setup.js                 # Jest setup file
│   ├── 📄 next.config.js                # Next.js configuration (if exists)
│   ├── 📄 Dockerfile                    # Docker image for frontend
│   │
│   ├── 📁 app/                          # Next.js App Router (modern)
│   │   ├── 📄 layout.tsx                # Root layout wrapper
│   │   │                                # - Includes ChatWidget globally
│   │   │                                # - Sets up metadata
│   │   │                                # - Wraps with Providers
│   │   ├── 📄 globals.css               # Global Tailwind styles
│   │   ├── 📄 providers.tsx             # React Query setup
│   │   │
│   │   ├── 📁 (auth)/                   # Auth route group
│   │   │   ├── 📁 login/
│   │   │   │   └── 📄 page.tsx          # Login page with form
│   │   │   │       └─ Uses: useAuth hook, axios
│   │   │   │
│   │   │   └── 📁 register/
│   │   │       └── 📄 page.tsx          # Registration page
│   │   │           └─ Uses: useAuth hook, form validation
│   │   │
│   │   ├── 📁 (public)/                 # Public route group
│   │   │   ├── 📄 page.tsx              # Home/landing page
│   │   │   │   └─ Hero section, CTA buttons
│   │   │   │
│   │   │   └── 📁 products/
│   │   │       └── 📄 page.tsx          # Public product browse page
│   │   │           └─ Approved products only
│   │   │
│   │   ├── 📁 dashboard/                # Protected dashboard
│   │   │   ├── 📄 layout.tsx            # Dashboard layout wrapper
│   │   │   │   └─ Sidebar navigation, user info
│   │   │   │   └─ 'use client' - client component
│   │   │   │
│   │   │   ├── 📁 products/
│   │   │   │   ├── 📄 page.tsx          # Product list for business
│   │   │   │   │
│   │   │   │   ├── 📁 create/
│   │   │   │   │   └── 📄 page.tsx      # Create product form
│   │   │   │   │       └─ Uses: ProductForm component
│   │   │   │   │
│   │   │   │   └── 📁 [id]/
│   │   │   │       └── 📄 page.tsx      # Edit product page
│   │   │   │           └─ Fetch product by ID, show form
│   │   │   │
│   │   │   ├── 📁 users/
│   │   │   │   └── 📄 page.tsx          # Team member management
│   │   │   │       └─ Admin only - create/edit users
│   │   │   │
│   │   │   └── 📁 settings/
│   │   │       └── 📄 page.tsx          # Business settings
│   │   │           └─ Change name, integrations, etc.
│   │   │
│   │   └── 📁 api/
│   │       └── 📁 chat/
│   │           └── 📄 route.ts          # Chat API endpoint (Next.js API route)
│   │               ├─ Handles: POST /api/chat
│   │               ├─ Fetches products from backend
│   │               ├─ Calls OpenRouter/Mistral AI
│   │               └─ Saves to backend chat history
│   │
│   ├── 📁 components/                   # Reusable UI components
│   │   │
│   │   ├── 📁 chatbot/                  # Chat components
│   │   │   ├── 📄 ChatWidget.tsx        # Main chat widget UI
│   │   │   │   ├─ Floating button in bottom-right
│   │   │   │   ├─ Message input/output
│   │   │   │   ├─ Load/display history
│   │   │   │   └─ 'use client' component
│   │   │   │
│   │   │   └── 📄 MessageBubble.tsx     # Individual message display
│   │   │       ├─ User vs AI styling
│   │   │       └─ Timestamp display
│   │   │
│   │   ├── 📁 forms/
│   │   │   └── 📄 ProductForm.tsx       # Create/edit product form
│   │   │       ├─ React Hook Form integration
│   │   │       ├─ Zod validation
│   │   │       └─ Handles create/update/delete
│   │   │
│   │   ├── 📁 products/
│   │   │   ├── 📄 ProductCard.tsx       # Product display card
│   │   │   │   └─ Shows name, price, status
│   │   │   │
│   │   │   └── 📄 ProductFilters.tsx    # Product filter UI
│   │   │       ├─ Search, price range, status filter
│   │   │       └─ Sorting options
│   │   │
│   │   ├── 📁 layout/                   # Layout components
│   │   │   ├─ Navigation, headers, footers (if any)
│   │   │   └─ (currently empty - using Next.js layouts)
│   │   │
│   │   └── 📁 ui/                       # Shadcn UI components
│   │       ├── 📄 button.tsx            # Base button component
│   │       ├── 📄 input.tsx             # Base input component
│   │       ├── 📄 label.tsx             # Form label component
│   │       ├── 📄 card.tsx              # Card/container component
│   │       ├── 📄 form.tsx              # Form wrapper component
│   │       ├── 📄 select.tsx            # Select dropdown component
│   │       ├── 📄 textarea.tsx          # Textarea component
│   │       └─ (Additional Radix-based components)
│   │
│   ├── 📁 lib/                          # Utilities and hooks
│   │   │
│   │   ├── 📁 api/
│   │   │   └── 📄 client.ts             # Axios HTTP client
│   │   │       ├─ baseURL from env
│   │   │       ├─ Auto token attachment
│   │   │       ├─ Auto token refresh
│   │   │       ├─ Request/response logging
│   │   │       └─ Error handling interceptors
│   │   │
│   │   ├── 📁 hooks/
│   │   │   ├── 📄 useAuth.ts            # Authentication hook
│   │   │   │   ├─ login(), logout()
│   │   │   │   ├─ Fetch current user
│   │   │   │   ├─ hasPermission()
│   │   │   │   └─ Returns: user, loading, functions
│   │   │   │
│   │   │   ├── 📄 useProducts.ts        # Products hook
│   │   │   │   ├─ fetchProducts()
│   │   │   │   ├─ getProduct()
│   │   │   │   ├─ createProduct()
│   │   │   │   ├─ updateProduct()
│   │   │   │   ├─ deleteProduct()
│   │   │   │   └─ Filtering/pagination
│   │   │   │
│   │   │   ├── 📄 useChat.ts            # Chat hook
│   │   │   │   ├─ sendMessage()
│   │   │   │   ├─ getHistory()
│   │   │   │   └─ Error handling
│   │   │   │
│   │   │   └── 📄 useUsers.ts           # Users management hook
│   │   │       ├─ getUsers()
│   │   │       ├─ createUser()
│   │   │       ├─ updateUser()
│   │   │       └─ deleteUser()
│   │   │
│   │   ├── 📁 types/                    # TypeScript interfaces (empty - use inline)
│   │   │
│   │   ├── 📁 utils/                    # Utility functions
│   │   │
│   │   └── 📄 utils.ts                  # Helper functions
│   │       └─ Maybe: formatters, validators, etc.
│   │
│   ├── 📁 public/                       # Static assets
│   │   ├── favicon.ico
│   │   ├── robots.txt
│   │   └─ (Other static files)
│   │
│   └── 📁 __tests__/                    # Jest tests
│       ├── 📁 components/
│       │   └── 📄 ProductForm.test.tsx  # Product form tests
│       │       └─ Unit tests for form validation
│       │
│       └─ (Other test files)
│
├── 📁 backend/                          # Django REST API
│   │
│   ├── 📄 manage.py                     # Django CLI tool
│   ├── 📄 requirements.txt               # Python dependencies
│   ├── 📄 pytest.ini                    # Pytest configuration
│   ├── 📄 Dockerfile                    # Docker image for backend
│   │
│   ├── 📁 config/                       # Django project configuration
│   │   ├── 📄 __init__.py
│   │   ├── 📄 settings.py               # Django settings
│   │   │   ├─ INSTALLED_APPS
│   │   │   ├─ Database configuration
│   │   │   ├─ REST_FRAMEWORK config
│   │   │   ├─ JWT settings
│   │   │   └─ CORS settings
│   │   ├── 📄 urls.py                   # Root URL routing
│   │   │   ├─ /api/auth/
│   │   │   ├─ /api/products/
│   │   │   └─ /api/chat/
│   │   └── 📄 wsgi.py                   # WSGI application entry
│   │
│   ├── 📁 apps/                         # Django applications
│   │   │
│   │   ├── 📁 authentication/           # User & auth management
│   │   │   ├── 📄 __init__.py
│   │   │   ├── 📄 models.py             # User, Business, Role models
│   │   │   │   ├─ Business (name, timestamps)
│   │   │   │   ├─ Role (admin, editor, approver, viewer)
│   │   │   │   └─ User (extends AbstractUser)
│   │   │   ├── 📄 views.py              # Auth viewsets
│   │   │   │   ├─ RegisterView
│   │   │   │   ├─ UserViewSet (list, create, update)
│   │   │   │   ├─ RoleViewSet (read-only)
│   │   │   │   └─ me() endpoint (current user)
│   │   │   ├── 📄 serializers.py        # Data serialization
│   │   │   │   ├─ UserSerializer
│   │   │   │   ├─ RegisterSerializer
│   │   │   │   └─ RoleSerializer
│   │   │   ├── 📄 permissions.py        # Custom permissions
│   │   │   │   ├─ HasRolePermission
│   │   │   │   └─ IsBusinessAdmin
│   │   │   ├── 📄 urls.py               # Auth route registration
│   │   │   │   ├─ /register/
│   │   │   │   ├─ /login/
│   │   │   │   ├─ /refresh/
│   │   │   │   ├─ /me/
│   │   │   │   ├─ /users/
│   │   │   │   └─ /roles/
│   │   │   └── 📁 __pycache__/
│   │   │
│   │   ├── 📁 products/                 # Product management
│   │   │   ├── 📄 __init__.py
│   │   │   ├── 📄 models.py             # Product model
│   │   │   │   ├─ name, description, price
│   │   │   │   ├─ status (draft, pending, approved, rejected)
│   │   │   │   ├─ Foreign keys: business, created_by, approved_by
│   │   │   │   ├─ Timestamps: created, updated, approved
│   │   │   │   └─ approve() method
│   │   │   ├── 📄 views.py              # Product ViewSet
│   │   │   │   ├─ get_queryset() - filters by business
│   │   │   │   ├─ list_internal() - business products only
│   │   │   │   ├─ perform_create() - sets business/creator
│   │   │   │   └─ approve() - approval endpoint
│   │   │   ├── 📄 serializers.py        # Product serialization
│   │   │   │   ├─ ProductSerializer
│   │   │   │   └─ ProductApprovalSerializer
│   │   │   ├── 📄 permissions.py        # Product permissions
│   │   │   │   └─ ProductPermission (role-based access)
│   │   │   ├── 📄 filters.py            # Product filtering
│   │   │   │   └─ ProductFilter (search, price, status)
│   │   │   ├── 📄 urls.py               # Product routes
│   │   │   │   ├─ /
│   │   │   │   ├─ /{id}/
│   │   │   │   ├─ /{id}/approve/
│   │   │   │   └─ /list_internal/
│   │   │   └── 📁 __pycache__/
│   │   │
│   │   ├── 📁 chat/                     # Chat/AI integration
│   │   │   ├── 📄 __init__.py
│   │   │   ├── 📄 models.py             # ChatHistory model
│   │   │   │   ├─ user_message, ai_response
│   │   │   │   ├─ Foreign keys: user, business
│   │   │   │   ├─ timestamp (auto-created)
│   │   │   │   └─ Index: (business, timestamp)
│   │   │   ├── 📄 views.py              # Chat ViewSet
│   │   │   │   └─ ChatHistoryViewSet (GET/POST history)
│   │   │   ├── 📄 serializers.py        # Chat serialization
│   │   │   │   └─ ChatHistorySerializer (auto sets user/business)
│   │   │   ├── 📄 urls.py               # Chat routes
│   │   │   │   └─ /history/
│   │   │   ├── 📁 migrations/           # Database migrations
│   │   │   │   ├── 📄 __init__.py
│   │   │   │   └── 📄 0001_initial.py   # Initial ChatHistory table
│   │   │   └── 📁 __pycache__/
│   │   │
│   │   ├── 📁 core/                     # Core utilities
│   │   │   ├── 📄 __init__.py
│   │   │   ├── 📁 management/
│   │   │   │   ├── 📄 __init__.py
│   │   │   │   └── 📁 commands/
│   │   │   │       ├── 📄 __init__.py
│   │   │   │       └── 📄 populate_dummy_data.py
│   │   │   │           └─ Creates: businesses, users, products, dummy data
│   │   │   └── 📁 __pycache__/
│   │   │
│   │   └── 📁 __pycache__/
│   │
│   ├── 📁 tests/                        # Backend test suite
│   │   └── 📄 test_products.py          # Product endpoint tests
│   │       ├─ Test CRUD operations
│   │       ├─ Test permissions
│   │       └─ Test approval workflow
│   │
│   └── 📁 migrations/                   # Django system migrations
│       └─ (Handled automatically when running migrate)
│
└── 📁 .git/                             # Git repository
    └─ (Version control history)
```

---

## 🗺️ File Purpose Matrix

### Frontend Files & Their Roles

| File | Purpose | Dependencies |
|------|---------|--------------|
| `app/layout.tsx` | Root wrapper | ChatWidget, Providers |
| `app/(auth)/login/page.tsx` | User login | useAuth, axios |
| `app/(public)/page.tsx` | Landing page | Static content |
| `app/dashboard/layout.tsx` | Dashboard wrapper | useAuth, navigation |
| `app/dashboard/products/page.tsx` | Product list | useProducts, filters |
| `app/api/chat/route.ts` | AI chat endpoint | OpenRouter, backend API |
| `components/chatbot/ChatWidget.tsx` | Chat UI | useChat, React |
| `lib/api/client.ts` | HTTP client | Axios, env vars |
| `lib/hooks/useAuth.ts` | Auth state mgmt | apiClient, localStorage |
| `lib/hooks/useProducts.ts` | Product state | apiClient, React Query |
| `components/ui/*.tsx` | UI components | Shadcn/Radix UI |

### Backend Files & Their Roles

| File | Purpose | Dependencies |
|------|---------|--------------|
| `config/settings.py` | Django config | All apps, database |
| `config/urls.py` | URL routing | All app URLs |
| `apps/auth/models.py` | User schema | Django ORM |
| `apps/auth/views.py` | Auth endpoints | SimpleJWT, DRF |
| `apps/products/models.py` | Product schema | Django ORM |
| `apps/products/views.py` | Product endpoints | DRF, permissions |
| `apps/chat/models.py` | Chat schema | Django ORM |
| `apps/chat/views.py` | Chat endpoints | DRF, multi-tenant |
| `core/management/commands/populate_dummy_data.py` | Test data | Faker |

---

## 🔗 File Dependencies

### Frontend Component Dependencies
```
app/layout.tsx
  └─> ChatWidget (always rendered)
  └─> Providers (React Query)
      └─> useAuth (token check)

dashboard/layout.tsx
  └─> useAuth (require login)
  └─> Navigation menu
      └─> Link to products, users, settings

products/page.tsx
  └─> useProducts (fetch products)
  └─> ProductCard (display)
  └─> ProductFilters (filter UI)

ProductForm.tsx
  └─> React Hook Form
  └─> Zod validation
  └─> useProducts (create/update)

ChatWidget.tsx
  └─> useChat (send messages)
  └─> useAuth (business ID)
  └─> MessageBubble (display)
```

### Backend Model Dependencies
```
User (extends Django's AbstractUser)
  └─> ForeignKey: Business
  └─> ForeignKey: Role

Product
  └─> ForeignKey: Business
  └─> ForeignKey: User (created_by)
  └─> ForeignKey: User (approved_by)

ChatHistory
  └─> ForeignKey: User
  └─> ForeignKey: Business
```

### API Endpoint Dependencies
```
/api/products/list_internal/
  └─> Requires: Authentication
  └─> Requires: Business (auto-filtered)
  └─> Returns: Paginated product list

/api/products/{id}/approve/
  └─> Requires: Approver/Admin role
  └─> Returns: Updated product

/api/chat/history/
  └─> Requires: Authentication
  └─> Requires: Business (auto-filtered)
  └─> Returns: Paginated chat history

/api/chat (Next.js route)
  └─> Requires: Authorization header
  └─> Calls: /api/products/list_internal/ (backend)
  └─> Calls: OpenRouter API (external)
  └─> Calls: /api/chat/history/ (backend)
```

---

## 🧩 Component Composition Trees

### Dashboard Product Management Flow
```
DashboardLayout
├─ Sidebar Navigation
│  ├─ Products Link
│  ├─ Create Product Link
│  ├─ Users Link
│  └─ Settings Link
│
└─ MainContent
   └─ ProductsPage
      ├─ ProductFilters
      │  ├─ Search input
      │  ├─ Status filter
      │  ├─ Price range
      │  └─ Sort options
      │
      └─ ProductList
         └─ ProductCard[] (repeated)
            ├─ Product name
            ├─ Price display
            ├─ Status badge
            ├─ Edit button
            ├─ Delete button
            └─ Approve button (if approver)
```

### Chat Widget Render Tree
```
RootLayout
└─ ChatWidget (fixed bottom-right)
   └─ isOpen ? ChatPanel : ChatButton
      │
      └─ ChatPanel
         ├─ Header
         │  ├─ Title: "Product Assistant"
         │  └─ Close button
         │
         ├─ MessageList
         │  └─ MessageBubble[] (repeated)
         │     ├─ User message bubble
         │     └─ AI response bubble
         │
         └─ Input Section
            ├─ TextInput
            └─ SendButton
```

---

## 📊 Data Flow Between Components

### Creating a Product
```
ProductForm (component)
  ↓ (form submission)
useProducts.createProduct()
  ↓ (API call)
apiClient.post('/api/products/')
  ↓ (HTTP request)
Backend: ProductViewSet.create()
  ↓ (validation + save)
Database: INSERT product
  ↓ (response)
apiClient (success)
  ↓ (React Query invalidation)
useProducts (refetch)
  ↓ (component re-render)
ProductList (updated with new product)
```

### Approving a Product
```
ProductCard (Approve button)
  ↓ (click)
useProducts.updateProduct() or specialized function
  ↓ (API call)
apiClient.post('/api/products/{id}/approve/')
  ↓ (HTTP request)
Backend: ProductViewSet.approve()
  ↓ (permission check + product.approve())
Database: UPDATE product (status, approver, timestamp)
  ↓ (response)
ProductCard (updated status display)
  ↓ (product now visible in /api/products/ public endpoint)
PublicProductsPage (can now see approved product)
```

### Chat Message Flow
```
ChatWidget (input field)
  ↓ (user types & sends)
ChatWidget.handleSend()
  ↓ (validation)
useChat.sendMessage()
  ↓ (HTTP POST)
Frontend API: /api/chat
  ↓ (fetch products + OpenRouter call)
OpenRouter API (Mistral 7B)
  ↓ (AI generates response)
/api/chat (receives response)
  ↓ (save to history)
Backend: /api/chat/history/ POST
  ↓ (saves message pair)
Database: INSERT ChatHistory
  ↓ (response to frontend)
ChatWidget.handleSend() (completes)
  ↓ (add to messages array)
ChatWidget (displays AI response)
```

---

## 🎯 Key File Relationships

### Authentication Flow Files
1. `frontend/app/(auth)/login/page.tsx` → User enters credentials
2. `frontend/lib/hooks/useAuth.ts` → Calls loginfunction
3. `frontend/lib/api/client.ts` → Makes POST /api/auth/login/ request
4. `backend/apps/authentication/views.py` → TokenObtainPairView processes
5. `backend/config/settings.py` → JWT settings define token lifetimes
6. `frontend/lib/api/client.ts` → Interceptor stores token
7. Future requests attach token in header

### Product Lifecycle Files
1. `frontend/components/forms/ProductForm.tsx` → User creates product
2. `frontend/lib/hooks/useProducts.ts` → Sends to API
3. `backend/apps/products/views.py` → ProductViewSet.create()
4. `backend/apps/products/models.py` → Product saved with status='draft'
5. `frontend/app/dashboard/products/page.tsx` → Shows in user's list
6. Editor submits for approval
7. `backend/apps/products/permissions.py` → Approver checks role
8. `backend/apps/products/models.py` → product.approve() called
9. `frontend/app/(public)/products/page.tsx` → Product now visible publicly

### Chat Ecosystem Files
1. `frontend/components/chatbot/ChatWidget.tsx` → User types message
2. `frontend/lib/hooks/useChat.ts` → Sends via useChat.sendMessage()
3. `frontend/app/api/chat/route.ts` → Next.js API receives request
4. Fetches from: `backend/apps/products/views.py` → list_internal endpoint
5. Calls: External OpenRouter API (Mistral 7B model)
6. Saves via: `backend/apps/chat/views.py` → ChatHistoryViewSet.create()
7. Stores in: `backend/apps/chat/models.py` → ChatHistory model
8. Displays in: `frontend/components/chatbot/MessageBubble.tsx` → Shows message

---

## 📈 File Size & Complexity Analysis

```
FRONTEND:

Size (LOC):
- app/layout.tsx:                 ~30 LOC  (simple)
- app/dashboard/layout.tsx:       ~135 LOC (medium - complex navigation)
- components/chatbot/ChatWidget:  ~184 LOC (medium - state management)
- components/forms/ProductForm:   ~100+ LOC (medium - form handling)
- lib/hooks/useAuth.ts:           ~78 LOC (simple)
- lib/hooks/useProducts.ts:       ~82 LOC (simple)
- lib/api/client.ts:              ~50 LOC (medium - interceptors)

BACKEND:

Size (LOC):
- apps/auth/models.py:            ~35 LOC (simple)
- apps/auth/views.py:             ~40 LOC (simple - mostly class-based)
- apps/products/models.py:        ~40 LOC (simple)
- apps/products/views.py:         ~60 LOC (medium - custom methods)
- apps/products/permissions.py:   ~40 LOC (medium - permission logic)
- apps/chat/models.py:            ~20 LOC (simple)
- config/settings.py:             ~143 LOC (complex - many configs)
- config/urls.py:                 ~10 LOC (simple)

Complexity Distribution:
- Low complexity:     ~50% (models, simple views)
- Medium complexity:  ~40% (permissions, forms, hooks)
- High complexity:    ~10% (settings, chat API route, authentication flow)
```

---

## 🔄 Update/Add Workflow

### When Adding a New Feature

1. **Backend**
   - Add model to `apps/[feature]/models.py`
   - Create migration (auto-generated by Django)
   - Add serializer to `apps/[feature]/serializers.py`
   - Add ViewSet/view to `apps/[feature]/views.py`
   - Register in `apps/[feature]/urls.py`
   - Add tests to `tests/test_[feature].py`

2. **Frontend**
   - Create hook: `lib/hooks/use[Feature].ts`
   - Create component: `components/[feature]/Component.tsx`
   - Create page: `app/[route]/page.tsx`
   - Add tests: `__tests__/components/Component.test.tsx`

3. **Integration**
   - Update `config/urls.py` (backend)
   - Add navigation link to layout
   - Test full flow

### When Fixing a Bug

1. Identify which file/layer has the issue
2. Check related files in dependency tree
3. Add/update error logging if needed
4. Make minimal change
5. Test locally before deploying

---

**File Structure Version**: 1.0  
**Last Updated**: February 19, 2026  
**Total Files**: ~80 (including node_modules dependencies)  
**Total Lines of Code**: ~2000-2500 (excluding node_modules, venv)
