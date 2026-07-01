// ============================================================
//  상황 선택 → 추천 진단 라우터
//  "지금 당신에게 가장 가까운 상황은?" 의 답으로 첫 진단을 추천한다.
//  운영자는 이 파일만 고치면 상황·추천 진단을 바꿀 수 있다.
// ============================================================

export interface Situation {
  id: string;
  emoji: string;
  label: string; // 퇴사 준비
  line: string; // 공감 한 줄
  recommendSlug: string; // 추천 진단 (products.ts slug)
  why: string; // 왜 이 진단부터인지
}

export const SITUATIONS: Situation[] = [
  {
    id: "quit",
    emoji: "🚪",
    label: "퇴사 후 창업 준비",
    line: "회사를 떠나 내 사업을 시작하려는데 뭘로 먹고살지 막막합니다",
    recommendSlug: "self-discovery",
    why: "회사 직함을 빼면 뭐가 남는지, 내 무기부터 찾아야 합니다",
  },
  {
    id: "laidoff",
    emoji: "📉",
    label: "갑자기 혼자 벌어야 함",
    line: "갑자기 혼자 벌어야 하는 상황이 됐습니다",
    recommendSlug: "business-item",
    why: "당장 돈이 되는 내 무기와 아이템부터 빠르게 찾아야 합니다",
  },
  {
    id: "burnout",
    emoji: "🪫",
    label: "번아웃",
    line: "열심히 했는데 방향도 의욕도 사라졌습니다",
    recommendSlug: "purpose",
    why: "무엇을 위해 일하는지, 진짜 동기부터 다시 잡아야 합니다",
  },
  {
    id: "retire",
    emoji: "🌅",
    label: "은퇴 준비",
    line: "이제 내 이름으로 뭔가 해보고 싶습니다",
    recommendSlug: "self-discovery",
    why: "오래 쌓인 경험 중 무엇이 돈이 되는지부터 정리해야 합니다",
  },
  {
    id: "urgent",
    emoji: "🔥",
    label: "돈이 급함",
    line: "당장 이번 달에 수익이 필요합니다",
    recommendSlug: "business-item",
    why: "가장 빨리 팔 수 있는 무기 하나부터 정해야 합니다",
  },
  {
    id: "lost",
    emoji: "🧭",
    label: "방향 상실",
    line: "뭘 해야 할지 도무지 모르겠습니다",
    recommendSlug: "priority",
    why: "흩어진 고민 중 지금 집중할 한 가지부터 골라야 합니다",
  },
  {
    id: "side",
    emoji: "🌱",
    label: "작게 시작",
    line: "내 사업을 작게 시작해보고 싶습니다",
    recommendSlug: "business-item",
    why: "내 시간·성향에 맞는 첫 아이템부터 찾아야 합니다",
  },
  {
    id: "startup",
    emoji: "🚀",
    label: "창업 초기",
    line: "시작은 했는데 안 팔려서 답답합니다",
    recommendSlug: "business-marketing",
    why: "안 팔리는 진짜 병목부터 찾아야 합니다",
  },
];

export function getSituation(id: string): Situation | undefined {
  return SITUATIONS.find((s) => s.id === id);
}
