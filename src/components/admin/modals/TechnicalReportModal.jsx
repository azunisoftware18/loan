import React, { useState, useEffect } from 'react';
import {
  X,
  User,
  Building2,
  Home,
  MapPin,
  DollarSign,
  Calendar,
  FileText,
  Camera,
  AlertCircle,
  ChevronDown,
  IndianRupee
} from 'lucide-react';

const TechnicalReportModal = ({ isOpen, onClose }) => {
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
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Form Data:', formData);
    setIsSubmitting(false);
    onClose();
    
    // Reset form
    setFormData({
      engineerName: '',
      agencyName: '',
      propertyType: '',
      propertyAddress: '',
      city: '',
      state: '',
      pincode: '',
      marketValue: '',
      discussionValue: '',
      forcesdSaleValue: '',
      recommendedLtv: '',
      constructionStatus: '',
      propertyAge: '',
      residualLife: '',
      qualityOfConstruction: '',
      remarks: '',
      reportUrl: '',
      sitePhotographs: ''
    });
    setTouched({});
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
    <div className="flex items-center gap-3 mb-5">
      <div className="p-2.5 bg-blue-50 rounded-xl">
        <Icon className="w-5 h-5 text-blue-600" />
      </div>
      <h3 className="text-base font-semibold text-slate-800">{title}</h3>
    </div>
  );

  const InputField = ({ label, name, type = 'text', required = false, icon: Icon, ...props }) => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-600 flex items-center gap-1">
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
          className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-3 border ${
            touched[name] && !formData[name] && required
              ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500'
              : 'border-slate-200 focus:ring-blue-500/20 focus:border-blue-500'
          } rounded-xl text-sm transition-colors duration-200`}
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
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-600 flex items-center gap-1">
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
          className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-10 py-3 border ${
            touched[name] && !formData[name] && required
              ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500'
              : 'border-slate-200 focus:ring-blue-500/20 focus:border-blue-500'
          } rounded-xl text-sm appearance-none bg-white transition-colors duration-200`}
        >
          <option value="">Select {label}</option>
          {options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
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
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-600 flex items-center gap-1">
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
          rows="4"
          className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-3 border ${
            touched[name] && !formData[name] && required
              ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500'
              : 'border-slate-200 focus:ring-blue-500/20 focus:border-blue-500'
          } rounded-xl text-sm transition-colors duration-200 resize-none`}
          placeholder={`Enter ${label.toLowerCase()}`}
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
        <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-4xl my-8 animate-in fade-in zoom-in duration-300">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Create Technical Report</h2>
              <p className="text-sm text-slate-500 mt-1">Fill in the details to generate a new technical valuation report</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
              <div className="space-y-8">
                {/* Engineer Details */}
                <SectionHeading icon={User} title="Engineer Details" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <InputField 
                    label="Engineer Name" 
                    name="engineerName" 
                    icon={User}
                    required 
                    placeholder="Enter engineer's full name"
                  />
                  <InputField 
                    label="Agency Name" 
                    name="agencyName" 
                    icon={Building2}
                    required 
                    placeholder="Enter agency name"
                  />
                </div>

                {/* Property Details */}
                <SectionHeading icon={Home} title="Property Details" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                    placeholder="Enter city"
                  />
                  <InputField 
                    label="State" 
                    name="state" 
                    icon={MapPin}
                    required 
                    placeholder="Enter state"
                  />
                  <InputField 
                    label="Pincode" 
                    name="pincode" 
                    icon={MapPin}
                    required 
                    placeholder="Enter 6-digit pincode"
                    maxLength="6"
                  />
                </div>

                {/* Valuation Details */}
                <SectionHeading icon={IndianRupee} title="Valuation Details" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <InputField 
                    label="Market Value (₹)" 
                    name="marketValue" 
                    type="number"
                    icon={IndianRupee}
                    required 
                    placeholder="Enter market value"
                  />
                  <InputField 
                    label="Discussion Value (₹)" 
                    name="discussionValue" 
                    type="number"
                    icon={IndianRupee}
                    placeholder="Enter discussion value"
                  />
                  <InputField 
                    label="Forced Sale Value (₹)" 
                    name="forcesdSaleValue" 
                    type="number"
                    icon={IndianRupee}
                    placeholder="Enter forced sale value"
                  />
                  <InputField 
                    label="Recommended LTV (%)" 
                    name="recommendedLtv" 
                    type="number"
                    icon={IndianRupee}
                    required 
                    placeholder="Enter LTV percentage"
                    min="0"
                    max="100"
                  />
                </div>

                {/* Construction Details */}
                <SectionHeading icon={Calendar} title="Construction Details" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                    placeholder="Enter property age"
                    min="0"
                  />
                  <InputField 
                    label="Residual Life (Years)" 
                    name="residualLife" 
                    type="number"
                    icon={Calendar}
                    placeholder="Enter residual life"
                    min="0"
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <TextAreaField 
                      label="Technical Remarks" 
                      name="remarks" 
                      icon={FileText}
                    />
                  </div>
                  <InputField 
                    label="Report URL" 
                    name="reportUrl" 
                    type="url"
                    icon={FileText}
                    placeholder="https://example.com/report"
                  />
                  <InputField 
                    label="Site Photographs URL" 
                    name="sitePhotographs" 
                    type="url"
                    icon={Camera}
                    placeholder="https://example.com/photos"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 flex items-center justify-end gap-3 p-6 border-t border-slate-200 bg-white rounded-b-2xl">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed min-w-[160px]"
              >
                {isSubmitting ? 'Saving...' : 'Save Technical Report'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TechnicalReportModal;