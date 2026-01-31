"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/lib/apiClient";
import { toast } from "react-toastify";
import {
  User,
  Edit2,
  Save,
  X,
  Mail,
  Phone,
  Globe,
  Linkedin,
  Twitter,
  Github,
  Briefcase,
  Award,
  Calendar,
  BookOpen,
  Users,
  Star,
  FileText,
  Upload,
  Loader2,
  Shield,
  CheckCircle,
  Eye,
  EyeOff,
  Link
} from "lucide-react";
import { useProfileInstructor, useUpdateProfile } from "@/hooks/useUser";
import { useAuth } from "@/hooks/useAuth";
import ChangePassword from "../../admin/settings/ChangePassword";

export default function InstructorProfilePage() {
  const { user } = useAuth();
  const { data: instructorData, isLoading, error } = useProfileInstructor(user?._id);
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile(user?._id);

  const [instructor, setInstructor] = useState({
    name: "",
    email: "",
    designation: "",
    intro: "",
    profileImage: "",
    phone: "",
    website: "",
    linkedin: "",
    twitter: "",
    github: "",
    specialties: [],
    certifications: [],
    joinDate: "",
    isVerified: false,
    isActive: true
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showSocialFields, setShowSocialFields] = useState(false);
  const [newSpecialty, setNewSpecialty] = useState("");
  const [newCertification, setNewCertification] = useState("");
  const fileInputRef = useRef(null);

  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm({
    defaultValues: instructor
  });

  // Map backend data to frontend state
  useEffect(() => {
    if (instructorData) {
      const userData = instructorData.userId || {};
      const instructorInfo = instructorData || {};
      
      // Format join date
      const joinDate = userData.createdAt 
        ? new Date(userData.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        : (instructorData.createdAt 
          ? new Date(instructorData.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
          : "");

      const mappedData = {
        name: userData.name || "",
        email: userData.email || "",
        designation: instructorInfo.designation || "",
        intro: userData.intro || "",
        profileImage: userData.picture || "/api/placeholder/400/400",
        phone: userData.phone || "",
        website: userData.socialLinks?.website || "",
        linkedin: userData.socialLinks?.linkedin || "",
        twitter: userData.socialLinks?.twitter || "",
        github: userData.socialLinks?.github || "",
        specialties: instructorInfo.expertise || [],
        certifications: instructorInfo.certifications || instructorInfo.certifications || [], // Backend model uses 'certifications'
        joinDate: joinDate,
        isVerified: userData.isVerified || false,
        isActive: userData.isActive === "ACTIVE"
      };

      setInstructor(mappedData);
      
      // Update form values
      Object.keys(mappedData).forEach(key => {
        setValue(key, mappedData[key]);
      });
    }
  }, [instructorData, setValue]);

  // Handle profile image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file
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
        setInstructor(prev => ({ ...prev, profileImage: imageUrl }));
        setValue("profileImage", imageUrl);
        setValue("picture", imageUrl);
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
      // Prepare payload matching backend structure\
      const payload = {
        // User fields
        name: formData.name,
        phone: formData.phone || "",
        intro: formData.intro || "",
        picture: formData.profileImage || formData.picture || "",
        socialLinks: {
          linkedin: formData.linkedin || "",
          twitter: formData.twitter || "",
          github: formData.github || "",
          website: formData.website || ""
        },
        // Instructor fields
        designation: formData.designation || "",
        expertise: formData.specialties || [],
        certifications: formData.certifications || [] // Backend model uses 'certifications'
      };

      updateProfile(payload, {
        onSuccess: () => {
          // Update local state with form data
          setInstructor(prev => ({
            ...prev,
            name: formData.name,
            phone: formData.phone || "",
            intro: formData.intro || "",
            designation: formData.designation || "",
            profileImage: formData.profileImage || formData.picture || prev.profileImage,
            linkedin: formData.linkedin || "",
            twitter: formData.twitter || "",
            github: formData.github || "",
            website: formData.website || "",
            specialties: formData.specialties || [],
            certifications: formData.certifications || []
          }));
          setIsEditing(false);
        }
      });
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  // Add new specialty
  const addSpecialty = () => {
    if (newSpecialty.trim() && !instructor.specialties.includes(newSpecialty.trim())) {
      const updatedSpecialties = [...instructor.specialties, newSpecialty.trim()];
      setInstructor(prev => ({ ...prev, specialties: updatedSpecialties }));
      setValue("specialties", updatedSpecialties);
      setNewSpecialty("");
      toast.success("Specialty added!");
    }
  };

  // Remove specialty
  const removeSpecialty = (specialtyToRemove) => {
    const updatedSpecialties = instructor.specialties.filter(s => s !== specialtyToRemove);
    setInstructor(prev => ({ ...prev, specialties: updatedSpecialties }));
    setValue("specialties", updatedSpecialties);
  };

  // Add new certification
  const addCertification = () => {
    if (newCertification.trim() && !instructor.certifications.includes(newCertification.trim())) {
      const updatedCertifications = [...instructor.certifications, newCertification.trim()];
      setInstructor(prev => ({ ...prev, certifications: updatedCertifications }));
      setValue("certifications", updatedCertifications);
      setNewCertification("");
      toast.success("Certification added!");
    }
  };

  // Remove certification
  const removeCertification = (certToRemove) => {
    const updatedCertifications = instructor.certifications.filter(c => c !== certToRemove);
    setInstructor(prev => ({ ...prev, certifications: updatedCertifications }));
    setValue("certifications", updatedCertifications);
  };

  // Show loading state
  if (!user?._id || isLoading) {
    return (
      <div className="min-h-screen p-4 md:p-6 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-emerald-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen p-4 md:p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load profile</p>
          <p className="text-gray-600 text-sm">{error?.message || "Please try again later"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Instructor Profile
              </h1>
              <p className="text-gray-600 mt-2">
                Manage your professional profile and credentials
              </p>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${isEditing 
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-lg' 
                : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:shadow-lg hover:scale-105'
              }`}
            >
              {isEditing ? (
                <>
                  <X className="w-5 h-5" />
                  Cancel Editing
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
                              src={watch("profileImage") || "/api/placeholder/400/400"}
                              alt={watch("name") || "Profile"}
                              width={128}
                              height={128}
                              className="w-full h-full object-cover"
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
                            src={instructor.profileImage || "/api/placeholder/400/400"}
                            alt={instructor.name || "Profile"}
                            width={128}
                            height={128}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      {instructor.isVerified && (
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
                          {...register("name", { required: true })}
                          className="w-full text-center bg-transparent border-b border-gray-300 focus:border-emerald-500 focus:outline-none text-2xl font-bold"
                        />
                      ) : (
                        instructor.name
                      )}
                    </h2>
                    <div className="mt-2">
                      {isEditing ? (
                        <input
                          {...register("designation", { required: true })}
                          className="w-full text-center bg-transparent border-b border-gray-300 focus:border-emerald-500 focus:outline-none text-gray-600"
                        />
                      ) : (
                        <p className="text-gray-600">{instructor.designation}</p>
                      )}
                    </div>
                    
                    {instructor.joinDate && (
                      <div className="flex items-center justify-center gap-2 mt-3">
                        <div className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                          <Calendar className="w-3 h-3 inline mr-1" />
                          Joined {instructor.joinDate}
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
                          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                          type="email"
                          className="flex-1 bg-transparent border-b border-gray-300 focus:border-emerald-500 focus:outline-none"
                        />
                      ) : (
                        <span>{instructor.email}</span>
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
                        <span>{instructor.phone || "Not provided"}</span>
                      )}
                    </div>
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
                      {instructor.linkedin ? (
                        <a
                          href={instructor.linkedin}
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
                      {instructor.twitter ? (
                        <a
                          href={instructor.twitter}
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
                      {instructor.github ? (
                        <a
                          href={instructor.github}
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
                      {instructor.website ? (
                        <a
                          href={instructor.website}
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
                      {isEditing && (!instructor.linkedin && !instructor.twitter && !instructor.github && !instructor.website) && (
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
                  {!instructor.isVerified && (
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl mb-6">
                      <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-amber-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-amber-800">Profile Not Verified</h4>
                          <p className="text-sm text-amber-700 mt-1">
                            Verify your identity to build trust with students
                          </p>
                          <button className="mt-2 text-sm font-medium text-amber-700 hover:text-amber-800">
                            Start Verification →
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <ChangePassword />
              </div>
            </motion.div>
          </div>

          {/* Right Column - Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">

              {/* Tab Content */}
              <div className="p-6 md:p-8">
                <AnimatePresence mode="wait">
                   <motion.div
                      key="overview"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      {/* Bio Section */}
                      <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-emerald-600" />
                            Biography
                          </h3>
                          {isEditing && (
                            <span className="text-sm text-gray-500">
                              {watch("bio")?.length || 0}/500 characters
                            </span>
                          )}
                        </div>
                        {isEditing ? (
                          <textarea
                            {...register("intro", { maxLength: 500 })}
                            rows={4}
                            className="w-full p-4 border border-gray-300 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none resize-none"
                            placeholder="Tell your story... (Max 500 characters)"
                          />
                        ) : (
                          <p className="text-gray-700 leading-relaxed">
                            {instructor.intro || "No biography added yet."}
                          </p>
                        )}
                      </div>

                      {/* Specialties Section */}
                      <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <Briefcase className="w-5 h-5 text-blue-600" />
                            Areas of Expertise
                          </h3>
                          {isEditing && (
                            <button
                              type="button"
                              onClick={() => document.getElementById("specialtiesModal").showModal()}
                              className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                            >
                              Manage
                            </button>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {instructor.specialties.map((specialty, index) => (
                            <span
                              key={index}
                              className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium flex items-center gap-2"
                            >
                              {specialty}
                              {isEditing && (
                                <button
                                  type="button"
                                  onClick={() => removeSpecialty(specialty)}
                                  className="hover:text-blue-900"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              )}
                            </span>
                          ))}
                        </div>

                        {/* Add Specialty Input (when editing) */}
                        {isEditing && (
                          <div className="mt-4 flex gap-2">
                            <input
                              type="text"
                              value={newSpecialty}
                              onChange={(e) => setNewSpecialty(e.target.value)}
                              onKeyPress={(e) => e.key === 'Enter' && addSpecialty()}
                              placeholder="Add new specialty..."
                              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none"
                            />
                            <button
                              type="button"
                              onClick={addSpecialty}
                              className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors font-medium"
                            >
                              Add
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Certifications Section */}
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <Award className="w-5 h-5 text-purple-600" />
                            Certifications & Credentials
                          </h3>
                          {isEditing && (
                            <button
                              type="button"
                              onClick={() => document.getElementById("certificationsModal").showModal()}
                              className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                            >
                              Manage
                            </button>
                          )}
                        </div>
                        <div className="space-y-3">
                          {instructor.certifications.map((cert, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-4 bg-purple-50 rounded-xl border border-purple-100"
                            >
                              <div className="flex items-center gap-3">
                                <Award className="w-5 h-5 text-purple-600" />
                                <span className="text-gray-900 font-medium">{cert}</span>
                              </div>
                              {isEditing && (
                                <button
                                  type="button"
                                  onClick={() => removeCertification(cert)}
                                  className="text-gray-400 hover:text-red-500"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Add Certification Input (when editing) */}
                        {isEditing && (
                          <div className="mt-4 flex gap-2">
                            <input
                              type="text"
                              value={newCertification}
                              onChange={(e) => setNewCertification(e.target.value)}
                              onKeyPress={(e) => e.key === 'Enter' && addCertification()}
                              placeholder="Add new certification..."
                              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none"
                            />
                            <button
                              type="button"
                              onClick={addCertification}
                              className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors font-medium"
                            >
                              Add
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                </AnimatePresence>

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
                        disabled={isSubmitting || isUpdating}
                        className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {(isSubmitting || isUpdating) ? (
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

      {/* Modals */}
      <dialog id="specialtiesModal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box max-w-md">
          <h3 className="font-bold text-lg mb-4">Manage Specialties</h3>
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter specialty..."
                className="input input-bordered flex-1"
              />
              <button className="btn btn-primary">Add</button>
            </div>
            <div className="space-y-2">
              {instructor.specialties.map((spec, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <span>{spec}</span>
                  <button className="btn btn-sm btn-ghost">Remove</button>
                </div>
              ))}
            </div>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
