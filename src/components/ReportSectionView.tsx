import type { ReportSection, ReportSticker } from "@/lib/types";

// 스티커 색·기울기는 순서대로 돌려 쓴다 (같은 답이면 늘 같은 모양 — 랜덤 금지: 서버/브라우저 화면이 달라짐)
const STICKER_TONES = [
  { bg: "#FFE27A", fg: "#3D2E00" }, // 버터
  { bg: "#C9F0DC", fg: "#0B3B2A" }, // 민트
  { bg: "#07071F", fg: "#FFFFFF" }, // 네이비
  { bg: "#DCD2FF", fg: "#2A1B66" }, // 라벤더
  { bg: "#FFD3DF", fg: "#6B1535" }, // 로즈
  { bg: "#CFE8FF", fg: "#0B3358" }, // 스카이
  { bg: "#FFD9C2", fg: "#5A2408" }, // 피치
];
const STICKER_TILTS = [-4, 3, -2, 5, -5, 2, 4, -3, 6, -2];

const STICKER_SHAPE: Record<NonNullable<ReportSticker["shape"]>, string> = {
  pill: "rounded-full px-4 py-2 text-[13.5px]",
  box: "rounded-[10px] px-3.5 py-2 text-[13.5px]",
  tape: "rounded-[3px] px-4 py-1.5 text-[13px]",
  round: "grid h-[62px] w-[62px] place-items-center rounded-full text-center text-[13px] leading-tight",
  speech: "rounded-[18px] rounded-bl-[4px] px-4 py-2.5 text-[15px]",
};

function StickerSheet({ stickers }: { stickers: ReportSticker[] }) {
  return (
    <div
      className="mt-3 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-3.5 rounded-2xl px-3 py-6"
      // 스티커 대지(모눈 점)
      style={{
        backgroundColor: "#F3F1F8",
        backgroundImage: "radial-gradient(#D9D5E6 1px, transparent 1px)",
        backgroundSize: "14px 14px",
      }}
    >
      {stickers.map((s, i) => {
        const tone = STICKER_TONES[i % STICKER_TONES.length];
        return (
          <span
            key={i}
            className={`inline-block border-[3px] border-white font-extrabold shadow-[0_3px_0_rgba(7,7,31,0.10),0_8px_16px_rgba(7,7,31,0.10)] ${
              STICKER_SHAPE[s.shape ?? "pill"]
            }`}
            style={{
              backgroundColor: tone.bg,
              color: tone.fg,
              transform: `rotate(${STICKER_TILTS[i % STICKER_TILTS.length]}deg)`,
            }}
          >
            {s.text}
          </span>
        );
      })}
    </div>
  );
}

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

      {/* 스티커 시트 (유형 특징을 말투로) */}
      {section.stickers && section.stickers.length > 0 && <StickerSheet stickers={section.stickers} />}

      {/* 알약 (핵심 무기 등) — 핑크는 유형 이름·점수·버튼에만 쓰고 여기는 중립색 */}
      {section.chips && section.chips.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {section.chips.map((c, i) => (
            <span
              key={i}
              className="rounded-full bg-[#F1F0F6] px-3.5 py-1.5 text-[13px] font-bold text-ink"
            >
              {c}
            </span>
          ))}
        </div>
      )}

      {/* 네이비 강조 박스 (돈 버는 루트 · 지금 필요한 무기 등) */}
      {/* "라벨 — 상세" 형식이면 라벨은 굵은 흰색, 상세는 옅은 흰색으로 분리 */}
      {section.highlight && (() => {
        const sep = " — ";
        const idx = section.highlight.indexOf(sep);
        if (idx === -1) {
          return (
            <div className="mt-3 rounded-2xl bg-navy p-4 text-center">
              <p className="text-[15px] font-extrabold leading-relaxed text-white">
                {section.highlight}
              </p>
            </div>
          );
        }
        const label = section.highlight.slice(0, idx);
        const detail = section.highlight.slice(idx + sep.length);
        return (
          <div className="mt-3 rounded-2xl bg-navy p-4 text-center">
            <p className="text-[15px] font-extrabold leading-relaxed text-white">{label}</p>
            <p className="mt-1 text-[13.5px] leading-relaxed text-white/75">{detail}</p>
          </div>
        );
      })()}

      {/* 불릿 */}
      {section.bullets && section.bullets.length > 0 && (
        <ul className="mt-4 space-y-2.5">
          {section.bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-ink/85">
              <span className="mt-[2px] grid h-[18px] w-[18px] shrink-0 place-items-center rounded-[6px] bg-[#F1F0F6]">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                  <path d="M5 13l4 4L19 7" stroke="#07071F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
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
            <div key={i} className="rounded-xl bg-app-bg px-4 py-3">
              <p className="text-[14px] font-extrabold text-ink">{ex.name}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-ink/80">{ex.desc}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
