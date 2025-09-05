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

interface AuthState {
  authTokens: AuthTokens | null;
  user: DecodedUser | null;
  isLoggedIn: boolean;
  loginUser: (username: string, password: string) => Promise<boolean>;
  refreshToken: () => Promise<void>;
  logoutUser: () => void;
}

const useAuthStore = create<AuthState>((set, get) => {
  // Load tokens from cookies
  const access = Cookies.get("access_token") || null;
  const refresh = Cookies.get("refresh_token") || null;
  const tokens = access && refresh ? { access, refresh } : null;

  console.log("[INIT] Loaded tokens from cookies:", { access, refresh });

  return {
    authTokens: tokens,
    user: access ? jwtDecode<DecodedUser>(access) : null,
    isLoggedIn: !!tokens,

    // Login
    loginUser: async (username, password) => {
      console.log("[LOGIN] Attempting login for:", username);

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const data: AuthTokens = await res.json();
        console.log("[LOGIN] API response tokens:", data);

        // Save tokens in cookies
        Cookies.set("access_token", data.access, { expires: 1 });
        Cookies.set("refresh_token", data.refresh, { expires: 7 });
        console.log("[LOGIN] Tokens saved to cookies");

        set({
          authTokens: data,
          user: jwtDecode<DecodedUser>(data.access),
          isLoggedIn: true,
        });

        console.log("[LOGIN] User decoded and stored:", jwtDecode(data.access));

        return true;
      }

      console.log("[LOGIN] Login failed");
      return false;
    },

    // Logout
    logoutUser: () => {
      console.log("[LOGOUT] Clearing cookies and state");
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");

      set({ authTokens: null, user: null, isLoggedIn: false });
    },

    // Refresh
    refreshToken: async () => {
      const { authTokens } = get();
      console.log("[REFRESH] Current tokens before refresh:", authTokens);

      if (!authTokens?.refresh) {
        console.log("[REFRESH] No refresh token found, logging out");
        get().logoutUser();
        return;
      }

      const res = await fetch("/api/auth/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: authTokens.refresh }),
      });

      if (res.ok) {
        const data: { access: string } = await res.json();
        console.log("[REFRESH] API response new access token:", data.access);

        const updatedTokens = { ...authTokens, access: data.access };

        Cookies.set("access_token", data.access, { expires: 1 });
        console.log("[REFRESH] Updated access_token in cookies");

        set({
          authTokens: updatedTokens,
          user: jwtDecode<DecodedUser>(data.access),
          isLoggedIn: true,
        });

        console.log("[REFRESH] Tokens updated in state");
      } else {
        console.log("[REFRESH] Refresh failed, logging out");
        get().logoutUser();
      }
    },
  };
});

// Auto-refresh every 59 minutes
if (typeof window !== "undefined") {
  setInterval(() => {
    console.log("[AUTO REFRESH] Running...");
    useAuthStore.getState().refreshToken();
  }, 59 * 60 * 1000);
}

export default useAuthStore;
