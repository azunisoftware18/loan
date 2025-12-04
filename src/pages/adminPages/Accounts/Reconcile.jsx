import React, { useState } from 'react';
import {
  Scale,
  FileText,
  Calculator,
  RefreshCw,
  Search,
  Filter,
  Download,
  Upload,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  DollarSign,
  CreditCard,
  BarChart3,
  PieChart,
  Eye,
  Edit,
  MoreVertical,
  Calendar,
  ChevronDown,
  Check,
  X,
  Lock,
  Unlock,
  FileCheck,
  FileX
} from 'lucide-react';

function Reconcile() {
  const [activeTab, setActiveTab] = useState('general-ledger');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [dateRange, setDateRange] = useState('monthly');

  // Sample data for General Ledger Reconciliation
  const generalLedgerData = [
    { 
      id: 1, 
      accountCode: '1001', 
      accountName: 'Cash in Hand', 
      glBalance: 1250000, 
      bankBalance: 1250000, 
      difference: 0,
      status: 'Reconciled',
      lastReconciled: '2024-01-15'
    },
    { 
      id: 2, 
      accountCode: '1002', 
      accountName: 'Bank Account - HDFC', 
      glBalance: 3500000, 
      bankBalance: 3485000, 
      difference: 15000,
      status: 'Unreconciled',
      lastReconciled: '2024-01-10'
    },
    { 
      id: 3, 
      accountCode: '1003', 
      accountName: 'Bank Account - ICICI', 
      glBalance: 2100000, 
      bankBalance: 2100000, 
      difference: 0,
      status: 'Reconciled',
      lastReconciled: '2024-01-16'
    },
    { 
      id: 4, 
      accountCode: '2001', 
      accountName: 'Accounts Receivable', 
      glBalance: 1850000, 
      bankBalance: 1850000, 
      difference: 0,
      status: 'Partially Reconciled',
      lastReconciled: '2024-01-14'
    },
  ];

  // Sample data for Bank Reconciliation
  const bankReconciliationData = [
    { 
      id: 1, 
      bankName: 'HDFC Bank', 
      accountNo: 'XXXXXX1234', 
      glBalance: 3500000, 
      bankStatement: 3485000, 
      outstandingCheques: 50000,
      depositsInTransit: 30000,
      adjustedBalance: 3500000,
      status: 'Pending'
    },
    { 
      id: 2, 
      bankName: 'ICICI Bank', 
      accountNo: 'XXXXXX5678', 
      glBalance: 2100000, 
      bankStatement: 2100000, 
      outstandingCheques: 0,
      depositsInTransit: 0,
      adjustedBalance: 2100000,
      status: 'Completed'
    },
    { 
      id: 3, 
      bankName: 'SBI', 
      accountNo: 'XXXXXX9012', 
      glBalance: 850000, 
      bankStatement: 820000, 
      outstandingCheques: 20000,
      depositsInTransit: 10000,
      adjustedBalance: 850000,
      status: 'In Progress'
    },
  ];

  // Sample data for Trial Balance
  const trialBalanceData = [
    { 
      id: 1, 
      accountCode: '1001', 
      accountName: 'Cash in Hand', 
      debit: 1250000, 
      credit: 0, 
      type: 'Asset',
      balance: 1250000
    },
    { 
      id: 2, 
      accountCode: '1002', 
      accountName: 'Bank Account', 
      debit: 3500000, 
      credit: 0, 
      type: 'Asset',
      balance: 3500000
    },
    { 
      id: 3, 
      accountCode: '2001', 
      accountName: 'Accounts Payable', 
      debit: 0, 
      credit: 1850000, 
      type: 'Liability',
      balance: 1850000
    },
    { 
      id: 4, 
      accountCode: '3001', 
      accountName: 'Capital', 
      debit: 0, 
      credit: 5000000, 
      type: 'Equity',
      balance: 5000000
    },
    { 
      id: 5, 
      accountCode: '4001', 
      accountName: 'Sales Revenue', 
      debit: 0, 
      credit: 2850000, 
      type: 'Revenue',
      balance: 2850000
    },
    { 
      id: 6, 
      accountCode: '5001', 
      accountName: 'Salary Expense', 
      debit: 950000, 
      credit: 0, 
      type: 'Expense',
      balance: 950000
    },
  ];

  // Reconciliation Summary
  const reconciliationSummary = {
    totalAccounts: 24,
    reconciledAccounts: 18,
    unreconciledAccounts: 4,
    partiallyReconciled: 2,
    totalDifference: 75000,
    lastReconciliation: '2024-01-17'
  };

  // Trial Balance Summary
  const trialBalanceSummary = {
    totalDebit: 5700000,
    totalCredit: 5700000,
    difference: 0,
    isBalanced: true,
    totalAccounts: 32
  };

  const getStatusBadge = (status) => {
    const colors = {
      'Reconciled': 'bg-green-100 text-green-800',
      'Completed': 'bg-green-100 text-green-800',
      'Unreconciled': 'bg-red-100 text-red-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
      'In Progress': 'bg-blue-100 text-blue-800',
      'Partially Reconciled': 'bg-orange-100 text-orange-800'
    };
    
    const icons = {
      'Reconciled': <CheckCircle className="w-3 h-3" />,
      'Completed': <CheckCircle className="w-3 h-3" />,
      'Unreconciled': <XCircle className="w-3 h-3" />,
      'Pending': <AlertCircle className="w-3 h-3" />,
      'In Progress': <RefreshCw className="w-3 h-3" />,
      'Partially Reconciled': <AlertCircle className="w-3 h-3" />
    };
    
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
        {icons[status]}
        {status}
      </span>
    );
  };

  const getAccountTypeBadge = (type) => {
    const colors = {
      'Asset': 'bg-blue-100 text-blue-800',
      'Liability': 'bg-red-100 text-red-800',
      'Equity': 'bg-purple-100 text-purple-800',
      'Revenue': 'bg-green-100 text-green-800',
      'Expense': 'bg-orange-100 text-orange-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[type] || 'bg-gray-100 text-gray-800'}`}>
        {type}
      </span>
    );
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl shadow-lg">
                  <Scale className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Reconciliation</h1>
                  <p className="text-gray-600 mt-1">Balance accounts and verify financial accuracy</p>
                </div>
              </div>
              
              {/* Time Range Selector */}
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none bg-white"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
                <div className="text-sm text-gray-600">
                  Last reconciliation: {reconciliationSummary.lastReconciliation}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition shadow-md">
                <RefreshCw className="w-5 h-5" />
                Run Reconciliation
              </button>
              <button className="flex items-center gap-2 bg-white text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition border border-gray-300 shadow-sm">
                <Download className="w-5 h-5" />
                Export Report
              </button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl p-5 shadow-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Accounts</p>
                  <p className="text-2xl font-bold text-gray-800 mt-2">{reconciliationSummary.totalAccounts}</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-3 text-sm">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-green-600">+2 this month</span>
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Reconciled Accounts</p>
                  <p className="text-2xl font-bold text-gray-800 mt-2">{reconciliationSummary.reconciledAccounts}</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Progress</span>
                  <span>{Math.round((reconciliationSummary.reconciledAccounts / reconciliationSummary.totalAccounts) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full" 
                    style={{ width: `${(reconciliationSummary.reconciledAccounts / reconciliationSummary.totalAccounts) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Unreconciled</p>
                  <p className="text-2xl font-bold text-gray-800 mt-2">{reconciliationSummary.unreconciledAccounts}</p>
                </div>
                <div className="p-3 bg-red-50 rounded-lg">
                  <XCircle className="w-8 h-8 text-red-600" />
                </div>
              </div>
              <div className="mt-3 text-sm">
                <span className="text-red-600 font-medium">{formatCurrency(reconciliationSummary.totalDifference)}</span>
                <span className="text-gray-500 ml-2">total difference</span>
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Trial Balance</p>
                  <p className="text-2xl font-bold text-gray-800 mt-2">
                    {trialBalanceSummary.isBalanced ? 'Balanced' : 'Unbalanced'}
                  </p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <Calculator className="w-8 h-8 text-purple-600" />
                </div>
              </div>
              <div className="mt-3 text-sm">
                <span className="text-gray-700">{formatCurrency(trialBalanceSummary.totalDebit)} = {formatCurrency(trialBalanceSummary.totalCredit)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Navigation Tabs */}
          <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex flex-wrap">
              <button
                onClick={() => setActiveTab('general-ledger')}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-all ${activeTab === 'general-ledger' 
                  ? 'text-green-600 border-b-2 border-green-600 bg-white' 
                  : 'text-gray-600 hover:text-green-500 hover:bg-gray-50'}`}
              >
                <FileText className="w-5 h-5" />
                General Ledger
                <span className="ml-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                  {generalLedgerData.length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab('bank-reconciliation')}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-all ${activeTab === 'bank-reconciliation' 
                  ? 'text-green-600 border-b-2 border-green-600 bg-white' 
                  : 'text-gray-600 hover:text-green-500 hover:bg-gray-50'}`}
              >
                <CreditCard className="w-5 h-5" />
                Bank Reconciliation
                <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                  {bankReconciliationData.length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab('trial-balance')}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-all ${activeTab === 'trial-balance' 
                  ? 'text-green-600 border-b-2 border-green-600 bg-white' 
                  : 'text-gray-600 hover:text-green-500 hover:bg-gray-50'}`}
              >
                <Scale className="w-5 h-5" />
                Trial Balance
                <span className="ml-2 px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
                  {trialBalanceData.length}
                </span>
              </button>
            </div>
          </div>

          {/* Controls */}
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1 md:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search accounts..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  />
                </div>
                <div className="flex gap-3">
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none bg-white"
                  >
                    <option value="all">All Status</option>
                    <option value="reconciled">Reconciled</option>
                    <option value="unreconciled">Unreconciled</option>
                    <option value="pending">Pending</option>
                    <option value="in progress">In Progress</option>
                  </select>
                  <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition">
                    <Filter className="w-5 h-5" />
                    Filter
                  </button>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 bg-green-50 text-green-700 border border-green-200 px-4 py-3 rounded-lg hover:bg-green-100 transition">
                  <Lock className="w-5 h-5" />
                  Lock Period
                </button>
                <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition">
                  <Calendar className="w-5 h-5" />
                  Date Range
                </button>
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* General Ledger Reconciliation */}
            {activeTab === 'general-ledger' && (
              <div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                      <FileText className="w-6 h-6" />
                      General Ledger Reconciliation
                    </h2>
                    <p className="text-gray-600 mt-1">Compare GL balances with subsidiary ledgers</p>
                  </div>
                  <div className="mt-4 md:mt-0 flex gap-3">
                    <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                      <CheckCircle className="w-4 h-4" />
                      Reconcile All
                    </button>
                    <button className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition">
                      <Download className="w-4 h-4" />
                      Export
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Code</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GL Balance</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subsidiary Balance</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difference</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Reconciled</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {generalLedgerData.map((item) => (
                        <tr key={item.id} className={`hover:bg-gray-50 transition ${item.difference !== 0 ? 'bg-red-50' : ''}`}>
                          <td className="px-6 py-4 whitespace-nowrap font-mono font-medium text-blue-600">{item.accountCode}</td>
                          <td className="px-6 py-4 whitespace-nowrap font-medium">{item.accountName}</td>
                          <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-800">{formatCurrency(item.glBalance)}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(item.bankBalance)}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`font-bold ${item.difference === 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {item.difference === 0 ? '✓' : formatCurrency(item.difference)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getStatusBadge(item.status)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.lastReconciled}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex gap-2">
                              <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg">
                                <Eye className="w-4 h-4" />
                              </button>
                              {item.difference !== 0 && (
                                <button className="p-2 text-green-600 hover:bg-green-100 rounded-lg">
                                  <RefreshCw className="w-4 h-4" />
                                </button>
                              )}
                              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                                <MoreVertical className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Reconciliation Actions */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Quick Reconciliation Actions</h3>
                  <div className="flex flex-wrap gap-3">
                    <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                      <CheckCircle className="w-4 h-4" />
                      Auto Reconcile
                    </button>
                    <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                      <FileCheck className="w-4 h-4" />
                      Generate Report
                    </button>
                    <button className="flex items-center gap-2 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition">
                      <AlertCircle className="w-4 h-4" />
                      Flag Differences
                    </button>
                    <button className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
                      <Calculator className="w-4 h-4" />
                      Calculate Adjustments
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Bank Reconciliation */}
            {activeTab === 'bank-reconciliation' && (
              <div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                      <CreditCard className="w-6 h-6" />
                      Bank Reconciliation
                    </h2>
                    <p className="text-gray-600 mt-1">Reconcile bank statements with GL bank accounts</p>
                  </div>
                  <div className="mt-4 md:mt-0 flex gap-3">
                    <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                      <Upload className="w-4 h-4" />
                      Import Bank Statement
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bank Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Number</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GL Balance</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bank Statement</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Outstanding Cheques</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deposits in Transit</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Adjusted Balance</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {bankReconciliationData.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50 transition">
                          <td className="px-6 py-4 whitespace-nowrap font-medium text-blue-600">{item.bankName}</td>
                          <td className="px-6 py-4 whitespace-nowrap font-mono">{item.accountNo}</td>
                          <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-800">{formatCurrency(item.glBalance)}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(item.bankStatement)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-red-600">-{formatCurrency(item.outstandingCheques)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-green-600">+{formatCurrency(item.depositsInTransit)}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`font-bold ${item.glBalance === item.adjustedBalance ? 'text-green-600' : 'text-red-600'}`}>
                              {formatCurrency(item.adjustedBalance)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getStatusBadge(item.status)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex gap-2">
                              <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-green-600 hover:bg-green-100 rounded-lg">
                                <RefreshCw className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Bank Reconciliation Steps */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="text-sm text-blue-600 font-medium mb-2">Step 1: Compare Balances</div>
                    <div className="text-sm text-gray-700">GL Balance vs Bank Statement</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="text-sm text-green-600 font-medium mb-2">Step 2: Identify Differences</div>
                    <div className="text-sm text-gray-700">Outstanding items and timing differences</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <div className="text-sm text-purple-600 font-medium mb-2">Step 3: Make Adjustments</div>
                    <div className="text-sm text-gray-700">Journal entries for reconciliation</div>
                  </div>
                </div>
              </div>
            )}

            {/* Trial Balance */}
            {activeTab === 'trial-balance' && (
              <div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                      <Scale className="w-6 h-6" />
                      Trial Balance Report
                    </h2>
                    <p className="text-gray-600 mt-1">List of all general ledger accounts with debit and credit balances</p>
                  </div>
                  <div className="mt-4 md:mt-0 flex gap-3">
                    <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                      <Calculator className="w-4 h-4" />
                      Generate Trial Balance
                    </button>
                    <button className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition">
                      <Download className="w-4 h-4" />
                      Export
                    </button>
                  </div>
                </div>

                {/* Trial Balance Summary */}
                <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                  <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center gap-4 mb-4 md:mb-0">
                      <div className="text-center">
                        <div className="text-sm text-gray-600">Total Debit</div>
                        <div className="text-2xl font-bold text-gray-800">{formatCurrency(trialBalanceSummary.totalDebit)}</div>
                      </div>
                      <div className="text-3xl text-gray-400">=</div>
                      <div className="text-center">
                        <div className="text-sm text-gray-600">Total Credit</div>
                        <div className="text-2xl font-bold text-gray-800">{formatCurrency(trialBalanceSummary.totalCredit)}</div>
                      </div>
                    </div>
                    <div className={`flex items-center gap-2 ${trialBalanceSummary.isBalanced ? 'text-green-600' : 'text-red-600'}`}>
                      {trialBalanceSummary.isBalanced ? (
                        <>
                          <CheckCircle className="w-6 h-6" />
                          <span className="text-lg font-bold">Trial Balance is Balanced</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-6 h-6" />
                          <span className="text-lg font-bold">Trial Balance is Unbalanced</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Code</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Debit (₹)</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credit (₹)</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {trialBalanceData.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50 transition">
                          <td className="px-6 py-4 whitespace-nowrap font-mono font-medium text-blue-600">{item.accountCode}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{item.accountName}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getAccountTypeBadge(item.type)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap font-bold text-red-600">
                            {item.debit > 0 ? formatCurrency(item.debit) : '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap font-bold text-green-600">
                            {item.credit > 0 ? formatCurrency(item.credit) : '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`font-bold ${item.balance >= 0 ? 'text-gray-800' : 'text-red-600'}`}>
                              {formatCurrency(Math.abs(item.balance))}
                              <span className="text-sm text-gray-500 ml-2">
                                ({item.type === 'Asset' || item.type === 'Expense' ? 'Debit' : 'Credit'})
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-100">
                      <tr>
                        <td colSpan="3" className="px-6 py-4 whitespace-nowrap text-right font-bold text-gray-800">
                          Total:
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-bold text-red-600">
                          {formatCurrency(trialBalanceSummary.totalDebit)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-bold text-green-600">
                          {formatCurrency(trialBalanceSummary.totalCredit)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`font-bold ${trialBalanceSummary.difference === 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {trialBalanceSummary.difference === 0 ? '✓ Balanced' : `Unbalanced: ${formatCurrency(Math.abs(trialBalanceSummary.difference))}`}
                          </div>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                {/* Trial Balance Information */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="text-lg font-medium text-gray-800 mb-2">Trial Balance Rules</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Total Debits must equal Total Credits</li>
                      <li>• Assets and Expenses have normal debit balances</li>
                      <li>• Liabilities, Equity, and Revenue have normal credit balances</li>
                      <li>• Used to prepare financial statements</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h4 className="text-lg font-medium text-gray-800 mb-2">Next Steps</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Generate Income Statement from trial balance</li>
                      <li>• Generate Balance Sheet from trial balance</li>
                      <li>• Prepare adjusting journal entries if unbalanced</li>
                      <li>• Export for audit purposes</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-600">
                Showing {activeTab === 'general-ledger' ? generalLedgerData.length : 
                        activeTab === 'bank-reconciliation' ? bankReconciliationData.length : 
                        trialBalanceData.length} records
              </div>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700">
                  Previous
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  1
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700">
                  2
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700">
                  3
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Notes */}
        <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
          <div className="flex items-start gap-3">
            <Scale className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Reconciliation Guidelines:</span> 
                All reconciliations should be completed by the 5th of each month. 
                Unreconciled items older than 90 days must be investigated immediately.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reconcile;