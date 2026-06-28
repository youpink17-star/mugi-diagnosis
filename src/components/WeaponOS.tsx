"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { loadResults, loadSituation } from "@/lib/profileStore";
import { buildUnifiedProfile } from "@/lib/profile";
import { generateOffer } from "@/lib/offerEngine";
import { generateContent, PLATFORMS, type Platform } from "@/lib/contentEngine";

// 무기 실행 대시보드 — "오늘 뭐 팔지/올리지/누구한테 말하지"를 바로 해결
export default function WeaponOS() {
  const [ready, setReady] = useState(false);
  const [profile, setProfile] = useState<ReturnType<typeof buildUnifiedProfile>>(null);
  const [situationId, setSituationId] = useState<string | undefined>();
  const [platform, setPlatform] = useState<Platform>("thread");

  useEffect(() => {
    setProfile(buildUnifiedProfile(loadResults()));
    setSituationId(loadSituation() ?? undefined);
    setReady(true);
  }, []);

  const offer = useMemo(
    () => (profile ? generateOffer(profile.type.id, situationId) : null),
    [profile, situationId]
  );
  const content = useMemo(
    () =>
      profile && offer
        ? generateContent({
            typeId: profile.type.id,
            situationId,
            platform,
            weapon: profile.type.oneLine,
            firstProduct: offer.name,
          })
        : null,
    [profile, offer, situationId, platform]
  );

  if (!ready) return null;

  // 진단 안 함 → 유도
  if (!profile || !offer || !content) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-8 py-20 text-center">
        <div className="mb-4 text-5xl">⚒️</div>
        <h1 className="text-[20px] font-extrabold text-ink">먼저 내 무기를 찾아야 합니다</h1>
        <p className="mt-2 text-[14px] leading-relaxed text-muted">
          진단을 하나라도 받으면 오늘 팔 상품과 콘텐츠를 바로 만들어드립니다.
        </p>
        <Link href="/" className="mt-6 rounded-2xl bg-navy px-6 py-3.5 text-[15px] font-bold text-white">
          내 무기 찾기
        </Link>
      </div>
    );
  }

  return (
    <main className="flex-1">
      {/* 헤더 */}
      <section className="bg-navy px-6 py-7 text-white">
        <p className="text-[12px] font-bold text-pink">무기 실행 대시보드</p>
        <h1 className="mt-1.5 text-[22px] font-extrabold leading-snug">
          오늘 <span className="text-pink">{profile.type.emoji} {profile.type.name}</span>의 할 일
        </h1>
        <p className="mt-1.5 text-[13px] text-white/70">{profile.type.oneLine}</p>
      </section>

      <div className="space-y-3 px-4 py-4">
        {/* 1. 오늘 팔 상품 */}
        <Block icon="💰" title="오늘 팔 상품">
          <div className="rounded-xl bg-soft-pink p-4">
            <div className="flex items-center justify-between">
              <p className="text-[16px] font-extrabold text-ink">{offer.name}</p>
              <span className="shrink-0 rounded-lg bg-navy px-2.5 py-1 text-[13px] font-bold text-white">{offer.price}</span>
            </div>
            <p className="mt-2 text-[13px] text-ink/75">👤 {offer.target}</p>
            <p className="mt-1 text-[13px] text-ink/75">🎯 {offer.problem}</p>
          </div>
          <CopyRow label="판매 문구" text={offer.salesCopy} />
          <CopyRow label="모집글" text={offer.recruitPost} multiline />
        </Block>

        {/* 2. 오늘 올릴 콘텐츠 */}
        <Block icon="✍️" title="오늘 올릴 콘텐츠">
          {/* 플랫폼 토글 */}
          <div className="mb-3 grid grid-cols-3 gap-1 rounded-xl bg-app-bg p-1">
            {PLATFORMS.map((p) => (
              <button
                key={p.id}
                onClick={() => setPlatform(p.id)}
                className={[
                  "rounded-lg py-2 text-[13px] font-bold transition",
                  platform === p.id ? "bg-navy text-white" : "text-muted",
                ].join(" ")}
              >
                {p.label}
              </button>
            ))}
          </div>
          <ListCopy label="제목 10개" items={content.titles} />
          <ListCopy label="첫 문장 10개" items={content.hooks} />
          <ListCopy label="본문 구조" items={content.bodyStructures} />
          <ListCopy label="CTA 문구" items={content.ctas} />
        </Block>

        {/* 3. 오늘 말 걸 고객 */}
        <Block icon="💬" title="오늘 말 걸 고객">
          <ListCopy label="DM 문구" items={content.dmScripts} />
          <CopyRow label="모집·제안 문구" text={content.offerCopy} />
        </Block>

        {/* 4. 이번 주 할 일 */}
        <Block icon="✅" title="이번 주 할 일">
          <ul className="space-y-2">
            {[
              "팔 상품 1개 정하기",
              "콘텐츠 5개 올리기",
              "고객 5명에게 먼저 제안하기",
              "후기 1개 받기",
            ].map((t, i) => (
              <li key={i} className="flex items-center gap-2.5 rounded-xl border border-line bg-white px-4 py-3 text-[14px] text-ink">
                <span className="h-4 w-4 shrink-0 rounded border-2 border-line" />
                {t}
              </li>
            ))}
          </ul>
        </Block>

        {/* 5. 내 금지 행동 */}
        <Block icon="🚫" title="지금 하면 망하는 행동">
          <div className="space-y-2">
            {profile.type.failurePatterns.map((f, i) => (
              <div key={i} className="flex gap-2.5 rounded-xl border border-bad/30 bg-white px-4 py-3 text-[14px] text-ink/85">
                <span className="font-bold text-bad">✗</span>
                <span>{f}</span>
              </div>
            ))}
          </div>
        </Block>
      </div>

      <div className="h-[68px]" />
    </main>
  );
}

function Block({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-line bg-white p-4">
      <h2 className="mb-3 flex items-center gap-2 text-[16px] font-extrabold text-ink">
        <span>{icon}</span>
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

// 한 줄 복사
function CopyRow({ label, text, multiline = false }: { label: string; text: string; multiline?: boolean }) {
  const [copied, setCopied] = useState(false);
  function copy() {
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }
  return (
    <div className="rounded-xl bg-app-bg p-3">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-[11px] font-bold text-purple">{label}</span>
        <button onClick={copy} className="text-[11px] font-bold text-pink">
          {copied ? "복사됨 ✓" : "복사"}
        </button>
      </div>
      <p className={`text-[13.5px] leading-relaxed text-ink ${multiline ? "whitespace-pre-line" : ""}`}>{text}</p>
    </div>
  );
}

// 목록 복사 (펼치기)
function ListCopy({ label, items }: { label: string; items: string[] }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const shown = open ? items : items.slice(0, 3);
  function copyAll() {
    navigator.clipboard?.writeText(items.join("\n")).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }
  return (
    <div className="rounded-xl bg-app-bg p-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[11px] font-bold text-purple">{label}</span>
        <button onClick={copyAll} className="text-[11px] font-bold text-pink">
          {copied ? "전체 복사됨 ✓" : "전체 복사"}
        </button>
      </div>
      <ul className="space-y-1.5">
        {shown.map((t, i) => (
          <li key={i} className="flex gap-2 text-[13.5px] leading-relaxed text-ink">
            <span className="text-pink">·</span>
            <span>{t}</span>
          </li>
        ))}
      </ul>
      {items.length > 3 && (
        <button onClick={() => setOpen((v) => !v)} className="mt-2 text-[12px] font-bold text-muted">
          {open ? "접기" : `+ ${items.length - 3}개 더 보기`}
        </button>
      )}
    </div>
  );
}
