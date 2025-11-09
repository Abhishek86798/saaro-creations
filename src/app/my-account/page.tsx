import React, { Suspense } from 'react';
import MyAccountClient from '@/components/features/MyAccountClient';

export const metadata = {
  title: 'My Account | Saaro Creations',
  description: 'Manage your account, orders, wishlist, and addresses',
};

// Mark page as dynamic since we use searchParams
export const dynamic = 'force-dynamic';

export default function MyAccountPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <MyAccountClient />
    </Suspense>
  );
}
