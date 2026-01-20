import React, { useState, useRef } from 'react';
import {
  User, MapPin, Briefcase, FileText, Landmark, Key, ShieldCheck, Check,
  ChevronRight, ChevronLeft, UploadCloud, DollarSign, Phone,
  CalendarDays, GraduationCap, Building, Mail, CreditCard,
  FileCheck, Download, X, Eye
} from 'lucide-react';
import axios from "axios";


const EmployeeForm = ({
  initialFormState,
  formData,
  setFormData,
  errors,
  setErrors,
  currentStep,
  setCurrentStep,
  isEditing,
  editId,
  handleChange,
  handleFileChange,
  validateStep,
  generateCredentials,
  calculateTotalSalary,
  onCancel
}) => {
  // Refs for file inputs
  const aadhaarFrontRef = useRef(null);
  const aadhaarBackRef = useRef(null);
  const panRef = useRef(null);
  const photoRef = useRef(null);
  const resumeRef = useRef(null);

  const steps = [
    { id: 1, title: "Personal Info", icon: <User size={18} /> },
    { id: 2, title: "Professional", icon: <Briefcase size={18} /> },
    { id: 3, title: "KYC & Banking", icon: <Landmark size={18} /> },
    { id: 4, title: "Salary & Access", icon: <ShieldCheck size={18} /> }
  ];

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const API_URL = import.meta.env.VITE_API_BASE_URL;



  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      role: "EMPLOYEE",

      contactNumber: formData.phone,
      mobileNumber: formData.phone,
      atlMobileNumber: formData.altPhone || formData.phone,

      userName: formData.username,

      dob: formData.dob ? new Date(formData.dob) : null,
      dateOfJoining: formData.dateOfJoining
        ? new Date(formData.dateOfJoining)
        : new Date(),

      gender: formData.gender.toUpperCase(),
      maritalStatus: formData.maritalStatus.toUpperCase(),

      designation: formData.designation,
      department: formData.department,

      emergencyContact: formData.emergencyContact,
      emergencyRelationship: formData.emergencyRelation?.toUpperCase(),

      address: formData.address,
      city: formData.city,
      state: formData.state,
      pinCode: formData.pincode,

      isActive: formData.status === "Active",
      workLocation: formData.workLocation?.toUpperCase(),

      // ✅ BACKEND EXPECTS THIS
      salary: Number(formData.basicSalary),
    };

    // ✅ PAYLOAD DEBUG (yahin allowed hai)
    console.log("FINAL PAYLOAD 👉", payload);

    try {
      const res = await axios.post(`${API_URL}/employee/`, payload, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

      console.log("API RESPONSE 👉", res.data);

      if (res.status === 201 && res.data?.success) {
        alert("✅ Employee Created Successfully");
          onSuccess();        // 👈 REFRESH LIST
          onCancel();         // modal close
      } else {
        alert("❌ Employee creation failed");
      }

    } catch (err) {
      // ✅ err yahin defined hota hai
      console.error("BACKEND ERROR 👉", err.response?.data);

      alert(err.response?.data?.message || "Validation error");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden animate-in fade-in zoom-in duration-300">
      {/* STEPPER HEADER */}
      <div className="bg-gray-50 border-b border-gray-200 p-6">
        <div className="flex items-center justify-between relative mb-6">
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 -z-0"></div>
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-blue-600 -z-0 transition-all duration-500" style={{ width: `${((currentStep - 1) / 3) * 100}%` }}></div>
          {steps.map((step) => (
            <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${currentStep >= step.id ? 'bg-blue-600 text-white shadow-blue-200 shadow-lg scale-110' : 'bg-white border-2 border-gray-300 text-gray-400'}`}>
                {currentStep > step.id ? <Check size={18} /> : step.id}
              </div>
              <span className={`text-xs font-semibold ${currentStep >= step.id ? 'text-blue-700' : 'text-gray-400'}`}>{step.title}</span>
            </div>
          ))}
        </div>
        <h2 className="text-xl font-bold text-gray-800 text-center">{isEditing ? `Edit Employee #${editId}` : "Register New Employee"}</h2>
      </div>

      <form onSubmit={handleSubmit} className="p-8">
        {currentStep === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in slide-in-from-right-4 duration-300">
            <div className="md:col-span-3 pb-2 border-b border-gray-100 mb-2">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <User size={18} className="text-blue-500" /> Personal Information
              </h3>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">
                Employee ID <span className="text-red-500">*</span>
              </label>


            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full p-3 bg-gray-50 border rounded-lg ${errors.fullName ? 'border-red-500' : 'border-gray-200'}`}
                placeholder="e.g. Rahul Sharma"
              />
              {errors.fullName && <p className="text-xs text-red-500">{errors.fullName}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-3 bg-gray-50 border rounded-lg ${errors.email ? 'border-red-500' : 'border-gray-200'}`}
                placeholder="rahul@company.com"
              />
              {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                maxLength="10"
                className={`w-full p-3 bg-gray-50 border rounded-lg ${errors.phone ? 'border-red-500' : 'border-gray-200'}`}
                placeholder="9876543210"
              />
              {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Alt Phone</label>
              <input
                name="altPhone"
                type="tel"
                maxLength="10"
                value={formData.altPhone}
                onChange={handleChange}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Date of Birth</label>
              <input
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Marital Status</label>
              <select
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
              >
                <option value="SINGLE">SINGLE</option>
                <option value="MARRIED">MARRIED</option>
                <option value="DIVORCED">DIVORCED</option>
                <option value="WIDOWED">WIDOWED</option>
              </select>
            </div>

            <div className="md:col-span-3 pb-2 border-b border-gray-100 mb-2 mt-4">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <Key size={18} className="text-blue-500" /> Login Credentials
              </h3>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Username</label>
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
                placeholder="Create username"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Password</label>
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
                placeholder="••••••••"
              />
            </div>

            <div className="space-y-1 flex items-end">
              <button
                type="button"
                onClick={generateCredentials}
                className="w-full p-3 bg-blue-50 text-blue-600 rounded-lg border border-blue-100 hover:bg-blue-100 transition text-sm font-semibold flex items-center justify-center gap-2"
              >
                <Key size={16} /> Auto Generate
              </button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in slide-in-from-right-4 duration-300">
            <div className="md:col-span-3 pb-2 border-b border-gray-100 mb-2">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <MapPin size={18} className="text-blue-500" /> Address & Contact
              </h3>
            </div>

            <div className="md:col-span-3 space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Full Address</label>
              <textarea
                name="address"
                rows="2"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
                placeholder="Complete address..."
              ></textarea>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">City</label>
              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">State</label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
              >
                <option value="">Select State</option>
                <option>Delhi</option>
                <option>Maharashtra</option>
                <option>Karnataka</option>
                <option>Tamil Nadu</option>
                <option>Uttar Pradesh</option>
                <option>Gujarat</option>
                <option>Rajasthan</option>
                <option>West Bengal</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Pin Code</label>
              <input
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                maxLength="6"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
              />
            </div>

            <div className="md:col-span-3 pb-2 border-b border-gray-100 mb-2 mt-4">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <Phone size={18} className="text-blue-500" /> Emergency Contact
              </h3>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Emergency Contact</label>
              <input
                name="emergencyContact"
                type="tel"
                value={formData.emergencyContact}
                onChange={handleChange}
                maxLength="10"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
                placeholder="Emergency phone number"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Relationship</label>
              <select name="emergencyRelation">
                <option value="FATHER">Father</option>
                <option value="MOTHER">Mother</option>
                <option value="SPOUSE">Spouse</option>
                <option value="SIBLING">Sibling</option>
                <option value="FRIEND">Friend</option>
                <option value="OTHER">Other</option>
              </select>

            </div>

            <div className="md:col-span-3 pb-2 border-b border-gray-100 mb-2 mt-4">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <Briefcase size={18} className="text-blue-500" /> Professional Details
              </h3>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Department</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
              >
                <option>Sales</option>
                <option>Marketing</option>
                <option>Operations</option>
                <option>HR</option>
                <option>Finance</option>
                <option>IT</option>
                <option>Customer Service</option>
                <option>Management</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Designation</label>
              <input
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
                placeholder="e.g. Sales Executive"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Date of Joining</label>
              <input
                name="dateOfJoining"
                type="date"
                value={formData.dateOfJoining}
                onChange={handleChange}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Experience</label>
              <input
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
                placeholder="e.g. 3 Years"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Reporting Manager</label>

            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Work Location</label>
              <select
                name="workLocation"
                value={formData.workLocation}
                onChange={handleChange}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
              >
                <option value="OFFICE">Office</option>
                <option value="REMOTE">Remote</option>
                <option value="HYBRID">Hybrid</option>
              </select>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-right-4 duration-300">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FileText size={18} className="text-blue-500" /> KYC Documents
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">Aadhaar Card</label>
                  <input
                    name="aadhaarNo"
                    value={formData.aadhaarNo}
                    onChange={handleChange}
                    maxLength="12"
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                    placeholder="12 Digit Number"
                  />
                  <div className="flex gap-2">
                    <div
                      onClick={() => aadhaarFrontRef.current.click()}
                      className={`flex-1 border-2 border-dashed rounded-lg h-24 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition relative overflow-hidden ${formData.aadhaarFrontImg ? 'border-green-400 bg-green-50' : 'border-gray-300'}`}
                    >
                      <input type="file" ref={aadhaarFrontRef} onChange={(e) => handleFileChange(e, 'aadhaarFrontImg')} className="hidden" accept="image/*" />
                      {formData.aadhaarFrontImg ? (
                        <img src={URL.createObjectURL(formData.aadhaarFrontImg)} alt="Front" className="w-full h-full object-cover rounded-lg" />
                      ) : (
                        <><UploadCloud size={20} className="text-gray-400" /><span className="text-[10px] text-gray-500">Front Img</span></>
                      )}
                    </div>
                    <div
                      onClick={() => aadhaarBackRef.current.click()}
                      className={`flex-1 border-2 border-dashed rounded-lg h-24 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition relative overflow-hidden ${formData.aadhaarBackImg ? 'border-green-400 bg-green-50' : 'border-gray-300'}`}
                    >
                      <input type="file" ref={aadhaarBackRef} onChange={(e) => handleFileChange(e, 'aadhaarBackImg')} className="hidden" accept="image/*" />
                      {formData.aadhaarBackImg ? (
                        <img src={URL.createObjectURL(formData.aadhaarBackImg)} alt="Back" className="w-full h-full object-cover rounded-lg" />
                      ) : (
                        <><UploadCloud size={20} className="text-gray-400" /><span className="text-[10px] text-gray-500">Back Img</span></>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">PAN Card</label>
                  <input
                    name="panNo"
                    value={formData.panNo}
                    onChange={handleChange}
                    maxLength="10"
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                    placeholder="ABCDE1234F"
                  />
                  <div
                    onClick={() => panRef.current.click()}
                    className={`w-full border-2 border-dashed rounded-lg h-24 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition relative overflow-hidden ${formData.panImg ? 'border-green-400 bg-green-50' : 'border-gray-300'}`}
                  >
                    <input type="file" ref={panRef} onChange={(e) => handleFileChange(e, 'panImg')} className="hidden" accept="image/*" />
                    {formData.panImg ? (
                      <img src={URL.createObjectURL(formData.panImg)} alt="PAN" className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <><UploadCloud size={20} className="text-gray-400" /><span className="text-[10px] text-gray-500">Upload PAN</span></>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">Resume (Optional)</label>
                  <div
                    onClick={() => resumeRef.current.click()}
                    className={`w-full border-2 border-dashed rounded-lg h-24 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition relative overflow-hidden ${formData.resume ? 'border-blue-400 bg-blue-50' : 'border-gray-300'}`}
                  >
                    <input type="file" ref={resumeRef} onChange={(e) => handleFileChange(e, 'resume')} className="hidden" accept=".pdf,.doc,.docx" />
                    {formData.resume ? (
                      <div className="text-center">
                        <FileText size={20} className="text-blue-500 mx-auto" />
                        <span className="text-[10px] text-blue-600">{formData.resume.name}</span>
                      </div>
                    ) : (
                      <><UploadCloud size={20} className="text-gray-400" /><span className="text-[10px] text-gray-500">Upload Resume</span></>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Landmark size={18} className="text-blue-500" /> Banking Details
              </h3>
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Account Holder Name</label>
                  <input
                    name="accountHolder"
                    value={formData.accountHolder}
                    onChange={handleChange}
                    className="w-full p-3 bg-white border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Bank Name</label>
                  <input
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleChange}
                    className="w-full p-3 bg-white border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Account Number</label>
                  <input
                    name="bankAccountNo"
                    value={formData.bankAccountNo}
                    onChange={handleChange}
                    className="w-full p-3 bg-white border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">IFSC Code</label>
                  <input
                    name="ifsc"
                    value={formData.ifsc}
                    onChange={handleChange}
                    className="w-full p-3 bg-white border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">UPI ID (Optional)</label>
                  <input
                    name="upiId"
                    value={formData.upiId}
                    onChange={handleChange}
                    className="w-full p-3 bg-white border border-gray-300 rounded-lg"
                    placeholder="username@bank"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in slide-in-from-right-4 duration-300">
            <div>
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <DollarSign size={18} className="text-blue-500" /> Salary Structure
              </h3>
              <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Salary Type</label>

                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Basic Salary <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="basicSalary"
                      value={formData.basicSalary}
                      onChange={handleChange}
                      className={`w-full p-3 bg-white border rounded-lg text-lg font-bold ${errors.basicSalary ? 'border-red-500' : 'border-green-200'}`}
                      placeholder="e.g. 45000"
                    />
                    {errors.basicSalary && <p className="text-xs text-red-500 mt-1">{errors.basicSalary}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">HRA</label>
                      <input
                        name="hra"
                        value={formData.hra}
                        onChange={handleChange}
                        className="w-full p-3 bg-white border border-green-200 rounded-lg"
                        placeholder="e.g. 9000"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Conveyance</label>
                      <input
                        name="conveyance"
                        value={formData.conveyance}
                        onChange={handleChange}
                        className="w-full p-3 bg-white border border-green-200 rounded-lg"
                        placeholder="e.g. 1600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Medical Allowance</label>
                      <input
                        name="medicalAllowance"
                        value={formData.medicalAllowance}
                        onChange={handleChange}
                        className="w-full p-3 bg-white border border-green-200 rounded-lg"
                        placeholder="e.g. 1250"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Other Allowances</label>
                      <input
                        name="otherAllowances"
                        value={formData.otherAllowances}
                        onChange={handleChange}
                        className="w-full p-3 bg-white border border-green-200 rounded-lg"
                        placeholder="e.g. 5000"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">PF Deduction</label>
                      <input
                        name="pfDeduction"
                        value={formData.pfDeduction}
                        onChange={handleChange}
                        className="w-full p-3 bg-white border border-green-200 rounded-lg"
                        placeholder="e.g. 1800"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Tax Deduction</label>
                      <input
                        name="taxDeduction"
                        value={formData.taxDeduction}
                        onChange={handleChange}
                        className="w-full p-3 bg-white border border-green-200 rounded-lg"
                        placeholder="e.g. 2000"
                      />
                    </div>
                  </div>

                  {/* Salary Preview */}
                  <div className="mt-4 p-3 bg-green-100 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-gray-700">Total Salary Preview:</span>
                      <span className="text-lg font-bold text-green-700">₹{calculateTotalSalary().net}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1 text-right">
                      Gross: ₹{calculateTotalSalary().gross} | Net: ₹{calculateTotalSalary().net}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <ShieldCheck size={18} className="text-blue-500" /> Status & Permissions
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">Account Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="On Leave">On Leave</option>
                      <option value="Probation">Probation</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">Leave Balance</label>

                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <label className="text-xs font-bold text-gray-500 uppercase block mb-3">System Permissions</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-white rounded transition">

                      <span className="text-gray-700">Can Add Customer</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-white rounded transition">

                      <span className="text-gray-700">Can View All Customers</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-white rounded transition">

                      <span className="text-gray-700">Can Process Loans</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-white rounded transition">

                      <span className="text-gray-700">Can Manage Leads</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-white rounded transition">

                      <span className="text-gray-700">Can Generate Reports</span>
                    </label>
                  </div>
                </div>

                {/* Profile Photo */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <label className="text-xs font-bold text-gray-500 uppercase block mb-3">Profile Photo</label>
                  <div
                    onClick={() => photoRef.current.click()}
                    className={`w-32 h-32 mx-auto border-2 border-dashed rounded-full flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition relative overflow-hidden ${formData.profilePhoto ? 'border-blue-400 bg-blue-50' : 'border-gray-300'}`}
                  >
                    <input type="file" ref={photoRef} onChange={(e) => handleFileChange(e, 'profilePhoto')} className="hidden" accept="image/*" />
                    {formData.profilePhoto ? (
                      <img src={URL.createObjectURL(formData.profilePhoto)} alt="Profile" className="w-full h-full object-cover rounded-full" />
                    ) : (
                      <><User size={32} className="text-gray-400" /><span className="text-[10px] text-gray-500 mt-1">Upload Photo</span></>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-between pt-6 border-t border-gray-100">
          {currentStep === 1 ? (
            <button
              type="button"
              onClick={onCancel}
              className="flex items-center gap-2 px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl font-medium transition-all"
            >
              Cancel
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setCurrentStep(prev => Math.max(prev - 1, 1))}
              className="flex items-center gap-2 px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl font-medium transition-all"
            >
              <ChevronLeft size={18} /> Back
            </button>
          )}

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-200 font-medium transition-all"
            >
              Next Step <ChevronRight size={18} />
            </button>
          ) : (
            <button
              type="submit"
              className="flex items-center gap-2 px-8 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-lg shadow-green-200 font-medium transition-all"
            >
              {isEditing ? <Check size={18} /> : <Check size={18} />} {isEditing ? "Update Employee" : "Submit Employee"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;