import { create } from "zustand";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

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

// Actions interface
interface AuthActions {
  loginUser: (username: string, password: string) => Promise<boolean>;
  refreshToken: () => Promise<void>;
  logoutUser: () => void;
}

interface AuthState {
  authTokens: AuthTokens | null;
  user: DecodedUser | null;
  isLoggedIn: boolean;
  actions: AuthActions;
}

const useAuthStore = create<AuthState>((set, get) => {
  const access = Cookies.get("access_token") || null;
  const refresh = Cookies.get("refresh_token") || null;
  const tokens = access && refresh ? { access, refresh } : null;

  return {
    authTokens: tokens,
    user: access ? jwtDecode<DecodedUser>(access) : null,
    isLoggedIn: !!tokens,

    actions: {
      loginUser: async (username, password) => {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        if (res.ok) {
          const data: AuthTokens = await res.json();
          Cookies.set("access_token", data.access, { expires: 1 });
          Cookies.set("refresh_token", data.refresh, { expires: 7 });

          set({
            authTokens: data,
            user: jwtDecode<DecodedUser>(data.access),
            isLoggedIn: true,
          });

          return true;
        }

        return false;
      },

      logoutUser: () => {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");

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
          Cookies.set("access_token", data.access, { expires: 1 });

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
  };
});

// Auto-refresh every 59 minutes
if (typeof window !== "undefined") {
  setInterval(() => {
    useAuthStore.getState().actions.refreshToken();
  }, 59 * 60 * 1000);
}

// Export individual actions as functions
export const useAuthActions = () => useAuthStore((state) => state.actions);
export const useAuthState = () => useAuthStore((state) => state);
