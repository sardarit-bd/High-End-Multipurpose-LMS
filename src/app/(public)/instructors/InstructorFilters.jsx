// components/modules/instructor/InstructorFilters.tsx
"use client";
import { useState, useEffect, useCallback } from "react";
import { Tag } from "lucide-react";
import { FiFilter } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/apiClient";

// Custom hook for expertise
const useExpertise = () => {
  return useQuery({
    queryKey: ['instructor-expertise'],
    queryFn: async () => {
      const res = await api.get('/user/expertise', { params: { limit: 100 } });
      return res.data;
    },
    refetchOnWindowFocus: false,
  });
};

export default function InstructorFilters({ filters, onFilterChange, onClearFilters }) {
  const { data: expertiseData, isLoading: expertiseLoading } = useExpertise();
  
  // Response format from your service: { expertise: [{ _id: string, name: string, count: number }] }
  const expertiseList = expertiseData?.data?.expertise || [];
  
  // Local state for UI
  const [localFilters, setLocalFilters] = useState({
    expertise: filters.expertise || [],
  });

  // Sync with parent filters
  useEffect(() => {
    setLocalFilters({
      expertise: filters.expertise || [],
    });
  }, [filters]);

  // Handle expertise toggle
  const toggleExpertise = useCallback((expertiseId) => {
    setLocalFilters(prev => {
      const newExpertise = prev.expertise.includes(expertiseId)
        ? prev.expertise.filter(id => id !== expertiseId)
        : [...prev.expertise, expertiseId];
      
      const newFilters = {
        ...prev,
        expertise: newExpertise
      };
      
      // Update parent immediately
      onFilterChange({ expertise: newExpertise });
      
      return newFilters;
    });
  }, [onFilterChange]);

  if (expertiseLoading) {
    return (
      <div className="space-y-8">
        {/* Expertise Section Loading */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 bg-blue-100 rounded-lg">
              <Tag className="w-4 h-4 text-blue-600" />
            </div>
            <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
            <div className="ml-auto h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
          </div>
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-full p-3 rounded-xl border border-gray-200 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-gradient-to-r from-emerald-100 to-emerald-200 rounded-lg">
            <FiFilter className="w-4 h-4 text-[var(--color-primary)]" />
          </div>
          <h3 className="font-semibold text-[var(--color-text)]">Filters</h3>
        </div>
        <button
          onClick={onClearFilters}
          className="text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
        >
          Clear all
        </button>
      </div>

      {/* Expertise Section */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 bg-blue-100 rounded-lg">
            <Tag className="w-4 h-4 text-blue-600" />
          </div>
          <h4 className="font-semibold text-[var(--color-text)]">Expertise Areas</h4>
          <span className="text-sm text-gray-500 ml-auto">
            {localFilters.expertise.length} selected
          </span>
        </div>
        <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
          {expertiseList.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              No expertise areas available
            </div>
          ) : (
            expertiseList.map((item) => (
              <button
                key={item._id}
                onClick={() => toggleExpertise(item._id)}
                className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${localFilters.expertise.includes(item._id)
                  ? "bg-blue-50 border-blue-200 text-blue-700"
                  : "bg-gray-50/50 border-gray-200 text-gray-700 hover:bg-gray-100"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-medium text-left">
                    {item.name || item._id}
                    <span className="ml-2 text-xs text-gray-500">
                      ({item.count || 0})
                    </span>
                  </span>
                </div>
                <div className={`w-5 h-5 rounded border flex items-center justify-center ${localFilters.expertise.includes(item._id)
                  ? "bg-blue-500 border-blue-500"
                  : "bg-white border-gray-300"
                  }`}>
                  {localFilters.expertise.includes(item._id) && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
              </button>
            ))
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="pt-6 border-t border-emerald-100">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Showing</span>
            <span className="font-semibold text-[var(--color-text)]">
              {filters.totalItems || 0} instructors
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Expertise selected</span>
            <span className="font-semibold text-[var(--color-text)]">
              {localFilters.expertise.length || "All"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Total expertise areas</span>
            <span className="font-semibold text-[var(--color-text)]">
              {expertiseList.length}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}