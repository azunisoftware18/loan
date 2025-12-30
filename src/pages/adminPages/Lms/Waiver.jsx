import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Calendar,
  Plus,
  X,
  Save,
  IndianRupee,
  Eye,
  XCircleIcon
} from "lucide-react";
import ExportButton from "../../../components/admin/AdminButtons/ExportButton";
import ActionMenu from "../../../components/admin/AdminButtons/ActionMenu";
import Pagination from "../../../components/admin/common/Pagination";

export default function WaiverDashboard() {
  // --- Demo Waiver Data ---
  const initialWaiverRequests = [
    { id: "WV001", customer: "Rahul Sharma", loanId: "LN001", reason: "Medical emergency", requestedBy: "Ravi Sharma", amount: 1500, date: "2025-02-10", status: "Pending" },
    { id: "WV002", customer: "Sohail Ahmed", loanId: "LN002", reason: "Job loss", requestedBy: "Neha Gupta", amount: 2500, date: "2025-02-12", status: "Approved" },
    { id: "WV003", customer: "Anjali Verma", loanId: "LN003", reason: "Late fee waiver", requestedBy: "Amit Verma", amount: 800, date: "2025-02-15", status: "Rejected" },
    { id: "WV004", customer: "Priya Singh", loanId: "LN010", reason: "Relocation costs", requestedBy: "Ravi Sharma", amount: 4500, date: "2025-02-18", status: "Pending" },
    { id: "WV005", customer: "Manish Kulkarni", loanId: "LN022", reason: "Documentation error fine", requestedBy: "Sohail Ahmed", amount: 1200, date: "2025-02-20", status: "Approved" },
    { id: "WV006", customer: "Karan Malhotra", loanId: "LN025", reason: "Natural calamity", requestedBy: "Neha Gupta", amount: 3200, date: "2025-02-22", status: "Pending" },
    { id: "WV007", customer: "Sunita Reddy", loanId: "LN030", reason: "Hospitalization", requestedBy: "Ravi Sharma", amount: 2800, date: "2025-02-25", status: "Approved" },
    { id: "WV008", customer: "Vikram Joshi", loanId: "LN035", reason: "Technical error", requestedBy: "Amit Verma", amount: 900, date: "2025-02-28", status: "Rejected" },
    { id: "WV009", customer: "Pooja Nair", loanId: "LN040", reason: "Payment gateway issue", requestedBy: "Sohail Ahmed", amount: 1500, date: "2025-03-01", status: "Pending" },
    { id: "WV010", customer: "Rajesh Kumar", loanId: "LN045", reason: "Bank server down", requestedBy: "Neha Gupta", amount: 2000, date: "2025-03-03", status: "Approved" },
    { id: "WV011", customer: "Meena Desai", loanId: "LN050", reason: "Family emergency", requestedBy: "Ravi Sharma", amount: 3500, date: "2025-03-05", status: "Pending" },
    { id: "WV012", customer: "Arun Singh", loanId: "LN055", reason: "Late submission", requestedBy: "Amit Verma", amount: 1200, date: "2025-03-08", status: "Approved" },
  ];

  // --- State ---
  const [waivers, setWaivers] = useState(initialWaiverRequests);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  const [newRequest, setNewRequest] = useState({
    customer: '', loanId: '', amount: '', reason: '', requestedBy: 'Current User'
  });

  // --- Logic: Search & Filter ---
  const filteredWaivers = useMemo(() => {
    return waivers.filter((w) => {
      if (statusFilter !== "All" && w.status !== statusFilter) return false;
      const s = search.toLowerCase();
      return (
        w.customer.toLowerCase().includes(s) || 
        w.loanId.toLowerCase().includes(s) || 
        w.id.toLowerCase().includes(s) ||
        w.reason.toLowerCase().includes(s)
      );
    });
  }, [search, statusFilter, waivers]);

 


  // --- Pagination Calculations ---
  const totalPages = Math.ceil(filteredWaivers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentWaivers = filteredWaivers.slice(startIndex, endIndex);

  // --- Logic: Status Update ---
  const handleUpdateStatus = (id, newStatus) => {
    setWaivers(prev => 
      prev.map(item => item.id === id ? { ...item, status: newStatus } : item)
    );
  };

  // --- Logic: Export ---
  const handleExportWaivers = () => {
    if (!filteredWaivers.length) return alert("No data to export");
    const headers = ["ID", "Date", "Customer", "Loan ID", "Amount", "Status", "Reason", "Requested By"];
    const rows = filteredWaivers.map(w => [
      w.id, w.date, w.customer, w.loanId, w.amount, w.status, w.reason, w.requestedBy
    ]);
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Waivers_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = {
      id: `WV00${waivers.length + 1}`,
      ...newRequest,
      amount: Number(newRequest.amount),
      date: new Date().toISOString().split('T')[0],
      status: 'Pending'
    };
    setWaivers([request, ...waivers]);
    setIsModalOpen(false);
    setNewRequest({ customer: '', loanId: '', amount: '', reason: '', requestedBy: 'Current User' });
    setCurrentPage(1); // Reset to first page after adding new request
  };

  const StatusBadge = ({ status }) => {
    const styles = {
      Approved: "bg-green-50 text-green-700 border-green-200",
      Pending: "bg-amber-50 text-amber-700 border-amber-200",
      Rejected: "bg-red-50 text-red-700 border-red-200",
      default: "bg-gray-50 text-gray-700 border-gray-200"
    };
    const icons = {
      Approved: <CheckCircle className="w-3 h-3 mr-1" />,
      Pending: <AlertTriangle className="w-3 h-3 mr-1" />,
      Rejected: <XCircle className="w-3 h-3 mr-1" />
    };
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full border ${styles[status] || styles.default}`}>
        {icons[status]} {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-10 font-sans text-slate-900">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <IndianRupee className="text-blue-600" size={32}/> Waiver Requests
          </h1>
          <p className="text-slate-500 mt-1 ml-11">Manage and audit fee waiver applications.</p>
        </div>
        <div className="flex gap-2">
        <ExportButton onClick={handleExportWaivers} />
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg flex items-center gap-2 font-medium transition active:scale-95"
        >
          <Plus size={20} /> New Request
        </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 h-[520px] relative">

        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-50/50">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search ID, Customer, Loan ID, Reason..." 
              className="w-full pl-10 pr-4 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 outline-none" 
              value={search} 
              onChange={(e) => {
  setSearch(e.target.value);
  setCurrentPage(1);
}}
            />
          </div>
       
        </div>

       <div className="h-[340px] overflow-y-auto overflow-x-auto">

          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Request Info</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentWaivers.map((w) => (
                <tr key={w.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-blue-600">{w.id}</p>
                    <p className="text-xs text-slate-400 flex items-center gap-1">
                      <Calendar size={10}/> {w.date}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">{w.reason}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-800">{w.customer}</p>
                    <p className="text-xs text-slate-500">{w.loanId}</p>
                    <p className="text-xs text-slate-400 mt-1">By: {w.requestedBy}</p>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-700">
                    ₹{w.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={w.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
  <ActionMenu
    items={[
      {
        label: "View Details",
        icon: Eye,
        onClick: () => console.log(`View waiver ${w.id}`),
      },
      {
        label: "Approve",
        icon: CheckCircle,
        onClick: () => handleUpdateStatus(w.id, 'Approved'),
      },
      {
        label: "Reject", 
        icon: XCircleIcon,
        onClick: () => handleUpdateStatus(w.id, 'Rejected'),
        danger: true,
      },
      {
        label: "Mark as Pending",
        icon: AlertTriangle,
        onClick: () => handleUpdateStatus(w.id, 'Pending'),
      },
    ]}
    buttonClassName="p-2 hover:bg-slate-100 rounded-lg"
    menuClassName="shadow-xl"
  />
</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Component */}
        {totalPages > 1 && (
  <div className="absolute bottom-0 left-0 right-0 h-[64px] bg-white border-t border-slate-100 px-6">
    <div className="flex items-center justify-between h-full">
      <p className="text-sm text-slate-500">
        Showing {startIndex + 1}–{Math.min(endIndex, filteredWaivers.length)} of {filteredWaivers.length}
      </p>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        containerClassName="justify-end"
        buttonClassName="hover:bg-slate-100 transition-colors"
        activeButtonClassName="bg-blue-600 text-white"
      />
    </div>
  </div>
)}


      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="text-xl font-bold text-slate-800">Submit Waiver Request</h2>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="p-2 hover:bg-slate-200 rounded-full transition-colors"
              >
                <X size={20} className="text-slate-500"/>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <input 
                required 
                placeholder="Customer Name" 
                className="w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" 
                value={newRequest.customer} 
                onChange={e => setNewRequest({...newRequest, customer: e.target.value})} 
              />
              <div className="grid grid-cols-2 gap-4">
                <input 
                  required 
                  placeholder="Loan ID" 
                  className="w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" 
                  value={newRequest.loanId} 
                  onChange={e => setNewRequest({...newRequest, loanId: e.target.value})} 
                />
                <input 
                  required 
                  type="number" 
                  placeholder="Amount (₹)" 
                  className="w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" 
                  value={newRequest.amount} 
                  onChange={e => setNewRequest({...newRequest, amount: e.target.value})} 
                />
              </div>
              <textarea 
                required 
                rows="3" 
                placeholder="Reason for waiver..." 
                className="w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 resize-none" 
                value={newRequest.reason} 
                onChange={e => setNewRequest({...newRequest, reason: e.target.value})}
              ></textarea>
              <div className="pt-4 flex justify-end gap-3 border-t">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 shadow-md hover:bg-blue-700 transition"
                >
                  <Save size={18} /> Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}