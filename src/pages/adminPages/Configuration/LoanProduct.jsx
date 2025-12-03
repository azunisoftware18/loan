import React, { useState } from 'react';
import {
  Plus, Search, Filter, Edit, Trash2, Eye,
  DollarSign, Percent, Calendar, Users,
  TrendingUp, Shield, FileText, CheckCircle, XCircle,
  Download, MoreVertical, Tag, Clock, ChevronDown
} from 'lucide-react';

const LoanProduct = () => {
  const [products, setProducts] = useState([
    {
      id: 1, name: 'Home Loan', interest: '8.4% - 9.2%',
      amount: '₹10L - ₹5Cr', tenure: '5-20 yrs',
      fee: '0.5% - 1%', status: 'active',
      category: 'Property', applicants: 245,
      created: '2024-01-15', type: 'Secured'
    },
    {
      id: 2, name: 'Personal Loan', interest: '10.5% - 15%',
      amount: '₹50K - ₹15L', tenure: '1-5 yrs',
      fee: '1.5% - 2%', status: 'active',
      category: 'Unsecured', applicants: 189,
      created: '2024-01-10', type: 'Unsecured'
    },
    {
      id: 3, name: 'Car Loan', interest: '7.9% - 8.5%',
      amount: '₹3L - ₹50L', tenure: '1-7 yrs',
      fee: '1%', status: 'inactive',
      category: 'Vehicle', applicants: 92,
      created: '2024-01-05', type: 'Secured'
    },
    {
      id: 4, name: 'Business Loan', interest: '9.5% - 12%',
      amount: '₹5L - ₹2Cr', tenure: '1-10 yrs',
      fee: '1.5% - 2.5%', status: 'active',
      category: 'Business', applicants: 156,
      created: '2024-01-12', type: 'Secured'
    }
  ]);

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['all', 'Property', 'Unsecured', 'Vehicle', 'Business'];
  const statuses = ['all', 'active', 'inactive'];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || p.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const deleteProduct = (id) => {
    if (window.confirm('Delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const getStatusColor = (status) => {
    return status === 'active' ? 'text-green-600 bg-green-50 border-green-200' : 'text-red-600 bg-red-50 border-red-200';
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Property': 'bg-blue-50 text-blue-700',
      'Unsecured': 'bg-purple-50 text-purple-700',
      'Vehicle': 'bg-orange-50 text-orange-700',
      'Business': 'bg-teal-50 text-teal-700'
    };
    return colors[category] || 'bg-gray-50 text-gray-700';
  };

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
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center text-sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </button>
          </div>
        </div>

        {/* Stats Cards - Redesigned */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Products', value: products.length, icon: DollarSign, color: 'bg-blue-500' },
            { label: 'Active Products', value: products.filter(p => p.status === 'active').length, icon: CheckCircle, color: 'bg-green-500' },
            { label: 'Total Applicants', value: products.reduce((sum, p) => sum + p.applicants, 0), icon: Users, color: 'bg-purple-500' },
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

      {/* Search and Filters - Redesigned */}
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

      {/* Products Grid - Redesigned */}
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
                    <DollarSign className="w-4 h-4 text-gray-400 mr-2" />
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
                    onClick={() => deleteProduct(product.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                    <Eye className="w-4 h-4" />
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
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
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
        </div>
      )}

      {/* Quick Stats Footer */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Product Performance</h4>
            <p className="text-sm text-gray-600">Showing {filteredProducts.length} of {products.length} products</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {Math.round((products.filter(p => p.status === 'active').length / products.length) * 100)}%
              </div>
              <div className="text-sm text-gray-500">Active Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {products.reduce((sum, p) => sum + p.applicants, 0)}
              </div>
              <div className="text-sm text-gray-500">Total Applications</div>
            </div>
            <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
              View Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanProduct;