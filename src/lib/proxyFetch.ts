import { NextResponse } from "next/server";

export async function proxyFetch(
  url: string,
  options: RequestInit,
  token?: string
) {
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(url, { ...options, headers, cache: "no-store" });
  const data = await res.text();
  let json;
  try {
    json = data ? JSON.parse(data) : null;
  } catch {
    json = data;
  }

  return NextResponse.json(json, { status: res.status });
}
