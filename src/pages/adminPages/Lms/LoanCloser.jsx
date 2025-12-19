import React, { useState } from "react";
import {
  FileText,
  DollarSign,
  RotateCcw,
  Clock,
  Printer,
  Trash2,
  Users,
  CheckCircle,
  AlertTriangle,
  Search,
  MoreVertical,
  ArrowRight,
  Download,
  Clipboard,
  XCircle,
  Filter,
  Calendar,
  IndianRupee
} from "lucide-react";

export default function LoanCloser() {
  // --- STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState("preCloser");

  // --- MOCK DATA ---
  const PRE_CLOSER_DATA = [
    { id: 'LN0012345', customer: 'Arun Sharma', requestedDate: '2025-10-20', status: 'Pending Approval', amount: 500000, daysPending: 4 },
    { id: 'LN0012346', customer: 'Priya Singh', requestedDate: '2025-10-18', status: 'Approved', amount: 120000, daysPending: 0 },
    { id: 'LN0012347', customer: 'Vijay Kumar', requestedDate: '2025-10-23', status: 'Rejected', amount: 800000, daysPending: 0 },
    { id: 'LN0012348', customer: 'Sita Devi', requestedDate: '2025-10-15', status: 'Pending Approval', amount: 35000, daysPending: 9 },
    { id: 'LN0012349', customer: 'Ravi Menon', requestedDate: '2025-10-24', status: 'Approved', amount: 250000, daysPending: 0 },
  ];

  const WRITE_OFF_DATA = [
    { id: 'WO009812', loanId: 'LN0001122', customer: 'Deepak Rao', settlementDate: '2024-09-15', principal: 650000, settledAmount: 180000, status: 'Settled', recovery: '27.7%' },
    { id: 'WO009813', loanId: 'LN0003344', customer: 'Neha Patel', settlementDate: '2024-11-01', principal: 150000, settledAmount: 50000, status: 'Settled', recovery: '33.3%' },
    { id: 'WO009814', loanId: 'LN0005566', customer: 'Gopal Krishnan', settlementDate: '2024-10-25', principal: 2200000, settledAmount: 700000, status: 'Settled', recovery: '31.8%' },
  ];

  const UNDO_REQUESTS = [
    { id: 'UDR001', loanId: 'LN0011001', requestDate: '2025-10-28', processor: 'Admin A', reason: 'Error in Final Payment', status: 'Pending Review' },
    { id: 'UDR002', loanId: 'LN0011002', requestDate: '2025-10-25', processor: 'Admin B', reason: 'Customer Dispute', status: 'Approved' },
    { id: 'UDR003', loanId: 'LN0011003', requestDate: '2025-10-29', processor: 'Admin C', reason: 'System Glitch', status: 'Rejected' },
  ];

  const AUTO_CLOSER_LOG = [
    { loanId: 'LN0020001', closeDate: '2025-10-29 02:05 AM', criteria: 'Final Payment Matched', result: 'Success', duration: 120 },
    { loanId: 'LN0020002', closeDate: '2025-10-29 02:07 AM', criteria: 'Final Payment Matched', result: 'Success', duration: 90 },
    { loanId: 'LN0020003', closeDate: '2025-10-29 02:15 AM', criteria: 'Zero Balance Check', result: 'Failed', duration: 150 },
  ];

  const NOC_PRINT_QUEUE = [
    { loanId: 'LN0030101', customer: 'Hema Chandra', closeDate: '2025-10-01', printStatus: 'Ready to Print', delivery: 'Mail' },
    { loanId: 'LN0030102', customer: 'Iqbal Khan', closeDate: '2025-09-25', printStatus: 'Printed', delivery: 'Email' },
    { loanId: 'LN0030103', customer: 'Jaya Varma', closeDate: '2025-10-20', printStatus: 'Pending Sign-off', delivery: 'Mail' },
  ];

  const DELETE_REQUESTS = [
    { id: 'DLR001', loanId: 'LN0045001', customer: 'Kiran Reddy', requestDate: '2025-10-22', reason: 'Duplicate Entry', approvalLevel: 'L2', status: 'Pending L3' },
    { id: 'DLR002', loanId: 'LN0045002', customer: 'Lalit Mittal', requestDate: '2025-10-24', reason: 'Cancelled before Disbursement', approvalLevel: 'L1', status: 'Approved' },
  ];

  // --- SHARED COMPONENTS ---

  const StatusBadge = ({ status, days = 0 }) => {
    let styles = "";
    let icon = null;

    if (['Approved', 'Success', 'Settled', 'Printed'].some(s => status.includes(s))) {
      styles = "bg-green-50 text-green-700 border-green-200";
      icon = <CheckCircle className="w-3 h-3 mr-1" />;
    } else if (['Pending', 'Ready'].some(s => status.includes(s))) {
      styles = (days > 7 || status.includes('L3')) ? "bg-red-50 text-red-700 border-red-200" : "bg-amber-50 text-amber-700 border-amber-200";
      icon = <Clock className="w-3 h-3 mr-1" />;
    } else if (['Rejected', 'Failed'].some(s => status.includes(s))) {
      styles = "bg-red-50 text-red-700 border-red-200";
      icon = <XCircle className="w-3 h-3 mr-1" />;
    } else {
      styles = "bg-gray-50 text-gray-700 border-gray-200";
      icon = <Clipboard className="w-3 h-3 mr-1" />;
    }

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full border ${styles}`}>
        {icon} {status} {days > 0 && `(${days}d)`}
      </span>
    );
  };

  // --- TAB RENDERERS ---

  const PreCloserRequestsTable = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const filtered = PRE_CLOSER_DATA.filter(l => l.id.toLowerCase().includes(searchTerm.toLowerCase()) || l.customer.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
      <div className="animate-in fade-in zoom-in duration-300">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input type="text" placeholder="Search Loan ID or Customer..." className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 outline-none" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
          <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-all">
            <FileText className="w-4 h-4 mr-2" /> New Request
          </button>
        </div>

        <div className="overflow-hidden border rounded-xl shadow-sm">
          <table className="min-w-full bg-white text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-semibold border-b">
              <tr><th className="px-6 py-3">Loan ID</th><th className="px-6 py-3">Customer</th><th className="px-6 py-3">Date</th><th className="px-6 py-3">Amount</th><th className="px-6 py-3">Status</th><th className="px-6 py-3 text-right">Action</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-blue-600">{item.id}</td>
                  <td className="px-6 py-4 text-gray-900">{item.customer}</td>
                  <td className="px-6 py-4 text-gray-500">{item.requestedDate}</td>
                  <td className="px-6 py-4 font-mono">₹{item.amount.toLocaleString()}</td>
                  <td className="px-6 py-4"><StatusBadge status={item.status} days={item.daysPending} /></td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    <button className="p-1.5 text-gray-400 hover:text-blue-600 bg-gray-50 hover:bg-blue-50 rounded-lg"><MoreVertical size={16} /></button>
                    {item.status === 'Pending Approval' && <button className="p-1.5 text-green-600 hover:text-white bg-green-50 hover:bg-green-600 rounded-lg"><ArrowRight size={16} /></button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const WriteOffSettledTable = () => {
    return (
      <div className="animate-in fade-in zoom-in duration-300">
        <div className="flex justify-between items-center mb-6">
           <h3 className="font-bold text-gray-700">Settlement History</h3>
           <button className="flex items-center text-gray-600 hover:text-blue-600 text-sm font-medium border px-3 py-1.5 rounded-lg hover:bg-gray-50"><Download className="w-4 h-4 mr-2"/> Export Report</button>
        </div>
        <div className="overflow-hidden border rounded-xl shadow-sm bg-white">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-semibold border-b">
              <tr><th className="px-6 py-3">Settlement ID</th><th className="px-6 py-3">Loan ID</th><th className="px-6 py-3">Customer</th><th className="px-6 py-3">Principal</th><th className="px-6 py-3">Settled At</th><th className="px-6 py-3">Recovery %</th><th className="px-6 py-3 text-right">Status</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {WRITE_OFF_DATA.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-mono text-gray-500">{item.id}</td>
                  <td className="px-6 py-4 text-blue-600 font-medium">{item.loanId}</td>
                  <td className="px-6 py-4 text-gray-900">{item.customer}</td>
                  <td className="px-6 py-4 text-gray-500">₹{item.principal.toLocaleString()}</td>
                  <td className="px-6 py-4 font-bold text-gray-900">₹{item.settledAmount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-green-600 font-medium">{item.recovery}</td>
                  <td className="px-6 py-4 text-right"><StatusBadge status={item.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const LoanCloserUndoTable = () => (
      <div className="animate-in fade-in zoom-in duration-300">
         <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-6 flex items-start gap-3">
            <AlertTriangle className="text-amber-600 mt-0.5" size={20} />
            <div>
               <h4 className="text-sm font-bold text-amber-800">Critical Zone</h4>
               <p className="text-xs text-amber-700">Reversing a loan closure affects financial books. Ensure proper authorization before proceeding.</p>
            </div>
         </div>
         <div className="overflow-hidden border rounded-xl shadow-sm bg-white">
            <table className="min-w-full text-sm text-left">
               <thead className="bg-gray-50 text-gray-500 font-semibold border-b">
                  <tr><th className="px-6 py-3">Request ID</th><th className="px-6 py-3">Loan ID</th><th className="px-6 py-3">Processor</th><th className="px-6 py-3">Reason</th><th className="px-6 py-3">Status</th><th className="px-6 py-3 text-right">Action</th></tr>
               </thead>
               <tbody className="divide-y divide-gray-100">
                  {UNDO_REQUESTS.map((req) => (
                     <tr key={req.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-gray-500">{req.id}</td>
                        <td className="px-6 py-4 font-medium text-blue-600">{req.loanId}</td>
                        <td className="px-6 py-4">{req.processor}</td>
                        <td className="px-6 py-4 text-gray-600">{req.reason}</td>
                        <td className="px-6 py-4"><StatusBadge status={req.status} /></td>
                        <td className="px-6 py-4 text-right">
                           <button className="text-purple-600 hover:bg-purple-50 px-3 py-1.5 rounded-lg text-xs font-medium border border-purple-200 transition">Review</button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
  );

  const AutoCloserLogTable = () => (
      <div className="animate-in fade-in zoom-in duration-300">
         <div className="flex justify-between mb-4">
            <h3 className="font-bold text-gray-700">System Job Logs</h3>
            <div className="text-xs text-gray-500">Last run: Today, 02:00 AM</div>
         </div>
         <div className="overflow-hidden border rounded-xl shadow-sm bg-white">
            <table className="min-w-full text-sm text-left">
               <thead className="bg-gray-50 text-gray-500 font-semibold border-b">
                  <tr><th className="px-6 py-3">Loan ID</th><th className="px-6 py-3">Execution Time</th><th className="px-6 py-3">Criteria</th><th className="px-6 py-3">Duration</th><th className="px-6 py-3 text-right">Result</th></tr>
               </thead>
               <tbody className="divide-y divide-gray-100">
                  {AUTO_CLOSER_LOG.map((log) => (
                     <tr key={log.loanId} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-mono text-blue-600">{log.loanId}</td>
                        <td className="px-6 py-4 text-gray-600">{log.closeDate}</td>
                        <td className="px-6 py-4 text-gray-600">{log.criteria}</td>
                        <td className="px-6 py-4 text-gray-400 font-mono">{log.duration}ms</td>
                        <td className="px-6 py-4 text-right"><StatusBadge status={log.result} /></td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
  );

  const NOCPrintTable = () => (
     <div className="animate-in fade-in zoom-in duration-300">
         <div className="flex justify-end mb-4">
             <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 font-medium">
                <Printer size={16}/> Batch Print (Selected)
             </button>
         </div>
         <div className="overflow-hidden border rounded-xl shadow-sm bg-white">
            <table className="min-w-full text-sm text-left">
               <thead className="bg-gray-50 text-gray-500 font-semibold border-b">
                  <tr><th className="px-6 py-3">Loan ID</th><th className="px-6 py-3">Customer</th><th className="px-6 py-3">Closure Date</th><th className="px-6 py-3">Delivery Mode</th><th className="px-6 py-3">Status</th><th className="px-6 py-3 text-right">Action</th></tr>
               </thead>
               <tbody className="divide-y divide-gray-100">
                  {NOC_PRINT_QUEUE.map((item) => (
                     <tr key={item.loanId} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-blue-600">{item.loanId}</td>
                        <td className="px-6 py-4 text-gray-900">{item.customer}</td>
                        <td className="px-6 py-4 text-gray-500">{item.closeDate}</td>
                        <td className="px-6 py-4 text-gray-600">{item.delivery}</td>
                        <td className="px-6 py-4"><StatusBadge status={item.printStatus} /></td>
                        <td className="px-6 py-4 text-right">
                           <button className="text-blue-600 hover:bg-blue-50 p-2 rounded-full transition"><Printer size={16}/></button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
     </div>
  );

  const DeleteRequestTable = () => (
      <div className="animate-in fade-in zoom-in duration-300">
         <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-6">
            <h4 className="text-sm font-bold text-red-800 flex items-center gap-2"><Trash2 size={16}/> Deletion Zone</h4>
            <p className="text-xs text-red-700 mt-1">Permanent deletion of loan records. Approvals from multiple levels (L1, L2, L3) required.</p>
         </div>
         <div className="overflow-hidden border rounded-xl shadow-sm bg-white">
            <table className="min-w-full text-sm text-left">
               <thead className="bg-gray-50 text-gray-500 font-semibold border-b">
                  <tr><th className="px-6 py-3">Req ID</th><th className="px-6 py-3">Loan ID</th><th className="px-6 py-3">Customer</th><th className="px-6 py-3">Reason</th><th className="px-6 py-3">Level</th><th className="px-6 py-3 text-right">Status</th></tr>
               </thead>
               <tbody className="divide-y divide-gray-100">
                  {DELETE_REQUESTS.map((req) => (
                     <tr key={req.id} className="hover:bg-red-50/30">
                        <td className="px-6 py-4 text-gray-500">{req.id}</td>
                        <td className="px-6 py-4 font-medium text-blue-600">{req.loanId}</td>
                        <td className="px-6 py-4 text-gray-900">{req.customer}</td>
                        <td className="px-6 py-4 text-gray-600">{req.reason}</td>
                        <td className="px-6 py-4 font-bold text-gray-700">{req.approvalLevel}</td>
                        <td className="px-6 py-4 text-right"><StatusBadge status={req.status} /></td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
  );

  // --- TAB CONFIGURATION ---
  const tabs = [
    { id: "preCloser", label: "Pre-Closer Request", icon: FileText },
    { id: "writeOff", label: "Write-Off Settled", icon: IndianRupee },
    // { id: "undo", label: "Loan Closer Undo", icon: RotateCcw },
    { id: "autoCloser", label: "Loan Auto Closer", icon: Clock },
    { id: "noc", label: "NOC Print", icon: Printer },
    // { id: "delete", label: "Delete Requests", icon: Trash2 },
  ];

  // --- MAIN RENDER ---
  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-10 font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <Users className="text-blue-600" size={32}/> Loan Closure Operations
          </h1>
          <p className="text-gray-500 mt-1 ml-11">Manage settlements, NOCs, write-offs and deletions.</p>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-xs font-bold text-gray-400 uppercase">Today</p>
          <p className="text-lg font-bold text-gray-700">{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>
      </div>

      {/* Modern Tabs */}
      <div className="flex overflow-x-auto gap-2 mb-8 pb-2 border-b border-gray-200 no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-3 rounded-t-xl font-medium transition-all relative top-[1px] whitespace-nowrap
              ${activeTab === tab.id
                ? "bg-white text-blue-600 border border-gray-200 border-b-white z-10 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              }`}
          >
            <tab.icon size={18} className={activeTab === tab.id ? "text-blue-600" : "text-gray-400"} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 min-h-[500px]">
        {activeTab === 'preCloser' && <PreCloserRequestsTable />}
        {activeTab === 'writeOff' && <WriteOffSettledTable />}
        {activeTab === 'undo' && <LoanCloserUndoTable />}
        {activeTab === 'autoCloser' && <AutoCloserLogTable />}
        {activeTab === 'noc' && <NOCPrintTable />}
        {activeTab === 'delete' && <DeleteRequestTable />}
      </div>

    </div>
  );
}