'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CategoryItem {
  id: string | number;
  name: string;
  image: string;
  href?: string;
}

interface CategoryCarouselProps {
  categories: CategoryItem[];
  selectedCategory?: string | null;
  onCategoryChange?: (categoryId: string) => void;
  isClickable?: boolean;
}

export function CategoryCarousel({
  categories,
  selectedCategory = null,
  onCategoryChange,
  isClickable = true,
}: CategoryCarouselProps) {
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

  const CardContent = ({ category }: { category: CategoryItem }) => (
    <div
      className={`flex items-center gap-2.5 min-w-[140px] max-w-[140px] p-2.5 border rounded-xl transition-all bg-white ${
        String(selectedCategory) === String(category.id) || (category.id === 'all' && !selectedCategory)
          ? 'border-orange-400 shadow-sm'
          : 'border-gray-200 hover:border-orange-300'
      }`}
    >
      <div className="flex-1 min-w-0">
        <span
          className={`text-xs font-medium transition-colors line-clamp-2 leading-tight ${
            String(selectedCategory) === String(category.id) || (category.id === 'all' && !selectedCategory)
              ? 'text-orange-500'
              : 'text-gray-700 group-hover:text-orange-500'
          }`}
        >
          {category.name}
        </span>
      </div>
      <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
        <Image
          src={category.image}
          alt={category.name}
          fill
          sizes="48px"
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
    </div>
  );

  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 relative">
        {/* Left Arrow */}
        <button
          onClick={() => handleScroll('left')}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:shadow-lg transition-shadow border border-gray-200"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-5 w-5 text-gray-600" />
        </button>

        {/* Scrollable Container */}
        <div
          id="category-scroll"
          className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth px-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {categories.map((category) => {
            if (isClickable && category.href) {
              return (
                <Link
                  key={category.id}
                  href={category.href}
                  className="flex-shrink-0 group"
                >
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <CardContent category={category} />
                  </motion.div>
                </Link>
              );
            }

            return (
              <motion.button
                key={category.id}
                onClick={() => onCategoryChange?.(String(category.id))}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-shrink-0 group"
              >
                <CardContent category={category} />
              </motion.button>
            );
          })}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => handleScroll('right')}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:shadow-lg transition-shadow border border-gray-200"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-5 w-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
}
