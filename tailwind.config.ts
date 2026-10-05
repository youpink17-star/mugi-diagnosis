import type { Config } from "tailwindcss";
import path from "path";

// content 글롭은 Tailwind가 process.cwd() 기준으로 해석한다.
// 이 앱은 런처(프리뷰/launch.json)에서 CWD가 다른 폴더(무기지도)로 실행될 수 있어
// 상대경로를 쓰면 엉뚱한 앱의 src를 스캔한다 → 반드시 이 파일 위치 기준 절대경로로 고정.
const config: Config = {
  // glob은 forward slash 필요 → path.join의 Windows 백슬래시를 정규화
  content: [path.join(__dirname, "src/**/*.{ts,tsx}").replace(/\\/g, "/")],
  theme: {
    extend: {
      colors: {
        navy: "#07071F",
        "navy-soft": "#080822",
        ink: "#111827",
        pink: "#E0487C",
        purple: "#8B5CF6",
        "soft-pink": "#FFF0F7",
        "app-bg": "#F7F7FA",
        line: "#E8E8EF",
        muted: "#6B7280",
      },
      maxWidth: {
        app: "430px",
      },
      borderRadius: {
        "2xl": "1rem",
      },
      boxShadow: {
        card: "0 8px 30px rgba(7,7,31,0.06)",
        cta: "0 10px 30px rgba(224,72,124,0.30)",
      },
      fontFamily: {
        sans: [
          "Pretendard",
          "Pretendard Variable",
          "Noto Sans KR",
          "system-ui",
          "sans-serif",
        ],
      },
      backgroundImage: {
        // 버튼용 — 보라 섞지 않고 로즈 한 톤으로 (핑크·보라가 겹치면 눈이 피곤)
        "pink-grad": "linear-gradient(135deg, #E7598A 0%, #D83E73 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
