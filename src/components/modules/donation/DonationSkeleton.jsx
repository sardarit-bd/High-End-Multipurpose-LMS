"use client";

import React from 'react';

const DonationSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 animate-pulse">
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

      {/* Header Section Skeleton */}
      <section className="relative bg-gradient-to-r from-slate-900 via-blue-900 to-emerald-900 text-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 py-20 relative">
          <div className="text-center">
            {/* Icon Skeleton */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gray-600 rounded-2xl"></div>
            </div>

            {/* Title Skeleton */}
            <div className="h-12 bg-gray-600 rounded w-96 mx-auto mb-6"></div>
            
            {/* Description Skeleton */}
            <div className="h-6 bg-gray-600 rounded w-2/3 mx-auto mb-12"></div>

            {/* Stats Skeleton */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              {[1, 2, 3].map((item) => (
                <div key={item} className="text-center p-6 bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl border border-white border-opacity-20">
                  <div className="h-8 bg-gray-600 rounded w-24 mx-auto mb-2"></div>
                  <div className="h-4 bg-gray-600 rounded w-20 mx-auto"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Skeleton */}
      <div className="container mx-auto px-4 sm:px-6 py-16 -mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Fund Selection Sidebar Skeleton */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl shadow-2xl p-8 sticky top-6 border border-gray-100">
              {/* Sidebar Header Skeleton */}
              <div className="flex items-center mb-8">
                <div className="w-8 h-8 bg-gray-300 rounded mr-3"></div>
                <div className="h-8 bg-gray-300 rounded w-40"></div>
              </div>

              {/* Fund Options Skeleton */}
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="w-full p-6 rounded-2xl border-2 border-gray-200 bg-white">
                    <div className="flex items-start space-x-4">
                      <div className="w-14 h-14 bg-gray-300 rounded-xl flex-shrink-0"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="h-6 bg-gray-300 rounded w-32"></div>
                          <div className="w-5 h-5 bg-gray-300 rounded"></div>
                        </div>
                        <div className="h-4 bg-gray-300 rounded w-full mb-3"></div>
                        <div className="flex items-center justify-between gap-2">
                          <div className="h-6 bg-gray-300 rounded w-20"></div>
                          <div className="h-4 bg-gray-300 rounded w-24"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Donation Form Skeleton */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
              {/* Selected Fund Header Skeleton */}
              <div className="bg-gradient-to-r from-gray-400 to-gray-500 p-8 text-white relative overflow-hidden">
                <div className="relative flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-600 rounded-2xl"></div>
                  <div className="flex-1">
                    <div className="h-8 bg-gray-600 rounded w-64 mb-2"></div>
                    <div className="h-4 bg-gray-600 rounded w-full"></div>
                  </div>
                  <div className="w-20 h-8 bg-gray-600 rounded-full"></div>
                </div>
              </div>

              {/* Donation Form Skeleton */}
              <div className="p-8">
                {/* Amount Selection Skeleton */}
                <div className="mb-8">
                  <div className="flex items-center mb-6">
                    <div className="w-6 h-6 bg-gray-300 rounded mr-3"></div>
                    <div className="h-6 bg-gray-300 rounded w-48"></div>
                  </div>

                  {/* Quick Amount Options Skeleton */}
                  <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                    {[1, 2, 3, 4, 5].map((item) => (
                      <div key={item} className="p-4 rounded-2xl border-2 border-gray-200 bg-gray-50">
                        <div className="h-6 bg-gray-300 rounded w-12 mx-auto"></div>
                      </div>
                    ))}
                  </div>

                  {/* Custom Amount Skeleton */}
                  <div className="mt-6">
                    <div className="h-6 bg-gray-300 rounded w-48 mb-3"></div>
                    <div className="h-12 bg-gray-300 rounded-2xl w-full"></div>
                  </div>
                </div>

                {/* Impact Examples Skeleton */}
                <div className="mb-8 p-6 bg-gray-100 rounded-2xl border border-gray-200">
                  <div className="flex items-center mb-4">
                    <div className="w-5 h-5 bg-gray-400 rounded mr-2"></div>
                    <div className="h-6 bg-gray-400 rounded w-40"></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((item) => (
                      <div key={item} className="flex items-center space-x-3 p-3 bg-white rounded-xl border border-gray-200">
                        <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                        <div className="h-4 bg-gray-400 rounded w-32"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Security Info Skeleton */}
                <div className="mb-8 p-6 bg-gray-100 rounded-2xl border border-gray-200">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-6 h-6 bg-gray-400 rounded"></div>
                    <div className="h-6 bg-gray-400 rounded w-40"></div>
                  </div>
                  <div className="h-4 bg-gray-400 rounded w-full"></div>
                </div>

                {/* Donate Button Skeleton */}
                <div className="h-16 bg-gray-300 rounded-2xl w-full mb-8"></div>

                {/* Trust Badges Skeleton */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="h-8 bg-gray-300 rounded-full w-24"></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Additional Info Skeleton */}
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
      </div>
    </div>
  );
};

export default DonationSkeleton;