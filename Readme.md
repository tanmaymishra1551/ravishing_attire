# Node.js Starter Template with Prettier Configuration

This project provides a Node.js starter template. Follow the steps below to set up and run the frontend and backend environments.

## Setup Instructions

### Prerequisites
- Node.js installed on your system.
- A code editor (e.g., VS Code).
- MongoDB connection details for the backend.

---

### Step 1: Frontend Setup

1. Open a terminal (PowerShell or equivalent).
2. Navigate to the frontend directory:
   ```bash
   cd .\frontend\nodejs_starter_template\
   ```
3. Install the required dependencies:
   ```bash
   npm install
   ```
4. Navigate to the `src` folder:
   ```bash
   cd src
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

---

### Step 2: Backend Setup

1. Open another terminal (PowerShell or equivalent).
2. Navigate to the backend directory:
   ```bash
   cd .\backend
   ```
3. Install the required dependencies:
   ```bash
   npm install
   ```
4. Navigate to the `src` folder:
   ```bash
   cd src
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

---

### Step 3: Configure Environment Variables

1. In the `backend` folder, create a new file named `.env`.
2. Add the following content to the `.env` file, replacing `username` and `password` with your MongoDB credentials:

   ```env
   PORT=8000
   MONGODB_URI=mongodb+srv://username:password@cluster0.vbpxk.mongodb.net
   CORS_ORIGIN=http://localhost:5173
   ACCESS_TOKEN_SECRET=asdefghjkl
   ACCESS_TOKEN_EXPIRY=1d
   REFRESH_TOKEN_SECRET=qwwertyuiop
   REFRESH_TOKEN_EXPIRY=10d
   ```

---

### Step 4: Test the Application

1. Open your browser and navigate to:
   ```
   http://localhost:5173/
   ```
2. Open Postman (or any API testing tool) and send a `GET` request to:
   ```
   http://localhost:8000/api/v1/users/test
   ```

---

## Screenshot 🖼️

Screenshot of the homepage or any significant feature of the blog.
<img src="https://github.com/tanmaymishra1551/NodeJs_starter_template/blob/f1f50b90490889857024565b9d69f6ee36cd1b17/dashboard.png">
<img src="https://github.com/tanmaymishra1551/NodeJs_starter_template/blob/f1f50b90490889857024565b9d69f6ee36cd1b17/create.png">
<img src="https://github.com/tanmaymishra1551/NodeJs_starter_template/blob/f1f50b90490889857024565b9d69f6ee36cd1b17/users.png">
<img src="https://github.com/tanmaymishra1551/NodeJs_starter_template/blob/f1f50b90490889857024565b9d69f6ee36cd1b17/edit.png">
