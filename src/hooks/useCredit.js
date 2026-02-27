import api from "../lib/axios.config";
import axios from "axios";



const useCredit = () => {

  const hanleAxiosError = (error, fallbackMessage) => {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message ?? fallbackMessage);
    }
    throw new Error(fallbackMessage);
  }
  
  //TODO : Add reason for credit refresh in the future
  const fetchCredit = async (query, reason = "credit_refresh") => {
    if (!query) {
      throw new Error("Query is required");
    }

    try {
      const { data } = await api.post(
        `/credit/credit-report/${query}/refresh`,
        { reason },
       
      );

      return data;
    } catch (error) {
      hanleAxiosError(error, "Failed to fetch credit report");
    };
    
    const fetchCreditReport = async (query) => {
    
      const data = await api.get(`/credit/credit-report/${query}`);
      return data;
    };


    return { fetchCredit, fetchCreditReport };
  };
}
export default useCredit;