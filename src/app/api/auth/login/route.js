import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();

  // Call backend API for login
  const apiRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    credentials: "include",
  });

  if (!apiRes.ok) {
    const errorData = await apiRes.json();
    return NextResponse.json(
      { message: errorData.message || "Login failed" },
      { status: 401 }
    );
  }

  const data = await apiRes.json();
  console.log("Backend Login Response:", data);
  const accessToken = data.accessToken;
  const refreshToken = data.refreshToken;

  // Set cookies on frontend domain
  await cookies().set("accessTkn", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });

  await cookies().set("refreshTkn", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });

  return NextResponse.json({ success: true });
}
