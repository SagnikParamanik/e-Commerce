# ACME Store - Professional E-Commerce Platform

*A fully-featured, modern e-commerce platform with user authentication, admin dashboard, and complete backend API integration*

[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![Styled with Tailwind CSS](https://img.shields.io/badge/Styled%20with-Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app)

## Overview

ACME Store is a professional, fully responsive e-commerce platform built with Next.js 14 and modern web technologies. It features a complete product catalog, user authentication system, shopping cart, order management, and an admin dashboard. The platform is designed with a premium aesthetic and includes comprehensive backend API integration for all core features.

## Key Features

✅ **User Authentication** - Complete login/signup system with session management
✅ **Product Catalog** - Advanced filtering, search, and sorting capabilities
✅ **Shopping Cart** - Persistent cart with quantity management
✅ **Checkout Flow** - Complete checkout process with order confirmation
✅ **Product Reviews** - Star ratings and customer reviews with API integration
✅ **Wishlist** - Save favorite products for later
✅ **Newsletter** - Email subscription with backend validation
✅ **Admin Dashboard** - Sales analytics and order management
✅ **Responsive Design** - Fully responsive from mobile to desktop
✅ **Professional Design** - Premium color palette and typography

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## Test Credentials

- **Email**: any@email.com
- **Password**: password123 (minimum 6 characters)

## Architecture

### Frontend
- Next.js 14 with App Router
- React Context API for state management
- Tailwind CSS v4 with custom design tokens
- shadcn/ui components

### Backend
- Next.js API Routes
- In-memory data storage with localStorage persistence
- Full TypeScript implementation
- RESTful API endpoints

## Project Structure

```
app/
├── api/              # Backend API routes
├── admin/            # Admin dashboard
├── checkout/         # Checkout flow
├── product/          # Product details
├── shop/             # Product catalog
└── page.tsx          # Homepage

components/
├── home/             # Homepage sections
├── products/         # Product components
├── layout/           # Layout components
├── cart/             # Shopping cart
└── ui/               # UI components

lib/
├── auth-context.tsx  # Authentication
├── wishlist-context.tsx
└── shopify/          # Shopify integration
```

## Documentation

- [FEATURES.md](./FEATURES.md) - Detailed feature list
- [IMPLEMENTATION.md](./IMPLEMENTATION.md) - Complete implementation guide

## Deployment

Ready to deploy on Vercel:

```bash
vercel deploy
```

The application is production-ready with professional design, complete feature set, and backend API integration.
