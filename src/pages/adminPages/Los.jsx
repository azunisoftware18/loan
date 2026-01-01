import React, { useState } from 'react';
import { 
  Plus, X, Upload, CheckCircle, Search, FileText, 
  Check, Ban, AlertCircle, MoreVertical, Eye 
} from 'lucide-react';
import Button from '../../components/admin/common/Button';
import LoanForm from '../../components/admin/AdminForm/LoanForm';

const LOSDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [selectedApp, setSelectedApp] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [applications, setApplications] = useState([
    { 
      id: 1, 
      name: "Rahul Sharma", 
      income: "85000", 
      address: "123, Jaipur, Rajasthan", 
      aadhaar: "123456789012", 
      pan: "ABCDE1234F", 
      cibil: 780, 
      amount: "500000", 
      status: "Approved", 
      tenure: "24", 
      interest: "10.5",
      email: "rahul@example.com",
      phone: "9876543210",
      occupation: "Software Engineer",
      loanType: "Personal Loan"
    },
    { 
      id: 2, 
      name: "Priya Patel", 
      income: "65000", 
      address: "456, Mumbai, Maharashtra", 
      aadhaar: "987654321098", 
      pan: "XYZAB1234C", 
      cibil: 720, 
      amount: "300000", 
      status: "Pending", 
      tenure: "18", 
      interest: "12.0",
      email: "priya@example.com",
      phone: "8765432109",
      occupation: "Marketing Manager",
      loanType: "Home Renovation"
    },
    { 
      id: 3, 
      name: "Amit Kumar", 
      income: "95000", 
      address: "789, Delhi, NCR", 
      aadhaar: "456789123456", 
      pan: "LMNOP5678D", 
      cibil: 810, 
      amount: "800000", 
      status: "Approved", 
      tenure: "36", 
      interest: "9.5",
      email: "amit@example.com",
      phone: "7654321098",
      occupation: "Business Owner",
      loanType: "Business Loan"
    }
  ]);

  const updateStatus = (id, newStatus) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    ));
    setActiveMenu(null);
  };

  const handleFormSubmit = (formData) => {
    const newApplication = {
      ...formData,
      id: Date.now(),
      status: 'Pending',
      cibil: formData.cibil || Math.floor(Math.random() * 300) + 500 // Default CIBIL if not provided
    };
    
    setApplications([...applications, newApplication]);
    setIsModalOpen(false);
  };

  // Filter applications based on search term
  const filteredApplications = applications.filter(app => 
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.pan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.aadhaar.includes(searchTerm) ||
    app.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: applications.length,
    approved: applications.filter(a => a.status === 'Approved').length,
    rejected: applications.filter(a => a.status === 'Rejected').length,
    pending: applications.filter(a => a.status === 'Pending').length
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900" onClick={() => setActiveMenu(null)}>
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
                <th className="px6 py-4 border-b">Status</th>
                <th className="px-6 py-4 border-b text-right pr-10">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredApplications.length > 0 ? (
                filteredApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50 transition-colors relative">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-800">{app.name}</div>
                      <div className="text-xs text-slate-400 font-medium">{app.pan}</div>
                      <div className="text-xs text-slate-500 mt-1">{app.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold text-slate-700">₹{parseInt(app.amount).toLocaleString()}</div>
                      <div className="text-xs text-slate-500">{app.tenure} Months @ {app.interest}%</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-sm font-bold ${
                        app.cibil >= 750 ? 'bg-green-100 text-green-700' : 
                        app.cibil >= 650 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {app.cibil}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-black uppercase ${
                        app.status === 'Approved' ? 'bg-green-500 text-white' : 
                        app.status === 'Rejected' ? 'bg-red-500 text-white' : 
                        'bg-amber-400 text-white'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right pr-8 relative">
                      <button 
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          setActiveMenu(activeMenu === app.id ? null : app.id); 
                        }}
                        className="p-2 hover:bg-slate-200 rounded-full transition-all"
                      >
                        <MoreVertical size={20} />
                      </button>

                      {/* THREE DOT MENU DROPDOWN */}
                      {activeMenu === app.id && (
                        <div className="absolute right-10 top-12 w-48 bg-white border border-slate-200 rounded-xl shadow-xl z-50 py-2 overflow-hidden animate-in fade-in zoom-in duration-150">
                          <button 
                            onClick={() => { 
                              setSelectedApp(app); 
                              setActiveMenu(null); 
                            }} 
                            className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50 flex items-center gap-2 text-slate-700 font-medium"
                          >
                            <Eye size={16} className="text-blue-600"/> View Details
                          </button>
                          {app.status !== 'Approved' && (
                            <button 
                              onClick={() => updateStatus(app.id, 'Approved')} 
                              className="w-full text-left px-4 py-2 text-sm hover:bg-green-50 flex items-center gap-2 text-green-700 font-medium"
                            >
                              <Check size={16} /> Approve Loan
                            </button>
                          )}
                          {app.status !== 'Rejected' && (
                            <button 
                              onClick={() => updateStatus(app.id, 'Rejected')} 
                              className="w-full text-left px-4 py-2 text-sm hover:bg-red-50 flex items-center gap-2 text-red-700 font-medium border-t"
                            >
                              <Ban size={16} /> Reject Loan
                            </button>
                          )}
                          {app.status !== 'Pending' && (
                            <button 
                              onClick={() => updateStatus(app.id, 'Pending')} 
                              className="w-full text-left px-4 py-2 text-sm hover:bg-amber-50 flex items-center gap-2 text-amber-700 font-medium border-t"
                            >
                              <AlertCircle size={16} /> Mark as Pending
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <FileText size={48} className="text-slate-300 mb-4" />
                      <p className="text-lg font-semibold mb-2">No applications found</p>
                      <p className="text-sm">Try adjusting your search or add a new application</p>
                    </div>
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
              <X size={24}/>
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
                <DetailItem label="Monthly Income" value={`₹${parseInt(selectedApp.income).toLocaleString()}`} />
                <DetailItem label="PAN Number" value={selectedApp.pan} />
                <DetailItem label="Aadhaar Number" value={selectedApp.aadhaar} />
                <DetailItem label="CIBIL Score" value={selectedApp.cibil} badge={true} />
              </div>
              
              <div className="md:col-span-2 space-y-4">
                <h3 className="font-bold text-slate-700 border-b pb-2">Loan Details</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <DetailItem label="Loan Type" value={selectedApp.loanType || 'Personal Loan'} />
                  <DetailItem label="Amount" value={`₹${parseInt(selectedApp.amount).toLocaleString()}`} />
                  <DetailItem label="Tenure" value={`${selectedApp.tenure} months`} />
                  <DetailItem label="Interest Rate" value={`${selectedApp.interest}%`} />
                </div>
              </div>
              
              <div className="md:col-span-2">
                <div className={`px-4 py-3 rounded-xl ${
                  selectedApp.status === 'Approved' ? 'bg-green-100 text-green-800' :
                  selectedApp.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                  'bg-amber-100 text-amber-800'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="font-bold">Current Status: {selectedApp.status}</span>
                    <span className="text-sm font-medium">
                      {selectedApp.status === 'Approved' ? '✓ Ready for disbursement' :
                       selectedApp.status === 'Rejected' ? '✗ Application rejected' :
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
              <button 
                onClick={() => {
                  if (selectedApp.status !== 'Approved') {
                    updateStatus(selectedApp.id, 'Approved');
                  }
                  setSelectedApp(null);
                }}
                className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                  selectedApp.status === 'Approved' 
                    ? 'bg-green-600 text-white cursor-not-allowed' 
                    : 'bg-green-500 text-white hover:bg-green-600'
                }`}
                disabled={selectedApp.status === 'Approved'}
              >
                {selectedApp.status === 'Approved' ? 'Already Approved' : 'Approve Now'}
              </button>
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
        parseInt(value) >= 650 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
      }`}>
        {value}
      </span>
    ) : (
      <p className="text-sm font-bold text-slate-800">{value}</p>
    )}
  </div>
);

export default LOSDashboard;