import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  Filter,
  Download,
  Calendar,
  ChevronDown,
  Printer,
  FileText,
  Plus,
  RefreshCw,
  Building,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  IndianRupee,
} from "lucide-react";
import Button from "../../../components/admin/common/Button";
import StatusCard from "../../../components/admin/common/StatusCard";
import ExportButton from "../../../components/admin/AdminButtons/ExportButton";
import TransactionBooksForm from "../../../components/admin/AdminForm/TransactionBooksForm";
import Pagination from "../../../components/admin/common/Pagination";

const TransactionBooks = () => {
  const [activeBook, setActiveBook] = useState("cash");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState("today");
  const [branch, setBranch] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // -------- PAGINATION STATE --------
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Loan Entry page की तरह

  // Sample data for Cash Book
  const cashBookData = [
    {
      id: 1,
      date: "15 Mar 2024",
      voucherNo: "CB-001",
      particulars: "Opening Balance",
      debit: 15000,
      credit: 0,
      balance: 15000,
      type: "opening",
    },
    {
      id: 2,
      date: "16 Mar 2024",
      voucherNo: "CB-002",
      particulars: "Cash Sales",
      debit: 25000,
      credit: 0,
      balance: 40000,
      type: "receipt",
    },
    {
      id: 3,
      date: "16 Mar 2024",
      voucherNo: "CB-003",
      particulars: "Office Expenses",
      debit: 0,
      credit: 5000,
      balance: 35000,
      type: "payment",
    },
    {
      id: 4,
      date: "17 Mar 2024",
      voucherNo: "CB-004",
      particulars: "Customer Payment",
      debit: 15000,
      credit: 0,
      balance: 50000,
      type: "receipt",
    },
    {
      id: 5,
      date: "17 Mar 2024",
      voucherNo: "CB-005",
      particulars: "Salary Payment",
      debit: 0,
      credit: 20000,
      balance: 30000,
      type: "payment",
    },
    {
      id: 6,
      date: "18 Mar 2024",
      voucherNo: "CB-006",
      particulars: "Service Revenue",
      debit: 18000,
      credit: 0,
      balance: 48000,
      type: "receipt",
    },
    {
      id: 7,
      date: "18 Mar 2024",
      voucherNo: "CB-007",
      particulars: "Rent Payment",
      debit: 0,
      credit: 15000,
      balance: 33000,
      type: "payment",
    },
    {
      id: 8,
      date: "19 Mar 2024",
      voucherNo: "CB-008",
      particulars: "Consultation Fees",
      debit: 12000,
      credit: 0,
      balance: 45000,
      type: "receipt",
    },
  ];

  // Sample data for Bank Book
  const bankBookData = [
    {
      id: 1,
      date: "15 Mar 2024",
      chequeNo: "456789",
      voucherNo: "BB-001",
      particulars: "Opening Balance - SBI A/C",
      debit: 50000,
      credit: 0,
      balance: 50000,
      bank: "SBI",
      status: "cleared",
    },
    {
      id: 2,
      date: "16 Mar 2024",
      chequeNo: "456790",
      voucherNo: "BB-002",
      particulars: "Loan Disbursement - HDFC",
      debit: 100000,
      credit: 0,
      balance: 150000,
      bank: "HDFC",
      status: "cleared",
    },
    {
      id: 3,
      date: "17 Mar 2024",
      chequeNo: "456791",
      voucherNo: "BB-003",
      particulars: "Supplier Payment",
      debit: 0,
      credit: 25000,
      balance: 125000,
      bank: "SBI",
      status: "pending",
    },
    {
      id: 4,
      date: "18 Mar 2024",
      chequeNo: "456792",
      voucherNo: "BB-004",
      particulars: "Interest Received",
      debit: 5000,
      credit: 0,
      balance: 130000,
      bank: "ICICI",
      status: "cleared",
    },
    {
      id: 5,
      date: "19 Mar 2024",
      chequeNo: "456793",
      voucherNo: "BB-005",
      particulars: "Office Rent",
      debit: 0,
      credit: 30000,
      balance: 100000,
      bank: "SBI",
      status: "cleared",
    },
    {
      id: 6,
      date: "20 Mar 2024",
      chequeNo: "456794",
      voucherNo: "BB-006",
      particulars: "Client Payment",
      debit: 40000,
      credit: 0,
      balance: 140000,
      bank: "HDFC",
      status: "pending",
    },
    {
      id: 7,
      date: "21 Mar 2024",
      chequeNo: "456795",
      voucherNo: "BB-007",
      particulars: "Tax Payment",
      debit: 0,
      credit: 15000,
      balance: 125000,
      bank: "ICICI",
      status: "cleared",
    },
    {
      id: 8,
      date: "22 Mar 2024",
      chequeNo: "456796",
      voucherNo: "BB-008",
      particulars: "Investment Return",
      debit: 20000,
      credit: 0,
      balance: 145000,
      bank: "SBI",
      status: "cleared",
    },
  ];

  // Sample data for Day Book
  const dayBookData = [
    {
      id: 1,
      date: "15 Mar 2024",
      voucherNo: "JV-001",
      ledger: "Cash Account",
      particulars: "Opening Balance",
      debit: 15000,
      credit: 0,
      voucherType: "Journal",
    },
    {
      id: 2,
      date: "16 Mar 2024",
      voucherNo: "PV-001",
      ledger: "Office Expenses",
      particulars: "Stationery Purchase",
      debit: 5000,
      credit: 0,
      voucherType: "Payment",
    },
    {
      id: 3,
      date: "16 Mar 2024",
      voucherNo: "RV-001",
      ledger: "Sales Account",
      particulars: "Service Revenue",
      debit: 0,
      credit: 25000,
      voucherType: "Receipt",
    },
    {
      id: 4,
      date: "17 Mar 2024",
      voucherNo: "JV-002",
      ledger: "Bank Account",
      particulars: "Bank Transfer",
      debit: 10000,
      credit: 10000,
      voucherType: "Journal",
    },
    {
      id: 5,
      date: "18 Mar 2024",
      voucherNo: "CV-001",
      voucherNo: "CV-001",
      ledger: "Customer Payment",
      particulars: "Received from ABC Corp",
      debit: 0,
      credit: 30000,
      voucherType: "Contra",
    },
    {
      id: 6,
      date: "19 Mar 2024",
      voucherNo: "PV-002",
      ledger: "Salary Account",
      particulars: "March Salary",
      debit: 45000,
      credit: 0,
      voucherType: "Payment",
    },
    {
      id: 7,
      date: "20 Mar 2024",
      voucherNo: "RV-002",
      ledger: "Interest Account",
      particulars: "Interest Received",
      debit: 0,
      credit: 5000,
      voucherType: "Receipt",
    },
    {
      id: 8,
      date: "21 Mar 2024",
      voucherNo: "JV-003",
      ledger: "Tax Account",
      particulars: "Tax Adjustment",
      debit: 8000,
      credit: 8000,
      voucherType: "Journal",
    },
  ];

  // Get current book data
  const getCurrentData = () => {
    switch (activeBook) {
      case "cash":
        return cashBookData;
      case "bank":
        return bankBookData;
      case "day":
        return dayBookData;
      default:
        return [];
    }
  };

  // Filter data based on search
  const filteredData = useMemo(() => {
    const data = getCurrentData();
    if (!searchTerm.trim()) return data;
    
    return data.filter(item => 
      item.particulars.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.voucherNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.ledger && item.ledger.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.bank && item.bank.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [activeBook, searchTerm]);

  // -------- PAGINATION CALCULATIONS --------
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  // Reset to page 1 when book or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeBook, searchTerm]);

  // Calculate totals for current page data
  const calculateTotals = (data) => {
    const totalDebit = data.reduce((sum, item) => sum + item.debit, 0);
    const totalCredit = data.reduce((sum, item) => sum + item.credit, 0);
    return { totalDebit, totalCredit };
  };

  const currentTotals = calculateTotals(paginatedData);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Render book-specific columns
  const renderTableHeaders = () => {
    const commonHeaders = [
      <th
        key="date"
        className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase"
      >
        Date
      </th>,
      <th
        key="voucher"
        className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase"
      >
        Voucher No
      </th>,
      <th
        key="particulars"
        className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase"
      >
        Particulars
      </th>,
    ];

    if (activeBook === "bank") {
      return [
        ...commonHeaders,
        <th
          key="cheque"
          className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase"
        >
          Cheque No
        </th>,
        <th
          key="bank"
          className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase"
        >
          Bank
        </th>,
        <th
          key="debit"
          className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase"
        >
          Debit (₹)
        </th>,
        <th
          key="credit"
          className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase"
        >
          Credit (₹)
        </th>,
        <th
          key="balance"
          className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase"
        >
          Balance (₹)
        </th>,
        <th
          key="status"
          className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase"
        >
          Status
        </th>,
      ];
    } else if (activeBook === "day") {
      return [
        ...commonHeaders,
        <th
          key="ledger"
          className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase"
        >
          Ledger
        </th>,
        <th
          key="type"
          className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase"
        >
          Voucher Type
        </th>,
        <th
          key="debit"
          className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase"
        >
          Debit (₹)
        </th>,
        <th
          key="credit"
          className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase"
        >
          Credit (₹)
        </th>,
      ];
    } else {
      // Cash book
      return [
        ...commonHeaders,
        <th
          key="debit"
          className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase"
        >
          Debit (₹)
        </th>,
        <th
          key="credit"
          className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase"
        >
          Credit (₹)
        </th>,
        <th
          key="balance"
          className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase"
        >
          Balance (₹)
        </th>,
        <th
          key="type"
          className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase"
        >
          Type
        </th>,
      ];
    }
  };

  const renderTableRow = (item) => {
    const baseRow = [
      <td
        key="date"
        className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"
      >
        {item.date}
      </td>,
      <td
        key="voucher"
        className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"
      >
        <span className="font-medium">{item.voucherNo}</span>
      </td>,
      <td key="particulars" className="px-4 py-3 text-sm text-gray-700">
        {item.particulars}
      </td>,
    ];

    if (activeBook === "bank") {
      return [
        ...baseRow,
        <td
          key="cheque"
          className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"
        >
          {item.chequeNo}
        </td>,
        <td
          key="bank"
          className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"
        >
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {item.bank}
          </span>
        </td>,
        <td
          key="debit"
          className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900"
        >
          {item.debit > 0 ? formatCurrency(item.debit) : "-"}
        </td>,
        <td
          key="credit"
          className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900"
        >
          {item.credit > 0 ? formatCurrency(item.credit) : "-"}
        </td>,
        <td
          key="balance"
          className="px-4 py-3 whitespace-nowrap text-sm font-bold text-gray-900"
        >
          {formatCurrency(item.balance)}
        </td>,
        <td key="status" className="px-4 py-3 whitespace-nowrap text-sm">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              item.status === "cleared"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {item.status}
          </span>
        </td>,
      ];
    } else if (activeBook === "day") {
      return [
        ...baseRow,
        <td
          key="ledger"
          className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"
        >
          <span className="font-medium">{item.ledger}</span>
        </td>,
        <td key="type" className="px-4 py-3 whitespace-nowrap text-sm">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              item.voucherType === "Credit"
                ? "bg-green-100 text-green-800"
                : item.voucherType === "Debit"
                ? "bg-red-100 text-red-800"
                : item.voucherType === "Journal"
                ? "bg-purple-100 text-purple-800"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {item.voucherType}
          </span>
        </td>,
        <td
          key="debit"
          className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900"
        >
          {item.debit > 0 ? formatCurrency(item.debit) : "-"}
        </td>,
        <td
          key="credit"
          className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900"
        >
          {item.credit > 0 ? formatCurrency(item.credit) : "-"}
        </td>,
      ];
    } else {
      // Cash book
      return [
        ...baseRow,
        <td
          key="debit"
          className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900"
        >
          {item.debit > 0 ? formatCurrency(item.debit) : "-"}
        </td>,
        <td
          key="credit"
          className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900"
        >
          {item.credit > 0 ? formatCurrency(item.credit) : "-"}
        </td>,
        <td
          key="balance"
          className="px-4 py-3 whitespace-nowrap text-sm font-bold text-gray-900"
        >
          {formatCurrency(item.balance)}
        </td>,
        <td key="type" className="px-4 py-3 whitespace-nowrap text-sm">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              item.type === "receipt"
                ? "bg-green-100 text-green-800"
                : item.type === "payment"
                ? "bg-red-100 text-red-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {item.type}
          </span>
        </td>,
      ];
    }
  };

  // handle export function
  const handleExportExcel = () => {
    const data = getCurrentData();

    if (!data || data.length === 0) {
      alert("No data available to export");
      return;
    }

    let headers = [];
    let rows = [];

    if (activeBook === "cash") {
      headers = [
        "Date",
        "Voucher No",
        "Particulars",
        "Debit",
        "Credit",
        "Balance",
        "Type",
      ];

      rows = data.map(item => [
        item.date,
        item.voucherNo,
        item.particulars,
        item.debit,
        item.credit,
        item.balance,
        item.type,
      ]);
    }

    if (activeBook === "bank") {
      headers = [
        "Date",
        "Voucher No",
        "Cheque No",
        "Bank",
        "Particulars",
        "Debit",
        "Credit",
        "Balance",
        "Status",
      ];

      rows = data.map(item => [
        item.date,
        item.voucherNo,
        item.chequeNo,
        item.bank,
        item.particulars,
        item.debit,
        item.credit,
        item.balance,
        item.status,
      ]);
    }

    if (activeBook === "day") {
      headers = [
        "Date",
        "Voucher No",
        "Ledger",
        "Particulars",
        "Voucher Type",
        "Debit",
        "Credit",
      ];

      rows = data.map(item => [
        item.date,
        item.voucherNo,
        item.ledger,
        item.particulars,
        item.voucherType,
        item.debit,
        item.credit,
      ]);
    }

    // 👉 CSV content create
    const csvContent =
      [headers, ...rows]
        .map(row => row.map(value => `"${value ?? ""}"`).join(","))
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${activeBook}_book_${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6 lg:p-10">

      {/* Header Section - Loan Entry page की तरह */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Transaction Books</h1>
          <p className="text-gray-500 mt-1">Manage cash, bank, and day book transactions</p>
        </div>
        <div className="flex gap-3">
          <ExportButton
            label="Export"
            onClick={handleExportExcel}
          />
          <Button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5"
          >
            <Plus className="h-4 w-4" />
            New Transaction
          </Button>
          <TransactionBooksForm
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatusCard
          title="Cash Book Balance"
          value={formatCurrency(33000)}
          icon={IndianRupee}
          iconColor="blue"
          subtext={
            <span className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-xs text-green-600 font-medium">
                ₹18,000 incoming
              </span>
            </span>
          }
        />

        <StatusCard
          title="Bank Book Balance"
          value={formatCurrency(145000)}
          icon={Building}
          iconColor="green"
          subtext={
            <span className="flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-red-500" />
              <span className="text-xs text-red-600 font-medium">
                ₹40,000 outgoing
              </span>
            </span>
          }
        />

        <StatusCard
          title="Day Book Summary"
          value={`${filteredData.length} transactions`}
          icon={FileText}
          iconColor="orange"
          subtext={
            <div className="flex items-center">
              <span className="text-xs font-medium text-green-600">
                ₹93,000 Cr
              </span>
              <span className="mx-1 text-gray-400">|</span>
              <span className="text-xs font-medium text-red-600">
                ₹78,000 Dr
              </span>
            </div>
          }
        />
      </div>

      {/* Main Content Area - Loan Entry page की तरह */}
      <div className="bg-white shadow-sm rounded-2xl border border-gray-200 h-[520px] relative">
        <div className="p-6">
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {activeBook === "cash" ? "Cash Book" : 
                 activeBook === "bank" ? "Bank Book" : "Day Book"}
              </h2>
              <p className="text-sm text-gray-500">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredData.length)} of {filteredData.length} transactions
              </p>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* Book Selection Tabs */}
              <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
                {[
                  { id: "cash", label: "Cash", icon: IndianRupee },
                  { id: "bank", label: "Bank", icon: Building },
                  { id: "day", label: "Day", icon: FileText },
                ].map((book) => (
                  <button
                    key={book.id}
                    onClick={() => setActiveBook(book.id)}
                    className={`
                      flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all
                      ${activeBook === book.id
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                      }
                    `}
                  >
                    <book.icon className="h-4 w-4" />
                    {book.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="h-[340px] overflow-y-auto overflow-x-auto rounded-xl border border-gray-100">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b text-left">
                  {renderTableHeaders()}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedData.length > 0 ? paginatedData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                    {renderTableRow(item)}
                  </tr>
                )) : (
                  <tr>
                    <td 
                      colSpan={activeBook === "cash" ? 7 : activeBook === "bank" ? 9 : 7} 
                      className="text-center py-10 text-gray-400"
                    >
                      No transactions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION COMPONENT - Exactly Loan Entry page ki tarah */}
          <div className="absolute bottom-0 left-0 right-0 h-[64px] bg-white border-t border-gray-200 px-6">
            <div className="flex items-center justify-between h-full">
              <div className="flex items-center gap-6">
                <div className="text-sm text-gray-500">
                  Showing {startIndex + 1}–{Math.min(endIndex, filteredData.length)} of {filteredData.length}
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-sm">
                    <span className="font-medium text-green-600">
                      Total Debit: {formatCurrency(currentTotals.totalDebit)}
                    </span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-red-600">
                      Total Credit: {formatCurrency(currentTotals.totalCredit)}
                    </span>
                  </div>
                </div>
              </div>

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
    </div>
  );
};

export default TransactionBooks;