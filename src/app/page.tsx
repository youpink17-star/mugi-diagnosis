import AppHeader from "@/components/AppHeader";
import DiagnosisIllustration from "@/components/DiagnosisIllustration";
import HeroIllustration from "@/components/HeroIllustration";
import ToolsIllustration from "@/components/ToolsIllustration";
import ExperimentIllustration from "@/components/ExperimentIllustration";
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

          <div className="space-y-4">
            {/* 콘텐츠 제조실 */}
            <div className="rounded-3xl bg-gradient-to-b from-white to-[#F4F0FE] px-5 pb-6 pt-7 ring-1 ring-line">
              <h3 className="text-center text-[16px] font-extrabold text-ink">
                콘텐츠가 안 나온다면 <span className="text-pink">콘텐츠 제조실</span>
              </h3>
              <p className="mt-1.5 text-center text-[13px] leading-relaxed text-muted">
                인스타·블로그·유튜브까지, 뭘 사야 할지 고민 없이
                <br />
                콘텐츠를 계속 찍어내는 노션 시스템이에요.
              </p>
              <ToolsIllustration className="mx-auto mt-4 block h-auto w-[86%] max-w-[300px]" />
              <a
                href={`${MAP_URL}/tools`}
                className="mt-5 block rounded-2xl bg-navy py-3.5 text-center text-[15px] font-extrabold text-white"
              >
                콘텐츠 제조실 보기 →
              </a>
            </div>

            {/* AI 마케팅 실험북 */}
            <div className="rounded-3xl bg-gradient-to-b from-white to-[#F4F0FE] px-5 pb-6 pt-7 ring-1 ring-line">
              <h3 className="text-center text-[16px] font-extrabold text-ink">
                조회수는 있는데 매출이 없다면 <span className="text-pink">AI 마케팅 실험북</span>
              </h3>
              <p className="mt-1.5 text-center text-[13px] leading-relaxed text-muted">
                가진 트래픽을 매출로 바꾸는 실험을
                <br />
                48시간 안에 직접 돌려보는 워크북이에요.
              </p>
              <ExperimentIllustration className="mx-auto mt-4 block h-auto w-[86%] max-w-[300px]" />
              <a
                href={`${MAP_URL}/tools`}
                className="mt-5 block rounded-2xl bg-navy py-3.5 text-center text-[15px] font-extrabold text-white"
              >
                실험북 보기 →
              </a>
            </div>
          </div>
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
