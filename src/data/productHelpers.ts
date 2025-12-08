import { Product } from '@/types/product';
import { products } from './products';

/**
 * Filter products by category
 */
export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(p => p.category === category);
};

/**
 * Filter products by category and type
 */
export const getProductsByType = (category: string, type: string): Product[] => {
  return products.filter(p => p.category === category && p.type === type);
};

/**
 * Get single product by ID or slug
 */
export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id || p.slug === id);
};

/**
 * Filter products with advanced criteria
 */
export interface ProductFilters {
  category?: string;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  discount?: boolean;
  isNew?: boolean;
  badge?: string;
}

export const filterProducts = (filters: ProductFilters): Product[] => {
  return products.filter(product => {
    if (filters.category && product.category !== filters.category) return false;
    if (filters.type && product.type !== filters.type) return false;
    if (filters.minPrice && product.price < filters.minPrice) return false;
    if (filters.maxPrice && product.price > filters.maxPrice) return false;
    if (filters.discount && !product.discount) return false;
    if (filters.isNew !== undefined && product.isNew !== filters.isNew) return false;
    if (filters.badge && product.badge !== filters.badge) return false;
    return true;
  });
};

/**
 * Sort products by various criteria
 */
export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'newest';

export const sortProducts = (products: Product[], sortBy: SortOption): Product[] => {
  const sorted = [...products];
  
  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case 'newest':
      return sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    case 'featured':
    default:
      return sorted;
  }
};

/**
 * Search products by name or description
 */
export const searchProducts = (query: string): Product[] => {
  const searchTerm = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.description?.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm) ||
    product.type?.toLowerCase().includes(searchTerm)
  );
};

/**
 * Get all unique categories
 */
export const getAllCategories = (): string[] => {
  return Array.from(new Set(products.map(p => p.category)));
};

/**
 * Get all unique types for a category
 */
export const getTypesByCategory = (category: string): string[] => {
  return Array.from(new Set(
    products
      .filter(p => p.category === category && p.type)
      .map(p => p.type!)
  ));
};

/**
 * Get price range for filtered products
 */
export const getPriceRange = (filteredProducts: Product[]): { min: number; max: number } => {
  if (filteredProducts.length === 0) return { min: 0, max: 0 };
  
  const prices = filteredProducts.map(p => p.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  };
};

/**
 * Get related products (same category, different ID)
 */
export const getRelatedProducts = (productId: string, limit: number = 4): Product[] => {
  const product = getProductById(productId);
  if (!product) return [];
  
  return products
    .filter(p => p.category === product.category && p.id !== productId)
    .slice(0, limit);
};
