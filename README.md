# Business Product Marketplace

A complete multi-tenant marketplace platform with role-based permissions, product approval workflows, and AI chatbot integration.

## 🚀 Features

- **Role-Based Access Control**: Admin, Editor, Approver, Viewer roles with granular permissions.
- **Product Workflow**: Draft -> Pending Approval -> Approved -> Public.
- **AI Integration**: Chatbot assistant powered by OpenAI to query product information.
- **Modern UI**: Built with Next.js 14, Tailwind CSS, and Shadcn UI components.
- **Robust Backend**: Django REST Framework with JWT authentication.

## 🛠️ Tech Stack

- **Backend**: Django 4.2+, Django REST Framework, PostgreSQL
- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, React Query
- **Infrastructure**: Docker, Docker Compose

## 📦 Quick Start

### Prerequisites

- Docker and Docker Compose
- API Keys (OpenAI)

### Setup

1.  **Clone the repository** (if applicable).
2.  **Environment Variables**:
    - Backend: Copy `.env.example` to `.env` in `backend/` (already created).
    - Frontend: Copy `.env.local` in `frontend/` (already created).
    - **Important**: Set your `OPENAI_API_KEY` in `frontend/.env.local`.

3.  **Run with Docker**:
    ```bash
    docker-compose up --build
    ```
    This starts:
    - Backend on http://localhost:8000
    - Frontend on http://localhost:3000
    - PostgreSQL database

4.  **Create Superuser**:
    ```bash
    docker-compose exec backend python manage.py migrate
    docker-compose exec backend python manage.py createsuperuser
    ```

### Local Development (Without Docker)

**Backend**:
```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

**Frontend**:
```bash
cd frontend
npm install
npm run dev
```

## 🔐 Default Permissions

| Role     | Create | Edit | Approve | Delete | Manage Users |
| :------- | :----- | :--- | :------ | :----- | :----------- |
| Admin    | ✅     | ✅   | ✅      | ✅     | ✅           |
| Editor   | ✅     | ✅   | ❌      | ❌     | ❌           |
| Approver | ❌     | ❌   | ✅      | ❌     | ❌           |
| Viewer   | ❌     | ❌   | ❌      | ❌     | ❌           |

## 🤖 AI Chatbot

The chatbot widget appears on all pages. It uses OpenAI to answer questions about products available in the marketplace.

## 🧪 Testing

Run backend tests:
```bash
cd backend
pytest
```

## 📝 License

MIT
