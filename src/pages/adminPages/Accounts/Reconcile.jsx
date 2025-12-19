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
  FileX,
  Settings,
  ChevronRight,
  Shield,
  Activity,
  Target,
  Zap
} from 'lucide-react';

function Reconcile() {
  const [activeTab, setActiveTab] = useState('general-ledger');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [dateRange, setDateRange] = useState('monthly');
  const [actionMenuOpen, setActionMenuOpen] = useState(null);

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
      'Reconciled': 'bg-emerald-50 text-emerald-700 border-emerald-200',
      'Completed': 'bg-emerald-50 text-emerald-700 border-emerald-200',
      'Unreconciled': 'bg-rose-50 text-rose-700 border-rose-200',
      'Pending': 'bg-amber-50 text-amber-700 border-amber-200',
      'In Progress': 'bg-blue-50 text-blue-700 border-blue-200',
      'Partially Reconciled': 'bg-violet-50 text-violet-700 border-violet-200'
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
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${colors[status] || 'bg-gray-50 text-gray-700 border-gray-200'}`}>
        {icons[status]}
        {status}
      </span>
    );
  };

  const getAccountTypeBadge = (type) => {
    const colors = {
      'Asset': 'bg-blue-50 text-blue-700 border-blue-200',
      'Liability': 'bg-rose-50 text-rose-700 border-rose-200',
      'Equity': 'bg-violet-50 text-violet-700 border-violet-200',
      'Revenue': 'bg-emerald-50 text-emerald-700 border-emerald-200',
      'Expense': 'bg-amber-50 text-amber-700 border-amber-200'
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${colors[type] || 'bg-gray-50 text-gray-700 border-gray-200'}`}>
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

  // Action Menu Component
  const ActionMenu = ({ item, section }) => (
    <div className="absolute right-0 top-full mt-1 w-56 bg-white border border-gray-200 rounded-xl shadow-xl z-10 backdrop-blur-sm">
      <div className="py-2">
        <button 
          onClick={() => {
            console.log(`View ${section} details:`, item.id);
            setActionMenuOpen(null);
          }}
          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition"
        >
          <Eye className="w-4 h-4" />
          View Details
        </button>
        <button 
          onClick={() => {
            console.log(`Reconcile ${section}:`, item.id);
            setActionMenuOpen(null);
          }}
          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-emerald-700 hover:bg-emerald-50 transition"
        >
          <CheckCircle className="w-4 h-4" />
          Reconcile Now
        </button>
        <button 
          onClick={() => {
            console.log(`Download ${section} report:`, item.id);
            setActionMenuOpen(null);
          }}
          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-blue-700 hover:bg-blue-50 transition"
        >
          <Download className="w-4 h-4" />
          Download Report
        </button>
        
        <div className="border-t border-gray-100 my-1"></div>
        
        <button 
          onClick={() => {
            console.log(`Edit ${section}:`, item.id);
            setActionMenuOpen(null);
          }}
          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-violet-700 hover:bg-violet-50 transition"
        >
          <Edit className="w-4 h-4" />
          Edit Account
        </button>
        
        <button 
          onClick={() => {
            console.log(`Flag ${section}:`, item.id);
            setActionMenuOpen(null);
          }}
          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-amber-700 hover:bg-amber-50 transition"
        >
          <AlertCircle className="w-4 h-4" />
          Flag for Review
        </button>
        
        <div className="border-t border-gray-100 my-1"></div>
        
        <button 
          onClick={() => {
            if (window.confirm(`Are you sure you want to delete this ${section} record?`)) {
              console.log(`Delete ${section}:`, item.id);
              setActionMenuOpen(null);
            }
          }}
          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-rose-600 hover:bg-rose-50 transition"
        >
          <Trash2 className="w-4 h-4" />
          Delete Record
        </button>
      </div>
    </div>
  );

  // Adding Trash2 icon
  const Trash2 = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg">
                  <Scale className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Financial Reconciliation</h1>
                  <p className="text-gray-600 mt-1">Maintain financial accuracy with advanced reconciliation tools</p>
                </div>
              </div>
              
              {/* Time Range Selector */}
              <div className="flex items-center gap-4 mt-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white shadow-sm"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
                <div className="text-sm text-gray-600 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Last reconciled: {reconciliationSummary.lastReconciliation}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl">
                <RefreshCw className="w-5 h-5" />
                Run Reconciliation
              </button>
              <button className="flex items-center gap-2 bg-white text-gray-700 px-5 py-3 rounded-xl hover:bg-gray-50 transition-all border border-gray-300 shadow-sm">
                <Download className="w-5 h-5" />
                Export Report
              </button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Accounts</p>
                  <p className="text-2xl font-bold text-gray-800 mt-2">{reconciliationSummary.totalAccounts}</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-4 text-sm">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                <span className="text-emerald-600">+2 this month</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Reconciled Accounts</p>
                  <p className="text-2xl font-bold text-gray-800 mt-2">{reconciliationSummary.reconciledAccounts}</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl">
                  <CheckCircle className="w-8 h-8 text-emerald-600" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                  <span>Progress</span>
                  <span>{Math.round((reconciliationSummary.reconciledAccounts / reconciliationSummary.totalAccounts) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-green-500 h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${(reconciliationSummary.reconciledAccounts / reconciliationSummary.totalAccounts) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Unreconciled</p>
                  <p className="text-2xl font-bold text-gray-800 mt-2">{reconciliationSummary.unreconciledAccounts}</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl">
                  <XCircle className="w-8 h-8 text-rose-600" />
                </div>
              </div>
              <div className="mt-4 text-sm">
                <span className="text-rose-600 font-medium">{formatCurrency(reconciliationSummary.totalDifference)}</span>
                <span className="text-gray-500 ml-2">total difference</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Trial Balance</p>
                  <p className="text-2xl font-bold text-gray-800 mt-2">
                    {trialBalanceSummary.isBalanced ? 'Balanced' : 'Unbalanced'}
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl">
                  <Calculator className="w-8 h-8 text-violet-600" />
                </div>
              </div>
              <div className="mt-4 text-sm flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-500" />
                <span className="text-gray-700">{formatCurrency(trialBalanceSummary.totalDebit)} = {formatCurrency(trialBalanceSummary.totalCredit)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Navigation Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex flex-wrap">
              <button
                onClick={() => {
                  setActiveTab('general-ledger');
                  setActionMenuOpen(null);
                }}
                className={`flex items-center gap-3 px-8 py-5 font-medium transition-all ${activeTab === 'general-ledger' 
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-gradient-to-r from-blue-50 to-white' 
                  : 'text-gray-600 hover:text-blue-500 hover:bg-gray-50'}`}
              >
                <FileText className="w-5 h-5" />
                General Ledger
                <span className="ml-2 px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-full font-medium">
                  {generalLedgerData.length}
                </span>
              </button>
              <button
                onClick={() => {
                  setActiveTab('bank-reconciliation');
                  setActionMenuOpen(null);
                }}
                className={`flex items-center gap-3 px-8 py-5 font-medium transition-all ${activeTab === 'bank-reconciliation' 
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-gradient-to-r from-blue-50 to-white' 
                  : 'text-gray-600 hover:text-blue-500 hover:bg-gray-50'}`}
              >
                <CreditCard className="w-5 h-5" />
                Bank Reconciliation
                <span className="ml-2 px-3 py-1 text-xs bg-indigo-100 text-indigo-800 rounded-full font-medium">
                  {bankReconciliationData.length}
                </span>
              </button>
              <button
                onClick={() => {
                  setActiveTab('trial-balance');
                  setActionMenuOpen(null);
                }}
                className={`flex items-center gap-3 px-8 py-5 font-medium transition-all ${activeTab === 'trial-balance' 
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-gradient-to-r from-blue-50 to-white' 
                  : 'text-gray-600 hover:text-blue-500 hover:bg-gray-50'}`}
              >
                <Scale className="w-5 h-5" />
                Trial Balance
                <span className="ml-2 px-3 py-1 text-xs bg-violet-100 text-violet-800 rounded-full font-medium">
                  {trialBalanceData.length}
                </span>
              </button>
            </div>
          </div>

          {/* Controls */}
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-slate-50 to-gray-50">
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1 md:w-80">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search accounts, banks, or transactions..."
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white shadow-sm"
                  />
                </div>
                <div className="flex gap-3">
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white shadow-sm"
                  >
                    <option value="all">All Status</option>
                    <option value="reconciled">Reconciled</option>
                    <option value="unreconciled">Unreconciled</option>
                    <option value="pending">Pending</option>
                    <option value="in progress">In Progress</option>
                  </select>
                  <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-50 transition shadow-sm">
                    <Filter className="w-5 h-5" />
                    Filter
                  </button>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200 px-4 py-3 rounded-xl hover:bg-blue-100 transition">
                  <Lock className="w-5 h-5" />
                  Lock Period
                </button>
                <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-50 transition shadow-sm">
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
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl">
                        <FileText className="w-6 h-6 text-blue-600" />
                      </div>
                      General Ledger Reconciliation
                    </h2>
                    <p className="text-gray-600 mt-2">Compare GL balances with subsidiary ledgers and banks</p>
                  </div>
                  <div className="mt-4 md:mt-0 flex gap-3">
                    <button className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white px-4 py-3 rounded-xl hover:from-emerald-600 hover:to-green-600 transition shadow-md">
                      <CheckCircle className="w-5 h-5" />
                      Reconcile All
                    </button>
                    <button className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-50 transition shadow-sm">
                      <Download className="w-5 h-5" />
                      Export
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Account Code</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Account Name</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">GL Balance</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Subsidiary Balance</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Difference</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Last Reconciled</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {generalLedgerData.map((item) => (
                        <tr key={item.id} className={`hover:bg-blue-50 transition ${item.difference !== 0 ? 'bg-rose-50/50' : ''}`}>
                          <td className="px-6 py-4 whitespace-nowrap font-mono font-medium text-blue-600">{item.accountCode}</td>
                          <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{item.accountName}</td>
                          <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">{formatCurrency(item.glBalance)}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(item.bankBalance)}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`font-bold ${item.difference === 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                              {item.difference === 0 ? '✓ Balanced' : formatCurrency(item.difference)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getStatusBadge(item.status)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.lastReconciled}</td>
                          <td className="px-6 py-4 whitespace-nowrap relative">
                            <button
                              onClick={() => setActionMenuOpen(actionMenuOpen === item.id ? null : item.id)}
                              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                              title="Actions"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>
                            {actionMenuOpen === item.id && (
                              <ActionMenu item={item} section="general-ledger" />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Quick Actions */}
                <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-blue-600" />
                    Quick Reconciliation Actions
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <button className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white px-4 py-3 rounded-xl hover:from-emerald-600 hover:to-green-600 transition shadow-md">
                      <CheckCircle className="w-5 h-5" />
                      Auto Reconcile
                    </button>
                    <button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-3 rounded-xl hover:from-blue-600 hover:to-indigo-600 transition shadow-md">
                      <FileCheck className="w-5 h-5" />
                      Generate Report
                    </button>
                    <button className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-3 rounded-xl hover:from-amber-600 hover:to-orange-600 transition shadow-md">
                      <AlertCircle className="w-5 h-5" />
                      Flag Differences
                    </button>
                    <button className="flex items-center gap-2 bg-gradient-to-r from-violet-500 to-purple-500 text-white px-4 py-3 rounded-xl hover:from-violet-600 hover:to-purple-600 transition shadow-md">
                      <Calculator className="w-5 h-5" />
                      Calculate Adjustments
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Bank Reconciliation */}
            {activeTab === 'bank-reconciliation' && (
              <div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-indigo-100 to-indigo-200 rounded-xl">
                        <CreditCard className="w-6 h-6 text-indigo-600" />
                      </div>
                      Bank Reconciliation
                    </h2>
                    <p className="text-gray-600 mt-2">Reconcile bank statements with GL bank accounts</p>
                  </div>
                  <div className="mt-4 md:mt-0 flex gap-3">
                    <button className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-3 rounded-xl hover:from-indigo-600 hover:to-purple-600 transition shadow-md">
                      <Upload className="w-5 h-5" />
                      Import Bank Statement
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Bank Name</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Account Number</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">GL Balance</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Bank Statement</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Outstanding Cheques</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Deposits in Transit</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Adjusted Balance</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {bankReconciliationData.map((item) => (
                        <tr key={item.id} className="hover:bg-indigo-50 transition">
                          <td className="px-6 py-4 whitespace-nowrap font-medium text-indigo-600">{item.bankName}</td>
                          <td className="px-6 py-4 whitespace-nowrap font-mono">{item.accountNo}</td>
                          <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">{formatCurrency(item.glBalance)}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(item.bankStatement)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-rose-600">-{formatCurrency(item.outstandingCheques)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-emerald-600">+{formatCurrency(item.depositsInTransit)}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`font-bold ${item.glBalance === item.adjustedBalance ? 'text-emerald-600' : 'text-rose-600'}`}>
                              {formatCurrency(item.adjustedBalance)}
                            </div>
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
                              <ActionMenu item={item} section="bank-reconciliation" />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Bank Reconciliation Steps */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-2xl border border-blue-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        <Target className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="text-sm text-blue-600 font-semibold">Step 1: Compare Balances</div>
                    </div>
                    <div className="text-sm text-gray-700">GL Balance vs Bank Statement</div>
                  </div>
                  <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-5 rounded-2xl border border-emerald-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        <AlertCircle className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div className="text-sm text-emerald-600 font-semibold">Step 2: Identify Differences</div>
                    </div>
                    <div className="text-sm text-gray-700">Outstanding items and timing differences</div>
                  </div>
                  <div className="bg-gradient-to-r from-violet-50 to-purple-50 p-5 rounded-2xl border border-violet-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        <Calculator className="w-5 h-5 text-violet-600" />
                      </div>
                      <div className="text-sm text-violet-600 font-semibold">Step 3: Make Adjustments</div>
                    </div>
                    <div className="text-sm text-gray-700">Journal entries for reconciliation</div>
                  </div>
                </div>
              </div>
            )}

            {/* Trial Balance */}
            {activeTab === 'trial-balance' && (
              <div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-violet-100 to-purple-100 rounded-xl">
                        <Scale className="w-6 h-6 text-violet-600" />
                      </div>
                      Trial Balance Report
                    </h2>
                    <p className="text-gray-600 mt-2">List of all general ledger accounts with debit and credit balances</p>
                  </div>
                  <div className="mt-4 md:mt-0 flex gap-3">
                    <button className="flex items-center gap-2 bg-gradient-to-r from-violet-500 to-purple-500 text-white px-4 py-3 rounded-xl hover:from-violet-600 hover:to-purple-600 transition shadow-md">
                      <Calculator className="w-5 h-5" />
                      Generate Trial Balance
                    </button>
                    <button className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-50 transition shadow-sm">
                      <Download className="w-5 h-5" />
                      Export
                    </button>
                  </div>
                </div>

                {/* Trial Balance Summary */}
                <div className="mb-8 p-6 bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl border border-emerald-200">
                  <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center gap-6 mb-4 md:mb-0">
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
                    <div className={`flex items-center gap-3 ${trialBalanceSummary.isBalanced ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {trialBalanceSummary.isBalanced ? (
                        <>
                          <div className="p-2 bg-white rounded-xl shadow-sm">
                            <CheckCircle className="w-6 h-6" />
                          </div>
                          <span className="text-lg font-bold">Trial Balance is Balanced</span>
                        </>
                      ) : (
                        <>
                          <div className="p-2 bg-white rounded-xl shadow-sm">
                            <XCircle className="w-6 h-6" />
                          </div>
                          <span className="text-lg font-bold">Trial Balance is Unbalanced</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Account Code</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Account Name</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Debit (₹)</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Credit (₹)</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Balance</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {trialBalanceData.map((item) => (
                        <tr key={item.id} className="hover:bg-violet-50 transition">
                          <td className="px-6 py-4 whitespace-nowrap font-mono font-medium text-violet-600">{item.accountCode}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{item.accountName}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getAccountTypeBadge(item.type)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap font-bold text-rose-600">
                            {item.debit > 0 ? formatCurrency(item.debit) : '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap font-bold text-emerald-600">
                            {item.credit > 0 ? formatCurrency(item.credit) : '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`font-bold ${item.balance >= 0 ? 'text-gray-900' : 'text-rose-600'}`}>
                              {formatCurrency(Math.abs(item.balance))}
                              <span className="text-sm text-gray-500 ml-2">
                                ({item.type === 'Asset' || item.type === 'Expense' ? 'Debit' : 'Credit'})
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gradient-to-r from-gray-50 to-gray-100">
                      <tr>
                        <td colSpan="3" className="px-6 py-4 whitespace-nowrap text-right font-bold text-gray-900">
                          Total:
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-bold text-rose-600">
                          {formatCurrency(trialBalanceSummary.totalDebit)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-bold text-emerald-600">
                          {formatCurrency(trialBalanceSummary.totalCredit)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`font-bold ${trialBalanceSummary.difference === 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {trialBalanceSummary.difference === 0 ? '✓ Balanced' : `Unbalanced: ${formatCurrency(Math.abs(trialBalanceSummary.difference))}`}
                          </div>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gradient-to-r from-gray-50 to-slate-50 px-6 py-5 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-600 flex items-center gap-2">
                <Shield className="w-4 h-4 text-gray-400" />
                <span>
                  Showing {activeTab === 'general-ledger' ? generalLedgerData.length : 
                          activeTab === 'bank-reconciliation' ? bankReconciliationData.length : 
                          trialBalanceData.length} records
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 text-gray-700 transition">
                  Previous
                </button>
                <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 transition shadow-md">
                  1
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 text-gray-700 transition">
                  2
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 text-gray-700 transition">
                  3
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 text-gray-700 transition">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Notes */}
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Reconciliation Guidelines</h4>
              <p className="text-sm text-gray-700">
                All reconciliations should be completed by the 5th of each month. 
                Unreconciled items older than 90 days must be investigated immediately. 
                Use the auto-reconcile feature for bulk processing and export reports for audit purposes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reconcile;