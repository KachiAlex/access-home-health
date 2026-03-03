# Deploy Server to Render

## Quick Setup Guide

### Step 1: Configure Render Service

In your Render dashboard, use these settings:

**Build & Deploy:**
- **Root Directory**: `server`
- **Build Command**: `npm install`
- **Start Command**: `node src/server.js`

**Environment:**
- **Node Version**: 18 or 20 (not 22)

### Step 2: Add Environment Variables

In Render dashboard, add these environment variables:

```
NODE_ENV=production
PORT=10000
FIREBASE_TYPE=service_account
FIREBASE_PROJECT_ID=accesshomehealth
FIREBASE_PRIVATE_KEY_ID=<from your Firebase service account>
FIREBASE_PRIVATE_KEY=<from your Firebase service account>
FIREBASE_CLIENT_EMAIL=<from your Firebase service account>
FIREBASE_CLIENT_ID=<from your Firebase service account>
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_X509_CERT_URL=<from your Firebase service account>
JWT_SECRET=<your_jwt_secret_key>
PAYSTACK_SECRET_KEY=<your_paystack_secret_key>
```

**Important:** Get Firebase credentials from your `service-account.json` file

### Step 3: Deploy

1. Click "Manual Deploy" → "Deploy latest commit"
2. Wait for deployment to complete
3. Copy your Render URL (e.g., `https://access-health-api.onrender.com`)

### Step 4: Update Client

1. Edit `client/.env.production`:
   ```
   VITE_API_URL=https://access-health-api.onrender.com/api
   ```

2. Rebuild and deploy client:
   ```bash
   cd client
   npm run build
   cd ..
   firebase deploy --only hosting
   ```

## Troubleshooting

### Build fails with "vite: not found"
- Make sure **Root Directory** is set to `server` (not the project root)
- This ensures Render only builds the server, not the client

### Server crashes on startup
- Check environment variables are set correctly
- Verify Firebase credentials are properly formatted
- Check logs in Render dashboard for specific errors

### API calls still fail
- Verify the VITE_API_URL in `.env.production` matches your Render URL
- Make sure you rebuilt the client after updating the URL
- Check CORS is enabled in the server (it should be by default)
