'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NewLaunchPage() {
  // Filter state can be added when filter functionality is implemented

  const [sortBy, setSortBy] = React.useState('featured');
  const [wishlist, setWishlist] = React.useState<string[]>([]);

  const products = [
    {
      id: 'zigzag-storage-cabinet-2-shutter',
      name: 'Zigzag Multifunctional Storage Cabinet - 2 Shutter',
      image: '/images/Armoires_Wardrobes.webp',
      price: 108300,
      originalPrice: 114000,
      discount: 5,
      emi: 11353.74,
      badge: 'NEW',
      status: 'Made To Order',
      category: 'Console'
    },
    {
      id: 'zigzag-storage-cabinet-3-shutter',
      name: 'Zigzag Multifunctional Storage Cabinet - 3 Shutter',
      image: '/images/Armoires_Wardrobes.webp',
      price: 127300,
      originalPrice: 134000,
      discount: 5,
      emi: 13345.63,
      badge: 'NEW',
      status: 'Made To Order',
      category: 'Console'
    },
    {
      id: 'zigzag-media-console-s',
      name: 'Zigzag Media Console - S',
      image: '/images/Coffee_Tables.webp',
      price: 83980,
      originalPrice: 88400,
      discount: 5,
      emi: 8804.13,
      badge: 'NEW',
      status: 'Made To Order',
      category: 'Media Console'
    },
    {
      id: 'zigzag-media-console-m',
      name: 'Zigzag Media Console - M',
      image: '/images/Coffee_Tables.webp',
      price: 103930,
      originalPrice: 109400,
      discount: 5,
      emi: 10895.61,
      badge: 'NEW',
      status: 'Made To Order',
      category: 'Media Console'
    },
    {
      id: 'zigzag-media-console-l',
      name: 'Zigzag Media Console - L',
      image: '/images/Coffee_Tables.webp',
      price: 120080,
      originalPrice: 126400,
      discount: 5,
      emi: 12588.71,
      badge: 'NEW',
      status: 'Made To Order',
      category: 'Media Console'
    },
    {
      id: 'kaalai-painted-bull-sculpture',
      name: 'Kaalai Painted Bull Sculpture',
      image: '/images/Accents.webp',
      price: 10900,
      originalPrice: null,
      discount: null,
      emi: 1142.71,
      badge: 'NEW',
      status: 'Made To Order',
      category: 'Decor'
    },
    {
      id: 'kaalai-wooden-bull-sculpture',
      name: 'Kaalai Wooden Bull Sculpture',
      image: '/images/Accents.webp',
      price: 9000,
      originalPrice: null,
      discount: null,
      emi: 943.52,
      badge: 'NEW',
      status: 'Made To Order',
      category: 'Decor'
    },
    {
      id: 'hound-wooden-dog-sculpture',
      name: 'Hound Wooden Dog Sculpture',
      image: '/images/Accents.webp',
      price: 15900,
      originalPrice: null,
      discount: null,
      emi: 1666.89,
      badge: 'NEW',
      status: 'Made To Order',
      category: 'Decor'
    },
    {
      id: 'clement-coffee-table',
      name: 'Clement Coffee Table',
      image: '/images/Coffee_Tables.webp',
      price: 93480,
      originalPrice: 98400,
      discount: 5,
      emi: 9800.07,
      badge: 'NEW',
      status: 'Made To Order',
      category: 'Coffee Table'
    },
    {
      id: 'haden-coffee-table-glam-oxide',
      name: 'Haden Coffee Table - Glam Oxide',
      image: '/images/Coffee_Tables.webp',
      price: 69730,
      originalPrice: 73400,
      discount: 5,
      emi: 7310.22,
      badge: 'NEW',
      status: 'Made To Order',
      category: 'Coffee Table'
    },
    {
      id: 'nicco-coffee-table',
      name: 'Nicco Coffee Table',
      image: '/images/Coffee_Tables.webp',
      price: 89000,
      originalPrice: null,
      discount: null,
      emi: 9330.41,
      badge: 'NEW',
      status: 'Made To Order',
      category: 'Coffee Table'
    },
    {
      id: 'logan-center-table-set',
      name: 'Logan Center Table (Set of 2)',
      image: '/images/Coffee_Tables.webp',
      price: 159030,
      originalPrice: 167400,
      discount: 5,
      emi: 16672.08,
      badge: 'NEW',
      status: 'Made To Order',
      category: 'Center Table'
    },
    {
      id: 'preston-curved-lounge-chair-manuka-honey',
      name: 'Preston Curved Lounge Chair - Manuka Honey',
      image: '/images/Sofas.webp',
      price: 130625,
      originalPrice: 137500,
      discount: 5,
      emi: 13694.21,
      badge: 'NEW',
      status: 'Made To Order',
      category: 'Accent Chair'
    },
    {
      id: 'preston-curved-loveseat-manuka-honey',
      name: 'Preston Curved Loveseat - Manuka Honey',
      image: '/images/Sofas.webp',
      price: 199500,
      originalPrice: 210000,
      discount: 5,
      emi: 20914.79,
      badge: 'NEW',
      status: 'Made To Order',
      category: 'Loveseat'
    },
    {
      id: 'preston-curved-three-seater-manuka-honey',
      name: 'Preston Curved Three Seater Sofa - Manuka Honey',
      image: '/images/Sofas.webp',
      price: 289750,
      originalPrice: 305000,
      discount: 5,
      emi: 30376.25,
      badge: 'NEW',
      status: 'Made To Order',
      category: '3-Seater Sofa'
    },
    {
      id: 'arlo-rattan-chair',
      name: 'Arlo Rattan Chair',
      image: '/images/Dining_Chairs.webp',
      price: 38400,
      originalPrice: null,
      discount: null,
      emi: 4025.70,
      badge: 'NEW',
      status: 'Made To Order',
      category: 'Dining Chair'
    },
    {
      id: 'ryder-dining-chair',
      name: 'Ryder Dining Chair',
      image: '/images/Dining_Chairs.webp',
      price: 31350,
      originalPrice: 33000,
      discount: 5,
      emi: 3286.61,
      badge: 'NEW',
      status: 'Made To Order',
      category: 'Dining Chair'
    },
    {
      id: 'bennet-dining-chair',
      name: 'Bennet Dining Chair',
      image: '/images/Dining_Chairs.webp',
      price: 33725,
      originalPrice: 35500,
      discount: 5,
      emi: 3535.60,
      badge: 'NEW',
      status: 'Made To Order',
      category: 'Dining Chair'
    },
    {
      id: 'kansho-dining-table',
      name: 'Kansho Dining Table',
      image: '/images/Dining_Tables.webp',
      price: 213180,
      originalPrice: 241680,
      discount: 12,
      emi: 25336.78,
      badge: 'NEW',
      status: 'Made To Order',
      category: 'Dining Table'
    },
    {
      id: 'monolith-dining-table',
      name: 'Monolith Dining Table',
      image: '/images/Dining_Tables.webp',
      price: 131100,
      originalPrice: 138000,
      discount: 5,
      emi: 13744.01,
      badge: 'NEW',
      status: 'Made To Order',
      category: 'Dining Table'
    }
  ];

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-amber-600">Home</Link>
            <span>›</span>
            <span className="text-gray-900 font-medium">New Launch</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className="w-64 flex-shrink-0">
            <div className="sticky top-4">
              <h2 className="text-lg font-bold mb-6">Browse by</h2>

              {/* Product Type Filter */}
              <div className="mb-8">
                <button className="flex items-center justify-between w-full text-base font-semibold mb-4">
                  Product Type
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="space-y-3">
                  {[
                    { name: 'Accent | Lounge Chairs', count: 18 },
                    { name: 'Center Tables', count: 13 },
                    { name: 'Side Table', count: 13 },
                    { name: 'Corner Sofas', count: 8 },
                    { name: '3-Seater Sofas', count: 7 },
                    { name: 'Consoles', count: 6 },
                    { name: 'Dining Chairs', count: 6 },
                    { name: 'Pot', count: 6 }
                  ].map((type, index) => (
                    <label key={index} className="flex items-center gap-2 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-amber-600">
                        {type.name}
                      </span>
                      <span className="text-sm text-gray-400">({type.count})</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-semibold">Price</h3>
                  <button className="text-xs text-amber-600 hover:text-amber-700">Clear</button>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <input 
                    type="number" 
                    placeholder="Min"
                    className="w-full px-3 py-2 border rounded text-sm"
                  />
                  <span className="text-gray-400">to</span>
                  <input 
                    type="number" 
                    placeholder="₹ 500000"
                    className="w-full px-3 py-2 border rounded text-sm"
                  />
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="500000" 
                  className="w-full accent-amber-600"
                />
              </div>

              {/* Discount Filter */}
              <div className="mb-8">
                <button className="flex items-center justify-between w-full text-base font-semibold mb-4">
                  Discount
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="space-y-3">
                  {['10% and above', '20% and above', '30% and above'].map((discount, index) => (
                    <label key={index} className="flex items-center gap-2 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-amber-600">
                        {discount}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-1">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">172 Results</h1>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border rounded text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                  <option value="discount">Discount</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="group">
                  <div className="relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                    {/* Image */}
                    <Link href={`/products/${product.name.toLowerCase().replace(/ /g, '-')}`}>
                      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        
                        {/* Badges */}
                        {product.badge && (
                          <span className="absolute top-3 left-3 px-3 py-1 text-xs font-bold text-white bg-black rounded">
                            {product.badge}
                          </span>
                        )}
                        
                        {/* Wishlist Button */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleWishlist(product.id);
                          }}
                          className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors"
                        >
                          <Heart 
                            className={`w-5 h-5 ${wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                          />
                        </button>
                      </div>
                    </Link>

                    {/* Product Info */}
                    <div className="p-4">
                      {/* Status */}
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded mb-3">
                        {product.status}
                      </span>

                      {/* Product Name */}
                      <Link href={`/products/${product.name.toLowerCase().replace(/ /g, '-')}`}>
                        <h3 className="text-base font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-amber-600 transition-colors min-h-[3rem]">
                          {product.name}
                        </h3>
                      </Link>

                      {/* Pricing */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-gray-900">
                            {formatPrice(product.price)}
                          </span>
                          {product.originalPrice && (
                            <>
                              <span className="text-sm text-gray-400 line-through">
                                {formatPrice(product.originalPrice)}
                              </span>
                              <span className="text-sm text-green-600 font-medium">
                                {product.discount}%OFF
                              </span>
                            </>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">
                          EMI starts from ₹ {product.emi.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            <div className="mt-12 text-center">
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white"
              >
                Load More Products
              </Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
