# 🔐 SecureAuth

A production-ready Full Stack Authentication System built using **Node.js, Express.js, MongoDB Atlas, JWT, and Vanilla JavaScript.**

SecureAuth provides a reusable authentication module for developers building web applications, hackathon projects, or MVPs. Instead of rebuilding authentication from scratch, simply clone, configure, and customize.

---


# 🌐 Live Demo

### Frontend

https://secure-auth-git-main-abhinav-dixits-projects-9016b694.vercel.app

### Backend

https://secure-auth-357h.onrender.com

---

# ✨ Features

## Authentication

- ✅ User Signup
- ✅ Secure Login
- ✅ JWT Authentication
- ✅ Logout
- ✅ Protected Dashboard

## Email Verification

- ✅ Email OTP Verification
- ✅ OTP Expiry
- ✅ Resend OTP

## Password Recovery

- ✅ Forgot Password
- ✅ OTP Verification
- ✅ Reset Password

## Security

- ✅ bcrypt Password Hashing
- ✅ JWT Token Authentication
- ✅ Protected Routes
- ✅ MongoDB Atlas Integration

## User Experience

- ✅ Password Visibility Toggle
- ✅ Toast Notifications
- ✅ Responsive Design
- ✅ Dashboard
- ✅ Client-side Validation

---

# 🛠 Tech Stack

## Frontend

- HTML5
- CSS3
- Vanilla JavaScript

## Backend

- Node.js
- Express.js

## Database

- MongoDB Atlas
- Mongoose

## Authentication

- JWT
- bcrypt

## Email Service

- Nodemailer

## Deployment

- Vercel
- Render

---

# 📂 Project Structure

```text
SecureAuth/

│

├── client/
│   ├── assets/
│   ├── css/
│   ├── js/
│   └── pages/
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── screenshots/
│
├── LICENSE
├── README.md
└── .gitignore
```

---

# 🚀 Installation

Clone the repository

```bash
git clone https://github.com/Abhinavjs903/Secure_auth.git
```

Go to the server

```bash
cd server
```

Install dependencies

```bash
npm install
```

Create a `.env` file using `.env.example`:

​```
cp .env.example .env
​```

Then fill in your own values for `MONGO_URI`, `JWT_SECRET`, `EMAIL_USER`, and `EMAIL_PASS`.



Start the server

```bash
npm run dev
```

Open the frontend using Live Server or deploy it to Vercel.

---

# 🔑 Environment Variables

```env
PORT=

MONGO_URI=

JWT_SECRET=

EMAIL_USER=

EMAIL_PASS=
```

---

# 📸 Screenshots

## Login

![Login](screenshots/Screenshot 2026-08-06 111405.jpg)

## Signup

![Signup](screenshots/Screenshot 2026-08-06 111435.jpg)

## Forgot Password

![Forgot Password](screenshots/Screenshot 2026-08-06 111446.jpg)

## Dashboard

(Add Screenshot)

---

# 🎯 Learning Objectives

This project demonstrates:

- REST APIs
- MVC Architecture
- JWT Authentication
- Password Hashing
- Email OTP Verification
- MongoDB Integration
- Secure Authentication Flow
- Production Deployment
- Modular JavaScript
- Full Stack Development

---

# 🤝 Contributing

Contributions, issues, and feature requests are welcome.

Feel free to fork the repository and improve SecureAuth.

---

# 📜 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Abhinav Dixit**

If this project helped you, consider giving it a ⭐ on GitHub.