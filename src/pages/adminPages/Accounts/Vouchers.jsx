import React, { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  Eye,
  Edit2,
  Trash2,
  Printer,
  FileText,
  Plus,
  Calendar,
  ChevronDown,
  Check,
  X,
  RefreshCw,
  IndianRupee,
  CreditCard,
  Receipt,
  Banknote,
  TrendingUp,
  TrendingDown,
  MoreVertical,
  ArrowUpDown,
  Users,
  Building,
  Layers,
  Clock
} from 'lucide-react';

const Vouchers = () => {
  const [activeTab, setActiveTab] = useState('entry'); // 'entry' or 'trail'
  const [selectedVoucherType, setSelectedVoucherType] = useState('payment'); // 'payment', 'receipt', 'journal', 'contra'
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  // Voucher types with icons
  const voucherTypes = [
    { id: 'payment', label: 'Payment Voucher', icon: TrendingDown, color: 'red', description: 'Cash/Bank Payment' },
    { id: 'receipt', label: 'Receipt Voucher', icon: TrendingUp, color: 'green', description: 'Cash/Bank Receipt' },
    { id: 'journal', label: 'Journal Voucher', icon: FileText, color: 'purple', description: 'Journal Entry' },
    { id: 'contra', label: 'Contra Voucher', icon: ArrowUpDown, color: 'blue', description: 'Cash ↔ Bank Transfer' }
  ];

  // Sample voucher data for trail
  const voucherData = [
    {
      id: 'VCH-001',
      date: '15 Mar 2024',
      type: 'payment',
      typeLabel: 'Payment Voucher',
      amount: 15000,
      debitAccount: 'Supplier Payment',
      creditAccount: 'Cash',
      narration: 'Payment to XYZ Suppliers',
      status: 'approved',
      createdBy: 'Admin User',
      approvedBy: 'Manager'
    }
  ];

  // Form state for voucher entry
  const [voucherForm, setVoucherForm] = useState({
    voucherDate: new Date().toISOString().split('T')[0],
    voucherNumber: `VCH-${Date.now().toString().slice(-6)}`,
    debitAccount: '',
    creditAccount: '',
    amount: '',
    narration: '',
    paymentMode: 'cash',
    chequeNumber: '',
    bankName: '',
    branch: ''
  });

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setVoucherForm(prev => ({ ...prev, [field]: value }));
  };

  // Handle voucher submission
  const handleSubmitVoucher = (e) => {
    e.preventDefault();
    alert('Voucher submitted successfully!');
    // Reset form with new voucher number
    setVoucherForm({
      voucherDate: new Date().toISOString().split('T')[0],
      voucherNumber: `VCH-${Date.now().toString().slice(-6)}`,
      debitAccount: '',
      creditAccount: '',
      amount: '',
      narration: '',
      paymentMode: 'cash',
      chequeNumber: '',
      bankName: '',
      branch: ''
    });
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount);
  };

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Get voucher type color
  const getVoucherColor = (type) => {
    switch(type) {
      case 'payment': return 'bg-red-50 text-red-700 border-red-200';
      case 'receipt': return 'bg-green-50 text-green-700 border-green-200';
      case 'journal': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'contra': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  // Render voucher entry form based on selected type
  const renderVoucherForm = () => {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        {/* Voucher Type Selector */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-wrap gap-2">
            {voucherTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedVoucherType(type.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                  selectedVoucherType === type.id
                    ? 'bg-white border-blue-500 shadow-sm'
                    : 'bg-gray-50 border-gray-200 hover:bg-white'
                }`}
              >
                <type.icon className={`h-4 w-4 text-${type.color}-600`} />
                <span className="text-sm font-medium">{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmitVoucher} className="p-6">
          {/* Form Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900">
                {voucherTypes.find(t => t.id === selectedVoucherType)?.label}
              </h3>
              <div className="text-sm text-gray-600">
                Voucher No: <span className="font-bold">{voucherForm.voucherNumber}</span>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              {voucherTypes.find(t => t.id === selectedVoucherType)?.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Voucher Date *
                </label>
                <input
                  type="date"
                  value={voucherForm.voucherDate}
                  onChange={(e) => handleInputChange('voucherDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Debit Account */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Debit Account *
                </label>
                <select
                  value={voucherForm.debitAccount}
                  onChange={(e) => handleInputChange('debitAccount', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Account</option>
                  <option value="cash">Cash Account</option>
                  <option value="bank">Bank Account</option>
                  <option value="expenses">Expenses</option>
                  <option value="purchase">Purchase</option>
                  <option value="salaries">Salaries</option>
                  <option value="supplier">Supplier Payment</option>
                </select>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount (₹) *
                </label>
                <input
                  type="number"
                  value={voucherForm.amount}
                  onChange={(e) => handleInputChange('amount', e.target.value)}
                  placeholder="Enter amount"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Payment Mode */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Mode
                </label>
                <div className="flex gap-2">
                  {['cash', 'cheque', 'online'].map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => handleInputChange('paymentMode', mode)}
                      className={`px-4 py-2 text-sm rounded-lg border ${
                        voucherForm.paymentMode === mode
                          ? 'bg-blue-50 border-blue-500 text-blue-700'
                          : 'bg-gray-50 border-gray-200 text-gray-700'
                      }`}
                    >
                      {mode.charAt(0).toUpperCase() + mode.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Credit Account */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Credit Account *
                </label>
                <select
                  value={voucherForm.creditAccount}
                  onChange={(e) => handleInputChange('creditAccount', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Account</option>
                  <option value="cash">Cash Account</option>
                  <option value="bank">Bank Account</option>
                  <option value="sales">Sales</option>
                  <option value="income">Income</option>
                  <option value="customer">Customer Receipt</option>
                  <option value="loan">Loan</option>
                </select>
              </div>

              {/* Narration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Narration
                </label>
                <textarea
                  value={voucherForm.narration}
                  onChange={(e) => handleInputChange('narration', e.target.value)}
                  placeholder="Enter description..."
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Payment Details (Conditional) */}
              {voucherForm.paymentMode === 'cheque' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cheque No
                    </label>
                    <input
                      type="text"
                      value={voucherForm.chequeNumber}
                      onChange={(e) => handleInputChange('chequeNumber', e.target.value)}
                      placeholder="Enter cheque number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bank Name
                    </label>
                    <input
                      type="text"
                      value={voucherForm.bankName}
                      onChange={(e) => handleInputChange('bankName', e.target.value)}
                      placeholder="Bank name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              )}

              {voucherForm.paymentMode === 'online' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Transaction Reference
                  </label>
                  <input
                    type="text"
                    value={voucherForm.chequeNumber}
                    onChange={(e) => handleInputChange('chequeNumber', e.target.value)}
                    placeholder="Transaction reference number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setVoucherForm({
                  voucherDate: new Date().toISOString().split('T')[0],
                  voucherNumber: `VCH-${Date.now().toString().slice(-6)}`,
                  debitAccount: '',
                  creditAccount: '',
                  amount: '',
                  narration: '',
                  paymentMode: 'cash',
                  chequeNumber: '',
                  bankName: '',
                  branch: ''
                });
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              Save Voucher
            </button>
            <button
              type="button"
              className="px-6 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700"
            >
              Save & Print
            </button>
          </div>
        </form>
      </div>
    );
  };

  // Render voucher trail
  const renderVoucherTrail = () => {
    return (
      <div className="space-y-4">
        {/* Trail Header */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search vouchers by number, narration..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  placeholder="From Date"
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-40"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  placeholder="To Date"
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-40"
                />
              </div>
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="">All Types</option>
                <option value="payment">Payment</option>
                <option value="receipt">Receipt</option>
                <option value="journal">Journal</option>
                <option value="contra">Contra</option>
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="">All Status</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700">
                <Download className="h-4 w-4" />
                Export
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                <Printer className="h-4 w-4" />
                Print
              </button>
            </div>
          </div>
        </div>

        {/* Voucher Trail Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Voucher Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Accounts
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Created By
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {voucherData.map((voucher) => (
                  <tr key={voucher.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getVoucherColor(voucher.type)}`}>
                            {voucher.typeLabel}
                          </span>
                          <span className="text-sm font-bold text-gray-900">{voucher.id}</span>
                        </div>
                        <div className="text-sm text-gray-600">{voucher.date}</div>
                        <div className="text-sm text-gray-500 mt-1">{voucher.narration}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <TrendingDown className="h-3 w-3 text-red-500" />
                          <span className="text-sm font-medium text-gray-900">{voucher.debitAccount}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-3 w-3 text-green-500" />
                          <span className="text-sm font-medium text-gray-900">{voucher.creditAccount}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-lg font-bold text-gray-900">
                        {formatCurrency(voucher.amount)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(voucher.status)}`}>
                        {voucher.status.charAt(0).toUpperCase() + voucher.status.slice(1)}
                      </span>
                      {voucher.approvedBy && (
                        <div className="text-xs text-gray-500 mt-1">By: {voucher.approvedBy}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-700">{voucher.createdBy}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 rounded-md hover:bg-blue-50 text-blue-600">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 rounded-md hover:bg-emerald-50 text-emerald-600">
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 rounded-md hover:bg-red-50 text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 rounded-md hover:bg-gray-50 text-gray-600">
                          <Printer className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">6</span> vouchers
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">
                  1
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                  2
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Vouchers</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">24</p>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(98000)}</p>
              </div>
              <div className="p-2 bg-green-50 rounded-lg">
                <IndianRupee className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Approval</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">3</p>
              </div>
              <div className="p-2 bg-yellow-50 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">6</p>
              </div>
              <div className="p-2 bg-purple-50 rounded-lg">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <FileText className="h-6 w-6 text-blue-600" />
              Vouchers Management
            </h1>
            <p className="text-gray-600 mt-1">Create and manage accounting vouchers</p>
          </div>
          
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
              <Plus className="h-4 w-4" />
              New Voucher
            </button>
          </div>
        </div>

     
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('entry')}
              className={`
                flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2
                ${activeTab === 'entry'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              <Plus className="h-4 w-4" />
              Voucher Entry
            </button>
            <button
              onClick={() => setActiveTab('trail')}
              className={`
                flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2
                ${activeTab === 'trail'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              <Layers className="h-4 w-4" />
              Voucher Trail
              <span className="ml-1 bg-gray-100 text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full">
                {voucherData.length}
              </span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      {activeTab === 'entry' ? renderVoucherForm() : renderVoucherTrail()}

     
    </div>
  );
};

export default Vouchers;