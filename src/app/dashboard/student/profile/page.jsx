"use client";

import ProfileCard from "@/components/modules/dashboard/student/ProfileCard";


export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-white">
      <h1 className="text-2xl font-bold text-[var(--color-text)] mb-4">
        My Profile
      </h1>
      <ProfileCard />
    </div>
  );
}
