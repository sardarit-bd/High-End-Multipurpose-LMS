"use client";

import { useState } from "react";
import {
  Pencil,
  User,
  CalendarDays,
  Phone,
  Mail,
  AtSign,
  BadgeCheck,
  IdCard,
} from "lucide-react";
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
  const fullName = `${profile.firstName} ${profile.lastName}`;
  const initials = `${profile.firstName?.[0] ?? ""}${profile.lastName?.[0] ?? ""}`.toUpperCase();

  return (
    <section
      className="mt-6 overflow-hidden rounded-2xl"
      style={{ background: "rgba(255,255,255,var(--container-opacity))", boxShadow: "var(--shadow-medium)" }}
    >
      {/* Cover */}
      <div
        className="h-28 w-full bg-gradient-to-r"
        style={{
          backgroundImage:
            "linear-gradient(90deg, var(--color-primary), var(--color-secondary))",
          opacity: 0.9,
        }}
      />

      {/* Header */}
      <div className="relative px-6 pb-6 pt-0 md:px-8">
        {/* Avatar */}
        <div className="relative -mt-12 inline-flex items-center">
          <div className="grid h-24 w-24 place-items-center rounded-full bg-white shadow"
               style={{ boxShadow: "var(--shadow-medium)" }}>
            <div
              className="grid h-20 w-20 place-items-center rounded-full text-white text-2xl font-semibold"
              style={{ background: "var(--color-primary)" }}
              aria-label={`${fullName} avatar`}
            >
              {initials || <User className="h-8 w-8" />}
            </div>
          </div>
        </div>

        {/* Name + actions */}
        <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[var(--color-text)] leading-tight">
              {fullName}
            </h2>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-sm">
              <Badge className="bg-[var(--color-secondary)]/10 text-[var(--color-secondary)]">
                <AtSign className="mr-1 h-4 w-4" /> {profile.userName}
              </Badge>
              <Badge className="bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                <CalendarDays className="mr-1 h-4 w-4" /> Registered: {profile.registrationDate}
              </Badge>
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm text-white transition focus:outline-none"
            style={{ background: "var(--color-secondary)", boxShadow: "var(--shadow-medium)" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-secondary-hover)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--color-secondary)")}
            aria-label="Edit profile"
          >
            <Pencil className="h-4 w-4" />
            Edit Profile
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 gap-6 px-6 pb-8 md:grid-cols-3 md:px-8">
        {/* Left: Bio */}
        <div
          className="rounded-2xl p-5"
          style={{ background: "white", boxShadow: "var(--shadow-soft)" }}
        >
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-[var(--color-text)]/70">
            About
          </h3>
          <p className="text-[var(--color-text)] leading-relaxed">{profile.bio}</p>
        </div>

        {/* Right: Details (2 cols on md+) */}
        <div className="md:col-span-2 grid grid-cols-1 gap-6 lg:grid-cols-1">
          <InfoCard title="Basic Information">
            <InfoItem icon={<User className="h-4 w-4" />} label="First Name" value={profile.firstName} />
            <InfoItem icon={<User className="h-4 w-4" />} label="Last Name" value={profile.lastName} />
            <InfoItem icon={<IdCard className="h-4 w-4" />} label="Username" value={profile.userName} />
            <InfoItem icon={<BadgeCheck className="h-4 w-4" />} label="Gender" value={profile.gender} />
            <InfoItem icon={<CalendarDays className="h-4 w-4" />} label="DOB" value={profile.dob} />
            <InfoItem icon={<BadgeCheck className="h-4 w-4" />} label="Age" value={profile.age} />
          </InfoCard>

          <InfoCard title="Contact">
            <InfoItem icon={<Phone className="h-4 w-4" />} label="Phone" value={profile.phone} />
            <InfoItem icon={<Mail className="h-4 w-4" />} label="Email" value={profile.email} />
            <InfoItem
              icon={<CalendarDays className="h-4 w-4" />}
              label="Registration Date"
              value={profile.registrationDate}
            />
          </InfoCard>
        </div>
      </div>

      {/* Modal */}
      <EditProfileModal
        profile={profile}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={setProfile}
      />
    </section>
  );
}

/* ---------- Subcomponents ---------- */

function InfoCard({ title, children }) {
  return (
    <div
      className="rounded-2xl p-5"
      style={{ background: "white", boxShadow: "var(--shadow-soft)" }}
    >
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[var(--color-text)]/70">
        {title}
      </h3>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">{children}</div>
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
}) {
  return (
    <div className="rounded-xl px-3 py-2 transition hover:bg-black/5">
      <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-[var(--color-text)]/60">
        {icon} {label}
      </p>
      <p className="mt-1 font-medium text-[var(--color-text)]">{value}</p>
    </div>
  );
}

function Badge({
  children,
  className = "",
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${className}`}
      style={{ boxShadow: "var(--shadow-soft)" }}
    >
      {children}
    </span>
  );
}
