// src/lib/api.ts
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

// Register a new hunter
export async function registerHunter(data: RegisterHunterData) {
  const res = await fetch("/api/hunters", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    cache: "no-store",
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.message || "Registration failed");
  }

  return res.json();
}

// Get all hunters
export async function getHunters() {
  const res = await fetch("/api/hunters", { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch hunters");
  }

  return res.json() as Promise<Hunter[]>;
}
