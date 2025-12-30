import React, { useState, useRef, useEffect } from 'react';
import { 
  User, MapPin, Briefcase, FileText, Landmark, Key, Percent, ShieldCheck, 
  Check, ChevronRight, ChevronLeft, Plus, Search, Trash2, Edit, Eye, UploadCloud, X, Download, Filter,
  Building, CreditCard, GraduationCap, Calendar, Clock, DollarSign, Phone, Mail,
  MoreVertical, Presentation, Target, CalendarDays, FileCheck, Send, Clock4, AlertCircle,
  LayoutDashboard, Users, BarChart, Settings, CreditCard as Card, Home, Bell, MessageSquare
} from 'lucide-react';

export default function EmployeeAdd() {
  const [view, setView] = useState('list');
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // --- VIEW MODAL STATE ---
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewData, setViewData] = useState(null);

  // --- PRESENTATION MODAL STATE ---
  const [showPresentationModal, setShowPresentationModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [presentations, setPresentations] = useState([]);
  
  // --- SEARCH & FILTER STATE ---
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All'); // All, Active, Inactive, On Leave
  const [filterDepartment, setFilterDepartment] = useState('All'); // All departments
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  
  // --- 3-DOTS MENU STATE ---
  const [showActionMenu, setShowActionMenu] = useState(null);

  // Refs for file inputs
  const aadhaarFrontRef = useRef(null);
  const aadhaarBackRef = useRef(null);
  const panRef = useRef(null);
  const photoRef = useRef(null);
  const resumeRef = useRef(null);
  
  // --- FORM STATE ---
  const initialFormState = {
    // 1. Basic Info
    fullName: '', 
    email: '', 
    phone: '', 
    altPhone: '', 
    dob: '', 
    gender: 'Male',
    maritalStatus: 'Single',
    
    // 2. Address & Contact
    address: '', 
    city: '', 
    state: '', 
    pincode: '',
    emergencyContact: '',
    emergencyRelation: 'Father',
    
    // 3. Professional
    employeeId: '',
    department: 'Sales',
    designation: 'Executive',
    dateOfJoining: '',
    experience: '',
    reportingManager: '',
    workLocation: 'Office',
    
    // 4. KYC & Documents
    aadhaarNo: '', 
    panNo: '', 
    bankAccountNo: '',
    aadhaarFrontImg: null, 
    aadhaarBackImg: null, 
    panImg: null, 
    profilePhoto: null,
    resume: null,
    
    // 5. Bank Details
    accountHolder: '', 
    bankName: '', 
    ifsc: '', 
    upiId: '',
    
    // 6. Login Credentials
    username: '', 
    password: '',
    
    // 7. Salary & Benefits
    salaryType: 'Monthly', // Monthly, Weekly, Daily
    basicSalary: '',
    hra: '',
    conveyance: '',
    medicalAllowance: '',
    otherAllowances: '',
    pfDeduction: '',
    taxDeduction: '',
    
    // 8. Status & Permissions
    status: 'Active',
    leaveBalance: '12',
    permissions: { 
      addCustomer: false, 
      viewCustomer: false, 
      processLoan: false,
      manageLeads: false,
      generateReports: false 
    }
  };

  const [formData, setFormData] = useState(initialFormState);

  // Presentation Form State
  const [presentationForm, setPresentationForm] = useState({
    title: '',
    description: '',
    deadline: '',
    priority: 'Medium',
    attachments: null
  });

  // Departments for filtering
  const departments = ['All', 'Sales', 'Marketing', 'Operations', 'HR', 'Finance', 'IT', 'Customer Service', 'Management'];

  // Page Access Options
  const pageAccessOptions = [
    { id: 'dashboard', name: 'Dashboard', icon: <LayoutDashboard size={16} />, description: 'Main dashboard with overview' },
    { id: 'customers', name: 'Customer Management', icon: <Users size={16} />, description: 'View and manage customers' },
    { id: 'loans', name: 'Loan Processing', icon: <CreditCard size={16} />, description: 'Process and track loans' },
    { id: 'reports', name: 'Reports & Analytics', icon: <BarChart size={16} />, description: 'Generate and view reports' },
    { id: 'settings', name: 'System Settings', icon: <Settings size={16} />, description: 'Access system configuration' },
    { id: 'notifications', name: 'Notifications', icon: <Bell size={16} />, description: 'View system notifications' },
    { id: 'messages', name: 'Messages', icon: <MessageSquare size={16} />, description: 'Internal messaging system' },
    { id: 'profile', name: 'Employee Profile', icon: <User size={16} />, description: 'View and edit own profile' },
    { id: 'los', name: 'Los', icon: <User size={16} />, description: 'Manage applications and track turnaround time' },
  ];

  // Page Access State for each employee
  const [employeePageAccess, setEmployeePageAccess] = useState({});

  // --- MOCK DATA ---
  const [employees, setEmployees] = useState([
    { 
      id: 'EMP001', 
      fullName: "Amit Sharma", 
      email: "amit.sharma@example.com", 
      phone: "9876543210", 
      altPhone: "9876500000", 
      dob: "1990-05-15", 
      gender: "Male",
      maritalStatus: "Married",
      address: "123, Green Park", 
      city: "Delhi", 
      state: "Delhi", 
      pincode: "110016",
      emergencyContact: "9812345678",
      emergencyRelation: "Wife",
      employeeId: "EMP001",
      department: "Sales", 
      designation: "Senior Sales Executive", 
      dateOfJoining: "2020-06-01",
      experience: "4 Years",
      reportingManager: "Rahul Verma",
      workLocation: "Office",
      aadhaarNo: "123456789012", 
      panNo: "ABCDE1234F",
      bankAccountNo: "501000123456",
      accountHolder: "Amit Sharma", 
      bankName: "HDFC Bank", 
      ifsc: "HDFC000123", 
      upiId: "amit.sharma@hdfc",
      username: "amit_sharma", 
      password: "password123",
      salaryType: "Monthly",
      basicSalary: "₹45,000",
      hra: "₹9,000",
      conveyance: "₹1,600",
      totalSalary: "₹55,600",
      status: "Active", 
      leaveBalance: "8",
      permissions: { 
        addCustomer: true, 
        viewCustomer: true, 
        processLoan: false,
        manageLeads: true,
        generateReports: false 
      }
    },
    { 
      id: 'EMP002', 
      fullName: "Priya Patel", 
      email: "priya.patel@example.com", 
      phone: "9988776655", 
      altPhone: "", 
      dob: "1995-08-22", 
      gender: "Female",
      maritalStatus: "Single",
      address: "45, Tech Park", 
      city: "Bangalore", 
      state: "Karnataka", 
      pincode: "560001",
      emergencyContact: "9988776644",
      emergencyRelation: "Father",
      employeeId: "EMP002",
      department: "Marketing", 
      designation: "Marketing Manager", 
      dateOfJoining: "2021-03-15",
      experience: "3 Years",
      reportingManager: "CEO",
      workLocation: "Hybrid",
      aadhaarNo: "987654321098", 
      panNo: "XYZAB1234C",
      bankAccountNo: "300000567890",
      accountHolder: "Priya Patel", 
      bankName: "SBI", 
      ifsc: "SBIN000123", 
      upiId: "priya.patel@sbi",
      username: "priya_patel", 
      password: "securepass123",
      salaryType: "Monthly",
      basicSalary: "₹65,000",
      hra: "₹13,000",
      conveyance: "₹1,600",
      totalSalary: "₹79,600",
      status: "Active", 
      leaveBalance: "10",
      permissions: { 
        addCustomer: true, 
        viewCustomer: true, 
        processLoan: false,
        manageLeads: true,
        generateReports: true 
      }
    },
    { 
      id: 'EMP003', 
      fullName: "Rahul Verma", 
      email: "rahul.verma@example.com", 
      phone: "8899776655", 
      altPhone: "8899776600", 
      dob: "1985-12-10", 
      gender: "Male",
      maritalStatus: "Married",
      address: "78, Corporate Road", 
      city: "Mumbai", 
      state: "Maharashtra", 
      pincode: "400001",
      emergencyContact: "8899776644",
      emergencyRelation: "Spouse",
      employeeId: "EMP003",
      department: "Management", 
      designation: "Operations Head", 
      dateOfJoining: "2018-01-10",
      experience: "6 Years",
      reportingManager: "CEO",
      workLocation: "Office",
      aadhaarNo: "456789012345", 
      panNo: "PQRST1234U",
      bankAccountNo: "501000789012",
      accountHolder: "Rahul Verma", 
      bankName: "ICICI Bank", 
      ifsc: "ICIC000123", 
      upiId: "rahul.verma@icici",
      username: "rahul_verma", 
      password: "manager123",
      salaryType: "Monthly",
      basicSalary: "₹85,000",
      hra: "₹17,000",
      conveyance: "₹2,000",
      totalSalary: "₹104,000",
      status: "Active", 
      leaveBalance: "15",
      permissions: { 
        addCustomer: true, 
        viewCustomer: true, 
        processLoan: true,
        manageLeads: true,
        generateReports: true 
      }
    },
    { 
      id: 'EMP004', 
      fullName: "Sneha Reddy", 
      email: "sneha.reddy@example.com", 
      phone: "7766554433", 
      altPhone: "", 
      dob: "1992-03-30", 
      gender: "Female",
      maritalStatus: "Married",
      address: "22, Hitech City", 
      city: "Hyderabad", 
      state: "Telangana", 
      pincode: "500081",
      emergencyContact: "7766554422",
      emergencyRelation: "Husband",
      employeeId: "EMP004",
      department: "Customer Service", 
      designation: "Support Executive", 
      dateOfJoining: "2022-07-20",
      experience: "1.5 Years",
      reportingManager: "Rahul Verma",
      workLocation: "Remote",
      aadhaarNo: "567890123456", 
      panNo: "LMNOP1234Q",
      bankAccountNo: "501000345678",
      accountHolder: "Sneha Reddy", 
      bankName: "Axis Bank", 
      ifsc: "UTIB000123", 
      upiId: "sneha.reddy@axis",
      username: "sneha_reddy", 
      password: "support123",
      salaryType: "Monthly",
      basicSalary: "₹35,000",
      hra: "₹7,000",
      conveyance: "₹1,600",
      totalSalary: "₹43,600",
      status: "On Leave", 
      leaveBalance: "5",
      permissions: { 
        addCustomer: true, 
        viewCustomer: true, 
        processLoan: false,
        manageLeads: false,
        generateReports: false 
      }
    },
  ]);

  // Initialize page access for employees
  useEffect(() => {
    const initialAccess = {};
    employees.forEach(emp => {
      // Default access: Dashboard and Profile for everyone
      initialAccess[emp.employeeId] = {
        dashboard: true,
        customers: emp.permissions.viewCustomer || false,
        loans: emp.permissions.processLoan || false,
        reports: emp.permissions.generateReports || false,
        settings: emp.department === 'Management' || false,
        notifications: true,
        messages: true,
        profile: true
      };
    });
    setEmployeePageAccess(initialAccess);
  }, [employees]);

  // Mock presentations data
  useEffect(() => {
    const mockPresentations = [
      {
        id: 1,
        employeeId: 'EMP001',
        title: 'Monthly Sales Report',
        description: 'Prepare detailed sales report for Q1 2024 with analysis',
        deadline: '2024-04-15',
        priority: 'High',
        status: 'Pending',
        assignedDate: '2024-03-20',
        assignedBy: 'Admin',
        attachments: 2
      },
      {
        id: 2,
        employeeId: 'EMP002',
        title: 'Marketing Campaign Analysis',
        description: 'Analyze performance of recent social media campaigns',
        deadline: '2024-04-10',
        priority: 'Medium',
        status: 'In Progress',
        assignedDate: '2024-03-15',
        assignedBy: 'Manager',
        attachments: 1
      },
      {
        id: 3,
        employeeId: 'EMP003',
        title: 'Operations Strategy Meeting',
        description: 'Prepare presentation for quarterly operations review',
        deadline: '2024-04-05',
        priority: 'High',
        status: 'Completed',
        assignedDate: '2024-03-10',
        assignedBy: 'CEO',
        attachments: 3
      }
    ];
    setPresentations(mockPresentations);
  }, []);

  // --- FILTERED DATA LOGIC ---
  const filteredEmployees = employees.filter(employee => {
      const matchesSearch = 
          employee.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          employee.phone.includes(searchQuery) ||
          employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          employee.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          employee.department.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = filterStatus === 'All' || employee.status === filterStatus;
      const matchesDepartment = filterDepartment === 'All' || employee.department === filterDepartment;

      return matchesSearch && matchesStatus && matchesDepartment;
  });

  // Get presentations for selected employee
  const getEmployeePresentations = (employeeId) => {
    return presentations.filter(p => p.employeeId === employeeId);
  };

  // Get page access for selected employee
  const getEmployeePageAccess = (employeeId) => {
    return employeePageAccess[employeeId] || {};
  };

  // --- EXPORT HANDLER (CSV for Excel) ---
  const handleExport = () => {
      // CSV Headers
      let csvContent = "data:text/csv;charset=utf-8,";
      csvContent += "Employee ID,Name,Email,Phone,Department,Designation,Salary,Status,Leave Balance\n"; // Header row

      // Rows
      filteredEmployees.forEach(emp => {
          const row = `${emp.employeeId},"${emp.fullName}","${emp.email}","${emp.phone}","${emp.department}","${emp.designation}","${emp.totalSalary}","${emp.status}","${emp.leaveBalance}"`;
          csvContent += row + "\n";
      });

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "employees_list.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  };

  // --- VIEW HANDLER ---
  const handleView = (employee) => {
      setViewData(employee);
      setShowViewModal(true);
  };

  // --- PRESENTATION HANDLERS ---
  const handlePresentationClick = (employee) => {
    setSelectedEmployee(employee);
    setShowPresentationModal(true);
    setShowActionMenu(null); // Close action menu
  };

  const handleClosePresentationModal = () => {
    setShowPresentationModal(false);
    setSelectedEmployee(null);
    setPresentationForm({
      title: '',
      description: '',
      deadline: '',
      priority: 'Medium',
      attachments: null
    });
  };

  const handlePresentationFormChange = (e) => {
    const { name, value } = e.target;
    setPresentationForm(prev => ({ ...prev, [name]: value }));
  };

  const handlePageAccessChange = (employeeId, pageId, checked) => {
    setEmployeePageAccess(prev => ({
      ...prev,
      [employeeId]: {
        ...prev[employeeId],
        [pageId]: checked
      }
    }));
  };

  const handleAssignPresentation = (e) => {
    e.preventDefault();
    
    if (!presentationForm.title || !presentationForm.description || !presentationForm.deadline) {
      alert('Please fill all required fields');
      return;
    }

    const newPresentation = {
      id: presentations.length + 1,
      employeeId: selectedEmployee.employeeId,
      employeeName: selectedEmployee.fullName,
      title: presentationForm.title,
      description: presentationForm.description,
      deadline: presentationForm.deadline,
      priority: presentationForm.priority,
      status: 'Pending',
      assignedDate: new Date().toISOString().split('T')[0],
      assignedBy: 'Admin',
      attachments: presentationForm.attachments ? 1 : 0
    };

    setPresentations(prev => [...prev, newPresentation]);
    
    alert(`Presentation assigned to ${selectedEmployee.fullName} successfully!`);
    handleClosePresentationModal();
  };

  const handleSavePageAccess = () => {
    if (selectedEmployee) {
      alert(`Page access updated for ${selectedEmployee.fullName} successfully!`);
      handleClosePresentationModal();
    }
  };

  const handlePresentationStatusChange = (presentationId, newStatus) => {
    setPresentations(prev => prev.map(p => 
      p.id === presentationId ? { ...p, status: newStatus } : p
    ));
  };

  const handleDeletePresentation = (presentationId) => {
    if (window.confirm('Are you sure you want to delete this presentation?')) {
      setPresentations(prev => prev.filter(p => p.id !== presentationId));
    }
  };

  // --- DOWNLOAD SINGLE PROFILE (CSV for Excel) ---
  const handleDownloadProfile = () => {
      if (!viewData) return;
      
      // Creating a key-value CSV structure for a single profile
      const rows = [
          ["Field", "Value"],
          ["Employee ID", viewData.employeeId],
          ["Full Name", viewData.fullName],
          ["Email", viewData.email],
          ["Phone", viewData.phone],
          ["Alt Phone", viewData.altPhone || 'N/A'],
          ["Department", viewData.department],
          ["Designation", viewData.designation],
          ["Status", viewData.status],
          ["DOB", viewData.dob || 'N/A'],
          ["Gender", viewData.gender],
          ["Marital Status", viewData.maritalStatus],
          ["Address", `"${viewData.address}, ${viewData.city}, ${viewData.state} - ${viewData.pincode}"`],
          ["Date of Joining", viewData.dateOfJoining],
          ["Experience", viewData.experience],
          ["Reporting Manager", viewData.reportingManager],
          ["Work Location", viewData.workLocation],
          ["Emergency Contact", viewData.emergencyContact || 'N/A'],
          ["Emergency Relation", viewData.emergencyRelation],
          ["Aadhaar No", `'${viewData.aadhaarNo}`],
          ["PAN No", viewData.panNo],
          ["Bank Name", viewData.bankName],
          ["Account No", `'${viewData.bankAccountNo}`],
          ["IFSC Code", viewData.ifsc],
          ["UPI ID", viewData.upiId || 'N/A'],
          ["Basic Salary", viewData.basicSalary],
          ["HRA", viewData.hra],
          ["Conveyance", viewData.conveyance],
          ["Total Salary", viewData.totalSalary],
          ["Leave Balance", viewData.leaveBalance],
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
      link.download = `${viewData.fullName}_Employee_Profile.csv`;
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
      // Auto-generate employee ID
      const newId = `EMP${String(employees.length + 101).padStart(3, '0')}`;
      setFormData(prev => ({ ...prev, employeeId: newId }));
  };

  const handleEdit = (employee) => {
      setFormData({
          ...initialFormState,
          fullName: employee.fullName,
          email: employee.email || '',
          phone: employee.phone,
          altPhone: employee.altPhone,
          dob: employee.dob,
          gender: employee.gender,
          maritalStatus: employee.maritalStatus || 'Single',
          address: employee.address,
          city: employee.city,
          state: employee.state,
          pincode: employee.pincode,
          emergencyContact: employee.emergencyContact,
          emergencyRelation: employee.emergencyRelation || 'Father',
          employeeId: employee.employeeId,
          department: employee.department,
          designation: employee.designation,
          dateOfJoining: employee.dateOfJoining,
          experience: employee.experience,
          reportingManager: employee.reportingManager,
          workLocation: employee.workLocation || 'Office',
          aadhaarNo: employee.aadhaarNo,
          panNo: employee.panNo,
          bankAccountNo: employee.bankAccountNo,
          accountHolder: employee.accountHolder,
          bankName: employee.bankName,
          ifsc: employee.ifsc,
          upiId: employee.upiId,
          username: employee.username,
          password: employee.password,
          salaryType: 'Monthly',
          basicSalary: employee.basicSalary ? employee.basicSalary.replace('₹', '').replace(',', '') : '',
          hra: employee.hra ? employee.hra.replace('₹', '').replace(',', '') : '',
          conveyance: employee.conveyance ? employee.conveyance.replace('₹', '').replace(',', '') : '',
          status: employee.status,
          leaveBalance: employee.leaveBalance || '12',
          permissions: employee.permissions || { 
            addCustomer: false, 
            viewCustomer: false, 
            processLoan: false,
            manageLeads: false,
            generateReports: false 
          }
      });
      
      setEditId(employee.id);
      setIsEditing(true);
      setView('add');
      setCurrentStep(1);
  };

  const handleDelete = (id) => {
      if (window.confirm("Are you sure you want to delete this employee? This action cannot be undone.")) {
          setEmployees(employees.filter(emp => emp.id !== id));
      }
  };

  const generateCredentials = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const generatedUser = formData.fullName ? `${formData.fullName.split(' ')[0].toLowerCase()}${randomNum}` : `emp${randomNum}`;
    const generatedPass = Math.random().toString(36).slice(-8).toUpperCase();
    
    setFormData(prev => ({ ...prev, username: generatedUser, password: generatedPass }));
    setErrors(prev => ({ ...prev, username: '', password: '' }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = value;

    if (name === 'phone' || name === 'altPhone' || name === 'emergencyContact') newValue = value.replace(/[^0-9]/g, '').slice(0, 10);
    if (name === 'pincode') newValue = value.replace(/[^0-9]/g, '').slice(0, 6);
    if (name === 'aadhaarNo') newValue = value.replace(/[^0-9]/g, '').slice(0, 12);
    if (name === 'panNo') newValue = value.toUpperCase().slice(0, 10);
    if (name === 'basicSalary' || name === 'hra' || name === 'conveyance' || name === 'medicalAllowance' || name === 'otherAllowances' || name === 'pfDeduction' || name === 'taxDeduction') {
        newValue = value.replace(/[^0-9]/g, '');
    }

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
          if (!formData.employeeId) newErrors.employeeId = "Employee ID is required";
      }
      if (step === 4) {
          if (!formData.basicSalary) newErrors.basicSalary = "Basic Salary is required";
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

    // Calculate total salary
    const basic = parseInt(formData.basicSalary) || 0;
    const hra = parseInt(formData.hra) || 0;
    const conveyance = parseInt(formData.conveyance) || 0;
    const medical = parseInt(formData.medicalAllowance) || 0;
    const other = parseInt(formData.otherAllowances) || 0;
    const pf = parseInt(formData.pfDeduction) || 0;
    const tax = parseInt(formData.taxDeduction) || 0;
    
    const grossSalary = basic + hra + conveyance + medical + other;
    const netSalary = grossSalary - pf - tax;

    const employeePayload = {
        id: isEditing ? editId : `EMP${String(employees.length + 101).padStart(3, '0')}`,
        ...formData,
        basicSalary: `₹${parseInt(formData.basicSalary).toLocaleString('en-IN')}`,
        hra: formData.hra ? `₹${parseInt(formData.hra).toLocaleString('en-IN')}` : '₹0',
        conveyance: formData.conveyance ? `₹${parseInt(formData.conveyance).toLocaleString('en-IN')}` : '₹0',
        totalSalary: `₹${netSalary.toLocaleString('en-IN')}`,
        salaryType: 'Monthly'
    };

    if (isEditing) {
        setEmployees(employees.map(emp => (emp.id === editId ? employeePayload : emp)));
        alert("Employee Updated Successfully!");
    } else {
        setEmployees([...employees, employeePayload]);
        alert("Employee Added Successfully!");
    }
    resetForm();
  };

  const steps = [
    { id: 1, title: "Personal Info", icon: <User size={18} /> },
    { id: 2, title: "Professional", icon: <Briefcase size={18} /> },
    { id: 3, title: "KYC & Banking", icon: <Landmark size={18} /> },
    { id: 4, title: "Salary & Access", icon: <ShieldCheck size={18} /> }
  ];

  // Calculate total salary for preview
  const calculateTotalSalary = () => {
    const basic = parseInt(formData.basicSalary) || 0;
    const hra = parseInt(formData.hra) || 0;
    const conveyance = parseInt(formData.conveyance) || 0;
    const medical = parseInt(formData.medicalAllowance) || 0;
    const other = parseInt(formData.otherAllowances) || 0;
    const pf = parseInt(formData.pfDeduction) || 0;
    const tax = parseInt(formData.taxDeduction) || 0;
    
    const gross = basic + hra + conveyance + medical + other;
    const net = gross - pf - tax;
    
    return {
      gross: gross.toLocaleString('en-IN'),
      net: net.toLocaleString('en-IN')
    };
  };

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-10 relative">
      
      {/* VIEW MODAL OVERLAY */}
      {showViewModal && viewData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
                
                {/* Modal Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-lg font-bold">
                            {viewData.fullName.charAt(0)}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">{viewData.fullName}</h2>
                            <p className="text-sm text-gray-500">{viewData.designation} • {viewData.department} • ID: {viewData.employeeId}</p>
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
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        
                        {/* Section 1: Personal Info */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider border-b pb-2 mb-4">Personal Details</h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div><span className="text-gray-500 block">Email</span> <span className="font-medium text-gray-800">{viewData.email}</span></div>
                                    <div><span className="text-gray-500 block">Phone</span> <span className="font-medium text-gray-800">{viewData.phone}</span></div>
                                    <div><span className="text-gray-500 block">Alt Phone</span> <span className="font-medium text-gray-800">{viewData.altPhone || '-'}</span></div>
                                    <div><span className="text-gray-500 block">Gender</span> <span className="font-medium text-gray-800">{viewData.gender}</span></div>
                                    <div><span className="text-gray-500 block">DOB</span> <span className="font-medium text-gray-800">{viewData.dob || '-'}</span></div>
                                    <div><span className="text-gray-500 block">Marital Status</span> <span className="font-medium text-gray-800">{viewData.maritalStatus || '-'}</span></div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider border-b pb-2 mb-4">Emergency Contact</h3>
                                <div className="bg-gray-50 p-4 rounded-xl">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-medium text-gray-800">{viewData.emergencyContact || 'Not provided'}</p>
                                            <p className="text-sm text-gray-500">{viewData.emergencyRelation}</p>
                                        </div>
                                        <Phone size={18} className="text-gray-400" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Professional */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider border-b pb-2 mb-4">Professional Details</h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div><span className="text-gray-500 block">Employee ID</span> <span className="font-bold text-blue-600">{viewData.employeeId}</span></div>
                                    <div><span className="text-gray-500 block">Department</span> <span className="font-medium text-gray-800">{viewData.department}</span></div>
                                    <div><span className="text-gray-500 block">Designation</span> <span className="font-medium text-gray-800">{viewData.designation}</span></div>
                                    <div><span className="text-gray-500 block">Experience</span> <span className="font-medium text-gray-800">{viewData.experience || '-'}</span></div>
                                    <div><span className="text-gray-500 block">Date of Joining</span> <span className="font-medium text-gray-800">{viewData.dateOfJoining || '-'}</span></div>
                                    <div><span className="text-gray-500 block">Work Location</span> <span className="font-medium text-gray-800">{viewData.workLocation || 'Office'}</span></div>
                                    <div className="col-span-2"><span className="text-gray-500 block">Reporting Manager</span> <span className="font-medium text-gray-800">{viewData.reportingManager || '-'}</span></div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider border-b pb-2 mb-4">Address</h3>
                                <div className="text-sm">
                                    <p className="font-medium text-gray-800">{viewData.address}</p>
                                    <p className="text-gray-600">{viewData.city}, {viewData.state} - {viewData.pincode}</p>
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Banking & Salary */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider border-b pb-2 mb-4">Banking Details</h3>
                                <div className="bg-gray-50 p-4 rounded-xl space-y-2 text-sm">
                                    <div className="flex justify-between"><span>Bank Name:</span> <span className="font-bold text-gray-800">{viewData.bankName}</span></div>
                                    <div className="flex justify-between"><span>Account No:</span> <span className="font-mono text-gray-800">{viewData.bankAccountNo || viewData.accountNo}</span></div>
                                    <div className="flex justify-between"><span>IFSC Code:</span> <span className="font-mono text-gray-800">{viewData.ifsc}</span></div>
                                    <div className="flex justify-between"><span>Account Holder:</span> <span className="font-medium text-gray-800">{viewData.accountHolder}</span></div>
                                    {viewData.upiId && (
                                        <div className="flex justify-between"><span>UPI ID:</span> <span className="font-medium text-blue-600">{viewData.upiId}</span></div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider border-b pb-2 mb-4">Salary Structure</h3>
                                <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between"><span>Basic Salary:</span> <span className="font-bold text-gray-800">{viewData.basicSalary}</span></div>
                                        <div className="flex justify-between"><span>HRA:</span> <span className="text-gray-700">{viewData.hra}</span></div>
                                        <div className="flex justify-between"><span>Conveyance:</span> <span className="text-gray-700">{viewData.conveyance}</span></div>
                                        <div className="border-t border-green-200 pt-2 mt-2">
                                            <div className="flex justify-between font-bold text-green-700">
                                                <span>Total Salary:</span>
                                                <span>{viewData.totalSalary}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 4: KYC & Account */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider border-b pb-2 mb-4">KYC & Account</h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div><span className="text-gray-500 block">Aadhaar</span> <span className="font-mono text-gray-800">{viewData.aadhaarNo}</span></div>
                                    <div><span className="text-gray-500 block">PAN</span> <span className="font-mono text-gray-800">{viewData.panNo}</span></div>
                                    <div><span className="text-gray-500 block">Username</span> <span className="font-medium text-gray-800">{viewData.username}</span></div>
                                    <div><span className="text-gray-500 block">Leave Balance</span> <span className="font-bold text-blue-600">{viewData.leaveBalance} days</span></div>
                                    <div><span className="text-gray-500 block">Status</span> <span className={`px-2 py-0.5 rounded text-xs font-bold ${viewData.status === 'Active' ? 'bg-green-100 text-green-700' : viewData.status === 'On Leave' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{viewData.status}</span></div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider border-b pb-2 mb-4">System Permissions</h3>
                                <div className="space-y-2 text-sm">
                                    {viewData.permissions?.addCustomer && <div className="flex items-center gap-2"><Check size={14} className="text-green-500" /> <span>Can Add Customer</span></div>}
                                    {viewData.permissions?.viewCustomer && <div className="flex items-center gap-2"><Check size={14} className="text-green-500" /> <span>Can View All Customers</span></div>}
                                    {viewData.permissions?.processLoan && <div className="flex items-center gap-2"><Check size={14} className="text-green-500" /> <span>Can Process Loans</span></div>}
                                    {viewData.permissions?.manageLeads && <div className="flex items-center gap-2"><Check size={14} className="text-green-500" /> <span>Can Manage Leads</span></div>}
                                    {viewData.permissions?.generateReports && <div className="flex items-center gap-2"><Check size={14} className="text-green-500" /> <span>Can Generate Reports</span></div>}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
      )}

      {/* PRESENTATION MODAL */}
      {showPresentationModal && selectedEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                  <Presentation size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Manage Employee Access</h2>
                  <p className="text-sm text-gray-500">Managing: {selectedEmployee.fullName} ({selectedEmployee.employeeId})</p>
                </div>
              </div>
              <button 
                onClick={handleClosePresentationModal}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto">
              {/* Page Access Control Section */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <ShieldCheck size={18} /> Page Access Control
                </h3>
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-100 mb-6">
                  <p className="text-sm text-gray-600 mb-4">
                    Select which pages this employee can access in the system. This controls their navigation menu and available features.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {pageAccessOptions.map((page) => {
                      const currentAccess = getEmployeePageAccess(selectedEmployee.employeeId);
                      const isChecked = currentAccess[page.id] || false;
                      
                      return (
                        <div 
                          key={page.id} 
                          className={`bg-white rounded-lg border p-4 transition-all ${isChecked ? 'border-blue-300 bg-blue-50/50' : 'border-gray-200'}`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="mt-1">
                              <input
                                type="checkbox"
                                id={`page-${page.id}-${selectedEmployee.employeeId}`}
                                checked={isChecked}
                                onChange={(e) => handlePageAccessChange(selectedEmployee.employeeId, page.id, e.target.checked)}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                              />
                            </div>
                            <div className="flex-1">
                              <label 
                                htmlFor={`page-${page.id}-${selectedEmployee.employeeId}`}
                                className="flex items-center gap-2 text-sm font-medium text-gray-800 cursor-pointer"
                              >
                                <div className="text-blue-600">
                                  {page.icon}
                                </div>
                                {page.name}
                              </label>
                              <p className="text-xs text-gray-500 mt-1 ml-6">
                                {page.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-blue-200">
                    <button
                      onClick={handleSavePageAccess}
                      className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-200 flex items-center gap-2 transition-all"
                    >
                      <Check size={18} /> Save Page Access
                    </button>
                  </div>
                </div>
              </div>

              {/* Task Assignments Section */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FileCheck size={18} /> Task Assignments
                </h3>
                
                {/* Existing Presentations */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Existing Tasks</h4>
                  {getEmployeePresentations(selectedEmployee.employeeId).length > 0 ? (
                    <div className="space-y-3">
                      {getEmployeePresentations(selectedEmployee.employeeId).map(presentation => (
                        <div key={presentation.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-medium text-gray-800">{presentation.title}</h4>
                              <p className="text-sm text-gray-600 mt-1">{presentation.description}</p>
                            </div>
                            <div className="flex gap-2">
                              <select 
                                value={presentation.status}
                                onChange={(e) => handlePresentationStatusChange(presentation.id, e.target.value)}
                                className="text-xs px-2 py-1 rounded border border-gray-300"
                              >
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                                <option value="Overdue">Overdue</option>
                              </select>
                              <button 
                                onClick={() => handleDeletePresentation(presentation.id)}
                                className="p-1 text-red-600 hover:bg-red-50 rounded"
                                title="Delete"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-3">
                            <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(presentation.priority)}`}>
                              {presentation.priority} Priority
                            </span>
                            <span className={`px-2 py-1 rounded text-xs ${getStatusColor(presentation.status)}`}>
                              {presentation.status}
                            </span>
                            <span className="px-2 py-1 rounded text-xs bg-gray-100 text-gray-800">
                              <CalendarDays size={12} className="inline mr-1" />
                              Deadline: {presentation.deadline}
                            </span>
                            <span className="px-2 py-1 rounded text-xs bg-gray-100 text-gray-800">
                              <Clock4 size={12} className="inline mr-1" />
                              Assigned: {presentation.assignedDate}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                      <Presentation size={32} className="mx-auto text-gray-400 mb-2" />
                      <p className="text-gray-500">No tasks assigned yet</p>
                    </div>
                  )}
                </div>

                {/* Assign New Presentation Form */}
                <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Send size={18} /> Assign New Task
                  </h4>
                  <form onSubmit={handleAssignPresentation}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Task Title *</label>
                        <input
                          type="text"
                          name="title"
                          value={presentationForm.title}
                          onChange={handlePresentationFormChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g., Monthly Sales Report"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Priority *</label>
                        <select
                          name="priority"
                          value={presentationForm.priority}
                          onChange={handlePresentationFormChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="Low">Low Priority</option>
                          <option value="Medium">Medium Priority</option>
                          <option value="High">High Priority</option>
                        </select>
                      </div>
                      
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-sm font-medium text-gray-700">Description *</label>
                        <textarea
                          name="description"
                          value={presentationForm.description}
                          onChange={handlePresentationFormChange}
                          rows="3"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Detailed description of the task..."
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Deadline *</label>
                        <input
                          type="date"
                          name="deadline"
                          value={presentationForm.deadline}
                          onChange={handlePresentationFormChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Attachments (Optional)</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 cursor-pointer transition-colors">
                          <UploadCloud size={24} className="mx-auto text-gray-400 mb-2" />
                          <p className="text-sm text-gray-600">Click to upload files</p>
                          <input
                            type="file"
                            className="hidden"
                            onChange={(e) => setPresentationForm(prev => ({ ...prev, attachments: e.target.files[0] }))}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={handleClosePresentationModal}
                        className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl transition-all"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-lg shadow-green-200 flex items-center gap-2 transition-all"
                      >
                        <Send size={18} /> Assign Task
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Employee Management</h1>
          <p className="text-gray-500 mt-1">Manage employee records, payroll, and access permissions.</p>
        </div>
        
        {view === 'list' ? (
             <button 
               onClick={handleAddNew}
               className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 shadow-lg transition-all"
             >
                <Plus size={20} /> Add New Employee
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

      {/* --- VIEW: ADD/EDIT EMPLOYEE --- */}
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
                <h2 className="text-xl font-bold text-gray-800 text-center">{isEditing ? `Edit Employee #${editId}` : "Register New Employee"}</h2>
            </div>

            <form onSubmit={handleSubmit} className="p-8">
                {currentStep === 1 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in slide-in-from-right-4 duration-300">
                        <div className="md:col-span-3 pb-2 border-b border-gray-100 mb-2">
                            <h3 className="font-bold text-gray-800 flex items-center gap-2">
                                <User size={18} className="text-blue-500"/> Personal Information
                            </h3>
                        </div>
                        
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-500 uppercase">
                                Employee ID <span className="text-red-500">*</span>
                            </label>
                            <input 
                                name="employeeId" 
                                value={formData.employeeId} 
                                onChange={handleChange}
                                className={`w-full p-3 bg-gray-50 border rounded-lg ${errors.employeeId ? 'border-red-500' : 'border-gray-200'}`} 
                                placeholder="e.g. EMP001" 
                            />
                            {errors.employeeId && <p className="text-xs text-red-500">{errors.employeeId}</p>}
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
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
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
                                <option>Single</option>
                                <option>Married</option>
                                <option>Divorced</option>
                                <option>Widowed</option>
                            </select>
                        </div>
                        
                        <div className="md:col-span-3 pb-2 border-b border-gray-100 mb-2 mt-4">
                            <h3 className="font-bold text-gray-800 flex items-center gap-2">
                                <Key size={18} className="text-blue-500"/> Login Credentials
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
                                <MapPin size={18} className="text-blue-500"/> Address & Contact
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
                                <Phone size={18} className="text-blue-500"/> Emergency Contact
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
                            <select 
                                name="emergencyRelation" 
                                value={formData.emergencyRelation} 
                                onChange={handleChange}
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
                            >
                                <option>Father</option>
                                <option>Mother</option>
                                <option>Spouse</option>
                                <option>Sibling</option>
                                <option>Friend</option>
                                <option>Other</option>
                            </select>
                        </div>
                        
                        <div className="md:col-span-3 pb-2 border-b border-gray-100 mb-2 mt-4">
                            <h3 className="font-bold text-gray-800 flex items-center gap-2">
                                <Briefcase size={18} className="text-blue-500"/> Professional Details
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
                            <input 
                                name="reportingManager" 
                                value={formData.reportingManager} 
                                onChange={handleChange}
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg" 
                                placeholder="Manager name"
                            />
                        </div>
                        
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-500 uppercase">Work Location</label>
                            <select 
                                name="workLocation" 
                                value={formData.workLocation} 
                                onChange={handleChange}
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
                            >
                                <option>Office</option>
                                <option>Remote</option>
                                <option>Hybrid</option>
                                <option>On-site</option>
                            </select>
                        </div>
                    </div>
                )}

                {currentStep === 3 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-right-4 duration-300">
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <FileText size={18} className="text-blue-500"/> KYC Documents
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
                                <Landmark size={18} className="text-blue-500"/> Banking Details
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
                                <DollarSign size={18} className="text-blue-500"/> Salary Structure
                            </h3>
                            <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                                <div className="mb-4">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Salary Type</label>
                                    <select 
                                        name="salaryType" 
                                        value={formData.salaryType} 
                                        onChange={handleChange}
                                        className="w-full p-3 bg-white border border-green-200 rounded-lg"
                                    >
                                        <option>Monthly</option>
                                        <option>Weekly</option>
                                        <option>Daily</option>
                                    </select>
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
                                <ShieldCheck size={18} className="text-blue-500"/> Status & Permissions
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
                                        <input 
                                            name="leaveBalance" 
                                            value={formData.leaveBalance} 
                                            onChange={handleChange}
                                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg" 
                                            placeholder="Days" 
                                        />
                                    </div>
                                </div>
                                
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                                    <label className="text-xs font-bold text-gray-500 uppercase block mb-3">System Permissions</label>
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-white rounded transition">
                                            <input 
                                                type="checkbox" 
                                                name="perm_addCustomer" 
                                                checked={formData.permissions.addCustomer} 
                                                onChange={handleChange}
                                                className="w-5 h-5 accent-blue-600 rounded" 
                                            />
                                            <span className="text-gray-700">Can Add Customer</span>
                                        </label>
                                        
                                        <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-white rounded transition">
                                            <input 
                                                type="checkbox" 
                                                name="perm_viewCustomer" 
                                                checked={formData.permissions.viewCustomer} 
                                                onChange={handleChange}
                                                className="w-5 h-5 accent-blue-600 rounded" 
                                            />
                                            <span className="text-gray-700">Can View All Customers</span>
                                        </label>
                                        
                                        <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-white rounded transition">
                                            <input 
                                                type="checkbox" 
                                                name="perm_processLoan" 
                                                checked={formData.permissions.processLoan} 
                                                onChange={handleChange}
                                                className="w-5 h-5 accent-blue-600 rounded" 
                                            />
                                            <span className="text-gray-700">Can Process Loans</span>
                                        </label>
                                        
                                        <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-white rounded transition">
                                            <input 
                                                type="checkbox" 
                                                name="perm_manageLeads" 
                                                checked={formData.permissions.manageLeads} 
                                                onChange={handleChange}
                                                className="w-5 h-5 accent-blue-600 rounded" 
                                            />
                                            <span className="text-gray-700">Can Manage Leads</span>
                                        </label>
                                        
                                        <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-white rounded transition">
                                            <input 
                                                type="checkbox" 
                                                name="perm_generateReports" 
                                                checked={formData.permissions.generateReports} 
                                                onChange={handleChange}
                                                className="w-5 h-5 accent-blue-600 rounded" 
                                            />
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
                            {isEditing ? <Check size={18} /> : <Check size={18} />} {isEditing ? "Update Employee" : "Submit Employee"}
                        </button>
                    )}
                </div>
            </form>
        </div>
      )}

      {/* --- VIEW: EMPLOYEE LIST --- */}
      {view === 'list' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden animate-in fade-in duration-300">
            {/* Toolbar */}
            <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50/50">
                <div className="relative w-full sm:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by name, employee ID, or department..." 
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20" 
                    />
                </div>
                
                <div className="flex gap-2 relative">
                    {/* DEPARTMENT FILTER */}
                    <div className="relative">
                        <select 
                            value={filterDepartment}
                            onChange={(e) => setFilterDepartment(e.target.value)}
                            className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium bg-white text-gray-600 hover:bg-gray-50"
                        >
                            {departments.map(dept => (
                                <option key={dept} value={dept}>{dept} Department</option>
                            ))}
                        </select>
                    </div>
                    
                    {/* STATUS FILTER */}
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
                                {['All', 'Active', 'Inactive', 'On Leave', 'Probation'].map((status) => (
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
                            <th className="px-6 py-4">Emp ID</th>
                            <th className="px-6 py-4">Employee Name</th>
                            <th className="px-6 py-4">Department</th>
                            <th className="px-6 py-4">Designation</th>
                            <th className="px-6 py-4">Contact</th>
                            <th className="px-6 py-4">Salary</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredEmployees.map((employee) => {
                            const employeePresentations = getEmployeePresentations(employee.employeeId);
                            const pendingPresentations = employeePresentations.filter(p => p.status === 'Pending' || p.status === 'In Progress').length;
                            
                            return (
                            <tr key={employee.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-blue-600 text-sm font-medium">#{employee.employeeId}</td>
                                <td className="px-6 py-4 font-medium text-gray-800 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-bold">
                                        {employee.fullName.charAt(0)}
                                    </div>
                                    <div>
                                        <div>{employee.fullName}</div>
                                        <div className="text-xs text-gray-500">{employee.email}</div>
                                        {pendingPresentations > 0 && (
                                            <div className="flex items-center gap-1 text-xs text-orange-600 mt-1">
                                                <AlertCircle size={10} />
                                                <span>{pendingPresentations} pending task(s)</span>
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-600 text-sm">
                                    <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs font-medium">
                                        {employee.department}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-600 text-sm">{employee.designation}</td>
                                <td className="px-6 py-4 text-gray-600 text-sm">
                                    <div>{employee.phone}</div>
                                    <div className="text-xs text-gray-500">Joined: {employee.dateOfJoining}</div>
                                </td>
                                <td className="px-6 py-4 text-green-600 font-bold text-sm">{employee.totalSalary}</td>
                                <td className="px-6 py-4">  
                                    <div className="flex flex-col gap-1">
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border 
                                            ${employee.status === 'Active' ? 'bg-green-50 text-green-700 border-green-100' : 
                                              employee.status === 'Inactive' ? 'bg-red-50 text-red-700 border-red-100' : 
                                              employee.status === 'On Leave' ? 'bg-yellow-50 text-yellow-700 border-yellow-100' :
                                              'bg-gray-50 text-gray-700 border-gray-100'}`}>
                                            {employee.status}
                                        </span>
                                        <span className="text-xs text-gray-500">Leaves: {employee.leaveBalance} days</span> 
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2 relative">
                                        
                                        {/* 3-Dots Menu Button */}
                                        <div className="relative">
                                            <button 
                                                onClick={() => setShowActionMenu(showActionMenu === employee.id ? null : employee.id)}
                                                className="p-1.5 text-gray-600 hover:bg-gray-50 rounded relative"
                                                title="More Actions"
                                            >
                                                <MoreVertical size={16} />
                                            </button>
                                            
                                            {/* Action Menu Dropdown */}
                                            {showActionMenu === employee.id && (
                                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-10 p-1 animate-in slide-in-from-top-2 duration-200">
                                                    <button
                                                        onClick={() => handlePresentationClick(employee)}
                                                        className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-purple-50 text-purple-600 flex items-center gap-2 transition-colors"
                                                    >
                                                        <Presentation size={14} />
                                                        Permissions
                                                    </button>

                                                    <button
                                                        onClick={() => handleDelete(employee.id)}
                                                        className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-red-50 text-red-600 flex items-center gap-2 transition-colors"
                                                    >
                                                        <Trash2 size={14} />
                                                        Delete Employee
                                                    </button>

                                                    <button onClick={() => handleView(employee)} className="text-blue-600 hover:bg-blue-50 rounded  w-full text-left px-3 py-2 rounded-lg text-sm  flex items-center gap-2 transition-colors" title="View">
                                                        <Eye size={16} />
                                                        View Employee
                                                    </button>

                                                    <button onClick={() => handleEdit(employee)} className="  text-green-600 hover:bg-green-50 rounded  w-full text-left px-3 py-2 rounded-lg text-sm  flex items-center gap-2 transition-colors rounded" title="Edit">
                                                        <Edit size={16} />
                                                        Edit Employee
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                        
                                        {/* <button onClick={() => handleDelete(employee.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded" title="Delete">
                                            <Trash2 size={16} />
                                        </button> */}
                                    </div>
                                </td>
                            </tr>
                        )})}
                    </tbody>
                </table>
                {filteredEmployees.length === 0 && (
                    <div className="text-center py-10 text-gray-500">
                        {searchQuery || filterStatus !== 'All' || filterDepartment !== 'All' ? "No matching employees found." : "No employees found. Click \"Add New Employee\" to start."}
                    </div>
                )}
            </div>
        </div>
      )}
    </div>
  );
}