import type { Product, Category } from "./types";

export const CATEGORY_LABEL: Record<Category, string> = {
  business: "사업/마케팅",
  creator: "크리에이터",
  identity: "아이덴티티",
};

// 카테고리별 섹션 헤드라인(청월당식 후킹 카피)
export const CATEGORY_HEADLINE: Record<Category, { emoji: string; title: string; sub: string }> = {
  business: { emoji: "🔥", title: "안 팔리는 진짜 이유, 여기 있어요", sub: "사업·마케팅의 막힌 곳을 진단합니다" },
  creator: { emoji: "🎬", title: "나에게 맞는 무대를 찾아드려요", sub: "채널·콘텐츠 적성을 진단합니다" },
  identity: { emoji: "🧭", title: "어라, 이거 완전 내 얘긴데?", sub: "강점·욕구·일하는 방식을 진단합니다" },
};

// 이미지 미존재 시 대체 배경 그라데이션 (CSS)
export const CATEGORY_GRADIENT: Record<Category, string> = {
  business: "linear-gradient(135deg,#07071F 0%,#2a1248 55%,#FF2F8F 140%)",
  creator: "linear-gradient(135deg,#1a0830 0%,#6d28d9 60%,#FF2F8F 130%)",
  identity: "linear-gradient(135deg,#0b1030 0%,#3b2a7a 55%,#8B5CF6 130%)",
};

export const CATEGORY_ORDER: Category[] = ["business", "identity"];

// 진단 상품 12개 — UI/랜딩의 단일 소스(Single Source of Truth)
export const PRODUCTS: Product[] = [
  // ================= 무기 유형 테스트 (MBTI식 · 입구 1개) =================
  {
    slug: "weapon",
    title: "내 무기 유형 테스트",
    category: "identity",
    categoryLabel: "아이덴티티",
    emoji: "🗡️",
    short: "24문항으로 찾는 내 사업 무기 유형 (8가지)",
    hook: "내 사업 유형은 뭘까?",
    hookSub: "24개 질문에 답하면, 당신이 어떤 무기를 든 사업가인지 알려드려요. AI가 다 해먹는 시대, 남들과 다른 나만의 무기를 확인해보세요.",
    includes: ["내 무기 유형 (8가지 중)", "정체성·일하는 방식", "내가 가진 무기 / 필요한 무기", "같은 결의 브랜드 사례"],
    price: 0,
    active: true,
    badge: "NEW",
    freeReveal: ["내 무기 유형이 뭔지", "나의 정체성과 일하는 방식", "내가 가진 무기·필요한 무기", "같은 결로 성공한 브랜드"],
    paidUnlocks: ["내 무기 유형 (8가지 중)", "정체성·일하는 방식", "내가 가진 무기 / 필요한 무기", "같은 결의 브랜드 사례"],
  },

  // ================= (구) 사업자 무기 유형 테스트 (3종: 온/오프/크리에이터) =================
  {
    slug: "weapon-offline",
    title: "오프라인 사장님 무기 유형 테스트",
    category: "identity",
    categoryLabel: "아이덴티티",
    emoji: "🏪",
    short: "가게 사장님, 내 사업 무기 유형 찾기",
    hook: "나는 어떤 사장일까?",
    hookSub: "8가지 무기 유형으로, 가게·매장 하는 너한테 맞는 방향을 찾아줄게. 같은 가게도 무기가 다르면 길이 달라.",
    includes: ["내 무기 유형 (8가지 중)", "내 차별화 포인트", "오프라인 성공 브랜드 사례", "무기제작소 작업실 연결"],
    price: 0,
    active: true,
    badge: "NEW",
    freeReveal: ["내 무기 유형이 뭔지", "나만의 차별화 포인트", "나도 모르게 빠지는 함정", "같은 결로 성공한 오프라인 브랜드"],
    paidUnlocks: ["내 무기 유형 (8가지 중)", "내 차별화 포인트", "오프라인 성공 브랜드 사례", "무기제작소 작업실 연결"],
  },
  {
    slug: "weapon-online",
    title: "온라인 셀러 무기 유형 테스트",
    category: "identity",
    categoryLabel: "아이덴티티",
    emoji: "🛒",
    short: "스마트스토어·자사몰, 내 사업 무기 유형 찾기",
    hook: "나는 어떤 셀러일까?",
    hookSub: "8가지 무기 유형으로, 온라인에서 파는 너한테 맞는 방향을 찾아줄게. 같은 상품도 무기가 다르면 파는 법이 달라.",
    includes: ["내 무기 유형 (8가지 중)", "내 차별화 포인트", "온라인 성공 브랜드 사례", "무기제작소 작업실 연결"],
    price: 0,
    active: true,
    badge: "NEW",
    freeReveal: ["내 무기 유형이 뭔지", "나만의 차별화 포인트", "나도 모르게 빠지는 함정", "같은 결로 성공한 온라인 브랜드"],
    paidUnlocks: ["내 무기 유형 (8가지 중)", "내 차별화 포인트", "온라인 성공 브랜드 사례", "무기제작소 작업실 연결"],
  },
  {
    slug: "weapon-creator",
    title: "크리에이터 무기 유형 테스트",
    category: "identity",
    categoryLabel: "아이덴티티",
    emoji: "🎬",
    short: "콘텐츠·팬으로 먹고사는, 내 무기 유형 찾기",
    hook: "나는 어떤 크리에이터일까?",
    hookSub: "8가지 무기 유형으로, 콘텐츠로 사람을 모으는 너한테 맞는 방향을 찾아줄게. 같은 채널도 무기가 다르면 키우는 법이 달라.",
    includes: ["내 무기 유형 (8가지 중)", "내 차별화 포인트", "크리에이터 성공 사례", "무기제작소 작업실 연결"],
    price: 0,
    active: true,
    badge: "NEW",
    freeReveal: ["내 무기 유형이 뭔지", "나만의 차별화 포인트", "나도 모르게 빠지는 함정", "같은 결로 성공한 크리에이터"],
    paidUnlocks: ["내 무기 유형 (8가지 중)", "내 차별화 포인트", "크리에이터 성공 사례", "무기제작소 작업실 연결"],
  },

  // ================= 비즈니스 =================
  {
    slug: "business-item",
    title: "사업 아이템 발굴 진단",
    category: "business",
    categoryLabel: "사업/마케팅",
    emoji: "💎",
    short: "나에게 맞는 ‘돈 되는 아이템’ 방향 찾기",
    hook: "뭘 팔지부터 막혔다면",
    hookSub: "당신의 경험·강점·시장을 교차 분석해 ‘될 만한 아이템’ 방향을 잡아드립니다.",
    includes: ["내 강점 × 시장 수요 교차 분석", "추천 아이템 유형 3가지", "피해야 할 함정 아이템", "검증 우선순위 로드맵"],
    price: 12900,
    active: true,
    badge: "NEW",
    freeReveal: ["내가 가진 사업가 기질", "내 강점이 가장 잘 먹히는 시장", "지금 나를 가로막는 결정적 한 가지", "남들은 모르는 내 무기"],
    paidUnlocks: ["나에게 딱 맞는 돈 되는 아이템 1순위", "맨손에서 성공한 같은 유형 3인의 길", "7일 안에 첫 매출 만드는 실행 순서", "내가 반드시 피해야 할 돈 새는 함정"],
  },
  {
    slug: "business-marketing",
    title: "사업 전략 및 마케팅 진단",
    category: "business",
    categoryLabel: "사업/마케팅",
    emoji: "📊",
    short: "안 팔리는 진짜 이유 = 팔리는 구조 진단",
    hook: "열심히 하는데 왜 안 팔릴까요?",
    hookSub: "상품이 나빠서가 아닙니다. 팔리는 구조를 못 찾은 것입니다.",
    includes: ["타겟·차별화·채널·콘텐츠·전환 5축 진단", "가장 새는 구간(병목) 진단", "우선순위 처방전", "30일 실행 플랜"],
    price: 29000,
    active: true,
    badge: "BEST",
    freeReveal: ["우리 사업의 진짜 성장 단계", "매출을 막는 가장 큰 병목", "내가 이미 잘하고 있는 강점", "지금 손봐야 할 약한 고리"],
    paidUnlocks: ["우리만의 한 문장 차별화 메시지", "매출을 여는 병목 1순위 처방", "우리에게 맞는 채널 우선순위", "30일이면 숫자가 바뀌는 실행 플랜"],
  },
  {
    slug: "ad-conversion",
    title: "광고 전환 진단",
    category: "business",
    categoryLabel: "사업/마케팅",
    emoji: "📣",
    short: "광고비가 새는 구간 찾기",
    hook: "광고비, 어디서 새고 있을까요?",
    hookSub: "후킹-타겟팅-랜딩-오퍼 4구간에서 돈이 빠지는 지점을 찾아드립니다.",
    includes: ["4구간 누수 진단", "소재·타겟 점검", "랜딩 전환 체크", "개선 우선순위"],
    price: 19000,
    active: true,
    freeReveal: ["내 광고가 가진 강점 구간", "광고비가 새고 있는 구간", "전환을 막는 결정적 약점", "지금 손대면 효과 큰 지점"],
    paidUnlocks: ["돈 새는 구간을 막는 1순위 처방", "클릭을 결제로 바꾸는 소재 공식", "전환율 높이는 랜딩 수정 포인트", "성과 기준 예산 재배분 표"],
  },
  {
    slug: "content-strategy",
    title: "콘텐츠 전략 진단",
    category: "business",
    categoryLabel: "사업/마케팅",
    emoji: "📝",
    short: "우리 브랜드에 맞는 콘텐츠 방향",
    hook: "콘텐츠는 만드는데 반응이 없다면",
    hookSub: "메시지·꾸준함·포맷·전환 4축으로 콘텐츠 구조를 진단합니다.",
    includes: ["콘텐츠 4축 진단", "포맷 추천", "주제 풀 제안", "발행 리듬 설계"],
    price: 19000,
    active: true,
    freeReveal: ["내 콘텐츠가 가진 강점", "반응이 없는 결정적 이유", "내가 놓치고 있는 약한 축", "우리 브랜드에 맞는 방향"],
    paidUnlocks: ["우리만의 콘텐츠 한 문장 메시지", "바로 쓰는 30일치 주제 캘린더", "우리에게 맞는 포맷 3가지", "좋아요를 매출로 잇는 동선 설계"],
  },

  {
    slug: "differentiation",
    title: "왜 굳이 나야 진단",
    category: "business",
    categoryLabel: "사업/마케팅",
    emoji: "✨",
    short: "비슷한 가게 많아도, 굳이 나를 고를 이유 찾기",
    hook: "비슷한 데 많은데, 왜 굳이 나야?",
    hookSub: "4가지 차별화 무기로 ‘손님이 굳이 너를 고를 이유’를 찾아줄게. 뭐가 다른지 모르겠는 사람도, 있는데 못 보여주는 사람도 괜찮아.",
    includes: ["내 차별화 무기 유형 (4가지 중)", "그 무기로 돈 버는 길", "같은 결의 브랜드 사례", "가볍게 시작할 첫걸음"],
    price: 12900,
    active: true,
    badge: "NEW",
    freeReveal: ["내 차별화 무기가 뭔지", "손님이 굳이 나를 고를 이유", "나도 모르게 빠지는 함정", "같은 결로 성공한 브랜드"],
    paidUnlocks: ["내 차별화 무기 유형 (4가지 중)", "그 무기로 돈 버는 길", "같은 결의 브랜드 사례", "가볍게 시작할 첫걸음"],
  },

  // ================= 아이덴티티 =================
  {
    slug: "self-discovery",
    title: "뭘 팔지 진단",
    category: "identity",
    categoryLabel: "아이덴티티",
    emoji: "🧭",
    short: "내 안에 팔 게 이미 있어, 뭔지 찾기",
    hook: "하고는 싶은데, 뭘 팔지 모르겠어",
    hookSub: "8가지 무기 유형으로 너한테 맞는 사업 방향을 찾아줄게. 아예 없는 사람도, 너무 많아 못 고르는 사람도 괜찮아.",
    includes: ["내 무기 유형 (8가지 중)", "잘 맞는 아이템 방향", "같은 결의 브랜드 사례", "가볍게 시작할 첫걸음"],
    price: 9900,
    active: true,
    badge: "NEW",
    freeReveal: ["내 무기 유형이 뭔지", "그 무기에 맞는 사업 방향", "나도 모르게 빠지는 함정", "같은 결로 성공한 브랜드"],
    paidUnlocks: ["내 무기 유형 (8가지 중)", "잘 맞는 아이템 방향", "같은 결의 브랜드 사례", "가볍게 시작할 첫걸음"],
  },
  {
    slug: "purpose",
    title: "목적 발견 진단",
    category: "identity",
    categoryLabel: "아이덴티티",
    emoji: "🧭",
    short: "내가 진짜 원하는 방향",
    hook: "바쁜데 공허하다면",
    hookSub: "성취·자유·기여·안정 4가지 동기축으로, 내 사업이 어디로 가야 안 지치는지 방향을 봅니다.",
    includes: ["동기 유형 진단", "핵심 가치", "사업 방향 제안", "정렬 액션"],
    price: 9900,
    active: true,
    freeReveal: ["나를 진짜 움직이는 동기", "내가 포기 못 하는 핵심 가치", "지금 공허한 결정적 이유", "남들은 모르는 내 진짜 욕구"],
    paidUnlocks: ["나에게 맞는 사업 방향 3가지", "지금 내려놓아야 할 것", "가치에 맞는 사업 목표 세우는 법", "지금 시작하는 30일 정렬 계획"],
  },
  {
    slug: "priority",
    title: "브랜드 방향성 진단",
    category: "identity",
    categoryLabel: "아이덴티티",
    emoji: "🧭",
    short: "내 사업이 앞으로 갈 방향 정하기",
    hook: "사업은 굴러가는데, 어디로 가는지 흐릿한가요?",
    hookSub: "지금까지 쌓인 걸 바탕으로, 이 브랜드가 앞으로 어디로 가야 할지 방향을 잡아드립니다.",
    includes: ["내 방향 유형 진단", "앞으로 집중할 방향", "키울 것 / 접을 것", "방향에 맞는 다음 행동"],
    price: 7900,
    active: true,
    badge: "NEW",
    freeReveal: ["내가 방향을 고르는 기준", "앞으로 집중하면 좋을 방향", "나를 흔드는 방향 함정", "지금 접어도 되는 갈래"],
    paidUnlocks: ["내 브랜드의 핵심 방향 한 줄", "더 키울 것 / 접을 것", "방향이 흔들릴 때 판단 기준", "이 방향으로 가는 다음 30일"],
  },
];

// 홈 히어로 캐러셀 슬라이드
export interface HeroSlide {
  kind: "brand" | "product";
  slug?: string;
  badge?: string; // 예: "TOP 1"
  title: string;
  sub: string;
  cta: string;
  href: string;
  image: string; // /images/hero/xxx.jpg (없으면 그라데이션 대체)
  gradient: string;
  emoji: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    kind: "brand",
    title: "문제는 당신이\n아닙니다",
    sub: "방법을 몰랐을 뿐입니다\n3분이면 길이 보입니다",
    cta: "내 무기 찾기",
    href: "#products",
    image: "/images/hero/brand.jpg",
    gradient: "linear-gradient(135deg,#07071F 0%,#2a1248 60%,#FF2F8F 150%)",
    emoji: "⚒️",
  },
  {
    kind: "product",
    slug: "business-marketing",
    badge: "TOP 1",
    title: "안 팔리는 데는\n이유가 있습니다",
    sub: "그 이유를 정확히 짚어드립니다",
    cta: "내 약점 확인하기",
    href: "/landing/business-marketing",
    image: "/images/hero/business-marketing.jpg",
    gradient: "linear-gradient(135deg,#1a0830 0%,#6d28d9 55%,#FF2F8F 140%)",
    emoji: "📊",
  },
  {
    kind: "product",
    slug: "self-discovery",
    badge: "TOP 2",
    title: "당신의 무기를\n아직 모릅니다",
    sub: "남들은 부러워하는 그 강점\n3분 만에 꺼내드립니다",
    cta: "내 강점 찾기",
    href: "/landing/self-discovery",
    image: "/images/hero/self-discovery.jpg",
    gradient: "linear-gradient(135deg,#0b1030 0%,#3b2a7a 55%,#8B5CF6 140%)",
    emoji: "🗝️",
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(cat: Category): Product[] {
  return PRODUCTS.filter((p) => p.category === cat);
}

export function formatPrice(price: number): string {
  return price.toLocaleString("ko-KR") + "원";
}
