import React, { useState, useEffect, useMemo } from 'react';
import {
    Search, Filter, Download, MoreVertical, Eye, Edit, Trash2, FileCheck,
    ShieldCheck, AlertCircle, Plus, Building, Briefcase, MapPin, Phone,
    Mail, Percent, Check, ChevronRight, ChevronLeft, X
} from 'lucide-react';
import PartnerAddForm from '../../../components/partner/PartnerForm/PartnerAddForm';
import Pagination from '../../../components/admin/common/Pagination';
import axios from "axios";


const PartnerList = () => {
    const [view, setView] = useState('list'); // 'list' or 'add'
    const [currentStep, setCurrentStep] = useState(1);
    const [errors, setErrors] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [showPartnerModal, setShowPartnerModal] = useState(false);


    // --- SEARCH & FILTER STATE ---
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [filterType, setFilterType] = useState('All');
    const [showFilterMenu, setShowFilterMenu] = useState(false);
    const [showActionMenu, setShowActionMenu] = useState(null);

    // Refs for file inputs
    const companyLogoRef = React.useRef(null);
    const agreementRef = React.useRef(null);
    const panRef = React.useRef(null);
    const gstRef = React.useRef(null);
    const licenseRef = React.useRef(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // --- FORM STATE ---
    const initialFormState = {
        companyName: '',
        partnerName: '',
        email: '',
        phone: '',
        altPhone: '',
        website: '',
        establishedYear: '',
        partnerType: 'Individual',
        businessNature: '',

        address: '',
        city: '',
        state: '',
        pincode: '',
        country: 'India',
        contactPerson: '',
        contactPersonDesignation: '',

        partnerId: '',
        businessCategory: 'Finance',
        specialization: '',
        totalEmployees: '',
        annualTurnover: '',
        registrationNo: '',
        gstNo: '',
        panNo: '',

        companyLogo: null,
        panDoc: null,
        gstDoc: null,
        licenseDoc: null,
        agreementDoc: null,

        accountHolder: '',
        bankName: '',
        accountNo: '',
        ifsc: '',
        upiId: '',

        commissionType: 'Percentage',
        commissionValue: '',
        paymentCycle: 'Monthly',
        minimumPayout: '',
        taxDeduction: '',

        monthlyTarget: '',
        quarterlyTarget: '',
        annualTarget: '',
        performanceRating: '3',

        status: 'Active',
        partnershipDate: '',
        renewalDate: '',
        permissions: {
            viewLeads: false,
            addCustomers: false,
            viewReports: false,
            accessPortal: false,
            manageSubAgents: false
        },

        username: '',
        password: '',
        portalAccess: false
    };

    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, filterStatus, filterType]);


    const [partners, setPartners] = useState([]);


    const fetchPartners = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/partner/all`,
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            setPartners(res.data.data || res.data.partners || []);
        } catch (error) {
            console.error("Failed to fetch partners", error);
        }
    };


    useEffect(() => {
        fetchPartners();
    }, []);


    // Partner Types for filtering
    const partnerTypes = ['All', 'Individual', 'Company', 'Institution', 'Corporate', 'Agency'];

    // Performance Options
    const performanceOptions = [
        { value: '1', label: 'Poor', color: 'bg-red-100 text-red-800' },
        { value: '2', label: 'Below Average', color: 'bg-orange-100 text-orange-800' },
        { value: '3', label: 'Average', color: 'bg-yellow-100 text-yellow-800' },
        { value: '4', label: 'Good', color: 'bg-green-100 text-green-800' },
        { value: '5', label: 'Excellent', color: 'bg-blue-100 text-blue-800' }
    ];

    // --- FILTERED DATA LOGIC ---
    const filteredPartners = useMemo(() => {
        return partners.filter(partner => {
            const matchesSearch =
                partner.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                partner.partnerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                partner.phone.includes(searchQuery) ||
                partner.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                partner.partnerId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                partner.city.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesStatus = filterStatus === 'All' || partner.status === filterStatus;
            const matchesType = filterType === 'All' || partner.partnerType === filterType;

            return matchesSearch && matchesStatus && matchesType;
        });
    }, [partners, searchQuery, filterStatus, filterType]);

    const totalPages = Math.ceil(filteredPartners.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const currentPartners = filteredPartners.slice(startIndex, endIndex);


    // --- EXPORT HANDLER ---
    const handleExport = () => {
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "Partner ID,Company Name,Contact Person,Email,Phone,Type,Status,Commission,Monthly Target,Performance Rating\n";

        filteredPartners.forEach(partner => {
            const row = `${partner.partnerId},"${partner.companyName}","${partner.contactPerson}","${partner.email}","${partner.phone}","${partner.partnerType}","${partner.status}","${partner.commissionValue}","${partner.monthlyTarget}","${partner.performanceRating}/5"`;
            csvContent += row + "\n";
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "partners_list.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // --- FORM HANDLERS ---
    const resetForm = () => {
        setFormData(initialFormState);
        setErrors({});
        setIsEditing(false);
        setEditId(null);
        setCurrentStep(1);
        setView('list');
    };

    const handleAddNew = () => {
        resetForm();
        setView('add');
        const newId = `PTR${String(partners.length + 101).padStart(3, '0')}`;
        setFormData(prev => ({ ...prev, partnerId: newId }));
        setShowPartnerModal(true);

    };

    const handleEdit = (partner) => {
        setFormData({
            ...initialFormState,
            companyName: partner.companyName,
            partnerName: partner.partnerName,
            email: partner.email || '',
            phone: partner.phone,
            altPhone: partner.altPhone,
            website: partner.website,
            establishedYear: partner.establishedYear,
            partnerType: partner.partnerType,
            businessNature: partner.businessNature,
            address: partner.address,
            city: partner.city,
            state: partner.state,
            pincode: partner.pincode,
            contactPerson: partner.contactPerson,
            contactPersonDesignation: partner.contactPersonDesignation,
            partnerId: partner.partnerId,
            businessCategory: partner.businessCategory || 'Finance',
            specialization: partner.specialization,
            totalEmployees: partner.totalEmployees,
            annualTurnover: partner.annualTurnover ? partner.annualTurnover.replace('₹', '').replace(' Cr', '').replace(' Lakhs', '') : '',
            registrationNo: partner.registrationNo,
            gstNo: partner.gstNo,
            panNo: partner.panNo,
            accountHolder: partner.accountHolder,
            bankName: partner.bankName,
            accountNo: partner.accountNo,
            ifsc: partner.ifsc,
            upiId: partner.upiId,
            commissionType: partner.commissionType,
            commissionValue: partner.commissionValue ? partner.commissionValue.replace('%', '').replace('₹', '') : '',
            paymentCycle: partner.paymentCycle,
            minimumPayout: partner.minimumPayout ? partner.minimumPayout.replace('₹', '').replace(',', '') : '',
            monthlyTarget: partner.monthlyTarget ? partner.monthlyTarget.replace('₹', '').replace(',', '') : '',
            quarterlyTarget: partner.quarterlyTarget ? partner.quarterlyTarget.replace('₹', '').replace(',', '').replace(' Cr', '0000000').replace(' Lakhs', '00000') : '',
            annualTarget: partner.annualTarget ? partner.annualTarget.replace('₹', '').replace(',', '').replace(' Cr', '0000000').replace(' Lakhs', '00000') : '',
            performanceRating: partner.performanceRating,
            status: partner.status,
            partnershipDate: partner.partnershipDate,
            renewalDate: partner.renewalDate,
            portalAccess: partner.portalAccess || false,
            username: partner.username,
            permissions: partner.permissions || {
                viewLeads: false,
                addCustomers: false,
                viewReports: false,
                accessPortal: false,
                manageSubAgents: false
            }
        });

        setEditId(partner.id);
        setIsEditing(true);
        setView('add');
        setCurrentStep(1);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this partner? This action cannot be undone.")) {
            setPartners(partners.filter(partner => partner.id !== id));
        }
    };

    const generateCredentials = () => {
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        const generatedUser = formData.companyName ? `${formData.companyName.split(' ')[0].toLowerCase()}${randomNum}` : `partner${randomNum}`;
        const generatedPass = Math.random().toString(36).slice(-8).toUpperCase();

        setFormData(prev => ({ ...prev, username: generatedUser, password: generatedPass }));
        setErrors(prev => ({ ...prev, username: '', password: '' }));
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        let newValue = value;

        if (name === 'phone' || name === 'altPhone') newValue = value.replace(/[^0-9]/g, '').slice(0, 10);
        if (name === 'pincode') newValue = value.replace(/[^0-9]/g, '').slice(0, 6);
        if (name === 'gstNo') newValue = value.toUpperCase().slice(0, 15);
        if (name === 'panNo') newValue = value.toUpperCase().slice(0, 10);
        if (name === 'annualTurnover' || name === 'monthlyTarget' || name === 'quarterlyTarget' || name === 'annualTarget' || name === 'minimumPayout' || name === 'commissionValue') {
            newValue = value.replace(/[^0-9.]/g, '');
        }

        if (type === 'checkbox') {
            if (name === 'portalAccess') {
                setFormData(prev => ({ ...prev, portalAccess: checked }));
            } else if (name.startsWith('perm_')) {
                const key = name.replace('perm_', '');
                setFormData(prev => ({
                    ...prev,
                    permissions: { ...prev.permissions, [key]: checked }
                }));
            } else {
                setFormData({ ...formData, [name]: checked });
            }
        } else {
            setFormData({ ...formData, [name]: newValue });
            if (errors[name]) setErrors({ ...errors, [name]: '' });
        }
    };

    const handleFileChange = (e, fieldName) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, [fieldName]: file }));
            if (errors[fieldName]) setErrors({ ...errors, [fieldName]: '' });
        }
    };

    const validateStep = (step) => {
        let newErrors = {};
        if (step === 1) {
            if (!formData.companyName) newErrors.companyName = "Company Name is required";
            if (!formData.partnerName) newErrors.partnerName = "Contact Person is required";
            if (!formData.email) newErrors.email = "Email is required";
            if (!formData.phone || formData.phone.length < 10) newErrors.phone = "Valid Phone is required";
            if (!formData.partnerId) newErrors.partnerId = "Partner ID is required";
        }
        if (step === 3) {
            if (!formData.commissionValue) newErrors.commissionValue = "Commission Value is required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateStep(4)) return;

        const partnerPayload = {
            id: isEditing ? editId : `PTR${String(partners.length + 101).padStart(3, '0')}`,
            ...formData,
            annualTurnover: formData.annualTurnover ? `₹${parseFloat(formData.annualTurnover).toLocaleString('en-IN')}` : '',
            monthlyTarget: formData.monthlyTarget ? `₹${parseFloat(formData.monthlyTarget).toLocaleString('en-IN')}` : '',
            quarterlyTarget: formData.quarterlyTarget ? `₹${(parseFloat(formData.quarterlyTarget) / 1000000).toFixed(1)} Cr` : '',
            annualTarget: formData.annualTarget ? `₹${(parseFloat(formData.annualTarget) / 1000000).toFixed(1)} Cr` : '',
            minimumPayout: formData.minimumPayout ? `₹${parseFloat(formData.minimumPayout).toLocaleString('en-IN')}` : '',
            commissionValue: formData.commissionType === 'Percentage' ?
                `${formData.commissionValue}%` :
                `₹${parseFloat(formData.commissionValue).toLocaleString('en-IN')}`
        };

        if (isEditing) {
            setPartners(partners.map(partner => (partner.id === editId ? partnerPayload : partner)));
            alert("Partner Updated Successfully!");
        } else {
            setPartners([...partners, partnerPayload]);
            alert("Partner Added Successfully!");
        }
        resetForm();
    };

    // Get performance rating color
    const getPerformanceColor = (rating) => {
        const option = performanceOptions.find(opt => opt.value === rating);
        return option ? option.color : 'bg-gray-100 text-gray-800';
    };



    return (
        <div className="min-h-screen bg-gray-50 p-6 lg:p-10">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Partner Management</h1>
                    <p className="text-gray-500 mt-1">Manage partners, commissions, targets, and agreements.</p>
                </div>

                <button
                    onClick={handleAddNew}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 shadow-lg transition-all"
                >
                    <Plus size={20} /> Add New Partner
                </button>
            </div>

            {/* SEARCH AND FILTER BAR */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden animate-in fade-in duration-300">
                <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50/50">
                    <div className="relative w-full sm:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by company, contact, or ID..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                    </div>

                    <div className="flex gap-2 relative">
                        <div className="relative">
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium bg-white text-gray-600 hover:bg-gray-50"
                            >
                                {partnerTypes.map(type => (
                                    <option key={type} value={type}>{type} Partner</option>
                                ))}
                            </select>
                        </div>

                        <div className="relative">
                            <button
                                onClick={() => setShowFilterMenu(!showFilterMenu)}
                                className={`px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2 ${filterStatus !== 'All' ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-white text-gray-600'}`}
                            >
                                <Filter size={16} />
                                {filterStatus === 'All' ? 'Filter Status' : filterStatus}
                            </button>

                            {showFilterMenu && (
                                <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-gray-100 z-10 p-1">
                                    {['All', 'Active', 'Inactive', 'Suspended', 'Under Review'].map((status) => (
                                        <button
                                            key={status}
                                            onClick={() => { setFilterStatus(status); setShowFilterMenu(false); }}
                                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${filterStatus === status ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50 text-gray-700'}`}
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button
                            onClick={handleExport}
                            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 text-gray-600 flex items-center gap-2"
                        >
                            <Download size={16} /> Export
                        </button>
                    </div>
                </div>

                {/* PARTNER TABLE */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
                            <tr>
                                <th className="px-6 py-4">Partner ID</th>
                                <th className="px-6 py-4">Company Name</th>
                                <th className="px-6 py-4">Contact Person</th>
                                <th className="px-6 py-4">Type</th>
                                <th className="px-6 py-4">Contact</th>
                                <th className="px-6 py-4">Commission</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {currentPartners.map((partner) => (
                                <tr key={partner.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-blue-600 text-sm font-medium">#{partner.partnerId}</td>
                                    <td className="px-6 py-4 font-medium text-gray-800 flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                                            {partner.companyName.charAt(0)}
                                        </div>
                                        <div>
                                            <div>{partner.companyName}</div>
                                            <div className="text-xs text-gray-500">{partner.email}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 text-sm">
                                        <div>{partner.contactPerson}</div>
                                        <div className="text-xs text-gray-500">{partner.contactPersonDesignation}</div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 text-sm">
                                        <span className="px-2 py-1 bg-purple-50 text-purple-600 rounded text-xs font-medium">
                                            {partner.partnerType}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 text-sm">
                                        <div>{partner.phone}</div>
                                        <div className="text-xs text-gray-500">{partner.city}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-green-600 text-sm">{partner.commissionValue}</div>
                                        <div className="text-xs text-gray-500">{partner.paymentCycle}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1">
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border 
                        ${partner.status === 'Active' ? 'bg-green-50 text-green-700 border-green-100' :
                                                    partner.status === 'Inactive' ? 'bg-red-50 text-red-700 border-red-100' :
                                                        partner.status === 'Suspended' ? 'bg-yellow-50 text-yellow-700 border-yellow-100' :
                                                            'bg-gray-50 text-gray-700 border-gray-100'}`}>
                                                {partner.status}
                                            </span>
                                            <div className={`px-2 py-0.5 rounded text-xs ${getPerformanceColor(partner.performanceRating)}`}>
                                                {partner.performanceRating}/5 Rating
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2 relative">

                                            <div className="relative">
                                                <button
                                                    onClick={() => setShowActionMenu(showActionMenu === partner.id ? null : partner.id)}
                                                    className="p-1.5 text-gray-600 hover:bg-gray-50 rounded relative"
                                                    title="More Actions"
                                                >
                                                    <MoreVertical size={16} />
                                                </button>

                                                {showActionMenu === partner.id && (
                                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-10 p-1 animate-in slide-in-from-top-2 duration-200">
                                                        <button onClick={() => handleEdit(partner)} className="text-green-600 hover:bg-green-50 rounded w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors">
                                                            <Edit size={16} />
                                                            Edit Partner
                                                        </button>

                                                        <button
                                                            onClick={() => handleDelete(partner.id)}
                                                            className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-red-50 text-red-600 flex items-center gap-2 transition-colors"
                                                        >
                                                            <Trash2 size={14} />
                                                            Delete Partner
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredPartners.length === 0 && (
                        <div className="text-center py-10 text-gray-500">
                            {searchQuery || filterStatus !== 'All' || filterType !== 'All' ? "No matching partners found." : "No partners found. Click \"Add New Partner\" to start."}
                        </div>
                    )},

                    {totalPages > 1 && (
                        <div className="h-[64px] bg-white border-t border-gray-100 px-6 flex items-center justify-between">
                            <p className="text-sm text-gray-500">
                                Showing {startIndex + 1}–{Math.min(endIndex, filteredPartners.length)} of {filteredPartners.length}
                            </p>

                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                                containerClassName="justify-end"
                                buttonClassName="hover:bg-gray-100 transition-colors"
                                activeButtonClassName="bg-blue-600 text-white"
                            />
                        </div>
                    )}
                </div>
                {/* ADD / EDIT PARTNER MODAL */}
                {showPartnerModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">

                        {/* BACKDROP */}
                        <div
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                            onClick={() => setShowPartnerModal(false)}
                        />

                        {/* MODAL CARD */}
                        <div className="relative bg-white w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl p-6 animate-in zoom-in-95 duration-200">

                            {/* HEADER */}
                            <div className="flex justify-between items-center mb-4 border-b pb-3">
                                <h2 className="text-xl font-bold text-gray-800">
                                    {isEditing ? "Edit Partner" : "Add New Partner"}
                                </h2>
                                <button
                                    onClick={() => setShowPartnerModal(false)}
                                    className="p-2 hover:bg-gray-100 rounded-lg"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* FORM */}
                            <PartnerAddForm

                                currentStep={currentStep}
                                setCurrentStep={setCurrentStep}
                                formData={formData}
                                setFormData={setFormData}
                                errors={errors}
                                setErrors={setErrors}
                                isEditing={isEditing}
                                editId={editId}
                                handleChange={handleChange}
                                handleFileChange={handleFileChange}
                                validateStep={validateStep}
                                handleSubmit={async (e) => {
                                    await handleSubmit(e);
                                    await fetchPartners(); // ✅ REFRESH LIST
                                    setShowPartnerModal(false);
                                }}
                                resetForm={() => {
                                    resetForm();
                                    setShowPartnerModal(false);
                                }}
                                companyLogoRef={companyLogoRef}
                                panRef={panRef}
                                gstRef={gstRef}
                                licenseRef={licenseRef}
                                agreementRef={agreementRef}
                                performanceOptions={performanceOptions}
                                generateCredentials={generateCredentials}
                                onCancel={() => setShowPartnerModal(false)}
                            />
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default PartnerList;