'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ProductCard from '@/components/features/ProductCard';
import { getAllProducts } from '@/lib/products';
import { toDisplayProductWithEMI } from '@/lib/transforms';
import { DisplayProductWithEMI } from '@/types/display';

export default function LightingsPage() {
  const [products, setProducts] = useState<DisplayProductWithEMI[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<DisplayProductWithEMI[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    const loadProducts = async () => {
      const allProducts = await getAllProducts();
      const lightingProducts = allProducts.filter(p => 
        p.category === 'Lighting' || 
        p.type?.includes('Lamp') || 
        p.type?.includes('Light')
      );
      const displayProducts = lightingProducts.map(toDisplayProductWithEMI);
      setProducts(displayProducts);
      setFilteredProducts(displayProducts);
    };
    loadProducts();
  }, []);

  useEffect(() => {
    let filtered = products;
    
    if (selectedCategory !== 'All') {
      filtered = products.filter(p => p.type === selectedCategory);
    }

    if (sortBy === 'price-low') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'discount') {
      filtered = [...filtered].sort((a, b) => (b.discount || 0) - (a.discount || 0));
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, sortBy, products]);

  const categories = ['All', 'Table Lamps', 'Floor Lamps', 'Pendant Lights', 'Ceiling Lights'];

  return (
    <div className="min-h-screen bg-white">
      <section className="relative h-[400px] bg-neutral-100">
        <Image
          src="/images/lightings/Lightings-hero.jpg"
          alt="Lighting Collection"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-serif font-bold mb-4">Lighting</h1>
            <p className="text-xl">Illuminate your space with style</p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 mb-8 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === category
                      ? 'bg-amber-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border rounded-lg bg-white"
              aria-label="Sort products by"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="discount">Highest Discount</option>
            </select>
          </div>

          <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredProducts.length} products
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found.</p>
              <button
                onClick={() => setSelectedCategory('All')}
                className="mt-4 px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
