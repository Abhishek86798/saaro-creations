'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Product } from '@/types/product';
import { UnifiedProductCard } from './UnifiedProductCard';
import { ProductGridSkeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { sortProducts, SortOption } from '@/data/productHelpers';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  showSort?: boolean;
  emptyMessage?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  loading = false,
  showSort = true,
  emptyMessage = 'No products found',
}) => {
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  const sortedProducts = useMemo(() => {
    return sortProducts(products, sortBy);
  }, [products, sortBy]);

  if (loading) {
    return <ProductGridSkeleton count={12} />;
  }

  if (products.length === 0) {
    return (
      <EmptyState
        title={emptyMessage}
        description="Try adjusting your filters or check back later for new arrivals."
        icon="search"
      />
    );
  }

  return (
    <div>
      {/* Sort Controls */}
      {showSort && (
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm text-gray-600">
            Showing {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'}
          </p>
          
          <div className="flex items-center gap-2">
            <label htmlFor="sort-select" className="text-sm text-gray-600">
              Sort by:
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              aria-label="Sort products by"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </div>
      )}

      {/* Product Grid */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.05,
            },
          },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {sortedProducts.map((product, index) => (
          <UnifiedProductCard key={product.id} product={product} index={index} />
        ))}
      </motion.div>
    </div>
  );
};
