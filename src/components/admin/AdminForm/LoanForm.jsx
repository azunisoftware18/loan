import React, { useState } from 'react';
import { 
  User, 
  Phone, 
  Mail, 
  Briefcase, 
  IndianRupee, 
  Target, 
  Home, 
  MapPin, 
  Shield, 
  FileText, 
  Calendar,
  FileCheck,
  IdCard,
  CreditCard,
  Camera,
  Banknote,
  Signature,
  CheckCircle,
  X,
  Upload,
  File,
  ArrowLeft
} from 'lucide-react';

const LoanForm = ({ 
  onSubmit, 
  onCancel,
  initialFormData = {}, 
  initialDocuments = {},
  loanCategories = ['Secured', 'Unsecured'],
  loanProducts = {
    'Secured': ['Home Loan', 'Car Loan', 'Loan Against Property', 'Gold Loan'],
    'Unsecured': ['Personal Loan', 'Education Loan', 'Business Loan', 'Credit Card Loan']
  },
  occupationTypes = [
    'Salaried',
    'Self-Employed Business',
    'Self-Employed Professional',
    'Agriculturist',
    'Retired',
    'Student',
    'Other'
  ]
}) => {
  const [form, setForm] = useState({
    customerName: '',
    mobile: '',
    email: '',
    amount: '',
    tenure: '',
    product: '',
    loanCategory: '',
    address: '',
    city: '',
    pincode: '',
    occupation: '',
    monthlyIncome: '',
    purpose: '',
    ...initialFormData
  });

  const [documents, setDocuments] = useState({
    aadharCard: null,
    panCard: null,
    photo: null,
    addressProof: null,
    incomeProof: null,
    bankStatement: null,
    signature: null,
    ...initialDocuments
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate interest rate based on loan category and product
  const calculateInterestRate = (category, product) => {
    const rates = {
      'Secured': {
        'Home Loan': '8.2%',
        'Car Loan': '9.5%',
        'Loan Against Property': '10.5%',
        'Gold Loan': '12.0%'
      },
      'Unsecured': {
        'Personal Loan': '13.5%',
        'Education Loan': '11.2%',
        'Business Loan': '15.0%',
        'Credit Card Loan': '18.0%'
      }
    };
    return rates[category]?.[product] || '12.0%';
  };

  // Calculate EMI
  const calculateEMI = (amount, tenure) => {
    if (!amount || !tenure) return '₹0';
    const principal = parseFloat(amount);
    const months = parseInt(tenure) || 12;
    const rate = 0.12 / 12; // 12% annual interest
    const emi = principal * rate * Math.pow(1 + rate, months) / (Math.pow(1 + rate, months) - 1);
    return `₹${Math.round(emi).toLocaleString()}`;
  };

  // Calculate next due date
  const calculateNextDueDate = () => {
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    return nextMonth.toISOString().split('T')[0];
  };

  // Handle document upload
  const handleDocumentUpload = (docType, file) => {
    if (file && file.size <= 5 * 1024 * 1024) { // 5MB limit
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
      alert('File size must be less than 5MB');
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
      if (!form.customerName || !form.amount || !form.loanCategory || !form.mobile) {
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
      const requiredDocs = ['aadharCard', 'panCard', 'photo'];
      const missingDocs = requiredDocs.filter(doc => !documents[doc]);
      
      if (missingDocs.length > 0) {
        alert(`Please upload required documents: ${missingDocs.join(', ').replace(/([A-Z])/g, ' $1')}`);
        return;
      }

      // Prepare loan data for LoansTable
      const loanData = {
        id: `LN-${Date.now()}`,
        borrower: form.customerName,
        amount: `₹${parseInt(form.amount).toLocaleString()}`,
        type: form.product || 'Personal Loan',
        status: 'Pending',
        interestRate: calculateInterestRate(form.loanCategory, form.product),
        emi: calculateEMI(form.amount, form.tenure),
        tenure: form.tenure || '12 months',
        disbursedDate: new Date().toISOString().split('T')[0],
        nextDue: calculateNextDueDate(),
        details: {
          mobile: form.mobile,
          email: form.email,
          occupation: form.occupation,
          monthlyIncome: form.monthlyIncome,
          purpose: form.purpose,
          address: form.address,
          city: form.city,
          pincode: form.pincode,
          loanCategory: form.loanCategory
        },
        documents: Object.keys(documents).reduce((acc, key) => {
          if (documents[key]) {
            acc[key] = {
              name: documents[key].name,
              uploadedAt: documents[key].uploadedAt
            };
          }
          return acc;
        }, {})
      };

      // Call onSubmit with the formatted data
      if (onSubmit) {
        await onSubmit(loanData);
      }

      // Show success message
      alert('Loan application submitted successfully!');
      
      // Reset form after successful submission
      resetForm();
      
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
      amount: '',
      tenure: '',
      product: '',
      loanCategory: '',
      address: '',
      city: '',
      pincode: '',
      occupation: '',
      monthlyIncome: '',
      purpose: ''
    });
    setDocuments({
      aadharCard: null,
      panCard: null,
      photo: null,
      addressProof: null,
      incomeProof: null,
      bankStatement: null,
      signature: null
    });
  };

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
          <p className="text-xs text-gray-500 mt-2">Max file size: 5MB</p>
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
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <User size={20} />
              Create New Loan Application
            </h2>
          </div>
          <div className="text-sm text-gray-500">
            All fields marked with <span className="text-red-500">*</span> are required
          </div>
        </div>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <User size={18} />
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  value={form.customerName}
                  onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter customer name"
                  required
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="tel"
                  value={form.mobile}
                  onChange={(e) => setForm({ ...form, mobile: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter 10-digit mobile number"
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
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter email address"
                />
              </div>

              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <select
                  value={form.occupation}
                  onChange={(e) => setForm({ ...form, occupation: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                >
                  <option value="">Select Occupation</option>
                  {occupationTypes.map(occupation => (
                    <option key={occupation} value={occupation}>{occupation}</option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="number"
                  value={form.monthlyIncome}
                  onChange={(e) => setForm({ ...form, monthlyIncome: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter monthly income"
                  min="0"
                />
              </div>

              <div className="relative">
                <Target className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  value={form.purpose}
                  onChange={(e) => setForm({ ...form, purpose: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Purpose of loan"
                />
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <MapPin size={18} />
              Address Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 relative">
                <Home className="absolute left-3 top-4 transform -translate-y-1/2 text-gray-400" size={18} />
                <textarea
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="Enter complete address"
                  rows={3}
                />
              </div>

              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter city"
                />
              </div>

              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  value={form.pincode}
                  onChange={(e) => setForm({ ...form, pincode: e.target.value.replace(/\D/g, '').slice(0, 6) })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter pincode"
                  maxLength={6}
                />
              </div>
            </div>
          </div>

          {/* Loan Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FileText size={18} />
              Loan Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="number"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter loan amount"
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
                      product: '' // Reset product when category changes
                    });
                  }}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                  required
                >
                  <option value="">Select Category</option>
                  {loanCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <select
                  value={form.product}
                  onChange={(e) => setForm({ ...form, product: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                  disabled={!form.loanCategory}
                  required
                >
                  <option value="">Select Product</option>
                  {form.loanCategory && loanProducts[form.loanCategory]?.map(product => (
                    <option key={product} value={product}>{product}</option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <select
                  value={form.tenure}
                  onChange={(e) => setForm({ ...form, tenure: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                >
                  <option value="">Select Tenure</option>
                  <option value="12 months">12 months</option>
                  <option value="24 months">24 months</option>
                  <option value="36 months">36 months</option>
                  <option value="60 months">60 months</option>
                  <option value="84 months">84 months</option>
                  <option value="120 months">120 months</option>
                  <option value="240 months">240 months</option>
                </select>
              </div>
            </div>
          </div>

          {/* Document Upload Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FileCheck size={18} />
              Required Documents
            </h3>
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
              <DocumentUploadField 
                label="Passport Size Photo" 
                docType="photo" 
                required 
                accept=".jpg,.jpeg,.png"
                icon={Camera}
              />
              <DocumentUploadField 
                label="Address Proof" 
                docType="addressProof" 
                accept=".pdf,.jpg,.jpeg,.png"
                icon={Home}
              />
              <DocumentUploadField 
                label="Income Proof" 
                docType="incomeProof" 
                accept=".pdf,.jpg,.jpeg,.png"
                icon={Banknote}
              />
              <DocumentUploadField 
                label="Bank Statement (3 months)" 
                docType="bankStatement" 
                accept=".pdf,.jpg,.jpeg,.png"
                icon={FileText}
              />
              <DocumentUploadField 
                label="Signature" 
                docType="signature" 
                accept=".jpg,.jpeg,.png"
                icon={Signature}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 font-medium transition-colors ${
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
                  Create Application
                </>
              )}
            </button>
            
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
                className="flex items-center gap-2 px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors ml-auto"
              >
                <ArrowLeft size={18} />
                Back to Portfolio
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoanForm;