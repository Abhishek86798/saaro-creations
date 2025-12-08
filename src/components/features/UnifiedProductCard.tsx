'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Product } from '@/types/product';
import { useWishlistStore } from '@/store/wishlistStore';
import { useCartStore } from '@/store/cartStore';
import { toast } from '@/components/ui/toaster';

interface UnifiedProductCardProps {
  product: Product;
  index?: number;
}

export const UnifiedProductCard: React.FC<UnifiedProductCardProps> = ({ product, index = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [heartAnimation, setHeartAnimation] = useState(false);
  
  const { toggleItem, isInWishlist } = useWishlistStore();
  const { addItem } = useCartStore();
  const inWishlist = isInWishlist(product.id);

  // Get primary image
  const primaryImage = product.images?.[0]?.url || '/images/placeholder.jpg';
  const hoverImage = product.images?.[1]?.url || primaryImage;

  // Calculate discount percentage if needed
  const discountPercent = product.discount 
    ? parseInt(product.discount) 
    : product.originalPrice 
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const wasAdded = toggleItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: primaryImage,
      badge: product.badge,
    });

    // Trigger heart animation
    setHeartAnimation(true);
    setTimeout(() => setHeartAnimation(false), 600);

    if (!wasAdded) {
      toast.success('Removed from wishlist');
    } else {
      toast.success(`Added "${product.name}" to wishlist`);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: primaryImage,
      badge: product.badge,
    });

    toast.success(`Added "${product.name}" to cart`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN').format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.slug || product.id}`} className="group block">
        <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
          {/* Product Image */}
          <Image
            src={imageError ? '/images/placeholder.jpg' : (isHovered ? hoverImage : primaryImage)}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            onError={() => setImageError(true)}
            className="object-cover transition-transform duration-500"
            style={{
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            }}
          />

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute top-4 right-4 flex flex-col gap-2"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              animate={heartAnimation ? {
                scale: [1, 1.3, 1],
                rotate: [0, -10, 10, -10, 0]
              } : {}}
              transition={{ duration: 0.6 }}
              type="button"
              className={`p-2 bg-white rounded-full shadow-lg transition-all duration-300 ${
                inWishlist 
                  ? 'text-red-500 ring-2 ring-red-500 ring-opacity-50' 
                  : 'text-gray-700 hover:text-red-500'
              }`}
              aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
              title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
              onClick={handleWishlistToggle}
            >
              <Heart 
                className={`h-5 w-5 transition-all duration-300 ${
                  heartAnimation ? 'scale-110' : ''
                }`} 
                fill={inWishlist ? 'currentColor' : 'none'}
                strokeWidth={inWishlist ? 0 : 2}
              />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="button"
              className="p-2 bg-white text-gray-700 rounded-full shadow-lg hover:bg-orange-50 hover:text-orange-500 transition-colors"
              aria-label="Add to cart"
              title="Add to cart"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-5 w-5" />
            </motion.button>
          </motion.div>

          {/* Badges */}
          {(product.badge || product.isNew) && (
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.isNew && (
                <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 text-xs font-medium rounded">
                  NEW
                </span>
              )}
              {product.badge && !product.isNew && (
                <span className="bg-black/80 text-white px-3 py-1 text-xs font-medium rounded">
                  {product.badge}
                </span>
              )}
            </div>
          )}

          {/* Discount Badge */}
          {discountPercent > 0 && (
            <span className="absolute bottom-4 right-4 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Product Info */}
        <div className="mt-4 space-y-2">
          <h3 className="font-medium text-gray-900 group-hover:text-orange-500 transition-colors line-clamp-2 min-h-[3rem]">
            {product.name}
          </h3>
          
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-lg font-semibold text-gray-900">
              ₹{formatPrice(product.price)}
            </span>
            
            {product.originalPrice && product.originalPrice > product.price && (
              <>
                <span className="text-sm line-through text-gray-400">
                  ₹{formatPrice(product.originalPrice)}
                </span>
                <span className="text-sm font-medium text-green-600">
                  Save ₹{formatPrice(product.originalPrice - product.price)}
                </span>
              </>
            )}
          </div>

          {product.emi && (
            <p className="text-sm text-gray-600">
              or EMI from ₹{formatPrice(product.emi.startingPrice)}/month
            </p>
          )}

          {product.type && (
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              {product.type}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
};
