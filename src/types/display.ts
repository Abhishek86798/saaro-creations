/**
 * Display types for transformed product data
 * These interfaces are used when displaying products in UI components
 * They transform the full Product type into simpler display formats
 */

/**
 * Standard display product for product cards and listings
 */
export interface DisplayProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount: number; // Always a number (percentage), 0 if no discount
  image: string; // Single image URL (first image from array)
  badge?: string;
  category?: string;
  type?: string;
}

/**
 * Extended display product with EMI information
 */
export interface DisplayProductWithEMI extends DisplayProduct {
  emi: number; // EMI starting price as number
  emiTerms?: string; // Optional EMI terms (e.g., "12 months")
}

/**
 * Display product with size information for furniture
 */
export interface DisplayFurnitureProduct extends DisplayProductWithEMI {
  size: string; // Size derived from dimensions or type
}

/**
 * Display product for new launch page
 */
export interface DisplayNewProduct extends DisplayProductWithEMI {
  status: string; // Product status (Made To Order, NEW, etc.)
}

/**
 * Utility type for product transformation errors
 */
export interface ProductTransformError {
  productId: string;
  error: string;
}
