import { useState } from "react";
import api from "../lib/axios.config";

const useDocuments = () => {
  const [applications, setApplications] = useState([]);
  const [documents, setDocuments] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchApplications = async () => {
    try {
      setLoading(true);

      const res = await api.get("/loan-applications");
      setApplications(res.data.data);

    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch loans");
    } finally {
      setLoading(false);
    }
  };

  const fetchDocumentsByLoanId = async (loanId) => {
    const res = await api.get(
      `/loan-applications/${loanId}/documents`
    );

    setDocuments(prev => ({
      ...prev,
      [loanId]: res.data.data,
    }));
  };

  const uploadDocument = async (loanId, file, documentType) => {
    const formData = new FormData();

    formData.append(documentType, file);

    return api.post(
      `/loan-applications/${loanId}/documents`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  };


const uploadDocumentsBulk = async (loanId, rows) => {

  // ==============================
  // 🔹 PRIMARY APPLICANT (BULK)
  // ==============================

  const primaryRows = rows.filter(
    r => r.applicantType === "APPLICANT"
  );

  if (primaryRows.length > 0) {

    const primaryForm = new FormData();

    primaryRows.forEach(row => {
      if (!row.file) return;

      primaryForm.append(row.docType, row.file);
    });

    await api.post(
      `/loan-applications/${loanId}/documents`,
      primaryForm,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );
  }

  // ==============================
  // 🔹 CO-APPLICANT (SINGLE LOOP)
  // ==============================

  const coApplicantRows = rows.filter(
    r => r.applicantType === "CO_APPLICANT"
  );

  for (const row of coApplicantRows) {

    if (!row.file || !row.coApplicantId) continue;

    const formData = new FormData();
    formData.append(row.docType, row.file);

    await api.post(
      `/co-applicant/documents/${row.coApplicantId}/upload`,
      formData
    );
  }
};







 const verifyDocument = async (docId) => {
  return api.patch(`/documents/${docId}/verify`);
};

const rejectDocument = async (docId, reason) => {
  return api.patch(`/documents/${docId}/reject`, { reason });
};


  return {
    applications,
    documents,
    loading,
    error,
    fetchApplications,
    fetchDocumentsByLoanId,
    uploadDocument,
    uploadDocumentsBulk,
    verifyDocument,
    rejectDocument,
  };
};

export default useDocuments;
