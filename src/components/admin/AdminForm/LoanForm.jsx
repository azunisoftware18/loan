// LoanApplicationForm.jsx
// Multi-step form with sequential section unlocking
import React, { useState, useEffect } from 'react';
import {
  User, Phone, Mail, Calendar, MapPin, Briefcase,
  Banknote, FileText, Shield, CheckCircle, Upload,
  File, X, Home, Building, IndianRupee, Percent,
  Clock, Target, DollarSign, CreditCard, IdCard,
  Check, AlertCircle, UserPlus, Building2, FileCheck,
  Lock, Unlock, ChevronDown, ChevronUp, Save
} from 'lucide-react';

import { useCreateLoan } from "../../../hooks/useLoanApplication";
import { useLoanTypes } from '../../../hooks/useLoan';
import { useLeadSearch } from '../../../hooks/useLeads';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

// ─── Enum options matching schema exactly ───────────────────────────────────
const TITLE_OPTIONS = ['MR', 'MRS', 'MS', 'DR', 'PROF'];
const GENDER_OPTIONS = ['MALE', 'FEMALE', 'OTHER'];
const EMPLOYMENT_TYPE_OPTIONS = ['salaried', 'self_employed', 'business'];
const MARITAL_STATUS_OPTIONS = ['SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED', 'OTHER'];
const CATEGORY_OPTIONS = ['GENERAL', 'SC', 'ST', 'OBC', 'OTHER'];
const INTEREST_TYPE_OPTIONS = ['FLAT', 'REDUCING'];
const CO_APPLICANT_RELATION_OPTIONS = [
  'SPOUSE', 'PARENT', 'SIBLING', 'CHILD', 'FRIEND',
  'COLLEAGUE', 'OTHER', 'BUSINESS_PARTNER', 'FATHER', 'MOTHER'
];
const ACCOUNT_TYPE_OPTIONS = ['Saving', 'Current'];
const TENURE_OPTIONS = [6, 12, 24, 36, 48, 60, 84, 120];

// ─── Initial form state — fields match schema exactly ───────────────────────
const initialFormState = {
  // Personal
  title: '',
  firstName: '',
  middleName: '',
  lastName: '',
  gender: '',
  dob: '',
  contactNumber: '',
  alternateNumber: '',
  email: '',
  maritalStatus: '',
  nationality: 'Indian',
  category: '',
  spouseName: '',

  // KYC
  aadhaarNumber: '',
  panNumber: '',
  voterId: '',
  passportNumber: '',

  // Address
  address: '',
  city: '',
  state: '',
  pinCode: '',

  // Employment
  employmentType: '',

  // Financial
  monthlyIncome: '',
  annualIncome: '',
  otherIncome: '',

  // Bank
  bankName: '',
  bankAccountNumber: '',
  ifscCode: '',
  accountType: 'Saving',

  // Loan
  loanTypeId: '',
  requestedAmount: '',
  tenureMonths: '',
  interestRate: '',
  interestType: '',
  emiAmount: '',
  loanPurpose: '',
  purposeDetails: '',
  cibilScore: '',

  // Co-applicant (single legacy fields kept for simple case)
  coApplicantName: '',
  coApplicantContact: '',
  coApplicantIncome: '',
  coApplicantPan: '',
  coApplicantAadhaar: '',
  coApplicantRelation: '',

  // Co-applicants array
  coApplicants: [],

  // Declaration (UI-only, not sent to backend)
  _termsAccepted: false,
  _creditCheckAuthorized: false,
  _detailsConfirmed: false,

  // UI helpers
  _hasCoApplicant: false,
  _applicationId: `APP${Date.now().toString().slice(-8)}`,
};

// ─── Sections configuration with validation rules ──────────────────────────
const SECTIONS = [
  { 
    id: 1, 
    title: 'Personal Details', 
    icon: User, 
    mandatory: true,
    description: 'Basic personal information and contact details',
    fields: ['title', 'firstName', 'contactNumber', 'dob', 'gender', 'maritalStatus', 'nationality', 'category']
  },
  { 
    id: 2, 
    title: 'KYC Details', 
    icon: IdCard, 
    mandatory: true,
    description: 'Identity verification documents',
    fields: ['aadhaarNumber', 'panNumber']
  },
  { 
    id: 3, 
    title: 'Address Details', 
    icon: MapPin, 
    mandatory: true,
    description: 'Current residential address',
    fields: ['address', 'city', 'state', 'pinCode']
  },
  { 
    id: 4, 
    title: 'Employment Details', 
    icon: Briefcase, 
    mandatory: true,
    description: 'Employment type and occupation details',
    fields: ['employmentType']
  },
  { 
    id: 5, 
    title: 'Income & Bank', 
    icon: Banknote, 
    mandatory: true,
    description: 'Income details and bank account information',
    fields: ['monthlyIncome', 'annualIncome', 'bankName', 'bankAccountNumber', 'ifscCode', 'accountType']
  },
  { 
    id: 6, 
    title: 'Loan Details', 
    icon: DollarSign, 
    mandatory: true,
    description: 'Loan amount, tenure, and other loan-specific details',
    fields: ['loanTypeId', 'requestedAmount', 'tenureMonths']
  },
  { 
    id: 7, 
    title: 'Co-Applicant', 
    icon: UserPlus, 
    mandatory: false,
    description: 'Additional applicant or guarantor information (optional)',
    fields: []
  },
  { 
    id: 8, 
    title: 'Declaration', 
    icon: FileCheck, 
    mandatory: true,
    description: 'Terms acceptance and confirmation',
    fields: ['_termsAccepted', '_creditCheckAuthorized', '_detailsConfirmed']
  },
];

// ─── Component ───────────────────────────────────────────────────────────────
const LoanApplicationForm = ({
  onCancel,
  onSaveDraft,
  initialData = {},
  isEditMode = false,
}) => {
  const { mutate: submitLoan, isPending, isSuccess, error } = useCreateLoan();
  const user = useSelector((state) => state.auth.user);

  const { data: loanTypesResponse, isLoading: loanTypesLoading } = useLoanTypes();
  const loanTypes = Array.isArray(loanTypesResponse) ? loanTypesResponse : [];

  const [leadNumber, setLeadNumber] = useState('');
  const { refetch: fetchLead, isFetching: leadLoading } = useLeadSearch(leadNumber, false);

  const [formData, setFormData] = useState({ ...initialFormState, ...initialData });
  const [expandedSections, setExpandedSections] = useState({ 1: true });
  const [completedSections, setCompletedSections] = useState({});
  const [errors, setErrors] = useState({});

  // Auto-calculate EMI
  useEffect(() => {
    const { requestedAmount, tenureMonths, interestRate } = formData;
    if (requestedAmount && tenureMonths && interestRate) {
      const P = parseFloat(requestedAmount);
      const n = parseInt(tenureMonths);
      const r = parseFloat(interestRate) / 12 / 100;
      if (r > 0) {
        const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        setFormData(prev => ({ ...prev, emiAmount: emi.toFixed(2) }));
      }
    }
  }, [formData.requestedAmount, formData.tenureMonths, formData.interestRate]);

  // ── Field change handler ──────────────────────────────────────────────────
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const e = { ...prev };
        delete e[field];
        return e;
      });
    }
  };

  // ── Co-applicant array helpers ────────────────────────────────────────────
  const addCoApplicant = () => {
    setFormData(prev => ({
      ...prev,
      coApplicants: [
        ...prev.coApplicants,
        {
          firstName: '', lastName: '', middleName: '',
          relation: '', contactNumber: '', email: '',
          dob: '', panNumber: '', aadhaarNumber: '',
          employmentType: '', monthlyIncome: '',
        }
      ]
    }));
  };

  const updateCoApplicant = (index, field, value) => {
    setFormData(prev => {
      const updated = [...prev.coApplicants];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, coApplicants: updated };
    });
  };

  const removeCoApplicant = (index) => {
    setFormData(prev => ({
      ...prev,
      coApplicants: prev.coApplicants.filter((_, i) => i !== index)
    }));
  };

  // ── Section validation ────────────────────────────────────────────────────
  const validateSection = (sectionId) => {
    const section = SECTIONS.find(s => s.id === sectionId);
    const e = {};

    if (sectionId === 1) {
      if (!formData.title) e.title = 'Title is required';
      if (!formData.firstName?.trim()) e.firstName = 'First name is required';
      if (!/^[6-9]\d{9}$/.test(formData.contactNumber)) e.contactNumber = 'Valid 10-digit mobile required';
      if (!formData.dob) e.dob = 'Date of birth is required';
      if (!formData.gender) e.gender = 'Gender is required';
      if (!formData.maritalStatus) e.maritalStatus = 'Marital status is required';
      if (!formData.nationality?.trim()) e.nationality = 'Nationality is required';
      if (!formData.category) e.category = 'Category is required';
    }
    
    if (sectionId === 2) {
      if (!/^\d{12}$/.test(formData.aadhaarNumber)) e.aadhaarNumber = 'Valid 12-digit Aadhaar required';
      if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber)) e.panNumber = 'Valid PAN required (e.g. ABCDE1234F)';
    }
    
    if (sectionId === 3) {
      if (!formData.address?.trim()) e.address = 'Address is required';
      if (!formData.city?.trim()) e.city = 'City is required';
      if (!formData.state?.trim()) e.state = 'State is required';
      if (!/^\d{6}$/.test(formData.pinCode)) e.pinCode = 'Valid 6-digit pin code required';
    }
    
    if (sectionId === 4) {
      if (!formData.employmentType) e.employmentType = 'Employment type is required';
    }
    
    if (sectionId === 5) {
      if (!formData.monthlyIncome || Number(formData.monthlyIncome) < 0) e.monthlyIncome = 'Valid monthly income required';
      if (!formData.annualIncome || Number(formData.annualIncome) < 0) e.annualIncome = 'Valid annual income required';
      if (!formData.bankName?.trim()) e.bankName = 'Bank name is required';
      if (!formData.bankAccountNumber?.trim()) e.bankAccountNumber = 'Account number is required';
      if (!formData.ifscCode?.trim()) e.ifscCode = 'IFSC code is required';
      if (!formData.accountType) e.accountType = 'Account type is required';
    }
    
    if (sectionId === 6) {
      if (!formData.loanTypeId) e.loanTypeId = 'Loan type is required';
      if (!formData.requestedAmount || Number(formData.requestedAmount) <= 0) e.requestedAmount = 'Valid loan amount required';
      if (!formData.tenureMonths) e.tenureMonths = 'Tenure is required';
    }
    
    if (sectionId === 8) {
      if (!formData._termsAccepted) e._termsAccepted = 'Must accept terms';
      if (!formData._creditCheckAuthorized) e._creditCheckAuthorized = 'Must authorize credit check';
      if (!formData._detailsConfirmed) e._detailsConfirmed = 'Must confirm details';
    }

    setErrors(prev => ({ ...prev, ...e }));
    return Object.keys(e).length === 0;
  };

  // ── Toggle section with validation and unlocking logic ───────────────────
  const toggleSection = (sectionId) => {
    // Check if previous sections are completed
    const previousSections = SECTIONS.filter(s => s.id < sectionId && s.mandatory);
    const allPreviousCompleted = previousSections.every(s => completedSections[s.id]);

    if (!allPreviousCompleted && sectionId > 1) {
      toast.error('Please complete previous sections first');
      return;
    }

    // If trying to open a section, validate previous sections are still valid
    if (!expandedSections[sectionId]) {
      // Validate all previous mandatory sections
      for (const prevSection of previousSections) {
        if (!validateSection(prevSection.id)) {
          toast.error(`Please fix errors in ${prevSection.title} first`);
          return;
        }
      }
    }

    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  // ── Save and complete section ────────────────────────────────────────────
  const saveAndContinue = (sectionId) => {
    if (validateSection(sectionId)) {
      setCompletedSections(prev => ({ ...prev, [sectionId]: true }));
      
      // Auto-open next section if available
      const nextSection = SECTIONS.find(s => s.id === sectionId + 1);
      if (nextSection) {
        setExpandedSections(prev => ({
          ...prev,
          [sectionId + 1]: true
        }));
      }
      
      toast.success(`${SECTIONS.find(s => s.id === sectionId).title} saved successfully`);
    }
  };

  // ── Lead fetch ────────────────────────────────────────────────────────────
  const fetchLeadByNumber = async () => {
    if (!leadNumber) return;
    const res = await fetchLead();
    const lead = res?.data;
    if (!lead) { 
      toast.error('Lead not found'); 
      return; 
    }
    setFormData(prev => ({
      ...prev,
      firstName: lead.fullName?.split(' ')[0] || '',
      lastName: lead.fullName?.split(' ').slice(1).join(' ') || '',
      contactNumber: lead.contactNumber || '',
      email: lead.email || '',
      city: lead.city || '',
      state: lead.state || '',
      loanTypeId: lead.loanTypeId || '',
      requestedAmount: lead.loanAmount || '',
    }));
    toast.success('Lead data fetched successfully');
  };

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all mandatory sections before final submit
    const mandatorySections = SECTIONS.filter(s => s.mandatory);
    for (const section of mandatorySections) {
      if (!validateSection(section.id)) {
        toast.error(`Please complete ${section.title} correctly`);
        setExpandedSections({ [section.id]: true });
        return;
      }
    }

    // Build payload exactly as schema expects
    const payload = {
      title: formData.title,
      firstName: formData.firstName,
      lastName: formData.lastName || undefined,
      middleName: formData.middleName || undefined,
      gender: formData.gender,
      dob: formData.dob,
      contactNumber: formData.contactNumber,
      alternateNumber: formData.alternateNumber || undefined,
      email: formData.email || undefined,
      maritalStatus: formData.maritalStatus,
      nationality: formData.nationality,
      category: formData.category,
      spouseName: formData.spouseName || undefined,
      passportNumber: formData.passportNumber || undefined,
      aadhaarNumber: formData.aadhaarNumber,
      panNumber: formData.panNumber,
      voterId: formData.voterId || undefined,

      address: formData.address,
      city: formData.city,
      state: formData.state,
      pinCode: formData.pinCode,

      employmentType: formData.employmentType,

      monthlyIncome: Number(formData.monthlyIncome),
      annualIncome: Number(formData.annualIncome),
      otherIncome: formData.otherIncome ? Number(formData.otherIncome) : undefined,

      bankName: formData.bankName,
      bankAccountNumber: formData.bankAccountNumber,
      ifscCode: formData.ifscCode,
      accountType: formData.accountType,

      loanTypeId: formData.loanTypeId,
      requestedAmount: Number(formData.requestedAmount),
      tenureMonths: formData.tenureMonths ? Number(formData.tenureMonths) : undefined,
      interestRate: formData.interestRate ? Number(formData.interestRate) : undefined,
      interestType: formData.interestType || undefined,
      emiAmount: formData.emiAmount ? Number(formData.emiAmount) : undefined,
      loanPurpose: formData.loanPurpose || undefined,
      purposeDetails: formData.purposeDetails || undefined,
      cibilScore: formData.cibilScore ? Number(formData.cibilScore) : undefined,

      coApplicantName: formData.coApplicantName || undefined,
      coApplicantContact: formData.coApplicantContact || undefined,
      coApplicantIncome: formData.coApplicantIncome ? Number(formData.coApplicantIncome) : undefined,
      coApplicantPan: formData.coApplicantPan || undefined,
      coApplicantAadhaar: formData.coApplicantAadhaar || undefined,
      coApplicantRelation: formData.coApplicantRelation || undefined,

      coApplicants: formData.coApplicants.length > 0
        ? formData.coApplicants.map(ca => ({
            firstName: ca.firstName,
            lastName: ca.lastName || undefined,
            middleName: ca.middleName || undefined,
            relation: ca.relation,
            contactNumber: ca.contactNumber,
            email: ca.email || undefined,
            dob: ca.dob ? new Date(ca.dob) : undefined,
            panNumber: ca.panNumber || undefined,
            aadhaarNumber: ca.aadhaarNumber || undefined,
            employmentType: ca.employmentType,
            monthlyIncome: ca.monthlyIncome ? Number(ca.monthlyIncome) : undefined,
          }))
        : undefined,

      branchId: user?.branchId,
      status: 'draft',
    };

    console.log('🚀 PAYLOAD:', payload);
    submitLoan(payload);
  };

  // ── Error display helper ──────────────────────────────────────────────────
  const Err = ({ field }) => errors[field] ? (
    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
      <AlertCircle size={12} /> {errors[field]}
    </p>
  ) : null;

  const inputCls = (field) =>
    `w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
      errors[field] ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
    }`;

  // ── Check if section is accessible ───────────────────────────────────────
  const isSectionAccessible = (sectionId) => {
    if (sectionId === 1) return true;
    const previousSections = SECTIONS.filter(s => s.id < sectionId && s.mandatory);
    return previousSections.every(s => completedSections[s.id]);
  };

  // ── Render individual section content ────────────────────────────────────
  const renderSectionContent = (section) => {
    switch (section.id) {
      case 1:
        return (
          <div className="space-y-6">
            {/* Lead lookup */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lead Number (Optional – auto-fills form)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={leadNumber}
                  onChange={e => setLeadNumber(e.target.value)}
                  placeholder="Enter Lead Number"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={fetchLeadByNumber}
                  disabled={!leadNumber || leadLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center gap-2"
                >
                  {leadLoading ? 'Fetching…' : 'Fetch Lead'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title <span className="text-red-500">*</span>
                </label>
                <select value={formData.title} onChange={e => handleChange('title', e.target.value)} className={inputCls('title')}>
                  <option value="">Select Title</option>
                  {TITLE_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <Err field="title" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input type="text" value={formData.firstName} onChange={e => handleChange('firstName', e.target.value)} className={inputCls('firstName')} placeholder="Enter first name" />
                <Err field="firstName" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
                <input type="text" value={formData.middleName} onChange={e => handleChange('middleName', e.target.value)} className={inputCls('middleName')} placeholder="Enter middle name" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input type="text" value={formData.lastName} onChange={e => handleChange('lastName', e.target.value)} className={inputCls('lastName')} placeholder="Enter last name" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.contactNumber}
                  onChange={e => handleChange('contactNumber', e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className={inputCls('contactNumber')}
                  maxLength={10}
                  placeholder="10-digit mobile number"
                />
                <Err field="contactNumber" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alternate Number</label>
                <input
                  type="tel"
                  value={formData.alternateNumber}
                  onChange={e => handleChange('alternateNumber', e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className={inputCls('alternateNumber')}
                  maxLength={10}
                  placeholder="Alternate contact"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" value={formData.email} onChange={e => handleChange('email', e.target.value)} className={inputCls('email')} placeholder="email@example.com" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input type="date" value={formData.dob} onChange={e => handleChange('dob', e.target.value)} className={inputCls('dob')} />
                <Err field="dob" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select value={formData.gender} onChange={e => handleChange('gender', e.target.value)} className={inputCls('gender')}>
                  <option value="">Select Gender</option>
                  {GENDER_OPTIONS.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
                <Err field="gender" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Marital Status <span className="text-red-500">*</span>
                </label>
                <select value={formData.maritalStatus} onChange={e => handleChange('maritalStatus', e.target.value)} className={inputCls('maritalStatus')}>
                  <option value="">Select Status</option>
                  {MARITAL_STATUS_OPTIONS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                <Err field="maritalStatus" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Spouse Name</label>
                <input type="text" value={formData.spouseName} onChange={e => handleChange('spouseName', e.target.value)} className={inputCls('spouseName')} placeholder="If married" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nationality <span className="text-red-500">*</span>
                </label>
                <input type="text" value={formData.nationality} onChange={e => handleChange('nationality', e.target.value)} className={inputCls('nationality')} placeholder="Indian" />
                <Err field="nationality" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <select value={formData.category} onChange={e => handleChange('category', e.target.value)} className={inputCls('category')}>
                  <option value="">Select Category</option>
                  {CATEGORY_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <Err field="category" />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Aadhaar Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.aadhaarNumber}
                  onChange={e => handleChange('aadhaarNumber', e.target.value.replace(/\D/g, '').slice(0, 12))}
                  className={inputCls('aadhaarNumber')}
                  maxLength={12}
                  placeholder="12-digit Aadhaar number"
                />
                <Err field="aadhaarNumber" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  PAN Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.panNumber}
                  onChange={e => handleChange('panNumber', e.target.value.toUpperCase())}
                  className={inputCls('panNumber')}
                  maxLength={10}
                  placeholder="ABCDE1234F"
                />
                <Err field="panNumber" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Voter ID (Optional)</label>
                <input type="text" value={formData.voterId} onChange={e => handleChange('voterId', e.target.value)} className={inputCls('voterId')} placeholder="Voter ID number" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Passport Number (Optional)</label>
                <input type="text" value={formData.passportNumber} onChange={e => handleChange('passportNumber', e.target.value)} className={inputCls('passportNumber')} placeholder="Passport number" />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <p className="text-sm text-gray-500 bg-blue-50 p-3 rounded-lg">
              <Info size={16} className="inline mr-1" /> Please provide your current residential address
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address <span className="text-red-500">*</span>
                </label>
                <input type="text" value={formData.address} onChange={e => handleChange('address', e.target.value)} className={inputCls('address')} placeholder="House no., Street, Area" />
                <Err field="address" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City <span className="text-red-500">*</span>
                </label>
                <input type="text" value={formData.city} onChange={e => handleChange('city', e.target.value)} className={inputCls('city')} placeholder="City" />
                <Err field="city" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State <span className="text-red-500">*</span>
                </label>
                <input type="text" value={formData.state} onChange={e => handleChange('state', e.target.value)} className={inputCls('state')} placeholder="State" />
                <Err field="state" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pin Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.pinCode}
                  onChange={e => handleChange('pinCode', e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className={inputCls('pinCode')}
                  maxLength={6}
                  placeholder="6-digit pin code"
                />
                <Err field="pinCode" />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Employment Type <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-3 flex-wrap">
                {EMPLOYMENT_TYPE_OPTIONS.map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleChange('employmentType', type)}
                    className={`px-4 py-2 rounded-lg border font-medium transition-all capitalize ${
                      formData.employmentType === type
                        ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                    }`}
                  >
                    {type.replace('_', ' ')}
                  </button>
                ))}
              </div>
              <Err field="employmentType" />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Income Section */}
              <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-700 flex items-center gap-2">
                  <IndianRupee size={16} /> Income Details
                </h4>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Monthly Income (₹) <span className="text-red-500">*</span>
                  </label>
                  <input type="number" min="0" value={formData.monthlyIncome} onChange={e => handleChange('monthlyIncome', e.target.value)} className={inputCls('monthlyIncome')} placeholder="Monthly income" />
                  <Err field="monthlyIncome" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Annual Income (₹) <span className="text-red-500">*</span>
                  </label>
                  <input type="number" min="0" value={formData.annualIncome} onChange={e => handleChange('annualIncome', e.target.value)} className={inputCls('annualIncome')} placeholder="Annual income" />
                  <Err field="annualIncome" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Other Income (₹)</label>
                  <input type="number" min="0" value={formData.otherIncome} onChange={e => handleChange('otherIncome', e.target.value)} className={inputCls('otherIncome')} placeholder="Other income if any" />
                </div>
              </div>

              {/* Bank Section */}
              <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-700 flex items-center gap-2">
                  <Building size={16} /> Bank Details
                </h4>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bank Name <span className="text-red-500">*</span>
                  </label>
                  <input type="text" value={formData.bankName} onChange={e => handleChange('bankName', e.target.value)} className={inputCls('bankName')} placeholder="Bank name" />
                  <Err field="bankName" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Account Number <span className="text-red-500">*</span>
                  </label>
                  <input type="text" value={formData.bankAccountNumber} onChange={e => handleChange('bankAccountNumber', e.target.value)} className={inputCls('bankAccountNumber')} placeholder="Account number" />
                  <Err field="bankAccountNumber" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    IFSC Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.ifscCode}
                    onChange={e => handleChange('ifscCode', e.target.value.toUpperCase())}
                    className={inputCls('ifscCode')}
                    maxLength={11}
                    placeholder="IFSC code"
                  />
                  <Err field="ifscCode" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Account Type <span className="text-red-500">*</span>
                  </label>
                  <select value={formData.accountType} onChange={e => handleChange('accountType', e.target.value)} className={inputCls('accountType')}>
                    {ACCOUNT_TYPE_OPTIONS.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                  <Err field="accountType" />
                </div>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Loan Type <span className="text-red-500">*</span>
                </label>
                <select value={formData.loanTypeId} onChange={e => handleChange('loanTypeId', e.target.value)} className={inputCls('loanTypeId')}>
                  <option value="">{loanTypesLoading ? 'Loading…' : 'Select Loan Type'}</option>
                  {loanTypes.map(loan => <option key={loan.id} value={loan.id}>{loan.name}</option>)}
                </select>
                <Err field="loanTypeId" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Requested Amount (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.requestedAmount}
                  onChange={e => handleChange('requestedAmount', e.target.value)}
                  className={inputCls('requestedAmount')}
                  placeholder="Loan amount"
                />
                <Err field="requestedAmount" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tenure (Months) <span className="text-red-500">*</span>
                </label>
                <select value={formData.tenureMonths} onChange={e => handleChange('tenureMonths', e.target.value)} className={inputCls('tenureMonths')}>
                  <option value="">Select Tenure</option>
                  {TENURE_OPTIONS.map(t => <option key={t} value={t}>{t} Months</option>)}
                </select>
                <Err field="tenureMonths" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value={formData.interestRate}
                  onChange={e => handleChange('interestRate', e.target.value)}
                  className={inputCls('interestRate')}
                  placeholder="Interest rate"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Interest Type</label>
                <select value={formData.interestType} onChange={e => handleChange('interestType', e.target.value)} className={inputCls('interestType')}>
                  <option value="">Select</option>
                  {INTEREST_TYPE_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CIBIL Score</label>
                <input
                  type="number"
                  min="300"
                  max="900"
                  value={formData.cibilScore}
                  onChange={e => handleChange('cibilScore', e.target.value)}
                  className={inputCls('cibilScore')}
                  placeholder="300 – 900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Loan Purpose</label>
                <input type="text" value={formData.loanPurpose} onChange={e => handleChange('loanPurpose', e.target.value)} className={inputCls('loanPurpose')} placeholder="e.g. Home Renovation" />
              </div>

              <div className="lg:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Purpose Details</label>
                <input type="text" value={formData.purposeDetails} onChange={e => handleChange('purposeDetails', e.target.value)} className={inputCls('purposeDetails')} placeholder="Additional details" />
              </div>
            </div>

            {/* Loan Summary Card */}
            {formData.emiAmount > 0 && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-3 flex items-center gap-2">
                  <Target size={16} /> Loan Summary
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <p className="text-xs text-blue-600">Requested Amount</p>
                    <p className="font-semibold text-lg">₹{Number(formData.requestedAmount).toLocaleString('en-IN')}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <p className="text-xs text-blue-600">Monthly EMI</p>
                    <p className="font-semibold text-lg">₹{Number(formData.emiAmount).toLocaleString('en-IN')}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <p className="text-xs text-blue-600">Total Interest</p>
                    <p className="font-semibold text-lg">
                      ₹{(Number(formData.emiAmount) * Number(formData.tenureMonths) - Number(formData.requestedAmount)).toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <p className="text-xs text-blue-600">Total Payable</p>
                    <p className="font-semibold text-lg">
                      ₹{(Number(formData.emiAmount) * Number(formData.tenureMonths)).toLocaleString('en-IN')}
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
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-blue-700 flex items-center gap-2">
                <Info size={16} /> Co-applicant information is optional. You can add multiple co-applicants if needed.
              </p>
            </div>

            {/* Simple single co-applicant fields */}
            <div className="border border-gray-200 rounded-lg p-4 space-y-4">
              <h4 className="font-medium text-gray-700">Primary Co-Applicant</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Co-Applicant Name</label>
                  <input type="text" value={formData.coApplicantName} onChange={e => handleChange('coApplicantName', e.target.value)} className={inputCls('coApplicantName')} placeholder="Full name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                  <input
                    type="tel"
                    value={formData.coApplicantContact}
                    onChange={e => handleChange('coApplicantContact', e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className={inputCls('coApplicantContact')}
                    maxLength={10}
                    placeholder="10-digit mobile"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Income (₹)</label>
                  <input type="number" min="0" value={formData.coApplicantIncome} onChange={e => handleChange('coApplicantIncome', e.target.value)} className={inputCls('coApplicantIncome')} placeholder="Monthly income" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">PAN Number</label>
                  <input type="text" value={formData.coApplicantPan} onChange={e => handleChange('coApplicantPan', e.target.value.toUpperCase())} className={inputCls('coApplicantPan')} maxLength={10} placeholder="PAN" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Aadhaar Number</label>
                  <input type="text" value={formData.coApplicantAadhaar} onChange={e => handleChange('coApplicantAadhaar', e.target.value.replace(/\D/g, '').slice(0, 12))} className={inputCls('coApplicantAadhaar')} maxLength={12} placeholder="Aadhaar" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Relation</label>
                  <select value={formData.coApplicantRelation} onChange={e => handleChange('coApplicantRelation', e.target.value)} className={inputCls('coApplicantRelation')}>
                    <option value="">Select Relation</option>
                    {CO_APPLICANT_RELATION_OPTIONS.map(r => <option key={r} value={r}>{r.replace('_', ' ')}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Additional co-applicants array */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-700">Additional Co-Applicants</h4>
                <button type="button" onClick={addCoApplicant} className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 flex items-center gap-1 transition-colors">
                  <UserPlus size={14} /> Add Co-Applicant
                </button>
              </div>

              {formData.coApplicants.map((ca, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-4 space-y-4 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <h5 className="font-medium text-gray-700">Co-Applicant #{idx + 1}</h5>
                    <button type="button" onClick={() => removeCoApplicant(idx)} className="text-red-500 hover:text-red-700 transition-colors">
                      <X size={18} />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name <span className="text-red-500">*</span></label>
                      <input type="text" value={ca.firstName} onChange={e => updateCoApplicant(idx, 'firstName', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="First name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
                      <input type="text" value={ca.middleName} onChange={e => updateCoApplicant(idx, 'middleName', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Middle name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input type="text" value={ca.lastName} onChange={e => updateCoApplicant(idx, 'lastName', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Last name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Relation <span className="text-red-500">*</span></label>
                      <select value={ca.relation} onChange={e => updateCoApplicant(idx, 'relation', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                        <option value="">Select Relation</option>
                        {CO_APPLICANT_RELATION_OPTIONS.map(r => <option key={r} value={r}>{r.replace('_', ' ')}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number <span className="text-red-500">*</span></label>
                      <input type="tel" value={ca.contactNumber} onChange={e => updateCoApplicant(idx, 'contactNumber', e.target.value.replace(/\D/g, '').slice(0, 10))} className="w-full px-3 py-2 border border-gray-300 rounded-lg" maxLength={10} placeholder="Mobile number" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input type="email" value={ca.email} onChange={e => updateCoApplicant(idx, 'email', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Email" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                      <input type="date" value={ca.dob} onChange={e => updateCoApplicant(idx, 'dob', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">PAN Number</label>
                      <input type="text" value={ca.panNumber} onChange={e => updateCoApplicant(idx, 'panNumber', e.target.value.toUpperCase())} className="w-full px-3 py-2 border border-gray-300 rounded-lg" maxLength={10} placeholder="PAN" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Aadhaar Number</label>
                      <input type="text" value={ca.aadhaarNumber} onChange={e => updateCoApplicant(idx, 'aadhaarNumber', e.target.value.replace(/\D/g, '').slice(0, 12))} className="w-full px-3 py-2 border border-gray-300 rounded-lg" maxLength={12} placeholder="Aadhaar" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type <span className="text-red-500">*</span></label>
                      <select value={ca.employmentType} onChange={e => updateCoApplicant(idx, 'employmentType', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                        <option value="">Select</option>
                        {EMPLOYMENT_TYPE_OPTIONS.map(t => <option key={t} value={t}>{t.replace('_', ' ')}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Income (₹)</label>
                      <input type="number" min="0" value={ca.monthlyIncome} onChange={e => updateCoApplicant(idx, 'monthlyIncome', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Monthly income" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-yellow-700 flex items-center gap-2">
                <AlertCircle size={16} /> Please read and confirm all declarations carefully before submitting.
              </p>
            </div>
            
            <div className="space-y-4">
              {[
                { key: '_termsAccepted', label: 'Terms & Conditions', desc: 'I have read and understood all terms and conditions related to this loan application.' },
                { key: '_creditCheckAuthorized', label: 'Credit Check Authorization', desc: 'I authorize the NBFC to verify my credit history with credit bureaus.' },
                { key: '_detailsConfirmed', label: 'Information Confirmation', desc: 'I declare that all information provided is true and accurate to the best of my knowledge.' },
              ].map(({ key, label, desc }) => (
                <div key={key} className={`p-4 border rounded-lg transition-all ${errors[key] ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}>
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id={key}
                      checked={formData[key]}
                      onChange={e => handleChange(key, e.target.checked)}
                      className="mt-1 rounded text-blue-600 focus:ring-blue-500"
                    />
                    <div>
                      <label htmlFor={key} className="font-medium text-gray-700 cursor-pointer">
                        {label} <span className="text-red-500">*</span>
                      </label>
                      <p className="text-sm text-gray-600 mt-1">{desc}</p>
                      <Err field={key} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Calculate overall progress
  const completedCount = Object.keys(completedSections).length;
  const totalMandatory = SECTIONS.filter(s => s.mandatory).length;
  const overallProgress = Math.round((completedCount / totalMandatory) * 100);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isEditMode ? 'Edit Loan Application' : 'New Loan Application'}
            </h1>
            <p className="text-gray-500 text-sm mt-1">Application ID: {formData._applicationId}</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500 mb-1">Overall Progress</div>
            <div className="flex items-center gap-3">
              <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 transition-all duration-300" style={{ width: `${overallProgress}%` }} />
              </div>
              <span className="font-medium text-green-600">{overallProgress}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sections Container */}
      <div className="space-y-4">
        {SECTIONS.map((section) => {
          const isAccessible = isSectionAccessible(section.id);
          const isCompleted = completedSections[section.id];
          const isExpanded = expandedSections[section.id];
          const hasErrors = section.fields.some(field => errors[field]);

          return (
            <div
              key={section.id}
              className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all ${
                !isAccessible && section.id > 1 ? 'opacity-60' : ''
              }`}
            >
              {/* Section Header */}
              <div
                onClick={() => isAccessible && toggleSection(section.id)}
                className={`flex items-center justify-between p-5 cursor-pointer transition-colors ${
                  isExpanded ? 'bg-gradient-to-r from-blue-50 to-indigo-50' : 'hover:bg-gray-50'
                } ${!isAccessible && section.id > 1 ? 'cursor-not-allowed' : ''}`}
              >
                <div className="flex items-center gap-4">
                  {/* Status Icon */}
                  <div className="relative">
                    {isCompleted ? (
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle size={20} className="text-green-600" />
                      </div>
                    ) : !isAccessible && section.id > 1 ? (
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <Lock size={20} className="text-gray-400" />
                      </div>
                    ) : hasErrors ? (
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                        <AlertCircle size={20} className="text-red-500" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <section.icon size={20} className="text-blue-600" />
                      </div>
                    )}
                  </div>

                  {/* Section Info */}
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-semibold text-gray-800">
                        {section.title}
                      </h2>
                      {section.mandatory && (
                        <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                          Required
                        </span>
                      )}
                      {isCompleted && (
                        <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Check size={12} /> Completed
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{section.description}</p>
                  </div>
                </div>

                {/* Expand/Collapse Button */}
                <div className="flex items-center gap-3">
                  {isExpanded ? (
                    <ChevronUp size={20} className="text-gray-400" />
                  ) : (
                    <ChevronDown size={20} className="text-gray-400" />
                  )}
                </div>
              </div>

              {/* Section Content */}
              {isExpanded && (
                <div className="p-6 border-t border-gray-100">
                  {renderSectionContent(section)}

                  {/* Section Actions */}
                  <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => saveAndContinue(section.id)}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                    >
                      <Save size={16} />
                      Save & Continue
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Form Actions */}
      <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {isPending && <span className="text-blue-600">Saving application…</span>}
            {isSuccess && <span className="text-green-600">✅ Application successfully created</span>}
            {error && <span className="text-red-600">❌ {error?.response?.data?.message || error.message}</span>}
          </div>
          
          <div className="flex gap-3">
            {onSaveDraft && (
              <button
                type="button"
                onClick={() => onSaveDraft(formData)}
                className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors flex items-center gap-2"
              >
                <FileText size={16} />
                Save as Draft
              </button>
            )}
            
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isPending || completedCount < totalMandatory}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              <CheckCircle size={16} />
              {isPending ? 'Submitting…' : 'Submit Application'}
            </button>

            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Missing Info component
const Info = ({ size, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="16" x2="12" y2="12"></line>
    <circle cx="12" cy="8" r="1" fill="currentColor"></circle>
  </svg>
);

export default LoanApplicationForm;