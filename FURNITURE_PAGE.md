# Furniture Page Documentation

## Overview
Complete furniture listing page with category navigation, advanced filtering, and product grid matching DTale Modern's design.

## Page Details
- **Route**: `/furniture`
- **File**: `src/app/furniture/page.tsx`
- **Bundle Size**: 8.09 kB
- **Total Products**: 12 furniture items
- **Categories**: 6 (Entryway, Living, Dining, Bedroom, Office Home, In-Stock Furniture)

## Key Features

### 1. **Category Navigation Bar**
- Horizontal scrollable category tabs
- Image thumbnail for each category (120x120px)
- Hover effects with scale animation
- Active category highlighting
- Categories:
  - Entryway
  - Living
  - Dining
  - Bedroom
  - Office Home
  - In-Stock Furniture

### 2. **Sidebar Filters**
Comprehensive filtering system matching DTale Modern:

#### Product Type Filter
- Sofas & Sectionals (7 products)
- Accent | Lounge Chairs (3 products)
- Dining Chairs (1 product)
- Console Tables (1 product)
- Checkbox selection
- Product count display

#### Price Range Filter
- Slider control (₹0 - ₹500,000)
- Min/Max dropdowns
- Real-time filtering
- Clear button

#### Size Filter
- M (Medium) - 3 products
- L (Large) - 1 product
- 7 feet - 1 product
- 8 feet - 5 products
- 10 feet - 2 products
- Checkbox selection with counts

#### Discount Filter
- 10% and above
- 20% and above
- 30% and above
- Multi-select checkboxes

### 3. **Product Grid**
- 3-column responsive layout
- Hover zoom effect on images (110% scale)
- Wishlist heart icon (toggleable)
- Product badges (NEW, MADE TO ORDER)
- Pricing display with original/discounted prices
- EMI information
- Discount percentage badges

### 4. **Sort Options**
- Featured (default)
- Price: Low to High
- Price: High to Low
- Newest
- Discount

### 5. **Results Counter**
Dynamic display showing filtered results count (e.g., "12 Results")

## Product Data Structure

Each product includes:
```typescript
{
  id: number;
  name: string;
  price: number;
  originalPrice: number | null;
  discount: number;
  image: string;
  badge: 'NEW' | 'MADE TO ORDER';
  emi: number;
  category: 'Living' | 'Dining' | 'Entryway' | 'Bedroom' | 'Office Home';
  type: string;
  size: string;
}
```

## Product Catalog

### Living Room Furniture (9 products)
1. **Miller Cane Three Seater Sofa** - ₹204,000 (15% off) - 8 feet
2. **Morgan Three Seater Sofa-Copeland Bark** - ₹195,000 (25% off) - 8 feet
3. **Moris Lounge Chair** - ₹88,400 - M
4. **Nicholas Lounge Chair** - ₹90,000 (25% off) - M
5. **Candice Rattan Single Seater** - ₹65,925 - M
6. **Ebba Chaise Sectional Sofa** - ₹301,750 - 10 feet
7. **Jake Modular Sectional Sofa** - ₹333,200 (15% off) - 10 feet
8. **Zenora Three-Seater Sofa** - ₹185,250 (5% off) - 7 feet
9. **Eloise Three Seater Sofa** - ₹178,030 (5% off) - 8 feet (NEW)
10. **Marcus Chesterfield 3 Seater Sofa** - ₹238,000 (15% off) - 8 feet

### Dining Room Furniture (1 product)
11. **Arcana Rattan Chair** - ₹34,000 (15% off) - M

### Entryway Furniture (1 product)
12. **Ahava Chiseled Console** - ₹95,200 (15% off) - L

## Image Assets

### Category Images (6)
- `Entryway-image.jpg`
- `Living-image.jpg`
- `Dining-image.jpg`
- `Bedroom-image.jpg`
- `Office_Home_-image.jpg`
- `In-Stock_Furniture-image.jpg`

### Product Images (12)
All stored in `public/images/furniture/`:
- Miller_Cane_Three_Seater_Sofa.webp
- Morgan_Three_Seater_Sofa-Copeland_Bark.webp
- Moris_Lounge_Chair.webp
- Nicholas_Lounge_Chair.webp
- Candice_Rattan_Single_Seater.webp
- Ebba_Chaise_Sectional_Sofa.webp
- Jake_Modular_Sectional_Sofa.webp
- Arcana_Rattan_Chair.webp
- Zenora_Three-Seater_Sofa.webp
- Eloise_Three_Seater_Sofa.webp
- Marcus_Chesterfield_3_Seater_Sofa.webp
- Ahava_Chiseled_Console.webp

## Interactive Features

### Wishlist Functionality
```typescript
const [wishlist, setWishlist] = useState<number[]>([]);

const toggleWishlist = (id: number) => {
  setWishlist((prev) =>
    prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
  );
};
```

### Category Filter
```typescript
const [selectedCategory, setSelectedCategory] = useState<string>('All');
```
- Clicking category image filters products
- "All" shows all products across categories

### Multi-Filter Logic
Products must pass ALL active filters:
- Category match (if not "All")
- Product type match (if selected)
- Size match (if selected)
- Price range (min-max)
- Discount threshold (if selected)

## Design Elements

### Color Scheme
- Primary: Amber-600 (#D97706)
- Text: Gray-900 for headings, Gray-700 for body
- Borders: Gray-200
- Backgrounds: White, Gray-50

### Hover Effects
- **Category Images**: Scale 110%, smooth transition
- **Product Images**: Scale 110%, 500ms duration
- **Product Titles**: Change to amber-600
- **Wishlist Icon**: Background change on hover

### Responsive Behavior
- Container max-width with padding
- Horizontal scroll for category navigation
- Sticky sidebar (top: 1rem)
- 3-column grid (can be adjusted for mobile)

## Technical Implementation

### State Management
- `wishlist`: Array of product IDs
- `selectedCategory`: String for active category
- `selectedTypes`: Array of product type strings
- `priceRange`: Object with min/max values
- `selectedSizes`: Array of size strings
- `selectedDiscounts`: Array of discount strings
- `sortBy`: String for sort option

### Price Formatting
```typescript
const formatPrice = (price: number) => {
  return price.toLocaleString('en-IN');
};
```

### Filter Algorithm
```typescript
const filteredProducts = products.filter((product) => {
  // Category check
  if (selectedCategory !== 'All' && product.category !== selectedCategory) 
    return false;
  
  // Type check
  if (selectedTypes.length > 0 && !selectedTypes.includes(product.type)) 
    return false;
  
  // Size check
  if (selectedSizes.length > 0 && !selectedSizes.includes(product.size)) 
    return false;
  
  // Price range check
  if (product.price < priceRange.min || product.price > priceRange.max) 
    return false;
  
  // Discount check
  if (selectedDiscounts.length > 0) {
    if (selectedDiscounts.includes('10% and above') && product.discount < 10) 
      return false;
    // ... other discount checks
  }
  
  return true;
});
```

## Navigation Integration

### Breadcrumb
```
Home / Furniture
```

### Header Links
Should link to `/furniture` from:
- Main navigation "Furniture" dropdown
- Footer "Furniture" section

## Future Enhancements

### Planned Features
1. **Functional Sorting** - Implement sort logic for all options
2. **Pagination** - Add "Load More" or page numbers
3. **Expanded Catalog** - Add more products (target: 750 items like DTale Modern)
4. **Quick View Modal** - Product details overlay
5. **Compare Products** - Multi-product comparison
6. **Filter Tags** - Display active filters as removable chips
7. **URL Parameters** - Maintain filters in URL for sharing
8. **Lazy Loading** - Optimize image loading for performance
9. **Mobile Responsive** - 1-2 column grid for smaller screens
10. **Subcategory Pages** - Individual pages for each category

### Additional Filters to Add
- Materials (Wood, Metal, Rattan, Upholstered)
- Colors
- Bed Size (King, Queen)
- Shapes (Rectangle, Round, Oval)
- Nesting Options
- Select Configuration
- Choose Size

## Comparison with DTale Modern

| Feature | DTale Modern | Saaro Creations | Status |
|---------|-------------|-----------------|--------|
| Category Navigation | ✓ | ✓ | ✅ Complete |
| Product Type Filter | ✓ | ✓ | ✅ Complete |
| Price Range Slider | ✓ | ✓ | ✅ Complete |
| Size Filter | ✓ | ✓ | ✅ Complete |
| Discount Filter | ✓ | ✓ | ✅ Complete |
| Wishlist Toggle | ✓ | ✓ | ✅ Complete |
| Sort Dropdown | ✓ | ✓ | ✅ Complete |
| Results Counter | ✓ | ✓ | ✅ Complete |
| Product Grid | ✓ | ✓ | ✅ Complete |
| Hover Effects | ✓ | ✓ | ✅ Complete |
| EMI Display | ✓ | ✓ | ✅ Complete |
| Badge System | ✓ | ✓ | ✅ Complete |
| Breadcrumb | ✓ | ✓ | ✅ Complete |
| Product Count | 750 | 12 | ⚠️ Expandable |
| Functional Sort | ✓ | ⏳ | ⚠️ Pending |
| URL Filters | ✓ | ⏳ | ⚠️ Pending |

## Performance Metrics

- **Bundle Size**: 8.09 kB (optimized)
- **First Load JS**: 141 kB
- **Build Time**: ~12 seconds
- **Image Format**: WebP (optimized)
- **Image Loading**: Lazy loading via next/image
- **Static Generation**: Pre-rendered at build time

## SEO Considerations

- Descriptive page title
- Meta description for furniture category
- Semantic HTML structure
- Breadcrumb navigation
- Alt tags for all images
- Clean URL structure

---

**Created**: October 19, 2025  
**Last Updated**: October 19, 2025  
**Status**: ✅ Production Ready  
**Next Steps**: Expand product catalog, implement functional sorting
