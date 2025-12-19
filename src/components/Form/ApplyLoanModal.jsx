import React, { useState } from "react";

export default function ApplyLoanModal({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    dob: "",
    gender: "",
    state: "",
    city: "",
    pincode: "",
    address: "",
    aadhar: "",
    pan: "",
    loanType: "",
    loanAmount: "",
    customerProfile: "",
    existingCustomer: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted successfully!");
    setFormData({
      name: "",
      email: "",
      mobile: "",
      dob: "",
      gender: "",
      state: "",
      city: "",
      pincode: "",
      address: "",
      aadhar: "",
      pan: "",
      loanType: "",
      loanAmount: "",
      customerProfile: "",
      existingCustomer: "",
    });
    onClose();
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
              name="name"
              value={formData.name}
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
              Aadhar Linked Mobile <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
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
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
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
              name="pincode"
              value={formData.pincode}
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
              Property Address <span className="text-red-500">*</span>
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter complete property address"
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
              name="loanType"
              value={formData.loanType}
              onChange={handleChange}
              required
              className="w-full text-xs sm:text-sm border border-gray-300 rounded-md sm:rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
            >
              <option value="">Select Loan Type</option>
              <option value="Business Loan">Business Loan</option>
              <option value="Home Loan">Home Loan</option>
              <option value="Vehicle Loan">Vehicle Loan</option>
              <option value="Personal Loan">Personal Loan</option>
              <option value="Education Loan">Education Loan</option>
              <option value="Gold Loan">Gold Loan</option>
            </select>
          </div>

      

       

        

          {/* Submit Button */}
          <div className="xs:col-span-2 lg:col-span-2 mt-2 sm:mt-4 lg:mt-6">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-sm sm:text-base py-3 sm:py-3.5 rounded-md sm:rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-95 shadow-md hover:shadow-lg"
            >
              SUBMIT
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