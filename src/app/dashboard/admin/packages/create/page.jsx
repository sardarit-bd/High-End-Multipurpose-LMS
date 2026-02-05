"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/apiClient";
import { 
  Package,
  Plus,
  X,
  DollarSign,
  Calendar,
  Check,
  BookOpen,
  Tag,
  ArrowLeft,
  Save,
  RefreshCw,
  Percent,
  Search,
  Filter,
  CheckSquare,
  Square,
  Grid,
  List
} from "lucide-react";
import { toast } from "react-toastify";

export default function CreatePackagePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("list"); // "list" or "grid"
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    comparePrice: "",
    currency: "USD",
    accessDays: "365",
    features: [""],
    isActive: true
  });

  // Fetch available courses
  useEffect(() => {
    fetchAvailableCourses();
  }, []);

  const fetchAvailableCourses = async () => {
    try {
      setCoursesLoading(true);
      const res = await api.get("/courses");
      setAvailableCourses(res.data.data || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
      toast.error("Failed to load courses");
    } finally {
      setCoursesLoading(false);
    }
  };

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(["all"]);
    availableCourses.forEach(course => {
      if (course.category?.name) {
        cats.add(course.category.name);
      }
    });
    return Array.from(cats);
  }, [availableCourses]);

  // Filter courses based on search and category
  const filteredCourses = useMemo(() => {
    return availableCourses.filter(course => {
      const matchesSearch = searchTerm === "" || 
        course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === "all" || 
        course.category?.name === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [availableCourses, searchTerm, selectedCategory]);

  // Calculate total course price
  const calculateTotalCoursePrice = () => {
    return selectedCourses.reduce((sum, course) => sum + (course.price || 0), 0);
  };

  // Handle course selection
  const handleCourseSelect = (course) => {
    if (selectedCourses.find(c => c._id === course._id)) {
      setSelectedCourses(prev => prev.filter(c => c._id !== course._id));
    } else {
      setSelectedCourses(prev => [...prev, course]);
    }
  };

  // Select all filtered courses
  const handleSelectAllFiltered = () => {
    const filteredCourseIds = filteredCourses.map(c => c._id);
    const alreadySelectedIds = selectedCourses.map(c => c._id);
    
    // If all filtered are already selected, deselect them
    if (filteredCourseIds.every(id => alreadySelectedIds.includes(id))) {
      setSelectedCourses(prev => prev.filter(c => !filteredCourseIds.includes(c._id)));
    } else {
      // Add filtered courses that aren't already selected
      const newCourses = filteredCourses.filter(c => !alreadySelectedIds.includes(c._id));
      setSelectedCourses(prev => [...prev, ...newCourses]);
    }
  };

  // Clear all selected courses
  const handleClearSelection = () => {
    setSelectedCourses([]);
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // Handle feature input
  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => {
    setFormData(prev => ({ ...prev, features: [...prev.features, ""] }));
  };

  const removeFeature = (index) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  // Calculate discount percentage
  const calculateDiscount = () => {
    const total = calculateTotalCoursePrice();
    const packagePrice = parseFloat(formData.price) || 0;
    if (total > 0 && packagePrice > 0) {
      return Math.round(((total - packagePrice) / total) * 100);
    }
    return 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      toast.error("Package name is required");
      return;
    }

    if (selectedCourses.length === 0) {
      toast.error("Please select at least one course");
      return;
    }

    if (!formData.price || parseFloat(formData.price) < 0) {
      toast.error("Please enter a valid price");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: formData.name,
        courseIds: selectedCourses.map(course => course._id),
        features: formData.features.filter(f => f.trim() !== ""),
        price: parseFloat(formData.price),
        comparePrice: formData.comparePrice ? parseFloat(formData.comparePrice) : calculateTotalCoursePrice(),
        currency: formData.currency,
        accessDays: parseInt(formData.accessDays),
        isActive: formData.isActive
      };

      const res = await api.post("/packages/create", payload);
      
      toast.success("Package created successfully!");
      router.push("/dashboard/admin/packages");
      
    } catch (error) {
      console.error("Error creating package:", error);
      toast.error(error.response?.data?.message || "Failed to create package");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <ArrowLeft className="h-5 w-5 text-[var(--color-text)]" />
            </button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-text)]">
                Create New Package
              </h1>
              <p className="text-[var(--color-text)]/70 text-sm md:text-base mt-1">
                Bundle courses together at a discounted price
              </p>
            </div>
          </div>

          {/* Stats Preview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Selected Courses</span>
                <div className="p-2 bg-[var(--color-secondary)]/10 rounded-lg">
                  <BookOpen className="h-5 w-5 text-[var(--color-secondary)]" />
                </div>
              </div>
              <div className="text-2xl font-bold text-[var(--color-text)]">
                {selectedCourses.length}
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Total Course Price</span>
                <div className="p-2 bg-[var(--color-accent)]/10 rounded-lg">
                  <DollarSign className="h-5 w-5 text-[var(--color-accent)]" />
                </div>
              </div>
              <div className="text-2xl font-bold text-[var(--color-text)]">
                ${calculateTotalCoursePrice().toFixed(2)}
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Package Price</span>
                <div className="p-2 bg-[var(--color-primary)]/10 rounded-lg">
                  <Tag className="h-5 w-5 text-[var(--color-primary)]" />
                </div>
              </div>
              <div className="text-2xl font-bold text-[var(--color-text)]">
                ${formData.price || "0.00"}
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">You Save</span>
                <div className="p-2 bg-[var(--color-accent-special)]/10 rounded-lg">
                  <Percent className="h-5 w-5 text-[var(--color-accent-special)]" />
                </div>
              </div>
              <div className="text-2xl font-bold text-[var(--color-text)]">
                {calculateDiscount()}%
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Course Selection */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Course Selection Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <h2 className="text-xl font-bold text-[var(--color-text)] flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Select Courses for Package
                  </h2>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">
                      {filteredCourses.length} courses available
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setViewMode("list")}
                        className={`p-2 rounded-lg ${viewMode === "list" ? "bg-gray-100 text-gray-700" : "text-gray-400 hover:text-gray-600"}`}
                      >
                        <List className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setViewMode("grid")}
                        className={`p-2 rounded-lg ${viewMode === "grid" ? "bg-gray-100 text-gray-700" : "text-gray-400 hover:text-gray-600"}`}
                      >
                        <Grid className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Search and Filter Bar */}
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Search courses by title or description..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition"
                    />
                  </div>

                </div>
              </div>

              {/* Courses List */}
              <div className="p-6 max-h-[500px] overflow-y-auto">
                {coursesLoading ? (
                  <div className="space-y-4 animate-pulse">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="h-20 bg-gray-200 rounded-xl"></div>
                    ))}
                  </div>
                ) : filteredCourses.length === 0 ? (
                  <div className="text-center py-8">
                    <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">
                      {searchTerm || selectedCategory !== "all" 
                        ? "No courses match your filters" 
                        : "No courses available"}
                    </p>
                    {(searchTerm || selectedCategory !== "all") && (
                      <button
                        onClick={() => {
                          setSearchTerm("");
                          setSelectedCategory("all");
                        }}
                        className="mt-2 text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
                      >
                        Clear filters
                      </button>
                    )}
                  </div>
                ) : viewMode === "list" ? (
                  // List View
                  <div className="space-y-2">
                    {filteredCourses.map((course) => {
                      const isSelected = selectedCourses.find(c => c._id === course._id);
                      return (
                        <div
                          key={course._id}
                          onClick={() => handleCourseSelect(course)}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-sm ${
                            isSelected
                              ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex-shrink-0">
                              {isSelected ? (
                                <CheckSquare className="h-5 w-5 text-[var(--color-primary)]" />
                              ) : (
                                <Square className="h-5 w-5 text-gray-400" />
                              )}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-3">
                                <div>
                                  <h3 className="font-medium text-[var(--color-text)] line-clamp-1">
                                    {course.title}
                                  </h3>
                                  <div className="flex items-center gap-3 mt-1">
                                    {course.category?.name && (
                                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                        {course.category.name}
                                      </span>
                                    )}
                                    <span className="text-sm text-gray-500">
                                      ${course.price || "0.00"}
                                    </span>
                                  </div>
                                </div>
                                <span className="text-lg font-bold text-[var(--color-text)] whitespace-nowrap">
                                  ${course.price || "0.00"}
                                </span>
                              </div>
                              
                              {course.description && (
                                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                                  {course.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  // Grid View
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredCourses.map((course) => {
                      const isSelected = selectedCourses.find(c => c._id === course._id);
                      return (
                        <div
                          key={course._id}
                          onClick={() => handleCourseSelect(course)}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-sm ${
                            isSelected
                              ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0">
                              {isSelected ? (
                                <CheckSquare className="h-5 w-5 text-[var(--color-primary)]" />
                              ) : (
                                <Square className="h-5 w-5 text-gray-400" />
                              )}
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <h3 className="font-medium text-[var(--color-text)] line-clamp-2">
                                  {course.title}
                                </h3>
                                <span className="text-lg font-bold text-[var(--color-text)] whitespace-nowrap">
                                  ${course.price || "0.00"}
                                </span>
                              </div>
                              
                              <div className="flex items-center gap-2 mb-2">
                                {course.category?.name && (
                                  <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">
                                    {course.category.name}
                                  </span>
                                )}
                              </div>
                              
                              {course.description && (
                                <p className="text-sm text-gray-600 line-clamp-2">
                                  {course.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Selected Courses Summary */}
            {selectedCourses.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-[var(--color-text)]">
                    Selected Courses ({selectedCourses.length})
                  </h3>
                  <button
                    onClick={handleClearSelection}
                    className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
                  >
                    <X className="h-4 w-4" />
                    Clear All
                  </button>
                </div>
                
                <div className="space-y-3 max-h-[300px] overflow-y-auto">
                  {selectedCourses.map((course) => (
                    <div key={course._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg group">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                          <CheckSquare className="h-4 w-4 text-[var(--color-primary)] flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="font-medium text-[var(--color-text)] truncate">
                              {course.title}
                            </p>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                              {course.category?.name && (
                                <span>{course.category.name}</span>
                              )}
                              <span>${course.price || "0.00"}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleCourseSelect(course)}
                        className="p-1 opacity-0 group-hover:opacity-100 hover:bg-red-50 text-red-500 rounded transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Total Selected Courses Price:</span>
                    <span className="font-bold text-lg text-[var(--color-text)]">
                      ${calculateTotalCoursePrice().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Package Details */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-6">
              <h2 className="text-xl font-bold text-[var(--color-text)] mb-6 flex items-center gap-2">
                <Package className="h-5 w-5" />
                Package Details
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Package Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Package Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Full Stack Developer Bundle"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition"
                    required
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Package Price *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition"
                      required
                    />
                  </div>
                </div>

                {/* Compare Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Compare At Price
                    <span className="text-gray-500 text-sm ml-2">
                      (Auto: ${calculateTotalCoursePrice().toFixed(2)})
                    </span>
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                    readOnly
                      type="number"
                      name="comparePrice"
                      value={formData.comparePrice}
                      onChange={handleInputChange}
                      placeholder={calculateTotalCoursePrice().toString()}
                      step="0.01"
                      min="0"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition"
                    />
                  </div>
                </div>

                {/* Currency & Access Days */}
                <div className="grid grid-cols-1 gap-4">
                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Currency
                    </label>
                    <select
                      name="currency"
                      value={formData.currency}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="MYR">MYR (RM)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                    </select>
                  </div> */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Access Days *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="number"
                        name="accessDays"
                        value={formData.accessDays}
                        onChange={handleInputChange}
                        min="1"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Package Features
                    </label>
                    <button
                      type="button"
                      onClick={addFeature}
                      className="text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] flex items-center gap-1"
                    >
                      <Plus className="h-4 w-4" />
                      Add Feature
                    </button>
                  </div>
                  <div className="space-y-2">
                    {formData.features.map((feature, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => handleFeatureChange(index, e.target.value)}
                          placeholder={`Feature ${index + 1}`}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition"
                        />
                        {formData.features.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeFeature(index)}
                            className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-700">Package Status</p>
                    <p className="text-sm text-gray-500">Make package visible to users</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleInputChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-primary)]"></div>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || selectedCourses.length === 0}
                  className="w-full flex items-center justify-center gap-2 bg-[var(--color-primary)] text-white py-3 px-6 rounded-xl font-semibold hover:bg-[var(--color-primary-hover)] transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="h-5 w-5 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Save className="h-5 w-5" />
                      Create Package
                    </>
                  )}
                </button>

                {/* Summary */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <h4 className="font-medium text-gray-700 mb-2">Package Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Courses:</span>
                      <span>{selectedCourses.length} selected</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Course Price:</span>
                      <span>${calculateTotalCoursePrice().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Package Price:</span>
                      <span className="font-bold">${formData.price || "0.00"}</span>
                    </div>
                    {calculateDiscount() > 0 && (
                      <div className="flex justify-between text-green-600 font-medium">
                        <span>You Save:</span>
                        <span>{calculateDiscount()}% (${(calculateTotalCoursePrice() - (parseFloat(formData.price) || 0)).toFixed(2)})</span>
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}