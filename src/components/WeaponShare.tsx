"use client";
import Link from "next/link";
import { useState } from "react";

// C. 결과 공유 — 무료 퍼널의 바이럴 고리.
export default function WeaponShare() {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  function copy() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const done = () => {
      setState("copied");
      window.setTimeout(() => setState("idle"), 2200);
    };
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(done, () => setState("failed"));
    } else {
      setState("failed");
    }
  }

  return (
    <div className="px-5 pb-8">
      <div className="flex gap-2.5">
        <button
          type="button"
          onClick={copy}
          className={`flex-1 rounded-2xl border py-3.5 text-[13.5px] font-bold transition ${
            state === "copied" ? "border-pink bg-soft-pink text-pink" : "border-line bg-white text-ink hover:border-pink"
          }`}
        >
          {state === "copied" ? "복사됐어요 ✓" : "결과 링크 복사"}
        </button>
        <Link
          href="/test/weapon"
          className="flex-1 rounded-2xl border border-line bg-white py-3.5 text-center text-[13.5px] font-bold text-ink transition hover:border-pink"
        >
          다시 테스트하기
        </Link>
      </div>
      {state === "failed" && (
        <p className="mt-2 text-center text-[12px] text-muted">
          자동 복사가 안 됐어요. 주소창의 링크를 길게 눌러 복사해주세요.
        </p>
      )}
    </div>
  );
}
