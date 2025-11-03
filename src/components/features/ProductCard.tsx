'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice: number | null;
  discount: number;
  image: string;
  badge?: string;
  emi?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  originalPrice,
  discount,
  image,
  badge,
  emi
}) => {
  return (
    <Link href={`/product/${id}`} className="group block">
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
        {badge && (
          <span className="absolute top-4 left-4 bg-black/80 text-white px-3 py-1 text-xs rounded">
            {badge}
          </span>
        )}
      </div>
      <div className="mt-4 space-y-1">
        <h3 className="font-medium group-hover:text-orange-500 transition-colors line-clamp-2">
          {name}
        </h3>
        <div>
          <span className="text-lg font-semibold">₹{price.toLocaleString()}</span>
          {originalPrice && (
            <>
              <span className="ml-2 text-sm line-through text-gray-400">
                ₹{originalPrice.toLocaleString()}
              </span>
              <span className="ml-2 text-sm text-orange-500">{discount}% OFF</span>
            </>
          )}
        </div>
        {emi && (
          <p className="text-sm text-gray-500">
            EMI from ₹{Math.round(emi).toLocaleString()}/month
          </p>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;