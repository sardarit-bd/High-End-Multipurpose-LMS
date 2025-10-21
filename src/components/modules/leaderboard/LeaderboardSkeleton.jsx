"use client";

import React from 'react';

const LeaderboardSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 animate-pulse">
      {/* Navbar Skeleton */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="h-8 bg-gray-300 rounded w-32"></div>
            <div className="hidden md:flex items-center space-x-8">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="h-4 bg-gray-300 rounded w-16"></div>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
              <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section Skeleton */}
      <section className="relative bg-gradient-to-br from-blue-500 to-purple-600 text-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <div className="text-center max-w-4xl mx-auto">
            {/* Animated Badge Skeleton */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-28 h-28 bg-gray-600 rounded-3xl"></div>
              </div>
            </div>

            {/* Title Skeleton */}
            <div className="h-12 bg-gray-600 rounded w-64 mx-auto mb-6"></div>
            
            {/* Description Skeleton */}
            <div className="h-6 bg-gray-600 rounded w-2/3 mx-auto mb-8"></div>

            {/* Stats Grid Skeleton */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-2xl mx-auto">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="text-center p-6 bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl border border-white border-opacity-20">
                  <div className="w-8 h-8 bg-gray-600 rounded-full mx-auto mb-3"></div>
                  <div className="h-6 bg-gray-600 rounded w-20 mx-auto mb-2"></div>
                  <div className="h-4 bg-gray-600 rounded w-16 mx-auto"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Skeleton */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8">
        {/* User Rank Card Skeleton */}
        <div className="my-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-6 text-white shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-600 rounded-2xl"></div>
              <div>
                <div className="h-6 bg-gray-600 rounded w-32 mb-2"></div>
                <div className="h-4 bg-gray-600 rounded w-48"></div>
              </div>
            </div>
            <div className="text-right">
              <div className="h-8 bg-gray-600 rounded w-16 mx-auto mb-2"></div>
              <div className="h-4 bg-gray-600 rounded w-20"></div>
            </div>
          </div>
          <div className="mt-4 w-full bg-gray-600 rounded-full h-2"></div>
        </div>

        {/* Filters Section Skeleton */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Category Filters Skeleton */}
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3].map((item) => (
                <div key={item} className="h-12 bg-gray-300 rounded-full w-32"></div>
              ))}
            </div>
            
            {/* Timeframe Filters Skeleton */}
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3].map((item) => (
                <div key={item} className="h-12 bg-gray-300 rounded-full w-24"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Leaderboard Table Skeleton */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Table Header Skeleton */}
          <div className="hidden lg:block bg-gradient-to-r from-gray-50 to-green-50 px-6 py-4 border-b border-gray-200">
            <div className="grid grid-cols-12 gap-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="col-span-2 h-4 bg-gray-300 rounded"></div>
              ))}
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
        </div>

        {/* Info Card Skeleton */}
        <div className="mt-8 bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
          <div className="h-8 bg-gray-300 rounded w-64 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="text-center">
                <div className="w-16 h-16 bg-gray-300 rounded-2xl mx-auto mb-4"></div>
                <div className="h-6 bg-gray-300 rounded w-32 mx-auto mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-24 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardSkeleton;