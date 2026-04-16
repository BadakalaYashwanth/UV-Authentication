# Complete Authentication App (MERN Stack)

Welcome to the Complete Authentication Project! This is a robust, production-ready MERN stack application featuring a fully secure login and signup system using JWT (JSON Web Tokens).

## 🌐 Live Demo

| Service | URL |
|---|---|
| **Frontend (Netlify)** | [https://uvauth.netlify.app](https://uvauth.netlify.app/login) |
| **Backend API (Render)** | [https://uv-authentication.onrender.com](https://uv-authentication.onrender.com/ping) |

> **Note:** The backend is hosted on Render's free tier. The first request after inactivity may take 30–60 seconds due to cold start.

---

## 🚀 Features
- **User Authentication:** Secure Signup and Login functionality.
- **JWT Protection:** Protected backend routes that only authorize valid JWT tokens.
- **Auto Login After Signup:** Users are automatically logged in and redirected to the dashboard after registration.
- **Data Validation:** Strict backend input validation using `Joi` and regex (for valid emails and strong passwords).
- **Password Security:** Passwords hashed with `bcrypt`.
- **Toast Notifications:** Beautiful UI pop-ups for success and error messages using `react-toastify`.
- **Responsive UI:** Clean, modern frontend interface explicitly designed using React and Bootstrap.
- **Responsive Dashboard:** Fluid product grid that adapts to all screen sizes and zoom levels.

## 💻 Technologies Used

### Frontend
- React.js
- React Router DOM (for page navigation)
- React Toastify (for notifications)
- Bootstrap & Custom CSS

### Backend
- Node.js & Express.js
- MongoDB (Atlas) & Mongoose
- JSON Web Tokens (JWT) for Auth
- Bcrypt (Password Hashing)
- Joi (Input Validation)
- Cors & Body-Parser

### Deployment
- **Frontend:** [Netlify](https://www.netlify.com/) — Static site hosting with CI/CD from GitHub
- **Backend:** [Render](https://render.com/) — Node.js web service with auto-deploy from GitHub
- **Database:** [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) — Cloud-hosted MongoDB cluster

---

## 🌍 Deployment Architecture

```
┌──────────────────────────┐        ┌──────────────────────────┐
│   Netlify (Frontend)      │        │   Render (Backend)        │
│                           │        │                           │
│   React SPA               │──API──▶│   Express + Node.js       │
│   uvauth.netlify.app      │ calls  │   uv-authentication      │
│                           │        │   .onrender.com           │
└──────────────────────────┘        └───────────┬───────────────┘
                                                │
                                                ▼
                                    ┌───────────────────┐
                                    │   MongoDB Atlas    │
                                    │   (Cloud Database) │
                                    └───────────────────┘
```

### Environment Variables

**Render (Backend):**
| Variable | Purpose |
|---|---|
| `PORT` | Server port |
| `MONGO_CONN` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key for JWT signing |
| `FRONTEND_URL` | Netlify URL for CORS whitelist |

**Netlify (Frontend):**
| Variable | Purpose |
|---|---|
| `REACT_APP_API_URL` | Render backend URL |

---

## 🛠️ Local Development Setup

### 1. Database Setup
1. Create a cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Set up your Database User and Password.
3. Under **Network Access**, assign an IP Address rule `0.0.0.0/0` (Allow Access from Anywhere) to avoid `MongooseServerSelectionError` blocks.
4. Copy your Connection URL.

### 2. Backend Setup
Navigate into the backend directory:
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` folder containing:
```
PORT=8080
MONGO_CONN="mongodb+srv://<username>:<password>@cluster0.exmple.mongodb.net/?appName=Cluster0"
JWT_SECRET="your_secret_key"
FRONTEND_URL="http://localhost:3000"
```
Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Navigate into the frontend directory:
```bash
cd frontend
npm install
```
Create a `.env` file in the `frontend` folder containing:
```
REACT_APP_API_URL="http://localhost:8080"
```
Start the React development server:
```bash
npm start
```

---

## 📖 Project Documentation Flow
The project was methodically built in stages:
1. **Infrastructure:** Initialized React frontend and Node backend.
2. **Database:** Connected MongoDB Atlas and strictly configured IP firewall rules.
3. **Models & Controllers:** Defined a User Mongoose Schema and set up Auth controllers.
4. **Validation:** Ensured strict `Joi` API endpoint validation to prevent improperly formatted data from entering the database.
5. **Frontend Pages:** Implemented Signup, Login, and a protected Home dashboard.
6. **Integration:** Hooked up API calls from React to Express using fetch and `localStorage` to manage JWT tokens safely.
7. **Deployment:** Deployed backend to Render and frontend to Netlify with secure CORS configuration.
