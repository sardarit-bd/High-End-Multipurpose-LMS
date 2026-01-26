"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/apiClient";
import { Edit2, Trash2, ImageIcon, Camera, Loader2, CheckCircle, AlertCircle, ChevronLeft, ChevronRight, X, Save, Plus } from "lucide-react";

// Custom hooks
const useCategories = (query = {}) => {
  return useQuery({
    queryKey: ['categories', query],
    queryFn: async () => {
      const res = await api.get('/courses/categories', { params: query });
      return res.data;
    },
    refetchOnWindowFocus: false,
  });
};

const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      const res = await api.post('/courses/categories', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['categories']);
    }
  });
};

const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await api.patch(`/courses/categories/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['categories']);
    }
  });
};

const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const res = await api.delete(`/courses/categories/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['categories']);
    }
  });
};

export default function CategoriesGrid({ search, page, limit, onPageChange }) {
  const [editingId, setEditingId] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  
  // Form states
  const [formData, setFormData] = useState({
    title: "",
    image: ""
  });

  const { data: categoriesData, isLoading, error } = useCategories({
    q: search,
    page,
    limit
  });

  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  const categories = categoriesData?.data?.categories || [];
  const total = categoriesData?.data?.total || 0;
  const totalPages = categoriesData?.data?.totalPages || 1;

  const goToPage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  // Reset form when switching modes
  useEffect(() => {
    if (!isCreating && !editingId) {
      setFormData({ title: "", image: "" });
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

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("Image size should be less than 5MB");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "category-images");

    try {
      const res = await api.post("/upload", formData, {
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

  const handleEditClick = (category) => {
    setEditingId(category._id);
    setIsCreating(false);
    setFormData({
      title: category.title,
      image: category.image || ""
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsCreating(false);
    setFormData({ title: "", image: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      setErrorMessage("Category title is required");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    try {
      if (editingId) {
        // Update existing category
        await updateCategory.mutateAsync({
          id: editingId,
          data: formData
        });
        setSuccessMessage("Category updated successfully!");
        setEditingId(null);
      } else {
        // Create new category
        await createCategory.mutateAsync(formData);
        setSuccessMessage("Category created successfully!");
        setIsCreating(false);
      }
      
      setFormData({ title: "", image: "" });
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || `Failed to ${editingId ? 'update' : 'create'} category`);
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  const handleDeleteClick = (category) => {
    setCategoryToDelete(category);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteCategory.mutateAsync(categoryToDelete._id);
      setSuccessMessage("Category deleted successfully!");
      setShowDeleteModal(false);
      setCategoryToDelete(null);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Failed to delete category");
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

if (isLoading) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Categories List Loading - Left Side (2/3) */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-[--radius-card] shadow-md overflow-hidden">
            {/* Table Header Loading */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 animate-pulse">
              <div className="col-span-1 h-4 bg-gray-200 rounded"></div>
              <div className="col-span-5 h-4 bg-gray-200 rounded"></div>
              <div className="col-span-4 h-4 bg-gray-200 rounded"></div>
              <div className="col-span-2 h-4 bg-gray-200 rounded"></div>
            </div>

            {/* Categories List Items Loading */}
            <div className="divide-y divide-gray-100">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="grid grid-cols-12 gap-4 px-6 py-4 items-center animate-pulse">
                  {/* Image Column Loading */}
                  <div className="col-span-2 md:col-span-1">
                    <div className="w-16 h-16 md:w-12 md:h-12 bg-gray-200 rounded-lg"></div>
                  </div>

                  {/* Title Column Loading */}
                  <div className="col-span-7 md:col-span-5">
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>

                  {/* Date Column Loading */}
                  <div className="col-span-3 md:col-span-4">
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>

                  {/* Actions Column Loading */}
                  <div className="col-span-12 md:col-span-2 mt-4 md:mt-0">
                    <div className="flex justify-end md:justify-center gap-2">
                      <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                      <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
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
                  <div className="w-full h-48 bg-gray-200 rounded-lg"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                </div>

                {/* Title Input Loading */}
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
        Error loading categories
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
        {/* Categories List - Left Side */}
        <div className="lg:col-span-2">
  {/* Categories List */}
  <div className="bg-white rounded-[--radius-card] shadow-md overflow-hidden">
    {/* Table Header */}
    <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
      <div className="col-span-1 font-semibold text-gray-700 text-sm"></div>
      <div className="col-span-5 font-semibold text-gray-700 text-sm">Category</div>
      <div className="col-span-4 font-semibold text-gray-700 text-sm">Created</div>
      <div className="col-span-2 font-semibold text-gray-700 text-sm text-center">Actions</div>
    </div>

    {/* Categories List Items */}
    <div className="divide-y divide-gray-100">
      {categories.map((category, index) => (
        <motion.div
          key={category._id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          className="hover:bg-gray-50/50 transition-colors"
        >
          <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center">
            {/* Image Column */}
            <div className="col-span-2 md:col-span-1">
              <div className="w-16 h-16 md:w-12 md:h-12 rounded-lg overflow-hidden bg-gray-100">
                {category.image ? (
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                    <ImageIcon className="w-6 h-6 text-gray-400" />
                  </div>
                )}
              </div>
            </div>

            {/* Title Column */}
            <div className="col-span-7 md:col-span-5">
              <div>
                <h3 className="font-semibold text-gray-900 truncate">{category.title}</h3>
                <p className="text-xs text-gray-500 mt-1 truncate">
                  ID: {category._id.slice(-8)}
                </p>
              </div>
            </div>

            {/* Date Column */}
            <div className="col-span-3 md:col-span-4">
              <div className="flex flex-col">
                <span className="text-sm text-gray-600">
                  {new Date(category.createdAt).toLocaleDateString()}
                </span>
                <span className="text-xs text-gray-400">
                  {new Date(category.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>

            {/* Actions Column */}
            <div className="col-span-12 md:col-span-2 mt-4 md:mt-0">
              <div className="flex justify-end md:justify-center gap-2">
                <button
                  onClick={() => handleEditClick(category)}
                  className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors flex items-center gap-1"
                  title="Edit"
                >
                  <Edit2 className="w-4 h-4" />
                  <span className="text-sm md:hidden">Edit</span>
                </button>
                <button
                  onClick={() => handleDeleteClick(category)}
                  className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors flex items-center gap-1"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="text-sm md:hidden">Delete</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>

    {/* No Categories Message */}
    {categories.length === 0 && (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg">No categories found</div>
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
            Showing {categories.length} of {total} categories
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
                  {editingId ? "Edit Category" : isCreating ? "Create New Category" : "Add Category"}
                </h2>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {editingId ? "Update category details" : "Add a new course category"}
              </p>
            </div>
            
            {/* Form */}
            {(isCreating || editingId) ? (
              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Image Upload */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Category Image
                    </label>
                    <div className="flex flex-col items-center">
                      <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-dashed border-gray-300">
                        {formData.image ? (
                          <img 
                            src={formData.image} 
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50">
                            <ImageIcon className="w-12 h-12 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-500">No image selected</p>
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
                      <p className="text-xs text-gray-400 text-center">JPG, PNG up to 5MB</p>
                    </div>
                  </div>

                  {/* Title Input */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Category Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#189E75] focus:border-transparent transition"
                      placeholder="Enter category title"
                    />
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
                      disabled={createCategory.isLoading || updateCategory.isLoading}
                      className="flex-1 px-4 py-3 bg-[#189E75] hover:bg-[#147c5e] text-white rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {createCategory.isLoading || updateCategory.isLoading ? (
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
                  <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="font-medium text-gray-900 mb-2">No category selected</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Click "New" to create a category or select an existing one to edit
                  </p>
                  <button
                    onClick={() => setIsCreating(true)}
                    className="px-4 py-2 bg-[#189E75] hover:bg-[#147c5e] text-white rounded-lg font-medium transition-colors flex items-center gap-2 mx-auto"
                  >
                    <Plus className="w-4 h-4" />
                    Create New Category
                  </button>
                </div>
              </div>
            )}
          </div>
          
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && categoryToDelete && (
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
                <h2 className="text-xl font-bold text-gray-900 mb-2">Delete Category</h2>
                <p className="text-gray-600">
                  Are you sure you want to delete <span className="font-semibold text-gray-900">{categoryToDelete.title}</span>? This action cannot be undone.
                </p>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setCategoryToDelete(null);
                  }}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  disabled={deleteCategory.isLoading}
                  className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {deleteCategory.isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    'Delete Category'
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