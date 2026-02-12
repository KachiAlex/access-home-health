<<<<<<< HEAD
# Access Home Health & Medical Supplies

A modern medical ecommerce platform for buying home health and medical supplies online.

## Features

- **Home Page**: Beautiful hero banner with product showcase
- **Product Catalog**: Browse and search medical supplies with descriptions and prices
- **Shopping Cart**: Add products to cart and manage quantities
- **Checkout System**: Secure payment processing
- **Customer Authentication**: Sign up and login for customers
- **Admin Dashboard**: Manage products, orders, inventory, and customer data
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Project Structure

```
access-health/
├── client/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── pages/          # Page components
│   │   ├── context/        # Context API for state management
│   │   ├── hooks/          # Custom React hooks
│   │   ├── utils/          # Utility functions
│   │   └── styles/         # Global styles
│   └── package.json
├── server/                 # Node.js + Express backend
│   ├── src/
│   │   ├── models/         # Firebase data models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Express middleware
│   │   ├── controllers/    # Route controllers
│   │   ├── config/         # Configuration files
│   │   └── utils/          # Utility functions
│   └── package.json
└── README.md
```

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database & Auth**: Firebase (Firestore, Authentication)
- **State Management**: Context API / Redux (optional)
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase account

### Installation

1. **Clone and setup frontend**
```bash
cd client
npm install
npm run dev
```

2. **Setup backend**
```bash
cd server
npm install
cp .env.example .env
npm start
```

3. **Configure Firebase**
   - Create a Firebase project in the console
   - Add your Firebase credentials to `server/.env`
   - Update client Firebase config in `client/src/config/firebase.js`

## Development

### Frontend Development Server
```bash
cd client
npm run dev
```
Runs on http://localhost:5173

### Backend Development Server
```bash
cd server
npm start
```
Runs on http://localhost:5000

## Features Implementation

- [x] Project structure setup
- [ ] Home page with hero banner
- [ ] Product listing and filtering
- [ ] Shopping cart functionality
- [ ] Checkout process
- [ ] Customer authentication
- [ ] Admin dashboard
- [ ] Order management
- [ ] Payment integration

## License

MIT

## Contact

For more information about Access Home Health & Medical Supplies, visit our website or contact our support team.
=======
# Access Home Health Modern App

Monorepo housing the custom replacement for the legacy WordPress storefront. The stack combines a NestJS + Prisma API (`apps/api`) and a Next.js App Router frontend (`apps/web`). This document tracks migration status, data work, and deployment next steps.

## Current State

- **Backend**
  - Prisma schema reflects core ecommerce domain: users, products, variants, carts, orders, payments, shipments.
  - Seed script and shared sample data keep API modules returning structured responses while the real DB is provisioned.
  - Catalog, accounts, and orders modules are stubbed with REST endpoints (`/catalog`, `/accounts`, `/orders`).
- **Frontend**
  - App Router layout + shared navigation/footer scaffolded for all major routes (home, catalog, forms, marketing, account).
  - Mock data + formatters mirror backend schema to unblock UI work.
  - Tailwind v4 (preflight) configured via `globals.css`.

## Migration & Data Tasks

1. **Database bring-up**
   - Provision PostgreSQL instance (Neon or managed cloud) using `DATABASE_URL` env.
   - Run `npm run prisma:migrate` (script lives in `apps/api`) once schema stabilizes.
   - Execute `npm run prisma:seed` to mirror sample data.
2. **WordPress export mapping**
   - Import historical customers/orders from `accessmedhomehea_db2025.sql` into staging tables.
   - Normalize slugs, map WooCommerce product metadata to Prisma `Product` & `ProductVariant` records.
   - Extract media URLs to `ProductMedia` and update CDN references.
3. **Forms + accounts**
   - Translate custom PHP forms (`ahmi0249.php`, RX uploads) into Nest endpoints + S3/Drive storage.
   - Implement auth (consider Clerk/Auth0) and tie App Router account pages to live data.
4. **Shipping integrations**
   - Connect shipments table to current carrier provider (e.g., ShipEngine). Webhook handlers belong in new Nest module.
   - Mirror tracking events to frontend account portal.

## Deployment Next Steps

1. **API**
   - Configure `.env` for `apps/api` with `DATABASE_URL`, storage buckets, SMTP creds.
   - Deploy via Docker or managed Node runtime (Railway/Fly). Include Prisma generate step.
2. **Frontend**
   - Add `.env` for API base URL and analytics.
   - Deploy to Vercel or Netlify. Ensure `next.config.ts` rewrites API requests when running locally.
3. **CI/CD**
   - Add lint/test hooks plus Prisma migration check before merging.
   - Automate seeds for staging environments only.

## Local Development

```bash
# install all workspace deps (includes optional lightningcss binaries)
npm install

# run API (NestJS on http://localhost:4000)
npm run dev:api

# run new Next.js frontend (http://localhost:3000)
npm run dev:web
```

_Note:_ Offline environments may emit schema-store warnings; they are safe to ignore until network access is restored.
>>>>>>> c38e1f5d05869389c08301b84d433a50816f6cb6
