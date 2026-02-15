# Spotify Clone

A full-stack Spotify clone built with Next.js, Node.js, Express, PostgreSQL, and TailwindCSS.

## Prerequisites

- **Node.js**: v18 or higher
- **PostgreSQL**: v15 or higher (or use Docker)
- **Git**

## Setup Instructions

### 1. Database Setup (Docker)

If you have Docker installed, simply run:
```bash
docker-compose up -d
```
This will start a PostgreSQL instance on port 5432.

### 2. Backend Setup

Navigate to the server directory:
```bash
cd server
```

Install dependencies:
```bash
npm install
```

Create a `.env` file in `server/` with the following:
```env
PORT=5000
DATABASE_URL="postgresql://admin:password@localhost:5432/spotify_db?schema=public"
JWT_SECRET="your_secret_key"
```

Run database migrations (initialize schema):
```bash
npx prisma generate
npx prisma db push
```

Start the server:
```bash
npm run dev
```
The server will run on `http://localhost:5000`.

### 3. Frontend Setup

Navigate to the client directory:
```bash
cd client
```

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```
The application will run on `http://localhost:3000`.

## Features

- **Authentication**: Sign up and Login with email/password.
- **Player**: Functional music player with Play/Pause, Next/Prev (simulated visuals).
- **Home**: Dashboard with "Made for You" and "Liked Songs".
- **Library**: View songs and playlists.
- **Admin**: Upload songs (API only for now).

## Tech Stack

- **Frontend**: Next.js 14, TailwindCSS, Zustand, Lucide-React
- **Backend**: Node.js, Express, Prisma, PostgreSQL, JWT

## Project Structure

- `client/`: Next.js Frontend
- `server/`: Express Backend
- `docker-compose.yml`: Database configuration
