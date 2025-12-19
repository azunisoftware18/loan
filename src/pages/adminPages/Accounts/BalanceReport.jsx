import React, { useState } from 'react';
import {
  FileText,
  Briefcase,
  Users,
  Handshake,
  Download,
  Filter,
  Search,
  IndianRupee,
  PieChart,
  Eye,
  MoreVertical,
  Calendar,
  RefreshCw,
  Edit,
  Trash2,
  Printer,
  Share2,
  Copy,
  CheckCircle,
} from 'lucide-react';

function BalanceReport() {
  const [activeSection, setActiveSection] = useState('cases-balance-loan');
  const [actionMenuOpen, setActionMenuOpen] = useState(null);

  // Sample data for Cases Balance Loan
  const casesBalanceLoanData = [
    { id: 1, caseNo: 'CASE-001', loanAmount: 500000, paidAmount: 300000, balance: 200000, status: 'Active', customer: 'Rajesh Kumar' },
    { id: 2, caseNo: 'CASE-002', loanAmount: 750000, paidAmount: 600000, balance: 150000, status: 'Active', customer: 'Priya Sharma' },
    { id: 3, caseNo: 'CASE-003', loanAmount: 300000, paidAmount: 300000, balance: 0, status: 'Closed', customer: 'Amit Patel' },
    { id: 4, caseNo: 'CASE-004', loanAmount: 1000000, paidAmount: 400000, balance: 600000, status: 'Active', customer: 'Sneha Singh' },
  ];

  // Sample data for Cases Balance
  const casesBalanceData = [
    { id: 1, caseNo: 'C-1001', openingBalance: 150000, additions: 50000, deductions: 30000, closingBalance: 170000 },
    { id: 2, caseNo: 'C-1002', openingBalance: 250000, additions: 75000, deductions: 100000, closingBalance: 225000 },
    { id: 3, caseNo: 'C-1003', openingBalance: 100000, additions: 20000, deductions: 50000, closingBalance: 70000 },
    { id: 4, caseNo: 'C-1004', openingBalance: 500000, additions: 150000, deductions: 200000, closingBalance: 450000 },
  ];

  // Sample data for Staff Balance
  const staffBalanceData = [
    { id: 1, staffId: 'EMP-001', name: 'Anil Sharma', salary: 45000, advance: 15000, balance: 30000, department: 'Sales' },
    { id: 2, staffId: 'EMP-002', name: 'Sunita Verma', salary: 38000, advance: 20000, balance: 18000, department: 'Operations' },
    { id: 3, staffId: 'EMP-003', name: 'Rohit Mehta', salary: 52000, advance: 10000, balance: 42000, department: 'Finance' },
    { id: 4, staffId: 'EMP-004', name: 'Pooja Reddy', salary: 41000, advance: 25000, balance: 16000, department: 'HR' },
  ];

  // Sample data for Partner Balance
  const partnerBalanceData = [
    { id: 1, partnerId: 'P-001', partnerName: 'ABC Enterprises', totalInvestment: 5000000, sharePercentage: 40, balance: 2000000 },
    { id: 2, partnerId: 'P-002', partnerName: 'XYZ Corporation', totalInvestment: 3000000, sharePercentage: 25, balance: 1500000 },
    { id: 3, partnerId: 'P-003', partnerName: 'Global Traders', totalInvestment: 2000000, sharePercentage: 15, balance: 800000 },
    { id: 4, partnerId: 'P-004', partnerName: 'Prime Solutions', totalInvestment: 4000000, sharePercentage: 20, balance: 1200000 },
  ];

  // Summary Statistics
 

  const getStatusBadge = (status) => {
    const colors = {
      'Active': 'bg-green-100 text-green-800',
      'Closed': 'bg-gray-100 text-gray-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Overdue': 'bg-red-100 text-red-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Action Menu Component
  const ActionMenu = ({ item, section }) => (
    <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
      <div className="py-1">
        <button 
          onClick={() => {
            console.log(`View ${section} details:`, item.id);
            setActionMenuOpen(null);
          }}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-blue-700 hover:bg-blue-50"
        >
          <Eye className="w-4 h-4" />
          View Details
        </button>
        <button 
          onClick={() => {
            console.log(`Edit ${section}:`, item.id);
            setActionMenuOpen(null);
          }}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-green-700 hover:bg-green-50"
        >
          <Edit className="w-4 h-4" />
          Edit
        </button>
        <button 
          onClick={() => {
            console.log(`Download ${section} report:`, item.id);
            setActionMenuOpen(null);
          }}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-purple-700 hover:bg-purple-50"
        >
          <Download className="w-4 h-4" />
          Download Report
        </button>
        
        {section === 'cases-balance-loan' && (
          <button 
            onClick={() => {
              console.log('Print statement:', item.id);
              setActionMenuOpen(null);
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-orange-700 hover:bg-orange-50"
          >
            <Printer className="w-4 h-4" />
            Print Statement
          </button>
        )}
        
        <button 
          onClick={() => {
            console.log(`Share ${section} report:`, item.id);
            setActionMenuOpen(null);
          }}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-cyan-700 hover:bg-cyan-50"
        >
          <Share2 className="w-4 h-4" />
          Share
        </button>
        
        {section === 'cases-balance-loan' && item.status !== 'Closed' && (
          <button 
            onClick={() => {
              console.log('Update loan status:', item.id);
              setActionMenuOpen(null);
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-indigo-700 hover:bg-indigo-50"
          >
            <CheckCircle className="w-4 h-4" />
            Mark as Closed
          </button>
        )}
        
        <div className="border-t border-gray-200 my-1"></div>
        
        <button 
          onClick={() => {
            console.log(`Duplicate ${section}:`, item.id);
            setActionMenuOpen(null);
          }}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
        >
          <Copy className="w-4 h-4" />
          Duplicate
        </button>
        
        <div className="border-t border-gray-200 my-1"></div>
        
        <button 
          onClick={() => {
            if (window.confirm(`Are you sure you want to delete this ${section} record?`)) {
              console.log(`Delete ${section}:`, item.id);
              setActionMenuOpen(null);
            }
          }}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                  <PieChart className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Balance Report</h1>
                  <p className="text-gray-600 mt-1">Comprehensive view of all financial balances</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition shadow-md">
                <Download className="w-5 h-5" />
                Export Full Report
              </button>
              
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Navigation Tabs */}
          <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex flex-wrap">
              <button
                onClick={() => {
                  setActiveSection('cases-balance-loan');
                  setActionMenuOpen(null);
                }}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-all ${activeSection === 'cases-balance-loan' 
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-white' 
                  : 'text-gray-600 hover:text-blue-500 hover:bg-gray-50'}`}
              >
                <Briefcase className="w-5 h-5" />
                Cases Balance Loan
              </button>
              <button
                onClick={() => {
                  setActiveSection('cases-balance');
                  setActionMenuOpen(null);
                }}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-all ${activeSection === 'cases-balance' 
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-white' 
                  : 'text-gray-600 hover:text-blue-500 hover:bg-gray-50'}`}
              >
                <FileText className="w-5 h-5" />
                Cases Balance
              </button>
              <button
                onClick={() => {
                  setActiveSection('staff-balance');
                  setActionMenuOpen(null);
                }}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-all ${activeSection === 'staff-balance' 
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-white' 
                  : 'text-gray-600 hover:text-blue-500 hover:bg-gray-50'}`}
              >
                <Users className="w-5 h-5" />
                Staff Balance
              </button>
              <button
                onClick={() => {
                  setActiveSection('partner-balance');
                  setActionMenuOpen(null);
                }}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-all ${activeSection === 'partner-balance' 
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-white' 
                  : 'text-gray-600 hover:text-blue-500 hover:bg-gray-50'}`}
              >
                <Handshake className="w-5 h-5" />
                Partner Balance
              </button>
            </div>
          </div>

          {/* Controls */}
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1 md:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search reports..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition">
                    <Filter className="w-5 h-5" />
                    Filter
                  </button>
                  <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition">
                    <Calendar className="w-5 h-5" />
                    Date Range
                  </button>
                </div>
              </div>
              <div className="flex gap-3">
                <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white">
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Closed</option>
                  <option>Pending</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section Content */}
          <div className="p-6">
            {/* Cases Balance Loan Section */}
            {activeSection === 'cases-balance-loan' && (
              <div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                      <Briefcase className="w-6 h-6" />
                      Cases Balance Loan Report
                    </h2>
                    <p className="text-gray-600 mt-1">Loan balance details for all active cases</p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                      <Download className="w-4 h-4" />
                      Download Report
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Case No.</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loan Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {casesBalanceLoanData.map((item) => (
                        <tr key={item.id} className="hover:bg-blue-50 transition">
                          <td className="px-6 py-4 whitespace-nowrap font-medium text-blue-600">{item.caseNo}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{item.customer}</td>
                          <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-800">{formatCurrency(item.loanAmount)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-green-600 font-medium">{formatCurrency(item.paidAmount)}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-bold text-lg text-red-600">{formatCurrency(item.balance)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getStatusBadge(item.status)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap relative">
                            <button
                              onClick={() => setActionMenuOpen(actionMenuOpen === item.id ? null : item.id)}
                              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                              title="Actions"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>
                            {actionMenuOpen === item.id && (
                              <ActionMenu item={item} section="cases-balance-loan" />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Summary Card */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="text-sm text-blue-600">Total Loan Amount</div>
                    <div className="text-2xl font-bold text-gray-800 mt-1">{formatCurrency(2550000)}</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="text-sm text-green-600">Total Paid Amount</div>
                    <div className="text-2xl font-bold text-gray-800 mt-1">{formatCurrency(1600000)}</div>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <div className="text-sm text-red-600">Total Outstanding</div>
                    <div className="text-2xl font-bold text-gray-800 mt-1">{formatCurrency(950000)}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Cases Balance Section */}
            {activeSection === 'cases-balance' && (
              <div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                      <FileText className="w-6 h-6" />
                      Cases Balance Report
                    </h2>
                    <p className="text-gray-600 mt-1">Opening and closing balance details for all cases</p>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Case No.</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Opening Balance</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Additions</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deductions</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Closing Balance</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {casesBalanceData.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50 transition">
                          <td className="px-6 py-4 whitespace-nowrap font-medium text-blue-600">{item.caseNo}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(item.openingBalance)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-green-600 font-medium">+{formatCurrency(item.additions)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-red-600 font-medium">-{formatCurrency(item.deductions)}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-bold text-lg text-gray-800">{formatCurrency(item.closingBalance)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap relative">
                            <button
                              onClick={() => setActionMenuOpen(actionMenuOpen === item.id ? null : item.id)}
                              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                              title="Actions"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>
                            {actionMenuOpen === item.id && (
                              <ActionMenu item={item} section="cases-balance" />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Staff Balance Section */}
            {activeSection === 'staff-balance' && (
              <div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                      <Users className="w-6 h-6" />
                      Staff Balance Report
                    </h2>
                    <p className="text-gray-600 mt-1">Salary, advance and balance details for all staff</p>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Advance</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {staffBalanceData.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50 transition">
                          <td className="px-6 py-4 whitespace-nowrap font-medium text-purple-600">{item.staffId}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                              {item.department}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-800">{formatCurrency(item.salary)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-yellow-600 font-medium">{formatCurrency(item.advance)}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-bold text-lg text-green-600">{formatCurrency(item.balance)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap relative">
                            <button
                              onClick={() => setActionMenuOpen(actionMenuOpen === item.id ? null : item.id)}
                              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                              title="Actions"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>
                            {actionMenuOpen === item.id && (
                              <ActionMenu item={item} section="staff-balance" />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Partner Balance Section */}
            {activeSection === 'partner-balance' && (
              <div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                      <Handshake className="w-6 h-6" />
                      Partner Balance Report
                    </h2>
                    <p className="text-gray-600 mt-1">Investment and share details for all partners</p>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Partner ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Partner Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Investment</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Share %</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Balance</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {partnerBalanceData.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50 transition">
                          <td className="px-6 py-4 whitespace-nowrap font-medium text-orange-600">{item.partnerId}</td>
                          <td className="px-6 py-4 whitespace-nowrap font-medium">{item.partnerName}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-800">{formatCurrency(item.totalInvestment)}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full font-medium">
                              {item.sharePercentage}%
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-bold text-lg text-green-600">{formatCurrency(item.balance)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap relative">
                            <button
                              onClick={() => setActionMenuOpen(actionMenuOpen === item.id ? null : item.id)}
                              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                              title="Actions"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>
                            {actionMenuOpen === item.id && (
                              <ActionMenu item={item} section="partner-balance" />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-600">
                Showing 4 of {activeSection === 'cases-balance-loan' ? '12' : 
                              activeSection === 'cases-balance' ? '8' :
                              activeSection === 'staff-balance' ? '24' : '8'} records
              </div>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700">
                  Previous
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  1
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700">
                  2
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700">
                  3
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Notes */}
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
          <div className="flex items-start gap-3">
            <IndianRupee className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Note:</span> All amounts are in INR. Reports are updated in real-time. 
                For detailed audit reports, use the export function.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BalanceReport;