"use client";

import React from 'react';
import { FaSyncAlt, FaChartLine, FaFilter, FaBook } from 'react-icons/fa';

const Filters = ({
  categories,
  activeCategory,
  setActiveCategory,
  handleRefresh,
  loading,
  schools = [],
  cities = [],
  regions = [],
  selectedFilter,
  setSelectedFilter,
  courseId,
  setCourseId
}) => {
  const getFilterOptions = () => {
    switch (activeCategory) {
      case 'school':
        return schools.map((school) => ({
          value: school.schoolId || school._id,
          label: school.schoolName || 'Unknown School'
        }));
      case 'city':
        return cities.map((city) => ({
          value: city.cityId || city._id,
          label: city.cityName || 'Unknown City'
        }));
      case 'region':
        return regions.map((region) => ({
          value: region,
          label: region
        }));
      default:
        return [];
    }
  };

  const filterOptions = getFilterOptions();

  return (
    <section className="bg-white rounded-[1rem] shadow-[0_4px_12px_rgba(0,0,0,0.1)] p-8 border border-gray-100 mb-8 backdrop-opacity-95">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-[#064E3B] mb-2 flex items-center">
            <FaChartLine className="w-8 h-8 text-[#059669] mr-3" />
            Live Rankings
          </h2>
          <p className="text-[#064E3B] opacity-80">Track performance across different categories</p>
        </div>

        <button
          onClick={handleRefresh}
          disabled={loading}
          className="flex items-center space-x-2 px-4 py-2 bg-[#ECFDF5] text-[#064E3B] rounded-xl hover:bg-[#D1FAE5] transition-colors duration-200 disabled:opacity-50"
        >
          <FaSyncAlt className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Category Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {categories.map((category) => {
          const IconComponent = category.icon;
          const isActive = activeCategory === category.id;

          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`p-4 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                isActive
                  ? 'border-[#059669] bg-gradient-to-r from-[#ECFDF5] to-blue-50 text-[#059669] shadow-lg'
                  : 'border-gray-200 bg-white text-[#064E3B] hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  isActive ? 'bg-[#059669] text-white' : 'bg-[#ECFDF5] text-[#064E3B]'
                }`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">{category.name}</div>
                  <div className="text-sm opacity-75">{category.description}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Additional Filters for School/City/Region */}
      {/* {(activeCategory === 'school' || activeCategory === 'city' || activeCategory === 'region') && filterOptions.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <FaFilter className="w-4 h-4 text-[#064E3B]" />
            <span className="text-sm font-medium text-[#064E3B]">
              Filter by {activeCategory === 'school' ? 'School' : activeCategory === 'city' ? 'City' : 'Region'}
            </span>
          </div>
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#059669] focus:border-[#059669] bg-white text-[#064E3B] w-full max-w-md"
          >
            <option value="">All {activeCategory === 'school' ? 'Schools' : activeCategory === 'city' ? 'Cities' : 'Regions'}</option>
            {filterOptions.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )} */}

      {/* Course Filter */}
      {/* <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <FaBook className="w-4 h-4 text-[#064E3B]" />
          <span className="text-sm font-medium text-[#064E3B]">
            Filter by Course
          </span>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            placeholder="Enter Course ID"
            className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#059669] focus:border-[#059669] bg-white text-[#064E3B] flex-1 max-w-md"
          />
          {courseId && (
            <button
              onClick={() => setCourseId('')}
              className="px-3 py-2 bg-[#ECFDF5] text-[#064E3B] rounded-xl hover:bg-[#D1FAE5] transition-colors duration-200"
            >
              Clear
            </button>
          )}
        </div>
      </div> */}
    </section>
  );
};

export default Filters;