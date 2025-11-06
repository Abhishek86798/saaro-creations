import { StoresClient } from '@/components/features/StoresClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Store - Visit Saaro Furniture Studio in Pune | Saaro Creations',
  description: 'Visit our Pune furniture studio to experience premium craftsmanship firsthand. Hand-polished teakwood, elegant rattan, and contemporary designs await you.',
  keywords: 'Saaro Furniture Store, Pune Furniture Studio, Furniture Showroom Pune, Premium Furniture Store',
};

export default function StoresPage() {
  return <StoresClient />;
}
