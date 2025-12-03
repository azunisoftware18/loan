import React, { useState } from "react";
import {
  Building2,
  Plus,
  Search,
  MapPin,
  Filter,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  MoreVertical
} from "lucide-react";

export default function Branch() {
  const [showAddForm, setShowAddForm] = useState(false);

  // --- Mock Data (Only Branches) ---
  const branches = [
    { id: "BR001", name: "Jaipur Head Office", code: "JP-HO", city: "Jaipur", head: "Rajesh Gupta", staff: 12, status: "Active" },
    { id: "BR002", name: "Mumbai South", code: "MUM-01", city: "Mumbai", head: "Amit Verma", staff: 8, status: "Active" },
    { id: "BR003", name: "Delhi Connaught Place", code: "DEL-CP", city: "New Delhi", head: "Suresh Raina", staff: 5, status: "Inactive" },
    { id: "BR004", name: "Bangalore Tech Park", code: "BLR-TP", city: "Bangalore", head: "Priya Singh", staff: 15, status: "Active" },
  ];

  // --- Reusable Components ---

  const StatusChip = ({ status }) => {
    const styles = {
      Active: "bg-green-100 text-green-700 border-green-200",
      Inactive: "bg-red-100 text-red-700 border-red-200",
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[status] || "bg-gray-100 text-gray-700"}`}>
        {status}
      </span>
    );
  };

  const InfoCard = ({ title, value, icon: Icon, colorClass, bgClass }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between hover:shadow-md transition-shadow">
      <div>
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{title}</p>
        <h3 className="text-2xl font-extrabold text-gray-800">{value}</h3>
      </div>
      <div className={`p-3 rounded-full ${bgClass}`}>
        <Icon className={`w-6 h-6 ${colorClass}`} />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
           <h1 className="text-3xl font-extrabold text-gray-900">Branch Master</h1>
           <p className="text-gray-500 mt-1">Manage all your company locations and branch details.</p>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="max-w-7xl mx-auto animate-in fade-in duration-500 space-y-6">
      
        {/* Branch Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard title="Total Branches" value="14" icon={Building2} colorClass="text-blue-600" bgClass="bg-blue-50" />
          <InfoCard title="Active Locations" value="12" icon={CheckCircle} colorClass="text-green-600" bgClass="bg-green-50" />
          <InfoCard title="Inactive / Closed" value="02" icon={XCircle} colorClass="text-red-600" bgClass="bg-red-50" />
        </div>

        {showAddForm ? (
          // ADD BRANCH FORM
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden animate-in slide-in-from-right">
            <div className="p-6 border-b flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-lg text-gray-800">Add New Branch</h3>
              <button onClick={() => setShowAddForm(false)} className="text-sm text-red-500 font-medium hover:underline">Cancel</button>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Branch Name</label>
                <input type="text" placeholder="e.g. Jaipur Main Branch" className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Branch Code</label>
                <input type="text" placeholder="e.g. BR-2025-001" className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">City / Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3.5 text-gray-400" size={18}/>
                  <input type="text" placeholder="City Name" className="w-full pl-10 p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Branch Manager</label>
                <input type="text" placeholder="Select Manager" className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Address</label>
                <textarea rows="2" className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
              </div>
            </div>
            <div className="p-4 bg-gray-50 border-t flex justify-end gap-3">
              <button onClick={() => setShowAddForm(false)} className="px-6 py-2 rounded-xl text-gray-600 hover:bg-gray-200">Cancel</button>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700">Save Branch</button>
            </div>
          </div>
        ) : (
          // BRANCH LIST TABLE
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="p-5 border-b flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input type="text" placeholder="Search branches..." className="w-full pl-10 pr-4 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <button className="px-4 py-2 border rounded-xl text-gray-600 hover:bg-gray-50 flex items-center gap-2 text-sm">
                  <Filter size={16} /> Filter
                </button>
                <button 
                  onClick={() => setShowAddForm(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 flex items-center gap-2 text-sm font-medium w-full md:w-auto justify-center"
                >
                  <Plus size={18} /> Add Branch
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4 font-bold border-b">Branch Name</th>
                    <th className="px-6 py-4 font-bold border-b">Code</th>
                    <th className="px-6 py-4 font-bold border-b">City</th>
                    <th className="px-6 py-4 font-bold border-b">Manager Head</th>
                    <th className="px-6 py-4 font-bold border-b">Staff Count</th>
                    <th className="px-6 py-4 font-bold border-b">Status</th>
                    <th className="px-6 py-4 font-bold border-b text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {branches.map((branch) => (
                    <tr key={branch.id} className="hover:bg-blue-50/30 transition-colors">
                      <td className="px-6 py-4 font-semibold text-gray-800 flex items-center gap-2">
                         <Building2 size={16} className="text-blue-500"/> {branch.name}
                      </td>
                      <td className="px-6 py-4 font-mono text-gray-500">{branch.code}</td>
                      <td className="px-6 py-4 text-gray-600">{branch.city}</td>
                      <td className="px-6 py-4 font-medium text-gray-700">{branch.head}</td>
                      <td className="px-6 py-4">
                          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-bold">{branch.staff} Members</span>
                      </td>
                      <td className="px-6 py-4">
                        <StatusChip status={branch.status} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit size={16}/></button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={16}/></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}