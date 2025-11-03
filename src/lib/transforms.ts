/**
 * Utility functions for transforming Product types to Display types
 * Ensures consistent data transformation across the application
 */

import { Product } from '@/types/product';
import {
  DisplayProduct,
  DisplayProductWithEMI,
  DisplayFurnitureProduct,
  DisplayNewProduct,
} from '@/types/display';

/**
 * Transform Product to basic DisplayProduct
 */
export function toDisplayProduct(product: Product): DisplayProduct {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    originalPrice: product.originalPrice,
    discount: parseDiscount(product.discount),
    image: getFirstImage(product),
    badge: product.badge,
    category: product.category,
    type: product.type,
  };
}

/**
 * Transform Product to DisplayProductWithEMI
 */
export function toDisplayProductWithEMI(product: Product): DisplayProductWithEMI {
  return {
    ...toDisplayProduct(product),
    emi: product.emi?.startingPrice || 0,
    emiTerms: product.emi?.terms,
  };
}

/**
 * Transform Product to DisplayFurnitureProduct
 */
export function toDisplayFurnitureProduct(product: Product): DisplayFurnitureProduct {
  return {
    ...toDisplayProductWithEMI(product),
    size: getProductSize(product),
  };
}

/**
 * Transform Product to DisplayNewProduct
 */
export function toDisplayNewProduct(product: Product): DisplayNewProduct {
  return {
    ...toDisplayProductWithEMI(product),
    status: product.badge || 'Made To Order',
  };
}

/**
 * Parse discount to consistent number format
 * Handles: "15", 15, "15%", null, undefined
 * Returns: number (0-100)
 */
export function parseDiscount(discount: string | number | null | undefined): number {
  if (!discount) return 0;
  
  if (typeof discount === 'number') {
    return discount;
  }
  
  // Remove % sign if present and parse
  const cleaned = discount.replace('%', '').trim();
  const parsed = parseInt(cleaned, 10);
  
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Get first image URL from product
 * Returns placeholder if no images available
 */
export function getFirstImage(product: Product): string {
  if (product.images && product.images.length > 0 && product.images[0]?.url) {
    return product.images[0].url;
  }
  return '/images/placeholder.jpg';
}

/**
 * Get product size from dimensions or type
 * Returns human-readable size string
 */
export function getProductSize(product: Product): string {
  // Try to get from dimensions first
  if (product.dimensions?.width) {
    return product.dimensions.width;
  }
  
  // Try to extract from type (e.g., "8 feet")
  if (product.type) {
    const sizeMatch = product.type.match(/\d+\s*feet/i);
    if (sizeMatch) {
      return sizeMatch[0];
    }
  }
  
  // Default based on category or type
  if (product.type?.toLowerCase().includes('chair')) {
    return 'M';
  }
  
  return 'Standard';
}

/**
 * Format price to Indian locale (consistent server/client rendering)
 */
export function formatPrice(price: number): string {
  // Use consistent formatting to prevent hydration mismatch
  // Indian numbering: lakhs and crores separated by commas
  const priceStr = Math.round(price).toString();
  
  // Handle numbers > 999
  if (priceStr.length <= 3) {
    return priceStr;
  }
  
  // Last 3 digits
  const lastThree = priceStr.substring(priceStr.length - 3);
  const otherNumbers = priceStr.substring(0, priceStr.length - 3);
  
  // Add commas every 2 digits for Indian format
  const formatted = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + lastThree;
  
  return formatted;
}

/**
 * Format EMI display text
 */
export function formatEMI(emiPrice: number, terms: string = '12 months'): string {
  if (emiPrice === 0) return '';
  return `EMI from ₹${formatPrice(emiPrice)}/${terms}`;
}

/**
 * Calculate discount percentage if not provided
 */
export function calculateDiscount(price: number, originalPrice: number): number {
  if (price >= originalPrice) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

/**
 * Format discount for display
 */
export function formatDiscount(discount: number): string {
  if (discount === 0) return '';
  return `${discount}% OFF`;
}
