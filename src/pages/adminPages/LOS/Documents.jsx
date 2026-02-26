import React, { useState, useMemo, useEffect } from 'react';
import {
  FileText,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  Eye,
  Search,
  User,
  Building,
  Calendar,
  Clock,
  Plus,
  ChevronDown,
  Users,
  Home,
  Briefcase,
  Banknote,
  TrendingUp,
  Upload,
  Filter,
  RefreshCw,
  UserPlus
} from 'lucide-react';
import useDocuments from '../../../hooks/useDocuments';
import UploadDocumentModal from '../../../components/admin/modals/UploadDocumentModal';
import toast from 'react-hot-toast';
import DynamicDocumentUpload from '../../../components/admin/modals/UploadDocumentModal';
import useCoApplicants from '../../../hooks/useCoApplicants';

const DocumentsManagementPage = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const {
    coApplicants,
    fetchCoApplicants
  } = useCoApplicants();

  const {
    applications,
    documents,
    fetchApplications,
    fetchDocumentsByLoanId,
    uploadDocument,
    verifyDocument,
    rejectDocument,
  } = useDocuments();
  useEffect(() => {
    fetchApplications();
  }, []);



  // Selected application state - null means no application selected
  const [selectedApplication, setSelectedApplication] = useState(null);

  // Search state
  const [searchTerm, setSearchTerm] = useState('');


  // Filter applications based on search
  const filteredApplications = useMemo(() => {
    if (!searchTerm.trim()) return applications;

    const term = searchTerm.toLowerCase();

    return applications.filter(app =>
      app.loanNumber?.toLowerCase().includes(term) ||
      app.applicationNumber?.toLowerCase().includes(term) ||
      app.applicantName?.toLowerCase().includes(term) ||
      (app.coApplicantName &&
        app.coApplicantName.toLowerCase().includes(term))
    );
  }, [applications, searchTerm]);


  // Get current application documents
  const currentDocuments = useMemo(() => {
  if (!selectedApplication) return [];

  const docsObj = documents[selectedApplication.id] || {};

  return Object.keys(docsObj).map((key, index) => ({
    id: index + 1,
    name: key.replaceAll("_", " ").toUpperCase(),
    url: docsObj[key],
    status: "PENDING", // mock status
    category: key,
    applicantType: "APPLICANT",
    uploadDate: "—",
  }));
}, [documents, selectedApplication]);

  // Handle document verification
  const handleVerify = async (docId) => {
    if (!selectedApplication) return;

    await verifyDocument(docId);
    fetchDocumentsByLoanId(selectedApplication.id);
  };


  // Handle document rejection
  const handleReject = async (docId) => {
    const reason = prompt("Enter rejection reason");
    if (!reason) return;

    await rejectDocument(docId, reason);
    fetchDocumentsByLoanId(selectedApplication.id);
  };




  const handleSubmitUpload = async ({
    documentType,
    documents,
  }) => {
    try {
      await uploadDocument(
        selectedApplication.id,
        documents[0].file,
        documentType
      );

      fetchDocumentsByLoanId(selectedApplication.id);

      toast.success("Document uploaded successfully");

    } catch (error) {
      console.error(error);
      toast.error("Failed to upload document");
    }
  };



  // Clear selected application
  const handleBackToApplications = () => {
    setSelectedApplication(null);
    setSearchTerm('');
    setIsUploadModalOpen(false);
  };

  // Document stats
  const documentStats = {
    total: currentDocuments.length,
    verified: currentDocuments.filter(d => d.status === 'VERIFIED').length,
    pending: currentDocuments.filter(d => d.status === 'PENDING').length,
    rejected: currentDocuments.filter(d => d.status === 'REJECTED').length
  };

  // If application selected, show document management view
  if (selectedApplication) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header with Back Button */}
          <div className="mb-6">
            <button
              onClick={handleBackToApplications}
              className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
            >
              ← Back to Applications
            </button>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <h1 className="text-2xl font-bold text-gray-900">{selectedApplication.loanNumber}</h1>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                      {selectedApplication.currentStage}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <User className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Applicant</p>
                        <p className="font-semibold">{selectedApplication.applicantName}</p>
                      </div>
                    </div>

                    {selectedApplication.coApplicantName && (
                      <div className="flex items-center gap-2">
                        <UserPlus className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Co-applicant</p>
                          <p className="font-semibold">{selectedApplication.coApplicantName}</p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <Banknote className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Loan Amount</p>
                        <p className="font-semibold">₹{selectedApplication.loanAmount
                          ? selectedApplication.loanAmount.toLocaleString('en-IN')
                          : '0'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsUploadModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  <Upload size={18} />
                  Upload Document
                </button>

              </div>
            </div>
          </div>

          {/* Document Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Documents</p>
                  <p className="text-2xl font-bold text-gray-900">{documentStats.total}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-500" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Verified</p>
                  <p className="text-2xl font-bold text-green-600">{documentStats.verified}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">{documentStats.pending}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-500" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Rejected</p>
                  <p className="text-2xl font-bold text-red-600">{documentStats.rejected}</p>
                </div>
                <XCircle className="w-8 h-8 text-red-500" />
              </div>
            </div>
          </div>

          {/* Documents Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Documents</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Document</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applicant</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Upload Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentDocuments.map((doc) => (
                    <tr key={doc.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-gray-400" />
                          <span className="font-medium text-gray-900">{doc.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {doc.category?.replace('_', ' ') || '—'}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${doc.applicantType === 'APPLICANT'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-purple-100 text-purple-700'
                            }`}

                        >
                          {doc.applicantType === 'APPLICANT' ? 'Primary' : 'Co-applicant'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{doc.uploadDate}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${doc.status === 'VERIFIED' ? 'bg-green-100 text-green-700' :
                          doc.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                          {doc.status === 'VERIFIED' && <CheckCircle className="w-3 h-3 mr-1" />}
                          {doc.status === 'PENDING' && <Clock className="w-3 h-3 mr-1" />}
                          {doc.status === 'REJECTED' && <XCircle className="w-3 h-3 mr-1" />}
                          {doc.status}
                        </span>
                      </td>
                   
                    </tr>
                  ))}

                  {currentDocuments.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center">
                        <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500 font-medium">No documents uploaded yet</p>
                        <p className="text-sm text-gray-400 mt-1">Click 'Upload Document' to add files</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <DynamicDocumentUpload
          isOpen={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
          loanId={selectedApplication?.id}
          coApplicants={coApplicants}
          onUploadSuccess={() =>
            fetchDocumentsByLoanId(selectedApplication.id)
          }
        />
      </div>
    );
  }

  // Show all applications
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Document Verification</h1>
          <p className="text-gray-600 mt-1">Select a loan application to manage documents</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by loan number, application ID, or applicant name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Applications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApplications.map((app) => {
            const appDocs = documents[app.id] || [];
            const verifiedCount = appDocs.filter(d => d.status === 'VERIFIED').length;
            const pendingCount = appDocs.filter(d => d.status === 'PENDING').length;
            const progress = Math.round((appDocs.length / app.totalDocuments) * 100);

            return (
              <div
                key={app.id}
                onClick={() => {
                  setSelectedApplication(app);
                  fetchDocumentsByLoanId(app.id);
                  fetchCoApplicants(app.id);   // ADD THIS
                }}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all cursor-pointer"
              >
                {/* Loan Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{app.loanNumber}</h3>
                    <p className="text-sm text-gray-500">App: {app.applicationNumber}</p>
                  </div>
                  <span className="px-2.5 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                    {app.currentStage}
                  </span>
                </div>

                {/* Applicant Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm">
                    <User className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-gray-700">{app.applicantName}</span>
                  </div>
                  {app.coApplicantName && (
                    <div className="flex items-center text-sm">
                      <UserPlus className="w-4 h-4 text-gray-500 mr-2" />
                      <span className="text-gray-600">{app.coApplicantName}</span>
                    </div>
                  )}
                  <div className="flex items-center text-sm">
                    <Banknote className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-gray-700">₹{app.loanAmount?.toLocaleString('en-IN') || '0'}
                    </span>
                  </div>
                </div>

                {/* Document Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Document Progress</span>
                    <span className="font-semibold text-gray-900">{appDocs.length}/{app.totalDocuments}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Status Summary */}
                <div className="flex gap-3 text-xs">
                  {verifiedCount > 0 && (
                    <span className="flex items-center text-green-600">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {verifiedCount} Verified
                    </span>
                  )}
                  {pendingCount > 0 && (
                    <span className="flex items-center text-yellow-600">
                      <Clock className="w-3 h-3 mr-1" />
                      {pendingCount} Pending
                    </span>
                  )}
                </div>

                {/* Click Indicator */}
                <div className="mt-4 pt-3 border-t border-gray-100 text-right">
                  <span className="text-xs text-blue-600 font-medium">Click to manage documents →</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredApplications.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default DocumentsManagementPage;