'use client';

import { Suspense } from 'react';
import ProductDetail from '@/components/features/ProductDetail';
import type { Product, SimilarProduct } from '@/lib/products';

function LoadingFallback() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Loading...</h1>
        <p className="mt-4 text-gray-600">Please wait while we load the product details</p>
      </div>
    </div>
  );
}

interface ProductClientProps {
  product: Product;
  similarProducts: SimilarProduct[];
}

export function ProductClient({ product, similarProducts }: ProductClientProps) {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ProductDetail product={product} similarProducts={similarProducts} />
    </Suspense>
  );
}