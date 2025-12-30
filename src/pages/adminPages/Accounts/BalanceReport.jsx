import React, { useState, useMemo, useEffect } from 'react';
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
import ExportButton from '../../../components/admin/AdminButtons/ExportButton';
import ActionMenu from '../../../components/admin/AdminButtons/ActionMenu';
import Pagination from '../../../components/admin/common/Pagination';

function BalanceReport() {
  const [activeSection, setActiveSection] = useState('cases-balance-loan');
  const [searchTerm, setSearchTerm] = useState('');
  
  // -------- PAGINATION STATE --------
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Sample data states (with more data)
  const [casesBalanceLoanData, setCasesBalanceLoanData] = useState([
    { id: 1, caseNo: 'CASE-001', loanAmount: 500000, paidAmount: 300000, balance: 200000, status: 'Active', customer: 'Rajesh Kumar' },
    { id: 2, caseNo: 'CASE-002', loanAmount: 750000, paidAmount: 600000, balance: 150000, status: 'Active', customer: 'Priya Sharma' },
    { id: 3, caseNo: 'CASE-003', loanAmount: 300000, paidAmount: 300000, balance: 0, status: 'Closed', customer: 'Amit Patel' },
    { id: 4, caseNo: 'CASE-004', loanAmount: 1000000, paidAmount: 400000, balance: 600000, status: 'Active', customer: 'Sneha Singh' },
    { id: 5, caseNo: 'CASE-005', loanAmount: 450000, paidAmount: 250000, balance: 200000, status: 'Active', customer: 'Rohan Mehta' },
    { id: 6, caseNo: 'CASE-006', loanAmount: 800000, paidAmount: 700000, balance: 100000, status: 'Active', customer: 'Neha Gupta' },
    { id: 7, caseNo: 'CASE-007', loanAmount: 600000, paidAmount: 600000, balance: 0, status: 'Closed', customer: 'Vikram Singh' },
    { id: 8, caseNo: 'CASE-008', loanAmount: 1200000, paidAmount: 800000, balance: 400000, status: 'Active', customer: 'Anjali Desai' },
    { id: 9, caseNo: 'CASE-009', loanAmount: 350000, paidAmount: 150000, balance: 200000, status: 'Active', customer: 'Ravi Verma' },
    { id: 10, caseNo: 'CASE-010', loanAmount: 900000, paidAmount: 600000, balance: 300000, status: 'Pending', customer: 'Suman Tiwari' },
    { id: 11, caseNo: 'CASE-011', loanAmount: 550000, paidAmount: 300000, balance: 250000, status: 'Active', customer: 'Karan Malhotra' },
    { id: 12, caseNo: 'CASE-012', loanAmount: 700000, paidAmount: 500000, balance: 200000, status: 'Active', customer: 'Pooja Reddy' },
  ]);

  const [casesBalanceData, setCasesBalanceData] = useState([
    { id: 1, caseNo: 'C-1001', openingBalance: 150000, additions: 50000, deductions: 30000, closingBalance: 170000 },
    { id: 2, caseNo: 'C-1002', openingBalance: 250000, additions: 75000, deductions: 100000, closingBalance: 225000 },
    { id: 3, caseNo: 'C-1003', openingBalance: 100000, additions: 20000, deductions: 50000, closingBalance: 70000 },
    { id: 4, caseNo: 'C-1004', openingBalance: 500000, additions: 150000, deductions: 200000, closingBalance: 450000 },
    { id: 5, caseNo: 'C-1005', openingBalance: 180000, additions: 45000, deductions: 60000, closingBalance: 165000 },
    { id: 6, caseNo: 'C-1006', openingBalance: 320000, additions: 80000, deductions: 120000, closingBalance: 280000 },
    { id: 7, caseNo: 'C-1007', openingBalance: 75000, additions: 25000, deductions: 30000, closingBalance: 70000 },
    { id: 8, caseNo: 'C-1008', openingBalance: 420000, additions: 100000, deductions: 180000, closingBalance: 340000 },
    { id: 9, caseNo: 'C-1009', openingBalance: 280000, additions: 70000, deductions: 90000, closingBalance: 260000 },
    { id: 10, caseNo: 'C-1010', openingBalance: 600000, additions: 200000, deductions: 250000, closingBalance: 550000 },
    { id: 11, caseNo: 'C-1011', openingBalance: 90000, additions: 30000, deductions: 40000, closingBalance: 80000 },
    { id: 12, caseNo: 'C-1012', openingBalance: 350000, additions: 85000, deductions: 135000, closingBalance: 300000 },
  ]);

  const [staffBalanceData, setStaffBalanceData] = useState([
    { id: 1, staffId: 'EMP-001', name: 'Anil Sharma', salary: 45000, advance: 15000, balance: 30000, department: 'Sales' },
    { id: 2, staffId: 'EMP-002', name: 'Sunita Verma', salary: 38000, advance: 20000, balance: 18000, department: 'Operations' },
    { id: 3, staffId: 'EMP-003', name: 'Rohit Mehta', salary: 52000, advance: 10000, balance: 42000, department: 'Finance' },
    { id: 4, staffId: 'EMP-004', name: 'Pooja Reddy', salary: 41000, advance: 25000, balance: 16000, department: 'HR' },
    { id: 5, staffId: 'EMP-005', name: 'Rajesh Kumar', salary: 48000, advance: 18000, balance: 30000, department: 'Marketing' },
    { id: 6, staffId: 'EMP-006', name: 'Meera Singh', salary: 55000, advance: 12000, balance: 43000, department: 'IT' },
    { id: 7, staffId: 'EMP-007', name: 'Vikram Joshi', salary: 62000, advance: 22000, balance: 40000, department: 'Finance' },
    { id: 8, staffId: 'EMP-008', name: 'Anjali Desai', salary: 39000, advance: 14000, balance: 25000, department: 'Operations' },
    { id: 9, staffId: 'EMP-009', name: 'Suman Tiwari', salary: 46000, advance: 19000, balance: 27000, department: 'Sales' },
    { id: 10, staffId: 'EMP-010', name: 'Karan Malhotra', salary: 51000, advance: 8000, balance: 43000, department: 'IT' },
    { id: 11, staffId: 'EMP-011', name: 'Ravi Verma', salary: 44000, advance: 16000, balance: 28000, department: 'Marketing' },
    { id: 12, staffId: 'EMP-012', name: 'Priya Singh', salary: 57000, advance: 21000, balance: 36000, department: 'HR' },
  ]);

  const [partnerBalanceData, setPartnerBalanceData] = useState([
    { id: 1, partnerId: 'P-001', partnerName: 'ABC Enterprises', totalInvestment: 5000000, sharePercentage: 40, balance: 2000000 },
    { id: 2, partnerId: 'P-002', partnerName: 'XYZ Corporation', totalInvestment: 3000000, sharePercentage: 25, balance: 1500000 },
    { id: 3, partnerId: 'P-003', partnerName: 'Global Traders', totalInvestment: 2000000, sharePercentage: 15, balance: 800000 },
    { id: 4, partnerId: 'P-004', partnerName: 'Prime Solutions', totalInvestment: 4000000, sharePercentage: 20, balance: 1200000 },
    { id: 5, partnerId: 'P-005', partnerName: 'Future Holdings', totalInvestment: 6000000, sharePercentage: 30, balance: 2500000 },
    { id: 6, partnerId: 'P-006', partnerName: 'Tech Innovators', totalInvestment: 3500000, sharePercentage: 22, balance: 1400000 },
    { id: 7, partnerId: 'P-007', partnerName: 'Sunrise Group', totalInvestment: 2800000, sharePercentage: 18, balance: 900000 },
    { id: 8, partnerId: 'P-008', partnerName: 'Metro Industries', totalInvestment: 4500000, sharePercentage: 28, balance: 1800000 },
    { id: 9, partnerId: 'P-009', partnerName: 'Ocean Enterprises', totalInvestment: 3200000, sharePercentage: 20, balance: 1100000 },
    { id: 10, partnerId: 'P-010', partnerName: 'Alpha Partners', totalInvestment: 5500000, sharePercentage: 35, balance: 2300000 },
    { id: 11, partnerId: 'P-011', partnerName: 'Beta Ventures', totalInvestment: 2700000, sharePercentage: 17, balance: 850000 },
    { id: 12, partnerId: 'P-012', partnerName: 'Gamma Holdings', totalInvestment: 4800000, sharePercentage: 32, balance: 1900000 },
  ]);

  // ============== FILTERED DATA ==============
  const getFilteredData = () => {
    const allData = {
      'cases-balance-loan': casesBalanceLoanData,
      'cases-balance': casesBalanceData,
      'staff-balance': staffBalanceData,
      'partner-balance': partnerBalanceData,
    };

    const data = allData[activeSection] || [];
    
    if (!searchTerm.trim()) return data;
    
    return data.filter(item => {
      return Object.values(item).some(value => 
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  };

  const filteredData = getFilteredData();

  // -------- PAGINATION CALCULATIONS --------
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  // Reset to page 1 when section or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeSection, searchTerm]);

  // ============== COMMON FUNCTIONS ==============
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusBadge = (status) => {
    const colors = {
      'Active': 'bg-green-100 text-green-800 border-green-200',
      'Closed': 'bg-gray-100 text-gray-800 border-gray-200',
      'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Overdue': 'bg-red-100 text-red-800 border-red-200'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${colors[status] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
        {status}
      </span>
    );
  };

  // ============== TAB-SPECIFIC FUNCTIONS ==============
  // [Previous handler functions remain the same...]

  // ============== EXPORT FUNCTIONS ==============
  const handleExportData = () => {
    let dataToExport = [];
    let fileName = '';

    switch(activeSection) {
      case 'cases-balance-loan':
        dataToExport = filteredData;
        fileName = 'Cases_Balance_Loan_Report';
        break;
      case 'cases-balance':
        dataToExport = filteredData;
        fileName = 'Cases_Balance_Report';
        break;
      case 'staff-balance':
        dataToExport = filteredData;
        fileName = 'Staff_Balance_Report';
        break;
      case 'partner-balance':
        dataToExport = filteredData;
        fileName = 'Partner_Balance_Report';
        break;
      default:
        dataToExport = [];
    }

    // Create CSV content
    const headers = Object.keys(dataToExport[0] || {});
    const csvContent = [
      headers.join(','),
      ...dataToExport.map(row => 
        headers.map(header => 
          JSON.stringify(row[header] || '')
        ).join(',')
      )
    ].join('\n');

    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Handler functions (same as before, not showing all to save space)
  const handleViewLoanCase = (item) => alert(`Viewing case: ${item.caseNo}`);
  const handleEditLoanCase = (item) => alert(`Editing case: ${item.caseNo}`);
  const handleMarkAsClosed = (item) => {
    setCasesBalanceLoanData(prev =>
      prev.map(caseItem =>
        caseItem.id === item.id
          ? { ...caseItem, status: 'Closed' }
          : caseItem
      )
    );
  };
  const handleDeleteLoanCase = (id) => {
    if (window.confirm('Are you sure?')) {
      setCasesBalanceLoanData(prev => prev.filter(item => item.id !== id));
    }
  };
  // ... other handler functions

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6 lg:p-10">
      
      {/* Header Section - Loan Entry page की तरह */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Balance Report</h1>
          <p className="text-gray-500 mt-1">Comprehensive view of all financial balances</p>
        </div>
        <div className="flex gap-3">
          <ExportButton
            label="Export"
            onClick={handleExportData}
          />
        </div>
      </div>

      {/* Main Content Area - Loan Entry page की तरह */}
      <div className="bg-white shadow-sm rounded-2xl border border-gray-200 h-[520px] relative">
        <div className="p-6">
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {activeSection === 'cases-balance-loan' ? 'Cases Balance Loan' :
                 activeSection === 'cases-balance' ? 'Cases Balance' :
                 activeSection === 'staff-balance' ? 'Staff Balance' : 'Partner Balance'}
              </h2>
              <p className="text-sm text-gray-500">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredData.length)} of {filteredData.length} records
              </p>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search reports..."
                  className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* Section Tabs in compact form */}
              <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
                {[
                  { id: 'cases-balance-loan', label: 'Loan', icon: Briefcase },
                  { id: 'cases-balance', label: 'Cases', icon: FileText },
                  { id: 'staff-balance', label: 'Staff', icon: Users },
                  { id: 'partner-balance', label: 'Partner', icon: Handshake },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveSection(tab.id);
                      setSearchTerm('');
                    }}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                      activeSection === tab.id
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Table with fixed height for pagination */}
          <div className="h-[340px] overflow-y-auto overflow-x-auto rounded-xl border border-gray-100">
            {activeSection === 'cases-balance-loan' && (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b text-left">
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Case No.</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Loan Amount</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Paid Amount</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Balance</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="p-4 font-medium text-blue-600">{item.caseNo}</td>
                      <td className="p-4">{item.customer}</td>
                      <td className="p-4 font-bold text-gray-800">{formatCurrency(item.loanAmount)}</td>
                      <td className="p-4 text-green-600 font-medium">{formatCurrency(item.paidAmount)}</td>
                      <td className="p-4 font-bold text-lg text-red-600">{formatCurrency(item.balance)}</td>
                      <td className="p-4">{getStatusBadge(item.status)}</td>
                      <td className="p-4 text-right">
                        <ActionMenu
                          items={[
                            { label: "View Details", icon: Eye, onClick: () => handleViewLoanCase(item) },
                            { label: "Edit Case", icon: Edit, onClick: () => handleEditLoanCase(item) },
                            { label: "Mark as Closed", icon: CheckCircle, onClick: () => handleMarkAsClosed(item), disabled: item.status === 'Closed' },
                            { label: "Generate Statement", icon: Printer, onClick: () => alert(`Statement for ${item.caseNo}`) },
                            { label: "Copy Case No", icon: Copy, onClick: () => navigator.clipboard.writeText(item.caseNo) },
                            { label: "────────", disabled: true },
                            { label: "Delete", icon: Trash2, danger: true, onClick: () => handleDeleteLoanCase(item.id) },
                          ]}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeSection === 'cases-balance' && (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b text-left">
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Case No.</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Opening Balance</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Additions</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Deductions</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Closing Balance</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="p-4 font-medium text-blue-600">{item.caseNo}</td>
                      <td className="p-4">{formatCurrency(item.openingBalance)}</td>
                      <td className="p-4 text-green-600 font-medium">+{formatCurrency(item.additions)}</td>
                      <td className="p-4 text-red-600 font-medium">-{formatCurrency(item.deductions)}</td>
                      <td className="p-4 font-bold text-lg text-gray-800">{formatCurrency(item.closingBalance)}</td>
                      <td className="p-4 text-right">
                        <ActionMenu
                          items={[
                            { label: "View Details", icon: Eye, onClick: () => alert(`View ${item.caseNo}`) },
                            { label: "Edit Balance", icon: Edit, onClick: () => alert(`Edit ${item.caseNo}`) },
                            { label: "Add Transaction", icon: CheckCircle, onClick: () => alert(`Add to ${item.caseNo}`) },
                            { label: "Export Details", icon: Download, onClick: () => alert(`Export ${item.caseNo}`) },
                            { label: "────────", disabled: true },
                            { label: "Delete", icon: Trash2, danger: true, onClick: () => {
                              if (window.confirm('Are you sure?')) {
                                setCasesBalanceData(prev => prev.filter(i => i.id !== item.id));
                              }
                            }},
                          ]}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeSection === 'staff-balance' && (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b text-left">
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Staff ID</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Department</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Salary</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Advance</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Balance</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="p-4 font-medium text-purple-600">{item.staffId}</td>
                      <td className="p-4">{item.name}</td>
                      <td className="p-4">
                        <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                          {item.department}
                        </span>
                      </td>
                      <td className="p-4 text-gray-800">{formatCurrency(item.salary)}</td>
                      <td className="p-4 text-yellow-600 font-medium">{formatCurrency(item.advance)}</td>
                      <td className="p-4 font-bold text-lg text-green-600">{formatCurrency(item.balance)}</td>
                      <td className="p-4 text-right">
                        <ActionMenu
                          items={[
                            { label: "View Details", icon: Eye, onClick: () => alert(`View ${item.name}`) },
                            { label: "Edit Staff", icon: Edit, onClick: () => alert(`Edit ${item.name}`) },
                            { label: "Process Salary", icon: CheckCircle, onClick: () => alert(`Process ${item.name}`) },
                            { label: "Add Advance", icon: Handshake, onClick: () => alert(`Advance ${item.name}`) },
                            { label: "Generate Salary Slip", icon: Printer, onClick: () => alert(`Slip for ${item.name}`) },
                            { label: "────────", disabled: true },
                            { label: "Delete", icon: Trash2, danger: true, onClick: () => {
                              if (window.confirm('Are you sure?')) {
                                setStaffBalanceData(prev => prev.filter(i => i.id !== item.id));
                              }
                            }},
                          ]}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeSection === 'partner-balance' && (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b text-left">
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Partner ID</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Partner Name</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Investment</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Share %</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Current Balance</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="p-4 font-medium text-orange-600">{item.partnerId}</td>
                      <td className="p-4 font-medium">{item.partnerName}</td>
                      <td className="p-4 text-gray-800">{formatCurrency(item.totalInvestment)}</td>
                      <td className="p-4">
                        <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full font-medium">
                          {item.sharePercentage}%
                        </span>
                      </td>
                      <td className="p-4 font-bold text-lg text-green-600">{formatCurrency(item.balance)}</td>
                      <td className="p-4 text-right">
                        <ActionMenu
                          items={[
                            { label: "View Details", icon: Eye, onClick: () => alert(`View ${item.partnerName}`) },
                            { label: "Edit Partner", icon: Edit, onClick: () => alert(`Edit ${item.partnerName}`) },
                            { label: "Add Investment", icon: Handshake, onClick: () => alert(`Add to ${item.partnerName}`) },
                            { label: "Withdraw Balance", icon: IndianRupee, onClick: () => alert(`Withdraw from ${item.partnerName}`) },
                            { label: "Generate Report", icon: Printer, onClick: () => alert(`Report for ${item.partnerName}`) },
                            { label: "────────", disabled: true },
                            { label: "Delete", icon: Trash2, danger: true, onClick: () => {
                              if (window.confirm('Are you sure?')) {
                                setPartnerBalanceData(prev => prev.filter(i => i.id !== item.id));
                              }
                            }},
                          ]}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* PAGINATION COMPONENT - Exactly Loan Entry page ki tarah */}
          <div className="absolute bottom-0 left-0 right-0 h-[64px] bg-white border-t border-gray-200 px-6">
            <div className="flex items-center justify-between h-full">
              <p className="text-sm text-gray-500">
                Showing {startIndex + 1}–{Math.min(endIndex, filteredData.length)} of {filteredData.length}
              </p>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                containerClassName="justify-end"
                buttonClassName="hover:bg-gray-100 transition-colors"
                activeButtonClassName="bg-blue-600 text-white"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Footer Notes */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
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
  );
}

export default BalanceReport;