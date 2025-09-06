// src/lib/types/hunter.ts

export interface RegisterHunterData {
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  rank: string;
}

export interface Hunter {
  id: number;
  full_name: string;
  email: string;
  rank: string;
  rank_display: string;
  guild_name?: string;
  power_level: number;
  raid_count: number;
}

export interface UpdateHunterData {
  email: string;
  guild: number;
  skills: number[];
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  rank: string;
}
