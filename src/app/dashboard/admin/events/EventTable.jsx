import { format } from 'date-fns';

export default function EventTable({ events, onEdit, onDelete }) {
  const formatDate = (dateString) => {
    return format(new Date(dateString), 'MMM dd, yyyy');
  };

  const formatTime = (dateString) => {
    return format(new Date(dateString), 'hh:mm a');
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-[var(--color-background)]">
          <tr>
            <th className="py-4 px-6 text-left text-sm font-semibold text-[var(--color-text)]">Event</th>
            <th className="py-4 px-6 text-left text-sm font-semibold text-[var(--color-text)]">Date & Time</th>
            <th className="py-4 px-6 text-left text-sm font-semibold text-[var(--color-text)]">Price</th>
            <th className="py-4 px-6 text-left text-sm font-semibold text-[var(--color-text)]">Points Reward</th>
            <th className="py-4 px-6 text-left text-sm font-semibold text-[var(--color-text)]">Location</th>
            <th className="py-4 px-6 text-left text-sm font-semibold text-[var(--color-text)]">Attendees</th>
            <th className="py-4 px-6 text-left text-sm font-semibold text-[var(--color-text)]">Status</th>
            <th className="py-4 px-6 text-left text-sm font-semibold text-[var(--color-text)]">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {events.map((event) => (
            <tr key={event._id} className="hover:bg-gray-50">
              <td className="py-4 px-2">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 flex-shrink-0">
                    <img
                      src={event.thumbnail || 'https://placehold.co/100x100/ececec/cccccc?text=No+Image'}
                      alt={event.title}
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src = 'https://placehold.co/100x100/ececec/cccccc?text=No+Image';
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-[var(--color-text)]">{event.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-1 max-w-xs">
                      {event.description}
                    </p>
                  </div>
                </div>
              </td>
              <td className="py-4 px-6">
                <div>
                  <p className="font-medium">{formatDate(event.eventDate)}</p>
                  <p className="text-sm text-gray-600">{formatTime(event.eventDate)}</p>
                </div>
              </td>
              <td className="py-4 px-6">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  event.price === 0 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  ${event.price}
                </span>
              </td>
              <td className="py-4 px-6">
                <span className="font-medium">{event.pointsReward}</span>
              </td>
              <td className="py-4 px-6">
                <span className="font-medium">{event.location || 'N/A'}</span>
              </td>
              <td className="py-4 px-6">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{event.attendees?.length || 0}</span>
                  <span className="text-gray-600">/ ∞</span>
                </div>
              </td>
              <td className="py-4 px-6">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  new Date(event.eventDate) > new Date()
                    ? 'bg-[var(--color-accent)]/20 text-[var(--color-accent-hover)]'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {new Date(event.eventDate) > new Date() ? 'Upcoming' : 'Past'}
                </span>
              </td>
              <td className="py-4 px-6">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onEdit(event)}
                    className="p-2 text-[var(--color-secondary)] hover:bg-[var(--color-secondary)]/10 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => onDelete(event._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}