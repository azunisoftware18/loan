import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Clock, 
  AlertCircle, 
  MoreVertical, 
  CheckCircle, 
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
  Wallet
} from 'lucide-react';

const Dashboard = () => {

  // Dummy Data for Recent Requests
  const recentLoans = [
    { id: "#LN-2023", name: "Amit Sharma", amount: "₹50,000", type: "Personal", status: "Pending", date: "26 Oct, 2025" },
    { id: "#LN-2022", name: "Priya Singh", amount: "₹2,00,000", type: "Home Loan", status: "Approved", date: "25 Oct, 2025" },
    { id: "#LN-2021", name: "Rahul Verma", amount: "₹25,000", type: "Emergency", status: "Rejected", date: "24 Oct, 2025" },
    { id: "#LN-2020", name: "Sneha Gupta", amount: "₹1,50,000", type: "Business", status: "Pending", date: "24 Oct, 2025" },
    { id: "#LN-2019", name: "Vikram Malhotra", amount: "₹80,000", type: "Personal", status: "Approved", date: "23 Oct, 2025" },
  ];

  return (
    <div className="space-y-6">
      
      {/* 1. TOP STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1: Total Disbursed */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-36">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Disbursed</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">₹45.2 Lakh</h3>
            </div>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Wallet size={20} />
            </div>
          </div>
          <div className="flex items-center text-sm text-green-600 font-medium">
             <ArrowUpRight size={16} className="mr-1" />
             <span>+12.5%</span>
             <span className="text-gray-400 font-normal ml-2">from last month</span>
          </div>
        </div>

        {/* Card 2: Active Loans */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-36">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium">Active Loans</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">1,240</h3>
            </div>
            <div className="p-2 bg-green-50 text-green-600 rounded-lg">
              <Users size={20} />
            </div>
          </div>
          <div className="flex items-center text-sm text-green-600 font-medium">
             <ArrowUpRight size={16} className="mr-1" />
             <span>+4.2%</span>
             <span className="text-gray-400 font-normal ml-2">new borrowers</span>
          </div>
        </div>

        {/* Card 3: Pending Requests */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-36">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium">Pending Requests</p>
              <h3 className="text-2xl font-bold text-orange-600 mt-1">45</h3>
            </div>
            <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
              <Clock size={20} />
            </div>
          </div>
          <p className="text-xs text-gray-400">Requires immediate attention</p>
        </div>

        {/* Card 4: Overdue/NPA */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-36">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium">Overdue Loans</p>
              <h3 className="text-2xl font-bold text-red-600 mt-1">₹2.4 Lakh</h3>
            </div>
            <div className="p-2 bg-red-50 text-red-600 rounded-lg">
              <AlertCircle size={20} />
            </div>
          </div>
          <div className="flex items-center text-sm text-red-500 font-medium">
             <ArrowDownRight size={16} className="mr-1" />
             <span>2.1%</span>
             <span className="text-gray-400 font-normal ml-2">increase rate</span>
          </div>
        </div>
      </div>

      {/* 2. MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT SIDE: Recent Loan Requests Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
             <h2 className="font-bold text-gray-800">Recent Loan Requests</h2>
             <button className="text-blue-600 text-sm hover:underline">View All</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                <tr>
                  <th className="px-6 py-4 font-semibold">Borrower</th>
                  <th className="px-6 py-4 font-semibold">Amount</th>
                  <th className="px-6 py-4 font-semibold">Type</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentLoans.map((loan) => (
                  <tr key={loan.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-800 text-sm">{loan.name}</span>
                        <span className="text-xs text-gray-400">{loan.id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700 font-medium text-sm">{loan.amount}</td>
                    <td className="px-6 py-4 text-gray-500 text-sm">{loan.type}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border
                        ${loan.status === 'Approved' ? 'bg-green-50 text-green-700 border-green-100' : ''}
                        ${loan.status === 'Pending' ? 'bg-orange-50 text-orange-700 border-orange-100' : ''}
                        ${loan.status === 'Rejected' ? 'bg-red-50 text-red-700 border-red-100' : ''}
                      `}>
                        {loan.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <button className="text-gray-400 hover:text-gray-600 p-1">
                          <MoreVertical size={16} />
                       </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT SIDE: Quick Actions & Mini Chart */}
        <div className="space-y-6">
           
           {/* Simple Recovery Status (Visual Representation) */}
           <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-4">Recovery Status</h3>
              <div className="flex items-center justify-center py-4">
                 {/* CSS Only Circular Progress (Mock) */}
                 <div className="relative w-32 h-32 rounded-full border-8 border-gray-100 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-8 border-blue-600 border-t-transparent border-r-transparent transform -rotate-45" style={{clipPath: 'circle(50%)'}}></div>
                    <div className="text-center">
                       <span className="block text-2xl font-bold text-gray-800">85%</span>
                       <span className="text-xs text-gray-400">Recovered</span>
                    </div>
                 </div>
              </div>
              <div className="flex justify-between text-sm mt-4 text-gray-600">
                 <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                    Collected
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-200"></div>
                    Pending
                 </div>
              </div>
           </div>

           {/* Quick Actions Card */}
           <div className="bg-gradient-to-br from-[#0d1117] to-gray-800 p-6 rounded-2xl shadow-lg text-white">
              <h3 className="font-bold text-lg mb-1">Quick Actions</h3>
              <p className="text-gray-400 text-xs mb-6">Manage high priority tasks</p>
              
              <div className="space-y-3">
                 <button className="w-full flex items-center justify-between p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all backdrop-blur-sm border border-white/5">
                    <div className="flex items-center gap-3">
                       <CheckCircle size={18} className="text-green-400" />
                       <span className="text-sm font-medium">Approve Bulk Loans</span>
                    </div>
                    <ArrowUpRight size={16} className="text-gray-400" />
                 </button>

                 <button className="w-full flex items-center justify-between p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all backdrop-blur-sm border border-white/5">
                    <div className="flex items-center gap-3">
                       <Users size={18} className="text-blue-400" />
                       <span className="text-sm font-medium">Add New Borrower</span>
                    </div>
                    <ArrowUpRight size={16} className="text-gray-400" />
                 </button>
              </div>
           </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;