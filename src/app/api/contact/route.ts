import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, email, comment } = body;

    if (!name || !email || !comment) {
      return NextResponse.json(
        { error: "Alle felter skal udfyldes" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("contact")
      .insert({
        name,
        email,
        comment,
      });

    if (error) {
      console.error("Supabase error:", error);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Message sent successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("API error:", error);

    return NextResponse.json(
      { error: "Der opstod en fejl" },
      { status: 500 }
    );
  }
}