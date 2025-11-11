'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '@/components/features/ProductCard';
import { getAllProducts } from '@/lib/products';
import { DisplayFurnitureProduct } from '@/types/display';
import { toDisplayFurnitureProduct } from '@/lib/transforms';

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

export default function FurniturePage() {
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

  const formatPrice = (price: number) => {
    return price.toLocaleString('en-IN');
  };

  // Get unique product types (filter out undefined)
  const productTypes = Array.from(
    new Set(products.map((p) => p.type).filter((t): t is string => !!t))
  );
  const sizes = Array.from(new Set(products.map((p) => p.size)));

  const handleScroll = (direction: 'left' | 'right') => {
    const container = document.getElementById('category-scroll');
    if (container) {
      const scrollAmount = 300;
      if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

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
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-6 relative">
          {/* Left Arrow */}
          <button
            onClick={() => handleScroll('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>

          {/* Scrollable Container */}
          <div
            id="category-scroll"
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-12"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map((category) => (
              <Link
                key={category.id}
                href={category.href}
                className="flex-shrink-0 group"
              >
                {/* Horizontal Card: Text Left, Image Right */}
                <div className="flex items-center gap-4 min-w-[280px] p-4 border-2 border-gray-200 rounded-lg hover:border-orange-400 transition-colors bg-white">
                  {/* Category Name - Left Side */}
                  <div className="flex-1">
                    <span className="text-base font-medium text-gray-900 group-hover:text-orange-500 transition-colors whitespace-nowrap">
                      {category.name}
                    </span>
                  </div>
                  
                  {/* Category Image - Right Side */}
                  <div className="relative w-24 h-20 rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => handleScroll('right')}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className="w-64 flex-shrink-0">
            <div className="sticky top-4">
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
                    <option>₹ {formatPrice(priceRange.max)}</option>
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
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">{filteredProducts.length} Results</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded text-sm font-medium"
                  aria-label="Sort products"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest</option>
                  <option value="discount">Discount</option>
                </select>
              </div>
            </div>

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
          </div>
        </div>
      </div>
    </div>
  );
}
