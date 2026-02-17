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
- [x] Payment integration (PayPal secure flow)

## PayPal Integration

- **Server**: `/api/paypal/create-order` and `/api/paypal/capture-order` routes use the PayPal REST API via `server/src/utils/paypalClient.js`. Endpoints require Firebase ID token auth and persist captured orders (including PayPal metadata) to Firestore.
- **Client**: Checkout page (`client/src/pages/Checkout.jsx`) uses `@paypal/react-paypal-js` to render PayPal buttons but delegates order creation/capture to the backend for secure verification.
- **Environment**: Set `PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_SECRET`, and optionally `PAYPAL_API_BASE` in `server/.env`. Admins can configure the client ID via the dashboard UI backed by `useSettings`.
- **Testing**: Use the sandbox PayPal client ID and secret. Confirm flow by selecting PayPal at checkout, approving the sandbox payment, and verifying the resulting Firestore order plus confirmation email.

## License

MIT

## Contact

For more information about Access Home Health & Medical Supplies, visit our website or contact our support team.
