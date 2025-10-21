"use client";

import React from "react";
import { FaMapMarkerAlt, FaUniversity } from "react-icons/fa";

const LeaderboardTable = ({
  leaderboardData,
  activeCategory,
  getRankColor,
  getRankIcon,
  formatPoints,
  badges,
  loading = false
}) => {
  
  if (loading) {
    return (
      <section className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 animate-pulse">
        {/* Table Header Skeleton */}
        <div className="hidden lg:block bg-gradient-to-r from-gray-50 to-green-50 px-6 py-4 border-b border-gray-200">
          <div className="grid grid-cols-12 gap-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="col-span-2 h-4 bg-gray-300 rounded"></div>
            ))}
          </div>
        </div>

        {/* Mobile Header Skeleton */}
        <div className="lg:hidden bg-gradient-to-r from-gray-50 to-green-50 px-4 py-3 border-b border-gray-200">
          <div className="text-center">
            <div className="h-4 bg-gray-300 rounded w-48 mx-auto mb-1"></div>
            <div className="h-3 bg-gray-300 rounded w-32 mx-auto"></div>
          </div>
        </div>

        {/* Leaderboard Rows Skeleton */}
        <div className="divide-y divide-gray-100">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
            <div key={item} className="px-4 sm:px-6 py-4">
              {/* Mobile View Skeleton */}
              <div className="block lg:hidden">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                  </div>
                  <div className="text-right">
                    <div className="h-6 bg-gray-300 rounded w-16 mb-1"></div>
                    <div className="h-4 bg-gray-300 rounded w-12"></div>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="h-6 bg-gray-300 rounded w-32 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-24 mb-1"></div>
                  <div className="h-4 bg-gray-300 rounded w-20"></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex space-x-1">
                    {[1, 2, 3].map((badge) => (
                      <div key={badge} className="w-6 h-6 bg-gray-300 rounded-full"></div>
                    ))}
                  </div>
                  <div className="w-20">
                    <div className="w-full bg-gray-300 rounded-full h-2 mb-1"></div>
                    <div className="h-4 bg-gray-300 rounded w-8"></div>
                  </div>
                </div>
              </div>

              {/* Desktop View Skeleton */}
              <div className="hidden lg:grid grid-cols-12 gap-4 items-center">
                <div className="col-span-1 flex justify-center">
                  <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                </div>
                
                <div className="col-span-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                    <div>
                      <div className="h-6 bg-gray-300 rounded w-32 mb-1"></div>
                      <div className="h-4 bg-gray-300 rounded w-24"></div>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-3 text-center">
                  <div className="h-8 bg-gray-300 rounded w-20 mx-auto mb-1"></div>
                  <div className="h-4 bg-gray-300 rounded w-16 mx-auto"></div>
                </div>
                
                <div className="col-span-2 flex justify-center">
                  <div className="flex space-x-1">
                    {[1, 2, 3].map((badge) => (
                      <div key={badge} className="w-8 h-8 bg-gray-300 rounded-full"></div>
                    ))}
                  </div>
                </div>
                
                <div className="col-span-2">
                  <div className="w-full bg-gray-300 rounded-full h-2 mb-1"></div>
                  <div className="h-4 bg-gray-300 rounded w-8 mx-auto"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
      {/* Your existing LeaderboardTable content */}
      {/* Table Header */}
      <div className="hidden lg:block bg-gradient-to-r from-gray-50 to-green-50 px-6 py-4 border-b border-gray-200">
        <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-gray-700">
          <div className="col-span-1 text-center">Rank</div>
          <div className="col-span-4">
            {activeCategory === "school"
              ? "School"
              : activeCategory === "regional"
              ? "Region"
              : "Player"}
          </div>
          <div className="col-span-3 text-center">Points</div>
          <div className="col-span-2 text-center">
            {activeCategory === "school"
              ? "Students"
              : activeCategory === "regional"
              ? "Schools"
              : "Badges"}
          </div>
          <div className="col-span-2 text-center">Progress</div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden bg-gradient-to-r from-gray-50 to-green-50 px-4 py-3 border-b border-gray-200">
        <div className="text-center">
          <div className="text-sm font-semibold text-gray-700">
            {activeCategory === "school"
              ? "School Rankings"
              : activeCategory === "regional"
              ? "Regional Rankings"
              : "Player Rankings"}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Swipe to see more details
          </div>
        </div>
      </div>

      {/* Leaderboard Rows */}
      <div className="divide-y divide-gray-100">
        {leaderboardData.map((item) => (
          <div
            key={item.id}
            className="px-4 sm:px-6 py-4 hover:bg-gray-50 transition-colors duration-150"
          >
            {/* Your existing row content */}
            {/* Mobile View */}
            <div className="block lg:hidden">
              <div className="flex items-center justify-between mb-3">
                {/* Rank and Avatar */}
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                      item.rank <= 3
                        ? `bg-gradient-to-r ${getRankColor(
                            item.rank
                          )} shadow-lg`
                        : "bg-gray-400"
                    }`}
                  >
                    {item.rank <= 3 ? getRankIcon(item.rank) : item.rank}
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-r from-green-300 to-blue-300 rounded-full flex items-center justify-center gap-3 text-white font-semibold text-sm">
                    {item.name.charAt(0)}
                  </div>
                </div>

                {/* Points - Mobile */}
                <div className="text-right">
                  <div className="text-xl font-bold text-gray-900">
                    {formatPoints(item.points)}
                  </div>
                  <div className="text-xs text-gray-500">points</div>
                </div>
              </div>

              {/* Name and Info */}
              <div className="mb-3">
                <div className="font-semibold text-gray-900 text-lg mb-1">
                  {item.name}
                </div>
                {item.school && (
                  <div className="text-sm text-gray-500 flex items-center space-x-1 mb-1">
                    <FaUniversity className="w-3 h-3" />
                    <span>{item.school}</span>
                  </div>
                )}
                {item.region && (
                  <div className="text-sm text-gray-500 flex items-center space-x-1">
                    <FaMapMarkerAlt className="w-3 h-3" />
                    <span>{item.region}</span>
                  </div>
                )}
              </div>

              {/* Badges and Progress - Mobile */}
              <div className="flex items-center justify-between">
                {/* Badges */}
                <div className="flex space-x-1">
                  {activeCategory === "global" ? (
                    item.badges.slice(0, 3).map((badge, index) => {
                      const badgeConfig = badges[badge];
                      const BadgeIcon = badgeConfig.icon;
                      return (
                        <div
                          key={index}
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${badgeConfig.color} tooltip`}
                          title={badgeConfig.name}
                        >
                          <BadgeIcon className="w-2 h-2" />
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center">
                      <div className="font-semibold text-gray-900 text-sm">
                        {item.students || item.schools || item.participants}
                      </div>
                      <div className="text-xs text-gray-500">
                        {item.students
                          ? "students"
                          : item.schools
                          ? "schools"
                          : "participants"}
                      </div>
                    </div>
                  )}
                  {activeCategory === "global" && item.badges.length > 3 && (
                    <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-xs font-bold">
                      +{item.badges.length - 3}
                    </div>
                  )}
                </div>

                {/* Progress Bar - Mobile */}
                {item.progress && (
                  <div className="flex-1 max-w-[120px]">
                    <div className="text-center">
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                        <div
                          className="bg-gradient-to-br from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${item.progress}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500">
                        {item.progress}%
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Desktop View - Grid Layout */}
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
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {item.name}
                    </div>
                    {item.school && (
                      <div className="text-sm text-gray-500 flex items-center space-x-1">
                        <FaUniversity className="w-3 h-3" />
                        <span>{item.school}</span>
                      </div>
                    )}
                    {item.region && (
                      <div className="text-sm text-gray-500 flex items-center space-x-1">
                        <FaMapMarkerAlt className="w-3 h-3" />
                        <span>{item.region}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Points */}
              <div className="col-span-3 text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {formatPoints(item.points)}
                </div>
                <div className="text-sm text-gray-500">points</div>
              </div>

              {/* Badges or Count */}
              <div className="col-span-2 flex justify-center space-x-1">
                {activeCategory === "global" ? (
                  item.badges.map((badge, index) => {
                    const badgeConfig = badges[badge];
                    const BadgeIcon = badgeConfig.icon;
                    return (
                      <div
                        key={index}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${badgeConfig.color} tooltip`}
                        title={badgeConfig.name}
                      >
                        <BadgeIcon className="w-3 h-3" />
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center">
                    <div className="font-semibold text-gray-900">
                      {item.students || item.schools || item.participants}
                    </div>
                    <div className="text-sm text-gray-500">
                      {item.students
                        ? "students"
                        : item.schools
                        ? "schools"
                        : "participants"}
                    </div>
                  </div>
                )}
              </div>

              {/* Progress Bar */}
              <div className="col-span-2">
                {item.progress && (
                  <div className="text-center">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-br from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {item.progress}%
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LeaderboardTable;