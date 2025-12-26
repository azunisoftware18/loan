import React, { useState, useMemo } from "react";
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
  const [accounts, setAccounts] = useState(initialAccounts);
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
            <Button onClick={openAddModal}>
              <span>Add New Account</span>
            </Button>
          </div>
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

      {/* Main Content */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
        {/* Search and Filters Bar - Fixed height */}
        <div className="p-6 border-b border-gray-100 flex-shrink-0">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  placeholder="Search accounts by name or group..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
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
                }}
                className="px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                {categoryOptions.map((c) => (
                  <option key={c} value={c}>
                    {c === "All" ? "All Categories" : c}
                  </option>
                ))}
              </select>

              <ExportButton onClick={handleExport} />
            </div>
          </div>
        </div>

        {/* Table Container - Scrollable */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-auto">
            <table className="w-full">
              <thead className="bg-gray-50 sticky top-0 z-10">
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
                {filteredAccounts.length === 0 ? (
                  <tr>

                  </tr>
                ) : (
                  filteredAccounts.map((account) => (
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
                        <ActionMenu
                          items={[
                            {
                              label: "Edit Account",
                              icon: <Edit2 className="h-4 w-4" />,
                              onClick: () => openEditModal(account)
                            },
                            {
                              label: "Delete Account",
                              icon: <Trash2 className="h-4 w-4" />,
                              onClick: () => handleDelete(account.id),
                              danger: true
                            }
                          ]}
                          buttonClassName="p-2 hover:bg-gray-100 rounded-lg"
                          menuClassName="w-48"
                          usePortal={true}
                          enableSearch={false}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
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