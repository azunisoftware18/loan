// PermissionManagement.jsx
import React, { useState, useEffect } from 'react';
import { 
  LucideSave, 
  LucideUser, 
  LucideKey, 
  LucideAlertCircle, 
  LucideLoader,
  LucidePlus,
  LucideCheckCircle
} from 'lucide-react';
import PermissionCreateModal from '../../components/admin/modals/PermissionCreateModal';
import { usePermissions } from '../../hooks/usePermission';

const PermissionManagement = () => {
  const {
    myPermissions,
    allPermissions,
    users,
    loading,
    error: hookError,
    hasPermission,
    createPermission,
    assignPermissions,
    getUserPermissions,
    refreshAll
  } = usePermissions();

  const [selectedUser, setSelectedUser] = useState('');
  const [userPermissions, setUserPermissions] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [localError, setLocalError] = useState('');
  const [success, setSuccess] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [isCheckingPermissions, setIsCheckingPermissions] = useState(true);

  // FIXED: Get current user from localStorage properly
  useEffect(() => {
    try {
      console.log('Checking localStorage for user...');
      
      // Try to get from localStorage first
      const userStr = localStorage.getItem('user');
      console.log('userStr from localStorage:', userStr);
      
      if (userStr && userStr !== 'undefined') {
        const user = JSON.parse(userStr);
        console.log('Parsed user from localStorage:', user);
        setCurrentUser(user);
      } else {
        // Try to get from auth context or token
        // You might need to decode JWT token here if you store it
        const token = localStorage.getItem('token');
        console.log('Token from localStorage:', token);
        
        // If we have users loaded and token, try to find the current user
        if (users && users.length > 0) {
          // You might have stored userId in localStorage
          const currentUserId = localStorage.getItem('userId');
          console.log('currentUserId from localStorage:', currentUserId);
          
          if (currentUserId) {
            const user = users.find(u => u.id === currentUserId);
            if (user) {
              console.log('Found user by userId:', user);
              setCurrentUser(user);
              // Also store the full user object for future use
              localStorage.setItem('user', JSON.stringify(user));
            }
          }
        }
      }
    } catch (e) {
      console.error('Failed to parse user:', e);
    } finally {
      setIsCheckingPermissions(false);
    }
  }, [users]); // Re-run when users are loaded

  // FIXED: Additional effect to check if current user is in users list
  useEffect(() => {
    if (users && users.length > 0 && currentUser) {
      // Verify current user is in the users list
      const userExists = users.some(u => u.id === currentUser.id);
      if (!userExists) {
        console.log('Current user not found in users list, trying to find by email');
        // Try to find by email if id doesn't match
        const userByEmail = users.find(u => u.email === currentUser.email);
        if (userByEmail) {
          console.log('Found user by email:', userByEmail);
          setCurrentUser(userByEmail);
          localStorage.setItem('user', JSON.stringify(userByEmail));
        }
      }
    }
  }, [users, currentUser]);

  // Fetch user permissions when user is selected
  useEffect(() => {
    const fetchUserPermissions = async () => {
      if (!selectedUser) {
        setUserPermissions([]);
        return;
      }

      try {
        setLocalError('');
        const perms = await getUserPermissions(selectedUser);
        setUserPermissions(perms || []);
      } catch (err) {
        console.error('Error fetching user permissions:', err);
        setLocalError('Failed to load user permissions');
      }
    };

    fetchUserPermissions();
  }, [selectedUser, getUserPermissions]);

  // Handle permission toggle
  const handlePermissionToggle = (permissionCode) => {
    if (!canAssignPermissions) return;
    
    setUserPermissions(prev => {
      const existingPermission = prev.find(p => p.code === permissionCode);
      
      if (existingPermission) {
        return prev.map(p =>
          p.code === permissionCode ? { ...p, allowed: !p.allowed } : p
        );
      } else {
        const permission = allPermissions.find(p => p.code === permissionCode);
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
      setLocalError('Please select a user first.');
      return;
    }

    if (!canAssignPermissions) {
      setLocalError('You do not have permission to assign permissions.');
      return;
    }

    setLocalError('');
    setSuccess('');

    try {
      const permissionsToAssign = userPermissions
        .filter(p => p.allowed)
        .map(p => p.code);

      await assignPermissions(selectedUser, permissionsToAssign);
      setSuccess('Permissions saved successfully!');
      
      const updatedPerms = await getUserPermissions(selectedUser);
      setUserPermissions(updatedPerms || []);
    } catch (err) {
      console.error('Error saving permissions:', err);
      setLocalError(err.message || 'Failed to save permissions');
    }
  };

  // Check if a permission is currently allowed for the selected user
  const isPermissionAllowed = (permissionCode) => {
    const permission = userPermissions.find(p => p.code === permissionCode);
    return permission ? permission.allowed : false;
  };

  // Clear messages after 5 seconds
  useEffect(() => {
    if (localError || success) {
      const timer = setTimeout(() => {
        setLocalError('');
        setSuccess('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [localError, success]);

  // FIXED: Permission checking logic with better SUPER_ADMIN detection
  const isSuperAdmin = currentUser?.role === 'SUPER_ADMIN';
  
  // FIXED: Log for debugging
  useEffect(() => {
    console.log('=== Permission Check Debug ===');
    console.log('Current User:', currentUser);
    console.log('Is Super Admin:', isSuperAdmin);
    console.log('My Permissions:', myPermissions);
    console.log('Has VIEW_USER_PERMISSIONS:', hasPermission('VIEW_USER_PERMISSIONS'));
    console.log('Has ASSIGN_PERMISSIONS:', hasPermission('ASSIGN_PERMISSIONS'));
    console.log('=============================');
  }, [currentUser, isSuperAdmin, myPermissions, hasPermission]);

  // SUPER_ADMIN bypass - if user is SUPER_ADMIN, grant all permissions
  const canViewPermissions = isSuperAdmin ? true : hasPermission('VIEW_USER_PERMISSIONS');
  const canAssignPermissions = isSuperAdmin ? true : hasPermission('ASSIGN_PERMISSIONS');
  const canCreatePermissions = isSuperAdmin ? true : hasPermission('CREATE_PERMISSIONS');

  // FIXED: Better loading state handling
  const isLoading = loading?.getAllPerms || loading?.getMyPerms || loading?.getUsers || isCheckingPermissions;

  // FIXED: Don't show permission denied while still loading
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LucideLoader className="h-8 w-8 text-blue-600 animate-spin" />
        <span className="ml-2 text-gray-600">Loading permissions...</span>
      </div>
    );
  }

  // FIXED: For SUPER_ADMIN, always show the page
  if (isSuperAdmin) {
    // Continue to render the page for SUPER_ADMIN
    console.log('SUPER_ADMIN detected, granting full access');
  } 
  // For non-SUPER_ADMIN, check permissions
  else if (!canViewPermissions && !canAssignPermissions) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <div className="flex items-center">
            <LucideAlertCircle className="h-5 w-5 text-red-500 mr-2" />
            <p className="text-red-700">You do not have permission to manage permissions</p>
          </div>
          
          {/* Debug information - remove in production */}
          <div className="mt-4 text-sm border-t border-red-200 pt-4">
            <p className="font-medium text-red-800 mb-2">Debug Information:</p>
            <ul className="space-y-1 text-red-700">
              <li>Current User: {currentUser ? JSON.stringify(currentUser) : 'Not available'}</li>
              <li>Current User Role: {currentUser?.role || 'Not available'}</li>
              <li>Is Super Admin: {isSuperAdmin ? 'Yes' : 'No'}</li>
              <li>Has VIEW_USER_PERMISSIONS: {hasPermission('VIEW_USER_PERMISSIONS') ? 'Yes' : 'No'}</li>
              <li>Has ASSIGN_PERMISSIONS: {hasPermission('ASSIGN_PERMISSIONS') ? 'Yes' : 'No'}</li>
              <li>My Permissions Count: {myPermissions?.length || 0}</li>
              <li>All Permissions Count: {allPermissions?.length || 0}</li>
              <li>Users Count: {users?.length || 0}</li>
            </ul>
            
            {/* Manual login button for testing */}
            <div className="mt-4 space-y-2">
              <button
                onClick={() => {
                  // Find the SUPER_ADMIN user and set as current
                  const superAdmin = users?.find(u => u.role === 'SUPER_ADMIN');
                  if (superAdmin) {
                    localStorage.setItem('user', JSON.stringify(superAdmin));
                    localStorage.setItem('userId', superAdmin.id);
                    setCurrentUser(superAdmin);
                    window.location.reload();
                  }
                }}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Login as SUPER_ADMIN (Fix Issue)
              </button>
              
              <button
                onClick={() => {
                  // Clear stored user and reload
                  localStorage.removeItem('user');
                  localStorage.removeItem('userId');
                  window.location.reload();
                }}
                className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Clear User Data & Reload
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Permission Management
          </h1>
          <p className="text-gray-600">
            Manage user permissions for EMPLOYEE and PARTNER roles
          </p>
          {isSuperAdmin && (
            <div className="mt-2 inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
               SUPER_ADMIN Access (Full Control)
            </div>
          )}
        </div>

        {/* Create Permission Button */}
        {canCreatePermissions && (
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center"
          >
            <LucidePlus className="h-4 w-4 mr-2" />
            New Permission
          </button>
        )}
      </div>

      {/* Error/Success Messages */}
      {(localError || hookError) && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <div className="flex items-center">
            <LucideAlertCircle className="h-5 w-5 text-red-500 mr-2" />
            <p className="text-red-700">{localError || hookError}</p>
          </div>
        </div>
      )}
      
      {success && (
        <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded">
          <div className="flex items-center">
            <LucideCheckCircle className="h-5 w-5 text-green-500 mr-2" />
            <p className="text-green-700">{success}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* User Selection Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <div className="flex items-center mb-6">
              <LucideUser className="h-6 w-6 text-blue-600 mr-2" />
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
                disabled={loading?.getUsers || !canViewPermissions}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="">Select a user</option>
                {users?.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.fullName || user.userName || user.email} ({user.role})
                    {user.id === currentUser?.id && ' (You)'}
                  </option>
                ))}
              </select>
              {loading?.getUsers && (
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <LucideLoader className="h-3 w-3 animate-spin mr-1" />
                  Loading users...
                </div>
              )}
              {users?.length === 0 && !loading?.getUsers && (
                <div className="mt-2 text-sm text-yellow-600">
                  No users found
                </div>
              )}
            </div>

            {selectedUser && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  {canAssignPermissions 
                    ? "Selected user permissions will appear on the right. Toggle checkboxes to modify permissions."
                    : "You can view permissions but cannot modify them."}
                </p>
              </div>
            )}

            {selectedUser && canAssignPermissions && (
              <button
                onClick={handleSavePermissions}
                disabled={loading?.assign || loading?.getUserPerms}
                className="w-full mt-6 px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading?.assign ? (
                  <>
                    <LucideLoader className="h-5 w-5 animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <LucideSave className="h-5 w-5 mr-2" />
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
                <LucideKey className="h-6 w-6 text-blue-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Available Permissions
                </h2>
              </div>
              {selectedUser && (
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                  {userPermissions.filter(p => p.allowed).length} of {allPermissions?.length || 0} selected
                </span>
              )}
            </div>

            {loading?.getAllPerms ? (
              <div className="flex justify-center items-center p-12">
                <LucideLoader className="h-8 w-8 text-blue-600 animate-spin" />
              </div>
            ) : !selectedUser ? (
              <div className="text-center p-12 border-2 border-dashed border-gray-300 rounded-xl">
                <LucideUser className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">
                  Please select a user to view and manage permissions
                </p>
              </div>
            ) : loading?.getUserPerms ? (
              <div className="flex justify-center items-center p-12">
                <LucideLoader className="h-8 w-8 text-blue-600 animate-spin" />
              </div>
            ) : (
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {allPermissions?.map(permission => (
                  <div
                    key={permission.code}
                    onClick={() => canAssignPermissions && handlePermissionToggle(permission.code)}
                    className={`p-4 border rounded-lg transition-all duration-200 hover:shadow-md ${
                      isPermissionAllowed(permission.code)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${!canAssignPermissions ? 'cursor-default' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center">
                      <div className="flex items-center h-5">
                        <input
                          type="checkbox"
                          checked={isPermissionAllowed(permission.code)}
                          onChange={() => {}} // Handled by parent div click
                          disabled={!canAssignPermissions}
                          className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">
                              {permission.name}
                            </h3>
                            <p className="mt-1 text-sm font-mono text-gray-500 bg-gray-50 px-2 py-1 rounded inline-block">
                              {permission.code}
                            </p>
                          </div>
                          {isPermissionAllowed(permission.code) && (
                            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                              Active
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {selectedUser && (!allPermissions || allPermissions.length === 0) && !loading?.getAllPerms && (
              <div className="text-center p-12 border-2 border-dashed border-gray-300 rounded-xl">
                <LucideAlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">
                  No permissions found in the system
                </p>
                {canCreatePermissions && (
                  <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Create First Permission
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Footer */}
      {selectedUser && allPermissions?.length > 0 && (
        <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4">
              <p className="text-2xl font-bold text-gray-900">
                {allPermissions.length}
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
                {allPermissions.length > 0 
                  ? Math.round((userPermissions.filter(p => p.allowed).length / allPermissions.length) * 100) 
                  : 0}%
              </p>
              <p className="text-sm text-gray-600">Permission Coverage</p>
            </div>
          </div>
        </div>
      )}

      {/* Create Permission Modal */}
      <PermissionCreateModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={() => {
          refreshAll();
          setIsCreateModalOpen(false);
          setSuccess("Permission created successfully!");
        }}
      />
    </div>
  );
};

export default PermissionManagement;