// 무기진단(이 앱)에서 무기지도(본체 위키 앱)로 가는 외부 링크.
// 두 앱은 로그인/동기화 없이 URL 링크로만 연결된다. (content-factory 분리 패턴과 동일)
// 미설정 시 로컬 개발 기본값(무기지도 = 포트 3000).
export const MAP_URL = process.env.NEXT_PUBLIC_MAP_URL || "http://localhost:3000";
