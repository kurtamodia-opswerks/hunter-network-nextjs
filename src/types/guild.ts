// src/types/guild.ts

export interface GuildLeader {
  id: number;
  full_name: string;
  rank_display: string;
}

export interface GuildMember {
  id: number;
  full_name: string;
  rank_display: string;
}

export interface Guild {
  id: number;
  name: string;
  founded_date: string; // ISO date string
  leader_display: GuildLeader;
  members: GuildMember[];
  member_count: string; // comes as string from API
}

// Request body when creating a guild
export interface CreateGuildData {
  name: string;
  leader: number; // leader ID
}

// Request body when updating a guild
export interface UpdateGuildData {
  name: string;
  leader: number; // leader ID
}
