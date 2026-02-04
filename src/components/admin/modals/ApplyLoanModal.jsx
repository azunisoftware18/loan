import React, { useState } from "react";
import { useCreateLead } from "../../../hooks/useLeads";
import { useLoanTypes } from "../../../hooks/useLoan";
import toast from "react-hot-toast";

export default function ApplyLoanModal({ onClose }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    dob: "",
    gender: "",
    state: "",
    city: "",
    pinCode: "",
    address: "",
    loanTypeId: "",
    loanAmount: "",
  });

  const { data: loanTypesResponse = {}, isLoading: loadingLoanTypes } = useLoanTypes();
  const { mutate: createLead, isPending } = useCreateLead();

  // Safely extract loanTypes from response
  const loanTypes = React.useMemo(() => {
    // Handle different possible response structures
    if (!loanTypesResponse) return [];
    
    // Case 1: Direct array
    if (Array.isArray(loanTypesResponse)) {
      return loanTypesResponse;
    }
    
    // Case 2: Object with data property
    if (loanTypesResponse.data && Array.isArray(loanTypesResponse.data)) {
      return loanTypesResponse.data;
    }
    
    // Case 3: Object with other property names
    if (loanTypesResponse.loanTypes && Array.isArray(loanTypesResponse.loanTypes)) {
      return loanTypesResponse.loanTypes;
    }
    
    // Case 4: Object with results property
    if (loanTypesResponse.results && Array.isArray(loanTypesResponse.results)) {
      return loanTypesResponse.results;
    }
    
    // Default: empty array
    return [];
  }, [loanTypesResponse]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      contactNumber: formData.contactNumber,
      dob: formData.dob,
      gender: formData.gender,
      city: formData.city,
      state: formData.state,
      pinCode: formData.pinCode,
      address: formData.address,
      loanTypeId: String(formData.loanTypeId),
      loanAmount: Number(formData.loanAmount),
    };

    createLead(payload, {
      onSuccess: () => {
        toast.success("Application submitted successfully ");
        onClose();
      },
      onError: (error) => {
        toast.error(`Error: ${error.message || "Failed to submit application"}`);
      }
    });
  };

  const handleClose = () => {
    onClose();
  };

  // Close modal when clicking on backdrop
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-md bg-opacity-50 animate-in fade-in-0 duration-300"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg sm:rounded-xl shadow-lg w-full max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-2 sm:mx-4 p-4 sm:p-6 lg:p-8 relative overflow-y-auto max-h-[95vh] sm:max-h-[90vh] border border-gray-200">

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-800 text-xl sm:text-2xl z-10 bg-white rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center shadow-md hover:shadow-lg transition-all"
          aria-label="Close modal"
        >
          &times;
        </button>

        {/* Title */}
        <div className="text-center mb-4 sm:mb-6 lg:mb-8">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800">
            Apply For Loan
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Fill in your details to get started with your loan
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6"
        >
          {/* Your Name */}
          <div className="xs:col-span-2 lg:col-span-1">
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Your Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              className="w-full text-xs sm:text-sm border border-gray-300 rounded-md sm:rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
            />
          </div>

          {/* Email */}
          <div className="xs:col-span-2 lg:col-span-1">
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full text-xs sm:text-sm border border-gray-300 rounded-md sm:rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
            />
          </div>

          {/* Mobile */}
          <div className="xs:col-span-2 lg:col-span-1">
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="10-digit mobile number"
              required
              pattern="[0-9]{10}"
              maxLength="10"
              className="w-full text-xs sm:text-sm border border-gray-300 rounded-md sm:rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
            />
          </div>

          {/* Date of Birth */}
          <div className="xs:col-span-2 lg:col-span-1">
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
              max={new Date().toISOString().split('T')[0]}
              className="w-full text-xs sm:text-sm border border-gray-300 rounded-md sm:rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
            />
          </div>

          {/* Gender */}
          <div className="xs:col-span-1">
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full text-xs sm:text-sm border border-gray-300 rounded-md sm:rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
            >
              <option value="">Select Gender</option>
              <option value="MALE">MALE</option>
              <option value="FEMALE">FEMALE</option>
              <option value="OTHER">OTHER</option>
            </select>
          </div>

          {/* State */}
          <div className="xs:col-span-1">
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              State <span className="text-red-500">*</span>
            </label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              className="w-full text-xs sm:text-sm border border-gray-300 rounded-md sm:rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
            >
              <option value="">Select State</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Delhi">Delhi</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
            </select>
          </div>

          {/* City */}
          <div className="xs:col-span-1">
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter city"
              required
              className="w-full text-xs sm:text-sm border border-gray-300 rounded-md sm:rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
            />
          </div>

          {/* Pin Code */}
          <div className="xs:col-span-1">
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Pin Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="pinCode"
              value={formData.pinCode}
              onChange={handleChange}
              placeholder="6-digit pincode"
              required
              pattern="[0-9]{6}"
              maxLength="6"
              className="w-full text-xs sm:text-sm border border-gray-300 rounded-md sm:rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
            />
          </div>

          {/* Address */}
          <div className="xs:col-span-2 lg:col-span-2">
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Address <span className="text-red-500">*</span>
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter complete address"
              required
              rows="2"
              className="w-full text-xs sm:text-sm border border-gray-300 rounded-md sm:rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none transition-all"
            />
          </div>

          {/* Loan Type */}
          <div className="xs:col-span-2 lg:col-span-1">
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Loan Type <span className="text-red-500">*</span>
            </label>
            <select
              name="loanTypeId"
              value={formData.loanTypeId}
              onChange={handleChange}
              required
              disabled={loadingLoanTypes || loanTypes.length === 0}
              className="w-full text-xs sm:text-sm border border-gray-300 rounded-md sm:rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <option value="">
                {loadingLoanTypes 
                  ? "Loading loan types..." 
                  : loanTypes.length === 0 
                    ? "No loan types available" 
                    : "Select Loan Type"}
              </option>

              {loanTypes.map((loan) => (
                <option key={loan.id} value={loan.id}>
                  {loan.name || `Loan Type ${loan.id}`}
                </option>
              ))}
            </select>
          </div>

          {/* Loan Amount */}
          <div className="xs:col-span-2 lg:col-span-1">
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Loan Amount <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="loanAmount"
              value={formData.loanAmount}
              onChange={handleChange}
              placeholder="Enter loan amount"
              required
              min="1000"
              className="w-full text-xs sm:text-sm border border-gray-300 rounded-md sm:rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
            />
          </div>

          {/* Submit Button */}
          <div className="xs:col-span-2 lg:col-span-2 mt-2 sm:mt-4 lg:mt-6">
            <button
              type="submit"
              disabled={isPending || loanTypes.length === 0}
              className={`w-full py-2.5 sm:py-3 text-sm sm:text-base font-medium rounded-lg transition-all ${
                isPending || loanTypes.length === 0
                  ? 'bg-gray-400 cursor-not-allowed text-gray-700'
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg'
              }`}
            >
              {isPending 
                ? "Submitting..." 
                : loanTypes.length === 0 
                  ? "No Loan Types Available" 
                  : "SUBMIT"}
            </button>
          </div>
        </form>

        {/* Footer Note */}
        <div className="mt-4 sm:mt-6 text-center">
          <p className="text-xs text-gray-500">
            By submitting this form, you agree to our <a href="#" className="text-blue-600 hover:underline">Terms & Conditions</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}