"use client";
import { useState } from "react";

// 유형 캐릭터(무기토끼). 사진이 없거나 못 불러오면 이모지로 대신한다 — 엑박 금지.
// 사진 위치: public/characters/{유형코드}.webp (배경 투명 — 어떤 배경색 위에도 캐릭터만 뜬다)
export default function TypeCharacter({ code, name, emoji }: { code: string; name: string; emoji?: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return emoji ? <div className="mt-3 text-[44px] leading-none">{emoji}</div> : null;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/characters/${code}.webp`}
      alt={`${name} 캐릭터`}
      className="mx-auto mt-4 block h-[216px] w-auto max-w-[78%] object-contain drop-shadow-[0_14px_14px_rgba(7,7,31,0.28)]"
      onError={() => setFailed(true)}
    />
  );
}
