# Finance Data Processing and Access Control Backend

A robust, professional RESTful API for managing financial records with Role-Based Access Control (RBAC). Built with **Node.js**, **Express**, and **SQLite** (Sequelize ORM).

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)

### 2. Installation
Clone or extract the project, then run the following in the project root:
```bash
npm install
```

### 3. Initialize Database and Seed Data
Before starting the server, initialize the SQLite database with sample users and transactions:
```bash
npm run seed
```
This will create a `database.sqlite` file and pre-populate it with:
- **Admin**: `admin@finance.com` (password: `password123`)
- **Analyst**: `analyst@finance.com` (password: `password123`)
- **Viewer**: `viewer@finance.com` (password: `password123`)

### 4. Start the Server
Run the production server:
```bash
npm start
```
Or use the development mode (auto-restarts on changes):
```bash
npm run dev
```
The server will start at `http://localhost:5000`.

---

## 🛠 Features

### 1. User & Role Management (RBAC)
- **Admin**: Full control over records and users. Can manage user roles and status.
- **Analyst**: Can view financial records and dashboard summaries.
- **Viewer**: Can only access the dashboard summary APIs.
- **Authentication**: Secured using **JWT** (JSON Web Tokens).

### 2. Financial Records Management
- CRUD operations for Income and Expenses.
- Detailed fields: Amount, Category, Type, Date, Notes.
- **Filtering Support**: Filter by Date Range, Category, Type, and Amount Range (Min/Max).

### 3. Dashboard Summary APIs
- Aggregated data for:
  - Total Income
  - Total Expenses
  - Net Balance
  - Category-wise Totals
  - Monthly Trends (Financial growth/loss over time)
  - Recent Activity (Last 5 transactions)

### 4. Validation & Error Handling
- Input validation using Joi schemas.
- Centralized error handling middleware.
- Informative error messages and correct HTTP status codes.

---

## 🗺 API Routes

### Authentication
- `POST /api/auth/register` - Create a new user (default role: Viewer)
- `POST /api/auth/login` - Login to receive a JWT token

### Dashboard (RBAC)
- `GET /api/dashboard/summary` - Get aggregated financial stats (Viewer, Analyst, Admin)

### Transactions (RBAC)
- `GET /api/transactions` - Filter and list transactions (Analyst, Admin)
- `GET /api/transactions/:id` - Detailed transaction view (Analyst, Admin)
- `POST /api/transactions` - Create a new entry (Admin only)
- `PUT /api/transactions/:id` - Update an entry (Admin only)
- `DELETE /api/transactions/:id` - Remove an entry (Admin only)

### User Management (Admin Only)
- `GET /api/users` - List all users
- `PUT /api/users/:id` - Update user role or status (Active/Inactive)
- `DELETE /api/users/:id` - Delete a user

---

## 🏗 Project Structure

```bash
src/
├── app.js               # Express application initialization
├── server.js            # Entry point for the server
├── config/
│   └── database.js      # Sequelize SQLite configuration
├── controllers/
│   ├── authController.js # Authentication logic
│   ├── dashboardController.js # Aggregated analytics
│   ├── transactionController.js # CRUD for records
│   └── userController.js # Admin user management
├── middlewares/
│   ├── auth.js          # JWT Verification
│   ├── authorize.js     # Role-based validation
│   └── errorHandler.js  # Global error interceptor
├── models/
│   ├── User.js          # User schema
│   ├── Transaction.js   # Financial record schema
│   └── index.js         # Model associations
├── routes/              # API route definitions
└── utils/
    └── validators.js    # Data validation schemas
```

## ⚙ Technology Stack
- **Backend Framework**: Express.js (Node.js)
- **Database**: SQLite (Zero-config, portable)
- **ORM**: Sequelize
- **Security**: JWT & Bcryptjs
- **Logging**: Morgan
- **Validation**: Joi (optional implementation in `utils/`)
