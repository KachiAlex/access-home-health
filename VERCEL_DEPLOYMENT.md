# Deployment Guide - Vercel

## Deploying to Vercel (Both Frontend & Backend)

### Prerequisites
- GitHub account with the repo pushed
- Vercel account (vercel.com)
- PostgreSQL database (Neon, Supabase, or AWS RDS)

---

## Step 1: Connect Repository to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select "Import Git Repository"
4. Choose `https://github.com/KachiAlex/access-home-health`
5. Click "Import"

---

## Step 2: Configure Project Settings

**Name:** `access-home-health` (or your choice)

**Root Directory:** Leave as `.` (root)

**Framework:** `Next.js`

**Build Command:** `npm run build`

**Start Command:** `npm run start`

**Install Command:** `npm install`

---

## Step 3: Add Environment Variables

In Vercel Project Settings → Environment Variables, add:

```
DATABASE_URL = postgresql://user:password@host:5432/dbname
NEXT_PUBLIC_API_URL = https://your-domain.vercel.app/api
NODE_ENV = production
PORT = 4000
```

### Getting a Database URL:

**Option A: Neon (Recommended)**
1. Go to [neon.tech](https://neon.tech)
2. Create free PostgreSQL database
3. Copy connection string: `postgresql://user:password@...`

**Option B: Supabase**
1. Go to [supabase.com](https://supabase.com)
2. Create project
3. Get PostgreSQL connection string from settings

---

## Step 4: Deploy

1. Click "Deploy"
2. Wait for build to complete (3-5 minutes)
3. Visit your live URL

Your app will be available at: `https://your-domain.vercel.app`

---

## How It Works

- **Frontend:** Next.js runs on Vercel as static site
- **Backend:** NestJS runs as Vercel Serverless Functions under `/api` route
- **Database:** PostgreSQL on Neon/Supabase

All API calls from frontend to `/api/*` are routed to NestJS backend.

---

## Vercel Settings Summary

| Setting | Value |
|---------|-------|
| **Root Directory** | `.` |
| **Build Command** | `npm run build` |
| **Install Command** | `npm install` |
| **Start Command** | `npm run start` |
| **Output Directory** | `apps/web/.next` |
| **Node Version** | 18.x |

---

## Environment Variables Reference

| Variable | Value | Required |
|----------|-------|----------|
| `DATABASE_URL` | PostgreSQL connection string | ✅ Yes |
| `NEXT_PUBLIC_API_URL` | `https://your-domain.vercel.app/api` | ✅ Yes |
| `NODE_ENV` | `production` | ✅ Yes |

---

## Monitoring & Logs

After deployment:
1. Go to Vercel dashboard
2. Click your project
3. View "Deployments" tab for build logs
4. Check "Functions" tab for API performance
5. View "Analytics" for traffic insights

---

## Troubleshooting

**Build fails with "Build optimization failed"**
- Increase build timeout in Project Settings
- Check Environment Variables are set correctly

**API returning 502 errors**
- Check DATABASE_URL is correct
- Verify Prisma migrations ran
- Check function logs in Vercel dashboard

**Frontend can't connect to API**
- Verify `NEXT_PUBLIC_API_URL` matches your domain
- Clear browser cache
- Check API logs for errors

---

## Custom Domain

1. Go to Project Settings → Domains
2. Click "Add Domain"
3. Enter your custom domain
4. Follow DNS configuration steps
5. Wait for SSL certificate (usually <24 hours)

Then update:
```
NEXT_PUBLIC_API_URL = https://yourdomain.com/api
```

---

## Scale & Pricing

**Vercel Free Tier Includes:**
- 100 GB bandwidth
- Unlimited deployments
- Serverless functions
- Edge caching

**When you exceed free tier:**
- $0.50 per 100k serverless function invocations
- $0.15 per GB additional bandwidth

For production, consider Pro plan ($20/month) for priority support.
