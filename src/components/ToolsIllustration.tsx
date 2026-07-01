// 도구실 일러스트 (순수 SVG, 텍스트/이모지 없음) — 공구함에서 콘텐츠·문구 도구를 꺼내는 한 장면.
// 무기지도 일러스트와 같은 팔레트(navy/pink/purple). 전부 도형으로만 그림.
export default function ToolsIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 190"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="도구실에서 콘텐츠·문구 도구를 꺼내는 일러스트"
    >
      <defs>
        <linearGradient id="toolPink" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FF6FB0" />
          <stop offset="1" stopColor="#FF2F8F" />
        </linearGradient>
      </defs>

      {/* 부드러운 패널 + 장식 */}
      <rect x="8" y="14" width="304" height="150" rx="22" fill="#F4F0FE" />
      <circle cx="272" cy="46" r="22" fill="#FFFFFF" opacity="0.55" />
      <circle cx="46" cy="138" r="17" fill="#FFFFFF" opacity="0.5" />

      {/* 작업대 */}
      <rect x="42" y="150" width="236" height="8" rx="4" fill="#D9D3F0" />
      <ellipse cx="160" cy="162" rx="96" ry="6" fill="#07071F" opacity="0.06" />

      {/* 꺼낸 도구 1 — 콘텐츠 카드 (펜) */}
      <g>
        <rect x="44" y="58" width="84" height="64" rx="11" fill="#FFFFFF" stroke="#E8E4F5" />
        <rect x="56" y="72" width="44" height="8" rx="4" fill="#FF8FBE" />
        <rect x="56" y="88" width="60" height="6" rx="3" fill="#E3DEF2" />
        <rect x="56" y="100" width="50" height="6" rx="3" fill="#E3DEF2" />
        {/* 펜 */}
        <rect x="104" y="92" width="9" height="34" rx="3" fill="#8B5CF6" transform="rotate(40 108 109)" />
        <path d="M118 120 l6 8 -9 -1 z" fill="#07071F" />
      </g>

      {/* 꺼낸 도구 2 — 말풍선(고객 문구) */}
      <g>
        <rect x="206" y="46" width="74" height="50" rx="14" fill="#FFFFFF" stroke="#E8E4F5" />
        <path d="M224 96 l-2 16 17 -14 z" fill="#FFFFFF" stroke="#E8E4F5" />
        <circle cx="228" cy="71" r="4.5" fill="#FF8FBE" />
        <circle cx="244" cy="71" r="4.5" fill="#FF2F8F" />
        <circle cx="260" cy="71" r="4.5" fill="#C7BEEA" />
      </g>

      {/* 공구함 — 가운데 */}
      <g>
        {/* 손잡이 */}
        <path d="M132 96 q28 -22 56 0" fill="none" stroke="#07071F" strokeWidth="6" strokeLinecap="round" />
        {/* 몸통 */}
        <rect x="116" y="108" width="88" height="44" rx="9" fill="#07071F" />
        <rect x="116" y="108" width="88" height="13" rx="6.5" fill="#231a52" />
        {/* 걸쇠 */}
        <rect x="150" y="114" width="20" height="10" rx="3" fill="url(#toolPink)" />
        {/* 렌치가 살짝 삐져나옴 */}
        <g transform="rotate(-24 196 116)">
          <rect x="190" y="86" width="9" height="34" rx="4" fill="#C7BEEA" />
          <path d="M194.5 82 a8 8 0 1 0 0.1 0 l0 6 a3 3 0 1 1 -0.1 0 z" fill="#C7BEEA" />
        </g>
      </g>

      {/* 반짝임 */}
      <g fill="#FFB7D8">
        <path d="M150 40 l1.8 4.6 4.6 1.8 -4.6 1.8 -1.8 4.6 -1.8 -4.6 -4.6 -1.8 4.6 -1.8 z" opacity="0.9" />
        <path d="M286 96 l1.3 3.4 3.4 1.3 -3.4 1.3 -1.3 3.4 -1.3 -3.4 -3.4 -1.3 3.4 -1.3 z" opacity="0.75" />
      </g>
    </svg>
  );
}
