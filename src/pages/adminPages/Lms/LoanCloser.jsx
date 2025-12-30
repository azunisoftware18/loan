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
  IndianRupee,
} from "lucide-react";
import ExportButton from "../../../components/admin/AdminButtons/ExportButton";
import ActionMenu from "../../../components/admin/AdminButtons/ActionMenu";
import Pagination from "../../../components/admin/common/Pagination";

export default function LoanCloser() {
  // --- STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState("preCloser");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 5;

  // --- MOCK DATA ---
  const PRE_CLOSER_DATA = [
    {
      id: "LN0012345",
      customer: "Arun Sharma",
      requestedDate: "2025-10-20",
      status: "Pending Approval",
      amount: 500000,
      daysPending: 4,
    },
    {
      id: "LN0012346",
      customer: "Priya Singh",
      requestedDate: "2025-10-18",
      status: "Approved",
      amount: 120000,
      daysPending: 0,
    },
    {
      id: "LN0012347",
      customer: "Vijay Kumar",
      requestedDate: "2025-10-23",
      status: "Rejected",
      amount: 800000,
      daysPending: 0,
    },
    {
      id: "LN0012348",
      customer: "Sita Devi",
      requestedDate: "2025-10-15",
      status: "Pending Approval",
      amount: 35000,
      daysPending: 9,
    },
    {
      id: "LN0012349",
      customer: "Ravi Menon",
      requestedDate: "2025-10-24",
      status: "Approved",
      amount: 250000,
      daysPending: 0,
    },
    {
      id: "LN0012350",
      customer: "Anil Kapoor",
      requestedDate: "2025-10-22",
      status: "Pending Approval",
      amount: 150000,
      daysPending: 2,
    },
    {
      id: "LN0012351",
      customer: "Meena Reddy",
      requestedDate: "2025-10-21",
      status: "Approved",
      amount: 300000,
      daysPending: 0,
    },
    {
      id: "LN0012352",
      customer: "Suresh Nair",
      requestedDate: "2025-10-19",
      status: "Rejected",
      amount: 450000,
      daysPending: 0,
    },
    {
      id: "LN0012353",
      customer: "Kavita Desai",
      requestedDate: "2025-10-17",
      status: "Pending Approval",
      amount: 180000,
      daysPending: 7,
    },
  ];

  const WRITE_OFF_DATA = [
    {
      id: "WO009812",
      loanId: "LN0001122",
      customer: "Deepak Rao",
      settlementDate: "2024-09-15",
      principal: 650000,
      settledAmount: 180000,
      status: "Settled",
      recovery: "27.7%",
    },
    {
      id: "WO009813",
      loanId: "LN0003344",
      customer: "Neha Patel",
      settlementDate: "2024-11-01",
      principal: 150000,
      settledAmount: 50000,
      status: "Settled",
      recovery: "33.3%",
    },
    {
      id: "WO009814",
      loanId: "LN0005566",
      customer: "Gopal Krishnan",
      settlementDate: "2024-10-25",
      principal: 2200000,
      settledAmount: 700000,
      status: "Settled",
      recovery: "31.8%",
    },
    {
      id: "WO009815",
      loanId: "LN0006677",
      customer: "Rajesh Kumar",
      settlementDate: "2024-10-20",
      principal: 850000,
      settledAmount: 250000,
      status: "Settled",
      recovery: "29.4%",
    },
    {
      id: "WO009816",
      loanId: "LN0007788",
      customer: "Sunita Sharma",
      settlementDate: "2024-10-18",
      principal: 420000,
      settledAmount: 150000,
      status: "Settled",
      recovery: "35.7%",
    },
    {
      id: "WO009817",
      loanId: "LN0008899",
      customer: "Vikram Singh",
      settlementDate: "2024-10-15",
      principal: 950000,
      settledAmount: 320000,
      status: "Settled",
      recovery: "33.7%",
    },
  ];

  const UNDO_REQUESTS = [
    {
      id: "UDR001",
      loanId: "LN0011001",
      requestDate: "2025-10-28",
      processor: "Admin A",
      reason: "Error in Final Payment",
      status: "Pending Review",
    },
    {
      id: "UDR002",
      loanId: "LN0011002",
      requestDate: "2025-10-25",
      processor: "Admin B",
      reason: "Customer Dispute",
      status: "Approved",
    },
    {
      id: "UDR003",
      loanId: "LN0011003",
      requestDate: "2025-10-29",
      processor: "Admin C",
      reason: "System Glitch",
      status: "Rejected",
    },
    {
      id: "UDR004",
      loanId: "LN0011004",
      requestDate: "2025-10-27",
      processor: "Admin D",
      reason: "Document Error",
      status: "Pending Review",
    },
    {
      id: "UDR005",
      loanId: "LN0011005",
      requestDate: "2025-10-26",
      processor: "Admin E",
      reason: "Payment Reversal",
      status: "Approved",
    },
  ];

  const AUTO_CLOSER_LOG = [
    {
      loanId: "LN0020001",
      closeDate: "2025-10-29 02:05 AM",
      criteria: "Final Payment Matched",
      result: "Success",
      duration: 120,
    },
    {
      loanId: "LN0020002",
      closeDate: "2025-10-29 02:07 AM",
      criteria: "Final Payment Matched",
      result: "Success",
      duration: 90,
    },
    {
      loanId: "LN0020003",
      closeDate: "2025-10-29 02:15 AM",
      criteria: "Zero Balance Check",
      result: "Failed",
      duration: 150,
    },
    {
      loanId: "LN0020004",
      closeDate: "2025-10-29 02:20 AM",
      criteria: "Final Payment Matched",
      result: "Success",
      duration: 110,
    },
    {
      loanId: "LN0020005",
      closeDate: "2025-10-29 02:25 AM",
      criteria: "Zero Balance Check",
      result: "Success",
      duration: 130,
    },
    {
      loanId: "LN0020006",
      closeDate: "2025-10-29 02:30 AM",
      criteria: "Document Verification",
      result: "Failed",
      duration: 200,
    },
  ];

  const NOC_PRINT_QUEUE = [
    {
      loanId: "LN0030101",
      customer: "Hema Chandra",
      closeDate: "2025-10-01",
      printStatus: "Ready to Print",
      delivery: "Mail",
    },
    {
      loanId: "LN0030102",
      customer: "Iqbal Khan",
      closeDate: "2025-09-25",
      printStatus: "Printed",
      delivery: "Email",
    },
    {
      loanId: "LN0030103",
      customer: "Jaya Varma",
      closeDate: "2025-10-20",
      printStatus: "Pending Sign-off",
      delivery: "Mail",
    },
    {
      loanId: "LN0030104",
      customer: "Kiran Reddy",
      closeDate: "2025-10-18",
      printStatus: "Ready to Print",
      delivery: "Email",
    },
    {
      loanId: "LN0030105",
      customer: "Lalit Mittal",
      closeDate: "2025-10-15",
      printStatus: "Printed",
      delivery: "Mail",
    },
    {
      loanId: "LN0030106",
      customer: "Manoj Tiwari",
      closeDate: "2025-10-12",
      printStatus: "Pending Sign-off",
      delivery: "Email",
    },
  ];

  const DELETE_REQUESTS = [
    {
      id: "DLR001",
      loanId: "LN0045001",
      customer: "Kiran Reddy",
      requestDate: "2025-10-22",
      reason: "Duplicate Entry",
      approvalLevel: "L2",
      status: "Pending L3",
    },
    {
      id: "DLR002",
      loanId: "LN0045002",
      customer: "Lalit Mittal",
      requestDate: "2025-10-24",
      reason: "Cancelled before Disbursement",
      approvalLevel: "L1",
      status: "Approved",
    },
    {
      id: "DLR003",
      loanId: "LN0045003",
      customer: "Neha Sharma",
      requestDate: "2025-10-26",
      reason: "Data Corruption",
      approvalLevel: "L2",
      status: "Pending L1",
    },
    {
      id: "DLR004",
      loanId: "LN0045004",
      customer: "Prakash Verma",
      requestDate: "2025-10-23",
      reason: "Test Entry",
      approvalLevel: "L1",
      status: "Approved",
    },
  ];

  // --- PAGINATION FUNCTIONS ---
  const getCurrentTabData = () => {
    let data = [];
    
    switch (activeTab) {
      case "preCloser":
        data = PRE_CLOSER_DATA.filter(
          (l) =>
            l.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            l.customer.toLowerCase().includes(searchTerm.toLowerCase())
        );
        break;
      case "writeOff":
        data = WRITE_OFF_DATA;
        break;
      case "undo":
        data = UNDO_REQUESTS;
        break;
      case "autoCloser":
        data = AUTO_CLOSER_LOG;
        break;
      case "noc":
        data = NOC_PRINT_QUEUE;
        break;
      case "delete":
        data = DELETE_REQUESTS;
        break;
      default:
        data = [];
    }
    
    return data;
  };

  const getCurrentPageData = () => {
    const allData = getCurrentTabData();
    const totalPages = Math.ceil(allData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, allData.length);
    
    return {
      data: allData.slice(startIndex, endIndex),
      totalPages,
      startIndex,
      endIndex,
      totalItems: allData.length
    };
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setCurrentPage(1);
    setSearchTerm("");
  };

  // --- SHARED COMPONENTS ---
  const StatusBadge = ({ status, days = 0 }) => {
    let styles = "";
    let icon = null;

    if (
      ["Approved", "Success", "Settled", "Printed"].some((s) =>
        status.includes(s)
      )
    ) {
      styles = "bg-green-50 text-green-700 border-green-200";
      icon = <CheckCircle className="w-3 h-3 mr-1" />;
    } else if (["Pending", "Ready"].some((s) => status.includes(s))) {
      styles =
        days > 7 || status.includes("L3")
          ? "bg-red-50 text-red-700 border-red-200"
          : "bg-amber-50 text-amber-700 border-amber-200";
      icon = <Clock className="w-3 h-3 mr-1" />;
    } else if (["Rejected", "Failed"].some((s) => status.includes(s))) {
      styles = "bg-red-50 text-red-700 border-red-200";
      icon = <XCircle className="w-3 h-3 mr-1" />;
    } else {
      styles = "bg-gray-50 text-gray-700 border-gray-200";
      icon = <Clipboard className="w-3 h-3 mr-1" />;
    }

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full border ${styles}`}
      >
        {icon} {status} {days > 0 && `(${days}d)`}
      </span>
    );
  };

  // --- TAB RENDERERS WITH PROPER PAGINATION STRUCTURE ---
  const TableContainer = ({ title, children, showSearch = false, showTotal = true }) => {
    const { totalItems, startIndex, endIndex, totalPages } = getCurrentPageData();
    
    return (
      <div className="h-[520px] relative">
        <div className="p-6">
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800">{title}</h2>
              {showTotal && (
                <p className="text-sm text-gray-500 mt-1">
                  Showing {startIndex + 1}-{endIndex} of {totalItems} items
                </p>
              )}
            </div>
            
            {showSearch && (
              <div className="relative flex-1 sm:flex-initial">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
            )}
          </div>

          {/* Scrollable Table Area */}
          <div className="h-[340px] overflow-y-auto overflow-x-auto rounded-xl border border-gray-100">
            {children}
          </div>
        </div>

        {/* PAGINATION COMPONENT - Fixed at bottom */}
        {totalPages > 1 && (
          <div className="absolute bottom-0 left-0 right-0 h-[64px] bg-white border-t border-gray-200 px-6">
            <div className="flex items-center justify-between h-full">
              <p className="text-sm text-gray-500">
                Page {currentPage} of {totalPages}
              </p>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                containerClassName="flex gap-1"
                buttonClassName="px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors text-sm"
                activeButtonClassName="bg-blue-600 text-white border-blue-600"
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  const PreCloserRequestsTable = () => {
    const { data } = getCurrentPageData();
    
    return (
      <TableContainer title="Pre-Closer Requests" showSearch={true}>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b text-left">
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Loan ID</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-12 text-center text-gray-500">
                  No requests found
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="p-4 font-medium text-blue-600">
                    {item.id}
                  </td>
                  <td className="p-4 text-gray-900">{item.customer}</td>
                  <td className="p-4 text-gray-500 text-sm">
                    {item.requestedDate}
                  </td>
                  <td className="p-4 font-semibold text-gray-900">
                    ₹{item.amount.toLocaleString()}
                  </td>
                  <td className="p-4">
                    <StatusBadge status={item.status} days={item.daysPending} />
                  </td>
                  <td className="p-4 text-right">
                    <ActionMenu
                      items={[
                        { label: "View Details", onClick: () => console.log("View", item.id) },
                        { label: "Approve", onClick: () => console.log("Approve", item.id) },
                        { label: "Reject", onClick: () => console.log("Reject", item.id) },
                        { label: "Edit Request", onClick: () => console.log("Edit", item.id) },
                      ]}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </TableContainer>
    );
  };

  const WriteOffSettledTable = () => {
    const { data } = getCurrentPageData();
    
    return (
      <TableContainer title="Settlement History" showTotal={true}>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b text-left">
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Settlement ID</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Loan ID</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Principal</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Settled At</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Recovery %</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-12 text-center text-gray-500">
                  No settlement records found
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="p-4 font-mono text-gray-500">
                    {item.id}
                  </td>
                  <td className="p-4 text-blue-600 font-medium">
                    {item.loanId}
                  </td>
                  <td className="p-4 text-gray-900">{item.customer}</td>
                  <td className="p-4 text-gray-500">
                    ₹{item.principal.toLocaleString()}
                  </td>
                  <td className="p-4 font-bold text-gray-900">
                    ₹{item.settledAmount.toLocaleString()}
                  </td>
                  <td className="p-4 text-green-600 font-medium">
                    {item.recovery}
                  </td>
                  <td className="p-4 text-right">
                    <StatusBadge status={item.status} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </TableContainer>
    );
  };

  const LoanCloserUndoTable = () => {
    const { data } = getCurrentPageData();
    
    return (
      <TableContainer title="Undo Requests" showTotal={true}>
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-amber-600 mt-0.5" size={20} />
            <div>
              <h4 className="text-sm font-bold text-amber-800">Critical Zone</h4>
              <p className="text-xs text-amber-700">
                Reversing a loan closure affects financial books. Ensure proper
                authorization before proceeding.
              </p>
            </div>
          </div>
        </div>
        
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b text-left">
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Request ID</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Loan ID</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Processor</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Reason</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-12 text-center text-gray-500">
                  No undo requests found
                </td>
              </tr>
            ) : (
              data.map((req) => (
                <tr key={req.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="p-4 text-gray-500">{req.id}</td>
                  <td className="p-4 font-medium text-blue-600">
                    {req.loanId}
                  </td>
                  <td className="p-4">{req.processor}</td>
                  <td className="p-4 text-gray-600">{req.reason}</td>
                  <td className="p-4">
                    <StatusBadge status={req.status} />
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-purple-600 hover:bg-purple-50 px-3 py-1.5 rounded-lg text-xs font-medium border border-purple-200 transition">
                      Review
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </TableContainer>
    );
  };

  const AutoCloserLogTable = () => {
    const { data } = getCurrentPageData();
    
    return (
      <TableContainer title="System Job Logs" showTotal={true}>
        <div className="text-xs text-gray-500 mb-4">Last run: Today, 02:00 AM</div>
        
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b text-left">
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Loan ID</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Execution Time</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Criteria</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Duration</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Result</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-12 text-center text-gray-500">
                  No log records found
                </td>
              </tr>
            ) : (
              data.map((log) => (
                <tr key={log.loanId} className="hover:bg-gray-50/80 transition-colors">
                  <td className="p-4 font-mono text-blue-600">
                    {log.loanId}
                  </td>
                  <td className="p-4 text-gray-600">{log.closeDate}</td>
                  <td className="p-4 text-gray-600">{log.criteria}</td>
                  <td className="p-4 text-gray-400 font-mono">
                    {log.duration}ms
                  </td>
                  <td className="p-4 text-right">
                    <StatusBadge status={log.result} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </TableContainer>
    );
  };

  const NOCPrintTable = () => {
    const { data } = getCurrentPageData();
    
    return (
      <TableContainer title="NOC Print Queue" showTotal={true}>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b text-left">
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Loan ID</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Closure Date</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Delivery Mode</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-12 text-center text-gray-500">
                  No NOC records found
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.loanId} className="hover:bg-gray-50/80 transition-colors">
                  <td className="p-4 font-medium text-blue-600">
                    {item.loanId}
                  </td>
                  <td className="p-4 text-gray-900">{item.customer}</td>
                  <td className="p-4 text-gray-500">{item.closeDate}</td>
                  <td className="p-4 text-gray-600">{item.delivery}</td>
                  <td className="p-4">
                    <StatusBadge status={item.printStatus} />
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-blue-600 hover:bg-blue-50 p-2 rounded-full transition">
                      <Printer size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </TableContainer>
    );
  };

  const DeleteRequestTable = () => {
    const { data } = getCurrentPageData();
    
    return (
      <TableContainer title="Delete Requests" showTotal={true}>
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-4">
          <h4 className="text-sm font-bold text-red-800 flex items-center gap-2">
            <Trash2 size={16} /> Deletion Zone
          </h4>
          <p className="text-xs text-red-700 mt-1">
            Permanent deletion of loan records. Approvals from multiple levels
            (L1, L2, L3) required.
          </p>
        </div>
        
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b text-left">
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Req ID</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Loan ID</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Reason</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Level</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-12 text-center text-gray-500">
                  No deletion requests found
                </td>
              </tr>
            ) : (
              data.map((req) => (
                <tr key={req.id} className="hover:bg-red-50/30 transition-colors">
                  <td className="p-4 text-gray-500">{req.id}</td>
                  <td className="p-4 font-medium text-blue-600">
                    {req.loanId}
                  </td>
                  <td className="p-4 text-gray-900">{req.customer}</td>
                  <td className="p-4 text-gray-600">{req.reason}</td>
                  <td className="p-4 font-bold text-gray-700">
                    {req.approvalLevel}
                  </td>
                  <td className="p-4 text-right">
                    <StatusBadge status={req.status} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </TableContainer>
    );
  };

  // --- TAB CONFIGURATION ---
  const tabs = [
    { id: "preCloser", label: "Pre-Closer Request", icon: FileText },
    { id: "writeOff", label: "Write-Off Settled", icon: IndianRupee },
    { id: "undo", label: "Loan Closer Undo", icon: RotateCcw },
    { id: "autoCloser", label: "Loan Auto Closer", icon: Clock },
    { id: "noc", label: "NOC Print", icon: Printer },
    { id: "delete", label: "Delete Requests", icon: Trash2 },
  ];

  // --- MAIN RENDER ---
  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-10 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <Users className="text-blue-600" size={32} /> Loan Closure
            Operations
          </h1>
          <p className="text-gray-500 mt-1 ml-11">
            Manage settlements, NOCs, write-offs and deletions.
          </p>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-xs font-bold text-gray-400 uppercase">Today</p>
          <p className="text-lg font-bold text-gray-700">
            {new Date().toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Modern Tabs */}
      <div className="flex overflow-x-auto gap-2 mb-8 pb-2 border-b border-gray-200 no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`flex items-center gap-2 px-5 py-3 rounded-t-xl font-medium transition-all relative top-[1px] whitespace-nowrap
              ${
                activeTab === tab.id
                  ? "bg-white text-blue-600 border border-gray-200 border-b-white z-10 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              }`}
          >
            <tab.icon
              size={18}
              className={
                activeTab === tab.id ? "text-blue-600" : "text-gray-400"
              }
            />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="bg-white shadow-sm rounded-2xl border border-gray-200">
        <div className="animate-in fade-in duration-300">
          {activeTab === "preCloser" && <PreCloserRequestsTable />}
          {activeTab === "writeOff" && <WriteOffSettledTable />}
          {activeTab === "undo" && <LoanCloserUndoTable />}
          {activeTab === "autoCloser" && <AutoCloserLogTable />}
          {activeTab === "noc" && <NOCPrintTable />}
          {activeTab === "delete" && <DeleteRequestTable />}
        </div>
      </div>
    </div>
  );
}