import React, { useState, useEffect } from 'react';
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
  Home,
  ChevronDown,
  Grid,
  List,
  Download,
  Share2,
  MoreVertical
} from 'lucide-react';
import LegalComplianceModal from '../../../components/admin/modals/LegalComplianceModal';
import ActionMenu from '../../../components/admin/common/ActionMenu';
import LegalComplianceViewModal from '../../../components/admin/modals/LegalComplianceViewModal';
import StatusCard from '../../../components/admin/common/StatusCard';

const LegalCompliance = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [propertyTypeFilter, setPropertyTypeFilter] = useState('all');
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [viewMode, setViewMode] = useState('grid');

  // Device detection
  const [device, setDevice] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: true
  });

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setDevice({
        isMobile: width < 640,
        isTablet: width >= 640 && width < 1024,
        isDesktop: width >= 1024
      });

      // Auto-set view mode based on device
      if (width < 640) {
        setViewMode('cards');
      } else if (width >= 640 && width < 1024) {
        // Keep existing for tablet
      } else {
        setViewMode('table');
      }
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const handleView = (report) => {
    setSelectedReport(report);
    setIsViewOpen(true);
  };

  const handleEdit = (report) => {
    console.log('Edit report:', report);
    // Add edit logic here
  };

  const handleDelete = (report) => {
    console.log('Delete report:', report);
    // Add delete logic here
  };

  // Mock data for statistics
  const statistics = [
    {
      id: 1,
      title: "Total Reports",
      value: "156",
      icon: FileText,
      iconColor: "blue",
      subtext: "+12 this month",
      trend: "up"
    },
    {
      id: 2,
      title: "Approved",
      value: "98",
      icon: CheckCircle,
      iconColor: "green",
      subtext: "63% approval rate",
      trend: "up"
    },
    {
      id: 3,
      title: "Pending",
      value: "42",
      icon: Clock,
      iconColor: "orange",
      subtext: "27% pending",
      trend: "neutral"
    },
    {
      id: 4,
      title: "Rejected",
      value: "16",
      icon: XCircle,
      iconColor: "red",
      subtext: "10% rejection",
      trend: "down"
    },
  ];

  // Enhanced mock data for reports
  const reports = [
    {
      id: 1,
      engineerName: 'John Smith',
      agencyName: 'Prime Properties',
      propertyType: 'Residential',
      city: 'Mumbai',
      state: 'Maharashtra',
      marketValue: '₹85,00,000',
      recommendedLtv: '75%',
      constructionStatus: 'Completed',
      qualityOfConstruction: 'Excellent',
      status: 'approved',
      address: '15, Marine Drive, South Mumbai',
      pincode: '400001',
      submittedDate: '2024-02-15',
      lastUpdated: '2024-02-16'
    },
    {
      id: 2,
      engineerName: 'Sarah Johnson',
      agencyName: 'City Developers',
      propertyType: 'Commercial',
      city: 'Delhi',
      state: 'Delhi NCR',
      marketValue: '₹1,25,00,000',
      recommendedLtv: '70%',
      constructionStatus: 'Under Construction',
      qualityOfConstruction: 'Good',
      status: 'pending',
      address: 'Cyber City, Sector 24',
      pincode: '122001',
      submittedDate: '2024-02-14',
      lastUpdated: '2024-02-15'
    },
    {
      id: 3,
      engineerName: 'Mike Chen',
      agencyName: 'Metro Realtors',
      propertyType: 'Industrial',
      city: 'Bangalore',
      state: 'Karnataka',
      marketValue: '₹2,50,00,000',
      recommendedLtv: '65%',
      constructionStatus: 'Completed',
      qualityOfConstruction: 'Average',
      status: 'rejected',
      address: 'Whitefield Industrial Area',
      pincode: '560066',
      submittedDate: '2024-02-13',
      lastUpdated: '2024-02-14'
    },
    {
      id: 4,
      engineerName: 'Priya Patel',
      agencyName: 'LegalEagle Associates',
      propertyType: 'Residential',
      city: 'Pune',
      state: 'Maharashtra',
      marketValue: '₹65,00,000',
      recommendedLtv: '80%',
      constructionStatus: 'Completed',
      qualityOfConstruction: 'Good',
      status: 'approved',
      address: 'Koregaon Park',
      pincode: '411001',
      submittedDate: '2024-02-12',
      lastUpdated: '2024-02-13'
    },
    {
      id: 5,
      engineerName: 'Alex Rodriguez',
      agencyName: 'Global Realtors',
      propertyType: 'Commercial',
      city: 'Chennai',
      state: 'Tamil Nadu',
      marketValue: '₹1,80,00,000',
      recommendedLtv: '68%',
      constructionStatus: 'Completed',
      qualityOfConstruction: 'Excellent',
      status: 'approved',
      address: 'OMR, Siruseri',
      pincode: '603103',
      submittedDate: '2024-02-11',
      lastUpdated: '2024-02-12'
    }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      approved: { bg: 'bg-green-100', text: 'text-green-700', label: 'Approved', icon: CheckCircle },
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Pending Review', icon: Clock },
      rejected: { bg: 'bg-red-100', text: 'text-red-700', label: 'Rejected', icon: XCircle }
    };

    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <Icon className="w-3 h-3" />
        {config.label}
      </span>
    );
  };

  const getQualityBadge = (quality) => {
    const qualityConfig = {
      Excellent: 'bg-green-100 text-green-700',
      Good: 'bg-blue-100 text-blue-700',
      Average: 'bg-yellow-100 text-yellow-700',
      Poor: 'bg-red-100 text-red-700'
    };

    return (
      <span className={`px-2 py-1 text-xs rounded-full ${qualityConfig[quality] || 'bg-gray-100 text-gray-700'}`}>
        {quality}
      </span>
    );
  };

  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setPropertyTypeFilter('all');
    setIsFilterMenuOpen(false);
    setCurrentPage(1);
  };

  // Filter reports
  const filteredReports = reports.filter(report => {
    const matchesSearch = searchTerm === '' ||
      report.engineerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.agencyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.address.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    const matchesPropertyType = propertyTypeFilter === 'all' ||
      report.propertyType.toLowerCase() === propertyTypeFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesPropertyType;
  });

  // Pagination
  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const paginatedReports = filteredReports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Mobile card view
  const MobileReportCard = ({ report }) => (
    <div className="bg-white p-4 rounded-xl border border-slate-200 mb-3 hover:shadow-md transition-all duration-200 active:bg-slate-50">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-800 text-base truncate">{report.engineerName}</h3>
          <p className="text-xs text-slate-500 truncate">{report.agencyName}</p>
        </div>
        {getStatusBadge(report.status)}
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="bg-slate-50 p-2 rounded-lg">
          <p className="text-xs text-slate-400 mb-1">Property</p>
          <p className="text-sm font-medium text-slate-700 truncate">{report.propertyType}</p>
        </div>
        <div className="bg-slate-50 p-2 rounded-lg">
          <p className="text-xs text-slate-400 mb-1">Location</p>
          <p className="text-sm font-medium text-slate-700 truncate">{report.city}</p>
        </div>
        <div className="bg-slate-50 p-2 rounded-lg">
          <p className="text-xs text-slate-400 mb-1">Value</p>
          <p className="text-sm font-medium text-slate-700">{report.marketValue}</p>
        </div>
        <div className="bg-slate-50 p-2 rounded-lg">
          <p className="text-xs text-slate-400 mb-1">LTV</p>
          <p className="text-sm font-medium text-slate-700">{report.recommendedLtv}</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs px-2 py-1 bg-slate-100 rounded-full text-slate-600">
            {report.constructionStatus}
          </span>
          {getQualityBadge(report.qualityOfConstruction)}
        </div>
        <ActionMenu
          actions={[
            {
              label: "View Details",
              icon: <Eye className="w-4 h-4" />,
              onClick: () => handleView(report),
            },
            {
              label: "Edit Report",
              icon: <Edit2 className="w-4 h-4" />,
              onClick: () => handleEdit(report),
            },
            {
              label: "Download PDF",
              icon: <Download className="w-4 h-4" />,
              onClick: () => console.log("Download", report),
            },
            {
              label: "Share",
              icon: <Share2 className="w-4 h-4" />,
              onClick: () => console.log("Share", report),
            },
            {
              label: "Delete",
              icon: <Trash2 className="w-4 h-4" />,
              onClick: () => handleDelete(report),
              isDanger: true,
            },
          ]}
        />
      </div>
    </div>
  );

  // Tablet compact card
  const TabletCompactCard = ({ report }) => (
    <div className="bg-white p-3 rounded-xl border border-slate-200 hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-slate-800 text-sm truncate">{report.engineerName}</h3>
        {getStatusBadge(report.status)}
      </div>
      <p className="text-xs text-slate-500 mb-2 truncate">{report.agencyName}</p>
      <div className="flex justify-between text-xs">
        <span className="text-slate-600">{report.propertyType}</span>
        <span className="font-medium text-slate-800">{report.marketValue}</span>
      </div>
    </div>
  );

  // Tablet grid card
  const TabletGridCard = ({ report }) => (
    <div className="bg-white p-5 rounded-xl border border-slate-200 hover:shadow-lg transition-all duration-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-slate-800">{report.engineerName}</h3>
          <p className="text-sm text-slate-500">{report.agencyName}</p>
        </div>
        {getStatusBadge(report.status)}
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <Home className="w-4 h-4 text-slate-400" />
          <span className="text-slate-600">{report.propertyType}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-slate-600">{report.city}, {report.state}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">Market Value:</span>
          <span className="font-medium text-slate-800">{report.marketValue}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">LTV:</span>
          <span className="font-medium text-slate-800">{report.recommendedLtv}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
        <div className="flex items-center gap-2">
          {getQualityBadge(report.qualityOfConstruction)}
        </div>
        <ActionMenu
          actions={[
            { label: "View", icon: <Eye className="w-4 h-4" />, onClick: () => handleView(report) },
            { label: "Edit", icon: <Edit2 className="w-4 h-4" />, onClick: () => handleEdit(report) },
            { label: "Delete", icon: <Trash2 className="w-4 h-4" />, onClick: () => handleDelete(report), isDanger: true },
          ]}
        />
      </div>
    </div>
  );

  // Tablet list item
  const TabletListItem = ({ report }) => (
    <div className="bg-white p-4 rounded-xl border border-slate-200 mb-3 hover:shadow-md transition-all">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-semibold text-slate-800">{report.engineerName}</h3>
            {getStatusBadge(report.status)}
          </div>
          <p className="text-sm text-slate-500 mb-3">{report.agencyName}</p>

          <div className="grid grid-cols-4 gap-3 text-sm">
            <div>
              <p className="text-xs text-slate-400">Property</p>
              <p className="text-slate-700 font-medium">{report.propertyType}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Location</p>
              <p className="text-slate-700">{report.city}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Value</p>
              <p className="text-slate-700 font-medium">{report.marketValue}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Quality</p>
              <div>{getQualityBadge(report.qualityOfConstruction)}</div>
            </div>
          </div>
        </div>
        <ActionMenu
          actions={[
            { label: "View", icon: <Eye className="w-4 h-4" />, onClick: () => handleView(report) },
            { label: "Edit", icon: <Edit2 className="w-4 h-4" />, onClick: () => handleEdit(report) },
            { label: "Delete", icon: <Trash2 className="w-4 h-4" />, onClick: () => handleDelete(report), isDanger: true },
          ]}
        />
      </div>
    </div>
  );

  // Pagination Component
  const Pagination = () => (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-slate-200 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="text-sm text-slate-700 self-center">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="relative ml-3 inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-slate-700">
            Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
            <span className="font-medium">
              {Math.min(currentPage * itemsPerPage, filteredReports.length)}
            </span>{' '}
            of <span className="font-medium">{filteredReports.length}</span> results
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-slate-400 ring-1 ring-inset ring-slate-300 hover:bg-slate-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                  currentPage === i + 1
                    ? 'z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                    : 'text-slate-900 ring-1 ring-inset ring-slate-300 hover:bg-slate-50 focus:z-20 focus:outline-offset-0'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-slate-400 ring-1 ring-inset ring-slate-300 hover:bg-slate-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Main Content */}
      <div className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 lg:mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800">
              Legal Compliance
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 sm:mt-2">
              Manage and verify property legal compliance reports
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center px-4 sm:px-5 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-200 shadow-sm hover:shadow-md text-xs sm:text-sm font-medium w-full sm:w-auto"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Legal Report
          </button>
        </div>

        {/* Statistics Cards - Responsive Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 lg:mb-8">
          {statistics.map((stat) => (
            <div key={stat.id} className="transform transition-all duration-200 hover:scale-105">
              <StatusCard
                title={stat.title}
                value={stat.value}
                subtext={stat.subtext}
                icon={stat.icon}
                iconColor={stat.iconColor}
              />
            </div>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-slate-200 p-3 sm:p-4 lg:p-5 mb-6 lg:mb-8">
          {/* Mobile/Tablet Filter Toggle */}
          <div className="lg:hidden mb-3">
            <button
              onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
              className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 rounded-lg sm:rounded-xl border border-slate-200"
            >
              <span className="flex items-center gap-2 text-sm font-medium text-slate-600">
                <Filter className="w-4 h-4" />
                Search & Filters
                {filteredReports.length > 0 && (
                  <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full text-xs">
                    {filteredReports.length} results
                  </span>
                )}
              </span>
              <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${isFilterMenuOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-4">
            {/* Search Input */}
            <div className={`${isFilterMenuOpen || device.isDesktop ? 'block' : 'hidden'} lg:block flex-1`}>
              <div className="relative">
                <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder={device.isMobile ? "Search..." : "Search by engineer, agency, or address..."}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 sm:pl-11 pr-4 py-2.5 sm:py-3 text-sm border border-slate-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Filter Controls */}
            <div className={`${isFilterMenuOpen || device.isDesktop ? 'block' : 'hidden'} lg:block`}>
              <div className="flex flex-col sm:flex-row lg:items-center gap-2 sm:gap-3">
                {/* View Mode Toggle for Tablet */}
                {device.isTablet && (
                  <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg order-first sm:order-none">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg transition-all ${
                        viewMode === 'grid' 
                          ? 'bg-white shadow-sm text-blue-600' 
                          : 'text-slate-500 hover:text-slate-700'
                      }`}
                      title="Grid View"
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg transition-all ${
                        viewMode === 'list' 
                          ? 'bg-white shadow-sm text-blue-600' 
                          : 'text-slate-500 hover:text-slate-700'
                      }`}
                      title="List View"
                    >
                      <List className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('compact')}
                      className={`p-2 rounded-lg transition-all ${
                        viewMode === 'compact' 
                          ? 'bg-white shadow-sm text-blue-600' 
                          : 'text-slate-500 hover:text-slate-700'
                      }`}
                      title="Compact View"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full sm:w-auto px-3 sm:px-4 py-2.5 sm:py-3 text-sm border border-slate-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                >
                  <option value="all">All Status</option>
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                  <option value="rejected">Rejected</option>
                </select>

                <select
                  value={propertyTypeFilter}
                  onChange={(e) => setPropertyTypeFilter(e.target.value)}
                  className="w-full sm:w-auto px-3 sm:px-4 py-2.5 sm:py-3 text-sm border border-slate-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                >
                  <option value="all">All Properties</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="industrial">Industrial</option>
                  <option value="land">Land</option>
                </select>

                <button
                  onClick={resetFilters}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-5 py-2.5 sm:py-3 border border-slate-200 rounded-lg sm:rounded-xl hover:bg-slate-50 transition-colors duration-200 text-sm font-medium text-slate-600"
                >
                  <X className="w-4 h-4 mr-2" />
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results count and items per page */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <p className="text-xs sm:text-sm text-slate-500 order-2 sm:order-1">
            Showing <span className="font-medium">{paginatedReports.length}</span> of{' '}
            <span className="font-medium">{filteredReports.length}</span> reports
          </p>
          {device.isDesktop && (
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="px-3 py-1.5 text-sm border border-slate-200 rounded-lg bg-white order-1 sm:order-2 w-full sm:w-auto"
            >
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
              <option value={50}>50 per page</option>
            </select>
          )}
        </div>

        {/* Reports Section - Responsive layouts */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Desktop Table View */}
          {device.isDesktop && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 xl:px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Engineer</th>
                    <th className="px-4 xl:px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Agency</th>
                    <th className="px-4 xl:px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Property</th>
                    <th className="px-4 xl:px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Location</th>
                    <th className="px-4 xl:px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Value</th>
                    <th className="px-4 xl:px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">LTV</th>
                    <th className="px-4 xl:px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Construction</th>
                    <th className="px-4 xl:px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Quality</th>
                    <th className="px-4 xl:px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 xl:px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {paginatedReports.length > 0 ? (
                    paginatedReports.map((report) => (
                      <tr key={report.id} className="hover:bg-slate-50 transition-colors duration-150">
                        <td className="px-4 xl:px-6 py-4">
                          <div className="text-sm font-medium text-slate-800">{report.engineerName}</div>
                          <div className="text-xs text-slate-400">ID: {report.id}</div>
                        </td>
                        <td className="px-4 xl:px-6 py-4 text-sm text-slate-600">{report.agencyName}</td>
                        <td className="px-4 xl:px-6 py-4 text-sm text-slate-600">{report.propertyType}</td>
                        <td className="px-4 xl:px-6 py-4">
                          <div className="text-sm text-slate-600">{report.city}</div>
                          <div className="text-xs text-slate-400">{report.state}</div>
                        </td>
                        <td className="px-4 xl:px-6 py-4 text-sm font-medium text-slate-800">{report.marketValue}</td>
                        <td className="px-4 xl:px-6 py-4 text-sm text-slate-600">{report.recommendedLtv}</td>
                        <td className="px-4 xl:px-6 py-4 text-sm text-slate-600">{report.constructionStatus}</td>
                        <td className="px-4 xl:px-6 py-4">
                          {getQualityBadge(report.qualityOfConstruction)}
                        </td>
                        <td className="px-4 xl:px-6 py-4">{getStatusBadge(report.status)}</td>
                        <td className="px-4 xl:px-6 py-4">
                          <ActionMenu
                            actions={[
                              { label: "View", icon: <Eye className="w-4 h-4" />, onClick: () => handleView(report) },
                              { label: "Edit", icon: <Edit2 className="w-4 h-4" />, onClick: () => handleEdit(report) },
                              { label: "Delete", icon: <Trash2 className="w-4 h-4" />, onClick: () => handleDelete(report), isDanger: true },
                            ]}
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="10" className="px-6 py-16 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <FileText className="w-16 h-16 text-slate-300 mb-4" />
                          <p className="text-slate-500 text-lg font-medium">No reports found</p>
                          <p className="text-slate-400 text-sm mt-2">Try adjusting your search or filters</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Tablet View */}
          {device.isTablet && (
            <div className="p-4">
              {paginatedReports.length > 0 ? (
                <>
                  {viewMode === 'grid' && (
                    <div className="grid grid-cols-2 gap-4">
                      {paginatedReports.map((report) => (
                        <TabletGridCard key={report.id} report={report} />
                      ))}
                    </div>
                  )}
                  {viewMode === 'list' && (
                    <div className="space-y-3">
                      {paginatedReports.map((report) => (
                        <TabletListItem key={report.id} report={report} />
                      ))}
                    </div>
                  )}
                  {viewMode === 'compact' && (
                    <div className="grid grid-cols-3 gap-3">
                      {paginatedReports.map((report) => (
                        <TabletCompactCard key={report.id} report={report} />
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <FileText className="w-16 h-16 text-slate-300 mb-4" />
                  <p className="text-slate-500 text-lg font-medium">No reports found</p>
                  <p className="text-slate-400 text-sm mt-2">Try adjusting your search or filters</p>
                </div>
              )}
            </div>
          )}

          {/* Mobile View */}
          {device.isMobile && (
            <div className="p-3">
              {paginatedReports.length > 0 ? (
                paginatedReports.map((report) => (
                  <MobileReportCard key={report.id} report={report} />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <FileText className="w-16 h-16 text-slate-300 mb-4" />
                  <p className="text-slate-500 text-base font-medium">No reports found</p>
                  <p className="text-slate-400 text-xs mt-2">Try adjusting your search or filters</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredReports.length > 0 && <Pagination />}
      </div>

      {/* Modals */}
      <LegalComplianceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <LegalComplianceViewModal
        isOpen={isViewOpen}
        report={selectedReport}
        onClose={() => setIsViewOpen(false)}
      />
    </div>
  );
};

// Chevron Icons
const ChevronLeft = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const ChevronRight = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

export default LegalCompliance;