import api from "../lib/axios.config";
import axios from "axios";

const useCredit = () => {
  
//TODO : Add reason for credit refresh in the future
  const fetchCredit = async (query, reason = "credit_refresh") => {
    if (!query) {
      throw new Error("Query is required");
    }

    try {
      const { data } = await api.post(
        "/credit/credit-report/refresh",
        { reason },
        { params: { q: query } }
      );

      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message ?? "Failed to fetch credit report"
        );
      }

      throw new Error("Unexpected error occurred");
    }
  };

  return { fetchCredit };
};

export default useCredit;