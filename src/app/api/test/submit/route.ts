import { NextResponse } from "next/server";
import { getServiceSupabase, hasSupabase } from "@/lib/supabase/server";
import { computeFreeResult } from "@/lib/scoring";
import { getProduct } from "@/lib/products";
import { storeResult } from "@/lib/resultStore";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

export async function POST(req: Request) {
  if (!(await checkRateLimit(getClientIp(req), "test-submit"))) {
    return NextResponse.json({ error: "요청이 너무 많아요. 잠시 후 다시 시도해주세요." }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const slug = body?.product_slug as string | undefined;
  const answers = (body?.answers ?? {}) as Record<string, unknown>;

  if (!slug || !getProduct(slug)) {
    return NextResponse.json({ error: "잘못된 상품입니다." }, { status: 400 });
  }

  const free_result = computeFreeResult(slug, answers);

  if (hasSupabase()) {
    const sb = getServiceSupabase();
    const { data, error } = await sb
      .from("test_responses")
      .insert({ product_slug: slug, answers, free_result })
      .select("id")
      .single();
    if (error || !data) {
      return NextResponse.json({ error: error?.message ?? "insert failed" }, { status: 500 });
    }
    return NextResponse.json({ id: data.id });
  }

  // Supabase 미설정: 계산된 free_result 전체가 아니라 원본 답변만 저장하고
  // 짧은 id를 반환한다(Netlify Blobs, 불가 시 demoid 폴백).
  // 결과 페이지에서 computeFreeResult로 다시 계산해서 쓴다.
  const id = await storeResult({ slug, answers });
  return NextResponse.json({ id });
}
