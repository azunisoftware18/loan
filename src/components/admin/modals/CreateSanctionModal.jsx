import React, { useState, useEffect } from 'react';
import {
  X,
  User,
  Building2,
  DollarSign,
  Percent,
  Calendar,
  FileText,
  AlertCircle,
  CheckCircle,
  Clock,
  Home,
  Briefcase,
  CreditCard,
  ChevronDown,
  IndianRupee
} from 'lucide-react';

const CreateSanctionModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    // Loan Information
    loanNumber: '',
    applicantName: '',
    loanType: '',
    branchName: '',

    // Requested Loan Details
    requestedAmount: '',
    requestedTenure: '',
    requestedInterestRate: '',

    // Sanction Decision Details
    sanctionedAmount: '',
    sanctionedTenure: '',
    sanctionedInterestRate: '',
    emiAmount: '',
    processingFee: '',
    insuranceAmount: '',

    // Approval Information
    sanctionAuthority: '',
    sanctionDate: new Date().toISOString().split('T')[0],
    validityDate: '',
    sanctionStatus: 'PENDING',

    // Additional Details
    conditions: '',
    remarks: ''
  });

  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

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

    // Auto-calculate EMI when sanctioned amount, interest rate, or tenure changes
    if (['sanctionedAmount', 'sanctionedInterestRate', 'sanctionedTenure'].includes(name)) {
      calculateEMI();
    }
  };

  const calculateEMI = () => {
    const amount = parseFloat(formData.sanctionedAmount.replace(/[^0-9.-]+/g, '')) || 0;
    const rate = parseFloat(formData.sanctionedInterestRate) || 0;
    const tenure = parseFloat(formData.sanctionedTenure) || 0;

    if (amount && rate && tenure) {
      const monthlyRate = rate / 12 / 100;
      const emi = amount * monthlyRate * Math.pow(1 + monthlyRate, tenure) / (Math.pow(1 + monthlyRate, tenure) - 1);
      setFormData(prev => ({
        ...prev,
        emiAmount: `₹${Math.round(emi).toLocaleString('en-IN')}`
      }));
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));
    validateField(field);
  };

  const validateField = (field) => {
    let error = '';
    const value = formData[field];

    if (requiredFields.includes(field) && !value) {
      error = 'This field is required';
    }

    if (value && ['requestedAmount', 'sanctionedAmount', 'processingFee', 'insuranceAmount'].includes(field)) {
      const numValue = parseFloat(value.replace(/[^0-9.-]+/g, ''));
      if (isNaN(numValue) || numValue <= 0) {
        error = 'Please enter a valid amount';
      }
    }

    if (value && ['requestedInterestRate', 'sanctionedInterestRate'].includes(field)) {
      const numValue = parseFloat(value);
      if (isNaN(numValue) || numValue < 0 || numValue > 30) {
        error = 'Interest rate must be between 0 and 30%';
      }
    }

    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched(Object.fromEntries(requiredFields.map(f => [f, true])));
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Sanction Data:', formData);
    setIsSubmitting(false);
    onClose();
    
    // Reset form
    setFormData({
      loanNumber: '',
      applicantName: '',
      loanType: '',
      branchName: '',
      requestedAmount: '',
      requestedTenure: '',
      requestedInterestRate: '',
      sanctionedAmount: '',
      sanctionedTenure: '',
      sanctionedInterestRate: '',
      emiAmount: '',
      processingFee: '',
      insuranceAmount: '',
      sanctionAuthority: '',
      sanctionDate: new Date().toISOString().split('T')[0],
      validityDate: '',
      sanctionStatus: 'PENDING',
      conditions: '',
      remarks: ''
    });
    setTouched({});
    setErrors({});
  };

  const handleApproveAndGenerate = async () => {
    setFormData(prev => ({ ...prev, sanctionStatus: 'APPROVED' }));
    await handleSubmit({ preventDefault: () => {} });
  };

  const requiredFields = [
    'loanNumber',
    'applicantName',
    'loanType',
    'branchName',
    'requestedAmount',
    'sanctionedAmount',
    'sanctionedInterestRate',
    'sanctionedTenure',
    'sanctionAuthority',
    'validityDate'
  ];

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
            touched[name] && errors[name]
              ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500'
              : touched[name] && !errors[name] && formData[name]
              ? 'border-green-300 focus:ring-green-500/20 focus:border-green-500'
              : 'border-slate-200 focus:ring-blue-500/20 focus:border-blue-500'
          } rounded-xl text-sm transition-colors duration-200`}
          {...props}
        />
      </div>
      {touched[name] && errors[name] && (
        <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
          <AlertCircle className="w-3 h-3" />
          {errors[name]}
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
            touched[name] && errors[name]
              ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500'
              : 'border-slate-200 focus:ring-blue-500/20 focus:border-blue-500'
          } rounded-xl text-sm appearance-none bg-white transition-colors duration-200`}
        >
          <option value="">Select {label}</option>
          {options.map(option => (
            <option key={option.value || option} value={option.value || option}>
              {option.label || option}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
      </div>
      {touched[name] && errors[name] && (
        <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
          <AlertCircle className="w-3 h-3" />
          {errors[name]}
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
            touched[name] && errors[name]
              ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500'
              : 'border-slate-200 focus:ring-blue-500/20 focus:border-blue-500'
          } rounded-xl text-sm transition-colors duration-200 resize-none`}
          placeholder={`Enter ${label.toLowerCase()}`}
        />
      </div>
      {touched[name] && errors[name] && (
        <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
          <AlertCircle className="w-3 h-3" />
          {errors[name]}
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
              <h2 className="text-xl font-bold text-slate-800">Create Loan Sanction</h2>
              <p className="text-sm text-slate-500 mt-1">Enter sanction details for loan approval</p>
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
                {/* Loan Information */}
                <SectionHeading icon={FileText} title="Loan Information" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <InputField
                    label="Loan Number"
                    name="loanNumber"
                    icon={FileText}
                    required
                    placeholder="LN-2024-001"
                  />
                  <InputField
                    label="Applicant Name"
                    name="applicantName"
                    icon={User}
                    required
                    placeholder="Enter applicant name"
                  />
                  <SelectField
                    label="Loan Type"
                    name="loanType"
                    icon={Home}
                    required
                    options={[
                      { value: 'Home Loan', label: 'Home Loan' },
                      { value: 'Personal Loan', label: 'Personal Loan' },
                      { value: 'Business Loan', label: 'Business Loan' },
                      { value: 'Car Loan', label: 'Car Loan' },
                      { value: 'Education Loan', label: 'Education Loan' }
                    ]}
                  />
                  <InputField
                    label="Branch Name"
                    name="branchName"
                    icon={Building2}
                    required
                    placeholder="Enter branch name"
                  />
                </div>

                {/* Requested Loan Details */}
                <SectionHeading icon={IndianRupee} title="Requested Loan Details" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <InputField
                    label="Requested Amount (₹)"
                    name="requestedAmount"
                    type="text"
                    icon={IndianRupee}
                    required
                    placeholder="₹"
                  />
                  <InputField
                    label="Requested Tenure (months)"
                    name="requestedTenure"
                    type="number"
                    icon={Calendar}
                    placeholder="Enter months"
                  />
                  <InputField
                    label="Requested Interest Rate (%)"
                    name="requestedInterestRate"
                    type="number"
                    step="0.1"
                    icon={Percent}
                    placeholder="Enter rate"
                  />
                </div>

                {/* Sanction Decision Details */}
                <SectionHeading icon={CheckCircle} title="Sanction Decision Details" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  <InputField
                    label="Sanctioned Amount (₹)"
                    name="sanctionedAmount"
                    type="text"
                    icon={IndianRupee}
                    required
                    placeholder="₹"
                  />
                  <InputField
                    label="Sanctioned Tenure (months)"
                    name="sanctionedTenure"
                    type="number"
                    icon={Calendar}
                    required
                    placeholder="Enter months"
                  />
                  <InputField
                    label="Sanctioned Interest Rate (%)"
                    name="sanctionedInterestRate"
                    type="number"
                    step="0.1"
                    icon={Percent}
                    required
                    placeholder="Enter rate"
                  />
                  <InputField
                    label="EMI Amount (₹)"
                    name="emiAmount"
                    type="text"
                    icon={CreditCard}
                    placeholder="Auto-calculated"
                    readOnly
                    className="bg-slate-50"
                  />
                  <InputField
                    label="Processing Fee (₹)"
                    name="processingFee"
                    type="text"
                    icon={IndianRupee}
                    placeholder="₹"
                  />
                  <InputField
                    label="Insurance Amount (₹)"
                    name="insuranceAmount"
                    type="text"
                    icon={IndianRupee}
                    placeholder="₹"
                  />
                </div>

                {/* Approval Information */}
                <SectionHeading icon={CheckCircle} title="Approval Information" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                  <InputField
                    label="Sanction Authority"
                    name="sanctionAuthority"
                    icon={User}
                    required
                    placeholder="Enter authority name"
                  />
                  <InputField
                    label="Sanction Date"
                    name="sanctionDate"
                    type="date"
                    icon={Calendar}
                    required
                  />
                  <InputField
                    label="Valid Until"
                    name="validityDate"
                    type="date"
                    icon={Calendar}
                    required
                  />
                  <SelectField
                    label="Sanction Status"
                    name="sanctionStatus"
                    icon={Clock}
                    options={[
                      { value: 'PENDING', label: 'Pending' },
                      { value: 'APPROVED', label: 'Approved' },
                      { value: 'CONDITIONAL', label: 'Conditional' },
                      { value: 'REJECTED', label: 'Rejected' }
                    ]}
                  />
                </div>

                {/* Additional Details */}
                <SectionHeading icon={FileText} title="Additional Details" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <TextAreaField
                      label="Conditions (if any)"
                      name="conditions"
                      icon={AlertCircle}
                      placeholder="Enter any conditions for sanction"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <TextAreaField
                      label="Remarks"
                      name="remarks"
                      icon={FileText}
                      placeholder="Enter internal remarks"
                    />
                  </div>
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
                type="button"
                onClick={handleApproveAndGenerate}
                disabled={isSubmitting}
                className="px-6 py-3 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-xl transition-colors shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Approve & Generate Letter
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px]"
              >
                {isSubmitting ? 'Saving...' : 'Save Sanction'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateSanctionModal;