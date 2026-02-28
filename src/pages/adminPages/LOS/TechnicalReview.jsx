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
  Building2,
  MapPin,
  ChevronDown,
  Calendar,
  DollarSign,
  Grid,
  List,
  Download,
  Share2,
  MoreVertical
} from 'lucide-react';
import TechnicalReportModal from '../../../components/admin/modals/TechnicalReportModal';
import TechnicalReportDetailsModal from '../../../components/admin/modals/TechnicalReportDetailsModal';
import StatusCard from '../../../components/admin/common/StatusCard';
import ActionMenu from '../../../components/admin/common/ActionMenu';

const TechnicalReview = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [propertyTypeFilter, setPropertyTypeFilter] = useState('all');
  const [constructionStatusFilter, setConstructionStatusFilter] = useState('all');
  const [cityFilter, setCityFilter] = useState('all');
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Device detection with proper cleanup
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640);
      setIsTablet(width >= 640 && width < 1024);
      setIsDesktop(width >= 1024);
      
      // Auto-switch view mode based on device
      if (width < 640) {
        setViewMode('cards');
      } else if (width >= 640 && width < 1024) {
        // Keep existing view mode for tablet
      } else {
        setViewMode('table');
      }
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const getReportActions = (report) => [
    {
      label: "View Details",
      icon: <Eye className="w-4 h-4" />,
      onClick: () => handleViewDetails(report),
    },
    {
      label: "Edit Report",
      icon: <Edit2 className="w-4 h-4" />,
      onClick: () => console.log("Edit", report),
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
      onClick: () => console.log("Delete", report),
      isDanger: true,
    },
  ];

  // Mock data for statistics with more realistic values
  const statistics = [
    {
      id: 1,
      title: "Total Reports",
      value: "234",
      icon: FileText,
      iconColor: "blue",
      subtext: "+12.5% from last month",
      trend: "up",
    },
    {
      id: 2,
      title: "Approved",
      value: "156",
      icon: CheckCircle,
      iconColor: "green",
      subtext: "67% approval rate",
      trend: "up",
    },
    {
      id: 3,
      title: "Pending Review",
      value: "48",
      icon: Clock,
      iconColor: "orange",
      subtext: "Avg. 3 days waiting",
      trend: "down",
    },
    {
      id: 4,
      title: "Rejected",
      value: "30",
      icon: XCircle,
      iconColor: "red",
      subtext: "13% rejection rate",
      trend: "down",
    },
  ];

  // Enhanced mock data for reports
  const reports = [
    {
      id: 1,
      engineerName: 'Rajesh Kumar',
      agencyName: 'Valuation Experts Ltd',
      propertyType: 'Residential',
      city: 'Mumbai',
      state: 'Maharashtra',
      marketValue: '₹1,25,00,000',
      recommendedLtv: '75%',
      constructionStatus: 'Completed',
      qualityOfConstruction: 'Excellent',
      status: 'approved',
      address: '15, Marine Drive, South Mumbai',
      pincode: '400001',
      discussionValue: '₹1,20,00,000',
      forcesdSaleValue: '₹1,10,00,000',
      propertyAge: '5',
      residualLife: '55',
      remarks: 'Property is in prime location with excellent construction quality',
      reportUrl: 'https://example.com/report1',
      sitePhotographs: 'https://example.com/photos1',
      submittedDate: '2024-02-15',
      lastUpdated: '2024-02-16'
    },
    {
      id: 2,
      engineerName: 'Priya Sharma',
      agencyName: 'City Valuers',
      propertyType: 'Commercial',
      city: 'Delhi',
      state: 'Delhi NCR',
      marketValue: '₹2,50,00,000',
      recommendedLtv: '70%',
      constructionStatus: 'Under Construction',
      qualityOfConstruction: 'Good',
      status: 'pending',
      address: 'Cyber City, Sector 24',
      pincode: '122001',
      discussionValue: '₹2,40,00,000',
      forcesdSaleValue: '₹2,25,00,000',
      propertyAge: '2',
      residualLife: '48',
      remarks: 'Upcoming commercial hub with good appreciation potential',
      reportUrl: 'https://example.com/report2',
      sitePhotographs: 'https://example.com/photos2',
      submittedDate: '2024-02-14',
      lastUpdated: '2024-02-15'
    },
    {
      id: 3,
      engineerName: 'Amit Patel',
      agencyName: 'Property Assessors Inc',
      propertyType: 'Industrial',
      city: 'Bangalore',
      state: 'Karnataka',
      marketValue: '₹3,75,00,000',
      recommendedLtv: '65%',
      constructionStatus: 'Completed',
      qualityOfConstruction: 'Average',
      status: 'rejected',
      address: 'Whitefield Industrial Area',
      pincode: '560066',
      discussionValue: '₹3,60,00,000',
      forcesdSaleValue: '₹3,40,00,000',
      propertyAge: '8',
      residualLife: '32',
      remarks: 'Located in established industrial zone but requires maintenance',
      reportUrl: 'https://example.com/report3',
      sitePhotographs: 'https://example.com/photos3',
      submittedDate: '2024-02-13',
      lastUpdated: '2024-02-14'
    },
    {
      id: 4,
      engineerName: 'Sneha Reddy',
      agencyName: 'Prime Valuations',
      propertyType: 'Land',
      city: 'Hyderabad',
      state: 'Telangana',
      marketValue: '₹95,00,000',
      recommendedLtv: '60%',
      constructionStatus: 'Not Applicable',
      qualityOfConstruction: 'Good',
      status: 'approved',
      address: 'Financial District, Gachibowli',
      pincode: '500032',
      discussionValue: '₹90,00,000',
      forcesdSaleValue: '₹85,00,000',
      propertyAge: '0',
      residualLife: '99',
      remarks: 'Prime location for commercial development',
      reportUrl: 'https://example.com/report4',
      sitePhotographs: 'https://example.com/photos4',
      submittedDate: '2024-02-12',
      lastUpdated: '2024-02-13'
    },
    {
      id: 5,
      engineerName: 'Vikram Mehta',
      agencyName: 'Accurate Assessors',
      propertyType: 'Residential',
      city: 'Pune',
      state: 'Maharashtra',
      marketValue: '₹85,00,000',
      recommendedLtv: '80%',
      constructionStatus: 'Completed',
      qualityOfConstruction: 'Excellent',
      status: 'pending',
      address: 'Koregaon Park',
      pincode: '411001',
      discussionValue: '₹82,00,000',
      forcesdSaleValue: '₹78,00,000',
      propertyAge: '3',
      residualLife: '67',
      remarks: 'Premium residential area with high demand',
      reportUrl: 'https://example.com/report5',
      sitePhotographs: 'https://example.com/photos5',
      submittedDate: '2024-02-11',
      lastUpdated: '2024-02-12'
    }
  ];

  // Get unique cities for filter
  const cities = ['all', ...new Set(reports.map(r => r.city))];

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

  const handleViewDetails = (report) => {
    setSelectedReport(report);
    setIsDetailsModalOpen(true);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setPropertyTypeFilter('all');
    setConstructionStatusFilter('all');
    setCityFilter('all');
    setIsFilterMenuOpen(false);
  };

  // Filter reports
  const filteredReports = reports.filter(report => {
    const matchesSearch = searchTerm === '' ||
      report.engineerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.agencyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.city.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPropertyType = propertyTypeFilter === 'all' ||
      report.propertyType.toLowerCase() === propertyTypeFilter.toLowerCase();

    const matchesConstructionStatus = constructionStatusFilter === 'all' ||
      report.constructionStatus.replace(' ', '_').toUpperCase() === constructionStatusFilter;

    const matchesCity = cityFilter === 'all' || report.city === cityFilter;

    return matchesSearch && matchesPropertyType && matchesConstructionStatus && matchesCity;
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
        <ActionMenu actions={getReportActions(report)} />
      </div>
    </div>
  );

  // Tablet compact card view
  const TabletCompactCard = ({ report }) => (
    <div className="bg-white p-4 rounded-xl border border-slate-200 hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-semibold text-slate-800">{report.engineerName}</h3>
          <p className="text-xs text-slate-500">{report.agencyName}</p>
        </div>
        {getStatusBadge(report.status)}
      </div>
      
      <div className="flex items-center justify-between text-sm mb-2">
        <span className="text-slate-600">{report.propertyType}</span>
        <span className="font-medium text-slate-800">{report.marketValue}</span>
      </div>
      
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>{report.city}</span>
        <span>{report.constructionStatus}</span>
      </div>
    </div>
  );

  // Tablet grid view
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
          <MapPin className="w-4 h-4 text-slate-400" />
          <span className="text-slate-600">{report.city}, {report.state}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <DollarSign className="w-4 h-4 text-slate-400" />
          <span className="text-slate-600 font-medium">{report.marketValue}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="w-4 h-4 text-slate-400" />
          <span className="text-slate-600">Updated: {report.lastUpdated}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
        <div className="flex items-center gap-2">
          {getQualityBadge(report.qualityOfConstruction)}
        </div>
        <ActionMenu actions={getReportActions(report)} />
      </div>
    </div>
  );

  // Tablet list view
  const TabletListItem = ({ report }) => (
    <div className="bg-white p-4 rounded-xl border border-slate-200 mb-3 hover:shadow-md transition-all duration-200">
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
        
        <ActionMenu actions={getReportActions(report)} />
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
              <span className="sr-only">Previous</span>
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
              <span className="sr-only">Next</span>
              <ChevronRight className="h-5 w-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 lg:mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800">
              Technical Review Management
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 sm:mt-2">
              Manage and review property technical valuation reports
            </p>
          </div>
          
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center justify-center px-4 sm:px-5 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-200 shadow-sm hover:shadow-md text-xs sm:text-sm font-medium w-full sm:w-auto"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Report
          </button>
        </div>

        {/* Statistics Cards - Fully Responsive */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 lg:mb-8">
          {statistics.map((stat) => (
            <div 
              key={stat.id} 
              className="transform transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
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

        {/* Search and Filters - Responsive */}
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
            <div className={`${isFilterMenuOpen || isDesktop ? 'block' : 'hidden'} lg:block flex-1`}>
              <div className="relative">
                <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder={isMobile ? "Search..." : "Search by engineer, agency, or address..."}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 sm:pl-11 pr-4 py-2.5 sm:py-3 text-sm border border-slate-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Filter Controls */}
            <div className={`${isFilterMenuOpen || isDesktop ? 'block' : 'hidden'} lg:block`}>
              <div className="flex flex-col sm:flex-row lg:items-center gap-2 sm:gap-3">
                {/* View Mode Toggle for Tablet */}
                {isTablet && (
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

                <select
                  value={constructionStatusFilter}
                  onChange={(e) => setConstructionStatusFilter(e.target.value)}
                  className="w-full sm:w-auto px-3 sm:px-4 py-2.5 sm:py-3 text-sm border border-slate-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                >
                  <option value="all">All Construction</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="UNDER_CONSTRUCTION">Under Construction</option>
                </select>

                <select
                  value={cityFilter}
                  onChange={(e) => setCityFilter(e.target.value)}
                  className="w-full sm:w-auto px-3 sm:px-4 py-2.5 sm:py-3 text-sm border border-slate-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                >
                  {cities.map(city => (
                    <option key={city} value={city}>
                      {city === 'all' ? 'All Cities' : city}
                    </option>
                  ))}
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
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-slate-500">
            Showing <span className="font-medium">{paginatedReports.length}</span> of{' '}
            <span className="font-medium">{filteredReports.length}</span> reports
          </p>
          {isDesktop && (
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="px-3 py-1.5 text-sm border border-slate-200 rounded-lg bg-white"
            >
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
              <option value={50}>50 per page</option>
            </select>
          )}
        </div>

        {/* Reports Display - Responsive layouts */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Desktop Table View */}
          {isDesktop && (
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
                          <div className="text-xs text-slate-500">ID: {report.id}</div>
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
                          <ActionMenu actions={getReportActions(report)} />
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
          {isTablet && (
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
          {isMobile && (
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

        {/* Modals */}
        <TechnicalReportModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        />

        {selectedReport && (
          <TechnicalReportDetailsModal
            isOpen={isDetailsModalOpen}
            onClose={() => {
              setIsDetailsModalOpen(false);
              setSelectedReport(null);
            }}
            report={selectedReport}
          />
        )}
      </div>
    </div>
  );
};

// Missing Chevron icons
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

export default TechnicalReview;