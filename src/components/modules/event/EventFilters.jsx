"use client";

import React from 'react';
import { FaFilter, FaDollarSign, FaCalendar, FaUser, FaTag } from 'react-icons/fa';

const EventFilters = ({ filters, onFiltersChange, eventCount }) => {
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'masterclass', label: 'Masterclass' },
    { value: 'bootcamp', label: 'Bootcamp' },
    { value: 'conference', label: 'Conference' },
    { value: 'workshop', label: 'Workshop' },
    { value: 'summit', label: 'Summit' }
  ];

  const levels = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  const types = [
    { value: 'all', label: 'All Types' },
    { value: 'workshop', label: 'Workshop' },
    { value: 'bootcamp', label: 'Bootcamp' },
    { value: 'conference', label: 'Conference' },
    { value: 'masterclass', label: 'Masterclass' }
  ];

  return (
    <section className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
      <div className="flex items-center gap-3 mb-6">
        <FaFilter className="text-blue-600 text-xl" />
        <h3 className="text-xl font-bold text-gray-800">Filters</h3>
        <span className="ml-auto bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
          {eventCount} events
        </span>
      </div>

      <div className="space-y-6">
        {/* Category Filter */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
            <FaTag />
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => onFiltersChange({ ...filters, category: e.target.value })}
            className="w-full p-3 text-gray-700 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
            <FaDollarSign />
            Price Range
          </label>
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-gray-600">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
            <input
              type="range"
              min="0"
              max="500"
              step="50"
              value={filters.priceRange[1]}
              onChange={(e) => onFiltersChange({
                ...filters,
                priceRange: [filters.priceRange[0], parseInt(e.target.value)]
              })}
              className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex gap-2">
              <button
                onClick={() => onFiltersChange({ ...filters, priceRange: [0, 50] })}
                className="flex-1 text-xs bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100"
              >
                Under $50
              </button>
              <button
                onClick={() => onFiltersChange({ ...filters, priceRange: [50, 200] })}
                className="flex-1 text-xs bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100"
              >
                $50-200
              </button>
            </div>
          </div>
        </div>

        {/* Level Filter */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
            <FaUser />
            Level
          </label>
          <select
            value={filters.level}
            onChange={(e) => onFiltersChange({ ...filters, level: e.target.value })}
            className="w-full p-3 text-gray-700 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {levels.map(level => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </div>

        {/* Type Filter */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
            <FaCalendar />
            Event Type
          </label>
          <select
            value={filters.type}
            onChange={(e) => onFiltersChange({ ...filters, type: e.target.value })}
            className="w-full p-3 text-gray-700 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {types.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters */}
        <button
          onClick={() => onFiltersChange({
            category: 'all',
            priceRange: [0, 500],
            date: 'all',
            level: 'all',
            type: 'all'
          })}
          className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
        >
          Clear All Filters
        </button>
      </div>
    </section>
  );
};

export default EventFilters;