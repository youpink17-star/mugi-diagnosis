import AppHeader from "@/components/AppHeader";
import ProfileView from "@/components/ProfileView";
import BottomTabs from "@/components/BottomTabs";

export default function ProfilePage() {
  return (
    <>
      <AppHeader title="통합 무기 프로필" showBack />
      <ProfileView />
      <BottomTabs active="profile" />
    </>
  );
}
