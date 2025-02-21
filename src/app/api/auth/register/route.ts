import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../../../lib/supabaseClient";


export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const { user, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ message: "User registered successfully", user }, { status: 201 });
}
