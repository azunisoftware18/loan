import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Eye, 
  Edit, 
  Trash2, 
  Download,
  ChevronDown,
  ChevronUp,
  Plus
} from 'lucide-react';

function LoansTable({ loansData = [], onAddNewLoan }) {
  const [sortField, setSortField] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loans, setLoans] = useState([]);

  // Initialize loans with provided data or sample data
  useEffect(() => {
    if (loansData && loansData.length > 0) {
      setLoans(loansData);
    } else {
      // Fallback sample data
      setLoans([
        { 
          id: 'LN-2023-001', 
          borrower: 'Amit Sharma', 
          amount: '₹50,000', 
          type: 'Personal Loan', 
          status: 'Active', 
          interestRate: '12.5%',
          disbursedDate: '15 Oct 2024',
          tenure: '36 months',
          emi: '₹1,675',
          nextDue: '15 Nov 2024'
        },
        { 
          id: 'LN-2023-002', 
          borrower: 'Priya Singh', 
          amount: '₹2,00,000', 
          type: 'Home Loan', 
          status: 'Active', 
          interestRate: '8.2%',
          disbursedDate: '10 Oct 2024',
          tenure: '240 months',
          emi: '₹16,782',
          nextDue: '10 Nov 2024'
        },
        { 
          id: 'LN-2023-003', 
          borrower: 'Rahul Verma', 
          amount: '₹25,000', 
          type: 'Emergency Loan', 
          status: 'Pending', 
          interestRate: '15.0%',
          disbursedDate: '12 Oct 2024',
          tenure: '12 months',
          emi: '₹2,256',
          nextDue: '12 Nov 2024'
        },
        { 
          id: 'LN-2023-004', 
          borrower: 'Sneha Gupta', 
          amount: '₹1,50,000', 
          type: 'Business Loan', 
          status: 'Closed', 
          interestRate: '11.8%',
          disbursedDate: '05 Sep 2024',
          tenure: '60 months',
          emi: '₹3,325',
          nextDue: 'N/A'
        },
        { 
          id: 'LN-2023-005', 
          borrower: 'Vikram Malhotra', 
          amount: '₹80,000', 
          type: 'Personal Loan', 
          status: 'Overdue', 
          interestRate: '13.2%',
          disbursedDate: '20 Sep 2024',
          tenure: '24 months',
          emi: '₹3,812',
          nextDue: '20 Oct 2024'
        },
        { 
          id: 'LN-2023-006', 
          borrower: 'Anjali Patel', 
          amount: '₹3,00,000', 
          type: 'Education Loan', 
          status: 'Active', 
          interestRate: '9.5%',
          disbursedDate: '01 Oct 2024',
          tenure: '84 months',
          emi: '₹4,856',
          nextDue: '01 Nov 2024'
        },
      ]);
    }
  }, [loansData]);

  // Theme configuration
  const theme = {
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
    },
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
    },
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
    },
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
    },
    gray: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return `bg-green-100 text-green-800 border border-green-200`;
      case 'Pending': return `bg-yellow-100 text-yellow-800 border border-yellow-200`;
      case 'Closed': return `bg-gray-100 text-gray-800 border border-gray-200`;
      case 'Overdue': return `bg-red-100 text-red-800 border border-red-200`;
      default: return `bg-gray-100 text-gray-800 border border-gray-200`;
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Sort and filter loans
  const filteredAndSortedLoans = loans
    .filter(loan => {
      const matchesSearch = 
        loan.borrower.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loan.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loan.type.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || loan.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      // Handle numeric values (remove ₹ symbol for sorting)
      if (sortField === 'amount') {
        aValue = parseFloat(aValue.replace(/[₹,]/g, ''));
        bValue = parseFloat(bValue.replace(/[₹,]/g, ''));
      }
      
      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : 1;
      } else {
        return aValue > bValue ? -1 : 1;
      }
    });

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <ChevronDown size={16} className="text-gray-400" />;
    return sortDirection === 'asc' ? 
      <ChevronUp size={16} className="text-blue-600" /> : 
      <ChevronDown size={16} className="text-blue-600" />;
  };

  // Handle delete loan
  const handleDeleteLoan = (loanId) => {
    if (window.confirm('Are you sure you want to delete this loan?')) {
      setLoans(prev => prev.filter(loan => loan.id !== loanId));
    }
  };

  // Handle edit loan
  const handleEditLoan = (loan) => {
    // You can implement edit functionality here
    console.log('Edit loan:', loan);
    alert(`Edit functionality for ${loan.id} would open here`);
  };

  // Handle view loan details
  const handleViewLoan = (loan) => {
    // You can implement view functionality here
    console.log('View loan:', loan);
    alert(`View details for ${loan.id}\nBorrower: ${loan.borrower}\nAmount: ${loan.amount}\nStatus: ${loan.status}`);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      {/* Header with Controls */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Loan Portfolio</h2>
            <p className="text-gray-500 text-sm mt-1">
              {filteredAndSortedLoans.length} loans found • {loans.filter(l => l.status === 'Active').length} active
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Add New Loan Button */}
            {onAddNewLoan && (
              <button 
                onClick={onAddNewLoan}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                <Plus size={16} />
                New Loan
              </button>
            )}

            {/* Search Input */}
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search loans..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-full sm:w-64"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Closed">Closed</option>
              <option value="Overdue">Overdue</option>
            </select>

            {/* Export Button */}
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
              <Download size={16} />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th 
                className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('id')}
              >
                <div className="flex items-center gap-1">
                  Loan ID
                  <SortIcon field="id" />
                </div>
              </th>
              <th 
                className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('borrower')}
              >
                <div className="flex items-center gap-1">
                  Borrower
                  <SortIcon field="borrower" />
                </div>
              </th>
              <th 
                className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('amount')}
              >
                <div className="flex items-center gap-1">
                  Amount
                  <SortIcon field="amount" />
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Interest Rate
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                EMI
              </th>
              <th 
                className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center gap-1">
                  Status
                  <SortIcon field="status" />
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredAndSortedLoans.length > 0 ? (
              filteredAndSortedLoans.map((loan) => (
                <tr key={loan.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-900">{loan.id}</span>
                      <span className="text-xs text-gray-500">{loan.disbursedDate}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-900">{loan.borrower}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-gray-900">{loan.amount}</span>
                    <div className="text-xs text-gray-500">{loan.tenure}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-700">{loan.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-900">{loan.interestRate}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-900">{loan.emi}</span>
                    <div className="text-xs text-gray-500">Due: {loan.nextDue}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(loan.status)}`}>
                      {loan.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleViewLoan(loan)}
                        className="p-1.5 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => handleEditLoan(loan)}
                        className="p-1.5 rounded-lg text-gray-500 hover:text-yellow-600 hover:bg-yellow-50 transition-colors"
                        title="Edit Loan"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteLoan(loan.id)}
                        className="p-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete Loan"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-6 py-8 text-center">
                  <div className="text-gray-500">
                    <Search size={48} className="mx-auto mb-2 opacity-50" />
                    <p className="text-lg font-medium">No loans found</p>
                    <p className="text-sm">Try adjusting your search or filter criteria</p>
                    {onAddNewLoan && (
                      <button 
                        onClick={onAddNewLoan}
                        className="mt-4 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium mx-auto"
                      >
                        <Plus size={16} />
                        Create New Loan
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      {filteredAndSortedLoans.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing {filteredAndSortedLoans.length} of {loans.length} loans
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Previous
            </button>
            <button className="px-3 py-1.5 text-sm bg-blue-600 text-white border border-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
              1
            </button>
            <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              2
            </button>
            <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoansTable;