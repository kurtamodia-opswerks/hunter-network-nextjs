import { NextRequest } from "next/server";
import { proxyFetch } from "@/lib/proxyFetch";

const DJANGO_API_URL = process.env.DJANGO_API_URL;

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
