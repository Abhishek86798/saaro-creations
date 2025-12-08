/**
 * FURNITURE PAGE REFACTORING TEMPLATE
 * 
 * Use this template to refactor all furniture sub-pages (living, bedroom, office, etc.)
 * 
 * STEPS TO REFACTOR A PAGE:
 * 1. Copy this template
 * 2. Update the category name ('Living', 'Bedroom', etc.)
 * 3. Update the categories array with appropriate sub-categories
 * 4. Update image paths
 * 5. Test the page
 */

'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { getProductsByCategory } from '@/data/productHelpers';
import { SectionHeader } from '@/components/features/SectionHeader';
import { ProductGrid } from '@/components/features/ProductGrid';

const FurniturePage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    priceRange: { min: 0, max: 500000 },
    discount: [] as number[],
  });

  // ⚠️ CHANGE THIS: Update category name
  const CATEGORY_NAME = 'YOUR_CATEGORY'; // e.g., 'Living', 'Bedroom', 'Dining'
  
  // Get all products from centralized data
  const allProducts = getProductsByCategory(CATEGORY_NAME);
  
  // ⚠️ CHANGE THIS: Update sub-categories
  const categories = [
    { id: 'all', name: `All ${CATEGORY_NAME}`, image: '/images/CATEGORY/IMAGE.jpg' },
    { id: 'Type 1', name: 'Type 1', image: '/images/CATEGORY/IMAGE.jpg' },
    { id: 'Type 2', name: 'Type 2', image: '/images/CATEGORY/IMAGE.jpg' },
    // Add more categories...
  ];

  // ⚠️ CHANGE THIS: Update page title and description
  const PAGE_TITLE = `${CATEGORY_NAME} Collection`;
  const PAGE_DESCRIPTION = `Explore our curated ${CATEGORY_NAME.toLowerCase()} collection`;

  // Filter products based on selected category and filters
  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    // Filter by sub-category (type)
    if (selectedCategory && selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.type === selectedCategory);
    }

    // Filter by price range
    filtered = filtered.filter(
      p => p.price >= filters.priceRange.min && p.price <= filters.priceRange.max
    );

    // Filter by discount
    if (filters.discount.length > 0) {
      filtered = filtered.filter(p => {
        if (!p.discount) return false;
        const discountValue = parseInt(p.discount);
        return filters.discount.includes(discountValue);
      });
    }

    return filtered;
  }, [allProducts, selectedCategory, filters]);

  const handleScroll = (direction: 'left' | 'right') => {
    const container = document.getElementById('category-scroll');
    if (container) {
      const scrollAmount = 300;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId === 'all' ? null : categoryId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <SectionHeader
            title={PAGE_TITLE}
            description={PAGE_DESCRIPTION}
            badge="Premium Furniture"
          />
        </div>
      </div>

      {/* Category Carousel */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="relative">
            <button
              onClick={() => handleScroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div
              id="category-scroll"
              className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex-shrink-0 w-32 text-center ${
                    (selectedCategory === category.id || (category.id === 'all' && !selectedCategory))
                      ? 'ring-2 ring-orange-500'
                      : ''
                  }`}
                >
                  <div className="relative aspect-square rounded-lg overflow-hidden mb-2">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      sizes="128px"
                      className="object-cover"
                    />
                  </div>
                  <p className="text-sm font-medium text-gray-900">{category.name}</p>
                </motion.button>
              ))}
            </div>

            <button
              onClick={() => handleScroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg p-6 sticky top-32">
              <h3 className="text-lg font-semibold mb-4">Filters</h3>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.priceRange.min}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        priceRange: { ...filters.priceRange, min: Number(e.target.value) },
                      })
                    }
                    className="w-full px-3 py-2 border rounded-md text-sm"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.priceRange.max}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        priceRange: { ...filters.priceRange, max: Number(e.target.value) },
                      })
                    }
                    className="w-full px-3 py-2 border rounded-md text-sm"
                  />
                </div>
              </div>

              {/* Discount Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Discount
                </label>
                <div className="space-y-2">
                  {[10, 15, 20, 25, 30].map((discount) => (
                    <label key={discount} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.discount.includes(discount)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFilters({
                              ...filters,
                              discount: [...filters.discount, discount],
                            });
                          } else {
                            setFilters({
                              ...filters,
                              discount: filters.discount.filter((d) => d !== discount),
                            });
                          }
                        }}
                        className="rounded text-orange-500 focus:ring-orange-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{discount}% or more</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() =>
                  setFilters({
                    priceRange: { min: 0, max: 500000 },
                    discount: [],
                  })
                }
                className="w-full px-4 py-2 text-sm text-orange-600 hover:text-orange-700 font-medium"
              >
                Clear All Filters
              </button>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <ProductGrid
              products={filteredProducts}
              emptyMessage={
                selectedCategory
                  ? `No products found in ${selectedCategory}`
                  : `No ${CATEGORY_NAME.toLowerCase()} products found`
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FurniturePage;
