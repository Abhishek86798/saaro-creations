const fs = require('fs');
const path = require('path');

const nameToSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const filePath = path.join(__dirname, '..', 'src', 'app', 'furniture', 'in-stock', 'page.tsx');
let content = fs.readFileSync(filePath, 'utf8');
const originalContent = content;

// Match pattern: { id: 'instock-1', name: 'Product Name',
const productRegex = /\{\s*id:\s*'instock-\d+',\s*name:\s*'([^']+)',/g;
let match;
const replacements = [];

while ((match = productRegex.exec(originalContent)) !== null) {
  const productName = match[1];
  const slug = nameToSlug(productName);
  replacements.push({ productName, slug, fullMatch: match[0] });
}

console.log(`\n📁 IN-STOCK: Found ${replacements.length} products`);

// Apply replacements
replacements.forEach(({ productName, slug, fullMatch }) => {
  const newMatch = fullMatch.replace(/instock-\d+/, slug);
  content = content.replace(fullMatch, newMatch);
  console.log(`   ✓ ${productName.substring(0, 50)}... -> ${slug}`);
});

if (content !== originalContent) {
  fs.writeFileSync(filePath, content);
  console.log(`   ✅ Updated ${replacements.length} products in in-stock/page.tsx`);
} else {
  console.log(`   ⏭️  No changes needed`);
}

console.log('\n🎉 In-stock page updated!');
