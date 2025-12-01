import React, { useState, useRef } from 'react';
import { 
  User, Briefcase, MapPin, FileText, Shield, Key, Check, ChevronRight, 
  ChevronLeft, Plus, Search, Trash2, Edit, Eye, UploadCloud, Download, X,
  BadgeCheck, Building, Phone
} from 'lucide-react';

export default function EmployeeAdd() {
  const [view, setView] = useState('list'); // 'list' or 'add'
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  // Refs for file inputs
  const photoRef = useRef(null);
  const aadhaarRef = useRef(null);
  const panRef = useRef(null);

  // --- FORM STATE ---
  const initialFormState = {
    // 1. Basic Details
    fullName: '', email: '', phone: '', gender: 'Male', dob: '',
    // 2. Address Details
    address: '', city: '', state: '', pincode: '',
    // 3. Professional Details
    employeeCode: '', designation: '', department: 'Sales', joiningDate: '', salary: '', referralCode: '',
    // 4. Login Details
    employeeId: '', password: '', role: 'Employee', permissions: { view: true, approve: false, reject: false },
    // 5. Documents
    photo: null, aadhaarImg: null, panImg: null, certificate: null,
    // 6. Status & Extra
    status: 'Active', isVerified: 'Verified', emergencyContact: ''
  };

  const [formData, setFormData] = useState(initialFormState);

  // --- MOCK DATA ---
  const [employees, setEmployees] = useState([
    { 
      id: 1001, fullName: "Amit Verma", email: "amit.v@company.com", phone: "9876543210", 
      role: "Manager", department: "Sales", status: "Active", 
      employeeId: "EMP001", designation: "Regional Manager", city: "Mumbai" 
    },
    { 
      id: 1002, fullName: "Sneha Reddy", email: "sneha.r@company.com", phone: "9988776655", 
      role: "Verification Officer", department: "Verification", status: "Active", 
      employeeId: "EMP002", designation: "Sr. Officer", city: "Hyderabad" 
    },
  ]);

  // --- HANDLERS ---

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Permission Checkbox Logic
    if (name.startsWith('perm_')) {
        const key = name.replace('perm_', '');
        setFormData(prev => ({
            ...prev,
            permissions: { ...prev.permissions, [key]: checked }
        }));
    } else {
        setFormData({ ...formData, [name]: value });
        if (errors[name]) setErrors({ ...errors, [name]: '' });
    }
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
        setFormData(prev => ({ ...prev, [fieldName]: file }));
    }
  };

  const generateCredentials = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const genID = `EMP${randomNum}`;
    const genPass = Math.random().toString(36).slice(-8).toUpperCase();
    setFormData(prev => ({ ...prev, employeeId: genID, employeeCode: genID, password: genPass }));
  };

  const validateStep = (step) => {
    let newErrors = {};
    if (step === 1) {
        if (!formData.fullName) newErrors.fullName = "Required";
        if (!formData.email) newErrors.email = "Required";
        if (!formData.phone) newErrors.phone = "Required";
    }
    if (step === 2) {
        if (!formData.employeeId) newErrors.employeeId = "Employee ID/Username required";
        if (!formData.password) newErrors.password = "Password required";
        if (!formData.role) newErrors.role = "Role required";
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

    const newEmp = {
        id: Date.now(),
        ...formData,
        role: formData.role,
        department: formData.department
    };
    setEmployees([...employees, newEmp]);
    alert("Employee Onboarded Successfully!");
    setFormData(initialFormState);
    setView('list');
    setCurrentStep(1);
  };

  // --- STEPS CONFIG ---
  const steps = [
    { id: 1, title: "Personal & Address", icon: <User size={18} /> },
    { id: 2, title: "Work & Login", icon: <Briefcase size={18} /> },
    { id: 3, title: "Documents (KYC)", icon: <FileText size={18} /> },
    { id: 4, title: "Status & Review", icon: <Shield size={18} /> }
  ];

  // --- FILTER LOGIC ---
  const filteredEmployees = employees.filter(emp => 
    emp.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-10">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Employee Management</h1>
          <p className="text-gray-500 mt-1">Manage corporate staff, roles, and permissions.</p>
        </div>
        
        {view === 'list' ? (
             <button onClick={() => setView('add')} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 shadow-lg transition-all">
                <Plus size={20} /> Add New Employee
             </button>
        ) : (
             <button onClick={() => {setView('list'); setFormData(initialFormState); setCurrentStep(1);}} className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2.5 rounded-xl transition-all">
                Cancel & Back
             </button>
        )}
      </div>

      {/* --- ADD EMPLOYEE FORM --- */}
      {view === 'add' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden animate-in fade-in zoom-in duration-300">
            
            {/* STEPPER HEADER */}
            <div className="bg-gray-50 border-b border-gray-200 p-6">
                <div className="flex items-center justify-between relative mb-6">
                    <div className="absolute left-0 top-1/2 w-full h-1 bg-gray-200 -z-0"></div>
                    <div className="absolute left-0 top-1/2 h-1 bg-blue-600 -z-0 transition-all duration-500" style={{ width: `${((currentStep - 1) / 3) * 100}%` }}></div>
                    {steps.map((step) => (
                        <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${currentStep >= step.id ? 'bg-blue-600 text-white shadow-lg' : 'bg-white border-2 border-gray-300 text-gray-400'}`}>
                                {currentStep > step.id ? <Check size={18} /> : step.id}
                            </div>
                            <span className={`text-xs font-semibold ${currentStep >= step.id ? 'text-blue-700' : 'text-gray-400'}`}>{step.title}</span>
                        </div>
                    ))}
                </div>
                <h2 className="text-xl font-bold text-gray-800 text-center">New Employee Registration</h2>
            </div>

            <form onSubmit={handleSubmit} className="p-8">
                
                {/* STEP 1: Personal & Address */}
                {currentStep === 1 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-right-4">
                        <div className="md:col-span-3 pb-2 border-b border-gray-100 mb-2">
                            <h3 className="font-bold text-gray-800 flex items-center gap-2"><User size={18} className="text-blue-500"/> Basic Details</h3>
                        </div>
                        
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-500">Full Name *</label>
                            <input name="fullName" value={formData.fullName} onChange={handleChange} className={`w-full p-2.5 border rounded-lg ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`} placeholder="John Doe" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-500">Email *</label>
                            <input name="email" type="email" value={formData.email} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg" placeholder="email@company.com" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-500">Phone *</label>
                            <input name="phone" type="tel" value={formData.phone} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg" placeholder="9876543210" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-500">Gender</label>
                            <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg">
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-500">Date of Birth</label>
                            <input name="dob" type="date" value={formData.dob} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-500">Emergency Contact</label>
                            <input name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg" />
                        </div>

                        <div className="md:col-span-3 pb-2 border-b border-gray-100 mb-2 mt-4">
                            <h3 className="font-bold text-gray-800 flex items-center gap-2"><MapPin size={18} className="text-blue-500"/> Address Details</h3>
                        </div>
                        <div className="md:col-span-3 space-y-1">
                            <label className="text-xs font-semibold text-gray-500">Address Line</label>
                            <textarea name="address" rows="2" value={formData.address} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg" placeholder="Flat No, Building, Street..."></textarea>
                        </div>
                        <div className="space-y-1"><label className="text-xs font-semibold text-gray-500">City</label><input name="city" value={formData.city} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg" /></div>
                        <div className="space-y-1"><label className="text-xs font-semibold text-gray-500">State</label><input name="state" value={formData.state} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg" /></div>
                        <div className="space-y-1"><label className="text-xs font-semibold text-gray-500">Pincode</label><input name="pincode" value={formData.pincode} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg" /></div>
                    </div>
                )}

                {/* STEP 2: Work & Login */}
                {currentStep === 2 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-right-4">
                        <div className="md:col-span-3 pb-2 border-b border-gray-100 mb-2">
                            <h3 className="font-bold text-gray-800 flex items-center gap-2"><Briefcase size={18} className="text-blue-500"/> Professional Details</h3>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-500">Employee Code / ID *</label>
                            <input name="employeeCode" value={formData.employeeCode} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg" placeholder="EMP001" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-500">Department</label>
                            <select name="department" value={formData.department} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg">
                                <option>Sales</option>
                                <option>Verification</option>
                                <option>Collection</option>
                                <option>Admin</option>
                                <option>HR</option>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-500">Designation</label>
                            <input name="designation" value={formData.designation} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg" placeholder="e.g. Loan Officer" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-500">Joining Date</label>
                            <input name="joiningDate" type="date" value={formData.joiningDate} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-500">Salary / Commission</label>
                            <input name="salary" value={formData.salary} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg" placeholder="₹" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-500">Referral Code (Optional)</label>
                            <input name="referralCode" value={formData.referralCode} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg" />
                        </div>

                        <div className="md:col-span-3 pb-2 border-b border-gray-100 mb-2 mt-4">
                            <h3 className="font-bold text-gray-800 flex items-center gap-2"><Key size={18} className="text-blue-500"/> Login & Access</h3>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-500">Username *</label>
                            <input name="employeeId" value={formData.employeeId} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg" placeholder="Username" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-500">Password *</label>
                            <input name="password" value={formData.password} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg" placeholder="••••••" />
                        </div>
                        <div className="space-y-1 flex items-end">
                            <button type="button" onClick={generateCredentials} className="w-full p-2.5 bg-blue-50 text-blue-600 border border-blue-200 rounded-lg text-sm font-medium hover:bg-blue-100">
                                Auto Generate
                            </button>
                        </div>
                        <div className="space-y-1 md:col-span-3">
                            <label className="text-xs font-semibold text-gray-500">System Role</label>
                            <select name="role" value={formData.role} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg">
                                <option>Employee</option>
                                <option>Manager</option>
                                <option>Verification Officer</option>
                                <option>Collection Officer</option>
                                <option>Admin</option>
                            </select>
                        </div>
                    </div>
                )}

                {/* STEP 3: Documents */}
                {currentStep === 3 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-right-4">
                        <div className="md:col-span-2 pb-2 border-b border-gray-100 mb-2">
                            <h3 className="font-bold text-gray-800 flex items-center gap-2"><FileText size={18} className="text-blue-500"/> KYC Documents</h3>
                        </div>

                        {/* Photo Upload */}
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-center">
                            <label className="block text-sm font-semibold text-gray-600 mb-2">Profile Photo</label>
                            <div onClick={() => photoRef.current.click()} className="w-32 h-32 mx-auto border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100 overflow-hidden bg-white">
                                <input type="file" ref={photoRef} onChange={(e) => handleFileChange(e, 'photo')} className="hidden" accept="image/*" />
                                {formData.photo ? (
                                    <img src={URL.createObjectURL(formData.photo)} className="w-full h-full object-cover" alt="Profile" />
                                ) : (
                                    <div className="text-gray-400 flex flex-col items-center"><User size={32} /><span className="text-xs mt-1">Upload</span></div>
                                )}
                            </div>
                        </div>

                        {/* Aadhaar Upload */}
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                            <label className="block text-sm font-semibold text-gray-600 mb-2">Aadhaar Card</label>
                            <div onClick={() => aadhaarRef.current.click()} className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 bg-white overflow-hidden">
                                <input type="file" ref={aadhaarRef} onChange={(e) => handleFileChange(e, 'aadhaarImg')} className="hidden" accept="image/*" />
                                {formData.aadhaarImg ? (
                                    <img src={URL.createObjectURL(formData.aadhaarImg)} className="w-full h-full object-cover" alt="Aadhaar" />
                                ) : (
                                    <div className="text-gray-400 flex flex-col items-center"><UploadCloud size={24} /><span className="text-xs mt-1">Upload Aadhaar Image</span></div>
                                )}
                            </div>
                        </div>

                        {/* PAN Upload */}
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                            <label className="block text-sm font-semibold text-gray-600 mb-2">PAN Card</label>
                            <div onClick={() => panRef.current.click()} className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 bg-white overflow-hidden">
                                <input type="file" ref={panRef} onChange={(e) => handleFileChange(e, 'panImg')} className="hidden" accept="image/*" />
                                {formData.panImg ? (
                                    <img src={URL.createObjectURL(formData.panImg)} className="w-full h-full object-cover" alt="PAN" />
                                ) : (
                                    <div className="text-gray-400 flex flex-col items-center"><UploadCloud size={24} /><span className="text-xs mt-1">Upload PAN Image</span></div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* STEP 4: Review & Status */}
                {currentStep === 4 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in slide-in-from-right-4">
                        <div>
                            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Shield size={18} className="text-blue-500"/> Account Status</h3>
                            <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Account Status</label>
                                    <select name="status" value={formData.status} onChange={handleChange} className="w-full p-2.5 border rounded-lg">
                                        <option>Active</option>
                                        <option>Inactive</option>
                                        <option>Suspended</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Verification Status</label>
                                    <select name="isVerified" value={formData.isVerified} onChange={handleChange} className="w-full p-2.5 border rounded-lg">
                                        <option>Verified</option>
                                        <option>Not Verified</option>
                                        <option>Pending</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><BadgeCheck size={18} className="text-blue-500"/> Summary</h3>
                            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 text-sm space-y-3">
                                <div className="flex justify-between border-b border-blue-100 pb-2"><span>Name:</span> <span className="font-bold">{formData.fullName}</span></div>
                                <div className="flex justify-between border-b border-blue-100 pb-2"><span>Emp ID:</span> <span className="font-bold">{formData.employeeId}</span></div>
                                <div className="flex justify-between border-b border-blue-100 pb-2"><span>Role:</span> <span className="font-bold">{formData.role}</span></div>
                                <div className="flex justify-between border-b border-blue-100 pb-2"><span>Dept:</span> <span className="font-bold">{formData.department}</span></div>
                                <div className="flex justify-between pt-2"><span>Phone:</span> <span className="font-bold">{formData.phone}</span></div>
                            </div>
                        </div>
                    </div>
                )}

                {/* NAVIGATION */}
                <div className="mt-8 flex justify-between pt-6 border-t border-gray-100">
                    <button type="button" onClick={() => setCurrentStep(prev => Math.max(prev - 1, 1))} disabled={currentStep === 1} className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium transition-all ${currentStep === 1 ? 'opacity-0 cursor-default' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}><ChevronLeft size={18} /> Back</button>
                    {currentStep < 4 ? (
                        <button type="button" onClick={handleNext} className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg font-medium transition-all">Next Step <ChevronRight size={18} /></button>
                    ) : (
                        <button type="submit" className="flex items-center gap-2 px-8 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-lg font-medium transition-all"><Check size={18} /> Create Employee</button>
                    )}
                </div>
            </form>
        </div>
      )}

      {/* --- LIST VIEW --- */}
      {view === 'list' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex gap-4 bg-gray-50/50">
                <div className="relative w-full sm:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search employees..." className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
                        <tr>
                            <th className="px-6 py-4">Emp ID</th>
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Role</th>
                            <th className="px-6 py-4">Department</th>
                            <th className="px-6 py-4">Phone</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredEmployees.map((emp) => (
                            <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-gray-500 text-sm font-mono">{emp.employeeId}</td>
                                <td className="px-6 py-4 font-medium text-gray-800 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">{emp.fullName.charAt(0)}</div>
                                    {emp.fullName}
                                </td>
                                <td className="px-6 py-4 text-gray-600 text-sm">{emp.role}</td>
                                <td className="px-6 py-4 text-gray-600 text-sm"><span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">{emp.department}</span></td>
                                <td className="px-6 py-4 text-gray-600 text-sm flex items-center gap-1"><Phone size={12}/> {emp.phone}</td>
                                <td className="px-6 py-4"><span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">{emp.status}</span></td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"><Eye size={16} /></button>
                                        <button className="p-1.5 text-green-600 hover:bg-green-50 rounded"><Edit size={16} /></button>
                                        <button className="p-1.5 text-red-600 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      )}
    </div>
  );
}