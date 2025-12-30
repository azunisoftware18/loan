import React, { useState } from "react";
import {
  FileText,
  Plus,
  Clock,
  Printer,
  Edit,
  CreditCard,
  Search,
  Eye,
  X,
  Download,
  Calculator,
  ShieldCheck,
  Send,
  CheckCircle,
  AlertCircle
} from "lucide-react";

// External Component Import
import ActionMenu from "../../../components/admin/AdminButtons/ActionMenu";
import Pagination from "../../../components/admin/common/Pagination";

export default function DisbursementManagement() {
  // --- STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState("pending");
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // --- MOCK DATABASE ---
  const [pendingLoans, setPendingLoans] = useState([
    { id: "LN-2024-001", customer: "Rahul Sharma", amount: 50000, approvedDate: "2024-01-15", type: "Personal", bank: "HDFC Bank", acc: "501002345678", ifsc: "HDFC0001234" },
    { id: "LN-2024-002", customer: "Amit Patel", amount: 75000, approvedDate: "2024-01-16", type: "Personal", bank: "SBI", acc: "30201234567", ifsc: "SBIN0004567" },
    { id: "LN-2024-003", customer: "Priya Verma", amount: 200000, approvedDate: "2024-01-18", type: "Home", bank: "ICICI Bank", acc: "111222333444", ifsc: "ICIC0008888" },
    { id: "LN-2024-004", customer: "Karan Singh", amount: 150000, approvedDate: "2024-01-20", type: "Business", bank: "Axis Bank", acc: "555566667777", ifsc: "UTIB0001234" },
    { id: "LN-2024-005", customer: "Sneha Reddy", amount: 100000, approvedDate: "2024-01-22", type: "Education", bank: "Kotak Bank", acc: "888899990000", ifsc: "KKBK0005678" },
    { id: "LN-2024-006", customer: "Rajesh Kumar", amount: 300000, approvedDate: "2024-01-25", type: "Home", bank: "HDFC Bank", acc: "123412341234", ifsc: "HDFC0009876" },
    { id: "LN-2024-007", customer: "Meera Desai", amount: 120000, approvedDate: "2024-01-28", type: "Personal", bank: "SBI", acc: "567856785678", ifsc: "SBIN0001111" },
  ]);

  const [allDVs, setAllDVs] = useState([
    { dvNo: "DV-1001", loanId: "LN-2023-099", customer: "Amit Kumar", amount: 100000, status: "Created", date: "2024-01-20", bank: "Axis Bank" },
    { dvNo: "DV-1002", loanId: "LN-2023-098", customer: "Sneha Gupta", amount: 75000, status: "Pending Auth", date: "2024-01-19", bank: "Kotak Bank" },
    { dvNo: "DV-0999", loanId: "LN-2023-050", customer: "Vikram Singh", amount: 500000, status: "Authorized", date: "2024-01-18", bank: "HDFC Bank" },
    { dvNo: "DV-1003", loanId: "LN-2023-051", customer: "Ravi Sharma", amount: 250000, status: "Disbursed", date: "2024-01-17", bank: "ICICI Bank" },
    { dvNo: "DV-1004", loanId: "LN-2023-052", customer: "Priya Nair", amount: 180000, status: "Pending Auth", date: "2024-01-16", bank: "SBI" },
    { dvNo: "DV-1005", loanId: "LN-2023-053", customer: "Karan Malhotra", amount: 320000, status: "Authorized", date: "2024-01-15", bank: "Axis Bank" },
    { dvNo: "DV-1006", loanId: "LN-2023-054", customer: "Anjali Tiwari", amount: 150000, status: "Disbursed", date: "2024-01-14", bank: "HDFC Bank" },
    { dvNo: "DV-1007", loanId: "LN-2023-055", customer: "Vikram Joshi", amount: 275000, status: "Created", date: "2024-01-13", bank: "Kotak Bank" },
  ]);

  const [dvForm, setDvForm] = useState({ date: new Date().toISOString().split("T")[0], mode: "NEFT", remarks: "" });

  // --- DISBURSEMENT WORKFLOW LOGIC ---

  const handleOpenCreateDV = (loan) => {
    setSelectedItem(loan);
    setDvForm({ date: new Date().toISOString().split("T")[0], mode: "NEFT", remarks: "" });
    setModalType("createDV");
    setShowModal(true);
  };

  const submitCreateDV = () => {
    const newDV = {
      dvNo: `DV-${1000 + allDVs.length + 1}`,
      loanId: selectedItem.id,
      customer: selectedItem.customer,
      amount: selectedItem.amount,
      status: "Pending Auth",
      date: dvForm.date,
      bank: selectedItem.bank,
      ...dvForm,
    };
    setAllDVs([...allDVs, newDV]);
    setPendingLoans(pendingLoans.filter((l) => l.id !== selectedItem.id));
    setShowModal(false);
    setActiveTab("auth");
    setCurrentPage(1); // Reset to page 1 when changing tabs
  };

  const handleAuthorize = (dvNo) => {
    setAllDVs(allDVs.map((dv) => dv.dvNo === dvNo ? { ...dv, status: "Authorized" } : dv));
    setActiveTab("payments");
    setCurrentPage(1); // Reset to page 1 when changing tabs
  };

  const handleReject = (dvNo) => {
    setAllDVs(allDVs.map((dv) => dv.dvNo === dvNo ? { ...dv, status: "Rejected" } : dv));
  };

  const handleInitiatePayment = (dvNo) => {
    setAllDVs(allDVs.map((dv) => dv.dvNo === dvNo ? { ...dv, status: "Disbursed" } : dv));
    alert("Fund Transfer Initiated!");
  };

  // --- PAGINATION FUNCTIONS ---
  
  const getCurrentTabData = () => {
    const allData = (() => {
      switch (activeTab) {
        case "pending":
          return pendingLoans.filter(l => 
            l.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
            l.id.toLowerCase().includes(searchQuery.toLowerCase())
          );
        case "auth":
          return allDVs.filter(dv => dv.status === "Pending Auth");
        case "payments":
          return allDVs.filter(dv => dv.status === "Authorized");
        case "vouchers":
          return allDVs.filter(dv => 
            dv.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
            dv.dvNo.toLowerCase().includes(searchQuery.toLowerCase())
          );
        default:
          return [];
      }
    })();
    
    return {
      data: allData,
      totalItems: allData.length,
      totalPages: Math.ceil(allData.length / itemsPerPage),
      startIndex: (currentPage - 1) * itemsPerPage,
      endIndex: Math.min(currentPage * itemsPerPage, allData.length)
    };
  };

  const getCurrentPageData = () => {
    const { data, totalItems, totalPages, startIndex, endIndex } = getCurrentTabData();
    return {
      data: data.slice(startIndex, Math.min(startIndex + itemsPerPage, data.length)),
      totalItems,
      totalPages,
      startIndex,
      endIndex
    };
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setCurrentPage(1);
    setSearchQuery("");
  };

  // --- RENDERERS ---

  const RenderPending = () => {
    const { data, totalItems, startIndex, endIndex, totalPages } = getCurrentPageData();
    
    return (
      <div className="h-[520px] relative">
        <div className="p-6">
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Pending Loans</h2>
              <p className="text-sm text-gray-500">
                Showing {startIndex + 1}-{endIndex} of {totalItems} pending loans
              </p>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search loans..." 
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <div className="h-[340px] overflow-y-auto overflow-x-auto rounded-xl border border-gray-100">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b text-left">
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Loan Info</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Approved Date</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Bank Details</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-12 text-center text-gray-500">
                      No pending loans found
                    </td>
                  </tr>
                ) : (
                  data.map((loan) => (
                    <tr key={loan.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-gray-800">{loan.customer}</div>
                        <div className="text-xs text-blue-600 font-mono mt-1">{loan.id}</div>
                        <div className="text-xs text-gray-500">{loan.type} Loan</div>
                      </td>
                      <td className="p-4 font-semibold text-gray-900">₹{loan.amount.toLocaleString()}</td>
                      <td className="p-4 text-gray-500 text-sm">{loan.approvedDate}</td>
                      <td className="p-4">
                        <div className="text-sm font-medium">{loan.bank}</div>
                        <div className="text-xs text-gray-500">Acc: {loan.acc}</div>
                      </td>
                      <td className="p-4 text-right">
                        <ActionMenu items={[
                          { 
                            label: "Create DV", 
                            icon: FileText,
                            onClick: () => handleOpenCreateDV(loan) 
                          },
                          { 
                            label: "View Details", 
                            icon: Eye,
                            onClick: () => console.log("View", loan) 
                          }
                        ]} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* PAGINATION COMPONENT */}
        {totalPages > 1 && (
          <div className="absolute bottom-0 left-0 right-0 h-[64px] bg-white border-t border-gray-200 px-6">
            <div className="flex items-center justify-between h-full">
              <p className="text-sm text-gray-500">
                Showing {startIndex + 1}–{endIndex} of {totalItems}
              </p>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                containerClassName="justify-end"
                buttonClassName="hover:bg-gray-100 transition-colors"
                activeButtonClassName="bg-blue-600 text-white"
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  const RenderAuth = () => {
    const { data, totalItems, startIndex, endIndex, totalPages } = getCurrentPageData();
    
    return (
      <div className="h-[520px] relative">
        <div className="p-6">
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Authorization Required</h2>
              <p className="text-sm text-gray-500">
                Showing {startIndex + 1}-{endIndex} of {totalItems} vouchers pending authorization
              </p>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search vouchers..." 
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <div className="h-[340px] overflow-y-auto overflow-x-auto rounded-xl border border-gray-100">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b text-left">
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">DV No</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-12 text-center text-gray-500">
                      No vouchers pending authorization
                    </td>
                  </tr>
                ) : (
                  data.map((dv) => (
                    <tr key={dv.dvNo} className="hover:bg-gray-50/80 transition-colors">
                      <td className="p-4 font-mono font-bold">{dv.dvNo}</td>
                      <td className="p-4">
                        <div className="font-medium">{dv.customer}</div>
                        <div className="text-xs text-gray-500">{dv.loanId}</div>
                      </td>
                      <td className="p-4 font-bold text-blue-700">₹{dv.amount.toLocaleString()}</td>
                      <td className="p-4 text-gray-500 text-sm">{dv.date}</td>
                      <td className="p-4 text-right">
                        <ActionMenu items={[
                          { 
                            label: "Authorize", 
                            icon: CheckCircle,
                            onClick: () => handleAuthorize(dv.dvNo) 
                          },
                          { 
                            label: "Reject", 
                            icon: X,
                            danger: true,
                            onClick: () => handleReject(dv.dvNo) 
                          },
                          { 
                            label: "View Details", 
                            icon: Eye,
                            onClick: () => console.log("View DV", dv) 
                          }
                        ]} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* PAGINATION COMPONENT */}
        {totalPages > 1 && (
          <div className="absolute bottom-0 left-0 right-0 h-[64px] bg-white border-t border-gray-200 px-6">
            <div className="flex items-center justify-between h-full">
              <p className="text-sm text-gray-500">
                Showing {startIndex + 1}–{endIndex} of {totalItems}
              </p>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                containerClassName="justify-end"
                buttonClassName="hover:bg-gray-100 transition-colors"
                activeButtonClassName="bg-blue-600 text-white"
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  const RenderPayments = () => {
    const { data, totalItems, startIndex, endIndex, totalPages } = getCurrentPageData();
    
    return (
      <div className="h-[520px] relative">
        <div className="p-6">
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Payment Initiation</h2>
              <p className="text-sm text-gray-500">
                Showing {startIndex + 1}-{endIndex} of {totalItems} payments ready for disbursement
              </p>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search payments..." 
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <div className="h-[340px] overflow-y-auto overflow-x-auto rounded-xl border border-gray-100">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b text-left">
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">DV No</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer / Bank</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-12 text-center text-gray-500">
                      No payments ready for disbursement
                    </td>
                  </tr>
                ) : (
                  data.map((pay) => (
                    <tr key={pay.dvNo} className="hover:bg-gray-50/80 transition-colors">
                      <td className="p-4 font-mono font-bold">{pay.dvNo}</td>
                      <td className="p-4">
                        <div className="font-medium">{pay.customer}</div>
                        <div className="text-xs text-gray-500">{pay.bank}</div>
                      </td>
                      <td className="p-4 font-bold text-green-700">₹{pay.amount.toLocaleString()}</td>
                      <td className="p-4 text-gray-500 text-sm">{pay.date}</td>
                      <td className="p-4 text-right">
                        <ActionMenu items={[
                          { 
                            label: "Initiate Transfer", 
                            icon: Send,
                            onClick: () => handleInitiatePayment(pay.dvNo) 
                          },
                          { 
                            label: "Download Advice", 
                            icon: Download,
                            onClick: () => console.log("Download", pay.dvNo) 
                          },
                          { 
                            label: "View Details", 
                            icon: Eye,
                            onClick: () => console.log("View", pay) 
                          }
                        ]} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* PAGINATION COMPONENT */}
        {totalPages > 1 && (
          <div className="absolute bottom-0 left-0 right-0 h-[64px] bg-white border-t border-gray-200 px-6">
            <div className="flex items-center justify-between h-full">
              <p className="text-sm text-gray-500">
                Showing {startIndex + 1}–{endIndex} of {totalItems}
              </p>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                containerClassName="justify-end"
                buttonClassName="hover:bg-gray-100 transition-colors"
                activeButtonClassName="bg-blue-600 text-white"
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  const RenderVouchers = () => {
    const { data, totalItems, startIndex, endIndex, totalPages } = getCurrentPageData();
    
    return (
      <div className="h-[520px] relative">
        <div className="p-6">
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Voucher History</h2>
              <p className="text-sm text-gray-500">
                Showing {startIndex + 1}-{endIndex} of {totalItems} vouchers
              </p>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search vouchers..." 
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <div className="h-[340px] overflow-y-auto overflow-x-auto rounded-xl border border-gray-100">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b text-left">
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">DV No</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-12 text-center text-gray-500">
                      No vouchers found
                    </td>
                  </tr>
                ) : (
                  data.map((dv) => (
                    <tr key={dv.dvNo} className="hover:bg-gray-50/80 transition-colors">
                      <td className="p-4 font-mono font-bold">{dv.dvNo}</td>
                      <td className="p-4 font-medium">{dv.customer}</td>
                      <td className="p-4 font-semibold">₹{dv.amount.toLocaleString()}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                          dv.status === 'Disbursed' ? 'bg-green-50 text-green-700 border-green-200' : 
                          dv.status === 'Authorized' ? 'bg-blue-50 text-blue-700 border-blue-200' : 
                          dv.status === 'Pending Auth' ? 'bg-orange-50 text-orange-700 border-orange-200' : 
                          dv.status === 'Rejected' ? 'bg-red-50 text-red-700 border-red-200' : 
                          'bg-gray-50 text-gray-700 border-gray-200'
                        }`}>
                          {dv.status}
                        </span>
                      </td>
                      <td className="p-4 text-gray-500 text-sm">{dv.date}</td>
                      <td className="p-4 text-right">
                        <ActionMenu items={[
                          { 
                            label: "Print Voucher", 
                            icon: Printer,
                            onClick: () => { setSelectedItem(dv); setModalType("viewDV"); setShowModal(true); } 
                          },
                          { 
                            label: "View Logs", 
                            icon: Eye,
                            onClick: () => console.log("Logs", dv.dvNo) 
                          },
                          { 
                            label: "Download PDF", 
                            icon: Download,
                            onClick: () => console.log("Download PDF", dv.dvNo) 
                          }
                        ]} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* PAGINATION COMPONENT */}
        {totalPages > 1 && (
          <div className="absolute bottom-0 left-0 right-0 h-[64px] bg-white border-t border-gray-200 px-6">
            <div className="flex items-center justify-between h-full">
              <p className="text-sm text-gray-500">
                Showing {startIndex + 1}–{endIndex} of {totalItems}
              </p>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                containerClassName="justify-end"
                buttonClassName="hover:bg-gray-100 transition-colors"
                activeButtonClassName="bg-blue-600 text-white"
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-10">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 text-center md:text-left">Disbursement Management</h1>
          <p className="text-gray-500 mt-1">Lifecycle: Create DV → Authorize → Fund Transfer</p>
        </div>
        <button 
          onClick={() => { setModalType("amortization"); setShowModal(true); }} 
          className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 shadow-sm flex items-center gap-2 transition-colors"
        >
          <Calculator size={18} /> Amortization Tool
        </button>
      </div>

      {/* Tabs Menu */}
      <div className="flex overflow-x-auto gap-2 mb-6 border-b border-gray-200 no-scrollbar">
        {[
          { id: "pending", label: "Pending Disbursement", icon: <Clock size={18} />, count: pendingLoans.length },
          { id: "auth", label: "Authorization", icon: <ShieldCheck size={18} />, count: allDVs.filter((d) => d.status === "Pending Auth").length },
          { id: "payments", label: "Payment Initiation", icon: <CreditCard size={18} />, count: allDVs.filter((d) => d.status === "Authorized").length },
          { id: "vouchers", label: "Voucher History", icon: <FileText size={18} />, count: allDVs.length },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`flex items-center gap-2 px-5 py-3 rounded-t-xl font-medium transition-all whitespace-nowrap ${activeTab === tab.id ? "bg-white text-blue-600 border border-gray-200 border-b-white z-10 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
          >
            {tab.icon} {tab.label}
            {tab.count > 0 && <span className="ml-1 bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full">{tab.count}</span>}
          </button>
        ))}
      </div>

      {/* Main Content Area with Fixed Height Container */}
      <div className="bg-white shadow-sm rounded-2xl border border-gray-200">
        <div className="animate-in fade-in duration-300">
          {activeTab === "pending" && <RenderPending />}
          {activeTab === "vouchers" && <RenderVouchers />}
          {activeTab === "auth" && <RenderAuth />}
          {activeTab === "payments" && <RenderPayments />}
        </div>
      </div>

      {/* Modal: Generate DV */}
      {showModal && modalType === "createDV" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
             <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
               <h3 className="font-bold text-lg text-gray-800">Generate Voucher</h3>
               <button onClick={() => setShowModal(false)} className="hover:bg-gray-100 p-1 rounded-lg transition-colors">
                 <X size={20}/>
               </button>
             </div>
             <div className="p-6">
               <div className="bg-blue-50 p-4 rounded-xl mb-4">
                 <p className="text-sm font-bold text-blue-700">{selectedItem?.customer} - ₹{selectedItem?.amount.toLocaleString()}</p>
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="text-xs font-bold text-gray-500">DATE</label>
                   <input type="date" value={dvForm.date} onChange={(e) => setDvForm({...dvForm, date: e.target.value})} className="w-full p-2 border rounded mt-1 outline-none"/>
                 </div>
                 <div>
                   <label className="text-xs font-bold text-gray-500">PAYMENT MODE</label>
                   <select className="w-full p-2 border rounded mt-1 outline-none">
                     <option>NEFT</option>
                     <option>IMPS</option>
                     <option>RTGS</option>
                   </select>
                 </div>
               </div>
             </div>
             <div className="p-6 border-t flex justify-end gap-3">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-500 font-medium hover:bg-gray-50 rounded-lg transition-colors">Cancel</button>
                <button onClick={submitCreateDV} className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors">Generate DV</button>
             </div>
          </div>
        </div>
      )}

      {/* Modal: Success/View DV */}
      {showModal && modalType === "viewDV" && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
           <div className="bg-white rounded-2xl p-8 w-full max-w-md text-center">
             <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
               <CheckCircle size={32} />
             </div>
             <h3 className="text-xl font-bold">DV Generated: {selectedItem?.dvNo}</h3>
             <p className="text-gray-500 mt-2">Customer: {selectedItem?.customer}</p>
             <p className="text-2xl font-black text-blue-700 mt-4">₹{selectedItem?.amount.toLocaleString()}</p>
             <div className="flex gap-2 justify-center mt-6">
                <button onClick={() => setShowModal(false)} className="px-6 py-2 border rounded-lg hover:bg-gray-50 transition-colors">Close</button>
                <button onClick={() => window.print()} className="px-6 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
                  <Printer size={16}/> Print
                </button>
             </div>
           </div>
         </div>
      )}
    </div>
  );
}