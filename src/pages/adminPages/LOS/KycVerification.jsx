import React, { useState, useMemo, useEffect } from 'react';
import {
  Search, Filter, CheckCircle, XCircle, Clock, Eye, FileText,
  ShieldCheck, User, Calendar, AlertTriangle, ChevronRight, Download,
  RefreshCw, Camera, ScanLine, Check, TrendingUp, CreditCard,
  BarChart, Shield, Percent, Activity, Target, TrendingDown
} from 'lucide-react';
import { useGetLoanApplications, useUpdateLoan } from '../../../hooks/useLoanApplication.js';
import toast from 'react-hot-toast';
import useDocuments from '../../../hooks/useDocuments.js';

export default function KycVerification() {
  // --- STATE ---
  const {
  documents,
  fetchDocumentsByLoanId,
  verifyDocument,
  rejectDocument,
  loading: docsLoading
} = useDocuments();
  const [activeDoc, setActiveDoc] = useState(null);
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [cibilData, setCibilData] = useState({
    score: 750,
    lastUpdated: '2025-02-09',
    band: 'Good',
    factors: [
      { name: 'Credit Utilization', score: 85, status: 'good' },
      { name: 'Payment History', score: 92, status: 'good' },
      { name: 'Credit Age', score: 65, status: 'average' },
      { name: 'Credit Mix', score: 78, status: 'good' },
      { name: 'Recent Inquiries', score: 45, status: 'poor' }
    ],
    loans: [
      { type: 'Personal Loan', amount: '₹2,50,000', status: 'Active', emi: '₹8,500' },
      { type: 'Credit Card', limit: '₹1,00,000', utilized: '₹35,000', status: 'Active' },
      { type: 'Home Loan', amount: '₹45,00,000', status: 'Active', emi: '₹38,000' }
    ],
    inquiries: [
      { date: '2025-01-15', lender: 'HDFC Bank', type: 'Personal Loan' },
      { date: '2024-12-20', lender: 'ICICI Bank', type: 'Credit Card' },
      { date: '2024-11-05', lender: 'Axis Bank', type: 'Car Loan' }
    ]
  });

  // --- COMPONENTS ---
  const { data: loans = [], isLoading } = useGetLoanApplications();
  const updateLoan = useUpdateLoan();

  const kycList = useMemo(() => {
    return loans.map((loan) => ({
      ...loan,
      normalizedStatus: (
        loan.status ||
        loan.loanStatus ||
        loan.kycStatus ||
        ""
      ).toLowerCase(),
    }));
  }, [loans]);

  const StatusBadge = ({ status }) => {

    const formattedStatus = status?.toUpperCase();

    const styles = {
      VERIFIED: "bg-green-100 text-green-700 border-green-200",
      KYC_PENDING: "bg-orange-100 text-orange-700 border-orange-200",
      REJECTED: "bg-red-100 text-red-700 border-red-200",
    };

    return (
      <span className={`px-2 py-1 text-xs font-bold rounded-full border ${styles[formattedStatus]}`}>
        {formattedStatus.replace("_", " ")}
      </span>
    );
  };


  const CibilScoreBadge = ({ score }) => {
    const getScoreColor = (score) => {
      if (score >= 750) return 'text-green-600 bg-green-50 border-green-200';
      if (score >= 650) return 'text-blue-600 bg-blue-50 border-blue-200';
      if (score >= 550) return 'text-orange-600 bg-orange-50 border-orange-200';
      return 'text-red-600 bg-red-50 border-red-200';
    };

    const getScoreBand = (score) => {
      if (score >= 750) return 'Excellent';
      if (score >= 700) return 'Good';
      if (score >= 650) return 'Fair';
      if (score >= 550) return 'Poor';
      return 'Very Poor';
    };

    return (
      <div className={`inline-flex items-center px-3 py-1 rounded-full border ${getScoreColor(score)}`}>
        <TrendingUp className="w-3 h-3 mr-1" />
        <span className="font-bold">{score}</span>
        <span className="text-xs ml-1">({getScoreBand(score)})</span>
      </div>
    );
  };

  // CIBIL Score Meter Component
  const CibilScoreMeter = ({ score }) => {
    const percentage = Math.min(100, (score / 900) * 100);

    const getGradientColor = () => {
      if (score >= 750) return 'from-green-500 to-green-400';
      if (score >= 650) return 'from-blue-500 to-blue-400';
      if (score >= 550) return 'from-orange-500 to-orange-400';
      return 'from-red-500 to-red-400';
    };

    return (
      <div className="relative w-full h-8 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`absolute h-full bg-gradient-to-r ${getGradientColor()} transition-all duration-1000 ease-out`}
          style={{ width: `${percentage}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-between px-4 text-xs font-bold">
          <span className="text-gray-700">300</span>
          <span className="text-gray-700">900</span>
        </div>
        <div
          className="absolute top-0 h-8 w-0.5 bg-gray-900"
          style={{ left: `${percentage}%` }}
        >
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
            <div className="bg-gray-900 text-white px-2 py-1 rounded text-xs font-bold">
              {score}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // CIBIL Risk Factors Component
  const CibilRiskFactors = ({ factors }) => {
    return (
      <div className="space-y-3">
        {factors.map((factor, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              {factor.status === 'good' && <CheckCircle className="w-4 h-4 text-green-500 mr-2" />}
              {factor.status === 'average' && <AlertTriangle className="w-4 h-4 text-yellow-500 mr-2" />}
              {factor.status === 'poor' && <XCircle className="w-4 h-4 text-red-500 mr-2" />}
              <span className="text-sm text-gray-700">{factor.name}</span>
            </div>
            <div className="flex items-center">
              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden mr-2">
                <div
                  className={`h-full ${factor.status === 'good' ? 'bg-green-500' :
                    factor.status === 'average' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                  style={{ width: `${factor.score}%` }}
                />
              </div>
              <span className="text-sm font-bold text-gray-900 w-8 text-right">
                {factor.score}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // --- LOGIC ---

  const filteredData = useMemo(() => {
    return kycList.filter(item => {

      const status = item.normalizedStatus;

      const matchesTab =
        activeTab === "all" ? true :
          activeTab === "pending" ? status === "kyc_pending" :
            activeTab === "verified" ? status === "approved" :
              status === "rejected";

      const matchesSearch =
        item.applicantName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.loanNumber?.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesTab && matchesSearch;

    });
  }, [kycList, activeTab, searchTerm]);

  useEffect(() => {
    if (selectedCustomer && documents[selectedCustomer.id]) {
      const keys = Object.keys(documents[selectedCustomer.id]);
      if (keys.length > 0) {
        setActiveDoc(keys[0]);
      }
    }
  }, [selectedCustomer, documents]);



  const handleVerifyClick = async (customer) => {
    setSelectedCustomer(customer);

    // 🔥 Backend se documents fetch karo
    await fetchDocumentsByLoanId(customer.id);

    setActiveDoc(null); // first doc auto select useEffect karega
    setShowModal(true);
  };
  const customerDocs = documents[selectedCustomer?.id] || {};
  const docKeys = Object.keys(customerDocs);

  // --- MODAL: VERIFICATION VIEW ---
  const VerificationModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden">

        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div>
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <ShieldCheck className="text-blue-600" /> KYC Verification
            </h2>
            <p className="text-sm text-gray-500 mt-1">Reviewing documents for <span className="font-bold text-gray-700">{selectedCustomer.applicantName}</span></p>
          </div>
          <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-200 rounded-full"><XCircle size={24} className="text-gray-500" /></button>
        </div>

        {/* Body (Three Column Layout) */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">

          {/* Left: Document Preview (40%) */}
          <div className="w-full lg:w-2/5 bg-gray-900 p-6 flex flex-col items-center justify-center relative">
            <div className="absolute top-4 right-4 flex gap-2">
              <button className="bg-black/50 text-white px-3 py-1 rounded text-xs hover:bg-black/70">Rotate</button>
              <button className="bg-black/50 text-white px-3 py-1 rounded text-xs hover:bg-black/70">Zoom</button>
            </div>
            {/* Mock Document Image */}
            <div className="w-full h-full bg-gray-800 rounded-lg border-2 border-gray-700 flex items-center justify-center text-gray-500">
              <div className="text-center">
                {docsLoading ? (
                  <p className="text-white">Loading Documents...</p>
                ) : activeDoc ? (
                  <img
                    src={customerDocs[activeDoc]}
                    alt={activeDoc}
                    className="max-h-full object-contain rounded"
                  />
                ) : (
                  <div className="text-gray-400">
                    <FileText size={64} className="mx-auto mb-4 opacity-50" />
                    <p>No Preview</p>
                  </div>
                )}
                {!activeDoc && !docsLoading && (
                  <p className="text-xs mt-2 text-gray-400">
                    No preview available
                  </p>
                )}
              </div>
            </div>
            <div className="mt-4 flex gap-4 overflow-x-auto w-full p-2">
              {docKeys.length > 0 ? (
                docKeys.map((doc, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveDoc(doc)}
                    className="min-w-[100px] h-20 bg-gray-800 rounded border-2 border-gray-700 cursor-pointer flex flex-col items-center justify-center text-xs text-gray-300 hover:border-blue-500"
                  >
                    <img
                      src={customerDocs[doc]}
                      alt={doc}
                      className="h-12 object-contain mb-1"
                    />
                    <span className="uppercase text-[10px] text-center px-1">
                      {doc.replace("_", " ")}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-sm">No documents uploaded</p>
              )}
            </div>

          </div>


          {/* Middle: Data Matching Form (30%) */}
          <div className="w-full lg:w-2/5 bg-white border-l border-gray-200 flex flex-col">
            <div className="p-6 flex-1 overflow-y-auto">

              <div className="space-y-6">
                {/* Name Match */}
                <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                  <label className="text-xs font-bold text-gray-500 uppercase">Name Match Score</label>
                  <div className="flex justify-between items-center mt-1">
                    <span className="font-bold text-green-700 text-lg">98% Match</span>
                    <CheckCircle size={20} className="text-green-600" />
                  </div>
                  <div className="text-xs text-gray-600 mt-2">
                    System: {selectedCustomer.applicantName}<br />
                    Doc: {selectedCustomer.applicantName}
                  </div>
                </div>

                {/* PAN Field */}


                {/* Risk Flag */}
                {selectedCustomer.risk === 'High' && (
                  <div className="p-3 bg-red-50 text-red-700 rounded-lg border border-red-100 flex items-start gap-2 text-sm">
                    <AlertTriangle size={16} className="mt-0.5 flex-shrink-0" />
                    <span>High Risk Flag: Multiple recent inquiries found on credit report.</span>
                  </div>
                )}
              </div>

              {/* CIBIL Quick View */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-800 flex items-center gap-2">
                    <CreditCard size={18} /> CIBIL Score
                  </h3>
                  <CibilScoreBadge score={cibilData.score} />
                </div>
                <div className="mb-4">
                  <CibilScoreMeter score={cibilData.score} />
                </div>
                <p className="text-xs text-gray-500">Last updated: {cibilData.lastUpdated}</p>
              </div>
            </div>
          </div>

          {/* Right: CIBIL Detailed View (30%) */}
          <div className="w-full lg:w-2/5 bg-gray-50 border-l border-gray-200 flex flex-col">
            <div className="p-6 flex-1 overflow-y-auto">
              <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
                <BarChart size={18} className="text-blue-600" /> CIBIL Detailed Report
              </h3>

              {/* Score Summary */}
              <div className="bg-white p-4 rounded-xl border border-gray-200 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Current Score</p>
                    <p className="text-3xl font-bold text-gray-900">{cibilData.score}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full font-bold ${cibilData.score >= 750 ? 'bg-green-100 text-green-700' :
                    cibilData.score >= 650 ? 'bg-blue-100 text-blue-700' :
                      cibilData.score >= 550 ? 'bg-orange-100 text-orange-700' :
                        'bg-red-100 text-red-700'
                    }`}>
                    {cibilData.band}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Credit Age</p>
                    <p className="font-bold text-gray-900">4.2 years</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Active Loans</p>
                    <p className="font-bold text-gray-900">{cibilData.loans.length}</p>
                  </div>
                </div>
              </div>

              {/* Risk Factors */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Activity size={16} /> Risk Factors
                </h4>
                <CibilRiskFactors factors={cibilData.factors} />
              </div>

              {/* Active Loans */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Target size={16} /> Active Credit Lines
                </h4>
                <div className="space-y-2">
                  {cibilData.loans.map((loan, index) => (
                    <div key={index} className="bg-white p-3 rounded-lg border border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm">{loan.type}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${loan.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                          }`}>
                          {loan.status}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Amount: {loan.amount || loan.limit}
                        {loan.emi && ` | EMI: ${loan.emi}`}
                        {loan.utilized && ` | Utilized: ${loan.utilized}`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Inquiries */}
              {/* <div>
                <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <TrendingDown size={16} /> Recent Inquiries
                </h4>
                <div className="space-y-2">
                  {cibilData.inquiries.map((inquiry, index) => (
                    <div key={index} className="bg-white p-3 rounded-lg border border-gray-200">
                      <div className="flex justify-between">
                        <span className="font-medium text-sm">{inquiry.lender}</span>
                        <span className="text-xs text-gray-500">{inquiry.date}</span>
                      </div>
                      <div className="text-xs text-gray-500">{inquiry.type}</div>
                    </div>
                  ))}
                </div>
              </div> */}
            </div>

            {/* CIBIL Actions */}

          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t bg-gray-50">
          <div className="flex gap-3">
            <button onClick={async () => {
              await updateLoan.mutateAsync({
                id: selectedCustomer.id,
                status: "rejected",
              });
              toast.error("KYC Rejected");

              setShowModal(false);
              setShowModal(false);
            }} className="flex-1 py-3 border border-red-200 bg-white text-red-600 rounded-xl font-bold hover:bg-red-50">
              Reject / Retry
            </button>
            <button
              onClick={async () => {

                await updateLoan.mutateAsync({
                  id: selectedCustomer.id,
                  status: "approved",
                });

                toast.success("KYC Verified");

                setShowModal(false);

              }}
            >
              Approve KYC
            </button>

          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-10 font-sans">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <ShieldCheck className="text-blue-600" size={32} /> KYC Verification
          </h1>
          <p className="text-gray-500 mt-1 ml-11">Verify customer identity, review documents, and manage compliance.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 animate-in fade-in zoom-in duration-300">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-l-4 border-l-orange-500 border-gray-100">
          <p className="text-xs font-bold text-gray-400 uppercase">Pending Review</p>
          <h3 className="text-3xl font-bold text-gray-800 mt-1">{kycList.filter(k => k.normalizedStatus === "kyc_pending").length}</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-l-4 border-l-green-500 border-gray-100">
          <p className="text-xs font-bold text-gray-400 uppercase">Verified</p>
          <h3 className="text-3xl font-bold text-gray-800 mt-1">{kycList.filter(k => k.normalizedStatus === "approved").length}</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-l-4 border-l-blue-500 border-gray-100">
          <p className="text-xs font-bold text-gray-400 uppercase">Avg CIBIL Score</p>
          <h3 className="text-3xl font-bold text-gray-800 mt-1">
            {kycList.length > 0
              ? Math.round(
                kycList.reduce((acc, k) => acc + (k.cibilScore || 0), 0) /
                kycList.length
              )
              : 0}

          </h3>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-l-4 border-l-red-500 border-gray-100">
          <p className="text-xs font-bold text-gray-400 uppercase">Rejected (This Week)</p>
          <h3 className="text-3xl font-bold text-gray-800 mt-1">{kycList.filter(k => k.normalizedStatus === "rejected").length}</h3>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden animate-in slide-in-from-bottom-4 duration-300">

        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50/50">

          {/* Tabs */}
          <div className="flex bg-gray-200/50 p-1 rounded-lg">
            {['all', 'pending', 'verified', 'rejected'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium capitalize transition-all ${activeTab === tab ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search Name or Loan ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 font-semibold border-b">
              <tr>
                <th className="px-6 py-4">Request ID</th>
                <th className="px-6 py-4">Loan Number</th>
                <th className="px-6 py-4">Docs Submitted</th>
                <th className="px-6 py-4">CIBIL Score</th>
                <th className="px-6 py-4">Submitted On</th>
                <th className="px-6 py-4">Risk Profile</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-blue-50/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-gray-500">{item.id}</td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-800">{item.applicantName}</div>
                      <div className="text-xs text-blue-600">{item.loanNumber}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {Object.keys(item.documents || {}).length > 0 ? (
                        Object.keys(item.documents).map((doc) => (
                          <span
                            key={doc}
                            className="inline-block bg-gray-100 px-2 py-1 rounded text-xs mr-1 uppercase"
                          >
                            {doc.replaceAll("_", " ")}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-400 text-xs">No Docs</span>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <CibilScoreBadge score={item.cibilScore} />
                    </td>
                    <td className="px-6 py-4 text-gray-500">{item.applicationDate}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-bold px-2 py-1 rounded ${item.risk === 'High' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                        {item.risk} Risk
                      </span>
                    </td>
                    <td className="px-6 py-4"><StatusBadge status={item.status} /></td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleVerifyClick(item)}
                        className="px-4 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 shadow-sm flex items-center gap-1 ml-auto transition"
                      >
                        <Eye size={14} /> Review
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="8" className="p-10 text-center text-gray-400">No requests found in this category.</td></tr>
              )}
            </tbody>
          </table>
        </div>

      </div>



      {/* Modal Injection */}
      {showModal && selectedCustomer && <VerificationModal />}

    </div>
  );
}