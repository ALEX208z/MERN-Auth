# MERN-Auth 🔐

A full-stack authentication system built with the MERN stack (MongoDB, Express, React, Node.js) featuring JWT-based authentication, email verification via OTP, and secure cookie management.

---

## Features

- **User Registration** — Create an account with name, email, and password (hashed with bcrypt)
- **User Login / Logout** — Secure session management using HTTP-only cookies
- **JWT Authentication** — Stateless auth with 7-day token expiry
- **Email Verification** — OTP-based account verification sent via Brevo (SMTP)
- **Welcome Email** — Automated welcome email on successful registration
- **Protected Routes** — Middleware-based route protection using JWT
- **User Data Endpoint** — Fetch authenticated user's profile data

---

## Tech Stack

| Layer     | Technology                          |
|-----------|--------------------------------------|
| Frontend  | React.js                            |
| Backend   | Node.js, Express.js                 |
| Database  | MongoDB (Mongoose)                  |
| Auth      | JWT, bcryptjs                       |
| Email     | Nodemailer + Brevo SMTP             |
| Cookies   | cookie-parser                       |

---

## Project Structure

```
├── config/
│   ├── mongodb.js          # MongoDB connection
│   └── nodemailer.js       # Nodemailer/Brevo transporter
├── controllers/
│   ├── authController.js   # register, login, logout, OTP logic
│   └── userController.js   # getUserData
├── middleware/
│   └── userAuth.js         # JWT verification middleware
├── models/
│   └── userModel.js        # Mongoose user schema
├── routes/
│   ├── authRoutes.js       # /api/auth/*
│   └── userRoutes.js       # /api/user/*
└── server.js               # Express app entry point
```

---

## API Endpoints

### Auth Routes — `/api/auth`

| Method | Endpoint            | Auth Required | Description                        |
|--------|---------------------|---------------|------------------------------------|
| POST   | `/register`         | ❌            | Register a new user                |
| POST   | `/login`            | ❌            | Login and receive auth cookie      |
| POST   | `/logout`           | ❌            | Clear auth cookie                  |
| POST   | `/send-verify-otp`  | ✅            | Send OTP to user's email           |
| POST   | `/verify-account`   | ✅            | Verify account with OTP            |
| GET    | `/is-auth`          | ✅            | Check if user is authenticated     |

### User Routes — `/api/user`

| Method | Endpoint | Auth Required | Description              |
|--------|----------|---------------|--------------------------|
| GET    | `/data`  | ✅            | Get authenticated user's profile |

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account
- Brevo account (for SMTP email)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/mern-auth.git
cd mern-auth

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development

SMTP_USER=your_brevo_smtp_login
SMTP_KEY=your_brevo_smtp_password
SENDER_EMAIL=your_verified_sender_email
```

> **Note:** `SMTP_USER` should be the login shown in your Brevo Dashboard under **SMTP & API → SMTP tab**, not your Gmail address.

### Run the Server

```bash
# Development
npm run dev

# Production
npm start
```

Server runs on `http://localhost:4000`

---

## Authentication Flow

```
Register → Save user → Set JWT cookie → Send welcome email
Login    → Verify password → Set JWT cookie
Request  → userAuth middleware → Decode JWT → Attach userId to req
Verify   → Send OTP to email → User submits OTP → Mark account verified
```

---

## Security Notes

- Passwords are hashed using **bcrypt** (salt rounds: 10)
- JWT tokens are stored in **HTTP-only cookies** (not accessible via JavaScript)
- Cookies use `sameSite: none` + `secure: true` in production
- OTPs expire after **24 hours**

---

## License

MIT