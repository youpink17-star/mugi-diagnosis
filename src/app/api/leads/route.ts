import { NextResponse } from "next/server";
import { getServiceSupabase, hasSupabase } from "@/lib/supabase/server";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

export async function POST(req: Request) {
  if (!(await checkRateLimit(getClientIp(req), "leads"))) {
    return NextResponse.json({ error: "요청이 너무 많아요. 잠시 후 다시 시도해주세요." }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const email = body?.email as string | undefined;
  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "이메일 형식이 올바르지 않습니다." }, { status: 400 });
  }

  if (hasSupabase()) {
    const sb = getServiceSupabase();
    const { error } = await sb.from("leads").insert({
      email,
      product_slug: body?.product_slug ?? null,
      source: body?.source ?? "coming_soon",
    });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
