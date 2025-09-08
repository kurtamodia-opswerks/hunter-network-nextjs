// app/api/auth/me/route.ts
import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;

  if (!token) return NextResponse.json({ user: null }, { status: 401 });

  try {
    const user = jwtDecode(token);
    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
