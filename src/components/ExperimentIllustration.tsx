// 실험북 일러스트 (순수 SVG, 텍스트/이모지 없음) — 실험 플라스크 + 오르는 그래프로 "찍먹 실험 → 매출 전환"을 표현.
// 무기지도 일러스트와 같은 팔레트(navy/pink/purple). 전부 도형으로만 그림.
export default function ExperimentIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 190"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="마케팅 실험으로 매출 그래프가 오르는 일러스트"
    >
      <defs>
        <linearGradient id="expFlask" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FF6FB0" />
          <stop offset="1" stopColor="#FF2F8F" />
        </linearGradient>
      </defs>

      {/* 배경 패널 */}
      <rect x="8" y="14" width="304" height="150" rx="22" fill="#F4F0FE" />
      <circle cx="266" cy="44" r="20" fill="#FFFFFF" opacity="0.55" />
      <circle cx="44" cy="132" r="15" fill="#FFFFFF" opacity="0.5" />

      {/* 실험 노트(왼쪽) */}
      <g>
        <rect x="40" y="66" width="82" height="70" rx="10" fill="#FFFFFF" stroke="#E8E4F5" />
        <rect x="40" y="66" width="10" height="70" rx="5" fill="#07071F" />
        <rect x="60" y="82" width="48" height="7" rx="3.5" fill="#E3DEF2" />
        <rect x="60" y="96" width="38" height="7" rx="3.5" fill="#E3DEF2" />
        <rect x="60" y="110" width="42" height="7" rx="3.5" fill="#FF8FBE" />
        {/* 체크 표시 */}
        <path d="M63 122 l6 6 12 -13" fill="none" stroke="#8B5CF6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* 실험 플라스크 (가운데) */}
      <g>
        <path
          d="M154 62 h20 v22 l18 34 a16 16 0 0 1 -14 24 h-28 a16 16 0 0 1 -14 -24 l18 -34 z"
          fill="#FFFFFF"
          stroke="#07071F"
          strokeWidth="4"
        />
        {/* 목 밴드 */}
        <rect x="150" y="58" width="28" height="8" rx="3" fill="#07071F" />
        {/* 안의 액체 */}
        <path
          d="M138 116 a16 16 0 0 0 2 8 a16 16 0 0 0 14 8 h28 a16 16 0 0 0 14 -8 a16 16 0 0 0 2 -8 z"
          fill="url(#expFlask)"
        />
        {/* 기포 */}
        <circle cx="160" cy="108" r="3" fill="#FFFFFF" opacity="0.8" />
        <circle cx="172" cy="118" r="2.2" fill="#FFFFFF" opacity="0.7" />
      </g>

      {/* 오르는 매출 그래프 (오른쪽) */}
      <g>
        <path d="M210 140 H274" stroke="#D9D3F0" strokeWidth="2" />
        <path d="M210 140 V80" stroke="#D9D3F0" strokeWidth="2" />
        <path
          d="M214 132 L232 120 L248 126 L266 92"
          fill="none"
          stroke="#8B5CF6"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="266" cy="92" r="6" fill="#FF2F8F" />
      </g>

      {/* 반짝임 */}
      <g fill="#FFB7D8">
        <path d="M164 40 l1.8 4.6 4.6 1.8 -4.6 1.8 -1.8 4.6 -1.8 -4.6 -4.6 -1.8 4.6 -1.8 z" opacity="0.9" />
        <path d="M286 130 l1.3 3.4 3.4 1.3 -3.4 1.3 -1.3 3.4 -1.3 -3.4 -3.4 -1.3 3.4 -1.3 z" opacity="0.75" />
      </g>
    </svg>
  );
}
