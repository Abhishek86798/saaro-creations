'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ChevronDown } from 'lucide-react';
import { useWishlistStore } from '@/store/wishlistStore';
import { products } from '@/data/products';
import type { Product } from '@/types/product';

type DisplayProduct = {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  image2?: string;
  status: 'NEW' | 'READY TO SHIP' | 'MADE TO ORDER';
  category: string;
  configuration?: string;
  emi: number;
};

// Transform Product to display format
const transformProduct = (product: Product): DisplayProduct => {
  const discountValue = product.discount ? parseInt(product.discount) : 0;
  
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    originalPrice: product.originalPrice || product.price,
    discount: discountValue,
    image: product.images[0]?.url || '/images/placeholder.webp',
    image2: product.images[1]?.url,
    status: (product.badge || 'MADE TO ORDER') as 'NEW' | 'READY TO SHIP' | 'MADE TO ORDER',
    category: product.type || product.category || 'Furniture',
    configuration: undefined, // Configuration can be added later
    emi: product.emi?.startingPrice || Math.round(product.price / 12)
  };
};

export default function WarehouseSalePage() {
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);
  const [selectedConfigurations, setSelectedConfigurations] = React.useState<string[]>([]);
  const [selectedDiscounts, setSelectedDiscounts] = React.useState<string[]>([]);
  const [priceRange, setPriceRange] = React.useState({ min: 0, max: 500000 });
  const [sortBy, setSortBy] = React.useState('featured');
  const [hoveredProduct, setHoveredProduct] = React.useState<string | null>(null);

  const { addItem: addToWishlist, items: wishlistItems } = useWishlistStore();

  // Get warehouse sale products (products with significant discounts)
  const allProducts = React.useMemo(() => {
    return products
      .filter((product: Product) => {
        const discountValue = product.discount ? parseInt(product.discount) : 0;
        return discountValue >= 5; // Only show products with 5% or more discount
      })
      .map(transformProduct);
  }, []);

  const categoryCount = React.useMemo(() => {
    const counts: Record<string, number> = {};
    allProducts.forEach((product: DisplayProduct) => {
      counts[product.category] = (counts[product.category] || 0) + 1;
    });
    return counts;
  }, [allProducts]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const toggleConfiguration = (config: string) => {
    setSelectedConfigurations(prev =>
      prev.includes(config) ? prev.filter(c => c !== config) : [...prev, config]
    );
  };

  const toggleDiscount = (discount: string) => {
    setSelectedDiscounts(prev =>
      prev.includes(discount) ? prev.filter(d => d !== discount) : [...prev, discount]
    );
  };

  const filteredProducts = React.useMemo(() => {
    return allProducts.filter((product: DisplayProduct) => {
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
        return false;
      }
      if (selectedConfigurations.length > 0 && product.configuration && !selectedConfigurations.includes(product.configuration)) {
        return false;
      }
      if (product.price < priceRange.min || product.price > priceRange.max) {
        return false;
      }
      if (selectedDiscounts.length > 0) {
        if (selectedDiscounts.includes('10% and above') && product.discount < 10) {
          return false;
        }
        if (selectedDiscounts.includes('20% and above') && product.discount < 20) {
          return false;
        }
        if (selectedDiscounts.includes('30% and above') && product.discount < 30) {
          return false;
        }
      }
      return true;
    });
  }, [allProducts, selectedCategories, selectedConfigurations, priceRange, selectedDiscounts]);

  const isInWishlist = (productId: string) => {
    return wishlistItems.some(item => item.id === productId);
  };

  const handleWishlistToggle = (product: DisplayProduct) => {
    if (!isInWishlist(product.id)) {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900">Home</Link>
            <span>/</span>
            <Link href="/warehouse-sale" className="hover:text-gray-900">Warehouse Sale</Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8 overflow-hidden">
          {/* Sidebar Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0 h-[calc(100vh-8rem)] overflow-y-auto sticky top-32">
            <h3 className="text-lg font-semibold mb-6">Browse by</h3>

            {/* Product Type */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium">Product Type</h4>
                <ChevronDown className="h-4 w-4" />
              </div>
              <div className="space-y-3">
                {Object.entries(categoryCount).map(([category, count]) => (
                  <label key={category} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => toggleCategory(category)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">
                      {category} <span className="text-gray-500">({count})</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium">Price</h4>
                <button 
                  onClick={() => setPriceRange({ min: 0, max: 500000 })}
                  className="text-sm text-orange-500"
                  aria-label="Clear price filter"
                >
                  Clear
                </button>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                  className="w-20 px-2 py-1 border rounded text-sm"
                  aria-label="Minimum price"
                />
                <span>to</span>
                <input
                  type="number"
                  placeholder="₹ 500000"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                  className="w-28 px-2 py-1 border rounded text-sm"
                  aria-label="Maximum price"
                />
              </div>
            </div>

            {/* Select Configuration */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium">Select Configuration</h4>
                <ChevronDown className="h-4 w-4" />
              </div>
              <div className="space-y-3">
                {['Right Arm Chaise', 'Left Arm Chaise'].map((config) => {
                  const count = allProducts.filter((p: DisplayProduct) => p.configuration === config).length;
                  return count > 0 ? (
                    <label key={config} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedConfigurations.includes(config)}
                        onChange={() => toggleConfiguration(config)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">{config} ({count})</span>
                    </label>
                  ) : null;
                })}
              </div>
            </div>

            {/* Discount */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium">Discount</h4>
                <ChevronDown className="h-4 w-4" />
              </div>
              <div className="space-y-3">
                {['10% and above', '20% and above', '30% and above'].map((discount) => (
                  <label key={discount} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedDiscounts.includes(discount)}
                      onChange={() => toggleDiscount(discount)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">{discount}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 h-[calc(100vh-8rem)] overflow-y-auto">
            <main className="pb-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">{filteredProducts.length} Results</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border rounded px-3 py-1 text-sm"
                  aria-label="Sort products"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="discount">Discount</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product: DisplayProduct) => (
                <div
                  key={product.id}
                  className="group relative"
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  {/* Product Image */}
                  <div className="relative aspect-square mb-3 overflow-hidden bg-gray-100">
                    {/* Status Badge */}
                    {product.status === 'NEW' && (
                      <div className="absolute top-3 left-3 bg-black text-white text-xs px-2 py-1 z-10">
                        NEW
                      </div>
                    )}

                    {/* Wishlist Button */}
                    <button
                      onClick={() => handleWishlistToggle(product)}
                      className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md z-10 hover:bg-gray-100"
                      aria-label={`Add ${product.name} to wishlist`}
                    >
                      <Heart
                        className={`h-5 w-5 ${
                          isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'
                        }`}
                      />
                    </button>

                    {/* Product Image */}
                    <Image
                      src={hoveredProduct === product.id && product.image2 ? product.image2 : product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>

                  {/* Status Label */}
                  <div className="mb-2">
                    <span className={`text-xs px-2 py-1 ${
                      product.status === 'MADE TO ORDER' ? 'bg-gray-100 text-gray-700' :
                      product.status === 'READY TO SHIP' ? 'bg-green-100 text-green-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {product.status}
                    </span>
                  </div>

                  {/* Product Info */}
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-medium text-sm mb-2 hover:text-gray-600">{product.name}</h3>
                  </Link>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">₹{product.price.toLocaleString('en-IN')}</span>
                    {product.discount > 0 && (
                      <>
                        <span className="text-sm text-gray-400 line-through">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-sm text-orange-500">{product.discount}%Off</span>
                      </>
                    )}
                  </div>

                  {/* EMI */}
                  <p className="text-xs text-orange-500">
                    EMI starts from ₹ {product.emi.toLocaleString('en-IN')}
                  </p>
                </div>
              ))}
            </div>
          </main>
          </div>
        </div>
      </div>
    </div>
  );
}
