import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

interface AuthTokens {
  access: string;
  refresh: string;
}

interface DecodedUser {
  token_type: string;
  exp: number;
  iat: number;
  user_id: number;
  username: string;
  is_admin: boolean;
  is_leader: boolean;
}

interface AuthActions {
  loginUser: (username: string, password: string) => Promise<boolean>;
  refreshToken: () => Promise<void>;
  logoutUser: () => void;
  initializeUser: () => Promise<void>;
}

interface AuthState {
  authTokens: AuthTokens | null;
  user: DecodedUser | null;
  isLoggedIn: boolean;
  actions: AuthActions;
}

const useAuthStore = create<AuthState>((set, get) => ({
  authTokens: null,
  user: null,
  isLoggedIn: false,

  actions: {
    // Call this on store init to get user from server-side cookies
    initializeUser: async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) return;

        const user: DecodedUser = await res.json();
        set({ user, isLoggedIn: true });
      } catch (err) {
        console.error("Failed to initialize user:", err);
      }
    },

    loginUser: async (username, password) => {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const data: AuthTokens = await res.json();
        set({
          authTokens: data,
          user: jwtDecode<DecodedUser>(data.access),
          isLoggedIn: true,
        });
        return true;
      }

      return false;
    },

    logoutUser: async () => {
      await fetch("/api/auth/logout", { method: "POST" });

      set({ authTokens: null, user: null, isLoggedIn: false });
    },

    refreshToken: async () => {
      const { authTokens, actions } = get();
      if (!authTokens?.refresh) {
        actions.logoutUser();
        return;
      }

      const res = await fetch("/api/auth/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: authTokens.refresh }),
      });

      if (res.ok) {
        const data: { access: string } = await res.json();
        const updatedTokens = { ...authTokens, access: data.access };
        set({
          authTokens: updatedTokens,
          user: jwtDecode<DecodedUser>(data.access),
          isLoggedIn: true,
        });
      } else {
        actions.logoutUser();
      }
    },
  },
}));

// Auto-refresh every 59 minutes
if (typeof window !== "undefined") {
  setInterval(() => {
    useAuthStore.getState().actions.refreshToken();
  }, 59 * 60 * 1000);

  // Initialize user on client-side load
  useAuthStore.getState().actions.initializeUser();
}

export const useAuthActions = () => useAuthStore((state) => state.actions);
export const useAuthState = () => useAuthStore((state) => state);
