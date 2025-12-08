'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ChevronDown } from 'lucide-react';
import { DisplayNewProduct } from '@/types/display';
import { formatPrice } from '@/lib/transforms';
import { useWishlistStore } from '@/store/wishlistStore';

interface NewLaunchClientProps {
  initialProducts: DisplayNewProduct[];
}

export function NewLaunchClient({ initialProducts }: NewLaunchClientProps) {
  const [sortBy, setSortBy] = React.useState('featured');
  const [selectedTypes, setSelectedTypes] = React.useState<string[]>([]);
  const [priceRange, setPriceRange] = React.useState({ min: 0, max: 500000 });
  const [selectedDiscounts, setSelectedDiscounts] = React.useState<number[]>([]);
  
  const { toggleItem, isInWishlist } = useWishlistStore();

  // Get unique product types
  const productTypes = React.useMemo(() => {
    const types = initialProducts.map(p => p.type).filter(Boolean);
    const uniqueTypes = Array.from(new Set(types));
    return uniqueTypes.map(type => ({
      name: type!,
      count: initialProducts.filter(p => p.type === type).length
    }));
  }, [initialProducts]);

  // Filter products
  const filteredProducts = React.useMemo(() => {
    let filtered = [...initialProducts];

    // Filter by type
    if (selectedTypes.length > 0) {
      filtered = filtered.filter(p => p.type && selectedTypes.includes(p.type));
    }

    // Filter by price
    filtered = filtered.filter(p => p.price >= priceRange.min && p.price <= priceRange.max);

    // Filter by discount
    if (selectedDiscounts.length > 0) {
      filtered = filtered.filter(p => {
        if (!p.discount) return false;
        const discount = typeof p.discount === 'string' ? parseInt(p.discount) : p.discount;
        return selectedDiscounts.some(minDiscount => discount >= minDiscount);
      });
    }

    return filtered;
  }, [initialProducts, selectedTypes, priceRange, selectedDiscounts]);

  // Sort products
  const sortedProducts = React.useMemo(() => {
    const sorted = [...filteredProducts];

    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'discount':
        return sorted.sort((a, b) => {
          const discountA = typeof a.discount === 'string' ? parseInt(a.discount) : (a.discount || 0);
          const discountB = typeof b.discount === 'string' ? parseInt(b.discount) : (b.discount || 0);
          return discountB - discountA;
        });
      case 'newest':
        return sorted; // Already sorted by newest
      default:
        return sorted;
    }
  }, [filteredProducts, sortBy]);

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

  const handleTypeToggle = (typeName: string) => {
    setSelectedTypes(prev =>
      prev.includes(typeName)
        ? prev.filter(t => t !== typeName)
        : [...prev, typeName]
    );
  };

  const handleDiscountToggle = (discount: number) => {
    setSelectedDiscounts(prev =>
      prev.includes(discount)
        ? prev.filter(d => d !== discount)
        : [...prev, discount]
    );
  };

  const clearFilters = () => {
    setSelectedTypes([]);
    setPriceRange({ min: 0, max: 500000 });
    setSelectedDiscounts([]);
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
        <div className="flex gap-8 overflow-hidden">
          {/* Sidebar Filters */}
          <aside className="w-64 flex-shrink-0 h-[calc(100vh-8rem)] overflow-y-auto sticky top-32">
            <div>
              <h2 className="text-lg font-bold mb-6">Browse by</h2>

              {/* Product Type Filter */}
              <div className="mb-8">
                <button className="flex items-center justify-between w-full text-base font-semibold mb-4">
                  Product Type
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="space-y-3">
                  {productTypes.map((type, index) => (
                    <label key={index} className="flex items-center gap-2 cursor-pointer group">
                      <input 
                        type="checkbox"
                        checked={selectedTypes.includes(type.name)}
                        onChange={() => handleTypeToggle(type.name)}
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
                  <button 
                    onClick={() => setPriceRange({ min: 0, max: 500000 })}
                    className="text-xs text-amber-600 hover:text-amber-700"
                  >
                    Clear
                  </button>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <input 
                    type="number" 
                    placeholder="Min"
                    value={priceRange.min || ''}
                    onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                    title="Minimum price"
                    className="w-full px-3 py-2 border rounded text-sm"
                  />
                  <span className="text-gray-400">to</span>
                  <input 
                    type="number" 
                    placeholder="500000"
                    value={priceRange.max || ''}
                    onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                    title="Maximum price"
                    className="w-full px-3 py-2 border rounded text-sm"
                  />
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="500000"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                  title="Price range slider"
                  className="w-full accent-amber-600"
                />
                <div className="text-xs text-gray-500 mt-2">
                  Up to ₹{formatPrice(priceRange.max)}
                </div>
              </div>

              {/* Discount Filter */}
              <div className="mb-8">
                <button className="flex items-center justify-between w-full text-base font-semibold mb-4">
                  Discount
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="space-y-3">
                  {[10, 20, 30].map((discount, index) => (
                    <label key={index} className="flex items-center gap-2 cursor-pointer group">
                      <input 
                        type="checkbox"
                        checked={selectedDiscounts.includes(discount)}
                        onChange={() => handleDiscountToggle(discount)}
                        className="w-4 h-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                        aria-label={`Filter by ${discount}% and above`}
                      />
                      <span className="text-sm text-gray-700 group-hover:text-amber-600">
                        {discount}% and above
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear All Filters */}
              <button
                onClick={clearFilters}
                className="w-full px-4 py-2 text-sm text-amber-600 hover:text-amber-700 font-medium border border-amber-600 rounded hover:bg-amber-50"
              >
                Clear All Filters
              </button>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1 h-[calc(100vh-8rem)] overflow-y-auto">
          <main className="pb-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">{sortedProducts.length} Results</h1>
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
              {sortedProducts.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 text-lg">No products found matching your filters.</p>
                  <button
                    onClick={clearFilters}
                    className="mt-4 text-amber-600 hover:text-amber-700 font-medium"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                sortedProducts.map((product) => {
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
                })
              )}
            </div>
          </main>
          </div>
        </div>
      </div>
    </div>
  );
}
