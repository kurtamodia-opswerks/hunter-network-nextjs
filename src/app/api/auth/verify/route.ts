// src/app/api/auth/verify/route.ts
import { NextRequest } from "next/server";
import { proxyFetch } from "@/lib/proxyFetch";

const DJANGO_API_URL = process.env.DJANGO_API_URL;

export async function POST(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;
  const body = await req.json();

  return proxyFetch(
    `${DJANGO_API_URL}/verify-password/`,
    {
      method: "POST",
      body: JSON.stringify(body),
    },
    token
  );
}
