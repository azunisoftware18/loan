import React, { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  Printer,
  Eye,
  Edit2,
  Trash2,
  FileText,
  Calendar,
  ChevronDown,
  Plus,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Building,
  Receipt,
  CheckCircle,
  AlertCircle,
  XCircle,
  Clock,
  Users,
  CreditCard,
  BarChart3,
  PieChart,
  Upload,
  DownloadCloud,
  Settings,
  MoreVertical
} from 'lucide-react';

const Gst = () => {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'returns', 'payments', 'reports'
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('thisMonth');
  const [gstStatus, setGstStatus] = useState('all');

  // GST Overview Data
  const gstOverview = {
    totalGstCollected: 245000,
    totalGstPaid: 185000,
    netGstLiability: 60000,
    gstPayable: 45000,
    gstRefund: 15000,
    pendingReturns: 2,
    upcomingDueDate: '20 Apr 2024'
  };

  // GST Return Data
  const gstReturns = [
    {
      id: 'GSTR-3B-0324',
      period: 'March 2024',
      dueDate: '20 Apr 2024',
      status: 'pending',
      filingDate: '',
      gstType: 'GSTR-3B',
      taxableValue: 1500000,
      cgst: 135000,
      sgst: 135000,
      igst: 0,
      totalGst: 270000,
      penalty: 0
    },
    {
      id: 'GSTR-1-0324',
      period: 'March 2024',
      dueDate: '11 Apr 2024',
      status: 'filed',
      filingDate: '10 Apr 2024',
      gstType: 'GSTR-1',
      taxableValue: 1500000,
      cgst: 0,
      sgst: 0,
      igst: 0,
      totalGst: 0,
      penalty: 0
    },
    {
      id: 'GSTR-3B-0224',
      period: 'February 2024',
      dueDate: '20 Mar 2024',
      status: 'filed',
      filingDate: '18 Mar 2024',
      gstType: 'GSTR-3B',
      taxableValue: 1350000,
      cgst: 121500,
      sgst: 121500,
      igst: 0,
      totalGst: 243000,
      penalty: 0
    },
    {
      id: 'GSTR-1-0224',
      period: 'February 2024',
      dueDate: '11 Mar 2024',
      status: 'filed',
      filingDate: '10 Mar 2024',
      gstType: 'GSTR-1',
      taxableValue: 1350000,
      cgst: 0,
      sgst: 0,
      igst: 0,
      totalGst: 0,
      penalty: 0
    },
    {
      id: 'GSTR-3B-0124',
      period: 'January 2024',
      dueDate: '20 Feb 2024',
      status: 'filed',
      filingDate: '19 Feb 2024',
      gstType: 'GSTR-3B',
      taxableValue: 1200000,
      cgst: 108000,
      sgst: 108000,
      igst: 0,
      totalGst: 216000,
      penalty: 0
    }
  ];

  // GST Payment Data
  const gstPayments = [
    {
      id: 'PMT-001',
      date: '15 Mar 2024',
      period: 'February 2024',
      challanNo: 'CHL-20240315-001',
      amount: 243000,
      status: 'paid',
      mode: 'Online',
      bank: 'SBI',
      transactionId: 'TXN123456789'
    },
    {
      id: 'PMT-002',
      date: '20 Feb 2024',
      period: 'January 2024',
      challanNo: 'CHL-20240220-001',
      amount: 216000,
      status: 'paid',
      mode: 'Online',
      bank: 'HDFC',
      transactionId: 'TXN987654321'
    },
    {
      id: 'PMT-003',
      date: '15 Jan 2024',
      period: 'December 2023',
      challanNo: 'CHL-20240115-001',
      amount: 189000,
      status: 'paid',
      mode: 'Cheque',
      bank: 'ICICI',
      transactionId: 'CHQ456789123'
    },
    {
      id: 'PMT-004',
      date: '20 Apr 2024',
      period: 'March 2024',
      challanNo: '',
      amount: 270000,
      status: 'pending',
      mode: '',
      bank: '',
      transactionId: ''
    }
  ];

  // GST Reports Data
  const gstReports = [
    {
      id: 1,
      name: 'GSTR-3B Monthly Summary',
      period: 'March 2024',
      generatedOn: '01 Apr 2024',
      type: 'Summary',
      size: '1.2 MB',
      format: 'PDF'
    },
    {
      id: 2,
      name: 'GSTR-1 Invoice Details',
      period: 'March 2024',
      generatedOn: '05 Apr 2024',
      type: 'Detailed',
      size: '3.5 MB',
      format: 'Excel'
    },
    {
      id: 3,
      name: 'GST Annual Return',
      period: 'FY 2023-24',
      generatedOn: '01 Apr 2024',
      type: 'Annual',
      size: '5.8 MB',
      format: 'PDF'
    },
    {
      id: 4,
      name: 'GST Reconciliation',
      period: 'Q4 2023-24',
      generatedOn: '25 Mar 2024',
      type: 'Reconciliation',
      size: '2.1 MB',
      format: 'Excel'
    }
  ];

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'paid':
      case 'filed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get GST type color
  const getGstTypeColor = (type) => {
    switch(type) {
      case 'GSTR-3B':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'GSTR-1':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'GSTR-9':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  // Render Overview Tab
  const renderOverview = () => (
    <div className="space-y-6">
      {/* GST Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total GST Collected</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {formatCurrency(gstOverview.totalGstCollected)}
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-2 text-xs text-green-600 font-medium">
            +12.5% from last month
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Net GST Liability</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {formatCurrency(gstOverview.netGstLiability)}
              </p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <DollarSign className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-2 text-xs text-orange-600 font-medium">
            Due by {gstOverview.upcomingDueDate}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Returns</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {gstOverview.pendingReturns}
              </p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <AlertCircle className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-2 text-xs text-yellow-600 font-medium">
            Action required
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">GST Refund</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {formatCurrency(gstOverview.gstRefund)}
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <TrendingDown className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-2 text-xs text-blue-600 font-medium">
            Available for claim
          </div>
        </div>
      </div>

      {/* Charts and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* GST Breakdown Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">GST Breakdown (Last 6 Months)</h3>
            <button className="text-sm text-blue-600 font-medium">View Details</button>
          </div>
          
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center text-gray-500">
              <BarChart3 className="h-12 w-12 mx-auto mb-2 text-gray-400" />
              <p>GST Collection Chart</p>
              <p className="text-sm">CGST: ₹1,35,000 | SGST: ₹1,35,000 | IGST: ₹0</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Plus className="h-5 w-5 text-blue-600" />
              <div className="text-left">
                <div className="font-medium text-gray-900">File GSTR-3B</div>
                <div className="text-sm text-gray-600">Due on 20 Apr 2024</div>
              </div>
            </button>
            <button className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Upload className="h-5 w-5 text-purple-600" />
              <div className="text-left">
                <div className="font-medium text-gray-900">Upload Sales Invoices</div>
                <div className="text-sm text-gray-600">For GSTR-1 filing</div>
              </div>
            </button>
            <button className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div className="text-left">
                <div className="font-medium text-gray-900">Make GST Payment</div>
                <div className="text-sm text-gray-600">Pay ₹60,000 liability</div>
              </div>
            </button>
            <button className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
              <DownloadCloud className="h-5 w-5 text-orange-600" />
              <div className="text-left">
                <div className="font-medium text-gray-900">Download Reports</div>
                <div className="text-sm text-gray-600">Monthly GST reports</div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Returns */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Recent GST Returns</h3>
            <button className="text-sm text-blue-600 font-medium">View All</button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Return Period</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Taxable Value</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Total GST</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {gstReturns.slice(0, 3).map((returnItem) => (
                <tr key={returnItem.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{returnItem.period}</div>
                      <div className="text-sm text-gray-500">{returnItem.id}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getGstTypeColor(returnItem.gstType)}`}>
                      {returnItem.gstType}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{returnItem.dueDate}</div>
                    {returnItem.filingDate && (
                      <div className="text-xs text-gray-500">Filed on: {returnItem.filingDate}</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(returnItem.status)}`}>
                      {returnItem.status.charAt(0).toUpperCase() + returnItem.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium">{formatCurrency(returnItem.taxableValue)}</td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900">{formatCurrency(returnItem.totalGst)}</div>
                    {returnItem.totalGst > 0 && (
                      <div className="text-xs text-gray-500">
                        CGST: {formatCurrency(returnItem.cgst)} | SGST: {formatCurrency(returnItem.sgst)}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Render Returns Tab
  const renderReturns = () => (
    <div className="space-y-6">
      {/* Returns Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">GST Returns Management</h3>
            <p className="text-sm text-gray-600">File and manage your GST returns</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
              <Plus className="h-4 w-4" />
              File New Return
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Upload className="h-4 w-4" />
              Import Data
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Settings className="h-4 w-4" />
              Settings
            </button>
          </div>
        </div>
      </div>

      {/* Returns Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search returns..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <select 
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="thisMonth">This Month</option>
                <option value="lastMonth">Last Month</option>
                <option value="thisQuarter">This Quarter</option>
                <option value="thisYear">This Year</option>
              </select>
              <select 
                value={gstStatus}
                onChange={(e) => setGstStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="filed">Filed</option>
                <option value="overdue">Overdue</option>
              </select>
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700">
                <Download className="h-4 w-4" />
                Export
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Return Details</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Filing Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Tax Details</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {gstReturns.map((returnItem) => (
                <tr key={returnItem.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-bold text-gray-900">{returnItem.id}</div>
                      <div className="text-sm text-gray-600">{returnItem.period}</div>
                      <span className={`inline-flex items-center px-2 py-1 mt-1 rounded text-xs font-medium ${getGstTypeColor(returnItem.gstType)}`}>
                        {returnItem.gstType}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{returnItem.dueDate}</div>
                    {returnItem.filingDate ? (
                      <div className="text-xs text-gray-500">Filed: {returnItem.filingDate}</div>
                    ) : (
                      <div className="text-xs text-yellow-600 font-medium">Pending</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(returnItem.status)}`}>
                        {returnItem.status.charAt(0).toUpperCase() + returnItem.status.slice(1)}
                      </span>
                      {returnItem.status === 'pending' && (
                        <div className="text-xs text-red-600 font-medium">
                          Due in 5 days
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Taxable Value:</span>
                        <span className="text-sm font-medium">{formatCurrency(returnItem.taxableValue)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Total GST:</span>
                        <span className="text-sm font-bold text-gray-900">{formatCurrency(returnItem.totalGst)}</span>
                      </div>
                      {returnItem.totalGst > 0 && (
                        <div className="text-xs text-gray-500">
                          CGST: {formatCurrency(returnItem.cgst)} | SGST: {formatCurrency(returnItem.sgst)}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {returnItem.status === 'pending' ? (
                        <>
                          <button className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                            <FileText className="h-3 w-3" />
                            File
                          </button>
                          <button className="inline-flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                            <Edit2 className="h-3 w-3" />
                            Edit
                          </button>
                        </>
                      ) : (
                        <>
                          <button className="inline-flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                            <Eye className="h-3 w-3" />
                            View
                          </button>
                          <button className="inline-flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                            <Download className="h-3 w-3" />
                            Download
                          </button>
                        </>
                      )}
                      <button className="p-1.5 hover:bg-gray-100 rounded">
                        <MoreVertical className="h-4 w-4 text-gray-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Render Payments Tab
  const renderPayments = () => (
    <div className="space-y-6">
      {/* Payments Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Total Paid</h4>
            <div className="p-2 bg-green-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {formatCurrency(648000)}
          </div>
          <div className="text-sm text-green-600 font-medium mt-2">
            Last 3 months
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Pending Payment</h4>
            <div className="p-2 bg-yellow-50 rounded-lg">
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {formatCurrency(270000)}
          </div>
          <div className="text-sm text-yellow-600 font-medium mt-2">
            Due on 20 Apr 2024
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Upcoming</h4>
            <div className="p-2 bg-blue-50 rounded-lg">
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {formatCurrency(300000)}
          </div>
          <div className="text-sm text-blue-600 font-medium mt-2">
            Estimated for April 2024
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">GST Payment History</h3>
              <p className="text-sm text-gray-600">Track all your GST payments</p>
            </div>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
              <DollarSign className="h-4 w-4" />
              Make Payment
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Payment Details</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Period</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Payment Mode</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {gstPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-bold text-gray-900">{payment.id}</div>
                      <div className="text-sm text-gray-600">{payment.date}</div>
                      {payment.challanNo && (
                        <div className="text-xs text-gray-500">Challan: {payment.challanNo}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{payment.period}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900">{formatCurrency(payment.amount)}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900">{payment.mode || '-'}</span>
                      {payment.bank && (
                        <span className="text-xs text-gray-500">{payment.bank}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                    </span>
                    {payment.transactionId && (
                      <div className="text-xs text-gray-500 mt-1">TXN: {payment.transactionId}</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 hover:bg-gray-100 rounded">
                        <Eye className="h-4 w-4 text-gray-600" />
                      </button>
                      <button className="p-1.5 hover:bg-gray-100 rounded">
                        <Download className="h-4 w-4 text-gray-600" />
                      </button>
                      <button className="p-1.5 hover:bg-gray-100 rounded">
                        <Printer className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Render Reports Tab
  const renderReports = () => (
    <div className="space-y-6">
      {/* Reports Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">GST Reports</h3>
            <p className="text-sm text-gray-600">Generate and download GST reports</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
              <Plus className="h-4 w-4" />
              Generate Report
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Filter className="h-4 w-4" />
              Filter Reports
            </button>
          </div>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {gstReports.map((report) => (
          <div key={report.id} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded ${
                report.format === 'PDF' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
              }`}>
                .{report.format.toLowerCase()}
              </span>
            </div>
            
            <h4 className="font-semibold text-gray-900 mb-2">{report.name}</h4>
            <p className="text-sm text-gray-600 mb-4">{report.period}</p>
            
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{report.size}</span>
              <span>Generated: {report.generatedOn}</span>
            </div>
            
            <div className="flex gap-2 mt-4">
              <button className="flex-1 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                Preview
              </button>
              <button className="flex-1 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Report Generation Options */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Generate Custom Report</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Report Type
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option>GSTR-3B Summary</option>
                <option>GSTR-1 Invoice Details</option>
                <option>GSTR-9 Annual Return</option>
                <option>GST Reconciliation Report</option>
                <option>Input Tax Credit Report</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Format
              </label>
              <div className="flex gap-2">
                <button className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">PDF</button>
                <button className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Excel</button>
                <button className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">CSV</button>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Period
              </label>
              <div className="grid grid-cols-2 gap-3">
                <input type="date" className="px-3 py-2 border border-gray-300 rounded-lg" />
                <input type="date" className="px-3 py-2 border border-gray-300 rounded-lg" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Include Details
              </label>
              <div className="flex flex-wrap gap-2">
                <label className="inline-flex items-center">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="ml-2 text-sm">Tax Calculation</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="ml-2 text-sm">Invoice Details</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="ml-2 text-sm">Payment History</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Receipt className="h-6 w-6 text-blue-600" />
              GST Management
            </h1>
            <p className="text-gray-600 mt-1">Manage GST returns, payments, and reports for your loan business</p>
          </div>
          
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
              <Settings className="h-4 w-4" />
              GST Settings
            </button>
          </div>
        </div>

        {/* GST Info Bar */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-gray-400" />
                <span className="text-sm font-medium">GSTIN: 27ABCDE1234F1Z5</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-400" />
                <span className="text-sm">Taxpayer: Loan Finance Pvt Ltd</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-gray-400" />
                <span className="text-sm">Status: Active</span>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              Last Updated: Today, 10:30 AM
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`
                flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 whitespace-nowrap
                ${activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              <BarChart3 className="h-4 w-4" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab('returns')}
              className={`
                flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 whitespace-nowrap
                ${activeTab === 'returns'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              <FileText className="h-4 w-4" />
              Returns
              <span className="ml-1 bg-red-100 text-red-600 text-xs font-medium px-2 py-0.5 rounded-full">
                2
              </span>
            </button>
            <button
              onClick={() => setActiveTab('payments')}
              className={`
                flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 whitespace-nowrap
                ${activeTab === 'payments'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              <DollarSign className="h-4 w-4" />
              Payments
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`
                flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 whitespace-nowrap
                ${activeTab === 'reports'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              <DownloadCloud className="h-4 w-4" />
              Reports
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'returns' && renderReturns()}
      {activeTab === 'payments' && renderPayments()}
      {activeTab === 'reports' && renderReports()}

      {/* Footer Actions */}
      <div className="mt-6 flex flex-wrap gap-3">
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
          <Printer className="h-4 w-4" />
          Print GST Certificate
        </button>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700">
          <Download className="h-4 w-4" />
          Export All Data
        </button>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700">
          <AlertCircle className="h-4 w-4" />
          View Compliance Alerts
        </button>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
          <Calendar className="h-4 w-4" />
          View Filing Calendar
        </button>
      </div>
    </div>
  );
};

export default Gst;