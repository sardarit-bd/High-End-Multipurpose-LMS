"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Head from 'next/head';
import Navbar from '@/components/modules/headers/Navbar';
import { FaArrowLeft, FaCity, FaUsers, FaTrophy, FaUniversity, FaAward } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/apiClient';
import LeaderboardTable from '@/components/modules/leaderboard/LeaderboardTable';
import LeaderboardSkeleton from '@/components/modules/leaderboard/LeaderboardSkeleton';

const CityLeaderboardPage = () => {
  const params = useParams();
  const router = useRouter();
  const cityId = params.id;
  const [cityDetails, setCityDetails] = useState(null);

  // Fetch city details
  const { data: cityData } = useQuery({
    queryKey: ['cityDetails', cityId],
    queryFn: async () => {
      const response = await api.get(`/gamification/leaderboard/cities?cityId=${cityId}`);
      return response.data?.data[0] || null;
    }
  });

  // Fetch students in this city
  const { data: studentsData, isLoading } = useQuery({
    queryKey: ['cityStudents', cityId],
    queryFn: async () => {
      const response = await api.get(`/gamification/leaderboard?cityId=${cityId}&limit=50`);
      return response.data?.data || [];
    }
  });

  useEffect(() => {
    if (cityData) {
      setCityDetails(cityData);
    }
  }, [cityData]);

  const transformStudentData = () => {
    if (!studentsData) return [];
    
    return studentsData.map((student, index) => ({
      id: student.userId,
      rank: index + 1,
      name: student.name,
      email: student.email,
      points: student.totalPoints,
      school: student.organization,
      city: student.city,
      region: student.region,
      progress: Math.min((student.totalPoints / 10000) * 100, 100),
      badges: student?.badges || [],
      type: 'student'
    }));
  };

  const studentData = transformStudentData();

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
      case 1: return <FaTrophy className="w-5 h-5" />;
      case 2: return <FaAward className="w-5 h-5" />;
      case 3: return <FaAward className="w-5 h-5" />;
      default: return <FaAward className="w-4 h-4" />;
    }
  };

  const formatPoints = (points) => {
    return points.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  if (isLoading) {
    return <LeaderboardSkeleton />;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#ECFDF5]">
        <Head>
          <title>{cityDetails?.cityName || 'City'} Leaderboard - SDG Oasis</title>
        </Head>

        {/* Header */}
        <div className="bg-gradient-to-r from-[#0f9293] to-[#2563EB] text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <button
              onClick={() => router.back()}
              className="flex items-center space-x-2 text-white hover:text-[#ECFDF5] mb-6 transition-colors"
            >
              <FaArrowLeft className="w-4 h-4" />
              <span>Back to Leaderboard</span>
            </button>
            
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <FaCity className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">
                  {cityDetails?.cityName || 'City'} Leaderboard
                </h1>
                <p className="text-white/80">Student rankings within this city</p>
              </div>
            </div>

            {/* City Stats */}
            {cityDetails && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center space-x-3">
                    <FaUsers className="w-8 h-8 text-white/80" />
                    <div>
                      <div className="text-2xl font-bold">{cityDetails.studentCount}</div>
                      <div className="text-white/80">Total Students</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center space-x-3">
                    <FaUniversity className="w-8 h-8 text-white/80" />
                    <div>
                      <div className="text-2xl font-bold">{cityDetails.totalPoints}</div>
                      <div className="text-white/80">Total Points</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center space-x-3">
                    <FaAward className="w-8 h-8 text-white/80" />
                    <div>
                      <div className="text-2xl font-bold">{formatPoints(cityDetails.averagePoints)}</div>
                      <div className="text-white/80">Average Points</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-[1rem] shadow-[0_4px_12px_rgba(0,0,0,0.1)] p-8 mb-8">
            <h2 className="text-2xl font-bold text-[#064E3B] mb-6 flex items-center">
              <FaTrophy className="w-6 h-6 text-[#059669] mr-3" />
              Student Rankings
            </h2>
            
            {studentData.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto bg-[#ECFDF5] rounded-full flex items-center justify-center mb-6">
                  <FaUsers className="w-12 h-12 text-[#059669]" />
                </div>
                <h3 className="text-xl font-bold text-[#064E3B] mb-3">No Students Found</h3>
                <p className="text-[#064E3B] opacity-80">No student data available for this city.</p>
              </div>
            ) : (
              <LeaderboardTable
                activeCategory="global"
                leaderboardData={studentData}
                getRankColor={getRankColor}
                getRankIcon={getRankIcon}
                formatPoints={formatPoints}
                badges={{}}
                loading={false}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CityLeaderboardPage;