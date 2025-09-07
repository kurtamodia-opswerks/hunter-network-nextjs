// src/lib/api.ts
import { fetcher } from "./fetcher";
import { Hunter, RegisterHunterData, UpdateHunterData } from "@/types/hunter";
import { Guild, CreateGuildData, UpdateGuildData } from "@/types/guild";

// Password verification
export async function verifyPassword(
  password: string
): Promise<{ valid: boolean }> {
  return fetcher<{ valid: boolean }>("/api/auth/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });
}

// Hunter actions
export async function getHunter(id: number): Promise<Hunter> {
  return fetcher<Hunter>(`/api/hunters/${id}`);
}

export async function getHunters(): Promise<Hunter[]> {
  return fetcher<Hunter[]>("/api/hunters");
}

export async function registerHunter(
  data: RegisterHunterData
): Promise<Hunter> {
  return fetcher<Hunter>("/api/hunters", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function updateHunter(
  id: number,
  data: UpdateHunterData
): Promise<Hunter> {
  return fetcher<Hunter>(`/api/hunters/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function deleteHunter(id: number): Promise<void> {
  await fetcher(`/api/hunters/${id}`, { method: "DELETE" });
}

// Guild actions
export async function getGuilds(
  params: { search?: string; ordering?: string } = {}
): Promise<Guild[]> {
  const query = new URLSearchParams(
    params as Record<string, string>
  ).toString();
  return fetcher<Guild[]>(`/api/guilds${query ? `?${query}` : ""}`);
}

export async function getGuild(id: number): Promise<Guild> {
  return fetcher<Guild>(`/api/guilds/${id}`);
}

export async function createGuild(data: CreateGuildData): Promise<Guild> {
  return fetcher<Guild>("/api/guilds", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function updateGuild(
  id: number,
  data: UpdateGuildData
): Promise<Guild> {
  return fetcher<Guild>(`/api/guilds/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function deleteGuild(id: number): Promise<void> {
  await fetcher(`/api/guilds/${id}`, { method: "DELETE" });
}
