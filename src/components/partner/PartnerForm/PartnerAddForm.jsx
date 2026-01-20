import React, { useRef } from 'react';
import {
    Building, Briefcase, MapPin, User, DollarSign, Target, Landmark,
    FileText, ShieldCheck, Check, ChevronRight, ChevronLeft, Key,
    Home, Users, BarChart, Bell, FileCheck
} from 'lucide-react';
import axios from "axios";


const PartnerAddForm = ({
    currentStep,
    setCurrentStep,
    formData,
    setFormData,
    errors,
    setErrors,
    isEditing,
    editId,
    handleChange,
    handleFileChange,
    validateStep,
    resetForm,
    companyLogoRef,
    panRef,
    gstRef,
    licenseRef,
    agreementRef,
    performanceOptions,
    generateCredentials,
    onCancel
}) => {
    const steps = [
        { id: 1, title: "Basic Info", icon: <Building size={18} /> },
        { id: 2, title: "Business Details", icon: <Briefcase size={18} /> },
        { id: 3, title: "Financials", icon: <DollarSign size={18} /> },
        { id: 4, title: "Documents & Status", icon: <ShieldCheck size={18} /> }
    ];

    const handleNext = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => Math.min(prev + 1, 4));
        }
    };




    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.password || formData.password.length < 8) {
            setErrors(prev => ({
                ...prev,
                password: "Password must be at least 8 characters",
            }));
            return;
        }


        const payload = {
            fullName: formData.partnerName,
            email: formData.email,
            password: formData.password,
            role: "PARTNER",
            userName: formData.username,
            contactNumber: formData.phone,
            partnerId: formData.partnerId,

            alternateNumber: formData.altPhone || undefined,
            companyName: formData.companyName || undefined,
            contactPerson: formData.contactPerson || undefined,
            website: formData.website || undefined,
            establishedYear: formData.establishedYear
                ? Number(formData.establishedYear)
                : undefined,

            partnerType: formData.partnerType || undefined,
            businessNature: formData.businessNature || undefined,

            fullAddress: formData.address || undefined,
            city: formData.city || undefined,
            state: formData.state || undefined,
            pinCode: formData.pincode || undefined,
            designation: formData.contactPersonDesignation || undefined,
            businessCategory: formData.businessCategory || undefined,
            specialization: formData.specialization || undefined,
            totalEmployees: formData.totalEmployees
                ? Number(formData.totalEmployees)
                : undefined,
            annualTurnover: formData.annualTurnover
                ? Number(formData.annualTurnover)
                : undefined,
            businessRegistrationNumber: formData.registrationNo || undefined,

            commissionType: formData.commissionType || undefined,
            commissionValue: formData.commissionValue
                ? Number(formData.commissionValue)
                : undefined,
            paymentCycle: formData.paymentCycle || undefined,
            minimumPayout: formData.minimumPayout
                ? Number(formData.minimumPayout)
                : undefined,
            taxDeduction: formData.taxDeduction
                ? Number(formData.taxDeduction)
                : undefined,
        };


        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/partner`,
                payload,
                {
                    withCredentials: true, // ✅ ADD THIS
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );


            alert("Partner created successfully");
            resetForm();
        } catch (err) {
            console.error(err.response?.data);

            if (err.response?.data?.errors) {
                const zodErrors = {};
                err.response.data.errors.forEach((e) => {
                    zodErrors[e.field] = e.message;
                });
                setErrors(zodErrors);
            } else {
                alert("Something went wrong");
            }
        }

    };


    return (
        <div className="min-h-screen bg-gray-50 p-6 lg:p-10">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        {isEditing ? "Edit Partner" : "Add New Partner"}
                    </h1>
                    <p className="text-gray-500 mt-1">
                        {isEditing ? `Editing Partner #${editId}` : "Register new partner with detailed information"}
                    </p>
                </div>

                <button
                    onClick={onCancel}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2.5 rounded-xl transition-all"
                >
                    Cancel & Back to List
                </button>
            </div>

            {/* FORM */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden animate-in fade-in zoom-in duration-300">
                {/* STEPPER HEADER */}
                <div className="bg-gray-50 border-b border-gray-200 p-6">
                    <div className="flex items-center justify-between relative mb-6">
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 -z-0"></div>
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-blue-600 -z-0 transition-all duration-500"
                            style={{ width: `${((currentStep - 1) / 3) * 100}%` }}></div>
                        {steps.map((step) => (
                            <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${currentStep >= step.id ? 'bg-blue-600 text-white shadow-blue-200 shadow-lg scale-110' : 'bg-white border-2 border-gray-300 text-gray-400'}`}>
                                    {currentStep > step.id ? <Check size={18} /> : step.id}
                                </div>
                                <span className={`text-xs font-semibold ${currentStep >= step.id ? 'text-blue-700' : 'text-gray-400'}`}>
                                    {step.title}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* FORM CONTENT */}
                <form onSubmit={handleSubmit} className="p-8">
                    {/* STEP 1: Basic Information */}
                    {currentStep === 1 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in slide-in-from-right-4 duration-300">
                            <div className="md:col-span-3 pb-2 border-b border-gray-100 mb-2">
                                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                                    <Building size={18} className="text-blue-500" /> Basic Information
                                </h3>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-500 uppercase">
                                    Partner ID <span className="text-red-500">*</span>
                                </label>
                                <input
                                    name="partnerId"
                                    value={formData.partnerId}
                                    onChange={handleChange}
                                    className={`w-full p-3 bg-gray-50 border rounded-lg ${errors.partnerId ? 'border-red-500' : 'border-gray-200'}`}
                                    placeholder="e.g. PTR001"
                                />
                                {errors.partnerId && <p className="text-xs text-red-500">{errors.partnerId}</p>}
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-500 uppercase">
                                    Company Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    className={`w-full p-3 bg-gray-50 border rounded-lg ${errors.companyName ? 'border-red-500' : 'border-gray-200'}`}
                                    placeholder="e.g. Sharma Financial Services"
                                />
                                {errors.companyName && <p className="text-xs text-red-500">{errors.companyName}</p>}
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-500 uppercase">
                                    Contact Person <span className="text-red-500">*</span>
                                </label>
                                <input
                                    name="partnerName"
                                    value={formData.partnerName}
                                    onChange={handleChange}
                                    className={`w-full p-3 bg-gray-50 border rounded-lg ${errors.partnerName ? 'border-red-500' : 'border-gray-200'}`}
                                    placeholder="e.g. Rajesh Sharma"
                                />
                                {errors.partnerName && <p className="text-xs text-red-500">{errors.partnerName}</p>}
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
                                    placeholder="contact@company.com"
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
                                <label className="text-xs font-semibold text-gray-500 uppercase">Website</label>
                                <input
                                    name="website"
                                    type="url"
                                    value={formData.website}
                                    onChange={handleChange}
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
                                    placeholder="www.example.com"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-500 uppercase">Established Year</label>
                                <input
                                    name="establishedYear"
                                    type="number"
                                    value={formData.establishedYear}
                                    onChange={handleChange}
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
                                    placeholder="e.g. 2015"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-500 uppercase">Partner Type</label>
                                <select name="partnerType" value={formData.partnerType} onChange={handleChange}>
                                    <option value="">Select</option>
                                    <option value="INDIVIDUAL">Individual</option>
                                    <option value="COMPANY">Company</option>
                                    <option value="INSTITUTION">Institution</option>
                                    <option value="CORPORATE">Corporate</option>
                                    <option value="AGENCY">Agency</option>
                                </select>

                            </div>

                            <div className="md:col-span-3 space-y-1">
                                <label className="text-xs font-semibold text-gray-500 uppercase">Business Nature</label>
                                <textarea
                                    name="businessNature"
                                    rows="2"
                                    value={formData.businessNature}
                                    onChange={handleChange}
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
                                    placeholder="Describe the nature of business..."
                                ></textarea>
                            </div>
                        </div>
                    )}

                    {/* STEP 2: Business Details */}
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
                                    placeholder="Complete business address..."
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
                                    <User size={18} className="text-blue-500" /> Contact Details
                                </h3>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-500 uppercase">Contact Person</label>
                                <input
                                    name="contactPerson"
                                    value={formData.contactPerson}
                                    onChange={handleChange}
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
                                    placeholder="Name of contact person"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-500 uppercase">Designation</label>
                                <input
                                    name="contactPersonDesignation"
                                    value={formData.contactPersonDesignation}
                                    onChange={handleChange}
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
                                    placeholder="e.g. Owner, Director"
                                />
                            </div>

                            <div className="md:col-span-3 pb-2 border-b border-gray-100 mb-2 mt-4">
                                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                                    <Briefcase size={18} className="text-blue-500" /> Business Details
                                </h3>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-500 uppercase">Business Category</label>
                                <select
                                    name="businessCategory"
                                    value={formData.businessCategory}
                                    onChange={handleChange}
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
                                >
                                    <option>Finance</option>
                                    <option>Real Estate</option>
                                    <option>Insurance</option>
                                    <option>Legal</option>
                                    <option>Consulting</option>
                                    <option>Technology</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-500 uppercase">Specialization</label>
                                <input
                                    name="specialization"
                                    value={formData.specialization}
                                    onChange={handleChange}
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
                                    placeholder="e.g. Home Loans, Business Loans"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-500 uppercase">Total Employees</label>
                                <input
                                    name="totalEmployees"
                                    type="number"
                                    value={formData.totalEmployees}
                                    onChange={handleChange}
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
                                    placeholder="e.g. 15"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-500 uppercase">Annual Turnover (₹)</label>
                                <input
                                    name="annualTurnover"
                                    value={formData.annualTurnover}
                                    onChange={handleChange}
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
                                    placeholder="e.g. 25000000"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-500 uppercase">Registration No</label>
                                <input
                                    name="registrationNo"
                                    value={formData.registrationNo}
                                    onChange={handleChange}
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
                                    placeholder="Business registration number"
                                />
                            </div>
                        </div>
                    )}

                    {/* STEP 3: Financial Details */}
                    {currentStep === 3 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in slide-in-from-right-4 duration-300">
                            <div>
                                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <DollarSign size={18} className="text-blue-500" /> Financial Details
                                </h3>
                                <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                                    <div className="mb-4">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Commission Type</label>
                                        <select name="commissionType" value={formData.commissionType} onChange={handleChange}>
                                            <option value="PERCENTAGE">Percentage</option>
                                            <option value="FIXED">Fixed Amount</option>
                                        </select>

                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Commission Value <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            name="commissionValue"
                                            value={formData.commissionValue}
                                            onChange={handleChange}
                                            className={`w-full p-3 bg-white border rounded-lg text-lg ${errors.commissionValue ? 'border-red-500' : 'border-green-200'}`}
                                            placeholder={formData.commissionType === 'Percentage' ? "e.g. 2.5" : "e.g. 500"}
                                        />
                                        {errors.commissionValue && <p className="text-xs text-red-500 mt-1">{errors.commissionValue}</p>}
                                        <div className="text-xs text-gray-500 mt-1">
                                            {formData.commissionType === 'Percentage' ? 'Percentage per transaction' : 'Fixed amount per transaction'}
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Payment Cycle</label>
                                        <select name="paymentCycle" value={formData.paymentCycle} onChange={handleChange}>
                                            <option value="MONTHLY">Monthly</option>
                                            <option value="PER_TRANSACTION">Per Transaction</option>
                                        </select>

                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Minimum Payout (₹)</label>
                                        <input
                                            name="minimumPayout"
                                            value={formData.minimumPayout}
                                            onChange={handleChange}
                                            className="w-full p-3 bg-white border border-green-200 rounded-lg"
                                            placeholder="e.g. 10000"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Tax Deduction (%)</label>
                                        <input
                                            name="taxDeduction"
                                            value={formData.taxDeduction}
                                            onChange={handleChange}
                                            className="w-full p-3 bg-white border border-green-200 rounded-lg"
                                            placeholder="e.g. 10"
                                        />
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                        <Target size={18} className="text-blue-500" /> Targets
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Monthly Target (₹)</label>
                                            <input
                                                name="monthlyTarget"
                                                value={formData.monthlyTarget}
                                                onChange={handleChange}
                                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
                                                placeholder="e.g. 5000000"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">Quarterly Target (₹)</label>
                                                <input
                                                    name="quarterlyTarget"
                                                    value={formData.quarterlyTarget}
                                                    onChange={handleChange}
                                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
                                                    placeholder="e.g. 15000000"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">Annual Target (₹)</label>
                                                <input
                                                    name="annualTarget"
                                                    value={formData.annualTarget}
                                                    onChange={handleChange}
                                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
                                                    placeholder="e.g. 60000000"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Performance Rating</label>
                                            <div className="flex gap-2">
                                                {performanceOptions.map(option => (
                                                    <label key={option.value} className="flex-1 text-center cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            name="performanceRating"
                                                            value={option.value}
                                                            checked={formData.performanceRating === option.value}
                                                            onChange={handleChange}
                                                            className="hidden"
                                                        />
                                                        <div className={`p-2 rounded-lg border ${formData.performanceRating === option.value ? 'border-blue-500 bg-blue-50' : 'border-gray-200'} hover:bg-gray-50 transition-colors`}>
                                                            <div className={`px-2 py-1 rounded text-xs font-medium ${option.color}`}>
                                                                {option.label}
                                                            </div>
                                                        </div>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <Landmark size={18} className="text-blue-500" /> Banking Details
                                </h3>
                                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 mb-6">
                                    <div className="space-y-4">
                                        <div className="space-y-1">
                                            <label className="text-sm font-semibold text-gray-700">Account Holder Name</label>
                                            <input
                                                name="accountHolder"
                                                value={formData.accountHolder}
                                                onChange={handleChange}
                                                className="w-full p-3 bg-white border border-blue-200 rounded-lg"
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-sm font-semibold text-gray-700">Bank Name</label>
                                            <input
                                                name="bankName"
                                                value={formData.bankName}
                                                onChange={handleChange}
                                                className="w-full p-3 bg-white border border-blue-200 rounded-lg"
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-sm font-semibold text-gray-700">Account Number</label>
                                            <input
                                                name="accountNo"
                                                value={formData.accountNo}
                                                onChange={handleChange}
                                                className="w-full p-3 bg-white border border-blue-200 rounded-lg"
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-sm font-semibold text-gray-700">IFSC Code</label>
                                            <input
                                                name="ifsc"
                                                value={formData.ifsc}
                                                onChange={handleChange}
                                                className="w-full p-3 bg-white border border-blue-200 rounded-lg"
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-sm font-semibold text-gray-700">UPI ID (Optional)</label>
                                            <input
                                                name="upiId"
                                                value={formData.upiId}
                                                onChange={handleChange}
                                                className="w-full p-3 bg-white border border-blue-200 rounded-lg"
                                                placeholder="username@bank"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                        <FileText size={18} className="text-blue-500" /> KYC Details
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="text-sm font-semibold text-gray-700 block mb-2">GST No</label>
                                                <input
                                                    name="gstNo"
                                                    value={formData.gstNo}
                                                    onChange={handleChange}
                                                    maxLength="15"
                                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
                                                    placeholder="15 character GSTIN"
                                                />
                                            </div>

                                            <div>
                                                <label className="text-sm font-semibold text-gray-700 block mb-2">PAN No</label>
                                                <input
                                                    name="panNo"
                                                    value={formData.panNo}
                                                    onChange={handleChange}
                                                    maxLength="10"
                                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
                                                    placeholder="ABCDE1234F"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 4: Documents & Status */}
                    {currentStep === 4 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in slide-in-from-right-4 duration-300">
                            <div>
                                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <FileText size={18} className="text-blue-500" /> Documents
                                </h3>
                                <div className="space-y-6">
                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                                        <label className="text-xs font-bold text-gray-500 uppercase block mb-3">Company Logo</label>
                                        <div
                                            onClick={() => companyLogoRef.current.click()}
                                            className={`w-32 h-32 mx-auto border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition relative overflow-hidden ${formData.companyLogo ? 'border-blue-400 bg-blue-50' : 'border-gray-300'}`}
                                        >
                                            <input type="file" ref={companyLogoRef} onChange={(e) => handleFileChange(e, 'companyLogo')} className="hidden" accept="image/*" />
                                            {formData.companyLogo ? (
                                                <img src={URL.createObjectURL(formData.companyLogo)} alt="Logo" className="w-full h-full object-cover rounded-lg" />
                                            ) : (
                                                <><Building size={32} className="text-gray-400" /><span className="text-[10px] text-gray-500 mt-1">Upload Logo</span></>
                                            )}
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                                        <label className="text-xs font-bold text-gray-500 uppercase block mb-3">Legal Documents</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div
                                                onClick={() => panRef.current.click()}
                                                className={`border-2 border-dashed rounded-lg h-24 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition ${formData.panDoc ? 'border-green-400 bg-green-50' : 'border-gray-300'}`}
                                            >
                                                <input type="file" ref={panRef} onChange={(e) => handleFileChange(e, 'panDoc')} className="hidden" accept="image/*,.pdf" />
                                                <FileText size={20} className={`${formData.panDoc ? 'text-green-500' : 'text-gray-400'}`} />
                                                <span className="text-[10px] text-gray-500 mt-1">PAN Card</span>
                                            </div>

                                            <div
                                                onClick={() => gstRef.current.click()}
                                                className={`border-2 border-dashed rounded-lg h-24 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition ${formData.gstDoc ? 'border-green-400 bg-green-50' : 'border-gray-300'}`}
                                            >
                                                <input type="file" ref={gstRef} onChange={(e) => handleFileChange(e, 'gstDoc')} className="hidden" accept="image/*,.pdf" />
                                                <FileText size={20} className={`${formData.gstDoc ? 'text-green-500' : 'text-gray-400'}`} />
                                                <span className="text-[10px] text-gray-500 mt-1">GST Certificate</span>
                                            </div>

                                            <div
                                                onClick={() => licenseRef.current.click()}
                                                className={`border-2 border-dashed rounded-lg h-24 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition ${formData.licenseDoc ? 'border-blue-400 bg-blue-50' : 'border-gray-300'}`}
                                            >
                                                <input type="file" ref={licenseRef} onChange={(e) => handleFileChange(e, 'licenseDoc')} className="hidden" accept="image/*,.pdf" />
                                                <FileText size={20} className={`${formData.licenseDoc ? 'text-blue-500' : 'text-gray-400'}`} />
                                                <span className="text-[10px] text-gray-500 mt-1">Business License</span>
                                            </div>

                                            <div
                                                onClick={() => agreementRef.current.click()}
                                                className={`border-2 border-dashed rounded-lg h-24 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition ${formData.agreementDoc ? 'border-purple-400 bg-purple-50' : 'border-gray-300'}`}
                                            >
                                                <input type="file" ref={agreementRef} onChange={(e) => handleFileChange(e, 'agreementDoc')} className="hidden" accept=".pdf,.doc,.docx" />
                                                <FileText size={20} className={`${formData.agreementDoc ? 'text-purple-500' : 'text-gray-400'}`} />
                                                <span className="text-[10px] text-gray-500 mt-1">Agreement</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <ShieldCheck size={18} className="text-blue-500" /> Status & Access
                                </h3>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="text-sm font-semibold text-gray-700 block mb-2">Status</label>
                                            <select
                                                name="status"
                                                value={formData.status}
                                                onChange={handleChange}
                                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
                                            >
                                                <option value="Active">Active</option>
                                                <option value="Inactive">Inactive</option>
                                                <option value="Suspended">Suspended</option>
                                                <option value="Under Review">Under Review</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="text-sm font-semibold text-gray-700 block mb-2">Portal Access</label>
                                            <div className="flex items-center gap-2 mt-2">
                                                <input
                                                    type="checkbox"
                                                    name="portalAccess"
                                                    checked={formData.portalAccess}
                                                    onChange={handleChange}
                                                    className="w-5 h-5 accent-blue-600 rounded"
                                                />
                                                <span className="text-gray-700">Enable portal access</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="text-sm font-semibold text-gray-700 block mb-2">Partnership Date</label>
                                            <input
                                                name="partnershipDate"
                                                type="date"
                                                value={formData.partnershipDate}
                                                onChange={handleChange}
                                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
                                            />
                                        </div>

                                        <div>
                                            <label className="text-sm font-semibold text-gray-700 block mb-2">Renewal Date</label>
                                            <input
                                                name="renewalDate"
                                                type="date"
                                                value={formData.renewalDate}
                                                onChange={handleChange}
                                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
                                            />
                                        </div>
                                    </div>

                                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                                        <label className="text-xs font-bold text-gray-500 uppercase block mb-3">
                                            Login Credentials
                                        </label>

                                        <div className="space-y-3">
                                            <div>
                                                <label className="text-sm font-semibold text-gray-700 block mb-2">
                                                    Username
                                                </label>
                                                <input
                                                    name="username"
                                                    value={formData.username}
                                                    onChange={handleChange}
                                                    className="w-full p-3 bg-white border border-blue-200 rounded-lg"
                                                    placeholder="Create username"
                                                />
                                                {errors.username && (
                                                    <p className="text-xs text-red-500">{errors.username}</p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="text-sm font-semibold text-gray-700 block mb-2">
                                                    Password <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    name="password"
                                                    type="password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    className={`w-full p-3 bg-white border rounded-lg ${errors.password ? "border-red-500" : "border-blue-200"
                                                        }`}
                                                    placeholder="Minimum 8 characters"
                                                />
                                                {errors.password && (
                                                    <p className="text-xs text-red-500">{errors.password}</p>
                                                )}
                                            </div>

                                            <button
                                                type="button"
                                                onClick={generateCredentials}
                                                className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-semibold flex items-center justify-center gap-2"
                                            >
                                                <Key size={16} /> Auto Generate Credentials
                                            </button>
                                        </div>
                                    </div>


                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                                        <label className="text-xs font-bold text-gray-500 uppercase block mb-3">Portal Permissions</label>
                                        <div className="space-y-2">
                                            <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-white rounded transition">
                                                <input
                                                    type="checkbox"
                                                    name="perm_viewLeads"
                                                    checked={formData.permissions.viewLeads}
                                                    onChange={handleChange}
                                                    className="w-5 h-5 accent-blue-600 rounded"
                                                />
                                                <span className="text-gray-700">Can View Leads</span>
                                            </label>

                                            <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-white rounded transition">
                                                <input
                                                    type="checkbox"
                                                    name="perm_addCustomers"
                                                    checked={formData.permissions.addCustomers}
                                                    onChange={handleChange}
                                                    className="w-5 h-5 accent-blue-600 rounded"
                                                />
                                                <span className="text-gray-700">Can Add Customers</span>
                                            </label>

                                            <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-white rounded transition">
                                                <input
                                                    type="checkbox"
                                                    name="perm_viewReports"
                                                    checked={formData.permissions.viewReports}
                                                    onChange={handleChange}
                                                    className="w-5 h-5 accent-blue-600 rounded"
                                                />
                                                <span className="text-gray-700">Can View Reports</span>
                                            </label>

                                            <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-white rounded transition">
                                                <input
                                                    type="checkbox"
                                                    name="perm_accessPortal"
                                                    checked={formData.permissions.accessPortal}
                                                    onChange={handleChange}
                                                    className="w-5 h-5 accent-blue-600 rounded"
                                                />
                                                <span className="text-gray-700">Access Partner Portal</span>
                                            </label>

                                            <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-white rounded transition">
                                                <input
                                                    type="checkbox"
                                                    name="perm_manageSubAgents"
                                                    checked={formData.permissions.manageSubAgents}
                                                    onChange={handleChange}
                                                    className="w-5 h-5 accent-blue-600 rounded"
                                                />
                                                <span className="text-gray-700">Can Manage Sub-Agents</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* FORM NAVIGATION BUTTONS */}
                    <div className="mt-8 flex justify-between pt-6 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={() => setCurrentStep(prev => Math.max(prev - 1, 1))}
                            disabled={currentStep === 1}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium transition-all ${currentStep === 1 ? 'opacity-0 cursor-default' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}
                        >
                            <ChevronLeft size={18} /> Back
                        </button>

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
                                <Check size={18} /> {isEditing ? "Update Partner" : "Submit Partner"}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PartnerAddForm;