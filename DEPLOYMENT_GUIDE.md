# Deployment Guide for Spotify Clone

Since I am running locally on your machine, I cannot publish the site directly to the internet for you. However, you can deploy this project for free using popular services like Vercel (Frontend), Render (Backend), and Neon/Supabase (Database).

## 1. Prerequisites
- A GitHub account.
- Accounts on Vercel, Render, and Neon (or any Postgres provider).
- Node.js installed locally.

## 2. Push Code to GitHub
1. Initialize a git repository in the project root:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
2. Create a new repository on GitHub and push your code.

## 3. Database Deployment (Neon / Supabase)
1. Create a new project on **Neon.tech** or **Supabase**.
2. Copy the connection string (e.g., `postgresql://user:password@host/db?sslmode=require`).
3. This is your `DATABASE_URL`.

## 4. Backend Deployment (Render / Railway)
We'll use **Render** as an example:
1. Go to your Render Dashboard -> "New" -> "Web Service".
2. Connect your GitHub repository.
3. Settings:
   - **Root Directory**: `server`
   - **Build Command**: `npm install && npx prisma generate`
   - **Start Command**: `npm start`
4. **Environment Variables**:
   - `DATABASE_URL`: (Paste from Step 3)
   - `JWT_SECRET`: (Generate a random string)
   - `NODE_ENV`: `production`
5. Click "Deploy". Once done, copy the specialized URL (e.g., `https://spotify-clone-api.onrender.com`).

## 5. Frontend Deployment (Vercel)
1. Go to your Vercel Dashboard -> "Add New..." -> "Project".
2. Import your GitHub repository.
3. Configure Project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `client`
4. **Environment Variables**:
   - No special env vars needed unless you want to point to the production backend URL.
   - Ideally, update `client/src/lib/api.ts` to use an environment variable:
     ```javascript
     const api = axios.create({
       baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
     });
     ```
   - In Vercel, set `NEXT_PUBLIC_API_URL` to your Render backend URL.
5. Click "Deploy".

## 6. Final Steps
- Update your database schema:
  Run `npx prisma db push` locally using the production connection string, or add it to your build command.
- Visit your Vercel URL to see your live site!
