// 무기진단 히어로 일러스트 (순수 SVG, 텍스트 없음) — 진단 카드 + 돋보기로 발견한 '내 무기(보석)' + 반짝임.
// 밝은 배경 위에 올라가도록 흰/네이비 카드 + 부드러운 그림자. (무기지도 일러스트와 같은 팔레트)
export default function DiagnosisIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 200"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="진단으로 내 안의 무기를 찾는 일러스트"
    >
      <defs>
        <linearGradient id="dgGem" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FF6FB0" />
          <stop offset="1" stopColor="#FF2F8F" />
        </linearGradient>
        <linearGradient id="dgLens" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#FCE7F1" />
        </linearGradient>
      </defs>

      {/* 진단 카드 그림자 + 카드 */}
      <rect x="50" y="42" width="166" height="128" rx="18" fill="#1A1340" opacity="0.10" />
      <rect x="48" y="36" width="166" height="128" rx="18" fill="#FFFFFF" stroke="#E9ECF3" strokeWidth="1" />

      {/* 카드 상단 — 진단 헤더 바 (네이비) */}
      <rect x="48" y="36" width="166" height="34" rx="18" fill="#07071F" />
      <rect x="48" y="56" width="166" height="14" fill="#07071F" />
      <circle cx="68" cy="53" r="6.5" fill="#FF2F8F" />
      <rect x="82" y="49" width="70" height="8" rx="4" fill="#FFFFFF" opacity="0.85" />

      {/* 질문 줄들 */}
      <rect x="66" y="84" width="118" height="7" rx="3.5" fill="#E7E9F2" />
      <rect x="66" y="98" width="92" height="7" rx="3.5" fill="#EEF0F6" />

      {/* 선택지 칩 — 하나는 핑크로 선택됨 */}
      <rect x="66" y="116" width="60" height="20" rx="10" fill="#FFF1F7" stroke="#FF2F8F" strokeWidth="1.4" />
      <circle cx="78" cy="126" r="4" fill="#FF2F8F" />
      <rect x="88" y="122" width="30" height="8" rx="4" fill="#FF2F8F" opacity="0.55" />

      <rect x="132" y="116" width="56" height="20" rx="10" fill="#F4F5F9" />
      <circle cx="144" cy="126" r="4" fill="#D6DAE6" />
      <rect x="154" y="122" width="26" height="8" rx="4" fill="#D6DAE6" />

      <rect x="66" y="144" width="80" height="7" rx="3.5" fill="#EEF0F6" />

      {/* 돋보기로 발견한 '내 무기' — 보석(다이아) */}
      {/* 빛나는 후광 */}
      <circle cx="232" cy="132" r="40" fill="#FF2F8F" opacity="0.08" />
      {/* 렌즈 */}
      <circle cx="232" cy="132" r="34" fill="url(#dgLens)" stroke="#07071F" strokeWidth="5" />
      {/* 손잡이 */}
      <rect
        x="252"
        y="152"
        width="13"
        height="44"
        rx="6.5"
        fill="#07071F"
        transform="rotate(45 258 174)"
      />

      {/* 보석(무기) */}
      <g>
        <path
          d="M232 112 L248 126 L232 152 L216 126 Z"
          fill="url(#dgGem)"
          stroke="#FFFFFF"
          strokeWidth="1.5"
        />
        <path d="M216 126 L248 126" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.8" />
        <path d="M232 112 L232 152" stroke="#FFFFFF" strokeWidth="1" opacity="0.45" />
      </g>

      {/* 반짝임 */}
      <g fill="#FFB7D8">
        <path d="M210 92 l1.8 4.6 4.6 1.8 -4.6 1.8 -1.8 4.6 -1.8 -4.6 -4.6 -1.8 4.6 -1.8 z" opacity="0.9" />
        <path d="M268 110 l1.3 3.4 3.4 1.3 -3.4 1.3 -1.3 3.4 -1.3 -3.4 -3.4 -1.3 3.4 -1.3 z" opacity="0.75" />
      </g>
    </svg>
  );
}
