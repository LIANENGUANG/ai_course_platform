import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../utils/types';
import { logout as logoutApi } from '../api/auth';

interface UserState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;

  // Actions
  setUser: (user: User) => void;
  setTokens: (access: string, refresh: string) => void;
  login: (user: User, access: string, refresh: string) => void;
  logout: () => Promise<void>;
  updateUser: (user: User) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isLoggedIn: false,

      setUser: (user) => set({ user }),

      setTokens: (access, refresh) => set({
        accessToken: access,
        refreshToken: refresh
      }),

      login: (user, access, refresh) => set({
        user,
        accessToken: access,
        refreshToken: refresh,
        isLoggedIn: true
      }),

      logout: async () => {
        const refreshToken = get().refreshToken;
        if (refreshToken) {
          try {
            await logoutApi(refreshToken);
          } catch (error) {
            // 即使 API 调用失败，也清除本地状态
            console.error('Logout API failed:', error);
          }
        }

        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isLoggedIn: false
        });
      },

      updateUser: (user) => set({ user }),
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isLoggedIn: state.isLoggedIn,
      }),
    }
  )
);
