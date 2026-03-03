import React, { useState, useEffect } from 'react';
import {
  Plus,
  Search,
  Filter,
  X,
  Eye,
  Edit2,
  Trash2,
  Download,
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  FileCheck,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Percent,
  Home,
  Building2,
  ChevronDown,
  Grid,
  List,
  MoreVertical,
  FileText
} from 'lucide-react';
import StatusCard from '../../../components/admin/common/StatusCard';
import ActionMenu from '../../../components/admin/common/ActionMenu';
import SanctionDetailsModal from '../../../components/admin/modals/SanctionDetailsModal';
import CreateSanctionModal from '../../../components/admin/modals/CreateSanctionModal';
import Pagination from '../../../components/admin/common/Pagination'; // Import your Pagination component

const Sanction = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedSanction, setSelectedSanction] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loanTypeFilter, setLoanTypeFilter] = useState('all');
  const [branchFilter, setBranchFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [viewMode, setViewMode] = useState('table');

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
        setViewMode('grid');
      } else {
        setViewMode('table');
      }
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Mock data for statistics
  const statistics = [
    {
      id: 1,
      title: "Total Sanctions",
      value: "1,234",
      icon: FileCheck,
      iconColor: "blue",
      subtext: "+12.5% from last month",
      trend: "up"
    },
    {
      id: 2,
      title: "Sanctioned Loans",
      value: "876",
      icon: CheckCircle,
      iconColor: "green",
      subtext: "71% success rate",
      trend: "up"
    },
    {
      id: 3,
      title: "Pending Sanctions",
      value: "245",
      icon: Clock,
      iconColor: "orange",
      subtext: "Avg. 3 days waiting",
      trend: "neutral"
    },
    {
      id: 4,
      title: "Rejected",
      value: "113",
      icon: XCircle,
      iconColor: "red",
      subtext: "9% rejection rate",
      trend: "down"
    }
  ];

  // Mock data for sanctions
  const sanctions = [
    {
      id: 1,
      loanNumber: 'LN-2024-001',
      applicantName: 'Rajesh Kumar',
      loanType: 'Home Loan',
      requestedAmount: '₹45,00,000',
      sanctionedAmount: '₹42,00,000',
      interestRate: '8.5%',
      tenure: '240 months',
      branch: 'Mumbai Main',
      status: 'sanctioned',
      sanctionDate: '2024-02-15',
      requestedTenure: '240 months',
      requestedInterest: '8.75%',
      emiAmount: '₹36,500',
      processingFee: '₹25,000',
      insuranceAmount: '₹45,000',
      sanctionAuthority: 'Suresh Patel - VP',
      validityDate: '2024-05-15',
      conditions: 'Property valuation to be completed within 30 days',
      remarks: 'Approved with standard terms'
    },
    {
      id: 2,
      loanNumber: 'LN-2024-002',
      applicantName: 'Priya Sharma',
      loanType: 'Personal Loan',
      requestedAmount: '₹15,00,000',
      sanctionedAmount: '₹12,00,000',
      interestRate: '10.5%',
      tenure: '60 months',
      branch: 'Delhi NCR',
      status: 'pending',
      sanctionDate: '2024-02-14',
      requestedTenure: '48 months',
      requestedInterest: '10.25%',
      emiAmount: '₹25,800',
      processingFee: '₹10,000',
      insuranceAmount: '₹18,000',
      sanctionAuthority: 'Pending',
      validityDate: '2024-05-14',
      conditions: 'Income verification pending',
      remarks: 'Under review by credit committee'
    },
    {
      id: 3,
      loanNumber: 'LN-2024-003',
      applicantName: 'Amit Patel',
      loanType: 'Business Loan',
      requestedAmount: '₹75,00,000',
      sanctionedAmount: '₹60,00,000',
      interestRate: '9.75%',
      tenure: '120 months',
      branch: 'Bangalore',
      status: 'conditional',
      sanctionDate: '2024-02-13',
      requestedTenure: '84 months',
      requestedInterest: '9.5%',
      emiAmount: '₹64,500',
      processingFee: '₹45,000',
      insuranceAmount: '₹75,000',
      sanctionAuthority: 'Meera Reddy - AVP',
      validityDate: '2024-05-13',
      conditions: 'Additional collateral required',
      remarks: 'Conditional approval subject to collateral'
    },
    {
      id: 4,
      loanNumber: 'LN-2024-004',
      applicantName: 'Sneha Reddy',
      loanType: 'Home Loan',
      requestedAmount: '₹35,00,000',
      sanctionedAmount: '₹32,00,000',
      interestRate: '8.25%',
      tenure: '180 months',
      branch: 'Hyderabad',
      status: 'rejected',
      sanctionDate: '2024-02-12',
      requestedTenure: '180 months',
      requestedInterest: '8.5%',
      emiAmount: '₹29,500',
      processingFee: '₹20,000',
      insuranceAmount: '₹35,000',
      sanctionAuthority: 'Vikram Singh - Manager',
      validityDate: '2024-05-12',
      conditions: 'N/A',
      remarks: 'Rejected due to low credit score'
    },
    {
      id: 5,
      loanNumber: 'LN-2024-005',
      applicantName: 'Vikram Mehta',
      loanType: 'Car Loan',
      requestedAmount: '₹12,00,000',
      sanctionedAmount: '₹10,50,000',
      interestRate: '9.0%',
      tenure: '84 months',
      branch: 'Pune',
      status: 'sanctioned',
      sanctionDate: '2024-02-11',
      requestedTenure: '72 months',
      requestedInterest: '9.25%',
      emiAmount: '₹16,800',
      processingFee: '₹8,000',
      insuranceAmount: '₹12,000',
      sanctionAuthority: 'Anjali Desai - Manager',
      validityDate: '2024-05-11',
      conditions: 'Vehicle insurance mandatory',
      remarks: 'Approved with standard terms'
    },
    {
      id: 6,
      loanNumber: 'LN-2024-006',
      applicantName: 'Neha Gupta',
      loanType: 'Home Loan',
      requestedAmount: '₹55,00,000',
      sanctionedAmount: '₹50,00,000',
      interestRate: '8.4%',
      tenure: '240 months',
      branch: 'Mumbai Main',
      status: 'sanctioned',
      sanctionDate: '2024-02-10',
      requestedTenure: '240 months',
      requestedInterest: '8.6%',
      emiAmount: '₹43,200',
      processingFee: '₹30,000',
      insuranceAmount: '₹55,000',
      sanctionAuthority: 'Suresh Patel - VP',
      validityDate: '2024-05-10',
      conditions: 'Property valuation to be completed within 30 days',
      remarks: 'Approved with standard terms'
    },
    {
      id: 7,
      loanNumber: 'LN-2024-007',
      applicantName: 'Rahul Verma',
      loanType: 'Business Loan',
      requestedAmount: '₹85,00,000',
      sanctionedAmount: '₹75,00,000',
      interestRate: '9.5%',
      tenure: '120 months',
      branch: 'Delhi NCR',
      status: 'pending',
      sanctionDate: '2024-02-09',
      requestedTenure: '96 months',
      requestedInterest: '9.25%',
      emiAmount: '₹78,500',
      processingFee: '₹50,000',
      insuranceAmount: '₹85,000',
      sanctionAuthority: 'Pending',
      validityDate: '2024-05-09',
      conditions: 'Business financials verification pending',
      remarks: 'Under review'
    },
    {
      id: 8,
      loanNumber: 'LN-2024-008',
      applicantName: 'Pooja Singh',
      loanType: 'Personal Loan',
      requestedAmount: '₹8,00,000',
      sanctionedAmount: '₹6,50,000',
      interestRate: '11.0%',
      tenure: '48 months',
      branch: 'Bangalore',
      status: 'conditional',
      sanctionDate: '2024-02-08',
      requestedTenure: '36 months',
      requestedInterest: '10.75%',
      emiAmount: '₹16,800',
      processingFee: '₹6,000',
      insuranceAmount: '₹8,000',
      sanctionAuthority: 'Meera Reddy - AVP',
      validityDate: '2024-05-08',
      conditions: 'Additional income proof required',
      remarks: 'Conditional approval'
    }
  ];

  // Get unique branches for filter
  const branches = ['all', ...new Set(sanctions.map(s => s.branch))];
  const loanTypes = ['all', 'Home Loan', 'Personal Loan', 'Business Loan', 'Car Loan', 'Education Loan'];

  const getStatusBadge = (status) => {
    const statusConfig = {
      sanctioned: { bg: 'bg-green-100', text: 'text-green-700', label: 'Sanctioned', icon: CheckCircle },
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Pending', icon: Clock },
      conditional: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Conditional', icon: FileCheck },
      rejected: { bg: 'bg-red-100', text: 'text-red-700', label: 'Rejected', icon: XCircle }
    };

    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <Icon className="w-3 h-3" />
        {config.label}
      </span>
    );
  };

  const handleViewDetails = (sanction) => {
    setSelectedSanction(sanction);
    setIsDetailsModalOpen(true);
  };

  const handleEdit = (sanction) => {
    console.log('Edit sanction:', sanction);
    // Add edit logic here
  };

  const handleDelete = (sanction) => {
    console.log('Delete sanction:', sanction);
    // Add delete logic here
  };

  const handleDownloadLetter = (sanction) => {
    console.log('Download sanction letter:', sanction);
    // Add download logic here
  };

  const resetFilters = () => {
    setSearchTerm('');
    setLoanTypeFilter('all');
    setBranchFilter('all');
    setStatusFilter('all');
    setDateFilter('');
    setIsFilterMenuOpen(false);
    setCurrentPage(1);
  };

  // Filter sanctions
  const filteredSanctions = sanctions.filter(sanction => {
    const matchesSearch = searchTerm === '' ||
      sanction.loanNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sanction.applicantName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLoanType = loanTypeFilter === 'all' || sanction.loanType === loanTypeFilter;
    const matchesBranch = branchFilter === 'all' || sanction.branch === branchFilter;
    const matchesStatus = statusFilter === 'all' || sanction.status === statusFilter;
    const matchesDate = !dateFilter || sanction.sanctionDate === dateFilter;

    return matchesSearch && matchesLoanType && matchesBranch && matchesStatus && matchesDate;
  });

  // Pagination
  const totalPages = Math.ceil(filteredSanctions.length / itemsPerPage);
  const paginatedSanctions = filteredSanctions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change from Pagination component
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top of the table/cards
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Mobile card view
  const MobileSanctionCard = ({ sanction }) => (
    <div className="bg-white p-4 rounded-xl border border-slate-200 mb-3 hover:shadow-md transition-all active:bg-slate-50">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-800 text-base truncate">{sanction.applicantName}</h3>
          <p className="text-xs text-slate-500">{sanction.loanNumber}</p>
        </div>
        {getStatusBadge(sanction.status)}
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="bg-slate-50 p-2 rounded-lg">
          <p className="text-xs text-slate-400 mb-1">Loan Type</p>
          <p className="text-sm font-medium text-slate-700 truncate">{sanction.loanType}</p>
        </div>
        <div className="bg-slate-50 p-2 rounded-lg">
          <p className="text-xs text-slate-400 mb-1">Branch</p>
          <p className="text-sm font-medium text-slate-700 truncate">{sanction.branch}</p>
        </div>
        <div className="bg-slate-50 p-2 rounded-lg">
          <p className="text-xs text-slate-400 mb-1">Requested</p>
          <p className="text-sm font-medium text-slate-700">{sanction.requestedAmount}</p>
        </div>
        <div className="bg-slate-50 p-2 rounded-lg">
          <p className="text-xs text-slate-400 mb-1">Sanctioned</p>
          <p className="text-sm font-medium text-slate-700">{sanction.sanctionedAmount}</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <Percent className="w-3 h-3 text-slate-400" />
          <span className="text-xs text-slate-600">{sanction.interestRate}</span>
        </div>
        <ActionMenu
          actions={[
            {
              label: "View Details",
              icon: <Eye className="w-4 h-4" />,
              onClick: () => handleViewDetails(sanction)
            },
            {
              label: "Download Letter",
              icon: <Download className="w-4 h-4" />,
              onClick: () => handleDownloadLetter(sanction)
            },
            {
              label: "Edit",
              icon: <Edit2 className="w-4 h-4" />,
              onClick: () => handleEdit(sanction)
            },
            {
              label: "Delete",
              icon: <Trash2 className="w-4 h-4" />,
              onClick: () => handleDelete(sanction),
              isDanger: true
            }
          ]}
        />
      </div>
    </div>
  );

  // Tablet grid card
  const TabletGridCard = ({ sanction }) => (
    <div className="bg-white p-5 rounded-xl border border-slate-200 hover:shadow-lg transition-all">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-slate-800">{sanction.applicantName}</h3>
          <p className="text-sm text-slate-500">{sanction.loanNumber}</p>
        </div>
        {getStatusBadge(sanction.status)}
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <Home className="w-4 h-4 text-slate-400" />
          <span className="text-slate-600">{sanction.loanType}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Building2 className="w-4 h-4 text-slate-400" />
          <span className="text-slate-600">{sanction.branch}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">Requested:</span>
          <span className="font-medium text-slate-800">{sanction.requestedAmount}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">Sanctioned:</span>
          <span className="font-medium text-slate-800">{sanction.sanctionedAmount}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">Interest:</span>
          <span className="font-medium text-slate-800">{sanction.interestRate}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
        <span className="text-xs text-slate-500">{sanction.sanctionDate}</span>
        <ActionMenu
          actions={[
            {
              label: "View Details",
              icon: <Eye className="w-4 h-4" />,
              onClick: () => handleViewDetails(sanction)
            },
            {
              label: "Download Letter",
              icon: <Download className="w-4 h-4" />,
              onClick: () => handleDownloadLetter(sanction)
            },
            {
              label: "Edit",
              icon: <Edit2 className="w-4 h-4" />,
              onClick: () => handleEdit(sanction)
            },
            {
              label: "Delete",
              icon: <Trash2 className="w-4 h-4" />,
              onClick: () => handleDelete(sanction),
              isDanger: true
            }
          ]}
        />
      </div>
    </div>
  );

  // Tablet list item
  const TabletListItem = ({ sanction }) => (
    <div className="bg-white p-4 rounded-xl border border-slate-200 mb-3 hover:shadow-md transition-all">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-semibold text-slate-800">{sanction.applicantName}</h3>
            {getStatusBadge(sanction.status)}
          </div>
          <p className="text-sm text-slate-500 mb-3">{sanction.loanNumber}</p>

          <div className="grid grid-cols-4 gap-3 text-sm">
            <div>
              <p className="text-xs text-slate-400">Loan Type</p>
              <p className="text-slate-700 font-medium">{sanction.loanType}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Branch</p>
              <p className="text-slate-700">{sanction.branch}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Sanctioned</p>
              <p className="text-slate-700 font-medium">{sanction.sanctionedAmount}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Interest</p>
              <p className="text-slate-700">{sanction.interestRate}</p>
            </div>
          </div>
        </div>
        <div className="ml-4">
          <ActionMenu
            actions={[
              {
                label: "View Details",
                icon: <Eye className="w-4 h-4" />,
                onClick: () => handleViewDetails(sanction)
              },
              {
                label: "Download Letter",
                icon: <Download className="w-4 h-4" />,
                onClick: () => handleDownloadLetter(sanction)
              },
              {
                label: "Edit",
                icon: <Edit2 className="w-4 h-4" />,
                onClick: () => handleEdit(sanction)
              },
              {
                label: "Delete",
                icon: <Trash2 className="w-4 h-4" />,
                onClick: () => handleDelete(sanction),
                isDanger: true
              }
            ]}
          />
        </div>
      </div>
    </div>
  );

  // Tablet compact card
  const TabletCompactCard = ({ sanction }) => (
    <div className="bg-white p-3 rounded-xl border border-slate-200 hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-800 text-sm truncate">{sanction.applicantName}</h3>
          <p className="text-xs text-slate-500 truncate">{sanction.loanNumber}</p>
        </div>
        {getStatusBadge(sanction.status)}
      </div>
      <div className="flex justify-between text-xs mb-2">
        <span className="text-slate-600">{sanction.loanType}</span>
        <span className="font-medium text-slate-800">{sanction.sanctionedAmount}</span>
      </div>
      <div className="flex justify-end">
        <ActionMenu
          actions={[
            {
              label: "View",
              icon: <Eye className="w-4 h-4" />,
              onClick: () => handleViewDetails(sanction)
            },
            {
              label: "Download",
              icon: <Download className="w-4 h-4" />,
              onClick: () => handleDownloadLetter(sanction)
            },
            {
              label: "Edit",
              icon: <Edit2 className="w-4 h-4" />,
              onClick: () => handleEdit(sanction)
            },
            {
              label: "Delete",
              icon: <Trash2 className="w-4 h-4" />,
              onClick: () => handleDelete(sanction),
              isDanger: true
            }
          ]}
        />
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
              Loan Sanction Management
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 sm:mt-2">
              Manage approved loan sanctions and final approval decisions
            </p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center justify-center px-4 sm:px-5 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-200 shadow-sm hover:shadow-md text-xs sm:text-sm font-medium w-full sm:w-auto"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Loan Sanction
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 lg:mb-8">
          {statistics.map((stat) => (
            <div key={stat.id} className="transform transition-all duration-200 hover:scale-105">
              <StatusCard
                title={stat.title}
                value={stat.value}
                subtext={stat.subtext}
                icon={stat.icon}
                iconColor={stat.iconColor}
                trend={stat.trend}
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
                {filteredSanctions.length > 0 && (
                  <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full text-xs">
                    {filteredSanctions.length} results
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
                  placeholder={device.isMobile ? "Search..." : "Search by Loan Number or Applicant Name"}
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
                  value={loanTypeFilter}
                  onChange={(e) => setLoanTypeFilter(e.target.value)}
                  className="w-full sm:w-auto px-3 sm:px-4 py-2.5 sm:py-3 text-sm border border-slate-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                >
                  <option value="all">All Loan Types</option>
                  {loanTypes.filter(t => t !== 'all').map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>

                <select
                  value={branchFilter}
                  onChange={(e) => setBranchFilter(e.target.value)}
                  className="w-full sm:w-auto px-3 sm:px-4 py-2.5 sm:py-3 text-sm border border-slate-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                >
                  {branches.map(branch => (
                    <option key={branch} value={branch}>
                      {branch === 'all' ? 'All Branches' : branch}
                    </option>
                  ))}
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full sm:w-auto px-3 sm:px-4 py-2.5 sm:py-3 text-sm border border-slate-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                >
                  <option value="all">All Status</option>
                  <option value="sanctioned">Sanctioned</option>
                  <option value="pending">Pending</option>
                  <option value="conditional">Conditional</option>
                  <option value="rejected">Rejected</option>
                </select>

                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400 hidden sm:block" />
                  <input
                    type="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="w-full sm:w-auto px-3 sm:px-4 py-2.5 sm:py-3 text-sm border border-slate-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                    placeholder="Select Date"
                  />
                </div>

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
            Showing <span className="font-medium">{paginatedSanctions.length}</span> of{' '}
            <span className="font-medium">{filteredSanctions.length}</span> sanctions
          </p>
          {device.isDesktop && (
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1); // Reset to first page when changing items per page
              }}
              className="px-3 py-1.5 text-sm border border-slate-200 rounded-lg bg-white order-1 sm:order-2 w-full sm:w-auto"
            >
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
              <option value={50}>50 per page</option>
            </select>
          )}
        </div>

        {/* Sanctions Display - Responsive layouts */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Desktop Table View */}
          {device.isDesktop && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 xl:px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Loan Number</th>
                    <th className="px-4 xl:px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Applicant</th>
                    <th className="px-4 xl:px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Loan Type</th>
                    <th className="px-4 xl:px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Requested</th>
                    <th className="px-4 xl:px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Sanctioned</th>
                    <th className="px-4 xl:px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Interest</th>
                    <th className="px-4 xl:px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Tenure</th>
                    <th className="px-4 xl:px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Branch</th>
                    <th className="px-4 xl:px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 xl:px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                    <th className="px-4 xl:px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {paginatedSanctions.length > 0 ? (
                    paginatedSanctions.map((sanction) => (
                      <tr key={sanction.id} className="hover:bg-slate-50 transition-colors duration-150">
                        <td className="px-4 xl:px-6 py-4">
                          <div className="text-sm font-medium text-slate-800">{sanction.loanNumber}</div>
                          <div className="text-xs text-slate-400">ID: {sanction.id}</div>
                        </td>
                        <td className="px-4 xl:px-6 py-4 text-sm text-slate-600">{sanction.applicantName}</td>
                        <td className="px-4 xl:px-6 py-4 text-sm text-slate-600">{sanction.loanType}</td>
                        <td className="px-4 xl:px-6 py-4 text-sm text-slate-600">{sanction.requestedAmount}</td>
                        <td className="px-4 xl:px-6 py-4 text-sm font-medium text-slate-800">{sanction.sanctionedAmount}</td>
                        <td className="px-4 xl:px-6 py-4 text-sm text-slate-600">{sanction.interestRate}</td>
                        <td className="px-4 xl:px-6 py-4 text-sm text-slate-600">{sanction.tenure}</td>
                        <td className="px-4 xl:px-6 py-4 text-sm text-slate-600">{sanction.branch}</td>
                        <td className="px-4 xl:px-6 py-4">{getStatusBadge(sanction.status)}</td>
                        <td className="px-4 xl:px-6 py-4 text-sm text-slate-600">{sanction.sanctionDate}</td>
                        <td className="px-4 xl:px-6 py-4">
                          <ActionMenu
                            actions={[
                              {
                                label: "View Details",
                                icon: <Eye className="w-4 h-4" />,
                                onClick: () => handleViewDetails(sanction)
                              },
                              {
                                label: "Download Letter",
                                icon: <Download className="w-4 h-4" />,
                                onClick: () => handleDownloadLetter(sanction)
                              },
                              {
                                label: "Edit",
                                icon: <Edit2 className="w-4 h-4" />,
                                onClick: () => handleEdit(sanction)
                              },
                              {
                                label: "Delete",
                                icon: <Trash2 className="w-4 h-4" />,
                                onClick: () => handleDelete(sanction),
                                isDanger: true
                              }
                            ]}
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="11" className="px-6 py-16 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <FileText className="w-16 h-16 text-slate-300 mb-4" />
                          <p className="text-slate-500 text-lg font-medium">No sanctions found</p>
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
              {paginatedSanctions.length > 0 ? (
                <>
                  {viewMode === 'grid' && (
                    <div className="grid grid-cols-2 gap-4">
                      {paginatedSanctions.map((sanction) => (
                        <TabletGridCard key={sanction.id} sanction={sanction} />
                      ))}
                    </div>
                  )}
                  {viewMode === 'list' && (
                    <div className="space-y-3">
                      {paginatedSanctions.map((sanction) => (
                        <TabletListItem key={sanction.id} sanction={sanction} />
                      ))}
                    </div>
                  )}
                  {viewMode === 'compact' && (
                    <div className="grid grid-cols-3 gap-3">
                      {paginatedSanctions.map((sanction) => (
                        <TabletCompactCard key={sanction.id} sanction={sanction} />
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <FileText className="w-16 h-16 text-slate-300 mb-4" />
                  <p className="text-slate-500 text-lg font-medium">No sanctions found</p>
                  <p className="text-slate-400 text-sm mt-2">Try adjusting your search or filters</p>
                </div>
              )}
            </div>
          )}

          {/* Mobile View */}
          {device.isMobile && (
            <div className="p-3">
              {paginatedSanctions.length > 0 ? (
                paginatedSanctions.map((sanction) => (
                  <MobileSanctionCard key={sanction.id} sanction={sanction} />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <FileText className="w-16 h-16 text-slate-300 mb-4" />
                  <p className="text-slate-500 text-base font-medium">No sanctions found</p>
                  <p className="text-slate-400 text-xs mt-2">Try adjusting your search or filters</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Pagination - Using your custom Pagination component */}
        {filteredSanctions.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            containerClassName="mt-6"
            buttonClassName="px-3 py-1.5 text-sm border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            activeButtonClassName="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            showPrevNext={true}
            prevLabel="← Prev"
            nextLabel="Next →"
            maxVisiblePages={device.isMobile ? 3 : 7}
            showEllipsis={true}
          />
        )}
      </div>

      {/* Modals */}
      <CreateSanctionModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      {selectedSanction && (
        <SanctionDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={() => {
            setIsDetailsModalOpen(false);
            setSelectedSanction(null);
          }}
          sanction={selectedSanction}
        />
      )}
    </div>
  );
};

export default Sanction;