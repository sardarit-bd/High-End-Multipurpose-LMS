import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/apiClient";

export function useApi(baseUrl, queryKey) {
  const queryClient = useQueryClient();

  const getAll = () =>
    useQuery({
      queryKey: [queryKey],
      queryFn: async () => (await api.get(baseUrl)).data,
    });

  const getById = (id) =>
    useQuery({
      queryKey: [queryKey, id],
      queryFn: async () => (await api.get(`${baseUrl}/${id}`)).data,
      enabled: !!id,
    });

  const create = () =>
    useMutation({
      mutationFn: (data) => api.post(baseUrl, data).then((r) => r.data),
      onSuccess: () => queryClient.invalidateQueries([queryKey]),
    });

  const update = () =>
    useMutation({
      mutationFn: ({ id, ...data }) =>
        api.put(`${baseUrl}/${id}`, data).then((r) => r.data),
      onSuccess: () => queryClient.invalidateQueries([queryKey]),
    });

  const remove = () =>
    useMutation({
      mutationFn: (id) => api.delete(`${baseUrl}/${id}`).then((r) => r.data),
      onSuccess: () => queryClient.invalidateQueries([queryKey]),
    });

  return { getAll, getById, create, update, remove };
}
