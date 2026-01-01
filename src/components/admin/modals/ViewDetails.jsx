import React, { useState, useEffect } from "react";
import {
  X,
  User,
  FileText,
  CreditCard,
  Home,
  Briefcase,
  BookOpen,
  Car,
  DollarSign,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Shield,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  Eye,
  BanknoteIcon,
  Users,
  Building,
  IndianRupee
} from "lucide-react";

const ViewDetails = ({ isOpen, onClose, loanId }) => {
  // Sample loan data (in real app, fetch from API based on loanId)
  const [loanData, setLoanData] = useState(null);

  // Fetch loan data when popup opens
  useEffect(() => {
    if (isOpen && loanId) {
      // Simulating API call
      setTimeout(() => {
        // Sample data structure matching loan creation form
        setLoanData({
          // 1. Customer Details
          customerDetails: {
            customerName: "Rajesh Kumar",
            customerId: "CUST2025001",
            fatherName: "Suresh Kumar",
            spouseName: "Priya Kumar",
            dateOfBirth: "1985-05-15",
            gender: "Male",
            mobile: "+91 9876543210",
            alternateMobile: "+91 8765432109",
            email: "rajesh.kumar@email.com",
            currentAddress: "Flat 201, Sunrise Apartments, MG Road, Bangalore, Karnataka - 560001",
            permanentAddress: "House No. 45, Gandhi Nagar, Patna, Bihar - 800001"
          },
          
          // 2. KYC & Identity Details
          kycDetails: {
            aadhaarNumber: "XXXX XXXX 1234",
            panNumber: "ABCDE1234F",
            otherId: "DL-04-2020-1234567",
            kycStatus: "Verified",
            kycVerificationDate: "2025-01-10"
          },
          
          // 3. Loan Application Details
          applicationDetails: {
            loanId: "LN20250001",
            loanType: "Home Loan",
            loanPurpose: "Purchase of Residential Property",
            applicationDate: "2025-01-15",
            branch: "Bangalore Main",
            loanOfficer: "Priya Sharma",
            relationshipManager: "Amit Patel",
            applicationStatus: "Approved",
            riskCategory: "A"
          },
          
          // 4. Loan Financial Details
          financialDetails: {
            requestedAmount: 5000000,
            approvedAmount: 4500000,
            interestRate: 8.5,
            tenureMonths: 240,
            emiAmount: 39075,
            repaymentFrequency: "Monthly",
            emiStartDate: "2025-02-01",
            emiEndDate: "2045-01-01",
            processingFee: 11250,
            insurancePremium: 45000,
            totalDisbursement: 4443750
          },
          
          // 5. Disbursement Details
          disbursementDetails: {
            status: "Disbursed",
            date: "2025-01-25",
            amount: 4443750,
            paymentMode: "NEFT",
            bankName: "State Bank of India",
            accountNumber: "XXXXXX1234",
            ifscCode: "SBIN0000123",
            utrNumber: "UTR20250125123456",
            disbursementOfficer: "Sunil Verma"
          },
          
          // 6. Documents Uploaded
          documents: {
            customerPhoto: { name: "customer_photo.jpg", uploaded: "2025-01-10", status: "Verified" },
            aadhaarCard: { name: "aadhaar_front_back.pdf", uploaded: "2025-01-10", status: "Verified" },
            panCard: { name: "pan_card.jpg", uploaded: "2025-01-10", status: "Verified" },
            addressProof: { name: "electricity_bill.pdf", uploaded: "2025-01-10", status: "Verified" },
            incomeProof: { name: "salary_slips.pdf", uploaded: "2025-01-11", status: "Verified" },
            loanAgreement: { name: "loan_agreement_signed.pdf", uploaded: "2025-01-20", status: "Verified" },
            nachForm: { name: "nach_mandate.pdf", uploaded: "2025-01-12", status: "Verified" },
            propertyDocuments: { name: "property_docs.zip", uploaded: "2025-01-15", status: "Verified" }
          },
          
          // 7. Loan Status Summary
          statusSummary: {
            currentStatus: "Disbursed",
            creationDate: "2025-01-15",
            approvalDate: "2025-01-20",
            disbursementDate: "2025-01-25",
            lastUpdated: "2025-01-25 14:30",
            updatedBy: "Admin User"
          }
        });
      }, 300);
    }
  }, [isOpen, loanId]);

  // Status badge component
  const StatusBadge = ({ status }) => {
    const config = {
      "Verified": "bg-green-100 text-green-800 border-green-200",
      "Disbursed": "bg-blue-100 text-blue-800 border-blue-200",
      "Approved": "bg-green-100 text-green-800 border-green-200",
      "Pending": "bg-yellow-100 text-yellow-800 border-yellow-200",
      "Rejected": "bg-red-100 text-red-800 border-red-200",
      "Draft": "bg-gray-100 text-gray-800 border-gray-200"
    };

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${config[status] || "bg-gray-100 text-gray-800"}`}>
        {status}
      </span>
    );
  };

  // Document card component
  const DocumentCard = ({ title, document, icon: Icon }) => (
    <div className="border rounded-lg p-4 hover:border-blue-300 transition-colors">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Icon size={18} className="text-blue-600" />
          </div>
          <div>
            <p className="font-medium text-gray-800">{title}</p>
            <p className="text-sm text-gray-500">{document?.name || "Not uploaded"}</p>
          </div>
        </div>
        {document && (
          <StatusBadge status={document.status} />
        )}
      </div>
      {document && (
        <div className="flex items-center justify-between mt-3 pt-3 border-t">
          <span className="text-sm text-gray-500">Uploaded: {document.uploaded}</span>
          <div className="flex gap-2">
            <button className="p-1 hover:bg-gray-100 rounded">
              <Eye size={16} />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded">
              <Download size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-200 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="text-blue-600" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Loan Entry Details</h2>
              <p className="text-sm text-gray-500">
                Loan ID: {loanData?.applicationDetails?.loanId || loanId}
                {loanData?.statusSummary?.currentStatus && (
                  <span className="ml-3">
                    Status: <StatusBadge status={loanData.statusSummary.currentStatus} />
                  </span>
                )}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* 1. Customer Details */}
          <div className="border rounded-xl overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <User className="text-blue-600" size={20} />
                Customer Details
              </h3>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DetailItem label="Customer Name" value={loanData?.customerDetails?.customerName} />
                <DetailItem label="Customer ID" value={loanData?.customerDetails?.customerId} />
                <DetailItem label="Father's Name" value={loanData?.customerDetails?.fatherName} />
                <DetailItem label="Spouse Name" value={loanData?.customerDetails?.spouseName} />
                <DetailItem label="Date of Birth" value={loanData?.customerDetails?.dateOfBirth} />
                <DetailItem label="Gender" value={loanData?.customerDetails?.gender} />
                <DetailItem label="Mobile Number" value={loanData?.customerDetails?.mobile} icon={Phone} />
                <DetailItem label="Alternate Mobile" value={loanData?.customerDetails?.alternateMobile} icon={Phone} />
                <DetailItem label="Email" value={loanData?.customerDetails?.email} icon={Mail} />
                <div className="md:col-span-2">
                  <DetailItem 
                    label="Current Address" 
                    value={loanData?.customerDetails?.currentAddress} 
                    icon={MapPin}
                    multiline
                  />
                </div>
                <div className="md:col-span-2">
                  <DetailItem 
                    label="Permanent Address" 
                    value={loanData?.customerDetails?.permanentAddress} 
                    icon={MapPin}
                    multiline
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 2. KYC & Identity Details */}
          <div className="border rounded-xl overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <Shield className="text-blue-600" size={20} />
                KYC & Identity Details
              </h3>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DetailItem label="Aadhaar Number" value={loanData?.kycDetails?.aadhaarNumber} />
                <DetailItem label="PAN Number" value={loanData?.kycDetails?.panNumber} />
                <DetailItem label="Other ID" value={loanData?.kycDetails?.otherId} />
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">KYC Status</p>
                  {loanData?.kycDetails?.kycStatus && (
                    <StatusBadge status={loanData.kycDetails.kycStatus} />
                  )}
                </div>
                <DetailItem label="KYC Verification Date" value={loanData?.kycDetails?.kycVerificationDate} icon={Calendar} />
              </div>
            </div>
          </div>

          {/* 3. Loan Application Details */}
          <div className="border rounded-xl overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <FileText className="text-blue-600" size={20} />
                Loan Application Details
              </h3>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DetailItem label="Loan ID" value={loanData?.applicationDetails?.loanId} highlight />
                <DetailItem label="Loan Type" value={loanData?.applicationDetails?.loanType} />
                <DetailItem label="Loan Purpose" value={loanData?.applicationDetails?.loanPurpose} multiline />
                <DetailItem label="Application Date" value={loanData?.applicationDetails?.applicationDate} icon={Calendar} />
                <DetailItem label="Branch" value={loanData?.applicationDetails?.branch} icon={Building} />
                <DetailItem label="Loan Officer" value={loanData?.applicationDetails?.loanOfficer} icon={Users} />
                <DetailItem label="Relationship Manager" value={loanData?.applicationDetails?.relationshipManager} icon={Users} />
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Application Status</p>
                  {loanData?.applicationDetails?.applicationStatus && (
                    <StatusBadge status={loanData.applicationDetails.applicationStatus} />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 4. Loan Financial Details */}
          <div className="border rounded-xl overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <IndianRupee className="text-blue-600" size={20} />
                Loan Financial Details
              </h3>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DetailItem label="Requested Loan Amount" value={loanData?.financialDetails?.requestedAmount && formatCurrency(loanData.financialDetails.requestedAmount)} />
                <DetailItem label="Approved Loan Amount" value={loanData?.financialDetails?.approvedAmount && formatCurrency(loanData.financialDetails.approvedAmount)} highlight />
                <DetailItem label="Interest Rate" value={loanData?.financialDetails?.interestRate && `${loanData.financialDetails.interestRate}% p.a.`} />
                <DetailItem label="Tenure" value={loanData?.financialDetails?.tenureMonths && `${loanData.financialDetails.tenureMonths} months (${Math.floor(loanData.financialDetails.tenureMonths/12)} years)`} />
                <DetailItem label="EMI Amount" value={loanData?.financialDetails?.emiAmount && formatCurrency(loanData.financialDetails.emiAmount)} />
                <DetailItem label="Repayment Frequency" value={loanData?.financialDetails?.repaymentFrequency} />
                <DetailItem label="EMI Start Date" value={loanData?.financialDetails?.emiStartDate} icon={Calendar} />
                <DetailItem label="EMI End Date" value={loanData?.financialDetails?.emiEndDate} icon={Calendar} />
                <DetailItem label="Processing Fee" value={loanData?.financialDetails?.processingFee && formatCurrency(loanData.financialDetails.processingFee)} />
                <DetailItem label="Insurance Premium" value={loanData?.financialDetails?.insurancePremium && formatCurrency(loanData.financialDetails.insurancePremium)} />
                <DetailItem 
                  label="Total Disbursement" 
                  value={loanData?.financialDetails?.totalDisbursement && formatCurrency(loanData.financialDetails.totalDisbursement)} 
                  highlight 
                />
              </div>
            </div>
          </div>

          {/* 5. Disbursement Details */}
          <div className="border rounded-xl overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <BanknoteIcon className="text-blue-600" size={20} />
                Disbursement Details
              </h3>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Disbursement Status</p>
                  {loanData?.disbursementDetails?.status && (
                    <StatusBadge status={loanData.disbursementDetails.status} />
                  )}
                </div>
                <DetailItem label="Disbursement Date" value={loanData?.disbursementDetails?.date} icon={Calendar} />
                <DetailItem label="Disbursed Amount" value={loanData?.disbursementDetails?.amount && formatCurrency(loanData.disbursementDetails.amount)} highlight />
                <DetailItem label="Payment Mode" value={loanData?.disbursementDetails?.paymentMode} />
                <DetailItem label="Bank Name" value={loanData?.disbursementDetails?.bankName} />
                <DetailItem label="Account Number" value={loanData?.disbursementDetails?.accountNumber} />
                <DetailItem label="IFSC Code" value={loanData?.disbursementDetails?.ifscCode} />
                <DetailItem label="UTR Number" value={loanData?.disbursementDetails?.utrNumber} />
                <DetailItem label="Disbursement Officer" value={loanData?.disbursementDetails?.disbursementOfficer} icon={Users} />
              </div>
            </div>
          </div>

          {/* 6. Documents Uploaded */}
          <div className="border rounded-xl overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <FileText className="text-blue-600" size={20} />
                Documents Uploaded
              </h3>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <DocumentCard title="Customer Photo" document={loanData?.documents?.customerPhoto} icon={User} />
                <DocumentCard title="Aadhaar Card" document={loanData?.documents?.aadhaarCard} icon={Shield} />
                <DocumentCard title="PAN Card" document={loanData?.documents?.panCard} icon={FileText} />
                <DocumentCard title="Address Proof" document={loanData?.documents?.addressProof} icon={MapPin} />
                <DocumentCard title="Income Proof" document={loanData?.documents?.incomeProof} icon={DollarSign} />
                <DocumentCard title="Loan Agreement" document={loanData?.documents?.loanAgreement} icon={FileText} />
                <DocumentCard title="NACH Form" document={loanData?.documents?.nachForm} icon={CreditCard} />
                <DocumentCard title="Property Documents" document={loanData?.documents?.propertyDocuments} icon={Home} />
              </div>
            </div>
          </div>

          {/* 7. Loan Status Summary */}
          <div className="border rounded-xl overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <CheckCircle className="text-blue-600" size={20} />
                Loan Status Summary
              </h3>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Current Loan Status</p>
                  {loanData?.statusSummary?.currentStatus && (
                    <StatusBadge status={loanData.statusSummary.currentStatus} />
                  )}
                </div>
                <DetailItem label="Loan Creation Date" value={loanData?.statusSummary?.creationDate} icon={Calendar} />
                <DetailItem label="Approval Date" value={loanData?.statusSummary?.approvalDate} icon={Calendar} />
                <DetailItem label="Disbursement Date" value={loanData?.statusSummary?.disbursementDate} icon={Calendar} />
                <DetailItem label="Last Updated" value={loanData?.statusSummary?.lastUpdated} />
                <DetailItem label="Updated By" value={loanData?.statusSummary?.updatedBy} icon={Users} />
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="border-t p-6">
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              Close Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Detail Item Component
const DetailItem = ({ label, value, icon: Icon, highlight = false, multiline = false }) => {
  if (!value) return null;
  
  return (
    <div>
      <div className="flex items-center gap-1 mb-1">
        {Icon && <Icon size={14} className="text-gray-400" />}
        <p className="text-sm font-medium text-gray-700">{label}</p>
      </div>
      <p className={`text-base ${multiline ? '' : 'truncate'} ${highlight ? 'font-bold text-blue-700' : 'text-gray-900'}`}>
        {value}
      </p>
    </div>
  );
};

export default ViewDetails;