// src/lib/fetcher.ts
export async function fetcher<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(url, { ...options, cache: "no-store" });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.message || "Request failed");
  }

  return res.json();
}
