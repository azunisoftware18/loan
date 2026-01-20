import React, { useState, useEffect } from 'react';
import { LucideX, LucideLoader, LucideCheck, LucideAlertCircle } from 'lucide-react';

const PermissionCreateModal = ({ open, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    code: ''
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');

  // Reset form when modal opens/closes
  useEffect(() => {
    if (open) {
      resetForm();
    }
  }, [open]);

  const resetForm = () => {
    setFormData({ name: '', code: '' });
    setErrors({});
    setApiError('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'name') {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    } else if (name === 'code') {
      // Auto-generate code from name if code field is empty or user hasn't modified it
      if (value === '' && formData.name) {
        // Auto-generate code from name
        const generatedCode = formData.name
          .toLowerCase()
          .replace(/\s+/g, '_')
          .replace(/[^a-z0-9_-]/g, '')
          .replace(/_+/g, '_')
          .replace(/^-+|-+$/g, '');
        
        setFormData(prev => ({
          ...prev,
          [name]: generatedCode
        }));
      } else {
        // Manual code input - sanitize
        const sanitizedValue = value
          .toLowerCase()
          .replace(/\s+/g, '_')
          .replace(/[^a-z0-9_-]/g, '')
          .replace(/_+/g, '_')
          .replace(/^-+|-+$/g, '');
        
        setFormData(prev => ({
          ...prev,
          [name]: sanitizedValue
        }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Permission name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (formData.name.length > 100) {
      newErrors.name = 'Name must be less than 100 characters';
    }
    
    // Validate code
    if (!formData.code.trim()) {
      newErrors.code = 'Permission code is required';
    } else if (formData.code.length < 2) {
      newErrors.code = 'Code must be at least 2 characters';
    } else if (formData.code.length > 50) {
      newErrors.code = 'Code must be less than 50 characters';
    } else if (!/^[a-z0-9][a-z0-9_-]*[a-z0-9]$/.test(formData.code)) {
      newErrors.code = 'Code must contain only lowercase letters, numbers, hyphens, or underscores, and cannot start/end with hyphen/underscore';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await api.post('/permissions/create-permissions', {
        code: formData.code,
        name: formData.name.trim()
      }, {
        withCredentials: true
      });
      
      if (response.data.success) {
        resetForm();
        onSuccess && onSuccess(response.data.data);
        onClose();
      } else {
        setApiError(response.data.message || 'Failed to create permission');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          'Failed to create permission. Please try again.';
      setApiError(errorMessage);
      console.error('Error creating permission:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!open) return null;

  return (
    <>
      {/* Dark Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          {/* Modal Content */}
          <div 
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleKeyDown}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Create New Permission
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Add a new permission to the system
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                aria-label="Close"
                disabled={loading}
              >
                <LucideX className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Error Message */}
            {apiError && (
              <div className="mx-6 mt-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r">
                <div className="flex items-center">
                  <LucideAlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                  <p className="text-sm text-red-700">{apiError}</p>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6">
              {/* Permission Name Field */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Permission Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., View Loan Origination System"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                    errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  } ${loading ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                  disabled={loading}
                  autoFocus
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <LucideAlertCircle className="h-4 w-4 mr-1" />
                    {errors.name}
                  </p>
                )}
                <p className="mt-2 text-xs text-gray-500">
                  Descriptive name of the permission
                </p>
              </div>

              {/* Permission Code Field */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Permission Code <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    placeholder="e.g., view_los"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 font-mono ${
                      errors.code ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    } ${loading ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                    disabled={loading}
                  />
                  {formData.code && !errors.code && (
                    <div className="absolute right-3 top-3">
                      <LucideCheck className="h-5 w-5 text-green-500" />
                    </div>
                  )}
                </div>
                {errors.code ? (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <LucideAlertCircle className="h-4 w-4 mr-1" />
                    {errors.code}
                  </p>
                ) : (
                  <p className="mt-2 text-xs text-gray-500">
                    Lowercase letters, numbers, hyphens, underscores only
                  </p>
                )}
              </div>

              {/* Preview */}
              {formData.name && formData.code && !errors.name && !errors.code && (
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="text-sm font-medium text-blue-800 mb-2">Preview</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Name:</span>
                      <span className="text-sm font-medium">{formData.name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Code:</span>
                      <code className="text-sm bg-white px-2 py-1 rounded border">
                        {formData.code}
                      </code>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {loading ? (
                    <>
                      <LucideLoader className="h-4 w-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <LucideCheck className="h-4 w-4 mr-2" />
                      Create Permission
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PermissionCreateModal;