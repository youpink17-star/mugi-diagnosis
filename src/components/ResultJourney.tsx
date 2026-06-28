"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { saveTestResult, loadSituation } from "@/lib/profileStore";
import { getNextSlug } from "@/lib/journey";
import { getProduct } from "@/lib/products";
import { buildUnifiedProfile } from "@/lib/profile";
import { generateOffer } from "@/lib/offerEngine";
import { generateContent } from "@/lib/contentEngine";
import { MAP_URL } from "@/lib/links";
import type { FreeResult } from "@/lib/types";

// 결과 페이지 하단: 진단 결과를 저장하고, 다음 행동으로 이어준다.
// ① 결과를 무기지도(본체)에 정리하러 가기(외부 링크) ② 오늘 쓸 초안 ③ 이어서 받을 진단
export default function ResultJourney({ slug, free }: { slug: string; free: FreeResult }) {
  const scores = free.scores ?? {};
  // 상황값은 클라이언트에서만 읽어 SSR/CSR 불일치(하이드레이션 경고)를 피한다.
  const [situationId, setSituationId] = useState<string | undefined>(undefined);

  useEffect(() => {
    saveTestResult(slug, scores);
    setSituationId(loadSituation() ?? undefined);
  }, [slug, free]); // eslint-disable-line react-hooks/exhaustive-deps

  // 다음 진단
  const nextSlug = getNextSlug(slug);
  const next = nextSlug ? getProduct(nextSlug) : undefined;

  // 오늘 바로 쓸 초안(상품·콘텐츠)
  const miniProfile = buildUnifiedProfile([{ slug, scores }]);
  const offer = miniProfile ? generateOffer(miniProfile.type.id, situationId) : null;
  const content =
    miniProfile && offer
      ? generateContent({
          typeId: miniProfile.type.id,
          situationId,
          platform: "thread",
          weapon: miniProfile.type.oneLine,
          firstProduct: offer.name,
        })
      : null;

  return (
    <section className="border-t border-line px-5 py-7">
      {/* ① 무기지도에 정리하러 가기 */}
      <div className="rounded-2xl bg-navy p-5 text-white">
        <p className="text-[12px] font-bold text-pink">다음 단계</p>
        <h3 className="mt-1.5 text-[18px] font-extrabold leading-snug">
          이 결과를 <span className="text-pink">내 사업 지도</span>에 정리하세요
        </h3>
        <p className="mt-1.5 text-[13px] leading-relaxed text-white/70">
          무기지도에서 강점·상품·타겟·콘텐츠 칸에 옮겨 적으면, 흩어진 진단이 한 장의 사업 지도가 됩니다.
        </p>
        <a
          href={MAP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 block rounded-xl bg-pink-grad py-3.5 text-center text-[15px] font-extrabold text-white shadow-cta"
        >
          내 사업 지도 열기 →
        </a>
      </div>

      {/* ② 오늘 바로 쓸 초안 */}
      {miniProfile && offer && content && (
        <div className="mt-4 rounded-2xl border border-pink/40 bg-soft-pink p-5">
          <p className="text-[12px] font-bold text-pink">오늘 바로 쓸 초안</p>
          <h3 className="mt-1.5 text-[16px] font-extrabold leading-snug text-ink">
            그래서 이렇게 시작하면 됩니다
          </h3>

          <div className="mt-3 rounded-xl bg-white p-4">
            <p className="text-[11px] font-bold text-purple">팔 것 초안</p>
            <p className="mt-1 text-[15px] font-extrabold text-ink">{offer.name}</p>
            <p className="mt-0.5 text-[13px] text-muted">
              {offer.price} · {offer.target}
            </p>
          </div>

          <div className="mt-2 rounded-xl bg-white p-4">
            <p className="text-[11px] font-bold text-purple">콘텐츠 제목 초안</p>
            <p className="mt-1 text-[14px] font-semibold leading-relaxed text-ink">
              “{content.titles[0]}”
            </p>
          </div>

          <Link
            href="/weapon-os"
            className="mt-4 block rounded-xl bg-navy py-3 text-center text-[14px] font-extrabold text-white"
          >
            상품·콘텐츠·고객 문구 더 뽑기
          </Link>
        </div>
      )}

      {/* ③ 이어서 받을 진단 */}
      {next && (
        <div className="mt-4">
          <p className="mb-2 text-[13px] font-bold text-ink/60">이어서 받을 진단</p>
          <Link
            href={`/landing/${next.slug}`}
            className="flex items-center gap-3 rounded-2xl border border-line bg-white p-4 transition hover:border-pink"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-soft-pink text-[22px]">
              {next.emoji}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[14.5px] font-extrabold text-ink">{next.title}</p>
              <p className="mt-0.5 truncate text-[12.5px] text-muted">{next.short}</p>
            </div>
            <span className="text-[18px] font-extrabold text-pink">→</span>
          </Link>
        </div>
      )}
    </section>
  );
}
