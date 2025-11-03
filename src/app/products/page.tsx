import React from 'react';
import ProductCard from '@/components/features/ProductCard';
import { getAllProducts } from '@/lib/products';
import { toDisplayProductWithEMI } from '@/lib/transforms';

export default async function ProductsPage() {
  const allProducts = await getAllProducts();
  const products = allProducts.map(toDisplayProductWithEMI);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-8">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}