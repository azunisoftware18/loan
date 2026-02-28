import api from "../lib/axios.config";
import axios from "axios";

const useCredit = () => {

  const handleAxiosError = (error, fallbackMessage) => {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message ?? fallbackMessage;
      return new Error(message);
    }
    return new Error(fallbackMessage);
  };

  // Force refresh credit report
  const fetchCredit = async (query, reason = "credit_refresh") => {
    if (!query) {
      throw new Error("Query is required");
    }

    try {
      const response = await api.post(
        `/credit/credit-report/refresh`,
        { reason },
        { params: { q: query } }
      );

      // 🔥 Return only actual report
      return response.data.data;

    } catch (error) {
      throw handleAxiosError(error, "Failed to fetch credit report");
    }
  };

  // Get existing credit report (cached)
  const fetchCreditReport = async (query) => {
    if (!query) {
      throw new Error("Query is required");
    }

    try {
      const response = await api.get(
        `/credit/credit-report`,
        { params: { q: query } }
      );

      return response.data.data;

    } catch (error) {
      throw handleAxiosError(error, "Failed to fetch credit report");
    }
  };

  return { fetchCredit, fetchCreditReport };
};

export default useCredit;