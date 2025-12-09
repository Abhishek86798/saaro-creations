import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  email: string;
  name: string;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  getUser: () => User | null;
  initialize: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isInitialized: false,
      
      login: async (email: string, password: string) => {
        // Dummy authentication
        if (email === 'admin123@gmail.com' && password === 'admin123') {
          const user = {
            email: 'admin123@gmail.com',
            name: 'Abhishek Kokadwar',
          };
          set({ user, isAuthenticated: true });
          return true;
        }
        return false;
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      
      getUser: () => {
        return get().user;
      },

      initialize: () => {
        const state = get();
        // On first initialization, ensure user is logged out
        if (!state.isInitialized) {
          set({ 
            user: null, 
            isAuthenticated: false,
            isInitialized: true 
          });
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
