'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/features/ProductCard';
import { CategoryCarousel } from '@/components/features/CategoryCarousel';
import { ProductToolbar } from '@/components/features/ProductToolbar';
import { getAllProducts } from '@/lib/products';
import { DisplayFurnitureProduct } from '@/types/display';
import { toDisplayFurnitureProduct } from '@/lib/transforms';
import { useSearchParams } from 'next/navigation';

const categories = [
  { id: 1, name: 'Entryway', image: '/images/furnituretype/Entryway-image.jpg', href: '/furniture/entryway' },
  { id: 2, name: 'Living', image: '/images/furnituretype/Living-image.jpg', href: '/furniture/living' },
  { id: 3, name: 'Dining', image: '/images/furnituretype/Dining-image.jpg', href: '/furniture/dining' },
  { id: 4, name: 'Bedroom', image: '/images/furnituretype/Bedroom-image.jpg', href: '/furniture/bedroom' },
  { id: 5, name: 'Office Home', image: '/images/furniture/Office_Home_-image.jpg', href: '/furniture/office' },
  { id: 6, name: 'In-Stock Furniture', image: '/images/furniture/In-Stock_Furniture-image.jpg', href: '/furniture/in-stock' },
  { id: 7, name: 'Storage Furniture', image: '/images/furniture/Storage-image.jpg', href: '/furniture/storage' },
  { id: 8, name: 'Quick Ship Furniture', image: '/images/furniture/Quick-Ship-image.jpg', href: '/furniture/quick-ship' },
  { id: 9, name: 'Seating', image: '/images/furniture/Seating-image.jpg', href: '/furniture/seating' },
  { id: 10, name: 'Tables', image: '/images/furniture/Tables-image.jpg', href: '/furniture/tables' },
];

function FurniturePageContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<DisplayFurnitureProduct[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 500000 });
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedDiscounts, setSelectedDiscounts] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('featured');

  // Load products from central data source
  useEffect(() => {
    const loadProducts = async () => {
      const allProducts = await getAllProducts();
      const displayProducts = allProducts.map(toDisplayFurnitureProduct);
      setProducts(displayProducts);
    };
    loadProducts();
  }, []);

  // Apply URL filters on page load
  useEffect(() => {
    const typeParam = searchParams.get('type');
    if (typeParam) {
      setSelectedTypes([typeParam]);
    }
  }, [searchParams]);

  // Get unique product types (filter out undefined)
  const productTypes = Array.from(
    new Set(products.map((p) => p.type).filter((t): t is string => !!t))
  );
  const sizes = Array.from(new Set(products.map((p) => p.size)));

  // Filter products
  const filteredProducts = products.filter((product) => {
    if (selectedTypes.length > 0 && product.type && !selectedTypes.includes(product.type)) return false;
    if (selectedSizes.length > 0 && !selectedSizes.includes(product.size)) return false;
    if (product.price < priceRange.min || product.price > priceRange.max) return false;
    if (selectedDiscounts.length > 0) {
      if (selectedDiscounts.includes('10% and above') && product.discount < 10) return false;
      if (selectedDiscounts.includes('20% and above') && product.discount < 20) return false;
      if (selectedDiscounts.includes('30% and above') && product.discount < 30) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900">Home</Link>
            <span>&gt;</span>
            <span className="text-gray-900">Furniture</span>
          </div>
        </div>
      </div>

      {/* Category Navigation Carousel */}
      <CategoryCarousel
        categories={categories}
        isClickable={true}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8 overflow-hidden">
          {/* Sidebar Filters */}
          <aside className="w-64 flex-shrink-0 h-[calc(100vh-8rem)] overflow-y-auto sticky top-32">
            <div>
              <h3 className="text-lg font-bold mb-6">Browse by</h3>

              {/* Product Type Filter */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">Product Type</h4>
                  <button className="text-gray-400 hover:text-gray-600">−</button>
                </div>
                <div className="space-y-2">
                  {productTypes.map((type) => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(type)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedTypes([...selectedTypes, type]);
                          } else {
                            setSelectedTypes(selectedTypes.filter((t) => t !== type));
                          }
                        }}
                        className="w-4 h-4 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">{type}</span>
                      <span className="text-xs text-gray-400 ml-auto">
                        ({products.filter((p) => p.type === type).length})
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">Price</h4>
                  <button className="text-gray-400 hover:text-gray-600">Clear</button>
                </div>
                <div className="relative mb-4">
                  <input
                    type="range"
                    min="0"
                    max="500000"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                    className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    aria-label="Maximum price range"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <select className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm" aria-label="Minimum price">
                    <option>Min</option>
                  </select>
                  <span className="text-gray-400">to</span>
                  <select className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm" aria-label="Maximum price">
                    <option>₹ {priceRange.max.toLocaleString('en-IN')}</option>
                  </select>
                </div>
              </div>

              {/* Size Filter */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">Size</h4>
                  <button className="text-gray-400 hover:text-gray-600">−</button>
                </div>
                <div className="space-y-2">
                  {sizes.map((size) => (
                    <label key={size} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedSizes.includes(size)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedSizes([...selectedSizes, size]);
                          } else {
                            setSelectedSizes(selectedSizes.filter((s) => s !== size));
                          }
                        }}
                        className="w-4 h-4 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">{size}</span>
                      <span className="text-xs text-gray-400 ml-auto">
                        ({products.filter((p) => p.size === size).length})
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Discount Filter */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Discount</h4>
                <div className="space-y-2">
                  {['10% and above', '20% and above', '30% and above'].map((discount) => (
                    <label key={discount} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedDiscounts.includes(discount)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedDiscounts([...selectedDiscounts, discount]);
                          } else {
                            setSelectedDiscounts(selectedDiscounts.filter((d) => d !== discount));
                          }
                        }}
                        className="w-4 h-4 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">{discount}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1 h-[calc(100vh-8rem)] overflow-y-auto">
            <main className="pb-8">
              {/* Toolbar with Results & Sort */}
              <ProductToolbar
                resultCount={filteredProducts.length}
                sortValue={sortBy}
                onSortChange={setSortBy}
              />

              {/* Products Grid */}
              <div className="grid grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  discount={product.discount}
                  image={product.image}
                  badge={product.badge}
                  emi={product.emi}
                />
              ))}
            </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FurniturePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>}>
      <FurniturePageContent />
    </Suspense>
  );
}
