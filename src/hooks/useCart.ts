import { useEffect, useState } from 'react';
import { CartItem } from '@/store/cart';

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    // Only import and use the store on the client
    if (typeof window !== 'undefined') {
      import('@/store/cart').then(({ useCartStore }) => {
        // Subscribe to store changes
        const unsubscribe = useCartStore.subscribe((state) => {
          setItems(state.items);
        });
        
        // Set initial state
        setItems(useCartStore.getState().items);
        
        return () => unsubscribe();
      });
    }
  }, []);

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    if (typeof window !== 'undefined') {
      import('@/store/cart').then(({ useCartStore }) => {
        useCartStore.getState().addItem(item);
      });
    }
  };

  const removeItem = (id: string | number) => {
    if (typeof window !== 'undefined') {
      import('@/store/cart').then(({ useCartStore }) => {
        useCartStore.getState().removeItem(id);
      });
    }
  };

  const updateQuantity = (id: string | number, quantity: number) => {
    if (typeof window !== 'undefined') {
      import('@/store/cart').then(({ useCartStore }) => {
        useCartStore.getState().updateQuantity(id, quantity);
      });
    }
  };

  const clearCart = () => {
    if (typeof window !== 'undefined') {
      import('@/store/cart').then(({ useCartStore }) => {
        useCartStore.getState().clearCart();
      });
    }
  };

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };
}
