# Deployment Guide for Foodzy Ecommerce

This guide covers how to deploy the **Foodzy** application (Frontend + Backend + Database).

## 1. Database Deployment (PostgreSQL)

You need a hosted PostgreSQL database. We recommend **Railway** or **Neon**.

### Option A: Railway (Easiest)
1.  Sign up at [railway.app](https://railway.app/).
2.  Click **New Project** -> **Provision PostgreSQL**.
3.  Once created, click on the PostgreSQL card -> **Connect**.
4.  Copy the **Postgres Connection URL** (e.g., `postgresql://postgres:password@viaduct.proxy.rlwy.net:12345/railway`).

---

## 2. Backend Deployment (NestJS)

We will deploy the backend to **Railway** (or Render).

### Deploy on Railway
1.  Push your code to GitHub.
2.  In Railway, click **New Project** -> **Deploy from GitHub repo**.
3.  Select your repository.
4.  **Configure Root Directory**:
    *   Go to **Settings** -> **Root Directory** and set it to `/backend`.
5.  **Environment Variables**:
    *   Go to **Variables**.
    *   Add the following:
        *   `PORT`: `3000` (or let Railway assign one)
        *   `DB_HOST`: (from your database URL)
        *   `DB_PORT`: (from your database URL)
        *   `DB_USERNAME`: (from your database URL)
        *   `DB_PASSWORD`: (from your database URL)
        *   `DB_NAME`: (from your database URL)
        *   `JWT_SECRET`: (generate a random strong string)
        *   `MAIL_HOST`, `MAIL_USER`, `MAIL_PASS`: (your email SMTP details)
6.  **Build Command**: `npm install && npm run build`
7.  **Start Command**: `npm run start:prod`
8.  Once deployed, copy the **Public Domain** (e.g., `https://backend-production.up.railway.app`).

---

## 3. Frontend Deployment (Next.js)

We will deploy the frontend to **Vercel**.

### Deploy on Vercel
1.  Sign up at [vercel.com](https://vercel.com/).
2.  Click **Add New** -> **Project**.
3.  Import your GitHub repository.
4.  **Configure Project**:
    *   **Framework Preset**: Next.js
    *   **Root Directory**: Edit and select `frontend`.
5.  **Environment Variables**:
    *   Add `NEXT_PUBLIC_API_URL`: Set this to your **Backend URL** from step 2 (e.g., `https://backend-production.up.railway.app`).
6.  Click **Deploy**.

---

## 4. Final Verification

1.  Open your Vercel URL (e.g., `https://foodzy.vercel.app`).
2.  Check if products are loading (this confirms frontend connected to backend).
3.  Try logging in or adding items to cart.

## Troubleshooting

*   **CORS Error**: If frontend fails to fetch data, ensure your Backend `main.ts` has `app.enableCors()` (we added this).
*   **Images not loading**: Ensure `next.config.ts` includes the domains of your image providers (we added `images.unsplash.com`).
