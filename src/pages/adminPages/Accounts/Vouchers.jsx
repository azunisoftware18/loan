import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  Eye,
  Edit2,
  Trash2,
  FileText,
  Plus,
  Calendar,
  IndianRupee,
  TrendingUp,
  TrendingDown,
  ArrowUpDown,
  Users,
  Layers,
  Clock
} from 'lucide-react';
import Button from '../../../components/admin/common/Button';
import StatusCard from '../../../components/admin/common/StatusCard';
import ExportButton from '../../../components/admin/AdminButtons/ExportButton';
import ActionMenu from '../../../components/admin/AdminButtons/ActionMenu';
import Pagination from '../../../components/admin/common/Pagination';

const Vouchers = () => {
  const [activeTab, setActiveTab] = useState('entry');
  const [selectedVoucherType, setSelectedVoucherType] = useState('payment');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [voucherTypeFilter, setVoucherTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  // -------- PAGINATION STATE (Only for trail tab) --------
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Loan Entry page की तरह

  // Voucher types with icons
  const voucherTypes = [
    { id: 'payment', label: 'Payment Voucher', icon: TrendingDown, color: 'red', description: 'Cash/Bank Payment' },
    { id: 'receipt', label: 'Receipt Voucher', icon: TrendingUp, color: 'green', description: 'Cash/Bank Receipt' },
    { id: 'journal', label: 'Journal Voucher', icon: FileText, color: 'purple', description: 'Journal Entry' },
    { id: 'contra', label: 'Contra Voucher', icon: ArrowUpDown, color: 'blue', description: 'Cash ↔ Bank Transfer' }
  ];

  // Sample voucher data for trail (with more data)
  const voucherData = [
    {
      id: 'VCH-2024001',
      date: '15 Mar 2024',
      type: 'payment',
      typeLabel: 'Payment Voucher',
      debitAccount: 'Office Expenses',
      creditAccount: 'Cash Account',
      amount: 15000,
      narration: 'Monthly office maintenance',
      status: 'approved',
      approvedBy: 'Admin',
      createdBy: 'John Doe'
    },
    {
      id: 'VCH-2024002',
      date: '16 Mar 2024',
      type: 'receipt',
      typeLabel: 'Receipt Voucher',
      debitAccount: 'Cash Account',
      creditAccount: 'Service Revenue',
      amount: 25000,
      narration: 'Client payment for project',
      status: 'approved',
      approvedBy: 'Admin',
      createdBy: 'Jane Smith'
    },
    {
      id: 'VCH-2024003',
      date: '17 Mar 2024',
      type: 'journal',
      typeLabel: 'Journal Voucher',
      debitAccount: 'Depreciation',
      creditAccount: 'Fixed Assets',
      amount: 8000,
      narration: 'Monthly depreciation entry',
      status: 'pending',
      approvedBy: '',
      createdBy: 'John Doe'
    },
    {
      id: 'VCH-2024004',
      date: '18 Mar 2024',
      type: 'contra',
      typeLabel: 'Contra Voucher',
      debitAccount: 'Bank Account',
      creditAccount: 'Cash Account',
      amount: 30000,
      narration: 'Cash deposit to bank',
      status: 'approved',
      approvedBy: 'Admin',
      createdBy: 'Jane Smith'
    },
    {
      id: 'VCH-2024005',
      date: '19 Mar 2024',
      type: 'payment',
      typeLabel: 'Payment Voucher',
      debitAccount: 'Supplier Payment',
      creditAccount: 'Bank Account',
      amount: 45000,
      narration: 'Payment to ABC Suppliers',
      status: 'rejected',
      approvedBy: '',
      createdBy: 'John Doe'
    },
    {
      id: 'VCH-2024006',
      date: '20 Mar 2024',
      type: 'receipt',
      typeLabel: 'Receipt Voucher',
      debitAccount: 'Bank Account',
      creditAccount: 'Loan Account',
      amount: 100000,
      narration: 'Loan disbursement received',
      status: 'approved',
      approvedBy: 'Admin',
      createdBy: 'Jane Smith'
    },
    {
      id: 'VCH-2024007',
      date: '21 Mar 2024',
      type: 'journal',
      typeLabel: 'Journal Voucher',
      debitAccount: 'Salary Advance',
      creditAccount: 'Salary Payable',
      amount: 20000,
      narration: 'Salary advance to employee',
      status: 'pending',
      approvedBy: '',
      createdBy: 'John Doe'
    },
    {
      id: 'VCH-2024008',
      date: '22 Mar 2024',
      type: 'contra',
      typeLabel: 'Contra Voucher',
      debitAccount: 'Cash Account',
      creditAccount: 'Bank Account',
      amount: 25000,
      narration: 'Bank withdrawal',
      status: 'approved',
      approvedBy: 'Admin',
      createdBy: 'Jane Smith'
    },
    {
      id: 'VCH-2024009',
      date: '23 Mar 2024',
      type: 'payment',
      typeLabel: 'Payment Voucher',
      debitAccount: 'Rent Expense',
      creditAccount: 'Cash Account',
      amount: 35000,
      narration: 'Monthly office rent',
      status: 'approved',
      approvedBy: 'Admin',
      createdBy: 'John Doe'
    },
    {
      id: 'VCH-2024010',
      date: '24 Mar 2024',
      type: 'receipt',
      typeLabel: 'Receipt Voucher',
      debitAccount: 'Cash Account',
      creditAccount: 'Interest Income',
      amount: 5000,
      narration: 'Interest received on FD',
      status: 'approved',
      approvedBy: 'Admin',
      createdBy: 'Jane Smith'
    },
    {
      id: 'VCH-2024011',
      date: '25 Mar 2024',
      type: 'journal',
      typeLabel: 'Journal Voucher',
      debitAccount: 'Bad Debts',
      creditAccount: 'Debtors',
      amount: 15000,
      narration: 'Bad debt write-off',
      status: 'pending',
      approvedBy: '',
      createdBy: 'John Doe'
    },
    {
      id: 'VCH-2024012',
      date: '26 Mar 2024',
      type: 'contra',
      typeLabel: 'Contra Voucher',
      debitAccount: 'Bank Account',
      creditAccount: 'Cash Account',
      amount: 40000,
      narration: 'Cash deposit for salary',
      status: 'approved',
      approvedBy: 'Admin',
      createdBy: 'Jane Smith'
    }
  ];

  // -------- FILTERED DATA (Only for trail tab) --------
  const filteredData = useMemo(() => {
    return voucherData.filter((voucher) => {
      // Search filter
      const matchesSearch = searchTerm === '' || 
        voucher.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        voucher.narration.toLowerCase().includes(searchTerm.toLowerCase()) ||
        voucher.debitAccount.toLowerCase().includes(searchTerm.toLowerCase()) ||
        voucher.creditAccount.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Date filter
      const matchesDate = (!dateFrom && !dateTo) || true; // Simplified for demo
      
      // Voucher type filter
      const matchesType = !voucherTypeFilter || voucher.type === voucherTypeFilter;
      
      // Status filter
      const matchesStatus = !statusFilter || voucher.status === statusFilter;
      
      return matchesSearch && matchesDate && matchesType && matchesStatus;
    });
  }, [searchTerm, dateFrom, dateTo, voucherTypeFilter, statusFilter]);

  // -------- PAGINATION CALCULATIONS --------
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    if (activeTab === 'trail') {
      setCurrentPage(1);
    }
  }, [searchTerm, dateFrom, dateTo, voucherTypeFilter, statusFilter, activeTab]);

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
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Get voucher type color
  const getVoucherColor = (type) => {
    switch (type) {
      case 'payment': return 'bg-red-50 text-red-700 border-red-200';
      case 'receipt': return 'bg-green-50 text-green-700 border-green-200';
      case 'journal': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'contra': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  // --------- RENDER VOUCHER FORM FUNCTION ---------
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
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${selectedVoucherType === type.id
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
                      className={`px-4 py-2 text-sm rounded-lg border ${voucherForm.paymentMode === mode
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
            <Button type="submit">
              Save Voucher
            </Button>
            <Button
              onClick={(e) => handleSaveAndPrint(e)}
              className="bg-emerald-600 hover:bg-emerald-700">
              Save & Print
            </Button>
          </div>
        </form>
      </div>
    );
  };

  // Render voucher trail with pagination
  const renderVoucherTrail = () => {
    return (
      <div className="space-y-4">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatusCard
            title="Total Vouchers"
            value={voucherData.length}
            icon={FileText}
            iconColor="blue"
          />

          <StatusCard
            title="Total Amount"
            value={formatCurrency(voucherData.reduce((sum, v) => sum + v.amount, 0))}
            icon={IndianRupee}
            iconColor="green"
          />

          <StatusCard
            title="Pending Approval"
            value={voucherData.filter(v => v.status === 'pending').length}
            icon={Clock}
            iconColor="orange"
          />

          <StatusCard
            title="This Month"
            value="12"
            icon={Calendar}
            iconColor="red"
          />
        </div>

        {/* Filters Section - Loan Entry page की तरह */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6">
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Voucher Trail</h2>
                <p className="text-sm text-gray-500">
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredData.length)} of {filteredData.length} vouchers
                </p>
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-initial">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search vouchers..."
                    className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Additional Filters */}
            <div className="flex flex-wrap gap-3 mb-4">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="From Date"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="To Date"
                />
              </div>
              <select 
                value={voucherTypeFilter}
                onChange={(e) => setVoucherTypeFilter(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white"
              >
                <option value="">All Types</option>
                <option value="payment">Payment</option>
                <option value="receipt">Receipt</option>
                <option value="journal">Journal</option>
                <option value="contra">Contra</option>
              </select>
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white"
              >
                <option value="">All Status</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {/* Table with fixed height for pagination */}
            <div className="h-[340px] overflow-y-auto overflow-x-auto rounded-xl border border-gray-100">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b text-left">
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Voucher Details
                    </th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Accounts
                    </th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Created By
                    </th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedData.length > 0 ? paginatedData.map((voucher) => (
                    <tr key={voucher.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="p-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getVoucherColor(voucher.type)}`}>
                              {voucher.typeLabel}
                            </span>
                            <span className="text-sm font-bold text-gray-900">{voucher.id}</span>
                          </div>
                          <div className="text-sm text-gray-600">{voucher.date}</div>
                          <div className="text-sm text-gray-500 mt-1">{voucher.narration}</div>
                        </div>
                      </td>
                      <td className="p-4">
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
                      <td className="p-4">
                        <div className="text-lg font-bold text-gray-900">
                          {formatCurrency(voucher.amount)}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(voucher.status)}`}>
                          {voucher.status.charAt(0).toUpperCase() + voucher.status.slice(1)}
                        </span>
                        {voucher.approvedBy && (
                          <div className="text-xs text-gray-500 mt-1">By: {voucher.approvedBy}</div>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-700">{voucher.createdBy}</span>
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <ActionMenu
                          items={[
                            {
                              label: "View",
                              icon: Eye,
                              onClick: () => handleViewVoucher(voucher),
                            },
                            {
                              label: "Edit",
                              icon: Edit2,
                              onClick: () => handleEditVoucher(voucher),
                            },
                            {
                              label: "Delete",
                              icon: Trash2,
                              onClick: () => handleDeleteVoucher(voucher),
                              danger: true,
                            },
                          ]}
                        />
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="6" className="text-center py-10 text-gray-400">
                        No vouchers found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* PAGINATION COMPONENT - Exactly Loan Entry page ki tarah */}
            <div className="h-[64px] bg-white border-t border-gray-200 mt-4 px-0">
              <div className="flex items-center justify-between h-full py-4">
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
      </div>
    );
  };

  // --------- OTHER HANDLER FUNCTIONS ---------
  const handleSaveAndPrint = (e) => {
    e.preventDefault();

    // ---- SAVE (mock) ----
    console.log("Voucher Saved:", {
      type: selectedVoucherType,
      ...voucherForm,
    });

    // ---- PRINT CONTENT ----
    const printContent = `
    <html>
      <head>
        <title>Voucher Print</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
          }
          h2 {
            text-align: center;
            margin-bottom: 20px;
          }
          .row {
            margin-bottom: 8px;
          }
          .label {
            font-weight: bold;
          }
          hr {
            margin: 15px 0;
          }
        </style>
      </head>
      <body>
        <h2>${voucherTypes.find(v => v.id === selectedVoucherType)?.label}</h2>
        <hr />

        <div class="row"><span class="label">Voucher No:</span> ${voucherForm.voucherNumber}</div>
        <div class="row"><span class="label">Date:</span> ${voucherForm.voucherDate}</div>
        <div class="row"><span class="label">Debit Account:</span> ${voucherForm.debitAccount}</div>
        <div class="row"><span class="label">Credit Account:</span> ${voucherForm.creditAccount}</div>
        <div class="row"><span class="label">Amount:</span> ₹${voucherForm.amount}</div>
        <div class="row"><span class="label">Payment Mode:</span> ${voucherForm.paymentMode}</div>
        <div class="row"><span class="label">Narration:</span> ${voucherForm.narration || "-"}</div>

        <hr />
        <p>Printed on: ${new Date().toLocaleString()}</p>
      </body>
    </html>
  `;

    // ---- HIDDEN IFRAME PRINT ----
    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";

    document.body.appendChild(iframe);

    const iframeDoc = iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(printContent);
    iframeDoc.close();

    iframe.contentWindow.focus();
    iframe.contentWindow.print();

    // ---- CLEANUP ----
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000);

    // ---- RESET FORM ----
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

  const handleViewVoucher = (voucher) => {
    console.log("View Voucher:", voucher);
    alert(`Viewing voucher ${voucher.id}`);
  };

  const handleEditVoucher = (voucher) => {
    console.log("Edit Voucher:", voucher);
    setActiveTab('entry');
    setSelectedVoucherType(voucher.type);

    setVoucherForm({
      voucherDate: voucher.date,
      voucherNumber: voucher.id,
      debitAccount: voucher.debitAccount,
      creditAccount: voucher.creditAccount,
      amount: voucher.amount,
      narration: voucher.narration,
      paymentMode: 'cash',
      chequeNumber: '',
      bankName: '',
      branch: ''
    });
  };

  const handleDeleteVoucher = (voucher) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete voucher ${voucher.id}?`
    );

    if (!confirmDelete) return;

    console.log("Deleted Voucher:", voucher.id);
    alert("Voucher deleted successfully");
  };

  const handleExport = () => {
    if (!voucherData.length) {
      alert("No vouchers available to export");
      return;
    }

    // ---- CSV HEADERS ----
    const headers = [
      "Voucher ID",
      "Date",
      "Voucher Type",
      "Debit Account",
      "Credit Account",
      "Amount",
      "Status",
      "Created By",
      "Narration",
    ];

    // ---- CSV ROWS ----
    const rows = voucherData.map(v => [
      v.id,
      v.date,
      v.typeLabel,
      v.debitAccount,
      v.creditAccount,
      v.amount,
      v.status,
      v.createdBy,
      v.narration,
    ]);

    const csvContent =
      [headers, ...rows]
        .map(row => row.map(value => `"${value}"`).join(","))
        .join("\n");

    // ---- FILE DOWNLOAD ----
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `vouchers_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6 lg:p-10">
      
      {/* Header Section - Loan Entry page की तरह */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Vouchers Management</h1>
          <p className="text-gray-500 mt-1">Create and manage accounting vouchers</p>
        </div>
        
                        <ExportButton onClick={handleExport} />

        
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