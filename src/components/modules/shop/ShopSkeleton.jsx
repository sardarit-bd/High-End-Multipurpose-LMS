"use client";

import React from 'react';

const ShopSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Navbar Skeleton */}
      <nav className="bg-white shadow-sm border-b border-gray-200 animate-pulse">
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
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-16 animate-pulse">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="h-6 bg-gray-300 rounded w-48 mx-auto mb-4"></div>
            <div className="h-12 bg-gray-300 rounded w-3/4 mx-auto mb-6"></div>
            <div className="h-6 bg-gray-300 rounded w-2/3 mx-auto mb-8"></div>
            
            {/* Search Bar Skeleton */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="h-14 bg-gray-300 rounded-full w-full"></div>
            </div>

            {/* Stats Skeleton */}
            <div className="flex flex-wrap justify-center gap-8">
              {[1, 2, 3].map((item) => (
                <div key={item} className="text-center">
                  <div className="h-8 bg-gray-300 rounded w-20 mx-auto mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-16 mx-auto"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Skeleton */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            {/* Filter Sidebar Skeleton */}
            <div className="hidden lg:block w-64">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse">
                <div className="flex items-center justify-between mb-6">
                  <div className="h-6 bg-gray-300 rounded w-20"></div>
                  <div className="h-4 bg-gray-300 rounded w-16"></div>
                </div>

                {/* Filter Sections */}
                {[1, 2, 3, 4].map((section) => (
                  <div key={section} className="mb-6">
                    <div className="h-4 bg-gray-300 rounded w-24 mb-4"></div>
                    <div className="space-y-3">
                      {[1, 2, 3].map((item) => (
                        <div key={item} className="flex items-center gap-3">
                          <div className="h-4 w-4 bg-gray-300 rounded"></div>
                          <div className="h-4 bg-gray-300 rounded flex-1"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="h-10 bg-gray-300 rounded w-full mt-4"></div>
              </div>
            </div>

            {/* Products Grid Skeleton */}
            <div className="flex-1">
              {/* Header Skeleton */}
              <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between animate-pulse">
                <div className="flex items-center gap-4 mb-4 sm:mb-0">
                  <div className="h-8 bg-gray-300 rounded w-40"></div>
                  <div className="h-10 bg-gray-300 rounded w-24 lg:hidden"></div>
                </div>
                <div className="h-10 bg-gray-300 rounded w-48"></div>
              </div>

              {/* Products Grid Skeleton */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                  <div key={item} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
                    {/* Image Skeleton */}
                    <div className="h-48 bg-gray-300 w-full"></div>
                    
                    {/* Content Skeleton */}
                    <div className="p-4">
                      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                      <div className="h-6 bg-gray-300 rounded w-full mb-3"></div>
                      
                      {/* Rating Skeleton */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="h-4 bg-gray-300 rounded w-20"></div>
                        <div className="h-4 bg-gray-300 rounded w-16"></div>
                      </div>

                      {/* Price Skeleton */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="h-6 bg-gray-300 rounded w-16"></div>
                        <div className="h-4 bg-gray-300 rounded w-12"></div>
                      </div>

                      {/* Button Skeleton */}
                      <div className="h-10 bg-gray-300 rounded w-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Skeleton */}
      <footer className="bg-gray-800 py-12 animate-pulse">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <div key={item}>
                <div className="h-6 bg-gray-600 rounded w-32 mb-4"></div>
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((link) => (
                    <div key={link} className="h-4 bg-gray-600 rounded w-24"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8">
            <div className="h-4 bg-gray-600 rounded w-48 mx-auto"></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ShopSkeleton;