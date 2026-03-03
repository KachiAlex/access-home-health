# Server Deployment Guide

## Problem
The Express server (`d:\accesshealth\server`) is currently only running locally on `localhost:5000`. 
In production, the client app needs to access the API endpoints for:
- Paystack payment verification (`/api/paystack/verify-transaction`)
- Home care registrations (`/api/homecare/register`, `/api/homecare/registrations`)

## Quick Solution: Deploy to Railway (Free)

### Step 1: Sign up for Railway
1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project"

### Step 2: Deploy the Server
1. Click "Deploy from GitHub repo"
2. Select your `access-home-health` repository
3. Railway will auto-detect the Node.js app
4. Set the root directory to `/server`
5. Railway will automatically deploy

### Step 3: Configure Environment Variables
In Railway dashboard, add these environment variables:
```
PORT=5000
FIREBASE_TYPE=service_account
FIREBASE_PROJECT_ID=accesshomehealth
FIREBASE_PRIVATE_KEY_ID=<your_key_id>
FIREBASE_PRIVATE_KEY=<your_private_key>
FIREBASE_CLIENT_EMAIL=<your_client_email>
FIREBASE_CLIENT_ID=<your_client_id>
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_X509_CERT_URL=<your_cert_url>
JWT_SECRET=<your_jwt_secret>
NODE_ENV=production
```

### Step 4: Get Your Deployment URL
1. After deployment, Railway will give you a URL like: `https://your-app.up.railway.app`
2. Copy this URL

### Step 5: Update Client Environment Variable
1. Edit `d:\accesshealth\client\.env.production`
2. Replace the URL with your Railway URL:
   ```
   VITE_API_URL=https://your-app.up.railway.app/api
   ```

### Step 6: Rebuild and Redeploy Client
```bash
cd d:\accesshealth\client
npm run build
cd ..
firebase deploy --only hosting
```

## Alternative: Deploy to Render (Also Free)

1. Go to https://render.com
2. Sign up and create a new "Web Service"
3. Connect your GitHub repository
4. Set root directory to `server`
5. Build command: `npm install`
6. Start command: `npm start`
7. Add environment variables (same as above)
8. Deploy and get your URL
9. Update `.env.production` with your Render URL

## Alternative: Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. In the `server` directory, run: `vercel`
3. Follow the prompts
4. Get your deployment URL
5. Update `.env.production`

## Current Status
- ✅ Server code is ready in `d:\accesshealth\server`
- ✅ Railway configuration file created (`railway.json`)
- ⏳ Waiting for deployment
- ⏳ Need to update `.env.production` with deployed URL
