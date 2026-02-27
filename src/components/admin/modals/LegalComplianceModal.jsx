import React, { useState, useEffect } from 'react';
import {
  X,
  User,
  Building2,
  MapPin,
  Home,
  Calendar,
  FileText,
  Camera,
  AlertCircle,
  IndianRupee
} from 'lucide-react';

const LegalComplianceModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    // Engineer Details
    engineerName: '',
    agencyName: '',
    
    // Property Details
    propertyType: '',
    propertyAddress: '',
    city: '',
    state: '',
    pincode: '',
    
    // Valuation Details
    marketValue: '',
    discussionValue: '',
    forcesdSaleValue: '',
    recommendedLtv: '',
    
    // Construction Details
    constructionStatus: '',
    propertyAge: '',
    residualLife: '',
    qualityOfConstruction: '',
    
    // Additional Details
    remarks: '',
    reportUrl: '',
    sitePhotographs: ''
  });

  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBlur = (field) => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form Data:', formData);
    onClose();
  };

  const isFieldRequired = (field) => {
    const requiredFields = [
      'engineerName',
      'agencyName',
      'propertyType',
      'propertyAddress',
      'city',
      'state',
      'pincode',
      'marketValue',
      'recommendedLtv'
    ];
    return requiredFields.includes(field);
  };

  if (!isOpen) return null;

  const SectionHeading = ({ icon: Icon, title }) => (
    <div className="flex items-center gap-2 mb-4">
      <div className="p-2 bg-blue-50 rounded-lg">
        <Icon className="w-4 h-4 text-blue-600" />
      </div>
      <h3 className="text-sm font-semibold text-slate-700">{title}</h3>
    </div>
  );

  const InputField = ({ label, name, type = 'text', required = false, icon: Icon, ...props }) => (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-slate-600 flex items-center gap-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <Icon className="w-4 h-4 text-slate-400" />
          </div>
        )}
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          onBlur={() => handleBlur(name)}
          className={`w-full ${Icon ? 'pl-10' : 'pl-3'} pr-3 py-2 border ${
            touched[name] && !formData[name] && required
              ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500'
              : 'border-slate-200 focus:ring-blue-500/20 focus:border-blue-500'
          } rounded-lg text-sm transition-colors duration-200`}
          {...props}
        />
      </div>
      {touched[name] && !formData[name] && required && (
        <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
          <AlertCircle className="w-3 h-3" />
          This field is required
        </p>
      )}
    </div>
  );

  const SelectField = ({ label, name, options, required = false, icon: Icon }) => (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-slate-600 flex items-center gap-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <Icon className="w-4 h-4 text-slate-400" />
          </div>
        )}
        <select
          name={name}
          value={formData[name]}
          onChange={handleChange}
          onBlur={() => handleBlur(name)}
          className={`w-full ${Icon ? 'pl-10' : 'pl-3'} pr-3 py-2 border ${
            touched[name] && !formData[name] && required
              ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500'
              : 'border-slate-200 focus:ring-blue-500/20 focus:border-blue-500'
          } rounded-lg text-sm appearance-none bg-white transition-colors duration-200`}
        >
          <option value="">Select {label}</option>
          {options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
      {touched[name] && !formData[name] && required && (
        <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
          <AlertCircle className="w-3 h-3" />
          This field is required
        </p>
      )}
    </div>
  );

  const TextAreaField = ({ label, name, required = false, icon: Icon }) => (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-slate-600 flex items-center gap-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-3">
            <Icon className="w-4 h-4 text-slate-400" />
          </div>
        )}
        <textarea
          name={name}
          value={formData[name]}
          onChange={handleChange}
          onBlur={() => handleBlur(name)}
          rows="3"
          className={`w-full ${Icon ? 'pl-10' : 'pl-3'} pr-3 py-2 border ${
            touched[name] && !formData[name] && required
              ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500'
              : 'border-slate-200 focus:ring-blue-500/20 focus:border-blue-500'
          } rounded-lg text-sm transition-colors duration-200 resize-none`}
        />
      </div>
      {touched[name] && !formData[name] && required && (
        <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
          <AlertCircle className="w-3 h-3" />
          This field is required
        </p>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-4xl my-8 animate-in fade-in zoom-in duration-300">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">Create Legal Report</h2>
              <p className="text-sm text-slate-500 mt-1">Fill in the details to generate a new legal verification report</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
              <div className="space-y-6">
                {/* Engineer Details */}
                <SectionHeading icon={User} title="Engineer Details" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField 
                    label="Engineer Name" 
                    name="engineerName" 
                    icon={User}
                    required 
                  />
                  <InputField 
                    label="Agency Name" 
                    name="agencyName" 
                    icon={Building2}
                    required 
                  />
                </div>

                {/* Property Details */}
                <SectionHeading icon={Home} title="Property Details" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SelectField 
                    label="Property Type" 
                    name="propertyType" 
                    options={['RESIDENTIAL', 'COMMERCIAL', 'INDUSTRIAL', 'LAND']}
                    icon={Home}
                    required 
                  />
                  <div className="md:col-span-2">
                    <TextAreaField 
                      label="Property Address" 
                      name="propertyAddress" 
                      icon={MapPin}
                      required 
                    />
                  </div>
                  <InputField 
                    label="City" 
                    name="city" 
                    icon={MapPin}
                    required 
                  />
                  <InputField 
                    label="State" 
                    name="state" 
                    icon={MapPin}
                    required 
                  />
                  <InputField 
                    label="Pincode" 
                    name="pincode" 
                    icon={MapPin}
                    required 
                  />
                </div>

                {/* Valuation Details */}
                <SectionHeading icon={IndianRupee} title="Valuation Details" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField 
                    label="Market Value (₹)" 
                    name="marketValue" 
                    type="number"
                    icon={IndianRupee}
                    required 
                  />
                  <InputField 
                    label="Discussion Value (₹)" 
                    name="discussionValue" 
                    type="number"
                    icon={IndianRupee}
                  />
                  <InputField 
                    label="Forced Sale Value (₹)" 
                    name="forcesdSaleValue" 
                    type="number"
                    icon={IndianRupee}
                  />
                  <InputField 
                    label="Recommended LTV (%)" 
                    name="recommendedLtv" 
                    type="number"
                    icon={IndianRupee}
                    required 
                  />
                </div>

                {/* Construction Details */}
                <SectionHeading icon={Calendar} title="Construction Details" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SelectField 
                    label="Construction Status" 
                    name="constructionStatus" 
                    options={['COMPLETED', 'UNDER_CONSTRUCTION']}
                    icon={Home}
                  />
                  <InputField 
                    label="Property Age (Years)" 
                    name="propertyAge" 
                    type="number"
                    icon={Calendar}
                  />
                  <InputField 
                    label="Residual Life (Years)" 
                    name="residualLife" 
                    type="number"
                    icon={Calendar}
                  />
                  <SelectField 
                    label="Quality of Construction" 
                    name="qualityOfConstruction" 
                    options={['EXCELLENT', 'GOOD', 'AVERAGE', 'POOR']}
                    icon={Home}
                  />
                </div>

                {/* Additional Details */}
                <SectionHeading icon={FileText} title="Additional Details" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <TextAreaField 
                      label="Remarks" 
                      name="remarks" 
                      icon={FileText}
                    />
                  </div>
                  <InputField 
                    label="Report URL" 
                    name="reportUrl" 
                    type="url"
                    icon={FileText}
                  />
                  <InputField 
                    label="Site Photographs URL" 
                    name="sitePhotographs" 
                    type="url"
                    icon={Camera}
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 flex items-center justify-end gap-3 p-6 border-t border-slate-200 bg-white rounded-b-xl">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm hover:shadow-md"
              >
                Save Legal Report
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LegalComplianceModal;