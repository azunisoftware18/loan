import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  X,
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  Clock,
  ChevronDown,
  ChevronRight,
  Eye,
  Trash2,
  Info
} from 'lucide-react';
import useDocuments from '../../../hooks/useDocuments';
import useCoApplicants from '../../../hooks/useCoApplicants';
import toast from 'react-hot-toast';

const DynamicDocumentUpload = ({
  isOpen,
  onClose,
  loanId,
  loanType = {},
  onUploadSuccess
}) => {
  // State
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [uploadProgress, setUploadProgress] = useState({});
  const [expandedSections, setExpandedSections] = useState({
    applicant: true,
    coApplicants: {}
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [existingDocuments, setExistingDocuments] = useState({});
  const getDocKey = (docName, applicantId = null) => {
  const normalized = docName
    ?.toLowerCase()
    .replace(/\s+/g, "_");

  return applicantId
    ? `CO_APPLICANT_${normalized}_${applicantId}`
    : `APPLICANT_${normalized}`;
};
  // Hooks
  const {
    documents,
    requiredDocuments,
    fetchDocumentsByLoanId,
    fetchRequiredDocumentsByLoanId,
    uploadDocumentsBulk,
    uploadCoApplicantDocument,
    loading: documentsLoading
  } = useDocuments();

  const {
    coApplicants,
    fetchCoApplicants,
    loading: coApplicantsLoading
  } = useCoApplicants();

  // Get required documents for this loan
  const loanRequiredDocs = useMemo(() => {
    if (!loanId || !requiredDocuments[loanId]) return [];
    return requiredDocuments[loanId] || [];
  }, [requiredDocuments, loanId]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setUploadedFiles({});
      setUploadProgress({});
      setExistingDocuments({});
      setValidationErrors({});
      setExpandedSections({
        applicant: true,
        coApplicants: {}
      });
    }
  }, [isOpen]);

  // Fetch co-applicants when modal opens - STABLE DEPENDENCIES
  useEffect(() => {
    if (isOpen && loanId) {
      fetchCoApplicants(loanId);
    }
  }, [isOpen, loanId]); // Removed fetchCoApplicants from deps

  // Fetch documents when modal opens - STABLE DEPENDENCIES
  useEffect(() => {
    if (isOpen && loanId) {
      fetchDocumentsByLoanId(loanId);
    }
  }, [isOpen, loanId]); // Removed fetchDocumentsByLoanId from deps

  // Fetch required documents - STABLE DEPENDENCIES
  useEffect(() => {
    if (isOpen && loanId) {
      fetchRequiredDocumentsByLoanId(loanId);
    }
  }, [isOpen, loanId]); // Removed fetchRequiredDocumentsByLoanId from deps

  // Initialize expanded sections for co-applicants
  useEffect(() => {
    if (coApplicants.length > 0) {
      const coApplicantSections = {};
      coApplicants.forEach(ca => {
        coApplicantSections[ca.id] = true;
      });
      setExpandedSections(prev => ({
        ...prev,
        coApplicants: coApplicantSections
      }));
    }
  }, [coApplicants]);

  // Process existing documents when they're fetched
 // Process existing documents when they're fetched
useEffect(() => {
  if (documents[loanId]) {
    const existingDocsMap = {};
    
    documents[loanId].forEach(doc => {
      // Use documentType as the document identifier
      const docType = doc.documentType?.toLowerCase().replace(/\s+/g, '_');
      
      const key = doc.coApplicantId 
        ? `CO_APPLICANT_${docType}_${doc.coApplicantId}`
        : `APPLICANT_${docType}`;
      
      existingDocsMap[key] = {
        file: doc.documentPath,
        fileName: doc.documentPath?.split('/').pop() || 'document',
        uploadedAt: doc.createdAt,
        verified: doc.verificationStatus === 'verified',
        documentId: doc.id,
        documentType: doc.documentType,
        applicantType: doc.coApplicantId ? "CO_APPLICANT" : "APPLICANT",
        coApplicantId: doc.coApplicantId,
        verificationStatus: doc.verificationStatus
      };
    });

    // Also process documents from co-applicants array if available
    coApplicants.forEach(coApp => {
      if (coApp.documents && coApp.documents.length > 0) {
        coApp.documents.forEach(doc => {
          const docType = doc.documentType?.toLowerCase().replace(/\s+/g, '_');
          const key = `CO_APPLICANT_${docType}_${coApp.id}`;
          
          existingDocsMap[key] = {
            file: doc.documentPath,
            fileName: doc.documentPath?.split('/').pop() || 'document',
            uploadedAt: doc.createdAt,
            verified: doc.verificationStatus === 'verified',
            documentId: doc.id,
            documentType: doc.documentType,
            applicantType: "CO_APPLICANT",
            coApplicantId: coApp.id,
            verificationStatus: doc.verificationStatus
          };
        });
      }
    });
    
    setExistingDocuments(existingDocsMap);
  }
}, [documents, loanId, coApplicants]);

  // Group documents by applicant
  const groupedDocuments = useMemo(() => {
    const groups = {
      applicant: {
        title: "Primary Applicant Documents",
        documents: loanRequiredDocs.filter(doc => doc.applicantType === "APPLICANT"),
        mandatoryCount: loanRequiredDocs.filter(doc => doc.applicantType === "APPLICANT" && doc.mandatory).length,
        uploadedCount: 0
      },
      coApplicants: {}
    };

    // Group co-applicant documents
    coApplicants.forEach(coApp => {
      const coAppDocs = loanRequiredDocs.filter(
        doc => doc.applicantType === "CO_APPLICANT"
      );
      
      if (coAppDocs.length > 0) {
        groups.coApplicants[coApp.id] = {
          title: `${coApp.firstName} ${coApp.lastName} - ${coApp.relationship || 'Co-Applicant'}`,
          documents: coAppDocs,
          mandatoryCount: coAppDocs.filter(doc => doc.mandatory).length,
          uploadedCount: 0,
          applicantDetails: coApp
        };
      }
    });

    return groups;
  }, [loanRequiredDocs, coApplicants]);

  // Calculate upload statistics
  const uploadStats = useMemo(() => {
    let totalMandatory = 0;
    let uploadedMandatory = 0;
    let totalOptional = 0;
    let uploadedOptional = 0;

    // Count primary applicant documents
    loanRequiredDocs
      .filter(doc => doc.applicantType === "APPLICANT")
      .forEach(doc => {
       const docKey = getDocKey(doc.documentName);
        const isUploaded = uploadedFiles[docKey] || existingDocuments[docKey];
        
        if (doc.mandatory) {
          totalMandatory++;
          if (isUploaded) uploadedMandatory++;
        } else {
          totalOptional++;
          if (isUploaded) uploadedOptional++;
        }
      });

    // Count co-applicant documents
    coApplicants.forEach(coApp => {
      loanRequiredDocs
        .filter(doc => doc.applicantType === "CO_APPLICANT")
        .forEach(doc => {
          const docKey = getDocKey(
  doc.documentName,
  coApp.id
);
          const isUploaded = uploadedFiles[docKey] || existingDocuments[docKey];
          
          if (doc.mandatory) {
            totalMandatory++;
            if (isUploaded) uploadedMandatory++;
          } else {
            totalOptional++;
            if (isUploaded) uploadedOptional++;
          }
        });
    });

    const completionPercentage = totalMandatory > 0 
      ? Math.round((uploadedMandatory / totalMandatory) * 100)
      : 0;

    return {
      totalMandatory,
      uploadedMandatory,
      totalOptional,
      uploadedOptional,
      completionPercentage,
      isComplete: uploadedMandatory === totalMandatory
    };
  }, [loanRequiredDocs, uploadedFiles, existingDocuments, coApplicants]);

  const validateFile = (file, doc) => {
    if (!file) return "No file selected";
    
    const maxSizeBytes = (doc.maxSize || 5) * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      return `File size should be less than ${doc.maxSize || 5}MB`;
    }

    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    if (doc.acceptedFormats && !doc.acceptedFormats.includes(fileExtension)) {
      return `Only ${doc.acceptedFormats.join(', ')} formats are accepted`;
    }

    return null;
  };

  const handleFileUpload = async (doc, file, applicantId = null) => {
    const docKey = getDocKey(
  doc.documentName,
  applicantId
);
    
    // Validate file
    const validationError = validateFile(file, doc);
    if (validationError) {
      setValidationErrors(prev => ({ ...prev, [docKey]: validationError }));
      toast.error(validationError);
      return;
    }

    // Clear any previous validation errors
    setValidationErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[docKey];
      return newErrors;
    });

    // Show immediate feedback
    setUploadProgress(prev => ({ ...prev, [docKey]: 0 }));
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const currentProgress = prev[docKey] || 0;
        if (currentProgress >= 90) {
          clearInterval(interval);
          return prev;
        }
        return { ...prev, [docKey]: currentProgress + 10 };
      });
    }, 200);

    // Store file in state
    setTimeout(() => {
      clearInterval(interval);
      setUploadedFiles(prev => ({ ...prev, [docKey]: file }));
      setUploadProgress(prev => ({ ...prev, [docKey]: 100 }));
      toast.success(`${doc.documentName} ready for upload`);
    }, 2000);
  };

  const handleRemoveFile = (doc, applicantId = null) => {
    const docKey = getDocKey(
  doc.documentName,
  applicantId
);
    
    setUploadedFiles(prev => {
      const newFiles = { ...prev };
      delete newFiles[docKey];
      return newFiles;
    });
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[docKey];
      return newProgress;
    });
    toast.info(`${doc.documentName} removed`);
  };

  const handleSubmitAll = async () => {
    if (!uploadStats.isComplete) {
      toast.error(`Please upload all ${uploadStats.totalMandatory - uploadStats.uploadedMandatory} mandatory documents`);
      return;
    }

    setIsSubmitting(true);
    
    try {
      const primaryDocs = [];
      const coApplicantDocs = [];

      // Separate documents by applicant type
      Object.entries(uploadedFiles).forEach(([key, file]) => {

  if (key.startsWith("APPLICANT_")) {

    const docType = key
      .replace("APPLICANT_", "")
      .replace(/_/g, " ");

    primaryDocs.push({
      docType,
      file,
      applicantType: "APPLICANT"
    });
  }

  if (key.startsWith("CO_APPLICANT_")) {

    const parts = key.split("_");
    const coApplicantId = parts.pop();

    const docType = parts
      .slice(2)
      .join(" ")
      .replace(/_/g, " ");

    coApplicantDocs.push({
      docType,
      file,
      applicantType: "CO_APPLICANT",
      coApplicantId
    });
  }
});

      // Upload primary applicant documents in bulk
      if (primaryDocs.length > 0) {
        await uploadDocumentsBulk(loanId, primaryDocs);
      }

      // Upload co-applicant documents individually
      for (const doc of coApplicantDocs) {
        await uploadCoApplicantDocument(doc.coApplicantId, doc.file, doc.docType);
      }
      
      toast.success("All documents uploaded successfully");
      
      // Refresh documents after successful upload
      await fetchDocumentsByLoanId(loanId);
      
      onUploadSuccess?.();
      onClose();
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(error.response?.data?.message || "Upload failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleSection = (section, coApplicantId = null) => {
    if (coApplicantId) {
      setExpandedSections(prev => ({
        ...prev,
        coApplicants: {
          ...prev.coApplicants,
          [coApplicantId]: !prev.coApplicants[coApplicantId]
        }
      }));
    } else {
      setExpandedSections(prev => ({
        ...prev,
        [section]: !prev[section]
      }));
    }
  };

  const DocumentUploadRow = ({ doc, applicantId = null, applicantDetails = null }) => {
    const docKey = getDocKey(
  doc.documentName,
  applicantId
);
    
    const file = uploadedFiles[docKey];
    const existingDoc = existingDocuments[docKey];
    const progress = uploadProgress[docKey] || 0;
    const error = validationErrors[docKey];
    const isUploading = progress > 0 && progress < 100;
    const isUploaded = progress === 100 && file;
    const hasExisting = existingDoc && !file;

    return (
      <div className={`p-4 border rounded-xl transition-all ${
        error ? 'border-red-200 bg-red-50' :
        isUploaded ? 'border-green-200 bg-green-50' :
        hasExisting ? 'border-blue-200 bg-blue-50' :
        'border-slate-200 hover:border-blue-200 hover:bg-blue-50/30'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Document Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <FileText className={`w-4 h-4 ${
                error ? 'text-red-500' :
                isUploaded ? 'text-green-600' :
                hasExisting ? 'text-blue-600' : 'text-slate-400'
              }`} />
              <h4 className="font-medium text-slate-800">{doc.documentName}</h4>
              <div className="flex items-center gap-2">
                {doc.mandatory && (
                  <span className="px-2 py-0.5 bg-red-100 text-red-600 rounded-full text-xs font-medium flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    Required
                  </span>
                )}
                <span className="px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full text-xs font-medium">
                  {doc.documentType}
                </span>
                {hasExisting && existingDoc.verified && (
                  <span className="px-2 py-0.5 bg-green-100 text-green-600 rounded-full text-xs font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified
                  </span>
                )}
                {hasExisting && !existingDoc.verified && (
                  <span className="px-2 py-0.5 bg-yellow-100 text-yellow-600 rounded-full text-xs font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Pending Verification
                  </span>
                )}
              </div>
            </div>
            
            {doc.description && (
              <p className="text-xs text-slate-500 flex items-center gap-1">
                <Info className="w-3 h-3" />
                {doc.description}
              </p>
            )}
            
            {doc.acceptedFormats && (
              <p className="text-xs text-slate-400 mt-1">
                Accepted: {doc.acceptedFormats.join(', ')} | Max: {doc.maxSize}MB
              </p>
            )}
          </div>

          {/* Upload Area */}
          <div className="lg:w-80">
            {hasExisting ? (
              <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-blue-200">
                <FileText className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-blue-700 truncate flex-1">
                  {existingDoc.fileName || 'Uploaded'}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => window.open(existingDoc.file, '_blank')}
                    className="p-1 hover:bg-blue-100 rounded-lg transition-colors"
                    title="View document"
                  >
                    <Eye className="w-4 h-4 text-blue-600" />
                  </button>
                  <button
                    onClick={() => handleRemoveFile(doc, applicantId)}
                    className="p-1 hover:bg-red-50 rounded-lg transition-colors"
                    title="Replace file"
                  >
                    <Upload className="w-4 h-4 text-blue-600" />
                  </button>
                </div>
              </div>
            ) : isUploaded ? (
              <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-green-200">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="text-sm text-green-700 truncate flex-1">{file.name}</span>
                <button
                  onClick={() => handleRemoveFile(doc, applicantId)}
                  className="p-1 hover:bg-red-50 rounded-lg transition-colors"
                  title="Remove file"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            ) : isUploading ? (
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Uploading...</span>
                  <span className="text-slate-600">{progress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="relative group">
                <input
                  type="file"
                  onChange={(e) => handleFileUpload(doc, e.target.files[0], applicantId)}
                  accept={doc.acceptedFormats?.join(',')}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className={`flex items-center gap-2 p-2.5 border-2 border-dashed rounded-lg transition-all ${
                  error ? 'border-red-300 bg-red-50' :
                  'border-slate-200 group-hover:border-blue-400 bg-white'
                }`}>
                  <Upload className={`w-5 h-5 ${
                    error ? 'text-red-400' : 'text-slate-400'
                  }`} />
                  <span className={`text-sm ${
                    error ? 'text-red-600' : 'text-slate-600'
                  }`}>
                    {error || (applicantDetails ? `Upload for ${applicantDetails.firstName}` : 'Click to upload')}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Required Document Upload</h2>
              <p className="text-sm text-slate-500 mt-1">
                Upload all mandatory documents to proceed with loan application
              </p>
            </div>
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-slate-200 rounded-full transition-all"
            >
              <X className="w-5 h-5 text-slate-600" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-600">
                Document Completion Progress
              </span>
              <span className="text-sm font-bold text-blue-600">
                {uploadStats.uploadedMandatory}/{uploadStats.totalMandatory} Mandatory
                {uploadStats.totalOptional > 0 && ` • ${uploadStats.uploadedOptional}/${uploadStats.totalOptional} Optional`}
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${
                  uploadStats.isComplete ? 'bg-green-500' : 'bg-blue-600'
                }`}
                style={{ width: `${uploadStats.completionPercentage}%` }}
              />
            </div>
          </div>

          {/* Summary Stats */}
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-slate-600">Mandatory ({uploadStats.totalMandatory - uploadStats.uploadedMandatory} pending)</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-slate-600">Optional</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span className="text-slate-600">Uploaded</span>
            </div>
          </div>
        </div>

        {/* Body - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {(coApplicantsLoading || documentsLoading) ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <>
              {/* Primary Applicant Section */}
              {groupedDocuments.applicant.documents.length > 0 && (
                <div className="space-y-3">
                  <button
                    onClick={() => toggleSection('applicant')}
                    className="flex items-center gap-2 w-full text-left"
                  >
                    {expandedSections.applicant ? (
                      <ChevronDown className="w-5 h-5 text-slate-500" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-slate-500" />
                    )}
                    <h3 className="text-lg font-semibold text-slate-700">
                      {groupedDocuments.applicant.title}
                    </h3>
                    <span className="ml-auto text-sm text-slate-500">
                      {groupedDocuments.applicant.documents.filter(d => 
                        uploadedFiles[getDocKey(d.documentName)] || existingDocuments[getDocKey(d.documentName)]
                      ).length}/{groupedDocuments.applicant.documents.length} uploaded
                    </span>
                  </button>

                  {expandedSections.applicant && (
                    <div className="space-y-3 pl-7">
                      {groupedDocuments.applicant.documents.map(doc => (
                        <DocumentUploadRow key={doc.id} doc={doc} />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Co-Applicant Sections */}
              {Object.entries(groupedDocuments.coApplicants).map(([coAppId, section]) => (
                <div key={coAppId} className="space-y-3">
                  <button
                    onClick={() => toggleSection('coApplicants', coAppId)}
                    className="flex items-center gap-2 w-full text-left"
                  >
                    {expandedSections.coApplicants[coAppId] ? (
                      <ChevronDown className="w-5 h-5 text-slate-500" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-slate-500" />
                    )}
                    <h3 className="text-lg font-semibold text-slate-700">
                      {section.title}
                    </h3>
                    <span className="ml-auto text-sm text-slate-500">
                      {section.documents.filter(d => 
                        uploadedFiles[getDocKey(d.documentName, coAppId)] || 
                        existingDocuments[
  getDocKey(d.documentName, coAppId)
]
                      ).length}/{section.documents.length} uploaded
                    </span>
                  </button>

                  {expandedSections.coApplicants[coAppId] && (
                    <div className="space-y-3 pl-7">
                      {section.documents.map(doc => (
                        <DocumentUploadRow 
                          key={`${coAppId}_${doc.id}`} 
                          doc={doc} 
                          applicantId={coAppId}
                          applicantDetails={section.applicantDetails}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Empty State */}
              {loanRequiredDocs.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500 text-lg font-medium">No documents required</p>
                  <p className="text-slate-400 text-sm mt-2">No documents are configured for this loan application</p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-200 bg-slate-50">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 text-slate-700 font-medium hover:bg-white rounded-xl transition-all border border-slate-200"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                // Save draft logic
                toast.success("Draft saved successfully");
              }}
              className="flex-1 py-3 px-4 text-slate-700 font-medium hover:bg-white rounded-xl transition-all border border-slate-200"
            >
              Save Draft
            </button>
            <button
              onClick={handleSubmitAll}
              disabled={!uploadStats.isComplete || isSubmitting}
              className={`flex-1 py-3 px-4 text-white font-bold rounded-xl shadow-lg transition-all ${
                uploadStats.isComplete && !isSubmitting
                  ? 'bg-green-600 hover:bg-green-700 shadow-green-200'
                  : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Uploading...
                </span>
              ) : uploadStats.isComplete ? (
                'Upload & Submit Documents'
              ) : (
                `Upload ${uploadStats.totalMandatory - uploadStats.uploadedMandatory} Pending Documents`
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicDocumentUpload;