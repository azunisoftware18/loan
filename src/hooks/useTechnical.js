import api from "../lib/axios.config";
import axios from "axios";

const useTechnical = () => {
  const handleAxiosError = (error, fallbackMessage) => {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message ?? fallbackMessage);
    }
    throw new Error(fallbackMessage);
  };

  const fetchTechnical = async (query, payload) => {
    if (!query) {
      throw new Error("Query is required");
    }
    if (!payload) {
      throw new Error("Payload is required");
    }
    try {
      const { data } = await api.post(
        `/reports/technical/loan-applications/${query}/technical-reports`,
        { payload },
      );
      return data;
    } catch (error) {
      handleAxiosError(error, "Failed to fetch technical report");
    }
  };

  const fetchTechnicalReports = async (payload = {}) => {
    try {
      const { data } = await api.post(
        "/reports/technical/technical-reports",
        payload,
      );
      return data;
    } catch (error) {
      handleAxiosError(error, "Failed to fetch technical reports");
    }
  };

  return { fetchTechnical, fetchTechnicalReports };
};

export default useTechnical;
