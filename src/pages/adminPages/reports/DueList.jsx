import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  Download,
  Filter,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Phone,
  Mail,
  MessageSquare,
  Users,
  Building,
  Briefcase,
  UserCheck,
  FileText,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  PieChart,
  BarChart3,
  MoreVertical,
  RefreshCw,
  Printer,
  Eye,
  Edit,
  Trash2,
  Send,
  Bell,
  Shield,
  Target,
  DollarSign,
  Percent,
  Hash,
  PhoneCall,
  UserPlus,
  Check,
  X,
  CalendarDays,
  ClipboardCheck,
  FileCheck,
  SendToBack
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

const calculateOverdueDays = (dueDate) => {
  const today = new Date();
  const due = new Date(dueDate);
  const diffTime = Math.abs(today - due);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

const getRiskColor = (overdueDays) => {
  if (overdueDays <= 7) return 'bg-green-50 text-green-700 border-green-200';
  if (overdueDays <= 30) return 'bg-yellow-50 text-yellow-700 border-yellow-200';
  if (overdueDays <= 90) return 'bg-orange-50 text-orange-700 border-orange-200';
  return 'bg-red-50 text-red-700 border-red-200';
};

const getRiskLabel = (overdueDays) => {
  if (overdueDays <= 7) return 'Low Risk';
  if (overdueDays <= 30) return 'Medium Risk';
  if (overdueDays <= 90) return 'High Risk';
  return 'Critical Risk';
};

// --- STATUS BADGE COMPONENT ---
const StatusBadge = ({ status }) => {
  const config = {
    'Due': { color: 'bg-blue-50 text-blue-700 border-blue-200', icon: <Clock className="w-3 h-3 mr-1" /> },
    'Overdue': { color: 'bg-red-50 text-red-700 border-red-200', icon: <AlertTriangle className="w-3 h-3 mr-1" /> },
    'Critical': { color: 'bg-purple-50 text-purple-700 border-purple-200', icon: <AlertTriangle className="w-3 h-3 mr-1" /> },
    'Paid': { color: 'bg-green-50 text-green-700 border-green-200', icon: <CheckCircle className="w-3 h-3 mr-1" /> },
    'Settled': { color: 'bg-gray-50 text-gray-700 border-gray-200', icon: <CheckCircle className="w-3 h-3 mr-1" /> },
    'Assigned': { color: 'bg-indigo-50 text-indigo-700 border-indigo-200', icon: <UserCheck className="w-3 h-3 mr-1" /> }
  };

  const { color, icon } = config[status] || config['Due'];

  return (
    <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full border ${color}`}>
      {icon} {status}
    </span>
  );
};

// --- TASK ASSIGNMENT MODAL ---
const TaskAssignmentModal = ({ isOpen, onClose, customer, onAssign }) => {
  const [selectedExecutive, setSelectedExecutive] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [followUpDate, setFollowUpDate] = useState("");
  const [notes, setNotes] = useState("");

  const executives = [
    { id: 1, name: "John Doe", email: "john@loan.com", phone: "+91 98765 43210", currentLoad: 15 },
    { id: 2, name: "Jane Smith", email: "jane@loan.com", phone: "+91 98765 43211", currentLoad: 12 },
    { id: 3, name: "Robert Johnson", email: "robert@loan.com", phone: "+91 98765 43212", currentLoad: 18 },
    { id: 4, name: "Sarah Williams", email: "sarah@loan.com", phone: "+91 98765 43213", currentLoad: 10 },
  ];

  const handleSubmit = () => {
    if (!selectedExecutive) {
      alert("Please select an executive");
      return;
    }

    const task = {
      id: Date.now(),
      customerId: customer.id,
      customerName: customer.customerName,
      loanNumber: customer.loanNumber,
      amount: customer.totalDue,
      assignedTo: selectedExecutive,
      priority: priority,
      followUpDate: followUpDate || new Date().toISOString().split('T')[0],
      notes: notes,
      assignedDate: new Date().toISOString(),
      status: "Pending"
    };

    onAssign(task);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-blue-600" />
                Assign Collection Task
              </h2>
              <p className="text-sm text-gray-500 mt-1">Assign recovery task to collection executive</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Customer Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Customer</p>
                <p className="font-medium text-gray-800">{customer.customerName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Loan Number</p>
                <p className="font-medium text-blue-600">{customer.loanNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Amount Due</p>
                <p className="font-bold text-gray-800">{formatCurrency(customer.totalDue)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Overdue Days</p>
                <p className={`font-medium ${customer.overdueDays > 30 ? 'text-red-600' : 'text-orange-600'}`}>
                  {customer.overdueDays} days
                </p>
              </div>
            </div>
          </div>

          {/* Assignment Form */}
          <div className="space-y-4">
            {/* Executive Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Collection Executive *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {executives.map(exec => (
                  <div
                    key={exec.id}
                    onClick={() => setSelectedExecutive(exec.name)}
                    className={`p-3 border rounded-lg cursor-pointer transition-all ${selectedExecutive === exec.name ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-300'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">{exec.name}</p>
                        <p className="text-sm text-gray-500">{exec.phone}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {exec.currentLoad} tasks
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Priority and Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority Level
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Low">Low Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="High">High Priority</option>
                  <option value="Critical">Critical Priority</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Follow-up Date
                </label>
                <input
                  type="date"
                  value={followUpDate}
                  onChange={(e) => setFollowUpDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add instructions, remarks, or special notes for the executive..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              Assign Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- SUMMARY CARDS ---
const SummaryCards = ({ summaryData }) => {
  const cards = [
    {
      title: "Total Due Amount",
      value: formatCurrency(summaryData.totalDueAmount),
      change: "+12.5%",
      trend: "up",
      icon: <DollarSign className="w-5 h-5" />,
      color: "border-l-blue-500 bg-blue-50",
      iconColor: "text-blue-600"
    },
    {
      title: "Total Accounts",
      value: summaryData.totalAccounts.toLocaleString(),
      change: "+8",
      trend: "up",
      icon: <Users className="w-5 h-5" />,
      color: "border-l-green-500 bg-green-50",
      iconColor: "text-green-600"
    },
    {
      title: "Critical Overdue",
      value: summaryData.criticalOverdue,
      change: "-3",
      trend: "down",
      icon: <AlertTriangle className="w-5 h-5" />,
      color: "border-l-red-500 bg-red-50",
      iconColor: "text-red-600"
    },
    {
      title: "Assigned Tasks",
      value: summaryData.assignedTasks,
      change: "+5 Today",
      trend: "up",
      icon: <ClipboardCheck className="w-5 h-5" />,
      color: "border-l-purple-500 bg-purple-50",
      iconColor: "text-purple-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {cards.map((card, index) => (
        <div key={index} className={`bg-white rounded-xl p-6 border-l-4 ${card.color} shadow-sm hover:shadow-md transition-shadow`}>
          <div className="flex items-center justify-between mb-4">
            <div className={`p-2 rounded-lg ${card.color.replace('border-l-', 'bg-').replace('500', '50')}`}>
              <div className={card.iconColor}>{card.icon}</div>
            </div>
            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
              card.trend === 'up' ? 'bg-green-50 text-green-600' :
              card.trend === 'down' ? 'bg-red-50 text-red-600' :
              'bg-blue-50 text-blue-600'
            }`}>
              {card.change}
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-800 mb-1">{card.value}</p>
          <p className="text-sm text-gray-500">{card.title}</p>
        </div>
      ))}
    </div>
  );
};

// --- FILTER PANEL ---
const FilterPanel = ({ filters, setFilters, onSearch }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const loanTypes = ["All Types", "OD Cases", "Regular Due", "Closed Loans", "Active Loans"];
  const branches = ["All Branches", "Delhi Main", "Mumbai West", "Bangalore South", "Chennai Central"];
  const products = ["All Products", "Personal Loan", "Business Loan", "Home Loan", "Vehicle Loan"];
  const bucketSlabs = ["All Slabs", "0–30 days", "31–60 days", "61–90 days", "90+ days"];
  const executives = ["All Executives", "John Doe", "Jane Smith", "Robert Johnson", "Sarah Williams"];
  const sources = ["All Sources", "Agent", "Direct", "Online Lead", "Partner"];
  const assignmentStatus = ["All", "Assigned", "Unassigned", "Pending"];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-800">Filters</h3>
          <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
            {Object.values(filters).filter(v => v !== 'All' && v !== 'All Types' && v !== 'All Branches' && v !== 'All Products' && v !== 'All Slabs' && v !== 'All Executives' && v !== 'All Sources').length} active
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {loanTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Branch Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Branch</label>
              <select
                value={filters.branch}
                onChange={(e) => handleFilterChange('branch', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {branches.map(branch => (
                  <option key={branch} value={branch}>{branch}</option>
                ))}
              </select>
            </div>

            {/* Product Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product</label>
              <select
                value={filters.product}
                onChange={(e) => handleFilterChange('product', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {products.map(product => (
                  <option key={product} value={product}>{product}</option>
                ))}
              </select>
            </div>

            {/* Bucket Slab Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bucket Slab</label>
              <select
                value={filters.bucketSlab}
                onChange={(e) => handleFilterChange('bucketSlab', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {bucketSlabs.map(slab => (
                  <option key={slab} value={slab}>{slab}</option>
                ))}
              </select>
            </div>

            {/* Collection Executive Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Collection Executive</label>
              <select
                value={filters.executive}
                onChange={(e) => handleFilterChange('executive', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {executives.map(exec => (
                  <option key={exec} value={exec}>{exec}</option>
                ))}
              </select>
            </div>

            {/* Source Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Source Type</label>
              <select
                value={filters.source}
                onChange={(e) => handleFilterChange('source', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {sources.map(source => (
                  <option key={source} value={source}>{source}</option>
                ))}
              </select>
            </div>

            {/* Assignment Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Assignment Status</label>
              <select
                value={filters.assignmentStatus}
                onChange={(e) => handleFilterChange('assignmentStatus', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {assignmentStatus.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            {/* Due Up To Date Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Due Up To</label>
              <input
                type="date"
                value={filters.dueUpTo}
                onChange={(e) => handleFilterChange('dueUpTo', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* With LPI Filter */}
            <div className="flex items-center">
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={filters.withLPI}
                    onChange={(e) => handleFilterChange('withLPI', e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-10 h-6 rounded-full ${filters.withLPI ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                  <div className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-transform ${filters.withLPI ? 'transform translate-x-4 bg-white' : 'bg-white'}`}></div>
                </div>
                <span className="ml-3 text-sm font-medium text-gray-700">With LPI Only</span>
              </label>
            </div>
          </div>

          {/* Search Button */}
          <div className="mt-6 pt-6 border-t border-gray-200 flex justify-end">
            <button
              onClick={onSearch}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 font-medium shadow-sm hover:shadow-md transition-all"
            >
              <Search className="w-4 h-4" />
              Search
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// --- QUICK ACTIONS SIDEBAR ---
const QuickActionsSidebar = ({ recentTasks, onViewAllTasks }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
        <ClipboardCheck className="w-5 h-5 text-blue-600" />
        Recent Task Assignments
      </h3>
      <div className="space-y-3">
        {recentTasks.slice(0, 5).map((task) => (
          <div key={task.id} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-medium text-gray-800">{task.customerName}</p>
                <p className="text-xs text-gray-500">{task.loanNumber}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                task.priority === 'Critical' ? 'bg-red-50 text-red-600' :
                task.priority === 'High' ? 'bg-orange-50 text-orange-600' :
                'bg-blue-50 text-blue-600'
              }`}>
                {task.priority}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">{task.assignedTo}</span>
              <span className="text-gray-500">{formatDate(task.assignedDate)}</span>
            </div>
          </div>
        ))}
        {recentTasks.length === 0 && (
          <div className="text-center py-4 text-gray-400">
            <ClipboardCheck className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No recent task assignments</p>
          </div>
        )}
        <button
          onClick={onViewAllTasks}
          className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2 text-sm"
        >
          <Eye className="w-4 h-4" />
          View All Tasks
        </button>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
export default function DueList() {
  // --- MOCK DATA ---
  const initialDueData = [
    {
      id: "LN1001",
      customerName: "Rahul Sharma",
      loanNumber: "L-2024-001",
      emiAmount: 25000,
      dueDate: "2024-03-10",
      overdueDays: 5,
      lpiAmount: 1250,
      totalDue: 26250,
      branch: "Delhi Main",
      product: "Personal Loan",
      collectionExecutive: "",
      contact: "+91 9876543210",
      status: "Due",
      type: "Regular Due",
      source: "Direct",
      bucketSlab: "0–30 days",
      lastContacted: "2024-03-05",
      assignmentStatus: "Unassigned"
    },
    {
      id: "LN1002",
      customerName: "Priya Patel",
      loanNumber: "L-2024-002",
      emiAmount: 45000,
      dueDate: "2024-02-28",
      overdueDays: 15,
      lpiAmount: 6750,
      totalDue: 51750,
      branch: "Mumbai West",
      product: "Business Loan",
      collectionExecutive: "John Doe",
      contact: "+91 9876543211",
      status: "Overdue",
      type: "OD Cases",
      source: "Agent",
      bucketSlab: "31–60 days",
      lastContacted: "2024-03-01",
      assignmentStatus: "Assigned"
    },
    {
      id: "LN1003",
      customerName: "Amit Verma",
      loanNumber: "L-2024-003",
      emiAmount: 18000,
      dueDate: "2024-01-15",
      overdueDays: 55,
      lpiAmount: 9900,
      totalDue: 27900,
      branch: "Bangalore South",
      product: "Vehicle Loan",
      collectionExecutive: "Jane Smith",
      contact: "+91 9876543212",
      status: "Critical",
      type: "OD Cases",
      source: "Online Lead",
      bucketSlab: "61–90 days",
      lastContacted: "2024-02-20",
      assignmentStatus: "Assigned"
    },
    {
      id: "LN1004",
      customerName: "Sonia Kapoor",
      loanNumber: "L-2024-004",
      emiAmount: 75000,
      dueDate: "2023-11-30",
      overdueDays: 120,
      lpiAmount: 45000,
      totalDue: 120000,
      branch: "Chennai Central",
      product: "Home Loan",
      collectionExecutive: "Robert Johnson",
      contact: "+91 9876543213",
      status: "Critical",
      type: "OD Cases",
      source: "Partner",
      bucketSlab: "90+ days",
      lastContacted: "2024-01-10",
      assignmentStatus: "Assigned"
    },
    {
      id: "LN1005",
      customerName: "Rajesh Kumar",
      loanNumber: "L-2024-005",
      emiAmount: 32000,
      dueDate: "2024-03-15",
      overdueDays: 0,
      lpiAmount: 0,
      totalDue: 32000,
      branch: "Delhi Main",
      product: "Personal Loan",
      collectionExecutive: "",
      contact: "+91 9876543214",
      status: "Due",
      type: "Regular Due",
      source: "Direct",
      bucketSlab: "0–30 days",
      lastContacted: "2024-03-10",
      assignmentStatus: "Unassigned"
    }
  ];

  // --- STATE ---
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: 'overdueDays', direction: 'desc' });
  const [filters, setFilters] = useState({
    type: "All Types",
    branch: "All Branches",
    product: "All Products",
    bucketSlab: "All Slabs",
    executive: "All Executives",
    source: "All Sources",
    dueUpTo: "",
    withLPI: false,
    assignmentStatus: "All"
  });
  const [filteredData, setFilteredData] = useState(initialDueData);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  // --- CALCULATE SUMMARY DATA ---
  const summaryData = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return {
      totalDueAmount: filteredData.reduce((sum, item) => sum + item.totalDue, 0),
      totalAccounts: filteredData.length,
      criticalOverdue: filteredData.filter(item => item.status === 'Critical').length,
      assignedTasks: filteredData.filter(item => item.assignmentStatus === 'Assigned').length
    };
  }, [filteredData]);

  // --- HANDLE TASK ASSIGNMENT ---
  const handleAssignTask = (customer) => {
    setSelectedCustomer(customer);
    setShowAssignmentModal(true);
  };

  const handleTaskAssignment = (task) => {
    // Update the customer record with assignment
    const updatedData = filteredData.map(item => {
      if (item.id === selectedCustomer.id) {
        return {
          ...item,
          collectionExecutive: task.assignedTo,
          assignmentStatus: "Assigned",
          status: "Assigned"
        };
      }
      return item;
    });

    setFilteredData(updatedData);
    setAssignedTasks(prev => [task, ...prev]);
    setShowNotification(true);

    // Hide notification after 3 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  // --- SORTING FUNCTION ---
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // --- FILTER AND SORT DATA ---
  const processedData = useMemo(() => {
    let data = [...filteredData];

    // Apply sorting
    if (sortConfig.key) {
      data.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    // Apply pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return data.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredData, sortConfig, currentPage, itemsPerPage]);

  // --- HANDLE SEARCH ---
  const handleSearch = () => {
    let filtered = initialDueData;

    // Apply filters
    if (filters.type !== "All Types") {
      filtered = filtered.filter(item => item.type === filters.type);
    }
    if (filters.branch !== "All Branches") {
      filtered = filtered.filter(item => item.branch === filters.branch);
    }
    if (filters.product !== "All Products") {
      filtered = filtered.filter(item => item.product === filters.product);
    }
    if (filters.bucketSlab !== "All Slabs") {
      filtered = filtered.filter(item => item.bucketSlab === filters.bucketSlab);
    }
    if (filters.executive !== "All Executives") {
      filtered = filtered.filter(item => item.collectionExecutive === filters.executive);
    }
    if (filters.source !== "All Sources") {
      filtered = filtered.filter(item => item.source === filters.source);
    }
    if (filters.assignmentStatus !== "All") {
      filtered = filtered.filter(item => item.assignmentStatus === filters.assignmentStatus);
    }
    if (filters.dueUpTo) {
      filtered = filtered.filter(item => new Date(item.dueDate) <= new Date(filters.dueUpTo));
    }
    if (filters.withLPI) {
      filtered = filtered.filter(item => item.lpiAmount > 0);
    }
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(item =>
        item.customerName.toLowerCase().includes(term) ||
        item.loanNumber.toLowerCase().includes(term) ||
        item.contact.includes(term)
      );
    }

    setFilteredData(filtered);
    setCurrentPage(1);
  };

  // --- EXPORT FUNCTIONS ---
  const exportToExcel = () => {
    const headers = [
      "Customer Name",
      "Loan Number",
      "EMI Amount",
      "Due Date",
      "Overdue Days",
      "LPI Amount",
      "Total Due",
      "Branch",
      "Product",
      "Collection Executive",
      "Contact",
      "Status",
      "Assignment Status"
    ];

    const rows = filteredData.map(item => [
      item.customerName,
      item.loanNumber,
      item.emiAmount,
      item.dueDate,
      item.overdueDays,
      item.lpiAmount,
      item.totalDue,
      item.branch,
      item.product,
      item.collectionExecutive,
      item.contact,
      item.status,
      item.assignmentStatus
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `due_list_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- RESET FILTERS ---
  const resetFilters = () => {
    setFilters({
      type: "All Types",
      branch: "All Branches",
      product: "All Products",
      bucketSlab: "All Slabs",
      executive: "All Executives",
      source: "All Sources",
      dueUpTo: "",
      withLPI: false,
      assignmentStatus: "All"
    });
    setSearchTerm("");
    setFilteredData(initialDueData);
    setCurrentPage(1);
  };

  // --- INITIAL SEARCH ---
  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6">
      {/* Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2 animate-slide-in">
          <CheckCircle className="w-5 h-5" />
          Task assigned successfully to {selectedCustomer?.collectionExecutive}
        </div>
      )}

      {/* Task Assignment Modal */}
      <TaskAssignmentModal
        isOpen={showAssignmentModal}
        onClose={() => setShowAssignmentModal(false)}
        customer={selectedCustomer}
        onAssign={handleTaskAssignment}
      />

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-red-600 to-red-700 rounded-xl">
                <AlertTriangle className="text-white" size={28} />
              </div>
              <span>Due List Management</span>
            </h1>
            <p className="text-gray-600 mt-2">
              Track overdue loans, assign tasks, and manage collections
            </p>
          </div>

          <div className="flex gap-3 mt-4 md:mt-0">
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors"
            >
              <RefreshCw size={18} />
              Reset
            </button>
            <button
              onClick={exportToExcel}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 transition-colors"
            >
              <Download size={18} />
              Export Excel
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <SummaryCards summaryData={summaryData} />
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Content - Table */}
        <div className="lg:w-2/3">
          {/* Search and Filters */}
          <div className="mb-6">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by customer name, loan number, or contact..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={handleSearch}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 font-medium"
              >
                <Search size={20} />
                Search
              </button>
            </div>

            <FilterPanel
              filters={filters}
              setFilters={setFilters}
              onSearch={handleSearch}
            />
          </div>

          {/* Main Table */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">Due List Records</h2>
                  <p className="text-sm text-gray-500">
                    Showing {processedData.length} of {filteredData.length} records
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-2 md:mt-0">
                  <span className="text-sm text-gray-600">Sorted by: </span>
                  <select
                    value={sortConfig.key}
                    onChange={(e) => requestSort(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded text-sm"
                  >
                    <option value="overdueDays">Overdue Days</option>
                    <option value="totalDue">Total Due</option>
                    <option value="dueDate">Due Date</option>
                    <option value="customerName">Customer Name</option>
                  </select>
                  <span className="text-sm text-gray-600 ml-2">
                    {sortConfig.direction === 'asc' ? '↑ Ascending' : '↓ Descending'}
                  </span>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Customer Name</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Loan Number</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Total Due</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Overdue Days</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Executive</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Status</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {processedData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-900">{item.customerName}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                          <Phone size={12} />
                          {item.contact}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-mono text-sm text-blue-600">{item.loanNumber}</span>
                        <div className="text-xs text-gray-500 mt-1">{item.product}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-gray-900">
                          {formatCurrency(item.totalDue)}
                        </div>
                        <div className="text-xs text-red-500">
                          +{formatCurrency(item.lpiAmount)} LPI
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(item.overdueDays)}`}>
                          {item.overdueDays} days
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {item.collectionExecutive ? (
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium text-blue-600">
                              {item.collectionExecutive.charAt(0)}
                            </div>
                            <span className="text-sm">{item.collectionExecutive}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400 italic">Unassigned</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <StatusBadge status={item.status} />
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          {!item.collectionExecutive ? (
                            <button
                              onClick={() => handleAssignTask(item)}
                              className="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded flex items-center gap-1 text-xs font-medium"
                            >
                              <UserPlus size={14} />
                              Assign
                            </button>
                          ) : (
                            <button
                              onClick={() => handleAssignTask(item)}
                              className="p-1.5 bg-green-50 text-green-600 hover:bg-green-100 rounded flex items-center gap-1 text-xs font-medium"
                            >
                              <Edit size={14} />
                              Reassign
                            </button>
                          )}
                          <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded">
                            <PhoneCall size={16} />
                          </button>
                          <button className="p-1.5 text-purple-600 hover:bg-purple-50 rounded">
                            <Eye size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200 flex flex-col md:flex-row md:items-center justify-between">
              <div className="text-sm text-gray-500 mb-2 md:mb-0">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} entries
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                {[...Array(Math.ceil(filteredData.length / itemsPerPage))].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 border rounded text-sm ${currentPage === i + 1 ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300'}`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(Math.ceil(filteredData.length / itemsPerPage), prev + 1))}
                  disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
                  className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Quick Actions */}
        <div className="lg:w-1/3 space-y-6">
          <QuickActionsSidebar
            recentTasks={assignedTasks}
            onViewAllTasks={() => {
              // Implement view all tasks functionality
              console.log("View all tasks clicked");
            }}
          />

          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              Assignment Stats
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Unassigned Cases</span>
                <span className="font-bold text-red-600">
                  {filteredData.filter(item => !item.collectionExecutive).length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Assigned Today</span>
                <span className="font-bold text-green-600">
                  {assignedTasks.filter(task => 
                    new Date(task.assignedDate).toDateString() === new Date().toDateString()
                  ).length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">High Priority</span>
                <span className="font-bold text-orange-600">
                  {assignedTasks.filter(task => task.priority === 'High' || task.priority === 'Critical').length}
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                // Find first unassigned customer and assign
                const unassigned = filteredData.find(item => !item.collectionExecutive);
                if (unassigned) {
                  handleAssignTask(unassigned);
                } else {
                  alert("All cases are already assigned!");
                }
              }}
              className="w-full mt-4 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 flex items-center justify-center gap-2 font-medium"
            >
              <UserPlus className="w-4 h-4" />
              Quick Assign Next Case
            </button>
          </div>

          {/* Executive Performance */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-6 text-white">
            <h3 className="font-bold text-xl mb-4">Executive Performance</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>John Doe</span>
                <span className="font-bold">₹2,45,000 collected</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Jane Smith</span>
                <span className="font-bold">₹1,89,500 collected</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Robert Johnson</span>
                <span className="font-bold">₹3,12,000 collected</span>
              </div>
              <div className="pt-3 border-t border-blue-500 mt-3">
                <div className="flex items-center gap-2">
                  <TrendingUp size={18} className="text-green-300" />
                  <span className="text-sm">Collection efficiency up by 18% this month</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}