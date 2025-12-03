import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, CheckCircle, XCircle, Clock, Eye, FileText, 
  ShieldCheck, User, Calendar, AlertTriangle, ChevronRight, Download, 
  RefreshCw, Camera, ScanLine, Check
} from 'lucide-react';

export default function KycVerification() {
  // --- STATE ---
  const [activeTab, setActiveTab] = useState('pending'); // all, pending, verified, rejected
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // --- MOCK DATA ---
  const kycData = [
    { 
      id: "KYC-1001", customer: "Rahul Sharma", loanId: "LN-2023-880", 
      type: "Individual", submittedDate: "2025-02-10 10:30 AM", status: "Pending", 
      docs: { aadhaar: "xxxx-xxxx-1234", pan: "ABCDE1234F" }, risk: "Low" 
    },
    { 
      id: "KYC-1002", customer: "Priya Verma", loanId: "LN-2022-450", 
      type: "Individual", submittedDate: "2025-02-10 11:15 AM", status: "Pending", 
      docs: { aadhaar: "xxxx-xxxx-5678", pan: "XYZAB5678C" }, risk: "High" 
    },
    { 
      id: "KYC-1003", customer: "Amit Enterprises", loanId: "LN-2024-112", 
      type: "Business", submittedDate: "2025-02-09 04:00 PM", status: "Verified", 
      docs: { gst: "27AAAAA0000A1Z5", pan: "ZZZZZ9999X" }, risk: "Medium" 
    },
    { 
      id: "KYC-1004", customer: "Sneha Gupta", loanId: "LN-2021-009", 
      type: "Individual", submittedDate: "2025-02-08 02:30 PM", status: "Rejected", 
      docs: { aadhaar: "xxxx-xxxx-9012", pan: "PQRST1234L" }, risk: "Low", remark: "Blurry Aadhaar Image" 
    },
  ];

  // --- COMPONENTS ---

  const StatusBadge = ({ status }) => {
    const styles = {
      Verified: "bg-green-100 text-green-700 border-green-200",
      Pending: "bg-orange-100 text-orange-700 border-orange-200",
      Rejected: "bg-red-100 text-red-700 border-red-200",
    };
    const icons = {
      Verified: <CheckCircle size={14} className="mr-1" />,
      Pending: <Clock size={14} className="mr-1" />,
      Rejected: <XCircle size={14} className="mr-1" />,
    };
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-bold rounded-full border ${styles[status]}`}>
        {icons[status]} {status}
      </span>
    );
  };

  // --- LOGIC ---

  const filteredData = useMemo(() => {
    return kycData.filter(item => {
      const matchesTab = 
        activeTab === 'all' ? true : 
        activeTab === 'pending' ? item.status === 'Pending' : 
        activeTab === 'verified' ? item.status === 'Verified' : 
        item.status === 'Rejected';
      
      const matchesSearch = item.customer.toLowerCase().includes(searchTerm.toLowerCase()) || item.loanId.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchTerm]);

  const handleVerifyClick = (customer) => {
    setSelectedCustomer(customer);
    setShowModal(true);
  };

  // --- MODAL: VERIFICATION VIEW ---
  const VerificationModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div>
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <ShieldCheck className="text-blue-600" /> KYC Verification
            </h2>
            <p className="text-sm text-gray-500 mt-1">Reviewing documents for <span className="font-bold text-gray-700">{selectedCustomer.customer}</span></p>
          </div>
          <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-200 rounded-full"><XCircle size={24} className="text-gray-500" /></button>
        </div>

        {/* Body (Split View) */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Left: Document Preview */}
          <div className="w-full md:w-2/3 bg-gray-900 p-6 flex flex-col items-center justify-center relative">
            <div className="absolute top-4 right-4 flex gap-2">
               <button className="bg-black/50 text-white px-3 py-1 rounded text-xs hover:bg-black/70">Rotate</button>
               <button className="bg-black/50 text-white px-3 py-1 rounded text-xs hover:bg-black/70">Zoom</button>
            </div>
            {/* Mock Document Image */}
            <div className="w-full h-full bg-gray-800 rounded-lg border-2 border-gray-700 flex items-center justify-center text-gray-500">
               <div className="text-center">
                  <FileText size={64} className="mx-auto mb-4 opacity-50" />
                  <p>Aadhaar Front View</p>
                  <p className="text-xs mt-2">Preview Unavailable in Mock</p>
               </div>
            </div>
            <div className="mt-4 flex gap-4 overflow-x-auto w-full p-2">
               {['Aadhaar Front', 'Aadhaar Back', 'PAN Card', 'Photo'].map((doc, i) => (
                  <div key={i} className={`min-w-[100px] h-20 bg-gray-800 rounded border-2 cursor-pointer flex items-center justify-center text-xs text-gray-400 hover:border-blue-500 ${i===0 ? 'border-blue-500' : 'border-gray-700'}`}>
                     {doc}
                  </div>
               ))}
            </div>
          </div>

          {/* Right: Data Matching Form */}
          <div className="w-full md:w-1/3 bg-white border-l border-gray-200 flex flex-col">
             <div className="p-6 flex-1 overflow-y-auto">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><ScanLine size={18}/> Data Extraction (OCR)</h3>
                
                <div className="space-y-6">
                   {/* Name Match */}
                   <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                      <label className="text-xs font-bold text-gray-500 uppercase">Name Match Score</label>
                      <div className="flex justify-between items-center mt-1">
                         <span className="font-bold text-green-700 text-lg">98% Match</span>
                         <CheckCircle size={20} className="text-green-600" />
                      </div>
                      <div className="text-xs text-gray-600 mt-2">
                         System: {selectedCustomer.customer}<br/>
                         Doc: {selectedCustomer.customer}
                      </div>
                   </div>

                   {/* PAN Field */}
                   <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">PAN Number</label>
                      <div className="flex gap-2">
                         <input type="text" defaultValue={selectedCustomer.docs.pan} className="w-full p-2 border rounded bg-gray-50 font-mono" />
                         <button className="p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"><Check size={18}/></button>
                      </div>
                   </div>

                   {/* Aadhaar Field */}
                   <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Aadhaar Number</label>
                      <div className="flex gap-2">
                         <input type="text" defaultValue={selectedCustomer.docs.aadhaar} className="w-full p-2 border rounded bg-gray-50 font-mono" />
                         <button className="p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"><Check size={18}/></button>
                      </div>
                   </div>

                   {/* Risk Flag */}
                   {selectedCustomer.risk === 'High' && (
                      <div className="p-3 bg-red-50 text-red-700 rounded-lg border border-red-100 flex items-start gap-2 text-sm">
                         <AlertTriangle size={16} className="mt-0.5 flex-shrink-0"/>
                         <span>High Risk Flag: Multiple recent inquiries found on credit report.</span>
                      </div>
                   )}
                </div>
             </div>

             {/* Footer Actions */}
             <div className="p-6 border-t bg-gray-50">
                <div className="flex gap-3">
                   <button onClick={() => {alert("Marked for Re-Submission"); setShowModal(false);}} className="flex-1 py-3 border border-red-200 bg-white text-red-600 rounded-xl font-bold hover:bg-red-50">Reject / Retry</button>
                   <button onClick={() => {alert("KYC Verified Successfully!"); setShowModal(false);}} className="flex-1 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 shadow-lg shadow-green-200">Approve KYC</button>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-10 font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <ShieldCheck className="text-blue-600" size={32}/> KYC Verification Center
          </h1>
          <p className="text-gray-500 mt-1 ml-11">Verify customer identity, review documents, and manage compliance.</p>
        </div>
        <div className="flex gap-3">
           <button className="px-4 py-2 bg-white border rounded-lg text-gray-600 hover:bg-gray-50 flex items-center gap-2 text-sm font-medium">
              <RefreshCw size={16} /> Sync with Digilocker
           </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-in fade-in zoom-in duration-300">
         <div className="bg-white p-6 rounded-2xl shadow-sm border border-l-4 border-l-orange-500 border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase">Pending Review</p>
            <h3 className="text-3xl font-bold text-gray-800 mt-1">{kycData.filter(k=>k.status==='Pending').length}</h3>
         </div>
         <div className="bg-white p-6 rounded-2xl shadow-sm border border-l-4 border-l-green-500 border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase">Verified Today</p>
            <h3 className="text-3xl font-bold text-gray-800 mt-1">12</h3>
         </div>
         <div className="bg-white p-6 rounded-2xl shadow-sm border border-l-4 border-l-red-500 border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase">Rejected (This Week)</p>
            <h3 className="text-3xl font-bold text-gray-800 mt-1">5</h3>
         </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50/50">
           
           {/* Tabs */}
           <div className="flex bg-gray-200/50 p-1 rounded-lg">
              {['all', 'pending', 'verified', 'rejected'].map(tab => (
                 <button 
                   key={tab}
                   onClick={() => setActiveTab(tab)}
                   className={`px-4 py-1.5 rounded-md text-sm font-medium capitalize transition-all ${activeTab === tab ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                 >
                   {tab}
                 </button>
              ))}
           </div>

           {/* Search */}
           <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                 type="text" 
                 placeholder="Search Name or Loan ID..." 
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" 
              />
           </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
           <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500 font-semibold border-b">
                 <tr>
                    <th className="px-6 py-4">Request ID</th>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Docs Submitted</th>
                    <th className="px-6 py-4">Submitted On</th>
                    <th className="px-6 py-4">Risk Profile</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Action</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                 {filteredData.length > 0 ? (
                    filteredData.map((item) => (
                       <tr key={item.id} className="hover:bg-blue-50/50 transition-colors">
                          <td className="px-6 py-4 font-mono text-gray-500">{item.id}</td>
                          <td className="px-6 py-4">
                             <div className="font-bold text-gray-800">{item.customer}</div>
                             <div className="text-xs text-blue-600">{item.loanId}</div>
                          </td>
                          <td className="px-6 py-4 text-gray-600">
                             {Object.keys(item.docs).map(doc => (
                                <span key={doc} className="inline-block bg-gray-100 px-2 py-1 rounded text-xs mr-1 uppercase">{doc}</span>
                             ))}
                          </td>
                          <td className="px-6 py-4 text-gray-500">{item.submittedDate}</td>
                          <td className="px-6 py-4">
                             <span className={`text-xs font-bold px-2 py-1 rounded ${item.risk === 'High' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                                {item.risk} Risk
                             </span>
                          </td>
                          <td className="px-6 py-4"><StatusBadge status={item.status} /></td>
                          <td className="px-6 py-4 text-right">
                             <button 
                                onClick={() => handleVerifyClick(item)}
                                className="px-4 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 shadow-sm flex items-center gap-1 ml-auto transition"
                             >
                                <Eye size={14}/> Review
                             </button>
                          </td>
                       </tr>
                    ))
                 ) : (
                    <tr><td colSpan="7" className="p-10 text-center text-gray-400">No requests found in this category.</td></tr>
                 )}
              </tbody>
           </table>
        </div>

      </div>

      {/* Modal Injection */}
      {showModal && selectedCustomer && <VerificationModal />}

    </div>
  );
}