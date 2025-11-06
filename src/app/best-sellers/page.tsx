import { BestSellersClient } from '@/components/features/BestSellersClient';
import { getBestSellerProducts } from '@/lib/products';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Sellers - Top Rated Furniture | Saaro Creations',
  description: 'Discover our most popular furniture pieces loved by customers. Browse best-selling sofas, chairs, tables, and more.',
  keywords: 'Best Selling Furniture, Popular Furniture, Top Rated Furniture, Customer Favorites',
};

export default async function BestSellersPage() {
  const products = await getBestSellerProducts();

  return <BestSellersClient products={products} />;
}
