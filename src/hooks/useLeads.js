import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../lib/axios.config";

export const useGetLeads = () => {
  return useQuery({
    queryKey: ["leads"],
    queryFn: async () => {
      const res = await api.get("/lead/all");
      return res.data.data;
    },
  });
};

export const useCreateLead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => api.post("/lead", payload), // ✅ FIXED

    onSuccess: () => {
      queryClient.invalidateQueries(["leads"]);
    },
  });
};
