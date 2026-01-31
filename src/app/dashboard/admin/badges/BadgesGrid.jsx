// app/dashboard/admin/badges/BadgesGrid.jsx
"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/apiClient";
import { 
  Edit2, 
  Trash2, 
  ImageIcon, 
  Camera, 
  Loader2, 
  CheckCircle, 
  AlertCircle, 
  ChevronLeft, 
  ChevronRight, 
  Save, 
  Plus, 
  Award,
  Target,
  Crown,
  Flame,
  Zap,
  Star,
  Eye,
  EyeOff
} from "lucide-react";

// Custom hooks
const useBadges = (query = {}) => {
  return useQuery({
    queryKey: ['badges', query],
    queryFn: async () => {
      const res = await api.get('/badges', { params: query });
      return res.data;
    },
    refetchOnWindowFocus: false,
  });
};

const useCreateBadge = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      const res = await api.post('/badges/create', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['badges']);
    }
  });
};

const useUpdateBadge = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await api.patch(`/badges/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['badges']);
    }
  });
};

const useDeleteBadge = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const res = await api.delete(`/badges/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['badges']);
    }
  });
};

// Helper functions
const getBadgeIcon = (points) => {
  if (points >= 2000) return <Crown className="w-4 h-4" />;
  if (points >= 1000) return <Flame className="w-4 h-4" />;
  if (points >= 500) return <Zap className="w-4 h-4" />;
  if (points >= 100) return <Star className="w-4 h-4" />;
  return <Award className="w-4 h-4" />;
};

const getBadgeLevel = (points) => {
  if (points >= 2000) return "Legendary";
  if (points >= 1000) return "Master";
  if (points >= 500) return "Advanced";
  if (points >= 100) return "Intermediate";
  return "Beginner";
};

export default function BadgesGrid({ search, page, limit, onPageChange }) {
  const [editingId, setEditingId] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [badgeToDelete, setBadgeToDelete] = useState(null);
  
  // Form states
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    pointsRequired: 100,
    isActive: true
  });

  const { data: badgesData, isLoading, error } = useBadges({
    q: search,
    page,
    limit
  });


  const createBadge = useCreateBadge();
  const updateBadge = useUpdateBadge();
  const deleteBadge = useDeleteBadge();

  console.log(badgesData?.data)
  const badges = badgesData?.data?.data || [];
  const total = badgesData?.data?.total || 0;
  const totalPages = badgesData?.data?.totalPages || 1;

  const goToPage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  // Reset form when switching modes
  useEffect(() => {
    if (!isCreating && !editingId) {
      setFormData({ 
        title: "", 
        description: "", 
        image: "", 
        pointsRequired: 100, 
        isActive: true 
      });
    }
  }, [isCreating, editingId]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage("Please upload an image file");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setErrorMessage("Image size should be less than 2MB");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    setIsUploading(true);
    const uploadFormData = new FormData();
    uploadFormData.append("file", file);
    uploadFormData.append("folder", "badge-images");

    try {
      const res = await api.post("/upload", uploadFormData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      
      const imageUrl = res.data?.data?.url;
      if (imageUrl) {
        setFormData(prev => ({ ...prev, image: imageUrl }));
        setSuccessMessage("Image uploaded successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        throw new Error("No image URL returned");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Failed to upload image");
      setTimeout(() => setErrorMessage(""), 3000);
    } finally {
      setIsUploading(false);
    }
  };

  const handleEditClick = (badge) => {
    setEditingId(badge._id);
    setIsCreating(false);
    setFormData({
      title: badge.title,
      description: badge.description || "",
      image: badge.image || "",
      pointsRequired: badge.pointsRequired || 100,
      isActive: badge.isActive !== false
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsCreating(false);
    setFormData({ 
      title: "", 
      description: "", 
      image: "", 
      pointsRequired: 100, 
      isActive: true 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      setErrorMessage("Badge title is required");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    try {
      const payload = {
        ...formData,
        pointsRequired: parseInt(formData.pointsRequired, 10) || 100
      };

      if (editingId) {
        // Update existing badge
        await updateBadge.mutateAsync({
          id: editingId,
          data: payload
        });
        setSuccessMessage("Badge updated successfully!");
        setEditingId(null);
      } else {
        // Create new badge
        await createBadge.mutateAsync(payload);
        setSuccessMessage("Badge created successfully!");
        setIsCreating(false);
      }
      
      setFormData({ 
        title: "", 
        description: "", 
        image: "", 
        pointsRequired: 100, 
        isActive: true 
      });
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || `Failed to ${editingId ? 'update' : 'create'} badge`);
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  const handleDeleteClick = (badge) => {
    setBadgeToDelete(badge);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteBadge.mutateAsync(badgeToDelete._id);
      setSuccessMessage("Badge deleted successfully!");
      setShowDeleteModal(false);
      setBadgeToDelete(null);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Failed to delete badge");
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  const toggleBadgeStatus = async (badge) => {
    try {
      await updateBadge.mutateAsync({
        id: badge._id,
        data: { ...badge, isActive: !badge.isActive }
      });
      setSuccessMessage(`Badge ${!badge.isActive ? 'activated' : 'deactivated'}!`);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setErrorMessage("Failed to update badge status");
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Badges List Loading - Left Side (2/3) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[--radius-card] shadow-md overflow-hidden">
              {/* Table Header Loading */}
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 animate-pulse">
                <div className="col-span-1 h-4 bg-gray-200 rounded"></div>
                <div className="col-span-4 h-4 bg-gray-200 rounded"></div>
                <div className="col-span-3 h-4 bg-gray-200 rounded"></div>
                <div className="col-span-2 h-4 bg-gray-200 rounded"></div>
                <div className="col-span-2 h-4 bg-gray-200 rounded"></div>
              </div>

              {/* Badges List Items Loading */}
              <div className="divide-y divide-gray-100">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="grid grid-cols-12 gap-4 px-6 py-4 items-center animate-pulse">
                    {/* Image Column Loading */}
                    <div className="col-span-2 md:col-span-1">
                      <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                    </div>

                    {/* Title Column Loading */}
                    <div className="col-span-4 md:col-span-4">
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>

                    {/* Points Column Loading */}
                    <div className="col-span-3 md:col-span-3">
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </div>

                    {/* Status Column Loading */}
                    <div className="col-span-2 md:col-span-2">
                      <div className="h-6 bg-gray-200 rounded w-16"></div>
                    </div>

                    {/* Actions Column Loading */}
                    <div className="col-span-1 md:col-span-2">
                      <div className="flex justify-end gap-2">
                        <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                        <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form Sidebar Loading - Right Side (1/3) */}
          <div className="space-y-6">
            <div className="bg-white rounded-[--radius-card] shadow-md overflow-hidden animate-pulse">
              <div className="border-b border-gray-100 p-6">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
              
              <div className="p-6">
                <div className="space-y-6">
                  {/* Image Upload Loading */}
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="w-full h-32 bg-gray-200 rounded-lg"></div>
                  </div>

                  {/* Title Input Loading */}
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-12 bg-gray-200 rounded-xl"></div>
                  </div>

                  {/* Description Input Loading */}
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-20 bg-gray-200 rounded-xl"></div>
                  </div>

                  {/* Points Input Loading */}
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-12 bg-gray-200 rounded-xl"></div>
                  </div>
                  
                  {/* Buttons Loading */}
                  <div className="flex gap-3 pt-4">
                    <div className="flex-1 h-12 bg-gray-200 rounded-xl"></div>
                    <div className="flex-1 h-12 bg-gray-200 rounded-xl"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-[--radius-card]">
        Error loading badges
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Messages */}
      {successMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-emerald-100 text-emerald-700 rounded-[--radius-card] flex items-center gap-2"
        >
          <CheckCircle className="w-5 h-5" />
          {successMessage}
        </motion.div>
      )}

      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-100 text-red-700 rounded-[--radius-card] flex items-center gap-2"
        >
          <AlertCircle className="w-5 h-5" />
          {errorMessage}
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Badges List - Left Side */}
        <div className="lg:col-span-2">
          {/* Badges List */}
          <div className="bg-white rounded-[--radius-card] shadow-md overflow-hidden">
            {/* Table Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <div className="col-span-1 font-semibold text-gray-700 text-sm"></div>
              <div className="col-span-4 font-semibold text-gray-700 text-sm">Badge</div>
              <div className="col-span-3 font-semibold text-gray-700 text-sm">Points</div>
              <div className="col-span-2 font-semibold text-gray-700 text-sm">Status</div>
              <div className="col-span-2 font-semibold text-gray-700 text-sm text-center">Actions</div>
            </div>

            {/* Badges List Items */}
            <div className="divide-y divide-gray-100">
              {badges?.map((badge, index) => (
                <motion.div
                  key={badge._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center">
                    {/* Image Column */}
                    <div className="col-span-2 md:col-span-1">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                        {badge.image ? (
                          <img 
                            src={badge.image} 
                            alt={badge.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className={`w-full h-full flex items-center justify-center ${
                            badge.pointsRequired >= 2000 ? 'bg-gradient-to-r from-rose-100 to-amber-100' :
                            badge.pointsRequired >= 1000 ? 'bg-gradient-to-r from-orange-100 to-yellow-100' :
                            badge.pointsRequired >= 500 ? 'bg-gradient-to-r from-blue-100 to-cyan-100' :
                            'bg-gradient-to-r from-emerald-100 to-green-100'
                          }`}>
                            {getBadgeIcon(badge.pointsRequired)}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Title Column */}
                    <div className="col-span-4 md:col-span-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 truncate">{badge.title}</h3>
                        <p className="text-xs text-gray-500 mt-1 truncate">
                          Level: {getBadgeLevel(badge.pointsRequired)}
                        </p>
                      </div>
                    </div>

                    {/* Points Column */}
                    <div className="col-span-3 md:col-span-3">
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-amber-500" />
                        <span className="font-medium text-gray-700">{badge.pointsRequired}</span>
                      </div>
                    </div>

                    {/* Status Column */}
                    <div className="col-span-2 md:col-span-2">
                      <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                        badge.isActive 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {badge.isActive ? (
                          <>
                            <Eye className="w-3 h-3" />
                            Active
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3" />
                            Inactive
                          </>
                        )}
                      </div>
                    </div>

                    {/* Actions Column */}
                    <div className="col-span-3 md:col-span-2">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => toggleBadgeStatus(badge)}
                          className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
                          title={badge.isActive ? "Deactivate" : "Activate"}
                        >
                          {badge.isActive ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={() => handleEditClick(badge)}
                          className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(badge)}
                          className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* No Badges Message */}
            {badges.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg">No badges found</div>
                {search && (
                  <p className="text-gray-500 mt-2">Try a different search term</p>
                )}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="border-t border-gray-100 p-4">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="text-sm text-gray-500">
                    Showing {badges.length} of {total} badges
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => goToPage(page - 1)}
                      disabled={page === 1}
                      className={`p-2 rounded-lg ${page === 1 ? 'text-gray-400 bg-gray-100' : 'text-[#189E75] hover:bg-[#189E75]/10'}`}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    
                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (page <= 3) {
                          pageNum = i + 1;
                        } else if (page >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = page - 2 + i;
                        }
                        
                        return (
                          <button
                            key={pageNum}
                            onClick={() => goToPage(pageNum)}
                            className={`w-9 h-9 rounded-lg text-sm ${page === pageNum 
                              ? 'bg-[#189E75] text-white shadow' 
                              : 'text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => goToPage(page + 1)}
                      disabled={page === totalPages}
                      className={`p-2 rounded-lg ${page === totalPages ? 'text-gray-400 bg-gray-100' : 'text-[#189E75] hover:bg-[#189E75]/10'}`}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Form Sidebar - Right Side */}
        <div className="space-y-6">
          <div className="bg-white rounded-[--radius-card] shadow-md overflow-hidden">
            <div className="border-b border-gray-100 p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">
                  {editingId ? "Edit Badge" : isCreating ? "Create New Badge" : "Add Badge"}
                </h2>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {editingId ? "Update badge details" : "Add a new achievement badge"}
              </p>
            </div>
            
            {/* Form */}
            {(isCreating || editingId) ? (
              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Image Upload */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Badge Image
                    </label>
                    <div className="flex flex-col items-center">
                      <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-dashed border-gray-300">
                        {formData.image ? (
                          <img 
                            src={formData.image} 
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50">
                            <Award className="w-12 h-12 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-500">No image</p>
                          </div>
                        )}
                        
                        <label className="absolute inset-0 cursor-pointer flex items-center justify-center bg-black/0 hover:bg-black/20 transition">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            disabled={isUploading}
                          />
                          <div className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg">
                            {isUploading ? (
                              <Loader2 className="w-5 h-5 animate-spin text-gray-600" />
                            ) : (
                              <Camera className="w-5 h-5 text-gray-700" />
                            )}
                          </div>
                        </label>
                      </div>
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        {isUploading ? "Uploading..." : "Click to upload image"}
                      </p>
                      <p className="text-xs text-gray-400 text-center">JPG, PNG up to 2MB</p>
                    </div>
                  </div>

                  {/* Title Input */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Badge Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#189E75] focus:border-transparent transition"
                      placeholder="Enter badge title"
                    />
                  </div>

                  {/* Description Input */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#189E75] focus:border-transparent transition h-24 resize-none"
                      placeholder="Describe what this badge represents"
                    />
                  </div>

                  {/* Points Required */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Points Required *
                    </label>
                    <div className="relative">
                      <Target className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-500" />
                      <input
                        type="number"
                        required
                        min="0"
                        value={formData.pointsRequired}
                        onChange={(e) => setFormData({...formData, pointsRequired: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#189E75] focus:border-transparent transition"
                        placeholder="Enter points required"
                      />
                    </div>
                  </div>

                  {/* Status */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          checked={formData.isActive === true}
                          onChange={() => setFormData({...formData, isActive: true})}
                          className="text-[#189E75] focus:ring-[#189E75]"
                        />
                        <span className="text-gray-700">Active</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          checked={formData.isActive === false}
                          onChange={() => setFormData({...formData, isActive: false})}
                          className="text-[#189E75] focus:ring-[#189E75]"
                        />
                        <span className="text-gray-700">Inactive</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={createBadge.isLoading || updateBadge.isLoading}
                      className="flex-1 px-4 py-3 bg-[#189E75] hover:bg-[#147c5e] text-white rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {createBadge.isLoading || updateBadge.isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          {editingId ? 'Updating...' : 'Creating...'}
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          {editingId ? 'Update' : 'Create'}
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="p-6 text-center">
                <div className="p-6 border-2 border-dashed border-gray-300 rounded-xl">
                  <Award className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="font-medium text-gray-900 mb-2">No badge selected</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Click "New" to create a badge or select an existing one to edit
                  </p>
                  <button
                    onClick={() => setIsCreating(true)}
                    className="px-4 py-2 bg-[#189E75] hover:bg-[#147c5e] text-white rounded-lg font-medium transition-colors flex items-center gap-2 mx-auto"
                  >
                    <Plus className="w-4 h-4" />
                    Create New Badge
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && badgeToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
          >
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Delete Badge</h2>
                <p className="text-gray-600">
                  Are you sure you want to delete <span className="font-semibold text-gray-900">{badgeToDelete.title}</span>? This action cannot be undone.
                </p>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setBadgeToDelete(null);
                  }}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  disabled={deleteBadge.isLoading}
                  className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {deleteBadge.isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    'Delete Badge'
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}