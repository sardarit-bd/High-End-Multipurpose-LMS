"use client";

import React, { useState, useEffect } from "react";
import {
  FaTrophy,
  FaCrown,
  FaStar,
  FaUniversity,
  FaMapMarkerAlt,
  FaAward,
  FaUsers,
} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/apiClient";

const LeaderboardHeroSection = () => {
  const [stats, setStats] = useState({
    activePlayers: "1,250+",
    schools: "45",
    regions: "5",
    pointsEarned: "2.5M+"
  });

  // Fetch global leaderboard stats
  const { data: leaderboardData } = useQuery({
    queryKey: ['globalStats'],
    queryFn: async () => {
      const response = await api.get('/gamification/leaderboard?scope=global&limit=1000');
      return response.data?.data || [];
    }
  });

  // Fetch schools leaderboard stats
  const { data: schoolsData } = useQuery({
    queryKey: ['schoolsStats'],
    queryFn: async () => {
      const response = await api.get('/gamification/leaderboard/schools?limit=100');
      return response.data?.data || [];
    }
  });

  // Calculate stats from API data
  useEffect(() => {
    if (leaderboardData && schoolsData) {
      const uniqueRegions = new Set();
      let totalPoints = 0;
      
      // Process leaderboard data
      leaderboardData.forEach((user) => {
        if (user.city) {
          uniqueRegions.add(user.city);
        }
        totalPoints += user.totalPoints || 0;
      });

      // Calculate unique schools with data
      const schoolsWithData = schoolsData.filter((school) => 
        school.schoolName && school.totalPoints > 0
      );

      setStats({
        activePlayers: leaderboardData.length.toString(),
        schools: schoolsWithData.length.toString(),
        regions: uniqueRegions.size.toString(),
        pointsEarned: formatPoints(totalPoints)
      });
    }
  }, [leaderboardData, schoolsData]);

  // Helper function to format points
  const formatPoints = (points) => {
    if (points >= 1000000) {
      return `${(points / 1000000).toFixed(1)}M+`;
    } else if (points >= 1000) {
      return `${(points / 1000).toFixed(1)}K+`;
    }
    return points.toString();
  };

  const statItems = [
    { 
      value: stats.activePlayers, 
      label: "Active Players", 
      icon: FaUsers,
      color: "text-[#FBBF24]"
    },
    { 
      value: stats.schools, 
      label: "Schools", 
      icon: FaUniversity,
      color: "text-[#FBBF24]"
    },
    { 
      value: stats.regions, 
      label: "Regions", 
      icon: FaMapMarkerAlt,
      color: "text-[#FBBF24]"
    },
    // { 
    //   value: stats.pointsEarned, 
    //   label: "Points Earned", 
    //   icon: FaAward,
    //   color: "text-[#FBBF24]"
    // },
  ];

  return (
    <section className="relative bg-gradient-to-br from-[#059669] to-[#2563EB] text-white overflow-hidden">
      <div className="absolute inset-0">
        {/* Animated Background Elements */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-white opacity-5 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-48 h-48 bg-white opacity-5 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-white opacity-5 rounded-full animate-ping"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
        <div className="text-center max-w-4xl mx-auto">
          {/* Animated Badge */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-28 h-28 bg-gradient-to-r from-[#0f9293] to-[#059669] rounded-3xl flex items-center justify-center transform rotate-12 shadow-2xl animate-float">
                <FaTrophy className="w-14 h-14 text-white" />
              </div>
              <div className="absolute -top-3 -right-3">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg animate-bounce">
                  <FaCrown className="w-6 h-6 text-[#059669]" />
                </div>
              </div>
              <div className="absolute -bottom-2 -left-2">
                <div className="w-8 h-8 bg-[#FBBF24] rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <FaStar className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white to-[#ECFDF5] bg-clip-text text-transparent leading-tight">
            SDG Rankings
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed mb-8 font-light">
            Compete with global changemakers. Track your impact. Lead the sustainable revolution.
          </p>

          {/* Enhanced Stats Grid - Now Dynamic */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 max-w-2xl mx-auto">
            {statItems.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={index}
                  className="text-center p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 group"
                >
                  <IconComponent className={`w-8 h-8 ${stat.color} mx-auto mb-3 group-hover:scale-110 transition-transform`} />
                  <div className="text-2xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/80 font-medium">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeaderboardHeroSection;