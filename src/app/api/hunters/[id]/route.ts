import { NextRequest, NextResponse } from "next/server";

const DJANGO_API_URL = process.env.DJANGO_API_URL;

async function proxyFetch(url: string, options: RequestInit, token?: string) {
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(url, { ...options, headers });
  const data = await res.text();
  let json;
  try {
    json = data ? JSON.parse(data) : null;
  } catch {
    json = data;
  }

  return NextResponse.json(json, { status: res.status });
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = req.cookies.get("access_token")?.value;
  console.log("token: ", token);
  return proxyFetch(
    `${DJANGO_API_URL}/hunters/${params.id}/`,
    { method: "GET" },
    token
  );
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = req.cookies.get("access_token")?.value;
  const body = await req.json();
  return proxyFetch(
    `${DJANGO_API_URL}/hunters/${params.id}/`,
    { method: "PUT", body: JSON.stringify(body) },
    token
  );
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = req.cookies.get("access_token")?.value;
  return proxyFetch(
    `${DJANGO_API_URL}/hunters/${params.id}/`,
    { method: "DELETE" },
    token
  );
}
