const fs = require('fs');
const path = require('path');

const pages = [
  { file: 'entryway', prefix: 'entryway', type: 'EntrywayProduct' },
  { file: 'office', prefix: 'office', type: 'OfficeProduct' },
  { file: 'storage', prefix: 'storage', type: 'StorageProduct' },
  { file: 'in-stock', prefix: 'instock', type: 'InStockProduct' }
];

pages.forEach(({ file, prefix, type }) => {
  const filePath = path.join(__dirname, '..', 'src', 'app', 'furniture', file, 'page.tsx');
  
  if (!fs.existsSync(filePath)) {
    console.log(`⏭️  Skipping ${file} - file not found`);
    return;
  }

  const content = fs.readFileSync(filePath, 'utf8');

  // Replace interface Product with custom type
  let updated = content.replace('interface Product {', `interface ${type} {`);

  // Replace const products: Product[] with custom type
  updated = updated.replace('const products: Product[] = [', `const products: ${type}[] = [`);

  // Replace all numeric IDs with string IDs
  updated = updated.replace(/\{\s*id: (\d+),/g, `{ id: '${prefix}-$1',`);

  // Fix the isInWishlist function parameter
  updated = updated.replace(/isInWishlist = \(productId: number\)/, 'isInWishlist = (productId: string)');

  // Fix the wishlistItems.some comparison
  updated = updated.replace(/wishlistItems\.some\(item => item\.id === productId\.toString\(\)\)/, 'wishlistItems.some(item => item.id === productId)');

  // Fix toggleWishlist parameter
  updated = updated.replace(/toggleWishlist = \(product: Product\)/, `toggleWishlist = (product: ${type})`);

  // Fix the addToWishlist id parameter
  updated = updated.replace(/id: product\.id\.toString\(\),/, 'id: product.id,');

  // Fix id type in interface
  updated = updated.replace(new RegExp(`interface ${type} \\{\\s*id: number;`), `interface ${type} {\n  id: string;`);

  fs.writeFileSync(filePath, updated);
  console.log(`✅ Fixed ${file}/page.tsx`);
});

console.log('\n🎉 All furniture pages fixed!');
