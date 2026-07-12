import type { ReportSection } from "@/lib/types";

export default function ReportSectionView({ section }: { section: ReportSection }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-5">
      <h3 className="flex items-center gap-2 text-[16px] font-extrabold text-ink">
        {section.icon && <span className="text-[18px]">{section.icon}</span>}
        {section.heading}
      </h3>

      {/* 본문: \n\n 으로 문단 분리 (없으면 생략) */}
      {section.body && (
        <div className="mt-3 space-y-3">
          {section.body.split("\n\n").map((para, i) => (
            <p
              key={i}
              className="text-[14px] leading-relaxed text-ink/85"
              // **굵게** 마크업만 가볍게 지원
              dangerouslySetInnerHTML={{
                __html: para.replace(
                  /\*\*(.+?)\*\*/g,
                  '<b class="font-bold text-ink">$1</b>'
                ),
              }}
            />
          ))}
        </div>
      )}

      {/* 핑크 알약 (핵심 무기 등) */}
      {section.chips && section.chips.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {section.chips.map((c, i) => (
            <span
              key={i}
              className="rounded-full bg-soft-pink px-3.5 py-1.5 text-[13px] font-bold text-pink"
            >
              {c}
            </span>
          ))}
        </div>
      )}

      {/* 네이비 강조 박스 (돈 버는 루트 · 지금 필요한 무기 등) */}
      {/* "라벨 — 상세" 형식이면 라벨은 핑크, 상세는 흰색으로 분리. 구분자 없으면(예: 돈 버는 루트) 기존처럼 전체 핑크 */}
      {section.highlight && (() => {
        const sep = " — ";
        const idx = section.highlight.indexOf(sep);
        if (idx === -1) {
          return (
            <div className="mt-3 rounded-2xl bg-navy p-4 text-center">
              <p className="text-[15px] font-extrabold leading-relaxed text-pink">
                {section.highlight}
              </p>
            </div>
          );
        }
        const label = section.highlight.slice(0, idx);
        const detail = section.highlight.slice(idx + sep.length);
        return (
          <div className="mt-3 rounded-2xl bg-navy p-4 text-center">
            <p className="text-[15px] font-extrabold leading-relaxed text-pink">{label}</p>
            <p className="mt-1 text-[13.5px] leading-relaxed text-white">{detail}</p>
          </div>
        );
      })()}

      {/* 불릿 */}
      {section.bullets && section.bullets.length > 0 && (
        <ul className="mt-4 space-y-2.5">
          {section.bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-ink/85">
              <span className="mt-[2px] grid h-[18px] w-[18px] shrink-0 place-items-center rounded-[6px] bg-soft-pink">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                  <path d="M5 13l4 4L19 7" stroke="#FF2F8F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}

      {/* 사례 (닮은 사업가/브랜드/직무) */}
      {section.examples && section.examples.length > 0 && (
        <div className="mt-4 space-y-2">
          {section.examples.map((ex, i) => (
            <div key={i} className="rounded-xl bg-soft-pink px-4 py-3">
              <p className="text-[14px] font-extrabold text-pink">{ex.name}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-ink/80">{ex.desc}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
