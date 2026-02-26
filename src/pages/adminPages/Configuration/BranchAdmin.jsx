import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Edit, 
  Loader,
  AlertCircle,
  CheckCircle,
  Building2,
  User,
  Mail,
  Phone
} from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { useBranchAdmin } from '../../../hooks/useBranchAdmin';
import BranchAdminModal from '../../../components/admin/modals/BranchAdminModal';
import ActionMenu from '../../../components/admin/common/ActionMenu';


const BranchAdminPage = () => {
  const {
    branchAdmins = [],
    branches = [],
    loading,
    getAllBranchAdmins,
    getAllBranches,
    createBranchAdmin,
    updateBranchAdmin
  } = useBranchAdmin();

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [localError, setLocalError] = useState('');
  const getAdminActions = (admin) => [
  {
    label: "Edit",
    icon: <Edit size={16} />,
    onClick: () => openEditModal(admin),
  },
];

  // Load data on component mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      await Promise.all([
        getAllBranchAdmins(),
        getAllBranches()
      ]);
    } catch (error) {
      console.error('Error loading data:', error);
      setLocalError('Failed to load data. Please refresh the page.');
    }
  };

  const handleAddAdmin = async (data) => {
    return await createBranchAdmin(data);
  };

  const handleEditAdmin = async (id, data) => {
    return await updateBranchAdmin(id, data);
  };

  const openAddModal = () => {
    setSelectedAdmin(null);
    setIsModalOpen(true);
  };

  const openEditModal = (admin) => {
    setSelectedAdmin(admin);
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (data) => {
    if (selectedAdmin) {
      // Edit mode
      return await handleEditAdmin(selectedAdmin.id, data);
    } else {
      // Add mode
      return await handleAddAdmin(data);
    }
  };

  // Safely filter branch admins based on search
  const filteredAdmins = Array.isArray(branchAdmins) 
    ? branchAdmins.filter(admin => {
        if (!admin) return false;
        
        const searchLower = searchTerm.toLowerCase();
        return (
          (admin.fullName?.toLowerCase() || '').includes(searchLower) ||
          (admin.email?.toLowerCase() || '').includes(searchLower) ||
          (admin.userName?.toLowerCase() || '').includes(searchLower) ||
          (admin.contactNumber || '').includes(searchTerm) ||
          (admin.branch?.name?.toLowerCase() || '').includes(searchLower)
        );
      })
    : [];

  // Status Badge Component
  const StatusBadge = ({ isActive }) => {
    return isActive ? (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        <CheckCircle size={12} className="mr-1" />
        Active
      </span>
    ) : (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
        <AlertCircle size={12} className="mr-1" />
        Inactive
      </span>
    );
  };

  // Calculate stats safely
  const totalAdmins = Array.isArray(branchAdmins) ? branchAdmins.length : 0;
  const activeAdmins = Array.isArray(branchAdmins) 
    ? branchAdmins.filter(a => a?.isActive).length 
    : 0;
  const inactiveAdmins = Array.isArray(branchAdmins) 
    ? branchAdmins.filter(a => a && !a.isActive).length 
    : 0;
  const totalBranches = Array.isArray(branches) ? branches.length : 0;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Branch Admin Management</h1>
          <p className="text-gray-500 mt-1">Manage administrators for all branches</p>
        </div>
        
        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 flex items-center gap-2 text-sm font-medium transition"
        >
          <Plus size={18} />
          Add Branch Admin
        </button>
      </div>

      {/* Error Message */}
      {localError && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            <p className="text-red-700">{localError}</p>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Admins</p>
              <p className="text-2xl font-bold text-gray-900">{totalAdmins}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-full">
              <User className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Admins</p>
              <p className="text-2xl font-bold text-green-600">{activeAdmins}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Branches</p>
              <p className="text-2xl font-bold text-gray-900">{totalBranches}</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-full">
              <Building2 className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Inactive</p>
              <p className="text-2xl font-bold text-red-600">{inactiveAdmins}</p>
            </div>
            <div className="p-3 bg-red-50 rounded-full">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        {/* Search Bar */}
        <div className="p-5 border-b flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by name, email, branch..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="text-sm text-gray-500">
            {filteredAdmins.length} {filteredAdmins.length === 1 ? 'admin' : 'admins'} found
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {loading?.list ? (
            <div className="flex justify-center items-center p-12">
              <Loader className="h-8 w-8 text-blue-600 animate-spin" />
              <span className="ml-2 text-gray-600">Loading branch admins...</span>
            </div>
          ) : filteredAdmins.length === 0 ? (
            <div className="text-center p-12">
              <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No branch admins found</p>
              {searchTerm && (
                <p className="text-gray-400 mt-2">Try adjusting your search</p>
              )}
              {!searchTerm && totalAdmins === 0 && (
                <button
                  onClick={openAddModal}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Your First Branch Admin
                </button>
              )}
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-bold border-b">Full Name</th>
                  <th className="px-6 py-4 font-bold border-b">Email</th>
                  <th className="px-6 py-4 font-bold border-b">Username</th>
                  <th className="px-6 py-4 font-bold border-b">Contact</th>
                  <th className="px-6 py-4 font-bold border-b">Branch</th>
                  <th className="px-6 py-4 font-bold border-b">Status</th>
                  <th className="px-6 py-4 font-bold border-b text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filteredAdmins.map((admin) => (
                  admin && (
                    <tr key={admin.id} className="hover:bg-blue-50/30 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        <div className="flex items-center">
                          <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                            <User size={16} className="text-blue-600" />
                          </div>
                          {admin.fullName || 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center text-gray-600">
                          <Mail size={14} className="mr-1 text-gray-400" />
                          {admin.email || 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-mono text-gray-500">{admin.userName || 'N/A'}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center text-gray-600">
                          <Phone size={14} className="mr-1 text-gray-400" />
                          {admin.contactNumber || 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <Building2 size={14} className="mr-1 text-gray-400" />
                          {admin.branch?.name || 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge isActive={admin.isActive} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <ActionMenu actions={getAdminActions(admin)} />
                      </td>
                    </tr>
                  )
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Table Footer */}
        {filteredAdmins.length > 0 && (
          <div className="p-4 border-t bg-gray-50 text-sm text-gray-500">
            Showing {filteredAdmins.length} of {totalAdmins} admins
          </div>
        )}
      </div>

      {/* Single Modal for both Add and Edit */}
      <BranchAdminModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedAdmin(null);
        }}
        onSubmit={handleModalSubmit}
        admin={selectedAdmin}
        branches={branches}
        loading={selectedAdmin ? loading?.update : loading?.create}
      />
    </div>
  );
};

export default BranchAdminPage;