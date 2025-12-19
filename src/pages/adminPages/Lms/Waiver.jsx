import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  Search,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Calendar,
  User,
  ListChecks,
  Plus,
  Filter,
  MoreVertical,
  FileText,
  Download,
  X,
  Save,
  IndianRupee,
  Eye
} from "lucide-react";

export default function WaiverDashboard() {
  // --- Demo Waiver Data ---
  const initialWaiverRequests = [
    { id: "WV001", customer: "Rahul Sharma", loanId: "LN001", reason: "Medical emergency", requestedBy: "Ravi Sharma", amount: 1500, date: "2025-02-10", status: "Pending" },
    { id: "WV002", customer: "Sohail Ahmed", loanId: "LN002", reason: "Job loss", requestedBy: "Neha Gupta", amount: 2500, date: "2025-02-12", status: "Approved" },
    { id: "WV003", customer: "Anjali Verma", loanId: "LN003", reason: "Late fee waiver", requestedBy: "Amit Verma", amount: 800, date: "2025-02-15", status: "Rejected" },
    { id: "WV004", customer: "Priya Singh", loanId: "LN010", reason: "Relocation costs", requestedBy: "Ravi Sharma", amount: 4500, date: "2025-02-18", status: "Pending" },
    { id: "WV005", customer: "Manish Kulkarni", loanId: "LN022", reason: "Documentation error fine", requestedBy: "Sohail Ahmed", amount: 1200, date: "2025-02-20", status: "Approved" },
  ];

  // --- State ---
  const [waivers, setWaivers] = useState(initialWaiverRequests);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null); // Track which menu is open
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [newRequest, setNewRequest] = useState({
      customer: '', loanId: '', amount: '', reason: '', requestedBy: 'Current User'
  });

  // --- UI Components ---
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

  const KPICard = ({ title, value, subtitle, icon: Icon, colorClass, bgClass }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${bgClass}`}>
          <Icon className={`w-6 h-6 ${colorClass}`} />
        </div>
        {subtitle && <span className="text-xs font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded-full">{subtitle}</span>}
      </div>
      <div>
        <h3 className="text-3xl font-bold text-slate-800">{value}</h3>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">{title}</p>
      </div>
    </div>
  );

  // --- Logic ---
  const filteredWaivers = useMemo(() => {
    return waivers.filter((w) => {
      if (statusFilter !== "All" && w.status !== statusFilter) return false;
      const s = search.toLowerCase();
      return (w.customer.toLowerCase().includes(s) || w.loanId.toLowerCase().includes(s) || w.id.toLowerCase().includes(s));
    });
  }, [search, statusFilter, waivers]);

  const kpis = useMemo(() => ({
    total: waivers.length,
    pending: waivers.filter(w => w.status === "Pending").length,
    approvedAmount: waivers.filter(w => w.status === "Approved").reduce((sum, w) => sum + w.amount, 0)
  }), [waivers]);

  // --- Handlers ---
  const handleStatusChange = (id, newStatus) => {
      setWaivers(waivers.map(w => w.id === id ? { ...w, status: newStatus } : w));
      setOpenMenuId(null); // Close menu after action
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
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-10 font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <IndianRupee className="text-indigo-600" size={32}/> Waiver Requests
          </h1>
          <p className="text-slate-500 mt-1 ml-11">Manage and audit fee waiver applications.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg flex items-center gap-2 font-medium transition active:scale-95"
        >
          <Plus size={20} /> New Request
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <KPICard title="Total Requests" value={kpis.total} icon={ListChecks} colorClass="text-indigo-600" bgClass="bg-indigo-50" />
        <KPICard title="Pending Approval" value={kpis.pending} subtitle="Action Required" icon={AlertTriangle} colorClass="text-amber-600" bgClass="bg-amber-50" />
        <KPICard title="Total Waived" value={`₹${kpis.approvedAmount.toLocaleString('en-IN')}`} icon={IndianRupee} colorClass="text-green-600" bgClass="bg-green-50" />
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-visible">
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-50/50">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input type="text" placeholder="Search ID, Customer..." className="w-full pl-10 pr-4 py-2 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/20" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="flex gap-3">
             <select className="px-4 py-2 bg-white border rounded-xl text-sm outline-none" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
             </select>
             <button className="px-4 py-2 bg-white border rounded-xl text-sm flex items-center gap-2 hover:bg-slate-50 transition"><Download size={16} /> Export</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Request Info</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Reason</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredWaivers.map((w) => (
                <tr key={w.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-indigo-600">{w.id}</p>
                    <p className="text-xs text-slate-400 flex items-center gap-1"><Calendar size={10}/> {w.date}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-800">{w.customer}</p>
                    <p className="text-xs text-slate-500">{w.loanId}</p>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-700">₹{w.amount.toLocaleString('en-IN')}</td>
                  <td className="px-6 py-4 text-slate-600 max-w-[200px] truncate" title={w.reason}>{w.reason}</td>
                  <td className="px-6 py-4"><StatusBadge status={w.status} /></td>
                  <td className="px-6 py-4 text-right relative">
                    
                    {/* THREE DOT BUTTON */}
                    <button 
                      onClick={() => setOpenMenuId(openMenuId === w.id ? null : w.id)}
                      className={`p-2 rounded-lg transition-all ${openMenuId === w.id ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'}`}
                    >
                      <MoreVertical size={18} />
                    </button>

                    {/* ACTIONS DROPDOWN */}
                    {openMenuId === w.id && (
                      <div 
                        ref={menuRef}
                        className="absolute right-6 top-12 w-48 bg-white rounded-xl shadow-xl border border-slate-100 z-50 py-2 animate-in fade-in zoom-in duration-100"
                      >
                        <div className="px-4 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 mb-1">Options</div>
                        
                        {w.status === 'Pending' ? (
                          <>
                            <button onClick={() => handleStatusChange(w.id, 'Approved')} className="w-full text-left px-4 py-2 text-sm text-green-600 hover:bg-green-50 flex items-center gap-2">
                              <CheckCircle size={16} /> Approve Request
                            </button>
                            <button onClick={() => handleStatusChange(w.id, 'Rejected')} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                              <XCircle size={16} /> Reject Request
                            </button>
                          </>
                        ) : (
                          <div className="px-4 py-2 text-xs text-slate-400 italic">No pending actions</div>
                        )}
                        
                        <div className="border-t border-slate-50 my-1"></div>
                        <button className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-2">
                          <Eye size={16} /> View Details
                        </button>
                        <button className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-2">
                          <Download size={16} /> Download PDF
                        </button>
                      </div>
                    )}

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL (Existing logic maintained) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="text-xl font-bold text-slate-800">Submit Waiver Request</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-full"><X size={20} className="text-slate-500"/></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <input required placeholder="Customer Name" className="w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" value={newRequest.customer} onChange={e => setNewRequest({...newRequest, customer: e.target.value})} />
              <div className="grid grid-cols-2 gap-4">
                <input required placeholder="Loan ID" className="w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" value={newRequest.loanId} onChange={e => setNewRequest({...newRequest, loanId: e.target.value})} />
                <input required type="number" placeholder="Amount (₹)" className="w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" value={newRequest.amount} onChange={e => setNewRequest({...newRequest, amount: e.target.value})} />
              </div>
              <textarea required rows="3" placeholder="Reason for waiver..." className="w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 resize-none" value={newRequest.reason} onChange={e => setNewRequest({...newRequest, reason: e.target.value})}></textarea>
              <div className="pt-4 flex justify-end gap-3 border-t">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-lg flex items-center gap-2 shadow-md hover:bg-indigo-700 transition">
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