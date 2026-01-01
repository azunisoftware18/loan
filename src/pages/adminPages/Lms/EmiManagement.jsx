import React, { useState, useMemo, useEffect } from 'react';
import {
  FileText,
  Calendar,
  Clock,
  Repeat,
  AlertCircle,
  CheckCircle,
  Eye,
  Edit,
  Trash2,
  Search,
  TrendingUp,
  Wallet,
  Lock,
  Calculator
} from 'lucide-react';
import Button from '../../../components/admin/common/Button';
import ExportButton from '../../../components/admin/AdminButtons/ExportButton';
import ActionMenu from '../../../components/admin/AdminButtons/ActionMenu';
import EmiForm from '../../../components/admin/AdminForm/EmiForm';
import Pagination from '../../../components/admin/common/Pagination';

// StatusCard Component
const StatusCard = ({ title, value, subtext, icon: Icon, iconColor = "blue" }) => {
  const colorMap = {
    blue: "bg-blue-50 text-blue-600",
    red: "bg-red-50 text-red-600",
    green: "bg-green-50 text-green-600",
    orange: "bg-orange-50 text-orange-600",
    purple: "bg-purple-50 text-purple-600",
    yellow: "bg-yellow-50 text-yellow-600",
    indigo: "bg-indigo-50 text-indigo-600",
    emerald: "bg-emerald-50 text-emerald-600",
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {subtext && (
            <div className="mt-2 text-sm text-gray-500">
              {subtext}
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colorMap[iconColor]}`}>
          {Icon && <Icon className="h-6 w-6" />}
        </div>
      </div>
    </div>
  );
};

function EMIManagement() {
  // Sample EMI Plans for dropdown
  const emiPlans = [
    { id: 1, name: 'Personal Loan EMI' },
    { id: 2, name: 'Home Loan EMI' },
    { id: 3, name: 'Car Loan EMI' },
    { id: 4, name: 'Business Loan EMI' },
  ];

  // Sample EMI Vouchers data (more data for pagination)
  const [emiVouchers, setEmiVouchers] = useState([
    {
      id: 1,
      voucherNo: 'EMI-2024-001',
      customerName: 'Rahul Sharma',
      planName: 'Personal Loan EMI',
      amount: 15000,
      tenure: 24,
      startDate: '2024-01-15',
      emiTime: '10:00 AM',
      frequency: 'Monthly',
      nextPayment: '2024-02-15',
      totalPayable: 360000,
      paidAmount: 15000,
      remainingAmount: 345000,
      status: 'Active',
      interestRate: '10.5%',
      loanAmount: 320000,
    },
    {
      id: 2,
      voucherNo: 'EMI-2024-002',
      customerName: 'Priya Patel',
      planName: 'Home Loan EMI',
      amount: 42000,
      tenure: 240,
      startDate: '2024-01-16',
      emiTime: '02:30 PM',
      frequency: 'Monthly',
      nextPayment: '2024-02-16',
      totalPayable: 10080000,
      paidAmount: 42000,
      remainingAmount: 10038000,
      status: 'Active',
      interestRate: '8.75%',
      loanAmount: 8500000,
    },
    {
      id: 3,
      voucherNo: 'EMI-2024-003',
      customerName: 'Amit Kumar',
      planName: 'Car Loan EMI',
      amount: 16500,
      tenure: 60,
      startDate: '2024-01-17',
      emiTime: '11:00 AM',
      frequency: 'Monthly',
      nextPayment: '2024-02-17',
      totalPayable: 990000,
      paidAmount: 16500,
      remainingAmount: 973500,
      status: 'Pending',
      interestRate: '9.25%',
      loanAmount: 900000,
    },
    {
      id: 4,
      voucherNo: 'EMI-2024-004',
      customerName: 'Sneha Gupta',
      planName: 'Personal Loan EMI',
      amount: 22000,
      tenure: 36,
      startDate: '2024-01-18',
      emiTime: '03:00 PM',
      frequency: 'Monthly',
      nextPayment: '2024-02-18',
      totalPayable: 792000,
      paidAmount: 22000,
      remainingAmount: 770000,
      status: 'Active',
      interestRate: '11.2%',
      loanAmount: 700000,
    },
    {
      id: 5,
      voucherNo: 'EMI-2024-005',
      customerName: 'Rajesh Nair',
      planName: 'Business Loan EMI',
      amount: 35000,
      tenure: 48,
      startDate: '2024-01-19',
      emiTime: '09:00 AM',
      frequency: 'Monthly',
      nextPayment: '2024-02-19',
      totalPayable: 1680000,
      paidAmount: 35000,
      remainingAmount: 1645000,
      status: 'Active',
      interestRate: '12.5%',
      loanAmount: 1500000,
    },
    {
      id: 6,
      voucherNo: 'EMI-2024-006',
      customerName: 'Meera Singh',
      planName: 'Home Loan EMI',
      amount: 38000,
      tenure: 180,
      startDate: '2024-01-20',
      emiTime: '04:00 PM',
      frequency: 'Monthly',
      nextPayment: '2024-02-20',
      totalPayable: 6840000,
      paidAmount: 38000,
      remainingAmount: 6802000,
      status: 'Pending',
      interestRate: '8.25%',
      loanAmount: 6000000,
    },
    {
      id: 7,
      voucherNo: 'EMI-2024-007',
      customerName: 'Karan Malhotra',
      planName: 'Personal Loan EMI',
      amount: 18000,
      tenure: 30,
      startDate: '2024-01-21',
      emiTime: '01:00 PM',
      frequency: 'Monthly',
      nextPayment: '2024-02-21',
      totalPayable: 540000,
      paidAmount: 18000,
      remainingAmount: 522000,
      status: 'Active',
      interestRate: '11.0%',
      loanAmount: 480000,
    },
    {
      id: 8,
      voucherNo: 'EMI-2024-008',
      customerName: 'Pooja Reddy',
      planName: 'Car Loan EMI',
      amount: 12500,
      tenure: 48,
      startDate: '2024-01-22',
      emiTime: '11:30 AM',
      frequency: 'Monthly',
      nextPayment: '2024-02-22',
      totalPayable: 600000,
      paidAmount: 12500,
      remainingAmount: 587500,
      status: 'Active',
      interestRate: '9.5%',
      loanAmount: 550000,
    },
    {
      id: 9,
      voucherNo: 'EMI-2024-009',
      customerName: 'Vikram Joshi',
      planName: 'Business Loan EMI',
      amount: 45000,
      tenure: 60,
      startDate: '2024-01-23',
      emiTime: '10:30 AM',
      frequency: 'Monthly',
      nextPayment: '2024-02-23',
      totalPayable: 2700000,
      paidAmount: 45000,
      remainingAmount: 2655000,
      status: 'Pending',
      interestRate: '13.0%',
      loanAmount: 2400000,
    },
    {
      id: 10,
      voucherNo: 'EMI-2024-010',
      customerName: 'Anjali Desai',
      planName: 'Personal Loan EMI',
      amount: 12500,
      tenure: 18,
      startDate: '2024-01-24',
      emiTime: '03:30 PM',
      frequency: 'Monthly',
      nextPayment: '2024-02-24',
      totalPayable: 225000,
      paidAmount: 12500,
      remainingAmount: 212500,
      status: 'Active',
      interestRate: '10.8%',
      loanAmount: 200000,
    },
    {
      id: 11,
      voucherNo: 'EMI-2024-011',
      customerName: 'Suman Tiwari',
      planName: 'Home Loan EMI',
      amount: 32000,
      tenure: 120,
      startDate: '2024-01-25',
      emiTime: '12:00 PM',
      frequency: 'Monthly',
      nextPayment: '2024-02-25',
      totalPayable: 3840000,
      paidAmount: 32000,
      remainingAmount: 3808000,
      status: 'Active',
      interestRate: '7.75%',
      loanAmount: 3500000,
    },
    {
      id: 12,
      voucherNo: 'EMI-2024-012',
      customerName: 'Ravi Verma',
      planName: 'Car Loan EMI',
      amount: 14500,
      tenure: 36,
      startDate: '2024-01-26',
      emiTime: '02:00 PM',
      frequency: 'Monthly',
      nextPayment: '2024-02-26',
      totalPayable: 522000,
      paidAmount: 14500,
      remainingAmount: 507500,
      status: 'Pending',
      interestRate: '9.0%',
      loanAmount: 475000,
    }
  ]);

  // -------- PAGINATION STATE --------
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const itemsPerPage = 5;

  // -------- FILTERED DATA --------
  const filteredVouchers = useMemo(() => {
    return emiVouchers.filter((voucher) => {
      const matchesSearch = searchTerm === '' || 
        voucher.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        voucher.voucherNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        voucher.planName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'All' || voucher.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [emiVouchers, searchTerm, statusFilter]);

  // -------- PAGINATION CALCULATIONS --------
  const totalPages = Math.ceil(filteredVouchers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedVouchers = filteredVouchers.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  // Stats calculation
  const stats = {
    totalVouchers: emiVouchers.length,
    activeVouchers: emiVouchers.filter(v => v.status === 'Active').length,
    totalLoanAmount: emiVouchers.reduce((sum, v) => sum + v.loanAmount, 0),
    totalPendingAmount: emiVouchers.reduce((sum, v) => sum + v.remainingAmount, 0),
    averageEMI: emiVouchers.length > 0
      ? emiVouchers.reduce((sum, v) => sum + v.amount, 0) / emiVouchers.length
      : 0,
    totalPaidAmount: emiVouchers.reduce((sum, v) => sum + v.paidAmount, 0),
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Toggle voucher status
  const toggleVoucherStatus = (id) => {
    setEmiVouchers(emiVouchers.map(voucher =>
      voucher.id === id
        ? { ...voucher, status: voucher.status === 'Active' ? 'Pending' : 'Active' }
        : voucher
    ));
  };

  // Delete voucher
  const deleteVoucher = (id) => {
    if (window.confirm('Are you sure you want to delete this EMI voucher?')) {
      setEmiVouchers(emiVouchers.filter(voucher => voucher.id !== id));
    }
  };

  const updateVoucherStatus = (id, status) => {
    setEmiVouchers(prev =>
      prev.map(v =>
        v.id === id ? { ...v, status } : v
      )
    );
  };

  const [isOpen, setIsOpen] = useState(false);

  const [emiVoucher, setEmiVoucher] = useState({
    customerName: "",
    planName: "",
    amount: "",
    tenure: "",
    startDate: "",
    emiTime: "",
    frequency: "monthly",
    interestRate: "",
    loanAmount: ""
  });

  const handleChange = (key, value) => {
    setEmiVoucher(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    console.log("Saved EMI Voucher:", emiVoucher);
    setIsOpen(false);
  };

  // Export function
  const handleExport = () => {
    const headers = [
      "Voucher No",
      "Customer Name",
      "Plan Name",
      "Loan Amount",
      "Monthly EMI",
      "Tenure",
      "Start Date",
      "Next Payment",
      "Status",
      "Interest Rate",
      "Paid Amount",
      "Remaining Amount"
    ];

    const rows = filteredVouchers.map((v) => [
      v.voucherNo,
      v.customerName,
      v.planName,
      formatCurrency(v.loanAmount),
      formatCurrency(v.amount),
      `${v.tenure} months`,
      formatDate(v.startDate),
      formatDate(v.nextPayment),
      v.status,
      v.interestRate,
      formatCurrency(v.paidAmount),
      formatCurrency(v.remainingAmount)
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.map(value => `"${String(value).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `emi-vouchers_${new Date().toISOString().split('T')[0]}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6 lg:p-10">
      
      {/* Header Section - Loan Entry page की तरह */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Customer EMI Management</h1>
          <p className="text-gray-500 mt-1">Manage customer loan EMI schedules and repayment tracking</p>
        </div>
        <div className="flex gap-3">
          <ExportButton
            label="Export"
            onClick={handleExport}
          />
          <Button 
            onClick={() => setIsOpen(true)}
           
          >
            Generate New EMI
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatusCard
          title="Total Vouchers"
          value={stats.totalVouchers}
          icon={FileText}
          iconColor="blue"
          subtext={`${stats.activeVouchers} active`}
        />
        <StatusCard
          title="Total Loan Amount"
          value={formatCurrency(stats.totalLoanAmount)}
          icon={Wallet}
          iconColor="purple"
          subtext="Across all customers"
        />
        <StatusCard
          title="Total Receivable"
          value={formatCurrency(stats.totalPendingAmount)}
          icon={TrendingUp}
          iconColor="green"
          subtext="Remaining amount"
        />
        <StatusCard
          title="Avg EMI Amount"
          value={formatCurrency(stats.averageEMI)}
          icon={Calculator}
          iconColor="orange"
          subtext="Per customer per month"
        />
      </div>

      {/* Main Content Area - Loan Entry page की तरह */}
      <div className="bg-white shadow-sm rounded-2xl border border-gray-200 h-[520px] relative">
        <div className="p-6">
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Customer EMI Vouchers</h2>
              <p className="text-sm text-gray-500">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredVouchers.length)} of {filteredVouchers.length} vouchers
              </p>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search vouchers..."
                  className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>

          <div className="h-[340px] overflow-y-auto overflow-x-auto rounded-xl border border-gray-100">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b text-left">
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Customer & Voucher
                  </th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    EMI Schedule
                  </th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Amount Details
                  </th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedVouchers.length > 0 ? paginatedVouchers.map((voucher) => (
                  <tr key={voucher.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="p-4">
                      <div>
                        <div className="font-medium text-gray-900">{voucher.customerName}</div>
                        <div className="text-sm text-gray-500 mt-1">
                          Voucher: <span className="font-medium">{voucher.voucherNo}</span>
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          Plan: <span className="font-medium">{voucher.planName}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <div>
                            <span className="text-sm text-gray-600">Start: </span>
                            <span className="text-sm font-medium">{formatDate(voucher.startDate)}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <div>
                            <span className="text-sm text-gray-600">Time: </span>
                            <span className="text-sm font-medium">{voucher.emiTime}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Repeat className="w-4 h-4 text-gray-400" />
                          <div>
                            <span className="text-sm text-gray-600">Frequency: </span>
                            <span className="text-sm font-medium">{voucher.frequency}</span>
                          </div>
                        </div>
                        <div className="text-xs text-blue-600 font-medium">
                          Next: {formatDate(voucher.nextPayment)}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm text-gray-600">Monthly EMI: </span>
                          <span className="font-medium text-gray-900">{formatCurrency(voucher.amount)}</span>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Tenure: </span>
                          <span className="font-medium text-gray-900">{voucher.tenure} months</span>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Total Payable: </span>
                          <span className="font-medium text-gray-900">{formatCurrency(voucher.totalPayable)}</span>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Paid: </span>
                          <span className="font-medium text-green-600">{formatCurrency(voucher.paidAmount)}</span>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Remaining: </span>
                          <span className="font-medium text-orange-600">{formatCurrency(voucher.remainingAmount)}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-2">
                        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium border ${
                          voucher.status === 'Active'
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                            : 'bg-yellow-100 text-yellow-800 border-yellow-200'
                        }`}>
                          {voucher.status === 'Active' ? (
                            <CheckCircle className="w-3 h-3 mr-1" />
                          ) : (
                            <Clock className="w-3 h-3 mr-1" />
                          )}
                          {voucher.status}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <ActionMenu
                        items={[
                          {
                            label: "Edit",
                            icon: Edit,
                            onClick: () => console.log("Edit clicked", voucher),
                          },
                          {
                            label: "View",
                            icon: Eye,
                            onClick: () => console.log("View clicked", voucher),
                          },
                          {
                            label: "Mark Active",
                            icon: CheckCircle,
                            disabled: voucher.status === "Active",
                            onClick: () => updateVoucherStatus(voucher.id, "Active"),
                          },
                          {
                            label: "Mark Pending",
                            icon: AlertCircle,
                            disabled: voucher.status === "Pending",
                            onClick: () => updateVoucherStatus(voucher.id, "Pending"),
                          },
                          {
                            label: "────────────",
                            disabled: true,
                          },
                          {
                            label: "Delete",
                            icon: Trash2,
                            danger: true,
                            onClick: () => {
                              if (window.confirm("Are you sure you want to delete this voucher?")) {
                                deleteVoucher(voucher.id);
                              }
                            },
                          },
                        ]}
                      />
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="5" className="text-center py-10 text-gray-400">
                      No EMI vouchers found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION COMPONENT - Exactly Loan Entry page ki tarah */}
          <div className="absolute bottom-0 left-0 right-0 h-[64px] bg-white border-t border-gray-200 px-6">
            <div className="flex items-center justify-between h-full">
              <p className="text-sm text-gray-500">
                Showing {startIndex + 1}–{Math.min(endIndex, filteredVouchers.length)} of {filteredVouchers.length}
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
          </div>

        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 text-center text-sm text-gray-500">
        <p className="flex items-center justify-center gap-2">
          <Lock className="w-4 h-4" />
          Secure loan EMI management system for customer repayment tracking
        </p>
      </div>

      <EmiForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        mode="add"
        emiVoucher={emiVoucher}
        onEmiVoucherChange={handleChange}
        emiPlans={[]}
        calculateEmiPreview={() => "EMI will start from selected date"}
        formatCurrency={(v) => `₹${v}`}
        onSave={handleSave}
      />
    </div>
  );
}

export default EMIManagement;