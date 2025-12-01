import React, { useState, useRef } from 'react';
import { 
  User, MapPin, Briefcase, FileText, Landmark, Key, Percent, ShieldCheck, 
  Check, ChevronRight, ChevronLeft, Plus, Search, Trash2, Edit, Eye, UploadCloud, XCircle, Save, Filter, Download, X
} from 'lucide-react';

export default function PartnerAdd() {
  const [view, setView] = useState('list');
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // --- VIEW MODAL STATE ---
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewData, setViewData] = useState(null);

  // --- SEARCH & FILTER STATE ---
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All'); // All, Active, Inactive, Pending
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  // Refs for file inputs
  const aadhaarFrontRef = useRef(null);
  const aadhaarBackRef = useRef(null);
  const panRef = useRef(null);
  const photoRef = useRef(null);
  
  // --- FORM STATE ---
  const initialFormState = {
    // 1. Basic
    fullName: '', email: '', phone: '', altPhone: '', dob: '', gender: 'Male',
    // 2. Address
    address: '', city: '', state: '', pincode: '',
    // 3. Professional
    partnerType: 'Agent', experience: '', targetArea: '',
    // 4. KYC
    aadhaarNo: '', panNo: '', 
    aadhaarFrontImg: null, aadhaarBackImg: null, panImg: null, profilePhoto: null,
    // 5. Bank
    accountHolder: '', bankName: '', accountNo: '', ifsc: '', upiId: '',
    // 6. Login
    username: '', password: '',
    // 7. Commission
    commissionType: 'Percentage', commissionValue: '',
    // 8. Status & Permissions
    status: 'Active',
    permissions: { addCustomer: false, viewCustomer: false, trackLoan: false }
  };

  const [formData, setFormData] = useState(initialFormState);

  // --- MOCK DATA ---
  const [partners, setPartners] = useState([
    { 
      id: 101, fullName: "Rajesh Kumar", email: "rajesh@example.com", phone: "9876543210", altPhone: "9876500000", dob: "1990-01-01", gender: "Male",
      address: "123, Main Street", city: "Jaipur", state: "Rajasthan", pincode: "302001",
      type: "Agent", experience: "5 Years", area: "Jaipur", targetArea: "Jaipur City",
      aadhaarNo: "123456789012", panNo: "ABCDE1234F",
      accountHolder: "Rajesh Kumar", bankName: "HDFC Bank", accountNo: "5010000000", ifsc: "HDFC000123", upiId: "rajesh@hdfc",
      username: "rajesh123", password: "password",
      status: "Active", commission: "2%",
      permissions: { addCustomer: true, viewCustomer: true, trackLoan: true }
    },
    { 
      id: 102, fullName: "Alpha Solutions", email: "alpha@example.com", phone: "9988776655", altPhone: "", dob: "", gender: "Other",
      address: "45, Tech Park", city: "Delhi", state: "Delhi", pincode: "110001",
      type: "Company Partner", experience: "10 Years", area: "Delhi", targetArea: "North India",
      aadhaarNo: "987654321098", panNo: "XYZAB1234C",
      accountHolder: "Alpha Sol", bankName: "SBI", accountNo: "3000000000", ifsc: "SBIN000123", upiId: "",
      username: "alpha_co", password: "securepass",
      status: "Active", commission: "Fixed ₹5000",
      permissions: { addCustomer: true, viewCustomer: false, trackLoan: true }
    },
  ]);

  // --- FILTERED DATA LOGIC ---
  const filteredPartners = partners.filter(partner => {
      const matchesSearch = 
          partner.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          partner.phone.includes(searchQuery) ||
          (partner.area && partner.area.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (partner.type && partner.type.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesFilter = filterStatus === 'All' || partner.status === filterStatus;

      return matchesSearch && matchesFilter;
  });

  // --- EXPORT HANDLER (CSV for Excel) ---
  const handleExport = () => {
      // CSV Headers
      let csvContent = "data:text/csv;charset=utf-8,";
      csvContent += "ID,Name,Email,Phone,Type,Area,Commission,Status\n"; // Header row

      // Rows
      filteredPartners.forEach(p => {
          const row = `${p.id},"${p.fullName}","${p.email}","${p.phone}","${p.type}","${p.area}","${p.commission}","${p.status}"`;
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

  // --- VIEW HANDLER ---
  const handleView = (partner) => {
      setViewData(partner);
      setShowViewModal(true);
  };

  // --- DOWNLOAD SINGLE PROFILE (CSV for Excel) ---
  const handleDownloadProfile = () => {
      if (!viewData) return;
      
      // Creating a key-value CSV structure for a single profile
      const rows = [
          ["Field", "Value"],
          ["ID", viewData.id],
          ["Full Name", viewData.fullName],
          ["Email", viewData.email],
          ["Phone", viewData.phone],
          ["Alt Phone", viewData.altPhone || 'N/A'],
          ["Type", viewData.type],
          ["Status", viewData.status],
          ["DOB", viewData.dob || 'N/A'],
          ["Gender", viewData.gender],
          ["Address", `"${viewData.address}, ${viewData.city}, ${viewData.state} - ${viewData.pincode}"`], // Escape commas
          ["Experience", viewData.experience],
          ["Target Area", viewData.targetArea || viewData.area],
          ["Aadhaar No", `'${viewData.aadhaarNo}`], // Adding ' to force Excel to treat as text
          ["PAN No", viewData.panNo],
          ["Bank Name", viewData.bankName],
          ["Account No", `'${viewData.accountNo}`],
          ["IFSC Code", viewData.ifsc],
          ["UPI ID", viewData.upiId || 'N/A'],
          ["Commission", viewData.commission],
          ["Username", viewData.username],
          ["Password", viewData.password]
      ];

      let csvContent = "data:text/csv;charset=utf-8,";
      rows.forEach(rowArray => {
          const row = rowArray.join(",");
          csvContent += row + "\n";
      });

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.href = encodedUri;
      link.download = `${viewData.fullName}_Profile.csv`;
      link.click();
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
  };

  const handleEdit = (partner) => {
      let commType = 'Percentage';
      let commVal = '';
      if (partner.commission && partner.commission.includes('%')) {
          commType = 'Percentage';
          commVal = partner.commission.replace('%', '');
      } else if (partner.commission) {
          commType = 'Fixed';
          commVal = partner.commission.replace(/[^0-9]/g, '');
      }

      setFormData({
          ...initialFormState,
          fullName: partner.fullName,
          email: partner.email || '',
          phone: partner.phone,
          altPhone: partner.altPhone,
          dob: partner.dob,
          gender: partner.gender,
          address: partner.address,
          city: partner.city,
          state: partner.state,
          pincode: partner.pincode,
          partnerType: partner.type,
          experience: partner.experience,
          targetArea: partner.targetArea || partner.area,
          aadhaarNo: partner.aadhaarNo,
          panNo: partner.panNo,
          accountHolder: partner.accountHolder,
          bankName: partner.bankName,
          accountNo: partner.accountNo,
          ifsc: partner.ifsc,
          upiId: partner.upiId,
          username: partner.username,
          password: partner.password,
          status: partner.status,
          commissionType: commType,
          commissionValue: commVal,
          permissions: partner.permissions || { addCustomer: false, viewCustomer: false, trackLoan: false }
      });
      
      setEditId(partner.id);
      setIsEditing(true);
      setView('add');
      setCurrentStep(1);
  };

  const handleDelete = (id) => {
      if (window.confirm("Are you sure you want to delete this partner? This action cannot be undone.")) {
          setPartners(partners.filter(p => p.id !== id));
      }
  };

  const generateCredentials = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const generatedUser = formData.fullName ? `${formData.fullName.split(' ')[0].toLowerCase()}${randomNum}` : `partner${randomNum}`;
    const generatedPass = Math.random().toString(36).slice(-8).toUpperCase();
    
    setFormData(prev => ({ ...prev, username: generatedUser, password: generatedPass }));
    setErrors(prev => ({ ...prev, username: '', password: '' }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = value;

    if (name === 'phone' || name === 'altPhone') newValue = value.replace(/[^0-9]/g, '').slice(0, 10);
    if (name === 'pincode') newValue = value.replace(/[^0-9]/g, '').slice(0, 6);
    if (name === 'aadhaarNo') newValue = value.replace(/[^0-9]/g, '').slice(0, 12);
    if (name === 'panNo') newValue = value.toUpperCase().slice(0, 10);

    if (type === 'checkbox') {
        if (name.startsWith('perm_')) {
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
          if (!formData.fullName) newErrors.fullName = "Full Name is required";
          if (!formData.email) newErrors.email = "Email is required";
          if (!formData.phone || formData.phone.length < 10) newErrors.phone = "Valid Phone is required";
      }
      if (step === 4) {
          if (!formData.commissionValue) newErrors.commissionValue = "Commission value is required";
      }
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
      if (validateStep(currentStep)) {
          setCurrentStep(prev => Math.min(prev + 1, 4));
      }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep(4)) return;

    const partnerPayload = {
        id: isEditing ? editId : Date.now(),
        ...formData,
        type: formData.partnerType,
        area: formData.city || formData.targetArea,
        commission: formData.commissionType === 'Percentage' ? `${formData.commissionValue}%` : `Fixed ₹${formData.commissionValue}`
    };

    if (isEditing) {
        setPartners(partners.map(p => (p.id === editId ? partnerPayload : p)));
        alert("Partner Updated Successfully!");
    } else {
        setPartners([...partners, partnerPayload]);
        alert("Partner Added Successfully!");
    }
    resetForm();
  };

  const steps = [
    { id: 1, title: "Identity & Login", icon: <User size={18} /> },
    { id: 2, title: "Address & Work", icon: <Briefcase size={18} /> },
    { id: 3, title: "KYC & Banking", icon: <Landmark size={18} /> },
    { id: 4, title: "Setup & Controls", icon: <ShieldCheck size={18} /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-10 relative">
      
      {/* VIEW MODAL OVERLAY */}
      {showViewModal && viewData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                
                {/* Modal Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-lg font-bold">
                            {viewData.fullName.charAt(0)}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">{viewData.fullName}</h2>
                            <p className="text-sm text-gray-500">{viewData.type} • ID: #{viewData.id}</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={handleDownloadProfile} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-sm">
                            <Download size={16} /> Download Excel (CSV)
                        </button>
                        <button onClick={() => setShowViewModal(false)} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition">
                            <X size={24} />
                        </button>
                    </div>
                </div>

                {/* Modal Content - Scrollable */}
                <div className="p-6 overflow-y-auto custom-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        
                        {/* Section 1: Basic Info */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider border-b pb-2">Personal Details</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div><span className="text-gray-500 block">Email</span> <span className="font-medium text-gray-800">{viewData.email}</span></div>
                                <div><span className="text-gray-500 block">Phone</span> <span className="font-medium text-gray-800">{viewData.phone}</span></div>
                                <div><span className="text-gray-500 block">Alt Phone</span> <span className="font-medium text-gray-800">{viewData.altPhone || '-'}</span></div>
                                <div><span className="text-gray-500 block">Gender</span> <span className="font-medium text-gray-800">{viewData.gender}</span></div>
                                <div><span className="text-gray-500 block">DOB</span> <span className="font-medium text-gray-800">{viewData.dob || '-'}</span></div>
                            </div>
                        </div>

                        {/* Section 2: Work & Address */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider border-b pb-2">Work & Location</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div><span className="text-gray-500 block">Type</span> <span className="font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded inline-block">{viewData.type}</span></div>
                                <div><span className="text-gray-500 block">Experience</span> <span className="font-medium text-gray-800">{viewData.experience || '-'}</span></div>
                                <div className="col-span-2"><span className="text-gray-500 block">Address</span> <span className="font-medium text-gray-800">{viewData.address}, {viewData.city}</span></div>
                                <div><span className="text-gray-500 block">State</span> <span className="font-medium text-gray-800">{viewData.state}</span></div>
                                <div><span className="text-gray-500 block">Pincode</span> <span className="font-medium text-gray-800">{viewData.pincode}</span></div>
                            </div>
                        </div>

                        {/* Section 3: Banking */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider border-b pb-2">Banking Details</h3>
                            <div className="bg-gray-50 p-4 rounded-xl space-y-2 text-sm">
                                <div className="flex justify-between"><span>Bank Name:</span> <span className="font-bold text-gray-800">{viewData.bankName}</span></div>
                                <div className="flex justify-between"><span>Account No:</span> <span className="font-mono text-gray-800">{viewData.accountNo}</span></div>
                                <div className="flex justify-between"><span>IFSC Code:</span> <span className="font-mono text-gray-800">{viewData.ifsc}</span></div>
                                <div className="flex justify-between"><span>Holder:</span> <span className="font-medium text-gray-800">{viewData.accountHolder}</span></div>
                            </div>
                        </div>

                        {/* Section 4: KYC & Config */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider border-b pb-2">KYC & Account</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div><span className="text-gray-500 block">Aadhaar</span> <span className="font-mono text-gray-800">{viewData.aadhaarNo}</span></div>
                                <div><span className="text-gray-500 block">PAN</span> <span className="font-mono text-gray-800">{viewData.panNo}</span></div>
                                <div><span className="text-gray-500 block">Username</span> <span className="font-medium text-gray-800">{viewData.username}</span></div>
                                <div><span className="text-gray-500 block">Commission</span> <span className="font-bold text-green-600">{viewData.commission}</span></div>
                                <div><span className="text-gray-500 block">Status</span> <span className={`px-2 py-0.5 rounded text-xs font-bold ${viewData.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{viewData.status}</span></div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
      )}

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Partner Management</h1>
          <p className="text-gray-500 mt-1">Onboard new partners and manage existing network.</p>
        </div>
        
        {view === 'list' ? (
             <button 
               onClick={handleAddNew}
               className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 shadow-lg transition-all"
             >
                <Plus size={20} /> Add New Partner
             </button>
        ) : (
             <button 
               onClick={resetForm}
               className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2.5 rounded-xl transition-all"
             >
                Cancel & View List
             </button>
        )}
      </div>

      {/* --- VIEW: ADD/EDIT PARTNER --- */}
      {view === 'add' && (
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
                <h2 className="text-xl font-bold text-gray-800 text-center">{isEditing ? `Edit Partner #${editId}` : "Register New Partner"}</h2>
            </div>

            <form onSubmit={handleSubmit} className="p-8">
                {currentStep === 1 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in slide-in-from-right-4 duration-300">
                        <div className="md:col-span-3 pb-2 border-b border-gray-100 mb-2"><h3 className="font-bold text-gray-800 flex items-center gap-2"><User size={18} className="text-blue-500"/> Personal Identity</h3></div>
                        <div className="space-y-1"><label className="text-xs font-semibold text-gray-500 uppercase">Full Name <span className="text-red-500">*</span></label><input name="fullName" value={formData.fullName} onChange={handleChange} className={`w-full p-3 bg-gray-50 border rounded-lg ${errors.fullName ? 'border-red-500' : 'border-gray-200'}`} placeholder="e.g. Rahul Sharma" />{errors.fullName && <p className="text-xs text-red-500">{errors.fullName}</p>}</div>
                        <div className="space-y-1"><label className="text-xs font-semibold text-gray-500 uppercase">Email Address <span className="text-red-500">*</span></label><input name="email" type="email" value={formData.email} onChange={handleChange} className={`w-full p-3 bg-gray-50 border rounded-lg ${errors.email ? 'border-red-500' : 'border-gray-200'}`} placeholder="rahul@example.com" />{errors.email && <p className="text-xs text-red-500">{errors.email}</p>}</div>
                        <div className="space-y-1"><label className="text-xs font-semibold text-gray-500 uppercase">Phone Number <span className="text-red-500">*</span></label><input name="phone" type="tel" value={formData.phone} onChange={handleChange} maxLength="10" className={`w-full p-3 bg-gray-50 border rounded-lg ${errors.phone ? 'border-red-500' : 'border-gray-200'}`} placeholder="9876543210" />{errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}</div>
                        <div className="space-y-1"><label className="text-xs font-semibold text-gray-500 uppercase">Alt Phone</label><input name="altPhone" type="tel" maxLength="10" value={formData.altPhone} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg" /></div>
                        <div className="space-y-1"><label className="text-xs font-semibold text-gray-500 uppercase">Date of Birth</label><input name="dob" type="date" value={formData.dob} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg" /></div>
                        <div className="space-y-1"><label className="text-xs font-semibold text-gray-500 uppercase">Gender</label><select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"><option>Male</option><option>Female</option><option>Other</option></select></div>
                        <div className="md:col-span-3 pb-2 border-b border-gray-100 mb-2 mt-4"><h3 className="font-bold text-gray-800 flex items-center gap-2"><Key size={18} className="text-blue-500"/> Login Credentials</h3></div>
                        <div className="space-y-1"><label className="text-xs font-semibold text-gray-500 uppercase">Username</label><input name="username" value={formData.username} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg" placeholder="Create username" /></div>
                        <div className="space-y-1"><label className="text-xs font-semibold text-gray-500 uppercase">Password</label><input name="password" value={formData.password} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg" placeholder="••••••••" /></div>
                        <div className="space-y-1 flex items-end"><button type="button" onClick={generateCredentials} className="w-full p-3 bg-blue-50 text-blue-600 rounded-lg border border-blue-100 hover:bg-blue-100 transition text-sm font-semibold flex items-center justify-center gap-2"><Key size={16} /> Auto Generate</button></div>
                    </div>
                )}
                
                {/* Abbreviated step 2 & 3 */}
                {currentStep === 2 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in slide-in-from-right-4 duration-300">
                        <div className="md:col-span-3 pb-2 border-b border-gray-100 mb-2"><h3 className="font-bold text-gray-800 flex items-center gap-2"><MapPin size={18} className="text-blue-500"/> Address Details</h3></div>
                        <div className="md:col-span-3 space-y-1"><label className="text-xs font-semibold text-gray-500 uppercase">Full Address</label><textarea name="address" rows="2" value={formData.address} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg" placeholder="Address..."></textarea></div>
                        <div className="space-y-1"><label className="text-xs font-semibold text-gray-500 uppercase">City</label><input name="city" value={formData.city} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg" /></div>
                        <div className="space-y-1"><label className="text-xs font-semibold text-gray-500 uppercase">State</label><select name="state" value={formData.state} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"><option value="">Select State</option><option>Delhi</option><option>Maharashtra</option><option>Rajasthan</option></select></div>
                        <div className="space-y-1"><label className="text-xs font-semibold text-gray-500 uppercase">Pin Code</label><input name="pincode" value={formData.pincode} onChange={handleChange} maxLength="6" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg" /></div>
                        <div className="md:col-span-3 pb-2 border-b border-gray-100 mb-2 mt-4"><h3 className="font-bold text-gray-800 flex items-center gap-2"><Briefcase size={18} className="text-blue-500"/> Professional Details</h3></div>
                        <div className="space-y-1"><label className="text-xs font-semibold text-gray-500 uppercase">Partner Type</label><select name="partnerType" value={formData.partnerType} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"><option>Agent</option><option>Freelancer</option><option>Individual Partner</option><option>Company Partner</option></select></div>
                        <div className="space-y-1"><label className="text-xs font-semibold text-gray-500 uppercase">Experience (Years)</label><input name="experience" value={formData.experience} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg" /></div>
                        <div className="space-y-1"><label className="text-xs font-semibold text-gray-500 uppercase">Target Area</label><input name="targetArea" value={formData.targetArea} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg" /></div>
                    </div>
                )}

                {currentStep === 3 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-right-4 duration-300">
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><FileText size={18} className="text-blue-500"/> KYC Documents</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">Aadhaar Card</label>
                                    <input name="aadhaarNo" value={formData.aadhaarNo} onChange={handleChange} maxLength="12" className="w-full p-2 border border-gray-300 rounded mb-2" placeholder="12 Digit Number" />
                                    {/* Updated Aadhaar Images Logic with Preview */}
                                    <div className="flex gap-2">
                                        <div onClick={() => aadhaarFrontRef.current.click()} className={`flex-1 border-2 border-dashed rounded-lg h-24 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition relative overflow-hidden ${formData.aadhaarFrontImg ? 'border-green-400 bg-green-50' : 'border-gray-300'}`}>
                                            <input type="file" ref={aadhaarFrontRef} onChange={(e) => handleFileChange(e, 'aadhaarFrontImg')} className="hidden" accept="image/*" />
                                            {formData.aadhaarFrontImg ? (
                                                <img src={URL.createObjectURL(formData.aadhaarFrontImg)} alt="Front" className="w-full h-full object-cover rounded-lg" />
                                            ) : (
                                                <><UploadCloud size={20} className="text-gray-400" /><span className="text-[10px] text-gray-500">Front Img</span></>
                                            )}
                                        </div>
                                        <div onClick={() => aadhaarBackRef.current.click()} className={`flex-1 border-2 border-dashed rounded-lg h-24 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition relative overflow-hidden ${formData.aadhaarBackImg ? 'border-green-400 bg-green-50' : 'border-gray-300'}`}>
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
                                    <input name="panNo" value={formData.panNo} onChange={handleChange} maxLength="10" className="w-full p-2 border border-gray-300 rounded mb-2" placeholder="ABCDE1234F" />
                                    {/* Updated PAN Image Logic with Preview */}
                                    <div onClick={() => panRef.current.click()} className={`w-full border-2 border-dashed rounded-lg h-24 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition relative overflow-hidden ${formData.panImg ? 'border-green-400 bg-green-50' : 'border-gray-300'}`}>
                                        <input type="file" ref={panRef} onChange={(e) => handleFileChange(e, 'panImg')} className="hidden" accept="image/*" />
                                        {formData.panImg ? (
                                            <img src={URL.createObjectURL(formData.panImg)} alt="PAN" className="w-full h-full object-cover rounded-lg" />
                                        ) : (
                                            <><UploadCloud size={20} className="text-gray-400" /><span className="text-[10px] text-gray-500">Upload PAN</span></>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Landmark size={18} className="text-blue-500"/> Banking Details</h3>
                            <div className="space-y-3">
                                <div className="space-y-1"><label className="text-xs font-semibold text-gray-500 uppercase">Account Holder Name</label><input name="accountHolder" value={formData.accountHolder} onChange={handleChange} className="w-full p-3 bg-white border border-gray-300 rounded-lg" /></div>
                                <div className="space-y-1"><label className="text-xs font-semibold text-gray-500 uppercase">Bank Name</label><input name="bankName" value={formData.bankName} onChange={handleChange} className="w-full p-3 bg-white border border-gray-300 rounded-lg" /></div>
                                <div className="space-y-1"><label className="text-xs font-semibold text-gray-500 uppercase">Account Number</label><input name="accountNo" value={formData.accountNo} onChange={handleChange} className="w-full p-3 bg-white border border-gray-300 rounded-lg" /></div>
                                <div className="space-y-1"><label className="text-xs font-semibold text-gray-500 uppercase">IFSC Code</label><input name="ifsc" value={formData.ifsc} onChange={handleChange} className="w-full p-3 bg-white border border-gray-300 rounded-lg" /></div>
                            </div>
                        </div>
                    </div>
                )}

                {currentStep === 4 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in slide-in-from-right-4 duration-300">
                        <div>
                            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Percent size={18} className="text-blue-500"/> Commission Setup</h3>
                            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                                <div className="mb-4"><label className="block text-sm font-semibold text-gray-700 mb-2">Commission Type</label><div className="flex gap-4"><label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="commissionType" value="Percentage" checked={formData.commissionType === 'Percentage'} onChange={handleChange} className="accent-blue-600" /><span>Percentage (%)</span></label><label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="commissionType" value="Fixed" checked={formData.commissionType === 'Fixed'} onChange={handleChange} className="accent-blue-600" /><span>Fixed Amount (₹)</span></label></div></div>
                                <div><label className="block text-sm font-semibold text-gray-700 mb-2">{formData.commissionType === 'Percentage' ? 'Commission Percentage (%)' : 'Fixed Amount (₹)'} <span className="text-red-500">*</span></label><input name="commissionValue" value={formData.commissionValue} onChange={handleChange} className="w-full p-3 bg-white border rounded-lg text-lg font-bold text-blue-800" placeholder={formData.commissionType === 'Percentage' ? "e.g. 2.5" : "e.g. 5000"} /></div>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><ShieldCheck size={18} className="text-blue-500"/> Status & Permissions</h3>
                            <div className="space-y-4">
                                <div><label className="text-sm font-semibold text-gray-700 block mb-2">Account Status</label><select name="status" value={formData.status} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"><option value="Active">Active</option><option value="Inactive">Inactive</option><option value="Pending">Pending Approval</option></select></div>
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                                    <label className="text-xs font-bold text-gray-500 uppercase block mb-3">System Permissions</label>
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-white rounded transition"><input type="checkbox" name="perm_addCustomer" checked={formData.permissions.addCustomer} onChange={handleChange} className="w-5 h-5 accent-blue-600 rounded" /><span className="text-gray-700">Can Add Customer</span></label>
                                        <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-white rounded transition"><input type="checkbox" name="perm_viewCustomer" checked={formData.permissions.viewCustomer} onChange={handleChange} className="w-5 h-5 accent-blue-600 rounded" /><span className="text-gray-700">Can View All Customers</span></label>
                                        <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-white rounded transition"><input type="checkbox" name="perm_trackLoan" checked={formData.permissions.trackLoan} onChange={handleChange} className="w-5 h-5 accent-blue-600 rounded" /><span className="text-gray-700">Can Track Loan Status</span></label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="mt-8 flex justify-between pt-6 border-t border-gray-100">
                    <button type="button" onClick={() => setCurrentStep(prev => Math.max(prev - 1, 1))} disabled={currentStep === 1} className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium transition-all ${currentStep === 1 ? 'opacity-0 cursor-default' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}><ChevronLeft size={18} /> Back</button>
                    {currentStep < 4 ? (
                        <button type="button" onClick={handleNext} className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-200 font-medium transition-all">Next Step <ChevronRight size={18} /></button>
                    ) : (
                        <button type="submit" className="flex items-center gap-2 px-8 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-lg shadow-green-200 font-medium transition-all">{isEditing ? <Save size={18} /> : <Check size={18} />} {isEditing ? "Update Partner" : "Submit Partner"}</button>
                    )}
                </div>
            </form>
        </div>
      )}

      {/* --- VIEW: PARTNER LIST --- */}
      {view === 'list' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden animate-in fade-in duration-300">
            {/* Toolbar */}
            <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50/50">
                <div className="relative w-full sm:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    {/* SEARCH INPUT */}
                    <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by name, phone, or type..." 
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20" 
                    />
                </div>
                <div className="flex gap-2 relative">
                    {/* FILTER BUTTON & DROPDOWN */}
                    <div className="relative">
                        <button 
                            onClick={() => setShowFilterMenu(!showFilterMenu)}
                            className={`px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2 ${filterStatus !== 'All' ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-white text-gray-600'}`}
                        >
                            <Filter size={16} /> 
                            {filterStatus === 'All' ? 'Filter' : filterStatus}
                        </button>
                        
                        {showFilterMenu && (
                            <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-gray-100 z-10 p-1">
                                {['All', 'Active', 'Inactive', 'Pending'].map((status) => (
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

                    {/* EXPORT BUTTON */}
                    <button 
                        onClick={handleExport}
                        className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 text-gray-600 flex items-center gap-2"
                    >
                        <Download size={16} /> Export
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
                        <tr>
                            <th className="px-6 py-4">ID</th>
                            <th className="px-6 py-4">Partner Name</th>
                            <th className="px-6 py-4">Type</th>
                            <th className="px-6 py-4">Phone</th>
                            <th className="px-6 py-4">Area</th>
                            <th className="px-6 py-4">Commission</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredPartners.map((partner) => (
                            <tr key={partner.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-gray-400 text-sm">#{partner.id}</td>
                                <td className="px-6 py-4 font-medium text-gray-800 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-bold">
                                        {partner.fullName.charAt(0)}
                                    </div>
                                    {partner.fullName}
                                </td>
                                <td className="px-6 py-4 text-gray-600 text-sm">{partner.type}</td>
                                <td className="px-6 py-4 text-gray-600 text-sm">{partner.phone}</td>
                                <td className="px-6 py-4 text-gray-600 text-sm">{partner.area}</td>
                                <td className="px-6 py-4 text-blue-600 font-medium text-sm">{partner.commission}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border 
                                        ${partner.status === 'Active' ? 'bg-green-50 text-green-700 border-green-100' : 
                                          partner.status === 'Inactive' ? 'bg-red-50 text-red-700 border-red-100' : 
                                          'bg-orange-50 text-orange-700 border-orange-100'}`}>
                                        {partner.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button onClick={() => handleView(partner)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"><Eye size={16} /></button>
                                        <button onClick={() => handleEdit(partner)} className="p-1.5 text-green-600 hover:bg-green-50 rounded" title="Edit"><Edit size={16} /></button>
                                        <button onClick={() => handleDelete(partner.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded" title="Delete"><Trash2 size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredPartners.length === 0 && (
                    <div className="text-center py-10 text-gray-500">
                        {searchQuery || filterStatus !== 'All' ? "No matching partners found." : "No partners found. Click \"Add New Partner\" to start."}
                    </div>
                )}
            </div>
        </div>
      )}
    </div>
  );
}