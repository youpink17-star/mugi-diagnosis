import AppHeader from "@/components/AppHeader";
import BottomTabs from "@/components/BottomTabs";
import CoverImage from "@/components/CoverImage";
import DiagnosisIllustration from "@/components/DiagnosisIllustration";
import HeroIllustration from "@/components/HeroIllustration";
import Link from "next/link";
import { MAP_URL } from "@/lib/links";

// 무기진단 = 무기 유형 테스트 하나. 무료 퍼널은 입구 1개(MBTI처럼).

// 무기진단 홈 — 진단으로 내 무기를 발견하고, 결과를 무기지도(본체)로 옮겨 정리.
export default function HomePage() {
  return (
    <>
      <AppHeader />

      {/* 히어로 = 표지: 타이틀 → 일러스트 → CTA → 한 줄 소개 */}
      <section className="bg-gradient-to-b from-[#ECE6FB] via-[#F4F0FE] to-white px-6 pb-9 pt-10 text-center text-ink">
        <p className="text-[12px] font-extrabold tracking-wide text-pink">1인사업가 무기 유형 테스트</p>
        <h1 className="mt-2 text-[26px] font-extrabold leading-[1.35]">
          내 사업 유형은 뭘까?
          <br />
          <span className="text-pink">나만의 무기를 찾아보세요.</span>
        </h1>

        {/* 표지 일러스트 — /public/images/weapon/home-cover.png 넣으면 자동 적용, 없으면 SVG */}
        <CoverImage
          src="/images/weapon/home-cover.png"
          alt="무기 유형 테스트"
          className="mx-auto mt-6 block h-auto w-[82%] max-w-[300px]"
          fallback={<DiagnosisIllustration className="mx-auto mt-6 block h-auto w-[82%] max-w-[300px]" />}
        />

        <Link
          href="/test/weapon"
          className="mt-7 block rounded-2xl bg-pink-grad py-4 text-center text-[16px] font-extrabold text-white shadow-cta"
        >
          내 무기 찾기 →
        </Link>

        <p className="mx-auto mt-4 max-w-[330px] text-[12.5px] leading-relaxed text-muted">
          무기진단은 사용자의 강점과 약점, 일하는 방식을 분석하여 나만의 무기를 8가지로 분류해드립니다.
        </p>
      </section>

      <main className="mx-auto w-full max-w-app px-5 pt-3">
        {/* 하단 — 결과는 무기지도로 모인다 + 일러스트 */}
        <section className="mt-10 rounded-3xl bg-gradient-to-b from-white to-[#F4F0FE] px-5 pb-6 pt-7 ring-1 ring-line">
          <h2 className="text-center text-[18px] font-extrabold text-ink">
            진단 결과는 <span className="text-pink">한 장의 지도</span>로
          </h2>
          <p className="mt-1.5 text-center text-[13px] leading-relaxed text-muted">
            흩어진 진단을 무기지도에 옮겨 적으면
            <br />
            내 사업 전체가 한눈에 보입니다.
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

      <BottomTabs active="home" />
    </>
  );
}
