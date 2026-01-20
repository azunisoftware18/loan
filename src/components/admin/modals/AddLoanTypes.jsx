import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";

import {
  X,
  Info,
  DollarSign,
  Percent,
  Calendar,
  Users,
  Shield,
  Eye,
  CheckCircle,
  AlertCircle,
  Briefcase,
  Home,
  Car,
  GraduationCap,
  Gem,
  User,
  FileText,
  Clock,
  CreditCard,
  FileCheck,
  ChevronDown
} from 'lucide-react';
import axios from 'axios';
import { addLoanType } from '../../../redux/slices/loanTypesSlice';

function AddLoanTypes({ onClose }) {

  const dispatch = useDispatch();
  // Form state
  const [formData, setFormData] = useState({
    // Section 1: Basic Information
    loanCode: '',
    loanName: '',
    loanCategory: '',
    securedLoan: false,
    description: '',
    
    // Section 2: Loan Amount & Tenure
    minLoanAmount: '',
    maxLoanAmount: '',
    minTenure: '',
    maxTenure: '',
    
    // Section 3: Interest Details
interestType: 'FLAT',
    minInterestRate: '',
    maxInterestRate: '',
    defaultInterestRate: '',
    
    // Section 4: Processing Fee & Tax
    processingFeeType: 'PERCENTAGE',
    processingFeeValue: '',
    gstApplicable: false,
    gstPercentage: '',
    
    // Section 5: Eligibility Criteria
    minAge: '',
    maxAge: '',
    minMonthlyIncome: '',
    employmentType: '',
    minCibilScore: '',
    maxCibilScore: '',
    
    // Section 6: Loan Rules
    prepaymentAllowed: false,
    foreclosureAllowed: false,
    prepaymentCharges: '',
    foreclosureCharges: '',
    
    // Section 7: Status & Visibility
    activeStatus: true,
    publicVisibility: true,
    approvalRequired: true,
    estimatedProcessingTimeDays: '',
    
    // Section 8: Documentation
    documentsRequired: '',
  });

  // Validation state
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Loan category options with icons
  const loanCategories = [
    { value: 'PERSONAL_LOAN', label: 'Personal Loan', icon: User },
    { value: 'VEHICLE_LOAN', label: 'Vehicle Loan', icon: Car },
    { value: 'HOME_LOAN', label: 'Home Loan', icon: Home },
    { value: 'EDUCATION_LOAN', label: 'Education Loan', icon: GraduationCap },
    { value: 'BUSINESS_LOAN', label: 'Business Loan', icon: Briefcase },
    { value: 'GOLD_LOAN', label: 'Gold Loan', icon: Gem },
  ];

  // Interest type options
  const interestTypes = [
  { value: 'FLAT', label: 'Flat' },
  { value: 'REDUCING', label: 'Reducing Balance' },
];


  // Processing fee type options
  const processingFeeTypes = [
  { value: 'PERCENTAGE', label: 'Percentage' },
  { value: 'FIXED', label: 'Fixed Amount' },
];


  // Employment type options
 const employmentTypes = [
  { value: 'salaried', label: 'Salaried' },
  { value: 'self_employed', label: 'Self-Employed' },
];


  // Document requirement options
  const documentOptions = [
    { value: 'BASIC', label: 'Basic Documents Only' },
    { value: 'STANDARD', label: 'Standard Documentation' },
    { value: 'COMPREHENSIVE', label: 'Comprehensive Documentation' },
  ];

  // Generate loan code based on category
  useEffect(() => {
    if (formData.loanCategory) {
      const prefix = formData.loanCategory.split('_')[0].substring(0, 3).toUpperCase();
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      setFormData(prev => ({ ...prev, loanCode: `${prefix}-${randomNum}` }));
    }
  }, [formData.loanCategory]);

  // Validation function
  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'loanName':
        if (!value.trim()) error = 'Loan name is required';
        break;
      case 'loanCategory':
        if (!value) error = 'Loan category is required';
        break;
      case 'description':
        if (value && value.length > 500) error = 'Description cannot exceed 500 characters';
        break;
      case 'minLoanAmount':
        if (!value) error = 'Minimum amount is required';
        else if (parseFloat(value) <= 0) error = 'Amount must be positive';
        break;
      case 'maxLoanAmount':
        if (!value) error = 'Maximum amount is required';
        else if (parseFloat(value) <= 0) error = 'Amount must be positive';
        else if (parseFloat(value) <= parseFloat(formData.minLoanAmount || 0)) 
          error = 'Must be greater than minimum amount';
        break;
      case 'minTenure':
        if (!value) error = 'Minimum tenure is required';
        else if (parseInt(value) <= 0) error = 'Tenure must be positive';
        break;
      case 'maxTenure':
        if (!value) error = 'Maximum tenure is required';
        else if (parseInt(value) <= 0) error = 'Tenure must be positive';
        else if (parseInt(value) <= parseInt(formData.minTenure || 0)) 
          error = 'Must be greater than minimum tenure';
        break;
      case 'minAge':
        if (!value) error = 'Minimum age is required';
        else if (parseInt(value) < 18) error = 'Minimum age must be at least 18';
        break;
      case 'maxAge':
        if (!value) error = 'Maximum age is required';
        else if (parseInt(value) > 100) error = 'Maximum age is too high';
        else if (parseInt(value) <= parseInt(formData.minAge || 0)) 
          error = 'Must be greater than minimum age';
        break;
      case 'minCibilScore':
        if (value) {
          const score = parseInt(value);
          if (score < 300) error = 'CIBIL score must be at least 300';
          else if (score > 900) error = 'CIBIL score cannot exceed 900';
        }
        break;
      case 'maxCibilScore':
        if (value && formData.minCibilScore) {
          const minScore = parseInt(formData.minCibilScore);
          const maxScore = parseInt(value);
          if (maxScore <= minScore) error = 'Must be greater than minimum CIBIL score';
          else if (maxScore > 900) error = 'CIBIL score cannot exceed 900';
        }
        break;
      case 'estimatedProcessingTimeDays':
        if (value && parseInt(value) < 1) error = 'Processing time must be at least 1 day';
        break;
      default:
        break;
    }
    
    return error;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Validate on change
    if (touched[name]) {
      const error = validateField(name, type === 'checkbox' ? checked : value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  // Handle textarea changes
  const handleTextareaChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  // Handle blur
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  // Check if form is valid
  const isFormValid = () => {
    const requiredFields = [
      'loanName',
      'loanCategory',
      'minLoanAmount',
      'maxLoanAmount',
      'minTenure',
      'maxTenure',
      'minAge',
      'maxAge',
    ];
    
    return requiredFields.every(field => {
      const value = formData[field];
      return value !== '' && value !== null && value !== undefined && !errors[field];
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) return;

    const payload = {
      code: formData.loanCode,
      name: formData.loanName,
      category: formData.loanCategory,
      secured: formData.securedLoan,
      description: formData.description || undefined,

      minAmount: Number(formData.minLoanAmount),
      maxAmount: Number(formData.maxLoanAmount),
      minTenureMonths: Number(formData.minTenure),
      maxTenureMonths: Number(formData.maxTenure),

      interestType: formData.interestType,
      minInterestRate: Number(formData.minInterestRate),
maxInterestRate: Number(formData.maxInterestRate),
defaultInterestRate: Number(formData.defaultInterestRate),


      processingFeeType: formData.processingFeeType,
      processingFee: formData.processingFeeValue ? Number(formData.processingFeeValue) : undefined,

      gstApplicable: formData.gstApplicable,
      gstPercentage: formData.gstApplicable && formData.gstPercentage 
        ? Number(formData.gstPercentage) 
        : undefined,

      minAge: Number(formData.minAge),
      maxAge: Number(formData.maxAge),

      minIncome: formData.minMonthlyIncome
        ? Number(formData.minMonthlyIncome)
        : undefined,

      employmentType: formData.employmentType || undefined,

      minCibilScore: formData.minCibilScore
        ? Number(formData.minCibilScore)
        : undefined,

      maxCibilScore: formData.maxCibilScore
        ? Number(formData.maxCibilScore)
        : undefined,

      prepaymentAllowed: formData.prepaymentAllowed,
      foreclosureAllowed: formData.foreclosureAllowed,
      prepaymentCharges: formData.prepaymentAllowed && formData.prepaymentCharges
        ? Number(formData.prepaymentCharges)
        : undefined,
      foreclosureCharges: formData.foreclosureAllowed && formData.foreclosureCharges
        ? Number(formData.foreclosureCharges)
        : undefined,

      isActive: formData.activeStatus,
      isPublic: formData.publicVisibility,
      approvalRequired: formData.approvalRequired,

      estimatedProcessingTimeDays: formData.estimatedProcessingTimeDays
        ? Number(formData.estimatedProcessingTimeDays)
        : undefined,

      documentsRequired:
  formData.documentsRequired === "BASIC"
    ? "Aadhaar,PAN"
    : formData.documentsRequired === "STANDARD"
    ? "Aadhaar,PAN,Salary Slip,Bank Statement"
    : formData.documentsRequired === "COMPREHENSIVE"
    ? "Aadhaar,PAN,Salary Slip,Bank Statement,ITR"
    : undefined,

    };

    try {
  const res = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/loantypes`,
    payload,
    { withCredentials: true }
  );

  // ✅ SUCCESS MESSAGE
  alert("Loan Type created successfully ✅");

  // ✅ Redux store update (optional but recommended)
  dispatch(addLoanType(res.data.data));

  // ✅ Close popup
  onClose();

} catch (error) {
  console.error("BACKEND ERROR 👉", error.response?.data);
  alert(
    error.response?.data?.message ||
    "Failed to create loan type"
  );
}

  };

  // Render field with validation
  const renderField = (label, name, type = 'text', placeholder = '', options = []) => {
    const isRequired = ['loanName', 'loanCategory', 'minLoanAmount', 'maxLoanAmount', 
                       'minTenure', 'maxTenure', 'minAge', 'maxAge'].includes(name);
    
    return (
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {isRequired && <span className="text-red-500 ml-1">*</span>}
        </label>
        
        {type === 'select' ? (
          <div className="relative">
            <select
              name={name}
              value={formData[name]}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors[name] ? 'border-red-300' : 'border-gray-300'
              } appearance-none bg-white`}
            >
              <option value="">Select {label.toLowerCase()}</option>
              {options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </div>
          </div>
        ) : type === 'textarea' ? (
          <div>
            <textarea
              name={name}
              value={formData[name]}
              onChange={handleTextareaChange}
              onBlur={handleBlur}
              placeholder={placeholder}
              rows="3"
              maxLength="500"
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none ${
                errors[name] ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            <div className="flex justify-between mt-1">
              <p className="text-xs text-gray-500">
                Brief description of the loan product
              </p>
              <p className={`text-xs ${formData.description?.length > 450 ? 'text-amber-600' : 'text-gray-500'}`}>
                {formData.description?.length || 0}/500
              </p>
            </div>
          </div>
        ) : (
          <input
            type={type}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            min={type === 'number' ? '0' : undefined}
            readOnly={name === 'loanCode'}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              errors[name] ? 'border-red-300' : 'border-gray-300'
            } ${name === 'loanCode' ? 'bg-gray-50 cursor-not-allowed' : ''}`}
          />
        )}
        
        {errors[name] && (
          <p className="text-red-500 text-xs flex items-center mt-1">
            <AlertCircle className="w-3 h-3 mr-1" />
            {errors[name]}
          </p>
        )}
        
        {name === 'loanCode' && !errors[name] && (
          <p className="text-gray-500 text-xs">Auto-generated based on category</p>
        )}
      </div>
    );
  };

  // Toggle switch component
  const ToggleSwitch = ({ name, label, description = '' }) => (
    <div className="flex items-center justify-between">
      <div>
        <label className="text-sm font-medium text-gray-700">{label}</label>
        {description && <p className="text-xs text-gray-500">{description}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={formData[name]}
        onClick={() => setFormData(prev => ({ ...prev, [name]: !prev[name] }))}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          formData[name] ? 'bg-blue-600' : 'bg-gray-300'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            formData[name] ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-md transition-all duration-300" />
      
      {/* Modal container */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative w-full max-w-4xl">
          {/* Modal content */}
          <div className="relative bg-white rounded-xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Create New Loan Type</h2>
                  <p className="text-sm text-gray-600 mt-1">Configure all settings for the new loan product</p>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="max-h-[70vh] overflow-y-auto p-6 space-y-6">
                {/* Section 1: Basic Information */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-center mb-6">
                    <Info className="w-5 h-5 text-blue-600 mr-3" />
                    <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {renderField('Loan Code', 'loanCode', 'text')}
                      {renderField('Loan Name', 'loanName', 'text', 'Enter loan product name')}
                    </div>
                    
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Loan Category <span className="text-red-500 ml-1">*</span>
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {loanCategories.map(category => {
                          const Icon = category.icon;
                          return (
                            <button
                              key={category.value}
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, loanCategory: category.value }))}
                              onBlur={() => setTouched(prev => ({ ...prev, loanCategory: true }))}
                              className={`p-4 border rounded-lg text-center transition-all ${
                                formData.loanCategory === category.value
                                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-100'
                                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              <Icon className={`w-6 h-6 mx-auto mb-2 ${
                                formData.loanCategory === category.value ? 'text-blue-600' : 'text-gray-600'
                              }`} />
                              <span className="text-sm font-medium">{category.label}</span>
                            </button>
                          );
                        })}
                      </div>
                      {errors.loanCategory && (
                        <p className="text-red-500 text-xs flex items-center mt-1">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {errors.loanCategory}
                        </p>
                      )}
                    </div>
                    
                    {renderField('Description (optional)', 'description', 'textarea', 'Enter a brief description of this loan product...')}
                    
                    <div className="pt-4 border-t border-gray-100">
                      <ToggleSwitch 
                        name="securedLoan" 
                        label="Secured Loan" 
                        description="Requires collateral or security"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Loan Amount & Tenure */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-center mb-6">
                    <DollarSign className="w-5 h-5 text-blue-600 mr-3" />
                    <h3 className="text-lg font-medium text-gray-900">Loan Amount & Tenure</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {renderField('Minimum Loan Amount', 'minLoanAmount', 'number', '0.00')}
                    {renderField('Maximum Loan Amount', 'maxLoanAmount', 'number', '0.00')}
                    {renderField('Minimum Tenure (months)', 'minTenure', 'number', '0')}
                    {renderField('Maximum Tenure (months)', 'maxTenure', 'number', '0')}
                  </div>
                </div>

                {/* Section 3: Interest Details */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-center mb-6">
                    <Percent className="w-5 h-5 text-blue-600 mr-3" />
                    <h3 className="text-lg font-medium text-gray-900">Interest Details</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {renderField('Interest Type', 'interestType', 'select', '', interestTypes)}
                    {renderField('Minimum Interest Rate (%)', 'minInterestRate', 'number', '0.00')}
                    {renderField('Maximum Interest Rate (%)', 'maxInterestRate', 'number', '0.00')}
                    {renderField('Default Interest Rate (%)', 'defaultInterestRate', 'number', '0.00')}
                  </div>
                </div>

                {/* Section 4: Processing Fee & Tax */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-center mb-6">
                    <CheckCircle className="w-5 h-5 text-blue-600 mr-3" />
                    <h3 className="text-lg font-medium text-gray-900">Processing Fee & Tax</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {renderField('Processing Fee Type', 'processingFeeType', 'select', '', processingFeeTypes)}
                    {renderField('Processing Fee Value', 'processingFeeValue', 'number', '0.00')}
                    
                    <div className="space-y-4">
                      <ToggleSwitch 
                        name="gstApplicable" 
                        label="GST Applicable" 
                        description="Goods and Services Tax"
                      />
                      
                      {formData.gstApplicable && (
                        <div className="transition-all duration-300 ease-in-out">
                          {renderField('GST Percentage (%)', 'gstPercentage', 'number', '0.00')}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Section 5: Eligibility Criteria */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-center mb-6">
                    <Users className="w-5 h-5 text-blue-600 mr-3" />
                    <h3 className="text-lg font-medium text-gray-900">Eligibility Criteria</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {renderField('Minimum Age', 'minAge', 'number', '18')}
                    {renderField('Maximum Age', 'maxAge', 'number', '65')}
                    {renderField('Minimum Monthly Income (optional)', 'minMonthlyIncome', 'number', '0.00')}
                    {renderField('Employment Type (optional)', 'employmentType', 'select', '', employmentTypes)}
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Minimum CIBIL Score (optional)
                      </label>
                      <div className="flex items-center space-x-2">
                        <CreditCard className="w-4 h-4 text-gray-400" />
                        <input
                          type="number"
                          name="minCibilScore"
                          value={formData.minCibilScore}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="300"
                          min="300"
                          max="900"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>
                      {errors.minCibilScore && (
                        <p className="text-red-500 text-xs flex items-center mt-1">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {errors.minCibilScore}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">Minimum credit score required (300-900)</p>
                    </div>
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Maximum CIBIL Score (optional)
                      </label>
                      <div className="flex items-center space-x-2">
                        <CreditCard className="w-4 h-4 text-gray-400" />
                        <input
                          type="number"
                          name="maxCibilScore"
                          value={formData.maxCibilScore}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="900"
                          min="300"
                          max="900"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>
                      {errors.maxCibilScore && (
                        <p className="text-red-500 text-xs flex items-center mt-1">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {errors.maxCibilScore}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">Maximum credit score consideration</p>
                    </div>
                  </div>
                </div>

                {/* Section 6: Loan Rules */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-center mb-6">
                    <Shield className="w-5 h-5 text-blue-600 mr-3" />
                    <h3 className="text-lg font-medium text-gray-900">Loan Rules</h3>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <ToggleSwitch 
                        name="prepaymentAllowed" 
                        label="Prepayment Allowed" 
                        description="Allow early partial repayment"
                      />
                      <ToggleSwitch 
                        name="foreclosureAllowed" 
                        label="Foreclosure Allowed" 
                        description="Allow complete early repayment"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {formData.prepaymentAllowed && (
                        <div className="transition-all duration-300 ease-in-out">
                          {renderField('Prepayment Charges (%)', 'prepaymentCharges', 'number', '0.00')}
                        </div>
                      )}
                      
                      {formData.foreclosureAllowed && (
                        <div className="transition-all duration-300 ease-in-out">
                          {renderField('Foreclosure Charges (%)', 'foreclosureCharges', 'number', '0.00')}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Section 7: Status & Visibility */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-center mb-6">
                    <Eye className="w-5 h-5 text-blue-600 mr-3" />
                    <h3 className="text-lg font-medium text-gray-900">Status & Visibility</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <ToggleSwitch 
                        name="activeStatus" 
                        label="Active Status" 
                        description="Enable this loan product"
                      />
                      <ToggleSwitch 
                        name="publicVisibility" 
                        label="Public Visibility" 
                        description="Show on customer portal"
                      />
                      <ToggleSwitch 
                        name="approvalRequired" 
                        label="Approval Required" 
                        description="Requires manual approval"
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">
                          Estimated Processing Time (days)
                        </label>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <input
                            type="number"
                            name="estimatedProcessingTimeDays"
                            value={formData.estimatedProcessingTimeDays}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="e.g., 7"
                            min="1"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          />
                        </div>
                        {errors.estimatedProcessingTimeDays && (
                          <p className="text-red-500 text-xs flex items-center mt-1">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            {errors.estimatedProcessingTimeDays}
                          </p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">Average time to process loan applications</p>
                      </div>
                      
                      <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">
                          Documents Required
                        </label>
                        <div className="flex items-center space-x-2">
                          <FileText className="w-4 h-4 text-gray-400" />
                          <div className="relative w-full">
                            <select
                              name="documentsRequired"
                              value={formData.documentsRequired}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-white"
                            >
                              <option value="">Select document requirement level</option>
                              {documentOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Documentation complexity for this loan</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 border-t border-gray-200 bg-white px-6 py-4">
                <div className="flex flex-col sm:flex-row-reverse sm:justify-start gap-3">
                  <button
                    type="submit"
                    disabled={!isFormValid()}
                    className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${
                      isFormValid()
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Create Loan Type
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
                
                {!isFormValid() && (
                  <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      Please fill all required fields correctly to create the loan type
                    </p>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddLoanTypes;