import api from "./apiClient";


export const eventApi = {
  // Get all events
  getAllEvents: () => api.get('/events'),
  
  // Get single event
  getEvent: (id) => api.get(`/events/${id}`),
  
  // Create event
  createEvent: (data) => api.post('/events/create', data),
  
  // Update event
  updateEvent: (id, data) => api.patch(`/events/${id}`, data),
  
  // Delete event
  deleteEvent: (id) => api.delete(`/events/${id}`),
  getPublicEvents: () => api.get('/events'),
  
  // Get single event for public
  getPublicEvent: (id) => api.get(`/events/${id}`),
  
  // Register for event
  registerForEvent: (id) => api.post(`/events/${id}/register`),
  
  // Create checkout session
  createCheckoutSession: (id) => api.post(`/events/${id}/checkout`),
  
  // Process payment
  processPayment: (id, data) => api.post(`/events/${id}/pay`, data),
  
  // Check registration status
  checkRegistrationStatus: (id) => api.get(`/events/${id}/registration-status`),
};