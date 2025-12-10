# Google Login Troubleshooting Guide

## Issue: Google Login Not Working

### Common Causes and Solutions:

### 1. Missing API Key ⚠️ **MOST LIKELY ISSUE**

**Problem:** The API Key in `app.js` is not set.

**Solution:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Click "Create Credentials" → "API Key"
3. Copy your API Key
4. Open `app.js` and replace `'YOUR_GOOGLE_API_KEY'` on line 16 with your actual API Key
5. Push the changes: `git add app.js && git commit -m "Add Google API Key" && git push`

### 2. Vercel URL Not Added to Google Cloud Console

**Problem:** Your Vercel deployment URL is not authorized in Google Cloud Console.

**Solution:**
1. Get your Vercel URL (e.g., `https://google-oauth-01.vercel.app`)
2. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
3. Click on your OAuth 2.0 Client ID
4. Under **Authorized JavaScript origins**, add:
   - `https://google-oauth-01.vercel.app` (your actual Vercel URL)
   - `https://google-oauth-01.vercel.app/` (with trailing slash)
5. Under **Authorized redirect URIs**, add:
   - `https://google-oauth-01.vercel.app`
   - `https://google-oauth-01.vercel.app/`
6. Click **Save**

### 3. Check Browser Console for Errors

**How to check:**
1. Open your site in a browser
2. Press `F12` (or right-click → Inspect)
3. Go to the "Console" tab
4. Look for any red error messages
5. Common errors:
   - `API key not valid` → Need to add API Key
   - `redirect_uri_mismatch` → Need to add Vercel URL to Google Cloud Console
   - `origin_mismatch` → Need to add Vercel URL to authorized origins

### 4. Verify OAuth Consent Screen

**Check:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials/consent)
2. Make sure OAuth consent screen is configured
3. Add your email as a test user if the app is in testing mode

### 5. Enable Required APIs

**Check:**
1. Go to [Google Cloud Console APIs](https://console.cloud.google.com/apis/library)
2. Make sure these APIs are enabled:
   - Google+ API (or People API)
   - OAuth2 API

## Quick Checklist

- [ ] API Key is set in `app.js` (line 16)
- [ ] Client ID is correct in `app.js` (line 2)
- [ ] Vercel URL is added to Google Cloud Console authorized origins
- [ ] Vercel URL is added to Google Cloud Console redirect URIs
- [ ] OAuth consent screen is configured
- [ ] Required APIs are enabled
- [ ] No errors in browser console

## Still Not Working?

1. Check the browser console for specific error messages
2. Verify your Vercel URL matches exactly in Google Cloud Console
3. Make sure there are no typos in the Client ID or API Key
4. Try clearing browser cache and cookies
5. Test in an incognito/private window

