import React, { useState, useMemo } from "react";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Calendar,
  BarChart3,
  PieChart,
  Download,
  Filter,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  MoreVertical,
  RefreshCw,
  Clock,
  CheckCircle,
  AlertCircle,
  Building,
  Briefcase,
  Home,
  Car,
  FileText,
  Target,
  Percent,
  Hash,
  ChevronDown,
  ChevronUp,
  Smartphone,
  Mail,
  PhoneCall,
  MessageSquare,
  Banknote,
  CreditCard
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

const formatNumber = (num) => {
  return new Intl.NumberFormat('en-IN').format(num);
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

// --- PERFORMANCE CARD COMPONENT ---
const PerformanceCard = ({ title, value, change, trend, icon, color }) => {
  return (
    <div className={`bg-white rounded-xl p-6 border-l-4 ${color} shadow-sm hover:shadow-md transition-shadow`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color.replace('border-l-', 'bg-').replace('500', '50')}`}>
          <div className={color.includes('green') ? 'text-green-600' : 
                         color.includes('blue') ? 'text-blue-600' : 
                         color.includes('red') ? 'text-red-600' : 
                         color.includes('purple') ? 'text-purple-600' : 'text-gray-600'}>
            {icon}
          </div>
        </div>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
          trend === 'up' ? 'bg-green-50 text-green-600' :
          trend === 'down' ? 'bg-red-50 text-red-600' :
          'bg-blue-50 text-blue-600'
        }`}>
          {trend === 'up' ? <ArrowUpRight className="inline w-3 h-3 mr-1" /> : 
           trend === 'down' ? <ArrowDownRight className="inline w-3 h-3 mr-1" /> : null}
          {change}
        </span>
      </div>
      <p className="text-2xl font-bold text-gray-800 mb-1">{value}</p>
      <p className="text-sm text-gray-500">{title}</p>
    </div>
  );
};

// --- COMPARISON CHART COMPONENT ---
const ComparisonChart = ({ data }) => {
  const maxValue = Math.max(...data.months.map(m => Math.max(m.disbursed, m.collected)));
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Monthly Comparison</h3>
          <p className="text-sm text-gray-500">Disbursement vs Collection trends</p>
        </div>
        <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
          <option>Last 6 Months</option>
          <option>Last 12 Months</option>
          <option>Quarterly</option>
          <option>Yearly</option>
        </select>
      </div>
      
      <div className="space-y-4">
        {data.months.map((month, index) => {
          const disbursedWidth = (month.disbursed / maxValue) * 100;
          const collectedWidth = (month.collected / maxValue) * 100;
          
          return (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-700">{month.name}</span>
                <div className="flex gap-4">
                  <span className="text-blue-600">{formatCurrency(month.disbursed)}</span>
                  <span className="text-green-600">{formatCurrency(month.collected)}</span>
                </div>
              </div>
              <div className="h-8 flex gap-2">
                <div 
                  className="bg-blue-100 rounded-l-lg relative group"
                  style={{ width: `${disbursedWidth}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-l-lg"></div>
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Disbursed: {formatCurrency(month.disbursed)}
                  </div>
                </div>
                <div 
                  className="bg-green-100 rounded-r-lg relative group"
                  style={{ width: `${collectedWidth}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 rounded-r-lg"></div>
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Collected: {formatCurrency(month.collected)}
                  </div>
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Disbursement</span>
                <span>Collection</span>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-gradient-to-r from-blue-500 to-blue-600"></div>
          <span className="text-sm text-gray-600">Disbursement</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-gradient-to-r from-green-500 to-green-600"></div>
          <span className="text-sm text-gray-600">Collection</span>
        </div>
      </div>
    </div>
  );
};

// --- PRODUCT PERFORMANCE COMPONENT ---
const ProductPerformance = ({ products }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Product Performance</h3>
      <div className="space-y-4">
        {products.map((product, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  product.name === 'Personal Loan' ? 'bg-blue-50 text-blue-600' :
                  product.name === 'Business Loan' ? 'bg-purple-50 text-purple-600' :
                  product.name === 'Home Loan' ? 'bg-green-50 text-green-600' :
                  'bg-orange-50 text-orange-600'
                }`}>
                  {product.name === 'Personal Loan' ? <Briefcase className="w-5 h-5" /> :
                   product.name === 'Business Loan' ? <Building className="w-5 h-5" /> :
                   product.name === 'Home Loan' ? <Home className="w-5 h-5" /> :
                   <Car className="w-5 h-5" />}
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">{product.name}</h4>
                  <p className="text-xs text-gray-500">{product.loans} active loans</p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-gray-800">{formatCurrency(product.disbursed)}</div>
                <div className="text-sm text-green-600">{formatCurrency(product.collected)}</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Collection Ratio</span>
                <span className={`font-medium ${
                  product.ratio >= 80 ? 'text-green-600' :
                  product.ratio >= 60 ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {product.ratio}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    product.ratio >= 80 ? 'bg-green-500' :
                    product.ratio >= 60 ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${product.ratio}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- BRANCH PERFORMANCE COMPONENT ---
const BranchPerformance = ({ branches }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Branch Performance</h3>
          <p className="text-sm text-gray-500">Disbursement vs Collection by branch</p>
        </div>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          View All Branches
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Branch</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Disbursed</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Collected</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Ratio</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Performance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {branches.map((branch, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Building className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">{branch.name}</div>
                      <div className="text-xs text-gray-500">{branch.manager}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="font-medium text-blue-600">{formatCurrency(branch.disbursed)}</div>
                </td>
                <td className="py-3 px-4">
                  <div className="font-medium text-green-600">{formatCurrency(branch.collected)}</div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <span className={`font-bold ${
                      branch.ratio >= 80 ? 'text-green-600' :
                      branch.ratio >= 60 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {branch.ratio}%
                    </span>
                    {branch.ratio >= 80 ? 
                      <ArrowUpRight className="w-4 h-4 text-green-500" /> :
                      branch.ratio >= 60 ?
                      <ArrowUpRight className="w-4 h-4 text-yellow-500" /> :
                      <ArrowDownRight className="w-4 h-4 text-red-500" />
                    }
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    branch.performance === 'Excellent' ? 'bg-green-50 text-green-700' :
                    branch.performance === 'Good' ? 'bg-blue-50 text-blue-700' :
                    branch.performance === 'Average' ? 'bg-yellow-50 text-yellow-700' :
                    'bg-red-50 text-red-700'
                  }`}>
                    {branch.performance}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- RECENT DISBURSEMENTS COMPONENT ---
const RecentDisbursements = ({ disbursements }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Recent Disbursements</h3>
          <p className="text-sm text-gray-500">Latest loan disbursements</p>
        </div>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          View All
        </button>
      </div>
      
      <div className="space-y-4">
        {disbursements.map((disbursement, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="font-medium text-gray-800">{disbursement.customer}</div>
                <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                  <span className="font-mono text-blue-600">{disbursement.loanNumber}</span>
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded">
                    {disbursement.product}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-gray-800">{formatCurrency(disbursement.amount)}</div>
                <div className="text-xs text-gray-500">{formatDate(disbursement.date)}</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 text-gray-600">
                  <Building className="w-3 h-3" />
                  {disbursement.branch}
                </span>
                <span className="flex items-center gap-1 text-gray-600">
                  <Users className="w-3 h-3" />
                  {disbursement.officer}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-1.5 text-green-600 hover:bg-green-50 rounded">
                  <PhoneCall className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- TOP COLLECTORS COMPONENT ---
const TopCollectors = ({ collectors }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Top Collectors</h3>
          <p className="text-sm text-gray-500">Highest performing collection executives</p>
        </div>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          View All
        </button>
      </div>
      
      <div className="space-y-4">
        {collectors.map((collector, index) => (
          <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  {collector.name.charAt(0)}
                </div>
                {index < 3 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center text-xs text-white font-bold">
                    {index + 1}
                  </div>
                )}
              </div>
              <div>
                <div className="font-medium text-gray-800">{collector.name}</div>
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <Building className="w-3 h-3" />
                  {collector.branch} • {collector.assigned} loans
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="font-bold text-gray-800">{formatCurrency(collector.collected)}</div>
              <div className={`text-xs font-medium ${
                collector.performance >= 90 ? 'text-green-600' :
                collector.performance >= 80 ? 'text-blue-600' :
                'text-yellow-600'
              }`}>
                {collector.performance}% efficiency
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
export default function DisbursCollection() {
  // --- MOCK DATA ---
  const [timeRange, setTimeRange] = useState('monthly');
  
  const performanceData = {
    totalDisbursed: 12500000,
    totalCollected: 9500000,
    collectionRatio: 76,
    pendingDisbursements: 15,
    activeLoans: 280,
    averageTicketSize: 425000,
    npaRate: 2.8,
    recoveryRate: 85
  };

  const comparisonData = {
    months: [
      { name: 'Jan', disbursed: 10500000, collected: 8200000 },
      { name: 'Feb', disbursed: 9800000, collected: 7500000 },
      { name: 'Mar', disbursed: 11200000, collected: 8500000 },
      { name: 'Apr', disbursed: 12500000, collected: 9500000 },
      { name: 'May', disbursed: 11800000, collected: 8900000 },
      { name: 'Jun', disbursed: 13500000, collected: 10200000 },
    ]
  };

  const productsData = [
    { name: 'Personal Loan', loans: 125, disbursed: 42500000, collected: 32500000, ratio: 76 },
    { name: 'Business Loan', loans: 68, disbursed: 85000000, collected: 62000000, ratio: 73 },
    { name: 'Home Loan', loans: 45, disbursed: 220000000, collected: 175000000, ratio: 79 },
    { name: 'Vehicle Loan', loans: 42, disbursed: 18500000, collected: 14800000, ratio: 80 }
  ];

  const branchesData = [
    { name: 'Delhi Main', manager: 'Rahul Sharma', disbursed: 45000000, collected: 36000000, ratio: 80, performance: 'Excellent' },
    { name: 'Mumbai West', manager: 'Priya Patel', disbursed: 38000000, collected: 28500000, ratio: 75, performance: 'Good' },
    { name: 'Bangalore South', manager: 'Amit Verma', disbursed: 32000000, collected: 22400000, ratio: 70, performance: 'Average' },
    { name: 'Chennai Central', manager: 'Sonia Kapoor', disbursed: 28000000, collected: 19600000, ratio: 70, performance: 'Average' },
    { name: 'Hyderabad North', manager: 'Rajesh Kumar', disbursed: 22000000, collected: 17600000, ratio: 80, performance: 'Excellent' }
  ];

  const recentDisbursements = [
    { customer: 'Rahul Sharma', loanNumber: 'LN-2024-001', product: 'Personal Loan', amount: 500000, date: '2024-03-15', branch: 'Delhi Main', officer: 'John Doe' },
    { customer: 'Priya Patel', loanNumber: 'LN-2024-002', product: 'Business Loan', amount: 1500000, date: '2024-03-14', branch: 'Mumbai West', officer: 'Jane Smith' },
    { customer: 'Amit Verma', loanNumber: 'LN-2024-003', product: 'Home Loan', amount: 3500000, date: '2024-03-12', branch: 'Bangalore South', officer: 'Robert Johnson' },
    { customer: 'Sonia Kapoor', loanNumber: 'LN-2024-004', product: 'Vehicle Loan', amount: 800000, date: '2024-03-10', branch: 'Chennai Central', officer: 'Sarah Williams' },
    { customer: 'Rajesh Kumar', loanNumber: 'LN-2024-005', product: 'Personal Loan', amount: 600000, date: '2024-03-08', branch: 'Hyderabad North', officer: 'John Doe' }
  ];

  const topCollectors = [
    { name: 'John Doe', branch: 'Delhi Main', assigned: 45, collected: 2850000, performance: 95 },
    { name: 'Jane Smith', branch: 'Mumbai West', assigned: 38, collected: 2450000, performance: 92 },
    { name: 'Robert Johnson', branch: 'Bangalore South', assigned: 42, collected: 2250000, performance: 88 },
    { name: 'Sarah Williams', branch: 'Chennai Central', assigned: 35, collected: 1980000, performance: 85 },
    { name: 'Michael Brown', branch: 'Hyderabad North', assigned: 28, collected: 1650000, performance: 82 }
  ];

  const performanceCards = [
    {
      title: "Total Disbursed",
      value: formatCurrency(performanceData.totalDisbursed),
      change: "+15.2%",
      trend: "up",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "border-l-blue-500"
    },
    {
      title: "Total Collected",
      value: formatCurrency(performanceData.totalCollected),
      change: "+12.8%",
      trend: "up",
      icon: <Banknote className="w-6 h-6" />,
      color: "border-l-green-500"
    },
    {
      title: "Collection Ratio",
      value: `${performanceData.collectionRatio}%`,
      change: "+3.2%",
      trend: "up",
      icon: <Percent className="w-6 h-6" />,
      color: "border-l-purple-500"
    },
    {
      title: "Active Loans",
      value: formatNumber(performanceData.activeLoans),
      change: "+8",
      trend: "up",
      icon: <Users className="w-6 h-6" />,
      color: "border-l-orange-500"
    }
  ];

  const performanceCards2 = [
    {
      title: "Average Ticket Size",
      value: formatCurrency(performanceData.averageTicketSize),
      change: "+5.4%",
      trend: "up",
      icon: <DollarSign className="w-6 h-6" />,
      color: "border-l-indigo-500"
    },
    {
      title: "NPA Rate",
      value: `${performanceData.npaRate}%`,
      change: "-0.3%",
      trend: "down",
      icon: <AlertCircle className="w-6 h-6" />,
      color: "border-l-red-500"
    },
    {
      title: "Recovery Rate",
      value: `${performanceData.recoveryRate}%`,
      change: "+2.1%",
      trend: "up",
      icon: <Target className="w-6 h-6" />,
      color: "border-l-teal-500"
    },
    {
      title: "Pending Disbursements",
      value: performanceData.pendingDisbursements,
      change: "-3",
      trend: "down",
      icon: <Clock className="w-6 h-6" />,
      color: "border-l-yellow-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl">
                <BarChart3 className="text-white" size={28} />
              </div>
              <span>Disbursement vs Collection</span>
            </h1>
            <p className="text-gray-600 mt-2">
              Track loan disbursements, collections, and financial performance
            </p>
          </div>

          <div className="flex gap-3 mt-4 md:mt-0">
            <div className="flex bg-white border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setTimeRange('monthly')}
                className={`px-4 py-2 text-sm font-medium ${timeRange === 'monthly' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                Monthly
              </button>
              <button
                onClick={() => setTimeRange('quarterly')}
                className={`px-4 py-2 text-sm font-medium ${timeRange === 'quarterly' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                Quarterly
              </button>
              <button
                onClick={() => setTimeRange('yearly')}
                className={`px-4 py-2 text-sm font-medium ${timeRange === 'yearly' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                Yearly
              </button>
            </div>
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors">
              <Download size={18} />
              Export
            </button>
          </div>
        </div>

        {/* Performance Cards Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {performanceCards.map((card, index) => (
            <PerformanceCard key={index} {...card} />
          ))}
        </div>

        {/* Performance Cards Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {performanceCards2.map((card, index) => (
            <PerformanceCard key={index} {...card} />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Comparison Chart */}
          <ComparisonChart data={comparisonData} />

          {/* Branch Performance */}
          <BranchPerformance branches={branchesData} />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Product Performance */}
          <ProductPerformance products={productsData} />

          {/* Top Collectors */}
          <TopCollectors collectors={topCollectors} />
        </div>
      </div>

      {/* Recent Disbursements */}
      <div className="mb-6">
        <RecentDisbursements disbursements={recentDisbursements} />
      </div>

      {/* Summary Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Financial Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-white rounded-lg">
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Net Disbursement</p>
                <p className="text-xl font-bold text-gray-800">
                  {formatCurrency(performanceData.totalDisbursed - performanceData.totalCollected)}
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-500">Disbursed minus Collected</p>
          </div>

          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-white rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Growth Rate</p>
                <p className="text-xl font-bold text-gray-800">18.5%</p>
              </div>
            </div>
            <p className="text-xs text-gray-500">YoY Collection Growth</p>
          </div>

          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-white rounded-lg">
                <Target className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Target Achievement</p>
                <p className="text-xl font-bold text-gray-800">94%</p>
              </div>
            </div>
            <p className="text-xs text-gray-500">Against Quarterly Target</p>
          </div>

          <div className="p-4 bg-orange-50 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-white rounded-lg">
                <Calendar className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Next Milestone</p>
                <p className="text-xl font-bold text-gray-800">₹15 Cr</p>
              </div>
            </div>
            <p className="text-xs text-gray-500">Monthly Collection Target</p>
          </div>
        </div>
      </div>
    </div>
  );
}