// src/store/useGuildStore.ts
import { create } from "zustand";
import { Guild, CreateGuildData, UpdateGuildData } from "@/types/guild";
import * as api from "@/lib/api";

interface GuildStoreState {
  guilds: Guild[];
  guild: Guild | null;
  actions: GuildStoreActions;
}
interface GuildStoreActions {
  getGuilds: (params?: { search?: string; ordering?: string }) => Promise<void>;
  getGuild: (id: number) => Promise<void>;
  createGuild: (data: CreateGuildData) => Promise<void>;
  updateGuild: (id: number, data: UpdateGuildData) => Promise<void>;
  deleteGuild: (id: number) => Promise<void>;
  setGuild: (guild: Guild | null) => void;
}

const useGuildStore = create<GuildStoreState>((set, get) => ({
  guilds: [],
  guild: null,
  actions: {
    getGuilds: async (params = {}) => {
      const guilds = await api.getGuilds(params);
      set({ guilds });
    },

    getGuild: async (id: number) => {
      const guild = await api.getGuild(id);
      set({ guild });
    },

    createGuild: async (data: CreateGuildData) => {
      const newGuild = await api.createGuild(data);
      set({ guilds: [...get().guilds, newGuild] });
    },

    updateGuild: async (id: number, data: UpdateGuildData) => {
      const updatedGuild = await api.updateGuild(id, data);
      set({
        guilds: get().guilds.map((g) => (g.id === id ? updatedGuild : g)),
        guild: get().guild?.id === id ? updatedGuild : get().guild,
      });
    },

    deleteGuild: async (id: number) => {
      await api.deleteGuild(id);
      set({
        guilds: get().guilds.filter((g) => g.id !== id),
        guild: get().guild?.id === id ? null : get().guild,
      });
    },

    setGuild: (guild: Guild | null) => set({ guild }),
  },
}));

export const useGuildActions = () => useGuildStore((state) => state.actions);
export const useGuildState = () => useGuildStore((state) => state);
