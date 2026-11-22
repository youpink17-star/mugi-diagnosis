import type { Metadata, Viewport } from "next";
import "./globals.css";
import AppShell from "@/components/AppShell";
import CopyGuard from "@/components/CopyGuard";

export const metadata: Metadata = {
  // 공유 미리보기 이미지(/og/…) 주소를 절대 주소로 만들기 위한 기준
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://test.mugimaker.com"),
  // 구글 검색 결과에 옛 주소(netlify.app) 대신 이 주소가 대표로 뜨게
  alternates: { canonical: "/" },
  applicationName: "무기제작소",
  title: "무기 유형 테스트 | 나에게 맞는 일하는 방식 찾기",
  description:
    "나에게 맞는 일하는 방식을 찾아주는 테스트. 내 특별한 장점을 8가지 무기 유형으로 알려드립니다.",
  openGraph: {
    siteName: "무기제작소",
    url: "https://test.mugimaker.com",
    title: "내 무기 유형은 뭘까? | 무기 유형 테스트",
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
        {/* 구글 검색 결과에 사이트 이름을 "무기제작소"로 보여주기 위한 정보 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebSite", name: "무기제작소", alternateName: "무기 유형 테스트", url: "https://test.mugimaker.com" }),
          }}
        />
        <CopyGuard />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
