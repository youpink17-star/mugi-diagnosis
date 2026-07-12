"use client";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

// 대부분의 페이지(테스트/결과)는 모바일 앱 컨테이너(max 430px 중앙 고정)로 감싼다.
// 단, 홈("/")·위키("/wiki")는 데스크톱에서 웹사이트처럼 전체 폭을 쓰게 너비 고정을 푼다.
// (모바일에서는 자연히 전체 너비 = 모바일 뷰)
const FULL_WIDTH_ROUTES = ["/", "/wiki", "/test/weapon"];

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "";
  const fullWidth = FULL_WIDTH_ROUTES.some((r) => pathname === r || pathname.startsWith(r + "/"));

  if (fullWidth) {
    return (
      <div className="flex min-h-[100dvh] flex-col bg-app-bg">{children}</div>
    );
  }

  return (
    <div className="flex min-h-[100dvh] justify-center bg-app-bg">
      <div className="relative flex min-h-[100dvh] w-full max-w-app flex-col bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.03)] md:shadow-card">
        {children}
      </div>
    </div>
  );
}
