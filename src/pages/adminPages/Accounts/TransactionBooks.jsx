import React, { useState } from "react";
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

const TransactionBooks = () => {
  const [activeBook, setActiveBook] = useState("cash"); // 'cash', 'bank', 'day'
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState("today");
  const [branch, setBranch] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

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
  ];

  // Calculate totals
  const calculateTotals = (data) => {
    const totalDebit = data.reduce((sum, item) => sum + item.debit, 0);
    const totalCredit = data.reduce((sum, item) => sum + item.credit, 0);
    return { totalDebit, totalCredit };
  };

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

  const currentData = getCurrentData();
  const currentTotals = calculateTotals(currentData);

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
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-blue-600" />
              Transaction Books
            </h1>
            <p className="text-gray-600 mt-1">
              Manage cash, bank, and day book transactions
            </p>
          </div>

          <div className="flex items-center gap-2 mt-4 md:mt-0">
            
            <Button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2
              ">
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
    value={formatCurrency(7000)}
    icon={IndianRupee}
    iconColor="blue"
    subtext={
      <span className="flex items-center gap-2">
        <TrendingUp className="h-4 w-4 text-green-500" />
        <span className="text-xs text-green-600 font-medium">
          ₹2,000 incoming
        </span>
      </span>
    }
  />

  <StatusCard
    title="Bank Book Balance"
    value={formatCurrency(54500)}
    icon={Building}
    iconColor="green"
    subtext={
      <span className="flex items-center gap-2">
        <TrendingDown className="h-4 w-4 text-red-500" />
        <span className="text-xs text-red-600 font-medium">
          ₹15,500 outgoing
        </span>
      </span>
    }
  />

  <StatusCard
    title="Day Book Summary"
    value="6 transactions"
    icon={FileText}
    iconColor="orange"
    subtext={
      <div className="flex items-center">
        <span className="text-xs font-medium text-green-600">
          ₹30,000 Cr
        </span>
        <span className="mx-1 text-gray-400">|</span>
        <span className="text-xs font-medium text-red-600">
          ₹18,000 Dr
        </span>
      </div>
    }
  />
</div>
      </div>

      {/* Book Selection Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {[
              {
                id: "cash",
                label: "Cash Book",
                icon: IndianRupee,
                count: cashBookData.length,
              },
              {
                id: "bank",
                label: "Bank Book",
                icon: Building,
                count: bankBookData.length,
              },
              {
                id: "day",
                label: "Day Book",
                icon: FileText,
                count: dayBookData.length,
              },
            ].map((book) => (
              <button
                key={book.id}
                onClick={() => setActiveBook(book.id)}
                className={`
                  flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2
                  ${
                    activeBook === book.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }
                `}
              >
                <book.icon className="h-4 w-4" />
                {book.label}
                <span className="ml-1 bg-gray-100 text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full">
                  {book.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Filters Bar */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                >
                  <option value="today">Today</option>
                  <option value="yesterday">Yesterday</option>
                  <option value="thisWeek">This Week</option>
                  <option value="thisMonth">This Month</option>
                  <option value="lastMonth">Last Month</option>
                  <option value="custom">Custom Range</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>

              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                >
                  <option value="all">All Branches</option>
                  <option value="main">Main Branch</option>
                  <option value="north">North Branch</option>
                  <option value="south">South Branch</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
                <ExportButton onClick={handleExportExcel}/>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>{renderTableHeaders()}</tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  {renderTableRow(item)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Footer */}
        <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">{currentData.length}</span>{" "}
              transactions
            </div>
            <div className="flex items-center gap-6 mt-2 md:mt-0">
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
              {activeBook !== "day" && (
                <div className="text-sm">
                  <span className="font-medium text-blue-600">
                    Closing Balance:{" "}
                    {formatCurrency(
                      currentData[currentData.length - 1]?.balance || 0
                    )}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionBooks;
