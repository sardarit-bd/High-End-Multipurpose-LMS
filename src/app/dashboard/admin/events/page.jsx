'use client';

import { useDeleteEvent, useEvents } from '@/hooks/useEvent';
import { useState } from 'react';
import EventTable from './EventTable';
import EventForm from './EventForm';



export default function AdminEventsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { data: events, isLoading, error } = useEvents();
  const deleteEvent = useDeleteEvent();

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteEvent.mutateAsync(id);
        toast.success('Event deleted successfully');
      } catch (error) {
        toast.error('Failed to delete event');
      }
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedEvent(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screenp-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error loading events. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--color-text)] mb-2">
          Event Management
        </h1>
        <p className="text-[var(--color-text)] opacity-80">
          Create, edit, and manage events for your platform
        </p>
      </div>

      {/* Action Bar */}
      <div className="mb-6 flex justify-end items-center">
        {/* <div className="relative">
          <input
            type="text"
            placeholder="Search events..."
            className="px-4 py-2 pl-10 w-full md:w-64 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
          />
          <svg
            className="w-5 h-5 absolute left-3 top-2.5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div> */}
        <button
          onClick={() => setIsFormOpen(true)}
          className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-hover)] transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create Event
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100 hover:shadow-lg transition hover:-translate-y-0.5">
          <p className="text-sm text-gray-600">Total Events</p>
          <p className="text-2xl font-bold text-[var(--color-text)]">{events?.length || 0}</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100 hover:shadow-lg transition hover:-translate-y-0.5">
          <p className="text-sm text-gray-600">Upcoming</p>
          <p className="text-2xl font-bold text-[var(--color-secondary)]">
            {events?.data?.filter(e => new Date(e.eventDate) > new Date()).length || 0}
          </p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100 hover:shadow-lg transition hover:-translate-y-0.5">
          <p className="text-sm text-gray-600">Total Attendees</p>
          <p className="text-2xl font-bold text-[var(--color-accent)]">
            {events?.data?.reduce((sum, e) => sum + (e.attendees?.length || 0), 0) || 0}
          </p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100 hover:shadow-lg transition hover:-translate-y-0.5">
          <p className="text-sm text-gray-600">Total Revenue</p>
          <p className="text-2xl font-bold text-[var(--color-primary)]">
            ${events?.data?.reduce((sum, e) => sum + (e.price * (e.attendees?.length || 0)), 0) || 0}
          </p>
        </div>
      </div>

      {/* Events Table */}
      <div className="bg-white rounded-xl shadow-soft overflow-hidden">
        <EventTable
          events={events?.data || []}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Event Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <EventForm
              event={selectedEvent}
              onClose={handleCloseForm}
            />
          </div>
        </div>
      )}
    </div>
  );
}