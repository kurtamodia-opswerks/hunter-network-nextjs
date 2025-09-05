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

interface AuthState {
  authTokens: AuthTokens | null;
  user: DecodedUser | null;
  loginUser: (username: string, password: string) => Promise<boolean>;
  refreshToken: () => Promise<void>;
  logoutUser: () => void;
}

const useAuthStore = create<AuthState>((set, get) => ({
  authTokens:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("authTokens") || "null")
      : null,

  user:
    typeof window !== "undefined" && localStorage.getItem("authTokens")
      ? jwtDecode<DecodedUser>(
          JSON.parse(localStorage.getItem("authTokens") as string).access
        )
      : null,

  // Login
  loginUser: async (username, password) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      const data: AuthTokens = await res.json();
      localStorage.setItem("authTokens", JSON.stringify(data));
      set({
        authTokens: data,
        user: jwtDecode<DecodedUser>(data.access),
      });
      return true;
    }
    return false;
  },

  // Refresh
  refreshToken: async () => {
    const { authTokens } = get();
    if (!authTokens?.refresh) {
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
      const updatedTokens = { ...authTokens, access: data.access };
      localStorage.setItem("authTokens", JSON.stringify(updatedTokens));
      set({
        authTokens: updatedTokens,
        user: jwtDecode<DecodedUser>(data.access),
      });
    } else {
      get().logoutUser();
    }
  },

  // Logout
  logoutUser: () => {
    localStorage.removeItem("authTokens");
    set({ authTokens: null, user: null });
  },
}));

// auto-refresh every 59 min
if (typeof window !== "undefined") {
  setInterval(() => {
    useAuthStore.getState().refreshToken();
  }, 59 * 60 * 1000);
}

export default useAuthStore;
