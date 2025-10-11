"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import EditProfileModal from "./EditProfileModal";

export default function ProfileCard() {
  const [profile, setProfile] = useState({
    firstName: "Ronald",
    lastName: "Richard",
    userName: "studentdemo",
    gender: "Male",
    dob: "16 Jan 2020",
    age: 24,
    phone: "90154-91036",
    email: "studentdemo@example.com",
    registrationDate: "16 Jan 2024, 11:15 AM",
    bio: "Hello! I'm Ronald Richard. I'm passionate about developing innovative software solutions, analyzing classic literature. I aspire to become a software developer, work as an editor. In my free time, I enjoy coding, reading, hiking etc.",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-white shadow-md rounded-xl p-6 mt-6">
      <div className="flex justify-between items-center mb-4 border-b pb-2">
        <h2 className="text-lg font-semibold text-[var(--color-text)]">
          Basic Information
        </h2>
        <button onClick={() => setIsModalOpen(true)} className="text-gray-500 hover:text-[var(--color-primary)]">
          <Pencil size={18} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ProfileField label="First Name" value={profile.firstName} />
        <ProfileField label="Last Name" value={profile.lastName} />
        <ProfileField label="Registration Date" value={profile.registrationDate} />
        <ProfileField label="User Name" value={profile.userName} />
        <ProfileField label="Phone Number" value={profile.phone} />
        <ProfileField label="Email" value={profile.email} />
        <ProfileField label="Gender" value={profile.gender} />
        <ProfileField label="DOB" value={profile.dob} />
        <ProfileField label="Age" value={profile.age} />
      </div>

      <div className="mt-6">
        <p className="text-sm text-gray-500">Bio</p>
        <p className="text-[var(--color-text)] mt-1">{profile.bio}</p>
      </div>

      {/* Modal */}
      <EditProfileModal
        profile={profile}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={setProfile}
      />
    </div>
  );
}

const ProfileField = ({ label, value }) => (
  <div className="mb-4">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-[var(--color-text)] font-medium">{value}</p>
  </div>
);
