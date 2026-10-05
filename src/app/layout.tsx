import type { Metadata, Viewport } from "next";
import "./globals.css";
import AppShell from "@/components/AppShell";
import CopyGuard from "@/components/CopyGuard";

export const metadata: Metadata = {
  title: "무기진단 — 내 무기 유형 테스트",
  description:
    "나에게 맞는 일하는 방식을 찾아주는 테스트. 내 특별한 장점을 8가지 무기 유형으로 알려드립니다.",
  openGraph: {
    title: "내 무기 유형은 뭘까? — 무기진단",
    description: "나에게 맞는 일하는 방식과 내 특별한 장점을 찾아보세요.",
  },
};

export const viewport: Viewport = {
  themeColor: "#ECE6FB",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="font-sans">
        <CopyGuard />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
