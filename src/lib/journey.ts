// ============================================================
//  무기제작소 성장 시스템 — 4단계 여정
//  운영자는 이 파일만 고치면 단계 구성·순서·다음 추천을 바꿀 수 있다.
//  (진단 콘텐츠 자체는 products.ts / questions.ts / reports 에 있음)
// ============================================================

export type StageId = "discover" | "select" | "sharpen" | "expand";

export interface Stage {
  id: StageId;
  step: number; // 1~4
  title: string; // 무기 발견
  emoji: string;
  tagline: string; // 한 줄 설명
  slugs: string[]; // 이 단계에 속한 진단 slug (products.ts 와 일치)
}

export const STAGES: Stage[] = [
  {
    id: "discover",
    step: 1,
    title: "무기 발견",
    emoji: "🔎",
    tagline: "나는 무엇을 잘하고, 무엇을 원하는가",
    slugs: ["self-discovery", "purpose"],
  },
  {
    id: "select",
    step: 2,
    title: "무기 선택",
    emoji: "🗡️",
    tagline: "무엇을 팔고, 어떻게 팔 것인가",
    slugs: ["business-item", "business-marketing"],
  },
  {
    id: "sharpen",
    step: 3,
    title: "무기 연마",
    emoji: "⚒️",
    tagline: "어떻게 더 날카롭게 다듬을 것인가",
    slugs: ["differentiation", "content-strategy"],
  },
  {
    id: "expand",
    step: 4,
    title: "무기 확장",
    emoji: "🚀",
    tagline: "앞으로 어디로 키워갈 것인가",
    slugs: ["priority", "ad-conversion"],
  },
];

// slug → 소속 단계
export function getStageOf(slug: string): Stage | undefined {
  return STAGES.find((s) => s.slugs.includes(slug));
}

// 전체 진단 순서 (단계 순 → 단계 내 순서)
export const JOURNEY_ORDER: string[] = STAGES.flatMap((s) => s.slugs);

// ---------- 다음 추천 진단 ----------
// 명시적 추천 맵(운영자가 자유롭게 수정). 없으면 JOURNEY_ORDER 순서로 폴백.
export const NEXT_RECOMMEND: Record<string, string> = {
  "self-discovery": "purpose",
  purpose: "business-item",
  "business-item": "business-marketing",
  "business-marketing": "differentiation",
  differentiation: "content-strategy",
  "content-strategy": "priority",
  priority: "", // 브랜드 방향성 = 마지막 정리
  "ad-conversion": "", // 선택 도구 — 다음 추천 흐름엔 안 넣음
};

export function getNextSlug(slug: string): string | undefined {
  if (slug in NEXT_RECOMMEND) {
    const n = NEXT_RECOMMEND[slug];
    return n || undefined;
  }
  const i = JOURNEY_ORDER.indexOf(slug);
  if (i >= 0 && i < JOURNEY_ORDER.length - 1) return JOURNEY_ORDER[i + 1];
  return undefined;
}
