import AppHeader from "@/components/AppHeader";
import BottomTabs from "@/components/BottomTabs";
import { MAP_URL } from "@/lib/links";

// 콘텐츠 제조실은 별도 독립 사이트. 배포 URL을 환경변수로 연결한다.
const CONTENT_STUDIO_URL =
  process.env.NEXT_PUBLIC_CONTENT_STUDIO_URL || "http://localhost:3001";

// 도구실 — 진단으로 잡은 방향을 실제로 굴리는 도구들. 대부분 준비 중 placeholder.
const TOOLS = [
  { emoji: "🔬", title: "레퍼런스 연구소", desc: "잘 되는 사례를 모아 내 것으로 바꾸는 곳" },
  { emoji: "💬", title: "고객 문구함", desc: "응대·DM·CRM 문구를 보관하고 꺼내 쓰는 곳" },
  { emoji: "📊", title: "사업 상황판", desc: "내 사업의 숫자와 다음 할 일을 한눈에" },
  { emoji: "📡", title: "고객 레이더", desc: "고객이 검색하는 키워드와 불편함을 추적" },
];

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
            진단 결과를 무기지도에 정리하고, 콘텐츠·문구 도구로 실제 실행으로 옮깁니다.
          </p>
          <a
            href={MAP_URL}
            className="mt-4 inline-block rounded-xl bg-pink-grad px-4 py-2.5 text-[14px] font-extrabold text-white shadow-cta"
          >
            내 사업 지도로 가기 →
          </a>
        </section>

        {/* 콘텐츠 제조실 — 별도 사이트로 이동 */}
        <a
          href={CONTENT_STUDIO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 flex items-center gap-3 rounded-2xl border border-pink/30 bg-soft-pink p-4 shadow-card transition active:scale-[0.99]"
        >
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-[22px]">
            ✍️
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[14.5px] font-extrabold text-ink">콘텐츠 제조실</p>
            <p className="mt-0.5 text-[12.5px] leading-relaxed text-muted">
              제목·후킹·대본·CTA를 한 번에 뽑는 콘텐츠 작업대
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-pink px-2.5 py-1 text-[11px] font-bold text-white">
            바로가기 ↗
          </span>
        </a>

        <div className="mt-3 space-y-3">
          {TOOLS.map((t) => (
            <div
              key={t.title}
              className="flex items-center gap-3 rounded-2xl border border-dashed border-line bg-white p-4"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-app-bg text-[22px]">
                {t.emoji}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[14.5px] font-extrabold text-ink">{t.title}</p>
                <p className="mt-0.5 text-[12.5px] leading-relaxed text-muted">{t.desc}</p>
              </div>
              <span className="shrink-0 rounded-full bg-app-bg px-2.5 py-1 text-[11px] font-bold text-muted">
                준비 중
              </span>
            </div>
          ))}
        </div>
      </main>
      <BottomTabs active="tools" />
    </>
  );
}
