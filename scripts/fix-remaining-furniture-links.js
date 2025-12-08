const fs = require('fs');
const path = require('path');

const pages = ['entryway', 'office', 'storage', 'in-stock'];

pages.forEach((page) => {
  const filePath = path.join(__dirname, '..', 'src', 'app', 'furniture', page, 'page.tsx');
  
  if (!fs.existsSync(filePath)) {
    console.log(`⏭️  Skipping ${page} - file not found`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;

  // Fix 1: Replace div with Link for product card wrapper
  content = content.replace(
    /(\{sortedProducts\.map\(\(product\) => \(\s*)<div key=\{product\.id\} className="group relative">/g,
    '$1<Link key={product.id} href={`/product/${product.id}`} className="group relative block">'
  );

  // Fix 2: Fix wishlist button to prevent navigation
  content = content.replace(
    /onClick=\{\(\) => toggleWishlist\(product\)\}/g,
    'onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}'
  );

  // Fix 3: Remove the nested Link around image if it exists
  content = content.replace(
    /<Link href=\{`\/product\/\$\{product\.id\}`\}>\s*<div className="relative aspect/g,
    '<div className="relative aspect'
  );

  // Fix 4: Remove closing Link tag after image div if it exists
  content = content.replace(
    /<\/div>\s*<\/Link>\s*{\/\* Product Info \*\/}/g,
    '</div>\n\n                  {/* Product Info */'
  );

  // Fix 5: Remove nested Link around product name
  content = content.replace(
    /<Link href=\{`\/product\/\$\{product\.id\}`\}>\s*<h3/g,
    '<h3'
  );
  content = content.replace(
    /<\/h3>\s*<\/Link>/g,
    '</h3>'
  );

  // Fix 6: Find and replace the closing </div> for product card with </Link>
  // This is at the end of the product map, just before ))}
  content = content.replace(
    /(\s*<\/div>\s*)<\/div>\s*\)\)\}/g,
    '$1</Link>\n              ))}'
  );

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Added product links to ${page}/page.tsx`);
  } else {
    console.log(`⏭️  No changes needed for ${page}/page.tsx`);
  }
});

console.log('\n🎉 All remaining furniture pages updated!');
