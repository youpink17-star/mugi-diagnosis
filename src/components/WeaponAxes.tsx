// A. 나의 3축 점수 — E/S · R/I · N/P 의 기울기를 막대로. "왜 이 유형인지" 근거.
const AXES = [
  { left: "도전·확장", right: "안정·완성", lp: "E", rp: "S" },
  { left: "함께·관계", right: "혼자·독립", lp: "R", rp: "I" },
  { left: "감·유연", right: "계획·체계", lp: "N", rp: "P" },
];

// 한 축은 8문항 × 최대 2점 = 차이가 최대 16점. 차이가 클수록 한쪽으로 뚜렷하다.
const MAX_DIFF = 16;

export default function WeaponAxes({ scores }: { scores: Record<string, number> }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-5">
      <h3 className="flex items-center gap-2 text-[16px] font-extrabold text-ink">
        <span className="text-[18px]">📊</span>나의 3축 점수
      </h3>
      <p className="mt-1 text-[12.5px] leading-relaxed text-muted">
        이 기울기가 모여 내 유형이 정해졌어요. 50%에 가까울수록 양쪽을 다 가진 거예요.
      </p>
      <div className="mt-4 space-y-4">
        {AXES.map((a) => {
          const l = Math.max(0, scores[a.lp] ?? 0);
          const r = Math.max(0, scores[a.rp] ?? 0);
          // 유형 판정과 같은 규칙: 점수가 같으면 더 강하게 답한 쪽
          const leftWin = l !== r ? l > r : (scores[`${a.rp}x`] ?? 0) <= (scores[`${a.lp}x`] ?? 0);
          const pct = Math.min(100, Math.round(50 + (Math.abs(l - r) / MAX_DIFF) * 50));
          return (
            <div key={a.lp}>
              <div className="flex items-center justify-between text-[12.5px] font-bold">
                <span className={leftWin ? "text-pink" : "text-muted"}>
                  {a.left} {leftWin && `${pct}%`}
                </span>
                <span className={!leftWin ? "text-pink" : "text-muted"}>
                  {!leftWin && `${pct}%`} {a.right}
                </span>
              </div>
              {/* 이긴 쪽에서부터 채운다 (오른쪽 성향이면 오른쪽부터) */}
              <div className={`mt-1.5 flex h-2.5 overflow-hidden rounded-full bg-[#EDEBF5] ${leftWin ? "justify-start" : "justify-end"}`}>
                <div className="h-full rounded-full bg-pink transition-all" style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
