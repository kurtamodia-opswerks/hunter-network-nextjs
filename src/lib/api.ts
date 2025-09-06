import { fetcher } from "./fetcher";
import { Hunter, RegisterHunterData, UpdateHunterData } from "@/types/hunter";

export async function getHunter(id: number) {
  return fetcher<Hunter>(`/api/hunters/${id}`);
}

export async function getHunters() {
  return fetcher<Hunter[]>("/api/hunters");
}

export async function registerHunter(data: RegisterHunterData) {
  return fetcher("/api/hunters", {
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
