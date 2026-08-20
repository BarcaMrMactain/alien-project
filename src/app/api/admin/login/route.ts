import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email og password skal udfyldes" },
        { status: 400 }
      );
    }

    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error || !data.session) {
      return NextResponse.json(
        { error: "Forkert email eller password" },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      message: "Login successful",
    });

    response.cookies.set(
      "admin_token",
      data.session.access_token,
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60,
      }
    );

    return response;
  } catch (error) {
    console.error("Admin login error:", error);

    return NextResponse.json(
      { error: "Der opstod en fejl" },
      { status: 500 }
    );
  }
}