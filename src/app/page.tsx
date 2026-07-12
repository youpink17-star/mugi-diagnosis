import AppHeader from "@/components/AppHeader";
import DiagnosisIllustration from "@/components/DiagnosisIllustration";
import HeroIllustration from "@/components/HeroIllustration";
import Link from "next/link";
import { MAP_URL } from "@/lib/links";

// 무기진단 = 한 페이지 웹사이트. 표지+테스트 → 무기상점 → 지도 로 스크롤.
// 실제 상품 카탈로그(무기상점)는 무기지도 쪽이 최신 기준이라 여기서는 목록을 따로 두지 않고 링크만 건다.
export default function HomePage() {
  return (
    <>
      <AppHeader />

      {/* 히어로 = 표지: 타이틀 → 일러스트 → CTA → 한 줄 소개 (데스크톱은 넓게) */}
      <section className="w-full bg-gradient-to-b from-[#ECE6FB] via-[#F4F0FE] to-white text-ink">
        <div className="mx-auto max-w-2xl px-6 pb-10 pt-10 text-center md:max-w-3xl md:pb-16 md:pt-16">
          <p className="text-[12px] font-extrabold tracking-wide text-pink md:text-[13px]">1인사업가 무기 유형 테스트</p>
          <h1 className="mt-2 text-[26px] font-extrabold leading-[1.35] md:text-[42px]">
            내 사업 유형은 뭘까?
            <br />
            <span className="text-pink">나만의 무기를 찾아보세요.</span>
          </h1>

          {/* 표지 일러스트 (SVG 직접 렌더 — 엑박 방지) */}
          <DiagnosisIllustration className="mx-auto mt-6 block h-auto w-[82%] max-w-[300px] md:mt-9 md:max-w-[360px]" />

          <Link
            href="/test/weapon"
            className="mx-auto mt-7 block w-full rounded-2xl bg-pink-grad py-4 text-center text-[16px] font-extrabold text-white shadow-cta md:mt-9 md:inline-block md:w-auto md:px-20 md:text-[17px]"
          >
            내 무기 찾기 →
          </Link>

          <p className="mx-auto mt-4 max-w-[330px] text-[12.5px] leading-relaxed text-muted md:max-w-md md:text-[14px]">
            무기진단은 사용자의 강점과 약점, 일하는 방식을 분석하여 나만의 무기를 8가지로 분류해드립니다.
          </p>
        </div>
      </section>

      <main className="mx-auto w-full max-w-3xl px-5 pt-3 md:px-6">
        {/* 무기상점 — 진단 다음, 실제로 살펴볼 상품들 (카탈로그는 무기지도 기준) */}
        <section id="tools" className="scroll-mt-20 mt-10">
          <div className="mb-3 text-center">
            <h2 className="text-[18px] font-extrabold text-ink">
              진단 다음은 <span className="text-pink">무기상점</span>
            </h2>
            <p className="mt-1 text-[13px] leading-relaxed text-muted">
              내 무기 유형에 맞는 다음 단계를 무기상점에서 확인하세요.
            </p>
          </div>

          <a
            href={`${MAP_URL}/tools`}
            className="flex items-center gap-3 rounded-2xl border border-pink/30 bg-soft-pink p-4 transition active:scale-[0.99]"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-[22px]">🛒</span>
            <div className="min-w-0 flex-1">
              <p className="text-[14.5px] font-extrabold text-ink">내 무기를 실제 매출로</p>
              <p className="mt-0.5 text-[12.5px] leading-relaxed text-muted">
                무료로 내 무기를 찾고, 필요할 때 한 단계씩 올라가세요
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-pink px-2.5 py-1 text-[11px] font-bold text-white">바로가기 ↗</span>
          </a>
        </section>

        {/* 지도 — 내 무기를 사업 지도로 */}
        <section id="map" className="scroll-mt-20 mt-10 rounded-3xl bg-gradient-to-b from-white to-[#F4F0FE] px-5 pb-6 pt-7 ring-1 ring-line">
          <h2 className="text-center text-[18px] font-extrabold text-ink">
            내 무기는 <span className="text-pink">한 장의 지도</span>로
          </h2>
          <p className="mt-1.5 text-center text-[13px] leading-relaxed text-muted">
            내 무기 유형을 사업 지도에 담으면
            <br />
            내 사업 전체가 한눈에 이어져요.
          </p>

          <HeroIllustration className="mx-auto mt-4 block h-auto w-[86%] max-w-[300px]" />

          <a
            href={MAP_URL}
            className="mt-5 block rounded-2xl bg-navy py-3.5 text-center text-[15px] font-extrabold text-white"
          >
            내 사업 지도 열기 →
          </a>
        </section>

        <footer className="mt-9 border-t border-line py-6 text-center text-[12px] text-muted">
          <b className="text-ink">무기진단</b> · 내 무기를 찾는 진단
        </footer>
      </main>
    </>
  );
}
