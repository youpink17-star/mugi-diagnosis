// ============================================================
//  첫 상품 생성기 — 진단 결과(유형)로 "오늘 팔 상품"을 만든다.
//  추상적 로드맵이 아니라 바로 팔 수 있는 상품 1개를 출력한다.
//  운영자는 TYPE_OFFER / SITUATION_TARGET 만 고치면 된다.
// ============================================================

import type { ProfileTypeId } from "./profile";

export interface GeneratedOffer {
  name: string; // 상품명
  price: string; // 가격
  target: string; // 대상
  problem: string; // 해결 문제
  method: string; // 제공 방식
  duration: string; // 소요 시간
  salesCopy: string; // 판매 문구
  recruitPost: string; // 모집글
}

// 유형별 "첫 상품" 베이스 (무기 → 팔 수 있는 형태)
interface OfferBase {
  weapon: string; // 무기 한 줄
  name: string;
  price: string;
  method: string;
  duration: string;
  solves: string; // 해결하는 문제(상품 관점)
}

const TYPE_OFFER: Record<ProfileTypeId, OfferBase> = {
  inventor: {
    weapon: "없던 아이디어로 길을 새로 그리는 사람",
    name: "막힌 아이디어 뚫는 30분 브레인 세션",
    price: "29,000원",
    method: "30분 온라인 1:1 + 아이디어 정리 1장",
    duration: "30분",
    solves: "아이디어는 많은데 하나로 못 좁히는 문제",
  },
  strategist: {
    weapon: "복잡한 문제를 정리해 방향을 잡아주는 사람",
    name: "30분 방향 정리 세션",
    price: "29,000원",
    method: "30분 온라인 1:1 + 방향 정리본 1장",
    duration: "30분",
    solves: "정보는 넘치는데 내 상황에 맞는 선택을 못 하는 문제",
  },
  seller: {
    weapon: "원하는 사람에게 정확히 파는 사람",
    name: "안 팔리는 상세페이지 30분 응급 점검",
    price: "39,000원",
    method: "30분 온라인 1:1 + 수정 포인트 체크리스트",
    duration: "30분",
    solves: "들어와도 안 사고 그냥 나가는 문제",
  },
  interpreter: {
    weapon: "어려운 걸 쉽게 풀어 전달하는 사람",
    name: "내 메시지 한 문장 정리 세션",
    price: "29,000원",
    method: "30분 온라인 1:1 + 핵심 메시지 1문장 + 콘텐츠 주제 5개",
    duration: "30분",
    solves: "할 말은 많은데 사람들이 못 알아듣는 문제",
  },
  executor: {
    weapon: "일단 부딪혀 결과를 만드는 사람",
    name: "7일 안에 첫 매출 만드는 실행 부트",
    price: "49,000원",
    method: "7일 단톡 챌린지 + 매일 미션 + 후기 정리",
    duration: "7일",
    solves: "계획만 하다 시작을 못 하는 문제",
  },
  connector: {
    weapon: "사람을 모으고 잇는 사람",
    name: "작은 유료 모임 첫 오픈 세팅 세션",
    price: "39,000원",
    method: "40분 온라인 1:1 + 모임 기획서 1장 + 모집글 초안",
    duration: "40분",
    solves: "사람은 모이는데 돈이 안 되는 문제",
  },
  creator: {
    weapon: "표현으로 사람을 끌어모으는 사람",
    name: "조회수를 매출로 잇는 콘텐츠 동선 점검",
    price: "39,000원",
    method: "30분 온라인 1:1 + 프로필·동선 수정안",
    duration: "30분",
    solves: "조회수는 나오는데 매출이 없는 문제",
  },
  craftsman: {
    weapon: "꾸준함으로 실력을 쌓아온 사람",
    name: "내 실력 돈으로 바꾸는 첫 상품 설계",
    price: "39,000원",
    method: "40분 온라인 1:1 + 첫 상품 1장 설계서",
    duration: "40분",
    solves: "실력은 있는데 파는 법을 모르는 문제",
  },
};

// 상황별 타겟 한 줄 (누구에게 파는지)
const SITUATION_TARGET: Record<string, string> = {
  quit: "퇴사를 앞두고 뭘로 먹고살지 막막한 직장인",
  laidoff: "갑자기 회사 밖으로 나온 30~40대",
  burnout: "열심히 했지만 방향을 잃은 직장인",
  retire: "은퇴 후 내 이름으로 시작하려는 분",
  urgent: "당장 이번 달 수익이 급한 분",
  lost: "뭘 해야 할지 모르겠는 사회 초년·전환기",
  side: "회사 다니며 부업을 시작하려는 직장인",
  startup: "시작은 했지만 안 팔려 답답한 1인 창업자",
};

export function generateOffer(
  typeId: ProfileTypeId,
  situationId?: string
): GeneratedOffer {
  const base = TYPE_OFFER[typeId] ?? TYPE_OFFER.strategist;
  const target =
    (situationId ? SITUATION_TARGET[situationId] : undefined) ?? "혼자 벌어야 하는 순간이 온 분";

  const salesCopy = `${target}을 위해, ${base.solves}를 ${base.duration} 만에 풀어드립니다.`;

  const recruitPost =
    `[${base.name}]\n\n` +
    `혹시 이런 상태인가요?\n` +
    `· ${base.solves}\n· 뭐부터 해야 할지 모르겠다\n· 혼자 고민만 길어진다\n\n` +
    `${base.weapon}이 ${base.duration} 동안 같이 정리해드립니다.\n` +
    `대상: ${target}\n방식: ${base.method}\n참가비: ${base.price}\n\n` +
    `댓글이나 DM으로 신청하세요.`;

  return {
    name: base.name,
    price: base.price,
    target,
    problem: base.solves,
    method: base.method,
    duration: base.duration,
    salesCopy,
    recruitPost,
  };
}
