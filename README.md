# CineBook

CineBook is a single-page Movie Ticket Booking System designed as a simple DBMS college project. It allows users to quickly select movies, choose show times, and book tickets through a clean, light-themed cinema interface.

## Tech Stack
- **Frontend:** React, Vite, CSS, Axios
- **Backend:** Node.js, Express.js
- **Database:** MySQL

## Project Structure
- `frontend/` - Contains the React application
- `backend/` - Contains the Express server and database configuration

## Setup Instructions

### 1. Database Setup (MySQL)
1. Ensure MySQL is installed and running on your local machine (e.g., via XAMPP, WAMP, or MySQL Server).
2. Open your MySQL client and execute the queries found in `backend/database/schema.sql`.
3. This will create the `cinebook` database and the required `bookings` table.

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` folder based on your MySQL configuration:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=cinebook
   PORT=5000
   ```
4. Start the backend server:
   ```bash
   npm start
   # or
   node src/index.js
   ```

### 3. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and go to `http://localhost:5173` to use the application!
