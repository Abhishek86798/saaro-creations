import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  email: string;
  name: string;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  getUser: () => User | null;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      
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
    }),
    {
      name: 'auth-storage',
    }
  )
);
