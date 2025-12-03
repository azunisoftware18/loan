import React, { useState, useMemo } from 'react';
import { 
  RefreshCw, 
  Search, 
  Filter, 
  Download, 
  ArrowRightLeft, // Icon for Swap
  Home, 
  User, 
  Briefcase, 
  CheckCircle, 
  Clock, 
  XCircle, 
  MoreVertical, 
  FileText,
  Calculator,
  ArrowRight,
  Save,
  AlertCircle,
  Building
} from 'lucide-react';

export default function LoanSwap() {
  // --- STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState('requests'); // requests, initiate, history, calculator
  const [searchTerm, setSearchTerm] = useState('');
  
  // --- MOCK DATA ---
  const SWAP_REQUESTS = [
    { id: "SWP-1001", loanId: "LN-2023-880", customer: "Rahul Sharma", type: "Collateral Swap", oldVal: "Plot A-12", newVal: "Flat 404", status: "Pending Approval", date: "2025-02-10" },
    { id: "SWP-1002", loanId: "LN-2022-450", customer: "Priya Verma", type: "Balance Transfer (Out)", oldVal: "HDFC (10.5%)", newVal: "SBI (8.5%)", status: "Approved", date: "2025-02-08" },
    { id: "SWP-1003", loanId: "LN-2024-112", customer: "Amit Kumar", type: "Product Switch", oldVal: "Floating Rate", newVal: "Fixed Rate", status: "Processing", date: "2025-02-12" },
    { id: "SWP-1004", loanId: "LN-2021-009", customer: "Sneha Gupta", type: "Guarantor Swap", oldVal: "Mr. Raj", newVal: "Mrs. Sunita", status: "Rejected", date: "2025-01-25" },
  ];

  const HISTORY_LOGS = [
    { id: "SWP-0901", loanId: "LN-2020-555", customer: "Vikram Singh", type: "Collateral Swap", status: "Completed", date: "2024-12-15", processedBy: "Admin_1" },
    { id: "SWP-0902", loanId: "LN-2021-333", customer: "Anjali Rao", type: "Tenure Swap", status: "Completed", date: "2024-11-20", processedBy: "Manager_B" },
  ];

  // --- COMPONENTS ---

  const StatusBadge = ({ status }) => {
    const styles = {
      Approved: "bg-green-100 text-green-700 border-green-200",
      Completed: "bg-green-100 text-green-700 border-green-200",
      "Pending Approval": "bg-orange-50 text-orange-700 border-orange-200",
      Processing: "bg-blue-50 text-blue-700 border-blue-200",
      Rejected: "bg-red-50 text-red-700 border-red-200",
      default: "bg-gray-100 text-gray-700 border-gray-200"
    };

    const icons = {
      Approved: <CheckCircle className="w-3 h-3 mr-1" />,
      Completed: <CheckCircle className="w-3 h-3 mr-1" />,
      "Pending Approval": <Clock className="w-3 h-3 mr-1" />,
      Processing: <RefreshCw className="w-3 h-3 mr-1 animate-spin" />,
      Rejected: <XCircle className="w-3 h-3 mr-1" />
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full border ${styles[status] || styles.default}`}>
        {icons[status]}
        {status}
      </span>
    );
  };

  const StatCard = ({ title, value, icon: Icon, colorClass, bgClass }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start justify-between hover:shadow-md transition-all">
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
      </div>
      <div className={`p-3 rounded-xl ${bgClass}`}>
        <Icon className={`w-6 h-6 ${colorClass}`} />
      </div>
    </div>
  );

  // --- TAB CONTENT ---

  const renderContent = () => {
    switch (activeTab) {
      case 'requests':
        return (
          <div className="space-y-6 animate-in fade-in zoom-in duration-300">
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
               <StatCard title="Total Requests" value={SWAP_REQUESTS.length} icon={FileText} colorClass="text-blue-600" bgClass="bg-blue-50" />
               <StatCard title="Pending" value={SWAP_REQUESTS.filter(r => r.status.includes('Pending')).length} icon={Clock} colorClass="text-orange-600" bgClass="bg-orange-50" />
               <StatCard title="Collateral Swaps" value={SWAP_REQUESTS.filter(r => r.type === 'Collateral Swap').length} icon={Home} colorClass="text-purple-600" bgClass="bg-purple-50" />
               <StatCard title="Balance Transfer" value={SWAP_REQUESTS.filter(r => r.type.includes('Balance')).length} icon={Building} colorClass="text-green-600" bgClass="bg-green-50" />
            </div>

            {/* Filter & Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
               <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50/50">
                  <div className="relative w-full md:w-80">
                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                     <input 
                       type="text" 
                       placeholder="Search Loan ID or Customer..." 
                       className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                       value={searchTerm}
                       onChange={(e) => setSearchTerm(e.target.value)}
                     />
                  </div>
                  <div className="flex gap-2">
                     <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 flex items-center gap-2"><Filter size={16} /> Filter</button>
                     <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 flex items-center gap-2"><Download size={16} /> Export</button>
                  </div>
               </div>

               <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                     <thead className="bg-gray-50 text-gray-500 font-semibold border-b">
                        <tr>
                           <th className="px-6 py-4">Request ID</th>
                           <th className="px-6 py-4">Loan Info</th>
                           <th className="px-6 py-4">Swap Type</th>
                           <th className="px-6 py-4">Change Details</th>
                           <th className="px-6 py-4">Date</th>
                           <th className="px-6 py-4">Status</th>
                           <th className="px-6 py-4 text-right">Action</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-100">
                        {SWAP_REQUESTS.filter(item => item.loanId.toLowerCase().includes(searchTerm.toLowerCase()) || item.customer.toLowerCase().includes(searchTerm.toLowerCase())).map((req) => (
                           <tr key={req.id} className="hover:bg-blue-50/30 transition-colors">
                              <td className="px-6 py-4 font-medium text-gray-700">{req.id}</td>
                              <td className="px-6 py-4">
                                 <div className="font-medium text-gray-900">{req.customer}</div>
                                 <div className="text-xs text-blue-600 font-mono">{req.loanId}</div>
                              </td>
                              <td className="px-6 py-4"><span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium text-gray-600">{req.type}</span></td>
                              <td className="px-6 py-4">
                                 <div className="flex items-center gap-2 text-gray-600">
                                    <span className="line-through text-xs text-red-400">{req.oldVal}</span>
                                    <ArrowRight size={12} className="text-gray-400" />
                                    <span className="font-medium text-green-600">{req.newVal}</span>
                                 </div>
                              </td>
                              <td className="px-6 py-4 text-gray-500">{req.date}</td>
                              <td className="px-6 py-4"><StatusBadge status={req.status} /></td>
                              <td className="px-6 py-4 text-right">
                                 <button className="p-2 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50 transition"><MoreVertical size={18}/></button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
          </div>
        );

      case 'initiate':
        return (
          <div className="max-w-3xl mx-auto animate-in slide-in-from-right duration-300">
             <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                   <ArrowRightLeft className="text-blue-600"/> Initiate New Swap
                </h2>
                
                <form className="space-y-6">
                   {/* Loan Selection */}
                   <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Select Loan Account</label>
                      <div className="relative">
                         <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                         <input type="text" placeholder="Search Loan ID to swap..." className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                      </div>
                   </div>

                   {/* Swap Type Selection */}
                   <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Select Swap Category</label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                         {['Collateral', 'Product', 'Guarantor', 'Balance Transfer'].map(type => (
                            <label key={type} className="cursor-pointer">
                               <input type="radio" name="swapType" className="peer sr-only" />
                               <div className="p-3 border rounded-xl text-center text-sm font-medium text-gray-600 peer-checked:bg-blue-50 peer-checked:border-blue-500 peer-checked:text-blue-700 transition-all hover:bg-gray-50">
                                  {type}
                               </div>
                            </label>
                         ))}
                      </div>
                   </div>

                   {/* Dynamic Fields based on Swap Type (Mocked for all) */}
                   <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-4">
                      <h3 className="font-bold text-gray-700 border-b pb-2 mb-4">Swap Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Current Value (Old)</label>
                            <input type="text" value="Plot A-12 (Mock Data)" disabled className="w-full p-2.5 border border-gray-300 bg-gray-100 rounded-lg text-gray-500" />
                         </div>
                         <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">New Value (Proposed)</label>
                            <input type="text" placeholder="Enter new detail..." className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                         </div>
                         <div className="col-span-1 md:col-span-2">
                            <label className="block text-xs font-bold text-gray-500 mb-1">Reason for Swap</label>
                            <textarea rows="2" className="w-full p-2.5 border border-gray-300 rounded-lg resize-none" placeholder="Customer request, better rates, etc..."></textarea>
                         </div>
                         <div className="col-span-1 md:col-span-2">
                            <label className="block text-xs font-bold text-gray-500 mb-1">Upload Supporting Documents</label>
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-gray-400 hover:bg-white hover:border-blue-400 transition cursor-pointer">
                               <FileText size={24} className="mb-2"/>
                               <span className="text-xs">Click to upload Legal/Valuation Reports</span>
                            </div>
                         </div>
                      </div>
                   </div>

                   {/* Actions */}
                   <div className="flex justify-end gap-4 pt-4">
                      <button type="button" className="px-6 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl font-medium">Cancel</button>
                      <button type="button" className="px-8 py-2.5 bg-blue-600 text-white rounded-xl font-medium shadow-lg hover:bg-blue-700 flex items-center gap-2">
                         <Save size={18} /> Submit Request
                      </button>
                   </div>
                </form>
             </div>
          </div>
        );

      case 'history':
        return (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden animate-in fade-in zoom-in duration-300">
             <div className="p-6 border-b border-gray-100">
                <h3 className="font-bold text-gray-800">Swap History Log</h3>
             </div>
             <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-500 font-semibold">
                   <tr>
                      <th className="px-6 py-3">Log ID</th>
                      <th className="px-6 py-3">Loan ID</th>
                      <th className="px-6 py-3">Customer</th>
                      <th className="px-6 py-3">Swap Type</th>
                      <th className="px-6 py-3">Processed By</th>
                      <th className="px-6 py-3">Date</th>
                      <th className="px-6 py-3 text-right">Status</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                   {HISTORY_LOGS.map((log) => (
                      <tr key={log.id} className="hover:bg-gray-50">
                         <td className="px-6 py-4 text-gray-500">{log.id}</td>
                         <td className="px-6 py-4 text-blue-600 font-medium">{log.loanId}</td>
                         <td className="px-6 py-4">{log.customer}</td>
                         <td className="px-6 py-4">{log.type}</td>
                         <td className="px-6 py-4 text-gray-500 flex items-center gap-2"><User size={14}/> {log.processedBy}</td>
                         <td className="px-6 py-4 text-gray-500">{log.date}</td>
                         <td className="px-6 py-4 text-right"><StatusBadge status={log.status} /></td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
        );

      case 'calculator':
         return (
            <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom duration-300">
               <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                     <Calculator className="text-purple-600"/> Balance Transfer Saver
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     {/* Input Section */}
                     <div className="space-y-4">
                        <h3 className="font-bold text-gray-600 border-b pb-2">Current Loan</h3>
                        <div className="grid grid-cols-2 gap-4">
                           <div><label className="text-xs font-bold text-gray-500">Outstanding (₹)</label><input type="number" className="w-full p-2 border rounded" defaultValue={2500000} /></div>
                           <div><label className="text-xs font-bold text-gray-500">Current ROI (%)</label><input type="number" className="w-full p-2 border rounded" defaultValue={9.5} /></div>
                           <div><label className="text-xs font-bold text-gray-500">Rem. Tenure (Yr)</label><input type="number" className="w-full p-2 border rounded" defaultValue={15} /></div>
                        </div>

                        <h3 className="font-bold text-gray-600 border-b pb-2 mt-6">New Offer</h3>
                        <div className="grid grid-cols-2 gap-4">
                           <div><label className="text-xs font-bold text-gray-500">New ROI (%)</label><input type="number" className="w-full p-2 border rounded border-green-300 bg-green-50" defaultValue={8.35} /></div>
                           <div><label className="text-xs font-bold text-gray-500">Processing Fee</label><input type="number" className="w-full p-2 border rounded" defaultValue={5000} /></div>
                        </div>
                        <button className="w-full mt-4 bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 transition">Calculate Savings</button>
                     </div>

                     {/* Result Section (Static Mock for Visual) */}
                     <div className="bg-purple-50 p-6 rounded-xl border border-purple-100 flex flex-col justify-center">
                        <div className="text-center mb-6">
                           <span className="text-sm font-bold text-purple-600 uppercase tracking-wider">Total Savings</span>
                           <div className="text-4xl font-extrabold text-purple-900 mt-2">₹ 3,45,200</div>
                           <p className="text-xs text-purple-500 mt-1">*Approx. savings over remaining tenure</p>
                        </div>
                        
                        <div className="space-y-3">
                           <div className="flex justify-between text-sm border-b border-purple-200 pb-2">
                              <span className="text-gray-600">Current EMI</span>
                              <span className="font-bold">₹ 26,106</span>
                           </div>
                           <div className="flex justify-between text-sm border-b border-purple-200 pb-2">
                              <span className="text-gray-600">New EMI</span>
                              <span className="font-bold text-green-600">₹ 24,300</span>
                           </div>
                           <div className="flex justify-between text-sm pt-2">
                              <span className="text-gray-600">Monthly Saving</span>
                              <span className="font-bold text-green-600">+ ₹ 1,806</span>
                           </div>
                        </div>

                        <div className="mt-6 bg-white p-4 rounded-lg border border-purple-100 text-xs text-gray-500 flex gap-2 items-start">
                           <AlertCircle size={16} className="flex-shrink-0 text-purple-400" />
                           <span>Recommendation: Proceed with swap. The ROI difference is significant (&gt;0.5%).</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         );

      default: return null;
    }
  };

  // --- MAIN RETURN ---

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-10 font-sans">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <RefreshCw className="text-blue-600" size={32}/> Loan Swap Management
          </h1>
          <p className="text-gray-500 mt-1 ml-11">Manage collateral swaps, balance transfers, and product switching.</p>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-xs font-bold text-gray-400 uppercase">System Date</p>
          <p className="text-lg font-bold text-gray-700">{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto gap-2 mb-8 pb-2 border-b border-gray-200 no-scrollbar">
        {[
          { id: 'requests', label: 'Swap Requests', icon: FileText },
          { id: 'initiate', label: 'Initiate Swap', icon: ArrowRightLeft },
          { id: 'history', label: 'Swap History', icon: CheckCircle },
          { id: 'calculator', label: 'Savings Calculator', icon: Calculator },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-3 rounded-t-xl font-medium transition-all relative top-[1px] whitespace-nowrap
              ${activeTab === tab.id
                ? "bg-white text-blue-600 border border-gray-200 border-b-white z-10 shadow-sm"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              }`}
          >
            <tab.icon size={18} /> {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[500px]">
        {renderContent()}
      </div>
    </div>
  );
}