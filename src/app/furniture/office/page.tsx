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
  // Writing Desks
  { id: 1, name: 'Mecai Cane Writing Desk', price: 69900, image: '/images/officehome/Mecai_Cane_Writing_Desk.webp', status: 'Made To Order', emi: '₹ 7328.04', category: 'Writing Desks' },
  { id: 2, name: 'Trenton Writing Desk', price: 103550, originalPrice: 109000, image: '/images/officehome/Trenton_Writing_Desk.webp', status: 'Made To Order', emi: '₹ 10855.77', category: 'Writing Desks', discount: 5 },
  { id: 3, name: 'Kenneth Writing Desk with Niche', price: 95500, image: '/images/officehome/Kenneth_Writing_Desk_with_Niche.webp', status: 'Made To Order', emi: '₹ 10011.84', category: 'Writing Desks' },
  { id: 4, name: 'Aldo Writing Desk', price: 69190, originalPrice: 81400, image: '/images/officehome/Aldo_Writing_Desk.webp', status: 'Made To Order', emi: '₹ 7253.61', category: 'Writing Desks', discount: 15 },
  
  // Bookcase & Shelves
  { id: 5, name: 'Rigel Open Display Metal Shelf', price: 89900, image: '/images/officehome/Rigel_Open_Display_Metal_Shelf.webp', hoverImage: '/images/officehome/Rigel_Open_Display_Metal_Shelf (1).webp', status: 'Made To Order', emi: '₹ 9424.76', category: 'Bookcase & Shelves' },
  { id: 6, name: 'Veda Modular Kids Desk with Outlet & Bookcase', price: 143250, originalPrice: 191000, image: '/images/officehome/Veda_Modular_Kids_Desk_with_Outlet_Bookcase.webp', status: 'Made To Order', emi: '₹ 15017.76', category: 'Bookcase & Shelves', discount: 25 },
  { id: 7, name: 'Veda Modular Workspace Desk with Outlet & Bookcase', price: 165750, originalPrice: 221000, image: '/images/officehome/Veda_Modular_Workspace_Desk_with_Outlet_Bookcase.webp', status: 'Made To Order', emi: '₹ 17376.58', category: 'Bookcase & Shelves', discount: 25 },
  { id: 8, name: 'Veda Workspace Desk with Outlet & Hutch (120)', price: 92550, originalPrice: 123400, image: '/images/officehome/Veda_Workspace_Desk_with_Outlet_Hutch_120.webp', status: 'Made To Order', emi: '₹ 9702.58', category: 'Bookcase & Shelves', discount: 25 },
  { id: 9, name: 'Veda Kids Desk with Outlet & Hutch (80)', price: 74925, originalPrice: 99900, image: '/images/officehome/Veda_Kids_Desk_with_Outlet_Hutch_80.webp', status: 'Made To Order', emi: '₹ 7854.84', category: 'Bookcase & Shelves', discount: 25 },
  { id: 10, name: 'Veda Bookcase with Storage Cabinet (80)', price: 73050, originalPrice: 97400, image: '/images/officehome/Veda_Bookcase_with_Storage_Cabinet_80.webp', status: 'Made To Order', emi: '₹ 7658.27', category: 'Bookcase & Shelves', discount: 25 },
  { id: 11, name: 'Veda Bookcase with Storage Cabinet (60)', price: 67425, originalPrice: 89900, image: '/images/officehome/Veda_Bookcase_with_Storage_Cabinet_60.webp', status: 'Made To Order', emi: '₹ 7068.57', category: 'Bookcase & Shelves', discount: 25 },
  { id: 12, name: 'Atelier Display Storage Unit', price: 137180, originalPrice: 144400, image: '/images/officehome/Atelier_Display_Storage_Unit.webp', hoverImage: '/images/officehome/Atelier_Display_Storage_Unit (1).webp', badge: 'New', status: 'Made To Order', emi: '₹ 14381.41', category: 'Bookcase & Shelves', discount: 5 },
  { id: 13, name: 'Masse Rattan Display Unit', price: 106165, originalPrice: 124900, image: '/images/officehome/Masse_Rattan_Display_Unit.webp', status: 'Made To Order', emi: '₹ 11129.92', category: 'Bookcase & Shelves', discount: 15 },
  { id: 14, name: 'Voss Reaper Multifunctional Storage Cabinet - Dual Shade', price: 118900, image: '/images/officehome/Voss_Reaper_Multifunctional_Storage_Cabinet_-_Dual.webp', status: 'Made To Order', emi: '₹ 12465.01', category: 'Bookcase & Shelves' },
  { id: 15, name: 'Voss Rattan Multifunctional Storage Cabinet - Carbon Black', price: 109900, image: '/images/officehome/Voss_Rattan_Multifunctional_Storage_Cabinet_-_Carb.webp', status: 'Made To Order', emi: '₹ 11521.48', category: 'Bookcase & Shelves' },
  { id: 16, name: 'Voss Rattan Multifunctional Storage Cabinet - Golden Teak', price: 109900, image: '/images/officehome/Voss_Rattan_Multifunctional_Storage_Cabinet_-_Gold.webp', status: 'Made To Order', emi: '₹ 11521.48', category: 'Bookcase & Shelves' },
  { id: 17, name: 'Voss Reaper Multifunctional Storage Cabinet - Golden Teak', price: 118900, image: '/images/officehome/Voss_Reaper_Multifunctional_Storage_Cabinet_-_Gold.webp', status: 'Made To Order', emi: '₹ 12465.01', category: 'Bookcase & Shelves' },
  { id: 18, name: 'Voss Reaper Multifunctional Storage Cabinet - Carbon Black', price: 118900, image: '/images/officehome/Voss_Reaper_Multifunctional_Storage_Cabinet_-_Carb.webp', status: 'Made To Order', emi: '₹ 12465.01', category: 'Bookcase & Shelves' },
  { id: 19, name: 'Alder Open Display Shelf', price: 94905, originalPrice: 99900, image: '/images/officehome/Alder_Open_Display_Shelf.webp', hoverImage: '/images/officehome/Alder_Open_Display_Shelf (1).webp', status: 'Made To Order', emi: '₹ 9949.47', category: 'Bookcase & Shelves', discount: 5 },
  { id: 20, name: 'Braxton Open Bookcase', price: 132580, originalPrice: 189400, image: '/images/officehome/Braxton_Open_Bookcase.webp', status: 'Made To Order', emi: '₹ 13899.16', category: 'Bookcase & Shelves', discount: 30 },
  { id: 21, name: 'Oxford Bookshelf', price: 95540, originalPrice: 112400, image: '/images/officehome/Oxford_Bookshelf.webp', status: 'Made To Order', emi: '₹ 10016.04', category: 'Bookcase & Shelves', discount: 15 },
  { id: 22, name: 'Karma Display Rack', price: 94690, originalPrice: 111400, image: '/images/officehome/Karma_Display_Rack.webp', status: 'Made To Order', emi: '₹ 9926.93', category: 'Bookcase & Shelves', discount: 15 },
  { id: 23, name: 'Cefiro Bookshelf Storage Unit', price: 103455, originalPrice: 108900, image: '/images/officehome/Cefiro_Bookshelf_Storage_Unit.webp', hoverImage: '/images/officehome/Cefiro_Bookshelf_Storage_Unit (1).webp', status: 'Made To Order', emi: '₹ 10845.81', category: 'Bookcase & Shelves', discount: 5 },
  { id: 24, name: 'Masse Display Storage Unit', price: 97665, originalPrice: 114900, image: '/images/officehome/Masse_Display_Storage_Unit.webp', status: 'Made To Order', emi: '₹ 10238.81', category: 'Bookcase & Shelves', discount: 15 },
  
  // Tables
  { id: 25, name: 'Minutel Desk', price: 71740, originalPrice: 84400, image: '/images/officehome/Minutel_Desk.webp', hoverImage: '/images/officehome/Minutel_Desk (1).webp', status: 'Made To Order', emi: '₹ 7520.94', category: 'Tables', discount: 15 },
  { id: 26, name: 'Study Adaptable Desk', price: 96400, image: '/images/officehome/Study_Adaptable_Desk.webp', hoverImage: '/images/officehome/Study_Adaptable_Desk (1).webp', badge: 'Show Stopper', status: 'Made To Order', emi: '₹ 10106.2', category: 'Tables' },
  { id: 27, name: 'Kenneth Writing Table', price: 85500, image: '/images/officehome/Kenneth_Writing_Table.webp', status: 'Made To Order', emi: '₹ 8963.48', category: 'Tables' },
  
  // Consoles
  { id: 28, name: 'Mecai Console Desk', price: 49900, image: '/images/officehome/Mecai_Console_Desk.webp', hoverImage: '/images/officehome/Mecai_Console_Desk (1).webp', status: 'Made To Order', emi: '₹ 5231.32', category: 'Consoles' },
  { id: 29, name: 'Satori Rattan Chest Console', price: 89675, originalPrice: 105500, image: '/images/officehome/Satori_Rattan_Chest_Console.webp', hoverImage: '/images/officehome/Satori_Rattan_Chest_Console (1).webp', status: 'Made To Order', emi: '₹ 9401.17', category: 'Consoles', discount: 15 },
  { id: 30, name: 'Satori Reaper Chest Console', price: 95540, originalPrice: 112400, image: '/images/officehome/Satori_Reaper_Chest_Console.webp', hoverImage: '/images/officehome/Satori_Reaper_Chest_Console (1).webp', status: 'Made To Order', emi: '₹ 10016.04', category: 'Consoles', discount: 15 },
  { id: 31, name: 'Satori Rattan Chest Console (Natural)', price: 89675, originalPrice: 105500, image: '/images/officehome/Satori_Rattan_Chest_Console_Natural.webp', status: 'Made To Order', emi: '₹ 9401.17', category: 'Consoles', discount: 15 },
  { id: 32, name: 'Spencer Open Display Console', price: 76415, originalPrice: 89900, image: '/images/officehome/Spencer_Open_Display_Console.webp', status: 'Made To Order', emi: '₹ 8011.05', category: 'Consoles', discount: 15 },
  { id: 33, name: 'Bolton Open Display Console', price: 80240, originalPrice: 94400, image: '/images/officehome/Bolton_Open_Display_Console.webp', status: 'Made To Order', emi: '₹ 8412.04', category: 'Consoles', discount: 15 },
  { id: 34, name: 'Fairmont Open Display Console', price: 71400, originalPrice: 84000, image: '/images/officehome/Fairmont_Open_Display_Console.webp', status: 'Made To Order', emi: '₹ 7485.29', category: 'Consoles', discount: 15 },
  
  // Dining Chairs
  { id: 35, name: 'Arcana Chair', price: 33200, originalPrice: 40000, image: '/images/officehome/Arcana_Chair.webp', status: 'Made To Order', emi: '₹ 3480.56', category: 'Dining Chairs', discount: 17 },
  { id: 36, name: 'Leo Suede Leather Chair-Vintage', price: 25730, originalPrice: 31000, image: '/images/officehome/Leo_Suede_Leather_Chair-Vintage.webp', hoverImage: '/images/officehome/Leo_Suede_Leather_Chair-Vintage (1).webp', status: 'Ready To Ship', emi: '₹ 2697.43', category: 'Dining Chairs', discount: 17 },
  { id: 37, name: 'Leo Suede Leather Chair-Saddle', price: 25730, originalPrice: 31000, image: '/images/officehome/Leo_Suede_Leather_Chair-Saddle.webp', hoverImage: '/images/officehome/Leo_Suede_Leather_Chair-Saddle (1).webp', status: 'Ready To Ship', emi: '₹ 2697.43', category: 'Dining Chairs', discount: 17 },
  { id: 38, name: 'Clare Rattan Chair', price: 28967, originalPrice: 34900, image: '/images/officehome/Clare_Rattan_Chair.webp', status: 'Made To Order', emi: '₹ 3036.79', category: 'Dining Chairs', discount: 17 },
  { id: 39, name: 'Alice Dining Chair', price: 28967, originalPrice: 34900, image: '/images/officehome/Alice_Dining_Chair.webp', hoverImage: '/images/officehome/Alice_Dining_Chair (1).webp', status: 'Made To Order', emi: '₹ 3036.79', category: 'Dining Chairs', discount: 17 },
  { id: 40, name: 'Lento Leather Chair-Blue Leather', price: 27390, originalPrice: 33000, image: '/images/officehome/Lento_Leather_Chair-Blue_Leather.webp', status: 'Ready To Ship', emi: '₹ 2871.46', category: 'Dining Chairs', discount: 17 },
  { id: 41, name: 'Lento Leather Chair-Brown Leather', price: 27390, originalPrice: 33000, image: '/images/officehome/Lento_Leather_Chair-Brown_Leather.webp', hoverImage: '/images/officehome/Lento_Leather_Chair-Brown_Leather (1).webp', status: 'Ready To Ship', emi: '₹ 2871.46', category: 'Dining Chairs', discount: 17 },
  { id: 42, name: 'Tokyo Rattan Chair', price: 33065, originalPrice: 38900, image: '/images/officehome/Tokyo_Rattan_Chair.webp', hoverImage: '/images/officehome/Tokyo_Rattan_Chair (1).webp', status: 'Made To Order', emi: '₹ 3466.4', category: 'Dining Chairs', discount: 15 },
];

export default function OfficeHomePage() {
  const { addItem: addToWishlist, items: wishlistItems } = useWishlistStore();
  const [filters, setFilters] = useState({
    productType: [] as string[],
    price: { min: 0, max: 200000 },
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
          <span className="text-gray-900">Office Home</span>
        </div>
      </div>

      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Office Home</h1>
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
