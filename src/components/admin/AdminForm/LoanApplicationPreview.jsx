// LoanApplicationPreview.jsx
import React from 'react';
import {
  User, Phone, Mail, Calendar, MapPin, Briefcase,
  Banknote, FileText, Shield, CheckCircle,
  Home, Building, IndianRupee, Percent,
  Clock, Target, DollarSign, CreditCard, IdCard,
  File, FileCheck, UserPlus, Building2,
  Edit, Check, ArrowLeft, Download,
  AlertCircle, Info, Calculator
} from 'lucide-react';

const LoanApplicationPreview = ({
  formData,
  onEdit,
  onSubmit,
  onCancel,
  userRole = 'customer'
}) => {
  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Not provided';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Format currency
  const formatCurrency = (amount) => {
    if (!amount) return '₹0';
    return `₹${parseFloat(amount).toLocaleString('en-IN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    })}`;
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (!bytes) return '';
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(2)} MB`;
  };

  // Calculate loan summary
  const calculateLoanSummary = () => {
    const { loanAmount, tenureMonths, interestRate, emi } = formData.loanDetails;
    
    const principal = parseFloat(loanAmount) || 0;
    const months = parseInt(tenureMonths) || 0;
    const emiAmount = parseFloat(emi) || 0;
    
    const totalPayable = emiAmount * months;
    const totalInterest = totalPayable - principal;
    
    return {
      principal: formatCurrency(principal),
      emi: formatCurrency(emiAmount),
      totalInterest: formatCurrency(totalInterest),
      totalPayable: formatCurrency(totalPayable),
      tenure: `${months} months`
    };
  };

  const loanSummary = calculateLoanSummary();

  // Section rendering components
  const SectionHeader = ({ icon: Icon, title, children }) => (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-200">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Icon className="text-blue-600" size={20} />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      {children}
    </div>
  );

  const InfoRow = ({ label, value, icon: Icon, important = false }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-3 border-b border-gray-100">
      <div className="flex items-center gap-2">
        {Icon && <Icon size={16} className="text-gray-400" />}
        <span className="text-sm font-medium text-gray-600">{label}</span>
      </div>
      <div className="md:col-span-2">
        <p className={`text-sm ${important ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
          {value || 'Not provided'}
        </p>
      </div>
    </div>
  );

  const DocumentPreview = ({ document, label }) => {
    if (!document) return null;
    
    return (
      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex items-center gap-3">
          <File className="text-blue-600" size={18} />
          <div>
            <p className="text-sm font-medium text-gray-800">{document.name}</p>
            <p className="text-xs text-gray-500">
              {formatFileSize(document.size)} • {new Date(document.uploadedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {document.verified && (
            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
              <Check size={12} />
              Verified
            </span>
          )}
          <button
            type="button"
            className="p-1 hover:bg-gray-200 rounded"
            onClick={() => {/* Download functionality */}}
          >
            <Download size={16} className="text-gray-600" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Preview Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <FileCheck size={24} />
              Application Preview
            </h1>
            <p className="text-blue-100 mt-1">
              Review all details before submitting your loan application
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-3 py-1 bg-blue-500 rounded-full text-sm font-medium">
              Application ID: {formData.applicationId}
            </div>
            <div className="px-3 py-1 bg-blue-500/80 rounded-full text-sm font-medium">
              {formData.internalDetails.applicationStatus}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Loan Summary Card */}
        <div className="mb-8 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <Calculator className="text-blue-600" size={20} />
            <h3 className="font-semibold text-gray-800">Loan Summary</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-white rounded-lg border border-gray-200">
              <p className="text-xs text-gray-500 mb-1">Loan Amount</p>
              <p className="text-lg font-bold text-gray-900">{loanSummary.principal}</p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-gray-200">
              <p className="text-xs text-gray-500 mb-1">Monthly EMI</p>
              <p className="text-lg font-bold text-gray-900">{loanSummary.emi}</p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-gray-200">
              <p className="text-xs text-gray-500 mb-1">Total Interest</p>
              <p className="text-lg font-bold text-gray-900">{loanSummary.totalInterest}</p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-gray-200">
              <p className="text-xs text-gray-500 mb-1">Total Payable</p>
              <p className="text-lg font-bold text-gray-900">{loanSummary.totalPayable}</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-blue-100">
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-gray-500" />
                <span className="text-gray-600">Tenure: {loanSummary.tenure}</span>
              </div>
              <div className="flex items-center gap-2">
                <Percent size={14} className="text-gray-500" />
                <span className="text-gray-600">
                  Interest Rate: {formData.loanDetails.interestRate || 'N/A'}%
                </span>
              </div>
              {formData.loanDetails.purpose && (
                <div className="flex items-center gap-2">
                  <Target size={14} className="text-gray-500" />
                  <span className="text-gray-600">Purpose: {formData.loanDetails.purpose}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Personal Details */}
        <SectionHeader icon={User} title="Applicant Personal Details">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <InfoRow label="Full Name" value={`${formData.personalDetails.firstName} ${formData.personalDetails.middleName || ''} ${formData.personalDetails.lastName}`.trim()} icon={User} />
            <InfoRow label="Mobile" value={formData.personalDetails.mobile} icon={Phone} />
            <InfoRow label="Email" value={formData.personalDetails.email} icon={Mail} />
            <InfoRow label="Date of Birth" value={formatDate(formData.personalDetails.dob)} icon={Calendar} />
            <InfoRow label="Gender" value={formData.personalDetails.gender} icon={User} />
            <InfoRow label="Marital Status" value={formData.personalDetails.maritalStatus} icon={User} />
            <InfoRow label="Father/Spouse" value={formData.personalDetails.fatherSpouseName} icon={User} />
            <InfoRow label="Nationality" value={formData.personalDetails.nationality} icon={User} />
            <InfoRow label="Category" value={formData.personalDetails.category} icon={User} />
          </div>
        </SectionHeader>

        {/* KYC Details */}
        <SectionHeader icon={IdCard} title="KYC Details">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <InfoRow label="Aadhaar Number" value={formData.kycDetails.aadhaarNumber} icon={IdCard} />
              <InfoRow label="PAN Number" value={formData.kycDetails.panNumber} icon={CreditCard} />
              <InfoRow label="Voter ID" value={formData.kycDetails.voterId} icon={IdCard} />
              <InfoRow label="Passport" value={formData.kycDetails.passportNumber} icon={IdCard} />
            </div>
            <div className="space-y-4">
              <h4 className="font-medium text-gray-700 mb-2">Documents</h4>
              <DocumentPreview document={formData.kycDetails.aadhaarFront} label="Aadhaar Front" />
              <DocumentPreview document={formData.kycDetails.aadhaarBack} label="Aadhaar Back" />
              <DocumentPreview document={formData.kycDetails.panCardImage} label="PAN Card" />
            </div>
          </div>
        </SectionHeader>

        {/* Address Details */}
        <SectionHeader icon={MapPin} title="Address Details">
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-gray-700 mb-3">Current Address</h4>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-800">
                  {formData.addressDetails.currentAddress.line1}
                  {formData.addressDetails.currentAddress.line2 && `, ${formData.addressDetails.currentAddress.line2}`}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {formData.addressDetails.currentAddress.city}, {formData.addressDetails.currentAddress.state} - {formData.addressDetails.currentAddress.pincode}
                </p>
                {formData.addressDetails.currentAddress.residenceType && (
                  <p className="text-xs text-gray-500 mt-2">
                    Residence Type: {formData.addressDetails.currentAddress.residenceType}
                  </p>
                )}
              </div>
            </div>
            
            {!formData.addressDetails.sameAsCurrent && (
              <div>
                <h4 className="font-medium text-gray-700 mb-3">Permanent Address</h4>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-800">
                    {formData.addressDetails.permanentAddress.line1}
                    {formData.addressDetails.permanentAddress.line2 && `, ${formData.addressDetails.permanentAddress.line2}`}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {formData.addressDetails.permanentAddress.city}, {formData.addressDetails.permanentAddress.state} - {formData.addressDetails.permanentAddress.pincode}
                  </p>
                </div>
              </div>
            )}
          </div>
        </SectionHeader>

        {/* Employment Details */}
        <SectionHeader icon={Briefcase} title="Employment Details">
          {formData.employmentDetails.employmentType === 'Salaried' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoRow label="Employment Type" value="Salaried" icon={Briefcase} />
              <InfoRow label="Company Name" value={formData.employmentDetails.salariedDetails.companyName} icon={Building} />
              <InfoRow label="Designation" value={formData.employmentDetails.salariedDetails.designation} icon={User} />
              <InfoRow label="Monthly Salary" value={formatCurrency(formData.employmentDetails.salariedDetails.monthlySalary)} icon={IndianRupee} />
              <InfoRow label="Work Experience" value={formData.employmentDetails.salariedDetails.workExperience} icon={Clock} />
              <div className="md:col-span-2">
                <InfoRow label="Office Address" value={formData.employmentDetails.salariedDetails.officeAddress} icon={MapPin} />
              </div>
            </div>
          ) : formData.employmentDetails.employmentType === 'Self-Employed' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoRow label="Employment Type" value="Self-Employed" icon={Briefcase} />
              <InfoRow label="Business Name" value={formData.employmentDetails.selfEmployedDetails.businessName} icon={Building} />
              <InfoRow label="Business Type" value={formData.employmentDetails.selfEmployedDetails.businessType} icon={Briefcase} />
              <InfoRow label="Monthly Turnover" value={formatCurrency(formData.employmentDetails.selfEmployedDetails.monthlyTurnover)} icon={IndianRupee} />
              <InfoRow label="Annual Income" value={formatCurrency(formData.employmentDetails.selfEmployedDetails.annualIncome)} icon={IndianRupee} />
              <InfoRow label="Business Vintage" value={formData.employmentDetails.selfEmployedDetails.businessVintage} icon={Clock} />
            </div>
          ) : (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertCircle size={16} className="text-yellow-600" />
                <p className="text-sm text-yellow-800">Employment details not provided</p>
              </div>
            </div>
          )}
        </SectionHeader>

        {/* Income & Bank Details */}
        <SectionHeader icon={Banknote} title="Income & Bank Details">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-700 mb-2">Income Details</h4>
              <InfoRow label="Monthly Income" value={formatCurrency(formData.financialDetails.monthlyIncome)} icon={IndianRupee} />
              <InfoRow label="Other Income" value={formatCurrency(formData.financialDetails.otherIncome)} icon={IndianRupee} />
            </div>
            <div className="space-y-4">
              <h4 className="font-medium text-gray-700 mb-2">Bank Details</h4>
              <InfoRow label="Bank Name" value={formData.financialDetails.bankName} icon={Building} />
              <InfoRow label="Account Number" value={formData.financialDetails.accountNumber} icon={CreditCard} />
              <InfoRow label="IFSC Code" value={formData.financialDetails.ifscCode} icon={FileText} />
              <InfoRow label="Account Type" value={formData.financialDetails.accountType} icon={Banknote} />
            </div>
          </div>
          
          <div className="mt-6 space-y-4">
            <h4 className="font-medium text-gray-700 mb-2">Uploaded Documents</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <DocumentPreview document={formData.financialDetails.bankStatement} label="Bank Statement" />
              <DocumentPreview document={formData.financialDetails.salarySlips} label="Salary Slips" />
              <DocumentPreview document={formData.financialDetails.itrDocuments} label="ITR Documents" />
            </div>
          </div>
        </SectionHeader>

        {/* Co-Applicant Details */}
        {formData.coApplicant.hasCoApplicant && (
          <SectionHeader icon={UserPlus} title="Co-Applicant Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoRow label="Co-Applicant Name" value={formData.coApplicant.name} icon={User} />
              <InfoRow label="Relation" value={formData.coApplicant.relation} icon={UserPlus} />
              <InfoRow label="Mobile Number" value={formData.coApplicant.mobile} icon={Phone} />
              <InfoRow label="PAN/Aadhaar" value={formData.coApplicant.panOrAadhaar} icon={IdCard} />
              <InfoRow label="Income" value={formatCurrency(formData.coApplicant.income)} icon={IndianRupee} />
            </div>
          </SectionHeader>
        )}

        {/* Internal Sections (Admin/Employee only) */}
        {userRole !== 'customer' && (
          <>
            {/* Risk Assessment */}
            <SectionHeader icon={Shield} title="Credit & Risk Assessment">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <InfoRow label="CIBIL Score" value={formData.riskAssessment.cibilScore} icon={Percent} />
                <InfoRow label="Credit Status" value={formData.riskAssessment.creditStatus} icon={Shield} />
                <InfoRow label="FOIR %" value={formData.riskAssessment.foirPercentage} icon={Percent} />
                <InfoRow label="LTV %" value={formData.riskAssessment.ltvPercentage} icon={Percent} />
                <InfoRow label="Risk Category" value={formData.riskAssessment.riskCategory} icon={Shield} />
              </div>
              {formData.riskAssessment.internalRemarks && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm font-medium text-gray-700 mb-1">Internal Remarks</p>
                  <p className="text-sm text-gray-600">{formData.riskAssessment.internalRemarks}</p>
                </div>
              )}
            </SectionHeader>

            {/* Internal Assignment */}
            <SectionHeader icon={Building2} title="Internal Assignment">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <InfoRow label="Assigned Employee" value={formData.internalDetails.assignedEmployee} icon={User} />
                <InfoRow label="Assigned Partner" value={formData.internalDetails.assignedPartner} icon={UserPlus} />
                <InfoRow label="Branch Name" value={formData.internalDetails.branchName} icon={Building} />
                <InfoRow label="Application Source" value={formData.internalDetails.applicationSource} icon={FileText} />
                <InfoRow label="Application Status" value={formData.internalDetails.applicationStatus} icon={FileCheck} />
              </div>
            </SectionHeader>
          </>
        )}

        {/* Declarations */}
        <SectionHeader icon={CheckCircle} title="Declarations & Consent">
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle size={18} className="text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-800">✓ Terms & Conditions Accepted</p>
                <p className="text-xs text-green-600 mt-1">I have read and understood all terms and conditions</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle size={18} className="text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-800">✓ Credit Check Authorization</p>
                <p className="text-xs text-green-600 mt-1">I authorize the NBFC to verify my credit history</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle size={18} className="text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-800">✓ Details Confirmation</p>
                <p className="text-xs text-green-600 mt-1">All provided information is true and accurate</p>
              </div>
            </div>
          </div>
        </SectionHeader>

        {/* Action Bar */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors"
            >
              <ArrowLeft size={18} />
              Back to Form
            </button>
            
            <button
              type="button"
              onClick={onEdit}
              className="flex items-center justify-center gap-2 px-6 py-3 border border-blue-300 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 font-medium transition-colors"
            >
              <Edit size={18} />
              Edit Application
            </button>
            
            <button
              type="button"
              onClick={() => {
                const submissionData = {
                  ...formData,
                  submittedAt: new Date().toISOString(),
                  internalDetails: {
                    ...formData.internalDetails,
                    applicationStatus: 'Submitted'
                  }
                };
                onSubmit(submissionData);
              }}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors sm:ml-auto"
            >
              <CheckCircle size={18} />
              Confirm & Submit Application
            </button>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <Info size={18} className="text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-800">Important Note</p>
                <p className="text-sm text-blue-600 mt-1">
                  By submitting this application, you agree to all terms and conditions. 
                  Your application will be reviewed and you'll receive updates via email/SMS.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanApplicationPreview;