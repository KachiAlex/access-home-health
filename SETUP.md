# Setup Instructions

## Prerequisites
- Node.js v16+ and npm installed
- Firebase project created
- Git (optional)

## Step 1: Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project or use an existing one
3. Enable Authentication (Email/Password)
4. Create a Firestore database
5. Get your credentials:
   - Go to Project Settings > Service Accounts
   - Generate a new private key (for backend)
   - Get your API credentials (for frontend)

## Step 2: Install Dependencies

### Install root dependencies:
```bash
npm install
```

Or install each separately:

### Frontend:
```bash
cd client
npm install
```

### Backend:
```bash
cd server
npm install
```

## Step 3: Configure Environment Variables

### Frontend (.env):
Copy `.env.example` to `.env` and fill in your Firebase credentials:
```bash
cd client
cp .env.example .env
# Edit .env with your Firebase credentials
```

### Backend (.env):
Copy `.env.example` to `.env` and fill in your Firebase Admin SDK credentials:
```bash
cd server
cp .env.example .env
# Edit .env with your Firebase Admin SDK credentials
```

## Step 4: Run the Application

### Option A: Run both in separate terminals

Terminal 1 - Frontend:
```bash
cd client
npm run dev
```
Frontend will be available at: `http://localhost:5173`

Terminal 2 - Backend:
```bash
cd server
npm run dev
```
Backend will be available at: `http://localhost:5000`

### Option B: Run both from root (requires concurrently)
```bash
npm install -D concurrently
# Add to root package.json: "dev": "concurrently \"cd client && npm run dev\" \"cd server && npm run dev\""
npm run dev
```

## Step 5: Test the Application

1. Open `http://localhost:5173` in your browser
2. Navigate through the site
3. Try adding products to cart
4. Test login/register with your Firebase credentials

## Admin Account Setup

To create an admin account:

1. Register a new user on the app
2. Get their UID from Firebase Console > Authentication
3. Run a Firebase Admin command or use your backend admin route:
```bash
curl -X POST http://localhost:5000/api/auth/{USER_UID}/set-admin
```

Or manually in Firebase Console > Firestore, create a document in `users` collection with admin flag.

## Project Structure

```
accesshealth/
├── client/                 # React + Vite Frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── context/        # State management
│   │   ├── hooks/          # Custom hooks
│   │   ├── config/         # Configuration
│   │   └── styles/         # CSS styles
│   ├── package.json
│   └── .env.example
├── server/                 # Node.js + Express Backend
│   ├── src/
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Express middleware
│   │   ├── config/         # Configuration
│   │   ├── models/         # Data models
│   │   └── utils/          # Utilities
│   ├── package.json
│   └── .env.example
├── package.json
├── README.md
└── SETUP.md
```

## Features Implemented

### Frontend
- ✅ Home page with hero carousel banner
- ✅ Products listing with filtering
- ✅ Shopping cart functionality
- ✅ Checkout process
- ✅ User authentication (login/register)
- ✅ Admin dashboard
- ✅ Responsive design with Tailwind CSS

### Backend
- ✅ Express server setup
- ✅ Firebase integration
- ✅ Product API endpoints
- ✅ Order management
- ✅ Authentication routes
- ✅ Admin middleware

### Database (Firestore)
- Collections to create:
  - `products` - Store product information
  - `orders` - Store customer orders
  - `users` - Store user profiles and roles

## Troubleshooting

### Port already in use
- Frontend: Change port in `vite.config.js`
- Backend: Set `PORT` in `.env`

### Firebase connection errors
- Check your `.env` files have correct credentials
- Ensure Firebase project has Firestore and Auth enabled

### CORS issues
- Backend CORS is configured for localhost:5173
- For production, update CORS in `server.js`

## Next Steps

1. Add product images (upload to Firebase Storage)
2. Integrate payment gateway (Stripe, PayPal)
3. Add email notifications
4. Set up CI/CD pipeline
5. Deploy to Firebase Hosting (frontend) and Cloud Run (backend)

## Support

For issues or questions:
1. Check Firebase Console for errors
2. Review browser console for frontend errors
3. Check terminal for backend errors
4. Verify all environment variables are set correctly
