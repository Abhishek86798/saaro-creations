import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
  addedAt: number;
}

interface WishlistStore {
  items: WishlistItem[];
  _hasHydrated: boolean;
  
  // Actions
  addItem: (item: Omit<WishlistItem, 'addedAt'>) => void;
  removeItem: (id: string) => void;
  toggleItem: (item: Omit<WishlistItem, 'addedAt'>) => boolean;
  clearWishlist: () => void;
  isInWishlist: (id: string) => boolean;
  setHasHydrated: (state: boolean) => void;
  
  // Computed
  getItemCount: () => number;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      _hasHydrated: false,

      addItem: (item) => {
        const items = get().items;
        const exists = items.find((i) => i.id === item.id);

        if (!exists) {
          set({
            items: [...items, { ...item, addedAt: Date.now() }],
          });
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
      },

      toggleItem: (item) => {
        const isInWishlist = get().isInWishlist(item.id);
        
        if (isInWishlist) {
          get().removeItem(item.id);
          return false;
        } else {
          get().addItem(item);
          return true;
        }
      },

      clearWishlist: () => {
        set({ items: [] });
      },

      isInWishlist: (id) => {
        return get().items.some((item) => item.id === id);
      },

      getItemCount: () => {
        return get().items.length;
      },

      setHasHydrated: (state) => {
        set({ _hasHydrated: state });
      },
    }),
    {
      name: 'saaro-wishlist-storage',
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
