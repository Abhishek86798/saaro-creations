import { InteriorServicesClient } from '@/components/features/InteriorServicesClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Interior Design Services - The Design Talk | Saaro Creations',
  description: 'Get expert interior design assistance from our designers. Share your vision, space requirements, and style preferences for a personalized design consultation.',
  keywords: 'Interior Design Services, Design Consultation, Home Design, Space Planning, Interior Decorator Pune',
};

export default function InteriorServicesPage() {
  return <InteriorServicesClient />;
}
