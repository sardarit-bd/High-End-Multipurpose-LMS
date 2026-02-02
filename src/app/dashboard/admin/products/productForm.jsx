"use client";

import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import api from "@/lib/apiClient";
import {
  Save,
  Upload,
  Image as ImageIcon,
  Trash2,
  Plus,
  Loader2,
  ArrowLeft,
  Tag,
  DollarSign,
  Package,
  Globe,
  Info,
  CheckCircle,
  FileArchive,
} from "lucide-react";
import { toast } from "react-toastify";

// Fetch categories
const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await api.get("/courses/categories");
      return res.data;
    },
  });
};

export default function ProductForm({ productId = null }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const isEdit = !!productId;

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    images: [],
    type: "physical",
    price: "",
    compareAtPrice: "",
    featuredImage: "",
    stock: "0",
    attributes: [],
    shippingRequired: true,
    digitalUrl: "",
    isActive: true,
  });

  const [isUploading, setIsUploading] = useState(false);
  const [isFeaturedUploading, setIsFeaturedUploading] = useState(false);
  const [isDigitalFileUploading, setIsDigitalFileUploading] = useState(false);
  const [attributeInput, setAttributeInput] = useState("");

  // Fetch product data for editing
  const { data: productData } = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      const res = await api.get(`/ecom/products/${productId}`);
      return res.data;
    },
    enabled: isEdit,
  });

  // Load product data for editing
  useEffect(() => {
    if (productData?.data) {
      const product = productData.data;
      setFormData({
        title: product.title || "",
        description: product.description || "",
        category: product.category?._id || product.category || "",
        images: product.images || [],
        type: product.type || "physical",
        price: product.price?.toString() || "",
        compareAtPrice: product.compareAtPrice?.toString() || "",
        featuredImage: product.featuredImage || "",
        stock: product.stock?.toString() || "0",
        attributes: product.attributes || [],
        shippingRequired: product.shippingRequired ?? true,
        digitalUrl: product.digitalUrl || "",
        isActive: product.isActive ?? true,
      });
    }
  }, [productData]);

  // Fetch categories
  const { data: categoriesData, isLoading: categoriesLoading } = useCategories();
  const categories = categoriesData?.data?.categories || [];

  // Create product mutation
  const createMutation = useMutation({
    mutationFn: async (data) => {
      const res = await api.post("/ecom/products", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Product created successfully!");
      queryClient.invalidateQueries(["products"]);
      router.push("/dashboard/admin/products");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to create product");
    },
  });

  // Update product mutation
  const updateMutation = useMutation({
    mutationFn: async (data) => {
      const res = await api.put(`/ecom/products/${productId}`, data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Product updated successfully!");
      queryClient.invalidateQueries(["products"]);
      queryClient.invalidateQueries(["product", productId]);
      router.push("/dashboard/admin/products");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to update product");
    },
  });

  // Handle featured image upload
  const handleFeaturedImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    setIsFeaturedUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append("file", file);
    formDataUpload.append("folder", "product-images");

    try {
      const res = await api.post("/upload", formDataUpload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const imageUrl = res.data?.data?.url;
      if (imageUrl) {
        setFormData((prev) => ({ ...prev, featuredImage: imageUrl }));
        toast.success("Featured image uploaded successfully!");
      } else {
        throw new Error("No image URL returned");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to upload image");
    } finally {
      setIsFeaturedUploading(false);
    }
  };

  // Handle product images upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    setIsUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append("file", file);
    formDataUpload.append("folder", "product-images");

    try {
      const res = await api.post("/upload", formDataUpload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const imageUrl = res.data?.data?.url;
      if (imageUrl) {
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, imageUrl],
        }));
        toast.success("Image uploaded successfully!");
      } else {
        throw new Error("No image URL returned");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  // Handle digital file upload
  const handleDigitalFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file size (max 100MB for digital products)
    if (file.size > 100 * 1024 * 1024) {
      toast.error("File size should be less than 100MB");
      return;
    }

    setIsDigitalFileUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append("file", file);
    formDataUpload.append("folder", "digital-products");

    try {
      const res = await api.post("/upload", formDataUpload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const fileUrl = res.data?.data?.url;
      if (fileUrl) {
        setFormData((prev) => ({ ...prev, digitalUrl: fileUrl }));
        toast.success("Digital file uploaded successfully!");
      } else {
        throw new Error("No file URL returned");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to upload file");
    } finally {
      setIsDigitalFileUploading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Remove image from array
  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // Add attribute
  const addAttribute = () => {
    if (attributeInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        attributes: [...prev.attributes, attributeInput.trim()],
      }));
      setAttributeInput("");
    }
  };

  // Remove attribute
  const removeAttribute = (index) => {
    setFormData((prev) => ({
      ...prev,
      attributes: prev.attributes.filter((_, i) => i !== index),
    }));
  };

  // Generate slug from title
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const slug = generateSlug(formData.title);

    const submitData = {
      ...formData,
      slug,
      price: formData.price ? parseFloat(formData.price) : undefined,
      compareAtPrice: formData.compareAtPrice
        ? parseFloat(formData.compareAtPrice)
        : undefined,
      stock: formData.stock ? parseInt(formData.stock) : 0,
    };

    Object.keys(submitData).forEach((key) => {
      if (submitData[key] === "" || submitData[key] === undefined) {
        delete submitData[key];
      }
    });

    if (isEdit) {
      updateMutation.mutate(submitData);
    } else {
      createMutation.mutate(submitData);
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => router.push("/products")}
          className="p-2 hover:bg-white/50 rounded-xl transition-all duration-200"
          style={{ color: 'var(--color-secondary, #2563EB)' }}
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text, #064E3B)' }}>
            {isEdit ? "Edit Product" : "Create New Product"}
          </h1>
          <p className="text-sm opacity-70 mt-1" style={{ color: 'var(--color-text, #064E3B)' }}>
            {isEdit ? "Update your product details" : "Fill in the product details below"}
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: 'var(--shadow-medium, 0 4px 12px rgba(0, 0, 0, 0.1))' }}>
        <div className="p-6 space-y-8">
          
          {/* Basic Information Card */}
          <div className="rounded-xl p-5 border" style={{ 
            backgroundColor: 'rgba(5, 150, 105, 0.05)',
            borderColor: 'rgba(5, 150, 105, 0.2)'
          }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(5, 150, 105, 0.1)' }}>
                <Info className="h-5 w-5" style={{ color: 'var(--color-primary, #059669)' }} />
              </div>
              <h3 className="text-lg font-semibold" style={{ color: 'var(--color-text, #064E3B)' }}>
                Basic Information
              </h3>
            </div>

            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text, #064E3B)' }}>
                  Title <span style={{ color: '#DC2626' }}>*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border rounded-xl focus:outline-none focus:ring-2 transition-all"
                  style={{ 
                    borderColor: '#D1D5DB',
                    color: 'var(--color-text, #064E3B)'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--color-primary, #059669)'}
                  onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
                  placeholder="Enter product title"
                />
                <p className="text-xs opacity-70 mt-2" style={{ color: 'var(--color-text, #064E3B)' }}>
                  <Tag className="h-3 w-3 inline mr-1" />
                  Slug will be auto-generated from the title
                </p>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text, #064E3B)' }}>
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-white border rounded-xl focus:outline-none focus:ring-2 transition-all resize-none"
                  style={{ 
                    borderColor: '#D1D5DB',
                    color: 'var(--color-text, #064E3B)'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--color-primary, #059669)'}
                  onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
                  placeholder="Describe your product features and benefits..."
                />
              </div>

              {/* Category and Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Category */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text, #064E3B)' }}>
                    Category <span style={{ color: '#DC2626' }}>*</span>
                  </label>
                  {categoriesLoading ? (
                    <div className="w-full px-4 py-3 bg-gray-50 border rounded-xl animate-pulse">
                      Loading categories...
                    </div>
                  ) : (
                    <div className="relative">
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white border rounded-xl focus:outline-none focus:ring-2 appearance-none pr-10 transition-all"
                        style={{ 
                          borderColor: '#D1D5DB',
                          color: 'var(--color-text, #064E3B)'
                        }}
                        onFocus={(e) => e.target.style.borderColor = 'var(--color-primary, #059669)'}
                        onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
                      >
                        <option value="">Select a category</option>
                        {categories.map((cat) => (
                          <option key={cat._id} value={cat._id}>
                            {cat.title}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-3 pointer-events-none">
                        <Tag className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Type */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text, #064E3B)' }}>
                    Product Type
                  </label>
                  <div className="relative">
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border rounded-xl focus:outline-none focus:ring-2 appearance-none pr-10 transition-all"
                      style={{ 
                        borderColor: '#D1D5DB',
                        color: 'var(--color-text, #064E3B)'
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--color-primary, #059669)'}
                      onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
                    >
                      <option value="physical">Physical Product</option>
                      <option value="digital">Digital Product</option>
                    </select>
                    <div className="absolute right-3 top-3 pointer-events-none">
                      <Package className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Card */}
          <div className="rounded-xl p-5 border" style={{ 
            backgroundColor: 'rgba(37, 99, 235, 0.05)',
            borderColor: 'rgba(37, 99, 235, 0.2)'
          }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(37, 99, 235, 0.1)' }}>
                <DollarSign className="h-5 w-5" style={{ color: 'var(--color-secondary, #2563EB)' }} />
              </div>
              <h3 className="text-lg font-semibold" style={{ color: 'var(--color-text, #064E3B)' }}>
                Pricing
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Price */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text, #064E3B)' }}>
                  Price
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-3">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    className="w-full pl-10 pr-4 py-3 bg-white border rounded-xl focus:outline-none focus:ring-2 transition-all"
                    style={{ 
                      borderColor: '#D1D5DB',
                      color: 'var(--color-text, #064E3B)'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--color-secondary, #2563EB)'}
                    onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Compare at Price */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text, #064E3B)' }}>
                  Compare at Price
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-3">
                    <Tag className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="compareAtPrice"
                    value={formData.compareAtPrice}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    className="w-full pl-10 pr-4 py-3 bg-white border rounded-xl focus:outline-none focus:ring-2 transition-all"
                    style={{ 
                      borderColor: '#D1D5DB',
                      color: 'var(--color-text, #064E3B)'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--color-secondary, #2563EB)'}
                    onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
                    placeholder="0.00"
                  />
                </div>
                <p className="text-xs opacity-70 mt-2" style={{ color: 'var(--color-text, #064E3B)' }}>
                  Original price for showing discounts
                </p>
              </div>
            </div>
          </div>

          {/* Images Card */}
          <div className="rounded-xl p-5 border" style={{ 
            backgroundColor: 'rgba(251, 191, 36, 0.05)',
            borderColor: 'rgba(251, 191, 36, 0.2)'
          }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(251, 191, 36, 0.1)' }}>
                <ImageIcon className="h-5 w-5" style={{ color: 'var(--color-accent, #FBBF24)' }} />
              </div>
              <h3 className="text-lg font-semibold" style={{ color: 'var(--color-text, #064E3B)' }}>
                Product Images
              </h3>
            </div>

            <div className="space-y-6">
              {/* Featured Image */}
              <div>
                <label className="block text-sm font-medium mb-3" style={{ color: 'var(--color-text, #064E3B)' }}>
                  Featured Image
                  <span className="ml-1 text-xs px-2 py-1 rounded-full" style={{ 
                    backgroundColor: 'rgba(251, 191, 36, 0.2)',
                    color: 'var(--color-accent, #FBBF24)'
                  }}>
                    Main Image
                  </span>
                </label>
                <div className="space-y-3">
                  <label className={`flex flex-col items-center justify-center gap-3 px-6 py-8 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 ${isFeaturedUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    style={{ borderColor: isFeaturedUploading ? '#D1D5DB' : 'var(--color-accent, #FBBF24)' }}
                    onMouseEnter={(e) => !isFeaturedUploading && (e.currentTarget.style.backgroundColor = 'rgba(251, 191, 36, 0.05)')}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <div className="p-3 rounded-full" style={{ backgroundColor: 'rgba(251, 191, 36, 0.2)' }}>
                      {isFeaturedUploading ? (
                        <Loader2 className="h-6 w-6 animate-spin" style={{ color: 'var(--color-accent, #FBBF24)' }} />
                      ) : (
                        <Upload className="h-6 w-6" style={{ color: 'var(--color-accent, #FBBF24)' }} />
                      )}
                    </div>
                    <div className="text-center">
                      <p className="font-medium" style={{ color: 'var(--color-text, #064E3B)' }}>
                        {isFeaturedUploading ? "Uploading..." : "Upload Featured Image"}
                      </p>
                      <p className="text-xs opacity-70 mt-1" style={{ color: 'var(--color-text, #064E3B)' }}>
                        PNG, JPG up to 5MB
                      </p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFeaturedImageUpload}
                      disabled={isFeaturedUploading}
                      className="hidden"
                    />
                  </label>
                  
                  {formData.featuredImage && (
                    <div className="relative group overflow-hidden rounded-xl shadow-lg">
                      <img
                        src={formData.featuredImage}
                        alt="Featured"
                        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <button
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, featuredImage: "" }))}
                        className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all transform hover:scale-105 shadow-lg"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Product Images */}
              <div>
                <label className="block text-sm font-medium mb-3" style={{ color: 'var(--color-text, #064E3B)' }}>
                  Gallery Images
                  <span className="ml-1 text-xs px-2 py-1 rounded-full" style={{ 
                    backgroundColor: 'rgba(251, 191, 36, 0.2)',
                    color: 'var(--color-accent, #FBBF24)'
                  }}>
                    Optional
                  </span>
                </label>
                
                <label className={`flex items-center justify-center gap-3 px-6 py-4 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 mb-4 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  style={{ borderColor: isUploading ? '#D1D5DB' : 'var(--color-accent, #FBBF24)' }}
                  onMouseEnter={(e) => !isUploading && (e.currentTarget.style.backgroundColor = 'rgba(251, 191, 36, 0.05)')}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <Upload className="h-5 w-5" style={{ color: 'var(--color-accent, #FBBF24)' }} />
                  <span className="font-medium" style={{ color: 'var(--color-text, #064E3B)' }}>
                    {isUploading ? "Uploading..." : "Add More Images"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                    className="hidden"
                  />
                </label>

                {/* Images Grid */}
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {formData.images.map((img, index) => (
                      <div key={index} className="relative group overflow-hidden rounded-lg">
                        <img
                          src={img}
                          alt={`Product ${index + 1}`}
                          className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute top-2 right-2 transform translate-x-10 group-hover:translate-x-0 transition-transform duration-300">
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all shadow-lg"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <div className="absolute bottom-2 left-2 text-xs bg-black/70 text-white px-2 py-1 rounded">
                          {index + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Inventory & Shipping Card */}
          <div className="rounded-xl p-5 border" style={{ 
            backgroundColor: 'rgba(5, 150, 105, 0.05)',
            borderColor: 'rgba(5, 150, 105, 0.2)'
          }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(5, 150, 105, 0.1)' }}>
                <Package className="h-5 w-5" style={{ color: 'var(--color-primary, #059669)' }} />
              </div>
              <h3 className="text-lg font-semibold" style={{ color: 'var(--color-text, #064E3B)' }}>
                Inventory & Shipping
              </h3>
            </div>

            <div className="space-y-4">
              {/* Stock */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text, #064E3B)' }}>
                  Stock Quantity
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-3 bg-white border rounded-xl focus:outline-none focus:ring-2 transition-all"
                  style={{ 
                    borderColor: '#D1D5DB',
                    color: 'var(--color-text, #064E3B)'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--color-primary, #059669)'}
                  onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
                  placeholder="Enter stock quantity"
                />
              </div>

              {/* Shipping Required - Fixed Checkbox */}
              <div className="flex items-center gap-3 p-3 bg-white border rounded-xl" style={{ borderColor: '#E5E7EB' }}>
                <label htmlFor="shippingRequired" className="flex items-center gap-3 cursor-pointer flex-1">
                  <div className="relative">
                    <input
                      type="checkbox"
                      name="shippingRequired"
                      id="shippingRequired"
                      checked={formData.shippingRequired}
                      onChange={handleChange}
                      className="w-5 h-5 cursor-pointer"
                      style={{ 
                        accentColor: 'var(--color-primary, #059669)',
                        cursor: 'pointer'
                      }}
                    />
                  </div>
                  <div>
                    <span className="text-sm font-medium block" style={{ color: 'var(--color-text, #064E3B)' }}>
                      Shipping Required
                    </span>
                    <span className="text-xs opacity-70" style={{ color: 'var(--color-text, #064E3B)' }}>
                      Check if this product needs to be shipped
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Digital Product File (Conditional) */}
          {formData.type === "digital" && (
            <div className="rounded-xl p-5 border" style={{ 
              backgroundColor: 'rgba(15, 146, 147, 0.05)',
              borderColor: 'rgba(15, 146, 147, 0.2)'
            }}>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(15, 146, 147, 0.1)' }}>
                  <FileArchive className="h-5 w-5" style={{ color: 'var(--color-accent-special, #0f9293)' }} />
                </div>
                <h3 className="text-lg font-semibold" style={{ color: 'var(--color-text, #064E3B)' }}>
                  Digital Product File
                </h3>
              </div>
              
              <div className="space-y-3">
                <label className={`flex flex-col items-center justify-center gap-3 px-6 py-8 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 ${isDigitalFileUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  style={{ borderColor: isDigitalFileUploading ? '#D1D5DB' : 'var(--color-accent-special, #0f9293)' }}
                  onMouseEnter={(e) => !isDigitalFileUploading && (e.currentTarget.style.backgroundColor = 'rgba(15, 146, 147, 0.05)')}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <div className="p-3 rounded-full" style={{ backgroundColor: 'rgba(15, 146, 147, 0.2)' }}>
                    {isDigitalFileUploading ? (
                      <Loader2 className="h-6 w-6 animate-spin" style={{ color: 'var(--color-accent-special, #0f9293)' }} />
                    ) : (
                      <Upload className="h-6 w-6" style={{ color: 'var(--color-accent-special, #0f9293)' }} />
                    )}
                  </div>
                  <div className="text-center">
                    <p className="font-medium" style={{ color: 'var(--color-text, #064E3B)' }}>
                      {isDigitalFileUploading ? "Uploading..." : "Upload Digital File"}
                    </p>
                    <p className="text-xs opacity-70 mt-1" style={{ color: 'var(--color-text, #064E3B)' }}>
                      ZIP, PDF, or any file up to 100MB
                    </p>
                  </div>
                  <input
                    type="file"
                    onChange={handleDigitalFileUpload}
                    disabled={isDigitalFileUploading}
                    className="hidden"
                  />
                </label>

                {formData.digitalUrl && (
                  <div className="flex items-center justify-between p-4 bg-white border rounded-xl" style={{ borderColor: 'rgba(15, 146, 147, 0.3)' }}>
                    <div className="flex items-center gap-3">
                      <FileArchive className="h-5 w-5" style={{ color: 'var(--color-accent-special, #0f9293)' }} />
                      <div>
                        <p className="text-sm font-medium" style={{ color: 'var(--color-text, #064E3B)' }}>
                          File uploaded successfully
                        </p>
                        <p className="text-xs opacity-70" style={{ color: 'var(--color-text, #064E3B)' }}>
                          {formData.digitalUrl.split('/').pop()}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, digitalUrl: "" }))}
                      className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Attributes Card */}
          <div className="rounded-xl p-5 border" style={{ 
            backgroundColor: 'rgba(37, 99, 235, 0.05)',
            borderColor: 'rgba(37, 99, 235, 0.2)'
          }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(37, 99, 235, 0.1)' }}>
                <Tag className="h-5 w-5" style={{ color: 'var(--color-secondary, #2563EB)' }} />
              </div>
              <h3 className="text-lg font-semibold" style={{ color: 'var(--color-text, #064E3B)' }}>
                Product Attributes
              </h3>
            </div>

            <div className="space-y-4">
              {/* Add Attribute */}
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={attributeInput}
                    onChange={(e) => setAttributeInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addAttribute();
                      }
                    }}
                    className="w-full pl-10 pr-4 py-3 bg-white border rounded-xl focus:outline-none focus:ring-2 transition-all"
                    style={{ 
                      borderColor: '#D1D5DB',
                      color: 'var(--color-text, #064E3B)'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--color-secondary, #2563EB)'}
                    onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
                    placeholder="Color: Red, Size: Large, Material: Cotton..."
                  />
                  <div className="absolute left-3 top-3">
                    <Plus className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={addAttribute}
                  className="px-4 py-3 text-white rounded-xl transition-all transform hover:scale-105 shadow-md"
                  style={{ backgroundColor: 'var(--color-secondary, #2563EB)' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-secondary-hover, #1E40AF)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-secondary, #2563EB)'}
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>

              {/* Attributes List */}
              {formData.attributes.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm opacity-70" style={{ color: 'var(--color-text, #064E3B)' }}>
                    {formData.attributes.length} attribute{formData.attributes.length !== 1 ? 's' : ''} added
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {formData.attributes.map((attr, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg shadow-sm"
                        style={{ borderColor: '#E5E7EB' }}
                      >
                        <span className="text-sm" style={{ color: 'var(--color-text, #064E3B)' }}>{attr}</span>
                        <button
                          type="button"
                          onClick={() => removeAttribute(index)}
                          className="p-1 text-gray-400 hover:text-red-500 rounded transition-colors"
                          title="Remove attribute"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Status Card - Fixed Checkbox */}
          <div className="rounded-xl p-5 border" style={{ 
            backgroundColor: 'rgba(5, 150, 105, 0.05)',
            borderColor: 'rgba(5, 150, 105, 0.2)'
          }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(5, 150, 105, 0.1)' }}>
                <CheckCircle className="h-5 w-5" style={{ color: 'var(--color-primary, #059669)' }} />
              </div>
              <h3 className="text-lg font-semibold" style={{ color: 'var(--color-text, #064E3B)' }}>
                Status
              </h3>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-white border rounded-xl" style={{ borderColor: '#E5E7EB' }}>
              <label htmlFor="isActive" className="flex items-center gap-3 cursor-pointer flex-1">
                <div className="relative">
                  <input
                    type="checkbox"
                    name="isActive"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                    className="w-5 h-5 cursor-pointer"
                    style={{ 
                      accentColor: 'var(--color-primary, #059669)',
                      cursor: 'pointer'
                    }}
                  />
                </div>
                <div>
                  <span className="block text-sm font-medium" style={{ color: 'var(--color-text, #064E3B)' }}>
                    Active Product
                  </span>
                  <span className="block text-xs opacity-70" style={{ color: 'var(--color-text, #064E3B)' }}>
                    Visible to customers in store
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-6 border-t" style={{ 
          borderColor: '#E5E7EB',
          backgroundColor: 'rgba(236, 253, 245, 0.5)'
        }}>
          <button
            type="button"
            onClick={() => router.push("/products")}
            className="px-6 py-3 border rounded-xl transition-all duration-200 font-medium"
            style={{ 
              borderColor: '#D1D5DB',
              color: 'var(--color-text, #064E3B)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.5)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-8 py-3 text-white rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            style={{ backgroundColor: 'var(--color-primary, #059669)' }}
            onMouseEnter={(e) => !isLoading && (e.currentTarget.style.backgroundColor = 'var(--color-primary-hover, #047857)')}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-primary, #059669)'}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>{isEdit ? "Updating..." : "Creating..."}</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>{isEdit ? "Update Product" : "Create Product"}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}