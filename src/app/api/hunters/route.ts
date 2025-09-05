import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;

  const response = await fetch(`${process.env.DJANGO_API_URL}/hunters/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    cache: "no-store",
  });

  const data = await response.json();

  return new Response(JSON.stringify(data), {
    status: response.status,
    headers: { "Content-Type": "application/json" },
  });
}
