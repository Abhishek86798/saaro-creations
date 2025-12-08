import React from 'react';

interface ProductCardSkeletonProps {
  count?: number;
}

export const ProductCardSkeleton: React.FC<ProductCardSkeletonProps> = ({ count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-lg overflow-hidden animate-pulse"
        >
          {/* Image skeleton */}
          <div className="aspect-square bg-gray-200" />
          
          {/* Content skeleton */}
          <div className="p-4 space-y-3">
            {/* Badge */}
            <div className="h-4 bg-gray-200 rounded w-24" />
            
            {/* Title */}
            <div className="h-5 bg-gray-200 rounded w-3/4" />
            
            {/* Price */}
            <div className="space-y-2">
              <div className="h-6 bg-gray-200 rounded w-32" />
              <div className="h-4 bg-gray-200 rounded w-40" />
            </div>
            
            {/* Button */}
            <div className="h-10 bg-gray-200 rounded" />
          </div>
        </div>
      ))}
    </>
  );
};

export const ProductGridSkeleton: React.FC<{ count?: number }> = ({ count = 12 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <ProductCardSkeleton count={count} />
    </div>
  );
};
