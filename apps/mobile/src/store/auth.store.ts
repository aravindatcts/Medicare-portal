import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { secureStorage } from '../services/storage.service';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  userId: string | null;
  memberName: string | null;
  subscriberId: string | null;
  ssn: string | null;
  isAuthenticated: boolean;
  isHydrated: boolean;

  setTokens: (access: string, refresh: string) => void;
  setUser: (id: string, name: string, subscriberId?: string, ssn?: string) => void;
  logout: () => void;
  setHydrated: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      userId: null,
      memberName: null,
      subscriberId: null,
      ssn: null,
      isAuthenticated: false,
      isHydrated: false,

      setTokens: (access, refresh) =>
        set({ accessToken: access, refreshToken: refresh, isAuthenticated: true }),

      setUser: (id, name, subscriberId, ssn) => 
        set({ 
          userId: id, 
          memberName: name, 
          subscriberId: subscriberId || null, 
          ssn: ssn || null 
        }),

      logout: () =>
        set({
          accessToken: null,
          refreshToken: null,
          userId: null,
          memberName: null,
          subscriberId: null,
          ssn: null,
          isAuthenticated: false,
        }),

      setHydrated: () => set({ isHydrated: true }),
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => secureStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);
