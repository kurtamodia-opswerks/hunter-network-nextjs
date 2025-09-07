// src/store/useHunterStore.ts
import { create } from "zustand";
import { Hunter, RegisterHunterData, UpdateHunterData } from "@/types/hunter";
import * as api from "@/lib/api";

interface HunterStoreActions {
  registerHunter: (data: RegisterHunterData) => Promise<void>;
  updateHunter: (id: number, data: UpdateHunterData) => Promise<void>;
  deleteHunter: (id: number) => Promise<void>;
  getHunters: () => Promise<void>;
  getHunter: (id: number) => Promise<void>;
  setHunter: (hunter: Hunter | null) => void;
}

interface HunterStoreState {
  hunters: Hunter[];
  hunter: Hunter | null;
  actions: HunterStoreActions;
}

const useHunterStore = create<HunterStoreState>((set, get) => ({
  hunters: [],
  hunter: null,
  actions: {
    getHunters: async () => {
      const hunters = await api.getHunters();
      set({ hunters });
    },

    getHunter: async (id: number) => {
      const hunter = await api.getHunter(id);
      set({ hunter });
    },

    registerHunter: async (data: RegisterHunterData) => {
      const newHunter = await api.registerHunter(data);
      set({ hunters: [...get().hunters, newHunter] });
    },

    updateHunter: async (id: number, data: UpdateHunterData) => {
      const updatedHunter = await api.updateHunter(id, data);
      set({
        hunters: get().hunters.map((h) => (h.id === id ? updatedHunter : h)),
        hunter: get().hunter?.id === id ? updatedHunter : get().hunter,
      });
    },

    deleteHunter: async (id: number) => {
      await api.deleteHunter(id); // make sure you add this to api.ts
      set({
        hunters: get().hunters.filter((h) => h.id !== id),
        hunter: get().hunter?.id === id ? null : get().hunter,
      });
    },

    setHunter: (hunter: Hunter | null) => set({ hunter }),
  },
}));

export const useHunterActions = () => useHunterStore((state) => state.actions);
export const useHunterState = () => useHunterStore((state) => state);
