import React, { useState } from 'react';
import {
  Plus,
  Search,
  Filter,
  X,
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  Edit2,
  Trash2,
  Building2,
  MapPin,
  DollarSign,
  Home,
  Calendar
} from 'lucide-react';
import LegalComplianceModal from '../../../components/admin/modals/LegalComplianceModal';

const LegalCompliance = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [propertyTypeFilter, setPropertyTypeFilter] = useState('all');

  // Mock data for statistics
  const statistics = [
    {
      id: 1,
      label: 'Total Reports',
      value: 156,
      icon: FileText,
      color: 'blue',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      iconColor: 'text-blue-600'
    },
    {
      id: 2,
      label: 'Approved Reports',
      value: 98,
      icon: CheckCircle,
      color: 'green',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      iconColor: 'text-green-600'
    },
    {
      id: 3,
      label: 'Pending Reports',
      value: 42,
      icon: Clock,
      color: 'yellow',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
      iconColor: 'text-yellow-600'
    },
    {
      id: 4,
      label: 'Rejected Reports',
      value: 16,
      icon: XCircle,
      color: 'red',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      iconColor: 'text-red-600'
    }
  ];

  // Mock data for reports table
  const reports = [
    {
      id: 1,
      engineerName: 'John Smith',
      agencyName: 'Prime Properties',
      propertyType: 'Residential',
      city: 'Mumbai',
      marketValue: '₹85,00,000',
      recommendedLtv: '75%',
      constructionStatus: 'Completed',
      qualityOfConstruction: 'Excellent',
      status: 'approved'
    },
    {
      id: 2,
      engineerName: 'Sarah Johnson',
      agencyName: 'City Developers',
      propertyType: 'Commercial',
      city: 'Delhi',
      marketValue: '₹1,25,00,000',
      recommendedLtv: '70%',
      constructionStatus: 'Under Construction',
      qualityOfConstruction: 'Good',
      status: 'pending'
    },
    {
      id: 3,
      engineerName: 'Mike Chen',
      agencyName: 'Metro Realtors',
      propertyType: 'Industrial',
      city: 'Bangalore',
      marketValue: '₹2,50,00,000',
      recommendedLtv: '65%',
      constructionStatus: 'Completed',
      qualityOfConstruction: 'Average',
      status: 'rejected'
    }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      approved: { bg: 'bg-green-100', text: 'text-green-700', label: 'Approved' },
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Pending' },
      rejected: { bg: 'bg-red-100', text: 'text-red-700', label: 'Rejected' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setPropertyTypeFilter('all');
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Legal Compliance</h1>
          <p className="text-sm text-slate-500 mt-1">Manage property legal verification reports</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Legal Report
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statistics.map((stat) => (
          <div
            key={stat.id}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 border border-slate-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
              </div>
              <div className={`p-3 ${stat.bgColor} rounded-lg`}>
                <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by Engineer Name or Property Address"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
            >
              <option value="all">All Status</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {/* Property Type Filter */}
          <div className="flex items-center gap-2">
            <Home className="w-4 h-4 text-slate-400" />
            <select
              value={propertyTypeFilter}
              onChange={(e) => setPropertyTypeFilter(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
            >
              <option value="all">All Properties</option>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="industrial">Industrial</option>
              <option value="land">Land</option>
            </select>
          </div>

          {/* Reset Button */}
          <button
            onClick={resetFilters}
            className="inline-flex items-center px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors duration-200"
          >
            <X className="w-4 h-4 mr-2" />
            Reset
          </button>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Engineer Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Agency Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Property Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">City</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Market Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Recommended LTV</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Construction Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Quality</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {reports.length > 0 ? (
                reports.map((report) => (
                  <tr key={report.id} className="hover:bg-slate-50 transition-colors duration-150">
                    <td className="px-6 py-4 text-sm text-slate-700">{report.engineerName}</td>
                    <td className="px-6 py-4 text-sm text-slate-700">{report.agencyName}</td>
                    <td className="px-6 py-4 text-sm text-slate-700">{report.propertyType}</td>
                    <td className="px-6 py-4 text-sm text-slate-700">{report.city}</td>
                    <td className="px-6 py-4 text-sm text-slate-700">{report.marketValue}</td>
                    <td className="px-6 py-4 text-sm text-slate-700">{report.recommendedLtv}</td>
                    <td className="px-6 py-4 text-sm text-slate-700">{report.constructionStatus}</td>
                    <td className="px-6 py-4 text-sm text-slate-700">{report.qualityOfConstruction}</td>
                    <td className="px-6 py-4">{getStatusBadge(report.status)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-1 hover:bg-slate-100 rounded transition-colors">
                          <Eye className="w-4 h-4 text-slate-500" />
                        </button>
                        <button className="p-1 hover:bg-slate-100 rounded transition-colors">
                          <Edit2 className="w-4 h-4 text-slate-500" />
                        </button>
                        <button className="p-1 hover:bg-slate-100 rounded transition-colors">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <FileText className="w-12 h-12 text-slate-300 mb-3" />
                      <p className="text-slate-500 text-sm">No reports found</p>
                      <p className="text-slate-400 text-xs mt-1">Create your first legal report to get started</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Report Modal */}
      <LegalComplianceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default LegalCompliance;