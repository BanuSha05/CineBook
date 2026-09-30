# CineBook Deployment Guide

This guide explains how to deploy the CineBook Theatre Ticket Booking application to the public internet without needing a local MySQL server.

## Architecture

The application is split into three parts:
1. **Frontend**: HTML/CSS/JS deployed to Netlify.
2. **Backend**: Python FastAPI deployed to a cloud provider like Render, Railway, or Heroku.
3. **Database**: Online MySQL database hosted on a provider like Aiven, Clever-Cloud, or PlanetScale.

---

## Step 1: Set up the Online MySQL Database

1. Sign up for a free MySQL database provider (e.g., Aiven, Clever-Cloud, or FreeSQLDatabase).
2. Create a new MySQL database named `event_ticket_booking` (or whatever the provider gives you).
3. Connect to the database using a tool like DBeaver or MySQL Workbench, or use the provider's web console.
4. Run the SQL script found in `backend/database/schema.sql` to create the `bookings` table.
5. Note down the credentials provided by your host:
   - **Host** (`DB_HOST`)
   - **Port** (`DB_PORT`, usually 3306)
   - **User** (`DB_USER`)
   - **Password** (`DB_PASSWORD`)
   - **Database Name** (`DB_NAME`)

---

## Step 2: Deploy the FastAPI Backend

We recommend deploying the backend on **Render.com** (Free Tier).

1. Push your code to a GitHub repository.
2. Go to [Render](https://render.com) and create a new **Web Service**.
3. Connect your GitHub repository.
4. Settings:
   - **Root Directory**: `backend`
   - **Environment**: `Python`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Click **Advanced** and add the following **Environment Variables**:
   - `DB_HOST`: Your online MySQL host
   - `DB_PORT`: Your online MySQL port (e.g., 3306)
   - `DB_USER`: Your online MySQL username
   - `DB_PASSWORD`: Your online MySQL password
   - `DB_NAME`: Your online MySQL database name
6. Deploy the web service.
7. Once deployed, Render will give you a public URL for your backend (e.g., `https://cinebook-backend.onrender.com`). Copy this URL.

---

## Step 3: Configure and Deploy the Frontend

We will deploy the frontend to **Netlify**.

1. In your local code, open `frontend/script.js`.
2. Locate the following line at the top:
   ```javascript
   const API_URL = isLocalhost ? 'http://localhost:8000' : 'https://YOUR_PRODUCTION_BACKEND_URL.com';
   ```
3. Replace `https://YOUR_PRODUCTION_BACKEND_URL.com` with the actual public URL of your deployed backend (e.g., `https://cinebook-backend.onrender.com`).
4. Push this change to your GitHub repository.
5. Go to [Netlify](https://netlify.com) and log in.
6. Click **Add new site** > **Import an existing project**.
7. Connect your GitHub repository.
8. Settings:
   - **Base directory**: `frontend`
   - **Build command**: (Leave empty)
   - **Publish directory**: `frontend` (or `/` if Netlify sets the base directory as the publish directory. Usually just leaving it blank or setting it to the folder containing `index.html` works).
9. Click **Deploy site**.
10. Netlify will provide you with a public URL for your frontend website.

---

## Step 4: Test the Live Website

1. Visit your public Netlify URL.
2. Fill out the booking form and click **Book Ticket**.
3. The frontend will communicate with your deployed FastAPI backend.
4. The backend will insert the data into your online MySQL database.
5. Click **View Bookings** to see your permanently saved booking data pulled directly from the online database.
