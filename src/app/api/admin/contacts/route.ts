import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  const cookieStore = await cookies();
  const adminToken = cookieStore.get("admin_token");

  if (!adminToken) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  // Kontrollér at tokenet faktisk tilhører en gyldig Supabase-bruger
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser(adminToken.value);

  if (authError || !user) {
    return NextResponse.json(
      { error: "Invalid session" },
      { status: 401 }
    );
  }

  const { data, error } = await supabaseAdmin
    .from("contact")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}