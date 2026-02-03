"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/apiClient";
import {
  Package,
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  DollarSign,
  Calendar,
  BookOpen,
  Search,
  Filter,
  TrendingUp,
  RefreshCw
} from "lucide-react";
import { toast } from "react-toastify";

export default function PackagesPage() {
  const router = useRouter();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchPackages();
  }, [statusFilter]);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const res = await api.get("/packages", {
        params: {
          search: search || undefined,
          isActive: statusFilter !== "all" ? statusFilter : undefined
        }
      });
      setPackages(res.data.data || []);
    } catch (error) {
      console.error("Error fetching packages:", error);
      toast.error("Failed to load packages");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (packageId) => {
    if (!confirm("Are you sure you want to delete this package?")) return;

    try {
      await api.delete(`/packages/${packageId}`);
      toast.success("Package deleted successfully");
      fetchPackages();
    } catch (error) {
      console.error("Error deleting package:", error);
      toast.error("Failed to delete package");
    }
  };

  const handleToggleStatus = async (packageId, currentStatus) => {
    console.log(currentStatus)
    try {
      await api.patch(`/packages/${packageId}`, {isActive: !currentStatus});
      toast.success(`Package ${currentStatus ? 'deactivated' : 'activated'} successfully`);
      fetchPackages();
    } catch (error) {
      console.error("Error toggling status:", error);
      toast.error("Failed to update package status");
    }
  };

  // Calculate total savings
  const calculateSavings = (pkg) => {
    const totalCoursePrice = pkg.courseIds?.reduce((sum, course) => sum + (course?.price || 0), 0) || 0;
    if (totalCoursePrice > 0 && pkg.price > 0) {
      return Math.round(((totalCoursePrice - pkg.price) / totalCoursePrice) * 100);
    }
    return 0;
  };

  if (loading && packages.length === 0) {
    return (
      <div className="min-h-screen p-4">
        <div className="container mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-48"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-xl p-4">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-text)]">
                Course Packages
              </h1>
              <p className="text-[var(--color-text)]/70 text-sm md:text-base mt-1">
                Bundle courses together for better value
              </p>
            </div>
            <button
              onClick={() => router.push("/dashboard/admin/packages/create")}
              className="flex items-center gap-2 bg-[var(--color-primary)] text-white px-4 py-3 rounded-xl hover:bg-[var(--color-primary-hover)] transition shadow-md"
            >
              <Plus className="h-5 w-5" />
              Create New Package
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Total Packages</span>
                <div className="p-2 bg-[var(--color-secondary)]/10 rounded-lg">
                  <Package className="h-5 w-5 text-[var(--color-secondary)]" />
                </div>
              </div>
              <div className="text-2xl font-bold text-[var(--color-text)]">
                {packages.length}
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Active Packages</span>
                <div className="p-2 bg-[var(--color-primary)]/10 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-[var(--color-primary)]" />
                </div>
              </div>
              <div className="text-2xl font-bold text-[var(--color-text)]">
                {packages.filter(p => p.isActive).length}
              </div>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search packages..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && fetchPackages()}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Packages Grid */}
        {packages.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              No packages found
            </h3>
            <p className="text-gray-500 mb-6">
              {search ? "Try a different search term" : "Create your first package to get started"}
            </p>
            <button
              onClick={() => router.push("/dashboard/admin/packages/create")}
              className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-xl hover:bg-[var(--color-primary-hover)] transition"
            >
              Create New Package
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => {
              const savings = calculateSavings(pkg);
              return (
                <div key={pkg._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                  {/* Package Header */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-lg text-[var(--color-text)] line-clamp-1">
                          {pkg.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            pkg.isActive
                              ? "bg-[#05966915] text-[var(--color-primary)] border border-[#05966930]"
                              : "bg-gray-100 text-gray-700 border border-gray-200"
                          }`}>
                            {pkg.isActive ? "Active" : "Inactive"}
                          </span>
                          {savings > 0 && (
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 border border-red-200">
                              Save {savings}%
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-[var(--color-text)]">
                          ${pkg.price.toFixed(2)}
                        </div>
                        {pkg.comparePrice > pkg.price && (
                          <div className="text-sm text-gray-500 line-through">
                            ${pkg.comparePrice.toFixed(2)}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Course Count */}
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <BookOpen className="h-4 w-4" />
                      <span>{pkg.courseIds?.length || 0} courses included</span>
                    </div>
                  </div>

                  {/* Package Details */}
                  <div className="p-6">
                    {/* Features */}
                    {pkg.features?.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-700 mb-2 text-sm">Features:</h4>
                        <div className="space-y-1">
                          {pkg.features.slice(0, 3).map((feature, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-[var(--color-primary)] rounded-full"></div>
                              <span className="text-sm text-gray-600 line-clamp-1">{feature}</span>
                            </div>
                          ))}
                          {pkg.features.length > 3 && (
                            <div className="text-sm text-gray-500">
                              +{pkg.features.length - 3} more features
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Access Days */}
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{pkg.accessDays} days access</span>
                      </div>
                      <span className="font-medium">{pkg.currency}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => router.push(`/dashboard/admin/packages/${pkg._id}/edit`)}
                        className="flex-1 flex items-center justify-center gap-2 border border-[var(--color-secondary)] text-[var(--color-secondary)] py-2 rounded-lg hover:bg-blue-50 transition"
                      >
                        <Edit className="h-4 w-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleToggleStatus(pkg._id, pkg.isActive)}
                        className="flex-1 flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition"
                      >
                        {pkg.isActive ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                        {pkg.isActive ? "Deactivate" : "Activate"}
                      </button>
                      <button
                        onClick={() => handleDelete(pkg._id)}
                        className="p-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}