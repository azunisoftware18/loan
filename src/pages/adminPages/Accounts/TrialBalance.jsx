import React, { useState } from 'react';
import {
  FileText,
  Download,
  Filter,
  Search,
  Calendar,
  TrendingUp,
  TrendingDown,
  Eye,
  Printer,
  RefreshCw,
  ChevronDown,
  BarChart3,
  Calculator,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Users,
  Building,
  Clock
} from 'lucide-react';

function TrialBalance() {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data for trial balance
  const [trialBalanceData, setTrialBalanceData] = useState({
    dateRange: '01 Mar 2024 - 31 Mar 2024',
    totalAssets: 24500000,
    totalLiabilities: 18200000,
    totalEquity: 6300000,
    discrepancy: 0,
    branches: [
      { id: 1, name: 'Delhi Main', assets: 8500000, liabilities: 6200000 },
      { id: 2, name: 'Mumbai West', assets: 7200000, liabilities: 5400000 },
      { id: 3, name: 'Bangalore South', assets: 5500000, liabilities: 4200000 },
      { id: 4, name: 'Chennai Central', assets: 3300000, liabilities: 2400000 },
    ],
    accounts: [
      { id: 1, code: '1001', name: 'Cash in Hand', type: 'asset', debit: 2500000, credit: 0, balance: 2500000 },
      { id: 2, code: '1002', name: 'Bank Accounts', type: 'asset', debit: 12000000, credit: 0, balance: 12000000 },
      { id: 3, code: '1003', name: 'Loan Receivables', type: 'asset', debit: 8000000, credit: 500000, balance: 7500000 },
      { id: 4, code: '1004', name: 'Interest Receivable', type: 'asset', debit: 2000000, credit: 0, balance: 2000000 },
      { id: 5, code: '2001', name: 'Customer Deposits', type: 'liability', debit: 0, credit: 9500000, balance: 9500000 },
      { id: 6, code: '2002', name: 'Loan Payables', type: 'liability', debit: 0, credit: 6500000, balance: 6500000 },
      { id: 7, code: '2003', name: 'Interest Payable', type: 'liability', debit: 0, credit: 1200000, balance: 1200000 },
      { id: 8, code: '2004', name: 'Tax Payable', type: 'liability', debit: 0, credit: 1000000, balance: 1000000 },
      { id: 9, code: '3001', name: 'Share Capital', type: 'equity', debit: 0, credit: 5000000, balance: 5000000 },
      { id: 10, code: '3002', name: 'Retained Earnings', type: 'equity', debit: 0, credit: 1300000, balance: 1300000 },
      { id: 11, code: '4001', name: 'Interest Income', type: 'revenue', debit: 0, credit: 4500000, balance: 4500000 },
      { id: 12, code: '4002', name: 'Processing Fees', type: 'revenue', debit: 0, credit: 800000, balance: 800000 },
      { id: 13, code: '5001', name: 'Salaries Expense', type: 'expense', debit: 2200000, credit: 0, balance: 2200000 },
      { id: 14, code: '5002', name: 'Rent Expense', type: 'expense', debit: 600000, credit: 0, balance: 600000 },
      { id: 15, code: '5003', name: 'Marketing Expense', type: 'expense', debit: 400000, credit: 0, balance: 400000 },
    ]
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'asset': return 'text-blue-600 bg-blue-50';
      case 'liability': return 'text-red-600 bg-red-50';
      case 'equity': return 'text-green-600 bg-green-50';
      case 'revenue': return 'text-purple-600 bg-purple-50';
      case 'expense': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTypeLabel = (type) => {
    switch(type) {
      case 'asset': return 'Asset';
      case 'liability': return 'Liability';
      case 'equity': return 'Equity';
      case 'revenue': return 'Revenue';
      case 'expense': return 'Expense';
      default: return 'Other';
    }
  };

  const filteredAccounts = trialBalanceData.accounts.filter(account =>
    account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.code.includes(searchTerm)
  );

  const totalDebit = trialBalanceData.accounts.reduce((sum, acc) => sum + acc.debit, 0);
  const totalCredit = trialBalanceData.accounts.reduce((sum, acc) => sum + acc.credit, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-green-600 to-green-700 rounded-xl">
                <Calculator className="text-white" size={28} />
              </div>
              <span>Trial Balance</span>
            </h1>
            <p className="text-gray-600 mt-2">
              Financial position summary for all accounts as of {trialBalanceData.dateRange}
            </p>
          </div>

          <div className="flex gap-3 mt-4 md:mt-0">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors">
              <Printer size={18} />
              Print
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 transition-colors">
              <Download size={18} />
              Export
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 border-l-4 border-blue-500 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Assets</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{formatCurrency(trialBalanceData.totalAssets)}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <TrendingUp className="text-blue-600" size={24} />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3">
              <Building size={16} className="text-blue-500" />
              <span className="text-sm text-blue-600">Across {trialBalanceData.branches.length} branches</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border-l-4 border-red-500 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Liabilities</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{formatCurrency(trialBalanceData.totalLiabilities)}</p>
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <TrendingDown className="text-red-600" size={24} />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3">
              <Users size={16} className="text-red-500" />
              <span className="text-sm text-red-600">Customer deposits & payables</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border-l-4 border-green-500 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Equity</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{formatCurrency(trialBalanceData.totalEquity)}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <DollarSign className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          <div className={`bg-white rounded-xl p-5 border-l-4 ${trialBalanceData.discrepancy === 0 ? 'border-green-500' : 'border-red-500'} shadow-sm hover:shadow-md transition-shadow`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Discrepancy</p>
                <p className={`text-2xl font-bold mt-1 ${trialBalanceData.discrepancy === 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(trialBalanceData.discrepancy)}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${trialBalanceData.discrepancy === 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                {trialBalanceData.discrepancy === 0 ? (
                  <CheckCircle className="text-green-600" size={24} />
                ) : (
                  <AlertCircle className="text-red-600" size={24} />
                )}
              </div>
            </div>
            <div className="mt-3">
              {trialBalanceData.discrepancy === 0 ? (
                <span className="text-sm text-green-600">Accounts are balanced</span>
              ) : (
                <span className="text-sm text-red-600">Review required</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Panel - Trial Balance Table */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">Account Ledgers</h2>
                  <p className="text-sm text-gray-500">Debit and Credit balances</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      placeholder="Search accounts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <select
                      value={selectedPeriod}
                      onChange={(e) => setSelectedPeriod(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                    
                    <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2">
                      <Filter size={18} />
                      <span className="hidden sm:inline">Filter</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Trial Balance Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Account Code</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Account Name</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Type</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Debit (₹)</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Credit (₹)</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Balance (₹)</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredAccounts.map((account) => (
                    <tr key={account.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4">
                        <span className="font-mono text-sm text-gray-600">{account.code}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-800">{account.name}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(account.type)}`}>
                          {getTypeLabel(account.type)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-800">{formatCurrency(account.debit)}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-800">{formatCurrency(account.credit)}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className={`font-bold ${account.type === 'asset' || account.type === 'expense' ? 'text-blue-600' : 'text-green-600'}`}>
                          {formatCurrency(account.balance)}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors">
                          <Eye size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50 border-t border-gray-200">
                  <tr>
                    <td colSpan="3" className="py-3 px-4 text-right font-semibold text-gray-700">Totals:</td>
                    <td className="py-3 px-4 font-bold text-gray-800">{formatCurrency(totalDebit)}</td>
                    <td className="py-3 px-4 font-bold text-gray-800">{formatCurrency(totalCredit)}</td>
                    <td className="py-3 px-4"></td>
                    <td className="py-3 px-4"></td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="p-4 border-t border-gray-200 bg-blue-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock size={16} />
                  <span>Last updated: Today, 10:30 AM</span>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors">
                  <RefreshCw size={18} />
                  Refresh Data
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Insights & Actions */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <BarChart3 size={20} className="text-blue-600" />
              Balance Verification
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Total Debit</span>
                  <span className="font-bold text-blue-600">{formatCurrency(totalDebit)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Total Credit</span>
                  <span className="font-bold text-green-600">{formatCurrency(totalCredit)}</span>
                </div>
                <div className="mt-3 pt-3 border-t border-blue-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Difference</span>
                    <span className={`font-bold ${totalDebit === totalCredit ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(totalDebit - totalCredit)}
                    </span>
                  </div>
                  {totalDebit === totalCredit ? (
                    <div className="flex items-center gap-2 mt-2 text-sm text-green-600">
                      <CheckCircle size={16} />
                      <span>Balanced ✓</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 mt-2 text-sm text-red-600">
                      <AlertCircle size={16} />
                      <span>Not balanced - Review needed</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-700 mb-3">Quick Actions</h4>
                <div className="space-y-2">
                  <button className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-left hover:bg-gray-50 flex items-center gap-2 transition-colors">
                    <FileText size={18} className="text-blue-600" />
                    Generate Detailed Report
                  </button>
                  <button className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-left hover:bg-gray-50 flex items-center gap-2 transition-colors">
                    <Calendar size={18} className="text-green-600" />
                    Compare Periods
                  </button>
                  <button className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-left hover:bg-gray-50 flex items-center gap-2 transition-colors">
                    <Eye size={18} className="text-purple-600" />
                    Audit Trail
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h3 className="font-bold text-gray-800 mb-4">Branch-wise Summary</h3>
            <div className="space-y-4">
              {trialBalanceData.branches.map((branch) => (
                <div key={branch.id} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-800">{branch.name}</span>
                    <span className="text-sm text-gray-500">Branch</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <div>
                      <span className="text-gray-600">Assets: </span>
                      <span className="font-medium text-blue-600">{formatCurrency(branch.assets)}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Liabilities: </span>
                      <span className="font-medium text-red-600">{formatCurrency(branch.liabilities)}</span>
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-gray-100">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Net Position:</span>
                      <span className={`font-medium ${branch.assets - branch.liabilities >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(branch.assets - branch.liabilities)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl shadow-lg p-6 text-white">
            <h3 className="font-bold text-xl mb-3">Financial Health</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Debt to Equity Ratio</span>
                <span className="font-bold">0.75:1</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Current Ratio</span>
                <span className="font-bold">1.8:1</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Asset Coverage</span>
                <span className="font-bold">135%</span>
              </div>
              <div className="pt-3 border-t border-purple-500 mt-3">
                <div className="flex items-center gap-2">
                  <CheckCircle size={18} className="text-green-300" />
                  <span className="text-sm">Healthy financial position maintained</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrialBalance;