import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  Plus,
  Filter,
  Building2,
  ArrowUpDown,
  CheckCircle,
  XCircle,
  CreditCard,
  FileText,
  BarChart3,
  Edit2,
  Trash2
} from "lucide-react";
import ExportButton from "../../../components/admin/AdminButtons/ExportButton";
import Button from "../../../components/admin/common/Button";
import StatusCard from "../../../components/admin/common/StatusCard";
import AddAccountForm from "../../../components/admin/AdminForm/AddAccountForm";
import ActionMenu from "../../../components/admin/AdminButtons/ActionMenu";
import Pagination from "../../../components/admin/common/Pagination";

// Sample data with more items for pagination
const initialAccounts = [
  {
    id: 1,
    name: "BHARGAVI HOTELS AND RESORTS PRIVATE LIMITED",
    group: "Sundry Creditors (Sundry)",
    openDate: "01 Apr 2023",
    closeDate: "",
    openingBalance: "25,000.00 CR",
    loanChargeable: "Yes",
    gstEnable: "Yes",
    branch: "Global",
    status: "active",
    category: "Creditor"
  },
  {
    id: 2,
    name: "ABC MANUFACTURING LTD",
    group: "Current Liabilities",
    openDate: "15 Mar 2023",
    closeDate: "",
    openingBalance: "50,000.00 DR",
    loanChargeable: "No",
    gstEnable: "Yes",
    branch: "Mumbai",
    status: "active",
    category: "Liability"
  },
  {
    id: 3,
    name: "XYZ TRADING COMPANY",
    group: "Sundry Debtors",
    openDate: "10 Feb 2023",
    closeDate: "",
    openingBalance: "15,000.00 CR",
    loanChargeable: "Yes",
    gstEnable: "Yes",
    branch: "Delhi",
    status: "inactive",
    category: "Debtor"
  },
  {
    id: 4,
    name: "PQR SERVICES PVT LTD",
    group: "Fixed Assets",
    openDate: "05 Jan 2023",
    closeDate: "",
    openingBalance: "2,00,000.00 DR",
    loanChargeable: "No",
    gstEnable: "No",
    branch: "Bangalore",
    status: "active",
    category: "Asset"
  },
  {
    id: 5,
    name: "LMN CONSTRUCTION",
    group: "Current Assets",
    openDate: "20 Dec 2022",
    closeDate: "",
    openingBalance: "75,000.00 CR",
    loanChargeable: "Yes",
    gstEnable: "Yes",
    branch: "Global",
    status: "active",
    category: "Asset"
  },
  {
    id: 6,
    name: "DEF RETAILERS",
    group: "Current Liabilities",
    openDate: "30 Nov 2022",
    closeDate: "",
    openingBalance: "30,000.00 DR",
    loanChargeable: "No",
    gstEnable: "Yes",
    branch: "Chennai",
    status: "active",
    category: "Liability"
  },
  {
    id: 7,
    name: "GHI ELECTRONICS",
    group: "Sundry Creditors",
    openDate: "25 Oct 2022",
    closeDate: "",
    openingBalance: "45,000.00 CR",
    loanChargeable: "Yes",
    gstEnable: "No",
    branch: "Mumbai",
    status: "inactive",
    category: "Creditor"
  },
  {
    id: 8,
    name: "JKL FINANCIAL SERVICES",
    group: "Investments",
    openDate: "15 Sep 2022",
    closeDate: "",
    openingBalance: "5,00,000.00 DR",
    loanChargeable: "Yes",
    gstEnable: "Yes",
    branch: "Delhi",
    status: "active",
    category: "Asset"
  },
  {
    id: 9,
    name: "MNO FOOD PRODUCTS",
    group: "Sundry Debtors",
    openDate: "10 Aug 2022",
    closeDate: "",
    openingBalance: "22,000.00 CR",
    loanChargeable: "No",
    gstEnable: "Yes",
    branch: "Bangalore",
    status: "active",
    category: "Debtor"
  },
  {
    id: 10,
    name: "STU PHARMACEUTICALS",
    group: "Current Liabilities",
    openDate: "05 Jul 2022",
    closeDate: "",
    openingBalance: "60,000.00 DR",
    loanChargeable: "Yes",
    gstEnable: "Yes",
    branch: "Global",
    status: "active",
    category: "Liability"
  },
  {
    id: 11,
    name: "VWX TEXTILES LTD",
    group: "Fixed Assets",
    openDate: "20 Jun 2022",
    closeDate: "",
    openingBalance: "3,50,000.00 DR",
    loanChargeable: "No",
    gstEnable: "No",
    branch: "Mumbai",
    status: "active",
    category: "Asset"
  },
  {
    id: 12,
    name: "YZA CONSULTANCY",
    group: "Current Assets",
    openDate: "15 May 2022",
    closeDate: "",
    openingBalance: "85,000.00 CR",
    loanChargeable: "Yes",
    gstEnable: "Yes",
    branch: "Delhi",
    status: "inactive",
    category: "Asset"
  }
];

export default function AccountMaster() {
  const [search, setSearch] = useState("");
  const [branchFilter, setBranchFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [accounts, setAccounts] = useState(initialAccounts);
  const [sort, setSort] = useState({
    key: "",
    direction: "asc",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});

  // -------- PAGINATION STATE --------
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Loan Entry page की तरह 5 items per page

  // -------- STATS --------
  const stats = {
    totalAccounts: accounts.length,
    activeAccounts: accounts.filter(a => a.status === "active").length,
    inactiveAccounts: accounts.filter(a => a.status === "inactive").length,
    gstEnabled: accounts.filter(a => a.gstEnable === "Yes").length,
    loanChargeable: accounts.filter(a => a.loanChargeable === "Yes").length
  };

  // -------- UTIL: SORT --------
  const sortData = (data, sortConfig) => {
    if (!sortConfig.key) return data;
    const sorted = [...data].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (aVal == null || bVal == null) return 0;
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  };

  const handleSort = (key) => {
    setSort((prev) =>
      prev.key === key
        ? { key, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { key, direction: "asc" }
    );
  };

  // -------- FILTERED + SORTED DATA --------
  const filteredAccounts = useMemo(() => {
    let data = accounts.filter((a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.group.toLowerCase().includes(search.toLowerCase())
    );
    if (branchFilter !== "All") {
      data = data.filter((a) => a.branch === branchFilter);
    }
    if (categoryFilter !== "All") {
      data = data.filter((a) => a.category === categoryFilter);
    }
    return sortData(data, sort);
  }, [accounts, search, branchFilter, categoryFilter, sort]);

  // -------- PAGINATION CALCULATIONS --------
  const totalPages = Math.ceil(filteredAccounts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedAccounts = filteredAccounts.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, branchFilter, categoryFilter]);

  // -------- OPTIONS --------
  const branchOptions = useMemo(() => {
    const set = new Set();
    accounts.forEach((a) => set.add(a.branch));
    return ["All", ...Array.from(set)];
  }, [accounts]);

  const categoryOptions = useMemo(() => {
    const set = new Set();
    accounts.forEach((a) => set.add(a.category));
    return ["All", ...Array.from(set)];
  }, [accounts]);

  // -------- MODAL HELPERS --------
  const openAddModal = () => {
    setModalMode("add");
    setEditingId(null);
    setFormData({
      name: "",
      group: "",
      openDate: "",
      closeDate: "",
      openingBalance: "",
      loanChargeable: "No",
      gstEnable: "No",
      branch: "Global",
      status: "active",
      category: "Asset"
    });
    setIsModalOpen(true);
  };

  const openEditModal = (account) => {
    setModalMode("edit");
    setEditingId(account.id);
    setFormData(account);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (modalMode === "add") {
      const newItem = {
        ...formData,
        id: Date.now(),
      };
      setAccounts((prev) => [newItem, ...prev]);
    } else if (modalMode === "edit" && editingId != null) {
      setAccounts((prev) =>
        prev.map((a) => (a.id === editingId ? { ...a, ...formData } : a))
      );
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this account?")) return;
    setAccounts((prev) => prev.filter((a) => a.id !== id));
  };

  // -------- EXPORT --------
  const handleExport = () => {
    const headers = [
      "Account Name",
      "Group",
      "Open Date",
      "Close Date",
      "Opening Balance",
      "Loan Chargeable",
      "GST Enable",
      "Branch",
      "Status",
      "Category"
    ];

    const rows = filteredAccounts.map((item) => [
      item.name,
      item.group,
      item.openDate,
      item.closeDate,
      item.openingBalance,
      item.loanChargeable,
      item.gstEnable,
      item.branch,
      item.status,
      item.category
    ]);

    const csv =
      [headers.join(","), ...rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))].join(
        "\n"
      );

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "account-master.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const renderSortIcon = (active, direction) => (
    <ArrowUpDown
      size={14}
      className={`ml-1 transition-transform ${active ? "text-blue-600" : "text-gray-400"} ${direction === "desc" ? "rotate-180" : ""}`}
    />
  );

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6 lg:p-10">

      {/* Header Section - Loan Entry page की तरह */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Account Master</h1>
          <p className="text-gray-500 mt-1">Manage your chart of accounts</p>
        </div>
        <div className="flex gap-3">
          <ExportButton
            label="Export"
            onClick={handleExport}
          />
          <Button onClick={openAddModal}>
            <span>Add New Account</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatusCard
          title="Total Accounts"
          value={stats.totalAccounts}
          icon={CreditCard}
          iconColor="blue"
          subtext={
            <span className="text-green-600 font-medium flex items-center">
              <CheckCircle className="h-4 w-4 mr-1" /> {stats.activeAccounts} Active
            </span>
          }
        />

        <StatusCard
          title="Inactive Accounts"
          value={stats.inactiveAccounts}
          icon={XCircle}
          iconColor="red"
          subtext={`${((stats.inactiveAccounts / stats.totalAccounts) * 100).toFixed(1)}% of total`}
        />

        <StatusCard
          title="GST Enabled"
          value={stats.gstEnabled}
          icon={FileText}
          iconColor="green"
          subtext={`${((stats.gstEnabled / stats.totalAccounts) * 100).toFixed(1)}% of total`}
        />

        <StatusCard
          title="Loan Chargeable"
          value={stats.loanChargeable}
          icon={BarChart3}
          iconColor="orange"
          subtext="Eligible for loan transactions"
        />
      </div>

      {/* Main Content Area - Loan Entry page की तरह */}
      <div className="bg-white shadow-sm rounded-2xl border border-gray-200 h-[520px] relative">
        <div className="p-6 ">
          <div className="mb-6 flex flex-col  sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Account List</h2>
              
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search accounts..."
                  className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <select
                  value={branchFilter}
                  onChange={(e) => setBranchFilter(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white appearance-none"
                >
                  {branchOptions.map((b) => (
                    <option key={b} value={b}>
                      {b === "All" ? "All Branches" : b}
                    </option>
                  ))}
                </select>
              </div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white"
              >
                {categoryOptions.map((c) => (
                  <option key={c} value={c}>
                    {c === "All" ? "All Categories" : c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="h-[340px] overflow-y-auto overflow-x-auto rounded-xl border border-gray-100">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b text-left">
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-1">
                      Account Name
                      <button onClick={() => handleSort("name")}>
                        {renderSortIcon(sort.key === "name", sort.direction)}
                      </button>
                    </div>
                  </th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Group</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Balance</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Branch</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedAccounts.length > 0 ? paginatedAccounts.map((account) => (
                  <tr key={account.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="p-4">
                      <div>
                        <div className="font-medium text-gray-900">{account.name}</div>
                        <div className="text-sm text-gray-500 mt-1">
                          Opened: {account.openDate}
                          {account.closeDate && ` • Closed: ${account.closeDate}`}
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${account.category === 'Asset' ? 'bg-blue-100 text-blue-800' : account.category === 'Creditor' ? 'bg-orange-100 text-orange-800' : account.category === 'Debtor' ? 'bg-purple-100 text-purple-800' : account.category === 'Liability' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                            {account.category}
                          </span>
                          {account.loanChargeable === "Yes" && (
                            <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-800">
                              Loan Chargeable
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-900">{account.group}</td>
                    <td className="p-4">
                      <div className={`font-semibold ${account.openingBalance.includes('CR') ? 'text-green-600' : 'text-red-600'}`}>
                        {account.openingBalance}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${account.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {account.status === 'active' ? (
                            <>
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Active
                            </>
                          ) : (
                            <>
                              <XCircle className="h-3 w-3 mr-1" />
                              Inactive
                            </>
                          )}
                        </span>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${account.gstEnable === 'Yes' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                          GST {account.gstEnable}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">{account.branch}</span>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <ActionMenu
                        items={[
                          {
                            label: "Edit Account",
                            icon: Edit2,
                            onClick: () => openEditModal(account)
                          },
                          {
                            label: "Delete Account",
                            icon: Trash2,
                            onClick: () => handleDelete(account.id),
                            danger: true
                          }
                        ]}
                      />
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="6" className="text-center py-10 text-gray-400">
                      No accounts found
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
                Showing {startIndex + 1}–{Math.min(endIndex, filteredAccounts.length)} of {filteredAccounts.length}
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

      {/* Use the AccountFormModal component */}
      <AddAccountForm
        isOpen={isModalOpen}
        onClose={closeModal}
        modalMode={modalMode}
        formData={formData}
        onFormChange={handleFormChange}
        onSave={handleSave}
        branchOptions={branchOptions}
      />
    </div>
  );
}