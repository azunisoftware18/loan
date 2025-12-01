import React, { useState, useMemo } from 'react';
import { 
  Trash2, 
  FileText, 
  Eye, 
  XCircle,
  CheckCircle,
  Clock,
  Filter,
  Users,
  Building,
  Edit2,
  Shield,
  ArrowLeft
} from 'lucide-react';

// --- 1. सहायक डेटा ---
const MOCK_EMPLOYEES = ['Ravi Sharma (Emp-001)', 'Priya Varma (Emp-002)', 'Admin'];
const MOCK_PARTNERS = ['Connect FinTech', 'Global Loans Inc', 'Direct Channel'];

// Initial Data: The starting point for the dashboard
const INITIAL_ADMIN_LOAN_DATA = [
  { id: 'LN-1678880000', borrower: 'Anil Kumar', amount: '₹5,00,000', type: 'Personal Loan', status: 'Approved', loanSource: 'Ravi Sharma (Emp-001)', approvedBy: 'Admin', details: { mobile: '9876543210', email: 'anil@example.com', loanCategory: 'Unsecured', tenure: '60 months' } },
  { id: 'LN-1678880001', borrower: 'Sunita Mehra', amount: '₹20,00,000', type: 'Home Loan', status: 'Pending', loanSource: 'Connect FinTech', approvedBy: null, details: { mobile: '9988776655', email: 'sunita@example.com', loanCategory: 'Secured', tenure: '240 months' } },
  { id: 'LN-1678880002', borrower: 'Rajesh Gupta', amount: '₹1,50,000', type: 'Business Loan', status: 'Rejected', loanSource: 'Priya Varma (Emp-002)', approvedBy: 'Admin', details: { mobile: '9000111222', email: 'rajesh@example.com', loanCategory: 'Unsecured', tenure: '36 months' } }
];

// --- 2. छोटे कंपोनेंट्स (StatusBadge and DetailItem) ---

const StatusBadge = ({ status }) => {
  let colorClass = '';
  let Icon = Clock;

  switch (status) {
    case 'Approved':
      colorClass = 'bg-green-100 text-green-700 border-green-300';
      Icon = CheckCircle;
      break;
    case 'Rejected':
      colorClass = 'bg-red-100 text-red-700 border-red-300';
      Icon = XCircle;
      break;
    case 'Disbursed':
      colorClass = 'bg-blue-100 text-blue-700 border-blue-300';
      Icon = CheckCircle;
      break;
    case 'Pending':
    default:
      colorClass = 'bg-yellow-100 text-yellow-700 border-yellow-300';
      Icon = Clock;
      break;
  }

  return (
    <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full border ${colorClass} transition-colors duration-150`}>
      <Icon size={14} className="mr-1" />
      {status}
    </span>
  );
};

const DetailItem = ({ label, value }) => (
  <div className="flex flex-col p-3 bg-gray-50 rounded-lg">
    <p className="text-xs font-medium text-gray-500 uppercase">{label}</p>
    <p className="text-sm font-bold text-gray-800 break-words mt-1">{value}</p>
  </div>
);

// --- 3. Loan Detail Modal ---

const LoanDetailModal = ({ loan, onClose, handleUpdateStatus, handleDeleteLoan, handleEditClick }) => {
    if (!loan) return null;

    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all scale-100">
          <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-blue-50 rounded-t-2xl">
            <h3 className="text-xl font-extrabold text-blue-800 flex items-center gap-3">
              <FileText size={24} className='text-blue-500' /> Loan Details: {loan.id}
            </h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800 transition-colors p-1 rounded-full hover:bg-white">
              <XCircle size={28} />
            </button>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <DetailItem label="Borrower" value={loan.borrower} />
              <DetailItem label="Amount" value={loan.amount} />
              <DetailItem label="Status" value={<StatusBadge status={loan.status} />} />
              <DetailItem label="Product Type" value={loan.type} />
              <DetailItem label="Source" value={loan.loanSource} />
              <DetailItem label="Approved By" value={loan.approvedBy || 'N/A'} />
              {/* Optional: Add more details here */}
              {loan.details.tenure && <DetailItem label="Tenure" value={loan.details.tenure} />}
              {loan.details.loanCategory && <DetailItem label="Category" value={loan.details.loanCategory} />}

            </div>

            <div className='border-t pt-4 border-gray-100'>
                <h4 className='font-bold text-lg text-gray-700 mb-3'>Admin Actions</h4>
                <div className='flex flex-wrap gap-3'>
                    <button 
                        onClick={() => handleUpdateStatus(loan.id, 'Approved')}
                        className="flex-1 min-w-[120px] px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 font-semibold transition-transform duration-150 transform hover:scale-[1.02]"
                        disabled={loan.status === 'Approved'}
                    >
                        Approve
                    </button>
                    <button 
                        onClick={() => handleUpdateStatus(loan.id, 'Disbursed')}
                        className="flex-1 min-w-[120px] px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold transition-transform duration-150 transform hover:scale-[1.02]"
                        disabled={loan.status === 'Disbursed' || loan.status !== 'Approved'}
                    >
                        Disburse
                    </button>
                    <button 
                        onClick={() => handleUpdateStatus(loan.id, 'Rejected')}
                        className="flex-1 min-w-[120px] px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 font-semibold transition-transform duration-150 transform hover:scale-[1.02]"
                        disabled={loan.status === 'Rejected'}
                    >
                        Reject
                    </button>
                    <button 
                        onClick={() => { onClose(); handleEditClick(loan); }}
                        className="flex-1 min-w-[120px] px-4 py-2 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 font-semibold transition-transform duration-150 transform hover:scale-[1.02]"
                    >
                        <Edit2 size={16} className='inline mr-1' /> Edit
                    </button>
                    <button 
                        onClick={() => handleDeleteLoan(loan.id)}
                        className="flex-1 min-w-[120px] px-4 py-2 bg-gray-400 text-white rounded-xl hover:bg-gray-500 font-semibold transition-transform duration-150 transform hover:scale-[1.02]"
                    >
                        <Trash2 size={16} className='inline mr-1' /> Delete
                    </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

// --- 4. मुख्य कंपोनेंट: LoanRequests (Admin Dashboard) ---

function LoanRequests() {
  // Retaining the state management logic to allow actions inside the modal/form
  const [loans, setLoans] = useState(INITIAL_ADMIN_LOAN_DATA);
  const [showForm, setShowForm] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const [filters, setFilters] = useState({
    status: 'All',
    sourceType: 'All',
    sourceName: 'All'
  });
  const [searchTerm, setSearchTerm] = useState('');

  // --- Functions for State Management (No Local Storage) ---
  const saveLoans = (currentLoans) => {
    setLoans(currentLoans); 
  };
  
  // --- Handlers ---
  
  const handleLoanSubmit = (loanData) => {
    // Simplified Mock Submission/Edit Logic
    const isNew = !loans.some(l => l.id === loanData.id);
    let updatedLoans;

    if (isNew) {
      // Mock New Loan creation (This path is currently unreachable as the "New Application" button is removed)
      const newId = `LN-${Date.now()}`;
      const newLoanWithAdminData = {
        ...loanData,
        id: newId,
        amount: `₹${loanData.amount.toLocaleString('en-IN')}`,
        loanSource: MOCK_EMPLOYEES[0],
        approvedBy: null,
        status: 'Pending',
        tenure: `${loanData.tenure} months`,
        details: { ...loanData },
      };
      updatedLoans = [newLoanWithAdminData, ...loans];
    } else {
      // Edit existing loan
      updatedLoans = loans.map(loan => loan.id === loanData.id ? { 
        ...loan, 
        borrower: loanData.customerName, // Assume LoanForm returns customerName
        amount: `₹${(parseInt(loanData.amount) || 0).toLocaleString('en-IN')}`, 
        type: loanData.product,
        details: { ...loan.details, ...loanData } 
      } : loan);
    }

    saveLoans(updatedLoans);
    setShowForm(false);
    setIsEditing(false);
    setSelectedLoan(null); 
  };

  const handleDeleteLoan = (loanId) => {
    if (window.confirm('Are you sure you want to permanently delete this loan application?')) {
      const updatedLoans = loans.filter(loan => loan.id !== loanId);
      saveLoans(updatedLoans);
      setSelectedLoan(null);
    }
  };

  const handleUpdateStatus = (loanId, newStatus) => {
    const updatedLoans = loans.map(loan => {
      if (loan.id === loanId) {
        return { 
          ...loan, 
          status: newStatus,
          approvedBy: (newStatus === 'Approved' || newStatus === 'Rejected' || newStatus === 'Disbursed') ? 'Admin' : loan.approvedBy
        };
      }
      return loan;
    });
    saveLoans(updatedLoans);
    // Update the selected loan in the modal to reflect the new status immediately
    setSelectedLoan(prev => prev && prev.id === loanId ? updatedLoans.find(l => l.id === loanId) : null);
  };
  
  const handleEditClick = (loan) => {
    setSelectedLoan(loan);
    setIsEditing(true);
    setShowForm(true);
  };
  
  // --- Filtering & Memoization ---
  
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const filteredLoans = useMemo(() => {
    let list = loans;

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      list = list.filter(loan => 
        loan.borrower.toLowerCase().includes(searchLower) ||
        loan.id.toLowerCase().includes(searchLower) ||
        loan.loanSource.toLowerCase().includes(searchLower)
      );
    }

    if (filters.status !== 'All') {
      list = list.filter(loan => loan.status === filters.status);
    }

    if (filters.sourceType === 'Employee') {
      list = list.filter(loan => MOCK_EMPLOYEES.includes(loan.loanSource));
    } else if (filters.sourceType === 'Partner') {
      list = list.filter(loan => MOCK_PARTNERS.includes(loan.loanSource));
    }

    if (filters.sourceName !== 'All') {
      list = list.filter(loan => loan.loanSource === filters.sourceName);
    }

    return list;
  }, [loans, filters, searchTerm]);

  const availableSourceNames = useMemo(() => {
    if (filters.sourceType === 'Employee') return MOCK_EMPLOYEES;
    if (filters.sourceType === 'Partner') return MOCK_PARTNERS;
    return [];
  }, [filters.sourceType]);


  if (showForm) {
    // Prepare data for the (assumed) LoanForm component when editing
    const initialData = isEditing ? {
        // Extracting and cleaning data for form fields (assuming LoanForm expects specific keys)
        id: selectedLoan?.id,
        customerName: selectedLoan?.borrower || '',
        amount: selectedLoan?.amount?.replace(/[^0-9]/g, '') || '',
        product: selectedLoan?.type || '',
        tenure: selectedLoan?.details?.tenure?.replace(/[^0-9]/g, '') || '12', 
        mobile: selectedLoan?.details?.mobile || '',
        email: selectedLoan?.details?.email || '',
        loanCategory: selectedLoan?.details?.loanCategory || '',
        // Add other form fields here...
    } : {};


    return (
      <div className="p-6 bg-white min-h-screen">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => { setShowForm(false); setIsEditing(false); setSelectedLoan(null); }}
            className="flex items-center gap-2 mb-6 text-blue-600 hover:text-blue-800 font-semibold"
          >
            <ArrowLeft size={20} /> Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
            {isEditing ? 'Edit Loan Application' : 'Loan Application Form (Mock)'}
          </h1>
          {/* <LoanForm 
            onSubmit={handleLoanSubmit} 
            onCancel={() => { setShowForm(false); setIsEditing(false); setSelectedLoan(null); }} 
            initialFormData={initialData}
          /> */}
          <div className='bg-yellow-100 p-4 rounded-lg border border-yellow-300'>
             <p className='font-semibold text-yellow-800'>
               ⚠️ **LoanForm Component Missing:** The actual form rendering and submission logic is skipped here because the `LoanForm` component is not provided. 
               The Edit view is functional in terms of state management (`showForm`, `isEditing`).
             </p>
             <p className='text-sm mt-2'>
                **Mock Data Used:** The `handleLoanSubmit` function uses a mock logic to update the main loan table upon submission.
             </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* === Header (Simplified) === */}
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h1 className="text-3xl font-extrabold text-gray-800 flex items-center gap-3">
            <Shield size={32} className="text-red-600" /> Admin Loan Dashboard
          </h1>
          {/* Removed Reset Data and New Application buttons */}
        </div>

        {/* === Filter and Search Section === */}
        <div className="bg-white p-5 rounded-xl shadow-lg mb-6 border border-gray-100">
            <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2"><Filter size={20} /> Filter Loan Requests</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Search */}
                <input
                    type="text"
                    placeholder="Search by ID, Borrower, or Source..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="lg:col-span-2 px-4 py-2 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                />

                {/* Status Filter */}
                <select
                    value={filters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white pr-8"
                >
                    <option value="All">Status: All</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Disbursed">Disbursed</option>
                </select>

                {/* Source Type Filter */}
                <select
                    value={filters.sourceType}
                    onChange={(e) => { handleFilterChange('sourceType', e.target.value); handleFilterChange('sourceName', 'All'); }}
                    className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white pr-8"
                >
                    <option value="All">Source Type: All</option>
                    <option value="Employee">Employee</option>
                    <option value="Partner">Partner</option>
                </select>
                
                {/* Specific Source Filter */}
                <select
                    value={filters.sourceName}
                    onChange={(e) => handleFilterChange('sourceName', e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white pr-8"
                    disabled={filters.sourceType === 'All'}
                >
                    <option value="All">{filters.sourceType} Name: All</option>
                    {availableSourceNames.map(name => (
                        <option key={name} value={name}>{name}</option>
                    ))}
                </select>
            </div>
        </div>

        {/* === Loan Table === */}
        <div className="bg-white rounded-xl shadow-lg overflow-x-auto border border-gray-100">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                {['Loan ID', 'Borrower', 'Amount', 'Source / Partner', 'Status', 'Approved By', 'Actions'].map(header => (
                    <th key={header} scope="col" className={`px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider ${header === 'Actions' ? 'text-center' : ''}`}>
                        {header}
                    </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredLoans.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-500 bg-white">
                    <p className="font-semibold">No loan applications found matching the current criteria. 🙁</p>
                    <p className='text-sm mt-1'>Try adjusting your filters.</p>
                  </td>
                </tr>
              ) : (
                filteredLoans.map((loan) => (
                  <tr key={loan.id} className="hover:bg-blue-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-600">{loan.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{loan.borrower}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-700">{loan.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className='flex items-center gap-1 font-medium'>
                            {MOCK_EMPLOYEES.includes(loan.loanSource) ? <Users size={14} className='text-green-500'/> : <Building size={14} className='text-purple-500'/>}
                            {loan.loanSource}
                        </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <StatusBadge status={loan.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {loan.approvedBy || <span className='text-gray-400 italic'>N/A</span>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                      <div className="flex justify-center">
                        <button
                          onClick={() => setSelectedLoan(loan)}
                          className="p-2 text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
                          title="View Details & Actions"
                        >
                          <Eye size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {filteredLoans.length > 0 && (
             <div className='p-4 text-center text-sm font-medium text-gray-600 border-t bg-gray-50 rounded-b-xl'>
                 Showing {filteredLoans.length} of {loans.length} total applications.
             </div>
          )}
        </div>
      </div>
      
      {/* Detail Modal */}
      {selectedLoan && !showForm && (
        <LoanDetailModal 
            loan={selectedLoan} 
            onClose={() => setSelectedLoan(null)} 
            handleUpdateStatus={handleUpdateStatus}
            handleDeleteLoan={handleDeleteLoan}
            handleEditClick={handleEditClick}
        />
      )}
    </div>
  );
}

export default LoanRequests;