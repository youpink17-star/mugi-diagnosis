"use client";
import Link from "next/link";

// 무기진단 하단 탭 — 진단을 받고, 결과(프로필)를 보고, 도구실/지도 설명으로 넘어간다.
type TabId = "home" | "profile" | "tools" | "map";

const TABS: { id: TabId; label: string; emoji: string; href: string }[] = [
  { id: "home", label: "진단", emoji: "🧪", href: "/" },
  { id: "profile", label: "내 프로필", emoji: "🧭", href: "/profile" },
  { id: "tools", label: "도구실", emoji: "🧰", href: "/tools" },
  { id: "map", label: "지도", emoji: "🗺️", href: "/map" },
];

export default function BottomTabs({
  active,
  mobileOnly = false,
}: {
  active?: TabId;
  mobileOnly?: boolean;
}) {
  const hide = mobileOnly ? "md:hidden" : "";
  return (
    <>
      <div className={`h-[76px] ${hide}`} />
      <nav
        className={`fixed bottom-0 left-1/2 z-40 w-full max-w-app -translate-x-1/2 border-t border-line bg-white/95 pb-[max(env(safe-area-inset-bottom),0px)] backdrop-blur ${hide}`}
      >
        <div className="grid grid-cols-4">
          {TABS.map((t) => {
            const on = t.id === active;
            return (
              <Link
                key={t.id}
                href={t.href}
                className={[
                  "flex flex-col items-center gap-1 py-3.5 text-[10px] font-bold transition",
                  on ? "text-pink" : "text-muted",
                ].join(" ")}
              >
                <span className="text-[18px] leading-none">{t.emoji}</span>
                <span className="leading-tight">{t.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
