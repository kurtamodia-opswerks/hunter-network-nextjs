// src/lib/api.ts
import { fetcher } from "./fetcher";
import { Hunter, RegisterHunterData, UpdateHunterData } from "@/types/hunter";

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
