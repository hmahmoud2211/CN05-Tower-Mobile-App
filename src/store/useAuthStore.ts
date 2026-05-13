import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  login: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: () => set({ isAuthenticated: true, user: { name: 'Engineer', role: 'System Operator' } }),
  logout: () => set({ isAuthenticated: false, user: null }),
}));
