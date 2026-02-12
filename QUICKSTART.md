# Quick Start Guide

## Get Started in 5 Minutes

### 1. Clone/Open the Project
```bash
# Navigate to the project
cd d:\accesshealth
```

### 2. Install Dependencies
```bash
# Install all dependencies at once
npm install

# Or install frontend and backend separately
cd client && npm install
cd ../server && npm install
```

### 3. Set Up Firebase

#### Get Your Firebase Credentials:
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project or use existing
3. Enable: Authentication (Email/Password) and Firestore Database
4. In Project Settings:
   - Copy Web API credentials for frontend
   - Generate service account key for backend

#### Frontend Setup:
```bash
cd client

# Copy example env file
cp .env.example .env

# Edit .env and add your Firebase credentials:
VITE_FIREBASE_API_KEY=your_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_domain_here
... (add the rest from Firebase console)
```

#### Backend Setup:
```bash
cd ../server

# Copy example env file
cp .env.example .env

# Edit .env and add your Firebase Admin SDK credentials:
FIREBASE_TYPE=service_account
FIREBASE_PROJECT_ID=your_project_id
... (add the rest)
```

### 4. Run the Application

**Terminal 1 - Frontend:**
```bash
cd client
npm run dev
```
→ Opens at `http://localhost:5173`

**Terminal 2 - Backend:**
```bash
cd server
npm run dev
```
→ Runs at `http://localhost:5000`

### 5. Test It Out!

1. Open `http://localhost:5173` in your browser
2. Browse products on the home page
3. Add items to cart
4. Try the checkout page
5. Sign up with a test email

## What's Already Built ✅

✅ **Home Page**
- Beautiful hero carousel with 3 sliding banners
- "Shop Now" and "View Catalog" buttons
- Feature highlights section
- CTAs to shop

✅ **Products Page**
- Browse all medical supplies
- Search functionality
- Filter by category and price
- View product details and prices

✅ **Shopping Cart**
- Add/remove products
- Update quantities
- Persistent storage (localStorage)
- Order summary with totals

✅ **Checkout**
- Shipping information form
- Payment information form
- Order review
- Order placement

✅ **Authentication**
- User registration
- User login
- Firebase integration ready
- Admin role support

✅ **Admin Dashboard**
- View all products
- Add new products
- Edit product info
- Delete products
- View all orders
- Update order status
- Dashboard statistics

✅ **Responsive Design**
- Works on mobile, tablet, desktop
- Beautiful footer with links
- Navigation with cart count

## Test Logins

After registering, you can test the admin features:

1. Register with email ending in `@accesshealth.com`
2. Go to [Firebase Console](https://console.firebase.google.com)
3. In Authentication tab, copy your User UID
4. Manually add admin role in Firestore (users collection) or use the API

Or use the test credentials shown on the login page!

## What's NOT Built Yet (Optional Features)

❌ Product images (using emoji placeholders)
❌ Payment processing (Stripe/PayPal)
❌ Email notifications
❌ Product reviews/ratings
❌ User profiles/accounts
❌ Wishlists
❌ Advanced analytics

## Project Structure 📁

```
accesshealth/
├── client/              React + Vite app
├── server/              Node.js/Express API
├── SETUP.md             Detailed setup guide
├── README.md            Project overview
└── package.json         Root config
```

## Common Issues & Solutions

**Issue: "Firebase is not configured"**
- Solution: Make sure `.env` files have correct credentials

**Issue: "Port 5173 already in use"**
- Solution: Change port in `client/vite.config.js`

**Issue: "Cannot connect to backend"**
- Solution: Make sure server is running on port 5000

**Issue: "Products don't load"**
- Solution: Check Firestore has a `products` collection

## Next Steps

1. **Add Product Images** → Upload to Firebase Storage
2. **Set Up Payments** → Integrate Stripe
3. **Add Email** → Use SendGrid for notifications
4. **Customize Branding** → Add your logo, colors
5. **Deploy** → Firebase Hosting + Cloud Run

## Need Help?

📖 See [SETUP.md](./SETUP.md) for detailed instructions
🔧 Check [.github/copilot-instructions.md](./.github/copilot-instructions.md) for development guide
🚀 Review the code comments in each file

---

**You're all set! Start the app and begin building! 🚀**
