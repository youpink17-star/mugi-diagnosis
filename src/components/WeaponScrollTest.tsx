"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AppHeader from "./AppHeader";
import LoadingAnalysis from "./LoadingAnalysis";
import WeaponTestIllust from "./WeaponTestIllust";
import { getFreeTest } from "@/lib/questions";
import type { Product } from "@/lib/types";

// 무기 유형 테스트 전용 — 한 스크롤, 5점 척도(양끝 라벨 + 그라데이션 점).
// 데스크톱은 가운데 흰 시트로 넓게. 아직 안 풀 문항은 반투명, 진행하면 밝아진다.
const SCALE = [
  { v: "vd", size: 32, color: "#A99BE0" },
  { v: "d", size: 26, color: "#C3B7EA" },
  { v: "n", size: 20, color: "#D6D0E0" },
  { v: "a", size: 26, color: "#F0B9D3" },
  { v: "va", size: 32, color: "#E88AB6" },
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
  // 아직 안 푼 첫 문항(현재). 그보다 뒤 문항은 반투명.
  const firstUnanswered = questions.findIndex((q) => answers[q.id] === undefined);

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

      <main className="flex-1 bg-app-bg pb-28">
        <div className="mx-auto w-full max-w-2xl bg-white md:my-6 md:rounded-3xl md:shadow-card">
          {/* 표지 일러스트 (SVG 직접 렌더 — 엑박 방지) */}
          <div className="px-6 pt-6 text-center">
            <WeaponTestIllust className="mx-auto block h-auto w-[58%] max-w-[220px]" />
            <p className="mt-2 text-[12.5px] leading-relaxed text-muted">
              평소 나에게 가까운 쪽으로 체크해주세요.
            </p>
          </div>

          {/* 문항들 */}
          <div className="px-6 pb-8 md:px-9">
            {questions.map((q, i) => {
              const dimmed = firstUnanswered !== -1 && i > firstUnanswered;
              return (
                <div
                  key={q.id}
                  className={`border-b border-line py-6 transition-opacity duration-300 ${
                    dimmed ? "opacity-40" : "opacity-100"
                  }`}
                >
                  <div className="text-[12px] font-extrabold text-pink">Q{i + 1}</div>
                  <div className="mt-2 text-[16px] font-bold leading-snug text-ink md:text-[17px]">
                    {q.q}
                  </div>

                  <div className="mt-5 flex items-center gap-2 md:gap-4">
                    <span className="w-11 shrink-0 whitespace-nowrap text-right text-[11px] font-semibold text-muted md:w-14">
                      전혀<br className="md:hidden" /> 아니다
                    </span>
                    <div className="flex flex-1 items-center justify-between">
                      {SCALE.map((d) => {
                        const selected = answers[q.id] === d.v;
                        return (
                          <button
                            key={d.v}
                            type="button"
                            onClick={() => pick(q.id, d.v)}
                            aria-pressed={selected}
                            aria-label={q.q}
                            className="grid place-items-center"
                            style={{ width: 40, height: 40 }}
                          >
                            <span
                              className={`rounded-full border-2 transition ${
                                selected ? "shadow-[0_3px_10px_rgba(255,47,143,0.35)]" : ""
                              }`}
                              style={{
                                width: d.size,
                                height: d.size,
                                borderColor: selected ? "#FF2F8F" : d.color,
                                backgroundColor: selected ? "#FF2F8F" : "#ffffff",
                              }}
                            />
                          </button>
                        );
                      })}
                    </div>
                    <span className="w-11 shrink-0 whitespace-nowrap text-[11px] font-semibold text-muted md:w-14">
                      매우<br className="md:hidden" /> 그렇다
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* 스티키 진행바 + 제출 */}
      <div className="sticky bottom-0 z-20 border-t border-line bg-white/95 pb-[max(env(safe-area-inset-bottom),12px)] pt-3 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center gap-3 px-5">
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
      </div>
    </>
  );
}
