import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  CheckCircle,
  XCircle,
  Phone,
  Mail,
  Calendar,
  Building,
  Briefcase,
  Home,
  Car,
  Users,
  UserCheck,
  DollarSign,
  Clock,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  MoreVertical,
  RefreshCw,
  BarChart3,
  FileText,
  TrendingUp,
  TrendingDown,
  CreditCard,
  Send,
  Printer,
  MessageSquare,
  PhoneCall,
  Hash,
  Percent,
  Shield
} from "lucide-react";

// --- UTILITY FUNCTIONS ---
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

const getStatusColor = (status) => {
  switch(status) {
    case 'Approved':
    case 'Active':
    case 'Regular':
      return 'bg-green-50 text-green-700 border-green-200';
    case 'Pending':
    case 'Processing':
      return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    case 'Rejected':
    case 'Overdue':
      return 'bg-red-50 text-red-700 border-red-200';
    case 'Disbursed':
    case 'Closed':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200';
  }
};

const getStatusIcon = (status) => {
  switch(status) {
    case 'Approved':
    case 'Active':
      return <CheckCircle className="w-3 h-3 mr-1" />;
    case 'Rejected':
    case 'Overdue':
      return <XCircle className="w-3 h-3 mr-1" />;
    case 'Pending':
      return <Clock className="w-3 h-3 mr-1" />;
    default:
      return null;
  }
};

// --- STATUS BADGE COMPONENT ---
const StatusBadge = ({ status }) => {
  return (
    <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(status)}`}>
      {getStatusIcon(status)} {status}
    </span>
  );
};

// --- FILTER PANEL COMPONENT ---
const FilterPanel = ({ filters, setFilters, filterType, onApply, onReset }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const bookingFilters = [
    {
      label: 'Application Date',
      type: 'date-range',
      value: filters.dateRange,
      onChange: (val) => setFilters({...filters, dateRange: val})
    },
    {
      label: 'Branch',
      type: 'select',
      options: ['All Branches', 'Delhi Main', 'Mumbai West', 'Bangalore South', 'Chennai Central'],
      value: filters.branch,
      onChange: (val) => setFilters({...filters, branch: val})
    },
    {
      label: 'Loan Product',
      type: 'select',
      options: ['All Products', 'Personal Loan', 'Business Loan', 'Home Loan', 'Vehicle Loan'],
      value: filters.product,
      onChange: (val) => setFilters({...filters, product: val})
    },
    {
      label: 'Application Status',
      type: 'select',
      options: ['All Status', 'Pending', 'Approved', 'Rejected', 'Disbursed'],
      value: filters.status,
      onChange: (val) => setFilters({...filters, status: val})
    },
    {
      label: 'Sales Executive',
      type: 'select',
      options: ['All Executives', 'John Doe', 'Jane Smith', 'Robert Johnson', 'Sarah Williams'],
      value: filters.executive,
      onChange: (val) => setFilters({...filters, executive: val})
    },
    {
      label: 'Source Type',
      type: 'select',
      options: ['All Sources', 'Agent', 'Walk-in', 'Online', 'Partner'],
      value: filters.source,
      onChange: (val) => setFilters({...filters, source: val})
    },
    {
      label: 'Loan Amount Range',
      type: 'range',
      min: 0,
      max: 5000000,
      step: 100000,
      value: filters.amountRange,
      onChange: (val) => setFilters({...filters, amountRange: val})
    }
  ];

  const customerFilters = [
    {
      label: 'Branch',
      type: 'select',
      options: ['All Branches', 'Delhi Main', 'Mumbai West', 'Bangalore South', 'Chennai Central'],
      value: filters.branch,
      onChange: (val) => setFilters({...filters, branch: val})
    },
    {
      label: 'Loan Product',
      type: 'select',
      options: ['All Products', 'Personal Loan', 'Business Loan', 'Home Loan', 'Vehicle Loan'],
      value: filters.product,
      onChange: (val) => setFilters({...filters, product: val})
    },
    {
      label: 'Loan Status',
      type: 'select',
      options: ['All Status', 'Active', 'Closed', 'Overdue'],
      value: filters.loanStatus,
      onChange: (val) => setFilters({...filters, loanStatus: val})
    },
    {
      label: 'EMI Status',
      type: 'select',
      options: ['All Status', 'Regular', 'Late'],
      value: filters.emiStatus,
      onChange: (val) => setFilters({...filters, emiStatus: val})
    },
    {
      label: 'Disbursement Date',
      type: 'date-range',
      value: filters.disbursementDate,
      onChange: (val) => setFilters({...filters, disbursementDate: val})
    },
    {
      label: 'Outstanding Balance',
      type: 'range',
      min: 0,
      max: 10000000,
      step: 100000,
      value: filters.outstandingRange,
      onChange: (val) => setFilters({...filters, outstandingRange: val})
    }
  ];

  const currentFilters = filterType === 'booking' ? bookingFilters : customerFilters;

  const renderFilterInput = (filter) => {
    switch(filter.type) {
      case 'select':
        return (
          <select
            value={filter.value}
            onChange={(e) => filter.onChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            {filter.options.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );
      case 'date-range':
        return (
          <div className="flex gap-2">
            <input
              type="date"
              value={filter.value?.from || ''}
              onChange={(e) => filter.onChange({...filter.value, from: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
            <input
              type="date"
              value={filter.value?.to || ''}
              onChange={(e) => filter.onChange({...filter.value, to: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
        );
      case 'range':
        return (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{formatCurrency(filter.value?.min || 0)}</span>
              <span>{formatCurrency(filter.value?.max || filter.max)}</span>
            </div>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={filter.value?.min || ''}
                onChange={(e) => filter.onChange({...filter.value, min: parseInt(e.target.value) || 0})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
              <input
                type="number"
                placeholder="Max"
                value={filter.value?.max || ''}
                onChange={(e) => filter.onChange({...filter.value, max: parseInt(e.target.value) || filter.max})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-800">Filters</h3>
          <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
            {Object.values(filters).filter(v => 
              v !== 'All' && 
              v !== 'All Branches' && 
              v !== 'All Products' && 
              v !== 'All Status' && 
              v !== 'All Executives' && 
              v !== 'All Sources'
            ).length} active
          </span>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-500 hover:text-gray-700"
        >
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      {isExpanded && (
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentFilters.map((filter, index) => (
              <div key={index}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {filter.label}
                </label>
                {renderFilterInput(filter)}
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 flex justify-end gap-3">
            <button
              onClick={onReset}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Reset
            </button>
            <button
              onClick={onApply}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// --- TABLE COMPONENT ---
const DataTable = ({ columns, data, onAction, pagination, sortConfig, onSort, rowActions }) => {
  const handleSort = (key) => {
    if (sortConfig.key === key) {
      onSort(key, sortConfig.direction === 'asc' ? 'desc' : 'asc');
    } else {
      onSort(key, 'asc');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  onClick={() => column.sortable && handleSort(column.key)}
                  className={`py-3 px-4 text-left text-sm font-semibold text-gray-700 ${column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''}`}
                >
                  <div className="flex items-center gap-1">
                    {column.label}
                    {column.sortable && sortConfig.key === column.key && (
                      sortConfig.direction === 'asc' ? 
                      <ChevronUp className="w-4 h-4" /> : 
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </th>
              ))}
              {rowActions && <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((row, rowIndex) => (
              <tr 
                key={rowIndex} 
                className={`hover:bg-gray-50 transition-colors ${row.status?.includes('Overdue') ? 'bg-red-50/50' : row.status === 'Pending' ? 'bg-yellow-50/50' : ''}`}
              >
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="py-3 px-4">
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </td>
                ))}
                {rowActions && (
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      {rowActions.map((action, index) => (
                        <button
                          key={index}
                          onClick={() => onAction(action.type, row)}
                          className={`p-1.5 rounded hover:bg-opacity-10 ${
                            action.type === 'view' ? 'text-blue-600 hover:bg-blue-100' :
                            action.type === 'edit' ? 'text-yellow-600 hover:bg-yellow-100' :
                            action.type === 'approve' ? 'text-green-600 hover:bg-green-100' :
                            action.type === 'reject' ? 'text-red-600 hover:bg-red-100' :
                            'text-gray-600 hover:bg-gray-100'
                          }`}
                          title={action.label}
                        >
                          {action.icon}
                        </button>
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagination && (
        <div className="px-6 py-4 border-t border-gray-200 flex flex-col md:flex-row md:items-center justify-between">
          <div className="text-sm text-gray-500 mb-2 md:mb-0">
            Showing {pagination.start} to {pagination.end} of {pagination.total} entries
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={pagination.onPrev}
              disabled={!pagination.hasPrev}
              className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            {pagination.pages.map(page => (
              <button
                key={page}
                onClick={() => pagination.onPage(page)}
                className={`px-3 py-1 border rounded text-sm ${pagination.current === page ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 hover:bg-gray-50'}`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={pagination.onNext}
              disabled={!pagination.hasNext}
              className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// --- MAIN COMPONENT ---
export default function CustomerAndBookingList() {
  const [activeTab, setActiveTab] = useState('booking');
  const [searchTerm, setSearchTerm] = useState('');
  const [bookingFilters, setBookingFilters] = useState({
    dateRange: { from: '', to: '' },
    branch: 'All Branches',
    product: 'All Products',
    status: 'All Status',
    executive: 'All Executives',
    source: 'All Sources',
    amountRange: { min: 0, max: 5000000 }
  });

  const [customerFilters, setCustomerFilters] = useState({
    branch: 'All Branches',
    product: 'All Products',
    loanStatus: 'All Status',
    emiStatus: 'All Status',
    disbursementDate: { from: '', to: '' },
    outstandingRange: { min: 0, max: 10000000 }
  });

  const [bookingSort, setBookingSort] = useState({ key: 'applicationDate', direction: 'desc' });
  const [customerSort, setCustomerSort] = useState({ key: 'outstandingBalance', direction: 'desc' });
  const [bookingPage, setBookingPage] = useState(1);
  const [customerPage, setCustomerPage] = useState(1);
  const itemsPerPage = 10;

  // --- MOCK DATA ---
  const bookingData = [
    {
      id: 'APP-2024-001',
      customerName: 'Rahul Sharma',
      mobile: '+91 9876543210',
      loanAmount: 500000,
      product: 'Personal Loan',
      branch: 'Delhi Main',
      applicationDate: '2024-03-15',
      status: 'Pending',
      assignedExecutive: 'John Doe',
      source: 'Online'
    },
    {
      id: 'APP-2024-002',
      customerName: 'Priya Patel',
      mobile: '+91 9876543211',
      loanAmount: 1500000,
      product: 'Business Loan',
      branch: 'Mumbai West',
      applicationDate: '2024-03-14',
      status: 'Approved',
      assignedExecutive: 'Jane Smith',
      source: 'Agent'
    },
    {
      id: 'APP-2024-003',
      customerName: 'Amit Verma',
      mobile: '+91 9876543212',
      loanAmount: 3500000,
      product: 'Home Loan',
      branch: 'Bangalore South',
      applicationDate: '2024-03-12',
      status: 'Disbursed',
      assignedExecutive: 'Robert Johnson',
      source: 'Walk-in'
    },
    {
      id: 'APP-2024-004',
      customerName: 'Sonia Kapoor',
      mobile: '+91 9876543213',
      loanAmount: 800000,
      product: 'Vehicle Loan',
      branch: 'Chennai Central',
      applicationDate: '2024-03-10',
      status: 'Rejected',
      assignedExecutive: 'Sarah Williams',
      source: 'Partner'
    },
    {
      id: 'APP-2024-005',
      customerName: 'Rajesh Kumar',
      mobile: '+91 9876543214',
      loanAmount: 1200000,
      product: 'Personal Loan',
      branch: 'Delhi Main',
      applicationDate: '2024-03-08',
      status: 'Pending',
      assignedExecutive: 'John Doe',
      source: 'Online'
    },
    {
      id: 'APP-2024-006',
      customerName: 'Neha Singh',
      mobile: '+91 9876543215',
      loanAmount: 2500000,
      product: 'Business Loan',
      branch: 'Mumbai West',
      applicationDate: '2024-03-07',
      status: 'Approved',
      assignedExecutive: 'Jane Smith',
      source: 'Agent'
    },
    {
      id: 'APP-2024-007',
      customerName: 'Vikram Yadav',
      mobile: '+91 9876543216',
      loanAmount: 1800000,
      product: 'Home Loan',
      branch: 'Bangalore South',
      applicationDate: '2024-03-05',
      status: 'Disbursed',
      assignedExecutive: 'Robert Johnson',
      source: 'Walk-in'
    },
    {
      id: 'APP-2024-008',
      customerName: 'Anjali Reddy',
      mobile: '+91 9876543217',
      loanAmount: 600000,
      product: 'Vehicle Loan',
      branch: 'Chennai Central',
      applicationDate: '2024-03-03',
      status: 'Pending',
      assignedExecutive: 'Sarah Williams',
      source: 'Partner'
    }
  ];

  const customerData = [
    {
      customerId: 'CUST-1001',
      loanAccount: 'L-2023-001',
      customerName: 'Rahul Sharma',
      mobile: '+91 9876543210',
      disbursedAmount: 500000,
      emiAmount: 12500,
      outstandingBalance: 425000,
      dueDate: '2024-04-05',
      loanStatus: 'Active',
      collectionExecutive: 'Mike Wilson',
      emiStatus: 'Regular'
    },
    {
      customerId: 'CUST-1002',
      loanAccount: 'L-2023-002',
      customerName: 'Priya Patel',
      mobile: '+91 9876543211',
      disbursedAmount: 1500000,
      emiAmount: 37500,
      outstandingBalance: 1350000,
      dueDate: '2024-04-10',
      loanStatus: 'Active',
      collectionExecutive: 'Lisa Brown',
      emiStatus: 'Late'
    },
    {
      customerId: 'CUST-1003',
      loanAccount: 'L-2023-003',
      customerName: 'Amit Verma',
      mobile: '+91 9876543212',
      disbursedAmount: 3500000,
      emiAmount: 87500,
      outstandingBalance: 3150000,
      dueDate: '2024-04-15',
      loanStatus: 'Active',
      collectionExecutive: 'Mike Wilson',
      emiStatus: 'Regular'
    },
    {
      customerId: 'CUST-1004',
      loanAccount: 'L-2022-001',
      customerName: 'Sonia Kapoor',
      mobile: '+91 9876543213',
      disbursedAmount: 800000,
      emiAmount: 20000,
      outstandingBalance: 0,
      dueDate: '2023-12-05',
      loanStatus: 'Closed',
      collectionExecutive: 'Lisa Brown',
      emiStatus: 'Regular'
    },
    {
      customerId: 'CUST-1005',
      loanAccount: 'L-2023-004',
      customerName: 'Rajesh Kumar',
      mobile: '+91 9876543214',
      disbursedAmount: 1200000,
      emiAmount: 30000,
      outstandingBalance: 1080000,
      dueDate: '2024-03-25',
      loanStatus: 'Overdue',
      collectionExecutive: 'Mike Wilson',
      emiStatus: 'Late'
    },
    {
      customerId: 'CUST-1006',
      loanAccount: 'L-2023-005',
      customerName: 'Neha Singh',
      mobile: '+91 9876543215',
      disbursedAmount: 2500000,
      emiAmount: 62500,
      outstandingBalance: 2250000,
      dueDate: '2024-04-20',
      loanStatus: 'Active',
      collectionExecutive: 'Lisa Brown',
      emiStatus: 'Regular'
    },
    {
      customerId: 'CUST-1007',
      loanAccount: 'L-2023-006',
      customerName: 'Vikram Yadav',
      mobile: '+91 9876543216',
      disbursedAmount: 1800000,
      emiAmount: 45000,
      outstandingBalance: 1620000,
      dueDate: '2024-04-12',
      loanStatus: 'Active',
      collectionExecutive: 'Mike Wilson',
      emiStatus: 'Regular'
    },
    {
      customerId: 'CUST-1008',
      loanAccount: 'L-2022-002',
      customerName: 'Anjali Reddy',
      mobile: '+91 9876543217',
      disbursedAmount: 600000,
      emiAmount: 15000,
      outstandingBalance: 0,
      dueDate: '2023-11-15',
      loanStatus: 'Closed',
      collectionExecutive: 'Lisa Brown',
      emiStatus: 'Regular'
    }
  ];

  // --- TABLE CONFIGURATIONS ---
  const bookingColumns = [
    {
      key: 'id',
      label: 'Application ID',
      sortable: true,
      render: (value) => <span className="font-mono text-blue-600">{value}</span>
    },
    {
      key: 'customerName',
      label: 'Customer Name',
      sortable: true,
      render: (value, row) => (
        <div>
          <div className="font-medium text-gray-800">{value}</div>
          <div className="text-xs text-gray-500 flex items-center gap-1">
            <Phone size={12} />
            {row.mobile}
          </div>
        </div>
      )
    },
    {
      key: 'loanAmount',
      label: 'Loan Amount',
      sortable: true,
      render: (value) => <span className="font-bold text-gray-800">{formatCurrency(value)}</span>
    },
    {
      key: 'product',
      label: 'Product Type',
      sortable: true,
      render: (value) => (
        <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">
          {value}
        </span>
      )
    },
    {
      key: 'branch',
      label: 'Branch',
      sortable: true,
      render: (value) => <span className="text-gray-700">{value}</span>
    },
    {
      key: 'applicationDate',
      label: 'Application Date',
      sortable: true,
      render: (value) => <span className="text-gray-700">{formatDate(value)}</span>
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value) => <StatusBadge status={value} />
    },
    {
      key: 'assignedExecutive',
      label: 'Assigned Executive',
      sortable: true,
      render: (value) => (
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs">
            {value.charAt(0)}
          </div>
          <span className="text-sm">{value}</span>
        </div>
      )
    }
  ];

  const customerColumns = [
    {
      key: 'customerId',
      label: 'Customer ID',
      sortable: true,
      render: (value) => <span className="font-mono text-purple-600">{value}</span>
    },
    {
      key: 'loanAccount',
      label: 'Loan Account',
      sortable: true,
      render: (value) => <span className="font-mono font-bold text-blue-600">{value}</span>
    },
    {
      key: 'customerName',
      label: 'Customer Name',
      sortable: true,
      render: (value, row) => (
        <div>
          <div className="font-medium text-gray-800">{value}</div>
          <div className="text-xs text-gray-500 flex items-center gap-1">
            <Phone size={12} />
            {row.mobile}
          </div>
        </div>
      )
    },
    {
      key: 'disbursedAmount',
      label: 'Disbursed',
      sortable: true,
      render: (value) => <span className="font-bold text-gray-800">{formatCurrency(value)}</span>
    },
    {
      key: 'emiAmount',
      label: 'EMI Amount',
      sortable: true,
      render: (value) => <span className="text-gray-700">{formatCurrency(value)}</span>
    },
    {
      key: 'outstandingBalance',
      label: 'Outstanding',
      sortable: true,
      render: (value) => (
        <span className={`font-bold ${value === 0 ? 'text-green-600' : 'text-orange-600'}`}>
          {formatCurrency(value)}
        </span>
      )
    },
    {
      key: 'dueDate',
      label: 'Due Date',
      sortable: true,
      render: (value, row) => (
        <div>
          <div className={`text-sm ${row.loanStatus === 'Overdue' ? 'text-red-600 font-bold' : 'text-gray-700'}`}>
            {formatDate(value)}
          </div>
          {row.loanStatus === 'Overdue' && (
            <div className="text-xs text-red-500">Overdue</div>
          )}
        </div>
      )
    },
    {
      key: 'loanStatus',
      label: 'Loan Status',
      sortable: true,
      render: (value) => <StatusBadge status={value} />
    },
    {
      key: 'collectionExecutive',
      label: 'Collection Executive',
      sortable: true,
      render: (value) => (
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-xs text-green-600">
            {value.charAt(0)}
          </div>
          <span className="text-sm">{value}</span>
        </div>
      )
    }
  ];

  // --- ACTION HANDLERS ---
  const handleBookingAction = (type, row) => {
    switch(type) {
      case 'view':
        alert(`View application: ${row.id}`);
        break;
      case 'edit':
        alert(`Edit application: ${row.id}`);
        break;
      case 'approve':
        alert(`Approve application: ${row.id}`);
        break;
      case 'reject':
        alert(`Reject application: ${row.id}`);
        break;
      default:
        break;
    }
  };

  const handleCustomerAction = (type, row) => {
    switch(type) {
      case 'view':
        alert(`View statement: ${row.loanAccount}`);
        break;
      case 'payment':
        alert(`Make payment: ${row.loanAccount}`);
        break;
      case 'ledger':
        alert(`View ledger: ${row.loanAccount}`);
        break;
      case 'contact':
        alert(`Contact: ${row.customerName} - ${row.mobile}`);
        break;
      default:
        break;
    }
  };

  const bookingActions = [
    { type: 'view', label: 'View Details', icon: <Eye className="w-4 h-4" /> },
    { type: 'edit', label: 'Edit', icon: <Edit className="w-4 h-4" /> },
    { type: 'approve', label: 'Approve', icon: <CheckCircle className="w-4 h-4" /> },
    { type: 'reject', label: 'Reject', icon: <XCircle className="w-4 h-4" /> }
  ];

  const customerActions = [
    { type: 'view', label: 'View Statement', icon: <FileText className="w-4 h-4" /> },
    { type: 'payment', label: 'Make Payment', icon: <CreditCard className="w-4 h-4" /> },
    { type: 'ledger', label: 'Ledger', icon: <BarChart3 className="w-4 h-4" /> },
    { type: 'contact', label: 'Contact', icon: <PhoneCall className="w-4 h-4" /> }
  ];

  // --- FILTERED DATA ---
  const filteredBookingData = useMemo(() => {
    let data = [...bookingData];
    
    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      data = data.filter(item =>
        item.customerName.toLowerCase().includes(term) ||
        item.id.toLowerCase().includes(term) ||
        item.mobile.includes(searchTerm)
      );
    }
    
    // Apply filters
    if (bookingFilters.branch !== 'All Branches') {
      data = data.filter(item => item.branch === bookingFilters.branch);
    }
    if (bookingFilters.product !== 'All Products') {
      data = data.filter(item => item.product === bookingFilters.product);
    }
    if (bookingFilters.status !== 'All Status') {
      data = data.filter(item => item.status === bookingFilters.status);
    }
    if (bookingFilters.executive !== 'All Executives') {
      data = data.filter(item => item.assignedExecutive === bookingFilters.executive);
    }
    if (bookingFilters.source !== 'All Sources') {
      data = data.filter(item => item.source === bookingFilters.source);
    }
    if (bookingFilters.amountRange?.min > 0) {
      data = data.filter(item => item.loanAmount >= bookingFilters.amountRange.min);
    }
    if (bookingFilters.amountRange?.max < 5000000) {
      data = data.filter(item => item.loanAmount <= bookingFilters.amountRange.max);
    }
    
    // Apply sorting
    data.sort((a, b) => {
      const aVal = a[bookingSort.key];
      const bVal = b[bookingSort.key];
      
      if (aVal < bVal) return bookingSort.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return bookingSort.direction === 'asc' ? 1 : -1;
      return 0;
    });
    
    return data;
  }, [bookingData, searchTerm, bookingFilters, bookingSort]);

  const filteredCustomerData = useMemo(() => {
    let data = [...customerData];
    
    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      data = data.filter(item =>
        item.customerName.toLowerCase().includes(term) ||
        item.loanAccount.toLowerCase().includes(term) ||
        item.customerId.toLowerCase().includes(term) ||
        item.mobile.includes(searchTerm)
      );
    }
    
    // Apply filters
    if (customerFilters.branch !== 'All Branches') {
      data = data.filter(item => item.branch === customerFilters.branch);
    }
    if (customerFilters.product !== 'All Products') {
      data = data.filter(item => item.product === customerFilters.product);
    }
    if (customerFilters.loanStatus !== 'All Status') {
      data = data.filter(item => item.loanStatus === customerFilters.loanStatus);
    }
    if (customerFilters.emiStatus !== 'All Status') {
      data = data.filter(item => item.emiStatus === customerFilters.emiStatus);
    }
    if (customerFilters.outstandingRange?.min > 0) {
      data = data.filter(item => item.outstandingBalance >= customerFilters.outstandingRange.min);
    }
    if (customerFilters.outstandingRange?.max < 10000000) {
      data = data.filter(item => item.outstandingBalance <= customerFilters.outstandingRange.max);
    }
    
    // Apply sorting
    data.sort((a, b) => {
      const aVal = a[customerSort.key];
      const bVal = b[customerSort.key];
      
      if (aVal < bVal) return customerSort.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return customerSort.direction === 'asc' ? 1 : -1;
      return 0;
    });
    
    return data;
  }, [customerData, searchTerm, customerFilters, customerSort]);

  // --- PAGINATION ---
  const bookingPagination = {
    start: (bookingPage - 1) * itemsPerPage + 1,
    end: Math.min(bookingPage * itemsPerPage, filteredBookingData.length),
    total: filteredBookingData.length,
    current: bookingPage,
    pages: Array.from({ length: Math.ceil(filteredBookingData.length / itemsPerPage) }, (_, i) => i + 1),
    hasPrev: bookingPage > 1,
    hasNext: bookingPage < Math.ceil(filteredBookingData.length / itemsPerPage),
    onPrev: () => setBookingPage(prev => Math.max(1, prev - 1)),
    onNext: () => setBookingPage(prev => Math.min(Math.ceil(filteredBookingData.length / itemsPerPage), prev + 1)),
    onPage: (page) => setBookingPage(page)
  };

  const customerPagination = {
    start: (customerPage - 1) * itemsPerPage + 1,
    end: Math.min(customerPage * itemsPerPage, filteredCustomerData.length),
    total: filteredCustomerData.length,
    current: customerPage,
    pages: Array.from({ length: Math.ceil(filteredCustomerData.length / itemsPerPage) }, (_, i) => i + 1),
    hasPrev: customerPage > 1,
    hasNext: customerPage < Math.ceil(filteredCustomerData.length / itemsPerPage),
    onPrev: () => setCustomerPage(prev => Math.max(1, prev - 1)),
    onNext: () => setCustomerPage(prev => Math.min(Math.ceil(filteredCustomerData.length / itemsPerPage), prev + 1)),
    onPage: (page) => setCustomerPage(page)
  };

  const paginatedBookingData = filteredBookingData.slice(
    (bookingPage - 1) * itemsPerPage,
    bookingPage * itemsPerPage
  );

  const paginatedCustomerData = filteredCustomerData.slice(
    (customerPage - 1) * itemsPerPage,
    customerPage * itemsPerPage
  );

  // --- EXPORT FUNCTIONS ---
  const exportData = () => {
    const data = activeTab === 'booking' ? filteredBookingData : filteredCustomerData;
    const headers = activeTab === 'booking' 
      ? ['Application ID', 'Customer Name', 'Mobile', 'Loan Amount', 'Product', 'Branch', 'Application Date', 'Status', 'Executive']
      : ['Customer ID', 'Loan Account', 'Customer Name', 'Mobile', 'Disbursed Amount', 'EMI Amount', 'Outstanding Balance', 'Due Date', 'Loan Status', 'Collection Executive'];
    
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        activeTab === 'booking'
          ? [row.id, row.customerName, row.mobile, row.loanAmount, row.product, row.branch, row.applicationDate, row.status, row.assignedExecutive].join(',')
          : [row.customerId, row.loanAccount, row.customerName, row.mobile, row.disbursedAmount, row.emiAmount, row.outstandingBalance, row.dueDate, row.loanStatus, row.collectionExecutive].join(',')
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${activeTab === 'booking' ? 'booking_list' : 'customer_list'}_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  // --- RESET FILTERS ---
  const resetBookingFilters = () => {
    setBookingFilters({
      dateRange: { from: '', to: '' },
      branch: 'All Branches',
      product: 'All Products',
      status: 'All Status',
      executive: 'All Executives',
      source: 'All Sources',
      amountRange: { min: 0, max: 5000000 }
    });
    setBookingPage(1);
  };

  const resetCustomerFilters = () => {
    setCustomerFilters({
      branch: 'All Branches',
      product: 'All Products',
      loanStatus: 'All Status',
      emiStatus: 'All Status',
      disbursementDate: { from: '', to: '' },
      outstandingRange: { min: 0, max: 10000000 }
    });
    setCustomerPage(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl">
                <Users className="text-white" size={28} />
              </div>
              <span>Customer & Booking Management</span>
            </h1>
            <p className="text-gray-600 mt-2">
              Manage loan applications and active customers in one place
            </p>
          </div>

          <div className="flex gap-3 mt-4 md:mt-0">
            <button
              onClick={exportData}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 transition-colors"
            >
              <Download size={18} />
              Export {activeTab === 'booking' ? 'Applications' : 'Customers'}
            </button>
            <button
              onClick={() => activeTab === 'booking' ? resetBookingFilters() : resetCustomerFilters()}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors"
            >
              <RefreshCw size={18} />
              Reset
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => {
                setActiveTab('booking');
                setSearchTerm('');
              }}
              className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
                activeTab === 'booking'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <FileText className="w-5 h-5" />
                Booking List ({bookingData.length})
              </div>
            </button>
            <button
              onClick={() => {
                setActiveTab('customer');
                setSearchTerm('');
              }}
              className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
                activeTab === 'customer'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <UserCheck className="w-5 h-5" />
                Loan Customer List ({customerData.length})
              </div>
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder={`Search by ${activeTab === 'booking' ? 'customer name, application ID, or mobile...' : 'customer name, loan account, or mobile...'}`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex gap-2">
                  <div className="flex items-center px-4 py-3 bg-gray-100 rounded-lg">
                    <span className="text-sm text-gray-600">
                      {activeTab === 'booking' ? 'Total Applications:' : 'Active Loans:'}
                    </span>
                    <span className="ml-2 font-bold text-gray-800">
                      {activeTab === 'booking' ? bookingData.length : customerData.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter Panel */}
            {activeTab === 'booking' ? (
              <FilterPanel
                filters={bookingFilters}
                setFilters={setBookingFilters}
                filterType="booking"
                onApply={() => setBookingPage(1)}
                onReset={resetBookingFilters}
              />
            ) : (
              <FilterPanel
                filters={customerFilters}
                setFilters={setCustomerFilters}
                filterType="customer"
                onApply={() => setCustomerPage(1)}
                onReset={resetCustomerFilters}
              />
            )}

            {/* Data Table */}
            {activeTab === 'booking' ? (
              <DataTable
                columns={bookingColumns}
                data={paginatedBookingData}
                onAction={handleBookingAction}
                pagination={bookingPagination}
                sortConfig={bookingSort}
                onSort={(key, direction) => setBookingSort({ key, direction })}
                rowActions={bookingActions}
              />
            ) : (
              <DataTable
                columns={customerColumns}
                data={paginatedCustomerData}
                onAction={handleCustomerAction}
                pagination={customerPagination}
                sortConfig={customerSort}
                onSort={(key, direction) => setCustomerSort({ key, direction })}
                rowActions={customerActions}
              />
            )}
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending Applications</p>
              <p className="text-2xl font-bold text-gray-800">
                {bookingData.filter(item => item.status === 'Pending').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Loans</p>
              <p className="text-2xl font-bold text-gray-800">
                {customerData.filter(item => item.loanStatus === 'Active').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-50 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Overdue Loans</p>
              <p className="text-2xl font-bold text-gray-800">
                {customerData.filter(item => item.loanStatus === 'Overdue').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-50 rounded-lg">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Outstanding</p>
              <p className="text-2xl font-bold text-gray-800">
                {formatCurrency(customerData.reduce((sum, item) => sum + item.outstandingBalance, 0))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}