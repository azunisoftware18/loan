import React, { useState, useEffect, useRef } from 'react';
import { Plus, X, Search, FileText, Check, Ban, AlertCircle, Eye, MoreVertical } from 'lucide-react';
import Button from '../../../components/admin/common/Button';
import LoanForm from '../../../components/admin/AdminForm/LoanForm';
import { useGetLoanApplications, useUpdateLoan }
  from '../../../hooks/useLoanApplication';

// Custom ActionMenu Component
const ActionMenu = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleItemClick = (onClick) => {
    onClick();
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      {/* Three dots button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="p-2 hover:bg-slate-100 rounded-full transition-colors"
      >
        <MoreVertical size={18} className="text-slate-500" />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-50">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                handleItemClick(item.onClick);
              }}
              className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 hover:bg-slate-50 transition-colors
                ${item.danger ? 'text-red-600 hover:bg-red-50' : 'text-slate-700'}`}
            >
              <item.icon size={16} className={item.danger ? 'text-red-500' : 'text-slate-400'} />
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

class LoanFormErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("LoanForm error:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-10 text-center">
          <h2 className="text-xl font-bold text-red-600">
            Failed to load Loan Form
          </h2>
          <p className="text-slate-500 mt-2">
            A configuration error occurred.
          </p>
          <button
            onClick={this.props.onClose}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-xl"
          >
            Close
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const Applications = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const { data: applications = [], isLoading } = useGetLoanApplications();
  const { mutate: updateStatus } = useUpdateLoan();

  const handleFormSubmit = () => {
    setIsModalOpen(false);
  };

  // Format application data for the details modal
  const formatApplicationData = (app) => {
    return {
      id: app.id,
      name: app.customer ? `${app.customer.firstName || ''} ${app.customer.lastName || ''}`.trim() : '—',
      email: app.customer?.email || 'N/A',
      phone: app.customer?.phone || 'N/A',
      pan: app.customer?.panNumber || 'N/A',
      aadhaar: app.customer?.aadhaarNumber || 'N/A',
      income: app.customer?.monthlyIncome || 0,
      address: app.customer?.address || 'N/A',
      occupation: app.customer?.occupation || 'N/A',
      cibil: app.cibilScore || 'N/A',
      amount: app.requestedAmount || 0,
      tenure: app.tenureMonths || 0,
      interest: app.interestRate || 0,
      loanType: app.loanType || 'Personal Loan',
      status: app.status || 'Pending'
    };
  };

  // Handle view details click
  const handleViewDetails = (app) => {
    const formattedData = formatApplicationData(app);
    setSelectedApp(formattedData);
  };

  // Handle status update
  const handleStatusUpdate = (id, status) => {
    updateStatus({ id, status });
  };

  // Filter applications based on search term
  const filteredApplications = applications.filter(app =>
    `${app.customer?.firstName || ''} ${app.customer?.lastName || ''}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    app.customer?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.customer?.panNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: applications.length,
    approved: applications.filter(a => a.status === 'Approved').length,
    rejected: applications.filter(a => a.status === 'Rejected').length,
    pending: applications.filter(a => a.status === 'Pending' || a.status === 'kyc_pending').length
  };

  // Get status color
  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'approved':
        return 'bg-green-500';
      case 'rejected':
        return 'bg-red-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'kyc_pending':
        return 'bg-blue-500';
      default:
        return 'bg-slate-500';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Loan Origination System</h1>
          <p className="text-slate-500 font-medium">Customer Credit Assessment & Processing Panel</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search by name, PAN, Aadhaar..."
              className="pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={() => setIsModalOpen(true)} className="whitespace-nowrap">
            <Plus size={20} /> <span className="font-bold">New Application</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-slate-500 text-sm font-bold uppercase">Total Applications</p>
          <p className="text-3xl font-black">{stats.total}</p>
        </div>
        <div className="bg-green-50 p-6 rounded-2xl shadow-sm border border-green-100">
          <p className="text-green-600 text-sm font-bold uppercase">Approved</p>
          <p className="text-3xl font-black text-green-700">{stats.approved}</p>
        </div>
        <div className="bg-amber-50 p-6 rounded-2xl shadow-sm border border-amber-100">
          <p className="text-amber-600 text-sm font-bold uppercase">Pending</p>
          <p className="text-3xl font-black text-amber-700">{stats.pending}</p>
        </div>
        <div className="bg-red-50 p-6 rounded-2xl shadow-sm border border-red-100">
          <p className="text-red-600 text-sm font-bold uppercase">Rejected</p>
          <p className="text-3xl font-black text-red-700">{stats.rejected}</p>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-600 uppercase text-xs font-bold">
              <tr>
                <th className="px-6 py-4 border-b">Customer Details</th>
                <th className="px-6 py-4 border-b">Financing</th>
                <th className="px-6 py-4 border-b">CIBIL</th>
                <th className="px-6 py-4 border-b">Status</th>
                <th className="px-6 py-4 border-b text-right pr-10">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredApplications.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-800">
                      {app.customer
                        ? `${app.customer.firstName || ""} ${app.customer.lastName || ""}`.trim()
                        : "—"}
                    </div>

                    <div className="text-xs text-slate-400">
                      {app.customer?.panNumber || "PAN N/A"}
                    </div>

                    <div className="text-xs text-slate-500">
                      {app.customer?.email || "Email N/A"}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="font-bold">
                      ₹{Number(app.requestedAmount || 0).toLocaleString()}
                    </div>
                    <div className="text-xs">
                      {app.tenureMonths || 0} Months @ {app.interestRate || 0}%
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full bg-slate-100 font-medium">
                      {app.cibilScore ?? "N/A"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-white ${getStatusColor(app.status)}`}>
                      {app.status || 'Pending'}
                    </span>
                  </td>
                  
                  <td className="px-6 py-4 text-right relative">
                    <ActionMenu
                      items={[
                        {
                          label: "View Details",
                          icon: Eye,
                          onClick: () => handleViewDetails(app),
                        },
                        {
                          label: "Approve",
                          icon: Check,
                          onClick: () => handleStatusUpdate(app.id, "approved"),
                        },
                        {
                          label: "Reject",
                          icon: Ban,
                          danger: true,
                          onClick: () => handleStatusUpdate(app.id, "rejected"),
                        },
                        {
                          label: "KYC Pending",
                          icon: AlertCircle,
                          onClick: () => handleStatusUpdate(app.id, "kyc_pending"),
                        },
                      ]}
                    />
                  </td>
                </tr>
              ))}

              {filteredApplications.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                    <FileText size={48} className="mx-auto mb-4 text-slate-300" />
                    <p className="text-lg font-medium">No applications found</p>
                    <p className="text-sm">Try adjusting your search or create a new application</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* VIEW DETAILS MODAL */}
      {selectedApp && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedApp(null)}
              className="absolute right-6 top-6 text-slate-400 hover:text-slate-600"
            >
              <X size={24} />
            </button>

            <div className="flex items-center gap-4 mb-6 pb-4 border-b">
              <div className="bg-blue-100 p-3 rounded-xl">
                <FileText className="text-blue-600" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-800">Application Details</h2>
                <p className="text-slate-500">ID: #{selectedApp.id}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-bold text-slate-700 border-b pb-2">Personal Information</h3>
                <DetailItem label="Full Name" value={selectedApp.name} />
                <DetailItem label="Email" value={selectedApp.email} />
                <DetailItem label="Phone" value={selectedApp.phone} />
                <DetailItem label="Occupation" value={selectedApp.occupation} />
                <DetailItem label="Address" value={selectedApp.address} />
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-slate-700 border-b pb-2">Financial Information</h3>
                <DetailItem label="Monthly Income" value={`₹${Number(selectedApp.income).toLocaleString()}`} />
                <DetailItem label="PAN Number" value={selectedApp.pan} />
                <DetailItem label="Aadhaar Number" value={selectedApp.aadhaar} />
                <DetailItem label="CIBIL Score" value={selectedApp.cibil} badge={true} />
              </div>

              <div className="md:col-span-2 space-y-4">
                <h3 className="font-bold text-slate-700 border-b pb-2">Loan Details</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <DetailItem label="Loan Type" value={selectedApp.loanType} />
                  <DetailItem label="Amount" value={`₹${Number(selectedApp.amount).toLocaleString()}`} />
                  <DetailItem label="Tenure" value={`${selectedApp.tenure} months`} />
                  <DetailItem label="Interest Rate" value={`${selectedApp.interest}%`} />
                </div>
              </div>

              <div className="md:col-span-2">
                <div className={`px-4 py-3 rounded-xl ${
                  selectedApp.status === 'Approved' ? 'bg-green-100 text-green-800' :
                  selectedApp.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                  selectedApp.status === 'kyc_pending' ? 'bg-blue-100 text-blue-800' :
                  'bg-amber-100 text-amber-800'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="font-bold">Current Status: {selectedApp.status}</span>
                    <span className="text-sm font-medium">
                      {selectedApp.status === 'Approved' ? '✓ Ready for disbursement' :
                       selectedApp.status === 'Rejected' ? '✗ Application rejected' :
                       selectedApp.status === 'kyc_pending' ? '📋 KYC pending' :
                       '⏳ Under review'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setSelectedApp(null)}
                className="flex-1 bg-slate-100 py-3 rounded-xl font-bold hover:bg-slate-200 transition-all"
              >
                Close Details
              </button>
              {selectedApp.status !== 'Approved' && selectedApp.status !== 'Rejected' && (
                <button
                  onClick={() => {
                    handleStatusUpdate(selectedApp.id, "approved");
                    setSelectedApp(null);
                  }}
                  className="flex-1 bg-green-500 text-white py-3 rounded-xl font-bold hover:bg-green-600 transition-all"
                >
                  Approve Now
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CREATE APPLICATION MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl relative animate-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-6 top-6 text-slate-400 hover:text-slate-600 z-10"
            >
              <X size={28} />
            </button>

            <LoanFormErrorBoundary onClose={() => setIsModalOpen(false)}>
              <LoanForm
                mode="create"
                onCancel={() => setIsModalOpen(false)}
                onSubmit={handleFormSubmit}
                initialData={{
                  name: '',
                  email: '',
                  phone: '',
                  income: '',
                  address: '',
                  aadhaar: '',
                  pan: '',
                  cibil: '',
                  amount: '',
                  tenure: '12',
                  interest: '10.5',
                  occupation: '',
                  loanType: 'Personal Loan'
                }}
              />
            </LoanFormErrorBoundary>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper component for detail items
const DetailItem = ({ label, value, badge = false }) => (
  <div>
    <p className="text-xs font-bold text-slate-400 uppercase mb-1">{label}</p>
    {badge ? (
      <span className={`inline-flex px-3 py-1 rounded-full text-sm font-bold ${
        parseInt(value) >= 750 ? 'bg-green-100 text-green-700' :
        parseInt(value) >= 650 ? 'bg-amber-100 text-amber-700' : 
        'bg-red-100 text-red-700'
      }`}>
        {value}
      </span>
    ) : (
      <p className="text-sm font-bold text-slate-800">{value}</p>
    )}
  </div>
);

export default Applications;