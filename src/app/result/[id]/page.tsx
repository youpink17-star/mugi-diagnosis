import type { Metadata } from "next";
import { cache } from "react";
import { notFound } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import ResultPreviewCard from "@/components/ResultPreviewCard";
import ReportSectionView from "@/components/ReportSectionView";
import ResultJourney from "@/components/ResultJourney";
import TypeReport from "@/components/TypeReport";
import WeaponAxes from "@/components/WeaponAxes";
import WeaponShare from "@/components/WeaponShare";
import TypeCharacter from "@/components/TypeCharacter";
import { deriveWeaponCode } from "@/lib/reports/weapon-mbti";
import { getProduct } from "@/lib/products";
import { buildUnifiedProfile } from "@/lib/profile";
import { getServiceSupabase, hasSupabase } from "@/lib/supabase/server";
import { isDemoId } from "@/lib/demoid";
import { readResult, isBlobId } from "@/lib/resultStore";
import { computeFreeResult } from "@/lib/scoring";
import type { FreeResult } from "@/lib/types";

interface ResultData {
  slug: string;
  free: FreeResult;
}

async function loadResult(id: string): Promise<ResultData | null> {
  if (isBlobId(id) || isDemoId(id)) {
    // URL을 짧게 유지하려고 원본 답변만 저장해뒀다 — 여기서 다시 계산한다.
    const d = await readResult<{ slug: string; answers: Record<string, unknown> }>(id);
    if (!d) return null;
    try {
      return { slug: d.slug, free: computeFreeResult(d.slug, d.answers) };
    } catch (err) {
      console.error("[result] 데모 결과 재계산 실패:", err);
      return null;
    }
  }
  if (!hasSupabase()) return null;
  try {
    const sb = getServiceSupabase();
    const { data, error } = await sb
      .from("test_responses")
      .select("product_slug, free_result")
      .eq("id", id)
      .single();
    if (error || !data) {
      console.error("[result] Supabase 조회 실패:", error);
      return null;
    }
    return { slug: data.product_slug, free: data.free_result as FreeResult };
  } catch (err) {
    // 네트워크·설정 문제로 Supabase 호출 자체가 실패해도 페이지가 죽지 않고 404로 처리되게 한다.
    console.error("[result] Supabase 클라이언트 오류:", err);
    return null;
  }
}

// 미리보기(메타)와 본문이 같은 결과를 두 번 불러오지 않게 한 요청 안에서는 한 번만 읽는다
const getResult = cache(loadResult);

// 카톡·문자에 결과 링크를 보냈을 때 뜨는 미리보기 — 유형 이름과 캐릭터가 보이게 (이미지: public/og/{유형코드}.jpg)
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const result = await getResult(params.id);
  if (!result || result.slug !== "weapon") return {};
  const code = deriveWeaponCode(result.free.scores ?? {});
  const title = `나는 ‘${result.free.typeName}’ — 무기 유형 테스트`;
  const description = `${result.free.tagline ?? ""} · 8가지 유형 중 나는 어디일까?`;
  const image = { url: `/og/${code}.jpg`, width: 1200, height: 630, alt: `${result.free.typeName} 캐릭터` };
  return {
    title,
    description,
    openGraph: { title, description, images: [image], type: "website" },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
  };
}

export default async function ResultPage({ params }: { params: { id: string } }) {
  const result = await getResult(params.id);
  if (!result) notFound();

  const product = getProduct(result.slug);
  if (!product) notFound();
  const free = result.free;
  const isRich = Array.isArray(free.sections) && free.sections.length > 0;
  // 점수 → 대표 유형 심화 리포트(전체 무료로 길게)
  const miniProfile = buildUnifiedProfile([{ slug: result.slug, scores: free.scores ?? {} }]);

  return (
    <>
      <AppHeader title="테스트 결과" />

      <main className="flex-1">
        {/* 헤더 */}
        <section className="bg-navy px-6 py-9 text-center text-white">
          <p className="text-[13px] font-semibold text-white/60">{product.title}</p>
          {result.slug === "weapon" ? (
            <TypeCharacter
              code={deriveWeaponCode(free.scores ?? {})}
              name={free.typeName}
              emoji={free.typeEmoji}
            />
          ) : (
            free.typeEmoji && <div className="mt-3 text-[44px] leading-none">{free.typeEmoji}</div>
          )}
          <h1 className="mt-3 text-[24px] font-extrabold leading-snug">
            <span className="text-pink">{free.typeName}</span>
          </h1>
          {free.tagline && (
            <p className="mt-2 text-[14px] leading-relaxed text-white/80">{free.tagline}</p>
          )}

          {/* 지표 배지 (MBTI / 에니어그램 / 강점) — 가운데 정렬 + 줄바꿈 */}
          {free.badges && free.badges.length > 0 && (
            <div className="mx-auto mt-5 grid max-w-[330px] grid-cols-3 gap-2">
              {free.badges.map((b, i) => {
                // "4번 개성가 (독창성 추구)" → 두 줄로
                const m = b.value.match(/^(.*?)\s*\((.*)\)\s*$/);
                return (
                  <div key={i} className="flex min-h-[64px] flex-col items-center justify-center rounded-xl bg-white/10 px-2 py-2 text-center ring-1 ring-white/10">
                    <div className="text-[10px] font-semibold text-white/55">{b.label}</div>
                    {m ? (
                      <div className="mt-1 leading-tight">
                        <div className="text-[12px] font-extrabold text-white">{m[1]}</div>
                        <div className="text-[10px] font-medium text-white/70">({m[2]})</div>
                      </div>
                    ) : (
                      <div className="mt-1 text-[12px] font-extrabold leading-tight text-white">{b.value}</div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {isRich ? (
          // ===== 리치 리포트 (사업아이템 / 자기발견) =====
          <>
            <section className="px-5 pt-6">
              <div className="mb-4 rounded-2xl border border-line bg-white px-4 py-3 text-center">
                <p className="text-[14px] font-semibold leading-relaxed text-ink">{free.summary}</p>
              </div>

              {/* A. 무기 유형 테스트 — 3축 점수 그래프 (근거를 앞에) */}
              {result.slug === "weapon" && (
                <div className="mb-3">
                  <WeaponAxes scores={free.scores ?? {}} />
                </div>
              )}

              {/* 전체 무료 공개 */}
              <div className="space-y-3">
                {free.sections!.map((s, i) => (
                  <ReportSectionView key={i} section={s} />
                ))}
              </div>
            </section>
          </>
        ) : (
          // ===== 일반 진단 (카드형) =====
          <>
            <section className="space-y-3 px-5 py-6">
              <div className="grid grid-cols-2 gap-3">
                {(free.cards ?? []).map((c, i) => (
                  <div key={i} className={c.accent ? "col-span-2" : ""}>
                    <ResultPreviewCard label={c.label} value={c.value} accent={c.accent} />
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border border-line bg-white p-4">
                <p className="text-[12px] font-bold tracking-wide text-purple">한 줄 요약</p>
                <p className="mt-1.5 text-[14px] leading-relaxed text-ink">{free.summary}</p>
              </div>
            </section>
          </>
        )}

        {/* 유형 심화 리포트 — 구 진단 전용. 새 시스템 진단(#1,#2,무기유형)은 자체 섹션으로 완결되어 생략. */}
        {miniProfile &&
          !["self-discovery", "differentiation", "weapon"].includes(result.slug) &&
          !result.slug.startsWith("weapon-") && (
            <TypeReport type={miniProfile.type} successPattern={miniProfile.successPattern} />
          )}

        {/* 결과 저장 + 위키 칸에 본문 입력 + 다음 추천 */}
        <ResultJourney slug={result.slug} free={free} />

        {/* C. 무기 유형 테스트 — 결과 공유 */}
        {result.slug === "weapon" && <WeaponShare />}
      </main>
    </>
  );
}
