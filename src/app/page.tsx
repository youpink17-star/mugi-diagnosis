import AppHeader from "@/components/AppHeader";
import BottomTabs from "@/components/BottomTabs";
import Link from "next/link";
import { STAGES } from "@/lib/journey";
import { getProduct } from "@/lib/products";
import { MAP_URL } from "@/lib/links";

// 무기진단 홈 — 내 무기를 알아보는 진단 코너. 결과는 무기지도(본체)로 옮겨 정리.
export default function HomePage() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto w-full max-w-app flex-1 px-4 pb-2">
        {/* 인트로 */}
        <section className="mt-4 rounded-3xl bg-navy p-6 text-white">
          <p className="text-[12px] font-bold text-pink">무기진단</p>
          <h1 className="mt-1.5 text-[21px] font-extrabold leading-snug">
            막막할 땐,
            <br />진단으로 시작하세요
          </h1>
          <p className="mt-2 text-[13px] leading-relaxed text-white/70">
            몇 가지 질문이면 방향이 잡힙니다. 전부 무료. 결과는 <b className="text-white">무기지도</b>로 옮겨 한 장의 사업 지도로 정리하세요.
          </p>
          <a
            href={MAP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block rounded-xl bg-pink-grad px-4 py-2.5 text-[14px] font-extrabold text-white shadow-cta"
          >
            내 사업 지도 열기 →
          </a>
        </section>

        {/* 단계별 진단 목록 */}
        {STAGES.map((stage) => {
          const products = stage.slugs.map(getProduct).filter(Boolean);
          if (products.length === 0) return null;
          return (
            <section key={stage.id} className="pt-7">
              <div className="mb-3 flex items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-soft-pink text-[18px]">
                  {stage.emoji}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-bold text-purple">{stage.step}단계</p>
                  <h2 className="text-[16px] font-extrabold leading-tight text-ink">{stage.title}</h2>
                </div>
              </div>
              <div className="space-y-2.5">
                {products.map((p) => (
                  <Link
                    key={p!.slug}
                    href={`/landing/${p!.slug}`}
                    className="flex items-center gap-3 rounded-2xl border border-line bg-white p-4 transition hover:border-pink"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-soft-pink text-[22px]">
                      {p!.emoji}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-1.5">
                        <span className="truncate text-[14.5px] font-extrabold text-ink">{p!.title}</span>
                        {p!.badge && (
                          <span className="shrink-0 rounded-full bg-pink px-1.5 py-0.5 text-[9px] font-bold text-white">
                            {p!.badge}
                          </span>
                        )}
                      </span>
                      <span className="mt-0.5 block truncate text-[12.5px] text-muted">{p!.short}</span>
                    </span>
                    <span className="shrink-0 rounded-full bg-app-bg px-2.5 py-1 text-[11px] font-bold text-pink">
                      무료
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        <footer className="mt-9 border-t border-line py-6 text-center text-[12px] text-muted">
          진단 결과는 <b className="text-ink">무기지도</b>로 옮겨 한 장으로 정리됩니다.
        </footer>
      </main>
      <BottomTabs active="home" />
    </>
  );
}
