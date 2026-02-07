# ACME Store - Professional E-Commerce Platform

## Overview
A fully responsive, modern e-commerce platform built with Next.js, featuring user authentication, product management, advanced shopping features, and an admin dashboard.

## Core Features

### User Management
- User registration and login with secure authentication
- User profile management
- Account dashboard
- Admin access control

### Product Features
- Advanced product catalog with filtering
- Product search functionality
- Product detail pages with high-quality imagery
- Product reviews and ratings system
- Related products recommendations
- Wishlist functionality for saving favorite items

### Shopping Experience
- Shopping cart with persistent storage
- Checkout flow with order summary
- Order confirmation and history
- Newsletter subscription
- Multiple payment method support (demo mode)

### Admin Dashboard
- Real-time sales statistics
- Order management and tracking
- Customer insights
- Revenue analytics
- Recent orders overview

## Technical Stack

### Frontend
- **Framework**: Next.js 14+ with App Router
- **Styling**: Tailwind CSS v4 with custom design tokens
- **UI Components**: shadcn/ui with custom components
- **State Management**: Context API for auth and cart
- **Icons**: lucide-react

### Backend
- **API**: Next.js API Routes
- **Data**: In-memory storage with localStorage persistence
- **Authentication**: Session-based with token storage
- **Type Safety**: Full TypeScript implementation

### Design System
- **Colors**: Premium palette (cream background, deep navy primary, warm accent)
- **Typography**: Professional serif and sans-serif font pairing
- **Responsiveness**: Mobile-first design with full tablet/desktop support
- **Spacing**: Consistent spacing scale using CSS variables

## API Endpoints

### Authentication (`/api/auth`)
- `POST` - Login/Signup with email and password

### Reviews (`/api/reviews`)
- `GET` - Fetch reviews for a product
- `POST` - Submit a new product review

### Wishlist (`/api/wishlist`)
- `GET` - Retrieve user's wishlist
- `POST` - Add/remove items from wishlist

### Newsletter (`/api/newsletter`)
- `POST` - Subscribe email to newsletter
- `GET` - Get subscriber statistics

### Orders (`/api/orders`)
- `GET` - Retrieve orders (with user/order ID filtering)
- `POST` - Create a new order

## Page Structure

### Public Pages
- `/` - Homepage with hero section, featured products, and features
- `/shop` - Product catalog with filtering and search
- `/product/[handle]` - Product detail pages
- `/checkout` - Checkout flow
- `/checkout/confirmation` - Order confirmation

### Protected Pages
- `/admin` - Admin dashboard (requires authentication)

## Features Implemented

### Current Features
✅ User authentication and accounts
✅ Product reviews and ratings with API integration
✅ Wishlist functionality with persistence
✅ Search and filtering
✅ Newsletter signup with backend validation
✅ Related product recommendations
✅ Shopping cart
✅ Checkout process
✅ Order management
✅ Admin dashboard
✅ Full responsiveness (mobile, tablet, desktop)
✅ Modern professional design system
✅ API-driven architecture

### Demo Credentials
- Email: any@email.com
- Password: password123 (minimum 6 characters)

## Deployment

The application is ready for deployment to Vercel with:
- Automatic builds on commit
- Environment variable configuration
- Edge function support for API optimization
- Serverless function deployment

## Future Enhancements
- Real database integration (PostgreSQL/MongoDB)
- Stripe payment integration
- Email notifications
- Analytics dashboard
- Inventory management
- Product recommendations engine
- Social media integration
- Multi-language support
