"use client";
import { useState, type ReactNode } from "react";

// 사용자가 넣은 표지 이미지를 보여주고, 파일이 없으면 fallback(현재 SVG)로 대체.
// 이미지 경로: /public/images/weapon/*.png (파일만 넣으면 자동 적용)
export default function CoverImage({
  src,
  alt = "",
  className,
  fallback = null,
}: {
  src: string;
  alt?: string;
  className?: string;
  fallback?: ReactNode;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) return <>{fallback}</>;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className={className} onError={() => setFailed(true)} />;
}
