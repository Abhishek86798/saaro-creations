'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ChevronDown } from 'lucide-react';
import { useWishlistStore } from '@/store/wishlistStore';
import { getAccentsProducts } from '@/lib/products';
import type { Product } from '@/types/product';

const ITEMS_PER_PAGE = 20;

interface FilterState {
  types: string[];
  priceRange: { min: number; max: number };
  sizes: string[];
  discounts: string[];
}

export function AccentsClient() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = React.useState<Product[]>([]);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);
  const [mounted, setMounted] = React.useState(false);
  const [hoveredProduct, setHoveredProduct] = React.useState<string | null>(null);
  
  const observerTarget = React.useRef<HTMLDivElement>(null);
  
  const { toggleItem, isInWishlist } = useWishlistStore();

  const [filters, setFilters] = React.useState<FilterState>({
    types: [],
    priceRange: { min: 0, max: 100000 },
    sizes: [],
    discounts: []
  });

  // Load products on mount
  React.useEffect(() => {
    setMounted(true);
    async function loadProducts() {
      const allProducts = await getAccentsProducts();
      setProducts(allProducts);
      setDisplayedProducts(allProducts.slice(0, ITEMS_PER_PAGE));
      setHasMore(allProducts.length > ITEMS_PER_PAGE);
    }
    loadProducts();
  }, []);

  // Infinite scroll observer
  const loadMore = React.useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);
    setTimeout(() => {
      const nextPage = page + 1;
      const startIndex = page * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const nextProducts = products.slice(startIndex, endIndex);

      if (nextProducts.length > 0) {
        setDisplayedProducts((prev) => [...prev, ...nextProducts]);
        setPage(nextPage);
        setHasMore(endIndex < products.length);
      } else {
        setHasMore(false);
      }
      setLoading(false);
    }, 500); // Simulate network delay
  }, [loading, hasMore, page, products]);

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

  const productTypes = [
    { name: 'Table Lamps', count: 44 },
    { name: 'Decor', count: 21 },
    { name: 'Floor Lamps', count: 18 },
    { name: 'Pendant Lights', count: 16 },
    { name: 'Pot', count: 16 },
    { name: 'Vases', count: 6 },
    { name: 'Mirrors', count: 5 },
    { name: 'Lighting', count: 2 },
    { name: 'Planters', count: 1 }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-amber-600">Home</Link>
            <span>›</span>
            <span className="text-gray-900 font-medium">Decor</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden">
        <Image
          src="/images/decor/image_572x198_180.webp"
          alt="Decor Collection"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <h1 className="text-5xl md:text-6xl font-playfair text-white tracking-wider">
            DECOR
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className="w-64 flex-shrink-0 hidden lg:block">
            <div className="sticky top-4">
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
                    value={filters.priceRange.min}
                    onChange={(e) => setFilters({...filters, priceRange: {...filters.priceRange, min: parseInt(e.target.value) || 0}})}
                  />
                  <span className="text-gray-400">to</span>
                  <input 
                    type="number" 
                    placeholder="₹ 100000"
                    title="Maximum price"
                    className="w-full px-3 py-2 border rounded text-sm"
                    value={filters.priceRange.max}
                    onChange={(e) => setFilters({...filters, priceRange: {...filters.priceRange, max: parseInt(e.target.value) || 100000}})}
                  />
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100000" 
                  title="Price range slider"
                  className="w-full accent-amber-600"
                  value={filters.priceRange.max}
                  onChange={(e) => setFilters({...filters, priceRange: {...filters.priceRange, max: parseInt(e.target.value)}})}
                />
              </div>

              {/* Size Filter */}
              <div className="mb-8">
                <h3 className="text-base font-semibold mb-4">Size</h3>
                <div className="space-y-3">
                  {['L', 'S', 'M'].map((size, index) => (
                    <label key={index} className="flex items-center gap-2 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                        aria-label={`Filter by size ${size}`}
                      />
                      <span className="text-sm text-gray-700 group-hover:text-amber-600">
                        {size} ({size === 'L' ? 3 : 2})
                      </span>
                    </label>
                  ))}
                </div>
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
              <h2 className="text-2xl font-bold">{products.length} Results</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort:</span>
                <select 
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

            {/* Products Grid with Infinite Scroll */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          />
                          
                          {/* Badge */}
                          {product.badge && (
                            <span className={`absolute top-3 left-3 px-3 py-1 text-xs font-medium rounded ${
                              product.badge === 'SOLD OUT' 
                                ? 'bg-red-100 text-red-700'
                                : product.badge === 'MADE TO ORDER'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-green-100 text-green-700'
                            }`}>
                              {product.badge}
                            </span>
                          )}

                          {/* New Badge */}
                          {product.isNew && (
                            <span className="absolute top-3 right-14 px-3 py-1 text-xs font-bold text-white bg-black rounded">
                              New
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
                        {/* Category/Type */}
                        <p className="text-xs text-amber-600 uppercase tracking-wider mb-2">
                          {product.type || product.category}
                        </p>

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
                            <p className="text-xs text-gray-500">
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
                <p className="text-gray-500 text-lg">You&apos;ve reached the end of our collection</p>
                <Link href="/" className="text-amber-600 hover:text-amber-700 font-medium mt-4 inline-block">
                  Back to Home
                </Link>
              </div>
            )}

            {/* No Results */}
            {!loading && displayedProducts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">No products found</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
