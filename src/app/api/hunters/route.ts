import { NextRequest } from "next/server";
import { proxyFetch } from "@/lib/proxyFetch";

const DJANGO_API_URL = process.env.DJANGO_API_URL;

// GET all hunters
export async function GET(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;
  const url = new URL(req.url);
  const searchParams = url.searchParams.toString();
  const apiUrl = `${DJANGO_API_URL}/hunters/${
    searchParams ? `?${searchParams}` : ""
  }`;

  return proxyFetch(apiUrl, { method: "GET" }, token);
}

// POST a new hunter
export async function POST(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;
  const body = await req.json();

  return proxyFetch(
    `${DJANGO_API_URL}/hunters/`,
    {
      method: "POST",
      body: JSON.stringify(body),
    },
    token
  );
}
