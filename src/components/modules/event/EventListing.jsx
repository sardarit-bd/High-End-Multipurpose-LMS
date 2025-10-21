"use client";

import React from 'react';
import { 
  FaCalendar, 
  FaClock, 
  FaMapMarkerAlt, 
  FaUser, 
  FaStar,
  FaRegHeart,
  FaHeart,
  FaShare,
  FaBookmark
} from 'react-icons/fa';

const EventListing = ({ events, onEventClick, onRegister, currentFeaturedId }) => {
  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">🔍</div>
        <h3 className="text-2xl font-semibold text-gray-600 mb-2">
          No events found
        </h3>
        <p className="text-gray-500">
          Try adjusting your filters to find more events.
        </p>
      </div>
    );
  }

  return (
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-[1.02] ${
              event.id === currentFeaturedId ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => onEventClick(event.id)}
          >
            {/* Event Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  event.status === 'LIVE' ? 'bg-green-500 text-white' :
                  event.status === 'COMING SOON' ? 'bg-yellow-500 text-white' :
                  'bg-blue-500 text-white'
                }`}>
                  {event.status}
                </span>
              </div>
              <div className="absolute top-4 right-4 flex gap-2">
                <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
                  <FaRegHeart className="text-gray-600" />
                </button>
                <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
                  <FaBookmark className="text-gray-600" />
                </button>
              </div>
            </div>

            {/* Event Content */}
            <div className="p-6">
              {/* Category and Rating */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  {event.type}
                </span>
                <div className="flex items-center gap-1">
                  <FaStar className="text-yellow-400" />
                  <span className="text-sm font-semibold text-gray-700">
                    {event.rating}
                  </span>
                  <span className="text-sm text-gray-500">
                    ({event.reviews})
                  </span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                {event.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {event.description}
              </p>

              {/* Event Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaCalendar className="text-blue-500" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaClock className="text-green-500" />
                  <span>{event.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaMapMarkerAlt className="text-red-500" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaUser className="text-purple-500" />
                  <span>{event.level} Level</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {event.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
                {event.tags.length > 3 && (
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    +{event.tags.length - 3}
                  </span>
                )}
              </div>

              {/* Price and Action */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-gray-800">
                    {event.price}
                  </span>
                  {event.originalPrice && (
                    <span className="text-sm text-gray-500 line-through ml-2">
                      {event.originalPrice}
                    </span>
                  )}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRegister(event);
                  }}
                  className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
  );
};

export default EventListing;