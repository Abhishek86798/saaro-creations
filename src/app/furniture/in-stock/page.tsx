'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useWishlistStore } from '@/store/wishlistStore';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  hoverImage?: string;
  badge?: string;
  status?: string;
  emi?: string;
  category: string;
  discount?: number;
}

const products: Product[] = [
  { id: 1, name: 'Casper Lounge Chair', price: 85900, image: '/images/instock/Casper_Lounge_Chair.webp', hoverImage: '/images/instock/Casper_Lounge_Chair (1).webp', status: 'Ready To Ship', emi: '₹ 9005.42', category: 'Accent | Lounge Chairs' },
  { id: 2, name: 'Ahava Treo Pebble Console', price: 76230, originalPrice: 108900, image: '/images/instock/Ahava_Treo_Pebble_Console.webp', badge: 'Top Rated', status: 'Ready To Ship', emi: '₹ 7991.65', category: 'Console Tables', discount: 30 },
  { id: 3, name: 'Saturn Nox End Table', price: 37905, originalPrice: 39900, image: '/images/instock/Saturn_Nox_End_Table.webp', status: 'Ready To Ship', emi: '₹ 3973.81', category: 'Side Table', discount: 5 },
  { id: 4, name: 'Vanchi Rattan Accent Chair', price: 55165, originalPrice: 64900, image: '/images/instock/Vanchi_Rattan_Accent_Chair.webp', status: 'Ready To Ship', emi: '₹ 5783.28', category: 'Accent | Lounge Chairs', discount: 15 },
  { id: 5, name: 'Thor C-Table', price: 24565, originalPrice: 28900, image: '/images/instock/Thor_C-Table.webp', status: 'Ready To Ship', emi: '₹ 2575.3', category: 'Side Table', discount: 15 },
  { id: 6, name: 'Saturn End Table', price: 37905, originalPrice: 39900, image: '/images/instock/Saturn_End_Table.webp', status: 'Ready To Ship', emi: '₹ 3973.81', category: 'Side Table', discount: 5 },
  { id: 7, name: 'Saturn Console', price: 84550, originalPrice: 89000, image: '/images/instock/Saturn_Console.webp', hoverImage: '/images/instock/Saturn_Console (1).webp', status: 'Ready To Ship', emi: '₹ 8863.89', category: 'Console Tables', discount: 5 },
  { id: 8, name: 'Sinag Bench', price: 39900, image: '/images/instock/Sinag_Bench.webp', status: 'Ready To Ship', emi: '₹ 4182.96', category: 'Benches' },
  { id: 9, name: 'Kwan Dining Chair', price: 31955, originalPrice: 38500, image: '/images/instock/Kwan_Dining_Chair.webp', hoverImage: '/images/instock/Kwan_Dining_Chair (1).webp', status: 'Ready To Ship', emi: '₹ 3350.04', category: 'Dining Chairs', discount: 17 },
  { id: 10, name: 'Ripple Centre Table(Set of 2) - Marble Finish', price: 71740, originalPrice: 84400, image: '/images/instock/Ripple_Centre_TableSet_of_2_-_Marble_Finish.webp', status: 'Ready To Ship', emi: '₹ 7520.94', category: 'Center Tables', discount: 15 },
  { id: 11, name: 'Sinag Easy Dining Chair', price: 28967, originalPrice: 34900, image: '/images/instock/Sinag_Easy_Dining_Chair.webp', status: 'Ready To Ship', emi: '₹ 3036.79', category: 'Dining Chairs', discount: 17 },
  { id: 12, name: 'Beau Fabric Rack', price: 11900, originalPrice: 14000, image: '/images/instock/Beau_Fabric_Rack.webp', status: 'Ready To Ship', emi: '₹ 1247.55', category: 'Decor', discount: 15 },
  { id: 13, name: 'Lanna Fabric Rack', price: 20060, originalPrice: 23600, image: '/images/instock/Lanna_Fabric_Rack.webp', status: 'Ready To Ship', emi: '₹ 2103.01', category: 'Decor', discount: 15 },
  { id: 14, name: 'Haden Four Seater Sofa-Sarajevo', price: 201675, originalPrice: 268900, image: '/images/instock/Haden_Four_Seater_Sofa-Sarajevo.webp', status: 'Ready To Ship', emi: '₹ 21142.81', category: '4-Seater & Large Sofas', discount: 25 },
  { id: 15, name: 'Ripple Centre Table(Set of 2) - Cement Finish', price: 71740, originalPrice: 84400, image: '/images/instock/Ripple_Centre_TableSet_of_2_-_Cement_Finish.webp', hoverImage: '/images/instock/Ripple_Centre_TableSet_of_2_-_Cement_Finish (1).webp', status: 'Ready To Ship', emi: '₹ 7520.94', category: 'Center Tables', discount: 15 },
];

export default function InStockPage() {
  const { addItem: addToWishlist, items: wishlistItems } = useWishlistStore();
  const [filters, setFilters] = useState({
    productType: [] as string[],
    price: { min: 0, max: 300000 },
    discount: 0,
  });
  const [sortBy, setSortBy] = useState('featured');

  const isInWishlist = (productId: number) => {
    return wishlistItems.some(item => item.id === productId.toString());
  };

  const toggleWishlist = (product: Product) => {
    if (!isInWishlist(product.id)) {
      addToWishlist({
        id: product.id.toString(),
        name: product.name,
        price: product.price,
        image: product.image,
      });
    }
  };

  const productTypeCounts = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const filteredProducts = products.filter((product) => {
    if (filters.productType.length > 0 && !filters.productType.includes(product.category)) return false;
    if (product.price < filters.price.min || product.price > filters.price.max) return false;
    if (filters.discount > 0 && (!product.discount || product.discount < filters.discount)) return false;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'discount') return (b.discount || 0) - (a.discount || 0);
    return 0;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-orange-500">Home</Link>
          <span>/</span>
          <Link href="/furniture" className="hover:text-orange-500">Furniture</Link>
          <span>/</span>
          <span className="text-gray-900">In-Stock Furniture</span>
        </div>
      </div>

      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">In-Stock Furniture</h1>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-16">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className="w-64 flex-shrink-0">
            <div className="sticky top-4">
              <h3 className="text-lg font-semibold mb-4">Browse by</h3>

              {/* Product Type */}
              <div className="mb-6">
                <div className="space-y-2">
                  {Object.entries(productTypeCounts)
                    .sort(([, a], [, b]) => b - a)
                    .map(([type, count]) => (
                      <label key={type} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.productType.includes(type)}
                          onChange={(e) => {
                            setFilters({
                              ...filters,
                              productType: e.target.checked
                                ? [...filters.productType, type]
                                : filters.productType.filter((t) => t !== type),
                            });
                          }}
                          className="w-4 h-4"
                        />
                        <span className="text-sm">{type} ({count})</span>
                      </label>
                    ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Price</h4>
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.price.min}
                    onChange={(e) => setFilters({ ...filters, price: { ...filters.price, min: Number(e.target.value) } })}
                    className="w-20 px-2 py-1 border rounded text-sm"
                  />
                  <span>to</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.price.max}
                    onChange={(e) => setFilters({ ...filters, price: { ...filters.price, max: Number(e.target.value) } })}
                    className="w-28 px-2 py-1 border rounded text-sm"
                  />
                </div>
              </div>

              {/* Discount */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Discount</h4>
                <div className="space-y-2">
                  {[10, 20, 30].map((discount) => (
                    <label key={discount} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="discount"
                        checked={filters.discount === discount}
                        onChange={() => setFilters({ ...filters, discount })}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">{discount}% and above</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">{sortedProducts.length} Results</p>
              <div className="flex items-center gap-2">
                <label className="text-sm">Sort:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border rounded px-3 py-1 text-sm"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="discount">Discount</option>
                </select>
              </div>
            </div>

            {/* Products */}
            <div className="grid grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <div key={product.id} className="group relative">
                  <div className="relative aspect-[3/4] mb-3 overflow-hidden rounded-lg bg-gray-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:opacity-0 transition-opacity"
                    />
                    {product.hoverImage && (
                      <Image
                        src={product.hoverImage}
                        alt={product.name}
                        fill
                        className="object-cover opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    )}
                    {product.badge && (
                      <div className="absolute top-2 left-2 bg-white px-2 py-1 text-xs font-medium rounded">
                        {product.badge}
                      </div>
                    )}
                    <button
                      onClick={() => toggleWishlist(product)}
                      className="absolute top-2 right-2 bg-white rounded-full p-2 hover:bg-gray-100"
                    >
                      <Heart
                        className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                      />
                    </button>
                  </div>
                  <div className="space-y-1">
                    {product.status && (
                      <p className="text-xs text-gray-500">{product.status}</p>
                    )}
                    <h3 className="font-medium text-gray-900 group-hover:text-orange-500 transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      {product.originalPrice && (
                        <>
                          <span className="text-sm text-gray-500 line-through">
                            ₹{product.originalPrice.toLocaleString('en-IN')}
                          </span>
                          {product.discount && (
                            <span className="text-sm text-red-500 font-medium">
                              {product.discount}%Off
                            </span>
                          )}
                        </>
                      )}
                    </div>
                    {product.emi && (
                      <p className="text-xs text-gray-500">EMI starts from {product.emi}</p>
                    )}
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
