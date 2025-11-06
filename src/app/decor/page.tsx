import { AccentsClient } from '@/components/features/AccentsClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Decor - Premium Home Accessories | Saaro Creations',
  description: 'Browse our curated collection of decor pieces including lamps, pendant lights, pots, candles, and decorative items to elevate your home.',
};

export default function DecorPage() {
  return <AccentsClient />;
}
