# Quick Fix: Deployment Issues

## Why Local Build Works But Deployment Fails?

| Local | Deployment |
|-------|-----------|
| Development mode | Production mode (strict) |
| Your Node version | Server's Node version (may differ) |
| .env.local available | Needs env vars configured |
| Loose hydration checks | Strict SSR/hydration checks |

## ✅ Fixes Applied

### 1. Node Version Lock
- ✓ Added `engines` to `package.json`
- ✓ Created `.nvmrc` file
- ✓ Updated `netlify.toml`

### 2. React Hydration Fix
- ✓ Added `'use client'` to all hook-using components
- ✓ Fixed Zustand persist with `skipHydration: true`
- ✓ Added manual hydration in CartSidebar

### 3. Build Configuration
- ✓ Proper Next.js 15 + Turbopack setup
- ✓ Prisma generate in postinstall

## 🚨 Action Required: Environment Variables

**You MUST add these to Netlify:**

1. Go to: Netlify Dashboard → Your Site → Site Settings → Environment Variables

2. Add ALL variables from your `.env.local`:
   - DATABASE_URL
   - NEXTAUTH_SECRET
   - NEXTAUTH_URL (use your Netlify URL)
   - STRIPE_PUBLISHABLE_KEY
   - STRIPE_SECRET_KEY
   - RESEND_API_KEY
   - CLOUDINARY_CLOUD_NAME
   - CLOUDINARY_API_KEY
   - CLOUDINARY_API_SECRET
   - ADMIN_EMAIL

3. Click "Save"

4. Trigger a new deploy

## 🔄 Deploy Now

```bash
git add .
git commit -m "Fix: Deployment configuration"
git push origin main
```

Netlify will auto-deploy. Watch the build logs!

## 🐛 If Still Failing

1. **Check Build Logs** in Netlify Dashboard
2. **Look for specific error** (not just "build failed")
3. **Common issues:**
   - Missing env var → Add it
   - Module not found → Check import case-sensitivity
   - Prisma error → Check DATABASE_URL is set

## 💡 Test Production Build Locally

```bash
# Clean everything
rm -rf .next node_modules
pnpm install

# Build like production
pnpm build

# Run production server
pnpm start
```

If this works, deployment should work too!
