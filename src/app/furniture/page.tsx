'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const categories = [
  { id: 1, name: 'Entryway', image: '/images/furniture/Entryway-image.jpg' },
  { id: 2, name: 'Living', image: '/images/furniture/Living-image.jpg' },
  { id: 3, name: 'Dining', image: '/images/furniture/Dining-image.jpg' },
  { id: 4, name: 'Bedroom', image: '/images/furniture/Bedroom-image.jpg' },
  { id: 5, name: 'Office Home', image: '/images/furniture/Office_Home_-image.jpg' },
  { id: 6, name: 'In-Stock Furniture', image: '/images/furniture/In-Stock_Furniture-image.jpg' },
];

const products = [
  {
    id: 1,
    name: 'Miller Cane Three Seater Sofa',
    price: 204000,
    originalPrice: 240000,
    discount: 15,
    image: '/images/furniture/Miller_Cane_Three_Seater_Sofa.webp',
    badge: 'MADE TO ORDER',
    emi: 21386.55,
    category: 'Living',
    type: 'Sofas & Sectionals',
    size: '8 feet',
  },
  {
    id: 2,
    name: 'Morgan Three Seater Sofa-Copeland Bark',
    price: 195000,
    originalPrice: 260000,
    discount: 25,
    image: '/images/furniture/Morgan_Three_Seater_Sofa-Copeland_Bark.webp',
    badge: 'MADE TO ORDER',
    emi: 20443.03,
    category: 'Living',
    type: 'Sofas & Sectionals',
    size: '8 feet',
  },
  {
    id: 3,
    name: 'Moris Lounge Chair',
    price: 88400,
    originalPrice: null,
    discount: 0,
    image: '/images/furniture/Moris_Lounge_Chair.webp',
    badge: 'MADE TO ORDER',
    emi: 9267.51,
    category: 'Living',
    type: 'Accent | Lounge Chairs',
    size: 'M',
  },
  {
    id: 4,
    name: 'Nicholas Lounge Chair',
    price: 90000,
    originalPrice: 120000,
    discount: 25,
    image: '/images/furniture/Nicholas_Lounge_Chair.webp',
    badge: 'MADE TO ORDER',
    emi: 9435.24,
    category: 'Living',
    type: 'Accent | Lounge Chairs',
    size: 'M',
  },
  {
    id: 5,
    name: 'Candice Rattan Single Seater',
    price: 65925,
    originalPrice: null,
    discount: 0,
    image: '/images/furniture/Candice_Rattan_Single_Seater.webp',
    badge: 'MADE TO ORDER',
    emi: 6911.32,
    category: 'Living',
    type: 'Accent | Lounge Chairs',
    size: 'M',
  },
  {
    id: 6,
    name: 'Ebba Chaise Sectional Sofa',
    price: 301750,
    originalPrice: null,
    discount: 0,
    image: '/images/furniture/Ebba_Chaise_Sectional_Sofa.webp',
    badge: 'MADE TO ORDER',
    emi: 31634.28,
    category: 'Living',
    type: 'Sofas & Sectionals',
    size: '10 feet',
  },
  {
    id: 7,
    name: 'Jake Modular Sectional Sofa',
    price: 333200,
    originalPrice: 392000,
    discount: 15,
    image: '/images/furniture/Jake_Modular_Sectional_Sofa.webp',
    badge: 'MADE TO ORDER',
    emi: 34931.37,
    category: 'Living',
    type: 'Sofas & Sectionals',
    size: '10 feet',
  },
  {
    id: 8,
    name: 'Arcana Rattan Chair',
    price: 34000,
    originalPrice: 40000,
    discount: 15,
    image: '/images/furniture/Arcana_Rattan_Chair.webp',
    badge: 'MADE TO ORDER',
    emi: 3564.43,
    category: 'Dining',
    type: 'Dining Chairs',
    size: 'M',
  },
  {
    id: 9,
    name: 'Zenora Three-Seater Sofa',
    price: 185250,
    originalPrice: 195000,
    discount: 5,
    image: '/images/furniture/Zenora_Three-Seater_Sofa.webp',
    badge: 'MADE TO ORDER',
    emi: 19420.88,
    category: 'Living',
    type: 'Sofas & Sectionals',
    size: '7 feet',
  },
  {
    id: 10,
    name: 'Eloise Three Seater Sofa',
    price: 178030,
    originalPrice: 187400,
    discount: 5,
    image: '/images/furniture/Eloise_Three_Seater_Sofa.webp',
    badge: 'NEW',
    emi: 18663.96,
    category: 'Living',
    type: 'Sofas & Sectionals',
    size: '8 feet',
  },
  {
    id: 11,
    name: 'Marcus Chesterfield 3 Seater Sofa',
    price: 238000,
    originalPrice: 280000,
    discount: 15,
    image: '/images/furniture/Marcus_Chesterfield_3_Seater_Sofa.webp',
    badge: 'MADE TO ORDER',
    emi: 24950.98,
    category: 'Living',
    type: 'Sofas & Sectionals',
    size: '8 feet',
  },
  {
    id: 12,
    name: 'Ahava Chiseled Console',
    price: 95200,
    originalPrice: 112000,
    discount: 15,
    image: '/images/furniture/Ahava_Chiseled_Console.webp',
    badge: 'MADE TO ORDER',
    emi: 9980.39,
    category: 'Entryway',
    type: 'Console Tables',
    size: 'L',
  },
];

export default function FurniturePage() {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 500000 });
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedDiscounts, setSelectedDiscounts] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('featured');

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('en-IN');
  };

  // Get unique product types
  const productTypes = Array.from(new Set(products.map((p) => p.type)));
  const sizes = Array.from(new Set(products.map((p) => p.size)));

  // Filter products
  const filteredProducts = products.filter((product) => {
    if (selectedCategory !== 'All' && product.category !== selectedCategory) return false;
    if (selectedTypes.length > 0 && !selectedTypes.includes(product.type)) return false;
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
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-amber-600">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-900">Furniture</span>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-8 overflow-x-auto py-6 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.name)}
                className={`flex flex-col items-center gap-2 min-w-[120px] group ${
                  selectedCategory === category.name ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                }`}
              >
                <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <span className="text-sm font-medium text-gray-900">{category.name}</span>
              </button>
            ))}
          </div>
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
                  />
                </div>
                <div className="flex items-center gap-2">
                  <select className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm">
                    <option>Min</option>
                  </select>
                  <span className="text-gray-400">to</span>
                  <select className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm">
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
                <div key={product.id} className="group">
                  <div className="relative mb-4 overflow-hidden rounded-lg bg-gray-50">
                    <div className="aspect-[3/4] relative">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {product.badge && (
                        <div
                          className={`absolute top-4 left-4 px-3 py-1 text-xs font-semibold ${
                            product.badge === 'NEW'
                              ? 'bg-black text-white'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {product.badge}
                        </div>
                      )}
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-md"
                      >
                        <svg
                          className={`w-5 h-5 ${
                            wishlist.includes(product.id)
                              ? 'fill-red-500 text-red-500'
                              : 'fill-none text-gray-700'
                          }`}
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg font-bold text-gray-900">
                        ₹{formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <>
                          <span className="text-sm text-gray-400 line-through">
                            ₹{formatPrice(product.originalPrice)}
                          </span>
                          <span className="text-sm font-semibold text-amber-600">
                            {product.discount}%OFF
                          </span>
                        </>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">EMI starts from ₹ {product.emi.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
