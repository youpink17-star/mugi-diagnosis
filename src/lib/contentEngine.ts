// ============================================================
//  콘텐츠 생성기 — 진단 결과로 "오늘 올릴 콘텐츠"를 만든다.
//  제목/첫문장/본문구조/CTA/DM/모집문구를 바로 복붙 가능하게 출력.
//  운영자는 TYPE_ANGLE / SITUATION_PAIN / PLATFORM 만 고치면 된다.
// ============================================================

import type { ProfileTypeId } from "./profile";

export type Platform = "reels" | "thread" | "blog";

export const PLATFORMS: { id: Platform; label: string }[] = [
  { id: "reels", label: "릴스·쇼츠" },
  { id: "thread", label: "스레드·X" },
  { id: "blog", label: "블로그" },
];

export interface ContentInput {
  typeId: ProfileTypeId;
  situationId?: string;
  platform: Platform;
  weapon: string; // 무기 한 줄
  firstProduct: string; // 첫 상품명
}

export interface GeneratedContent {
  titles: string[];
  hooks: string[];
  bodyStructures: string[];
  ctas: string[];
  dmScripts: string[];
  offerCopy: string;
}

// 상황별 핵심 고통 키워드 (콘텐츠 주제의 뼈대)
const SITUATION_PAIN: Record<string, { who: string; pain: string }> = {
  quit: { who: "회사를 떠나 내 사업을 시작하려는 사람", pain: "뭘로 먹고살지 막막함" },
  laidoff: { who: "갑자기 혼자 벌어야 하게 된 사람", pain: "준비 없이 맞은 시작" },
  burnout: { who: "번아웃 온 사장님", pain: "방향도 의욕도 사라짐" },
  retire: { who: "내 이름으로 사업을 시작하려는 분", pain: "내 이름으로 뭘 할지 모름" },
  urgent: { who: "당장 돈이 급한 사람", pain: "이번 달 수익이 필요함" },
  lost: { who: "방향을 잃은 사람", pain: "뭘 해야 할지 모르겠음" },
  side: { who: "작게 사업을 시작하려는 사람", pain: "뭐부터 작게 시작할지 모름" },
  startup: { who: "1인 창업 초기", pain: "시작했는데 안 팔림" },
};

// 유형별 콘텐츠 앵글(관점) — 같은 주제도 유형마다 다르게 푼다
const TYPE_ANGLE: Record<ProfileTypeId, string> = {
  inventor: "남들과 다른 새로운 관점으로",
  strategist: "복잡한 걸 단계로 정리해서",
  seller: "사게 만드는 구조 관점에서",
  interpreter: "어려운 걸 쉽게 풀어서",
  executor: "당장 오늘 할 행동 중심으로",
  connector: "사람·관계 관점에서",
  creator: "후킹과 스토리로",
  craftsman: "꾸준함과 검증된 방법으로",
};

export function generateContent(input: ContentInput): GeneratedContent {
  const { typeId, situationId, platform, weapon, firstProduct } = input;
  const pain = (situationId ? SITUATION_PAIN[situationId] : undefined) ?? {
    who: "혼자 벌어야 하는 사람",
    pain: "어디서부터 시작할지 모름",
  };
  const angle = TYPE_ANGLE[typeId] ?? "";

  const titles = [
    `${pain.who}이 가장 먼저 해야 할 단 한 가지`,
    `${pain.pain}, 사실 순서가 틀렸습니다`,
    `시장에서 팔리는 사람과 안 팔리는 사람의 차이`,
    `직함을 빼면 나는 무엇으로 팔릴까`,
    `${pain.who}이 흔히 하는 3가지 착각`,
    `돈 버는 건 재능이 아니라 순서입니다`,
    `${pain.pain}일 때 절대 하면 안 되는 행동`,
    `나는 ${weapon}, 그래서 이렇게 팝니다`,
    `${pain.who}을 위한 가장 작은 첫걸음`,
    `오늘 당장 ${pain.pain}을 푸는 법`,
  ];

  const hooks = [
    `${pain.pain}. 그런데 대부분 순서를 거꾸로 합니다.`,
    `회사에서는 경력이었지만 이제는 상품이 되어야 합니다.`,
    `${pain.who}에게 필요한 건 정보가 아니라 내 상황에 맞는 선택입니다.`,
    `더 많은 정보 수집도 아닙니다. 가장 먼저 할 건 따로 있습니다.`,
    `저도 ${pain.pain} 상태에서 시작했습니다.`,
    `${weapon}이라면 이 방법이 가장 빠릅니다.`,
    `많은 분이 여기서 시간을 버립니다.`,
    `오늘 이 글 하나면 ${pain.pain}의 첫 매듭이 풀립니다.`,
    `남들 다 하는 방법 말고 ${angle} 풀어봅니다.`,
    `3분만 읽으면 오늘 뭘 할지 정해집니다.`,
  ];

  const bodyStructures =
    platform === "reels"
      ? [
          "① 첫 3초 충격 질문 → ② 흔한 실수 1개 → ③ 올바른 순서 → ④ 첫걸음 1개 → ⑤ 댓글 유도",
          "① 비포(막막함) → ② 애프터(정리됨) → ③ 그 사이 한 가지 → ④ CTA",
          "① 통념 부정 → ② 근거 1개 → ③ 내 방법 → ④ 신청 안내",
        ]
      : platform === "thread"
        ? [
            "① 한 줄 결론 → ② 왜 그런지 3줄 → ③ 구체 예시 → ④ 다음 행동 1개 → ⑤ 마지막 한 줄 + 링크",
            "① 내 경험 고백 → ② 깨달음 → ③ 일반화 → ④ 적용법 → ⑤ CTA",
            "① 질문 던지기 → ② 흔한 오답 → ③ 진짜 답 → ④ 제안",
          ]
        : [
            "① 공감 도입 → ② 문제 정의 → ③ 원인 3가지 → ④ 해결 순서 → ⑤ 첫 상품 자연스럽게 소개",
            "① 사례 → ② 분석 → ③ 방법론 → ④ 체크리스트 → ⑤ CTA",
            "① 통념 → ② 반박 → ③ 근거 → ④ 실행법 → ⑤ 제안",
          ];

  const ctas = [
    `${pain.pain}, 30분 안에 같이 정리해드립니다.`,
    `시장에서 내가 팔릴 수 있는지 먼저 확인하세요.`,
    `오늘 뭘 할지 막막하다면 댓글로 상황 한 줄 남겨주세요.`,
    `[${firstProduct}] 신청은 DM으로 받습니다.`,
    `무기부터 점검하고 시작하세요.`,
  ];

  const dmScripts = [
    `안녕하세요. 콘텐츠 보고 연락드립니다. 혹시 지금 ${pain.pain} 상태이신가요? 괜찮으시면 상황 한 줄만 알려주세요. 맞는 첫걸음 짚어드릴게요.`,
    `반갑습니다. ${pain.who}분들께 [${firstProduct}]을 진행하고 있어요. 30분이면 방향이 잡힙니다. 관심 있으시면 편한 시간 알려주세요.`,
    `메시지 감사합니다. 지금 가장 막힌 부분이 무엇인지 한 가지만 알려주시면, 그것부터 같이 풀어보겠습니다.`,
  ];

  const offerCopy = `${pain.who}을 위한 [${firstProduct}] — ${pain.pain}을 가장 빠르게 푸는 첫걸음입니다.`;

  return { titles, hooks, bodyStructures, ctas, dmScripts, offerCopy };
}
