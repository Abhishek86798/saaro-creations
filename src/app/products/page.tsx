'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: string;
  image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, originalPrice, discount, image }) => {
  return (
    <Link href={`/product/${id}`} className="group">
      <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button 
          className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-sm hover:scale-110 transition-transform"
          aria-label={`Add ${name} to wishlist`}
        >
          <Heart className="h-5 w-5" />
        </button>
      </div>
      <div className="mt-4 space-y-1">
        <h3 className="font-medium group-hover:text-orange-500 transition-colors">{name}</h3>
        <div>
          <span className="text-lg font-semibold">₹{price.toLocaleString()}</span>
          <span className="ml-2 text-sm line-through text-gray-400">
            ₹{originalPrice.toLocaleString()}
          </span>
          <span className="ml-2 text-sm text-orange-500">{discount}</span>
        </div>
      </div>
    </Link>
  );
};

export default function ProductsPage() {
  const products = [
    {
      id: 'flair-chair-vintage',
      name: 'Flair Chair - Vintage Light Brown',
      price: 36750,
      originalPrice: 49000,
      discount: '25%OFF',
      image: '/images/products/flair-chair-1.jpg'
    },
    {
      id: 'daksh-armchair',
      name: 'Daksh Armchair',
      price: 38800,
      originalPrice: 48500,
      discount: '20%OFF',
      image: '/images/products/daksh-chair-1.jpg'
    }
  ];

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