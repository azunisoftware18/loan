import api from "../lib/axios.config";
import axios from "axios";

const useLegalReport = () => {
    const handleAxiosError = (error, fallbackMessage) => {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message ?? fallbackMessage);
        }
        throw new Error(fallbackMessage);
    }
    const fetchLegal = async (query, payload) => {
        
        try {
            const response = await api.post(`/reports/legal/loan/${query}/legal-report`, { ...payload });
            return response.data;
        } catch (error) {
            handleAxiosError(error, "Failed to fetch legal report");

        }
    };

    const fetchLegalReports = async (query) => {
        try {
            const response  = await api.post("/reports/legal/legal-reports", { query });
            return response.data;
        } catch (error) {
            handleAxiosError(error, "Failed to fetch legal reports");
        }
    };
    return { fetchLegal, fetchLegalReports };
};
export default useLegalReport;
