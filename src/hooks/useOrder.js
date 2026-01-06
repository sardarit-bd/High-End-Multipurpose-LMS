import api from "@/lib/apiClient";
import { useQuery } from "@tanstack/react-query";

export const useOrderBySession = (session) => {
    return useQuery({
        queryKey: ["sessionOrder", session],
        queryFn: async () => {
            const res = await api.get(`/orders/session/${session}`);
            return res.data?.data || [];
        },
        refetchOnWindowFocus: false,
    });
};