import { useEffect, useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';

/**
 * Hook to safely handle Zustand store hydration in Next.js
 * Prevents hydration mismatches and ensures stores are loaded from localStorage
 */
export const useHydration = () => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Manually trigger hydration for both stores
    const unsubCart = useCartStore.persist.onFinishHydration(() => {
      useCartStore.getState().setHasHydrated(true);
    });
    
    const unsubWishlist = useWishlistStore.persist.onFinishHydration(() => {
      useWishlistStore.getState().setHasHydrated(true);
    });

    // Rehydrate stores
    useCartStore.persist.rehydrate();
    useWishlistStore.persist.rehydrate();

    setHydrated(true);

    return () => {
      unsubCart();
      unsubWishlist();
    };
  }, []);

  return hydrated;
};

/**
 * Hook to safely get cart count (hydration-safe)
 */
export const useCartCount = () => {
  const [mounted, setMounted] = useState(false);
  const count = useCartStore((state) => state.getItemCount());

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? count : 0;
};

/**
 * Hook to safely get wishlist count (hydration-safe)
 */
export const useWishlistCount = () => {
  const [mounted, setMounted] = useState(false);
  const count = useWishlistStore((state) => state.getItemCount());

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? count : 0;
};
