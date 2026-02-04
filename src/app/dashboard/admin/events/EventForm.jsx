
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useCreateEvent, useUpdateEvent } from '@/hooks/useEvent';
import api from '@/lib/apiClient';

export default function EventForm({ event, onClose }) {
  const isEditMode = !!event;
  const { register, handleSubmit, reset, formState: { errors }, setValue, watch } = useForm({
    defaultValues: event || {
      title: '',
      description: '',
      duration: 60,
      eventDate: '',
      location: '',
      price: 0,
      pointsReward: 0,
      thumbnail: ''
    }
  });
  
  const createEvent = useCreateEvent();
  const updateEvent = useUpdateEvent();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState(event?.thumbnail || '');
  const thumbnail = watch('thumbnail');

  useEffect(() => {
    if (event) {
      const formattedEvent = {
        ...event,
        eventDate: event.eventDate ? new Date(event.eventDate).toISOString().slice(0, 16) : '',
        thumbnail: event.thumbnail || ''
      };
      reset(formattedEvent);
      setThumbnailPreview(event.thumbnail || '');
    }
  }, [event, reset]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error("Please upload an image file");
      return;
    }

    // Validate file size (2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size should be less than 2MB");
      return;
    }

    setIsUploading(true);
    const uploadFormData = new FormData();
    uploadFormData.append("file", file);
    uploadFormData.append("folder", "event-thumbnails");

    try {
      const res = await api.post("/upload", uploadFormData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      
      const imageUrl = res.data?.data?.url;
      if (imageUrl) {
        setValue('thumbnail', imageUrl);
        setThumbnailPreview(imageUrl);
        toast.success("Image uploaded successfully!");
      } else {
        throw new Error("No image URL returned");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const removeThumbnail = () => {
    setValue('thumbnail', '');
    setThumbnailPreview('');
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const eventData = {
        ...data,
        duration: parseInt(data.duration),
        price: parseFloat(data.price),
        pointsReward: parseInt(data.pointsReward),
        eventDate: new Date(data.eventDate).toISOString(),
        thumbnail: data.thumbnail || undefined
      };

      console.log('Submitting event data:', eventData);
      if (isEditMode) {
        await updateEvent.mutateAsync({ id: event._id, data: eventData });
        toast.success('Event updated successfully!');
      } else {
        await createEvent.mutateAsync(eventData);
        toast.success('Event created successfully!');
      }
      
      onClose();
    } catch (error) {
      toast.error(isEditMode ? 'Failed to update event' : 'Failed to create event');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[var(--color-text)]">
            {isEditMode ? 'Edit Event' : 'Create New Event'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="text-gray-600 mt-1">
          {isEditMode ? 'Update event details' : 'Fill in the details to create a new event'}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
        {/* Thumbnail Upload Section */}
       <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
         <div className="">
          <label className="block text-sm font-medium text-[var(--color-text)]">
            Event Thumbnail
          </label>
          
          {thumbnailPreview ? (
            <div className="relative group">
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-4">
                <div className="relative">
                  <img
                    src={thumbnailPreview}
                    alt="Event thumbnail preview"
                    className="w-full h-48 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src = 'https://placehold.co/600x400/ececec/cccccc?text=Event+Image';
                    }}
                  />
                  <button
                    type="button"
                    onClick={removeThumbnail}
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2 text-center">
                  Click the image or drag & drop to replace
                </p>
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-[var(--color-primary)] transition-colors">
              <div className="flex flex-col items-center justify-center space-y-3" onClick={() => document.getElementById('thumbnail-upload').click()}
              disabled={isUploading}>
                <div className="p-4 bg-[var(--color-background)] rounded-full">
                  <svg className="w-8 h-8 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-[var(--color-text)]">
                    {isUploading ? 'Uploading...' : 'Click to upload event thumbnail'}
                  </p>
                  <p className="text-sm text-gray-500">
                    PNG, JPG, GIF up to 2MB
                  </p>
                </div>
              </div>
            </div>
          )}

          <input
            type="file"
            id="thumbnail-upload"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          
          {thumbnail && (
            <input
              type="hidden"
              {...register('thumbnail')}
            />
          )}
        </div>

        <div className="grid grid-cols-1 gap-2">
          {/* Title */}
          <div className="">
            <label className="block text-sm font-medium text-[var(--color-text)]">
              Event Title *
            </label>
            <input
              type="text"
              {...register('title', { required: 'Title is required' })}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]`}
              placeholder="Enter event title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          {/* Date & Time */}
          <div className="">
            <label className="block text-sm font-medium text-[var(--color-text)]">
              Date & Time *
            </label>
            <input
              type="datetime-local"
              {...register('eventDate', { required: 'Date is required' })}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.eventDate ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]`}
            />
            {errors.eventDate && (
              <p className="text-red-500 text-sm">{errors.eventDate.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[var(--color-text)]">
              Points Reward
            </label>
            <input
              type="number"
              {...register('pointsReward', { 
                min: { value: 0, message: 'Points cannot be negative' }
              })}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.pointsReward ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]`}
              placeholder="e.g., 100"
            />
            {errors.pointsReward && (
              <p className="text-red-500 text-sm">{errors.pointsReward.message}</p>
            )}
            <p className="text-sm text-gray-500">
              Points awarded to attendees upon completion
            </p>
          </div>
        </div>
       </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[var(--color-text)]">
            Description
          </label>
          <textarea
            {...register('description')}
            rows="3"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            placeholder="Describe your event..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Location */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[var(--color-text)]">
              Location
            </label>
            <input
              type="text"
              {...register('location')}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              placeholder="e.g., Online, Conference Hall"
            />
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[var(--color-text)]">
              Duration (minutes) *
            </label>
            <input
              type="number"
              {...register('duration', { 
                required: 'Duration is required',
                min: { value: 1, message: 'Duration must be at least 1 minute' }
              })}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.duration ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]`}
              placeholder="e.g., 60"
            />
            {errors.duration && (
              <p className="text-red-500 text-sm">{errors.duration.message}</p>
            )}
          </div>

          {/* Price */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[var(--color-text)]">
              Price ($) *
            </label>
            <input
              type="number"
              step="0.01"
              {...register('price', { 
                required: 'Price is required',
                min: { value: 0, message: 'Price cannot be negative' }
              })}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.price ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]`}
              placeholder="0.00"
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
            )}
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-4 pt-6 border-t">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
            disabled={isSubmitting || isUploading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || isUploading}
            className="px-6 py-2 rounded-lg bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                {isEditMode ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {isEditMode ? 'Update Event' : 'Create Event'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}