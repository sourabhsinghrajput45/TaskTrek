# 📋 TaskTrek

TaskTrek is a full-stack role-based task management application. It allows users to register, log in, and view their assigned tasks. Admins have extended functionality such as assigning tasks to team members. Built with React, Express, Sequelize ORM, and PostgreSQL, it includes secure JWT-based authentication and authorization.

## 🚀 Features

- 🔐 JWT Authentication (Login / Registration)
- 👥 Role-based Access Control (Admin / Member)
- 🧩 Task Management with Status Updates
- 📬 Task Assignment (Admin-only)
- 🌐 Protected Routes via Middleware
- 📦 Sequelize ORM with PostgreSQL

## 🛠️ Tech Stack

**Frontend**:
- React + Vite
- Tailwind CSS
- Axios

**Backend**:
- Node.js
- Express.js
- MySQL
- Sequelize ORM
- JSON Web Token (JWT)
- bcrypt

## 📂 Project Structure

```
tasktrek/
├── client/                # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── api/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
```

## ⚙️ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/tasktrek.git
cd tasktrek
```

### 2. Setup Backend

```bash
cd backend
npm install
cp .env.example .env   # Fill in DB and JWT_SECRET
node server.js
```

### 3. Setup Frontend

```bash
cd client
npm install
npm run dev
```

## 🔑 Environment Variables (`.env` for backend)

```env
DATABASE_URL=postgres://username:password@localhost:5432/tasktrekdb
JWT_SECRET=your_jwt_secret
```

## 🛡️ API Routes

### Auth Routes

| Method | Endpoint         | Description         |
|--------|------------------|---------------------|
| POST   | /api/auth/register | Register new user |
| POST   | /api/auth/login    | Login user         |
| GET    | /api/auth/users    | Get all users (admin only) |

### Task Routes

| Method | Endpoint         | Description         |
|--------|------------------|---------------------|
| GET    | /api/tasks/      | Get all tasks       |
| POST   | /api/tasks/      | Create task (admin only) |

## 👨‍💻 Author

Built with ❤️ by [Your Name](https://github.com/sourabhsinghrajput45)

---

© 2025 TaskTrek. All rights reserved.
