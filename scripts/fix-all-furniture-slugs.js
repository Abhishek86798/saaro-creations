const fs = require('fs');
const path = require('path');

const nameToSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const pages = ['dining', 'living', 'bedroom', 'office', 'storage', 'in-stock'];

pages.forEach((page) => {
  const filePath = path.join(__dirname, '..', 'src', 'app', 'furniture', page, 'page.tsx');
  
  if (!fs.existsSync(filePath)) {
    console.log(`⏭️  Skipping ${page} - file not found`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;

  // Match patterns like: { id: 'dining-1', name: 'Product Name',
  // or: { id: "bedroom-1", name: "Product Name",
  const productRegex = new RegExp(`\\{\\s*id:\\s*['"]${page}-\\d+['"],\\s*name:\\s*['"]([^'"]+)['"],`, 'g');
  let match;
  const replacements = [];

  while ((match = productRegex.exec(originalContent)) !== null) {
    const productName = match[1];
    const slug = nameToSlug(productName);
    replacements.push({ productName, slug, fullMatch: match[0] });
  }

  console.log(`\n📁 ${page.toUpperCase()}: Found ${replacements.length} products`);

  if (replacements.length === 0) {
    console.log(`   ⏭️  No products with '${page}-#' pattern found`);
    return;
  }

  // Apply replacements
  replacements.forEach(({ productName, slug, fullMatch }) => {
    // Replace the pattern with slug
    const newMatch = fullMatch.replace(new RegExp(`${page}-\\d+`), slug);
    content = content.replace(fullMatch, newMatch);
    console.log(`   ✓ ${productName.substring(0, 40)}... -> ${slug}`);
  });

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    console.log(`   ✅ Updated ${replacements.length} products in ${page}/page.tsx`);
  }
});

console.log('\n🎉 All furniture pages updated with slug-based IDs!');
