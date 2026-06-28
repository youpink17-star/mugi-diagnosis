"use client";
import Link from "next/link";
import { useState } from "react";
import { SITUATIONS } from "@/lib/situations";
import { getProduct } from "@/lib/products";
import { saveSituation } from "@/lib/profileStore";

// 상황 선택 → 추천 진단 1개 크게 → 나머지 진단은 아래로 접기
export default function SituationPicker() {
  const [picked, setPicked] = useState<string | null>(null);
  const sit = SITUATIONS.find((s) => s.id === picked);
  const rec = sit ? getProduct(sit.recommendSlug) : undefined;

  function pick(id: string) {
    setPicked(id);
    saveSituation(id);
    requestAnimationFrame(() =>
      document.getElementById("recommend")?.scrollIntoView({ behavior: "smooth", block: "center" })
    );
  }

  return (
    <section className="px-4 pt-6">
      <h2 className="text-[17px] font-extrabold text-ink">지금 당신에게 가장 가까운 상황은?</h2>
      <p className="mt-1 text-[13px] text-muted">고르면 먼저 받을 진단을 짚어드립니다</p>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {SITUATIONS.map((s) => {
          const on = picked === s.id;
          return (
            <button
              key={s.id}
              onClick={() => pick(s.id)}
              className={[
                "flex items-center gap-2 rounded-2xl border px-3 py-3 text-left text-[14px] font-bold transition",
                on ? "border-pink bg-soft-pink text-ink" : "border-line bg-white text-ink/80",
              ].join(" ")}
            >
              <span className="text-[18px]">{s.emoji}</span>
              <span>{s.label}</span>
            </button>
          );
        })}
      </div>

      {/* 추천 진단 크게 */}
      {sit && rec && (
        <div id="recommend" className="mt-5">
          <div className="rounded-2xl bg-navy p-5 text-white">
            <p className="text-[13px] leading-relaxed text-white/80">“{sit.line}”</p>
            <p className="mt-3 text-[12px] font-bold text-pink">당신에게 먼저 필요한 진단</p>
            <h3 className="mt-1 text-[20px] font-extrabold">
              {rec.emoji} {rec.title}
            </h3>
            <p className="mt-2 text-[13px] leading-relaxed text-white/75">{sit.why}</p>
            <Link
              href={`/landing/${rec.slug}`}
              className="mt-4 block rounded-xl bg-pink-grad py-3.5 text-center text-[15px] font-extrabold text-white shadow-cta"
            >
              내 무기 찾기
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
