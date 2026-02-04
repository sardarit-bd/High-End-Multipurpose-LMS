import { useRegistrationStatus } from '@/hooks/useEvent';
import { format } from 'date-fns';
import Link from 'next/link';

export default function EventCard({ event }) {
  const { data: registrationStatus } = useRegistrationStatus(event._id);
  const isRegistered = registrationStatus?.isRegistered || false;

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'MMM dd, yyyy');
  };

  const formatTime = (dateString) => {
    return format(new Date(dateString), 'hh:mm a');
  };

  return (
    <div className="bg-white rounded-xl shadow-soft overflow-hidden hover:shadow-medium transition-shadow duration-300">
      {/* Event Image */}
      <div className="relative h-48">
        <img
          src={event.thumbnail || 'https://placehold.co/600x400/ececec/cccccc?text=Event+Image'}
          alt={event.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://placehold.co/600x400/ececec/cccccc?text=Event+Image';
          }}
        />
        
        {/* Price Badge */}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-sm font-bold ${
            event.price === 0 
              ? 'bg-green-500 text-white'
              : 'bg-[var(--color-accent)] text-[var(--color-text)]'
          }`}>
            {event.price === 0 ? 'FREE' : `$${event.price}`}
          </span>
        </div>

        {/* Points Badge */}
        {event.pointsReward > 0 && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full text-sm font-bold bg-[var(--color-secondary)] text-white flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              +{event.pointsReward}
            </span>
          </div>
        )}
      </div>

      {/* Event Content */}
      <div className="p-5">
        {/* Date & Time */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{formatDate(event.eventDate)}</span>
          <span className="mx-1">•</span>
          <span>{formatTime(event.eventDate)}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-[var(--color-text)] mb-2 line-clamp-1">
          {event.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {event.description || 'Join this amazing event to learn and network!'}
        </p>

        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{event.location || 'Online'}</span>
        </div>

        {/* Organizer */}
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 bg-[var(--color-primary)] rounded-full flex items-center justify-center text-white text-xs font-bold">
            {event.organizer?.name?.charAt(0) || 'O'}
          </div>
          <div>
            <p className="text-sm font-medium text-[var(--color-text)]">
              {event.organizer?.name || 'Event Organizer'}
            </p>
            <p className="text-xs text-gray-500">
              {event.attendees?.length || 0} attendees
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex gap-2">
          
          {isRegistered ? (
            <button
              disabled
              className="flex-1 px-4 py-2 bg-green-100 text-green-800 rounded-lg font-medium cursor-not-allowed"
            >
              Registered ✓
            </button>
          ) : (
            <Link
              href={`/events/${event._id}/register`}
              className={`flex-1 px-4 py-2 text-center rounded-lg font-medium transition-colors ${
                event.price === 0
                  ? 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]'
                  : 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]'
              }`}
            >
              {event.price === 0 ? 'Register Free' : 'Register Now'}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}