const fs = require('fs');
const path = require('path');

const pages = ['dining', 'living', 'entryway', 'office', 'storage', 'in-stock'];

pages.forEach((page) => {
  const filePath = path.join(__dirname, '..', 'src', 'app', 'furniture', page, 'page.tsx');
  
  if (!fs.existsSync(filePath)) {
    console.log(`⏭️  Skipping ${page} - file not found`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Replace the product card div with Link wrapper
  // Pattern 1: Simple div with key
  content = content.replace(
    /<div key=\{product\.id\} className="group relative">/g,
    '<Link key={product.id} href={`/product/${product.id}`} className="group relative block">'
  );

  // Replace closing div with closing Link (for the product card container)
  // This is a bit tricky, we need to find the right closing div
  // Let's use a more specific pattern - find the div after the products map
  content = content.replace(
    /(\{sortedProducts\.map\(\(product\) => \(\s*)<div key=\{product\.id\} className="group relative">/g,
    '$1<Link key={product.id} href={`/product/${product.id}`} className="group relative block">'
  );

  // Fix the wishlist button to prevent navigation
  content = content.replace(
    /onClick=\{\(\) => toggleWishlist\(product\)\}/g,
    'onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}'
  );

  // Replace the closing </div> that corresponds to the product card with </Link>
  // This needs to be done carefully - we need to find the div that closes the entire card
  // We'll do this by finding the pattern where the div closes after the product details
  const lines = content.split('\n');
  let inProductMap = false;
  let braceCount = 0;
  let productCardDepth = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Detect if we're in the products map
    if (line.includes('sortedProducts.map((product)')) {
      inProductMap = true;
    }
    
    if (inProductMap) {
      // Count opening and closing braces/tags
      if (line.includes('<Link') && line.includes('product.id')) {
        productCardDepth = 0;
      }
      
      // Count divs
      const openDivs = (line.match(/<div/g) || []).length;
      const closeDivs = (line.match(/<\/div>/g) || []).length;
      productCardDepth += openDivs - closeDivs;
      
      // When we get back to depth 0 after being inside, we found the closing div
      if (productCardDepth === 0 && line.trim() === '</div>' && 
          i > 0 && !lines[i-1].includes('sortedProducts.map')) {
        lines[i] = line.replace('</div>', '</Link>');
        inProductMap = false;
      }
    }
  }
  
  content = lines.join('\n');

  fs.writeFileSync(filePath, content);
  console.log(`✅ Added product links to ${page}/page.tsx`);
});

console.log('\n🎉 All furniture pages now link to product detail pages!');
