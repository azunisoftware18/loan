// LoanApplicationForm.jsx
import React, { useState, useEffect } from 'react';
import { 
  User, Phone, Mail, Calendar, MapPin, Briefcase, 
  Banknote, FileText, Shield, CheckCircle, Upload, 
  File, X, Home, Building, IndianRupee, Percent, 
  Clock, Target, DollarSign, CreditCard, IdCard,
  Check, AlertCircle, UserPlus, Building2, FileCheck
} from 'lucide-react';
import LoanApplicationPreview from './LoanApplicationPreview';

const LoanApplicationForm = ({ 
  userRole = 'customer', // customer, employee, admin
  initialData = {},
  isEditMode = false,
  onSubmit,
  onCancel,
  onSaveDraft
}) => {
  // Form state management
  const [formData, setFormData] = useState({
    // Section 1: Applicant Basic Details
    personalDetails: {
      firstName: '',
      middleName: '',
      lastName: '',
      mobile: '',
      email: '',
      dob: '',
      gender: '',
      maritalStatus: '',
      fatherSpouseName: '',
      nationality: 'Indian',
      category: ''
    },
    
    // Section 2: KYC Details
    kycDetails: {
      aadhaarNumber: '',
      panNumber: '',
      voterId: '',
      passportNumber: '',
      aadhaarFront: null,
      aadhaarBack: null,
      panCardImage: null,
      aadhaarVerification: 'Pending',
      panVerification: 'Pending'
    },
    
    // Section 3: Address Details
    addressDetails: {
      currentAddress: {
        line1: '',
        line2: '',
        city: '',
        state: '',
        pincode: '',
        residenceType: ''
      },
      permanentAddress: {
        line1: '',
        line2: '',
        city: '',
        state: '',
        pincode: ''
      },
      sameAsCurrent: true
    },
    
    // Section 4: Employment Details
    employmentDetails: {
      employmentType: '',
      salariedDetails: {
        companyName: '',
        designation: '',
        monthlySalary: '',
        workExperience: '',
        officeAddress: ''
      },
      selfEmployedDetails: {
        businessName: '',
        businessType: '',
        monthlyTurnover: '',
        annualIncome: '',
        businessVintage: ''
      }
    },
    
    // Section 5: Income & Bank Details
    financialDetails: {
      monthlyIncome: '',
      otherIncome: '',
      bankName: '',
      accountNumber: '',
      ifscCode: '',
      accountType: 'Saving',
      bankStatement: null,
      salarySlips: null,
      itrDocuments: null
    },
    
    // Section 6: Loan Details
    loanDetails: {
      loanType: '',
      loanAmount: '',
      tenureMonths: '',
      interestRate: '',
      emi: 0,
      purpose: ''
    },
    
    // Section 7: Co-Applicant
    coApplicant: {
      hasCoApplicant: false,
      name: '',
      relation: '',
      mobile: '',
      panOrAadhaar: '',
      income: ''
    },
    
    // Section 8: Credit & Risk Assessment (Internal)
    riskAssessment: {
      cibilScore: '',
      creditStatus: '',
      foirPercentage: '',
      ltvPercentage: '',
      riskCategory: '',
      internalRemarks: ''
    },
    
    // Section 9: Declaration
    declarations: {
      termsAccepted: false,
      creditCheckAuthorized: false,
      detailsConfirmed: false
    },
    
    // Section 10: Internal Assignment
    internalDetails: {
      assignedEmployee: '',
      assignedPartner: '',
      branchName: '',
      applicationSource: 'Online',
      applicationStatus: 'Draft'
    },
    
    // Common
    submittedAt: null,
    applicationId: `APP${Date.now().toString().slice(-8)}`
  });

  // State for current section and validation
  const [currentSection, setCurrentSection] = useState(1);
  const [errors, setErrors] = useState({});
  const [isCalculating, setIsCalculating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);


  // Load initial data if provided
  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData(prev => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  // Calculate EMI when loan details change
  useEffect(() => {
    if (formData.loanDetails.loanAmount && formData.loanDetails.tenureMonths && formData.loanDetails.interestRate) {
      calculateEMI();
    }
  }, [formData.loanDetails.loanAmount, formData.loanDetails.tenureMonths, formData.loanDetails.interestRate]);

  // Handle input changes
  const handleChange = (section, field, value, subField = null) => {
    setFormData(prev => {
      if (subField) {
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [field]: {
              ...prev[section][field],
              [subField]: value
            }
          }
        };
      }
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      };
    });

    // Clear error for this field
    if (errors[`${section}.${field}`]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[`${section}.${field}`];
        return newErrors;
      });
    }
  };

  // Calculate EMI
  const calculateEMI = () => {
    const { loanAmount, tenureMonths, interestRate } = formData.loanDetails;
    if (!loanAmount || !tenureMonths || !interestRate) return;

    const principal = parseFloat(loanAmount);
    const months = parseInt(tenureMonths);
    const rate = parseFloat(interestRate) / 12 / 100;

    const emi = principal * rate * Math.pow(1 + rate, months) / (Math.pow(1 + rate, months) - 1);
    
    handleChange('loanDetails', 'emi', emi.toFixed(2));
  };

  // Handle document upload
  const handleFileUpload = (section, field, file) => {
    if (file && file.size <= 5 * 1024 * 1024) { // 5MB limit
      handleChange(section, field, {
        file,
        name: file.name,
        type: file.type,
        size: file.size,
        uploadedAt: new Date().toISOString()
      });
    } else {
      alert('File size must be less than 5MB');
    }
  };

  // Validate current section
  const validateSection = (section) => {
    const newErrors = {};

    switch(section) {
      case 1: // Personal Details
        const { personalDetails } = formData;
        if (!personalDetails.firstName.trim()) newErrors['personalDetails.firstName'] = 'First name is required';
        if (!personalDetails.lastName.trim()) newErrors['personalDetails.lastName'] = 'Last name is required';
        if (!/^[6-9]\d{9}$/.test(personalDetails.mobile)) newErrors['personalDetails.mobile'] = 'Valid 10-digit mobile number required';
        if (personalDetails.email && !/^\S+@\S+\.\S+$/.test(personalDetails.email)) newErrors['personalDetails.email'] = 'Valid email required';
        if (!personalDetails.dob) newErrors['personalDetails.dob'] = 'Date of birth is required';
        break;

      case 2: // KYC Details
        const { kycDetails } = formData;
        if (!/^\d{12}$/.test(kycDetails.aadhaarNumber)) newErrors['kycDetails.aadhaarNumber'] = 'Valid 12-digit Aadhaar required';
        if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(kycDetails.panNumber)) newErrors['kycDetails.panNumber'] = 'Valid PAN required';
        if (!kycDetails.aadhaarFront) newErrors['kycDetails.aadhaarFront'] = 'Aadhaar front image required';
        if (!kycDetails.panCardImage) newErrors['kycDetails.panCardImage'] = 'PAN card image required';
        break;

      case 6: // Loan Details
        const { loanDetails } = formData;
        if (!loanDetails.loanType) newErrors['loanDetails.loanType'] = 'Loan type is required';
        if (!loanDetails.loanAmount || parseFloat(loanDetails.loanAmount) <= 0) newErrors['loanDetails.loanAmount'] = 'Valid loan amount required';
        if (!loanDetails.tenureMonths || parseInt(loanDetails.tenureMonths) <= 0) newErrors['loanDetails.tenureMonths'] = 'Valid tenure required';
        break;

      case 9: // Declarations
        const { declarations } = formData;
        if (!declarations.termsAccepted) newErrors['declarations.termsAccepted'] = 'Must accept terms';
        if (!declarations.creditCheckAuthorized) newErrors['declarations.creditCheckAuthorized'] = 'Must authorize credit check';
        if (!declarations.detailsConfirmed) newErrors['declarations.detailsConfirmed'] = 'Must confirm details';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Navigation
  const nextSection = () => {
    if (validateSection(currentSection)) {
      setCurrentSection(prev => Math.min(prev + 1, 10));
    }
  };

  const prevSection = () => {
    setCurrentSection(prev => Math.max(prev - 1, 1));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Final validation
    const sectionsToValidate = [1, 2, 6, 9];
    let isValid = true;
    
    sectionsToValidate.forEach(section => {
      if (!validateSection(section)) {
        isValid = false;
      }
    });

    if (isValid) {
      const submissionData = {
        ...formData,
        submittedAt: new Date().toISOString(),
        applicationStatus: 'Submitted'
      };
      
      if (onSubmit) {
        onSubmit(submissionData);
      }
    }
  };

  // Handle save draft
  const handleSaveDraft = () => {
    if (onSaveDraft) {
      onSaveDraft({
        ...formData,
        applicationStatus: 'Draft'
      });
    }
  };

  // Reset form
  const handleReset = () => {
    setFormData({
      personalDetails: {
        firstName: '',
        middleName: '',
        lastName: '',
        mobile: '',
        email: '',
        dob: '',
        gender: '',
        maritalStatus: '',
        fatherSpouseName: '',
        nationality: 'Indian',
        category: ''
      },
      kycDetails: {
        aadhaarNumber: '',
        panNumber: '',
        voterId: '',
        passportNumber: '',
        aadhaarFront: null,
        aadhaarBack: null,
        panCardImage: null,
        aadhaarVerification: 'Pending',
        panVerification: 'Pending'
      },
      addressDetails: {
        currentAddress: {
          line1: '',
          line2: '',
          city: '',
          state: '',
          pincode: '',
          residenceType: ''
        },
        permanentAddress: {
          line1: '',
          line2: '',
          city: '',
          state: '',
          pincode: ''
        },
        sameAsCurrent: true
      },
      employmentDetails: {
        employmentType: '',
        salariedDetails: {
          companyName: '',
          designation: '',
          monthlySalary: '',
          workExperience: '',
          officeAddress: ''
        },
        selfEmployedDetails: {
          businessName: '',
          businessType: '',
          monthlyTurnover: '',
          annualIncome: '',
          businessVintage: ''
        }
      },
      financialDetails: {
        monthlyIncome: '',
        otherIncome: '',
        bankName: '',
        accountNumber: '',
        ifscCode: '',
        accountType: 'Saving',
        bankStatement: null,
        salarySlips: null,
        itrDocuments: null
      },
      loanDetails: {
        loanType: '',
        loanAmount: '',
        tenureMonths: '',
        interestRate: '',
        emi: 0,
        purpose: ''
      },
      coApplicant: {
        hasCoApplicant: false,
        name: '',
        relation: '',
        mobile: '',
        panOrAadhaar: '',
        income: ''
      },
      riskAssessment: {
        cibilScore: '',
        creditStatus: '',
        foirPercentage: '',
        ltvPercentage: '',
        riskCategory: '',
        internalRemarks: ''
      },
      declarations: {
        termsAccepted: false,
        creditCheckAuthorized: false,
        detailsConfirmed: false
      },
      internalDetails: {
        assignedEmployee: '',
        assignedPartner: '',
        branchName: '',
        applicationSource: 'Online',
        applicationStatus: 'Draft'
      },
      submittedAt: null,
      applicationId: `APP${Date.now().toString().slice(-8)}`
    });
    setCurrentSection(1);
    setErrors({});
  };

  // Role-based visibility
  const isVisible = (section) => {
    if (userRole === 'admin') return true;
    if (userRole === 'employee') return section !== 8; // Hide risk assessment from employees
    if (userRole === 'customer') return [1, 2, 3, 4, 5, 6, 7, 9].includes(section);
    return true;
  };

  // Form sections configuration
  const sections = [
    { id: 1, title: 'Applicant Basic Details', icon: User, mandatory: true },
    { id: 2, title: 'KYC Details', icon: IdCard, mandatory: true },
    { id: 3, title: 'Address Details', icon: MapPin, mandatory: false },
    { id: 4, title: 'Employment Details', icon: Briefcase, mandatory: true },
    { id: 5, title: 'Income & Bank Details', icon: Banknote, mandatory: true },
    { id: 6, title: 'Loan Details', icon: DollarSign, mandatory: true },
    { id: 7, title: 'Co-Applicant', icon: UserPlus, mandatory: false },
    { id: 8, title: 'Credit Assessment', icon: Shield, mandatory: false },
    { id: 9, title: 'Declaration', icon: FileCheck, mandatory: true },
    { id: 10, title: 'Internal Assignment', icon: Building2, mandatory: false }
  ];

  // Render current section
  const renderSection = () => {
    if (!isVisible(currentSection)) return null;

    switch(currentSection) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <User size={20} />
              Applicant Basic Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.personalDetails.firstName}
                  onChange={(e) => handleChange('personalDetails', 'firstName', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg ${errors['personalDetails.firstName'] ? 'border-red-500' : 'border-gray-300'}`}
                  required
                />
                {errors['personalDetails.firstName'] && (
                  <p className="text-red-500 text-xs mt-1">{errors['personalDetails.firstName']}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Middle Name
                </label>
                <input
                  type="text"
                  value={formData.personalDetails.middleName}
                  onChange={(e) => handleChange('personalDetails', 'middleName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.personalDetails.lastName}
                  onChange={(e) => handleChange('personalDetails', 'lastName', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg ${errors['personalDetails.lastName'] ? 'border-red-500' : 'border-gray-300'}`}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.personalDetails.mobile}
                  onChange={(e) => handleChange('personalDetails', 'mobile', e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className={`w-full px-3 py-2 border rounded-lg ${errors['personalDetails.mobile'] ? 'border-red-500' : 'border-gray-300'}`}
                  maxLength={10}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email ID
                </label>
                <input
                  type="email"
                  value={formData.personalDetails.email}
                  onChange={(e) => handleChange('personalDetails', 'email', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg ${errors['personalDetails.email'] ? 'border-red-500' : 'border-gray-300'}`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.personalDetails.dob}
                  onChange={(e) => handleChange('personalDetails', 'dob', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg ${errors['personalDetails.dob'] ? 'border-red-500' : 'border-gray-300'}`}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
                <select
                  value={formData.personalDetails.gender}
                  onChange={(e) => handleChange('personalDetails', 'gender', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Marital Status
                </label>
                <select
                  value={formData.personalDetails.maritalStatus}
                  onChange={(e) => handleChange('personalDetails', 'maritalStatus', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Select</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Father/Spouse Name
                </label>
                <input
                  type="text"
                  value={formData.personalDetails.fatherSpouseName}
                  onChange={(e) => handleChange('personalDetails', 'fatherSpouseName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nationality
                </label>
                <input
                  type="text"
                  value={formData.personalDetails.nationality}
                  onChange={(e) => handleChange('personalDetails', 'nationality', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={formData.personalDetails.category}
                  onChange={(e) => handleChange('personalDetails', 'category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Select</option>
                  <option value="General">General</option>
                  <option value="OBC">OBC</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <IdCard size={20} />
              KYC Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-700">Identity Documents</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Aadhaar Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.kycDetails.aadhaarNumber}
                    onChange={(e) => handleChange('kycDetails', 'aadhaarNumber', e.target.value.replace(/\D/g, '').slice(0, 12))}
                    className={`w-full px-3 py-2 border rounded-lg ${errors['kycDetails.aadhaarNumber'] ? 'border-red-500' : 'border-gray-300'}`}
                    maxLength={12}
                    required
                  />
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500">Status:</span>
                    <span className={`text-xs px-2 py-1 rounded ${formData.kycDetails.aadhaarVerification === 'Verified' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {formData.kycDetails.aadhaarVerification}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    PAN Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.kycDetails.panNumber}
                    onChange={(e) => handleChange('kycDetails', 'panNumber', e.target.value.toUpperCase())}
                    className={`w-full px-3 py-2 border rounded-lg ${errors['kycDetails.panNumber'] ? 'border-red-500' : 'border-gray-300'}`}
                    maxLength={10}
                    required
                  />
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500">Status:</span>
                    <span className={`text-xs px-2 py-1 rounded ${formData.kycDetails.panVerification === 'Verified' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {formData.kycDetails.panVerification}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Voter ID (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.kycDetails.voterId}
                    onChange={(e) => handleChange('kycDetails', 'voterId', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Passport Number (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.kycDetails.passportNumber}
                    onChange={(e) => handleChange('kycDetails', 'passportNumber', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-gray-700">Document Uploads</h4>
                
                <DocumentUpload
                  label="Aadhaar Front Image *"
                  value={formData.kycDetails.aadhaarFront}
                  onChange={(file) => handleFileUpload('kycDetails', 'aadhaarFront', file)}
                  accept=".pdf,.jpg,.jpeg,.png"
                  error={errors['kycDetails.aadhaarFront']}
                />

                <DocumentUpload
                  label="Aadhaar Back Image"
                  value={formData.kycDetails.aadhaarBack}
                  onChange={(file) => handleFileUpload('kycDetails', 'aadhaarBack', file)}
                  accept=".pdf,.jpg,.jpeg,.png"
                />

                <DocumentUpload
                  label="PAN Card Image *"
                  value={formData.kycDetails.panCardImage}
                  onChange={(file) => handleFileUpload('kycDetails', 'panCardImage', file)}
                  accept=".pdf,.jpg,.jpeg,.png"
                  error={errors['kycDetails.panCardImage']}
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <MapPin size={20} />
              Address Details
            </h3>

            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-700 mb-4">Current Address</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <input
                      type="text"
                      placeholder="Address Line 1"
                      value={formData.addressDetails.currentAddress.line1}
                      onChange={(e) => handleChange('addressDetails', 'currentAddress', e.target.value, 'line1')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <input
                      type="text"
                      placeholder="Address Line 2"
                      value={formData.addressDetails.currentAddress.line2}
                      onChange={(e) => handleChange('addressDetails', 'currentAddress', e.target.value, 'line2')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="City"
                      value={formData.addressDetails.currentAddress.city}
                      onChange={(e) => handleChange('addressDetails', 'currentAddress', e.target.value, 'city')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="State"
                      value={formData.addressDetails.currentAddress.state}
                      onChange={(e) => handleChange('addressDetails', 'currentAddress', e.target.value, 'state')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Pincode"
                      value={formData.addressDetails.currentAddress.pincode}
                      onChange={(e) => handleChange('addressDetails', 'currentAddress', e.target.value.replace(/\D/g, '').slice(0, 6), 'pincode')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      maxLength={6}
                    />
                  </div>
                  <div>
                    <select
                      value={formData.addressDetails.currentAddress.residenceType}
                      onChange={(e) => handleChange('addressDetails', 'currentAddress', e.target.value, 'residenceType')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="">Residence Type</option>
                      <option value="Owned">Owned</option>
                      <option value="Rented">Rented</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <input
                    type="checkbox"
                    id="sameAsCurrent"
                    checked={formData.addressDetails.sameAsCurrent}
                    onChange={(e) => handleChange('addressDetails', 'sameAsCurrent', e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="sameAsCurrent" className="text-sm font-medium text-gray-700">
                    Same as Current Address
                  </label>
                </div>

                {!formData.addressDetails.sameAsCurrent && (
                  <>
                    <h4 className="font-medium text-gray-700 mb-4">Permanent Address</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <input
                          type="text"
                          placeholder="Address Line 1"
                          value={formData.addressDetails.permanentAddress.line1}
                          onChange={(e) => handleChange('addressDetails', 'permanentAddress', e.target.value, 'line1')}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <input
                          type="text"
                          placeholder="Address Line 2"
                          value={formData.addressDetails.permanentAddress.line2}
                          onChange={(e) => handleChange('addressDetails', 'permanentAddress', e.target.value, 'line2')}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="City"
                          value={formData.addressDetails.permanentAddress.city}
                          onChange={(e) => handleChange('addressDetails', 'permanentAddress', e.target.value, 'city')}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="State"
                          value={formData.addressDetails.permanentAddress.state}
                          onChange={(e) => handleChange('addressDetails', 'permanentAddress', e.target.value, 'state')}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Pincode"
                          value={formData.addressDetails.permanentAddress.pincode}
                          onChange={(e) => handleChange('addressDetails', 'permanentAddress', e.target.value.replace(/\D/g, '').slice(0, 6), 'pincode')}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          maxLength={6}
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Briefcase size={20} />
              Employment Details
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Employment Type
              </label>
              <div className="flex gap-4 mb-6">
                <button
                  type="button"
                  onClick={() => handleChange('employmentDetails', 'employmentType', 'Salaried')}
                  className={`px-4 py-2 rounded-lg border ${formData.employmentDetails.employmentType === 'Salaried' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-gray-300'}`}
                >
                  Salaried
                </button>
                <button
                  type="button"
                  onClick={() => handleChange('employmentDetails', 'employmentType', 'Self-Employed')}
                  className={`px-4 py-2 rounded-lg border ${formData.employmentDetails.employmentType === 'Self-Employed' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-gray-300'}`}
                >
                  Self-Employed
                </button>
              </div>

              {formData.employmentDetails.employmentType === 'Salaried' && (
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-700">Salaried Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Company Name"
                      value={formData.employmentDetails.salariedDetails.companyName}
                      onChange={(e) => handleChange('employmentDetails', 'salariedDetails', e.target.value, 'companyName')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Designation"
                      value={formData.employmentDetails.salariedDetails.designation}
                      onChange={(e) => handleChange('employmentDetails', 'salariedDetails', e.target.value, 'designation')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="number"
                      placeholder="Monthly Salary (₹)"
                      value={formData.employmentDetails.salariedDetails.monthlySalary}
                      onChange={(e) => handleChange('employmentDetails', 'salariedDetails', e.target.value, 'monthlySalary')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Total Work Experience (Years)"
                      value={formData.employmentDetails.salariedDetails.workExperience}
                      onChange={(e) => handleChange('employmentDetails', 'salariedDetails', e.target.value, 'workExperience')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <div className="md:col-span-2">
                      <input
                        type="text"
                        placeholder="Office Address"
                        value={formData.employmentDetails.salariedDetails.officeAddress}
                        onChange={(e) => handleChange('employmentDetails', 'salariedDetails', e.target.value, 'officeAddress')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              )}

              {formData.employmentDetails.employmentType === 'Self-Employed' && (
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-700">Self-Employed Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Business Name"
                      value={formData.employmentDetails.selfEmployedDetails.businessName}
                      onChange={(e) => handleChange('employmentDetails', 'selfEmployedDetails', e.target.value, 'businessName')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Business Type"
                      value={formData.employmentDetails.selfEmployedDetails.businessType}
                      onChange={(e) => handleChange('employmentDetails', 'selfEmployedDetails', e.target.value, 'businessType')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="number"
                      placeholder="Monthly Turnover (₹)"
                      value={formData.employmentDetails.selfEmployedDetails.monthlyTurnover}
                      onChange={(e) => handleChange('employmentDetails', 'selfEmployedDetails', e.target.value, 'monthlyTurnover')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="number"
                      placeholder="Annual Income (₹)"
                      value={formData.employmentDetails.selfEmployedDetails.annualIncome}
                      onChange={(e) => handleChange('employmentDetails', 'selfEmployedDetails', e.target.value, 'annualIncome')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <div>
                      <input
                        type="text"
                        placeholder="Business Vintage (Years)"
                        value={formData.employmentDetails.selfEmployedDetails.businessVintage}
                        onChange={(e) => handleChange('employmentDetails', 'selfEmployedDetails', e.target.value, 'businessVintage')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Banknote size={20} />
              Income & Bank Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-700">Income Details</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Monthly Income (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.financialDetails.monthlyIncome}
                      onChange={(e) => handleChange('financialDetails', 'monthlyIncome', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Other Income (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.financialDetails.otherIncome}
                      onChange={(e) => handleChange('financialDetails', 'otherIncome', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-gray-700">Bank Details</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bank Name
                    </label>
                    <input
                      type="text"
                      value={formData.financialDetails.bankName}
                      onChange={(e) => handleChange('financialDetails', 'bankName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Account Number
                    </label>
                    <input
                      type="text"
                      value={formData.financialDetails.accountNumber}
                      onChange={(e) => handleChange('financialDetails', 'accountNumber', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      IFSC Code
                    </label>
                    <input
                      type="text"
                      value={formData.financialDetails.ifscCode}
                      onChange={(e) => handleChange('financialDetails', 'ifscCode', e.target.value.toUpperCase())}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      maxLength={11}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Account Type
                    </label>
                    <select
                      value={formData.financialDetails.accountType}
                      onChange={(e) => handleChange('financialDetails', 'accountType', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="Saving">Saving</option>
                      <option value="Current">Current</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-gray-700">Document Uploads</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <DocumentUpload
                  label="Last 6 Months Bank Statement"
                  value={formData.financialDetails.bankStatement}
                  onChange={(file) => handleFileUpload('financialDetails', 'bankStatement', file)}
                  accept=".pdf"
                />
                <DocumentUpload
                  label="Salary Slips (Last 3 Months)"
                  value={formData.financialDetails.salarySlips}
                  onChange={(file) => handleFileUpload('financialDetails', 'salarySlips', file)}
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <DocumentUpload
                  label="ITR Documents"
                  value={formData.financialDetails.itrDocuments}
                  onChange={(file) => handleFileUpload('financialDetails', 'itrDocuments', file)}
                  accept=".pdf"
                />
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <DollarSign size={20} />
              Loan Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Loan Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.loanDetails.loanType}
                  onChange={(e) => handleChange('loanDetails', 'loanType', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg ${errors['loanDetails.loanType'] ? 'border-red-500' : 'border-gray-300'}`}
                  required
                >
                  <option value="">Select</option>
                  <option value="Personal">Personal</option>
                  <option value="Business">Business</option>
                  <option value="Home">Home</option>
                  <option value="Vehicle">Vehicle</option>
                  <option value="Education">Education</option>
                  <option value="Gold">Gold</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Loan Amount (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.loanDetails.loanAmount}
                  onChange={(e) => handleChange('loanDetails', 'loanAmount', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg ${errors['loanDetails.loanAmount'] ? 'border-red-500' : 'border-gray-300'}`}
                  required
                  min="1000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tenure (Months) <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.loanDetails.tenureMonths}
                  onChange={(e) => handleChange('loanDetails', 'tenureMonths', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg ${errors['loanDetails.tenureMonths'] ? 'border-red-500' : 'border-gray-300'}`}
                  required
                >
                  <option value="">Select</option>
                  <option value="6">6 Months</option>
                  <option value="12">12 Months</option>
                  <option value="24">24 Months</option>
                  <option value="36">36 Months</option>
                  <option value="48">48 Months</option>
                  <option value="60">60 Months</option>
                  <option value="84">84 Months</option>
                  <option value="120">120 Months</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Interest Rate (%)
                </label>
                <input
                  type="number"
                  value={formData.loanDetails.interestRate}
                  onChange={(e) => handleChange('loanDetails', 'interestRate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  step="0.01"
                  min="0"
                  max="30"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  EMI (₹)
                </label>
                <input
                  type="text"
                  value={formData.loanDetails.emi ? `₹${formData.loanDetails.emi}` : ''}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Purpose of Loan
                </label>
                <input
                  type="text"
                  value={formData.loanDetails.purpose}
                  onChange={(e) => handleChange('loanDetails', 'purpose', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., Home Renovation, Vehicle Purchase"
                />
              </div>
            </div>

            {formData.loanDetails.emi > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2">Loan Summary</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-blue-600">Total Loan Amount</p>
                    <p className="font-semibold">₹{parseFloat(formData.loanDetails.loanAmount).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-blue-600">Monthly EMI</p>
                    <p className="font-semibold">₹{parseFloat(formData.loanDetails.emi).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-blue-600">Total Interest</p>
                    <p className="font-semibold">
                      ₹{(parseFloat(formData.loanDetails.emi) * parseInt(formData.loanDetails.tenureMonths) - parseFloat(formData.loanDetails.loanAmount)).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-blue-600">Total Payable</p>
                    <p className="font-semibold">
                      ₹{(parseFloat(formData.loanDetails.emi) * parseInt(formData.loanDetails.tenureMonths)).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <UserPlus size={20} />
              Co-Applicant / Guarantor Details (Optional)
            </h3>

            <div className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                id="hasCoApplicant"
                checked={formData.coApplicant.hasCoApplicant}
                onChange={(e) => handleChange('coApplicant', 'hasCoApplicant', e.target.checked)}
                className="rounded"
              />
              <label htmlFor="hasCoApplicant" className="text-sm font-medium text-gray-700">
                Add Co-Applicant / Guarantor
              </label>
            </div>

            {formData.coApplicant.hasCoApplicant && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Co-Applicant Name
                  </label>
                  <input
                    type="text"
                    value={formData.coApplicant.name}
                    onChange={(e) => handleChange('coApplicant', 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Relation with Applicant
                  </label>
                  <select
                    value={formData.coApplicant.relation}
                    onChange={(e) => handleChange('coApplicant', 'relation', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">Select</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Parent">Parent</option>
                    <option value="Sibling">Sibling</option>
                    <option value="Friend">Friend</option>
                    <option value="Business Partner">Business Partner</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    value={formData.coApplicant.mobile}
                    onChange={(e) => handleChange('coApplicant', 'mobile', e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    maxLength={10}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    PAN / Aadhaar Number
                  </label>
                  <input
                    type="text"
                    value={formData.coApplicant.panOrAadhaar}
                    onChange={(e) => handleChange('coApplicant', 'panOrAadhaar', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Income Details (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.coApplicant.income}
                    onChange={(e) => handleChange('coApplicant', 'income', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            )}
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Shield size={20} />
              Credit & Risk Assessment (Internal Use Only)
            </h3>
            <p className="text-sm text-gray-600 italic">
              This section is for internal assessment purposes and is not visible to customers.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CIBIL Score
                </label>
                <input
                  type="number"
                  value={formData.riskAssessment.cibilScore}
                  onChange={(e) => handleChange('riskAssessment', 'cibilScore', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  min="300"
                  max="900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Credit Status
                </label>
                <select
                  value={formData.riskAssessment.creditStatus}
                  onChange={(e) => handleChange('riskAssessment', 'creditStatus', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Select</option>
                  <option value="Good">Good</option>
                  <option value="Average">Average</option>
                  <option value="Risky">Risky</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  FOIR Percentage
                </label>
                <input
                  type="number"
                  value={formData.riskAssessment.foirPercentage}
                  onChange={(e) => handleChange('riskAssessment', 'foirPercentage', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  step="0.01"
                  min="0"
                  max="100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  LTV Percentage
                </label>
                <input
                  type="number"
                  value={formData.riskAssessment.ltvPercentage}
                  onChange={(e) => handleChange('riskAssessment', 'ltvPercentage', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  step="0.01"
                  min="0"
                  max="100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Risk Category
                </label>
                <select
                  value={formData.riskAssessment.riskCategory}
                  onChange={(e) => handleChange('riskAssessment', 'riskCategory', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Select</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Internal Remarks
              </label>
              <textarea
                value={formData.riskAssessment.internalRemarks}
                onChange={(e) => handleChange('riskAssessment', 'internalRemarks', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                rows={3}
                placeholder="Enter internal assessment notes..."
              />
            </div>
          </div>
        );

      case 9:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <FileCheck size={20} />
              Declaration & Consent
            </h3>

            <div className="space-y-4">
              <div className={`p-4 border rounded-lg ${errors['declarations.termsAccepted'] ? 'border-red-500' : 'border-gray-300'}`}>
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="termsAccepted"
                    checked={formData.declarations.termsAccepted}
                    onChange={(e) => handleChange('declarations', 'termsAccepted', e.target.checked)}
                    className="mt-1 rounded"
                    required
                  />
                  <div>
                    <label htmlFor="termsAccepted" className="font-medium text-gray-700">
                      I agree to the Terms & Conditions <span className="text-red-500">*</span>
                    </label>
                    <p className="text-sm text-gray-600 mt-1">
                      I have read and understood all terms and conditions related to this loan application.
                    </p>
                  </div>
                </div>
              </div>

              <div className={`p-4 border rounded-lg ${errors['declarations.creditCheckAuthorized'] ? 'border-red-500' : 'border-gray-300'}`}>
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="creditCheckAuthorized"
                    checked={formData.declarations.creditCheckAuthorized}
                    onChange={(e) => handleChange('declarations', 'creditCheckAuthorized', e.target.checked)}
                    className="mt-1 rounded"
                    required
                  />
                  <div>
                    <label htmlFor="creditCheckAuthorized" className="font-medium text-gray-700">
                      I authorize the company to check my credit score <span className="text-red-500">*</span>
                    </label>
                    <p className="text-sm text-gray-600 mt-1">
                      I authorize the NBFC to verify my credit history with credit bureaus.
                    </p>
                  </div>
                </div>
              </div>

              <div className={`p-4 border rounded-lg ${errors['declarations.detailsConfirmed'] ? 'border-red-500' : 'border-gray-300'}`}>
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="detailsConfirmed"
                    checked={formData.declarations.detailsConfirmed}
                    onChange={(e) => handleChange('declarations', 'detailsConfirmed', e.target.checked)}
                    className="mt-1 rounded"
                    required
                  />
                  <div>
                    <label htmlFor="detailsConfirmed" className="font-medium text-gray-700">
                      I confirm all provided details are correct <span className="text-red-500">*</span>
                    </label>
                    <p className="text-sm text-gray-600 mt-1">
                      I declare that all information provided in this application is true and accurate to the best of my knowledge.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 10:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Building2 size={20} />
              Internal Assignment
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assigned Employee
                </label>
                <input
                  type="text"
                  value={formData.internalDetails.assignedEmployee}
                  onChange={(e) => handleChange('internalDetails', 'assignedEmployee', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assigned Partner / DSA
                </label>
                <input
                  type="text"
                  value={formData.internalDetails.assignedPartner}
                  onChange={(e) => handleChange('internalDetails', 'assignedPartner', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Branch Name
                </label>
                <input
                  type="text"
                  value={formData.internalDetails.branchName}
                  onChange={(e) => handleChange('internalDetails', 'branchName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Application Source
                </label>
                <select
                  value={formData.internalDetails.applicationSource}
                  onChange={(e) => handleChange('internalDetails', 'applicationSource', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="Online">Online</option>
                  <option value="Partner">Partner</option>
                  <option value="Walk-in">Walk-in</option>
                  <option value="Tele-calling">Tele-calling</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Application Status
                </label>
                <select
                  value={formData.internalDetails.applicationStatus}
                  onChange={(e) => handleChange('internalDetails', 'applicationStatus', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="Draft">Draft</option>
                  <option value="Submitted">Submitted</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Disbursed">Disbursed</option>
                </select>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Document upload component
  const DocumentUpload = ({ label, value, onChange, accept, error }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className={`border-2 border-dashed rounded-lg p-4 ${error ? 'border-red-500' : 'border-gray-300'} hover:border-blue-400 transition-colors`}>
        {!value ? (
          <div className="text-center">
            <input
              type="file"
              onChange={(e) => onChange(e.target.files[0])}
              className="hidden"
              id={`file-${label}`}
              accept={accept}
            />
            <label
              htmlFor={`file-${label}`}
              className="cursor-pointer flex flex-col items-center gap-2"
            >
              <Upload className="text-gray-400" size={24} />
              <span className="text-sm text-gray-600">Click to upload</span>
              <span className="text-xs text-gray-500">PDF, JPG, PNG (Max 5MB)</span>
            </label>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <File className="text-green-600" size={18} />
              <div>
                <p className="text-sm font-medium text-gray-800">{value.name}</p>
                <p className="text-xs text-gray-500">
                  {(value.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onChange(null)}
              className="text-red-500 hover:text-red-700"
            >
              <X size={18} />
            </button>
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
  
  if (showPreview) {
  return (
    <LoanApplicationPreview
      formData={formData}
      userRole={userRole}

      onEdit={() => setShowPreview(false)}
      onCancel={() => setShowPreview(false)}

      onSubmit={(finalData) => {
        // 🔥 FINAL SUBMIT (API / parent handler)
        if (onSubmit) {
          onSubmit(finalData);
        }
        setShowPreview(false);
      }}
    />
  );
}


  return (
    <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isEditMode ? 'Edit Loan Application' : 'New Loan Application'}
            </h1>
            <p className="text-gray-600">Application ID: {formData.applicationId}</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">User Role: <span className="font-medium capitalize">{userRole}</span></div>
            <div className="text-sm text-gray-500">Status: <span className="font-medium">{formData.internalDetails.applicationStatus}</span></div>
          </div>
        </div>

        {/* Section Navigation */}
        <div className="flex flex-wrap gap-2 mb-6">
          {sections.filter(section => isVisible(section.id)).map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => setCurrentSection(section.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentSection === section.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <section.icon size={16} />
              {section.title}
              {section.mandatory && <span className="text-red-500">*</span>}
            </button>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress</span>
            <span>{Math.round((currentSection / 10) * 100)}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${(currentSection / 10) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit}>
        <div className="mb-8">
          {renderSection()}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={prevSection}
            disabled={currentSection === 1}
            className={`px-6 py-3 border border-gray-300 rounded-lg font-medium transition-colors ${
              currentSection === 1
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-gray-50'
            }`}
          >
            Previous
          </button>

          {currentSection < 10 ? (
            <button
              type="button"
              onClick={nextSection}
              className="ml-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
            >
              Next
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={handleSaveDraft}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors"
              >
                Save as Draft
              </button>

              <button
  type="button"
  onClick={() => {
    // optional: final validation
    const valid = [1,2,6,9].every(sec => validateSection(sec));
    if (valid) {
      setShowPreview(true);
    }
  }}
  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
>
  Preview Application
</button>

            </>
          )}

          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors"
          >
            Reset Form
          </button>

          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Form Status Summary */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-gray-500">Total Sections</p>
            <p className="font-medium">10</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Current Section</p>
            <p className="font-medium">{currentSection}/10</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Mandatory Completed</p>
            <p className="font-medium text-green-600">
              {[1, 2, 4, 5, 6, 9].filter(s => isVisible(s)).map(s => currentSection >= s).length}/6
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Validation Errors</p>
            <p className="font-medium text-red-600">{Object.keys(errors).length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanApplicationForm;