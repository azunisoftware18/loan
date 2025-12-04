import React, { useState } from 'react';
import { 
  Calendar, 
  FileText, 
  Settings, 
  PlusCircle, 
  List, 
  Download,
  Upload,
  Edit,
  Trash2,
  Search,
  Filter
} from 'lucide-react';

function ScheduleTransaction() {
  const [activeTab, setActiveTab] = useState('master');

  // Sample data for demonstration
  const masterData = [
    { id: 1, name: 'Schedule A', type: 'Monthly', status: 'Active' },
    { id: 2, name: 'Schedule B', type: 'Quarterly', status: 'Active' },
    { id: 3, name: 'Schedule C', type: 'Yearly', status: 'Inactive' },
  ];

  const voucherData = [
    { id: 1, voucherNo: 'V001', date: '2024-01-15', amount: 5000, status: 'Approved' },
    { id: 2, voucherNo: 'V002', date: '2024-01-16', amount: 7500, status: 'Pending' },
    { id: 3, voucherNo: 'V003', date: '2024-01-17', amount: 12000, status: 'Approved' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Schedule Transaction</h1>
          </div>
          <p className="text-gray-600">Manage your schedule master data and vouchers in one place</p>
        </div>

        {/* Tabs Navigation */}
        <div className="mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('master')}
              className={`flex items-center gap-2 px-4 py-3 font-medium transition-all ${activeTab === 'master' 
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' 
                : 'text-gray-600 hover:text-blue-500 hover:bg-gray-50'}`}
            >
              <Settings className="w-5 h-5" />
              Schedule Master
            </button>
            <button
              onClick={() => setActiveTab('voucher')}
              className={`flex items-center gap-2 px-4 py-3 font-medium transition-all ${activeTab === 'voucher' 
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' 
                : 'text-gray-600 hover:text-blue-500 hover:bg-gray-50'}`}
            >
              <FileText className="w-5 h-5" />
              Schedule Voucher
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200">
          
          {/* Tab Content - Schedule Master */}
          {activeTab === 'master' && (
            <div className="p-4 md:p-6">
              {/* Master Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <Settings className="w-6 h-6" />
                    Schedule Master Management
                  </h2>
                  <p className="text-gray-600 mt-1">Create and manage schedule templates</p>
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                    <PlusCircle className="w-4 h-4" />
                    Add Master
                  </button>
                  <button className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition">
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                </div>
              </div>

              {/* Search and Filter */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search schedules..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <button className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
              </div>

              {/* Master Table */}
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {masterData.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{item.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{item.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                            {item.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 text-xs rounded-full ${item.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex gap-2">
                            <button className="text-blue-600 hover:text-blue-800 p-1">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-800 p-1">
                              <Trash2 className="w-4 h-4" />
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

          {/* Tab Content - Schedule Voucher */}
          {activeTab === 'voucher' && (
            <div className="p-4 md:p-6">
              {/* Voucher Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <FileText className="w-6 h-6" />
                    Schedule Voucher Management
                  </h2>
                  <p className="text-gray-600 mt-1">Create and manage schedule vouchers</p>
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                    <PlusCircle className="w-4 h-4" />
                    New Voucher
                  </button>
                  <button className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition">
                    <Upload className="w-4 h-4" />
                    Import
                  </button>
                </div>
              </div>

              {/* Voucher Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-600">Total Vouchers</p>
                      <p className="text-2xl font-bold text-gray-800">24</p>
                    </div>
                    <List className="w-8 h-8 text-blue-500" />
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-600">Approved</p>
                      <p className="text-2xl font-bold text-gray-800">18</p>
                    </div>
                    <FileText className="w-8 h-8 text-green-500" />
                  </div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-yellow-600">Pending</p>
                      <p className="text-2xl font-bold text-gray-800">6</p>
                    </div>
                    <Calendar className="w-8 h-8 text-yellow-500" />
                  </div>
                </div>
              </div>

              {/* Voucher Table */}
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Voucher No.</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {voucherData.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.voucherNo}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{item.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">₹{item.amount.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 text-xs rounded-full ${item.status === 'Approved' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex gap-2">
                            <button className="text-blue-600 hover:text-blue-800 p-1">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-800 p-1">
                              <FileText className="w-4 h-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-800 p-1">
                              <Trash2 className="w-4 h-4" />
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
        </div>

        {/* Footer Info */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Switch between tabs to manage Schedule Master and Vouchers</p>
        </div>
      </div>
    </div>
  );
}

export default ScheduleTransaction;