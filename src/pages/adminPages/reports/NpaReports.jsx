import React, { useState, useEffect } from 'react';
import {
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  Building,
  Users,
  CreditCard,
  Calendar,
  Filter,
  Search,
  Download,
  ChevronDown,
  Eye,
  MoreVertical,
  PieChart,
  BarChart3,
  DollarSign,
  Percent,
  FileText,
  User,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  Shield,
  RefreshCw,
  Printer,
  ChevronRight
} from 'lucide-react';

// Mock data
const mockNPAData = {
  summary: {
    totalPortfolio: 125800000,
    totalNPA: 18500000,
    npaPercentage: 14.7,
    criticalNPACount: 42,
    npaByBucket: [
      { bucket: '30-59 days', amount: 3200000, count: 18, percentage: 17.3 },
      { bucket: '60-89 days', amount: 4500000, count: 24, percentage: 24.3 },
      { bucket: '90-119 days', amount: 5800000, count: 32, percentage: 31.4 },
      { bucket: '120+ days', amount: 5000000, count: 28, percentage: 27.0 },
    ],
    npaByBranch: [
      { name: 'Main Branch', amount: 6500000, percentage: 35.1, totalLoans: 450, npaLoans: 38 },
      { name: 'Downtown', amount: 4200000, percentage: 22.7, totalLoans: 320, npaLoans: 24 },
      { name: 'Westside', amount: 3800000, percentage: 20.5, totalLoans: 280, npaLoans: 22 },
      { name: 'East End', amount: 2500000, percentage: 13.5, totalLoans: 180, npaLoans: 14 },
      { name: 'Northgate', amount: 1500000, percentage: 8.1, totalLoans: 120, npaLoans: 8 },
    ],
    npaByProduct: [
      { product: 'Home Loan', amount: 7200000, percentage: 38.9 },
      { product: 'Personal Loan', amount: 5200000, percentage: 28.1 },
      { product: 'Business Loan', amount: 3800000, percentage: 20.5 },
      { product: 'Auto Loan', amount: 2300000, percentage: 12.4 },
    ]
  },
  details: [
    {
      id: 1,
      customerName: 'Rajesh Kumar',
      accountNumber: 'LN20240001',
      branch: 'Main Branch',
      product: 'Home Loan',
      emiAmount: 45230,
      overdueDays: 92,
      outstandingBalance: 1850000,
      lastPaymentDate: '2024-01-15',
      collectionExecutive: 'Amit Sharma',
      status: 'legal',
      riskLevel: 'high',
      remarks: 'Legal notice sent. Customer unresponsive.',
      contact: '+91 9876543210',
      email: 'rajesh.k@email.com',
      address: '123 MG Road, Bangalore',
      loanDate: '2022-03-15',
      tenure: '20 years',
      interestRate: 8.5
    },
    {
      id: 2,
      customerName: 'Priya Singh',
      accountNumber: 'LN20240002',
      branch: 'Downtown',
      product: 'Personal Loan',
      emiAmount: 15600,
      overdueDays: 45,
      outstandingBalance: 420000,
      lastPaymentDate: '2024-02-28',
      collectionExecutive: 'Neha Verma',
      status: 'follow-up',
      riskLevel: 'medium',
      remarks: 'Customer promised payment next week',
      contact: '+91 9876543211',
      email: 'priya.s@email.com',
      address: '456 Park Street, Delhi',
      loanDate: '2023-06-10',
      tenure: '5 years',
      interestRate: 12.0
    },
    {
      id: 3,
      customerName: 'Vikram Patel',
      accountNumber: 'LN20240003',
      branch: 'Westside',
      product: 'Business Loan',
      emiAmount: 72300,
      overdueDays: 125,
      outstandingBalance: 2850000,
      lastPaymentDate: '2023-12-10',
      collectionExecutive: 'Rohit Mehta',
      status: 'settlement',
      riskLevel: 'critical',
      remarks: 'Settlement proposal under review',
      contact: '+91 9876543212',
      email: 'vikram.p@email.com',
      address: '789 Business Park, Mumbai',
      loanDate: '2021-09-22',
      tenure: '10 years',
      interestRate: 10.5
    },
    {
      id: 4,
      customerName: 'Anjali Desai',
      accountNumber: 'LN20240004',
      branch: 'East End',
      product: 'Auto Loan',
      emiAmount: 8900,
      overdueDays: 68,
      outstandingBalance: 185000,
      lastPaymentDate: '2024-02-15',
      collectionExecutive: 'Amit Sharma',
      status: 'follow-up',
      riskLevel: 'medium',
      remarks: 'Regular contact maintained',
      contact: '+91 9876543213',
      email: 'anjali.d@email.com',
      address: '321 Auto Nagar, Chennai',
      loanDate: '2023-01-20',
      tenure: '7 years',
      interestRate: 9.5
    },
    {
      id: 5,
      customerName: 'Sanjay Gupta',
      accountNumber: 'LN20240005',
      branch: 'Northgate',
      product: 'Home Loan',
      emiAmount: 38400,
      overdueDays: 105,
      outstandingBalance: 1250000,
      lastPaymentDate: '2023-12-28',
      collectionExecutive: 'Neha Verma',
      status: 'legal',
      riskLevel: 'high',
      remarks: 'Court case filed',
      contact: '+91 9876543214',
      email: 'sanjay.g@email.com',
      address: '654 Lake View, Hyderabad',
      loanDate: '2022-08-15',
      tenure: '15 years',
      interestRate: 8.8
    },
    {
      id: 6,
      customerName: 'Meera Iyer',
      accountNumber: 'LN20240006',
      branch: 'Main Branch',
      product: 'Personal Loan',
      emiAmount: 12300,
      overdueDays: 38,
      outstandingBalance: 315000,
      lastPaymentDate: '2024-03-01',
      collectionExecutive: 'Rohit Mehta',
      status: 'follow-up',
      riskLevel: 'low',
      remarks: 'Payment expected soon',
      contact: '+91 9876543215',
      email: 'meera.i@email.com',
      address: '987 Mall Road, Pune',
      loanDate: '2023-04-12',
      tenure: '4 years',
      interestRate: 11.5
    },
  ]
};

// Simulated user roles
const userRoles = {
  admin: 'admin',
  manager: 'manager',
  agent: 'collection_agent'
};

export default function NPAReports() {
  const [activeTab, setActiveTab] = useState('summary');
  const [filters, setFilters] = useState({
    dateRange: 'last_quarter',
    branch: 'all',
    product: 'all',
    bucketCategory: 'all',
    collectionExecutive: 'all',
    status: 'all',
    overdueRange: 'all',
    search: ''
  });
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: 'overdueDays', direction: 'desc' });
  const [userRole, setUserRole] = useState(userRoles.admin); // Default role

  // Filter data based on user role
  const roleBasedFilter = (data) => {
    if (userRole === userRoles.manager) {
      return data.filter(item => item.branch === 'Main Branch'); // Manager sees only their branch
    } else if (userRole === userRoles.agent) {
      return data.filter(item => item.collectionExecutive === 'Amit Sharma'); // Agent sees only assigned accounts
    }
    return data;
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleDrillDown = (type, value) => {
    setActiveTab('details');
    switch(type) {
      case 'bucket':
        handleFilterChange('bucketCategory', value.toLowerCase().replace(' ', '_'));
        break;
      case 'branch':
        handleFilterChange('branch', value.toLowerCase().replace(' ', '_'));
        break;
      case 'product':
        handleFilterChange('product', value.toLowerCase().replace(' ', '_'));
        break;
    }
  };

  const filteredDetails = roleBasedFilter(mockNPAData.details).filter(item => {
    return (
      (filters.branch === 'all' || item.branch.toLowerCase().replace(' ', '_') === filters.branch) &&
      (filters.product === 'all' || item.product.toLowerCase().replace(' ', '_') === filters.product) &&
      (filters.status === 'all' || item.status === filters.status) &&
      (filters.collectionExecutive === 'all' || item.collectionExecutive === filters.collectionExecutive) &&
      (filters.overdueRange === 'all' || 
        (filters.overdueRange === '30-59' && item.overdueDays >= 30 && item.overdueDays <= 59) ||
        (filters.overdueRange === '60-89' && item.overdueDays >= 60 && item.overdueDays <= 89) ||
        (filters.overdueRange === '90-119' && item.overdueDays >= 90 && item.overdueDays <= 119) ||
        (filters.overdueRange === '120+' && item.overdueDays >= 120)) &&
      (filters.search === '' || 
        item.customerName.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.accountNumber.toLowerCase().includes(filters.search.toLowerCase()))
    );
  });

  // Sort filtered details
  const sortedDetails = [...filteredDetails].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedDetails.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedDetails.length / itemsPerPage);

  const getRiskColor = (days) => {
    if (days >= 90) return 'bg-red-50 border-red-200';
    if (days >= 60) return 'bg-orange-50 border-orange-200';
    if (days >= 30) return 'bg-yellow-50 border-yellow-200';
    return 'bg-green-50 border-green-200';
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'legal': return 'bg-purple-100 text-purple-800';
      case 'settlement': return 'bg-blue-100 text-blue-800';
      case 'follow-up': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const exportToExcel = () => {
    alert('Exporting data to Excel...');
  };

  const exportToPDF = () => {
    alert('Exporting data to PDF...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-gradient-to-r from-red-600 to-orange-600 p-2 rounded-xl">
                <AlertTriangle className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Non-Performing Assets (NPA) Dashboard
                </h1>
                <p className="text-gray-600 mt-1">
                  Monitor and manage non-performing loans with real-time insights
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-white border rounded-xl px-3 py-2">
              <select 
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
                className="bg-transparent outline-none text-sm"
              >
                <option value={userRoles.admin}>Admin View</option>
                <option value={userRoles.manager}>Manager View</option>
                <option value={userRoles.agent}>Collection Agent View</option>
              </select>
            </div>
            <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2.5 rounded-xl hover:bg-gray-50">
              <RefreshCw size={18} />
              Refresh
            </button>
            <button className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 text-white px-4 py-2.5 rounded-xl hover:opacity-90">
              <Printer size={18} />
              Print Report
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200">
          <button
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-all ${activeTab === 'summary' ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('summary')}
          >
            <div className="flex items-center gap-2">
              <PieChart size={18} />
              Summary Overview
            </div>
          </button>
          <button
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-all ${activeTab === 'details' ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('details')}
          >
            <div className="flex items-center gap-2">
              <FileText size={18} />
              Customer Details
            </div>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <KPICard
          title="Total Loan Portfolio"
          value={formatCurrency(mockNPAData.summary.totalPortfolio)}
          icon={<DollarSign className="text-blue-600" />}
          color="blue"
          trend="+2.3%"
          trendUp={true}
        />
        <KPICard
          title="Total NPA Amount"
          value={formatCurrency(mockNPAData.summary.totalNPA)}
          icon={<TrendingDown className="text-red-600" />}
          color="red"
          trend="+5.1%"
          trendUp={false}
        />
        <KPICard
          title="NPA Percentage"
          value={`${mockNPAData.summary.npaPercentage.toFixed(1)}%`}
          icon={<Percent className="text-orange-600" />}
          color="orange"
          trend="+0.8%"
          trendUp={false}
        />
        <KPICard
          title="Critical NPA (90+ days)"
          value={mockNPAData.summary.criticalNPACount}
          icon={<AlertTriangle className="text-purple-600" />}
          color="purple"
          trend="+3"
          trendUp={false}
        />
      </div>

      {activeTab === 'summary' ? (
        /* Summary View */
        <div className="space-y-6">
          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* NPA by Bucket */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">NPA by Overdue Bucket</h3>
                  <p className="text-sm text-gray-500">Days overdue distribution</p>
                </div>
                <BarChart3 className="text-gray-400" size={20} />
              </div>
              <div className="space-y-4">
                {mockNPAData.summary.npaByBucket.map((bucket, idx) => (
                  <div key={idx} className="group cursor-pointer" onClick={() => handleDrillDown('bucket', bucket.bucket)}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{bucket.bucket}</span>
                      <span className="text-sm font-semibold text-gray-900">{formatCurrency(bucket.amount)}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full"
                          style={{ width: `${bucket.percentage}%` }}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">{bucket.count} accounts</span>
                        <span className="text-sm font-semibold text-gray-900">{bucket.percentage}%</span>
                        <ChevronRight size={16} className="text-gray-400 group-hover:text-red-600" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* NPA by Product */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">NPA by Product Type</h3>
                  <p className="text-sm text-gray-500">Loan product distribution</p>
                </div>
                <PieChart className="text-gray-400" size={20} />
              </div>
              <div className="space-y-4">
                {mockNPAData.summary.npaByProduct.map((product, idx) => (
                  <div key={idx} className="group cursor-pointer" onClick={() => handleDrillDown('product', product.product)}>
                    <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg flex items-center justify-center">
                          <CreditCard size={18} className="text-red-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{product.product}</p>
                          <p className="text-xs text-gray-500">{product.percentage}% of total NPA</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{formatCurrency(product.amount)}</p>
                        <ChevronRight size={16} className="text-gray-400 group-hover:text-red-600 ml-auto" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Branch Summary Table */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Branch-wise NPA Summary</h3>
                  <p className="text-sm text-gray-500">Performance across branches</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                    <Calendar size={16} className="text-gray-500" />
                    <select className="bg-transparent outline-none text-sm">
                      <option>Last Quarter</option>
                      <option>Last Month</option>
                      <option>Year to Date</option>
                    </select>
                  </div>
                  <button className="flex items-center gap-2 text-red-600 hover:text-red-700">
                    <Download size={18} />
                    Export
                  </button>
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-4 text-left text-sm font-medium text-gray-700">Branch</th>
                    <th className="p-4 text-left text-sm font-medium text-gray-700">Total Loans</th>
                    <th className="p-4 text-left text-sm font-medium text-gray-700">NPA Amount</th>
                    <th className="p-4 text-left text-sm font-medium text-gray-700">NPA %</th>
                    <th className="p-4 text-left text-sm font-medium text-gray-700">Active NPA Loans</th>
                    <th className="p-4 text-left text-sm font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mockNPAData.summary.npaByBranch.map((branch, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <Building size={18} className="text-gray-400" />
                          <span className="font-medium text-gray-900">{branch.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-gray-900">{branch.totalLoans}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-red-600">{formatCurrency(branch.amount)}</span>
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-red-500 h-2 rounded-full"
                              style={{ width: `${branch.percentage}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${branch.percentage > 20 ? 'bg-red-100 text-red-800' : branch.percentage > 15 ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}`}>
                          {branch.percentage}%
                        </span>
                      </td>
                      <td className="p-4 text-gray-900">{branch.npaLoans}</td>
                      <td className="p-4">
                        <button 
                          onClick={() => handleDrillDown('branch', branch.name)}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                        >
                          View Details
                          <ExternalLink size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* Details View */
        <div className="space-y-6">
          {/* Filters Bar */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Filter size={20} className="text-gray-500" />
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search customer, account number..."
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <button onClick={exportToExcel} className="flex items-center gap-2 px-4 py-2.5 bg-green-50 text-green-700 rounded-xl hover:bg-green-100">
                    <Download size={18} />
                    Excel
                  </button>
                  <button onClick={exportToPDF} className="flex items-center gap-2 px-4 py-2.5 bg-red-50 text-red-700 rounded-xl hover:bg-red-100">
                    <FileText size={18} />
                    PDF
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              <FilterSelect
                label="Branch"
                value={filters.branch}
                onChange={(value) => handleFilterChange('branch', value)}
                options={[
                  { value: 'all', label: 'All Branches' },
                  { value: 'main_branch', label: 'Main Branch' },
                  { value: 'downtown', label: 'Downtown' },
                  { value: 'westside', label: 'Westside' },
                  { value: 'east_end', label: 'East End' },
                  { value: 'northgate', label: 'Northgate' }
                ]}
              />
              <FilterSelect
                label="Product"
                value={filters.product}
                onChange={(value) => handleFilterChange('product', value)}
                options={[
                  { value: 'all', label: 'All Products' },
                  { value: 'home_loan', label: 'Home Loan' },
                  { value: 'personal_loan', label: 'Personal Loan' },
                  { value: 'business_loan', label: 'Business Loan' },
                  { value: 'auto_loan', label: 'Auto Loan' }
                ]}
              />
              <FilterSelect
                label="Bucket"
                value={filters.bucketCategory}
                onChange={(value) => handleFilterChange('bucketCategory', value)}
                options={[
                  { value: 'all', label: 'All Buckets' },
                  { value: '30-59', label: '30-59 days' },
                  { value: '60-89', label: '60-89 days' },
                  { value: '90-119', label: '90-119 days' },
                  { value: '120+', label: '120+ days' }
                ]}
              />
              <FilterSelect
                label="Collection Executive"
                value={filters.collectionExecutive}
                onChange={(value) => handleFilterChange('collectionExecutive', value)}
                options={[
                  { value: 'all', label: 'All Executives' },
                  { value: 'Amit Sharma', label: 'Amit Sharma' },
                  { value: 'Neha Verma', label: 'Neha Verma' },
                  { value: 'Rohit Mehta', label: 'Rohit Mehta' }
                ]}
              />
              <FilterSelect
                label="Status"
                value={filters.status}
                onChange={(value) => handleFilterChange('status', value)}
                options={[
                  { value: 'all', label: 'All Status' },
                  { value: 'legal', label: 'Legal' },
                  { value: 'settlement', label: 'Settlement' },
                  { value: 'follow-up', label: 'Follow-up' }
                ]}
              />
              <FilterSelect
                label="Overdue Days"
                value={filters.overdueRange}
                onChange={(value) => handleFilterChange('overdueRange', value)}
                options={[
                  { value: 'all', label: 'All Ranges' },
                  { value: '30-59', label: '30-59 days' },
                  { value: '60-89', label: '60-89 days' },
                  { value: '90-119', label: '90-119 days' },
                  { value: '120+', label: '120+ days' }
                ]}
              />
            </div>
          </div>

          {/* Customer Details Table */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">NPA Customer Details</h3>
                  <p className="text-sm text-gray-500">
                    Showing {currentItems.length} of {sortedDetails.length} accounts
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>Sorted by: </span>
                  <button 
                    onClick={() => handleSort('overdueDays')}
                    className="font-medium text-gray-700 hover:text-gray-900"
                  >
                    Overdue Days {sortConfig.key === 'overdueDays' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </button>
                  <span className="mx-2">|</span>
                  <button 
                    onClick={() => handleSort('outstandingBalance')}
                    className="font-medium text-gray-700 hover:text-gray-900"
                  >
                    Balance {sortConfig.key === 'outstandingBalance' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </button>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-4 text-left text-sm font-medium text-gray-700">Customer</th>
                    <th className="p-4 text-left text-sm font-medium text-gray-700">Loan Details</th>
                    <th className="p-4 text-left text-sm font-medium text-gray-700">Overdue</th>
                    <th className="p-4 text-left text-sm font-medium text-gray-700">Outstanding</th>
                    <th className="p-4 text-left text-sm font-medium text-gray-700">Collection</th>
                    <th className="p-4 text-left text-sm font-medium text-gray-700">Status</th>
                    <th className="p-4 text-left text-sm font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentItems.map((item) => (
                    <tr key={item.id} className={`hover:bg-gray-50 ${getRiskColor(item.overdueDays)}`}>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-red-100 to-orange-100 rounded-lg flex items-center justify-center">
                            <User className="text-red-600" size={18} />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{item.customerName}</p>
                            <p className="text-xs text-gray-500">{item.accountNumber}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 rounded text-xs">
                                <Building size={10} />
                                {item.branch}
                              </span>
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 rounded text-xs">
                                <CreditCard size={10} />
                                {item.product}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">EMI:</span>
                            <span className="font-medium">{formatCurrency(item.emiAmount)}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">Last Paid:</span>
                            <span>{new Date(item.lastPaymentDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">Loan Date:</span>
                            <span>{new Date(item.loanDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-center">
                          <span className={`text-2xl font-bold ${item.overdueDays >= 90 ? 'text-red-600' : item.overdueDays >= 60 ? 'text-orange-600' : 'text-yellow-600'}`}>
                            {item.overdueDays}
                          </span>
                          <p className="text-xs text-gray-500 mt-1">days overdue</p>
                          {item.overdueDays >= 90 && (
                            <div className="mt-2">
                              <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                                <AlertTriangle size={10} />
                                Critical
                              </span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-2">
                          <p className="text-lg font-bold text-gray-900">{formatCurrency(item.outstandingBalance)}</p>
                          <div className="text-xs text-gray-500 space-y-1">
                            <div className="flex items-center justify-between">
                              <span>Rate:</span>
                              <span>{item.interestRate}%</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Tenure:</span>
                              <span>{item.tenure}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                              <Users size={12} className="text-blue-600" />
                            </div>
                            <span className="font-medium text-gray-900">{item.collectionExecutive}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <Phone size={10} className="text-gray-400" />
                            <span className="text-gray-600">{item.contact}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <Mail size={10} className="text-gray-400" />
                            <span className="text-gray-600 truncate">{item.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-2">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                          </span>
                          <p className="text-xs text-gray-600 line-clamp-2">{item.remarks}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col gap-2">
                          <button 
                            onClick={() => setSelectedDetail(item)}
                            className="flex items-center justify-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 text-sm"
                          >
                            <Eye size={14} />
                            View
                          </button>
                          <button className="flex items-center justify-center gap-1 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 text-sm">
                            <Phone size={14} />
                            Call
                          </button>
                          <button className="flex items-center justify-center gap-1 px-3 py-1.5 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 text-sm">
                            <FileText size={14} />
                            Notes
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Page {currentPage} of {totalPages} • {sortedDetails.length} records
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`px-3 py-1.5 rounded-lg ${currentPage === pageNum ? 'bg-red-600 text-white' : 'border border-gray-300 hover:bg-gray-50'}`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Customer Detail Modal */}
      {selectedDetail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedDetail.customerName}</h3>
                  <p className="text-gray-600">{selectedDetail.accountNumber} • {selectedDetail.branch}</p>
                </div>
                <button 
                  onClick={() => setSelectedDetail(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <XCircle size={24} className="text-gray-500" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Customer Information</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <User size={16} className="text-gray-400" />
                        <span className="text-gray-600">{selectedDetail.customerName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={16} className="text-gray-400" />
                        <span className="text-gray-600">{selectedDetail.contact}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail size={16} className="text-gray-400" />
                        <span className="text-gray-600">{selectedDetail.email}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin size={16} className="text-gray-400 mt-1" />
                        <span className="text-gray-600">{selectedDetail.address}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Loan Details</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-gray-500">Product Type</p>
                        <p className="font-medium">{selectedDetail.product}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Loan Date</p>
                        <p className="font-medium">{new Date(selectedDetail.loanDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Interest Rate</p>
                        <p className="font-medium">{selectedDetail.interestRate}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Tenure</p>
                        <p className="font-medium">{selectedDetail.tenure}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-red-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">NPA Status</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Overdue Days</span>
                        <span className="text-2xl font-bold text-red-600">{selectedDetail.overdueDays}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Outstanding Balance</span>
                        <span className="text-xl font-bold text-gray-900">{formatCurrency(selectedDetail.outstandingBalance)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Monthly EMI</span>
                        <span className="font-medium">{formatCurrency(selectedDetail.emiAmount)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Last Payment</span>
                        <span className="font-medium">{new Date(selectedDetail.lastPaymentDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Collection Information</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Users size={16} className="text-gray-400" />
                          <span className="text-gray-600">Executive</span>
                        </div>
                        <span className="font-medium">{selectedDetail.collectionExecutive}</span>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Current Status</p>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedDetail.status)}`}>
                          {selectedDetail.status.charAt(0).toUpperCase() + selectedDetail.status.slice(1)}
                        </span>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Remarks</p>
                        <p className="text-gray-600">{selectedDetail.remarks}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end gap-3">
                <button className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50">
                  View Full History
                </button>
                <button className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700">
                  Initiate Recovery
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper Components
function KPICard({ title, value, icon, color, trend, trendUp }) {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-100',
    red: 'bg-red-50 border-red-100',
    orange: 'bg-orange-50 border-orange-100',
    purple: 'bg-purple-50 border-purple-100'
  };

  return (
    <div className={`rounded-2xl border p-5 transition-all hover:shadow-md ${colorClasses[color]}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className="p-3 rounded-xl bg-white shadow-sm">
          {icon}
        </div>
      </div>
      <div className="flex items-center gap-1">
        {trendUp ? (
          <TrendingUp size={16} className="text-green-500" />
        ) : (
          <TrendingDown size={16} className="text-red-500" />
        )}
        <span className={`text-sm font-medium ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
          {trend}
        </span>
        <span className="text-xs text-gray-500 ml-1">from last period</span>
      </div>
    </div>
  );
}

function FilterSelect({ label, value, onChange, options }) {
  return (
    <div>
      <label className="text-xs font-medium text-gray-700 mb-1 block">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none bg-white"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}