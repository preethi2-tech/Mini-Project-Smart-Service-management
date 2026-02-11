# Smart Service - Complaint Management System

A full-stack web application for managing student complaints and support requests in an educational institution.

## 📋 Project Overview

Smart Service is a complaint management platform that streamlines the process of student grievance handling. Students can file complaints, staff members can track and resolve them, and administrators can oversee the entire system.

## 🎯 Features

- **User Authentication**: Secure login system with JWT tokens and password hashing
- **Role-based Dashboards**: Separate interfaces for Students, Staff, and Admin
- **Complaint Management**: Create, track, and manage student complaints
- **Status Tracking**: Real-time complaint status updates (Pending → In Progress → Completed)
- **Staff Assignment**: Assign complaints to staff members for resolution
- **Remarks System**: Staff can add remarks and notes to complaints

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js (v5.2.1)
- **Database**: MongoDB with Mongoose (v9.1.6)
- **Authentication**: JWT & bcryptjs
- **Middleware**: CORS
- **Environment**: dotenv

### Frontend
- **Framework**: React (v19.2.0) with Vite
- **Routing**: React Router DOM (v7.13.0)
- **HTTP Client**: Axios (v1.13.4)
- **Styling**: CSS
- **Build Tool**: Vite (v7.2.4)

## 📁 Project Structure

```
smart_service/
├── backend/
│   ├── package.json
│   ├── server.js
│   ├── models/
│   │   ├── User.js           # User schema (staff/admin)
│   │   └── Complaint.js      # Complaint schema
│   └── routes/
│       ├── authRoutes.js     # Authentication endpoints
│       └── complaintRoutes.js # Complaint management endpoints
│
└── frontend/
    ├── package.json
    ├── vite.config.js
    ├── index.html
    ├── src/
    │   ├── App.jsx           # Main app component
    │   ├── main.jsx          # Entry point
    │   ├── components/
    │   │   ├── Layout.jsx    # Layout wrapper
    │   │   └── Login.jsx     # Login component
    │   └── pages/
    │       ├── home.jsx      # Home page
    │       ├── Admin.jsx     # Admin dashboard
    │       ├── Staff.jsx     # Staff dashboard
    │       └── Student.jsx   # Student dashboard
    └── public/
```

## 📊 Database Schema

### User Collection
| Field | Type | Notes |
|-------|------|-------|
| _id | ObjectId | Primary Key |
| username | String | Unique, Required |
| password | String | Hashed, Required |

### Complaint Collection
| Field | Type | Notes |
|-------|------|-------|
| _id | ObjectId | Primary Key |
| studentName | String | Required |
| registerNo | String | Required |
| type | String | Complaint type, Required |
| description | String | Required |
| date | Date | Required |
| contactNo | String | Required |
| staffAssigned | String | Default: "Not Assigned" |
| status | Enum | Pending, In Progress, Completed |
| remarks | String | Optional notes |

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd smart_service
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```

### Configuration

Create a `.env` file in the backend directory:
```env
MONGODB_URI=mongodb://localhost:27017/smart_service
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

## 🏃 Running the Application

### Start Backend Server
```bash
cd backend
npm start
# Server runs on http://localhost:5000
```

### Start Frontend Development Server
```bash
cd frontend
npm run dev
# App runs on http://localhost:5173
```

### Build for Production
```bash
# Frontend
cd frontend
npm run build

# Creates optimized build in dist/ folder
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Complaints
- `GET /api/complaints` - Get all complaints
- `POST /api/complaints` - Create new complaint
- `GET /api/complaints/:id` - Get complaint by ID
- `PUT /api/complaints/:id` - Update complaint
- `DELETE /api/complaints/:id` - Delete complaint

## 👥 User Roles

- **Student**: Can file complaints and view their status
- **Staff**: Can view assigned complaints and update status/remarks
- **Admin**: Has full access to all complaints and user management

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- CORS protection
- Environment variable management

## 📝 Development Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend
- `npm start` - Start server with nodemon (auto-reload)

## 🐛 Troubleshooting

- **MongoDB Connection Error**: Ensure MongoDB is running and connection URI is correct
- **CORS Issues**: Check that backend and frontend URLs are properly configured
- **Port Already in Use**: Change PORT in .env file

## 📄 License

ISC

## 👤 Author

Your Name

---

**Last Updated**: February 2026
