# 🚀 GigFlow – Mini Freelance Marketplace Platform

GigFlow is a full-stack mini freelance marketplace where users can post gigs, bid on jobs, and hire freelancers.  
This project was built as part of a **Full Stack Development Internship Assignment**, focusing on secure authentication, complex database relationships, and atomic business logic.

---

## 🌐 Live Links

- **Frontend:** https://your-frontend-link.vercel.app  
- **Backend API:** https://your-backend-link.onrender.com  
- **Demo Video (Hiring Flow):** https://loom.com/your-video-link

---

## 🧠 Project Overview

GigFlow allows:
- Any authenticated user to post jobs (**Client role**)
- Any authenticated user to bid on jobs (**Freelancer role**)
- Clients to review bids and hire exactly **one freelancer per gig**
- Freelancers to receive **real-time hiring notifications**

---

## 🛠️ Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- Redux Toolkit
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication (HttpOnly Cookies)

### Real-time
- Socket.io

---

## ✨ Core Features

### 🔐 Authentication
- Secure user registration and login
- JWT stored in HttpOnly cookies
- No fixed roles (users can act as both client and freelancer)

---

### 📋 Gig Management
- Create new gigs (Title, Description, Budget)
- Browse all open gigs
- Search gigs by title
- Gig statuses:
  - `open`
  - `assigned`

---

### 💼 Bidding System
- Freelancers can submit bids with:
  - Message
  - Proposed price
- Clients can view all bids for their gigs
- Bid statuses:
  - `pending`
  - `hired`
  - `rejected`

---

## 🧩 Hiring Logic (Core Requirement)

When a client hires a freelancer:
1. Gig status changes from `open` → `assigned`
2. Selected bid status becomes `hired`
3. All other bids for the same gig are marked as `rejected`
4. Only **one freelancer** can be hired per gig

---

## 🏆 Bonus Features

### ✅ Transactional Integrity
- Hiring logic implemented using **MongoDB Transactions**
- Prevents race conditions
- Ensures only one bid can be hired even with simultaneous requests

### ✅ Real-Time Notifications
- Integrated **Socket.io**
- Freelancer receives instant notification:
  > “You have been hired for [Project Name]!”

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|------|---------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login and set HttpOnly cookie |

---

### Gigs
| Method | Endpoint | Description |
|------|---------|-------------|
| GET | `/api/gigs` | Fetch all open gigs (search supported) |
| POST | `/api/gigs` | Create a new gig |

---

### Bids
| Method | Endpoint | Description |
|------|---------|-------------|
| POST | `/api/bids` | Submit a bid |
| GET | `/api/bids/:gigId` | Get bids for a gig (Owner only) |

---

### Hiring
| Method | Endpoint | Description |
|------|---------|-------------|
| PATCH | `/api/bids/:bidId/hire` | Hire freelancer (atomic logic) |

---

## 🗄️ Database Schema

### User
```js
{
  name: String,
  email: String,
  password: String
}
```
### Gig
```js
{
  title: String,
  description: String,
  budget: Number,
  ownerId: ObjectId,
  status: "open" | "assigned"
}
```
### Bid
```js
{
  gigId: ObjectId,
  freelancerId: ObjectId,
  message: String,
  status: "pending" | "hired" | "rejected"
}
```

### ⚙️ Environment Variables
Backend .env.example
```
PORT=
MONGO_URI=
JWT_SECRET=
CLIENT_URL=
```
