import React, { useState, useMemo } from "react";
import {
  Search,
  Plus,
  Eye,
  Trash2,
  Download,
  Filter,
  ChevronLeft,
  ChevronRight,
  Edit2,
  X,
  Building2,
  ArrowUpDown,
  MoreVertical,
  CheckCircle,
  XCircle,
  CreditCard,
  FileText,
  BarChart3,
  Printer,
  Copy,
  FileBarChart
} from "lucide-react";

const ITEMS_PER_PAGE = 10;

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
  }
];

export default function AccountMaster() {
  const [search, setSearch] = useState("");
  const [branchFilter, setBranchFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [actionMenuOpen, setActionMenuOpen] = useState(null);
  const [accounts, setAccounts] = useState(initialAccounts);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({
    key: "",
    direction: "asc",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});

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
    setPage(1);
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

  // -------- PAGINATION HELPERS --------
  const paginatedAccounts = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredAccounts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAccounts, page]);

  const totalPages = Math.max(1, Math.ceil(filteredAccounts.length / ITEMS_PER_PAGE));

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
    setActionMenuOpen(null);
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
    setActionMenuOpen(null);
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

  // Action Menu Component for Accounts
  const AccountActionMenu = ({ accountId }) => {
    const account = accounts.find(a => a.id === accountId);
    
    return (
      <div className="absolute right-0 top-full mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
        <div className="py-1">
          <button 
            onClick={() => {
              const account = accounts.find(a => a.id === accountId);
              openEditModal(account);
              setActionMenuOpen(null);
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
          >
            <Edit2 className="w-4 h-4" />
            Edit Account
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
            <Eye className="w-4 h-4" />
            View Details
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
            <FileBarChart className="w-4 h-4" />
            View Ledger
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
            <Printer className="w-4 h-4" />
            Print Statement
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
            <Copy className="w-4 h-4" />
            Duplicate Account
          </button>
          
          <div className="border-t border-gray-200 my-1"></div>
          
          {/* Status Change Options */}
          <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
            Change Status
          </div>
          
          {account?.status !== 'active' && (
            <button 
              onClick={() => {
                const updatedAccounts = accounts.map(a => 
                  a.id === accountId ? { ...a, status: 'active' } : a
                );
                setAccounts(updatedAccounts);
                setActionMenuOpen(null);
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-green-700 hover:bg-green-50"
            >
              <CheckCircle className="w-4 h-4" />
              Activate Account
            </button>
          )}
          
          {account?.status === 'active' && (
            <button 
              onClick={() => {
                const updatedAccounts = accounts.map(a => 
                  a.id === accountId ? { ...a, status: 'inactive' } : a
                );
                setAccounts(updatedAccounts);
                setActionMenuOpen(null);
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-700 hover:bg-red-50"
            >
              <XCircle className="w-4 h-4" />
              Deactivate Account
            </button>
          )}
          
          <div className="border-t border-gray-200 my-1"></div>
          <button 
            onClick={() => handleDelete(accountId)}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
            Delete Account
          </button>
        </div>
      </div>
    );
  };

  // ------- PAGINATION FOOTER -------
  const PaginationFooter = () => {
    const start = (page - 1) * ITEMS_PER_PAGE + 1;
    const end = Math.min(page * ITEMS_PER_PAGE, filteredAccounts.length);
    return (
      <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t border-gray-100">
        <div className="text-sm text-gray-600 mb-3 sm:mb-0">
          Showing <span className="font-semibold">{start}-{end}</span> of <span className="font-semibold">{filteredAccounts.length}</span> accounts
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            <ChevronLeft size={16} />
          </button>
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`w-8 h-8 rounded-lg text-sm font-medium ${page === pageNum ? 'bg-blue-600 text-white' : 'border border-gray-300 hover:bg-gray-50'}`}
                >
                  {pageNum}
                </button>
              );
            })}
            {totalPages > 5 && (
              <span className="px-2">...</span>
            )}
          </div>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
              <span>Account Master</span>
            </h1>
            <p className="text-gray-600 mt-2">Manage your chart of accounts</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={openAddModal}
              className="inline-flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
            >
              <Plus size={18} />
              <span>Add New Account</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Accounts</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalAccounts}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl">
                <CreditCard className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-3 text-sm text-green-600 font-medium">
              <CheckCircle className="inline h-4 w-4 mr-1" />
              {stats.activeAccounts} Active
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Inactive Accounts</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.inactiveAccounts}</p>
              </div>
              <div className="p-3 bg-red-50 rounded-xl">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <div className="mt-3 text-sm text-gray-600">
              {((stats.inactiveAccounts / stats.totalAccounts) * 100).toFixed(1)}% of total
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">GST Enabled</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.gstEnabled}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-xl">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-3 text-sm text-gray-600">
              {((stats.gstEnabled / stats.totalAccounts) * 100).toFixed(1)}% of total
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Loan Chargeable</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.loanChargeable}</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-xl">
                <BarChart3 className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <div className="mt-3 text-sm text-gray-600">
              Eligible for loan transactions
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Search and Filters Bar */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  placeholder="Search accounts by name or group..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select
                  value={branchFilter}
                  onChange={(e) => {
                    setBranchFilter(e.target.value);
                    setPage(1);
                  }}
                  className="pl-10 pr-8 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none"
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
                onChange={(e) => {
                  setCategoryFilter(e.target.value);
                  setPage(1);
                }}
                className="px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                {categoryOptions.map((c) => (
                  <option key={c} value={c}>
                    {c === "All" ? "All Categories" : c}
                  </option>
                ))}
              </select>
              <button className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50">
                <Filter className="h-4 w-4" />
                <span>More Filters</span>
              </button>
              <button
                onClick={handleExport}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl hover:from-emerald-700 hover:to-green-700 shadow-sm"
              >
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    Account Name
                    <button onClick={() => handleSort("name")}>
                      {renderSortIcon(sort.key === "name", sort.direction)}
                    </button>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Group
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Balance
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Branch
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedAccounts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="text-gray-500">
                      <CreditCard className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                      <p className="text-lg font-medium">No accounts found</p>
                      <p className="text-sm mt-1">Try adjusting your search or filters</p>
                      <button
                        onClick={openAddModal}
                        className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700"
                      >
                        <Plus size={16} />
                        Add Your First Account
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedAccounts.map((account) => (
                  <tr key={account.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
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
                    <td className="px-6 py-4">
                      <div className="text-gray-900">{account.group}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`font-semibold ${account.openingBalance.includes('CR') ? 'text-green-600' : 'text-red-600'}`}>
                        {account.openingBalance}
                      </div>
                    </td>
                    <td className="px-6 py-4">
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
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">{account.branch}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative">
                        <button
                          onClick={() => setActionMenuOpen(actionMenuOpen === account.id ? null : account.id)}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Actions"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </button>
                        {actionMenuOpen === account.id && (
                          <AccountActionMenu accountId={account.id} />
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <PaginationFooter />
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl border border-gray-200">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {modalMode === "add" ? "Add New Account" : "Edit Account"}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {modalMode === "add" ? "Create a new account entry" : "Update the account details"}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Account Name *
                    </label>
                    <input
                      value={formData.name || ""}
                      onChange={(e) => handleFormChange("name", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter account name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Group *
                    </label>
                    <input
                      value={formData.group || ""}
                      onChange={(e) => handleFormChange("group", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter group name"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Open Date
                      </label>
                      <input
                        type="date"
                        value={formData.openDate || ""}
                        onChange={(e) => handleFormChange("openDate", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        value={formData.category || "Asset"}
                        onChange={(e) => handleFormChange("category", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="Asset">Asset</option>
                        <option value="Liability">Liability</option>
                        <option value="Income">Income</option>
                        <option value="Expense">Expense</option>
                        <option value="Creditor">Creditor</option>
                        <option value="Debtor">Debtor</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Opening Balance
                    </label>
                    <input
                      value={formData.openingBalance || ""}
                      onChange={(e) => handleFormChange("openingBalance", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0.00"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Loan Chargeable
                      </label>
                      <select
                        value={formData.loanChargeable || "No"}
                        onChange={(e) => handleFormChange("loanChargeable", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        GST Enable
                      </label>
                      <select
                        value={formData.gstEnable || "No"}
                        onChange={(e) => handleFormChange("gstEnable", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Branch
                    </label>
                    <select
                      value={formData.branch || "Global"}
                      onChange={(e) => handleFormChange("branch", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {branchOptions.filter(b => b !== "All").map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      value={formData.status || "active"}
                      onChange={(e) => handleFormChange("status", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-gray-200 px-6 py-4">
              <button
                onClick={closeModal}
                className="px-5 py-2.5 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 shadow-sm"
              >
                {modalMode === "add" ? "Create Account" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}