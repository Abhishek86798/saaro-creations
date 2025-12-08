const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'app', 'furniture', 'bedroom', 'page.tsx');
const content = fs.readFileSync(filePath, 'utf8');

// Replace all numeric IDs with string IDs
const updated = content.replace(/\{ id: (\d+),/g, '{ id: \'bedroom-$1\',');

fs.writeFileSync(filePath, updated);
console.log('✅ Fixed all numeric IDs to string IDs in bedroom/page.tsx');
