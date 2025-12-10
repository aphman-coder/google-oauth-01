# Vercel Environment Variables Setup

## Required Environment Variables

To keep your secrets secure, add these environment variables in Vercel:

### Step 1: Go to Vercel Project Settings

1. Go to: https://vercel.com/anakins-projects-8223c7ca/google-oauth-01/settings
2. Click on "Environment Variables" in the left sidebar

### Step 2: Add Environment Variables

Add these two variables:

**Variable 1:**
- **Name:** `GOOGLE_CLIENT_ID`
- **Value:** `[Your Client ID from Google Cloud Console]`
- **Environment:** Production, Preview, Development (select all)

**Variable 2:**
- **Name:** `GOOGLE_CLIENT_SECRET`
- **Value:** `[Your Client Secret from Google Cloud Console]`
- **Environment:** Production, Preview, Development (select all)

### Step 3: Redeploy

After adding the environment variables:
1. Go to the "Deployments" tab
2. Click the three dots (⋯) on the latest deployment
3. Click "Redeploy"
4. Or push a new commit to trigger automatic deployment

## Why Environment Variables?

- ✅ Keeps secrets out of your code
- ✅ More secure (GitHub won't block pushes)
- ✅ Easy to update without changing code
- ✅ Different values for different environments

## Current Configuration

- **Client ID:** Already set in `app.js` (line 2) - this is safe to be public
- **Client Secret:** Should be in Vercel environment variables (not in code)
- **API Key:** Still needs to be added to `app.js` (line 16)

