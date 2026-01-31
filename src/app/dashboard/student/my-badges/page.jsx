// app/dashboard/student/badges/StudentBadges.jsx
"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/apiClient";
import { 
  Trophy, 
  Award, 
  Star, 
  Crown, 
  Flame, 
  Zap,
  Target,
  TrendingUp,
  CheckCircle,
  Calendar,
  Sparkles,
  Medal,
  Shield,
  Gem,
  ChevronRight
} from "lucide-react";

// Custom hook for fetching student badges
const useStudentBadges = () => {
  return useQuery({
    queryKey: ['studentBadges'],
    queryFn: async () => {
      const res = await api.get('/badges/me');
      return res.data;
    },
    refetchOnWindowFocus: false,
  });
};

// Helper functions
const getBadgeIcon = (points) => {
  if (points >= 2000) return <Crown className="w-5 h-5 text-yellow-600" />;
  if (points >= 1000) return <Flame className="w-5 h-5 text-orange-500" />;
  if (points >= 500) return <Zap className="w-5 h-5 text-blue-500" />;
  if (points >= 100) return <Star className="w-5 h-5 text-purple-500" />;
  return <Award className="w-5 h-5 text-green-500" />;
};

const getBadgeLevel = (points) => {
  if (points >= 2000) return "Legendary";
  if (points >= 1000) return "Master";
  if (points >= 500) return "Advanced";
  if (points >= 100) return "Intermediate";
  return "Beginner";
};

const getBadgeColor = (points) => {
  if (points >= 2000) return "from-amber-500 to-yellow-500";
  if (points >= 1000) return "from-orange-500 to-red-500";
  if (points >= 500) return "from-blue-500 to-cyan-500";
  if (points >= 100) return "from-purple-500 to-pink-500";
  return "from-emerald-500 to-green-500";
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export default function StudentBadges() {
  const { data: badgesData, isLoading, error } = useStudentBadges();
  const badges = badgesData?.data || [];
  const [selectedBadge, setSelectedBadge] = useState(null);

  // Set first badge as selected by default
  useEffect(() => {
    if ( badges?.badges?.length > 0 && !selectedBadge) {
      setSelectedBadge(badges[0]);
    }
  }, [badges, selectedBadge]);

  // Calculate statistics
  const totalBadges = badges?.badges?.length;
  const totalPoints = badges.totalPoints;
  const averagePoints = totalBadges > 0 ? Math.round(totalPoints / badges.totalCourse) : 0;

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Header Loading */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-[--radius-card] shadow-lg p-6 animate-pulse">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-8 bg-emerald-400/30 rounded w-48"></div>
              <div className="h-4 bg-emerald-400/30 rounded w-64"></div>
            </div>
            <div className="h-12 w-12 bg-emerald-400/30 rounded-full"></div>
          </div>
        </div>

        {/* Stats Loading */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-[--radius-card] shadow-md p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>

        {/* Badges Grid Loading */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[--radius-card] shadow-md p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="aspect-square rounded-2xl bg-gray-200"></div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-white rounded-[--radius-card] shadow-md p-6 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
            <div className="h-48 bg-gray-200 rounded-xl"></div>
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
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-[--radius-card] shadow-lg overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                My Achievement Badges
              </h1>
              <p className="text-emerald-100 text-sm md:text-base">
                Celebrate your learning journey with earned badges
              </p>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              <Trophy className="w-8 h-8 text-yellow-300" />
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{totalBadges}</div>
                <div className="text-sm text-emerald-100">Badges Earned</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-[--radius-card] shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <Award className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Total Badges</h3>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <div className="text-3xl font-bold text-gray-900">{totalBadges}</div>
              <div className="text-sm text-gray-500 mt-1">Achievements unlocked</div>
            </div>
            <Sparkles className="w-8 h-8 text-amber-500" />
          </div>
        </div>

        <div className="bg-white rounded-[--radius-card] shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Target className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Total Points</h3>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <div className="text-3xl font-bold text-gray-900">{totalPoints}</div>
              <div className="text-sm text-gray-500 mt-1">Points accumulated</div>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-[--radius-card] shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Medal className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Average Level</h3>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <div className="text-3xl font-bold text-gray-900">{getBadgeLevel(averagePoints)}</div>
              <div className="text-sm text-gray-500 mt-1">Skill proficiency</div>
            </div>
            <Shield className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Badges Grid - Left Side (2/3) */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-[--radius-card] shadow-md overflow-hidden">
            <div className="border-b border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900">My Badge Collection</h2>
              <p className="text-sm text-gray-500 mt-1">All badges earned through your learning journey</p>
            </div>

            <div className="p-6">
              {badges?.badges?.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {badges?.badges?.map((userBadge, index) => (
                    <motion.button
                      key={userBadge._id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => setSelectedBadge(userBadge)}
                      className={`aspect-square rounded-2xl p-4 flex flex-col items-center justify-center relative overflow-hidden transition-all ${
                        selectedBadge?._id === userBadge._id
                          ? 'ring-2 ring-emerald-500 ring-offset-2'
                          : 'hover:ring-2 hover:ring-emerald-500/50 hover:ring-offset-2'
                      }`}
                    >
                      {/* Background Gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${getBadgeColor(userBadge.badge?.pointsRequired)} opacity-10`} />
                      
                      {/* Badge Image/Icon */}
                      <div className="relative z-10">
                        {userBadge.badge?.image ? (
                          <img 
                            src={userBadge.badge.image} 
                            alt={userBadge.badge.title}
                            className="w-16 h-16 object-cover rounded-full"
                          />
                        ) : (
                          <div className={`w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br ${getBadgeColor(userBadge.badge?.pointsRequired)}`}>
                            {getBadgeIcon(userBadge.badge?.pointsRequired)}
                          </div>
                        )}
                      </div>

                      {/* Badge Title */}
                      <div className="mt-3 text-center">
                        <h3 className="text-xs font-semibold text-gray-900 line-clamp-1">
                          {userBadge.badge?.title}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {getBadgeLevel(userBadge.badge?.pointsRequired)}
                        </p>
                      </div>

                      {/* Earned Indicator */}
                      <div className="absolute top-2 right-2">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                      </div>
                    </motion.button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No badges yet</h3>
                  <p className="text-gray-500 mb-4">Start learning to earn your first badge!</p>
                  <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-colors">
                    Explore Courses
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Selected Badge Details - Right Side (1/3) */}
        <div className="space-y-6">
          {/* Badge Details Card */}
          <div className="bg-white rounded-[--radius-card] shadow-md overflow-hidden">
            <div className="border-b border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900">Badge Details</h2>
              <p className="text-sm text-gray-500 mt-1">
                {selectedBadge ? "Information about selected badge" : "Select a badge to view details"}
              </p>
            </div>

            {selectedBadge ? (
              <div className="p-6">
                <div className="flex flex-col items-center text-center">
                  {/* Badge Display */}
                  <div className={`w-32 h-32 rounded-full flex items-center justify-center mb-6 relative overflow-hidden ${
                    selectedBadge.badge?.image 
                      ? '' 
                      : `bg-gradient-to-br ${getBadgeColor(selectedBadge.badge?.pointsRequired)}`
                  }`}>
                    {selectedBadge.badge?.image ? (
                      <img 
                        src={selectedBadge.badge.image} 
                        alt={selectedBadge.badge.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      getBadgeIcon(selectedBadge.badge?.pointsRequired)
                    )}
                    
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                  </div>

                  {/* Badge Info */}
                  <div className="space-y-3 mb-6">
                    <h3 className="text-xl font-bold text-gray-900">
                      {selectedBadge.badge?.title}
                    </h3>
                    <p className="text-gray-600">
                      {selectedBadge.badge?.description || "No description available"}
                    </p>
                    
                    {/* Level and Points */}
                    <div className="flex items-center justify-center gap-4">
                      <div className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-700">
                        {getBadgeLevel(selectedBadge.badge?.pointsRequired)}
                      </div>
                      <div className="flex items-center gap-1 px-3 py-1 bg-amber-100 rounded-full text-sm font-medium text-amber-700">
                        <Target className="w-3 h-3" />
                        {selectedBadge.badge?.pointsRequired} pts
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="w-full border-t border-gray-100 my-4"></div>

                  {/* Earned Information */}
                  <div className="w-full space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">Earned on</span>
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {formatDate(selectedBadge.issuedAt)}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Gem className="w-4 h-4" />
                        <span className="text-sm">Points Required</span>
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {selectedBadge.badge?.pointsRequired}
                      </div>
                    </div>

                    {selectedBadge.reason && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Award className="w-4 h-4" />
                          <span className="text-sm">Earned For</span>
                        </div>
                        <div className="text-sm font-medium text-gray-900 text-right">
                          {selectedBadge.reason}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 text-center">
                <div className="p-6 border-2 border-dashed border-gray-300 rounded-xl">
                  <Award className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="font-medium text-gray-900 mb-2">No badge selected</h3>
                  <p className="text-sm text-gray-500">
                    Click on a badge from your collection to view details
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}