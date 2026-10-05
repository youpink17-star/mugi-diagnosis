"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AppHeader from "./AppHeader";
import LoadingAnalysis from "./LoadingAnalysis";
import WeaponTestIllust from "./WeaponTestIllust";
import { getFreeTest } from "@/lib/questions";
import { isUndecided } from "@/lib/reports/weapon-mbti";
import type { Product } from "@/lib/types";

// 무기 유형 테스트 전용 — 한 스크롤, 5점 척도(양끝 라벨 + 그라데이션 점).
// 데스크톱은 가운데 흰 시트로 넓게. 아직 안 풀 문항은 반투명, 진행하면 밝아진다.
const SCALE = [
  { v: "vd", size: 32, color: "#A99BE0", label: "전혀 아니다" },
  { v: "d", size: 26, color: "#C3B7EA", label: "아니다" },
  { v: "n", size: 20, color: "#D6D0E0", label: "보통이다" },
  { v: "a", size: 26, color: "#C3B7EA", label: "그렇다" },
  { v: "va", size: 32, color: "#A99BE0", label: "매우 그렇다" },
];

export default function WeaponScrollTest({ product }: { product: Product }) {
  const router = useRouter();
  const questions = getFreeTest(product.slug);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [attempted, setAttempted] = useState(false); // 빠진 문항이 있는 채로 "결과 보기"를 눌렀는지
  const [notice, setNotice] = useState<string | null>(null);

  const total = questions.length;
  const answeredCount = Object.keys(answers).length;
  const allDone = answeredCount === total;
  const pct = Math.round((answeredCount / total) * 100);
  // 아직 안 푼 첫 문항(현재). 그보다 뒤 문항은 반투명.
  const firstUnanswered = questions.findIndex((q) => answers[q.id] === undefined);

  function pick(qid: string, val: string) {
    setAnswers((prev) => ({ ...prev, [qid]: val }));
    setNotice(null);
  }

  // 답으로 축 점수를 미리 합산 (세 축 모두 기울지 않으면 유형을 가릴 수 없다)
  function tally(): Record<string, number> {
    const raw: Record<string, number> = {};
    for (const q of questions) {
      const opt = q.options?.find((o) => o.value === answers[q.id]);
      for (const [k, v] of Object.entries(opt?.score ?? {})) raw[k] = (raw[k] ?? 0) + (v as number);
    }
    return raw;
  }

  async function submit() {
    if (!allDone) {
      // 빠진 문항으로 데려가고, 어디가 빠졌는지 표시한다
      setAttempted(true);
      setNotice(`아직 안 고른 문항이 ${total - answeredCount}개 있어요. 첫 번째 빠진 문항으로 이동했어요.`);
      // 표시가 그려진 다음에 이동해야 스크롤이 끊기지 않는다
      const target = firstUnanswered;
      window.setTimeout(() => {
        const el = document.getElementById(`q-${target}`);
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY - window.innerHeight / 3;
        window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      }, 80);
      return;
    }
    if (isUndecided(tally())) {
      setNotice("답이 어느 쪽으로도 기울지 않아서 유형을 가리기 어려워요. 조금이라도 더 가까운 쪽으로 몇 개만 바꿔주세요.");
      return;
    }
    setNotice(null);
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
        setNotice("제출 중 문제가 생겼어요. 잠시 후 다시 눌러주세요.");
        setSubmitting(false);
      }
    } catch {
      setNotice("인터넷 연결이 불안정해요. 연결을 확인하고 다시 눌러주세요.");
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
              const missing = attempted && answers[q.id] === undefined;
              // 아직 차례가 안 온(안 고른) 문항만 흐리게 — 이미 고른 문항은 항상 또렷하게
              const dimmed = !missing && answers[q.id] === undefined && firstUnanswered !== -1 && i > firstUnanswered;
              return (
                <div
                  key={q.id}
                  id={`q-${i}`}
                  className={`border-b border-line py-6 transition-opacity duration-300 ${
                    dimmed ? "opacity-40" : "opacity-100"
                  } ${missing ? "-mx-3 rounded-2xl border-b-0 bg-soft-pink px-3" : ""}`}
                >
                  <div className="flex items-center gap-2 text-[12px] font-extrabold text-muted">
                    Q{i + 1}
                    {missing && <span className="rounded-full bg-pink px-2 py-0.5 text-[10.5px] text-white">아직 안 골랐어요</span>}
                  </div>
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
                            aria-label={`${q.q} — ${d.label}`}
                            className="grid place-items-center"
                            style={{ width: 40, height: 40 }}
                          >
                            <span
                              className={`rounded-full border-2 transition ${
                                selected ? "shadow-[0_3px_10px_rgba(7,7,31,0.25)]" : ""
                              }`}
                              style={{
                                width: d.size,
                                height: d.size,
                                borderColor: selected ? "#07071F" : d.color,
                                backgroundColor: selected ? "#07071F" : "#ffffff",
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
        {notice && (
          <p role="status" className="mx-auto mb-2 max-w-2xl px-5 text-[12.5px] font-bold leading-relaxed text-pink">
            {notice}
          </p>
        )}
        <div className="mx-auto flex max-w-2xl items-center gap-3 px-5">
          <div className="flex-1">
            <div className="text-[12px] font-bold text-muted">
              <b className="text-ink">{answeredCount}</b>/{total} 문항
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded bg-[#e3ddce]">
              <div className="h-full rounded bg-pink-grad transition-all" style={{ width: `${pct}%` }} />
            </div>
          </div>
          <button
            type="button"
            onClick={submit}
            className={`whitespace-nowrap rounded-2xl bg-pink-grad px-5 py-3 text-[14px] font-extrabold text-white shadow-cta transition ${
              allDone ? "" : "opacity-50"
            }`}
          >
            결과 보기
          </button>
        </div>
      </div>
    </>
  );
}
