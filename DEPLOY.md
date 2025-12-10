# Deploy to Vercel - Step by Step Guide

This guide will help you deploy your Google OAuth login page to Vercel (free hosting platform).

## Why Vercel?

- ✅ **100% Free** for personal projects
- ✅ **Automatic HTTPS** (required for Google OAuth)
- ✅ **Easy deployment** via GitHub or CLI
- ✅ **Fast global CDN**
- ✅ **Perfect for Node.js apps**

## Prerequisites

1. A GitHub account (free)
2. Google Cloud Console account (free)
3. Vercel account (free)

## Step 1: Prepare Your Code

1. Make sure you've updated `app.js` with your Google OAuth credentials:
   - Replace `YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com` with your Client ID
   - Replace `YOUR_GOOGLE_API_KEY` with your API Key

## Step 2: Push to GitHub

1. **Initialize Git repository** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Google OAuth login page"
   ```

2. **Create a new repository on GitHub**:
   - Go to https://github.com/new
   - Name it (e.g., `google-oauth-login`)
   - Don't initialize with README (you already have one)
   - Click "Create repository"

3. **Push your code**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/google-oauth-login.git
   git branch -M main
   git push -u origin main
   ```
   (Replace `YOUR_USERNAME` with your GitHub username)

## Step 3: Deploy to Vercel

### Option A: Deploy via GitHub (Recommended - Easiest)

1. **Sign up for Vercel**:
   - Go to https://vercel.com/signup
   - Click "Continue with GitHub"
   - Authorize Vercel to access your GitHub account

2. **Import your project**:
   - Click "Add New..." → "Project"
   - Select your `google-oauth-login` repository
   - Click "Import"

3. **Configure project**:
   - Framework Preset: **Other** (or leave default)
   - Root Directory: `./` (default)
   - Build Command: Leave empty (or `npm install`)
   - Output Directory: Leave empty
   - Install Command: `npm install`

4. **Deploy**:
   - Click "Deploy"
   - Wait for deployment to complete (usually 1-2 minutes)
   - You'll get a URL like: `https://your-project-name.vercel.app`

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```
   - Follow the prompts
   - When asked "Set up and deploy?", type `Y`
   - When asked "Which scope?", select your account
   - When asked "Link to existing project?", type `N`
   - When asked "What's your project's name?", press Enter for default
   - When asked "In which directory is your code located?", press Enter for `./`

4. **Deploy to production**:
   ```bash
   vercel --prod
   ```

## Step 4: Update Google OAuth Settings

**IMPORTANT**: You must update your Google Cloud Console settings to allow your Vercel URL.

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** → **Credentials**
3. Click on your OAuth 2.0 Client ID
4. Under **Authorized JavaScript origins**, add:
   - `https://your-project-name.vercel.app`
   - `https://your-project-name.vercel.app/` (with trailing slash)
5. Under **Authorized redirect URIs**, add:
   - `https://your-project-name.vercel.app`
   - `https://your-project-name.vercel.app/`
6. Click **Save**

## Step 5: Test Your Deployment

1. Visit your Vercel URL: `https://your-project-name.vercel.app`
2. Click "Sign in with Google"
3. Complete the OAuth flow
4. You should see your profile information!

## Troubleshooting

### "Sign in with Google" button doesn't work
- ✅ Check that you've added your Vercel URL to Google Cloud Console
- ✅ Verify your Client ID and API Key are correct in `app.js`
- ✅ Check browser console for errors (F12 → Console tab)
- ✅ Make sure you're using HTTPS (Vercel provides this automatically)

### CORS errors
- ✅ Ensure your Vercel URL is added to Google Cloud Console authorized origins
- ✅ Check that you're accessing the site via HTTPS

### Deployment fails
- ✅ Make sure `package.json` has all dependencies listed
- ✅ Check Vercel deployment logs for specific errors
- ✅ Ensure `vercel.json` is properly formatted

## Updating Your Site

Every time you push changes to your GitHub repository, Vercel will automatically redeploy your site!

Just:
1. Make changes locally
2. Commit and push:
   ```bash
   git add .
   git commit -m "Your changes"
   git push
   ```
3. Vercel will automatically deploy the new version

## Custom Domain (Optional)

Vercel allows you to add a custom domain for free:
1. Go to your project on Vercel dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Vercel Support: https://vercel.com/support
- Google OAuth Docs: https://developers.google.com/identity/protocols/oauth2

