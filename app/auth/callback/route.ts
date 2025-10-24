import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase-server"

export async function GET(req: Request) {
  const requestUrl = new URL(req.url)
  const code = requestUrl.searchParams.get("code")

  if (code) {
    const supabase = await createServerSupabaseClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      return NextResponse.redirect(new URL("/dashboard", requestUrl.origin))
    }
  }

  return NextResponse.redirect(new URL("/auth/login", requestUrl.origin))
}
