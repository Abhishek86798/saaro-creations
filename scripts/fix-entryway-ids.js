const fs = require('fs');
const path = require('path');

const nameToSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const filePath = path.join(__dirname, '..', 'src', 'app', 'furniture', 'entryway', 'page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Find all product entries and replace their IDs
const productRegex = /\{\s*id:\s*'entryway-\d+',\s*name:\s*'([^']+)',/g;
let match;
const replacements = [];

while ((match = productRegex.exec(content)) !== null) {
  const oldId = match[0];
  const productName = match[1];
  const slug = nameToSlug(productName);
  const newId = oldId.replace(/entryway-\d+/, slug);
  replacements.push({ oldId, newId, productName, slug });
}

console.log(`Found ${replacements.length} products to update`);

// Apply replacements
replacements.forEach(({ oldId, newId, productName, slug }) => {
  content = content.replace(oldId, newId);
  console.log(`✓ ${productName} -> ${slug}`);
});

fs.writeFileSync(filePath, content);
console.log('\n✅ Successfully updated all entryway product IDs!');
