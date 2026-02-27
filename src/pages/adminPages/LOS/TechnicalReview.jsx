 import React, { useState } from 'react';
import {
  Building,
  Home,
  DollarSign,
  AlertTriangle,
  Save,
  User,
  MapPin,
  Calendar,
  Scale,
  ClipboardCheck,
  Building2,
  FileText,
  ChevronRight,
  CheckCircle,
  XCircle,
  AlertCircle,
  Percent,
  MessageSquare,
  Banknote,
  IndianRupee
} from 'lucide-react';

// Reusable Components
const Card = ({ children, title, icon: Icon }) => (
  <div className="bg-white rounded-2xl shadow-lg p-6">
    <div className="flex items-center mb-6">
      {Icon && <Icon className="w-6 h-6 text-blue-600 mr-3" />}
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
    </div>
    {children}
  </div>
);

const Badge = ({ children, color = 'blue' }) => {
  const colorClasses = {
    green: 'bg-green-100 text-green-800',
    red: 'bg-red-100 text-red-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    blue: 'bg-blue-100 text-blue-800',
    gray: 'bg-gray-100 text-gray-800',
    purple: 'bg-purple-100 text-purple-800'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${colorClasses[color]}`}>
      {children}
    </span>
  );
};

const ProgressBar = ({ percentage, label }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-sm text-gray-600">
      <span>{label}</span>
      <span>{percentage}%</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  </div>
);

const RiskFlag = ({ label, isPresent, severity }) => {
  const severityColors = {
    high: 'bg-red-50 border-red-200',
    medium: 'bg-yellow-50 border-yellow-200',
    low: 'bg-green-50 border-green-200'
  };

  return (
    <div className={`flex items-center justify-between p-3 rounded-lg border ${severityColors[severity]}`}>
      <span className="text-gray-700">{label}</span>
      {isPresent ? (
        <div className="flex items-center text-red-600">
          <AlertCircle className="w-4 h-4 mr-1" />
          <span className="text-sm font-medium">Yes</span>
        </div>
      ) : (
        <div className="flex items-center text-green-600">
          <CheckCircle className="w-4 h-4 mr-1" />
          <span className="text-sm font-medium">No</span>
        </div>
      )}
    </div>
  );
};

const DecisionOption = ({ value, label, icon: Icon, isSelected, onChange }) => (
  <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
    <input
      type="radio"
      name="decision"
      value={value}
      checked={isSelected}
      onChange={onChange}
      className="h-5 w-5 text-blue-600 focus:ring-blue-500"
    />
    {Icon && <Icon className="w-5 h-5 text-gray-500" />}
    <span className="text-gray-700 font-medium">{label}</span>
  </label>
);

function TechnicalReview() {
  // State for form fields
  const [decision, setDecision] = useState('approve');
  const [recommendedValue, setRecommendedValue] = useState('₹75,00,000');
  const [ltv, setLtv] = useState('65');
  const [riskGrade, setRiskGrade] = useState('B');
  const [remarks, setRemarks] = useState('');

  // Dummy data
  const loanSummary = {
    loanNumber: 'LN-2024-78945',
    applicantName: 'Rajesh Kumar',
    loanType: 'Home Loan',
    loanAmount: '₹85,00,000',
    branch: 'Mumbai Central',
    stage: 'Technical Review'
  };

  const propertyDetails = {
    propertyType: 'Residential Apartment',
    address: 'Sea View Apartments, 4th Floor',
    city: 'Mumbai',
    state: 'Maharashtra',
    pinCode: '400001',
    propertyAge: '5 years',
    builtUpArea: '1250 sq.ft.',
    carpetArea: '1100 sq.ft.',
    landArea: 'N/A',
    floors: '4th Floor (Total 12 floors)'
  };

  const valuationDetails = {
    marketValue: '₹90,00,000',
    distressValue: '₹72,00,000',
    governmentValue: '₹85,00,000',
    agreementValue: '₹92,00,000',
    valuationDate: '15 Nov 2024',
    valuerName: 'John Abraham & Associates',
    eligibleAmount: '₹58,50,000 (65% LTV)'
  };

  const constructionStatus = {
    stage: 'Under Construction',
    completion: 75,
    builderName: 'Prestige Constructions Ltd',
    reraNumber: 'RERA-MH-1234567',
    possessionDate: '30 Jun 2025'
  };

  const riskFlags = [
    { label: 'Encroachment', isPresent: false, severity: 'low' },
    { label: 'Access Issues', isPresent: true, severity: 'medium' },
    { label: 'Legal Dispute', isPresent: false, severity: 'low' },
    { label: 'Flood Zone', isPresent: true, severity: 'high' },
    { label: 'Illegal Construction', isPresent: false, severity: 'low' }
  ];

  const handleSaveReview = () => {
    alert('Review saved successfully!');
  };

  const handleApproveLegal = () => {
    alert('Property approved and moved to legal department!');
  };

  const handleRejectProperty = () => {
    alert('Property rejected!');
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center mb-2">
          <ChevronRight className="w-5 h-5 text-gray-400 mr-2" />
          <h1 className="text-3xl font-bold text-gray-900">Technical Review Management</h1>
        </div>
        <p className="text-gray-600">Property evaluation and valuation assessment</p>
      </div>

      {/* Loan Summary Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-xl">
            <label className="block text-sm text-gray-500 mb-1">Loan Number</label>
            <div className="flex items-center">
              <FileText className="w-4 h-4 text-blue-500 mr-2" />
              <p className="text-lg font-semibold text-blue-600">{loanSummary.loanNumber}</p>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-xl">
            <label className="block text-sm text-gray-500 mb-1">Applicant Name</label>
            <div className="flex items-center">
              <User className="w-4 h-4 text-gray-500 mr-2" />
              <p className="text-lg font-semibold">{loanSummary.applicantName}</p>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-xl">
            <label className="block text-sm text-gray-500 mb-1">Loan Type</label>
            <div className="flex items-center">
              <Banknote className="w-4 h-4 text-green-500 mr-2" />
              <p className="text-lg font-semibold">{loanSummary.loanType}</p>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-xl">
            <label className="block text-sm text-gray-500 mb-1">Loan Amount</label>
            <div className="flex items-center">
              <IndianRupee className="w-4 h-4 text-green-500 mr-2" />
              <p className="text-lg font-semibold text-green-600">{loanSummary.loanAmount}</p>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-xl">
            <label className="block text-sm text-gray-500 mb-1">Branch</label>
            <div className="flex items-center">
              <Building2 className="w-4 h-4 text-gray-500 mr-2" />
              <p className="text-lg font-semibold">{loanSummary.branch}</p>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-xl">
            <label className="block text-sm text-gray-500 mb-1">Current Stage</label>
            <div className="flex items-center">
              <ClipboardCheck className="w-4 h-4 text-blue-500 mr-2" />
              <Badge color="blue">{loanSummary.stage}</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Property Details */}
          <Card title="Property Details" icon={Home}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <label className="block text-sm text-gray-500 mb-1">Property Type</label>
                <p className="font-medium">{propertyDetails.propertyType}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <label className="block text-sm text-gray-500 mb-1">Property Age</label>
                <p className="font-medium">{propertyDetails.propertyAge}</p>
              </div>
              
              <div className="md:col-span-2 p-3 bg-gray-50 rounded-lg">
                <label className="block text-sm text-gray-500 mb-1">Address</label>
                <div className="flex items-start">
                  <MapPin className="w-4 h-4 text-gray-500 mt-1 mr-2 flex-shrink-0" />
                  <p className="font-medium">{propertyDetails.address}</p>
                </div>
              </div>
              
              <div className="p-3 bg-gray-50 rounded-lg">
                <label className="block text-sm text-gray-500 mb-1">City/State</label>
                <p className="font-medium">{propertyDetails.city}, {propertyDetails.state}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <label className="block text-sm text-gray-500 mb-1">Pin Code</label>
                <p className="font-medium">{propertyDetails.pinCode}</p>
              </div>
              
              <div className="p-3 bg-gray-50 rounded-lg">
                <label className="block text-sm text-gray-500 mb-1">Built-up Area</label>
                <p className="font-medium">{propertyDetails.builtUpArea}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <label className="block text-sm text-gray-500 mb-1">Carpet Area</label>
                <p className="font-medium">{propertyDetails.carpetArea}</p>
              </div>
              
              <div className="p-3 bg-gray-50 rounded-lg">
                <label className="block text-sm text-gray-500 mb-1">Land Area</label>
                <p className="font-medium">{propertyDetails.landArea}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <label className="block text-sm text-gray-500 mb-1">Floor Details</label>
                <p className="font-medium">{propertyDetails.floors}</p>
              </div>
            </div>
          </Card>

          {/* Construction Status */}
          <Card title="Construction Status" icon={Building}>
            <div className="space-y-6">
              <ProgressBar 
                percentage={constructionStatus.completion} 
                label="Construction Progress"
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <label className="block text-sm text-gray-500 mb-1">Construction Stage</label>
                  <Badge color="yellow">{constructionStatus.stage}</Badge>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <label className="block text-sm text-gray-500 mb-1">Builder Name</label>
                  <p className="font-medium">{constructionStatus.builderName}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <label className="block text-sm text-gray-500 mb-1">RERA Number</label>
                  <p className="font-medium">{constructionStatus.reraNumber}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <label className="block text-sm text-gray-500 mb-1">Possession Date</label>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                    <p className="font-medium">{constructionStatus.possessionDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Valuation Details */}
          <Card title="Valuation Details" icon={Scale}>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                  <label className="block text-sm text-gray-600 mb-1">Market Value</label>
                  <div className="flex items-center">
                    <IndianRupee className="w-5 h-5 text-green-600 mr-2" />
                    <p className="text-xl font-bold text-green-700">{valuationDetails.marketValue}</p>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <label className="block text-sm text-gray-600 mb-1">Distress Value</label>
                  <p className="text-lg font-semibold">{valuationDetails.distressValue}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <label className="block text-sm text-gray-600 mb-1">Government Value</label>
                  <p className="text-lg font-semibold">{valuationDetails.governmentValue}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <label className="block text-sm text-gray-600 mb-1">Agreement Value</label>
                  <p className="text-lg font-semibold">{valuationDetails.agreementValue}</p>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <label className="block text-sm text-gray-600 mb-1">Valuation Date</label>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                      <p className="font-medium">{valuationDetails.valuationDate}</p>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <label className="block text-sm text-gray-600 mb-1">Valuer Name</label>
                    <p className="font-medium">{valuationDetails.valuerName}</p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
                  <label className="block text-sm font-medium text-blue-800 mb-1 flex items-center">
                    <Banknote className="w-4 h-4 mr-2" />
                    Eligible Loan Amount (Based on LTV)
                  </label>
                  <p className="text-2xl font-bold text-blue-700 mb-1">{valuationDetails.eligibleAmount}</p>
                  <p className="text-sm text-blue-600">Calculated at 65% of Market Value</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Risk Assessment */}
          <Card title="Risk Assessment" icon={AlertTriangle}>
            <div className="space-y-3">
              {riskFlags.map((flag, index) => (
                <RiskFlag
                  key={index}
                  label={flag.label}
                  isPresent={flag.isPresent}
                  severity={flag.severity}
                />
              ))}
              <div className="mt-4 p-4 bg-gradient-to-r from-gray-50 to-slate-100 rounded-xl border">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-gray-700 font-medium">Overall Risk Level</span>
                    <p className="text-sm text-gray-500 mt-1">Based on all assessed factors</p>
                  </div>
                  <Badge color="yellow" className="text-lg px-4 py-2">
                    Medium Risk
                  </Badge>
                </div>
              </div>
            </div>
          </Card>

          {/* Engineer Decision Panel */}
          <Card title="Engineer Decision" icon={ClipboardCheck}>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Technical Decision
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <DecisionOption
                    value="approve"
                    label="Approve"
                    icon={CheckCircle}
                    isSelected={decision === 'approve'}
                    onChange={() => setDecision('approve')}
                  />
                  <DecisionOption
                    value="conditional"
                    label="Conditional"
                    icon={AlertCircle}
                    isSelected={decision === 'conditional'}
                    onChange={() => setDecision('conditional')}
                  />
                  <DecisionOption
                    value="reject"
                    label="Reject"
                    icon={XCircle}
                    isSelected={decision === 'reject'}
                    onChange={() => setDecision('reject')}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Recommended Property Value
                  </label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={recommendedValue}
                      onChange={(e) => setRecommendedValue(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    LTV Percentage
                  </label>
                  <div className="relative">
                    <Percent className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={ltv}
                      onChange={(e) => setLtv(e.target.value)}
                      className="w-full pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Risk Grade
                  </label>
                  <select
                    value={riskGrade}
                    onChange={(e) => setRiskGrade(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="A">A - Low Risk</option>
                    <option value="B">B - Medium Risk</option>
                    <option value="C">C - High Risk</option>
                    <option value="D">D - Very High Risk</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Engineer Remarks
                </label>
                <textarea
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  rows="3"
                  placeholder="Enter detailed remarks about the property assessment..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex flex-wrap gap-3 pt-6 border-t">
                <button 
                  onClick={handleSaveReview}
                  className="flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  <Save className="w-5 h-5 mr-2" />
                  Save Review
                </button>
                <button 
                  onClick={handleApproveLegal}
                  className="flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Approve & Move to Legal
                </button>
                <button 
                  onClick={handleRejectProperty}
                  className="flex items-center px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                >
                  <XCircle className="w-5 h-5 mr-2" />
                  Reject Property
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default TechnicalReview;