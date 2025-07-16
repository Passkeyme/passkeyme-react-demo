# Vercel Deployment Guide

## Overview
This guide covers deploying the PasskeyMe React Demo to Vercel with proper OAuth callback handling.

## Deployment Steps

### 1. Deploy to Vercel
```bash
npx vercel --prod
```

Or connect your GitHub repository to Vercel for automatic deployments.

### 2. Configure Environment Variables

In your Vercel dashboard, go to Project Settings → Environment Variables and add:

#### Required Variables:
```
VITE_PASSKEYME_APP_ID=your-actual-app-id
VITE_PASSKEYME_BASE_URL=https://passkeyme.com
VITE_PASSKEYME_PASSKEY_API_KEY=your-passkey-api-key
```

#### Optional Variables:
```
VITE_DEBUG_MODE=false
VITE_PASSKEYME_REDIRECT_URI=https://your-domain.vercel.app/callback
```

**Note:** The `VITE_PASSKEYME_REDIRECT_URI` is automatically detected from `window.location.origin` if not set, so it's optional for most deployments.

### 3. Update PasskeyMe App Configuration

In your PasskeyMe dashboard:
1. Go to your app settings
2. Add your Vercel domain to the allowed redirect URIs:
   - `https://your-domain.vercel.app/callback`
   - Keep `http://localhost:3000/callback` for development

### 4. Redeploy
After setting environment variables, trigger a new deployment to apply the changes.

## How the SPA Routing Fix Works

### Problem
Vercel was returning 404 for `/callback` because it tried to serve it as a static file.

### Solution
1. **vercel.json** - Configures SPA rewrites to serve all routes through `index.html`
2. **Dynamic Redirect URI** - Auto-detects the current domain for OAuth callbacks
3. **Cache Headers** - Prevents caching of the callback route

### Files Changed
- `vercel.json` - Vercel configuration for SPA routing
- `src/App.tsx` - Dynamic redirect URI detection

## Testing
1. Visit your deployed app: `https://your-domain.vercel.app`
2. Click "Login with Google" 
3. Complete OAuth flow
4. Should redirect to `/callback` and handle the token properly

## Troubleshooting

### Still getting 404?
- Check that `vercel.json` is in the root of your project
- Verify the build completed successfully
- Check Vercel function logs for errors

### OAuth not working?
- Verify environment variables are set correctly
- Check that your domain is in PasskeyMe allowed redirect URIs
- Enable debug mode: `VITE_DEBUG_MODE=true`

### Environment Variables Not Loading?
- Make sure variable names start with `VITE_`
- Redeploy after adding variables
- Check Vercel dashboard that variables are saved
