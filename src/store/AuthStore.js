import { create } from "zustand";

export const useAuthStore = create((set) => ({
  authUser: null,    // Stores admin or user info
  token: null,

  login: (user, token) =>
    set({ authUser: user, token }),

  logout: () =>
    set({ authUser: null, token: null }),
}));
