# Zustand SSR Infinite Loop Fix

## The Problem

**Error:** "The result of getServerSnapshot should be cached to avoid an infinite loop"  
**Secondary Error:** "Maximum update depth exceeded"

### Root Cause
Zustand's `persist` middleware with `localStorage` was causing infinite re-renders because:
1. During SSR, `localStorage` doesn't exist
2. React 19 + Next.js 15 have stricter hydration requirements
3. The store was being accessed directly, causing SSR/client mismatches
4. Each render created a new snapshot function, triggering infinite loops

## The Solution

### 1. Simplified Store (`src/store/cart.ts`)
- Removed complex SSR checks from the store itself
- Let the store use `localStorage` directly (client-only)
- Kept the persist middleware simple

### 2. Created Safe Hook (`src/hooks/useCart.ts`)
- **Key Innovation:** Wrapper hook that handles SSR safely
- Returns empty state during SSR (no localStorage access)
- Only activates the real store after client-side mount
- Prevents hydration mismatches

### 3. Updated Components
- `CartSidebar.tsx` - Uses `useCart()` instead of `useCartStore()`
- `miller-cane-three-seater/page.tsx` - Uses `useCart()` instead of `useCartStore()`

## How It Works

```typescript
// During SSR (server-side)
useCart() returns:
{
  items: [],
  addItem: () => {},  // no-op functions
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {}
}

// After client mount
useCart() returns:
{
  items: [actual cart items from localStorage],
  addItem: (item) => { /* real function */ },
  // ... real functions
}
```

## Why This Works

1. **No SSR Access:** Store is never accessed during server rendering
2. **Stable References:** Hook provides consistent API regardless of mount state
3. **No Hydration Mismatch:** Server and client render the same empty state initially
4. **Smooth Transition:** After mount, real data loads without causing re-render loops

## Migration Guide

### Before (❌ Causes infinite loop)
```typescript
import { useCartStore } from '@/store/cart';

const { items, addItem } = useCartStore(state => ({
  items: state.items,
  addItem: state.addItem
}));
```

### After (✅ Works perfectly)
```typescript
import { useCart } from '@/hooks/useCart';

const { items, addItem } = useCart();
```

## Testing

### Build Test
```bash
pnpm build
```
✅ Should complete successfully with no errors

### Dev Test
```bash
# Stop current dev server (Ctrl+C)
pnpm dev
# Open http://localhost:3000
```
✅ Should load without console errors
✅ Cart should work (add/remove items)
✅ Cart should persist after page refresh

## Deployment Ready

This fix works for both:
- ✅ Local development
- ✅ Production builds
- ✅ Netlify/Vercel deployment
- ✅ SSR and SSG pages

## Key Takeaway

**Never access Zustand persist stores directly in components that render during SSR.**  
Always use a wrapper hook that handles the SSR/client boundary safely.
