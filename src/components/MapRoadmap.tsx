// 무기지도 빈칸 로드맵 미리보기 (정적 일러스트, 비인터랙티브).
// 무기지도(본체)의 WikiJourney 퀘스트맵 스타일을 그대로 본떠 보여준다.
// 길/구름/보물상자는 SVG 도형, 노드 아이콘·라벨은 HTML(이모지 OK).
type NodeState = "done" | "next" | "empty";

const NODES: { icon: string; label: string; state: NodeState }[] = [
  { icon: "🧭", label: "1. 개요", state: "done" },
  { icon: "⚔️", label: "2. 내 무기", state: "next" },
  { icon: "💎", label: "3. 팔 것", state: "empty" },
  { icon: "🎯", label: "4. 고객", state: "empty" },
  { icon: "✨", label: "5. 차별화", state: "empty" },
  { icon: "📣", label: "6. 콘텐츠", state: "empty" },
  { icon: "💳", label: "7. 판매 흐름", state: "empty" },
];

const W = 320;
const CX = 160;
const AMP = 72;
const TOP = 48;
const DY = 96;

export default function MapRoadmap({ className = "" }: { className?: string }) {
  const pts = NODES.map((n, i) => ({
    ...n,
    x: CX + AMP * Math.sin(i * 1.0),
    y: TOP + i * DY,
  }));
  const goal = { x: CX, y: TOP + (NODES.length - 1) * DY + 86 };
  const H = goal.y + 48;

  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1];
    const b = pts[i];
    const my = (a.y + b.y) / 2;
    d += ` C ${a.x} ${my}, ${b.x} ${my}, ${b.x} ${b.y}`;
  }
  {
    const a = pts[pts.length - 1];
    const my = (a.y + goal.y) / 2;
    d += ` C ${a.x} ${my}, ${goal.x} ${my}, ${goal.x} ${goal.y}`;
  }

  const clouds = [
    { x: 62, y: 34, s: 0.9 },
    { x: 268, y: 84, s: 0.76 },
    { x: 128, y: 150, s: 0.6 },
    { x: 244, y: 250, s: 0.7 },
    { x: 74, y: 332, s: 0.64 },
    { x: 252, y: 430, s: 0.66 },
  ];

  return (
    <div
      className={`relative w-full overflow-hidden rounded-3xl bg-gradient-to-b from-[#DCEBFF] via-[#E9E8FF] to-[#DBF2E4] ${className}`}
    >
      <div className="relative mx-auto" style={{ width: W, height: H, maxWidth: "100%" }}>
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="absolute inset-0" aria-hidden="true">
          {clouds.map((c, i) => (
            <Cloud key={i} x={c.x} y={c.y} s={c.s} />
          ))}

          {/* 길 */}
          <path d={d} fill="none" stroke="#07071f" strokeOpacity="0.06" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" />
          <path d={d} fill="none" stroke="#ffffff" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
          <path d={d} fill="none" stroke="#FFB7D8" strokeWidth="2.5" strokeDasharray="1 9" strokeLinecap="round" />

          {/* 시작 깃발 */}
          <rect x={pts[0].x - 22} y={pts[0].y - 40} width="2.5" height="22" rx="1" fill="#94A1B2" />
          <path d={`M ${pts[0].x - 20} ${pts[0].y - 40} L ${pts[0].x - 7} ${pts[0].y - 35} L ${pts[0].x - 20} ${pts[0].y - 30} Z`} fill="#FF2F8F" />

          {/* 목표 보물상자 */}
          <ellipse cx={goal.x} cy={goal.y + 18} rx="20" ry="5" fill="#07071F" opacity="0.10" />
          <rect x={goal.x - 16} y={goal.y - 2} width="32" height="22" rx="4" fill="#F2B33A" />
          <rect x={goal.x - 16} y={goal.y - 10} width="32" height="10" rx="3" fill="#FFD36B" />
          <rect x={goal.x - 3} y={goal.y - 10} width="6" height="30" fill="#E0922A" />
        </svg>

        {pts.map((n, i) => (
          <Node key={i} icon={n.icon} label={n.label} state={n.state} x={n.x} y={n.y} />
        ))}

        <div className="absolute -translate-x-1/2 text-center" style={{ left: goal.x, top: goal.y + 26 }}>
          <span className="rounded-full border border-line bg-white px-2.5 py-0.5 text-[11px] font-bold text-ink shadow-sm">
            목적지 · 전부 채우기
          </span>
        </div>
      </div>
    </div>
  );
}

function Cloud({ x, y, s }: { x: number; y: number; s: number }) {
  return (
    <g fill="#FFFFFF" opacity="0.85">
      <ellipse cx={x} cy={y} rx={17 * s} ry={11 * s} />
      <ellipse cx={x + 15 * s} cy={y + 3 * s} rx={12 * s} ry={8 * s} />
      <ellipse cx={x - 14 * s} cy={y + 3 * s} rx={11 * s} ry={7 * s} />
      <rect x={x - 24 * s} y={y + 1 * s} width={48 * s} height={9 * s} rx={5 * s} />
    </g>
  );
}

function Node({
  icon,
  label,
  state,
  x,
  y,
}: {
  icon: string;
  label: string;
  state: NodeState;
  x: number;
  y: number;
}) {
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: x, top: y }}>
      {state === "next" && (
        <div className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <span className="relative rounded-full border border-pink bg-white px-2.5 py-0.5 text-[11px] font-extrabold text-pink shadow-sm">
            여기 채우기!
          </span>
          <span className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 border-x-[5px] border-t-[6px] border-x-transparent border-t-pink" />
        </div>
      )}

      <div
        className={[
          "relative grid h-[52px] w-[52px] place-items-center rounded-full border-[3px] text-[21px] shadow-[0_6px_14px_rgba(7,7,31,0.14)]",
          state === "done" ? "border-white bg-purple text-white" : "border-pink bg-white",
          state === "next" ? "animate-bounce-slow ring-4 ring-pink/20" : "",
        ].join(" ")}
      >
        {icon}
        <span
          className={`absolute -right-1 -top-1 grid h-[18px] w-[18px] place-items-center rounded-full border-2 border-white text-[9px] font-bold ${
            state === "done" ? "bg-purple text-white" : "bg-pink text-white"
          }`}
        >
          {state === "done" ? "✎" : "+"}
        </span>
      </div>

      <div className="absolute left-1/2 top-[56px] -translate-x-1/2 whitespace-nowrap">
        <span className="rounded-full bg-white/90 px-2 py-0.5 text-[10.5px] font-bold text-ink shadow-sm">
          {label}
        </span>
      </div>
    </div>
  );
}
