// app/dashboard/student/profile/StudentProfile.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/apiClient";
import { toast } from "react-toastify";
import {
  User,
  Edit2,
  Save,
  X,
  Mail,
  Phone,
  MapPin,
  School,
  Calendar,
  BookOpen,
  GraduationCap,
  Heart,
  Award,
  Star,
  Upload,
  Loader2,
  CheckCircle,
  Eye,
  EyeOff,
  Globe,
  Linkedin,
  Github,
  Twitter,
  Users,
  Shield
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import ChangePassword from "../../admin/settings/ChangePassword";

// Custom hooks
const useStudentProfile = (userId) => {
  return useQuery({
    queryKey: ['studentProfile', userId],
    queryFn: async () => {
      // For student viewing their own profile
       const res = await api.get(`/user/students/${userId}`);
        return res.data;
    },
    enabled: !!userId,
    refetchOnWindowFocus: false,
  });
};

const useUpdateStudentProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      const res = await api.patch('/user/me', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['studentProfile']);
      queryClient.invalidateQueries(['user']);
    }
  });
};

const useCities = () => {
  return useQuery({
    queryKey: ['cities'],
    queryFn: async () => {
      const res = await api.get('/cities', { params: { isActive: true, limit: 100 } });
      return res.data;
    },
    refetchOnWindowFocus: false,
  });
};

const useSchools = (cityId) => {
  return useQuery({
    queryKey: ['schools', cityId],
    queryFn: async () => {
      const res = await api.get('/schools', { 
        params: { 
          cityId: cityId || undefined,
          isActive: true,
          limit: 100 
        }
      });
      return res.data;
    },
    enabled: !!cityId,
    refetchOnWindowFocus: false,
  });
};

export default function StudentProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showSocialFields, setShowSocialFields] = useState(false);
  const fileInputRef = useRef(null);
  const { user } = useAuth()

  // Fetch data
  const userId = user?._id
  const { data: profileData, isLoading, error } = useStudentProfile(userId);
  const { data: citiesData } = useCities();
  const updateProfile = useUpdateStudentProfile();

  // Form state
  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting }, reset } = useForm();

  const profile = profileData?.data || {};
  const cities = citiesData?.data?.data || [];

  // Watch form values
  const selectedCityId = watch("city");
  const { data: schoolsData } = useSchools(selectedCityId);
  const schools = schoolsData?.data?.data || [];

  // Initialize form with profile data
  useEffect(() => {
    if (profileData) {
      const studentInfo = profile;
      const userData = profile || {};
      
      // Format join date
      const joinDate = userData.createdAt 
        ? new Date(userData.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        : "";

      const initialData = {
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        bio: userData.intro || "",
        profileImage: userData.picture || "/api/placeholder/400/400",
        dateOfBirth: studentInfo.dateOfBirth || "",
        gender: studentInfo.gender || "",
        city: studentInfo.city?._id || studentInfo.city || "",
        school: studentInfo.school?._id || studentInfo.school || "",
        grade: studentInfo.grade || "",
        interests: studentInfo.interests || [],
        goals: studentInfo.goals || "",
        website: userData.socialLinks?.website || "",
        linkedin: userData.socialLinks?.linkedin || "",
        twitter: userData.socialLinks?.twitter || "",
        github: userData.socialLinks?.github || "",
        joinDate: joinDate,
        isVerified: userData.isVerified || false,
        isActive: userData.isActive === "ACTIVE"
      };

      reset(initialData);
    }
  }, [profileData, reset]);

  // Handle profile image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error("Please upload an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "profile-images");

    try {
      const res = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      
      const imageUrl = res.data?.data?.url;
      if (imageUrl) {
        setValue("profileImage", imageUrl);
        toast.success("Profile image uploaded! Don't forget to save your changes.");
      } else {
        throw new Error("No image URL returned");
      }
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error(error.response?.data?.message || "Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  // Handle form submission
  const onSubmit = async (formData) => {
    try {
      // Prepare payload
      const payload = {
        // User fields
        name: formData.name,
        phone: formData.phone || "",
        intro: formData.bio || "",
        picture: formData.profileImage || "",
        socialLinks: {
          linkedin: formData.linkedin || "",
          twitter: formData.twitter || "",
          github: formData.github || "",
          website: formData.website || ""
        },
        // Student fields
        dateOfBirth: formData.dateOfBirth || "",
        gender: formData.gender || "",
        city: formData.city || "",
        school: formData.school || "",
        grade: formData.grade || "",
        interests: formData.interests || [],
        goals: formData.goals || ""
      };


      updateProfile.mutate(payload, {
        onSuccess: () => {
          setIsEditing(false);
          toast.success("Profile updated successfully!");
        },
        onError: (error) => {
          toast.error(error.response?.data?.message || "Failed to update profile");
        }
      });
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Failed to update profile");
    }
  };

  // Interests management
  const [newInterest, setNewInterest] = useState("");
  const interests = watch("interests") || [];

  const addInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      const updatedInterests = [...interests, newInterest.trim()];
      setValue("interests", updatedInterests);
      setNewInterest("");
      toast.success("Interest added!");
    }
  };

  const removeInterest = (interestToRemove) => {
    const updatedInterests = interests.filter(i => i !== interestToRemove);
    setValue("interests", updatedInterests);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen p-4 md:p-6 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-emerald-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-4 md:p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load profile</p>
          <p className="text-gray-600 text-sm">Please try again later</p>
        </div>
      </div>
    );
  }

  const currentProfile = {
    name: watch("name") || profile?.name || "",
    email: watch("email") || profile?.email || "",
    phone: watch("phone") || profile?.phone || "",
    bio: watch("bio") || profile?.intro || "",
    profileImage: watch("profileImage") || profile?.picture || "/api/placeholder/400/400",
    dateOfBirth: watch("dateOfBirth") || profile.dateOfBirth || "",
    gender: watch("gender") || profile.gender || "",
    city: cities.find(c => c._id === watch("city"))?.name || profile.city?.name || "",
    school: schools.find(s => s._id === watch("school"))?.name || profile.school?.name || "",
    grade: watch("grade") || profile.grade || "",
    interests: interests,
    goals: watch("goals") || profile.goals || "",
    linkedin: watch("linkedin") || profile?.socialLinks?.linkedin || "",
    twitter: watch("twitter") || profile?.socialLinks?.twitter || "",
    github: watch("github") || profile?.socialLinks?.github || "",
    website: watch("website") || profile?.socialLinks?.website || "",
    joinDate: watch("joinDate") || "",
    isVerified: watch("isVerified") || false
  };

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Student Profile
              </h1>
              <p className="text-gray-600 mt-2">
                Manage your personal information and academic details
              </p>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${isEditing 
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:shadow-lg' 
                : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:shadow-lg hover:scale-105'
              }`}
            >
              {isEditing ? (
                <>
                  <X className="w-5 h-5" />
                </>
              ) : (
                <>
                  <Edit2 className="w-5 h-5" />
                  Edit Profile
                </>
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="sticky top-8"
            >
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                {/* Profile Header */}
                <div className="relative h-32 bg-gradient-to-r from-emerald-500 to-teal-600">
                  <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                    <div className="relative">
                      <div className="w-32 h-32 rounded-full border-4 border-white bg-white overflow-hidden shadow-2xl">
                        {isEditing ? (
                          <div className="relative group">
                            <Image
                              src={currentProfile.profileImage}
                              alt={currentProfile.name}
                              width={500}
                              height={500}
                              className="w-full h-full object-contain"
                            />
                            <label className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                              <div className="text-center">
                                <Upload className="w-6 h-6 text-white mx-auto mb-1" />
                                <span className="text-xs text-white">Change</span>
                              </div>
                              <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageUpload}
                                accept="image/*"
                                className="hidden"
                              />
                            </label>
                            {isUploading && (
                              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <Loader2 className="w-8 h-8 text-white animate-spin" />
                              </div>
                            )}
                          </div>
                        ) : (
                          <Image
                            src={currentProfile.profileImage}
                            alt={currentProfile.name}
                            width={500}
                            height={500}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      {currentProfile.isVerified && (
                        <div className="absolute bottom-2 right-2 bg-emerald-500 text-white p-1.5 rounded-full border-2 border-white">
                          <CheckCircle className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Profile Info */}
                <div className="pt-20 pb-6 px-6">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {isEditing ? (
                        <input
                          {...register("name")}
                          className="w-full text-center bg-transparent border-b border-gray-300 focus:border-emerald-500 focus:outline-none text-2xl font-bold"
                        />
                      ) : (
                        currentProfile.name
                      )}
                    </h2>
                    {/* <div className="mt-2">
                      <p className="text-gray-600">
                        {isEditing ? (
                          <input
                            {...register("grade")}
                            placeholder="Grade/Class"
                            className="w-full text-center bg-transparent border-b border-gray-300 focus:border-emerald-500 focus:outline-none text-gray-600"
                          />
                        ) : (
                          currentProfile.grade || "Student"
                        )}
                      </p>
                    </div> */}
                    
                    {currentProfile.joinDate && (
                      <div className="flex items-center justify-center gap-2 mt-3">
                        <div className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                          <Calendar className="w-3 h-3 inline mr-1" />
                          Joined {currentProfile.joinDate}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-gray-700">
                      <Mail className="w-4 h-4 text-gray-400" />
                      {isEditing ? (
                        <input
                          {...register("email", { pattern: /^\S+@\S+$/i })}
                          type="email"
                          className="flex-1 bg-transparent border-b border-gray-300 focus:border-emerald-500 focus:outline-none"
                        />
                      ) : (
                        <span>{currentProfile.email}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <Phone className="w-4 h-4 text-gray-400" />
                      {isEditing ? (
                        <input
                          {...register("phone")}
                          type="tel"
                          className="flex-1 bg-transparent border-b border-gray-300 focus:border-emerald-500 focus:outline-none"
                          placeholder="Phone number"
                        />
                      ) : (
                        <span>{currentProfile.phone || "Not provided"}</span>
                      )}
                    </div>
                    {currentProfile.city && (
                      <div className="flex items-center gap-3 text-gray-700">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>{currentProfile.city}</span>
                      </div>
                    )}
                  </div>

                  {/* Social Links */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">Social Links</h3>
                      {isEditing && (
                        <button
                          type="button"
                          onClick={() => setShowSocialFields(!showSocialFields)}
                          className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                        >
                          {showSocialFields ? "Hide" : "Show Fields"}
                        </button>
                      )}
                    </div>
                    
                    <div className="flex gap-3 flex-wrap">
                      {currentProfile.linkedin ? (
                        <a
                          href={currentProfile.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                          title="LinkedIn"
                        >
                          <Linkedin className="w-5 h-5" />
                        </a>
                      ) : !isEditing && (
                        <div className="p-2 bg-gray-50 text-gray-400 rounded-lg" title="LinkedIn not set">
                          <Linkedin className="w-5 h-5" />
                        </div>
                      )}
                      {currentProfile.twitter ? (
                        <a
                          href={currentProfile.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-sky-50 text-sky-600 rounded-lg hover:bg-sky-100 transition-colors"
                          title="Twitter"
                        >
                          <Twitter className="w-5 h-5" />
                        </a>
                      ) : !isEditing && (
                        <div className="p-2 bg-gray-50 text-gray-400 rounded-lg" title="Twitter not set">
                          <Twitter className="w-5 h-5" />
                        </div>
                      )}
                      {currentProfile.github ? (
                        <a
                          href={currentProfile.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
                          title="GitHub"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      ) : !isEditing && (
                        <div className="p-2 bg-gray-50 text-gray-400 rounded-lg" title="GitHub not set">
                          <Github className="w-5 h-5" />
                        </div>
                      )}
                      {currentProfile.website ? (
                        <a
                          href={currentProfile.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors"
                          title="Website"
                        >
                          <Globe className="w-5 h-5" />
                        </a>
                      ) : !isEditing && (
                        <div className="p-2 bg-gray-50 text-gray-400 rounded-lg" title="Website not set">
                          <Globe className="w-5 h-5" />
                        </div>
                      )}
                      {isEditing && (!currentProfile.linkedin && !currentProfile.twitter && !currentProfile.github && !currentProfile.website) && (
                        <p className="text-sm text-gray-500 italic">No social links added yet</p>
                      )}
                    </div>

                    {/* Social Input Fields (when editing) */}
                    <AnimatePresence>
                      {isEditing && showSocialFields && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 space-y-3 overflow-hidden"
                        >
                          <div className="flex items-center gap-2">
                            <Linkedin className="w-4 h-4 text-blue-500" />
                            <input
                              {...register("linkedin")}
                              placeholder="LinkedIn URL"
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none text-sm"
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <Twitter className="w-4 h-4 text-sky-500" />
                            <input
                              {...register("twitter")}
                              placeholder="Twitter URL"
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none text-sm"
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <Github className="w-4 h-4 text-gray-600" />
                            <input
                              {...register("github")}
                              placeholder="GitHub URL"
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none text-sm"
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-emerald-500" />
                            <input
                              {...register("website")}
                              placeholder="Personal Website"
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none text-sm"
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Verification Status */}
                  {/* {!currentProfile.isVerified && (
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl mb-6">
                      <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-amber-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-amber-800">Profile Not Verified</h4>
                          <p className="text-sm text-amber-700 mt-1">
                            Verify your identity to access all features
                          </p>
                          <button className="mt-2 text-sm font-medium text-amber-700 hover:text-amber-800">
                            Start Verification →
                          </button>
                        </div>
                      </div>
                    </div>
                  )} */}
                </div>
                <ChangePassword />
              </div>
            </motion.div>
          </div>

          {/* Right Column - Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="p-6 md:p-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {/* Bio Section */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-emerald-600" />
                        About Me
                      </h3>
                      {isEditing && (
                        <span className="text-sm text-gray-500">
                          {watch("bio")?.length || 0}/500 characters
                        </span>
                      )}
                    </div>
                    {isEditing ? (
                      <textarea
                        {...register("bio", { maxLength: 500 })}
                        rows={4}
                        className="w-full p-4 border border-gray-300 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none resize-none"
                        placeholder="Tell us about yourself... (Max 500 characters)"
                      />
                    ) : (
                      <p className="text-gray-700 leading-relaxed">
                        {currentProfile.bio || "No bio added yet."}
                      </p>
                    )}
                  </div>

                  {/* Academic Info Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-blue-600" />
                        Location & School
                      </h3>
                      <div className="space-y-4">
                        {isEditing ? (
                          <>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                City *
                              </label>
                              <select
                                {...register("city")}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none"
                              >
                                <option value="">Select City</option>
                                {cities.map(city => (
                                  <option key={city._id} value={city._id}>
                                    {city.name} {city.country && `(${city.country})`}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                School *
                              </label>
                              <select
                                {...register("school")}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none"
                                disabled={!selectedCityId}
                              >
                                <option value="">Select School</option>
                                {schools.map(school => (
                                  <option key={school._id} value={school._id}>
                                    {school.name}
                                  </option>
                                ))}
                              </select>
                              {!selectedCityId && (
                                <p className="text-sm text-gray-500 mt-1">
                                  Please select a city first
                                </p>
                              )}
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                              <MapPin className="w-5 h-5 text-blue-600" />
                              <div>
                                <p className="text-sm text-gray-600">City</p>
                                <p className="font-medium text-gray-900">{currentProfile.city || "Not set"}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg">
                              <School className="w-5 h-5 text-emerald-600" />
                              <div>
                                <p className="text-sm text-gray-600">School</p>
                                <p className="font-medium text-gray-900">{currentProfile.school || "Not set"}</p>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2 md:mt-6">
                        {/* <GraduationCap className="w-5 h-5 text-purple-600" />
                        Academic Details */}
                      </h3>
                      <div className="space-y-4">
                        {isEditing ? (
                          <>
                            {/* <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Grade/Class
                              </label>
                              <input
                                {...register("grade")}
                                type="text"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none"
                                placeholder="e.g., 10th Grade"
                              />
                            </div> */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Date of Birth
                              </label>
                              <input
                                {...register("dateOfBirth")}
                                type="date"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Gender
                              </label>
                              <select
                                {...register("gender")}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none"
                              >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                                <option value="prefer-not-to-say">Prefer not to say</option>
                              </select>
                            </div>
                          </>
                        ) : (
                          <>
                            {/* <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                              <GraduationCap className="w-5 h-5 text-purple-600" />
                              <div>
                                <p className="text-sm text-gray-600">Grade</p>
                                <p className="font-medium text-gray-900">{currentProfile.grade || "Not set"}</p>
                              </div>
                            </div> */}
                            {currentProfile.dateOfBirth && (
                              <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                                <Calendar className="w-5 h-5 text-amber-600" />
                                <div>
                                  <p className="text-sm text-gray-600">Date of Birth</p>
                                  <p className="font-medium text-gray-900">
                                    {new Date(currentProfile.dateOfBirth).toLocaleDateString('en-US', {
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric'
                                    })}
                                  </p>
                                </div>
                              </div>
                            )}
                            {currentProfile.gender && (
                              <div className="flex items-center gap-3 p-3 bg-pink-50 rounded-lg">
                                <User className="w-5 h-5 text-pink-600" />
                                <div>
                                  <p className="text-sm text-gray-600">Gender</p>
                                  <p className="font-medium text-gray-900 capitalize">
                                    {currentProfile.gender.replace(/-/g, ' ')}
                                  </p>
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Interests Section */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <Heart className="w-5 h-5 text-red-600" />
                        Interests
                      </h3>
                      {isEditing && (
                        <span className="text-sm text-gray-500">
                          {interests.length} interests
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {interests.map((interest, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-red-50 text-red-700 rounded-full text-sm font-medium flex items-center gap-2"
                        >
                          {interest}
                          {isEditing && (
                            <button
                              type="button"
                              onClick={() => removeInterest(interest)}
                              className="hover:text-red-900"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          )}
                        </span>
                      ))}
                      {interests.length === 0 && !isEditing && (
                        <p className="text-gray-500 italic">No interests added yet</p>
                      )}
                    </div>

                    {/* Add Interest Input (when editing) */}
                    {isEditing && (
                      <div className="mt-4 flex gap-2">
                        <input
                          type="text"
                          value={newInterest}
                          onChange={(e) => setNewInterest(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && addInterest()}
                          placeholder="Add new interest..."
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={addInterest}
                          className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium"
                        >
                          Add
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Learning Goals Section */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Award className="w-5 h-5 text-amber-600" />
                      Learning Goals
                    </h3>
                    {isEditing ? (
                      <textarea
                        {...register("goals")}
                        rows={3}
                        className="w-full p-4 border border-gray-300 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none resize-none"
                        placeholder="What are your learning goals? What do you want to achieve?"
                      />
                    ) : (
                      <p className="text-gray-700 leading-relaxed">
                        {currentProfile.goals || "No learning goals set yet."}
                      </p>
                    )}
                  </div>
                </motion.div>

                {/* Edit Form Actions */}
                {isEditing && (
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row gap-3 justify-end">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleSubmit(onSubmit)}
                        disabled={isSubmitting || updateProfile.isPending}
                        className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {(isSubmitting || updateProfile.isPending) ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="w-5 h-5" />
                            Save Changes
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}