/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const productsPath = path.join(process.cwd(), 'src', 'lib', 'products.ts');
const imagesDir = path.join(process.cwd(), 'public', 'images', 'furniture');

if (!fs.existsSync(productsPath)) {
  console.error('products.ts not found:', productsPath);
  process.exit(1);
}
if (!fs.existsSync(imagesDir)) {
  console.error('images dir not found:', imagesDir);
  process.exit(1);
}

const files = fs.readdirSync(imagesDir);
const normalize = (s) => s.replace(/[^a-z0-9]/gi, '').toLowerCase();
const fileMap = {};
for (const f of files) {
  const nameNoExt = f.replace(/\.[^.]+$/, '');
  fileMap[normalize(nameNoExt)] = f;
}

let text = fs.readFileSync(productsPath, 'utf8');
let replaced = 0;
text = text.replace(/\/images\/furniture\/([^'\"]+)\.webp/gi, (match, p1) => {
  const base = p1.replace(/\.[^.]+$/, '');
  const key = normalize(base);
  if (fileMap[key]) {
    replaced++;
    return `/images/furniture/${fileMap[key]}`;
  }
  return match; // leave as-is
});

fs.writeFileSync(productsPath, text, 'utf8');
console.log('Done. Replaced paths:', replaced);
process.exit(0);
