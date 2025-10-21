// User types
export interface User {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  image?: string;
  role: 'CUSTOMER' | 'ADMIN' | 'MODERATOR';
  createdAt: Date;
  updatedAt: Date;
}

// Product types
export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  comparePrice?: number;
  sku?: string;
  featured: boolean;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  categoryId: string;
  category: Category;
  collectionId?: string;
  collection?: Collection;
  images: ProductImage[];
  variants: ProductVariant[];
  reviews: Review[];
}

export interface ProductImage {
  id: string;
  url: string;
  altText?: string;
  position: number;
  productId: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  value: string;
  price?: number;
  stock: number;
  sku?: string;
  productId: string;
}

// Category types
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  parent?: Category;
  children: Category[];
}

// Collection types
export interface Collection {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  featured: boolean;
}

// Cart types
export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  variantId?: string;
  variant?: ProductVariant;
}

export interface Cart {
  items: CartItem[];
  total: number;
  subtotal: number;
  shipping: number;
  tax: number;
}

// Order types
export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user: User;
  shippingAddress: Address;
  items: OrderItem[];
  payment?: Payment;
}

export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED';

export interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  orderId: string;
  productId: string;
  product: Product;
}

// Address types
export interface Address {
  id: string;
  name: string;
  phone: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  userId: string;
}

// Payment types
export interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  provider: string;
  transactionId?: string;
  createdAt: Date;
  orderId: string;
}

export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';

// Review types
export interface Review {
  id: string;
  rating: number;
  comment?: string;
  createdAt: Date;
  userId: string;
  user: User;
  productId: string;
  product: Product;
}

// Wishlist types
export interface WishlistItem {
  id: string;
  createdAt: Date;
  userId: string;
  user: User;
  productId: string;
  product: Product;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Form types
export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface NewsletterForm {
  email: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Navigation types
export interface NavItem {
  title: string;
  href: string;
  children?: NavItem[];
}

// Search types
export interface SearchFilters {
  category?: string;
  collection?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  featured?: boolean;
  sortBy?: 'price' | 'name' | 'created' | 'popularity';
  sortOrder?: 'asc' | 'desc';
}

export interface SearchResults {
  products: Product[];
  categories: Category[];
  collections: Collection[];
  total: number;
}