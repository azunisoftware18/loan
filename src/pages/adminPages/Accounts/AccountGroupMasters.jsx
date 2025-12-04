import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  Plus,
  Eye,
  Trash2,
  Download,
  Layers,
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
  Users,
  FileText,
  BarChart3
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
  },
  {
    id: 2,
    name: "HOTEL GRAND SAFARI AND RESTAURANT",
    group: "Sundry Creditors (Sundry)",
    openDate: "01 Apr 2023",
    closeDate: "",
    openingBalance: "15,500.00 DR",
    loanChargeable: "No",
    gstEnable: "Yes",
    branch: "Global",
    status: "active",
    category: "Creditor"
  },
  {
    id: 3,
    name: "JAIPUR HEAD OFFICE",
    group: "OFFICE EQUIPMENT (Default)",
    openDate: "30 Mar 2020",
    closeDate: "",
    openingBalance: "0.00 CR",
    loanChargeable: "No",
    gstEnable: "No",
    branch: "Branch",
    status: "active",
    category: "Asset"
  },
  {
    id: 4,
    name: "CASH ACCOUNT",
    group: "CASH IN HAND (Default)",
    openDate: "01 Jan 2023",
    closeDate: "",
    openingBalance: "1,50,000.00 CR",
    loanChargeable: "Yes",
    gstEnable: "No",
    branch: "All",
    status: "active",
    category: "Asset"
  },
  {
    id: 5,
    name: "SBI CURRENT ACCOUNT",
    group: "BANK ACCOUNTS (Default)",
    openDate: "15 Mar 2023",
    closeDate: "",
    openingBalance: "5,00,000.00 CR",
    loanChargeable: "Yes",
    gstEnable: "No",
    branch: "Main",
    status: "active",
    category: "Asset"
  }
];

const initialGroups = [
  {
    id: 1,
    name: "Assets",
    alias: "ASSETS",
    level: 0,
    parentGroup: "Primary",
    tag: "Default",
    annexure: "A",
    reporting: "Yes",
    accounts: 25,
    totalBalance: "₹ 75,00,000"
  },
  {
    id: 2,
    name: "Capital",
    alias: "CAPITAL_AC",
    level: 1,
    parentGroup: "Liability",
    tag: "Capital",
    annexure: "B",
    reporting: "Yes",
    accounts: 12,
    totalBalance: "₹ 50,00,000"
  },
  {
    id: 3,
    name: "Cash In Hand",
    alias: "CASH_IN_HA",
    level: 2,
    parentGroup: "Current Assets",
    tag: "Cash",
    annexure: "0",
    reporting: "Yes",
    accounts: 8,
    totalBalance: "₹ 15,00,000"
  },
  {
    id: 4,
    name: "Sundry Debtors",
    alias: "SUNDRY_DEB",
    level: 2,
    parentGroup: "Current Assets",
    tag: "Debtors",
    annexure: "C",
    reporting: "Yes",
    accounts: 45,
    totalBalance: "₹ 35,00,000"
  }
];

export default function AccountGroupMasters() {
  const [activeTab, setActiveTab] = useState("account");
  const [search, setSearch] = useState("");
  const [branchFilter, setBranchFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [accounts, setAccounts] = useState(initialAccounts);
  const [groups, setGroups] = useState(initialGroups);

  const [accountPage, setAccountPage] = useState(1);
  const [groupPage, setGroupPage] = useState(1);

  const [accountSort, setAccountSort] = useState({
    key: "",
    direction: "asc",
  });
  const [groupSort, setGroupSort] = useState({
    key: "",
    direction: "asc",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [modalTab, setModalTab] = useState("account");
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({});

  // -------- STATS --------
  const stats = {
    totalAccounts: accounts.length,
    activeAccounts: accounts.filter(a => a.status === "active").length,
    totalGroups: groups.length,
    gstEnabled: accounts.filter(a => a.gstEnable === "Yes").length
  };

  // -------- API INTEGRATION PLACEHOLDER --------
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Example API calls
        // const resAcc = await fetch("/api/accounts");
        // if (resAcc.ok) setAccounts(await resAcc.json());
        // const resGrp = await fetch("/api/groups");
        // if (resGrp.ok) setGroups(await resGrp.json());
      } catch (err) {
        console.error("API fetch error:", err);
      }
    };
    fetchData();
  }, []);

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

  const handleAccountSort = (key) => {
    setAccountSort((prev) =>
      prev.key === key
        ? { key, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { key, direction: "asc" }
    );
    setAccountPage(1);
  };

  const handleGroupSort = (key) => {
    setGroupSort((prev) =>
      prev.key === key
        ? { key, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { key, direction: "asc" }
    );
    setGroupPage(1);
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
    return sortData(data, accountSort);
  }, [accounts, search, branchFilter, categoryFilter, accountSort]);

  const filteredGroups = useMemo(
    () =>
      sortData(
        groups.filter((g) =>
          g.name.toLowerCase().includes(search.toLowerCase()) ||
          g.alias.toLowerCase().includes(search.toLowerCase())
        ),
        groupSort
      ),
    [groups, search, groupSort]
  );

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
    const start = (accountPage - 1) * ITEMS_PER_PAGE;
    return filteredAccounts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAccounts, accountPage]);

  const paginatedGroups = useMemo(() => {
    const start = (groupPage - 1) * ITEMS_PER_PAGE;
    return filteredGroups.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredGroups, groupPage]);

  const accountTotalPages = Math.max(1, Math.ceil(filteredAccounts.length / ITEMS_PER_PAGE));
  const groupTotalPages = Math.max(1, Math.ceil(filteredGroups.length / ITEMS_PER_PAGE));

  // -------- MODAL HELPERS --------
  const openAddModal = () => {
    const tab = activeTab;
    setModalTab(tab);
    setModalMode("add");
    setEditingId(null);
    if (tab === "account") {
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
    } else {
      setFormData({
        name: "",
        alias: "",
        level: 0,
        parentGroup: "",
        tag: "",
        annexure: "",
        reporting: "Yes",
        accounts: 0,
        totalBalance: "₹ 0"
      });
    }
    setIsModalOpen(true);
  };

  const openEditModal = (item, tab) => {
    setModalTab(tab);
    setModalMode("edit");
    setEditingId(item.id);
    setFormData(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (modalTab === "account") {
      if (modalMode === "add") {
        const newItem = {
          ...formData,
          id: Date.now(),
        };
        setAccounts((prev) => [newItem, ...prev]);
        // await fetch("/api/accounts", { method: "POST", body: JSON.stringify(newItem) })
      } else if (modalMode === "edit" && editingId != null) {
        setAccounts((prev) =>
          prev.map((a) => (a.id === editingId ? { ...a, ...formData } : a))
        );
        // await fetch(`/api/accounts/${editingId}`, { method: "PUT", body: JSON.stringify(formData) })
      }
    } else {
      if (modalMode === "add") {
        const newItem = {
          ...formData,
          id: Date.now(),
        };
        setGroups((prev) => [newItem, ...prev]);
        // await fetch("/api/groups", { method: "POST", body: JSON.stringify(newItem) })
      } else if (modalMode === "edit" && editingId != null) {
        setGroups((prev) =>
          prev.map((g) => (g.id === editingId ? { ...g, ...formData } : g))
        );
        // await fetch(`/api/groups/${editingId}`, { method: "PUT", body: JSON.stringify(formData) })
      }
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (id, tab) => {
    if (!window.confirm("Are you sure you want to delete?")) return;
    if (tab === "account") {
      setAccounts((prev) => prev.filter((a) => a.id !== id));
      // await fetch(`/api/accounts/${id}`, { method: "DELETE" })
    } else {
      setGroups((prev) => prev.filter((g) => g.id !== id));
      // await fetch(`/api/groups/${id}`, { method: "DELETE" })
    }
  };

  // -------- EXPORT --------
  const handleExport = () => {
    const isAccount = activeTab === "account";
    const dataToExport = isAccount ? filteredAccounts : filteredGroups;

    const headers = isAccount
      ? [
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
        ]
      : ["Group Name", "Alias", "Level", "Parent Group", "TAG", "Annexure", "Balance Reporting", "Accounts", "Total Balance"];

    const rows = dataToExport.map((item) =>
      isAccount
        ? [
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
          ]
        : [
            item.name,
            item.alias,
            item.level,
            item.parentGroup,
            item.tag,
            item.annexure,
            item.reporting,
            item.accounts,
            item.totalBalance
          ]
    );

    const csv =
      [headers.join(","), ...rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))].join(
        "\n"
      );

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      isAccount ? "account-master.csv" : "group-master.csv"
    );
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

  // ------- PAGINATION FOOTER -------
  const PaginationFooter = ({
    page,
    totalPages,
    totalItems,
    onPrev,
    onNext,
  }) => {
    const start = (page - 1) * ITEMS_PER_PAGE + 1;
    const end = Math.min(page * ITEMS_PER_PAGE, totalItems);
    return (
      <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t border-gray-100">
        <div className="text-sm text-gray-600 mb-3 sm:mb-0">
          Showing <span className="font-semibold">{start}-{end}</span> of <span className="font-semibold">{totalItems}</span> entries
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onPrev}
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
                  onClick={() => {
                    if (activeTab === "account") setAccountPage(pageNum);
                    else setGroupPage(pageNum);
                  }}
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
            onClick={onNext}
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
                <Layers className="h-6 w-6 text-white" />
              </div>
              <span>Account & Group Masters</span>
            </h1>
            <p className="text-gray-600 mt-2">Manage your chart of accounts and groups</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={openAddModal}
              className="inline-flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
            >
              <Plus size={18} />
              <span>Add New</span>
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
                <p className="text-sm text-gray-600">Account Groups</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalGroups}</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-xl">
                <Layers className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-3 text-sm text-blue-600 font-medium">
              <Users className="inline h-4 w-4 mr-1" />
              {initialGroups.reduce((sum, g) => sum + g.accounts, 0)} Linked Accounts
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
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {accounts.filter(a => a.loanChargeable === "Yes").length}
                </p>
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
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab("account")}
              className={`flex-1 md:flex-none px-6 py-4 text-sm font-medium border-b-2 transition-all ${
                activeTab === "account"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-2 justify-center">
                <CreditCard className="h-4 w-4" />
                Account Master
                <span className="ml-1 bg-gray-100 text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full">
                  {accounts.length}
                </span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab("group")}
              className={`flex-1 md:flex-none px-6 py-4 text-sm font-medium border-b-2 transition-all ${
                activeTab === "group"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-2 justify-center">
                <Layers className="h-4 w-4" />
                Group Master
                <span className="ml-1 bg-gray-100 text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full">
                  {groups.length}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Search and Filters Bar */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  placeholder="Search accounts or groups..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setAccountPage(1);
                    setGroupPage(1);
                  }}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {activeTab === "account" && (
                <>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <select
                      value={branchFilter}
                      onChange={(e) => {
                        setBranchFilter(e.target.value);
                        setAccountPage(1);
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
                      setAccountPage(1);
                    }}
                    className="px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  >
                    {categoryOptions.map((c) => (
                      <option key={c} value={c}>
                        {c === "All" ? "All Categories" : c}
                      </option>
                    ))}
                  </select>
                </>
              )}
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
        {activeTab === "account" ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      <div className="flex items-center gap-1">
                        Account Name
                        <button onClick={() => handleAccountSort("name")}>
                          {renderSortIcon(accountSort.key === "name", accountSort.direction)}
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
                              <span className={`text-xs font-medium px-2 py-1 rounded-full ${account.category === 'Asset' ? 'bg-blue-100 text-blue-800' : account.category === 'Creditor' ? 'bg-orange-100 text-orange-800' : 'bg-purple-100 text-purple-800'}`}>
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
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => openEditModal(account, "account")}
                              className="p-2 rounded-lg hover:bg-blue-50 text-blue-600"
                              title="Edit"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(account.id, "account")}
                              className="p-2 rounded-lg hover:bg-red-50 text-red-600"
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                            <button
                              className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
                              title="View Details"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-600">
                              <MoreVertical className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <PaginationFooter
              page={accountPage}
              totalPages={accountTotalPages}
              totalItems={filteredAccounts.length}
              onPrev={() => setAccountPage((p) => Math.max(1, p - 1))}
              onNext={() => setAccountPage((p) => Math.min(accountTotalPages, p + 1))}
            />
          </>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      <div className="flex items-center gap-1">
                        Group Name
                        <button onClick={() => handleGroupSort("name")}>
                          {renderSortIcon(groupSort.key === "name", groupSort.direction)}
                        </button>
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Details
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Accounts
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Total Balance
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedGroups.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center">
                        <div className="text-gray-500">
                          <Layers className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                          <p className="text-lg font-medium">No groups found</p>
                          <p className="text-sm mt-1">Try adjusting your search</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    paginatedGroups.map((group) => (
                      <tr key={group.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-medium text-gray-900">{group.name}</div>
                            <div className="text-sm text-gray-500 mt-1">
                              Alias: {group.alias}
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                                Level {group.level}
                              </span>
                              <span className={`text-xs font-medium px-2 py-1 rounded-full ${group.reporting === 'Yes' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {group.reporting === 'Yes' ? 'Reporting' : 'Non-Reporting'}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="text-sm">
                              <span className="text-gray-600">Parent:</span>{' '}
                              <span className="font-medium">{group.parentGroup}</span>
                            </div>
                            <div className="text-sm">
                              <span className="text-gray-600">TAG:</span>{' '}
                              <span className="font-medium">{group.tag}</span>
                            </div>
                            <div className="text-sm">
                              <span className="text-gray-600">Annexure:</span>{' '}
                              <span className="font-medium">{group.annexure || 'None'}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="text-2xl font-bold text-gray-900">{group.accounts}</div>
                            <div className="text-sm text-gray-500">accounts</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-bold text-lg text-gray-900">{group.totalBalance}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => openEditModal(group, "group")}
                              className="p-2 rounded-lg hover:bg-blue-50 text-blue-600"
                              title="Edit"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(group.id, "group")}
                              className="p-2 rounded-lg hover:bg-red-50 text-red-600"
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                            <button
                              className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
                              title="View Details"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-600">
                              <MoreVertical className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <PaginationFooter
              page={groupPage}
              totalPages={groupTotalPages}
              totalItems={filteredGroups.length}
              onPrev={() => setGroupPage((p) => Math.max(1, p - 1))}
              onNext={() => setGroupPage((p) => Math.min(groupTotalPages, p + 1))}
            />
          </>
        )}
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl border border-gray-200">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {modalMode === "add" ? "Add New" : "Edit"} {modalTab === "account" ? "Account" : "Group"}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {modalMode === "add" ? "Create a new" : "Update the"} {modalTab === "account" ? "account entry" : "group"}
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
              {modalTab === "account" ? (
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
                      <select
                        value={formData.group || ""}
                        onChange={(e) => handleFormChange("group", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select Group</option>
                        {groups.map(g => (
                          <option key={g.id} value={g.name}>{g.name}</option>
                        ))}
                      </select>
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
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Group Name *
                      </label>
                      <input
                        value={formData.name || ""}
                        onChange={(e) => handleFormChange("name", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter group name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Alias
                      </label>
                      <input
                        value={formData.alias || ""}
                        onChange={(e) => handleFormChange("alias", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Group alias"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Level
                        </label>
                        <input
                          type="number"
                          value={formData.level ?? 0}
                          onChange={(e) => handleFormChange("level", Number(e.target.value))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          min="0"
                          max="10"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Balance Reporting
                        </label>
                        <select
                          value={formData.reporting || "Yes"}
                          onChange={(e) => handleFormChange("reporting", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Parent Group
                      </label>
                      <select
                        value={formData.parentGroup || ""}
                        onChange={(e) => handleFormChange("parentGroup", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">None (Primary Group)</option>
                        {groups.map(g => (
                          <option key={g.id} value={g.name}>{g.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        TAG
                      </label>
                      <input
                        value={formData.tag || ""}
                        onChange={(e) => handleFormChange("tag", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter TAG"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Annexure
                      </label>
                      <input
                        value={formData.annexure || ""}
                        onChange={(e) => handleFormChange("annexure", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Annexure code"
                      />
                    </div>
                  </div>
                </div>
              )}
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
                {modalMode === "add" ? "Create" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}