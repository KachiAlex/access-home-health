# Copilot Instructions for Access Health Ecommerce App

This document provides project-specific guidance for working with the Access Home Health & Medical Supplies ecommerce platform.

## Project Overview

A full-stack medical ecommerce application with:
- React + Vite frontend
- Node.js/Express backend
- Firebase (Firestore + Authentication)
- Admin dashboard for inventory management

## Technology Stack

| Layer | Technologies |
|-------|--------------|
| Frontend | React 18, Vite, Tailwind CSS, React Router |
| Backend | Node.js, Express.js |
| Database | Firebase Firestore |
| Authentication | Firebase Authentication |
| Styling | Tailwind CSS |
| State Management | Context API |

## Key Features Implemented

### Customer Features
- [ ] Home page with hero carousel slider
- [x] Product catalog with search and filtering
- [x] Shopping cart with persistent storage
- [x] Checkout process
- [x] User authentication (sign up/login)
- [ ] Order history
- [ ] Product reviews and ratings

### Admin Features
- [x] Admin dashboard
- [x] Product management (add/edit/delete)
- [x] Order management and status updates
- [x] Inventory tracking
- [ ] Analytics and reports
- [ ] Customer management

### General Features
- [x] Responsive design (mobile, tablet, desktop)
- [x] Beautiful footer with links
- [x] Navigation bar
- [ ] Payment integration
- [ ] Email notifications
- [ ] Product images

## File Structure

```
client/src/
├── components/          # Reusable React components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── HeroBanner.jsx
│   └── ProductCard.jsx
├── pages/              # Page components (routes)
│   ├── Home.jsx
│   ├── Products.jsx
│   ├── Cart.jsx
│   ├── Checkout.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   └── AdminDashboard.jsx
├── context/            # State management
│   ├── AuthContext.jsx
│   └── CartContext.jsx
├── hooks/              # Custom hooks
│   └── useAuth.js
├── config/             # Configuration files
│   └── firebase.js
├── styles/             # CSS styles
│   └── globals.css
└── App.jsx             # Main App component

server/src/
├── routes/             # API endpoints
│   ├── products.js
│   ├── orders.js
│   └── auth.js
├── middleware/         # Express middleware
│   ├── auth.js
│   └── errorHandler.js
├── config/             # Configuration
│   └── firebase.js
└── server.js           # Main server file
```

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Orders
- `GET /api/orders` - Get all orders (admin)
- `GET /api/orders/user/:userId` - Get user orders
- `POST /api/orders` - Create order
- `PUT /api/orders/:id/status` - Update order status (admin)

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/:uid/set-admin` - Set admin role
- `GET /api/auth/:uid` - Get user info

## Common Development Tasks

### Add a New Page
1. Create component in `client/src/pages/`
2. Import in `App.jsx`
3. Add route in App.jsx

### Add a New Component
1. Create in `client/src/components/`
2. Import and use where needed

### Add Backend Routes
1. Create route file in `server/src/routes/`
2. Import in `server.js`
3. Add `app.use('/api/path', routeHandler)`

### Add Database Collection
1. Create Firestore collection in Firebase Console
2. Add query in relevant route handler

## Styling Guidelines

All components use Tailwind CSS. Custom reusable classes are in `client/src/styles/globals.css`.

### Button Classes
- `.btn` - Base button
- `.btn-primary` - Blue background
- `.btn-secondary` - Green background
- `.btn-danger` - Red background
- `.btn-outline` - Border style

### Colors
- Primary: `#0066cc` (blue)
- Secondary: `#10b981` (green)
- Accent: `#f59e0b` (amber)
- Danger: `#ef4444` (red)

## Important Notes

1. **Firebase Configuration**: Update `.env` files with actual Firebase credentials
2. **Admin Setup**: Use Firebase Console or backend route to set admin roles
3. **Product Images**: Currently using emoji placeholders; integrate Firebase Storage
4. **Payment**: No payment gateway integrated; add Stripe or PayPal later
5. **Email**: No email notifications set up; can add SendGrid or similar

## Deployment Checklist

- [ ] Update Firebase security rules
- [ ] Set up environment variables in production
- [ ] Add payment gateway
- [ ] Set up email notifications
- [ ] Configure CORS for production domain
- [ ] Set up monitoring and error tracking
- [ ] Load test the application
- [ ] Deploy frontend to Firebase Hosting
- [ ] Deploy backend to Cloud Run or similar

## Quick Commands

```bash
# Frontend
cd client
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview build

# Backend
cd server
npm run dev      # Start with nodemon
npm start        # Start normally

# Root
npm run install-all  # Install all dependencies
```

## Debugging Tips

1. **Check Firebase Console** - View Firestore data, auth users
2. **Browser DevTools** - Check Network tab for API calls
3. **Terminal Output** - Backend logs and errors
4. **React DevTools** - Check component state
5. **Firestore Emulator** - Test locally before production

## Next Features to Add

1. Product images (Firebase Storage)
2. Payment integration (Stripe/PayPal)
3. Email notifications (SendGrid)
4. Product reviews and ratings
5. User profiles
6. Wishlist functionality
7. Advanced search and filters
8. Analytics dashboard
9. Social media integration
10. Push notifications

## Resources

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Router Docs](https://reactrouter.com)
- [Firebase Docs](https://firebase.google.com/docs)
- [Express.js Docs](https://expressjs.com)
- [Vite Docs](https://vitejs.dev)

---

Last Updated: February 6, 2026
