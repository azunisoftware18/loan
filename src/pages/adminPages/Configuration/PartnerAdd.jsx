import React, { useState, useRef, useEffect } from 'react';
import { 
  User, Building, Briefcase, MapPin, Phone, Mail, Globe, Percent, CreditCard, 
  FileText, Landmark, ShieldCheck, Check, ChevronRight, ChevronLeft, Plus, 
  Search, Trash2, Edit, Eye, UploadCloud, X, Download, Filter, Calendar,
  DollarSign, Users, Target, BarChart, Settings, Home, Bell, MessageSquare,
  Handshake, Network, Star, Award, TrendingUp, FileCheck, Send, Clock4, AlertCircle,
  MoreVertical, Presentation, CalendarDays, CheckCircle, XCircle, Clock, Key
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

  // --- TASK MODAL STATE ---
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [tasks, setTasks] = useState([]);
  
  // --- PERMISSIONS MODAL STATE ---
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [selectedPartnerForPermissions, setSelectedPartnerForPermissions] = useState(null);
  
  // --- SEARCH & FILTER STATE ---
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterType, setFilterType] = useState('All');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  
  // --- 3-DOTS MENU STATE ---
  const [showActionMenu, setShowActionMenu] = useState(null);

  // Refs for file inputs
  const companyLogoRef = useRef(null);
  const agreementRef = useRef(null);
  const panRef = useRef(null);
  const gstRef = useRef(null);
  const licenseRef = useRef(null);
  
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

  // Task Form State
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    deadline: '',
    priority: 'Medium',
    type: 'Follow-up',
    attachments: null
  });

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

  // Partner Page Access Options
  const partnerPageAccessOptions = [
    { id: 'dashboard', name: 'Dashboard', icon: <Home size={16} />, description: 'Partner dashboard overview' },
    { id: 'leads', name: 'Leads Management', icon: <Target size={16} />, description: 'View and manage leads' },
    { id: 'customers', name: 'Customer Management', icon: <Users size={16} />, description: 'View and manage customers' },
    { id: 'reports', name: 'Reports & Analytics', icon: <BarChart size={16} />, description: 'View performance reports' },
    { id: 'commissions', name: 'Commission Reports', icon: <DollarSign size={16} />, description: 'View commission statements' },
    { id: 'documents', name: 'Document Upload', icon: <FileText size={16} />, description: 'Upload customer documents' },
    { id: 'notifications', name: 'Notifications', icon: <Bell size={16} />, description: 'View system notifications' },
    { id: 'profile', name: 'Partner Profile', icon: <User size={16} />, description: 'View and edit partner profile' },
    { id: 'subagents', name: 'Sub-Agents', icon: <Users size={16} />, description: 'Manage sub-agents (if applicable)' },
  ];

  // Page Access State for each partner
  const [partnerPageAccess, setPartnerPageAccess] = useState({});

  // --- MOCK DATA ---
  const [partners, setPartners] = useState([
    { 
      id: 'PTR001', 
      companyName: "Sharma Financial Services", 
      partnerName: "Rajesh Sharma", 
      email: "rajesh@sharmafinance.com", 
      phone: "9876543210", 
      altPhone: "9876500000", 
      website: "www.sharmafinance.com",
      establishedYear: "2015",
      partnerType: "Company",
      businessNature: "Loan Advisory & Financial Services",
      address: "123, Business Park", 
      city: "Delhi", 
      state: "Delhi", 
      pincode: "110016",
      contactPerson: "Rajesh Sharma",
      contactPersonDesignation: "Owner",
      partnerId: "PTR001",
      businessCategory: "Finance",
      specialization: "Home Loans, Personal Loans",
      totalEmployees: "15",
      annualTurnover: "₹2.5 Cr",
      registrationNo: "REG123456",
      gstNo: "07AABCS1429B1Z",
      panNo: "ABCDE1234F",
      accountHolder: "Rajesh Sharma", 
      bankName: "HDFC Bank", 
      accountNo: "501000123456",
      ifsc: "HDFC000123", 
      upiId: "rajesh.sharma@hdfc",
      commissionType: "Percentage",
      commissionValue: "2.5%",
      paymentCycle: "Monthly",
      minimumPayout: "₹10,000",
      monthlyTarget: "₹50,00,000",
      quarterlyTarget: "₹1.5 Cr",
      annualTarget: "₹6 Cr",
      performanceRating: "4",
      status: "Active",
      partnershipDate: "2020-06-01",
      renewalDate: "2024-06-01",
      portalAccess: true,
      username: "rajesh_sharma",
      permissions: { 
        viewLeads: true, 
        addCustomers: true, 
        viewReports: true,
        accessPortal: true,
        manageSubAgents: false 
      }
    },
    { 
      id: 'PTR002', 
      companyName: "Patel Consultancy", 
      partnerName: "Priya Patel", 
      email: "priya@patelconsultancy.com", 
      phone: "9988776655", 
      altPhone: "", 
      website: "www.patelconsultancy.com",
      establishedYear: "2018",
      partnerType: "Individual",
      businessNature: "Business Loan Specialist",
      address: "45, Corporate Tower", 
      city: "Mumbai", 
      state: "Maharashtra", 
      pincode: "400001",
      contactPerson: "Priya Patel",
      contactPersonDesignation: "Proprietor",
      partnerId: "PTR002",
      businessCategory: "Finance",
      specialization: "Business Loans, Working Capital",
      totalEmployees: "8",
      annualTurnover: "₹1.2 Cr",
      registrationNo: "REG789012",
      gstNo: "27BBHCS1429C1Z",
      panNo: "XYZAB1234C",
      accountHolder: "Priya Patel", 
      bankName: "SBI", 
      accountNo: "300000567890",
      ifsc: "SBIN000123", 
      upiId: "priya.patel@sbi",
      commissionType: "Percentage",
      commissionValue: "3%",
      paymentCycle: "Monthly",
      minimumPayout: "₹15,000",
      monthlyTarget: "₹30,00,000",
      quarterlyTarget: "₹90 Lakhs",
      annualTarget: "₹3.6 Cr",
      performanceRating: "5",
      status: "Active",
      partnershipDate: "2021-03-15",
      renewalDate: "2025-03-15",
      portalAccess: true,
      username: "priya_patel",
      permissions: { 
        viewLeads: true, 
        addCustomers: true, 
        viewReports: true,
        accessPortal: true,
        manageSubAgents: true 
      }
    },
    { 
      id: 'PTR003', 
      companyName: "Verma & Associates", 
      partnerName: "Rahul Verma", 
      email: "rahul@vermaassociates.com", 
      phone: "8899776655", 
      altPhone: "8899776600", 
      website: "www.vermaassociates.com",
      establishedYear: "2010",
      partnerType: "Corporate",
      businessNature: "Multi-Service Financial Advisory",
      address: "78, Financial District", 
      city: "Bangalore", 
      state: "Karnataka", 
      pincode: "560001",
      contactPerson: "Rahul Verma",
      contactPersonDesignation: "Managing Partner",
      partnerId: "PTR003",
      businessCategory: "Finance",
      specialization: "All Types of Loans",
      totalEmployees: "25",
      annualTurnover: "₹5 Cr",
      registrationNo: "REG345678",
      gstNo: "29CCDCS1429D1Z",
      panNo: "PQRST1234U",
      accountHolder: "Verma & Associates", 
      bankName: "ICICI Bank", 
      accountNo: "501000789012",
      ifsc: "ICIC000123", 
      upiId: "verma.associates@icici",
      commissionType: "Percentage",
      commissionValue: "2%",
      paymentCycle: "Quarterly",
      minimumPayout: "₹50,000",
      monthlyTarget: "₹75,00,000",
      quarterlyTarget: "₹2.25 Cr",
      annualTarget: "₹9 Cr",
      performanceRating: "3",
      status: "Active",
      partnershipDate: "2019-01-10",
      renewalDate: "2024-01-10",
      portalAccess: true,
      username: "verma_associates",
      permissions: { 
        viewLeads: true, 
        addCustomers: true, 
        viewReports: true,
        accessPortal: true,
        manageSubAgents: true 
      }
    },
    { 
      id: 'PTR004', 
      companyName: "Reddy Finance Solutions", 
      partnerName: "Sneha Reddy", 
      email: "sneha@reddyfinance.com", 
      phone: "7766554433", 
      altPhone: "", 
      website: "www.reddyfinance.com",
      establishedYear: "2020",
      partnerType: "Agency",
      businessNature: "Loan Processing Agency",
      address: "22, Hitech City", 
      city: "Hyderabad", 
      state: "Telangana", 
      pincode: "500081",
      contactPerson: "Sneha Reddy",
      contactPersonDesignation: "Director",
      partnerId: "PTR004",
      businessCategory: "Finance",
      specialization: "Personal Loans, Credit Cards",
      totalEmployees: "12",
      annualTurnover: "₹80 Lakhs",
      registrationNo: "REG901234",
      gstNo: "36DDECS1429E1Z",
      panNo: "LMNOP1234Q",
      accountHolder: "Sneha Reddy", 
      bankName: "Axis Bank", 
      accountNo: "501000345678",
      ifsc: "UTIB000123", 
      upiId: "sneha.reddy@axis",
      commissionType: "Fixed",
      commissionValue: "₹500 per case",
      paymentCycle: "Per Transaction",
      minimumPayout: "₹5,000",
      monthlyTarget: "₹20,00,000",
      quarterlyTarget: "₹60 Lakhs",
      annualTarget: "₹2.4 Cr",
      performanceRating: "4",
      status: "Inactive",
      partnershipDate: "2022-07-20",
      renewalDate: "2023-07-20",
      portalAccess: false,
      username: "",
      permissions: { 
        viewLeads: false, 
        addCustomers: false, 
        viewReports: false,
        accessPortal: false,
        manageSubAgents: false 
      }
    },
  ]);

  // Mock tasks data
  useEffect(() => {
    const mockTasks = [
      {
        id: 1,
        partnerId: 'PTR001',
        title: 'Monthly Performance Review Meeting',
        description: 'Discuss last month performance and set targets for next month',
        deadline: '2024-04-15',
        priority: 'High',
        type: 'Meeting',
        status: 'Pending',
        assignedDate: '2024-03-20',
        assignedBy: 'Admin',
        attachments: 1
      },
      {
        id: 2,
        partnerId: 'PTR002',
        title: 'Documentation Update',
        description: 'Submit updated KYC documents for renewal',
        deadline: '2024-04-10',
        priority: 'Medium',
        type: 'Documentation',
        status: 'In Progress',
        assignedDate: '2024-03-15',
        assignedBy: 'Manager',
        attachments: 3
      },
      {
        id: 3,
        partnerId: 'PTR003',
        title: 'New Product Training',
        description: 'Training on new loan products launched this quarter',
        deadline: '2024-04-05',
        priority: 'High',
        type: 'Training',
        status: 'Completed',
        assignedDate: '2024-03-10',
        assignedBy: 'Product Team',
        attachments: 2
      }
    ];
    setTasks(mockTasks);
  }, []);

  // Initialize page access for partners
  useEffect(() => {
    const initialAccess = {};
    partners.forEach(partner => {
      initialAccess[partner.partnerId] = {
        dashboard: true,
        leads: partner.permissions?.viewLeads || false,
        customers: partner.permissions?.addCustomers || false,
        reports: partner.permissions?.viewReports || false,
        commissions: true,
        documents: true,
        notifications: true,
        profile: true,
        subagents: partner.permissions?.manageSubAgents || false
      };
    });
    setPartnerPageAccess(initialAccess);
  }, [partners]);

  // --- FILTERED DATA LOGIC ---
  const filteredPartners = partners.filter(partner => {
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

  // Get tasks for selected partner
  const getPartnerTasks = (partnerId) => {
    return tasks.filter(p => p.partnerId === partnerId);
  };

  // Get page access for selected partner
  const getPartnerPageAccess = (partnerId) => {
    return partnerPageAccess[partnerId] || {};
  };

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

  // --- VIEW HANDLER ---
  const handleView = (partner) => {
      setViewData(partner);
      setShowViewModal(true);
  };

  // --- TASK HANDLERS ---
  const handleTaskClick = (partner) => {
    setSelectedPartner(partner);
    setShowTaskModal(true);
    setShowActionMenu(null);
  };

  const handleCloseTaskModal = () => {
    setShowTaskModal(false);
    setSelectedPartner(null);
    setTaskForm({
      title: '',
      description: '',
      deadline: '',
      priority: 'Medium',
      type: 'Follow-up',
      attachments: null
    });
  };

  const handleTaskFormChange = (e) => {
    const { name, value } = e.target;
    setTaskForm(prev => ({ ...prev, [name]: value }));
  };

  // --- PERMISSIONS HANDLERS ---
  const handlePermissionsClick = (partner) => {
    setSelectedPartnerForPermissions(partner);
    setShowPermissionsModal(true);
    setShowActionMenu(null);
  };

  const handleClosePermissionsModal = () => {
    setShowPermissionsModal(false);
    setSelectedPartnerForPermissions(null);
  };

  const handlePartnerPageAccessChange = (partnerId, pageId, checked) => {
    setPartnerPageAccess(prev => ({
      ...prev,
      [partnerId]: {
        ...prev[partnerId],
        [pageId]: checked
      }
    }));
  };

  const handleSavePartnerPermissions = () => {
    if (selectedPartnerForPermissions) {
      const updatedPermissions = {
        viewLeads: partnerPageAccess[selectedPartnerForPermissions.partnerId]?.leads || false,
        addCustomers: partnerPageAccess[selectedPartnerForPermissions.partnerId]?.customers || false,
        viewReports: partnerPageAccess[selectedPartnerForPermissions.partnerId]?.reports || false,
        accessPortal: true,
        manageSubAgents: partnerPageAccess[selectedPartnerForPermissions.partnerId]?.subagents || false
      };

      setPartners(prev => prev.map(partner => 
        partner.id === selectedPartnerForPermissions.id 
          ? { ...partner, permissions: updatedPermissions }
          : partner
      ));

      alert(`Permissions updated for ${selectedPartnerForPermissions.companyName} successfully!`);
      handleClosePermissionsModal();
    }
  };

  const handleAssignTask = (e) => {
    e.preventDefault();
    
    if (!taskForm.title || !taskForm.description || !taskForm.deadline) {
      alert('Please fill all required fields');
      return;
    }

    const newTask = {
      id: tasks.length + 1,
      partnerId: selectedPartner.partnerId,
      partnerName: selectedPartner.companyName,
      title: taskForm.title,
      description: taskForm.description,
      deadline: taskForm.deadline,
      priority: taskForm.priority,
      type: taskForm.type,
      status: 'Pending',
      assignedDate: new Date().toISOString().split('T')[0],
      assignedBy: 'Admin',
      attachments: taskForm.attachments ? 1 : 0
    };

    setTasks(prev => [...prev, newTask]);
    
    alert(`Task assigned to ${selectedPartner.companyName} successfully!`);
    handleCloseTaskModal();
  };

  const handleTaskStatusChange = (taskId, newStatus) => {
    setTasks(prev => prev.map(p => 
      p.id === taskId ? { ...p, status: newStatus } : p
    ));
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(prev => prev.filter(p => p.id !== taskId));
    }
  };

  // --- DOWNLOAD SINGLE PROFILE ---
  const handleDownloadProfile = () => {
      if (!viewData) return;
      
      const rows = [
          ["Field", "Value"],
          ["Partner ID", viewData.partnerId],
          ["Company Name", viewData.companyName],
          ["Contact Person", viewData.contactPerson],
          ["Email", viewData.email],
          ["Phone", viewData.phone],
          ["Alt Phone", viewData.altPhone || 'N/A'],
          ["Website", viewData.website || 'N/A'],
          ["Partner Type", viewData.partnerType],
          ["Business Nature", viewData.businessNature],
          ["Status", viewData.status],
          ["Address", `"${viewData.address}, ${viewData.city}, ${viewData.state} - ${viewData.pincode}"`],
          ["Partnership Date", viewData.partnershipDate],
          ["Renewal Date", viewData.renewalDate],
          ["Total Employees", viewData.totalEmployees],
          ["Annual Turnover", viewData.annualTurnover],
          ["Registration No", viewData.registrationNo || 'N/A'],
          ["GST No", viewData.gstNo || 'N/A'],
          ["PAN No", viewData.panNo],
          ["Bank Name", viewData.bankName],
          ["Account No", `'${viewData.accountNo}`],
          ["IFSC Code", viewData.ifsc],
          ["UPI ID", viewData.upiId || 'N/A'],
          ["Commission Type", viewData.commissionType],
          ["Commission Value", viewData.commissionValue],
          ["Payment Cycle", viewData.paymentCycle],
          ["Minimum Payout", viewData.minimumPayout],
          ["Monthly Target", viewData.monthlyTarget],
          ["Performance Rating", `${viewData.performanceRating}/5`],
          ["Portal Access", viewData.portalAccess ? 'Yes' : 'No'],
          ["Username", viewData.username || 'N/A']
      ];

      let csvContent = "data:text/csv;charset=utf-8,";
      rows.forEach(rowArray => {
          const row = rowArray.join(",");
          csvContent += row + "\n";
      });

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.href = encodedUri;
      link.download = `${viewData.companyName}_Partner_Profile.csv`;
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
      const newId = `PTR${String(partners.length + 101).padStart(3, '0')}`;
      setFormData(prev => ({ ...prev, partnerId: newId }));
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

  const handleNext = () => {
      if (validateStep(currentStep)) {
          setCurrentStep(prev => Math.min(prev + 1, 4));
      }
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

  const steps = [
    { id: 1, title: "Basic Info", icon: <Building size={18} /> },
    { id: 2, title: "Business Details", icon: <Briefcase size={18} /> },
    { id: 3, title: "Financials", icon: <DollarSign size={18} /> },
    { id: 4, title: "Documents & Status", icon: <ShieldCheck size={18} /> }
  ];

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

  // Get performance rating color
  const getPerformanceColor = (rating) => {
    const option = performanceOptions.find(opt => opt.value === rating);
    return option ? option.color : 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-10 relative">
      
      {/* VIEW MODAL */}
      {showViewModal && viewData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
                
                <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-lg font-bold">
                            {viewData.companyName.charAt(0)}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">{viewData.companyName}</h2>
                            <p className="text-sm text-gray-500">{viewData.partnerType} • ID: {viewData.partnerId} • {viewData.status}</p>
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

                <div className="p-6 overflow-y-auto custom-scrollbar">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider border-b pb-2 mb-4">Company Details</h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div><span className="text-gray-500 block">Contact Person</span> <span className="font-medium text-gray-800">{viewData.contactPerson}</span></div>
                                    <div><span className="text-gray-500 block">Designation</span> <span className="font-medium text-gray-800">{viewData.contactPersonDesignation}</span></div>
                                    <div><span className="text-gray-500 block">Email</span> <span className="font-medium text-gray-800">{viewData.email}</span></div>
                                    <div><span className="text-gray-500 block">Phone</span> <span className="font-medium text-gray-800">{viewData.phone}</span></div>
                                    <div><span className="text-gray-500 block">Website</span> <span className="font-medium text-blue-600">{viewData.website || '-'}</span></div>
                                    <div><span className="text-gray-500 block">Established</span> <span className="font-medium text-gray-800">{viewData.establishedYear || '-'}</span></div>
                                    <div className="col-span-2"><span className="text-gray-500 block">Business Nature</span> <span className="font-medium text-gray-800">{viewData.businessNature || '-'}</span></div>
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

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider border-b pb-2 mb-4">Business Information</h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div><span className="text-gray-500 block">Partner ID</span> <span className="font-bold text-blue-600">{viewData.partnerId}</span></div>
                                    <div><span className="text-gray-500 block">Partner Type</span> <span className="font-medium text-gray-800">{viewData.partnerType}</span></div>
                                    <div><span className="text-gray-500 block">Category</span> <span className="font-medium text-gray-800">{viewData.businessCategory}</span></div>
                                    <div><span className="text-gray-500 block">Specialization</span> <span className="font-medium text-gray-800">{viewData.specialization || '-'}</span></div>
                                    <div><span className="text-gray-500 block">Total Employees</span> <span className="font-medium text-gray-800">{viewData.totalEmployees || '-'}</span></div>
                                    <div><span className="text-gray-500 block">Annual Turnover</span> <span className="font-medium text-gray-800">{viewData.annualTurnover || '-'}</span></div>
                                    <div><span className="text-gray-500 block">Registration No</span> <span className="font-mono text-gray-800">{viewData.registrationNo || '-'}</span></div>
                                    <div><span className="text-gray-500 block">GST No</span> <span className="font-mono text-gray-800">{viewData.gstNo || '-'}</span></div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider border-b pb-2 mb-4">Partnership Dates</h3>
                                <div className="flex gap-4 text-sm">
                                    <div><span className="text-gray-500 block">Start Date</span> <span className="font-medium text-gray-800">{viewData.partnershipDate || '-'}</span></div>
                                    <div><span className="text-gray-500 block">Renewal Date</span> <span className="font-medium text-gray-800">{viewData.renewalDate || '-'}</span></div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider border-b pb-2 mb-4">Commission & Payments</h3>
                                <div className="bg-blue-50 p-4 rounded-xl space-y-3 text-sm">
                                    <div className="flex justify-between"><span>Commission Type:</span> <span className="font-bold text-gray-800">{viewData.commissionType}</span></div>
                                    <div className="flex justify-between"><span>Commission Value:</span> <span className="font-bold text-green-600">{viewData.commissionValue}</span></div>
                                    <div className="flex justify-between"><span>Payment Cycle:</span> <span className="font-medium text-gray-800">{viewData.paymentCycle}</span></div>
                                    <div className="flex justify-between"><span>Minimum Payout:</span> <span className="font-medium text-gray-800">{viewData.minimumPayout}</span></div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider border-b pb-2 mb-4">Targets</h3>
                                <div className="bg-green-50 p-4 rounded-xl border border-green-100 space-y-3 text-sm">
                                    <div className="flex justify-between"><span>Monthly Target:</span> <span className="font-bold text-gray-800">{viewData.monthlyTarget}</span></div>
                                    <div className="flex justify-between"><span>Quarterly Target:</span> <span className="font-medium text-gray-800">{viewData.quarterlyTarget}</span></div>
                                    <div className="flex justify-between"><span>Annual Target:</span> <span className="font-medium text-gray-800">{viewData.annualTarget}</span></div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider border-b pb-2 mb-4">Banking Details</h3>
                                <div className="bg-gray-50 p-4 rounded-xl space-y-2 text-sm">
                                    <div className="flex justify-between"><span>Bank Name:</span> <span className="font-bold text-gray-800">{viewData.bankName}</span></div>
                                    <div className="flex justify-between"><span>Account No:</span> <span className="font-mono text-gray-800">{viewData.accountNo}</span></div>
                                    <div className="flex justify-between"><span>IFSC Code:</span> <span className="font-mono text-gray-800">{viewData.ifsc}</span></div>
                                    <div className="flex justify-between"><span>Account Holder:</span> <span className="font-medium text-gray-800">{viewData.accountHolder}</span></div>
                                    {viewData.upiId && (
                                        <div className="flex justify-between"><span>UPI ID:</span> <span className="font-medium text-blue-600">{viewData.upiId}</span></div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider border-b pb-2 mb-4">Performance & Access</h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-gray-500 block">Performance Rating</span>
                                        <div className={`px-3 py-1 rounded-full text-xs font-bold mt-1 inline-block ${getPerformanceColor(viewData.performanceRating)}`}>
                                            {viewData.performanceRating}/5
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-gray-500 block">Portal Access</span>
                                        <div className={`px-3 py-1 rounded-full text-xs font-bold mt-1 ${viewData.portalAccess ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {viewData.portalAccess ? 'Enabled' : 'Disabled'}
                                        </div>
                                    </div>
                                    {viewData.username && (
                                        <div className="col-span-2">
                                            <span className="text-gray-500 block">Login Credentials</span>
                                            <div className="font-mono text-gray-800">User: {viewData.username}</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
      )}

      {/* TASK MODAL */}
      {showTaskModal && selectedPartner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
            
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                  <FileCheck size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Manage Partner Tasks</h2>
                  <p className="text-sm text-gray-500">Managing: {selectedPartner.companyName} ({selectedPartner.partnerId})</p>
                </div>
              </div>
              <button 
                onClick={handleCloseTaskModal}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FileCheck size={18} /> Existing Tasks
                </h3>
                {getPartnerTasks(selectedPartner.partnerId).length > 0 ? (
                  <div className="space-y-3">
                    {getPartnerTasks(selectedPartner.partnerId).map(task => (
                      <div key={task.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium text-gray-800">{task.title}</h4>
                              <span className={`px-2 py-0.5 rounded text-xs ${getPriorityColor(task.priority)}`}>
                                {task.priority}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                            <div className="flex items-center gap-3 mt-2">
                              <span className="px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-800">
                                {task.type}
                              </span>
                              <span className="text-xs text-gray-500">
                                <CalendarDays size={12} className="inline mr-1" />
                                Due: {task.deadline}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <select 
                              value={task.status}
                              onChange={(e) => handleTaskStatusChange(task.id, e.target.value)}
                              className="text-xs px-2 py-1 rounded border border-gray-300"
                            >
                              <option value="Pending">Pending</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Completed">Completed</option>
                              <option value="Overdue">Overdue</option>
                            </select>
                            <button 
                              onClick={() => handleDeleteTask(task.id)}
                              className="p-1 text-red-600 hover:bg-red-50 rounded"
                              title="Delete"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          <span className={`px-2 py-1 rounded text-xs ${getStatusColor(task.status)}`}>
                            {task.status}
                          </span>
                          <span className="px-2 py-1 rounded text-xs bg-gray-100 text-gray-800">
                            <Clock4 size={12} className="inline mr-1" />
                            Assigned: {task.assignedDate}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                    <FileCheck size={32} className="mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-500">No tasks assigned yet</p>
                  </div>
                )}
              </div>

              <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Send size={18} /> Assign New Task
                </h4>
                <form onSubmit={handleAssignTask}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Task Title *</label>
                      <input
                        type="text"
                        name="title"
                        value={taskForm.title}
                        onChange={handleTaskFormChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., Follow-up Meeting"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Task Type *</label>
                      <select
                        name="type"
                        value={taskForm.type}
                        onChange={handleTaskFormChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="Follow-up">Follow-up</option>
                        <option value="Meeting">Meeting</option>
                        <option value="Documentation">Documentation</option>
                        <option value="Training">Training</option>
                        <option value="Payment">Payment Related</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Priority *</label>
                      <select
                        name="priority"
                        value={taskForm.priority}
                        onChange={handleTaskFormChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="Low">Low Priority</option>
                        <option value="Medium">Medium Priority</option>
                        <option value="High">High Priority</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Deadline *</label>
                      <input
                        type="date"
                        name="deadline"
                        value={taskForm.deadline}
                        onChange={handleTaskFormChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-sm font-medium text-gray-700">Description *</label>
                      <textarea
                        name="description"
                        value={taskForm.description}
                        onChange={handleTaskFormChange}
                        rows="3"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Detailed description of the task..."
                        required
                      />
                    </div>
                    
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-sm font-medium text-gray-700">Attachments (Optional)</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 cursor-pointer transition-colors">
                        <UploadCloud size={24} className="mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600">Click to upload files</p>
                        <input
                          type="file"
                          className="hidden"
                          onChange={(e) => setTaskForm(prev => ({ ...prev, attachments: e.target.files[0] }))}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={handleCloseTaskModal}
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
      )}

      {/* PERMISSIONS MODAL */}
      {showPermissionsModal && selectedPartnerForPermissions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
            
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Manage Partner Permissions</h2>
                  <p className="text-sm text-gray-500">Managing: {selectedPartnerForPermissions.companyName} ({selectedPartnerForPermissions.partnerId})</p>
                </div>
              </div>
              <button 
                onClick={handleClosePermissionsModal}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <ShieldCheck size={18} /> Page Access Control
                </h3>
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-100 mb-6">
                  <p className="text-sm text-gray-600 mb-4">
                    Select which pages this partner can access in the partner portal. This controls their navigation menu and available features.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {partnerPageAccessOptions.map((page) => {
                      const currentAccess = getPartnerPageAccess(selectedPartnerForPermissions.partnerId);
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
                                id={`partner-page-${page.id}-${selectedPartnerForPermissions.partnerId}`}
                                checked={isChecked}
                                onChange={(e) => handlePartnerPageAccessChange(selectedPartnerForPermissions.partnerId, page.id, e.target.checked)}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                              />
                            </div>
                            <div className="flex-1">
                              <label 
                                htmlFor={`partner-page-${page.id}-${selectedPartnerForPermissions.partnerId}`}
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
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-600">
                          Portal Access: <span className={`font-semibold ${selectedPartnerForPermissions.portalAccess ? 'text-green-600' : 'text-red-600'}`}>
                            {selectedPartnerForPermissions.portalAccess ? 'Enabled' : 'Disabled'}
                          </span>
                        </p>
                        <p className="text-xs text-gray-500">
                          Username: <span className="font-mono">{selectedPartnerForPermissions.username || 'Not set'}</span>
                        </p>
                      </div>
                      <button
                        onClick={handleSavePartnerPermissions}
                        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-200 flex items-center gap-2 transition-all"
                      >
                        <Check size={18} /> Save Permissions
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Current Permissions Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedPartnerForPermissions.permissions && Object.entries(selectedPartnerForPermissions.permissions).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {key === 'viewLeads' && 'View Leads'}
                          {key === 'addCustomers' && 'Add Customers'}
                          {key === 'viewReports' && 'View Reports'}
                          {key === 'accessPortal' && 'Portal Access'}
                          {key === 'manageSubAgents' && 'Manage Sub-Agents'}
                        </p>
                        <p className="text-xs text-gray-500">
                          {value ? 'Allowed' : 'Not Allowed'}
                        </p>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${value ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    </div>
                  ))}
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
          <p className="text-gray-500 mt-1">Manage partners, commissions, targets, and agreements.</p>
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
                        <div className="md:col-span-3 pb-2 border-b border-gray-100 mb-2">
                            <h3 className="font-bold text-gray-800 flex items-center gap-2">
                                <Building size={18} className="text-blue-500"/> Basic Information
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
                            <select 
                                name="partnerType" 
                                value={formData.partnerType} 
                                onChange={handleChange}
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
                            >
                                <option>Individual</option>
                                <option>Company</option>
                                <option>Institution</option>
                                <option>Corporate</option>
                                <option>Agency</option>
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
                                <User size={18} className="text-blue-500"/> Contact Details
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
                                <Briefcase size={18} className="text-blue-500"/> Business Details
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

                {currentStep === 3 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in slide-in-from-right-4 duration-300">
                        <div>
                            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <DollarSign size={18} className="text-blue-500"/> Financial Details
                            </h3>
                            <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                                <div className="mb-4">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Commission Type</label>
                                    <select 
                                        name="commissionType" 
                                        value={formData.commissionType} 
                                        onChange={handleChange}
                                        className="w-full p-3 bg-white border border-green-200 rounded-lg"
                                    >
                                        <option value="Percentage">Percentage</option>
                                        <option value="Fixed">Fixed Amount</option>
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
                                    <select 
                                        name="paymentCycle" 
                                        value={formData.paymentCycle} 
                                        onChange={handleChange}
                                        className="w-full p-3 bg-white border border-green-200 rounded-lg"
                                    >
                                        <option value="Monthly">Monthly</option>
                                        <option value="Quarterly">Quarterly</option>
                                        <option value="Per Transaction">Per Transaction</option>
                                        <option value="Weekly">Weekly</option>
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
                                    <Target size={18} className="text-blue-500"/> Targets
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
                                <Landmark size={18} className="text-blue-500"/> Banking Details
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
                                    <FileText size={18} className="text-blue-500"/> KYC Details
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

                {currentStep === 4 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in slide-in-from-right-4 duration-300">
                        <div>
                            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <FileText size={18} className="text-blue-500"/> Documents
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
                                <ShieldCheck size={18} className="text-blue-500"/> Status & Access
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
                                
                                {formData.portalAccess && (
                                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                                        <label className="text-xs font-bold text-gray-500 uppercase block mb-3">Login Credentials</label>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="text-sm font-semibold text-gray-700 block mb-2">Username</label>
                                                <input 
                                                    name="username" 
                                                    value={formData.username} 
                                                    onChange={handleChange}
                                                    className="w-full p-3 bg-white border border-blue-200 rounded-lg" 
                                                    placeholder="Create username" 
                                                />
                                            </div>
                                            
                                            <div>
                                                <label className="text-sm font-semibold text-gray-700 block mb-2">Password</label>
                                                <input 
                                                    name="password" 
                                                    type="password"
                                                    value={formData.password} 
                                                    onChange={handleChange}
                                                    className="w-full p-3 bg-white border border-blue-200 rounded-lg" 
                                                    placeholder="••••••••" 
                                                />
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
                                )}
                                
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
                            {isEditing ? <Check size={18} /> : <Check size={18} />} {isEditing ? "Update Partner" : "Submit Partner"}
                        </button>
                    )}
                </div>
            </form>
        </div>
      )}

      {/* --- VIEW: PARTNER LIST --- */}
      {view === 'list' && (
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
                        <Download size={16} /> Export``
                    </button>
                </div>
            </div>

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
                        {filteredPartners.map((partner) => {
                            const partnerTasks = getPartnerTasks(partner.partnerId);
                            const pendingTasks = partnerTasks.filter(p => p.status === 'Pending' || p.status === 'In Progress').length;
                            
                            return (
                            <tr key={partner.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-blue-600 text-sm font-medium">#{partner.partnerId}</td>
                                <td className="px-6 py-4 font-medium text-gray-800 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                                        {partner.companyName.charAt(0)}
                                    </div>
                                    <div>
                                        <div>{partner.companyName}</div>
                                        <div className="text-xs text-gray-500">{partner.email}</div>
                                        {pendingTasks > 0 && (
                                            <div className="flex items-center gap-1 text-xs text-orange-600 mt-1">
                                                <AlertCircle size={10} />
                                                <span>{pendingTasks} pending task(s)</span>
                                            </div>
                                        )}
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
                                                    <button
                                                        onClick={() => handlePermissionsClick(partner)}
                                                        className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-purple-50 text-purple-600 flex items-center gap-2 transition-colors"
                                                    >
                                                        <ShieldCheck size={14} />
                                                        Permissions
                                                    </button>

                                                    <button
                                                        onClick={() => handleTaskClick(partner)}
                                                        className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-blue-50 text-blue-600 flex items-center gap-2 transition-colors"
                                                    >
                                                        <FileCheck size={14} />
                                                        Assign Task
                                                    </button>

                                                    <button onClick={() => handleView(partner)} className="text-blue-600 hover:bg-blue-50 rounded w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors">
                                                        <Eye size={16} />
                                                        View Partner
                                                    </button>

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
                        )})}
                    </tbody>
                </table>
                {filteredPartners.length === 0 && (
                    <div className="text-center py-10 text-gray-500">
                        {searchQuery || filterStatus !== 'All' || filterType !== 'All' ? "No matching partners found." : "No partners found. Click \"Add New Partner\" to start."}
                    </div>
                )}
            </div>
        </div>
      )}
    </div>
  );
}