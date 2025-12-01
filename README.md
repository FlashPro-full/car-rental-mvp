# Car Rental Management System

A modern, full-featured Next.js application for managing car rental operations with customer-facing pages and admin dashboard.

## Features

### Public Pages
- **Homepage**: Beautiful hero section with car search form
- **Car Listings**: Browse and filter available vehicles
- **Statistics Section**: Key metrics and achievements
- **Testimonials**: Customer reviews and ratings
- **Login/Register**: Authentication pages

### Admin Dashboard
- **Dashboard Overview**: Fleet overview with car listings
- **Featured Vehicle**: Highlighted vehicle with details
- **Bookings Management**: Complete booking management system
- **Sidebar Navigation**: Easy navigation between sections
- **Filter Panel**: Quick filters and actions
- **Search Functionality**: Search across the system

## Pages & Routes

- `/` - Homepage
- `/login` - Login page
- `/register` - Registration page
- `/cars` - Car listings with filters
- `/dashboard` - Admin dashboard (protected)
- `/dashboard/bookings` - Bookings management (protected)

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Authentication

The app uses localStorage for demo authentication. In production, implement proper server-side authentication.

**Demo Login**: Use any email and password to login.

## Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Client-side routing and navigation

## Project Structure

```
├── app/
│   ├── dashboard/      # Admin dashboard pages
│   ├── login/          # Login page
│   ├── register/       # Registration page
│   ├── cars/           # Car listings page
│   └── page.tsx        # Homepage
├── components/         # Reusable components
├── middleware.ts       # Route protection
└── ...
```

