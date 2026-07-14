// ============================================================
//  결과/주문 데이터 저장 — Netlify Blobs 우선, 실패 시 demoid(URL 인코딩) 폴백
//  Blobs는 Netlify 배포 환경에서만 동작하므로, 로컬 `next dev`처럼
//  Netlify 컨텍스트가 없는 곳에서는 자동으로 기존 demoid 방식으로 떨어진다.
// ============================================================

import "server-only";
import { encodeDemo, decodeDemo, isDemoId } from "./demoid";

const PREFIX = "blob.";
const STORE_NAME = "mugi-results";

export function isBlobId(id: string): boolean {
  return id.startsWith(PREFIX);
}

function randomKey(): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(9)))
    .map((b) => b.toString(36).padStart(2, "0"))
    .join("")
    .slice(0, 14);
}

// 결과를 저장하고 짧은 id를 반환한다. Blobs 사용 불가 시 기존 demoid로 폴백.
export async function storeResult(obj: unknown): Promise<string> {
  try {
    const { getStore } = await import("@netlify/blobs");
    const store = getStore(STORE_NAME);
    const key = randomKey();
    await store.setJSON(key, obj);
    return PREFIX + key;
  } catch {
    return encodeDemo(obj);
  }
}

// id로 저장된 결과를 읽는다. blob id / demo id 둘 다 처리.
export async function readResult<T = unknown>(id: string): Promise<T | null> {
  if (isBlobId(id)) {
    try {
      const { getStore } = await import("@netlify/blobs");
      const store = getStore(STORE_NAME);
      const key = id.slice(PREFIX.length);
      const val = await store.get(key, { type: "json" });
      return (val as T) ?? null;
    } catch {
      return null;
    }
  }
  if (isDemoId(id)) return decodeDemo<T>(id);
  return null;
}

export { isDemoId };
