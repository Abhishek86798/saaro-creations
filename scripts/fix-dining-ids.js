const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'app', 'furniture', 'dining', 'page.tsx');
const content = fs.readFileSync(filePath, 'utf8');

// Replace interface Product with DiningProduct
let updated = content.replace('interface Product {', 'interface DiningProduct {');

// Replace const products: Product[] with const products: DiningProduct[]
updated = updated.replace('const products: Product[] = [', 'const products: DiningProduct[] = [');

// Replace all numeric IDs with string IDs
updated = updated.replace(/\{\s*id: (\d+),/g, '{ id: \'dining-$1\',');

// Fix the isInWishlist function parameter
updated = updated.replace(/isInWishlist = \(productId: number\)/, 'isInWishlist = (productId: string)');

// Fix the wishlistItems.some comparison
updated = updated.replace(/wishlistItems\.some\(item => item\.id === productId\.toString\(\)\)/, 'wishlistItems.some(item => item.id === productId)');

// Fix toggleWishlist parameter
updated = updated.replace(/toggleWishlist = \(product: Product\)/, 'toggleWishlist = (product: DiningProduct)');

// Fix the addToWishlist id parameter
updated = updated.replace(/id: product\.id\.toString\(\),/, 'id: product.id,');

fs.writeFileSync(filePath, updated);
console.log('✅ Fixed all type inconsistencies and IDs in dining/page.tsx');
