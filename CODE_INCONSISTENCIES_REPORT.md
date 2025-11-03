# Code Inconsistencies Report - src/app Folder

## 🔍 Analysis Date: November 4, 2025

---

## 🚨 Critical Issues Found

### 1. **DUPLICATE PRODUCT DATA** ⚠️ HIGH PRIORITY
**Location:** Multiple files contain hardcoded product arrays

**Files Affected:**
- `src/app/furniture/page.tsx` (lines 18-177)
- `src/app/new-launch/page.tsx` (lines 14-468)
- `src/app/products/page.tsx` (lines 48-63)

**Problem:**
- Same products defined in multiple places with different data
- No single source of truth
- Updates require changing multiple files
- Data can become out of sync

**Example Inconsistency:**
```typescript
// furniture/page.tsx
{
  id: 'miller-cane-three-seater',
  price: 204000,
  originalPrice: 240000,
  discount: 15,  // Number type
  emi: 21386.55,
}

// lib/products.ts
{
  id: 'miller-cane-three-seater',
  price: 204000,
  originalPrice: 240000,
  discount: '15',  // String type
  emi: {
    startingPrice: 21386,  // Different structure
    terms: '12 months'
  }
}
```

**Impact:**
- Data inconsistency across pages
- Difficult to maintain
- Type safety issues
- Potential runtime errors

---

### 2. **INCONSISTENT TYPE DEFINITIONS** ⚠️ HIGH PRIORITY

**Problem:** Product interface varies across files

**In `furniture/page.tsx`:**
```typescript
{
  id: string;
  name: string;
  price: number;
  originalPrice: number | null;  // nullable
  discount: number;              // number type
  image: string;                 // single string
  emi: number;                   // number type
  size: string;
}
```

**In `new-launch/page.tsx`:**
```typescript
{
  id: string;
  name: string;
  price: number;
  originalPrice: number | null;
  discount: number | null;       // can be null
  image: string;
  emi: number;
}
```

**In `products/page.tsx`:**
```typescript
{
  id: string;
  name: string;
  price: number;
  originalPrice: number;         // not nullable
  discount: string;              // string type (e.g., "25%OFF")
  image: string;
}
```

**In `lib/products.ts` (source of truth):**
```typescript
{
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discount?: string;             // optional string
  images: ProductImage[];        // array of images
  emi?: {                        // object type
    startingPrice: number;
    terms?: string;
  };
}
```

**Impact:**
- Type mismatches cause compilation errors
- No consistent data structure
- Cannot use shared types/interfaces

---

### 3. **MISSING INTEGRATION WITH PRODUCT DATA SOURCE** ⚠️ MEDIUM PRIORITY

**Problem:** Pages don't use `src/lib/products.ts`

**Files Not Using Central Data:**
- ✗ `furniture/page.tsx` - Has its own hardcoded products
- ✗ `new-launch/page.tsx` - Has its own hardcoded products  
- ✗ `products/page.tsx` - Has its own hardcoded products
- ✓ `product/[id]/page.tsx` - Correctly uses `getProduct()` ✓

**Should Be:**
```typescript
// furniture/page.tsx
import { getAllProducts } from '@/lib/products';

export default async function FurniturePage() {
  const products = await getAllProducts();
  // Filter and display
}
```

**Currently:**
```typescript
// furniture/page.tsx
const products = [ /* 200+ lines of hardcoded data */ ];
```

---

### 4. **INCONSISTENT IMAGE HANDLING** ⚠️ MEDIUM PRIORITY

**Problem:** Different image property structures

**furniture/page.tsx & new-launch/page.tsx:**
```typescript
image: string  // Single image path
```

**lib/products.ts (correct):**
```typescript
images: ProductImage[]  // Array of images with metadata
```

**products/page.tsx:**
```typescript
image: string  // Single image, but path structure different
// Uses: '/images/products/flair-chair-1.jpg'
// Should use: '/images/furniture/...'
```

**Impact:**
- ProductCard component expects different props
- Cannot show multiple images
- Image paths inconsistent

---

### 5. **DUPLICATE PRODUCT CARD COMPONENT** ⚠️ MEDIUM PRIORITY

**Problem:** ProductCard defined in multiple places

**Locations:**
1. `src/components/features/ProductCard.tsx` - Main component
2. `src/app/products/page.tsx` (lines 16-46) - Inline duplicate

**Inline ProductCard in products/page.tsx:**
```typescript
const ProductCard: React.FC<ProductCardProps> = ({ ... }) => {
  // 30 lines of duplicated code
};
```

**Should Use:**
```typescript
import ProductCard from '@/components/features/ProductCard';
```

**Impact:**
- Code duplication
- Different implementations
- Harder to maintain
- Style inconsistencies

---

### 6. **INCONSISTENT DISCOUNT FORMATTING** ⚠️ LOW PRIORITY

**Problem:** Discount displayed in different formats

**furniture/page.tsx:**
```typescript
discount: 15  // Number (percent)
// Displayed as: "15% OFF"
```

**new-launch/page.tsx:**
```typescript
discount: 5 | null
// Displayed as: "5% off" or hidden
```

**products/page.tsx:**
```typescript
discount: '25%OFF'  // String with format
// Displayed as-is
```

**lib/products.ts:**
```typescript
discount?: '15'  // Optional string number
```

**Impact:**
- Inconsistent UI display
- Different calculation logic needed
- Hard to standardize formatting

---

### 7. **MISSING TYPE IMPORTS** ⚠️ LOW PRIORITY

**Problem:** No shared TypeScript interfaces used

**Current State:**
- Each file defines its own inline types
- No import from `@/types/product`

**Should Be:**
```typescript
import { Product } from '@/types/product';
```

**Instead Of:**
```typescript
// Inline interface definitions in each file
interface ProductCardProps {
  id: string;
  name: string;
  // ... duplicate definitions
}
```

---

### 8. **INCONSISTENT EMI CALCULATION** ⚠️ MEDIUM PRIORITY

**Problem:** EMI stored/calculated differently

**furniture/page.tsx & new-launch/page.tsx:**
```typescript
emi: 21386.55  // Hardcoded decimal number
```

**lib/products.ts:**
```typescript
emi: {
  startingPrice: 21386,  // Integer
  terms: '12 months'      // Additional info
}
```

**Impact:**
- Cannot show EMI terms
- Recalculation needed if rates change
- Inconsistent precision (decimal vs integer)

---

### 9. **UNUSED LAYOUT FILE** ⚠️ LOW PRIORITY

**File:** `src/app/product/[id]/layout.tsx`

**Problem:**
- File only wraps children with minimal styling
- Adds `'use client'` unnecessarily (server component by default)
- Doesn't provide any unique functionality
- Can be removed

**Current Code:**
```typescript
'use client';  // Not needed

export default function ProductLayout({ children }) {
  return (
    <main className="min-h-screen bg-white">
      {children}
    </main>
  );
}
```

**Should Be:**
- Remove this file entirely
- Parent layout already handles this

---

### 10. **INCONSISTENT CLIENT/SERVER COMPONENTS** ⚠️ MEDIUM PRIORITY

**Problem:** All pages marked as client components unnecessarily

**Files Using `'use client'` Unnecessarily:**
- `collections/page.tsx` - Could be server component
- `furniture/page.tsx` - Needs client only for filtering
- `new-launch/page.tsx` - Needs client only for state
- `products/page.tsx` - Could be server component
- `product/[id]/layout.tsx` - Should be server component

**Impact:**
- Larger bundle size
- Slower initial page load
- Hydration overhead
- SEO may be affected

**Best Practice:**
- Only use `'use client'` when needed (state, events)
- Keep data fetching on server
- Use client components for interactive parts only

---

### 11. **INCONSISTENT FILTER IMPLEMENTATION** ⚠️ LOW PRIORITY

**Problem:** Different filtering approaches

**furniture/page.tsx:**
```typescript
const [selectedCategory, setSelectedCategory] = useState<string>('All');
const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
const [priceRange, setPriceRange] = useState({ min: 0, max: 500000 });
// Complex filtering logic (200+ lines)
```

**new-launch/page.tsx:**
```typescript
const [sortBy, setSortBy] = React.useState('featured');
// Comment says: "Filter state can be added when filter functionality is implemented"
// No actual filtering
```

**collections/page.tsx:**
```typescript
// No filtering at all
```

**Impact:**
- Inconsistent user experience
- Duplicated filter logic
- Hard to maintain

---

### 12. **HARDCODED STYLING VALUES** ⚠️ LOW PRIORITY

**Problem:** Magic numbers in styling

**Examples:**
```typescript
// collections/page.tsx
<section className="relative h-[500px]">  // Hardcoded height

// furniture/page.tsx
priceRange: { min: 0, max: 500000 }  // Magic number

// new-launch/page.tsx
<div className="relative h-[400px]">  // Different height
```

**Should Use:**
- Tailwind config values
- CSS variables
- Consistent spacing scale

---

## 📊 Summary Statistics

| Issue Type | Count | Priority |
|-----------|-------|----------|
| Duplicate Data | 3 files | HIGH |
| Type Inconsistencies | 4 files | HIGH |
| Missing Integration | 3 files | MEDIUM |
| Component Duplication | 2 files | MEDIUM |
| Client Component Overuse | 5 files | MEDIUM |
| Minor Issues | 6 items | LOW |

**Total Issues:** 12 major categories
**Files Affected:** 7 files
**Lines of Duplicate Code:** ~800+ lines

---

## 🔧 Recommended Fixes

### Priority 1: Data Consolidation (HIGH)

1. **Remove all hardcoded product arrays**
   - Delete product arrays from furniture/page.tsx
   - Delete product arrays from new-launch/page.tsx
   - Delete product arrays from products/page.tsx

2. **Use centralized data source**
   ```typescript
   import { getAllProducts, getProductsByCategory } from '@/lib/products';
   ```

3. **Transform data as needed**
   ```typescript
   const products = await getAllProducts();
   const displayProducts = products.map(p => ({
     ...p,
     image: p.images[0]?.url || '/placeholder.jpg'
   }));
   ```

### Priority 2: Type Standardization (HIGH)

1. **Create shared interfaces**
   ```typescript
   // types/product.ts
   export interface DisplayProduct {
     id: string;
     name: string;
     price: number;
     originalPrice: number;
     discount?: string;
     image: string;  // For display (first image)
     category: string;
     badge?: string;
   }
   ```

2. **Import types everywhere**
   ```typescript
   import { Product, DisplayProduct } from '@/types/product';
   ```

### Priority 3: Component Consolidation (MEDIUM)

1. **Remove duplicate ProductCard**
   - Delete inline ProductCard from products/page.tsx
   - Import from components/features/ProductCard

2. **Standardize ProductCard props**
   - Use consistent interface
   - Handle missing data gracefully

### Priority 4: Server Components (MEDIUM)

1. **Convert appropriate pages to server components**
   ```typescript
   // Remove 'use client' from:
   // - collections/page.tsx (if no filters needed)
   // - products/page.tsx
   // - product/[id]/layout.tsx
   ```

2. **Keep client components for interactive parts**
   - Keep furniture/page.tsx as client (has filters)
   - Keep new-launch/page.tsx as client (has state)

### Priority 5: Standardize EMI Display

1. **Create EMI formatter utility**
   ```typescript
   // lib/utils.ts
   export function formatEMI(emiPrice: number, terms: string = '12 months') {
     return `EMI from ₹${emiPrice.toLocaleString()}/month`;
   }
   ```

---

## 🎯 Immediate Action Items

1. ✅ **Create data transformation utilities** (2 hours)
2. ✅ **Refactor furniture/page.tsx to use central data** (1 hour)
3. ✅ **Refactor new-launch/page.tsx to use central data** (1 hour)
4. ✅ **Refactor products/page.tsx to use central data** (30 mins)
5. ✅ **Remove duplicate ProductCard component** (15 mins)
6. ✅ **Standardize TypeScript interfaces** (1 hour)
7. ✅ **Convert unnecessary client components** (30 mins)
8. ✅ **Delete unused layout.tsx** (5 mins)

**Total Estimated Time:** ~6 hours

---

## 📝 Code Examples for Fixes

### Fix 1: Refactor furniture/page.tsx

**Before:**
```typescript
'use client';

const products = [
  { id: 'miller-cane-three-seater', ... },
  // 200 lines of data
];

export default function FurniturePage() {
  // ...
}
```

**After:**
```typescript
'use client';

import { getAllProducts } from '@/lib/products';
import { Product } from '@/types/product';

export default function FurniturePage() {
  const [products, setProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    getAllProducts().then(setProducts);
  }, []);
  
  // Transform for display
  const displayProducts = products.map(p => ({
    ...p,
    image: p.images[0]?.url || '/placeholder.jpg',
    emi: p.emi?.startingPrice || 0
  }));
  
  // Rest of component
}
```

### Fix 2: Remove Duplicate ProductCard

**Before (products/page.tsx):**
```typescript
const ProductCard: React.FC<ProductCardProps> = ({ ... }) => {
  // 30 lines of code
};

export default function ProductsPage() {
  // Uses inline ProductCard
}
```

**After:**
```typescript
import ProductCard from '@/components/features/ProductCard';

export default function ProductsPage() {
  // Uses imported ProductCard
}
```

### Fix 3: Convert to Server Component

**Before (products/page.tsx):**
```typescript
'use client';

export default function ProductsPage() {
  // Static data, no interactivity
}
```

**After:**
```typescript
// Remove 'use client'

import { getAllProducts } from '@/lib/products';

export default async function ProductsPage() {
  const products = await getAllProducts();
  // Server-side rendering
}
```

---

## 🏁 Conclusion

The `src/app` folder has significant inconsistencies primarily due to:

1. **Data Duplication** - Multiple sources of truth for product data
2. **Type Inconsistencies** - Different interfaces in each file
3. **Component Duplication** - Same components defined multiple times
4. **Architecture Issues** - Overuse of client components
5. **Missing Abstractions** - No shared utilities or helpers

**Main Cause:** Rapid development without establishing patterns first

**Solution:** Consolidate data, standardize types, create reusable utilities

**Benefit After Fixes:**
- ✅ Single source of truth for data
- ✅ Type-safe throughout application
- ✅ Faster page loads (server components)
- ✅ Easier maintenance
- ✅ Consistent user experience
- ✅ Reduced bundle size

---

**Generated:** November 4, 2025  
**Analyzed Files:** 7 files in src/app/  
**Total Issues:** 12 categories  
**Priority Distribution:** 2 HIGH, 4 MEDIUM, 6 LOW
