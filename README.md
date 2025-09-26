# Real-Time Voting App

A **Real-Time Voting Web Application** built with **MERN Stack** and **Socket.IO**. Users can vote on options, see live results in numbers or charts, and view updates in real-time.

---

## 🌐 Live Demo

- **Frontend**: [https://voting-app-frontend-iaiz.onrender.com](https://voting-app-frontend-iaiz.onrender.com)  
- **Backend**: [https://voting-app-backend-az4s.onrender.com](https://voting-app-backend-az4s.onrender.com)

---

## Features

* **User Authentication**: Login/Logout with session persistence via cookies.
* **Voting System**: Users can vote for one option per session.
* **Real-Time Results**: Vote results update instantly using **Socket.IO**.
* **Charts Visualization**: View results as **Pie Chart** in a full-page modal.
* **Responsive UI**: Works on mobile and desktop screens.
* **Logout**: Secure logout that clears session and redirects to login.

---

## Tech Stack

* **Frontend**: React, Axios, Tailwind CSS, Recharts, React Router
* **Backend**: Node.js, Express.js, MongoDB, Mongoose
* **Real-Time**: Socket.IO
* **Authentication**: Cookie-based sessions/JWT

---

## Installation

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd Voting-App
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file:

```
PORT=8000
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
```

Start the backend server:

```bash
npm start
```

### 3. Frontend setup

```bash
cd frontend
npm install
```

Start the frontend dev server:

```bash
npm run dev
```

---

## Usage

1. Open the app in the browser .
2. **Login** with your credentials.
3. **Vote** on your preferred option.
4. **View Results** in real-time numbers or click **“View Chart”** to see a full-page bar/pie chart.
5. **Logout** to end the session.

---

## Socket.IO Real-Time Flow

* When a user casts a vote:

  1. Backend stores the vote in MongoDB.
  2. Emits a `voteResultsUpdated` event via Socket.IO.
  3. Frontend listens to this event and updates charts/results instantly.

---


---

## Folder Structure

```
Voting-App/
│
├─ backend/                # Node.js + Express + MongoDB
│  ├─ controllers/
│  ├─ models/
│  ├─ routes/
│  └─ server.js
│
├─ frontend/               # React App
│  ├─ src/
│  │  ├─ Components/
│  │  ├─ context/
│  │  └─ App.jsx
│  └─ package.json
└─ README.md
```

---

## Dependencies

**Backend**: express, mongoose, cors, cookie-parser, socket.io, bcryptjs, jsonwebtoken
**Frontend**: react, react-dom, axios, react-router-dom, recharts, socket.io-client, tailwindcss

---

## Notes

* Ensure the backend server is running before using the frontend.
* JWT or session cookie must be valid for real-time voting and chart updates.
* Charts are fully responsive and update dynamically as votes are cast.

---


