import React, { useState, useMemo, useEffect } from 'react';
import {
  ArrowUpCircle,
  ArrowDownCircle,
  Wallet,
  RefreshCw,
  Search,
  Filter,
  Download,
  Upload,
  PlusCircle,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  IndianRupee,
  User,
  Calendar,
  CreditCard,
  Shield,
  BarChart3,
  TrendingUp,
  TrendingDown,
  MoreVertical
} from 'lucide-react';
import Button from '../../../components/admin/common/Button';
import ExportButton from '../../../components/admin/AdminButtons/ExportButton';
import StatusCard from '../../../components/admin/common/StatusCard';
import ActionMenu from '../../../components/admin/AdminButtons/ActionMenu';
import Pagination from '../../../components/admin/common/Pagination';

function TopupRefund() {
  const [activeTab, setActiveTab] = useState('topup');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // -------- PAGINATION STATE --------
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Sample data for Topup Transactions (more data)
  const topupData = [
    { 
      id: 1, 
      user: 'John Doe', 
      amount: 5000, 
      method: 'Credit Card', 
      date: '2024-01-15', 
      time: '10:30 AM',
      status: 'Completed',
      refId: 'TP-001'
    },
    { 
      id: 2, 
      user: 'Jane Smith', 
      amount: 2500, 
      method: 'Bank Transfer', 
      date: '2024-01-16', 
      time: '02:45 PM',
      status: 'Pending',
      refId: 'TP-002'
    },
    { 
      id: 3, 
      user: 'Robert Johnson', 
      amount: 10000, 
      method: 'UPI', 
      date: '2024-01-17', 
      time: '11:15 AM',
      status: 'Completed',
      refId: 'TP-003'
    },
    { 
      id: 4, 
      user: 'Sarah Wilson', 
      amount: 3000, 
      method: 'Debit Card', 
      date: '2024-01-17', 
      time: '04:20 PM',
      status: 'Failed',
      refId: 'TP-004'
    },
    { 
      id: 5, 
      user: 'Michael Brown', 
      amount: 7500, 
      method: 'Wallet', 
      date: '2024-01-18', 
      time: '09:15 AM',
      status: 'Completed',
      refId: 'TP-005'
    },
    { 
      id: 6, 
      user: 'Emily Davis', 
      amount: 4200, 
      method: 'UPI', 
      date: '2024-01-18', 
      time: '01:30 PM',
      status: 'Pending',
      refId: 'TP-006'
    },
    { 
      id: 7, 
      user: 'David Miller', 
      amount: 15000, 
      method: 'Credit Card', 
      date: '2024-01-19', 
      time: '03:45 PM',
      status: 'Completed',
      refId: 'TP-007'
    },
    { 
      id: 8, 
      user: 'Lisa Taylor', 
      amount: 2800, 
      method: 'Bank Transfer', 
      date: '2024-01-19', 
      time: '05:20 PM',
      status: 'Failed',
      refId: 'TP-008'
    },
    { 
      id: 9, 
      user: 'William Clark', 
      amount: 9200, 
      method: 'Debit Card', 
      date: '2024-01-20', 
      time: '11:10 AM',
      status: 'Completed',
      refId: 'TP-009'
    },
    { 
      id: 10, 
      user: 'Olivia Martinez', 
      amount: 3500, 
      method: 'UPI', 
      date: '2024-01-20', 
      time: '02:15 PM',
      status: 'Pending',
      refId: 'TP-010'
    },
    { 
      id: 11, 
      user: 'James Anderson', 
      amount: 12000, 
      method: 'Credit Card', 
      date: '2024-01-21', 
      time: '10:00 AM',
      status: 'Completed',
      refId: 'TP-011'
    },
    { 
      id: 12, 
      user: 'Sophia Thomas', 
      amount: 6000, 
      method: 'Wallet', 
      date: '2024-01-21', 
      time: '04:30 PM',
      status: 'Completed',
      refId: 'TP-012'
    }
  ];

  // Sample data for Refund Transactions (more data)
  const refundData = [
    { 
      id: 1, 
      user: 'Mike Brown', 
      amount: 2000, 
      reason: 'Service Cancellation', 
      date: '2024-01-14', 
      status: 'Approved',
      refId: 'RF-001'
    },
    { 
      id: 2, 
      user: 'Emily Davis', 
      amount: 4500, 
      reason: 'Overpayment', 
      date: '2024-01-15', 
      status: 'Pending',
      refId: 'RF-002'
    },
    { 
      id: 3, 
      user: 'David Lee', 
      amount: 1500, 
      reason: 'Product Return', 
      date: '2024-01-16', 
      status: 'Rejected',
      refId: 'RF-003'
    },
    { 
      id: 4, 
      user: 'Lisa Taylor', 
      amount: 3200, 
      reason: 'Duplicate Payment', 
      date: '2024-01-17', 
      status: 'Approved',
      refId: 'RF-004'
    },
    { 
      id: 5, 
      user: 'Robert Wilson', 
      amount: 5000, 
      reason: 'Cancelled Order', 
      date: '2024-01-18', 
      status: 'Approved',
      refId: 'RF-005'
    },
    { 
      id: 6, 
      user: 'Jennifer Hall', 
      amount: 1800, 
      reason: 'Late Delivery', 
      date: '2024-01-18', 
      status: 'Pending',
      refId: 'RF-006'
    },
    { 
      id: 7, 
      user: 'Kevin Scott', 
      amount: 2700, 
      reason: 'Wrong Item', 
      date: '2024-01-19', 
      status: 'Approved',
      refId: 'RF-007'
    },
    { 
      id: 8, 
      user: 'Amanda King', 
      amount: 3900, 
      reason: 'Damaged Product', 
      date: '2024-01-19', 
      status: 'Rejected',
      refId: 'RF-008'
    },
    { 
      id: 9, 
      user: 'Daniel Wright', 
      amount: 4100, 
      reason: 'Service Not Provided', 
      date: '2024-01-20', 
      status: 'Approved',
      refId: 'RF-009'
    },
    { 
      id: 10, 
      user: 'Michelle Lopez', 
      amount: 2200, 
      reason: 'Subscription Cancelled', 
      date: '2024-01-20', 
      status: 'Pending',
      refId: 'RF-010'
    },
    { 
      id: 11, 
      user: 'Richard Hill', 
      amount: 3500, 
      reason: 'Price Adjustment', 
      date: '2024-01-21', 
      status: 'Approved',
      refId: 'RF-011'
    },
    { 
      id: 12, 
      user: 'Samantha Green', 
      amount: 2800, 
      reason: 'Discount Not Applied', 
      date: '2024-01-21', 
      status: 'Rejected',
      refId: 'RF-012'
    }
  ];

  // -------- FILTERED DATA --------
  const filteredData = useMemo(() => {
    const data = activeTab === 'topup' ? topupData : refundData;
    
    return data.filter((item) => {
      const matchesSearch = searchTerm === '' || 
        item.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.refId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.reason && item.reason.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesStatus = selectedStatus === 'all' || 
        item.status.toLowerCase() === selectedStatus.toLowerCase();
      
      return matchesSearch && matchesStatus;
    });
  }, [activeTab, searchTerm, selectedStatus]);

  // -------- PAGINATION CALCULATIONS --------
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  // Reset to page 1 when tab, search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchTerm, selectedStatus]);

  // Stats data
  const stats = {
    totalTopups: topupData.reduce((sum, item) => sum + item.amount, 0),
    totalRefunds: refundData.reduce((sum, item) => sum + item.amount, 0),
    pendingTopups: topupData.filter(item => item.status === 'Pending').length,
    pendingRefunds: refundData.filter(item => item.status === 'Pending').length,
    todayTransactions: topupData.filter(item => item.date === '2024-01-21').length + 
                      refundData.filter(item => item.date === '2024-01-21').length,
    avgTransaction: Math.round((topupData.reduce((sum, item) => sum + item.amount, 0) + 
                                refundData.reduce((sum, item) => sum + item.amount, 0)) / 
                                (topupData.length + refundData.length))
  };

  const getStatusBadge = (status) => {
    const colors = {
      'Completed': 'bg-green-100 text-green-800 border-green-200',
      'Approved': 'bg-green-100 text-green-800 border-green-200',
      'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Failed': 'bg-red-100 text-red-800 border-red-200',
      'Rejected': 'bg-red-100 text-red-800 border-red-200'
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${colors[status] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
        {status}
      </span>
    );
  };

  const getMethodIcon = (method) => {
    const icons = {
      'Credit Card': <CreditCard className="w-4 h-4" />,
      'Debit Card': <CreditCard className="w-4 h-4" />,
      'Bank Transfer': <IndianRupee className="w-4 h-4" />,
      'UPI': <Shield className="w-4 h-4" />,
      'Wallet': <Wallet className="w-4 h-4" />
    };
    
    return icons[method] || <IndianRupee className="w-4 h-4" />;
  };

  const downloadCSV = (headers, rows, fileName) => {
    const csvContent =
      [headers, ...rows]
        .map(row =>
          row.map(value => `"${value ?? ""}"`).join(",")
        )
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();

    URL.revokeObjectURL(url);
  };

  const handleExport = () => {
    if (activeTab === "topup") {
      const headers = [
        "Reference ID",
        "User",
        "Amount",
        "Payment Method",
        "Date",
        "Time",
        "Status",
      ];

      const rows = filteredData.map(item => [
        item.refId,
        item.user,
        item.amount,
        item.method,
        item.date,
        item.time,
        item.status,
      ]);

      downloadCSV(headers, rows, "topup-transactions.csv");
    } else {
      const headers = [
        "Reference ID",
        "User",
        "Amount",
        "Reason",
        "Date",
        "Status",
      ];

      const rows = filteredData.map(item => [
        item.refId,
        item.user,
        item.amount,
        item.reason,
        item.date,
        item.status,
      ]);

      downloadCSV(headers, rows, "refund-transactions.csv");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6 lg:p-10">
      
      {/* Header Section - Loan Entry page की तरह */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Topup & Refund Management</h1>
          <p className="text-gray-500 mt-1">Manage all your wallet transactions in one place</p>
        </div>
        <div className="flex gap-3">
          <ExportButton
            label="Export"
            onClick={handleExport}
          />
          <Button className="flex items-center gap-2 px-4 py-2.5">
            <PlusCircle className="w-5 h-5" />
            New Transaction
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatusCard
          title="Total Topups"
          value={`₹${stats.totalTopups.toLocaleString()}`}
          icon={ArrowUpCircle}
          iconColor="blue"
          trendIcon={TrendingUp}
          trendPercentage="+12.5%"
          trendColor="green"
        />

        <StatusCard
          title="Total Refunds"
          value={`₹${stats.totalRefunds.toLocaleString()}`}
          icon={ArrowDownCircle}
          iconColor="red"
          trendIcon={TrendingDown}
          trendPercentage="-3.2%"
          trendColor="red"
        />

        <StatusCard
          title="Pending Transactions"
          value={stats.pendingTopups + stats.pendingRefunds}
          icon={Clock}
          iconColor="yellow"
          subtext={`${stats.pendingTopups} topups, ${stats.pendingRefunds} refunds`}
        />

        <StatusCard
          title="Avg. Transaction"
          value={`₹${stats.avgTransaction.toLocaleString()}`}
          icon={BarChart3}
          iconColor="green"
          subtext={`Today: ${stats.todayTransactions} transactions`}
        />
      </div>

      {/* Main Content Area - Loan Entry page की तरह */}
      <div className="bg-white shadow-sm rounded-2xl border border-gray-200 h-[520px] relative">
        <div className="p-6">
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {activeTab === 'topup' ? 'Topup Transactions' : 'Refund Transactions'}
              </h2>
              <p className="text-sm text-gray-500">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredData.length)} of {filteredData.length} transactions
              </p>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* Tabs Navigation in compact form */}
              <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
                <button
                  onClick={() => setActiveTab('topup')}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    activeTab === 'topup'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <ArrowUpCircle className="w-4 h-4" />
                  Topup
                  <span className="ml-1 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                    {topupData.length}
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('refund')}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    activeTab === 'refund'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <ArrowDownCircle className="w-4 h-4" />
                  Refund
                  <span className="ml-1 bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded-full">
                    {refundData.length}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex flex-wrap gap-3 mb-4">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {/* Table with fixed height for pagination */}
          <div className="h-[340px] overflow-y-auto overflow-x-auto rounded-xl border border-gray-100">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b text-left">
                  {activeTab === 'topup' ? (
                    <>
                      <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Reference ID</th>
                      <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                      <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Payment Method</th>
                      <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date & Time</th>
                      <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                    </>
                  ) : (
                    <>
                      <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Reference ID</th>
                      <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                      <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Reason</th>
                      <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedData.length > 0 ? paginatedData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="p-4">
                      <div className="text-sm font-medium text-gray-900">{item.refId}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center">
                        <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                          <User className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="text-sm font-medium text-gray-900">{item.user}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className={`text-lg font-bold ${
                        activeTab === 'topup' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        ₹{item.amount.toLocaleString()}
                      </div>
                    </td>
                    {activeTab === 'topup' ? (
                      <>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            {getMethodIcon(item.method)}
                            <span className="text-sm text-gray-800">{item.method}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-sm text-gray-900">{item.date}</div>
                          <div className="text-sm text-gray-500">{item.time}</div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="p-4">
                          <div className="text-sm text-gray-800 max-w-xs truncate">{item.reason}</div>
                        </td>
                        <td className="p-4">
                          <div className="text-sm text-gray-900">{item.date}</div>
                        </td>
                      </>
                    )}
                    <td className="p-4">
                      {getStatusBadge(item.status)}
                    </td>
                    <td className="p-4 text-right">
                      <ActionMenu
                        items={[
                          {
                            label: "View Details",
                            onClick: () => console.log("View", item.id),
                          },
                          {
                            label: "Edit",
                            onClick: () => console.log("Edit", item.id),
                          },
                          {
                            label: "Delete",
                            onClick: () => {
                              if (window.confirm("Are you sure you want to delete this transaction?")) {
                                console.log("Delete", item.id);
                              }
                            },
                            danger: true
                          }
                        ]}
                      />
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={activeTab === 'topup' ? 7 : 7} className="text-center py-10 text-gray-400">
                      No transactions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION COMPONENT - Exactly Loan Entry page ki tarah */}
          <div className="absolute bottom-0 left-0 right-0 h-[64px] bg-white border-t border-gray-200 px-6">
            <div className="flex items-center justify-between h-full">
              <p className="text-sm text-gray-500">
                Showing {startIndex + 1}–{Math.min(endIndex, filteredData.length)} of {filteredData.length}
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

        </div>
      </div>

      {/* Footer Notes */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Security Note:</span> All transactions are encrypted and processed securely. 
              Refunds may take 5-7 business days to reflect in the user's account.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopupRefund;