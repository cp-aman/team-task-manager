# Team Task Manager

A full-stack Team Task Manager web application where users can create projects, assign tasks, manage teams, and track progress with role-based access control.

## Features

### Authentication

* User signup and login
* JWT-based authentication
* Password hashing using bcrypt
* Persistent login state

### Role-Based Access Control

#### Admin

* Create projects
* Add/remove members
* Create and assign tasks
* Manage team workflow

#### Member

* View assigned projects
* View tasks
* Update assigned task status

### Project Management

* Create projects
* Team collaboration
* Member management
* Project-specific task tracking

### Task Management

* Create tasks
* Assign tasks to team members
* Set due dates and priorities
* Update task status

  * Todo
  * In Progress
  * Done

### Dashboard

* Total tasks
* Tasks by status
* Overdue tasks
* Task analytics

---

# Tech Stack

## Frontend

* React
* React Router DOM
* Axios
* Vite

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcryptjs

## Deployment

* Railway

---

# Project Structure

```bash
team-task-manager/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   ├── routes/
    │   └── services/
```

---

# Installation

## Clone Repository

```bash
git clone <your_repo_url>
cd team-task-manager
```

---

# Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm run dev
```

---

# Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# API Routes

## Auth

* POST `/api/auth/signup`
* POST `/api/auth/login`

## Projects

* GET `/api/projects`
* POST `/api/projects`
* PUT `/api/projects/add-member`
* PUT `/api/projects/remove-member`

## Tasks

* POST `/api/tasks`
* GET `/api/tasks/project/:projectId`
* PUT `/api/tasks/:taskId`

## Dashboard

* GET `/api/dashboard`

---

# Environment Variables

## Backend

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

# Deployment

The application is deployed using Railway.

Frontend and backend are deployed separately and connected using environment variables.

---

# Future Improvements

* Drag and drop Kanban board
* Notifications
* Activity logs
* File uploads
* Better UI/UX
* Task filtering and sorting
