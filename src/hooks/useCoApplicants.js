import { useCallback, useState } from "react";
import api from "../lib/axios.config";

const useCoApplicants = () => {
  const [coApplicants, setCoApplicants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCoApplicants = useCallback(
    async (loanApplicationId) => {
      if (!loanApplicationId) return;

      try {
        setLoading(true);
        setError(null);

        const res = await api.get(`/co-applicant/loan/${loanApplicationId}`);
        
        // Process co-applicants to include documents
        const processedCoApplicants = (res.data?.data || []).map(coApp => ({
          ...coApp,
          documents: coApp.documents || []
        }));

        setCoApplicants(processedCoApplicants);

      } catch (err) {
        if (err.response?.status === 404) {
          setCoApplicants([]);
          return;
        }

        console.error(err);
        setError(err.response?.data?.message || "Failed to fetch co-applicants");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    coApplicants,
    loading,
    error,
    fetchCoApplicants,
  };
};

export default useCoApplicants;