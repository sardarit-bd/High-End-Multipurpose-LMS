"use client";

import { useState, useRef, useEffect } from 'react';
import { FaChevronDown, FaCheck, FaFilter } from 'react-icons/fa';

const SDG_OPTIONS = [
  { value: 'all', label: 'All SDG Goals', color: 'bg-gray-500' },
  { value: '1', label: 'Goal 1: No Poverty', color: 'bg-red-500' },
  { value: '2', label: 'Goal 2: Zero Hunger', color: 'bg-orange-500' },
  { value: '3', label: 'Goal 3: Good Health', color: 'bg-green-500' },
  { value: '4', label: 'Goal 4: Quality Education', color: 'bg-red-600' },
  { value: '5', label: 'Goal 5: Gender Equality', color: 'bg-yellow-500' },
  { value: '6', label: 'Goal 6: Clean Water', color: 'bg-blue-400' },
  { value: '7', label: 'Goal 7: Affordable Energy', color: 'bg-yellow-600' },
  { value: '8', label: 'Goal 8: Economic Growth', color: 'bg-red-700' },
  { value: '9', label: 'Goal 9: Innovation', color: 'bg-orange-600' },
  { value: '10', label: 'Goal 10: Reduced Inequality', color: 'bg-pink-500' },
  { value: '11', label: 'Goal 11: Sustainable Cities', color: 'bg-yellow-700' },
  { value: '12', label: 'Goal 12: Responsible Consumption', color: 'bg-amber-800' },
  { value: '13', label: 'Goal 13: Climate Action', color: 'bg-green-600' },
  { value: '14', label: 'Goal 14: Life Below Water', color: 'bg-blue-500' },
  { value: '15', label: 'Goal 15: Life on Land', color: 'bg-green-700' },
  { value: '16', label: 'Goal 16: Peace & Justice', color: 'bg-blue-600' },
  { value: '17', label: 'Goal 17: Partnerships', color: 'bg-blue-700' },
];

export default function CustomSelect({ value, onChange, className = '' }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption = SDG_OPTIONS.find(option => option.value === value) || SDG_OPTIONS[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Selected Value Display */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full sm:w-64 bg-white border border-gray-300 rounded-lg shadow-sm px-4 py-3 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-all duration-200 flex items-center justify-between"
      >
        <div className="flex items-center space-x-3">
          <div className={`w-3 h-3 rounded-full ${selectedOption.color}`}></div>
          <span className="text-gray-900 font-medium text-sm">
            {selectedOption.label}
          </span>
        </div>
        <FaChevronDown 
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto">
          {SDG_OPTIONS.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`px-4 py-3 cursor-pointer transition-colors duration-150 flex items-center justify-between group ${
                option.value === value 
                  ? 'bg-blue-50 border-l-4 border-l-blue-500' 
                  : 'hover:bg-gray-50 border-l-4 border-l-transparent'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${option.color}`}></div>
                <span className={`text-sm ${
                  option.value === value ? 'text-blue-900 font-semibold' : 'text-gray-700'
                }`}>
                  {option.label}
                </span>
              </div>
              
              {option.value === value && (
                <FaCheck className="w-4 h-4 text-blue-500" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}