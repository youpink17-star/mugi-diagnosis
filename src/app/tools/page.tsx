import AppHeader from "@/components/AppHeader";
import { MAP_URL } from "@/lib/links";

// 실제 상품 카탈로그(무기상점)는 무기지도 쪽이 최신 기준. 여기서는 목록을 따로 두지 않고 링크만 건다.
export default function ToolsPage() {
  return (
    <>
      <AppHeader title="도구실" />
      <main className="mx-auto w-full max-w-app flex-1 px-4 pb-6">
        <section className="mt-5 rounded-3xl bg-navy p-6 text-white">
          <p className="text-[12px] font-bold text-pink">도구실</p>
          <h1 className="mt-1.5 text-[20px] font-extrabold leading-snug">
            진단으로 잡은 방향, 이제 굴려보세요
          </h1>
          <p className="mt-2 text-[13px] leading-relaxed text-white/70">
            진단 결과를 무기지도에 정리하고, 무기상점에서 다음 단계를 확인하세요.
          </p>
          <a
            href={MAP_URL}
            className="mt-4 inline-block rounded-xl bg-pink-grad px-4 py-2.5 text-[14px] font-extrabold text-white shadow-cta"
          >
            내 사업 지도로 가기 →
          </a>
        </section>

        {/* 무기상점 — 실제 상품 카탈로그는 무기지도 쪽이 최신 기준 */}
        <a
          href={`${MAP_URL}/tools`}
          className="mt-5 flex items-center gap-3 rounded-2xl border border-pink/30 bg-soft-pink p-4 shadow-card transition active:scale-[0.99]"
        >
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-[22px]">
            🛒
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[14.5px] font-extrabold text-ink">내 무기를 실제 매출로</p>
            <p className="mt-0.5 text-[12.5px] leading-relaxed text-muted">
              무료로 내 무기를 찾고, 필요할 때 한 단계씩 올라가세요
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-pink px-2.5 py-1 text-[11px] font-bold text-white">
            바로가기 ↗
          </span>
        </a>
      </main>
    </>
  );
}
