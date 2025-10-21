"use client";

import React from 'react';
import { FaFilter, FaDollarSign, FaCalendar, FaUser, FaTag } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const EventFilters = ({ filters, onFiltersChange, eventCount }) => {
  const { t } = useTranslation();

  const categories = [
    { value: 'all', label: t('events.filters.all') + ' ' + t('events.filters.category') },
    { value: 'masterclass', label: t('events.categories.masterclass') },
    { value: 'bootcamp', label: t('events.categories.bootcamp') },
    { value: 'conference', label: t('events.categories.conference') },
    { value: 'workshop', label: t('events.categories.workshop') },
    { value: 'summit', label: t('events.categories.summit') }
  ];

  const levels = [
    { value: 'all', label: t('events.filters.all') + ' ' + t('events.filters.level') },
    { value: 'beginner', label: t('events.levels.beginner') },
    { value: 'intermediate', label: t('events.levels.intermediate') },
    { value: 'advanced', label: t('events.levels.advanced') }
  ];

  const types = [
    { value: 'all', label: t('events.filters.all') + ' ' + t('events.filters.type') },
    { value: 'workshop', label: t('events.types.workshop') },
    { value: 'bootcamp', label: t('events.types.bootcamp') },
    { value: 'conference', label: t('events.types.conference') },
    { value: 'masterclass', label: t('events.types.masterclass') }
  ];

  return (
    <section className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
      <div className="flex items-center gap-3 mb-6">
        <FaFilter className="text-blue-600 text-xl" />
        <h3 className="text-xl font-bold text-gray-800">
          {t('events.filters.title') || 'Filters'}
        </h3>
        <span className="ml-auto bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
          {t('events.filters.eventCount', { count: eventCount }) || `${eventCount} events`}
        </span>
      </div>

      <div className="space-y-6">
        {/* Category Filter */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
            <FaTag />
            {t('events.filters.category')}
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
            {t('events.filters.priceRange')}
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
                {t('events.filters.under50') || 'Under $50'}
              </button>
              <button
                onClick={() => onFiltersChange({ ...filters, priceRange: [50, 200] })}
                className="flex-1 text-xs bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100"
              >
                {t('events.filters.fiftyTo200') || '$50-200'}
              </button>
            </div>
          </div>
        </div>

        {/* Level Filter */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
            <FaUser />
            {t('events.filters.level')}
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
            {t('events.filters.type')}
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
          {t('events.filters.clearAll') || 'Clear All Filters'}
        </button>
      </div>
    </section>
  );
};

export default EventFilters;