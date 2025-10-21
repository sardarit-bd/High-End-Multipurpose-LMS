"use client";

import React from 'react';

const EventSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section Skeleton */}
     

      {/* All Events Section Skeleton */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-10 bg-gray-300 rounded-lg w-64 mx-auto mb-4"></div>
            <div className="h-6 bg-gray-300 rounded-lg w-96 mx-auto"></div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar Skeleton */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-6 w-6 bg-gray-300 rounded"></div>
                  <div className="h-6 bg-gray-300 rounded w-20"></div>
                  <div className="ml-auto h-6 bg-gray-300 rounded w-16"></div>
                </div>

                <div className="space-y-6">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item}>
                      <div className="h-4 bg-gray-300 rounded w-24 mb-3"></div>
                      <div className="h-12 bg-gray-300 rounded-xl w-full"></div>
                    </div>
                  ))}
                  <div className="h-12 bg-gray-300 rounded-xl w-full"></div>
                </div>
              </div>
            </div>

            {/* Events Grid Skeleton */}
            <div className="lg:w-3/4">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    {/* Image Skeleton */}
                    <div className="h-48 bg-gray-300 animate-pulse"></div>
                    
                    {/* Content Skeleton */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <div className="h-6 bg-gray-300 rounded w-20"></div>
                        <div className="h-6 bg-gray-300 rounded w-16"></div>
                      </div>

                      <div className="h-6 bg-gray-300 rounded mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded mb-4 w-5/6"></div>

                      {/* Details Skeleton */}
                      <div className="space-y-2 mb-4">
                        {[1, 2, 3, 4].map((detail) => (
                          <div key={detail} className="flex items-center gap-2">
                            <div className="h-4 w-4 bg-gray-300 rounded"></div>
                            <div className="h-3 bg-gray-300 rounded w-24"></div>
                          </div>
                        ))}
                      </div>

                      {/* Tags Skeleton */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {[1, 2, 3].map((tag) => (
                          <div key={tag} className="h-6 bg-gray-300 rounded w-16"></div>
                        ))}
                      </div>

                      {/* Price and Action Skeleton */}
                      <div className="flex items-center justify-between">
                        <div className="h-8 bg-gray-300 rounded w-20"></div>
                        <div className="h-10 bg-gray-300 rounded-full w-24"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section Skeleton */}
      <section className="py-16 bg-gray-300 animate-pulse">
        <div className="container mx-auto px-4 text-center">
          <div className="h-10 bg-gray-400 rounded-lg w-96 mx-auto mb-4"></div>
          <div className="h-6 bg-gray-400 rounded-lg w-2/3 mx-auto mb-8"></div>
          <div className="h-12 bg-gray-400 rounded-full w-48 mx-auto"></div>
        </div>
      </section>
    </div>
  );
};

export default EventSkeleton;