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
import LeaderboardHeroSection from '@/components/modules/leaderboard/LeaderboardHeroSection';
import Filters from '@/components/modules/leaderboard/Filters';
import RankCard from '@/components/modules/leaderboard/RankCard';
import LeaderboardTable from '@/components/modules/leaderboard/LeaderboardTable';
import InfoCard from '@/components/modules/leaderboard/InfoCard';
import LeaderboardSkeleton from '@/components/modules/leaderboard/LeaderboardSkeleton';

const Leaderboard = () => {
  const [activeCategory, setActiveCategory] = useState('global');
  const [activeTimeframe, setActiveTimeframe] = useState('all-time');
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRank, setUserRank] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);

  // Mock data - Firebase theke replace korbe
  const mockLeaderboardData = {
    global: [
      { id: 1, rank: 1, name: "EcoWarrior", points: 12500, school: "Green Valley High", region: "North District", badges: ['gold', 'speed', 'streak'], avatar: "/avatars/1.jpg", progress: 98 },
      { id: 2, rank: 2, name: "ClimateChampion", points: 11800, school: "Sunrise Academy", region: "South District", badges: ['silver', 'knowledge'], avatar: "/avatars/2.jpg", progress: 92 },
      { id: 3, rank: 3, name: "SustainableSam", points: 11200, school: "Eco Future School", region: "East District", badges: ['bronze', 'creative'], avatar: "/avatars/3.jpg", progress: 87 },
      { id: 4, rank: 4, name: "GreenGenius", points: 10500, school: "Green Valley High", region: "North District", badges: ['speed'], avatar: "/avatars/4.jpg", progress: 82 },
      { id: 5, rank: 5, name: "EarthGuardian", points: 9800, school: "Nature College", region: "West District", badges: ['streak'], avatar: "/avatars/5.jpg", progress: 76 },
      { id: 6, rank: 6, name: "OceanProtector", points: 9200, school: "Marine Institute", region: "Coastal District", badges: ['knowledge'], avatar: "/avatars/6.jpg", progress: 72 },
      { id: 7, rank: 7, name: "CleanEnergy", points: 8700, school: "Sunrise Academy", region: "South District", badges: [], avatar: "/avatars/7.jpg", progress: 68 },
      { id: 8, rank: 8, name: "BioDiversity", points: 8100, school: "Eco Future School", region: "East District", badges: ['creative'], avatar: "/avatars/8.jpg", progress: 63 },
      { id: 9, rank: 9, name: "ZeroWaste", points: 7600, school: "Green Valley High", region: "North District", badges: [], avatar: "/avatars/9.jpg", progress: 59 },
      { id: 10, rank: 10, name: "FutureLeader", points: 7200, school: "Nature College", region: "West District", badges: ['speed'], avatar: "/avatars/10.jpg", progress: 56 }
    ],
    school: [
      { id: 1, rank: 1, name: "Green Valley High", points: 35600, students: 45, region: "North District", badges: ['gold', 'active'], avatar: "/schools/1.jpg" },
      { id: 2, rank: 2, name: "Sunrise Academy", points: 29800, students: 38, region: "South District", badges: ['silver'], avatar: "/schools/2.jpg" },
      { id: 3, rank: 3, name: "Eco Future School", points: 26700, students: 32, region: "East District", badges: ['bronze'], avatar: "/schools/3.jpg" },
      { id: 4, rank: 4, name: "Nature College", points: 23400, students: 28, region: "West District", badges: [], avatar: "/schools/4.jpg" },
      { id: 5, rank: 5, name: "Marine Institute", points: 19800, students: 25, region: "Coastal District", badges: [], avatar: "/schools/5.jpg" }
    ],
    regional: [
      { id: 1, rank: 1, name: "North District", points: 89200, schools: 12, participants: 156, badges: ['gold'] },
      { id: 2, rank: 2, name: "South District", points: 76500, schools: 10, participants: 134, badges: ['silver'] },
      { id: 3, rank: 3, name: "East District", points: 69800, schools: 8, participants: 121, badges: ['bronze'] },
      { id: 4, rank: 4, name: "West District", points: 54300, schools: 7, participants: 98, badges: [] },
      { id: 5, rank: 5, name: "Coastal District", points: 43200, schools: 6, participants: 76, badges: [] }
    ]
  };

  const categories = [
    { id: 'global', name: 'Global Ranking', icon: FaGlobe, description: 'Top performers worldwide' },
    { id: 'school', name: 'School Ranking', icon: FaUniversity, description: 'Leading educational institutions' },
    { id: 'regional', name: 'Regional Ranking', icon: FaMapMarkerAlt, description: 'Performance by districts' }
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

  useEffect(() => {
    setTimeout(() => {
      setLeaderboardData(mockLeaderboardData[activeCategory]);
      setUserRank({ rank: 15, name: "YourProfile", points: 6500, progress: 50 });
      setLoading(false);
      setPageLoading(false);
    });
  }, [activeCategory]);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

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