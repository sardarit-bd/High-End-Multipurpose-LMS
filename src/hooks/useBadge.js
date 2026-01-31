// hooks/useBadges.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/apiClient";

export const useBadges = ({
  page = 1,
  limit = 10,
  search,
  isActive
}) => {
  return useQuery({
    queryKey: ['badges', page, limit, search, isActive],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', limit.toString());
      if (search) params.append('search', search);
      if (isActive !== undefined) params.append('isActive', isActive.toString());

      const res = await api.get(`/badges?${params.toString()}`);
      return res.data;
    },
    refetchOnWindowFocus: false,
  });
};

export const useBadge = (id) => {
  return useQuery({
    queryKey: ['badge', id],
    queryFn: async () => {
      const res = await api.get(`/badges/${id}`);
      return res.data;
    },
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
};

export const useCreateBadge = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (badgeData) => {
      const res = await api.post('/badges', badgeData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['badges'] });
    },
  });
};

export const useUpdateBadge = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await api.put(`/badges/${id}`, data);
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['badges'] });
      queryClient.invalidateQueries({ queryKey: ['badge', variables.id] });
    },
  });
};

export const useDeleteBadge = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id) => {
      const res = await api.delete(`/badges/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['badges'] });
    },
  });
};