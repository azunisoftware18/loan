import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/axios.config";

/* ================= GET ALL LOAN TYPES ================= */
export const useLoanTypes = () => {
  return useQuery({
    queryKey: ["loanTypes"],
    queryFn: async () => {
      const res = await api.get("/loantypes");

      // ✅ FIX — always return array
      return res.data?.data?.data || res.data?.data || [];
    },
  });
};

/* ================= GET LOAN TYPE BY ID ================= */
export const useLoanType = (id) => {
  return useQuery({
    queryKey: ["loanType", id],
    queryFn: async () => {
      const res = await api.get(`/loantypes/${id}`); // ✅ GET "/:id"
      return res.data.data;
    },
    enabled: !!id, // avoid empty calls
  });
};

/* ================= CREATE LOAN TYPE ================= */
export const useCreateLoanType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const res = await api.post("/loantypes", data); // ✅ POST "/"
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["loanTypes"]);
    },
  });
};

/* ================= UPDATE LOAN TYPE ================= */
export const useUpdateLoanType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await api.put(`/loantypes/${id}`, data); // ✅ PUT "/:id"
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["loanTypes"]);
    },
  });
};

/* ================= DELETE LOAN TYPE ================= */
export const useDeleteLoanType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const res = await api.delete(`/loantypes/${id}`); // ✅ DELETE "/:id"
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["loanTypes"]);
    },
  });
};