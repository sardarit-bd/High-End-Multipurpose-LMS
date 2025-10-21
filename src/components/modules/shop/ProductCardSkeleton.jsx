"use client";

import React from 'react';

const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="h-48 bg-gray-300 w-full relative">
        <div className="absolute top-3 right-3 h-6 bg-gray-400 rounded w-12"></div>
      </div>
      
      {/* Content Skeleton */}
      <div className="p-4">
        {/* Category Skeleton */}
        <div className="h-4 bg-gray-300 rounded w-20 mb-2"></div>
        
        {/* Title Skeleton */}
        <div className="h-6 bg-gray-300 rounded w-full mb-3"></div>
        
        {/* Rating Skeleton */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <div key={star} className="h-4 w-4 bg-gray-300 rounded"></div>
            ))}
          </div>
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
  );
};

export default ProductCardSkeleton;