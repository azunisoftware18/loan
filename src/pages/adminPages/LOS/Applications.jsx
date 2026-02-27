import React, { useState } from 'react';
import { 
  Plus, X, Search, FileText, Check, Ban, AlertCircle, 
  Eye, User, Calendar, DollarSign, TrendingUp, Mail, Phone, MapPin, Hash, 
  IndianRupee
} from 'lucide-react';
import Button from '../../../components/admin/common/Button';
import LoanForm from '../../../components/admin/AdminForm/LoanForm';
import { useGetLoanApplications, useUpdateLoan }
  from '../../../hooks/useLoanApplication';

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
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const { data: applications = [], isLoading } = useGetLoanApplications();
  const { mutate: updateStatus } = useUpdateLoan();

  const handleFormSubmit = () => {
    setIsModalOpen(false);
  };

  const handleViewDetails = (app) => {
    setSelectedApp(app);
    setViewModalOpen(true);
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
    approved: applications.filter(a => a.status?.toLowerCase() === 'approved').length,
    rejected: applications.filter(a => a.status?.toLowerCase() === 'rejected').length,
    pending: applications.filter(a => a.status?.toLowerCase() === 'pending' || a.status?.toLowerCase() === 'kyc_pending').length
  };

  // Get status color
  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'pending':
      case 'kyc_pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8 font-sans">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Loan Applications
          </h1>
          <p className="text-slate-600 mt-1">Manage and track all loan applications</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search applications..."
              className="pl-10 pr-4 py-3 border border-slate-200 rounded-xl w-full md:w-72 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button 
            onClick={() => setIsModalOpen(true)} 
            className="whitespace-nowrap bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-200"
          >
            <Plus size={20} /> <span className="font-semibold">New Application</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 hover:shadow-lg transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">Total</p>
              <p className="text-3xl font-bold text-slate-800 mt-1">{stats.total}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-xl">
              <FileText className="text-blue-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 hover:shadow-lg transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">Approved</p>
              <p className="text-3xl font-bold text-green-600 mt-1">{stats.approved}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-xl">
              <Check className="text-green-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 hover:shadow-lg transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">Pending</p>
              <p className="text-3xl font-bold text-yellow-600 mt-1">{stats.pending}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-xl">
              <AlertCircle className="text-yellow-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 hover:shadow-lg transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">Rejected</p>
              <p className="text-3xl font-bold text-red-600 mt-1">{stats.rejected}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-xl">
              <Ban className="text-red-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gradient-to-r from-slate-50 to-blue-50 text-slate-600 text-xs font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Applicant</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Loan Details</th>
                <th className="px-6 py-4">CIBIL</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredApplications.map((app) => (
                <tr key={app.id} className="hover:bg-blue-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold">
                        {app.customer?.firstName?.charAt(0) || '?'}
                        {app.customer?.lastName?.charAt(0) || ''}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800">
                          {app.customer
                            ? `${app.customer.firstName || ''} ${app.customer.lastName || ''}`
                            : '—'}
                        </div>
                        <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                          <Hash size={12} />
                          {app.customer?.panNumber || 'PAN N/A'}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="text-sm text-slate-600 flex items-center gap-2">
                        <Mail size={14} className="text-slate-400" />
                        {app.customer?.email || '—'}
                      </div>
                      <div className="text-sm text-slate-600 flex items-center gap-2">
                        <Phone size={14} className="text-slate-400" />
                        {app.customer?.phone || '—'}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="font-semibold text-slate-800 flex items-center gap-1">
                        <IndianRupee size={16} className="text-blue-500" />
                        {Number(app.requestedAmount).toLocaleString()}
                      </div>
                      <div className="text-xs text-slate-500">
                        {app.tenureMonths} months • {app.interestRate}% p.a.
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-medium text-sm">
                      {app.cibilScore ?? 'N/A'}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${getStatusColor(app.status)}`}>
                      {app.status || 'Pending'}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleViewDetails(app)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors font-medium"
                    >
                      <Eye size={18} />
                      View
                    </button>
                  </td>
                </tr>
              ))}

              {filteredApplications.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    <FileText size={48} className="mx-auto mb-3 text-slate-300" />
                    <p className="text-lg font-medium">No applications found</p>
                    <p className="text-sm mt-1">Try adjusting your search or create a new application</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* VIEW DETAILS MODAL - Redesigned */}
      {viewModalOpen && selectedApp && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
                  <FileText className="text-white" size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Application Details</h2>
                  <p className="text-xs text-slate-500">ID: {selectedApp.id}</p>
                </div>
              </div>
              <button
                onClick={() => setViewModalOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center transition-colors"
              >
                <X size={20} className="text-slate-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Status Banner */}
              <div className={`p-4 rounded-xl border ${getStatusColor(selectedApp.status)}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {selectedApp.status?.toLowerCase() === 'approved' && <Check className="text-green-600" size={24} />}
                    {selectedApp.status?.toLowerCase() === 'rejected' && <Ban className="text-red-600" size={24} />}
                    {selectedApp.status?.toLowerCase() === 'pending' && <AlertCircle className="text-yellow-600" size={24} />}
                    <div>
                      <p className="font-semibold">Current Status: {selectedApp.status || 'Pending'}</p>
                      <p className="text-sm opacity-75 mt-0.5">
                        {selectedApp.status?.toLowerCase() === 'approved' ? 'Application has been approved' :
                         selectedApp.status?.toLowerCase() === 'rejected' ? 'Application has been rejected' :
                         'Application is under review'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Information Section */}
              <div className="bg-slate-50 rounded-xl p-5">
                <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <User size={18} className="text-blue-500" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoCard 
                    icon={<User size={16} className="text-blue-500" />}
                    label="Full Name"
                    value={`${selectedApp.customer?.firstName || ''} ${selectedApp.customer?.lastName || ''}`}
                    fallback="Not provided"
                  />
                  <InfoCard 
                    icon={<Mail size={16} className="text-blue-500" />}
                    label="Email"
                    value={selectedApp.customer?.email}
                    fallback="Not provided"
                  />
                  <InfoCard 
                    icon={<Phone size={16} className="text-blue-500" />}
                    label="Phone"
                    value={selectedApp.customer?.phone}
                    fallback="Not provided"
                  />
                  <InfoCard 
                    icon={<Calendar size={16} className="text-blue-500" />}
                    label="Date of Birth"
                    value={selectedApp.customer?.dateOfBirth}
                    fallback="Not provided"
                  />
                  <InfoCard 
                    icon={<MapPin size={16} className="text-blue-500" />}
                    label="Address"
                    value={selectedApp.customer?.address}
                    fallback="Not provided"
                    fullWidth
                  />
                </div>
              </div>

              {/* Financial Information Section */}
              <div className="bg-slate-50 rounded-xl p-5">
                <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <IndianRupee size={18} className="text-blue-500" />
                  Financial Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <InfoCard 
                    label="Monthly Income"
                    value={selectedApp.customer?.monthlyIncome ? `₹${Number(selectedApp.customer.monthlyIncome).toLocaleString()}` : null}
                    fallback="Not provided"
                  />
                  <InfoCard 
                    label="PAN Number"
                    value={selectedApp.customer?.panNumber}
                    fallback="Not provided"
                  />
                  <InfoCard 
                    label="Aadhaar Number"
                    value={selectedApp.customer?.aadhaarNumber}
                    fallback="Not provided"
                  />
                </div>
              </div>

              {/* Loan Details Section */}
              <div className="bg-slate-50 rounded-xl p-5">
                <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <TrendingUp size={18} className="text-blue-500" />
                  Loan Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <InfoCard 
                    label="Loan Type"
                    value={selectedApp.loanType}
                    fallback="Not specified"
                  />
                  <InfoCard 
                    label="Amount"
                    value={selectedApp.requestedAmount ? `₹${Number(selectedApp.requestedAmount).toLocaleString()}` : null}
                    fallback="Not specified"
                  />
                  <InfoCard 
                    label="Tenure"
                    value={selectedApp.tenureMonths ? `${selectedApp.tenureMonths} months` : null}
                    fallback="Not specified"
                  />
                  <InfoCard 
                    label="Interest Rate"
                    value={selectedApp.interestRate ? `${selectedApp.interestRate}% p.a.` : null}
                    fallback="Not specified"
                  />
                </div>
              </div>

              {/* CIBIL Score */}
              <div className="bg-slate-50 rounded-xl p-5">
                <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-4">Credit Score</h3>
                <div className="flex items-center gap-4">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold
                    ${selectedApp.cibilScore >= 750 ? 'bg-green-100 text-green-700' :
                      selectedApp.cibilScore >= 650 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'}`}>
                    {selectedApp.cibilScore || 'N/A'}
                  </div>
                  <div>
                    <p className="font-medium text-slate-700">CIBIL Score</p>
                    <p className="text-sm text-slate-500 mt-1">
                      {selectedApp.cibilScore >= 750 ? 'Excellent' :
                       selectedApp.cibilScore >= 650 ? 'Good' :
                       selectedApp.cibilScore ? 'Needs Improvement' : 'Not available'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white border-t border-slate-100 px-6 py-4 flex justify-end gap-3">
              <button
                onClick={() => setViewModalOpen(false)}
                className="px-6 py-2.5 border border-slate-200 rounded-xl text-slate-600 font-medium hover:bg-slate-50 transition-colors"
              >
                Close
              </button>
              {selectedApp.status?.toLowerCase() !== 'approved' && (
                <button
                  onClick={() => {
                    updateStatus({
                      id: selectedApp.id,
                      status: "approved",
                    });
                    setViewModalOpen(false);
                  }}
                  className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium hover:from-green-600 hover:to-green-700 transition-colors shadow-lg shadow-green-200"
                >
                  Approve Application
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CREATE APPLICATION MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">New Loan Application</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center"
              >
                <X size={20} className="text-slate-500" />
              </button>
            </div>
            <div className="p-6">
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
        </div>
      )}
    </div>
  );
};

// Helper component for info cards
const InfoCard = ({ icon, label, value, fallback = '—', fullWidth = false }) => (
  <div className={fullWidth ? 'md:col-span-2' : ''}>
    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
      {icon}
      {label}
    </p>
    <p className="text-sm font-medium text-slate-800">
      {value || <span className="text-slate-400">{fallback}</span>}
    </p>
  </div>
);

export default Applications;