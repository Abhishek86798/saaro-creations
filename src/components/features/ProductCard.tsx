"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';
import { DisplayProductWithEMI } from '@/types/display';
import { formatPrice, formatDiscount } from '@/lib/transforms';
import { useWishlistStore } from '@/store/wishlistStore';
import { useCartStore } from '@/store/cartStore';

type ProductCardProps = DisplayProductWithEMI;

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
  const hasDiscount = discount > 0 && originalPrice > price;
  const [imgSrc, setImgSrc] = useState<string>(image || '/images/avatar.png');
  
  const { toggleItem, isInWishlist } = useWishlistStore();
  const { addItem } = useCartStore();
  const inWishlist = isInWishlist(id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleItem({
      id,
      name,
      price,
      originalPrice,
      image: imgSrc,
      badge,
    });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id,
      name,
      price,
      originalPrice,
      image: imgSrc,
      badge,
    });
  };

  return (
    <Link href={`/product/${id}`} className="group block">
      <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
        <Image
          src={imgSrc}
          alt={name}
          fill
          onError={() => setImgSrc('/images/avatar.png')}
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button 
            className={`p-2 bg-white rounded-full shadow-sm hover:scale-110 transition-transform ${
              inWishlist ? 'text-red-500' : ''
            }`}
            aria-label={`Add ${name} to wishlist`}
            onClick={handleWishlistToggle}
          >
            <Heart className="h-5 w-5" fill={inWishlist ? 'currentColor' : 'none'} />
          </button>
          <button 
            className="p-2 bg-white rounded-full shadow-sm hover:scale-110 transition-transform hover:bg-orange-50"
            aria-label={`Add ${name} to cart`}
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
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
          <span className="text-lg font-semibold">₹{formatPrice(price)}</span>
          {hasDiscount && (
            <>
              <span className="ml-2 text-sm line-through text-gray-400">
                ₹{formatPrice(originalPrice)}
              </span>
              <span className="ml-2 text-sm text-orange-500">{formatDiscount(discount)}</span>
            </>
          )}
        </div>
        {emi > 0 && (
          <p className="text-sm text-gray-500">
            EMI from ₹{formatPrice(Math.round(emi))}/month
          </p>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;