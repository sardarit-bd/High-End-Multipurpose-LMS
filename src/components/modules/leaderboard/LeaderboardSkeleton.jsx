"use client";

import React from 'react';

const LeaderboardSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#ECFDF5] animate-pulse">
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
      <section className="relative bg-gradient-to-br from-[#059669] to-[#2563EB] text-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <div className="text-center max-w-4xl mx-auto">
            {/* Animated Badge Skeleton */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-28 h-28 bg-white/20 rounded-3xl"></div>
              </div>
            </div>

            {/* Title Skeleton */}
            <div className="h-12 bg-white/30 rounded w-64 mx-auto mb-6"></div>
            
            {/* Description Skeleton */}
            <div className="h-6 bg-white/30 rounded w-2/3 mx-auto mb-8"></div>

            {/* Stats Grid Skeleton */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-2xl mx-auto">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="text-center p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20">
                  <div className="w-8 h-8 bg-white/30 rounded-full mx-auto mb-3"></div>
                  <div className="h-6 bg-white/30 rounded w-20 mx-auto mb-2"></div>
                  <div className="h-4 bg-white/30 rounded w-16 mx-auto"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Skeleton */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8">
        {/* User Rank Card Skeleton */}
        <div className="my-8 bg-gradient-to-br from-[#059669] to-[#2563EB] rounded-3xl p-6 text-white shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/30 rounded-2xl"></div>
              <div>
                <div className="h-6 bg-white/30 rounded w-32 mb-2"></div>
                <div className="h-4 bg-white/30 rounded w-48"></div>
              </div>
            </div>
            <div className="text-right">
              <div className="h-8 bg-white/30 rounded w-16 mx-auto mb-2"></div>
              <div className="h-4 bg-white/30 rounded w-20"></div>
            </div>
          </div>
          <div className="mt-4 w-full bg-white/30 rounded-full h-2"></div>
        </div>

        {/* Filters Section Skeleton */}
        <div className="bg-white rounded-[1rem] shadow-[0_4px_12px_rgba(0,0,0,0.1)] p-8 border border-gray-100 mb-8">
          {/* Header Skeleton */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
            <div className="flex-1">
              <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-64"></div>
            </div>
            <div className="h-10 bg-gray-200 rounded-xl w-32"></div>
          </div>

          {/* Category Tabs Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="p-4 rounded-2xl border-2 border-gray-200 bg-white">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-32"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Filter Select Skeleton */}
          <div className="mb-6">
            <div className="h-4 bg-gray-200 rounded w-32 mb-3"></div>
            <div className="h-10 bg-gray-200 rounded-xl w-full max-w-md"></div>
          </div>

          {/* Course Filter Skeleton */}
          <div className="mb-6">
            <div className="h-4 bg-gray-200 rounded w-32 mb-3"></div>
            <div className="flex items-center gap-4">
              <div className="h-10 bg-gray-200 rounded-xl flex-1 max-w-md"></div>
              <div className="h-10 bg-gray-200 rounded-xl w-20"></div>
            </div>
          </div>
        </div>

        {/* Leaderboard Table Skeleton */}
        <div className="bg-white rounded-[1rem] shadow-[0_4px_12px_rgba(0,0,0,0.1)] overflow-hidden border border-gray-100">
          {/* Table Header Skeleton */}
          <div className="hidden lg:block bg-gradient-to-r from-[#ECFDF5] to-green-50 px-6 py-4 border-b border-gray-200">
            <div className="grid grid-cols-12 gap-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="col-span-2 h-4 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>

          {/* Mobile Header Skeleton */}
          <div className="lg:hidden bg-gradient-to-r from-[#ECFDF5] to-green-50 px-4 py-3 border-b border-gray-200">
            <div className="text-center">
              <div className="h-4 bg-gray-200 rounded w-48 mx-auto mb-1"></div>
              <div className="h-3 bg-gray-200 rounded w-32 mx-auto"></div>
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
                      <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                      <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    </div>
                    <div className="text-right">
                      <div className="h-6 bg-gray-200 rounded w-16 mb-1"></div>
                      <div className="h-4 bg-gray-200 rounded w-12"></div>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-24 mb-1"></div>
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-1">
                      {[1, 2, 3].map((badge) => (
                        <div key={badge} className="w-6 h-6 bg-gray-200 rounded-full"></div>
                      ))}
                    </div>
                    <div className="w-20">
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-1"></div>
                      <div className="h-4 bg-gray-200 rounded w-8"></div>
                    </div>
                  </div>
                </div>

                {/* Desktop View Skeleton */}
                <div className="hidden lg:grid grid-cols-12 gap-4 items-center">
                  {/* Rank */}
                  <div className="col-span-1 flex justify-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  </div>
                  
                  {/* Name & Info */}
                  <div className="col-span-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                      <div>
                        <div className="h-6 bg-gray-200 rounded w-32 mb-1"></div>
                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Points */}
                  <div className="col-span-3 text-center">
                    <div className="h-8 bg-gray-200 rounded w-20 mx-auto mb-1"></div>
                    <div className="h-4 bg-gray-200 rounded w-16 mx-auto"></div>
                  </div>
                  
                  {/* Badges */}
                  <div className="col-span-2 flex justify-center">
                    <div className="flex space-x-1">
                      {[1, 2, 3].map((badge) => (
                        <div key={badge} className="w-8 h-8 bg-gray-200 rounded-full"></div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Progress */}
                  <div className="col-span-2">
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-1"></div>
                    <div className="h-4 bg-gray-200 rounded w-8 mx-auto"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info Card Skeleton */}
        <div className="mt-8 bg-white rounded-[1rem] shadow-[0_4px_12px_rgba(0,0,0,0.1)] p-8 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div>
              <div className="h-8 bg-gray-200 rounded w-48 mb-4"></div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-40"></div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-36"></div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-44"></div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-38"></div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div>
              <div className="h-8 bg-gray-200 rounded w-48 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
              <div className="flex space-x-3">
                <div className="h-10 bg-gray-200 rounded-xl w-32"></div>
                <div className="h-10 bg-gray-200 rounded-xl w-28"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardSkeleton;