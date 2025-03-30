# StreamHub Backend

## Overview

StreamHub Backend is a robust RESTful API built with NestJS that powers the StreamHub movie streaming platform. It provides endpoints for user authentication, movie management, reviews, and admin functionalities.

## Tech Stack

-   NestJS
-   PostgreSQL with Prisma ORM
-   TypeScript
-   JWT Authentication
-   Passport
-   Stripe Payment Integration

## Core Features

-   User authentication and authorization
-   Movie management with search and filtering
-   Genre and actor categorization
-   User reviews and ratings
-   Payment processing for premium subscriptions
-   Admin dashboard statistics
-   File upload handling

## API Endpoints

### Authentication

-   `POST /auth/register` - Register new user
-   `POST /auth/login` - User login
-   `POST /auth/refresh` - Refresh access token

### Movies

-   `GET /movies` - List all movies
-   `GET /movies/by-slug/:slug` - Get movie by slug
-   `GET /movies/most-popular` - Get most popular movies
-   `GET /movies/by-actor/:id` - Get movies by actor
-   `POST /movies/by-genres` - Get movies by genres
-   `PUT /movies/update-count-views` - Update movie view count

### Reviews

-   `GET /reviews` - Get all reviews (admin)
-   `POST /reviews/leave/:movieId` - Create movie review
-   `DELETE /reviews/:id` - Delete review (admin)

### Users

-   `GET /users/profile` - Get user profile
-   `PUT /users/profile` - Update user profile
-   `PATCH /users/profile/favorites/:movieId` - Toggle favorite movie

### Admin Routes

-   `GET /manage/movies` - Manage movies
-   `GET /manage/genres` - Manage genres
-   `GET /manage/actors` - Manage actors
-   `GET /manage/users` - Manage users
-   `GET /manage/reviews` - Manage reviews

## Database Schema

### Core Models

-   `User`: User accounts and profiles
-   `Movie`: Movie details and metadata
-   `Genre`: Movie categories
-   `Actor`: Actor information
-   `Review`: User reviews and ratings
-   `Payment`: Payment transactions

## Getting Started

1. Clone the repository

```bash
git clone https://github.com/Gabrielm3/back-end-streamhub.git
cd back-end-streamhub
```

2. Install dependencies

```bash
npm install
```

3. Environment Setup
   Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/streamhub?schema=public"
JWT_SECRET="your-jwt-secret"
APP_URL="http://localhost:3000"
SERVER_URL="http://localhost:4200"
```

4. Database Setup

```bash
npx prisma migrate dev
npx prisma db seed
```

5. Run Development Server

```bash
npm run start:dev
```

## Development Scripts

```json
{
	"build": "nest build",
	"start": "nest start",
	"start:dev": "nest start --watch",
	"start:debug": "nest start --debug --watch",
	"start:prod": "node dist/main",
	"prisma:seed": "npx prisma db seed"
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
