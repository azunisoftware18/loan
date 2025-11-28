// src/components/admin/SidebarNav.jsx
import React, { useState } from "react";
import { 
  Users, FileText, Settings, ShieldCheck, Banknote, PieChart,
  ChevronLeft, ChevronRight, Menu, X, Briefcase,
  Calculator, Sliders, FilePlus2
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  {
    category: "Core",
    items: [
      { name: "Dashboard", icon: <PieChart size={20} />, path: "/admin/dashboard" },
    ]
  },
  {
    category: "Loan Operations",
    items: [
      { name: "LOS", icon: <FilePlus2 size={20} />, path: "/admin/los" },
      { name: "LMS", icon: <Briefcase size={20} />, path: "/admin/lms" },
      { name: "Loan Requests", icon: <Banknote size={20} />, path: "/admin/loan-requests" },
      { name: "Borrowers", icon: <Users size={20} />, path: "/admin/borrowers" },
    ]
  },
  {
    category: "Finance & Data",
    items: [
      { name: "Accounting", icon: <Calculator size={20} />, path: "/admin/accounting" },
      { name: "Reports", icon: <FileText size={20} />, path: "/admin/reports" },
    ]
  },
  {
    category: "System & Admin",
    items: [
      { name: "Configuration", icon: <Sliders size={20} />, path: "/admin/configuration" },
      { name: "Admin Roles", icon: <ShieldCheck size={20} />, path: "/admin/admin-roles" },
      { name: "System Settings", icon: <Settings size={20} />, path: "/admin/system-settings" },
    ]
  }
];

export default function SidebarNav() {
  const [expanded, setExpanded] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          bg-[#0d1117] text-gray-400 flex flex-col z-50
          transition-all duration-300 fixed lg:relative h-full
          ${expanded ? "w-64" : "w-20"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-center relative border-b border-gray-800/50">
          <div 
            className="flex items-center gap-2 font-bold text-white text-xl cursor-pointer"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">L</div>

            {expanded && <span>LoanAdmin</span>}
          </div>

          {/* Expand/Collapse */}
          <button 
            onClick={() => setExpanded(!expanded)}
            className="absolute -right-3 top-6 p-1 rounded-full bg-blue-600 hidden lg:flex"
          >
            {expanded ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
          </button>

          {/* Mobile Close */}
          <button 
            onClick={() => setMobileOpen(false)}
            className="absolute right-4 top-5 text-gray-400 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu list */}
        <div className="flex-1 overflow-y-auto py-4">
          {menuItems.map((section, i) => (
            <div key={i} className="mb-6">
              
              <div className="px-4 mb-2 text-xs font-semibold text-gray-500 uppercase">
                {expanded ? section.category : <hr className="border-gray-700 w-8 mx-auto" />}
              </div>

              <div className="space-y-1 px-3">
                {section.items.map(item => {
                  const isActive = location.pathname === item.path;

                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setMobileOpen(false)}
                      className={`
                        flex items-center w-full p-3 rounded-xl transition-all
                        ${isActive ? "bg-white text-gray-900 shadow-md" : "hover:bg-gray-800 hover:text-white"}
                        ${expanded ? "gap-3" : "justify-center"}
                      `}
                    >
                      <span className={isActive ? "text-blue-600" : ""}>{item.icon}</span>

                      {expanded && <span className="text-sm font-medium">{item.name}</span>}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Profile */}
        <div className="p-3 border-t border-gray-800/50">
          <div className={`flex items-center p-2 rounded-xl bg-gray-800/40 ${expanded ? "gap-3" : "justify-center"}`}>
            <img 
              src="https://i.pravatar.cc/150?img=11" 
              className="w-10 h-10 rounded-full border border-gray-700"
            />
            {expanded && (
              <div>
                <h4 className="text-white text-sm font-semibold">Rahul Kumar</h4>
                <p className="text-xs text-gray-500">Super Admin</p>
              </div>
            )}
          </div>
        </div>

      </aside>
    </div>
  );
}
