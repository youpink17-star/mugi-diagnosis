import AppHeader from "@/components/AppHeader";
import MapRoadmap from "@/components/MapRoadmap";
import { MAP_URL } from "@/lib/links";

// 무기지도 설명 페이지 — 외부 본체 앱으로 바로 안 보내고, 먼저 무엇인지 설명 + 로드맵 미리보기 뒤 버튼으로 이동.
export default function MapPage() {
  return (
    <>
      <AppHeader title="내 사업 지도" />
      <main className="mx-auto w-full max-w-app flex-1 px-4 pb-6">
        <section className="mt-5 rounded-3xl bg-navy p-6 text-white">
          <p className="text-[12px] font-bold text-pink">무기지도</p>
          <h1 className="mt-1.5 text-[20px] font-extrabold leading-snug">
            머릿속에만 있던 사업을
            <br />한 장으로 정리하세요
          </h1>
          <p className="mt-2.5 text-[13px] leading-relaxed text-white/70">
            내 강점, 팔 상품, 고객, 차별화, 콘텐츠, 판매 흐름을 한 곳에 모아 지금 내 사업이 어디까지 정리됐고, 다음에 무엇을 채워야 하는지 확인할 수 있습니다.
          </p>
        </section>

        {/* 무기지도 빈칸 로드맵 미리보기 */}
        <section className="mt-5">
          <p className="mb-2 px-1 text-[13px] font-bold text-ink/60">이렇게 한 칸씩 채워갑니다</p>
          <MapRoadmap />
        </section>

        <a
          href={MAP_URL}
          className="mt-6 block rounded-2xl bg-navy py-3.5 text-center text-[15px] font-extrabold text-white"
        >
          내 사업 지도 열기 →
        </a>
      </main>
    </>
  );
}
