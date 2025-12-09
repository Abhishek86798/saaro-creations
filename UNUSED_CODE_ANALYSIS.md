# Unused Code Analysis - Saaro Creations Website
**Analysis Date:** December 9, 2025  
**Scope:** Frontend codebase (src/ and public/ directories)

---

## Executive Summary

This report identifies unused or potentially unused code, files, and assets in the Saaro Creations website. The analysis focuses on:
- Unused files
- Unused imports
- Unused functions and utilities
- Unused components
- Unused types/interfaces
- Unused assets (images)

**Key Findings:**
- 1 backup file ready for removal
- 1 unused store file (duplicate)
- 1 unused hook
- 1 empty directory
- 1 unused HTML file
- Multiple timestamp-based image directories (potential cleanup candidates)
- Several internal utility functions that are only used within their modules

---

## 1. UNUSED FILES

### 1.1 Backup/Old Files

#### ❌ `src/app/furniture/dining/page-old-backup.tsx`
- **Type:** Complete page component backup
- **Size:** 1193 lines
- **Reason:** This is a backup of the old dining page implementation before refactoring
- **Status:** Safe to delete
- **Action:** DELETE - The current `page.tsx` is the active version
- **Risk Level:** LOW - This is clearly a backup file

---

### 1.2 Duplicate Store Files

#### ⚠️ `src/store/cart.ts`
- **Type:** Zustand store
- **Reason:** Duplicate of `src/store/cartStore.ts` with similar functionality
- **Usage:** Only imported by `src/hooks/useCart.ts`
- **Status:** Potentially unused (superseded by cartStore.ts)
- **Action:** REVIEW - Determine if `useCart` hook is actually needed
- **Risk Level:** MEDIUM - Need to verify that cartStore.ts has all functionality

**Details:**
```typescript
// cart.ts exports:
- useCartStore (basic version)
- CartItem interface

// cartStore.ts exports (more complete):
- useCartStore (extended version)
- CartItem interface
- isOpen state
- _hasHydrated state
- Additional methods: toggleCart, setCartOpen, getItemCount, getTotal, getSubtotal
```

**Comparison:**
- `cartStore.ts` is imported in 6+ files (Header, ProductDetail, useHydration)
- `cart.ts` is ONLY imported in `useCart.ts` hook
- `cartStore.ts` has more features and is the actively used version

---

### 1.3 Unused Hooks

#### ⚠️ `src/hooks/useCart.ts`
- **Type:** React hook
- **Imports:** Only imports from `@/store/cart` (the duplicate store)
- **Usage:** NOT imported anywhere in the codebase
- **Reason:** Application uses `useCartStore` directly instead of this wrapper hook
- **Action:** DELETE - Not used, and functionality available through useCartStore
- **Risk Level:** LOW - Not referenced anywhere

**Code Analysis:**
```typescript
// This hook wraps the cart store with client-side dynamic imports
// However, the app directly uses useCartStore from cartStore.ts instead
export function useCart() {
  // Returns: items, addItem, removeItem, updateQuantity, clearCart
  // All functionality available directly through useCartStore
}
```

---

### 1.4 Empty Directories

#### ❌ `src/components/forms/`
- **Type:** Empty directory
- **Reason:** No files present
- **Action:** DELETE - No content
- **Risk Level:** NONE

---

### 1.5 Unused HTML Files

#### ⚠️ `public/forms.html`
- **Type:** Static HTML file
- **Reason:** Not referenced anywhere in the codebase
- **Usage:** No imports or links found
- **Action:** REVIEW - Confirm this isn't served directly via URL
- **Risk Level:** LOW - Likely unused but verify

---

## 2. UNUSED IMPORTS

### 2.1 Unused Type Imports from `@/types/index.ts`

Most types in `src/types/index.ts` are **NOT directly imported** in the codebase. These are legacy database-oriented types from the original Prisma-based architecture:

#### ⚠️ Potentially Unused Types in `types/index.ts`:
```typescript
// These interfaces are defined but not imported anywhere:
- User
- Product (the one in index.ts - superseded by types/product.ts)
- ProductImage (duplicate)
- ProductVariant
- Category
- Collection
- CartItem (duplicate - used from stores instead)
- Cart
- Order (duplicate - defined in orderStore.ts)
- OrderStatus (duplicate)
- OrderItem
- Address (duplicate - defined in addressStore.ts)
- Payment
- PaymentStatus
- Review
- WishlistItem
- ApiResponse<T>
- PaginatedResponse<T>
- ContactForm
- NewsletterSubscription
```

**Reason:** The application uses a simpler product model from `@/types/product.ts` instead of the complex database types in `index.ts`

**Action:** CONSIDER CLEANUP - These types were likely from the original PRD/specification but aren't used in the current file-based architecture

**Risk Level:** MEDIUM - Some might be intended for future database implementation

---

## 3. UNUSED FUNCTIONS

### 3.1 Internal-Only Functions in `lib/transforms.ts`

#### 🔶 `toDisplayProduct()`
- **Location:** `src/lib/transforms.ts:17`
- **Status:** INTERNAL USE ONLY
- **Used by:** Other transform functions within same file
- **Not exported to other modules:** Only used internally
- **Action:** KEEP - Internal utility function
- **Risk Level:** NONE

#### 🔶 `parseDiscount()`
- **Location:** `src/lib/transforms.ts:67`
- **Status:** INTERNAL USE ONLY
- **Used by:** `toDisplayProduct()` function
- **Action:** KEEP - Internal utility function
- **Risk Level:** NONE

#### 🔶 `getFirstImage()`
- **Location:** `src/lib/transforms.ts:85`
- **Status:** INTERNAL USE ONLY
- **Used by:** `toDisplayProduct()` function
- **Action:** KEEP - Internal utility function
- **Risk Level:** NONE

#### 🔶 `getProductSize()`
- **Location:** `src/lib/transforms.ts:96`
- **Status:** INTERNAL USE ONLY
- **Used by:** `toDisplayFurnitureProduct()` function
- **Action:** KEEP - Internal utility function
- **Risk Level:** NONE

### 3.2 Unused Library Functions

#### ⚠️ `src/lib/db.ts` - Entire file
- **Exports:** `prisma` (PrismaClient instance)
- **Usage:** NOT imported anywhere in src/ (only in markdown docs)
- **Reason:** Application currently uses file-based data, not database
- **Action:** KEEP FOR FUTURE - Likely needed when implementing database
- **Risk Level:** NONE - Prepared for future use

#### ⚠️ `src/lib/env.ts` - Environment validation
- **Usage:** Only imported by `lib/db.ts`
- **Reason:** Part of future database infrastructure
- **Action:** KEEP FOR FUTURE
- **Risk Level:** NONE

#### ⚠️ `src/lib/shopByStyleData.ts` - Shop by style data
- **Exports:** `functionTypes`, `roomTypes`, type definitions
- **Usage:** NOT imported anywhere in current codebase
- **Reason:** Data prepared but feature not implemented yet
- **Action:** KEEP OR IMPLEMENT - Data is ready for shop-by-style feature
- **Risk Level:** LOW - Prepared data for unimplemented feature

---

## 4. UNUSED COMPONENTS

### 4.1 Component Usage Summary

All major components are actively used:
- ✅ `UnifiedProductCard` - Used in ProductGrid
- ✅ `ProductCard` - Used in /products page
- ✅ `ProductGrid` - Used across multiple furniture pages
- ✅ `ProductToolbar` - Used across multiple furniture pages
- ✅ `ProductClient` - Used in product detail page
- ✅ `ProductDetail` - Used in ProductClient
- ✅ `CategoryCarousel` - Used in multiple furniture pages
- ✅ `SectionHeader` - Used in template (ready for use)
- ✅ `CartSidebar` - Used in Header
- ✅ `LoginModal` - Used in Header
- ✅ `AuthInitializer` - Used in layout
- ✅ All Client Components (*Client.tsx) - Each used in their respective pages

**No unused components found** - All components are actively imported and used.

---

## 5. UNUSED TYPES/INTERFACES

### 5.1 Display Types (All Used ✅)
```typescript
// src/types/display.ts - ALL ACTIVELY USED
✅ DisplayProduct
✅ DisplayProductWithEMI (used in ProductCard, multiple pages)
✅ DisplayFurnitureProduct (used in furniture pages)
✅ DisplayNewProduct (used in new-launch page)
✅ ProductTransformError
```

### 5.2 Product Types (All Used ✅)
```typescript
// src/types/product.ts - ALL ACTIVELY USED
✅ Product (imported in 15+ files)
✅ ProductImage
✅ ProductCustomization
✅ ProductDimension
✅ ProductSpecification
✅ SimilarProduct
```

### 5.3 Unused Types in `types/index.ts`

#### ⚠️ Database-Oriented Types (Not Currently Used)
```typescript
// These are defined but not imported anywhere:
❌ User
❌ Product (superseded by types/product.ts version)
❌ ProductImage (duplicate)
❌ ProductVariant
❌ Category
❌ Collection
❌ CartItem (defined in stores instead)
❌ Cart
❌ Order (defined in orderStore.ts)
❌ OrderStatus (duplicate)
❌ OrderItem
❌ Address (defined in addressStore.ts)
❌ Payment
❌ PaymentStatus
❌ Review
❌ WishlistItem
❌ ApiResponse<T>
❌ PaginatedResponse<T>
❌ ContactForm
❌ NewsletterSubscription
```

**Reason:** These were defined for the planned database architecture but the app currently uses:
- Simpler `Product` type from `types/product.ts`
- Store-defined types for Address, Order, CartItem
- File-based data instead of API responses

**Action:** KEEP FOR FUTURE DATABASE IMPLEMENTATION or REMOVE if staying with current architecture

**Risk Level:** LOW - Can be removed if database implementation is not planned

---

## 6. UNUSED UI COMPONENTS

### 6.1 UI Component Usage

#### ✅ `src/components/ui/button.tsx` - USED
- Imported in 11 files
- Status: Active

#### ⚠️ `src/components/ui/card.tsx` - PARTIALLY USED
- **Exports:** Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
- **Used:** Only `cn` utility function is imported (indirectly via className merging)
- **Direct Usage:** NOT imported as components anywhere
- **Reason:** Appears to be a shadcn/ui component that's not needed yet
- **Action:** KEEP (standard UI library component) or REMOVE if certain it won't be used
- **Risk Level:** LOW - Standard UI component, but not actively used

#### ✅ `src/components/ui/input.tsx` - USED
- Imported in Footer component
- Status: Active

#### ✅ `src/components/ui/empty-state.tsx` - USED
- Imported in ProductGrid
- Status: Active

#### ✅ `src/components/ui/skeleton.tsx` - USED
- Exports ProductCardSkeleton and ProductGridSkeleton
- Both actively used
- Status: Active

#### ✅ `src/components/ui/toaster.tsx` - USED
- Imported in layout (Toaster component)
- toast function used in UnifiedProductCard
- Status: Active

---

## 7. UNUSED ASSETS (PUBLIC FOLDER)

### 7.1 Timestamp-Based Image Directories

#### ⚠️ `public/images/images_2025-10-18_16-42-58/`
- **Type:** Timestamped backup/upload folder
- **Reason:** Likely from bulk image upload
- **Action:** REVIEW - Check if images are duplicated in other folders
- **Risk Level:** MEDIUM - May contain needed images

#### ⚠️ `public/images/images_2025-10-18_18-59-24/`
- **Type:** Timestamped backup/upload folder
- **Action:** REVIEW - Check for duplicates
- **Risk Level:** MEDIUM

#### ⚠️ `public/images/images_2025-10-18_19-11-05/`
- **Type:** Timestamped backup/upload folder
- **Action:** REVIEW - Check for duplicates
- **Risk Level:** MEDIUM

#### ⚠️ `public/images/images_2025-10-19_16-20-07/`
- **Type:** Timestamped backup/upload folder
- **Action:** REVIEW - Check for duplicates
- **Risk Level:** MEDIUM

**Recommendation:** Compare images in timestamp folders with main category folders (bedroom/, dining/, living/, etc.) and remove duplicates.

### 7.2 Unused Individual Assets

#### ⚠️ Standalone Images in `public/images/`
These standalone images should be reviewed to see if they're referenced:
```
- Accents.webp
- Armoires_Wardrobes.webp
- avatar.png
- Beds.webp
- Bed_Room.webp
- categorymanhattan-collections.webp
- Coffee_Tables.webp
- design-talks.webp
- Dining_Chairs.webp
- Dining_Room.webp
- Dining_Tables.webp
- dtale-stores.webp
- Dtale_Bengaluru.webp
- DTALE_Kochi.webp
- DTALE_Modern_-_Luxury_Furniture_Store_Online_in_In.svg
- Dtale_Thrissur.webp
- French_Country_Collection.webp
- Home_and_Cottage.webp
- image_850x414_47.webp
- Incurve_Episodes.webp
- Jacob_Amtorp.webp
- Lightings.webp
- Living_Room.webp
- media-awards (1).jpg through media-awards.jpg
- Monocraft_Collection.webp
- Morten_Georgsen.webp
- New_Arrivals.webp
- Outdoor_Indoor_Living.webp
- pagestorage-modular-furniture.webp
- Ready_to_Ship.webp
- saaro-logo.svg
- Sanne_Protin.webp
- Says_Who.webp
- Sofas.webp
- Trending_Now.webp
- vesta.webp through vesta (9).webp
```

**Action Required:** Run image usage analysis:
```bash
# Search for each image reference in the codebase
grep -r "image-name.webp" src/
```

---

## 8. SUMMARY OF RECOMMENDATIONS

### ✅ SAFE TO DELETE (Low Risk)

1. **`src/app/furniture/dining/page-old-backup.tsx`**
   - Backup file, no longer needed
   - Size: 1193 lines

2. **`src/hooks/useCart.ts`**
   - Not imported anywhere
   - Functionality available through useCartStore

3. **`src/store/cart.ts`**
   - Duplicate of cartStore.ts
   - Only used by unused useCart hook

4. **`src/components/forms/` (empty directory)**
   - Contains no files

### ⚠️ REVIEW NEEDED (Medium Risk)

1. **`public/forms.html`**
   - Not referenced in codebase
   - Verify it's not accessed directly via URL

2. **`src/types/index.ts` - Database types**
   - Many unused types
   - Keep if planning database implementation
   - Remove if staying file-based

3. **`src/lib/shopByStyleData.ts`**
   - Data ready but feature not implemented
   - Consider implementing or removing

4. **`public/images/images_2025-*` directories**
   - Timestamped folders may contain duplicates
   - Audit against main image folders

5. **Individual image files in `public/images/`**
   - Need usage audit
   - May include unused category images

6. **`src/components/ui/card.tsx`**
   - Not actively imported as components
   - Standard UI library component - keep or remove based on plans

### 🔶 KEEP (Infrastructure/Future Use)

1. **`src/lib/db.ts`** - Database client for future use
2. **`src/lib/env.ts`** - Environment validation for database
3. **All transform functions** - Used internally or actively used
4. **All store files** (except cart.ts) - Actively used
5. **All components** - All actively used
6. **Display types** - All actively used
7. **Product types** - All actively used

---

## 9. CLEANUP SCRIPT SUGGESTIONS

### Script 1: Remove Confirmed Unused Files
```bash
# Remove backup and unused files
rm "src/app/furniture/dining/page-old-backup.tsx"
rm "src/hooks/useCart.ts"
rm "src/store/cart.ts"
rmdir "src/components/forms"
```

### Script 2: Audit Image Usage
```powershell
# PowerShell script to find unused images
$images = Get-ChildItem -Path "public/images" -File -Recurse
foreach ($img in $images) {
    $references = Select-String -Path "src/**/*.tsx","src/**/*.ts" -Pattern $img.Name
    if ($references.Count -eq 0) {
        Write-Host "Unused: $($img.FullName)"
    }
}
```

### Script 3: Check Types Usage
```bash
# Find unused type definitions
grep -r "User" src/ --include="*.tsx" --include="*.ts" | grep "import.*User"
grep -r "Category" src/ --include="*.tsx" --include="*.ts" | grep "import.*Category"
# ... repeat for each type
```

---

## 10. POTENTIAL SAVINGS

### Code Size Reduction
- **Backup file:** ~1,193 lines
- **Unused hook:** ~60 lines
- **Unused store:** ~55 lines
- **Total code:** ~1,308 lines

### Type Definitions
- **Unused types in index.ts:** ~150 lines (if removed)

### Assets
- **Timestamped folders:** Size TBD (need audit)
- **Unused images:** Size TBD (need audit)

---

## 11. NOTES

1. **All active components are being used** - No component cleanup needed
2. **Store architecture is solid** - Only one duplicate store (cart.ts)
3. **Type system is split** - Consider consolidating or documenting the split between types/index.ts (database) and types/product.ts (file-based)
4. **Image audit recommended** - Many standalone images need verification
5. **Future-ready infrastructure** - db.ts and env.ts are ready for database migration

---

## 12. RISK ASSESSMENT

| Item | Risk Level | Impact if Removed |
|------|-----------|-------------------|
| page-old-backup.tsx | 🟢 LOW | None - it's a backup |
| useCart.ts | 🟢 LOW | None - not referenced |
| cart.ts | 🟢 LOW | None - duplicate functionality |
| forms/ directory | 🟢 LOW | None - empty |
| forms.html | 🟢 LOW | None - not referenced |
| types/index.ts types | 🟡 MEDIUM | May need for future DB |
| shopByStyleData.ts | 🟡 MEDIUM | Lose prepared data |
| card.tsx | 🟡 MEDIUM | May need for future UI |
| Image folders | 🟡 MEDIUM | Need audit first |
| db.ts | 🟢 LOW | Keep for future |
| env.ts | 🟢 LOW | Keep for future |

---

## END OF REPORT

**Total Items Identified:**
- ✅ Safe to delete: 4 files/folders
- ⚠️ Review needed: 6 items
- 🔶 Keep for future: 3 items

**Next Steps:**
1. Review and approve deletions
2. Run image audit script
3. Decide on database types (keep or remove)
4. Execute cleanup script
5. Commit changes with detailed commit message
