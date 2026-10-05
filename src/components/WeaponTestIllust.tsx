// 문항 표지 일러스트 — 체크리스트 + 펜(답을 체크하는 느낌). 플랫, 핑크/네이비.
export default function WeaponTestIllust({ className }: { className?: string }) {
  const rows = [
    { y: 64, checked: true },
    { y: 92, checked: true },
    { y: 120, checked: false },
    { y: 148, checked: false },
  ];
  return (
    <svg
      className={className}
      viewBox="0 0 240 210"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="문항 체크리스트"
    >
      {/* 그림자 */}
      <ellipse cx="120" cy="196" rx="72" ry="9" fill="#8B5CF6" opacity="0.12" />
      {/* 클립보드 */}
      <rect x="52" y="30" width="136" height="158" rx="18" fill="#ffffff" stroke="#07071F" strokeWidth="3.5" />
      {/* 상단 집게 */}
      <rect x="98" y="21" width="44" height="18" rx="7" fill="#E0487C" />
      {/* 행들 */}
      {rows.map((r, i) => (
        <g key={i}>
          <circle
            cx="78"
            cy={r.y}
            r="10"
            fill={r.checked ? "#E0487C" : "#ffffff"}
            stroke={r.checked ? "#E0487C" : "#D8D0E8"}
            strokeWidth="2.5"
          />
          {r.checked && (
            <path
              d={`M73 ${r.y} l3.5 3.5 L83 ${r.y - 4}`}
              stroke="#ffffff"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
          <rect x="96" y={r.y - 5} width={r.checked ? 62 : 74} height="9" rx="4.5" fill={r.checked ? "#FFD6E7" : "#EDEBF5"} />
        </g>
      ))}
      {/* 펜 (마지막 빈 항목을 가리키듯) */}
      <g transform="rotate(38 170 150)">
        <rect x="150" y="120" width="15" height="60" rx="6" fill="#07071F" />
        <rect x="150" y="120" width="15" height="20" rx="6" fill="#8B5CF6" />
        <path d="M150 180 l7.5 16 l7.5 -16 z" fill="#E0487C" />
      </g>
      {/* 반짝임 */}
      <path d="M182 54 l3 8 l8 3 l-8 3 l-3 8 l-3 -8 l-8 -3 l8 -3 z" fill="#E0487C" opacity="0.85" />
      <circle cx="44" cy="70" r="4" fill="#8B5CF6" opacity="0.7" />
      <circle cx="196" cy="120" r="3.5" fill="#E0487C" opacity="0.6" />
    </svg>
  );
}
