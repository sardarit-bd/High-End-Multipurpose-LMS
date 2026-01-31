"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/apiClient";
import { Camera, Upload, Loader2, Eye, EyeOff } from "lucide-react";
import ChangePassword from "./ChangePassword";

// Custom hook for user profile
const useUserProfile = () => {
  return useQuery({
    queryKey: ['user-profile'],
    queryFn: async () => {
      const res = await api.get('/user/me');
      return res.data;
    },
    refetchOnWindowFocus: false,
  });
};

// Hook for updating profile
const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      const res = await api.patch('/user/me', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['user-profile']);
    }
  });
};


export default function SettingsPage() {
  const { data: profileData, isLoading, error } = useUserProfile();
  const updateProfile = useUpdateProfile();


  const [isUploading, setIsUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  

  const user = profileData?.data || {};

  // Profile form state
  const [profileForm, setProfileForm] = useState({
    name: "",
    picture: "",
    phone: ""
  });



  // Initialize form when data loads
  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || "",
        picture: user.picture || "",
        phone: user.phone || ""
      });
    }
  }, [user]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file
    if (!file.type.startsWith('image/')) {
      setErrorMessage("Please upload an image file");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("Image size should be less than 5MB");
      setTimeout(() => setErrorMessage(""), 3000);
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
        setProfileForm(prev => ({ ...prev, picture: imageUrl }));
        setSuccessMessage("Profile image uploaded! Don't forget to save your changes.");
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        throw new Error("No image URL returned");
      }
    } catch (error) {
      console.error("Image upload error:", error);
      setErrorMessage(error.response?.data?.message || "Failed to upload image");
      setTimeout(() => setErrorMessage(""), 3000);
    } finally {
      setIsUploading(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateProfile.mutateAsync(profileForm);
      setSuccessMessage("Profile updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Failed to update profile");
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6 text-[var(--color-text)]">
        <h1 className="text-2xl font-bold text-[--color-text]">Settings</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="bg-white rounded-[--radius-card] shadow-md p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-[--radius-card] shadow-md p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
              <div className="space-y-4">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-[--color-text]">Settings</h1>
        <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-[--radius-card]">
          Error loading profile data
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 text-[var(--color-text)]">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[--color-text]">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your account settings and preferences</p>
      </div>

      {/* Messages */}
      {successMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-emerald-100 text-emerald-700 rounded-[--radius-card]"
        >
          {successMessage}
        </motion.div>
      )}

      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-100 text-red-700 rounded-[--radius-card]"
        >
          {errorMessage}
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Profile Settings */}
        <div className="space-y-6">
          {/* Profile Information Card */}
          <div className="bg-white rounded-[--radius-card] shadow-md overflow-hidden">
            <div className="border-b border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900">Profile Information</h2>
              <p className="text-sm text-gray-500 mt-1">Update your personal information</p>
            </div>

            <div className="p-6">
              {/* Profile Picture */}
              <div className="flex flex-col items-center mb-8">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    {profileForm.picture ? (
                      <img
                        src={profileForm.picture}
                        alt={profileForm.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <span className="text-4xl font-bold text-gray-400">
                          {profileForm.name?.charAt(0).toUpperCase() || 'U'}
                        </span>
                      </div>
                    )}
                  </div>

                  <label className="absolute bottom-2 right-2 cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={isUploading}
                    />
                    <div className="p-2 bg-[#189E75] text-white rounded-full shadow-lg hover:bg-[#147c5e] transition-colors">
                      {isUploading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Camera className="w-5 h-5" />
                      )}
                    </div>
                  </label>
                </div>

                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500">
                    {isUploading ? "Uploading image..." : "Click camera icon to upload new photo"}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">JPG, PNG up to 5MB</p>
                </div>
              </div>

              {/* Profile Form */}
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#189E75] focus:border-transparent transition"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={user.email || ""}
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#189E75] focus:border-transparent transition"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={updateProfile.isLoading}
                    className="w-full px-4 py-3 bg-[#189E75] hover:bg-[#147c5e] text-white rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {updateProfile.isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      'Save Profile Changes'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Account Information Card (Read-only) */}
          <div className="bg-white rounded-[--radius-card] shadow-md overflow-hidden">
            <div className="border-b border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900">Account Information</h2>
              <p className="text-sm text-gray-500 mt-1">Your account details</p>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Account Role</span>
                  <span className="font-medium text-gray-900 capitalize">
                    {user.role?.toLowerCase().replace('_', ' ') || 'N/A'}
                  </span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Account Status</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.isActive === 'ACTIVE'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-red-100 text-red-700'
                    }`}>
                    {user.isActive || 'N/A'}
                  </span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Verification Status</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.isVerified
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-red-100 text-red-700'
                    }`}>
                    {user.isVerified ? 'Verified' : 'Not Verified'}
                  </span>
                </div>

                <div className="flex justify-between items-center py-3">
                  <span className="text-sm text-gray-600">Member Since</span>
                  <span className="font-medium text-gray-900">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Security Settings */}
        <div className="space-y-6">
          {/* Change Password Card */}
          <ChangePassword />

          {/* Security Tips Card */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-[--radius-card] shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="font-semibold text-blue-900 mb-4">Security Tips</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span className="text-sm text-blue-800">Use a strong, unique password</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span className="text-sm text-blue-800">Never share your password with anyone</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span className="text-sm text-blue-800">Update your password regularly</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span className="text-sm text-blue-800">Use different passwords for different accounts</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}