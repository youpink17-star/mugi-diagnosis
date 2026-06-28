import type { ProfileType, SuccessPattern } from "@/lib/profile";

// 유형 심화 리포트 (전체 무료) — 결과/프로필 공용.
// 특징·강점/약점·핵심무기·돈버는법·망하는패턴·성공패턴·30일 플랜.
export default function TypeReport({
  type,
  successPattern,
}: {
  type: ProfileType;
  successPattern: SuccessPattern;
}) {
  return (
    <>
      {/* 이런 유형이에요 */}
      <section className="border-t border-line px-5 pt-6">
        <h2 className="mb-2 text-[16px] font-extrabold text-ink">
          {type.emoji} {type.name} — {type.oneLine}
        </h2>
        <p className="text-[14px] leading-relaxed text-ink/80">{type.free}</p>
      </section>

      {/* 특징 */}
      <section className="px-5 pt-5">
        <h2 className="mb-2 text-[16px] font-extrabold text-ink">🔎 이런 특징이 있어요</h2>
        <div className="space-y-2">
          {type.traits.map((t, i) => (
            <div key={i} className="flex gap-2.5 rounded-xl border border-line bg-white px-4 py-3 text-[14px] text-ink/85">
              <span className="text-pink">·</span>
              <span>{t}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 강점 빛나는 순간 / 약점 나오는 순간 */}
      <section className="px-5 pt-5">
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="rounded-2xl border border-line bg-white p-4">
            <p className="text-[12px] font-bold text-pink">강점이 빛날 때</p>
            <p className="mt-1 text-[13.5px] leading-relaxed text-ink/85">{type.shine}</p>
          </div>
          <div className="rounded-2xl border border-line bg-white p-4">
            <p className="text-[12px] font-bold text-purple">약점이 나올 때</p>
            <p className="mt-1 text-[13.5px] leading-relaxed text-ink/85">{type.shade}</p>
          </div>
        </div>
      </section>

      {/* 핵심 무기 */}
      <section className="px-5 pt-5">
        <h2 className="mb-2 text-[16px] font-extrabold text-ink">🗡️ 내 핵심 무기</h2>
        <div className="flex flex-wrap gap-2">
          {type.strengths.map((s, i) => (
            <span key={i} className="rounded-full bg-soft-pink px-3 py-1.5 text-[13px] font-bold text-pink">
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* 돈 버는 루트 */}
      <section className="px-5 pt-5">
        <h2 className="mb-2 text-[16px] font-extrabold text-ink">💰 나의 돈 버는 루트</h2>
        <div className="rounded-2xl bg-navy p-4 text-center text-white">
          <p className="text-[15px] font-extrabold leading-relaxed text-pink">{type.moneyRoute}</p>
        </div>
      </section>

      {/* 망하는 패턴 */}
      <section className="px-5 pt-5">
        <h2 className="mb-2 text-[16px] font-extrabold text-ink">⚠️ 내가 반복하는 망하는 패턴</h2>
        <div className="space-y-2">
          {type.failurePatterns.map((f, i) => (
            <div key={i} className="flex gap-2.5 rounded-xl border border-line bg-white px-4 py-3 text-[14px] text-ink/85">
              <span className="text-pink">✗</span>
              <span>{f}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 성공 패턴 */}
      <section className="px-5 pt-5">
        <h2 className="mb-2 text-[16px] font-extrabold text-ink">🧭 나와 비슷한 성공 패턴</h2>
        <div className="rounded-2xl border border-line bg-white p-4">
          <p className="text-[15px] font-extrabold text-ink">{successPattern.title}</p>
          <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink/80">{successPattern.summary}</p>
          <div className="mt-3 rounded-xl bg-soft-pink px-3 py-2.5">
            <p className="text-[12px] font-bold text-pink">주의</p>
            <p className="mt-0.5 text-[13px] leading-relaxed text-ink">{successPattern.warning}</p>
          </div>
          <div className="mt-2 rounded-xl bg-navy px-3 py-2.5">
            <p className="text-[12px] font-bold text-pink">첫 행동</p>
            <p className="mt-0.5 text-[13px] leading-relaxed text-white">{successPattern.firstAction}</p>
          </div>
        </div>
      </section>

      {/* 30일 액션 */}
      <section className="px-5 pb-6 pt-5">
        <h2 className="mb-3 text-[16px] font-extrabold text-ink">🗓️ 지금 해야 할 30일 액션</h2>
        <ol className="space-y-2.5">
          {type.thirtyDayPlan.map((p, i) => (
            <li key={i} className="flex gap-3 rounded-2xl border border-line bg-white p-4">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy text-[12px] font-bold text-white">
                {i + 1}
              </span>
              <span className="text-[14px] font-semibold leading-relaxed text-ink">{p}</span>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
