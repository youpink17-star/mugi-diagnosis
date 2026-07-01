// A. 나의 3축 점수 — E/S · R/I · N/P 의 기울기를 막대로. "왜 이 유형인지" 근거.
const AXES = [
  { left: "도전·확장", right: "안정·완성", lp: "E", rp: "S" },
  { left: "함께·관계", right: "혼자·독립", lp: "R", rp: "I" },
  { left: "감·유연", right: "계획·체계", lp: "N", rp: "P" },
];

export default function WeaponAxes({ scores }: { scores: Record<string, number> }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-5">
      <h3 className="flex items-center gap-2 text-[16px] font-extrabold text-ink">
        <span className="text-[18px]">📊</span>나의 3축 점수
      </h3>
      <p className="mt-1 text-[12.5px] leading-relaxed text-muted">이 기울기가 모여 내 유형이 정해졌어요.</p>
      <div className="mt-4 space-y-4">
        {AXES.map((a) => {
          const l = Math.max(0, scores[a.lp] ?? 0);
          const r = Math.max(0, scores[a.rp] ?? 0);
          const total = l + r || 1;
          const lp = Math.round((l / total) * 100);
          const leftWin = l >= r;
          return (
            <div key={a.lp}>
              <div className="flex items-center justify-between text-[12.5px] font-bold">
                <span className={leftWin ? "text-pink" : "text-muted"}>
                  {a.left} {leftWin && `${lp}%`}
                </span>
                <span className={!leftWin ? "text-pink" : "text-muted"}>
                  {!leftWin && `${100 - lp}%`} {a.right}
                </span>
              </div>
              <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-[#EDEBF5]">
                <div className="h-full rounded-full bg-pink transition-all" style={{ width: `${lp}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
