// app/api/auth/callback/google.ts
import { NextRequest } from "next/server";
import { notFound, redirect } from "next/navigation";
import db from "@/lib/db";
import getSession from "@/lib/session";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  if (!code) {
    return notFound();
  }

  const tokenParams = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    client_secret: process.env.GOOGLE_CLIENT_SECRET!,
    code,
    grant_type: "authorization_code",
    redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/google`,
  });

  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: tokenParams.toString()
  });

  const { access_token, error } = await tokenResponse.json();
  if (error) {
    return new Response(null, { status: 400 });
  }

  const userProfileResponse = await fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
    headers: { Authorization: `Bearer ${access_token}` },
    cache: 'no-cache'
  });

  const { id, email, name, picture } = await userProfileResponse.json();
  let user = await db.user.findUnique({ where: { email } });

  if (!user) {
    user = await db.user.create({
      data: {
        email,
        username: name,
        google_id: id,
        avatar: picture,
      },
    });
  }

  const session = await getSession();
  session.id = user.id;
  await session.save();

  return redirect("/profile");
}
