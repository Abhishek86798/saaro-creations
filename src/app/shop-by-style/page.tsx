import { ShopByStyleClient } from '@/components/features/ShopByStyleClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop by Style - Browse by Type or Room | Saaro Creations',
  description: 'Discover furniture organized by function, type, or room. Find the perfect pieces for your living room, bedroom, dining room, office, and more.',
};

export default function ShopByStylePage() {
  return <ShopByStyleClient />;
}
