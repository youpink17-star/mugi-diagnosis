import { NextResponse } from "next/server";
import { getServiceSupabase, hasSupabase } from "@/lib/supabase/server";
import { getProduct } from "@/lib/products";
import { getPaymentMode, buildExternalPaymentUrl } from "@/lib/payment";
import { isDemoId } from "@/lib/demoid";
import { storeResult, isBlobId } from "@/lib/resultStore";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function POST(req: Request) {
  if (!(await checkRateLimit(getClientIp(req), "orders"))) {
    return NextResponse.json({ error: "요청이 너무 많아요. 잠시 후 다시 시도해주세요." }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const slug = body?.product_slug as string | undefined;
  const product = slug ? getProduct(slug) : undefined;
  if (!product || !product.active) {
    return NextResponse.json({ error: "잘못된 상품입니다." }, { status: 400 });
  }

  const name = (body?.name ?? null) as string | null;
  const email = (body?.email ?? null) as string | null;
  const phone = (body?.phone ?? null) as string | null;
  const testRespId = body?.test_response_id as string | undefined;

  const mode = getPaymentMode();
  // mock = 결제 통과로 간주, 그 외 = 결제 대기
  const status = mode === "mock" ? "paid" : "payment_pending";

  let orderId: string;

  if (hasSupabase()) {
    const sb = getServiceSupabase();
    const { data, error } = await sb
      .from("orders")
      .insert({
        product_slug: slug,
        test_response_id: testRespId && UUID_RE.test(testRespId) ? testRespId : null,
        name,
        email,
        phone,
        amount: product.price,
        status,
        payment_provider: mode,
      })
      .select("id")
      .single();
    if (error || !data) {
      return NextResponse.json({ error: error?.message ?? "insert failed" }, { status: 500 });
    }
    orderId = data.id;
  } else {
    // Supabase 미설정: 이름·이메일·전화번호 같은 개인정보가 URL에 그대로 노출되지 않도록
    // Netlify Blobs에 저장(불가 시에만 기존 demoid로 폴백)
    orderId = await storeResult({ slug, name, email, phone, test_response_id: testRespId ?? null });
  }

  // 외부 결제 링크 모드면 결제 URL 반환
  let paymentUrl: string | null = null;
  if (mode === "external") {
    paymentUrl = buildExternalPaymentUrl(orderId, slug!) || null;
  }
  // portone 모드는 추후 구현(현재는 mock 처럼 통과)

  return NextResponse.json({
    orderId,
    mode,
    paymentUrl,
    isDemo: isDemoId(orderId) || isBlobId(orderId),
  });
}
