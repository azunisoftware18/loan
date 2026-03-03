import { useCallback, useRef, useState } from "react";
import api from "../lib/axios.config";

const useDocuments = () => {

  const [applications, setApplications] = useState([]);
  const [documents, setDocuments] = useState({});
  const [requiredDocuments, setRequiredDocuments] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ prevents multiple api calls
  const requiredDocsCache = useRef({});

  /* ===============================
      FETCH APPLICATIONS
  =============================== */
  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);

      const res = await api.get("/loan-applications");
      setApplications(res.data.data);

    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch loans");
    } finally {
      setLoading(false);
    }
  }, []);

  /* ===============================
      FETCH UPLOADED DOCUMENTS
  =============================== */
  const fetchDocumentsByLoanId = useCallback(
    async (loanId) => {
      if (!loanId) return;

      try {
        const res = await api.get(`/loan-applications/${loanId}/documents`);
        
        // Process documents to ensure consistent format
        const processedDocs = res.data.data.map(doc => ({
          ...doc,
          documentId: doc.id, // Use actual document ID
          fileName: doc.documentPath?.split('/').pop() || 'document',
          fileUrl: doc.documentPath,
          verified: doc.verificationStatus === 'verified'
        }));

        setDocuments(prev => ({
          ...prev,
          [loanId]: processedDocs,
        }));
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    },
    []
  );

  /* ===============================
      FETCH REQUIRED DOCS FROM LOANTYPE
  =============================== */
  const fetchRequiredDocumentsByLoanId = useCallback(
    async (loanId) => {
      if (!loanId) return;

      // ✅ already fetched
      if (requiredDocsCache.current[loanId]) return;

      try {
        const res = await api.get(`/loan-applications/${loanId}`);
        
        // Get documents required string from loan type
        const docsString = res.data?.data?.loanType?.documentsRequired;
        
        if (!docsString) {
          setRequiredDocuments(prev => ({
            ...prev,
            [loanId]: []
          }));
          return;
        }

        // Split and create document objects with proper IDs
        const docs = docsString.split(",").map((doc, index) => {
          const docName = doc.trim();
          // Create a consistent ID based on document name
          const docId = docName.toLowerCase().replace(/\s+/g, '_');
          
          return {
            id: docId, // Use a string ID instead of index
            documentName: docName,
            mandatory: true,
            applicantType: "APPLICANT", // Default to APPLICANT, will be overridden by co-applicant docs
            acceptedFormats: [".pdf", ".jpg", ".jpeg", ".png"],
            maxSize: 5,
            documentType: docName
          };
        });

        requiredDocsCache.current[loanId] = true;

        setRequiredDocuments(prev => ({
          ...prev,
          [loanId]: docs
        }));

      } catch (err) {
        console.error(err);
      }
    },
    []
  );

  /* ===============================
      UPLOAD CO-APPLICANT DOCUMENT
  =============================== */
  const uploadCoApplicantDocument = useCallback(
    async (coApplicantId, file, documentType) => {
      if (!coApplicantId || !file) return;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("documentType", documentType);

      const res = await api.post(
        `/co-applicant/documents/${coApplicantId}/upload`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      return res.data;
    },
    []
  );

  /* ===============================
      BULK UPLOAD
  =============================== */
  const uploadDocumentsBulk = useCallback(
    async (loanId, rows) => {
      const primaryRows = rows.filter(r => r.applicantType === "APPLICANT");

      if (primaryRows.length > 0) {
        const formData = new FormData();

        primaryRows.forEach(row => {
          if (!row.file) return;
          formData.append("documents", row.file);
          formData.append("documentTypes", row.docType);
        });

        await api.post(
          `/loan-applications/${loanId}/documents/bulk`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }
    },
    []
  );

  /* ===============================
      VERIFY / REJECT DOCUMENTS
  =============================== */
  const verifyDocument = useCallback(
    async (docId) =>
      api.patch(`/documents/${docId}/verify`),
    []
  );

  const rejectDocument = useCallback(
    async (docId, reason) =>
      api.patch(`/documents/${docId}/reject`, { reason }),
    []
  );

  return {
    applications,
    documents,
    requiredDocuments,
    loading,
    error,
    fetchApplications,
    fetchDocumentsByLoanId,
    fetchRequiredDocumentsByLoanId,
    uploadDocumentsBulk,
    uploadCoApplicantDocument,
    verifyDocument,
    rejectDocument,
  };
};

export default useDocuments;