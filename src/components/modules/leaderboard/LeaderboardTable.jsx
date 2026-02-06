"use client";

import React from "react";
import { FaMapMarkerAlt, FaUniversity, FaCity, FaUsers, FaSchool } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Image from "next/image";

const LeaderboardTable = ({
  leaderboardData,
  activeCategory,
  getRankColor,
  getRankIcon,
  formatPoints,
  badges,
  loading = false,
  onRowClick
}) => {
  const router = useRouter();

  const handleClick = (item) => {
    if (onRowClick) {
      onRowClick(item);
    }
  };

  if (loading) {
    return (
      <section className="bg-white rounded-[1rem] shadow-[0_4px_12px_rgba(0,0,0,0.1)] overflow-hidden border border-gray-100 animate-pulse">
        {/* Loading skeleton */}
      </section>
    );
  }

  if (leaderboardData.length === 0) {
    return (
      <section className="bg-white rounded-[1rem] shadow-[0_4px_12px_rgba(0,0,0,0.1)] overflow-hidden border border-gray-100">
        <div className="p-12 text-center">
          <div className="w-24 h-24 mx-auto bg-[#ECFDF5] rounded-full flex items-center justify-center mb-6">
            <FaUsers className="w-12 h-12 text-[#059669]" />
          </div>
          <h3 className="text-2xl font-bold text-[#064E3B] mb-3">No Data Available</h3>
          <p className="text-[#064E3B] opacity-80">No rankings available for the selected filters.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white rounded-[1rem] shadow-[0_4px_12px_rgba(0,0,0,0.1)] overflow-hidden border border-gray-100 backdrop-opacity-95">
      {/* Table Header */}
      <div className="hidden lg:block bg-gradient-to-r from-[#ECFDF5] to-green-50 px-6 py-4 border-b border-gray-200">
        <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-[#064E3B]">
          <div className="col-span-1 text-center">Rank</div>
          <div className="col-span-4">
            {activeCategory === "school" && !leaderboardData[0]?.schoolName
              ? "School"
              : activeCategory === "city" && !leaderboardData[0]?.cityName
              ? "City"
              : activeCategory === "region"
              ? "Region"
              : "Player"}
          </div>
          <div className="col-span-3 text-center">Points</div>
          <div className="col-span-2 text-center">
            {activeCategory === "school" && !leaderboardData[0]?.schoolName
              ? "Students"
              : activeCategory === "city" && !leaderboardData[0]?.cityName
              ? "Students"
              : activeCategory === "region"
              ? "Schools"
              : "Badges"}
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden bg-gradient-to-r from-[#ECFDF5] to-green-50 px-4 py-3 border-b border-gray-200">
        <div className="text-center">
          <div className="text-sm font-semibold text-[#064E3B]">
            {activeCategory === "school" && !leaderboardData[0]?.schoolName
              ? "School Rankings"
              : activeCategory === "city" && !leaderboardData[0]?.cityName
              ? "City Rankings"
              : activeCategory === "region"
              ? "Regional Rankings"
              : "Player Rankings"}
          </div>
          <div className="text-xs text-[#064E3B] opacity-60 mt-1">
            {leaderboardData.length} entries
          </div>
        </div>
      </div>

      {/* Leaderboard Rows */}
      <div className="divide-y divide-gray-100">
        {leaderboardData.map((item) => {
          const isClickable = (activeCategory === 'school' && item.type === 'school') || 
                             (activeCategory === 'city' && item.type === 'city');
          
          return (
            <div
              key={item.id}
              onClick={() => isClickable && handleClick(item)}
              className={`px-4 sm:px-6 py-4 hover:bg-[#ECFDF5] transition-colors duration-150 ${
                isClickable ? 'cursor-pointer hover:shadow-md' : ''
              }`}
            >
              {/* Mobile View */}
              <div className="block lg:hidden">
                <div className="flex items-center justify-between mb-3">
                  {/* Rank and Avatar */}
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                        item.rank <= 3
                          ? `bg-gradient-to-r ${getRankColor(item.rank)} shadow-lg`
                          : "bg-gray-400"
                      }`}
                    >
                      {item.rank <= 3 ? getRankIcon(item.rank) : item.rank}
                    </div>
                    {item.type === 'student' ? (
                      <div className="w-10 h-10 bg-gradient-to-r from-[#059669] to-[#2563EB] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {item.name.charAt(0)}
                      </div>
                    ) : (
                      <div className="w-10 h-10 bg-gradient-to-r from-[#0f9293] to-[#059669] rounded-full flex items-center justify-center">
                        {item.type === 'school' ? (
                          <FaSchool className="w-5 h-5 text-white" />
                        ) : (
                          <FaCity className="w-5 h-5 text-white" />
                        )}
                      </div>
                    )}
                  </div>

                  {/* Points */}
                  <div className="text-right">
                    <div className="text-xl font-bold text-[#064E3B]">
                      {formatPoints(item.points)}
                    </div>
                    <div className="text-xs text-[#064E3B] opacity-60">points</div>
                  </div>
                </div>

                {/* Name and Info */}
                <div className="mb-3">
                  <div className="font-semibold text-[#064E3B] text-lg mb-1 flex items-center">
                    {item.name}
                    {isClickable && <span className="ml-2 text-xs bg-[#059669] text-white px-2 py-1 rounded-full">View</span>}
                  </div>
                  
                  {item.school && item.type === 'student' && (
                    <div className="text-sm text-[#064E3B] opacity-80 flex items-center space-x-1 mb-1">
                      <FaUniversity className="w-3 h-3" />
                      <span>{item.school}</span>
                    </div>
                  )}
                  
                  {item.city && item.type === 'student' && (
                    <div className="text-sm text-[#064E3B] opacity-80 flex items-center space-x-1 mb-1">
                      <FaCity className="w-3 h-3" />
                      <span>{item.city}</span>
                    </div>
                  )}
                  
                  {item.region && item.type === 'student' && (
                    <div className="text-sm text-[#064E3B] opacity-80 flex items-center space-x-1">
                      <FaMapMarkerAlt className="w-3 h-3" />
                      <span>{item.region}</span>
                    </div>
                  )}

                  {/* Stats for aggregated views */}
                  {(item.type === 'school' || item.type === 'city') && (
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="text-center">
                        <div className="font-semibold text-[#064E3B] text-sm">
                          {item.studentCount}
                        </div>
                        <div className="text-xs text-[#064E3B] opacity-60">
                          students
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-[#064E3B] text-sm">
                          {formatPoints(item.averagePoints)}
                        </div>
                        <div className="text-xs text-[#064E3B] opacity-60">
                          avg points
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Badges or Progress */}
                <div className="flex items-center justify-between">
                  {/* Badges for student view */}
                  {item.type === 'student' && (
                    <div className="flex space-x-1">
                      {item.badges.slice(0, 3).map((badge, index) => {
                        const badgeConfig = badge;
                        if (!badgeConfig) return null;
                        const BadgeIcon = badgeConfig.image;
                        return (
                          <div
                            key={index}
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${badgeConfig.color} tooltip`}
                            title={badgeConfig.title}
                          >
                            <Image width={200} height={200} src={BadgeIcon} alt="badge" />
                          </div>
                        );
                      })}
                      {item.badges.length > 3 && (
                        <div className="w-6 h-6 bg-[#ECFDF5] rounded-full flex items-center justify-center text-[#064E3B] text-xs font-bold">
                          +{item.badges.length - 3}
                        </div>
                      )}
                    </div>
                  )}

                </div>
              </div>

              {/* Desktop View */}
              <div className="hidden lg:grid grid-cols-12 gap-4 items-center">
                {/* Rank */}
                <div className="col-span-1 flex justify-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                      item.rank <= 3
                        ? `bg-gradient-to-r ${getRankColor(item.rank)} shadow-lg`
                        : "bg-gray-400"
                    }`}
                  >
                    {item.rank <= 3 ? getRankIcon(item.rank) : item.rank}
                  </div>
                </div>

                {/* Name & Info */}
                <div className="col-span-4">
                  <div className="flex items-center space-x-3">
                    {item.type === 'student' ? (
                      <div className="w-10 h-10 bg-gradient-to-br from-[#059669] to-[#2563EB] rounded-full flex items-center justify-center text-white font-semibold">
                        {item.name.charAt(0)}
                      </div>
                    ) : (
                      <div className="w-10 h-10 bg-gradient-to-br from-[#0f9293] to-[#059669] rounded-full flex items-center justify-center">
                        {item.type === 'school' ? (
                          <FaSchool className="w-5 h-5 text-white" />
                        ) : (
                          <FaCity className="w-5 h-5 text-white" />
                        )}
                      </div>
                    )}
                    <div>
                      <div className="font-semibold text-[#064E3B] flex items-center">
                        {item.name}
                        {isClickable && (
                          <span className="ml-2 text-xs bg-[#059669] text-white px-2 py-1 rounded-full">View Details</span>
                        )}
                      </div>
                      
                      {/* Student info */}
                      {item.type === 'student' && (
                        <>
                          {item.school && (
                            <div className="text-sm text-[#064E3B] opacity-80 flex items-center space-x-1">
                              <FaUniversity className="w-3 h-3" />
                              <span>{item.school}</span>
                            </div>
                          )}
                          {item.city && (
                            <div className="text-sm text-[#064E3B] opacity-80 flex items-center space-x-1">
                              <FaCity className="w-3 h-3" />
                              <span>{item.city}</span>
                            </div>
                          )}
                        </>
                      )}
                      
                      {/* School/City stats */}
                      {(item.type === 'school' || item.type === 'city') && (
                        <div className="flex items-center space-x-4 mt-1">
                          <div className="text-center">
                            <div className="font-semibold text-[#064E3B] text-sm">
                              {item.studentCount}
                            </div>
                            <div className="text-xs text-[#064E3B] opacity-60">
                              students
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold text-[#064E3B] text-sm">
                              {formatPoints(item.averagePoints)}
                            </div>
                            <div className="text-xs text-[#064E3B] opacity-60">
                              avg points
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Points */}
                <div className="col-span-3 text-center">
                  <div className="text-2xl font-bold text-[#064E3B]">
                    {formatPoints(item.points)}
                  </div>
                  <div className="text-sm text-[#064E3B] opacity-60">points</div>
                </div>

                {/* Badges or Count */}
                <div className="col-span-2 flex justify-center space-x-1">
                  {item.type === 'student' ? (
                    item.badges.slice(0, 3).map((badge, index) => {
                        const badgeConfig = badge;
                        if (!badgeConfig) return null;
                        const BadgeIcon = badgeConfig.image;
                        return (
                          <div
                            key={index}
                            className={`w-16 h-16 rounded-full flex items-center justify-center text-white ${badgeConfig.color} tooltip`}
                            title={badgeConfig.title}
                          >
                            <Image width={300} height={300} src={BadgeIcon} alt="badge" />
                          </div>
                        );
                      })
                  ) : (
                    <div className="text-center">
                      <div className="font-semibold text-[#064E3B]">
                        {item.studentCount}
                      </div>
                      <div className="text-sm text-[#064E3B] opacity-60">
                        students
                      </div>
                    </div>
                  )}
                </div>

                {/* Progress Bar */}
                {/* <div className="col-span-2">
                  {item.progress && (
                    <div className="text-center">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-br from-[#059669] to-[#2563EB] h-2 rounded-full transition-all duration-500"
                          style={{ width: `${item.progress}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-[#064E3B] opacity-60 mt-1">
                        {item.progress}%
                      </div>
                    </div>
                  )}
                </div> */}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default LeaderboardTable;