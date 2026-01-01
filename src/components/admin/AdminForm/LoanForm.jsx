import React, { useState } from 'react';
import { 
  User, Phone, Mail, Briefcase, IndianRupee, Target, 
  Home, MapPin, Shield, FileText, Calendar, FileCheck,
  IdCard, CreditCard, Camera, Banknote, Signature, 
  CheckCircle, X, Upload, File, ArrowLeft, ChevronRight,
  Building, Globe, GraduationCap, Heart, Car, Package,
  TrendingUp, Percent, Clock, DollarSign, Building2,
  FileQuestion, FileSpreadsheet, FileBarChart,
  Check, Circle, Navigation, Crosshair
} from 'lucide-react';

const LoanForm = ({ 
  onSubmit, 
  onCancel,
  initialFormData = {}, 
  initialDocuments = {},
  loanCategories = ['Secured', 'Unsecured'],
  loanProducts = {
    'Secured': ['Home Loan', 'Car Loan', 'Loan Against Property', 'Gold Loan', 'Construction Loan', 'Mortgage Loan'],
    'Unsecured': ['Personal Loan', 'Education Loan', 'Business Loan', 'Credit Card Loan', 'Medical Loan', 'Travel Loan']
  },
  occupationTypes = [
    'Salaried - Government',
    'Salaried - Private',
    'Self-Employed Business',
    'Self-Employed Professional',
    'Agriculturist',
    'Retired',
    'Student',
    'Homemaker',
    'Unemployed',
    'Other'
  ],
  incomeSources = [
    'Salary',
    'Business Income',
    'Rental Income',
    'Investment Returns',
    'Pension',
    'Agriculture Income',
    'Other Sources'
  ],
  relationshipStatuses = ['Single', 'Married', 'Divorced', 'Widowed', 'Separated'],
  educationLevels = [
    'Below 10th',
    '10th Pass',
    '12th Pass',
    'Diploma',
    'Graduate',
    'Post Graduate',
    'Doctorate',
    'Other'
  ]
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState({
    // Personal Information
    customerName: '',
    mobile: '',
    email: '',
    dateOfBirth: '',
    gender: '',
    maritalStatus: '',
    education: '',
    
    // Employment Details
    occupation: '',
    companyName: '',
    designation: '',
    monthlyIncome: '',
    otherIncome: '',
    incomeSource: '',
    
    // Financial Details
    existingLoans: '',
    existingEMIs: '',
    cibilScore: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    
    // Loan Details
    requestedAmount: '',
    tenureMonths: '',
    loanType: '',
    loanCategory: '',
    loanPurpose: '',
    interestRate: '',
    
    // Address Information
    address: '',
    city: '',
    state: '',
    country: 'India',
    pincode: '',
    residenceType: '',
    
    // Co-applicant Details
    coApplicantName: '',
    coApplicantRelation: '',
    coApplicantIncome: '',
    
    ...initialFormData
  });

  const [documents, setDocuments] = useState({
    // Identity Proof
    aadharCard: null,
    panCard: null,
    passport: null,
    voterId: null,
    drivingLicense: null,
    
    // Photo & Signature
    photo: null,
    signature: null,
    
    // Address Proof
    addressProof: null,
    utilityBill: null,
    
    // Income Proof
    salarySlips: null,
    form16: null,
    itrDocuments: null,
    bankStatements: null,
    
    // Property Documents (for secured loans)
    propertyPapers: null,
    valuationReport: null,
    
    // Business Documents (for self-employed)
    businessProof: null,
    gstCertificate: null,
    
    // Other Documents
    nocFromEmployer: null,
    additionalDocuments: null,
    
    ...initialDocuments
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalSteps = 4;

  // Calculate total income
  const calculateTotalIncome = () => {
    const monthly = parseFloat(form.monthlyIncome) || 0;
    const other = parseFloat(form.otherIncome) || 0;
    return (monthly + other);
  };

  // Calculate interest rate based on loan category and type
  const calculateInterestRate = (category, loanType) => {
    const rates = {
      'Secured': {
        'Home Loan': 9.5,
        'Car Loan': 11.0,
        'Loan Against Property': 12.0,
        'Gold Loan': 14.0,
        'Construction Loan': 11.0,
        'Mortgage Loan': 12.0
      },
      'Unsecured': {
        'Personal Loan': 18.0,
        'Education Loan': 14.0,
        'Business Loan': 20.0,
        'Credit Card Loan': 24.0,
        'Medical Loan': 17.0,
        'Travel Loan': 19.0
      }
    };
    return rates[category]?.[loanType] || 15.0;
  };

  // Calculate EMI
  const calculateEMI = (amount, tenureMonths) => {
    if (!amount || !tenureMonths) return 0;
    const principal = parseFloat(amount);
    const months = parseInt(tenureMonths) || 12;
    const rate = (form.interestRate || 15.0) / 12 / 100; // Monthly interest rate
    const emi = principal * rate * Math.pow(1 + rate, months) / (Math.pow(1 + rate, months) - 1);
    return Math.round(emi);
  };

  // Calculate total payable
  const calculateTotalPayable = (amount, tenureMonths) => {
    const emi = calculateEMI(amount, tenureMonths);
    return emi * (parseInt(tenureMonths) || 12);
  };

  // Handle document upload
  const handleDocumentUpload = (docType, file) => {
    if (file && file.size <= 10 * 1024 * 1024) { // 10MB limit
      setDocuments(prev => ({
        ...prev,
        [docType]: {
          file,
          name: file.name,
          type: file.type,
          size: file.size,
          uploadedAt: new Date().toISOString()
        }
      }));
    } else if (file) {
      alert('File size must be less than 10MB');
    }
  };

  // Remove document
  const removeDocument = (docType) => {
    setDocuments(prev => ({
      ...prev,
      [docType]: null
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Basic validation
      if (!form.customerName || !form.requestedAmount || !form.loanCategory || !form.mobile) {
        alert('Customer name, mobile number, amount, and loan category are required');
        return;
      }

      // Mobile number validation
      const mobileRegex = /^[6-9]\d{9}$/;
      if (!mobileRegex.test(form.mobile)) {
        alert('Please enter a valid 10-digit mobile number');
        return;
      }

      // Email validation
      if (form.email && !/\S+@\S+\.\S+/.test(form.email)) {
        alert('Please enter a valid email address');
        return;
      }

      // Document validation
      const requiredDocs = ['aadharCard', 'panCard'];
      const missingDocs = requiredDocs.filter(doc => !documents[doc]);
      
      if (missingDocs.length > 0) {
        alert(`Please upload required documents: ${missingDocs.join(', ')}`);
        return;
      }

      // Prepare loan application data matching Prisma schema
      const loanApplicationData = {
        // Customer information (would come from customer relation in real app)
        customerInfo: {
          name: form.customerName,
          email: form.email,
          phone: form.mobile,
          dateOfBirth: form.dateOfBirth,
          gender: form.gender,
          maritalStatus: form.maritalStatus,
          education: form.education,
          occupation: form.occupation,
          companyName: form.companyName,
          designation: form.designation,
          monthlyIncome: parseFloat(form.monthlyIncome) || 0,
          otherIncome: parseFloat(form.otherIncome) || 0,
          incomeSource: form.incomeSource,
          address: form.address,
          city: form.city,
          state: form.state,
          pincode: form.pincode,
          residenceType: form.residenceType,
          existingLoans: form.existingLoans,
          existingEMIs: parseFloat(form.existingEMIs) || 0
        },
        
        // Loan application fields
        requestedAmount: parseFloat(form.requestedAmount),
        tenureMonths: parseInt(form.tenureMonths) || 12,
        interestRate: parseFloat(form.interestRate) || calculateInterestRate(form.loanCategory, form.loanType),
        loanType: form.loanType || 'Personal Loan',
        loanPurpose: form.loanPurpose,
        cibilScore: parseInt(form.cibilScore) || null,
        
        // Bank details
        bankDetails: {
          bankName: form.bankName,
          accountNumber: form.accountNumber,
          ifscCode: form.ifscCode
        },
        
        // Co-applicant information
        coApplicant: form.coApplicantName ? {
          name: form.coApplicantName,
          relation: form.coApplicantRelation,
          income: parseFloat(form.coApplicantIncome) || 0
        } : null,
        
        // Documents
        documents: Object.keys(documents).reduce((acc, key) => {
          if (documents[key]) {
            acc[key] = {
              name: documents[key].name,
              type: documents[key].type,
              size: documents[key].size
            };
          }
          return acc;
        }, {}),
        
        // Calculated fields
        calculatedFields: {
          totalIncome: calculateTotalIncome(),
          emiAmount: calculateEMI(form.requestedAmount, form.tenureMonths),
          totalPayable: calculateTotalPayable(form.requestedAmount, form.tenureMonths)
        }
      };

      // Call onSubmit with the formatted data
      if (onSubmit) {
        await onSubmit(loanApplicationData);
      }

      // Show success message
      alert('Loan application submitted successfully!');
      
      // Reset form after successful submission
      resetForm();
      setCurrentStep(1);
      
    } catch (error) {
      alert('Error submitting application: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setForm({
      customerName: '',
      mobile: '',
      email: '',
      dateOfBirth: '',
      gender: '',
      maritalStatus: '',
      education: '',
      occupation: '',
      companyName: '',
      designation: '',
      monthlyIncome: '',
      otherIncome: '',
      incomeSource: '',
      existingLoans: '',
      existingEMIs: '',
      cibilScore: '',
      bankName: '',
      accountNumber: '',
      ifscCode: '',
      requestedAmount: '',
      tenureMonths: '',
      loanType: '',
      loanCategory: '',
      loanPurpose: '',
      interestRate: '',
      address: '',
      city: '',
      state: '',
      country: 'India',
      pincode: '',
      residenceType: '',
      coApplicantName: '',
      coApplicantRelation: '',
      coApplicantIncome: ''
    });
    setDocuments({
      aadharCard: null,
      panCard: null,
      passport: null,
      voterId: null,
      drivingLicense: null,
      photo: null,
      signature: null,
      addressProof: null,
      utilityBill: null,
      salarySlips: null,
      form16: null,
      itrDocuments: null,
      bankStatements: null,
      propertyPapers: null,
      valuationReport: null,
      businessProof: null,
      gstCertificate: null,
      nocFromEmployer: null,
      additionalDocuments: null
    });
  };

  // Update interest rate when loan category or type changes
  React.useEffect(() => {
    if (form.loanCategory && form.loanType) {
      const rate = calculateInterestRate(form.loanCategory, form.loanType);
      setForm(prev => ({
        ...prev,
        interestRate: rate.toString()
      }));
    }
  }, [form.loanCategory, form.loanType]);

  // Document upload component
  const DocumentUploadField = ({ label, docType, required = false, accept = "*", icon: Icon }) => (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-400 transition-colors">
      <label className="block text-sm font-medium mb-2 text-gray-700">
        <div className="flex items-center gap-2">
          <Icon size={16} className="text-blue-600" />
          {label} {required && <span className="text-red-500">*</span>}
        </div>
      </label>
      {!documents[docType] ? (
        <div className="text-center py-4">
          <Upload className="mx-auto text-gray-400 mb-2" size={24} />
          <input
            type="file"
            onChange={(e) => handleDocumentUpload(docType, e.target.files[0])}
            className="hidden"
            id={docType}
            accept={accept}
          />
          <label
            htmlFor={docType}
            className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 inline-block text-sm"
          >
            Upload File
          </label>
          <p className="text-xs text-gray-500 mt-2">Max file size: 10MB</p>
        </div>
      ) : (
        <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3">
          <div className="flex items-center gap-3">
            <File className="text-green-600" size={20} />
            <div>
              <p className="text-sm font-medium text-gray-800">{documents[docType].name}</p>
              <p className="text-xs text-gray-500">
                {(documents[docType].size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <button
            onClick={() => removeDocument(docType)}
            className="text-red-500 hover:text-red-700"
            type="button"
          >
            <X size={18} />
          </button>
        </div>
      )}
    </div>
  );

  // Step navigation
  const StepNavigation = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        {[1, 2, 3, 4].map((step) => (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold
                ${currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}
                ${currentStep === step ? 'ring-4 ring-blue-100' : ''}
              `}>
                {currentStep > step ? <Check size={20} /> : step}
              </div>
              <span className="text-xs mt-2 text-gray-600">
                {step === 1 && 'Personal Info'}
                {step === 2 && 'Financial Details'}
                {step === 3 && 'Loan Details'}
                {step === 4 && 'Documents'}
              </span>
            </div>
            {step < 4 && (
              <div className={`flex-1 h-1 mx-4 ${currentStep > step ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-800">
          {currentStep === 1 && 'Personal & Employment Information'}
          {currentStep === 2 && 'Financial & Bank Details'}
          {currentStep === 3 && 'Loan Application Details'}
          {currentStep === 4 && 'Document Upload'}
        </h2>
        <p className="text-gray-600 text-sm mt-1">
          Step {currentStep} of {totalSteps}
        </p>
      </div>
    </div>
  );

  // Next step
  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  // Previous step
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {onCancel && (
              <button
                onClick={onCancel}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                type="button"
              >
                <ArrowLeft size={20} className="text-gray-600" />
              </button>
            )}
            <h1 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <FileText size={20} />
              New Loan Application
            </h1>
          </div>
          <div className="text-sm text-gray-500">
            All fields marked with <span className="text-red-500">*</span> are required
          </div>
        </div>
      </div>

      <div className="p-6">
        <StepNavigation />
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Step 1: Personal & Employment Information */}
          {currentStep === 1 && (
            <div className="space-y-8">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <User size={18} />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      value={form.customerName}
                      onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Full Name *"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="tel"
                      value={form.mobile}
                      onChange={(e) => setForm({ ...form, mobile: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Mobile Number *"
                      required
                      maxLength={10}
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Email Address"
                    />
                  </div>

                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="date"
                      value={form.dateOfBirth}
                      onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Date of Birth"
                    />
                  </div>

                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <select
                      value={form.gender}
                      onChange={(e) => setForm({ ...form, gender: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="relative">
                    <Heart className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <select
                      value={form.maritalStatus}
                      onChange={(e) => setForm({ ...form, maritalStatus: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                    >
                      <option value="">Marital Status</option>
                      {relationshipStatuses.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>

                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <select
                      value={form.education}
                      onChange={(e) => setForm({ ...form, education: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                    >
                      <option value="">Education Level</option>
                      {educationLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Navigation size={18} />
                  Address Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="md:col-span-2 relative">
                    <Home className="absolute left-3 top-4 transform -translate-y-1/2 text-gray-400" size={18} />
                    <textarea
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                      placeholder="Complete Address"
                      rows={2}
                    />
                  </div>

                  <div className="relative">
                    <Crosshair className="absolute left-3 top-1/4 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="City"
                    />
                  </div>

                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      value={form.state}
                      onChange={(e) => setForm({ ...form, state: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="State"
                    />
                  </div>

                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      value={form.pincode}
                      onChange={(e) => setForm({ ...form, pincode: e.target.value.replace(/\D/g, '').slice(0, 6) })}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Pincode"
                      maxLength={6}
                    />
                  </div>

                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <select
                      value={form.residenceType}
                      onChange={(e) => setForm({ ...form, residenceType: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                    >
                      <option value="">Residence Type</option>
                      <option value="Owned">Owned</option>
                      <option value="Rented">Rented</option>
                      <option value="Parental">Parental</option>
                      <option value="Company Provided">Company Provided</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Employment Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Briefcase size={18} />
                  Employment Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <select
                      value={form.occupation}
                      onChange={(e) => setForm({ ...form, occupation: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                    >
                      <option value="">Occupation *</option>
                      {occupationTypes.map(occupation => (
                        <option key={occupation} value={occupation}>{occupation}</option>
                      ))}
                    </select>
                  </div>

                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      value={form.companyName}
                      onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Company/Organization Name"
                    />
                  </div>

                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      value={form.designation}
                      onChange={(e) => setForm({ ...form, designation: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Designation/Role"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Financial Details */}
          {currentStep === 2 && (
            <div className="space-y-8">
              {/* Income Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <TrendingUp size={18} />
                  Income Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="number"
                      value={form.monthlyIncome}
                      onChange={(e) => setForm({ ...form, monthlyIncome: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Monthly Income"
                      min="0"
                    />
                  </div>

                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="number"
                      value={form.otherIncome}
                      onChange={(e) => setForm({ ...form, otherIncome: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Other Monthly Income"
                      min="0"
                    />
                  </div>

                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <select
                      value={form.incomeSource}
                      onChange={(e) => setForm({ ...form, incomeSource: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                    >
                      <option value="">Primary Income Source</option>
                      {incomeSources.map(source => (
                        <option key={source} value={source}>{source}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Existing Loans */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FileBarChart size={18} />
                  Existing Financial Obligations
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="number"
                      value={form.existingLoans}
                      onChange={(e) => setForm({ ...form, existingLoans: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Total Existing Loans"
                      min="0"
                    />
                  </div>

                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="number"
                      value={form.existingEMIs}
                      onChange={(e) => setForm({ ...form, existingEMIs: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Monthly EMIs"
                      min="0"
                    />
                  </div>

                  <div className="relative">
                    <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="number"
                      value={form.cibilScore}
                      onChange={(e) => setForm({ ...form, cibilScore: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="CIBIL Score"
                      min="300"
                      max="900"
                    />
                  </div>
                </div>
              </div>

              {/* Bank Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Building2 size={18} />
                  Bank Account Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      value={form.bankName}
                      onChange={(e) => setForm({ ...form, bankName: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Bank Name"
                    />
                  </div>

                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      value={form.accountNumber}
                      onChange={(e) => setForm({ ...form, accountNumber: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Account Number"
                    />
                  </div>

                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      value={form.ifscCode}
                      onChange={(e) => setForm({ ...form, ifscCode: e.target.value.toUpperCase() })}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="IFSC Code"
                      maxLength={11}
                    />
                  </div>
                </div>
              </div>

              {/* Co-applicant Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <User size={18} />
                  Co-applicant Details (Optional)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      value={form.coApplicantName}
                      onChange={(e) => setForm({ ...form, coApplicantName: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Co-applicant Name"
                    />
                  </div>

                  <div className="relative">
                    <Heart className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      value={form.coApplicantRelation}
                      onChange={(e) => setForm({ ...form, coApplicantRelation: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Relation"
                    />
                  </div>

                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="number"
                      value={form.coApplicantIncome}
                      onChange={(e) => setForm({ ...form, coApplicantIncome: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Co-applicant Income"
                      min="0"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Loan Details */}
          {currentStep === 3 && (
            <div className="space-y-8">
              {/* Loan Application Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FileText size={18} />
                  Loan Application Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="number"
                      value={form.requestedAmount}
                      onChange={(e) => setForm({ ...form, requestedAmount: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Loan Amount *"
                      required
                      min="1000"
                    />
                  </div>

                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <select
                      value={form.loanCategory}
                      onChange={(e) => {
                        setForm({ 
                          ...form, 
                          loanCategory: e.target.value,
                          loanType: '' // Reset loan type when category changes
                        });
                      }}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                      required
                    >
                      <option value="">Loan Category *</option>
                      {loanCategories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <select
                      value={form.loanType}
                      onChange={(e) => setForm({ ...form, loanType: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                      disabled={!form.loanCategory}
                      required
                    >
                      <option value="">Loan Type *</option>
                      {form.loanCategory && loanProducts[form.loanCategory]?.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <select
                      value={form.tenureMonths}
                      onChange={(e) => setForm({ ...form, tenureMonths: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                    >
                      <option value="">Select Tenure (Months)</option>
                      <option value="6">6 months</option>
                      <option value="12">12 months</option>
                      <option value="24">24 months</option>
                      <option value="36">36 months</option>
                      <option value="48">48 months</option>
                      <option value="60">60 months</option>
                      <option value="84">84 months</option>
                      <option value="120">120 months</option>
                      <option value="240">240 months</option>
                    </select>
                  </div>

                  <div className="relative">
                    <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="number"
                      value={form.interestRate}
                      onChange={(e) => setForm({ ...form, interestRate: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Interest Rate (%)"
                      step="0.1"
                      min="0"
                      max="30"
                    />
                  </div>

                  <div className="relative">
                    <Target className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      value={form.loanPurpose}
                      onChange={(e) => setForm({ ...form, loanPurpose: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Loan Purpose"
                    />
                  </div>
                </div>
              </div>

              {/* Loan Preview */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <FileCheck size={16} />
                  Loan Preview
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Estimated EMI</p>
                    <p className="font-semibold text-gray-800">
                      ₹{calculateEMI(form.requestedAmount, form.tenureMonths).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Interest Rate</p>
                    <p className="font-semibold text-gray-800">
                      {(form.interestRate || calculateInterestRate(form.loanCategory, form.loanType))}%
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Total Payable</p>
                    <p className="font-semibold text-gray-800">
                      ₹{calculateTotalPayable(form.requestedAmount, form.tenureMonths).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Processing Time</p>
                    <p className="font-semibold text-gray-800">3-5 business days</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Document Upload */}
          {currentStep === 4 && (
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FileCheck size={18} />
                  Upload Required Documents
                </h3>
                <p className="text-gray-600 text-sm mb-6">
                  Please upload clear scans/photos of all required documents. All documents should be in PDF, JPG, or PNG format (Max 10MB each).
                </p>

                {/* Identity Proof Documents */}
                <div className="mb-8">
                  <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <IdCard size={16} />
                    Identity Proof Documents (Required)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <DocumentUploadField 
                      label="Aadhar Card" 
                      docType="aadharCard" 
                      required 
                      accept=".pdf,.jpg,.jpeg,.png"
                      icon={IdCard}
                    />
                    <DocumentUploadField 
                      label="PAN Card" 
                      docType="panCard" 
                      required 
                      accept=".pdf,.jpg,.jpeg,.png"
                      icon={CreditCard}
                    />
                  </div>
                </div>

                {/* Photo & Signature */}
                <div className="mb-8">
                  <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <Camera size={16} />
                    Photo & Signature
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <DocumentUploadField 
                      label="Passport Size Photo" 
                      docType="photo" 
                      accept=".jpg,.jpeg,.png"
                      icon={Camera}
                    />
                    <DocumentUploadField 
                      label="Signature" 
                      docType="signature" 
                      accept=".jpg,.jpeg,.png"
                      icon={Signature}
                    />
                  </div>
                </div>

                {/* Address Proof Documents */}
                <div className="mb-8">
                  <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <Home size={16} />
                    Address Proof Documents
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <DocumentUploadField 
                      label="Address Proof" 
                      docType="addressProof" 
                      accept=".pdf,.jpg,.jpeg,.png"
                      icon={Home}
                    />
                  </div>
                </div>

                {/* Income Proof Documents */}
                <div className="mb-8">
                  <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <Banknote size={16} />
                    Income Proof Documents
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <DocumentUploadField 
                      label="Salary Slips (3 months)" 
                      docType="salarySlips" 
                      accept=".pdf,.jpg,.jpeg,.png"
                      icon={FileSpreadsheet}
                    />
                    <DocumentUploadField 
                      label="Form 16" 
                      docType="form16" 
                      accept=".pdf,.jpg,.jpeg,.png"
                      icon={FileBarChart}
                    />
                    <DocumentUploadField 
                      label="Bank Statements (6 months)" 
                      docType="bankStatements" 
                      accept=".pdf,.jpg,.jpeg,.png"
                      icon={FileText}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6 border-t border-gray-200">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="flex items-center gap-2 px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors"
              >
                <ArrowLeft size={18} />
                Previous
              </button>
            )}

            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 font-medium transition-colors ml-auto"
              >
                Next Step
                <ChevronRight size={18} />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 font-medium transition-colors ml-auto ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <CheckCircle size={18} />
                    Submit Application
                  </>
                )}
              </button>
            )}

            <button
              type="button"
              onClick={resetForm}
              className="flex items-center gap-2 px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors"
            >
              <X size={18} />
              Reset Form
            </button>

            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="flex items-center gap-2 px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors"
              >
                <ArrowLeft size={18} />
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoanForm;