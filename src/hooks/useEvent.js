import { eventApi } from '@/lib/eventApi';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Get all events hook
export const useEvents = () => {
  return useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const res = await eventApi.getAllEvents();
      return res.data;
    },
  });
};

// Get single event hook
export const useEvent = (id) => {
  return useQuery({
    queryKey: ['event', id],
    queryFn: async () => {
      const res = await eventApi.getEvent(id);
      return res.data;
    },
    enabled: !!id,
  });
};

// Create event hook
export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (eventData) => {
      const res = await eventApi.createEvent(eventData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['events']);
    },
  });
};

// Update event hook
export const useUpdateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await eventApi.updateEvent(id, data);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['events']);
      queryClient.invalidateQueries(['event', data._id]);
    },
  });
};

// Delete event hook
export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const res = await eventApi.deleteEvent(id);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['events']);
    },
  });
};


// Get public events hook
export const usePublicEvents = () => {
  return useQuery({
    queryKey: ['public-events'],
    queryFn: async () => {
      const res = await eventApi.getPublicEvents();
      return res.data;
    },
  });
};

// Get single public event hook
export const usePublicEvent = (id) => {
  return useQuery({
    queryKey: ['public-event', id],
    queryFn: async () => {
      const res = await eventApi.getPublicEvent(id);
      return res.data;
    },
    enabled: !!id,
  });
};

// Register for event hook
export const useRegisterForEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (eventId) => {
      const res = await eventApi.registerForEvent(eventId);
      return res.data;
    }
  });
};

// Create checkout session hook
export const useCreateCheckoutSession = () => {
  return useMutation({
    mutationFn: async (eventId) => {
      const res = await eventApi.createCheckoutSession(eventId);
      return res.data;
    },
  });
};

// Process payment hook
export const useProcessPayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ eventId, data }) => {
      const res = await eventApi.processPayment(eventId, data);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['public-event', data.registration.eventId]);
      queryClient.invalidateQueries(['registration-status', data.registration.eventId]);
    },
  });
};

// Check registration status hook
export const useRegistrationStatus = (eventId) => {
  return useQuery({
    queryKey: ['registration-status', eventId],
    queryFn: async () => {
      const res = await eventApi.checkRegistrationStatus(eventId);
      return res.data;
    },
    enabled: !!eventId,
  });
};