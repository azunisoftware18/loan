import React, { useState, useEffect } from 'react';
import { LucideCheck, LucideSave, LucideUser, LucideKey, LucideAlertCircle, LucideLoader, Check, Save, User, Key, Loader, Loader2 } from 'lucide-react';
import axios from "axios";
import PermissionCreateModal from '../../components/admin/modals/PermissionCreateModal';


const PermissionManagement = () => {
  // State management
  const [users, setUsers] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [userPermissions, setUserPermissions] = useState([]);
  const [permissionLoading, setPermissionLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [allPermissions, setAllPermissions] = useState([]); // UI list
const [myPermissions, setMyPermissions] = useState([]);   // logged-in user


  
  const [loading, setLoading] = useState({
    users: false,
    permissions: false,
    userPermissions: false,
    saving: false
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const hasPermission = (code) => {
  return myPermissions.some(p => p.code === code);
};

  // Fetch all users (EMPLOYEE and PARTNER only)
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(prev => ({ ...prev, users: true }));
      setError('');
      try {
        // Adjust this endpoint as per your backend
        const response = await axios.get(
  `${import.meta.env.VITE_API_BASE_URL}/users`,
  { withCredentials: true }
);

        setUsers(response.data.data || []);
      } catch (err) {
        setError('Failed to load users. Please try again.');
        console.error('Error fetching users:', err);
      } finally {
        setLoading(prev => ({ ...prev, users: false }));
      }
    };

    fetchUsers();
  }, []);


  const fetchPermissions = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/permissions/user/me`,
      { withCredentials: true }
    );
    setPermissions(res.data.data || []);
  } catch (err) {
    console.error("Permission fetch failed", err);
  } finally {
    setPermissionLoading(false);
  }
};

  // Fetch all available permissions
useEffect(() => {
  fetchPermissions();
}, []);



  // Fetch user permissions when user is selected
  useEffect(() => {
    const fetchUserPermissions = async () => {
      if (!selectedUser) {
        setUserPermissions([]);
        return;
      }
    


      setLoading(prev => ({ ...prev, userPermissions: true }));
      setError('');
      try {
        const response = await axios.get(
  `${import.meta.env.VITE_API_BASE_URL}/permissions/user/${selectedUser}`,
  { withCredentials: true }
);

        setUserPermissions(response.data.data || []);
      } catch (err) {
        setError('Failed to load user permissions. Please try again.');
        console.error('Error fetching user permissions:', err);
      } finally {
        setLoading(prev => ({ ...prev, userPermissions: false }));
      }
    };

    fetchUserPermissions();
  }, [selectedUser]);

  // Handle permission toggle
  const handlePermissionToggle = (permissionCode) => {
    setUserPermissions(prev => {
      const existingPermission = prev.find(p => p.code === permissionCode);
      
      if (existingPermission) {
        // Toggle existing permission
        return prev.map(p =>
          p.code === permissionCode ? { ...p, allowed: !p.allowed } : p
        );
      } else {
        // Add new permission with allowed: true
        const permission = permissions.find(p => p.code === permissionCode);
        if (permission) {
          return [...prev, {
            permissionId: permission.id,
            code: permission.code,
            name: permission.name,
            allowed: true
          }];
        }
        return prev;
      }
    });
  };

  // Handle save permissions
  const handleSavePermissions = async () => {
    if (!selectedUser) {
      setError('Please select a user first.');
      return;
    }

    setLoading(prev => ({ ...prev, saving: true }));
    setError('');
    setSuccess('');

    try {
      const permissionsToAssign = userPermissions
        .filter(p => p.allowed)
        .map(p => p.code);

     await axios.post(
  `${import.meta.env.VITE_API_BASE_URL}/permissions/assign`,
  {
    userId: selectedUser,
    permissions: permissionsToAssign
  },
  { withCredentials: true }
);

      
      // Refresh user permissions after save
      const response = await axios.get(
  `${import.meta.env.VITE_API_BASE_URL}/permissions/user/${selectedUser}`,
  { withCredentials: true }
);

      setUserPermissions(response.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save permissions. Please try again.');
      console.error('Error saving permissions:', err);
    } finally {
      setLoading(prev => ({ ...prev, saving: false }));
    }
  };

  // Check if a permission is currently allowed for the selected user
  const isPermissionAllowed = (permissionCode) => {
    const permission = userPermissions.find(p => p.code === permissionCode);
    return permission ? permission.allowed : false;
  };

  if (permissionLoading) {
  return <div className="p-10 text-center">Loading permissions...</div>;
}

if (!hasPermission("VIEW_USER_PERMISSIONS")) {
  return (
    <div className="p-10 text-center text-red-600 font-bold">
      You do not have permission to manage permissions
    </div>
  );
}



  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8 ">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Permission Management
        </h1>
        <p className="text-gray-600">
          Manage user permissions for EMPLOYEE and PARTNER roles
        </p>
      </div>

      {/* 🔒 Button sirf authorized user ke liye */}
 {hasPermission("Create_Permissions") && (
  <button
    onClick={() => setIsCreateModalOpen(true)}
    className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center"
  >
    <LucidePlus className="h-4 w-4 mr-2" />
    New Permission
  </button>
)}


      {/* Error/Success Messages */}
      {error && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}
      
      {success && (
        <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded">
          <div className="flex items-center">
            <Check className="h-5 w-5 text-green-500 mr-2" />
            <p className="text-green-700">{success}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* User Selection Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <div className="flex items-center mb-6">
              <User className="h-6 w-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">
                Select User
              </h2>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select User
              </label>
              <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                disabled={loading.users}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="">Select a user</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.name || user.email} ({user.role})
                  </option>
                ))}
              </select>
            </div>

            {selectedUser && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  Selected user permissions will appear on the right. 
                  Toggle checkboxes to modify permissions.
                </p>
              </div>
            )}

            {selectedUser && (
              <button
                onClick={handleSavePermissions}
                disabled={loading.saving || loading.userPermissions}
                className="w-full mt-6 px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading.saving ? (
                  <>
                    <Loader className="h-5 w-5 animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5 mr-2" />
                    Save Permissions
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Permissions Card */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Key className="h-6 w-6 text-blue-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Available Permissions
                </h2>
              </div>
              {selectedUser && (
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                  {userPermissions.filter(p => p.allowed).length} of {permissions.length} selected
                </span>
              )}
            </div>

            {loading.permissions ? (
              <div className="flex justify-center items-center p-12">
                <Loader className="h-8 w-8 text-blue-600 animate-spin" />
              </div>
            ) : !selectedUser ? (
              <div className="text-center p-12 border-2 border-dashed border-gray-300 rounded-xl">
                <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">
                  Please select a user to view and manage permissions
                </p>
              </div>
            ) : loading.userPermissions ? (
              <div className="flex justify-center items-center p-12">
                <Loader className="h-8 w-8 text-blue-600 animate-spin" />
              </div>
            ) : (
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {permissions.map(permission => (
                  <div
                    key={permission.id}
                    onClick={() => handlePermissionToggle(permission.code)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                      isPermissionAllowed(permission.code)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${loading.saving ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="flex items-center">
                      <div className="flex items-center h-5">
                        <input
                          type="checkbox"
                          checked={isPermissionAllowed(permission.code)}
                          onChange={() => {}}
                          className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center">
                          <h3 className="text-lg font-medium text-gray-900">
                            {permission.name}
                          </h3>
                          {isPermissionAllowed(permission.code) && (
                            <span className="ml-3 px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                              Active
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-sm font-mono text-gray-500 bg-gray-50 px-2 py-1 rounded inline-block">
                          {permission.code}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {selectedUser && permissions.length === 0 && !loading.permissions && (
              <div className="text-center p-12 border-2 border-dashed border-gray-300 rounded-xl">
                <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">
                  No permissions found in the system
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Footer */}
      {selectedUser && permissions.length > 0 && (
        <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4">
              <p className="text-2xl font-bold text-gray-900">
                {permissions.length}
              </p>
              <p className="text-sm text-gray-600">Total Permissions</p>
            </div>
            <div className="text-center p-4">
              <p className="text-2xl font-bold text-green-600">
                {userPermissions.filter(p => p.allowed).length}
              </p>
              <p className="text-sm text-gray-600">Assigned Permissions</p>
            </div>
            <div className="text-center p-4">
              <p className="text-2xl font-bold text-blue-600">
                {Math.round((userPermissions.filter(p => p.allowed).length / permissions.length) * 100) || 0}%
              </p>
              <p className="text-sm text-gray-600">Permission Coverage</p>
            </div>
          </div>
        </div>
      )}

      <PermissionCreateModal
  open={isCreateModalOpen}
  onClose={() => setIsCreateModalOpen(false)}
  onSuccess={() => {
    fetchPermissions();           // 🔥 refresh permissions list
    setIsCreateModalOpen(false);  // close modal
    setSuccess("Permission created successfully!");
  }}
/>

    </div>
  );
};

export default PermissionManagement;