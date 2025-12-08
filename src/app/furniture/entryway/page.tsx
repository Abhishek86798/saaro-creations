'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { getProductsByCategory } from '@/data/productHelpers';
import { ProductGrid } from '@/components/features/ProductGrid';
import { CategoryCarousel } from '@/components/features/CategoryCarousel';
import { ProductToolbar } from '@/components/features/ProductToolbar';

const EntrywayPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('featured');
  const [filters, setFilters] = useState({
    priceRange: { min: 0, max: 500000 },
    discount: [] as number[],
  });

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId === 'all' ? null : categoryId);
  };

  const allEntrywayProducts = getProductsByCategory('Entryway');
  
  const categories = [
    { id: 'all', name: 'All Entryway', image: '/images/entryway/Consoles-image.jpg' },
    { id: 'Consoles', name: 'Consoles', image: '/images/entryway/Consoles-image.jpg' },
    { id: 'Shoe Racks', name: 'Shoe Racks', image: '/images/entryway/Shoe_Rack-image.jpg' },
    { id: 'Benches', name: 'Benches', image: '/images/entryway/Benches-image.jpg' },
    { id: 'Swings', name: 'Swings', image: '/images/entryway/image_990x341_101.webp' },
  ];

  const filteredProducts = useMemo(() => {
    let filtered = allEntrywayProducts;
    if (selectedCategory && selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.type === selectedCategory);
    }
    filtered = filtered.filter(p => p.price >= filters.priceRange.min && p.price <= filters.priceRange.max);
    if (filters.discount.length > 0) {
      filtered = filtered.filter(p => {
        if (!p.discount) return false;
        const discountValue = parseInt(p.discount);
        return filters.discount.includes(discountValue);
      });
    }
    return filtered;
  }, [allEntrywayProducts, selectedCategory, filters]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900">Home</Link>
            <span>&gt;</span>
            <Link href="/furniture" className="hover:text-gray-900">Furniture</Link>
            <span>&gt;</span>
            <span className="text-gray-900">Entryway</span>
          </div>
        </div>
      </div>

      {/* Category Carousel */}
      <CategoryCarousel
        categories={categories}
        selectedCategory={selectedCategory || 'all'}
        onCategoryChange={handleCategoryChange}
        isClickable={false}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8 overflow-hidden">
          <aside className="hidden lg:block w-64 flex-shrink-0 h-[calc(100vh-8rem)] overflow-y-auto sticky top-32">
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Filters</h3>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <div className="flex gap-2 items-center">
                  <input type="number" placeholder="Min" value={filters.priceRange.min} onChange={(e) => setFilters({ ...filters, priceRange: { ...filters.priceRange, min: Number(e.target.value) } })} className="w-full px-3 py-2 border rounded-md text-sm" />
                  <span>-</span>
                  <input type="number" placeholder="Max" value={filters.priceRange.max} onChange={(e) => setFilters({ ...filters, priceRange: { ...filters.priceRange, max: Number(e.target.value) } })} className="w-full px-3 py-2 border rounded-md text-sm" />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Discount</label>
                <div className="space-y-2">
                  {[10, 15, 20, 25, 30].map((discount) => (
                    <label key={discount} className="flex items-center">
                      <input type="checkbox" checked={filters.discount.includes(discount)} onChange={(e) => { if (e.target.checked) { setFilters({ ...filters, discount: [...filters.discount, discount] }); } else { setFilters({ ...filters, discount: filters.discount.filter((d) => d !== discount) }); } }} className="rounded text-orange-500 focus:ring-orange-500" />
                      <span className="ml-2 text-sm text-gray-700">{discount}% or more</span>
                    </label>
                  ))}
                </div>
              </div>
              <button onClick={() => setFilters({ priceRange: { min: 0, max: 500000 }, discount: [] })} className="w-full px-4 py-2 text-sm text-orange-600 hover:text-orange-700 font-medium">Clear All Filters</button>
            </div>
          </aside>
          <div className="flex-1">
            <ProductToolbar
              resultCount={filteredProducts.length}
              sortValue={sortBy}
              onSortChange={setSortBy}
            />
            <ProductGrid products={filteredProducts} emptyMessage={selectedCategory ? `No products found in ${selectedCategory}` : 'No entryway products found'} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntrywayPage;
