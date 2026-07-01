"use client";
import Link from "next/link";

// C. 결과 공유 — 무료 퍼널의 바이럴 고리.
export default function WeaponShare() {
  function copy() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(
        () => alert("결과 링크가 복사됐어요."),
        () => alert(url)
      );
    } else {
      alert(url);
    }
  }

  return (
    <div className="flex gap-2.5 px-5 pb-8">
      <button
        type="button"
        onClick={copy}
        className="flex-1 rounded-2xl border border-line bg-white py-3.5 text-[13.5px] font-bold text-ink transition hover:border-pink"
      >
        결과 링크 복사
      </button>
      <Link
        href="/test/weapon"
        className="flex-1 rounded-2xl border border-line bg-white py-3.5 text-center text-[13.5px] font-bold text-ink transition hover:border-pink"
      >
        다시 테스트하기
      </Link>
    </div>
  );
}
