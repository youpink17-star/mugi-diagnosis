"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AppHeader({
  title,
  showBack = false,
}: {
  title?: string;
  showBack?: boolean;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-line bg-white/90 backdrop-blur">
      <div className="relative mx-auto flex h-16 max-w-5xl items-center px-5">
        {showBack ? (
          <button
            aria-label="뒤로"
            onClick={() => router.back()}
            className="-ml-1 flex h-9 w-9 items-center justify-center rounded-full text-ink hover:bg-app-bg"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        ) : (
          <Link href="/" className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-navy text-[17px]">🧪</span>
            <span className="text-[16px] font-extrabold tracking-tight text-navy">무기진단</span>
          </Link>
        )}

        {title && (
          <span className="pointer-events-none absolute left-1/2 top-1/2 max-w-[60%] -translate-x-1/2 -translate-y-1/2 truncate text-center text-[15px] font-bold text-ink">
            {title}
          </span>
        )}

        <button
          aria-label="메뉴"
          onClick={() => setOpen((v) => !v)}
          className="ml-auto flex h-9 w-9 items-center justify-center rounded-full text-ink hover:bg-app-bg"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="absolute right-3 top-16 w-44 overflow-hidden rounded-xl border border-line bg-white py-1 shadow-card">
          <MenuLink href="/" onClick={() => setOpen(false)}>진단 홈</MenuLink>
          <MenuLink href="/#tools" onClick={() => setOpen(false)}>도구실</MenuLink>
          <MenuLink href="/#map" onClick={() => setOpen(false)}>내 사업 지도</MenuLink>
          <MenuLink href="/admin" onClick={() => setOpen(false)}>관리자</MenuLink>
        </div>
      )}
    </header>
  );
}

function MenuLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block px-4 py-2.5 text-sm font-semibold text-ink hover:bg-app-bg"
    >
      {children}
    </Link>
  );
}
