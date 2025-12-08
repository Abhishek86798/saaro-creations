'use client';

import React from 'react';

interface ProductToolbarProps {
  resultCount: number;
  sortValue: string;
  onSortChange: (value: string) => void;
  onFilterToggle?: () => void;
  showFilterToggle?: boolean;
}

export function ProductToolbar({
  resultCount,
  sortValue,
  onSortChange,
  onFilterToggle,
  showFilterToggle = false,
}: ProductToolbarProps) {
  return (
    <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
      <div className="flex items-center gap-4">
        {showFilterToggle && (
          <button
            onClick={onFilterToggle}
            className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
          </button>
        )}
        <p className="text-sm text-gray-600">
          Showing <span className="font-medium text-gray-900">{resultCount}</span> products
        </p>
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="sort-select" className="text-sm text-gray-600">
          Sort by:
        </label>
        <select
          id="sort-select"
          value={sortValue}
          onChange={(e) => onSortChange(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        >
          <option value="featured">Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="discount">Highest Discount</option>
          <option value="newest">Newest</option>
        </select>
      </div>
    </div>
  );
}
