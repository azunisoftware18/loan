import React, { useState } from 'react';
import {
  Eye,
  Edit,
  Search,
  Filter,
  Download,
  Mail,
  Phone,
  MapPin,
  FileText,
  User,
  Clock,
  CheckCircle,
  XCircle,
  MoreVertical,
  ChevronDown,
  ChevronUp,
  Briefcase,
  CreditCard,
  FileCheck,
  UserPlus,
  Save,
  X,
  Users,
  Trash2,
  Printer,
  Share2,
  RefreshCw,
  Lock,
  Unlock,
  MessageCircle
} from 'lucide-react';

const Borrowers = () => {
  // State Management
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [branchFilter, setBranchFilter] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [setSelectedBorrower] = useState(null);
  const [setActiveTab] = useState('overview');
  const [setShowKYCModal] = useState(false);
  const [setShowLoanModal] = useState(false);
  const [actionMenuOpen, setActionMenuOpen] = useState(null);

  // Sample Data
  const branches = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad'];
  const loanTypes = ['Personal Loan', 'Home Loan', 'Business Loan', 'Education Loan', 'Vehicle Loan'];

  // Borrowers Data
  const [borrowers, setBorrowers] = useState([
    {
      id: 1,
      name: "Sohail Ahmed",
      phone: "9876543210",
      email: "sohail@example.com",
      address: "123 Marine Drive, Mumbai, Maharashtra - 400001",
      branch: "Mumbai",
      joinedDate: "2023-01-15",
      totalLoans: 3,
      activeLoans: 1,
      totalAmount: 750000,
      pendingEMI: 2,
      overdueAmount: 15000,
      creditScore: 720,
      kycStatus: "verified",
      employment: "Software Engineer",
      monthlyIncome: 85000,
      status: "active",
      tags: ["VIP", "Quick Payer"],
      lastPayment: "2024-01-15",
      nextPayment: "2024-02-15",
      documents: {
        aadhar: true,
        pan: true,
        photo: true,
        addressProof: true,
        incomeProof: true
      }
    }
  ]);

  // New Borrower Form State
  const [newBorrower, setNewBorrower] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    branch: '',
    employment: '',
    monthlyIncome: '',
    aadhar: '',
    pan: '',
    reference: ''
  });

  // Status Options
  const statusOptions = [
    { value: 'active', label: 'Active', color: 'bg-green-100 text-green-800' },
    { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'overdue', label: 'Overdue', color: 'bg-orange-100 text-orange-800' },
    { value: 'blocked', label: 'Blocked', color: 'bg-red-100 text-red-800' },
    { value: 'rejected', label: 'Rejected', color: 'bg-gray-100 text-gray-800' },
    { value: 'blacklisted', label: 'Blacklisted', color: 'bg-purple-100 text-purple-800' }
  ];

  // Get Status Color
  const getStatusColor = (status) => {
    const option = statusOptions.find(opt => opt.value === status);
    return option ? option.color : 'bg-gray-100 text-gray-800';
  };

  // Filtered Borrowers
  const filteredBorrowers = borrowers.filter(borrower => {
    const matchesSearch = 
      borrower.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      borrower.phone.includes(searchTerm) ||
      borrower.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      borrower.branch.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || borrower.status === statusFilter;
    const matchesBranch = branchFilter === 'all' || borrower.branch === branchFilter;
    
    return matchesSearch && matchesStatus && matchesBranch;
  });

  // Statistics
  const stats = {
    total: borrowers.length,
    active: borrowers.filter(b => b.status === 'active').length,
    overdue: borrowers.filter(b => b.status === 'overdue').length,
    pending: borrowers.filter(b => b.status === 'pending').length,
    blocked: borrowers.filter(b => b.status === 'blocked').length,
    kycPending: borrowers.filter(b => b.kycStatus === 'pending').length,
    totalAmount: borrowers.reduce((sum, b) => sum + b.totalAmount, 0),
    overdueAmount: borrowers.reduce((sum, b) => sum + b.overdueAmount, 0)
  };

  // Handle Add Borrower
  const handleAddBorrower = (e) => {
    e.preventDefault();
    const newId = Math.max(...borrowers.map(b => b.id)) + 1;
    
    const borrower = {
      id: newId,
      name: newBorrower.name,
      phone: newBorrower.phone,
      email: newBorrower.email,
      address: newBorrower.address,
      branch: newBorrower.branch,
      joinedDate: new Date().toISOString().split('T')[0],
      totalLoans: 0,
      activeLoans: 0,
      totalAmount: 0,
      pendingEMI: 0,
      overdueAmount: 0,
      creditScore: 600,
      kycStatus: "pending",
      employment: newBorrower.employment,
      monthlyIncome: parseInt(newBorrower.monthlyIncome),
      status: "pending",
      tags: ["New"],
      lastPayment: null,
      nextPayment: null,
      documents: {
        aadhar: false,
        pan: false,
        photo: false,
        addressProof: false,
        incomeProof: false
      }
    };

    setBorrowers([...borrowers, borrower]);
    setShowAddForm(false);
    setNewBorrower({
      name: '',
      phone: '',
      email: '',
      address: '',
      branch: '',
      employment: '',
      monthlyIncome: '',
      aadhar: '',
      pan: '',
      reference: ''
    });
  };

  // Handle Status Change
  const handleStatusChange = (borrowerId, newStatus) => {
    setBorrowers(borrowers.map(b => 
      b.id === borrowerId ? { ...b, status: newStatus } : b
    ));
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Name', 'Phone', 'Email', 'Branch', 'Status', 'Total Loans', 'Active Loans', 'Total Amount', 'Overdue Amount'];
    const csvData = borrowers.map(b => [
      b.name,
      b.phone,
      b.email,
      b.branch,
      b.status,
      b.totalLoans,
      b.activeLoans,
      b.totalAmount,
      b.overdueAmount
    ].join(','));
    
    const csv = [headers.join(','), ...csvData].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'borrowers.csv';
    a.click();
  };

  // KYC Status Component
  const KYCStatus = ({ status }) => {
    const getKYCDetails = () => {
      switch(status) {
        case 'verified':
          return { text: 'Verified', color: 'bg-green-100 text-green-800', icon: CheckCircle };
        case 'pending':
          return { text: 'Pending', color: 'bg-yellow-100 text-yellow-800', icon: Clock };
        case 'rejected':
          return { text: 'Rejected', color: 'bg-red-100 text-red-800', icon: XCircle };
        default:
          return { text: 'Not Started', color: 'bg-gray-100 text-gray-800', icon: FileText };
      }
    };

    const details = getKYCDetails();
    const Icon = details.icon;

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${details.color}`}>
        <Icon size={12} />
        {details.text}
      </span>
    );
  };

  // Action Menu Component
  const ActionMenu = ({ borrowerId }) => {
    const borrower = borrowers.find(b => b.id === borrowerId);
    
    return (
      <div className="absolute right-0 top-full mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
        <div className="py-1">
          <button 
            onClick={() => {
              const borrower = borrowers.find(b => b.id === borrowerId);
              setSelectedBorrower(borrower);
              setActionMenuOpen(null);
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
          >
            <Eye className="w-4 h-4" />
            View Details
          </button>
          <button 
            onClick={() => {
              const borrower = borrowers.find(b => b.id === borrowerId);
              setSelectedBorrower(borrower);
              setActiveTab('edit');
              setActionMenuOpen(null);
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
          >
            <Edit className="w-4 h-4" />
            Edit Profile
          </button>
          <button 
            onClick={() => {
              setShowKYCModal(true);
              setActionMenuOpen(null);
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
          >
            <FileCheck className="w-4 h-4" />
            KYC Documents
          </button>
          <button 
            onClick={() => {
              setShowLoanModal(true);
              setActionMenuOpen(null);
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
          >
            <CreditCard className="w-4 h-4" />
            Loan History
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
            <Printer className="w-4 h-4" />
            Print Statement
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
            <MessageCircle className="w-4 h-4" />
            Send Message
          </button>
          <div className="border-t border-gray-200 my-1"></div>
          
          {/* Status Change Options */}
          <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
            Change Status
          </div>
          
          {borrower?.status !== 'active' && (
            <button 
              onClick={() => handleStatusChange(borrowerId, 'active')}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-green-700 hover:bg-green-50"
            >
              <CheckCircle className="w-4 h-4" />
              Mark as Active
            </button>
          )}
          
          {borrower?.status !== 'blocked' && (
            <button 
              onClick={() => handleStatusChange(borrowerId, 'blocked')}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-700 hover:bg-red-50"
            >
              <Lock className="w-4 h-4" />
              Block Borrower
            </button>
          )}
          
          <div className="border-t border-gray-200 my-1"></div>
          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50">
            <Trash2 className="w-4 h-4" />
            Delete Record
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Users className="w-8 h-8 text-blue-600" />
                Borrower Management
              </h1>
              <p className="text-gray-600 mt-2">
                Manage all customer accounts, KYC verification, and loan history
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Download className="w-5 h-5" />
                Export
              </button>
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <UserPlus className="w-5 h-5" />
                Add New Borrower
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-6">
            <div className="bg-white rounded-xl p-3 border border-gray-200">
              <p className="text-xs text-gray-500">Total Borrowers</p>
              <p className="text-xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="bg-white rounded-xl p-3 border border-green-200 bg-green-50">
              <p className="text-xs text-green-600">Active</p>
              <p className="text-xl font-bold text-green-700">{stats.active}</p>
            </div>
            <div className="bg-white rounded-xl p-3 border border-orange-200 bg-orange-50">
              <p className="text-xs text-orange-600">Overdue</p>
              <p className="text-xl font-bold text-orange-700">{stats.overdue}</p>
            </div>
            <div className="bg-white rounded-xl p-3 border border-yellow-200 bg-yellow-50">
              <p className="text-xs text-yellow-600">Pending KYC</p>
              <p className="text-xl font-bold text-yellow-700">{stats.kycPending}</p>
            </div>
            <div className="bg-white rounded-xl p-3 border border-blue-200 bg-blue-50">
              <p className="text-xs text-blue-600">Total Amount</p>
              <p className="text-xl font-bold text-blue-700">₹{(stats.totalAmount / 100000).toFixed(1)}L</p>
            </div>
            <div className="bg-white rounded-xl p-3 border border-red-200 bg-red-50">
              <p className="text-xs text-red-600">Overdue Amount</p>
              <p className="text-xl font-bold text-red-700">₹{(stats.overdueAmount / 1000).toFixed(1)}K</p>
            </div>
            <div className="bg-white rounded-xl p-3 border border-purple-200 bg-purple-50">
              <p className="text-xs text-purple-600">Blocked</p>
              <p className="text-xl font-bold text-purple-700">{stats.blocked}</p>
            </div>
            <div className="bg-white rounded-xl p-3 border border-gray-200">
              <p className="text-xs text-gray-500">Pending</p>
              <p className="text-xl font-bold text-gray-900">{stats.pending}</p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, phone, email, or branch..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-5 h-5" />
                Filters
                {showFilters ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
            </div>

            {/* Expanded Filters */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    >
                      <option value="all">All Status</option>
                      {statusOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Branch</label>
                    <select
                      value={branchFilter}
                      onChange={(e) => setBranchFilter(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    >
                      <option value="all">All Branches</option>
                      {branches.map(branch => (
                        <option key={branch} value={branch}>{branch}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">KYC Status</label>
                    <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition">
                      <option value="all">All KYC Status</option>
                      <option value="verified">Verified</option>
                      <option value="pending">Pending</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    onClick={() => {
                      setStatusFilter('all');
                      setBranchFilter('all');
                      setSearchTerm('');
                    }}
                    className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Borrowers Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Borrower Details</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Financial Info</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredBorrowers.map((borrower) => (
                  <tr key={borrower.id} className="hover:bg-gray-50 transition-colors">
                    {/* Borrower Details */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-gray-900">{borrower.name}</h3>
                            {borrower.tags.map(tag => (
                              <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Briefcase className="w-3 h-3" />
                              {borrower.employment}
                            </span>
                            <span>₹{borrower.monthlyIncome.toLocaleString()}/month</span>
                          </div>
                          <div className="mt-2 flex items-center gap-4">
                            <KYCStatus status={borrower.kycStatus} />
                            <span className="text-xs text-gray-500">
                              Credit Score: <span className="font-semibold">{borrower.creditScore}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Contact Info */}
                    <td className="py-4 px-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900">{borrower.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900 truncate">{borrower.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900 text-sm truncate">{borrower.branch}</span>
                        </div>
                      </div>
                    </td>

                    {/* Financial Info */}
                    <td className="py-4 px-6">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Total Loans:</span>
                          <span className="font-semibold">{borrower.totalLoans}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Active Loans:</span>
                          <span className="font-semibold text-blue-600">{borrower.activeLoans}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Total Amount:</span>
                          <span className="font-semibold">₹{borrower.totalAmount.toLocaleString()}</span>
                        </div>
                        {borrower.overdueAmount > 0 && (
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Overdue:</span>
                            <span className="font-semibold text-red-600">₹{borrower.overdueAmount.toLocaleString()}</span>
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(borrower.status)}`}>
                            {borrower.status.charAt(0).toUpperCase() + borrower.status.slice(1)}
                          </span>
                        </div>
                        {borrower.nextPayment && (
                          <div className="text-xs text-gray-600">
                            Next Payment: {borrower.nextPayment}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Actions - Now only Three Dots Menu */}
                    <td className="py-4 px-6">
                      <div className="relative">
                        <button
                          onClick={() => setActionMenuOpen(actionMenuOpen === borrower.id ? null : borrower.id)}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Actions"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                        {actionMenuOpen === borrower.id && (
                          <ActionMenu borrowerId={borrower.id} />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredBorrowers.length === 0 && (
              <div className="text-center py-12">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No borrowers found</h3>
                <p className="text-gray-600">Try adjusting your search or filters</p>
              </div>
            )}
          </div>

          {/* Table Footer */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {filteredBorrowers.length} of {borrowers.length} borrowers
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                Previous
              </button>
              <span className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm">1</span>
              <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Borrower Modal */}
      {showAddForm && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <UserPlus className="w-6 h-6 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Add New Borrower</h2>
                </div>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddBorrower}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={newBorrower.name}
                      onChange={(e) => setNewBorrower({...newBorrower, name: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="Enter full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={newBorrower.phone}
                      onChange={(e) => setNewBorrower({...newBorrower, phone: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="9876543210"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={newBorrower.email}
                      onChange={(e) => setNewBorrower({...newBorrower, email: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="example@email.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Branch *</label>
                    <select
                      required
                      value={newBorrower.branch}
                      onChange={(e) => setNewBorrower({...newBorrower, branch: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    >
                      <option value="">Select Branch</option>
                      {branches.map(branch => (
                        <option key={branch} value={branch}>{branch}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Aadhar Number</label>
                    <input
                      type="text"
                      value={newBorrower.aadhar}
                      onChange={(e) => setNewBorrower({...newBorrower, aadhar: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="XXXX XXXX XXXX"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">PAN Number</label>
                    <input
                      type="text"
                      value={newBorrower.pan}
                      onChange={(e) => setNewBorrower({...newBorrower, pan: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="ABCDE1234F"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Occupation *</label>
                    <input
                      type="text"
                      required
                      value={newBorrower.employment}
                      onChange={(e) => setNewBorrower({...newBorrower, employment: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="e.g., Software Engineer"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Income *</label>
                    <input
                      type="number"
                      required
                      value={newBorrower.monthlyIncome}
                      onChange={(e) => setNewBorrower({...newBorrower, monthlyIncome: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="50000"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                    <textarea
                      required
                      value={newBorrower.address}
                      onChange={(e) => setNewBorrower({...newBorrower, address: e.target.value})}
                      rows="2"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="Complete address with PIN code"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Reference/Notes</label>
                    <textarea
                      value={newBorrower.reference}
                      onChange={(e) => setNewBorrower({...newBorrower, reference: e.target.value})}
                      rows="2"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="Any reference or additional notes..."
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    <Save className="w-5 h-5" />
                    Create Borrower
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Borrowers;