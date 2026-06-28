import AppHeader from "@/components/AppHeader";
import WeaponOS from "@/components/WeaponOS";
import BottomTabs from "@/components/BottomTabs";

export default function WeaponOSPage() {
  return (
    <>
      <AppHeader title="오늘의 실행" />
      <WeaponOS />
      <BottomTabs active="weapon-os" />
    </>
  );
}
