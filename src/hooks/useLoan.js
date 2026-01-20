import { useQuery, useMutation } from "@tanstack/react-query";
import api from "../lib/axios.config";

// ✅ GET LOAN TYPES
export const useLoanTypes = () => {
  return useQuery({
    queryKey: ["loanTypes"],
    queryFn: async () => {
      const res = await api.get("/loantypes");
      return res.data.data;
    },
  });
};

// ✅ APPLY LOAN
export const useApplyLoan = () => {
  return useMutation({
    mutationFn: (payload) => api.post("/lead", payload),
  });
};
