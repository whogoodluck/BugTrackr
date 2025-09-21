# Bug Reporting & Tracking System

A full-stack web application for reporting, tracking, and managing software bugs with role-based access control.

## 🚀 Live Demo

You can view the live version of the application at:

[See Live](https://)

## 📋 Features

- **Bug Reporting:** Submit bugs with title, description, severity levels
- **Role-Based Access:** Reporter and Admin roles with different permissions
- **Bug Dashboard:** View and manage bugs based on user role
- **Search & Filter:** Filter by status, severity, and search by title
- **Status Management:** Track bugs through Open → In Progress → Closed workflow
- **User Authentication:** Secure login/registration system

## 🛠 Tech Stack

**Frontend:**

- React.js
- Tailwind CSS
- Shadcn
- Axios for API calls
- React Form
- Zod
- React Router for navigation

**Backend:**

- Node.js
- Express.js
- JWT Authentication
- bcrypt for password hashing

**Database:**

- PostgreSQL
- Prisma ORM

## 📊 Database Schema

```
┌─────────────┐         ┌──────────────┐
│    users    │         │     bugs     │
├─────────────┤         ├──────────────┤
│ id (PK)     │<────────│ id (PK)      │
│ name        │         │ title        │
│ email       │         │ description  │
│ password    │         │ severity     │
│ role        │         │ status       │
│ created_at  │         │ reporterId (FK) │
│ updated_at  │         │ created_at   │
└─────────────┘         │ updated_at   │
                        └──────────────┘

Relationships:
- users.id → bugs.reporterId (One-to-Many)
- Users can have multiple bugs
- Each bug belongs to one user
```

### Database Tables

**Users Table:**

- `id`: Primary key (UUID)
- `name`: Name (VARCHAR)
- `email`: User email (VARCHAR, UNIQUE)
- `password`: Hashed password (VARCHAR)
- `role`: User role - 'reporter' or 'admin' (ENUM)
- `created_at`: Timestamp
- `updated_at`: Timestamp

**Bugs Table:**

- `id`: Primary key (UUID)
- `title`: Bug title (VARCHAR)
- `description`: Detailed bug description (TEXT)
- `severity`: Bug severity - 'Low', 'Medium', 'High' (ENUM)
- `status`: Bug status - 'Open', 'In Progress', 'Closed' (ENUM, DEFAULT: 'Open')
- `reporterId`: Foreign key referencing users.id
- `created_at`: Timestamp
- `updated_at`: Timestamp

## 🚦 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL
- Git

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/whogoodluck/BugTrackr.git
cd BugTrackr
```

2. **Install Backend Dependencies**

```bash
cd backend
npm install
```

3. **Install Frontend Dependencies**

```bash
cd ../frontend
npm install
```

4. **Environment Setup**

Create `.env` file in the backend directory:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/bug_tracker"
DEV_DATABASE_URL="postgresql://username:password@localhost:3306/yourdb"
JWT_SECRET="your-super-secret-jwt-key"
PORT=3001
```

5. **Database Setup**

```bash
cd backend
npx prisma migrate dev --name init
npx prisma generate
```

6. **Seed Database (Optional)**

```bash
npm run seed
```

### Running the Application

1. **Start Backend Server**

```bash
cd backend
npm run dev
```

2. **Start Frontend Development Server**

```bash
cd frontend
npm start
```

The application will be available at:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3001`

## 📱 Usage

### User Roles & Permissions

**Reporter Role:**

- Register and login
- Submit new bug reports
- View only their own bugs
- Delete / Update your own bugs

**Admin Role:**

- View all bugs in the system
- Update status of any bug
- Search and filter all bugs
- Manage bug assignments

### Default Admin Account

- Email: `goodluck@example.com`
- Password: `hashedpassword123`

## 🎨 Screenshots

![BugTrackr Interface](./public/BugTrackr.png)

### Bug Reporting Form

- Clean, intuitive form with validation
- Severity selection (Low/Medium/High)
- Rich text description field

### Dashboard

- Role-based bug display
- Status indicators with color coding
- Search and filter functionality

### Bug Management

- Status update workflow
- Responsive design for mobile/desktop

## 🤖 AI Usage Documentation

### Where AI was used:

1. **Database Schema Design**: Used ChatGPT to optimize the PostgreSQL schema and relationships
2. **React Component Structure**: Copilot helped generate boilerplate components and hooks
3. **API Route Implementation**: AI assisted with Express.js route handlers and middleware
4. **CSS Styling**: Used AI for Tailwind CSS class combinations and responsive design
5. **Error Handling**: ChatGPT helped implement comprehensive error handling patterns

### Why AI was used:

- **Faster Development**: Reduced time spent on repetitive boilerplate code
- **Best Practices**: AI suggested industry-standard patterns for authentication and API design
- **Bug Prevention**: AI helped identify potential security vulnerabilities and edge cases
- **Documentation**: Assisted in creating comprehensive API documentation

### What was learned:

- **Code Review Skills**: Learned to critically evaluate AI-generated code

### AI Tools Used:

- **ChatGPT-4**: Architecture planning, debugging complex issues
- **Claude**: Documentation writing and code optimization

## 👥 Authors

- **Sunny Kumar** - _Full Stack Developer_ - [GitHub](https://github.com/whogoodluck)

## 🙏 Acknowledgments

- Thanks to the open-source community
- Inspiration from various bug tracking tools like Jira and GitHub Issues
- AI tools that accelerated development process

---

**Note**: This is an internship assignment project demonstrating full-stack development skills with modern web technologies.
