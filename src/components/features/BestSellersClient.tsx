'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ChevronDown, ChevronUp } from 'lucide-react';
import { useWishlistStore } from '@/store/wishlistStore';
import type { Product } from '@/types/product';

const ITEMS_PER_PAGE = 20;

interface FilterState {
  productTypes: string[];
  priceRange: { min: number; max: number };
  sizes: string[];
  configurations: string[];
  bedSizes: string[];
  shapes: string[];
  discounts: string[];
}

interface BestSellersClientProps {
  products: Product[];
}

export function BestSellersClient({ products: initialProducts }: BestSellersClientProps) {
  const [products] = React.useState<Product[]>(initialProducts);
  const [filteredProducts, setFilteredProducts] = React.useState<Product[]>(initialProducts);
  const [displayedProducts, setDisplayedProducts] = React.useState<Product[]>([]);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);
  const [mounted, setMounted] = React.useState(false);
  const [hoveredProduct, setHoveredProduct] = React.useState<string | null>(null);
  const [expandedSections, setExpandedSections] = React.useState<Set<string>>(new Set(['productType', 'price']));
  
  const observerTarget = React.useRef<HTMLDivElement>(null);
  
  const { toggleItem, isInWishlist } = useWishlistStore();

  const [filters, setFilters] = React.useState<FilterState>({
    productTypes: [],
    priceRange: { min: 0, max: 400000 },
    sizes: [],
    configurations: [],
    bedSizes: [],
    shapes: [],
    discounts: []
  });

  const [sortBy, setSortBy] = React.useState<string>('featured');

  // Count products by type
  const productTypeCounts = React.useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach(product => {
      const type = product.type || product.category;
      counts[type] = (counts[type] || 0) + 1;
    });
    return counts;
  }, [products]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(section)) {
        newSet.delete(section);
      } else {
        newSet.add(section);
      }
      return newSet;
    });
  };

  // Apply filters and sorting
  React.useEffect(() => {
    let result = [...products];

    // Apply type filter
    if (filters.productTypes.length > 0) {
      result = result.filter(product => {
        const productType = product.type || product.category;
        return filters.productTypes.includes(productType);
      });
    }

    // Apply price filter
    result = result.filter(product => 
      product.price >= filters.priceRange.min && product.price <= filters.priceRange.max
    );

    // Apply discount filter
    if (filters.discounts.length > 0) {
      result = result.filter(product => {
        if (!product.discount) return false;
        return filters.discounts.some(discountFilter => {
          const percentage = parseInt(discountFilter);
          const productDiscount = parseInt(product.discount || '0');
          return productDiscount >= percentage;
        });
      });
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result = result.filter(p => p.isNew);
        break;
      case 'discount':
        result.sort((a, b) => {
          const discountA = parseInt(a.discount || '0');
          const discountB = parseInt(b.discount || '0');
          return discountB - discountA;
        });
        break;
    }

    setFilteredProducts(result);
    setDisplayedProducts(result.slice(0, ITEMS_PER_PAGE));
    setPage(1);
    setHasMore(result.length > ITEMS_PER_PAGE);
  }, [filters, sortBy, products]);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Infinite scroll observer
  const loadMore = React.useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);
    setTimeout(() => {
      const nextPage = page + 1;
      const startIndex = page * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const nextProducts = filteredProducts.slice(startIndex, endIndex);

      if (nextProducts.length > 0) {
        setDisplayedProducts((prev) => [...prev, ...nextProducts]);
        setPage(nextPage);
        setHasMore(endIndex < filteredProducts.length);
      } else {
        setHasMore(false);
      }
      setLoading(false);
    }, 500);
  }, [loading, hasMore, page, filteredProducts]);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, loading, loadMore]);

  const formatPrice = (price: number): string => {
    const priceStr = Math.round(price).toString();
    const lastThree = priceStr.substring(priceStr.length - 3);
    const otherNumbers = priceStr.substring(0, priceStr.length - 3);
    return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + lastThree;
  };

  const toggleWishlist = (product: Product) => {
    toggleItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice || product.price,
      image: product.images[0].url,
    });
  };

  const toggleFilter = (filterType: keyof FilterState, value: string) => {
    if (filterType === 'priceRange') return;
    
    setFilters(prev => {
      const current = prev[filterType] as string[];
      const newValues = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      return { ...prev, [filterType]: newValues };
    });
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Breadcrumb */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-amber-600">Home</Link>
            <span>›</span>
            <span className="text-gray-900 font-medium">Best Seller</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className="w-72 flex-shrink-0 hidden lg:block">
            <div className="sticky top-4 bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-bold mb-6">Browse by</h2>

              {/* Product Type Filter */}
              <div className="mb-6 pb-6 border-b">
                <button
                  onClick={() => toggleSection('productType')}
                  className="flex items-center justify-between w-full text-base font-semibold mb-4"
                >
                  <span>Product Type</span>
                  {expandedSections.has('productType') ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
                {expandedSections.has('productType') && (
                  <div className="space-y-2">
                    {Object.entries(productTypeCounts).map(([type, count]) => (
                      <label key={type} className="flex items-center gap-2 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                          checked={filters.productTypes.includes(type)}
                          onChange={() => toggleFilter('productTypes', type)}
                        />
                        <span className="text-sm text-gray-700 group-hover:text-amber-600 flex-1">
                          {type}
                        </span>
                        <span className="text-sm text-gray-400">({count})</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Price Filter */}
              <div className="mb-6 pb-6 border-b">
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={() => toggleSection('price')}
                    className="flex items-center gap-2 text-base font-semibold"
                  >
                    <span>Price</span>
                    {expandedSections.has('price') ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                  {(filters.priceRange.min > 0 || filters.priceRange.max < 400000) && (
                    <button 
                      className="text-xs text-amber-600 hover:text-amber-700"
                      onClick={() => setFilters({...filters, priceRange: { min: 0, max: 400000 }})}
                    >
                      Clear
                    </button>
                  )}
                </div>
                {expandedSections.has('price') && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <input 
                        type="number" 
                        placeholder="Min"
                        title="Minimum price"
                        className="w-full px-3 py-2 border rounded text-sm"
                        value={filters.priceRange.min}
                        onChange={(e) => setFilters({...filters, priceRange: {...filters.priceRange, min: parseInt(e.target.value) || 0}})}
                      />
                      <span className="text-gray-400">to</span>
                      <input 
                        type="number" 
                        placeholder="₹ 400000"
                        title="Maximum price"
                        className="w-full px-3 py-2 border rounded text-sm"
                        value={filters.priceRange.max}
                        onChange={(e) => setFilters({...filters, priceRange: {...filters.priceRange, max: parseInt(e.target.value) || 400000}})}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Discount Filter */}
              <div className="mb-6">
                <button
                  onClick={() => toggleSection('discount')}
                  className="flex items-center justify-between w-full text-base font-semibold mb-4"
                >
                  <span>Discount</span>
                  {expandedSections.has('discount') ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
                {expandedSections.has('discount') && (
                  <div className="space-y-2">
                    {['10', '20', '30'].map((discount) => (
                      <label key={discount} className="flex items-center gap-2 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                          checked={filters.discounts.includes(discount)}
                          onChange={() => toggleFilter('discounts', discount)}
                        />
                        <span className="text-sm text-gray-700 group-hover:text-amber-600">
                          {discount}% and above
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-1">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">{filteredProducts.length} Results</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort:</span>
                <select 
                  className="px-4 py-2 border rounded text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
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
              {displayedProducts.map((product) => {
                const inWishlist = mounted && isInWishlist(product.id);
                const isHovered = hoveredProduct === product.id;
                const displayImage = isHovered && product.images[1] 
                  ? product.images[1].url 
                  : product.images[0].url;

                return (
                  <div
                    key={product.id}
                    className="group"
                    onMouseEnter={() => setHoveredProduct(product.id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                  >
                    <div className="relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                      {/* Image */}
                      <Link href={`/product/${product.id}`}>
                        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                          <Image
                            src={displayImage}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          
                          {/* Badges */}
                          {product.badge && (
                            <span className={`absolute top-3 left-3 px-3 py-1 text-xs font-medium rounded uppercase ${
                              product.badge === 'SOLD OUT' 
                                ? 'bg-red-100 text-red-700'
                                : product.badge === 'TRENDING NOW'
                                ? 'bg-black text-white'
                                : product.badge === 'BEST SELLER'
                                ? 'bg-black text-white'
                                : 'bg-gray-100 text-gray-700'
                            }`}>
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
                        {/* Product Name */}
                        <Link href={`/product/${product.id}`}>
                          <h3 className="text-sm font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-amber-600 transition-colors min-h-[2.5rem]">
                            {product.name}
                          </h3>
                        </Link>

                        {/* Pricing */}
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-lg font-bold text-gray-900">
                              ₹{formatPrice(product.price)}
                            </span>
                            {product.originalPrice && product.originalPrice > product.price && (
                              <>
                                <span className="text-sm text-gray-400 line-through">
                                  ₹{formatPrice(product.originalPrice)}
                                </span>
                                <span className="text-xs text-white bg-green-600 px-2 py-0.5 rounded font-medium">
                                  {product.discount}% OFF
                                </span>
                              </>
                            )}
                          </div>
                          {product.emi && product.emi.startingPrice > 0 && (
                            <p className="text-xs text-orange-600">
                              EMI starts from ₹{formatPrice(Math.round(product.emi.startingPrice))}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Loading Spinner */}
            {loading && (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
              </div>
            )}

            {/* Intersection Observer Target */}
            <div ref={observerTarget} className="h-10" />

            {/* End Message */}
            {!hasMore && displayedProducts.length > 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">You&apos;ve reached the end of our best sellers</p>
                <Link href="/" className="text-amber-600 hover:text-amber-700 font-medium mt-4 inline-block">
                  Back to Home
                </Link>
              </div>
            )}

            {/* No Results */}
            {!loading && displayedProducts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg mb-4">No products found matching your filters</p>
                <button 
                  onClick={() => setFilters({
                    productTypes: [],
                    priceRange: { min: 0, max: 400000 },
                    sizes: [],
                    configurations: [],
                    bedSizes: [],
                    shapes: [],
                    discounts: []
                  })}
                  className="text-amber-600 hover:text-amber-700 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
