import React, { useState } from 'react';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Save, 
  X, 
  Shield,
  Users,
  FileText,
  CreditCard,
  BarChart2,
  Settings,
  Lock,
  Mail,
  User
} from 'lucide-react';

const AdminRoles = () => {
  // Module definitions with icons
  const modules = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart2 },
    { id: 'customers', name: 'Customers', icon: Users },
    { id: 'loans', name: 'Loans', icon: CreditCard },
    { id: 'payments', name: 'Payments', icon: FileText },
    { id: 'reports', name: 'Reports', icon: BarChart2 },
    { id: 'settings', name: 'Settings', icon: Settings },
    { id: 'adminManagement', name: 'Admin Management', icon: Lock },
  ];

  // Initial roles data with login credentials
  const initialRoles = [
    {
      id: 1,
      name: 'Super Admin',
      description: 'Complete system access with all permissions',
      email: 'superadmin@loanapp.com',
      password: 'admin123',
      permissions: ['dashboard', 'customers', 'loans', 'payments', 'reports', 'settings', 'adminManagement'],
      userCount: 1,
      color: 'bg-red-50 text-red-700 border-red-200'
    },
    {
      id: 2,
      name: 'Manager',
      description: 'Managerial access for loan operations',
      email: 'manager@loanapp.com',
      password: 'manager123',
      permissions: ['dashboard', 'customers', 'loans', 'payments', 'reports'],
      userCount: 3,
      color: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    {
      id: 3,
      name: 'Accountant',
      description: 'Financial operations and payments',
      email: 'accountant@loanapp.com',
      password: 'accountant123',
      permissions: ['dashboard', 'payments', 'reports'],
      userCount: 2,
      color: 'bg-green-50 text-green-700 border-green-200'
    },
    {
      id: 4,
      name: 'Telecaller',
      description: 'Customer communication and follow-ups',
      email: 'telecaller@loanapp.com',
      password: 'telecaller123',
      permissions: ['dashboard', 'customers'],
      userCount: 5,
      color: 'bg-purple-50 text-purple-700 border-purple-200'
    },
  ];

  // State management
  const [roles, setRoles] = useState(initialRoles);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [roleToDelete, setRoleToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    description: '',
    permissions: modules.reduce((acc, module) => ({
      ...acc,
      [module.id]: false
    }), {})
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle permission toggle
  const handlePermissionToggle = (moduleId) => {
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [moduleId]: !prev.permissions[moduleId]
      }
    }));
  };

  // Select all permissions
  const handleSelectAll = () => {
    const allSelected = modules.every(module => formData.permissions[module.id]);
    const newPermissions = modules.reduce((acc, module) => ({
      ...acc,
      [module.id]: !allSelected
    }), {});
    
    setFormData(prev => ({
      ...prev,
      permissions: newPermissions
    }));
  };

  // Open form for adding new role
  const openAddForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      description: '',
      permissions: modules.reduce((acc, module) => ({
        ...acc,
        [module.id]: false
      }), {})
    });
    setEditingRole(null);
    setIsFormOpen(true);
  };

  // Open form for editing role
  const openEditForm = (role) => {
    const permissionObject = modules.reduce((acc, module) => ({
      ...acc,
      [module.id]: role.permissions.includes(module.id)
    }), {});
    
    setFormData({
      name: role.name,
      email: role.email,
      password: role.password,
      description: role.description,
      permissions: permissionObject
    });
    setEditingRole(role);
    setIsFormOpen(true);
  };

  // Close form
  const closeForm = () => {
    setIsFormOpen(false);
    setEditingRole(null);
    setFormData({
      name: '',
      email: '',
      password: '',
      description: '',
      permissions: modules.reduce((acc, module) => ({
        ...acc,
        [module.id]: false
      }), {})
    });
  };

  // Submit form (add/edit)
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }

    // Check if email already exists (for new roles)
    if (!editingRole && roles.some(role => role.email === formData.email)) {
      alert('This email is already in use. Please use a different email.');
      return;
    }

    // Check if email already exists (for editing roles, excluding current role)
    if (editingRole && roles.some(role => role.email === formData.email && role.id !== editingRole.id)) {
      alert('This email is already in use by another role. Please use a different email.');
      return;
    }

    const activePermissions = Object.entries(formData.permissions)
      .filter(([_, isActive]) => isActive)
      .map(([moduleId]) => moduleId);
    
    const newRole = {
      id: editingRole ? editingRole.id : roles.length + 1,
      name: formData.name,
      email: formData.email,
      password: formData.password || `password${roles.length + 1}`,
      description: formData.description,
      permissions: activePermissions,
      userCount: editingRole ? editingRole.userCount : 0,
      color: editingRole ? editingRole.color : 'bg-gray-50 text-gray-700 border-gray-200'
    };

    if (editingRole) {
      setRoles(roles.map(role => role.id === editingRole.id ? newRole : role));
    } else {
      setRoles([...roles, newRole]);
    }

    closeForm();
  };

  // Delete role
  const handleDeleteRole = () => {
    if (roleToDelete) {
      setRoles(roles.filter(role => role.id !== roleToDelete.id));
      setRoleToDelete(null);
    }
  };

  // Filter roles based on search
  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get module name by ID
  const getModuleName = (moduleId) => {
    const module = modules.find(m => m.id === moduleId);
    return module ? module.name : moduleId;
  };

  // Handle login with role
  const handleLogin = (role) => {
    alert(`Login Credentials:\nEmail: ${role.email}\nPassword: ${role.password}\n\nUse these credentials to login as ${role.name}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Shield className="w-8 h-8 text-blue-600" />
                Admin Roles Management
              </h1>
              <p className="text-gray-600 mt-2">Manage and assign permissions to different admin roles</p>
            </div>
            <button
              onClick={openAddForm}
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add New Role
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Roles</p>
                  <p className="text-2xl font-bold text-gray-900">{roles.length}</p>
                </div>
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Super Admins</p>
                  <p className="text-2xl font-bold text-gray-900">1</p>
                </div>
                <Shield className="w-8 h-8 text-red-600" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Managers</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                </div>
                <Users className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Admins</p>
                  <p className="text-2xl font-bold text-gray-900">11</p>
                </div>
                <Users className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Roles Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Table Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Existing Roles</h2>
                <p className="text-gray-600 text-sm mt-1">
                  Manage permissions and access levels for all admin roles
                </p>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search roles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full md:w-64 px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Roles Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role Details
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Login Credentials
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Permissions
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Users
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredRoles.map((role) => (
                  <tr key={role.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div>
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${role.color.split(' ')[0]}`}>
                            <Shield className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{role.name}</h3>
                            <p className="text-sm text-gray-600 mt-1">{role.description}</p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium">{role.email}</span>
                        </div>
                        <button
                          onClick={() => handleLogin(role)}
                          className="text-xs text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          View Login Details
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {role.permissions.slice(0, 3).map(permission => (
                          <span
                            key={permission}
                            className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md"
                          >
                            {getModuleName(permission)}
                          </span>
                        ))}
                        {role.permissions.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                            +{role.permissions.length - 3} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">{role.userCount}</span>
                        <span className="text-gray-500 text-sm">users</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleLogin(role)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Login with this role"
                        >
                          <User className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openEditForm(role)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit Role"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        {role.name !== 'Super Admin' && (
                          <button
                            onClick={() => setRoleToDelete(role)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Role"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredRoles.length === 0 && (
              <div className="text-center py-12">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No roles found</h3>
                <p className="text-gray-600">Try adjusting your search or create a new role</p>
              </div>
            )}
          </div>

          {/* Table Footer */}
          <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {filteredRoles.length} of {roles.length} roles
            </div>
          </div>
        </div>
      </div>

      {/* Create/Edit Role Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white z-10 p-6 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {editingRole ? 'Edit Role' : 'Create New Role'}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Configure role details and permissions
                  </p>
                </div>
              </div>
              <button
                onClick={closeForm}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Role Details */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="e.g., Loan Officer"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        placeholder="email@example.com"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      This email will be used for login
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password {editingRole ? '(Leave empty to keep current)' : '*'}
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required={!editingRole}
                        className="w-full pl-10 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        placeholder="Enter password"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Password will be used for login authentication
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="Describe the role's responsibilities..."
                    />
                  </div>
                </div>

                {/* Right Column - Permissions */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Permissions
                    </label>
                    <button
                      type="button"
                      onClick={handleSelectAll}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      {modules.every(module => formData.permissions[module.id]) 
                        ? 'Deselect All' 
                        : 'Select All'}
                    </button>
                  </div>

                  <div className="space-y-3 mb-6">
                    {modules.map(module => {
                      const Icon = module.icon;
                      return (
                        <div
                          key={module.id}
                          className={`flex items-center justify-between p-3 rounded-lg border ${
                            formData.permissions[module.id]
                              ? 'border-blue-300 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          } transition-colors`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${
                              formData.permissions[module.id]
                                ? 'bg-blue-100 text-blue-600'
                                : 'bg-gray-100 text-gray-600'
                            }`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{module.name}</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handlePermissionToggle(module.id)}
                            className={`w-12 h-6 rounded-full transition-colors ${
                              formData.permissions[module.id]
                                ? 'bg-blue-600 justify-end'
                                : 'bg-gray-300 justify-start'
                            } flex items-center p-1`}
                          >
                            <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  {/* Permissions Summary */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Selected Permissions:</p>
                    <div className="flex flex-wrap gap-2">
                      {modules
                        .filter(module => formData.permissions[module.id])
                        .map(module => (
                          <span
                            key={module.id}
                            className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                          >
                            {module.name}
                          </span>
                        ))}
                      {modules.every(module => !formData.permissions[module.id]) && (
                        <span className="text-gray-500 text-sm">No permissions selected</span>
                      )}
                    </div>
                  </div>

                  {/* Login Info Preview */}
                  {formData.name && formData.email && (
                    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm font-medium text-green-800 mb-1">Login Information Preview:</p>
                      <p className="text-sm text-green-700">
                        Users will login with:<br />
                        Email: <span className="font-medium">{formData.email}</span><br />
                        Password: <span className="font-medium">{formData.password || '(will be auto-generated)'}</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex gap-3 pt-6 border-t border-gray-200 mt-6">
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  <Save className="w-5 h-5" />
                  {editingRole ? 'Update Role' : 'Create Role'}
                </button>
                <button
                  type="button"
                  onClick={closeForm}
                  className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {roleToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Delete Role</h3>
                <p className="text-gray-600 text-sm">This action cannot be undone</p>
              </div>
            </div>
            
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete the role <span className="font-semibold">"{roleToDelete.name}"</span>? 
              This will remove permissions for {roleToDelete.userCount} user{roleToDelete.userCount !== 1 ? 's' : ''}.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={handleDeleteRole}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Delete Role
              </button>
              <button
                onClick={() => setRoleToDelete(null)}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRoles;