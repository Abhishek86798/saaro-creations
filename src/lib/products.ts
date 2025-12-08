/**
 * Backward Compatibility Layer
 * 
 * This file maintains the old API while using the new centralized data structure.
 * All pages that import from '@/lib/products' will continue to work.
 */

import { Product } from '@/types/product';
import { products } from '@/data/products';
import {
  getProductById,
  getProductsByCategory as getByCategory,
  searchProducts as search,
  getRelatedProducts,
} from '@/data/productHelpers';

// Export products array
export { products };

// Get single product
export async function getProduct(productId: string): Promise<Product | undefined> {
  return getProductById(productId);
}

// Get similar products (uses related products helper)
export async function getSimilarProducts(
  category: string,
  currentProductId: string
): Promise<Product[]> {
  return getRelatedProducts(currentProductId, 4);
}

// Get products by category
export async function getProductsByCategory(category: string): Promise<Product[]> {
  return getByCategory(category);
}

// Get all products
export async function getAllProducts(): Promise<Product[]> {
  return products;
}

// Get new products
export async function getNewProducts(limit = 8): Promise<Product[]> {
  return products.filter((product) => product.isNew).slice(0, limit);
}

// Search products
export async function searchProducts(query: string): Promise<Product[]> {
  return search(query);
}

// Get outdoor products
export async function getOutdoorProducts(): Promise<Product[]> {
  return getByCategory('Outdoor');
}

// Get accents/decor products
export async function getAccentsProducts(): Promise<Product[]> {
  return getByCategory('Accents');
}

// Get ready to ship products
export async function getReadyToShipProducts(): Promise<Product[]> {
  return products.filter((product) => product.badge === 'READY TO SHIP');
}

// Get best seller products
export async function getBestSellerProducts(): Promise<Product[]> {
  // Return products marked as best sellers or popular products
  return products
    .filter(
      (product) =>
        product.badge === 'BEST SELLER' ||
        product.badge === 'TRENDING NOW' ||
        product.isNew
    )
    .slice(0, 100);
}
