# Student Grievance Management System

A fullstack MERN application that allows students to submit, track, and manage grievances.

## Features

*   **User Authentication**: Secure registration and login using JWT and bcrypt.
*   **Grievance Submission**: Submit grievances with titles, categories, and descriptions.
*   **Dashboard**: View a history of your submitted grievances and their status.
*   **Search and Filter**: Search for specific grievances by title.
*   **Update/Delete**: Modify or remove existing grievances.

## Folder Structure
```text
Student Grievance Management System/
│
├── backend/                  # Node.js + Express backend
│   ├── controllers/          # Request handlers
│   ├── middleware/           # Auth middleware
│   ├── models/               # Mongoose DB schemas
│   ├── routes/               # API endpoints
│   ├── .env                  # Environment Variables
│   └── server.js             # Entry Point
│
├── frontend/                 # React frontend (Vite)
│   ├── src/
│   │   ├── components/       # UI Components (Login, Register, Dashboard)
│   │   ├── utils/            # Utilities (Axios config)
│   │   ├── App.jsx           # Main React Router
│   │   └── index.css         # Styling
│   └── package.json          # Frontend Dependencies
│
└── README.md                 # This file
```

## Running Locally

### Prerequisites
*   Node.js installed
*   MongoDB installed locally and running (or a MongoDB Atlas URI)

### Backend Setup
1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server (runs on `http://localhost:5000` default):
   ```bash
   node server.js
   ```

### Frontend Setup
1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

## Deployment Steps (Render)

### Backend (Web Service)
1. Push your repository to GitHub.
2. Go to [Render](https://render.com/) and create a new **Web Service**.
3. Select your repository.
4. Set the Root Directory to `backend` (or leave blank if you separate repos, but for monorepos set the root correctly).
5. Build Command: `npm install`
6. Start Command: `node server.js`
7. Add Environment Variables:
    - `MONGO_URI`: Your MongoDB Atlas URI
    - `JWT_SECRET`: A secure random string
8. Deploy

### Frontend (Static Site)
1. Go to Render and create a new **Static Site**.
2. Select your repository.
3. Set the Root Directory to `frontend`.
4. Build Command: `npm run build`
5. Publish Directory: `dist`
6. Note: Before building, update `baseURL` in `frontend/src/utils/api.js` to point to your deployed backend URL.
7. Add fallback routing rule: Set `Catchall` to `index.html` (Render handles this under Pull Requests / Redirects/Rewrites).
8. Deploy
