import React, { useState, useEffect } from 'react';
import { X, Loader, AlertCircle } from 'lucide-react';

const BranchAdminModal = ({
  isOpen,
  onClose,
  onSubmit,
  admin = null, // If admin is provided, it's edit mode, otherwise add mode
  branches = [],
  loading = false
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    userName: '',
    contactNumber: '',
    password: '',
    branchId: ''
  });
  const [errors, setErrors] = useState({});

  const isEditMode = admin !== null;

  // Reset/Populate form when modal opens or admin changes
  useEffect(() => {
    if (isOpen) {
      if (isEditMode && admin) {
        // Edit mode - populate with admin data
        setFormData({
          fullName: admin.fullName || '',
          email: admin.email || '',
          userName: admin.userName || '',   // ✔ MATCHED
          contactNumber: admin.contactNumber || '',
          password: '',
          branchId: admin.branchId || admin.branch?.id || ''
        });
      } else {
        // Add mode - reset form
        setFormData({
          fullName: '',
          email: '',
          userName: '',
          contactNumber: '',
          password: '',
          branchId: ''
        });
      }
      setErrors({});
    }
  }, [isOpen, admin, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

 const validateForm = () => {
  const newErrors = {};

  if (!formData.fullName?.trim()) {
    newErrors.fullName = 'Full name is required';
  }

  if (!formData.email?.trim()) {
    newErrors.email = 'Email is required';
  }

  if (!formData.userName?.trim()) {
    newErrors.userName = 'Username is required';
  }

  if (!formData.contactNumber?.trim()) {
    newErrors.contactNumber = 'Contact number is required';
  }

  if (!isEditMode && !formData.password?.trim()) {
    newErrors.password = 'Password is required';
  }

  if (!formData.branchId) {
    newErrors.branchId = 'Please select a branch';
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Create payload - only include password if it's provided (for edit mode)
    const payload = { ...formData };
    if (isEditMode && !payload.password) {
      delete payload.password;
    }

    const result = await onSubmit(payload);
    if (result?.success) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden animate-in slide-in-from-bottom duration-300">

        {/* Header */}
        <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-xl text-gray-800">
              {isEditMode ? 'Edit Branch Admin' : 'Add New Branch Admin'}
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              {isEditMode
                ? 'Update branch administrator details'
                : 'Create a new branch administrator account'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            disabled={loading}
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 overflow-y-auto max-h-[60vh] space-y-4">

            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter full name"
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${errors.fullName ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                disabled={loading}
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                disabled={loading}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Username <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                placeholder="Enter username"
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${errors.username ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                disabled={loading}
              />
              {errors.userName && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {errors.username}
                </p>
              )}
            </div>

            {/* Contact Number */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Contact Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="Enter contact number"
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${errors.contactNumber ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                disabled={loading}
              />
              {errors.contactNumber && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {errors.contactNumber}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Password {!isEditMode && <span className="text-red-500">*</span>}
                {isEditMode && <span className="text-gray-500 text-xs ml-1">(leave blank to keep current)</span>}
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={isEditMode ? "Enter new password (optional)" : "Enter password"}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                disabled={loading}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {errors.password}
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                {isEditMode
                  ? 'Minimum 6 characters if changing'
                  : 'Minimum 6 characters'}
              </p>
            </div>

            {/* Branch Dropdown */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Branch <span className="text-red-500">*</span>
              </label>
              <select
                name="branchId"
                value={formData.branchId}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${errors.branchId ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                disabled={loading}
              >
                <option value="">Select a branch</option>
                {branches.map(branch => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name} {branch.code ? `(${branch.code})` : ''}
                  </option>
                ))}
              </select>
              {errors.branchId && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {errors.branchId}
                </p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-lg text-gray-700 font-medium hover:bg-gray-200 transition"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader size={18} className="animate-spin" />
                  {isEditMode ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                isEditMode ? 'Update Branch Admin' : 'Create Branch Admin'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BranchAdminModal;