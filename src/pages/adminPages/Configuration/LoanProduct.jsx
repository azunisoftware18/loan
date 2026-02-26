import React, { useState, useEffect } from 'react';
import {
  Plus, Search, Filter, Edit, Trash2, Eye,
  DollarSign, Percent, Calendar, Users,
  TrendingUp, Shield, FileText, CheckCircle, XCircle,
  Download, MoreVertical, Tag, Clock, ChevronDown,
  X, Info, CreditCard, UserCheck, BarChart, FileCheck,
  IndianRupee
} from 'lucide-react';
import AddLoanTypes from '../../../components/admin/modals/AddLoanTypes';
import { useDeleteLoanType, useLoanTypes } from '../../../hooks/useLoan';

const ALLOWED_LOAN_TYPES = [
  "PERSONAL_LOAN",
  "VEHICLE_LOAN",
  "HOME_LOAN",
  "EDUCATION_LOAN",
  "BUSINESS_LOAN",
  "GOLD_LOAN",
];

// View Modal Component
const ProductViewModal = ({ product, onClose }) => {
  if (!product) return null;

  const formatDate = (dateString) => {
    if (!dateString) return 'Not available';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    if (!amount) return '₹0';
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} L`;
    } else if (amount >= 1000) {
      return `₹${(amount / 1000).toFixed(2)} K`;
    }
    return `₹${amount}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
            <div className="flex items-center gap-2 mt-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${product.category === 'HOME LOAN' ? 'bg-blue-50 text-blue-700' :
                product.category === 'PERSONAL LOAN' ? 'bg-purple-50 text-purple-700' :
                  product.category === 'VEHICLE LOAN' ? 'bg-orange-50 text-orange-700' :
                    product.category === 'EDUCATION LOAN' ? 'bg-teal-50 text-teal-700' :
                      product.category === 'BUSINESS LOAN' ? 'bg-indigo-50 text-indigo-700' :
                        'bg-yellow-50 text-yellow-700'
                }`}>
                {product.category}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${product.status === 'active'
                ? 'text-green-600 bg-green-50 border-green-200'
                : 'text-red-600 bg-red-50 border-red-200'
                }`}>
                {product.status}
              </span>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                {product.type}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* Overview Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Info className="w-5 h-5" />
              Product Overview
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <IndianRupee className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">Loan Amount Range</span>
                </div>
                <p className="text-lg font-bold text-gray-900">{product.amount}</p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Percent className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-green-700">Interest Rate</span>
                </div>
                <p className="text-lg font-bold text-gray-900">{product.interest}</p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium text-purple-700">Tenure Period</span>
                </div>
                <p className="text-lg font-bold text-gray-900">{product.tenure}</p>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Left Column - Basic Details */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Basic Details</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Product Code</span>
                  <span className="font-medium">{product.original?.code || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Description</span>
                  <span className="font-medium text-right max-w-xs">
                    {product.original?.description || 'No description available'}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Processing Fee</span>
                  <span className="font-medium">{product.fee}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">GST Applicable</span>
                  <span className="font-medium">
                    {product.original?.gstApplicable ? 'Yes' : 'No'}
                    {product.original?.gstApplicable && ` (${product.original.gstPercentage}%)`}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column - Eligibility Criteria */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Eligibility Criteria</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Age Range</span>
                  <span className="font-medium">
                    {product.original?.minAge || 0} - {product.original?.maxAge || 0} years
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Minimum Income</span>
                  <span className="font-medium">
                    {product.original?.minIncome ? formatCurrency(product.original.minIncome) : 'Not specified'}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Employment Type</span>
                  <span className="font-medium capitalize">
                    {product.original?.employmentType || 'Any'}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">CIBIL Score Range</span>
                  <span className="font-medium">
                    {product.original?.minCibilScore || 0} - {product.original?.maxCibilScore || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Product Features</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className={`p-4 rounded-lg ${product.original?.prepaymentAllowed ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <div className="flex items-center gap-2 mb-2">
                  {product.original?.prepaymentAllowed ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                  <span className={`font-medium ${product.original?.prepaymentAllowed ? 'text-green-700' : 'text-red-700'}`}>
                    Prepayment Allowed
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {product.original?.prepaymentAllowed
                    ? 'Customers can make early payments without penalty'
                    : 'Early payments are not permitted'}
                </p>
              </div>

              <div className={`p-4 rounded-lg ${product.original?.foreclosureAllowed ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <div className="flex items-center gap-2 mb-2">
                  {product.original?.foreclosureAllowed ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                  <span className={`font-medium ${product.original?.foreclosureAllowed ? 'text-green-700' : 'text-red-700'}`}>
                    Foreclosure Allowed
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {product.original?.foreclosureAllowed
                    ? 'Loan can be closed before tenure completion'
                    : 'Loan closure before tenure is restricted'}
                </p>
              </div>
            </div>
          </div>

          {/* Technical Details */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Technical Specifications</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <span className="text-sm text-gray-600 block mb-1">Interest Type</span>
                <span className="font-medium">{product.original?.interestType || 'N/A'}</span>
              </div>
              <div>
                <span className="text-sm text-gray-600 block mb-1">Default Rate</span>
                <span className="font-medium">{product.original?.defaultInterestRate || 0}%</span>
              </div>
              <div>
                <span className="text-sm text-gray-600 block mb-1">Fee Type</span>
                <span className="font-medium">{product.original?.processingFeeType || 'N/A'}</span>
              </div>
              <div>
                <span className="text-sm text-gray-600 block mb-1">Created Date</span>
                <span className="font-medium">{formatDate(product.created)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Close
          </button>

        </div>
      </div>
    </div>
  );
};

const LoanProduct = () => {
  const { data: products = [], isLoading: loading, refetch } = useLoanTypes();
  const deleteMutation = useDeleteLoanType();
  const [showAddLoanPopup, setShowAddLoanPopup] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const categories = ["all", ...ALLOWED_LOAN_TYPES.map(t => t.replace("_", " "))];
  const statuses = ['all', 'active', 'inactive'];
  const safeProducts = Array.isArray(products) ? products : [];
  const mappedProducts = (Array.isArray(products) ? products : []).map(p => ({
    id: p.id,
    name: p.name || 'Unnamed Product',
    category: p.category ? p.category.replace("_", " ") : 'Unknown',
    interest: `${p.minInterestRate || 0}% - ${p.maxInterestRate || 0}%`,
    amount: p.minAmount && p.maxAmount
      ? `₹${(p.minAmount / 100000).toFixed(1)}L - ₹${(p.maxAmount / 10000000).toFixed(1)}Cr`
      : 'Amount not set',
    tenure: p.minTenureMonths && p.maxTenureMonths
      ? `${p.minTenureMonths / 12}-${p.maxTenureMonths / 12} yrs`
      : 'Tenure not set',
    fee: `${p.processingFee || 0}%`,
    status: "active",
    type: p.secured ? "Secured" : "Unsecured",
    applicants: 0,
    created: p.createdAt || new Date().toISOString(),
    original: p // Store original data for view modal
  }));

  const filteredProducts = mappedProducts.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      selectedStatus === "all" || p.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setShowViewModal(true);
  };

  const deleteProduct = (id) => {
    if (!window.confirm("Delete this product?")) return;

    deleteMutation.mutate(id, {
      onError: () => {
        alert("Delete failed");
      }
    });
  };

  const getStatusColor = (status) => {
    return status === 'active' ? 'text-green-600 bg-green-50 border-green-200' : 'text-red-600 bg-red-50 border-red-200';
  };

  const getCategoryColor = (category) => {
    const colors = {
      'PERSONAL LOAN': 'bg-blue-50 text-blue-700',
      'VEHICLE LOAN': 'bg-purple-50 text-purple-700',
      'HOME LOAN': 'bg-orange-50 text-orange-700',
      'EDUCATION LOAN': 'bg-teal-50 text-teal-700',
      'BUSINESS LOAN': 'bg-indigo-50 text-indigo-700',
      'GOLD LOAN': 'bg-yellow-50 text-yellow-700'
    };
    return colors[category] || 'bg-gray-50 text-gray-700';
  };



  // Calculate stats
  const activeProductsCount = products.filter(p => p.status === 'active').length;
  const totalProducts = products.length;
  const activeRate = totalProducts > 0 ? Math.round((activeProductsCount / totalProducts) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Loan Products</h1>
            <p className="text-gray-600 mt-1">Manage and configure loan products</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center text-sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
            <button
              onClick={() => setShowAddLoanPopup(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center text-sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Products', value: totalProducts, icon: IndianRupee, color: 'bg-blue-500' },
            { label: 'Active Products', value: activeProductsCount, icon: CheckCircle, color: 'bg-green-500' },
            { label: 'Total Applicants', value: 0, icon: Users, color: 'bg-purple-500' },
            { label: 'Avg Interest Rate', value: '9.8%', icon: Percent, color: 'bg-orange-500' }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color.replace('bg-', 'bg-').replace('500', '100')}`}>
                  <stat.icon className={`w-5 h-5 ${stat.color.replace('bg-', 'text-')}`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by product name or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex gap-3">
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none pl-4 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Categories</option>
                {categories.filter(c => c !== 'all').map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="appearance-none pl-4 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center"
            >
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Loan Type</label>
                <div className="flex gap-2">
                  {['All', 'Secured', 'Unsecured'].map(type => (
                    <button
                      key={type}
                      className="px-3 py-2 text-sm border rounded-lg hover:bg-gray-50"
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Interest Rate</label>
                <div className="flex items-center gap-2">
                  <input type="number" placeholder="Min" className="w-24 px-3 py-2 border rounded-lg" />
                  <span className="text-gray-500">to</span>
                  <input type="number" placeholder="Max" className="w-24 px-3 py-2 border rounded-lg" />
                  <span className="text-gray-500">%</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Created Date</label>
                <input type="date" className="w-full px-3 py-2 border rounded-lg" />
              </div>
            </div>
          </div>
        )}
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading loan products...</p>
        </div>
      ) : (
        <>
          {/* Products Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getCategoryColor(product.category)}`}>
                        {product.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(product.status)}`}>
                        {product.status}
                      </span>
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg">
                        <MoreVertical className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Percent className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-600">Interest Rate</span>
                      </div>
                      <span className="font-semibold">{product.interest}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <IndianRupee className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-600">Loan Amount</span>
                      </div>
                      <span className="font-semibold">{product.amount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-600">Tenure</span>
                      </div>
                      <span className="font-semibold">{product.tenure}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Tag className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-600">Processing Fee</span>
                      </div>
                      <span className="font-semibold">{product.fee}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">{product.applicants} applicants</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewProduct(product)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setEditProduct(product.original)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                        title="Edit Product"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
              <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {search || selectedCategory !== 'all' || selectedStatus !== 'all'
                  ? "No products found"
                  : "No loan products available"}
              </h3>
              <p className="text-gray-600 mb-6">
                {search || selectedCategory !== 'all' || selectedStatus !== 'all'
                  ? "Try adjusting your search or filter criteria"
                  : "Add your first loan product to get started"}
              </p>
              {!search && selectedCategory === 'all' && selectedStatus === 'all' ? (
                <button
                  onClick={() => setShowAddLoanPopup(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add First Product
                </button>
              ) : (
                <button
                  onClick={() => {
                    setSearch('');
                    setSelectedCategory('all');
                    setSelectedStatus('all');
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </>
      )}

      {/* Quick Stats Footer */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Product Performance</h4>
            <p className="text-sm text-gray-600">Showing {filteredProducts.length} of {totalProducts} products</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{activeRate}%</div>
              <div className="text-sm text-gray-500">Active Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">0</div>
              <div className="text-sm text-gray-500">Total Applications</div>
            </div>
            <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
              View Analytics
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      {(showAddLoanPopup || editProduct) && (
        <AddLoanTypes
          editData={editProduct}
          onClose={() => {
            setShowAddLoanPopup(false);
            setEditProduct(null);
            refetch();
          }}
        />
      )}

      {showViewModal && selectedProduct && (
        <ProductViewModal
          product={selectedProduct}
          onClose={() => {
            setShowViewModal(false);
            setSelectedProduct(null);
          }}
        />
      )}
    </div>
  );
};

export default LoanProduct;