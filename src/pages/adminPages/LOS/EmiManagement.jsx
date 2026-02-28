import React, { useState, useMemo, useEffect } from "react";
import Button from "../../../components/admin/common/Button";
import EmiForm from "../../../components/admin/modals/EmiForm";
import Pagination from "../../../components/admin/common/Pagination";
import { Calendar, DollarSign, Clock, User, FileText, IndianRupee } from "lucide-react";

import { useGetEmis } from "../../../hooks/useEmi";
import { useGetLoanApplications } from "../../../hooks/useLoanApplication";

function EMIManagement() {
  const [activeTab, setActiveTab] = useState("approved");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);

  const itemsPerPage = 5;

  // ---------------- APIs ----------------
  const { data: emiData } = useGetEmis();
  const { data: loanData } = useGetLoanApplications();

  const emiVouchers = emiData?.data || [];

  // ---------- SAFE LOAN LIST ----------
  const loanList =
    loanData?.data?.data ||
    loanData?.data ||
    loanData ||
    [];

  // ---------- APPROVED FILTER ----------
  const approvedApplications = useMemo(() => {
    return loanList.filter((loan) => {
      const status = (
        loan.applicationStatus ||
        loan.status ||
        loan.loanStatus ||
        ""
      ).toLowerCase();
      
      return status.includes("approved");
    });
  }, [loanList]);

  // ---------- TAB DATA ----------
  const filteredByTab = useMemo(() => {
    if (activeTab === "approved")
      return approvedApplications;

    return emiVouchers;
  }, [activeTab, approvedApplications, emiVouchers]);

  // ---------- SEARCH ----------
  const filteredData = useMemo(() => {
    return filteredByTab.filter((item) => {
      const name =
        item.applicantName ||
        item.customerName ||
        "";
      
      const loanNumber =
        item.loanNumber ||
        item.voucherNo ||
        "";

      return (
        searchTerm === "" ||
        name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loanNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [filteredByTab, searchTerm]);

  // ---------- PAGINATION ----------
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeTab]);

  // ---------- HANDLE GENERATE EMI CLICK ----------
  const handleGenerateEmiClick = (loan) => {
    // Format the loan data for the EMI form
    const formattedLoan = {
      loanNumber: loan.loanNumber || loan.voucherNo || "",
      loanId: loan.id || loan._id || "",
      customerName: loan.applicantName || loan.customerName || "",
      loanAmount: loan.approvedAmount || loan.loanAmount || 0,
      interestRate: loan.interestRate || "",
      tenure: loan.tenureMonths || loan.tenure || "",
      startDate: "", // Will be filled by user in the form
    };
    
    setSelectedLoan(formattedLoan);
    setIsOpen(true);
  };

  // ---------- FORM CHANGE HANDLER ----------
  const handleEmiVoucherChange = (key, value) => {
    if (typeof key === "object") {
      setSelectedLoan((prev) => ({
        ...prev,
        ...key,
      }));
    } else {
      setSelectedLoan((prev) => ({
        ...prev,
        [key]: value,
      }));
    }
  };

  // ---------- CLOSE FORM HANDLER ----------
  const handleCloseForm = () => {
    setIsOpen(false);
    setSelectedLoan(null);
  };

  // ---------- FORMAT CURRENCY ----------
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount || 0);
  };

  // ---------- FORMAT DATE ----------
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // ---------- UI ----------
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">EMI Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage loan EMIs and approved applications
          </p>
        </div>
      </div>

      {/* TABS */}
      <div className="flex gap-6 border-b mb-6">
        <button
          onClick={() => setActiveTab("approved")}
          className={`pb-2 px-1 font-medium transition-colors ${
            activeTab === "approved"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Approved Applications ({approvedApplications.length})
        </button>

        <button
          onClick={() => setActiveTab("all")}
          className={`pb-2 px-1 font-medium transition-colors ${
            activeTab === "all"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          EMI Vouchers ({emiVouchers.length})
        </button>
      </div>

      {/* SEARCH */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by customer name or loan number..."
          className="border border-gray-200 p-2.5 w-96 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Customer Details
              </th>
              <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Loan Information
              </th>
              <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Amount Details
              </th>
              <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="p-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <tr key={item.id || item._id} className="hover:bg-gray-50/80 transition-colors">
                  {/* Customer Details */}
                  <td className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <User className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {item.applicantName || item.customerName || "N/A"}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          ID: {item.customerId || item.id?.slice(0, 8) || "N/A"}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Loan Information */}
                  <td className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          Loan: <span className="font-medium">{item.loanNumber || item.voucherNo || "N/A"}</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          Tenure: <span className="font-medium">{item.tenureMonths || item.tenure || 0} months</span>
                        </span>
                      </div>
                      {activeTab === "all" && item.startDate && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            Start: <span className="font-medium">{formatDate(item.startDate)}</span>
                          </span>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Amount Details */}
                  <td className="p-4">
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm text-gray-600">Loan Amount: </span>
                        <span className="font-medium text-gray-900">
                          {formatCurrency(item.approvedAmount || item.loanAmount || item.amount || 0)}
                        </span>
                      </div>
                      {item.interestRate && (
                        <div>
                          <span className="text-sm text-gray-600">Interest: </span>
                          <span className="font-medium text-gray-900">{item.interestRate}%</span>
                        </div>
                      )}
                      {activeTab === "all" && item.paidAmount && (
                        <div>
                          <span className="text-sm text-gray-600">Paid: </span>
                          <span className="font-medium text-green-600">{formatCurrency(item.paidAmount)}</span>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        (item.applicationStatus || item.status || item.loanStatus || "").toLowerCase().includes("approved")
                          ? "bg-green-100 text-green-800 border border-green-200"
                          : (item.status || "").toLowerCase().includes("active")
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                          : "bg-yellow-100 text-yellow-800 border border-yellow-200"
                      }`}
                    >
                      {item.applicationStatus || item.status || item.loanStatus || "Pending"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-4 text-right">
                    {activeTab === "approved" ? (
                      <button
                        onClick={() => handleGenerateEmiClick(item)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow"
                      >
                        <IndianRupee className="w-4 h-4" />
                        Generate EMI
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          // View EMI details action
                          console.log("View EMI details", item);
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        View Details
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-12 text-gray-400">
                  <div className="flex flex-col items-center gap-2">
                    <FileText className="w-12 h-12 text-gray-300" />
                    <p className="text-sm">
                      {activeTab === "approved"
                        ? "No approved applications found"
                        : "No EMI vouchers found"}
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      {/* EMI FORM */}
      <EmiForm
        isOpen={isOpen}
        onClose={handleCloseForm}
        emiVoucher={selectedLoan || {}}
        onEmiVoucherChange={handleEmiVoucherChange}
      />
    </div>
  );
}

export default EMIManagement;