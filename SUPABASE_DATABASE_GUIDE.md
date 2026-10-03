# 🌐 Free Supabase Cloud Database Setup Guide for Tea Talk CMS

By setting up a free Supabase Database (takes ~2 minutes), **any edit made in the Admin Panel** (`/admin`) will automatically sync and update live across all devices and customers worldwide!

---

## Step 1: Create a Free Supabase Project (2 Minutes)
1. Go to [supabase.com](https://supabase.com) and click **Start your project** (Sign in with GitHub or Email).
2. Click **New Project**.
3. Name your project: `teatalk-cms`.
4. Enter a database password and select a region (e.g. `Singapore` or `Mumbai`).
5. Click **Create new project**.

---

## Step 2: Create the Data Table
1. In your Supabase Dashboard sidebar, click **SQL Editor**.
2. Click **New Query**.
3. Paste the following SQL snippet and click **RUN**:

```sql
CREATE TABLE IF NOT EXISTS teatalk_cms_store (
  id INT PRIMARY KEY DEFAULT 1,
  menuItems JSONB,
  galleryItems JSONB,
  siteContent JSONB,
  outlets JSONB,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Public Read & Write Access for Admin CMS
ALTER TABLE teatalk_cms_store ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON teatalk_cms_store FOR SELECT USING (true);
CREATE POLICY "Allow public insert/update" ON teatalk_cms_store FOR ALL USING (true);
```

---

## Step 3: Copy Credentials to Vercel Environment Variables
1. In Supabase, go to **Project Settings** (gear icon) ➔ **API**.
2. Copy these 2 keys:
   - **Project URL** (e.g., `https://xyzcompany.supabase.co`)
   - **Project API Keys (anon public)** (e.g., `eyJhbGciOi...`)

3. Go to your **Vercel Project Dashboard**:
   - Navigate to **Settings** ➔ **Environment Variables**.
   - Add Variable 1:
     - **Key**: `VITE_SUPABASE_URL`
     - **Value**: *(your Project URL)*
   - Add Variable 2:
     - **Key**: `VITE_SUPABASE_ANON_KEY`
     - **Value**: *(your anon public key)*

4. Redeploy on Vercel or run `npx vercel --prod`.

---

## ✨ Result
When you make changes in `/admin` (changing prices, adding menu items, updating outlets), it writes to Supabase in real time. **Every visitor on every phone/computer worldwide will see the updated content live!**
