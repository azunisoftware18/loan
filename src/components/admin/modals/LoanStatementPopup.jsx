import React, { useState, useEffect } from "react";
import {
  Calendar,
  Download,
  Eye,
  FileText,
  X,
  CheckCircle,
  AlertCircle,
  Printer
} from "lucide-react";

// Main Popup Component
const LoanStatementPopup = ({ isOpen, onClose, loanAccountNumber = "" }) => {
  const [formData, setFormData] = useState({
    loanAccount: loanAccountNumber,
    dob: "",
    tenure: "Full Statement",
    fromDate: "",
    toDate: ""
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [statementData, setStatementData] = useState([]);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...prev,
        loanAccount: loanAccountNumber
      }));
      setShowPreview(false);
      setErrors({});
    }
  }, [isOpen, loanAccountNumber]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};

    // Loan Account Number validation
    if (!formData.loanAccount.trim()) {
      newErrors.loanAccount = "Loan account number is required";
    } else if (!/^[A-Z0-9]{8,12}$/.test(formData.loanAccount)) {
      newErrors.loanAccount = "Enter a valid loan account number (8-12 alphanumeric)";
    }

    // Date of Birth validation
    if (!formData.dob) {
      newErrors.dob = "Date of birth is required";
    } else {
      const dobDate = new Date(formData.dob);
      const today = new Date();
      if (dobDate > today) {
        newErrors.dob = "Date of birth cannot be in future";
      }
    }

    // Custom date range validation
    if (formData.tenure === "Custom Range") {
      if (!formData.fromDate) {
        newErrors.fromDate = "From date is required";
      }
      if (!formData.toDate) {
        newErrors.toDate = "To date is required";
      }
      if (formData.fromDate && formData.toDate && new Date(formData.fromDate) > new Date(formData.toDate)) {
        newErrors.fromDate = "From date cannot be after to date";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Generate sample statement data (replace with API call)
  const generateStatementData = () => {
    return Array.from({ length: 6 }, (_, i) => {
      const emiNo = i + 1;
      const emiAmount = 2350;
      const principal = Math.round(emiAmount * 0.8);
      const interest = emiAmount - principal;
      const openingBalance = 50000 - (emiNo - 1) * principal;
      const closingBalance = openingBalance - principal;
      
      return {
        emiNo,
        date: `2025-0${emiNo}-15`,
        openingBalance: `₹${openingBalance.toLocaleString()}`,
        emiAmount: `₹${emiAmount.toLocaleString()}`,
        principal: `₹${principal.toLocaleString()}`,
        interest: `₹${interest.toLocaleString()}`,
        closingBalance: `₹${closingBalance.toLocaleString()}`,
        status: emiNo <= 3 ? "Paid" : "Pending",
        paymentMode: emiNo === 3 ? "Cash" : "NACH"
      };
    });
  };

  // Handle View Statement
  const handleViewStatement = () => {
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setStatementData(generateStatementData());
      setShowPreview(true);
      setIsLoading(false);
    }, 800);
  };

  // Handle Download PDF
  const handleDownloadPDF = () => {
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate PDF generation
    setTimeout(() => {
      // In real implementation, this would generate/download PDF
      alert(`PDF Generated: LoanStatement_${formData.loanAccount}.pdf`);
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  // Calculate totals for preview
  const calculateTotals = () => {
    const paidEMIs = statementData.filter(item => item.status === "Paid");
    const totalPaid = paidEMIs.length * 2350;
    const totalInterest = paidEMIs.length * (2350 * 0.2);
    
    return {
      totalEMIs: statementData.length,
      paidEMIs: paidEMIs.length,
      pendingEMIs: statementData.length - paidEMIs.length,
      totalPaid: `₹${totalPaid.toLocaleString()}`,
      totalInterest: `₹${totalInterest.toLocaleString()}`
    };
  };

  const totals = calculateTotals();

  // Close modal on background click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="text-blue-600" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Loan Account Statement</h2>
              <p className="text-sm text-gray-500">Download or view loan statement details</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            disabled={isLoading}
          >
            <X size={22} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {!showPreview ? (
            // Form Section
            <div className="space-y-6">
              {/* Loan Account Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Account Number *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="loanAccount"
                    value={formData.loanAccount}
                    onChange={handleChange}
                    placeholder="Enter Loan Account Number"
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                      errors.loanAccount ? "border-red-300" : "border-gray-300"
                    }`}
                    disabled={isLoading}
                  />
                  {errors.loanAccount && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.loanAccount}
                    </p>
                  )}
                </div>
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Customer Date of Birth *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                      errors.dob ? "border-red-300" : "border-gray-300"
                    }`}
                    disabled={isLoading}
                  />
                </div>
                {errors.dob && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.dob}
                  </p>
                )}
              </div>

              {/* Statement Tenure */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Statement Tenure *
                </label>
                <select
                  name="tenure"
                  value={formData.tenure}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  disabled={isLoading}
                >
                  <option value="Full Statement">Full Statement</option>
                  <option value="Last 3 Months">Last 3 Months</option>
                  <option value="Last 6 Months">Last 6 Months</option>
                  <option value="Last 1 Year">Last 1 Year</option>
                  <option value="Custom Range">Custom Range</option>
                </select>

                {/* Custom Date Range Fields */}
                {formData.tenure === "Custom Range" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        From Date *
                      </label>
                      <input
                        type="date"
                        name="fromDate"
                        value={formData.fromDate}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                          errors.fromDate ? "border-red-300" : "border-gray-300"
                        }`}
                        disabled={isLoading}
                      />
                      {errors.fromDate && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle size={14} />
                          {errors.fromDate}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        To Date *
                      </label>
                      <input
                        type="date"
                        name="toDate"
                        value={formData.toDate}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                          errors.toDate ? "border-red-300" : "border-gray-300"
                        }`}
                        disabled={isLoading}
                      />
                      {errors.toDate && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle size={14} />
                          {errors.toDate}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            // Preview Section
            <div className="space-y-6">
              {/* Statement Header */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Loan Account</p>
                    <p className="font-bold">{formData.loanAccount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Tenure</p>
                    <p className="font-bold">{formData.tenure}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Generated On</p>
                    <p className="font-bold">{new Date().toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Records</p>
                    <p className="font-bold">{statementData.length} EMI Records</p>
                  </div>
                </div>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <p className="text-sm text-green-600 font-medium">Paid EMI</p>
                  <p className="text-2xl font-bold text-green-700">{totals.paidEMIs}</p>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <p className="text-sm text-yellow-600 font-medium">Pending EMI</p>
                  <p className="text-2xl font-bold text-yellow-700">{totals.pendingEMIs}</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <p className="text-sm text-blue-600 font-medium">Total Paid</p>
                  <p className="text-2xl font-bold text-blue-700">{totals.totalPaid}</p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                  <p className="text-sm text-purple-600 font-medium">Total Interest</p>
                  <p className="text-2xl font-bold text-purple-700">{totals.totalInterest}</p>
                </div>
              </div>

              {/* Statement Table */}
              <div className="border rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="p-3 text-left text-sm font-semibold text-gray-700">EMI No</th>
                        <th className="p-3 text-left text-sm font-semibold text-gray-700">Date</th>
                        <th className="p-3 text-left text-sm font-semibold text-gray-700">Opening Balance</th>
                        <th className="p-3 text-left text-sm font-semibold text-gray-700">EMI Amount</th>
                        <th className="p-3 text-left text-sm font-semibold text-gray-700">Principal</th>
                        <th className="p-3 text-left text-sm font-semibold text-gray-700">Interest</th>
                        <th className="p-3 text-left text-sm font-semibold text-gray-700">Closing Balance</th>
                        <th className="p-3 text-left text-sm font-semibold text-gray-700">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {statementData.map((row, index) => (
                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                          <td className="p-3 font-medium">#{row.emiNo}</td>
                          <td className="p-3 text-gray-600">{row.date}</td>
                          <td className="p-3 font-medium">{row.openingBalance}</td>
                          <td className="p-3 font-medium">{row.emiAmount}</td>
                          <td className="p-3 text-green-600 font-medium">{row.principal}</td>
                          <td className="p-3 text-blue-600 font-medium">{row.interest}</td>
                          <td className="p-3 font-medium">{row.closingBalance}</td>
                          <td className="p-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              row.status === "Paid" 
                                ? "bg-green-100 text-green-700 border border-green-200"
                                : "bg-yellow-100 text-yellow-700 border border-yellow-200"
                            }`}>
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="border-t p-6">
          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            {!showPreview ? (
              <>
                <button
                  onClick={onClose}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleViewStatement}
                  disabled={isLoading}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Eye size={18} />
                      View Statement
                    </>
                  )}
                </button>
                <button
                  onClick={handleDownloadPDF}
                  disabled={isLoading}
                  className="px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Download size={18} />
                      Download PDF
                    </>
                  )}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setShowPreview(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Back to Form
                </button>
                <button
                  onClick={handleDownloadPDF}
                  disabled={isLoading}
                  className="px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Download size={18} />
                  Download as PDF
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Printer size={18} />
                  Print Statement
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the component
export default LoanStatementPopup;