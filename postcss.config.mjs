import path from "path";
import { fileURLToPath } from "url";

// 이 앱은 런처(프리뷰)에서 CWD가 다른 폴더로 실행될 수 있다.
// 그러면 Tailwind/PostCSS가 CWD 기준으로 '엉뚱한 앱'의 tailwind.config를 로드한다.
// → 자기 config를 절대경로로 명시해 CWD와 무관하게 올바른 설정/콘텐츠를 쓰게 한다.
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config = {
  plugins: {
    tailwindcss: { config: path.join(__dirname, "tailwind.config.ts") },
    autoprefixer: {},
  },
};

export default config;
