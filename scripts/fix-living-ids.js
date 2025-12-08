const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'app', 'furniture', 'living', 'page.tsx');
const content = fs.readFileSync(filePath, 'utf8');

// Replace interface Product with LivingProduct
let updated = content.replace('interface Product {', 'interface LivingProduct {');

// Replace const products: Product[] with const products: LivingProduct[]
updated = updated.replace('const products: Product[] = [', 'const products: LivingProduct[] = [');

// Replace all numeric IDs with string IDs
updated = updated.replace(/\{\s*id: (\d+),/g, '{ id: \'living-$1\',');

// Fix the isInWishlist function parameter
updated = updated.replace(/isInWishlist = \(productId: number\)/, 'isInWishlist = (productId: string)');

// Fix the wishlistItems.some comparison
updated = updated.replace(/wishlistItems\.some\(item => item\.id === productId\.toString\(\)\)/, 'wishlistItems.some(item => item.id === productId)');

// Fix toggleWishlist parameter
updated = updated.replace(/toggleWishlist = \(product: Product\)/, 'toggleWishlist = (product: LivingProduct)');

// Fix the addToWishlist id parameter
updated = updated.replace(/id: product\.id\.toString\(\),/, 'id: product.id,');

// Fix id type in interface
updated = updated.replace(/interface LivingProduct \{\s*id: number;/, 'interface LivingProduct {\n  id: string;');

fs.writeFileSync(filePath, updated);
console.log('✅ Fixed all type inconsistencies and IDs in living/page.tsx');
