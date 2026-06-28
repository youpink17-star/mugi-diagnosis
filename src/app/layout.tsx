import type { Metadata, Viewport } from "next";
import "./globals.css";
import AppShell from "@/components/AppShell";

export const metadata: Metadata = {
  title: "무기진단 — 1인사업가 무기 진단",
  description:
    "몇 가지 질문으로 내 강점·상품·타겟·콘텐츠 방향을 잡아주는 무료 진단. 결과는 무기지도로 옮겨 한 장의 사업 지도로 정리하세요.",
  openGraph: {
    title: "무기진단 — 1인사업가 무기 진단",
    description: "몇 가지 질문이면 방향이 잡힙니다. 전부 무료.",
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
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
