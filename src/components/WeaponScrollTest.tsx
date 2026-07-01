"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AppHeader from "./AppHeader";
import LoadingAnalysis from "./LoadingAnalysis";
import CoverImage from "./CoverImage";
import WeaponTestIllust from "./WeaponTestIllust";
import { getFreeTest } from "@/lib/questions";
import type { Product } from "@/lib/types";

// 무기 유형 테스트 전용 — 한 스크롤에 전 문항, 5점 척도(점 스케일).
const DOTS = [
  { v: "vd", label: "전혀\n아니다", size: 34 },
  { v: "d", label: "아니다", size: 28 },
  { v: "n", label: "보통", size: 22 },
  { v: "a", label: "그렇다", size: 28 },
  { v: "va", label: "매우\n그렇다", size: 34 },
];

export default function WeaponScrollTest({ product }: { product: Product }) {
  const router = useRouter();
  const questions = getFreeTest(product.slug);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const total = questions.length;
  const answeredCount = Object.keys(answers).length;
  const allDone = answeredCount === total;
  const pct = Math.round((answeredCount / total) * 100);

  function pick(qid: string, val: string) {
    setAnswers((prev) => ({ ...prev, [qid]: val }));
  }

  async function submit() {
    if (!allDone) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/test/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_slug: product.slug, answers }),
      });
      const data = await res.json();
      if (data.id) {
        router.push(`/result/${data.id}`);
      } else {
        alert("제출 중 문제가 발생했어요. 다시 시도해주세요.");
        setSubmitting(false);
      }
    } catch {
      alert("네트워크 오류가 발생했어요.");
      setSubmitting(false);
    }
  }

  if (submitting) {
    return (
      <>
        <AppHeader title={product.title} />
        <LoadingAnalysis />
      </>
    );
  }

  return (
    <>
      <AppHeader title={product.title} showBack />

      <main className="flex-1 pb-28">
        {/* 표지 일러스트 — /public/images/weapon/test-cover.png 넣으면 자동 적용, 없으면 SVG */}
        <div className="px-6 pt-4 text-center">
          <CoverImage
            src="/images/weapon/test-cover.png"
            alt="무기 유형 테스트"
            className="mx-auto block h-auto w-[76%] max-w-[280px]"
            fallback={<WeaponTestIllust className="mx-auto block h-auto w-[76%] max-w-[280px]" />}
          />
          <p className="mt-2 text-[12.5px] leading-relaxed text-muted">
            평소 나에게 가까운 쪽으로 체크해주세요. 다 답하면 결과가 열려요.
          </p>
        </div>

        <div className="px-5">
          {questions.map((q, i) => (
            <div key={q.id} className="border-b border-line py-6">
              <div className="text-[12px] font-extrabold text-pink">Q{i + 1}</div>
              <div className="mt-2 text-[16px] font-bold leading-snug text-ink">{q.q}</div>
              <div className="mt-5 flex items-start justify-between gap-1">
                {DOTS.map((d) => {
                  const selected = answers[q.id] === d.v;
                  return (
                    <button
                      key={d.v}
                      type="button"
                      onClick={() => pick(q.id, d.v)}
                      className="flex flex-1 flex-col items-center gap-2"
                      aria-pressed={selected}
                    >
                      <span
                        style={{ width: d.size, height: d.size }}
                        className={`rounded-full border-2 transition ${
                          selected
                            ? "border-pink bg-pink shadow-[0_3px_10px_rgba(255,47,143,0.3)]"
                            : "border-[#d8d0bf] bg-white"
                        }`}
                      />
                      <span className="whitespace-pre text-center text-[10px] font-semibold leading-tight text-muted">
                        {d.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 스티키 진행바 + 제출 */}
      <div className="sticky bottom-0 z-20 flex items-center gap-3 border-t border-line bg-white/95 px-5 pb-[max(env(safe-area-inset-bottom),12px)] pt-3 backdrop-blur">
        <div className="flex-1">
          <div className="text-[12px] font-bold text-muted">
            <b className="text-pink">{answeredCount}</b>/{total} 문항
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded bg-[#e3ddce]">
            <div className="h-full rounded bg-pink-grad transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>
        <button
          type="button"
          onClick={submit}
          disabled={!allDone}
          className="whitespace-nowrap rounded-2xl bg-pink-grad px-5 py-3 text-[14px] font-extrabold text-white shadow-cta transition disabled:opacity-40"
        >
          결과 보기
        </button>
      </div>
    </>
  );
}
