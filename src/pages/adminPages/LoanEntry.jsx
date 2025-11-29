import React, { useState } from "react";
import { 
  Search, 
  Filter, 
  Eye, 
  Check, 
  X, 
  Edit,
  Calendar,
  User, 
  DollarSign,
  FileText, 
  CheckCircle, 
  Clock,
  AlertCircle,
  Briefcase,
  Download
} from "lucide-react";

export default function LoanEntry() {
  const [activeTab, setActiveTab] = useState("viewModify");

  // Sample data for demonstration
  const loanApplications = [
    {
      id: 1,
      customer: "Rahul Sharma",
      loanAmount: "₹50,000",
      status: "Pending",
      applicationDate: "2025-01-15",
      type: "Personal"
    },
    {
      id: 2,
      customer: "Priya Patel",
      loanAmount: "₹75,000",
      status: "Under Review",
      applicationDate: "2025-01-14",
      type: "Business"
    },
    {
      id: 3,
      customer: "Amit Kumar",
      loanAmount: "₹1,00,000",
      status: "Approved",
      applicationDate: "2025-01-10",
      type: "Home"
    },
    {
      id: 4,
      customer: "Sneha Gupta",
      loanAmount: "₹2,50,000",
      status: "Rejected",
      applicationDate: "2025-01-08",
      type: "Education"
    }
  ];

  const bookingList = [
    {
      id: 1,
      customer: "Amit Verma",
      loanAmount: "₹1,20,000",
      emiStart: "10 Dec 2025",
      disbursementDate: "15 Jan 2025",
      tenure: "24 months"
    },
    {
      id: 2,
      customer: "Neha Singh",
      loanAmount: "₹80,000",
      emiStart: "05 Jan 2025",
      disbursementDate: "20 Dec 2024",
      tenure: "18 months"
    },
    {
      id: 3,
      customer: "Rajesh Mehta",
      loanAmount: "₹2,00,000",
      emiStart: "20 Feb 2025",
      disbursementDate: "10 Jan 2025",
      tenure: "36 months"
    }
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6 lg:p-10">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Loan Management</h1>
          <p className="text-gray-500 mt-1">Manage loan applications, approvals, and booking records.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-colors shadow-sm font-medium">
          <Download size={18} />
          Export Report
        </button>
      </div>

      {/* Statistics Cards (Global Stats) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">Total Applications</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">{loanApplications.length}</h3>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <FileText size={24} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">Approved Loans</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">
               {loanApplications.filter(l => l.status === "Approved").length}
            </h3>
          </div>
          <div className="p-3 bg-green-50 text-green-600 rounded-xl">
            <CheckCircle size={24} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">Pending Review</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">
              {loanApplications.filter(l => l.status === "Pending" || l.status === "Under Review").length}
            </h3>
          </div>
          <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
            <Clock size={24} />
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
        <div className="flex border-b border-gray-100">
          <button
            className={`flex-1 px-6 py-4 text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
              activeTab === "viewModify"
                ? "bg-blue-50/50 text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab("viewModify")}
          >
            <Briefcase size={18} />
            View / Modify Loan
          </button>

          <button
            className={`flex-1 px-6 py-4 text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
              activeTab === "bookingList"
                ? "bg-blue-50/50 text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab("bookingList")}
          >
            <Calendar size={18} />
            Update Booking List
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-white shadow-sm rounded-2xl border border-gray-200 overflow-hidden min-h-[500px]">
        
        {/* TAB 1: View/Modify Loan */}
        {activeTab === "viewModify" && (
          <div className="p-6">
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Loan Applications</h2>
                <p className="text-sm text-gray-500">Review pending applications</p>
              </div>
              
              <div className="flex gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                  />
                </div>
                <button className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-600">
                  <Filter size={18} />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-100">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="p-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {loanApplications.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                            {app.customer.charAt(0)}
                          </div>
                          <span className="font-medium text-gray-900">{app.customer}</span>
                        </div>
                      </td>
                      <td className="p-4 text-gray-600 text-sm">{app.type}</td>
                      <td className="p-4 font-medium text-gray-900">{app.loanAmount}</td>
                      <td className="p-4 text-gray-500 text-sm">{app.applicationDate}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                          ${app.status === "Approved" ? "bg-green-50 text-green-700 border-green-100" : ""}
                          ${app.status === "Pending" ? "bg-orange-50 text-orange-700 border-orange-100" : ""}
                          ${app.status === "Under Review" ? "bg-blue-50 text-blue-700 border-blue-100" : ""}
                          ${app.status === "Rejected" ? "bg-red-50 text-red-700 border-red-100" : ""}
                        `}>
                          {app.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex justify-end gap-2">
                          <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View">
                            <Eye size={18} />
                          </button>
                          <button className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Approve">
                            <Check size={18} />
                          </button>
                          <button className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Reject">
                            <X size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: Update Booking List */}
        {activeTab === "bookingList" && (
          <div className="p-6">
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Booking Records</h2>
                <p className="text-sm text-gray-500">Update EMI dates & disbursement</p>
              </div>

              <div className="flex gap-3 w-full sm:w-auto">
                 <div className="relative flex-1 sm:w-48">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                   <input
                     type="text"
                     placeholder="Search..."
                     className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm"
                   />
                 </div>
                 <div className="relative sm:w-40">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input type="month" className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm bg-white" />
                 </div>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-100">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Disbursement</th>
                    <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">EMI Start</th>
                    <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Tenure</th>
                    <th className="p-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Modify</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {bookingList.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-xs">
                             {booking.customer.charAt(0)}
                           </div>
                           <span className="font-medium text-gray-900">{booking.customer}</span>
                        </div>
                      </td>
                      <td className="p-4 text-gray-600 text-sm flex items-center gap-2">
                        <CheckCircle size={14} className="text-green-500"/> {booking.disbursementDate}
                      </td>
                      <td className="p-4 text-gray-600 text-sm">{booking.emiStart}</td>
                      <td className="p-4 font-medium text-gray-900">{booking.loanAmount}</td>
                      <td className="p-4 text-gray-600 text-sm">{booking.tenure}</td>
                      <td className="p-4 text-right">
                        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">
                          <Edit size={14} /> Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}