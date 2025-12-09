'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';

/**
 * AuthInitializer component ensures users are logged out on their first visit.
 * This component runs on every page load to initialize the auth state properly.
 */
export default function AuthInitializer() {
  useEffect(() => {
    // Check if this is a fresh browser session
    const sessionFlag = sessionStorage.getItem('auth-session-initialized');
    
    if (!sessionFlag) {
      // First visit in this browser session - force logout
      const { logout } = useAuthStore.getState();
      logout();
      
      // Mark session as initialized
      sessionStorage.setItem('auth-session-initialized', 'true');
    }
  }, []);

  return null;
}
