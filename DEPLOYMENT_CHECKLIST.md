# Deployment Checklist for Netlify

## ✅ Pre-Deployment Steps Completed

1. **Node.js Version Specified** ✓
   - Added to `package.json` engines field
   - Created `.nvmrc` file with Node 20
   - Updated `netlify.toml` with NODE_VERSION

2. **Client Components Fixed** ✓
   - All components using hooks have `'use client'` directive
   - Zustand store configured with SSR-safe storage
   - Client-side mounting check added to CartSidebar
   - Fixed "getServerSnapshot should be cached" error

## 🔧 Required: Environment Variables in Netlify

Go to **Netlify Dashboard → Site Settings → Environment Variables** and add:

### Database
```
DATABASE_URL=your_production_database_url
```

### NextAuth
```
NEXTAUTH_SECRET=your_production_secret
NEXTAUTH_URL=https://your-site.netlify.app
```

### OAuth (if using)
```
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### Stripe
```
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

### Email
```
RESEND_API_KEY=your_resend_api_key
```

### File Upload
```
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Admin
```
ADMIN_EMAIL=your_admin_email
```

## 🚀 Deployment Steps

1. **Push to Git**
   ```bash
   git add .
   git commit -m "Fix: Add deployment configuration and hydration fixes"
   git push origin main
   ```

2. **Netlify Auto-Deploy**
   - Netlify will automatically detect the push
   - Build will start automatically
   - Monitor build logs for any errors

3. **Manual Deploy (if needed)**
   ```bash
   pnpm build
   netlify deploy --prod
   ```

## 🐛 Common Deployment Issues & Fixes

### Issue 1: React Error #185 (Invalid Hook Call)
**Cause:** Component using hooks without `'use client'`
**Fix:** Already applied - all components have proper directives

### Issue 2: Hydration Mismatch
**Cause:** Zustand persist accessing localStorage during SSR
**Fix:** Already applied - added `skipHydration: true` and manual rehydration

### Issue 3: Build Fails with "Module not found"
**Cause:** Case-sensitive imports on Linux servers
**Fix:** Ensure all imports match exact file names (case-sensitive)

### Issue 4: Database Connection Fails
**Cause:** Missing DATABASE_URL in Netlify environment
**Fix:** Add DATABASE_URL to Netlify environment variables

### Issue 5: Images Not Loading
**Cause:** Next.js Image Optimization needs configuration
**Fix:** Already configured in `next.config.ts`

## 📊 Post-Deployment Verification

After deployment, test these features:

- [ ] Homepage loads correctly
- [ ] Product pages render properly
- [ ] Cart functionality works (add/remove items)
- [ ] Cart persists after page refresh
- [ ] Images load correctly
- [ ] Forms submit successfully
- [ ] Database queries work
- [ ] Authentication works (if implemented)

## 🔍 Debugging Failed Deployments

1. **Check Netlify Build Logs**
   - Go to Netlify Dashboard → Deploys → Click on failed deploy
   - Read the error message carefully

2. **Common Error Messages:**

   **"Error: Minified React error #185"**
   - Already fixed with `'use client'` directives

   **"Error: Cannot find module"**
   - Check import paths are correct and case-sensitive

   **"Error: Prisma Client not generated"**
   - Ensure `postinstall` script runs: `"postinstall": "prisma generate"`

   **"Error: Environment variable not found"**
   - Add missing variables to Netlify environment settings

3. **Test Locally with Production Build**
   ```bash
   pnpm build
   pnpm start
   ```
   This mimics production environment

## 🎯 Performance Optimization (Optional)

After successful deployment:

1. Enable Netlify CDN
2. Configure caching headers
3. Enable image optimization
4. Set up monitoring with Sentry
5. Add Google Analytics

## 📝 Notes

- Build time: ~3-5 minutes
- First deploy may take longer due to dependency installation
- Subsequent deploys are faster due to caching
- Always test in production after deployment
