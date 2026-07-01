"use client";
import Link from "next/link";
import { useEffect } from "react";
import { saveTestResult } from "@/lib/profileStore";
import { getNextSlug } from "@/lib/journey";
import { getProduct } from "@/lib/products";
import { MAP_URL } from "@/lib/links";
import ToolsIllustration from "./ToolsIllustration";
import HeroIllustration from "./HeroIllustration";
import type { FreeResult } from "@/lib/types";

// 결과 페이지 하단: 진단 자체로 완결되는 다음 행동을 먼저, 지도 연결은 가벼운 선택 넛지로.
// ① 도구실에서 뽑아보기 ② 이어서 받을 진단 ③ (작게) 지도에 정리해두기 — 선택
export default function ResultJourney({ slug, free }: { slug: string; free: FreeResult }) {
  const scores = free.scores ?? {};

  useEffect(() => {
    saveTestResult(slug, scores);
  }, [slug, free]); // eslint-disable-line react-hooks/exhaustive-deps

  // 다음 진단
  const nextSlug = getNextSlug(slug);
  const next = nextSlug ? getProduct(nextSlug) : undefined;

  return (
    <section className="px-5 pb-7 pt-3">
      {/* ① 도구실에서 뽑아보기 — 진단 결과를 실제 콘텐츠·문구로 */}
      <div className="rounded-2xl border border-pink/40 bg-soft-pink p-5">
        <p className="text-[12px] font-bold text-pink">도구실</p>
        <h3 className="mt-1.5 text-[16px] font-extrabold leading-snug text-ink">
          이 유형에 맞는 콘텐츠·문구, 도구실에서 바로 만들어보세요
        </h3>
        <p className="mt-1 text-[13px] leading-relaxed text-muted">
          내 무기 유형에 맞춰 SNS 콘텐츠·고객 문구를 도구실에서 바로 뽑을 수 있어요.
        </p>

        <ToolsIllustration className="mx-auto mt-3 block h-auto w-[90%] max-w-[300px]" />

        <Link
          href="/tools"
          className="mt-3 block rounded-xl bg-navy py-3.5 text-center text-[15px] font-extrabold text-white"
        >
          도구실에서 뽑아보기 →
        </Link>
      </div>

      {/* ② 이어서 받을 진단 — 진단 안에서 다음으로 */}
      {next && (
        <div className="mt-5">
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

      {/* ③ 내 사업 지도에 정리하기 — 도구실 카드와 같은 스타일(일러스트+CTA), 선택 */}
      <div className="mt-5 rounded-2xl border border-line bg-app-bg/40 p-5">
        <p className="text-[12px] font-bold text-purple">내 사업 지도</p>
        <h3 className="mt-1.5 text-[16px] font-extrabold leading-snug text-ink">
          내 무기, 사업 지도에서 계속 꺼내 쓰기
        </h3>
        <p className="mt-1 text-[13px] leading-relaxed text-muted">
          내 사업 지도에서 이 무기를 바탕으로 타겟·강점·다음 할 일을 이어갈 수 있어요. (선택)
        </p>

        <HeroIllustration className="mx-auto mt-3 block h-auto w-[84%] max-w-[280px]" />

        <a
          href={MAP_URL}
          className="mt-3 block rounded-xl bg-navy py-3.5 text-center text-[15px] font-extrabold text-white"
        >
          내 사업 지도 열기 →
        </a>
      </div>
    </section>
  );
}
