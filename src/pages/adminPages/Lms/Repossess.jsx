import React, { useState, useMemo, useEffect } from "react";
import {
  Search, CheckCircle2,
  Clock, Truck, Package, Wallet, Plus, MoreVertical
} from "lucide-react";
import ExportButton from "../../../components/admin/AdminButtons/ExportButton";
import ActionMenu from "../../../components/admin/AdminButtons/ActionMenu";
import Pagination from "../../../components/admin/common/Pagination";

export default function Repossess() {
  const initialRepossessItems = [
    { id: "RP-001", customer: "Rahul Sharma", asset: "Honda Shine", loanId: "LN-8821", reason: "EMI Default", date: "Feb 10, 2025", status: "Repossessed", value: 30000 },
    { id: "RP-002", customer: "Sohail Ahmed", asset: "iPhone 13 Pro", loanId: "LN-9923", reason: "Skipped", date: "Feb 12, 2025", status: "Pending Pickup", value: 65000 },
    { id: "RP-003", customer: "Anjali Verma", asset: "Honda Activa", loanId: "LN-1102", reason: "Bounce", date: "Feb 14, 2025", status: "In Recovery", value: 40000 },
    { id: "RP-004", customer: "Priya Singh", asset: "Dell XPS", loanId: "LN-4451", reason: "Default", date: "Feb 18, 2025", status: "Repossessed", value: 80000 },
    { id: "RP-005", customer: "Manish Kulkarni", asset: "Tata Nano", loanId: "LN-3321", reason: "Invalid", date: "Feb 20, 2025", status: "Pending Pickup", value: 150000 },
    { id: "RP-006", customer: "Amit Kumar", asset: "MacBook Air", loanId: "LN-7721", reason: "Default", date: "Feb 22, 2025", status: "Repossessed", value: 90000 },
    { id: "RP-007", customer: "Ravi Verma", asset: "Samsung TV", loanId: "LN-1122", reason: "EMI Default", date: "Feb 25, 2025", status: "In Recovery", value: 55000 },
    { id: "RP-008", customer: "Meera Singh", asset: "Bajaj Pulsar", loanId: "LN-3344", reason: "Skipped", date: "Feb 28, 2025", status: "Pending Pickup", value: 95000 },
    { id: "RP-009", customer: "Karan Malhotra", asset: "LG Refrigerator", loanId: "LN-5566", reason: "Default", date: "Mar 01, 2025", status: "Repossessed", value: 75000 },
    { id: "RP-010", customer: "Pooja Reddy", asset: "Maruti Swift", loanId: "LN-7788", reason: "Invalid", date: "Mar 03, 2025", status: "In Recovery", value: 350000 },
    { id: "RP-011", customer: "Vikram Joshi", asset: "iPhone 14", loanId: "LN-9900", reason: "EMI Default", date: "Mar 05, 2025", status: "Repossessed", value: 80000 },
    { id: "RP-012", customer: "Anjali Desai", asset: "HP Laptop", loanId: "LN-2233", reason: "Bounce", date: "Mar 08, 2025", status: "Pending Pickup", value: 65000 },
  ];

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Search badalne par Page 1 par reset karein
  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  // --- Helpers ---
  const getInitials = (name) => name.split(" ").map((n) => n[0]).join("").substring(0, 2);

  const getStatusColor = (status) => {
    switch (status) {
      case "Repossessed": return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "Pending Pickup": return "bg-amber-50 text-amber-700 border-amber-100";
      case "In Recovery": return "bg-blue-50 text-blue-700 border-blue-100";
      default: return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Repossessed": return <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />;
      case "Pending Pickup": return <Clock className="w-3.5 h-3.5 mr-1.5" />;
      case "In Recovery": return <Truck className="w-3.5 h-3.5 mr-1.5" />;
      default: return null;
    }
  };

  // --- Logic: Filtering & Pagination ---
  const filteredData = useMemo(() => {
    return initialRepossessItems.filter((item) => {
      const matchesStatus = statusFilter === "All" || item.status === statusFilter;
      const s = search.toLowerCase();
      return matchesStatus && (
        item.customer.toLowerCase().includes(s) || 
        item.asset.toLowerCase().includes(s) ||
        item.loanId.toLowerCase().includes(s)
      );
    });
  }, [search, statusFilter]);

  // Pagination calculations (Loan Entry page ki tarah)
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

  // Export function
  const handleExport = () => {
    const headers = ["ID", "Customer", "Asset", "Loan ID", "Reason", "Date", "Status", "Value"];
    const rows = filteredData.map(item => [
      item.id,
      item.customer,
      item.asset,
      item.loanId,
      item.reason,
      item.date,
      item.status,
      `₹${item.value.toLocaleString()}`
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "repossess-management.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6 lg:p-10">

      {/* Header Section - Loan Entry page ki tarah */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Repossession Management</h1>
          <p className="text-gray-500 mt-1">Track and manage asset repossessions.</p>
        </div>
        <div className="flex gap-3">
          <ExportButton
            label="Export"
            onClick={handleExport}
          />
          <button className="bg-blue-600 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Plus size={18} />
            New Request
          </button>
        </div>
      </div>

      {/* Main Content Area - Loan Entry page ki tarah */}
      <div className="bg-white shadow-sm rounded-2xl border border-gray-200 h-[520px] relative">
        <div className="p-6">
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Repossession Cases</h2>
              <p className="text-sm text-gray-500">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredData.length)} of {filteredData.length} cases
              </p>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search cases..." 
                  className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <select 
                className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Repossessed">Repossessed</option>
                <option value="Pending Pickup">Pending Pickup</option>
                <option value="In Recovery">In Recovery</option>
              </select>
            </div>
          </div>

          <div className="h-[340px] overflow-y-auto overflow-x-auto rounded-xl border border-gray-100">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b text-left">
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Asset Details</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Loan ID</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {currentItems.length > 0 ? currentItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="p-4">
                      <div className="font-semibold text-gray-800">{item.asset}</div>
                      <div className="text-sm text-gray-500">Value: ₹{item.value.toLocaleString()}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-sm uppercase">
                          {getInitials(item.customer)}
                        </div>
                        <span className="font-medium text-gray-800">{item.customer}</span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-600 font-mono text-sm">{item.loanId}</td>
                    <td className="p-4 text-gray-500 text-sm">{item.date}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(item.status)}`}>
                        {getStatusIcon(item.status)}
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <ActionMenu 
                        items={[
                          { 
                            label: "View Details", 
                            onClick: () => console.log("View", item.id), 
                            icon: Package 
                          },
                          { 
                            label: "Update Info", 
                            onClick: () => console.log("Edit", item.id) 
                          },
                          { 
                            label: "Mark as Repossessed", 
                            onClick: () => console.log("Mark as Repossessed", item.id),
                            icon: CheckCircle2 
                          },
                          { 
                            label: "Cancel Repossession", 
                            onClick: () => console.log("Cancel", item.id),
                            danger: true 
                          }
                        ]}
                      />
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="6" className="text-center py-10 text-gray-400">
                      No cases found
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
                Showing {startIndex + 1}–{Math.min(endIndex, filteredData.length)} of {filteredData.length}
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
    </div>
  );
}