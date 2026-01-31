// app/dashboard/admin/locations/LocationsGrid.jsx
"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/apiClient";
import { 
  Edit2, 
  Trash2, 
  Plus, 
  Save, 
  Loader2, 
  CheckCircle, 
  AlertCircle, 
  Building,
  School,
  MapPin,
  Globe,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  X
} from "lucide-react";

// Custom hooks
const useCities = (query = {}) => {
  return useQuery({
    queryKey: ['cities', query],
    queryFn: async () => {
      const res = await api.get('/cities', { params: query });
      return res.data;
    },
    refetchOnWindowFocus: false,
  });
};

const useSchools = (query = {}) => {
  return useQuery({
    queryKey: ['schools', query],
    queryFn: async () => {
      const res = await api.get('/schools', { params: query });
      return res.data;
    },
    refetchOnWindowFocus: false,
  });
};

const useCreateCity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      const res = await api.post('/cities/create', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['cities']);
    }
  });
};

const useUpdateCity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await api.patch(`/cities/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['cities']);
    }
  });
};

const useDeleteCity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const res = await api.delete(`/cities/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['cities']);
    }
  });
};

const useCreateSchool = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      const res = await api.post('/schools/create', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['schools']);
    }
  });
};

const useUpdateSchool = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await api.patch(`/schools/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['schools']);
    }
  });
};

const useDeleteSchool = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const res = await api.delete(`/schools/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['schools']);
    }
  });
};

export default function LocationsGrid() {
  const [activeTab, setActiveTab] = useState('cities'); // 'cities' or 'schools'
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  // City states
  const [editingCityId, setEditingCityId] = useState(null);
  const [isCreatingCity, setIsCreatingCity] = useState(false);
  const [showCityDeleteModal, setShowCityDeleteModal] = useState(false);
  const [cityToDelete, setCityToDelete] = useState(null);

  // School states
  const [editingSchoolId, setEditingSchoolId] = useState(null);
  const [isCreatingSchool, setIsCreatingSchool] = useState(false);
  const [showSchoolDeleteModal, setShowSchoolDeleteModal] = useState(false);
  const [schoolToDelete, setSchoolToDelete] = useState(null);

  // Form states
  const [cityFormData, setCityFormData] = useState({
    name: "",
    country: "",
    isActive: true
  });

  const [schoolFormData, setSchoolFormData] = useState({
    name: "",
    code: "",
    address: "",
    city: "",
    isActive: true
  });

  // Messages
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Queries
  const { data: citiesData, isLoading: citiesLoading } = useCities({
    q: search,
    page,
    limit
  });

  const { data: schoolsData, isLoading: schoolsLoading } = useSchools({
    q: search,
    page,
    limit,
    cityId: schoolFormData.city
  });

  // Mutations
  const createCity = useCreateCity();
  const updateCity = useUpdateCity();
  const deleteCity = useDeleteCity();
  const createSchool = useCreateSchool();
  const updateSchool = useUpdateSchool();
  const deleteSchool = useDeleteSchool();

  const cities = citiesData?.data?.data || [];
  const schools = schoolsData?.data?.data || [];
  const totalCities = citiesData?.data?.meta?.total || 0;
  const totalSchools = schoolsData?.data?.meta?.total || 0;
  const totalPages = activeTab === 'cities' 
    ? citiesData?.data?.meta?.totalPages || 1
    : schoolsData?.data?.meta?.totalPages || 1;

  // Reset forms
  useEffect(() => {
    if (!isCreatingCity && !editingCityId) {
      setCityFormData({ name: "", country: "", isActive: true });
    }
  }, [isCreatingCity, editingCityId]);

  useEffect(() => {
    if (!isCreatingSchool && !editingSchoolId) {
      setSchoolFormData({ name: "", code: "", address: "", city: "", isActive: true });
    }
  }, [isCreatingSchool, editingSchoolId]);

  // City handlers
  const handleCityEditClick = (city) => {
    setEditingCityId(city._id);
    setIsCreatingCity(false);
    setCityFormData({
      name: city.name,
      country: city.country || "",
      isActive: city.isActive !== false
    });
  };

  const handleCityCancel = () => {
    setEditingCityId(null);
    setIsCreatingCity(false);
    setCityFormData({ name: "", country: "", isActive: true });
  };

  const handleCitySubmit = async (e) => {
    e.preventDefault();
    
    if (!cityFormData.name.trim()) {
      setErrorMessage("City name is required");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    try {
      if (editingCityId) {
        await updateCity.mutateAsync({
          id: editingCityId,
          data: cityFormData
        });
        setSuccessMessage("City updated successfully!");
        setEditingCityId(null);
      } else {
        await createCity.mutateAsync(cityFormData);
        setSuccessMessage("City created successfully!");
        setIsCreatingCity(false);
      }
      
      setCityFormData({ name: "", country: "", isActive: true });
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || `Failed to ${editingCityId ? 'update' : 'create'} city`);
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  const handleCityDeleteClick = (city) => {
    setCityToDelete(city);
    setShowCityDeleteModal(true);
  };

  const handleCityDeleteConfirm = async () => {
    try {
      await deleteCity.mutateAsync(cityToDelete._id);
      setSuccessMessage("City deleted successfully!");
      setShowCityDeleteModal(false);
      setCityToDelete(null);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Failed to delete city");
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  const toggleCityStatus = async (city) => {
    try {
      await updateCity.mutateAsync({
        id: city._id,
        data: { ...city, isActive: !city.isActive }
      });
      setSuccessMessage(`City ${!city.isActive ? 'activated' : 'deactivated'}!`);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setErrorMessage("Failed to update city status");
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  // School handlers
  const handleSchoolEditClick = (school) => {
    setEditingSchoolId(school._id);
    setIsCreatingSchool(false);
    setSchoolFormData({
      name: school.name,
      code: school.code || "",
      address: school.address || "",
      city: school.city?._id || school.city || "",
      isActive: school.isActive !== false
    });
  };

  const handleSchoolCancel = () => {
    setEditingSchoolId(null);
    setIsCreatingSchool(false);
    setSchoolFormData({ name: "", code: "", address: "", city: "", isActive: true });
  };

  const handleSchoolSubmit = async (e) => {
    e.preventDefault();
    
    if (!schoolFormData.name.trim()) {
      setErrorMessage("School name is required");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    if (!schoolFormData.city) {
      setErrorMessage("Please select a city");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    try {
      if (editingSchoolId) {
        await updateSchool.mutateAsync({
          id: editingSchoolId,
          data: schoolFormData
        });
        setSuccessMessage("School updated successfully!");
        setEditingSchoolId(null);
      } else {
        await createSchool.mutateAsync(schoolFormData);
        setSuccessMessage("School created successfully!");
        setIsCreatingSchool(false);
      }
      
      setSchoolFormData({ name: "", code: "", address: "", city: "", isActive: true });
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || `Failed to ${editingSchoolId ? 'update' : 'create'} school`);
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  const handleSchoolDeleteClick = (school) => {
    setSchoolToDelete(school);
    setShowSchoolDeleteModal(true);
  };

  const handleSchoolDeleteConfirm = async () => {
    try {
      await deleteSchool.mutateAsync(schoolToDelete._id);
      setSuccessMessage("School deleted successfully!");
      setShowSchoolDeleteModal(false);
      setSchoolToDelete(null);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Failed to delete school");
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  const toggleSchoolStatus = async (school) => {
    try {
      await updateSchool.mutateAsync({
        id: school._id,
        data: { ...school, isActive: !school.isActive }
      });
      setSuccessMessage(`School ${!school.isActive ? 'activated' : 'deactivated'}!`);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setErrorMessage("Failed to update school status");
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  const goToPage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const isLoading = activeTab === 'cities' ? citiesLoading : schoolsLoading;
  const items = activeTab === 'cities' ? cities : schools;
  const total = activeTab === 'cities' ? totalCities : totalSchools;

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Loading skeleton similar to badges page */}
        <div className="animate-pulse">
          {/* Tab loading */}
          <div className="h-12 bg-gray-200 rounded-lg w-64 mb-6"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* List loading */}
            <div className="lg:col-span-2 bg-white rounded-[--radius-card] shadow-md p-6">
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-16 bg-gray-200 rounded-lg"></div>
                ))}
              </div>
            </div>
            
            {/* Form loading */}
            <div className="bg-white rounded-[--radius-card] shadow-md p-6">
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-12 bg-gray-200 rounded-xl"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-12 bg-gray-200 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
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

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Locations Management</h1>
          <p className="text-gray-500 mt-1">Manage cities and schools</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => {
            setActiveTab('cities');
            setPage(1);
          }}
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'cities'
              ? 'border-[#189E75] text-[#189E75]'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4" />
            Cities ({totalCities})
          </div>
        </button>
        <button
          onClick={() => {
            setActiveTab('schools');
            setPage(1);
          }}
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'schools'
              ? 'border-[#189E75] text-[#189E75]'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <School className="w-4 h-4" />
            Schools ({totalSchools})
          </div>
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex gap-3">
        <div className="flex-1">
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#189E75] focus:border-transparent transition"
          />
        </div>
        {activeTab === 'schools' && (
          <select
            value={schoolFormData.city}
            onChange={(e) => setSchoolFormData(prev => ({ ...prev, city: e.target.value }))}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#189E75] focus:border-transparent transition min-w-[180px]"
          >
            <option value="">All Cities</option>
            {cities.map(city => (
              <option key={city._id} value={city._id}>
                {city.name}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* List - Left Side */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-[--radius-card] shadow-md overflow-hidden">
            {/* Table Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <div className="col-span-4 font-semibold text-gray-700 text-sm">
                {activeTab === 'cities' ? 'City Name' : 'School Name'}
              </div>
              <div className="col-span-4 font-semibold text-gray-700 text-sm">
                {activeTab === 'cities' ? 'Country' : 'City'}
              </div>
              <div className="col-span-2 font-semibold text-gray-700 text-sm">Status</div>
              <div className="col-span-2 font-semibold text-gray-700 text-sm text-center">Actions</div>
            </div>

            {/* Items List */}
            <div className="divide-y divide-gray-100">
              {items.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center">
                    {/* Name Column */}
                    <div className="col-span-4 md:col-span-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          activeTab === 'cities' ? 'bg-blue-100' : 'bg-emerald-100'
                        }`}>
                          {activeTab === 'cities' ? (
                            <Building className="w-4 h-4 text-blue-600" />
                          ) : (
                            <School className="w-4 h-4 text-emerald-600" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 truncate">
                            {item.name}
                          </h3>
                          {activeTab === 'schools' && item.code && (
                            <p className="text-xs text-gray-500 mt-1">Code: {item.code}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Secondary Column */}
                    <div className="col-span-4 md:col-span-4">
                      {activeTab === 'cities' ? (
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-700">{item.country || "—"}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-700">
                            {item.city?.name || "No city assigned"}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Status Column */}
                    <div className="col-span-2 md:col-span-2">
                      <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                        item.isActive 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {item.isActive ? (
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
                    <div className="col-span-2 md:col-span-2">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => activeTab === 'cities' 
                            ? toggleCityStatus(item) 
                            : toggleSchoolStatus(item)
                          }
                          className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
                          title={item.isActive ? "Deactivate" : "Activate"}
                        >
                          {item.isActive ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={() => activeTab === 'cities' 
                            ? handleCityEditClick(item)
                            : handleSchoolEditClick(item)
                          }
                          className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => activeTab === 'cities' 
                            ? handleCityDeleteClick(item)
                            : handleSchoolDeleteClick(item)
                          }
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

            {/* No Items Message */}
            {items.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg">
                  No {activeTab} found
                </div>
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
                    Showing {items.length} of {total} {activeTab}
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
          {/* City Form */}
          {activeTab === 'cities' && (
            <div className="bg-white rounded-[--radius-card] shadow-md overflow-hidden">
              <div className="border-b border-gray-100 p-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {editingCityId ? "Edit City" : isCreatingCity ? "Create New City" : "Add City"}
                  </h2>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {editingCityId ? "Update city details" : "Add a new city"}
                </p>
              </div>
              
              {/* Form */}
              {(isCreatingCity || editingCityId) ? (
                <div className="p-6">
                  <form onSubmit={handleCitySubmit} className="space-y-6">
                    {/* Name Input */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        City Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={cityFormData.name}
                        onChange={(e) => setCityFormData({...cityFormData, name: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#189E75] focus:border-transparent transition"
                        placeholder="Enter city name"
                      />
                    </div>

                    {/* Country Input */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Country
                      </label>
                      <input
                        type="text"
                        value={cityFormData.country}
                        onChange={(e) => setCityFormData({...cityFormData, country: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#189E75] focus:border-transparent transition"
                        placeholder="Enter country name"
                      />
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
                            checked={cityFormData.isActive === true}
                            onChange={() => setCityFormData({...cityFormData, isActive: true})}
                            className="text-[#189E75] focus:ring-[#189E75]"
                          />
                          <span className="text-gray-700">Active</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            checked={cityFormData.isActive === false}
                            onChange={() => setCityFormData({...cityFormData, isActive: false})}
                            className="text-[#189E75] focus:ring-[#189E75]"
                          />
                          <span className="text-gray-700">Inactive</span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={handleCityCancel}
                        className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={createCity.isLoading || updateCity.isLoading}
                        className="flex-1 px-4 py-3 bg-[#189E75] hover:bg-[#147c5e] text-white rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {createCity.isLoading || updateCity.isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            {editingCityId ? 'Updating...' : 'Creating...'}
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4" />
                            {editingCityId ? 'Update' : 'Create'}
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="p-6 text-center">
                  <div className="p-6 border-2 border-dashed border-gray-300 rounded-xl">
                    <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-medium text-gray-900 mb-2">No city selected</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Click "New" to create a city or select an existing one to edit
                    </p>
                    <button
                      onClick={() => setIsCreatingCity(true)}
                      className="px-4 py-2 bg-[#189E75] hover:bg-[#147c5e] text-white rounded-lg font-medium transition-colors flex items-center gap-2 mx-auto"
                    >
                      <Plus className="w-4 h-4" />
                      Create New City
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* School Form */}
          {activeTab === 'schools' && (
            <div className="bg-white rounded-[--radius-card] shadow-md overflow-hidden">
              <div className="border-b border-gray-100 p-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {editingSchoolId ? "Edit School" : isCreatingSchool ? "Create New School" : "Add School"}
                  </h2>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {editingSchoolId ? "Update school details" : "Add a new school"}
                </p>
              </div>
              
              {/* Form */}
              {(isCreatingSchool || editingSchoolId) ? (
                <div className="p-6">
                  <form onSubmit={handleSchoolSubmit} className="space-y-6">
                    {/* Name Input */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        School Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={schoolFormData.name}
                        onChange={(e) => setSchoolFormData({...schoolFormData, name: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#189E75] focus:border-transparent transition"
                        placeholder="Enter school name"
                      />
                    </div>

                    {/* Code Input */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        School Code
                      </label>
                      <input
                        type="text"
                        value={schoolFormData.code}
                        onChange={(e) => setSchoolFormData({...schoolFormData, code: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#189E75] focus:border-transparent transition"
                        placeholder="Enter school code (optional)"
                      />
                    </div>

                    {/* Address Input */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Address
                      </label>
                      <textarea
                        value={schoolFormData.address}
                        onChange={(e) => setSchoolFormData({...schoolFormData, address: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#189E75] focus:border-transparent transition h-20 resize-none"
                        placeholder="Enter school address"
                      />
                    </div>

                    {/* City Selection */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        City *
                      </label>
                      <select
                        required
                        value={schoolFormData.city}
                        onChange={(e) => setSchoolFormData({...schoolFormData, city: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#189E75] focus:border-transparent transition"
                      >
                        <option value="">Select a city</option>
                        {cities.map(city => (
                          <option key={city._id} value={city._id}>
                            {city.name} {city.country && `(${city.country})`}
                          </option>
                        ))}
                      </select>
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
                            checked={schoolFormData.isActive === true}
                            onChange={() => setSchoolFormData({...schoolFormData, isActive: true})}
                            className="text-[#189E75] focus:ring-[#189E75]"
                          />
                          <span className="text-gray-700">Active</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            checked={schoolFormData.isActive === false}
                            onChange={() => setSchoolFormData({...schoolFormData, isActive: false})}
                            className="text-[#189E75] focus:ring-[#189E75]"
                          />
                          <span className="text-gray-700">Inactive</span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={handleSchoolCancel}
                        className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={createSchool.isLoading || updateSchool.isLoading}
                        className="flex-1 px-4 py-3 bg-[#189E75] hover:bg-[#147c5e] text-white rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {createSchool.isLoading || updateSchool.isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            {editingSchoolId ? 'Updating...' : 'Creating...'}
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4" />
                            {editingSchoolId ? 'Update' : 'Create'}
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="p-6 text-center">
                  <div className="p-6 border-2 border-dashed border-gray-300 rounded-xl">
                    <School className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-medium text-gray-900 mb-2">No school selected</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Click "New" to create a school or select an existing one to edit
                    </p>
                    <button
                      onClick={() => setIsCreatingSchool(true)}
                      className="px-4 py-2 bg-[#189E75] hover:bg-[#147c5e] text-white rounded-lg font-medium transition-colors flex items-center gap-2 mx-auto"
                    >
                      <Plus className="w-4 h-4" />
                      Create New School
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Delete Modals */}
      {/* City Delete Modal */}
      {showCityDeleteModal && cityToDelete && (
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
                <h2 className="text-xl font-bold text-gray-900 mb-2">Delete City</h2>
                <p className="text-gray-600">
                  Are you sure you want to delete <span className="font-semibold text-gray-900">{cityToDelete.name}</span>? 
                  This will also delete all associated schools.
                </p>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowCityDeleteModal(false);
                    setCityToDelete(null);
                  }}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCityDeleteConfirm}
                  disabled={deleteCity.isLoading}
                  className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {deleteCity.isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    'Delete City'
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* School Delete Modal */}
      {showSchoolDeleteModal && schoolToDelete && (
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
                <h2 className="text-xl font-bold text-gray-900 mb-2">Delete School</h2>
                <p className="text-gray-600">
                  Are you sure you want to delete <span className="font-semibold text-gray-900">{schoolToDelete.name}</span>? 
                  This action cannot be undone.
                </p>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowSchoolDeleteModal(false);
                    setSchoolToDelete(null);
                  }}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSchoolDeleteConfirm}
                  disabled={deleteSchool.isLoading}
                  className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {deleteSchool.isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    'Delete School'
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