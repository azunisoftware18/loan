import React, { useState, useEffect } from 'react';
import { Phone, MoreVertical, ChevronLeft, ChevronRight, Mail, MapPin, PhoneCall, Edit, Trash2, User } from 'lucide-react';
import axios from "axios";
const VIEW_ALL_LEAD_URL = import.meta.env.VITE_VIEW_ALL_LEAD_URL;


const UserDetails = () => {

  const [loanData, setLoanData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [activeMenu, setActiveMenu] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);



  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          import.meta.env.VITE_VIEW_ALL_LEAD_URL,
          { withCredentials: true }
        );

        setLoanData(response.data.data || []);
        setFilteredData(response.data.data || []);
      } catch (error) {
        console.error(
          "Error fetching leads:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);





  // Pagination logic
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = filteredData.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const toggleMenu = (id) => {
    setActiveMenu(activeMenu === id ? null : id);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (activeMenu) setActiveMenu(null);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [activeMenu]);

  const getLoanTypeColor = (type) => {
    const colors = {
      'Home_Loan': 'bg-blue-50 text-blue-700 border-blue-200',
      'Personal_Loan': 'bg-purple-50 text-purple-700 border-purple-200',
      'Car_Loan': 'bg-green-50 text-green-700 border-green-200',
      'Business_Loan': 'bg-amber-50 text-amber-700 border-amber-200',
      'Education_Loan': 'bg-indigo-50 text-indigo-700 border-indigo-200'
    };
    return colors[type] || 'bg-gray-50 text-gray-700 border-gray-200';
  };


  useEffect(() => {
  if (!searchTerm) {
    setFilteredData(loanData);
    return;
  }

  const lowerSearch = searchTerm.toLowerCase();

  const filtered = loanData.filter((item) =>
    item.fullName?.toLowerCase().includes(lowerSearch) ||
    item.email?.toLowerCase().includes(lowerSearch) ||
    item.contactNumber?.includes(searchTerm) ||
    item.city?.toLowerCase().includes(lowerSearch) ||
    item.loanType?.toLowerCase().includes(lowerSearch)
  );

  setFilteredData(filtered);
  setCurrentPage(1); // search pe page reset
}, [searchTerm, loanData]);

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">User Lead Management</h1>
          <p className="text-gray-600">Manage and view all loan application details</p>
        </div>

        {/* Stats and Search Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-1">User Details</h2>
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm">
                  <User size={14} />
                  Total: {filteredData.length} Records
                </span>
                {searchTerm && (
                  <span className="text-sm text-gray-500">
                    Found {filteredData.length} matching records
                  </span>
                )}
              </div>
            </div>

            <div className="w-full md:w-64">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

          {loading && (<div className="p-6 text-center text-gray-500"> Loading user leads... </div>)}
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-8 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-8 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Contact Details
                  </th>
                  <th className="px-8 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-8 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Loan Type
                  </th>
                  <th className="px-8 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Loan Amount
                  </th>

                  <th className="px-8 py-4 text-right text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {currentItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    {/* Name Column */}
                    <td className="px-8 py-5">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold">
                          {item.fullName.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-base font-semibold text-gray-900">{item.fullName}</div>
                          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                            <Mail size={12} />
                            {item.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Contact Column */}
                    <td className="px-8 py-5">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Phone size={14} className="text-gray-400" />
                          <span className="text-sm text-gray-900 font-medium">{item.contactNumber}</span>
                        </div>
                        <a
                          href={`tel:${item.contactNumber}`}
                          className="inline-flex items-center gap-2 px-3 py-1.5 text-xs bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                        >
                          <PhoneCall size={12} />
                          Call Customer
                        </a>
                      </div>
                    </td>

                    {/* Location Column */}
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-gray-400" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{item.city}</div>
                          <div className="text-xs text-gray-500">{item.state}</div>
                        </div>
                      </div>
                    </td>

                    {/* Loan Type Column */}
                    <td className="px-8 py-5">
                      <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border ${getLoanTypeColor(item.loanType)}`}>
                        {item.loanType}
                      </span>
                    </td>

                    <td className="px-8 py-5">
                      <span className="text-sm font-semibold text-gray-900">
                        ₹ {item.loanAmount?.toLocaleString("en-IN")}
                      </span>
                    </td>


                    {/* Actions Column */}
                    <td className="px-8 py-5 text-right relative">
                      <div className="flex justify-end">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleMenu(item.id);
                          }}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <MoreVertical size={20} className="text-gray-500" />
                        </button>

                        {activeMenu === item.id && (
                          <div className="absolute right-12 mt-10 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">

                            <a
                              href={`tel:${item.contactNumber}`}
                              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              <PhoneCall size={16} className="text-green-600" />
                              Call Now
                            </a>
                            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-gray-50">
                              <Trash2 size={16} />
                              Delete Record
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-8 py-4 border-t border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600">
              Showing <span className="font-semibold">{firstIndex + 1}</span> to{" "}
              <span className="font-semibold">{Math.min(lastIndex, filteredData.length)}</span> of{" "}
              <span className="font-semibold">{filteredData.length}</span> entries
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`p-2.5 rounded-lg border ${currentPage === 1
                  ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                  : 'border-gray-300 text-gray-700 hover:bg-white hover:shadow-sm transition-all'}`}
              >
                <ChevronLeft size={18} />
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-10 h-10 rounded-lg text-sm font-medium ${currentPage === pageNum
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`p-2.5 rounded-lg border ${currentPage === totalPages
                  ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                  : 'border-gray-300 text-gray-700 hover:bg-white hover:shadow-sm transition-all'}`}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No users found</h3>
            <p className="text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;