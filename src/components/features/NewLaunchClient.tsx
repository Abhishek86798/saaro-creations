'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DisplayNewProduct } from '@/types/display';
import { formatPrice } from '@/lib/transforms';
import { useWishlistStore } from '@/store/wishlistStore';

interface NewLaunchClientProps {
  initialProducts: DisplayNewProduct[];
}

export function NewLaunchClient({ initialProducts }: NewLaunchClientProps) {
  const [sortBy, setSortBy] = React.useState('featured');
  const [products] = React.useState<DisplayNewProduct[]>(initialProducts);
  
  const { toggleItem, isInWishlist } = useWishlistStore();

  const toggleWishlist = (product: DisplayNewProduct) => {
    toggleItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      badge: product.badge,
    });
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
                        aria-label={`Filter by ${type.name}`}
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
                    title="Minimum price"
                    className="w-full px-3 py-2 border rounded text-sm"
                  />
                  <span className="text-gray-400">to</span>
                  <input 
                    type="number" 
                    placeholder="₹ 500000"
                    title="Maximum price"
                    className="w-full px-3 py-2 border rounded text-sm"
                  />
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="500000" 
                  title="Price range slider"
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
                        aria-label={`Filter by ${discount}`}
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
              <h1 className="text-2xl font-bold">{products.length} Results</h1>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border rounded text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
                  aria-label="Sort products"
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
              {products.map((product) => {
                const inWishlist = isInWishlist(product.id);
                
                return (
                  <div key={product.id} className="group">
                    <div className="relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                      {/* Image */}
                      <Link href={`/product/${product.id}`}>
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
                              toggleWishlist(product);
                            }}
                            className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors"
                            title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                          >
                            <Heart 
                              className={`w-5 h-5 ${inWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                            />
                          </button>
                        </div>
                      </Link>

                      {/* Product Info */}
                      <div className="p-4">
                        {/* Status */}
                        {product.status && (
                          <span className="inline-block px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded mb-3">
                            {product.status}
                          </span>
                        )}

                        {/* Product Name */}
                        <Link href={`/product/${product.id}`}>
                          <h3 className="text-base font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-amber-600 transition-colors min-h-[3rem]">
                            {product.name}
                          </h3>
                        </Link>

                        {/* Pricing */}
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-gray-900">
                              ₹{formatPrice(product.price)}
                            </span>
                            {product.originalPrice && product.originalPrice > product.price && (
                              <>
                                <span className="text-sm text-gray-400 line-through">
                                  ₹{formatPrice(product.originalPrice)}
                                </span>
                                <span className="text-sm text-green-600 font-medium">
                                  {product.discount}% OFF
                                </span>
                              </>
                            )}
                          </div>
                          {product.emi > 0 && (
                            <p className="text-xs text-gray-500">
                              EMI starts from ₹{formatPrice(Math.round(product.emi))}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
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
