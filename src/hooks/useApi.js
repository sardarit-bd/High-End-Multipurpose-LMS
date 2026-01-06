import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/apiClient";

export function useApi(baseUrl, queryKey) {
  const queryClient = useQueryClient();

  // ✅ React Hook Compliant Internal Hooks
  function useGetAll() {
    return useQuery({
      queryKey: [queryKey],
      queryFn: async () => (await api.get(baseUrl)).data,
    });
  }

  function useGetById(id) {
    return useQuery({
      queryKey: [queryKey, id],
      queryFn: async () => (await api.get(`${baseUrl}/${id}`)).data,
      enabled: !!id,
    });
  }

  function useCreate() {
    return useMutation({
      mutationFn: (data) => api.post(baseUrl, data).then((r) => r.data),
      onSuccess: () => queryClient.invalidateQueries([queryKey]),
    });
  }

  function useUpdate() {
    return useMutation({
      mutationFn: ({ id, ...data }) =>
        api.put(`${baseUrl}/${id}`, data).then((r) => r.data),
      onSuccess: () => queryClient.invalidateQueries([queryKey]),
    });
  }

  function useRemove() {
    return useMutation({
      mutationFn: (id) => api.delete(`${baseUrl}/${id}`).then((r) => r.data),
      onSuccess: () => queryClient.invalidateQueries([queryKey]),
    });
  }

  // ✅ Backward Compatibility Layer
  return {
    // old syntax → new hook behind the scenes
    getAll: useGetAll,
    getById: useGetById,
    create: useCreate,
    update: useUpdate,
    remove: useRemove,

    // new syntax (for future)
    useGetAll,
    useGetById,
    useCreate,
    useUpdate,
    useRemove,
  };
}
