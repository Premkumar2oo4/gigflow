🚀 GigFlow – Mini Freelance Marketplace Platform

GigFlow is a full-stack mini freelance marketplace where users can post gigs, bid on jobs, and hire freelancers.
This project was built as part of a Full Stack Development Internship Assignment, focusing on secure authentication, database relationships, and atomic business logic.

🌐 Live Demo

🔗 Hosted Link: Add your deployed frontend URL here
🔗 Backend API: Add your backend URL here

📹 Demo Video (Hiring Flow): Add Loom link here

🧠 Project Overview

Any authenticated user can:

Post jobs (act as a Client)

Bid on jobs (act as a Freelancer)

Clients can review bids and hire exactly one freelancer

Hiring logic is atomic and race-condition safe

Real-time notifications notify freelancers when they are hired

🛠️ Tech Stack
Frontend

React.js (Vite)

Tailwind CSS

Redux Toolkit

Axios

Backend

Node.js

Express.js

MongoDB + Mongoose

JWT Authentication (HttpOnly Cookies)

Real-time

Socket.io

✨ Core Features
🔐 Authentication

Secure user registration & login

JWT-based authentication stored in HttpOnly cookies

Role-less system (users can be both clients & freelancers)

📋 Gig Management

Create new gigs (Title, Description, Budget)

Browse all open gigs

Search gigs by title

Gig status:

open

assigned

💼 Bidding System

Freelancers can submit bids with:

Message

Proposed price

Clients can view all bids on their gig

Bid statuses:

pending

hired

rejected

🧩 Hiring Logic (Core Requirement)

When a client hires a freelancer:

Gig status changes from open → assigned

Selected bid becomes hired

All other bids for that gig become rejected

Hiring action is atomic and secure

✔️ Prevents multiple freelancers from being hired for the same gig

🏆 Bonus Features Implemented
✅ Bonus 1: Transactional Integrity

Implemented using MongoDB Transactions

Prevents race conditions if multiple hire requests happen simultaneously

Ensures only one bid can ever be hired

✅ Bonus 2: Real-Time Notifications

Integrated Socket.io

Freelancer receives instant notification:

“You have been hired for [Project Name] 🎉”

No page refresh required

📡 API Endpoints
Auth
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	Login & set HttpOnly cookie
Gigs
Method	Endpoint	Description
GET	/api/gigs	Fetch all open gigs (search supported)
POST	/api/gigs	Create a new gig
Bids
Method	Endpoint	Description
POST	/api/bids	Submit a bid
GET	/api/bids/:gigId	Get bids for a gig (Owner only)
Hiring
Method	Endpoint	Description
PATCH	/api/bids/:bidId/hire	Hire freelancer (atomic logic)
🗄️ Database Schema
User
{
  name: String,
  email: String,
  password: String
}

Gig
{
  title: String,
  description: String,
  budget: Number,
  ownerId: ObjectId,
  status: "open" | "assigned"
}

Bid
{
  gigId: ObjectId,
  freelancerId: ObjectId,
  message: String,
  status: "pending" | "hired" | "rejected"
}

⚙️ Environment Variables

Create a .env file using the example below:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173


📌 A .env.example file is included in the repository.

🧪 Installation & Setup
Backend
cd backend
npm install
npm run dev

Frontend
cd frontend
npm install
npm run dev

📁 Folder Structure (Simplified)
gigflow/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
├── frontend/
│   ├── src/
│   ├── pages/
│   ├── components/
│   └── store/
└── README.md

🧑‍💻 Author

Your Name
📧 Email: your.email@example.com

🔗 GitHub: https://github.com/yourusername

🔗 LinkedIn: https://linkedin.com/in/yourprofile

📌 Notes for Reviewers

Focused heavily on business logic correctness

Hiring logic is transaction-safe

Clean separation of frontend & backend

Scalable architecture with real-time support