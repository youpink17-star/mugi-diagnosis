"use client";
import Link from "next/link";
import { useEffect } from "react";
import type { ComponentType } from "react";
import { saveTestResult } from "@/lib/profileStore";
import { getNextSlug } from "@/lib/journey";
import { getProduct } from "@/lib/products";
import { MAP_URL } from "@/lib/links";
import { getWeaponRecommend, type WeaponRecommend } from "@/lib/reports/weapon-mbti";
import HeroIllustration from "./HeroIllustration";
import ToolsIllustration from "./ToolsIllustration";
import ExperimentIllustration from "./ExperimentIllustration";
import type { FreeResult } from "@/lib/types";

interface NextStepCard {
  id: WeaponRecommend;
  eyebrow: string;
  title: string;
  desc: string;
  cta: string;
  href: string;
  Illustration: ComponentType<{ className?: string }>;
}

// 결과 유형의 grow(성장 포인트)에 따라 둘 중 하나가 "추천"으로 강조된다.
// 링크는 일단 무기상점(무기지도)으로 통일 — 각 상품 상세 링크가 정해지면 개별로 교체.
const NEXT_STEPS: NextStepCard[] = [
  {
    id: "content",
    eyebrow: "콘텐츠가 문제라면",
    title: "AI 콘텐츠 제조실",
    desc: "인스타 릴스·카드뉴스부터 블로그·유튜브까지, 손이 안 가던 콘텐츠를 계속 찍어내는 곳",
    cta: "AI 콘텐츠 제조실 보기 →",
    href: `${MAP_URL}/tools`,
    Illustration: ToolsIllustration,
  },
  {
    id: "conversion",
    eyebrow: "마케팅을 혼자 해야 한다면",
    title: "혼자 하는 48시간 AI 마케팅 실험",
    desc: "주말 48시간 동안 시간표대로 따라 하는 마케팅 실험 전자책",
    cta: "실험북 보기 →",
    href: `${MAP_URL}/tools`,
    Illustration: ExperimentIllustration,
  },
];

// 결과 페이지 하단: 진단 자체로 완결되는 다음 행동을 먼저, 지도 연결은 가벼운 선택 넛지로.
// ① 유형별 2분기 CTA(추천 강조) + 지도(항상 노출, 강조 없음) ② 이어서 받을 진단
export default function ResultJourney({ slug, free }: { slug: string; free: FreeResult }) {
  const scores = free.scores ?? {};

  useEffect(() => {
    saveTestResult(slug, scores);
  }, [slug, free]); // eslint-disable-line react-hooks/exhaustive-deps

  const recommend = getWeaponRecommend(scores);

  // 다음 진단
  const nextSlug = getNextSlug(slug);
  const next = nextSlug ? getProduct(nextSlug) : undefined;

  return (
    <section className="px-5 pb-7 pt-3">
      {/* ① 다음 단계 2분기 + 지도 — 이 유형에게 가장 필요한 카드가 "추천"으로 강조 */}
      <p className="text-[12px] font-bold text-muted">다음 단계</p>
      <h3 className="mt-1 text-[16px] font-extrabold leading-snug text-ink">
        지금 가장 막힌 지점은 어디인가요?
      </h3>

      <div className="mt-3 space-y-3">
        {NEXT_STEPS.map((step) => {
          const on = step.id === recommend;
          const Illustration = step.Illustration;
          return (
            <a
              key={step.id}
              href={step.href}
              className={[
                "block rounded-2xl border p-5 transition active:scale-[0.99]",
                on
                  ? "border-navy bg-white shadow-[0_12px_28px_-12px_rgba(7,7,31,0.35)]"
                  : "border-line bg-white shadow-[0_10px_22px_-12px_rgba(7,7,31,0.2)]",
              ].join(" ")}
            >
              {on && (
                <span className="mb-2 inline-block rounded-full bg-navy px-2.5 py-1 text-[11px] font-extrabold text-white">
                  ⭐ 추천
                </span>
              )}
              <p className="text-[12px] font-bold text-muted">{step.eyebrow}</p>
              <h4 className="mt-1 text-[16px] font-extrabold leading-snug text-ink">{step.title}</h4>
              <p className="mt-1 text-[13px] leading-relaxed text-muted">{step.desc}</p>

              <Illustration className="mx-auto mt-3 block h-auto w-[80%] max-w-[240px]" />

              <span
                className={[
                  "mt-3 block rounded-xl py-3 text-center text-[14.5px] font-extrabold",
                  on ? "bg-pink-grad text-white" : "bg-navy text-white",
                ].join(" ")}
              >
                {step.cta}
              </span>
            </a>
          );
        })}

        {/* 무기지도 — 유형과 무관하게 항상 노출, 강조 없음 */}
        <a
          href={MAP_URL}
          className="block rounded-2xl border border-line bg-white p-5 shadow-[0_10px_22px_-12px_rgba(7,7,31,0.2)] transition active:scale-[0.99]"
        >
          <p className="text-[12px] font-bold text-muted">사업 전체를 정리하고 싶다면</p>
          <h4 className="mt-1 text-[16px] font-extrabold leading-snug text-ink">내 사업 지도</h4>
          <p className="mt-1 text-[13px] leading-relaxed text-muted">
            내 무기를 사업 지도에 담으면 타겟·차별화·다음 할 일까지 이어져요
          </p>

          <HeroIllustration className="mx-auto mt-3 block h-auto w-[80%] max-w-[240px]" />

          <span className="mt-3 block rounded-xl bg-navy py-3 text-center text-[14.5px] font-extrabold text-white">
            내 사업 지도 열기 →
          </span>
        </a>
      </div>

      {/* ② 이어서 받을 진단 — 진단 안에서 다음으로 */}
      {next && (
        <div className="mt-5">
          <p className="mb-2 text-[13px] font-bold text-ink/60">이어서 받을 진단</p>
          <Link
            href={`/landing/${next.slug}`}
            className="flex items-center gap-3 rounded-2xl border border-line bg-white p-4 transition hover:border-pink"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#F1F0F6] text-[22px]">
              {next.emoji}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[14.5px] font-extrabold text-ink">{next.title}</p>
              <p className="mt-0.5 truncate text-[12.5px] text-muted">{next.short}</p>
            </div>
            <span className="text-[18px] font-extrabold text-ink">→</span>
          </Link>
        </div>
      )}
    </section>
  );
}
