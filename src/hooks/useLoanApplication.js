import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/axios.config";

// ✅ GET ALL LOANS
export const useGetLoanApplications = () => {
  return useQuery({
    queryKey: ["loan-applications"],
    queryFn: async () => {
      const res = await api.get("/loan-applications");
      return res.data.data;
    },
  });
};

// ✅ CREATE LOAN
export const useCreateLoan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) =>
      api.post("/loan-applications", payload),

    onSuccess: () => {
      queryClient.invalidateQueries(["loan-applications"]);
      console.log("✅ Loan Created");
    },
  });
};

// ✅ UPDATE LOAN STATUS
export const useUpdateLoan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }) =>
      api.put(`/loan-applications/${id}/status`, { status }),

    onSuccess: () => {
      queryClient.invalidateQueries(["loan-applications"]);
    },
  });
};
