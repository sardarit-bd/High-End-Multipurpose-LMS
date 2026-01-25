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
  FaChartLine
} from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/apiClient';
import LeaderboardHeroSection from '@/components/modules/leaderboard/LeaderboardHeroSection';
import Filters from '@/components/modules/leaderboard/Filters';
import RankCard from '@/components/modules/leaderboard/RankCard';
import LeaderboardTable from '@/components/modules/leaderboard/LeaderboardTable';
import InfoCard from '@/components/modules/leaderboard/InfoCard';
import LeaderboardSkeleton from '@/components/modules/leaderboard/LeaderboardSkeleton';

const Leaderboard = () => {
  const [activeCategory, setActiveCategory] = useState('global');
  const [activeTimeframe, setActiveTimeframe] = useState('all-time');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [pageLoading, setPageLoading] = useState(true);

  // Fetch leaderboard data
  const { data: leaderboardResponse, isLoading: loading, refetch: refetchLeaderboard } = useQuery({
    queryKey: ['leaderboard', activeCategory, selectedFilter],
    queryFn: async () => {
      const params = new URLSearchParams({
        scope: activeCategory,
        limit: '50'
      });

      if (selectedFilter) {
        params.append('value', selectedFilter);
      }

      const response = await api.get(`/gamification/leaderboard?${params}`);
      return response.data?.data || [];
    },
    enabled: !pageLoading
  });

  // Transform API data to match component expectations
  const leaderboardData = leaderboardResponse?.map((user, index) => ({
    id: user.userId,
    rank: index + 1,
    name: user.name,
    points: activeCategory === 'global' ? user.totalPoints :
            user[activeCategory === 'school' ? 'coursePoints' : 'coursePoints'] || user.totalPoints,
    school: user.organization,
    region: user.region,
    badges: [], // TODO: Add badge logic later
    avatar: user.avatar || `/avatars/default.jpg`,
    progress: Math.min((user.totalPoints / 10000) * 100, 100), // Example progress calculation
    // For school/regional views
    ...(activeCategory === 'school' && {
      students: Math.floor(Math.random() * 50) + 20, // Mock data - replace with real data
    }),
    ...(activeCategory === 'region' && {
      schools: Math.floor(Math.random() * 15) + 5,
      participants: Math.floor(Math.random() * 200) + 50,
    })
  })) || [];

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

  // Fetch available schools and regions for filtering
  const { data: schoolsData } = useQuery({
    queryKey: ['schools-list'],
    queryFn: async () => {
      try {
        // Get unique schools from users
        const response = await api.get('/users?role=STUDENT&limit=1000');
        const users = response.data?.data || [];
        const uniqueSchools = [...new Set(users.map(user => user.organization).filter(Boolean))];
        return uniqueSchools;
      } catch (error) {
        return [];
      }
    },
    enabled: !pageLoading
  });

  const { data: regionsData } = useQuery({
    queryKey: ['regions-list'],
    queryFn: async () => {
      try {
        // Get unique regions from users
        const response = await api.get('/users?role=STUDENT&limit=1000');
        const users = response.data?.data || [];
        const uniqueRegions = [...new Set(users.map(user => user.region).filter(Boolean))];
        return uniqueRegions;
      } catch (error) {
        return [];
      }
    },
    enabled: !pageLoading
  });

  const schools = activeCategory === 'school' ? (schoolsData || []) : [];
  const regions = activeCategory === 'region' ? (regionsData || []) : [];

  const categories = [
    { id: 'global', name: 'Global Ranking', icon: FaGlobe, description: 'Top performers worldwide' },
    { id: 'school', name: 'School Ranking', icon: FaUniversity, description: 'Leading educational institutions' },
    { id: 'region', name: 'Regional Ranking', icon: FaMapMarkerAlt, description: 'Performance by regions' }
  ];

  const timeframes = [
    { id: 'all-time', name: 'All Time', icon: FaTrophy },
    { id: 'monthly', name: 'This Month', icon: FaCalendarAlt },
    { id: 'weekly', name: 'This Week', icon: FaFire }
  ];

  const badges = {
    gold: { name: 'Gold Medal', color: 'bg-yellow-500', icon: FaMedal },
    silver: { name: 'Silver Medal', color: 'bg-gray-400', icon: FaMedal },
    bronze: { name: 'Bronze Medal', color: 'bg-amber-700', icon: FaMedal },
    speed: { name: 'Speed Star', color: 'bg-blue-500', icon: FaStar },
    streak: { name: 'Streak Master', color: 'bg-orange-500', icon: FaFire },
    knowledge: { name: 'Knowledge King', color: 'bg-purple-500', icon: FaAward },
    creative: { name: 'Creative Mind', color: 'bg-pink-500', icon: FaStar },
    active: { name: 'Most Active', color: 'bg-green-500', icon: FaUsers }
  };

  // Calculate user rank from leaderboard data
  const userRank = userData && leaderboardData ? (() => {
    const userIndex = leaderboardData.findIndex(user => user.userId === userData.wallet?.user?.toString());
    if (userIndex >= 0) {
      return {
        rank: userIndex + 1,
        name: userData.wallet?.user?.name || 'You',
        points: activeCategory === 'global' ? userData.wallet?.totalPoints || 0 :
                userData.wallet?.byCourse?.[selectedFilter] || 0,
        progress: Math.min((userData.wallet?.totalPoints || 0) / 10000 * 100, 100) // Example progress calculation
      };
    }
    return null;
  })() : null;

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
  }, [activeCategory]);

  const getRankColor = (rank) => {
    switch (rank) {
      case 1: return 'from-yellow-400 to-amber-500';
      case 2: return 'from-gray-400 to-gray-600';
      case 3: return 'from-amber-700 to-amber-800';
      default: return 'from-blue-400 to-purple-500';
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

  if (pageLoading) {
    return <LeaderboardSkeleton />;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
        <Head>
          <title>Leaderboard - SDG Oasis Rankings</title>
          <meta name="description" content="Track your progress and compete with others in SDG Oasis leaderboard" />
        </Head>

        {/* Hero Section - Updated Gradient */}
        <LeaderboardHeroSection />
        {/* Main Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8">
          {/* User Rank Card */}
          <RankCard userRank={userRank} formatPoints={formatPoints} />
          {/* Filters Section */}
          <Filters
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            timeframes={timeframes}
            activeTimeframe={activeTimeframe}
            setActiveTimeframe={setActiveTimeframe}
            handleRefresh={handleRefresh}
            loading={loading}
            schools={schools || []}
            regions={regions || []}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
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
          />
          {/* Info Section */}
          <InfoCard/>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(12deg); }
          50% { transform: translateY(-10px) rotate(12deg); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default Leaderboard;