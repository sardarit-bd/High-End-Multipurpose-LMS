"use client";

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '@/components/modules/headers/Navbar';
import {
  FaTrophy,
  FaCrown,
  FaMedal,
  FaStar,
  FaUniversity,
  FaGlobe,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaFire,
  FaAward,
  FaUsers,
  FaChartLine,
  FaCity
} from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/apiClient';
import LeaderboardHeroSection from '@/components/modules/leaderboard/LeaderboardHeroSection';
import Filters from '@/components/modules/leaderboard/Filters';
import RankCard from '@/components/modules/leaderboard/RankCard';
import LeaderboardTable from '@/components/modules/leaderboard/LeaderboardTable';
import InfoCard from '@/components/modules/leaderboard/InfoCard';
import LeaderboardSkeleton from '@/components/modules/leaderboard/LeaderboardSkeleton';
import { useRouter } from 'next/navigation';

const Leaderboard = () => {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('global');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [pageLoading, setPageLoading] = useState(true);
  const [courseId, setCourseId] = useState('');

  // Fetch leaderboard data based on category
  const { data: leaderboardResponse, isLoading: loading, refetch: refetchLeaderboard } = useQuery({
    queryKey: ['leaderboard', activeCategory, selectedFilter, courseId],
    queryFn: async () => {
      let endpoint = '/gamification/leaderboard';
      const params = {
        scope: activeCategory,
        limit: '50'
      };

      if (selectedFilter) {
        if (activeCategory === 'school' || activeCategory === 'region') {
          params.value = selectedFilter;
        } else if (activeCategory === 'city') {
          params.city = selectedFilter;
        }
      }

      if (courseId) {
        params.courseId = courseId;
      }

      // For school/city aggregated leaderboards, use different endpoints
      if (activeCategory === 'school' && !selectedFilter) {
        endpoint = '/gamification/leaderboard/schools';
      } else if (activeCategory === 'city' && !selectedFilter) {
        endpoint = '/gamification/leaderboard/cities';
      }

      const queryString = new URLSearchParams(params).toString();
      const url = endpoint.includes('?') ? `${endpoint}&${queryString}` : `${endpoint}?${queryString}`;
      
      const response = await api.get(url);
      return response.data?.data || [];
    },
    enabled: !pageLoading
  });

  // Transform API data based on category
  const transformLeaderboardData = () => {
    if (!leaderboardResponse) return [];

    if (activeCategory === 'school' && !selectedFilter) {
      // School aggregated data
      return leaderboardResponse.map((school, index) => ({
        id: school.schoolId || school._id,
        rank: index + 1,
        name: school.schoolName || 'Unknown School',
        points: school.totalPoints,
        averagePoints: school.averagePoints,
        studentCount: school.studentCount,
        progress: Math.min((school.totalPoints / 10000) * 100, 100),
        type: 'school'
      }));
    } else if (activeCategory === 'city' && !selectedFilter) {
      // City aggregated data
      return leaderboardResponse.map((city, index) => ({
        id: city.cityId || city._id,
        rank: index + 1,
        name: city.cityName || 'Unknown City',
        points: city.totalPoints,
        averagePoints: city.averagePoints,
        studentCount: city.studentCount,
        progress: Math.min((city.totalPoints / 10000) * 100, 100),
        type: 'city'
      }));
    } else {
      // Individual student data
      return leaderboardResponse.map((user, index) => ({
        id: user.userId,
        rank: user.rank || index + 1,
        name: user.name,
        email: user.email,
        points: activeCategory === 'global' ? user.totalPoints : user.coursePoints || user.totalPoints,
        school: user.school || user.organization,
        city: user.city,
        region: user.region,
        avatar: user.avatar || `/avatars/default.jpg`,
        progress: Math.min((user.totalPoints / 10000) * 100, 100),
        badges: user.badges || [],
        studentCount: user.studentCount,
        type: 'student'
      }));
    }
  };

  const leaderboardData = transformLeaderboardData();

  // Fetch current user's points and rank
  const { data: userData, isLoading: userLoading } = useQuery({
    queryKey: ['myPoints'],
    queryFn: async () => {
      try {
        const response = await api.get('/gamification/me');
        return response.data?.data;
      } catch (error) {
        return null;
      }
    },
    enabled: !pageLoading
  });

  // Fetch available schools for filtering
  const { data: schoolsData } = useQuery({
    queryKey: ['schools-list'],
    queryFn: async () => {
      try {
        const response = await api.get('/gamification/leaderboard/schools?limit=100');
        return response.data?.data || [];
      } catch (error) {
        return [];
      }
    },
    enabled: !pageLoading
  });

  // Fetch available cities for filtering
  const { data: citiesData } = useQuery({
    queryKey: ['cities-list'],
    queryFn: async () => {
      try {
        const response = await api.get('/gamification/leaderboard/cities?limit=100');
        return response.data?.data || [];
      } catch (error) {
        return [];
      }
    },
    enabled: !pageLoading
  });

  // Fetch available regions for filtering
  const { data: regionsData } = useQuery({
    queryKey: ['regions-list'],
    queryFn: async () => {
      try {
        // Get unique regions from leaderboard
        const response = await api.get('/gamification/leaderboard?scope=region&limit=100');
        const users = response.data?.data || [];
        const uniqueRegions = [...new Set(users.map((user) => user.region).filter(Boolean))];
        return uniqueRegions;
      } catch (error) {
        return [];
      }
    },
    enabled: !pageLoading && activeCategory === 'region'
  });

  const categories = [
    { 
      id: 'global', 
      name: 'Global Ranking', 
      icon: FaGlobe, 
      description: 'Top performers worldwide' 
    },
    { 
      id: 'school', 
      name: 'School Ranking', 
      icon: FaUniversity, 
      description: 'Leading educational institutions' 
    },
    { 
      id: 'city', 
      name: 'City Ranking', 
      icon: FaCity, 
      description: 'Performance by cities' 
    },
    // { 
    //   id: 'region', 
    //   name: 'Regional Ranking', 
    //   icon: FaMapMarkerAlt, 
    //   description: 'Performance by regions' 
    // }
  ];

  const badges = {
    gold: { name: 'Gold Medal', color: 'bg-[#FBBF24]', icon: FaMedal },
    silver: { name: 'Silver Medal', color: 'bg-gray-400', icon: FaMedal },
    bronze: { name: 'Bronze Medal', color: 'bg-amber-700', icon: FaMedal },
    speed: { name: 'Speed Star', color: 'bg-[#2563EB]', icon: FaStar },
    streak: { name: 'Streak Master', color: 'bg-orange-500', icon: FaFire },
    knowledge: { name: 'Knowledge King', color: 'bg-purple-500', icon: FaAward },
    creative: { name: 'Creative Mind', color: 'bg-pink-500', icon: FaStar },
    active: { name: 'Most Active', color: 'bg-[#059669]', icon: FaUsers }
  };

  // Calculate user rank from leaderboard data
  const userRank = userData ? {
    rank: 0, // Will be fetched from API
    name: userData.wallet?.user?.name || 'You',
    points: userData.wallet?.totalPoints || 0,
    progress: Math.min((userData.wallet?.totalPoints || 0) / 10000 * 100, 100)
  } : null;

  // Fetch user's actual rank
  const { data: userRankData } = useQuery({
    queryKey: ['userRank', activeCategory, selectedFilter, courseId],
    queryFn: async () => {
      try {
        const response = await api.get('/gamification/rank', {
          params: {
            scope: activeCategory,
            scopeId: selectedFilter,
            courseId: courseId
          }
        });
        return response.data?.data;
      } catch (error) {
        return null;
      }
    },
    enabled: !!userData && !pageLoading
  });

  // Update user rank with actual data
  useEffect(() => {
    if (userRankData && userRank) {
      userRank.rank = userRankData.rank;
      userRank.points = userRankData.totalPoints;
    }
  }, [userRankData, userRank]);

  // Initialize page loading
  useEffect(() => {
    setPageLoading(false);
  }, []);

  const handleRefresh = () => {
    refetchLeaderboard();
  };

  // Reset filter when category changes
  useEffect(() => {
    setSelectedFilter('');
    setCourseId('');
  }, [activeCategory]);

  const getRankColor = (rank) => {
    switch (rank) {
      case 1: return 'from-[#FBBF24] to-amber-500';
      case 2: return 'from-gray-400 to-gray-600';
      case 3: return 'from-amber-700 to-amber-800';
      default: return 'from-[#2563EB] to-[#059669]';
    }
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return <FaCrown className="w-5 h-5" />;
      case 2: return <FaMedal className="w-5 h-5" />;
      case 3: return <FaMedal className="w-5 h-5" />;
      default: return <FaStar className="w-4 h-4" />;
    }
  };

  const formatPoints = (points) => {
    return points.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleRowClick = (item) => {
    if (activeCategory === 'school' && item.type === 'school') {
      // Navigate to school-specific leaderboard
      router.push(`/leaderboard/school/${item.id}`);
    } else if (activeCategory === 'city' && item.type === 'city') {
      // Navigate to city-specific leaderboard
      router.push(`/leaderboard/city/${item.id}`);
    }
  };

  if (pageLoading) {
    return <LeaderboardSkeleton />;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#ECFDF5]">
        <Head>
          <title>Leaderboard - SDG Oasis Rankings</title>
          <meta name="description" content="Track your progress and compete with others in SDG Oasis leaderboard" />
        </Head>

        {/* Hero Section */}
        <LeaderboardHeroSection />
        
        {/* Main Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8">
          {/* User Rank Card */}
          {/* {userRank && <RankCard userRank={userRank} formatPoints={formatPoints} />} */}
          
          {/* Filters Section */}
          <Filters
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            handleRefresh={handleRefresh}
            loading={loading}
            schools={schoolsData || []}
            cities={citiesData || []}
            regions={regionsData || []}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            courseId={courseId}
            setCourseId={setCourseId}
          />
          
          {/* Leaderboard Table */}
          <LeaderboardTable
            activeCategory={activeCategory}
            leaderboardData={leaderboardData}
            getRankColor={getRankColor}
            getRankIcon={getRankIcon}
            formatPoints={formatPoints}
            badges={badges}
            loading={loading}
            onRowClick={handleRowClick}
          />
          
          {/* Info Section */}
          <InfoCard />
        </div>
      </div>
    </>
  );
};

export default Leaderboard;