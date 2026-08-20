import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function PUT(
  request: NextRequest,
  { params }: Params
) {
  const cookieStore = await cookies();
  const adminToken = cookieStore.get("admin_token");

  if (!adminToken) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

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

  const { id } = await params;
  const body = await request.json();

  const { name, paragraph, img } = body;

  if (!name || !paragraph || !img) {
    return NextResponse.json(
      { error: "Alle felter skal udfyldes" },
      { status: 400 }
    );
  }

  const { data, error } = await supabaseAdmin
    .from("content")
    .update({
      name,
      paragraph,
      img,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}