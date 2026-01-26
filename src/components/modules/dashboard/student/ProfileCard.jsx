"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/apiClient";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Pencil,
  User,
  CalendarDays,
  Phone,
  Mail,
  AtSign,
  BadgeCheck,
  IdCard,
  School,
  MapPin,
  Edit3,
  Award,
  Target,
  Clock,
  Globe,
  Briefcase,
  Heart,
  Star,
  Shield,
  TrendingUp,
  Users,
  BookOpen,
  Zap,
  Sparkles
} from "lucide-react";
import EditProfileModal from "./EditProfileModal";

export default function ProfileCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stats, setStats] = useState({
    coursesCompleted: 0,
    pointsEarned: 0,
    currentStreak: 0,
    rank: "Beginner"
  });

  // Fetch user profile data
  const { data: userData, isLoading, refetch } = useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => {
      const response = await api.get('/users/me');
      return response.data?.data;
    }
  });

  // Fetch user stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Replace with your actual API endpoints
        const coursesRes = await api.get('/users/stats/courses');
        const pointsRes = await api.get('/users/stats/points');
        setStats({
          coursesCompleted: coursesRes.data?.count || 0,
          pointsEarned: pointsRes.data?.points || 0,
          currentStreak: pointsRes.data?.streak || 0,
          rank: pointsRes.data?.rank || "Beginner"
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };

    if (userData) {
      fetchStats();
    }
  }, [userData]);

  // Transform API data
  const profile = userData ? {
    firstName: userData.name?.split(' ')[0] || '',
    lastName: userData.name?.split(' ').slice(1).join(' ') || '',
    userName: userData.email?.split('@')[0] || '',
    phone: userData.phone || '',
    email: userData.email || '',
    organization: userData.organization || '',
    region: userData.region || '',
    intro: userData.intro || '',
    picture: userData.picture || '',
    registrationDate: userData.createdAt ? new Date(userData.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }) : '',
    bio: userData.intro || '',
    gender: userData.gender || '',
    dob: userData.dob ? new Date(userData.dob).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }) : '',
  } : {};

  const handleSaveProfile = async (formData) => {
    try {
      const updateData = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        phone: formData.phone,
        organization: formData.organization,
        region: formData.region,
        intro: formData.bio,
        gender: formData.gender,
        dob: formData.dob,
      };

      await api.patch('/users/me', updateData);
      toast.success("Profile updated successfully!");
      refetch();
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const fullName = profile.firstName && profile.lastName ? `${profile.firstName} ${profile.lastName}` : userData?.name || 'Loading...';
  const initials = fullName !== 'Loading...' ? fullName.split(' ').map(n => n[0]).join('').toUpperCase() : 'U';

  if (isLoading) {
    return (
      <div className="relative mt-6 overflow-hidden rounded-3xl border border-gray-100 bg-gradient-to-br from-white to-emerald-50/30 p-8 shadow-xl">
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="relative">
              <div className="h-16 w-16 animate-spin rounded-full border-4 border-emerald-200 border-t-[var(--color-primary)]"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="h-8 w-8 animate-pulse text-[var(--color-primary)]" />
              </div>
            </div>
            <p className="mt-4 text-lg font-medium text-gray-600">Loading your profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="relative mt-8 overflow-hidden rounded-3xl bg-white shadow-2xl">
      {/* Gradient Background with Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/5 via-white to-[var(--color-secondary)]/5"></div>
      
      {/* Decorative Elements */}
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-r from-[var(--color-primary)]/10 to-[var(--color-secondary)]/10 blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-gradient-to-r from-[var(--color-accent)]/10 to-[var(--color-primary)]/10 blur-3xl"></div>

      {/* Cover Section with Gradient */}
      <div className="relative h-32 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-accent-special)] to-[var(--color-secondary)] opacity-90"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="relative px-6 pb-8 md:px-8">
        {/* Avatar with Glow Effect */}
        <div className="relative -mt-16 inline-flex items-center">
          <div className="relative">
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-accent-special)] to-[var(--color-secondary)] opacity-60 blur-lg"></div>
            <div className="relative grid h-28 w-28 place-items-center rounded-full bg-white p-1 shadow-2xl">
              <div className="grid h-full w-full place-items-center rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] text-white text-3xl font-bold shadow-inner">
                {initials || <User className="h-12 w-12" />}
              </div>
            </div>
          </div>
        </div>

        {/* Header Section */}
        <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-bold text-gray-900">{fullName}</h2>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-[var(--color-accent)] to-amber-400">
                <Award className="h-4 w-4 text-white" />
              </span>
            </div>
            
            {/* Badges Row */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Badge className="bg-gradient-to-r from-[var(--color-secondary)]/10 to-[var(--color-secondary)]/5 text-[var(--color-secondary)] border border-[var(--color-secondary)]/20">
                <AtSign className="mr-1.5 h-3.5 w-3.5" /> @{profile.userName}
              </Badge>
              <Badge className="bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 text-emerald-700 border border-emerald-200">
                <CalendarDays className="mr-1.5 h-3.5 w-3.5" /> Member since {profile.registrationDate}
              </Badge>
              <Badge className="bg-gradient-to-r from-[var(--color-accent)]/10 to-[var(--color-accent)]/5 text-amber-700 border border-amber-200">
                <Target className="mr-1.5 h-3.5 w-3.5" /> {stats.rank}
              </Badge>
            </div>

          </div>

          {/* Edit Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent-special)] px-5 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
          >
            <Edit3 className="h-4 w-4 transition-transform group-hover:rotate-12" />
            Edit Profile
          </button>
        </div>

        {/* Content Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Bio Card */}
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-gray-50/50 p-6 shadow-lg">
            <div className="mb-4 flex items-center gap-2">
              <div className="rounded-lg bg-gradient-to-r from-[var(--color-primary)]/10 p-2">
                <Heart className="h-5 w-5 text-[var(--color-primary)]" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">About Me</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">{profile.bio || "No bio added yet. Share something about yourself!"}</p>
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
              <Shield className="h-4 w-4" />
              <span>Profile verified</span>
            </div>
          </div>

          {/* Information Cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Info */}
            <InfoCard 
              title="Personal Information" 
              icon={<User className="h-5 w-5 text-[var(--color-primary)]" />}
              gradient="from-[var(--color-primary)]/5 to-white"
            >
              <InfoGrid>
                <InfoItem 
                  icon={<IdCard className="h-4 w-4 text-[var(--color-primary)]" />} 
                  label="Full Name" 
                  value={fullName}
                  highlighted
                />
                <InfoItem 
                  icon={<AtSign className="h-4 w-4 text-[var(--color-primary)]" />} 
                  label="Username" 
                  value={profile.userName}
                />
                <InfoItem 
                  icon={<BadgeCheck className="h-4 w-4 text-[var(--color-primary)]" />} 
                  label="Gender" 
                  value={profile.gender || "Not specified"}
                />
                <InfoItem 
                  icon={<CalendarDays className="h-4 w-4 text-[var(--color-primary)]" />} 
                  label="Date of Birth" 
                  value={profile.dob || "Not specified"}
                />
              </InfoGrid>
            </InfoCard>

            {/* Contact Info */}
            <InfoCard 
              title="Contact Details" 
              icon={<Mail className="h-5 w-5 text-[var(--color-secondary)]" />}
              gradient="from-[var(--color-secondary)]/5 to-white"
            >
              <InfoGrid>
                <InfoItem 
                  icon={<Phone className="h-4 w-4 text-[var(--color-secondary)]" />} 
                  label="Phone" 
                  value={profile.phone || "Not specified"}
                  highlighted
                />
                <InfoItem 
                  icon={<Mail className="h-4 w-4 text-[var(--color-secondary)]" />} 
                  label="Email" 
                  value={profile.email}
                />
                <InfoItem 
                  icon={<Globe className="h-4 w-4 text-[var(--color-secondary)]" />} 
                  label="Region" 
                  value={profile.region || "Not specified"}
                />
                <InfoItem 
                  icon={<CalendarDays className="h-4 w-4 text-[var(--color-secondary)]" />} 
                  label="Member Since" 
                  value={profile.registrationDate}
                />
              </InfoGrid>
            </InfoCard>

            {/* Education/Organization */}
            <InfoCard 
              title="Education & Organization" 
              icon={<Briefcase className="h-5 w-5 text-emerald-600" />}
              gradient="from-emerald-50 to-white"
            >
              <InfoGrid>
                <InfoItem 
                  icon={<School className="h-4 w-4 text-emerald-600" />} 
                  label="Organization" 
                  value={profile.organization || "Not specified"}
                  highlighted
                />
                <InfoItem 
                  icon={<MapPin className="h-4 w-4 text-emerald-600" />} 
                  label="Location" 
                  value={profile.region || "Not specified"}
                />
                <InfoItem 
                  icon={<Users className="h-4 w-4 text-emerald-600" />} 
                  label="Role" 
                  value={userData?.role || "Student"}
                />
                <InfoItem 
                  icon={<Star className="h-4 w-4 text-emerald-600" />} 
                  label="Status" 
                  value="Active"
                  badgeColor="bg-emerald-100 text-emerald-800"
                />
              </InfoGrid>
            </InfoCard>
          </div>
        </div>
      </div>

      {/* Modal */}
      <EditProfileModal
        profile={profile}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProfile}
      />
    </section>
  );
}

/* ---------- Subcomponents ---------- */

function InfoCard({ title, icon, gradient, children }) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-gray-100 bg-gradient-to-br ${gradient} p-6 shadow-lg`}>
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-lg bg-white p-2 shadow-sm">
          {icon}
        </div>
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function InfoGrid({ children }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {children}
    </div>
  );
}

function InfoItem({ icon, label, value, highlighted = false, badgeColor }) {
  return (
    <div className={`rounded-xl p-4 transition-all ${highlighted ? 'bg-gradient-to-r from-gray-50 to-white border border-gray-100' : 'hover:bg-gray-50'}`}>
      <div className="flex items-center gap-2">
        {icon}
        <p className="text-sm font-medium text-gray-600">{label}</p>
      </div>
      {badgeColor ? (
        <span className={`mt-2 inline-block rounded-full px-3 py-1 text-sm font-medium ${badgeColor}`}>
          {value}
        </span>
      ) : (
        <p className="mt-2 text-lg font-semibold text-gray-900">{value}</p>
      )}
    </div>
  );
}

function Badge({ children, className = "" }) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium ${className}`}>
      {children}
    </span>
  );
}

function StatCard({ icon, label, value, color }) {
  return (
    <div className={`overflow-hidden rounded-xl border border-gray-100 bg-gradient-to-br ${color} p-4 shadow-sm`}>
      <div className="flex items-center justify-between">
        <div className="rounded-lg bg-white p-2 shadow-sm">
          {icon}
        </div>
        <span className="text-2xl font-bold text-gray-900">{value}</span>
      </div>
      <p className="mt-2 text-sm font-medium text-gray-600">{label}</p>
    </div>
  );
}