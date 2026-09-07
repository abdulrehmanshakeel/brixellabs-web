# BrixelLabs Django REST Framework Backend (PostgreSQL)

Production-ready backend API service for the BrixelLabs AI Systems platform powered by **PostgreSQL**.

---

## Tech Stack
- **Database**: **PostgreSQL** (`psycopg2-binary` + `dj-database-url`)
- **Framework**: Django 5.2 + Django REST Framework 3.18
- **Authentication**: JWT (JSON Web Tokens via `djangorestframework-simplejwt`)
- **CORS**: `django-cors-headers` configured for Vite (`http://localhost:5173`)

---

## 1. PostgreSQL Database Setup

Create a PostgreSQL database on your local server or cloud provider (Supabase / Neon / AWS RDS / Docker):

```sql
CREATE DATABASE brixellabs_db;
```

---

## 2. Environment Configuration (`backend/.env`)

Configure your PostgreSQL credentials in `backend/.env`:

```env
# Primary PostgreSQL Database Configuration
DB_ENGINE=postgresql
POSTGRES_DB=brixellabs_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_postgres_password
POSTGRES_HOST=localhost
POSTGRES_PORT=5432

# Or supply complete connection URI (Neon / Supabase / AWS):
# DATABASE_URL=postgresql://username:password@ep-cool-cloud.us-east-1.aws.neon.tech/brixellabs_db?sslmode=require
```

---

## 3. Quickstart Commands

```bash
# 1. Navigate to backend directory
cd backend

# 2. Run database migrations to create PostgreSQL tables
python manage.py migrate

# 3. Seed initial data (Inquiries, Services, Portfolio, Team, Settings, Superuser)
python manage.py seed_data

# 4. Start the Django API server on port 8000
python manage.py runserver 8000
```

---

## 4. Default Admin Credentials
- **Username**: `admin`
- **Email**: `admin@brixellabs.com`
- **Password**: `Admin@Brixel2026`
- **Admin Panel URL**: `http://127.0.0.1:8000/admin/`

---

## 5. REST API Endpoints

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/health/` | System Health Check & PostgreSQL status | No |
| `POST` | `/api/auth/login/` | Admin JWT token generation (`access` + `refresh`) | No |
| `POST` | `/api/auth/token/refresh/` | Refresh expired JWT access token | No |
| `GET` | `/api/admin/stats/` | Live Command Center Analytics & KPIs | Yes (JWT) |
| `GET` | `/api/inquiries/` | List all client leads & consultations | Yes (JWT) |
| `POST` | `/api/inquiries/` | Public consultation / lead submission | **No (Public)** |
| `PATCH` | `/api/inquiries/{id}/` | Update lead status (`New`, `In Review`, etc.) | Yes (JWT) |
| `DELETE` | `/api/inquiries/{id}/` | Delete lead | Yes (JWT) |
| `GET` | `/api/services/` | List agency service offerings | No |
| `PATCH` | `/api/services/{id}/` | Update service details or active toggle | Yes (JWT) |
| `GET` | `/api/portfolio/` | List case studies (Noesis, Watcher, etc.) | No |
| `PATCH` | `/api/portfolio/{id}/` | Update case study metrics & description | Yes (JWT) |
| `GET` | `/api/team/` | List team members & skills | No |
| `GET` | `/api/settings/` | Get site contact info & metadata | No |
| `GET` | `/api/audit-logs/` | View system security and change audit history | Yes (JWT) |
