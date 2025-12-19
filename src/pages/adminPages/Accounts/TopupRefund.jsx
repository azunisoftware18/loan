import React, { useState } from 'react';
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

function TopupRefund() {
  const [activeTab, setActiveTab] = useState('topup');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [actionMenuOpen, setActionMenuOpen] = useState(null);

  // Sample data for Topup Transactions
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
  ];

  // Sample data for Refund Transactions
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
  ];

  // Filter transactions based on status
  const filteredTopups = selectedStatus === 'all' 
    ? topupData 
    : topupData.filter(item => item.status.toLowerCase() === selectedStatus.toLowerCase());

  const filteredRefunds = selectedStatus === 'all' 
    ? refundData 
    : refundData.filter(item => item.status.toLowerCase() === selectedStatus.toLowerCase());

  // Stats data
  const stats = {
    totalTopups: 185000,
    totalRefunds: 47200,
    pendingTopups: 2,
    pendingRefunds: 3,
    todayTransactions: 8,
    avgTransaction: 6250
  };

  const getStatusBadge = (status) => {
    const colors = {
      'Completed': 'bg-green-100 text-green-800',
      'Approved': 'bg-green-100 text-green-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Failed': 'bg-red-100 text-red-800',
      'Rejected': 'bg-red-100 text-red-800'
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
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

  // Action Menu Component
  const ActionMenu = ({ item, isTopup }) => (
    <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
      <div className="py-1">
        {item.status === 'Pending' && (
          <>
            <button 
              onClick={() => {
                console.log(`Approve ${isTopup ? 'topup' : 'refund'}:`, item.id);
                setActionMenuOpen(null);
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-green-700 hover:bg-green-50"
            >
              <CheckCircle className="w-4 h-4" />
              {isTopup ? 'Approve Topup' : 'Approve Refund'}
            </button>
            <button 
              onClick={() => {
                console.log(`Reject ${isTopup ? 'topup' : 'refund'}:`, item.id);
                setActionMenuOpen(null);
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-700 hover:bg-red-50"
            >
              <XCircle className="w-4 h-4" />
              {isTopup ? 'Reject Topup' : 'Reject Refund'}
            </button>
            <div className="border-t border-gray-200 my-1"></div>
          </>
        )}
        
        <button 
          onClick={() => {
            console.log(`Edit ${isTopup ? 'topup' : 'refund'}:`, item.id);
            setActionMenuOpen(null);
          }}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-blue-700 hover:bg-blue-50"
        >
          <Edit className="w-4 h-4" />
          Edit Details
        </button>
        <button 
          onClick={() => {
            console.log(`View ${isTopup ? 'topup' : 'refund'} details:`, item.id);
            setActionMenuOpen(null);
          }}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
        >
          <Eye className="w-4 h-4" />
          View Details
        </button>
        {isTopup && (
          <button 
            onClick={() => {
              console.log('Process refund for topup:', item.id);
              setActionMenuOpen(null);
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-orange-700 hover:bg-orange-50"
          >
            <ArrowDownCircle className="w-4 h-4" />
            Process Refund
          </button>
        )}
        <button 
          onClick={() => {
            console.log(`Duplicate ${isTopup ? 'topup' : 'refund'}:`, item.id);
            setActionMenuOpen(null);
          }}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-purple-700 hover:bg-purple-50"
        >
          <Copy className="w-4 h-4" />
          Duplicate
        </button>
        <div className="border-t border-gray-200 my-1"></div>
        <button 
          onClick={() => {
            if (window.confirm(`Are you sure you want to delete this ${isTopup ? 'topup' : 'refund'}?`)) {
              console.log(`Delete ${isTopup ? 'topup' : 'refund'}:`, item.id);
              setActionMenuOpen(null);
            }
          }}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      </div>
    </div>
  );

  // Adding missing icons
  const Eye = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );

  const Copy = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <RefreshCw className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Topup & Refund Management</h1>
                <p className="text-gray-600 mt-1">Manage all your wallet transactions in one place</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                <PlusCircle className="w-5 h-5" />
                New Transaction
              </button>
              <button className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition">
                <Download className="w-5 h-5" />
                Export Report
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-5 shadow border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Topups</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">₹{stats.totalTopups.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <ArrowUpCircle className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-3 text-sm">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-green-600">+12.5%</span>
                <span className="text-gray-500 ml-1">from last month</span>
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 shadow border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Refunds</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">₹{stats.totalRefunds.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-red-50 rounded-lg">
                  <ArrowDownCircle className="w-8 h-8 text-red-600" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-3 text-sm">
                <TrendingDown className="w-4 h-4 text-red-500" />
                <span className="text-red-600">-3.2%</span>
                <span className="text-gray-500 ml-1">from last month</span>
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 shadow border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Transactions</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">{stats.pendingTopups + stats.pendingRefunds}</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <Clock className="w-8 h-8 text-yellow-600" />
                </div>
              </div>
              <div className="text-sm text-gray-500 mt-3">
                {stats.pendingTopups} topups, {stats.pendingRefunds} refunds
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 shadow border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg. Transaction</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">₹{stats.avgTransaction.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <BarChart3 className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <div className="text-sm text-gray-500 mt-3">
                Today: {stats.todayTransactions} transactions
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          {/* Tabs Navigation */}
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('topup')}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-all ${activeTab === 'topup' 
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-blue-500 hover:bg-gray-50'}`}
              >
                <ArrowUpCircle className="w-5 h-5" />
                Topup Transactions
                <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                  {topupData.length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab('refund')}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-all ${activeTab === 'refund' 
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-blue-500 hover:bg-gray-50'}`}
              >
                <ArrowDownCircle className="w-5 h-5" />
                Refund Transactions
                <span className="ml-2 px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                  {refundData.length}
                </span>
              </button>
            </div>
          </div>

          {/* Controls */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="all">All Status</option>
                    <option value="completed">Completed</option>
                    <option value="approved">Approved</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                    <Filter className="w-5 h-5" />
                    Filter
                  </button>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                  <Upload className="w-5 h-5" />
                  Import
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                  <Calendar className="w-5 h-5" />
                  Date Range
                </button>
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'topup' ? (
              <>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Topup Transactions</h2>
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredTopups.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{item.refId}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                <User className="w-4 h-4 text-blue-600" />
                              </div>
                              <div className="text-sm font-medium text-gray-900">{item.user}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-lg font-bold text-green-600">₹{item.amount.toLocaleString()}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              {getMethodIcon(item.method)}
                              <span className="text-sm text-gray-800">{item.method}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{item.date}</div>
                            <div className="text-sm text-gray-500">{item.time}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getStatusBadge(item.status)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap relative">
                            <button
                              onClick={() => setActionMenuOpen(actionMenuOpen === item.id ? null : item.id)}
                              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                              title="Actions"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>
                            {actionMenuOpen === item.id && (
                              <ActionMenu item={item} isTopup={true} />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Refund Transactions</h2>
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredRefunds.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{item.refId}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                <User className="w-4 h-4 text-blue-600" />
                              </div>
                              <div className="text-sm font-medium text-gray-900">{item.user}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-lg font-bold text-red-600">₹{item.amount.toLocaleString()}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-800 max-w-xs truncate">{item.reason}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{item.date}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getStatusBadge(item.status)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap relative">
                            <button
                              onClick={() => setActionMenuOpen(actionMenuOpen === item.id ? null : item.id)}
                              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                              title="Actions"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>
                            {actionMenuOpen === item.id && (
                              <ActionMenu item={item} isTopup={false} />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
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
    </div>
  );
}

export default TopupRefund;