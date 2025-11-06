import { ReadyToShipClient } from '@/components/features/ReadyToShipClient';
import { getReadyToShipProducts } from '@/lib/products';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ready to Ship - Immediate Delivery | Saaro Creations',
  description: 'Browse our Ready to Ship collection for immediate delivery. Premium furniture and decor pieces available for quick shipping.',
};

export default async function ReadyToShipPage() {
  const products = await getReadyToShipProducts();

  return <ReadyToShipClient products={products} />;
}
