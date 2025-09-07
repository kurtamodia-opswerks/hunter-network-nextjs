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
  date_joined: string;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  username: string;
  rank: string;
  rank_display: string;
  guild: number | null;
  guild_name?: string;
  skills: number[];
  power_level: number;
  raid_count: number;
}

export interface UpdateHunterData {
  email: string;
  guild: number | null;
  skills: number[];
  first_name: string;
  last_name: string;
  username: string;
  password?: string;
  rank: string;
}
