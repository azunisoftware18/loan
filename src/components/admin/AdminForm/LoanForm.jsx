// LoanApplicationForm.jsx
// Updated strictly according to createLoanApplicationSchema
import React, { useState, useEffect } from 'react';
import {
  User, Phone, Mail, Calendar, MapPin, Briefcase,
  Banknote, FileText, Shield, CheckCircle, Upload,
  File, X, Home, Building, IndianRupee, Percent,
  Clock, Target, DollarSign, CreditCard, IdCard,
  Check, AlertCircle, UserPlus, Building2, FileCheck
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

// ─── Sections config ─────────────────────────────────────────────────────────
const SECTIONS = [
  { id: 1, title: 'Personal Details',     icon: User,      mandatory: true  },
  { id: 2, title: 'KYC Details',          icon: IdCard,    mandatory: true  },
  { id: 3, title: 'Address Details',      icon: MapPin,    mandatory: true  },
  { id: 4, title: 'Employment Details',   icon: Briefcase, mandatory: true  },
  { id: 5, title: 'Income & Bank',        icon: Banknote,  mandatory: true  },
  { id: 6, title: 'Loan Details',         icon: DollarSign,mandatory: true  },
  { id: 7, title: 'Co-Applicant',         icon: UserPlus,  mandatory: false },
  { id: 8, title: 'Declaration',          icon: FileCheck, mandatory: true  },
];
const TOTAL_SECTIONS = SECTIONS.length;

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
  const loanTypes = loanTypesResponse?.data || [];

  const [leadNumber, setLeadNumber] = useState('');
  const { refetch: fetchLead, isFetching: leadLoading } = useLeadSearch(leadNumber, false);

  const [formData, setFormData] = useState({ ...initialFormState, ...initialData });
  const [currentSection, setCurrentSection] = useState(1);
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
    if (errors[field]) setErrors(prev => { const e = { ...prev }; delete e[field]; return e; });
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

  // ── Validation ────────────────────────────────────────────────────────────
  const validateSection = (section) => {
    const e = {};
    if (section === 1) {
      if (!formData.title)         e.title         = 'Title is required';
      if (!formData.firstName?.trim()) e.firstName = 'First name is required';
      if (!/^[6-9]\d{9}$/.test(formData.contactNumber)) e.contactNumber = 'Valid 10-digit mobile required';
      if (!formData.dob)           e.dob           = 'Date of birth is required';
      if (!formData.gender)        e.gender        = 'Gender is required';
      if (!formData.maritalStatus) e.maritalStatus = 'Marital status is required';
      if (!formData.nationality?.trim()) e.nationality = 'Nationality is required';
      if (!formData.category)      e.category      = 'Category is required';
    }
    if (section === 2) {
      if (!/^\d{12}$/.test(formData.aadhaarNumber)) e.aadhaarNumber = 'Valid 12-digit Aadhaar required';
      if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber)) e.panNumber = 'Valid PAN required (e.g. ABCDE1234F)';
    }
    if (section === 3) {
      if (!formData.address?.trim()) e.address = 'Address is required';
      if (!formData.city?.trim())    e.city    = 'City is required';
      if (!formData.state?.trim())   e.state   = 'State is required';
      if (!/^\d{6}$/.test(formData.pinCode)) e.pinCode = 'Valid 6-digit pin code required';
    }
    if (section === 4) {
      if (!formData.employmentType) e.employmentType = 'Employment type is required';
    }
    if (section === 5) {
      if (!formData.monthlyIncome || Number(formData.monthlyIncome) < 0) e.monthlyIncome = 'Valid monthly income required';
      if (!formData.annualIncome  || Number(formData.annualIncome)  < 0) e.annualIncome  = 'Valid annual income required';
      if (!formData.bankName?.trim())          e.bankName          = 'Bank name is required';
      if (!formData.bankAccountNumber?.trim()) e.bankAccountNumber = 'Account number is required';
      if (!formData.ifscCode?.trim())          e.ifscCode          = 'IFSC code is required';
      if (!formData.accountType)               e.accountType       = 'Account type is required';
    }
    if (section === 6) {
      if (!formData.loanTypeId)      e.loanTypeId      = 'Loan type is required';
      if (!formData.requestedAmount || Number(formData.requestedAmount) <= 0) e.requestedAmount = 'Valid loan amount required';
      if (!formData.tenureMonths)    e.tenureMonths    = 'Tenure is required';
    }
    if (section === 8) {
      if (!formData._termsAccepted)          e._termsAccepted          = 'Must accept terms';
      if (!formData._creditCheckAuthorized)  e._creditCheckAuthorized  = 'Must authorize credit check';
      if (!formData._detailsConfirmed)       e._detailsConfirmed       = 'Must confirm details';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const nextSection = () => {
    if (validateSection(currentSection)) setCurrentSection(p => Math.min(p + 1, TOTAL_SECTIONS));
  };
  const prevSection = () => setCurrentSection(p => Math.max(p - 1, 1));

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateSection(currentSection)) return;

    // Build payload exactly as schema expects
    const payload = {
      title:           formData.title,
      firstName:       formData.firstName,
      lastName:        formData.lastName       || undefined,
      middleName:      formData.middleName     || undefined,
      gender:          formData.gender,
      dob:             formData.dob,
      contactNumber:   formData.contactNumber,
      alternateNumber: formData.alternateNumber || undefined,
      email:           formData.email          || undefined,
      maritalStatus:   formData.maritalStatus,
      nationality:     formData.nationality,
      category:        formData.category,
      spouseName:      formData.spouseName     || undefined,
      passportNumber:  formData.passportNumber || undefined,
      aadhaarNumber:   formData.aadhaarNumber,
      panNumber:       formData.panNumber,
      voterId:         formData.voterId        || undefined,

      address:  formData.address,
      city:     formData.city,
      state:    formData.state,
      pinCode:  formData.pinCode,

      employmentType: formData.employmentType,

      monthlyIncome: Number(formData.monthlyIncome),
      annualIncome:  Number(formData.annualIncome),
      otherIncome:   formData.otherIncome ? Number(formData.otherIncome) : undefined,

      bankName:          formData.bankName,
      bankAccountNumber: formData.bankAccountNumber,
      ifscCode:          formData.ifscCode,
      accountType:       formData.accountType,

      loanTypeId:      formData.loanTypeId,
      requestedAmount: Number(formData.requestedAmount),
      tenureMonths:    formData.tenureMonths ? Number(formData.tenureMonths) : undefined,
      interestRate:    formData.interestRate  ? Number(formData.interestRate)  : undefined,
      interestType:    formData.interestType  || undefined,
      emiAmount:       formData.emiAmount     ? Number(formData.emiAmount)     : undefined,
      loanPurpose:     formData.loanPurpose   || undefined,
      purposeDetails:  formData.purposeDetails|| undefined,
      cibilScore:      formData.cibilScore    ? Number(formData.cibilScore)    : undefined,

      coApplicantName:     formData.coApplicantName     || undefined,
      coApplicantContact:  formData.coApplicantContact  || undefined,
      coApplicantIncome:   formData.coApplicantIncome   ? Number(formData.coApplicantIncome) : undefined,
      coApplicantPan:      formData.coApplicantPan      || undefined,
      coApplicantAadhaar:  formData.coApplicantAadhaar  || undefined,
      coApplicantRelation: formData.coApplicantRelation || undefined,

      coApplicants: formData.coApplicants.length > 0
        ? formData.coApplicants.map(ca => ({
            firstName:      ca.firstName,
            lastName:       ca.lastName      || undefined,
            middleName:     ca.middleName    || undefined,
            relation:       ca.relation,
            contactNumber:  ca.contactNumber,
            email:          ca.email         || undefined,
            dob:            ca.dob           ? new Date(ca.dob) : undefined,
            panNumber:      ca.panNumber     || undefined,
            aadhaarNumber:  ca.aadhaarNumber || undefined,
            employmentType: ca.employmentType,
            monthlyIncome:  ca.monthlyIncome ? Number(ca.monthlyIncome) : undefined,
          }))
        : undefined,

      branchId: user?.branchId,
      status: 'draft',
    };

    console.log('🚀 PAYLOAD:', payload);
    submitLoan(payload);
  };

  // ── Lead fetch ────────────────────────────────────────────────────────────
  const fetchLeadByNumber = async () => {
    if (!leadNumber) return;
    const res = await fetchLead();
    const lead = res?.data;
    if (!lead) { toast.error('Lead not found'); return; }
    setFormData(prev => ({
      ...prev,
      firstName:      lead.fullName?.split(' ')[0] || '',
      lastName:       lead.fullName?.split(' ').slice(1).join(' ') || '',
      contactNumber:  lead.contactNumber || '',
      email:          lead.email || '',
      city:           lead.city  || '',
      state:          lead.state || '',
      loanTypeId:     lead.loanTypeId  || '',
      requestedAmount:lead.loanAmount  || '',
    }));
    toast.success('Lead data fetched successfully');
  };

  // ── Error display helper ──────────────────────────────────────────────────
  const Err = ({ field }) => errors[field]
    ? <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
    : null;

  const inputCls = (field) =>
    `w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
      errors[field] ? 'border-red-500' : 'border-gray-300'
    }`;

  // ── Render sections ───────────────────────────────────────────────────────
  const renderSection = () => {
    switch (currentSection) {
      // ── SECTION 1: Personal Details ──────────────────────────────────────
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <User size={20} /> Personal Details
            </h3>

            {/* Lead lookup */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lead Number (Optional – auto-fills form)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={leadNumber}
                  onChange={e => setLeadNumber(e.target.value)}
                  placeholder="Enter Lead Number"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                />
                <button
                  type="button"
                  onClick={fetchLeadByNumber}
                  disabled={!leadNumber || leadLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {leadLoading ? 'Fetching…' : 'Fetch'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title <span className="text-red-500">*</span>
                </label>
                <select value={formData.title} onChange={e => handleChange('title', e.target.value)} className={inputCls('title')}>
                  <option value="">Select</option>
                  {TITLE_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <Err field="title" />
              </div>

              {/* firstName */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input type="text" value={formData.firstName} onChange={e => handleChange('firstName', e.target.value)} className={inputCls('firstName')} />
                <Err field="firstName" />
              </div>

              {/* middleName */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
                <input type="text" value={formData.middleName} onChange={e => handleChange('middleName', e.target.value)} className={inputCls('middleName')} />
              </div>

              {/* lastName */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input type="text" value={formData.lastName} onChange={e => handleChange('lastName', e.target.value)} className={inputCls('lastName')} />
              </div>

              {/* contactNumber */}
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
                />
                <Err field="contactNumber" />
              </div>

              {/* alternateNumber */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alternate Number</label>
                <input
                  type="tel"
                  value={formData.alternateNumber}
                  onChange={e => handleChange('alternateNumber', e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className={inputCls('alternateNumber')}
                  maxLength={10}
                />
              </div>

              {/* email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" value={formData.email} onChange={e => handleChange('email', e.target.value)} className={inputCls('email')} />
              </div>

              {/* dob */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input type="date" value={formData.dob} onChange={e => handleChange('dob', e.target.value)} className={inputCls('dob')} />
                <Err field="dob" />
              </div>

              {/* gender */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select value={formData.gender} onChange={e => handleChange('gender', e.target.value)} className={inputCls('gender')}>
                  <option value="">Select</option>
                  {GENDER_OPTIONS.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
                <Err field="gender" />
              </div>

              {/* maritalStatus */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Marital Status <span className="text-red-500">*</span>
                </label>
                <select value={formData.maritalStatus} onChange={e => handleChange('maritalStatus', e.target.value)} className={inputCls('maritalStatus')}>
                  <option value="">Select</option>
                  {MARITAL_STATUS_OPTIONS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                <Err field="maritalStatus" />
              </div>

              {/* spouseName */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Spouse Name</label>
                <input type="text" value={formData.spouseName} onChange={e => handleChange('spouseName', e.target.value)} className={inputCls('spouseName')} />
              </div>

              {/* nationality */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nationality <span className="text-red-500">*</span>
                </label>
                <input type="text" value={formData.nationality} onChange={e => handleChange('nationality', e.target.value)} className={inputCls('nationality')} />
                <Err field="nationality" />
              </div>

              {/* category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <select value={formData.category} onChange={e => handleChange('category', e.target.value)} className={inputCls('category')}>
                  <option value="">Select</option>
                  {CATEGORY_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <Err field="category" />
              </div>
            </div>
          </div>
        );

      // ── SECTION 2: KYC ───────────────────────────────────────────────────
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <IdCard size={20} /> KYC Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* aadhaarNumber */}
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
                  placeholder="12-digit Aadhaar"
                />
                <Err field="aadhaarNumber" />
              </div>

              {/* panNumber */}
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

              {/* voterId */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Voter ID (Optional)</label>
                <input type="text" value={formData.voterId} onChange={e => handleChange('voterId', e.target.value)} className={inputCls('voterId')} />
              </div>

              {/* passportNumber */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Passport Number (Optional)</label>
                <input type="text" value={formData.passportNumber} onChange={e => handleChange('passportNumber', e.target.value)} className={inputCls('passportNumber')} />
              </div>
            </div>
          </div>
        );

      // ── SECTION 3: Address ───────────────────────────────────────────────
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <MapPin size={20} /> Address Details
            </h3>
            <p className="text-sm text-gray-500">Note: Schema stores a single address (address, city, state, pinCode).</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* address */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address <span className="text-red-500">*</span>
                </label>
                <input type="text" value={formData.address} onChange={e => handleChange('address', e.target.value)} className={inputCls('address')} placeholder="Full address" />
                <Err field="address" />
              </div>

              {/* city */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City <span className="text-red-500">*</span>
                </label>
                <input type="text" value={formData.city} onChange={e => handleChange('city', e.target.value)} className={inputCls('city')} />
                <Err field="city" />
              </div>

              {/* state */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State <span className="text-red-500">*</span>
                </label>
                <input type="text" value={formData.state} onChange={e => handleChange('state', e.target.value)} className={inputCls('state')} />
                <Err field="state" />
              </div>

              {/* pinCode */}
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

      // ── SECTION 4: Employment ────────────────────────────────────────────
      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Briefcase size={20} /> Employment Details
            </h3>
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
                    className={`px-4 py-2 rounded-lg border font-medium transition-colors capitalize ${
                      formData.employmentType === type
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
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

      // ── SECTION 5: Income & Bank ─────────────────────────────────────────
      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Banknote size={20} /> Income & Bank Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Income */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-700">Income Details</h4>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Monthly Income (₹) <span className="text-red-500">*</span>
                  </label>
                  <input type="number" min="0" value={formData.monthlyIncome} onChange={e => handleChange('monthlyIncome', e.target.value)} className={inputCls('monthlyIncome')} />
                  <Err field="monthlyIncome" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Annual Income (₹) <span className="text-red-500">*</span>
                  </label>
                  <input type="number" min="0" value={formData.annualIncome} onChange={e => handleChange('annualIncome', e.target.value)} className={inputCls('annualIncome')} />
                  <Err field="annualIncome" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Other Income (₹)</label>
                  <input type="number" min="0" value={formData.otherIncome} onChange={e => handleChange('otherIncome', e.target.value)} className={inputCls('otherIncome')} />
                </div>
              </div>

              {/* Bank */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-700">Bank Details</h4>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bank Name <span className="text-red-500">*</span>
                  </label>
                  <input type="text" value={formData.bankName} onChange={e => handleChange('bankName', e.target.value)} className={inputCls('bankName')} />
                  <Err field="bankName" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bank Account Number <span className="text-red-500">*</span>
                  </label>
                  <input type="text" value={formData.bankAccountNumber} onChange={e => handleChange('bankAccountNumber', e.target.value)} className={inputCls('bankAccountNumber')} />
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

      // ── SECTION 6: Loan Details ──────────────────────────────────────────
      case 6:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <DollarSign size={20} /> Loan Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* loanTypeId */}
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

              {/* requestedAmount */}
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
                />
                <Err field="requestedAmount" />
              </div>

              {/* tenureMonths */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tenure (Months) <span className="text-red-500">*</span>
                </label>
                <select value={formData.tenureMonths} onChange={e => handleChange('tenureMonths', e.target.value)} className={inputCls('tenureMonths')}>
                  <option value="">Select</option>
                  {TENURE_OPTIONS.map(t => <option key={t} value={t}>{t} Months</option>)}
                </select>
                <Err field="tenureMonths" />
              </div>

              {/* interestRate */}
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
                />
              </div>

              {/* interestType */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Interest Type</label>
                <select value={formData.interestType} onChange={e => handleChange('interestType', e.target.value)} className={inputCls('interestType')}>
                  <option value="">Select</option>
                  {INTEREST_TYPE_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              {/* emiAmount (auto-calculated, read-only) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">EMI Amount (₹) – Auto-calculated</label>
                <input
                  type="text"
                  value={formData.emiAmount ? `₹${Number(formData.emiAmount).toLocaleString('en-IN')}` : ''}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-lg text-gray-600"
                />
              </div>

              {/* cibilScore */}
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

              {/* loanPurpose */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Loan Purpose</label>
                <input type="text" value={formData.loanPurpose} onChange={e => handleChange('loanPurpose', e.target.value)} className={inputCls('loanPurpose')} placeholder="e.g. Home Renovation" />
              </div>

              {/* purposeDetails */}
              <div className="lg:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Purpose Details</label>
                <input type="text" value={formData.purposeDetails} onChange={e => handleChange('purposeDetails', e.target.value)} className={inputCls('purposeDetails')} placeholder="Additional details" />
              </div>
            </div>

            {/* Loan Summary */}
            {formData.emiAmount > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2">Loan Summary</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-blue-600">Requested Amount</p>
                    <p className="font-semibold">₹{Number(formData.requestedAmount).toLocaleString('en-IN')}</p>
                  </div>
                  <div>
                    <p className="text-xs text-blue-600">Monthly EMI</p>
                    <p className="font-semibold">₹{Number(formData.emiAmount).toLocaleString('en-IN')}</p>
                  </div>
                  <div>
                    <p className="text-xs text-blue-600">Total Interest</p>
                    <p className="font-semibold">
                      ₹{(Number(formData.emiAmount) * Number(formData.tenureMonths) - Number(formData.requestedAmount)).toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-blue-600">Total Payable</p>
                    <p className="font-semibold">
                      ₹{(Number(formData.emiAmount) * Number(formData.tenureMonths)).toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      // ── SECTION 7: Co-Applicant ──────────────────────────────────────────
      case 7:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <UserPlus size={20} /> Co-Applicant / Guarantor Details (Optional)
            </h3>

            {/* Simple single co-applicant fields (legacy schema top-level fields) */}
            <div className="border border-gray-200 rounded-lg p-4 space-y-4">
              <h4 className="font-medium text-gray-700">Primary Co-Applicant</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Co-Applicant Name</label>
                  <input type="text" value={formData.coApplicantName} onChange={e => handleChange('coApplicantName', e.target.value)} className={inputCls('coApplicantName')} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                  <input
                    type="tel"
                    value={formData.coApplicantContact}
                    onChange={e => handleChange('coApplicantContact', e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className={inputCls('coApplicantContact')}
                    maxLength={10}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Income (₹)</label>
                  <input type="number" min="0" value={formData.coApplicantIncome} onChange={e => handleChange('coApplicantIncome', e.target.value)} className={inputCls('coApplicantIncome')} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">PAN Number</label>
                  <input type="text" value={formData.coApplicantPan} onChange={e => handleChange('coApplicantPan', e.target.value.toUpperCase())} className={inputCls('coApplicantPan')} maxLength={10} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Aadhaar Number</label>
                  <input type="text" value={formData.coApplicantAadhaar} onChange={e => handleChange('coApplicantAadhaar', e.target.value.replace(/\D/g, '').slice(0, 12))} className={inputCls('coApplicantAadhaar')} maxLength={12} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Relation</label>
                  <select value={formData.coApplicantRelation} onChange={e => handleChange('coApplicantRelation', e.target.value)} className={inputCls('coApplicantRelation')}>
                    <option value="">Select</option>
                    {CO_APPLICANT_RELATION_OPTIONS.map(r => <option key={r} value={r}>{r.replace('_', ' ')}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Additional co-applicants array */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-700">Additional Co-Applicants</h4>
                <button type="button" onClick={addCoApplicant} className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 flex items-center gap-1">
                  <UserPlus size={14} /> Add Co-Applicant
                </button>
              </div>

              {formData.coApplicants.map((ca, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h5 className="font-medium text-gray-700">Co-Applicant #{idx + 1}</h5>
                    <button type="button" onClick={() => removeCoApplicant(idx)} className="text-red-500 hover:text-red-700">
                      <X size={18} />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name <span className="text-red-500">*</span></label>
                      <input type="text" value={ca.firstName} onChange={e => updateCoApplicant(idx, 'firstName', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
                      <input type="text" value={ca.middleName} onChange={e => updateCoApplicant(idx, 'middleName', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input type="text" value={ca.lastName} onChange={e => updateCoApplicant(idx, 'lastName', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Relation <span className="text-red-500">*</span></label>
                      <select value={ca.relation} onChange={e => updateCoApplicant(idx, 'relation', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                        <option value="">Select</option>
                        {CO_APPLICANT_RELATION_OPTIONS.map(r => <option key={r} value={r}>{r.replace('_', ' ')}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number <span className="text-red-500">*</span></label>
                      <input type="tel" value={ca.contactNumber} onChange={e => updateCoApplicant(idx, 'contactNumber', e.target.value.replace(/\D/g, '').slice(0, 10))} className="w-full px-3 py-2 border border-gray-300 rounded-lg" maxLength={10} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input type="email" value={ca.email} onChange={e => updateCoApplicant(idx, 'email', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                      <input type="date" value={ca.dob} onChange={e => updateCoApplicant(idx, 'dob', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">PAN Number</label>
                      <input type="text" value={ca.panNumber} onChange={e => updateCoApplicant(idx, 'panNumber', e.target.value.toUpperCase())} className="w-full px-3 py-2 border border-gray-300 rounded-lg" maxLength={10} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Aadhaar Number</label>
                      <input type="text" value={ca.aadhaarNumber} onChange={e => updateCoApplicant(idx, 'aadhaarNumber', e.target.value.replace(/\D/g, '').slice(0, 12))} className="w-full px-3 py-2 border border-gray-300 rounded-lg" maxLength={12} />
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
                      <input type="number" min="0" value={ca.monthlyIncome} onChange={e => updateCoApplicant(idx, 'monthlyIncome', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      // ── SECTION 8: Declaration ───────────────────────────────────────────
      case 8:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <FileCheck size={20} /> Declaration & Consent
            </h3>
            <div className="space-y-4">
              {[
                { key: '_termsAccepted',         label: 'I agree to the Terms & Conditions',                        desc: 'I have read and understood all terms and conditions related to this loan application.' },
                { key: '_creditCheckAuthorized',  label: 'I authorize the company to check my credit score',         desc: 'I authorize the NBFC to verify my credit history with credit bureaus.' },
                { key: '_detailsConfirmed',       label: 'I confirm all provided details are correct',               desc: 'I declare that all information provided is true and accurate to the best of my knowledge.' },
              ].map(({ key, label, desc }) => (
                <div key={key} className={`p-4 border rounded-lg ${errors[key] ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}>
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id={key}
                      checked={formData[key]}
                      onChange={e => handleChange(key, e.target.checked)}
                      className="mt-1 rounded"
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

  // ── Progress ──────────────────────────────────────────────────────────────
  const progress = Math.round((currentSection / TOTAL_SECTIONS) * 100);

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isEditMode ? 'Edit Loan Application' : 'New Loan Application'}
            </h1>
            <p className="text-gray-500 text-sm">Application ID: {formData._applicationId}</p>
          </div>
          <div className="text-right text-sm text-gray-500">
            <div>Status: <span className="font-medium text-blue-600">Draft</span></div>
          </div>
        </div>

        {/* Section tabs */}
        <div className="flex flex-wrap gap-2 mb-4">
          {SECTIONS.map(section => (
            <button
              key={section.id}
              type="button"
              onClick={() => setCurrentSection(section.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                currentSection === section.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <section.icon size={14} />
              {section.title}
              {section.mandatory && <span className={currentSection === section.id ? 'text-blue-200' : 'text-red-500'}>*</span>}
            </button>
          ))}
        </div>

        {/* Progress bar */}
        <div>
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Section {currentSection} of {TOTAL_SECTIONS}</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="mb-8">{renderSection()}</div>

        {/* Status messages */}
        <div className="mb-4">
          {isPending  && <p className="text-blue-600 font-medium">Saving application…</p>}
          {isSuccess  && <p className="text-green-600 font-semibold">✅ Application successfully created</p>}
          {error      && <p className="text-red-600 font-semibold">❌ {error?.response?.data?.message || error.message || 'Something went wrong'}</p>}
        </div>

        {/* Navigation buttons */}
        <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={prevSection}
            disabled={currentSection === 1}
            className="px-5 py-2.5 border border-gray-300 rounded-lg font-medium disabled:opacity-40 hover:bg-gray-50 transition-colors"
          >
            Previous
          </button>

          {currentSection < TOTAL_SECTIONS ? (
            <button
              type="button"
              onClick={nextSection}
              className="ml-auto px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
            >
              Next
            </button>
          ) : (
            <>
              {onSaveDraft && (
                <button type="button" onClick={() => onSaveDraft(formData)} className="px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors">
                  Save as Draft
                </button>
              )}
              <button type="submit" disabled={isPending} className="ml-auto px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium disabled:opacity-50 transition-colors">
                {isPending ? 'Submitting…' : 'Submit Application'}
              </button>
            </>
          )}

          {onCancel && (
            <button type="button" onClick={onCancel} className="px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoanApplicationForm;