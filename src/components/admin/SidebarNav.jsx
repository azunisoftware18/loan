import React, { useState } from "react";
import {
  Users, FileText, Settings, ShieldCheck, Banknote, PieChart,
  ChevronLeft, ChevronRight, Menu, X, Briefcase,
  Calculator, Sliders, FilePlus2, ChevronDown, UserPlus, Handshake
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function SidebarNav() {
  const [expanded, setExpanded] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  
  // State for Level 1 Menu (like LMS, Configuration)
  const [openMenu, setOpenMenu] = useState(null); 
  
  // State for Level 2 Menu (like Repayment inside LMS)
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const location = useLocation();

  // Handle Level 1 Click (LMS, Configuration etc.)
  const handleMenuClick = (name) => {
    if (!expanded) setExpanded(true);
    setOpenMenu(openMenu === name ? null : name);
  };

  // Handle Level 2 Click (Repayment inside LMS)
  const handleSubMenuClick = (name, e) => {
    e.stopPropagation(); // Stop bubbling to Parent
    setOpenSubMenu(openSubMenu === name ? null : name);
  };

  // --- MENU DATA STRUCTURE ---
  const menuItems = [
    {
      category: "Core",
      items: [
        { name: "Dashboard", icon: <PieChart size={20} />, path: "/admin/dashboard" },
      ]
    },
    {
      category: "Loan Ops",
      items: [
        { name: "LOS", icon: <FilePlus2 size={20} />, path: "/admin/los" },
        
        // --- LMS SECTION ---
        { 
          name: "LMS", 
          icon: <Briefcase size={20} />, 
          subItems: [
            { name: "Home", path: "/admin/lms/home"},
            { name: "Loan Statement", path: "/admin/lms/loan-statement"},
            { name: "Loan Entry", path: "/admin/loanEntry"},
            
            // --- REPAYMENT (Dropdown) ---
            { 
              name: "Repayment", 
              subItems: [
                { name: "NACH Registration", path: "/admin/lms/repayment/nach-registration" },
                { name: "NACH Repayment Process", path: "/admin/lms/repayment/nach-process" },
                { name: "PDC Repayment Process", path: "/admin/lms/repayment/pdc-process" },
                { name: "Receipt Entry", path: "/admin/lms/repayment/receipt-entry" },
                { name: "Receipt Book", path: "/admin/lms/repayment/receipt-book" },
                { name: "Receipt Book Detail", path: "/admin/lms/repayment/receipt-book-detail" },
                { name: "Receipt Import", path: "/admin/lms/repayment/receipt-import" },
                { name: "Receipt Book By Team", path: "/admin/lms/repayment/receipt-team" },
                { name: "PDC Cheque Detail", path: "/admin/lms/repayment/pdc-detail" },
                { name: "E-NACH AU Process", path: "/admin/lms/repayment/enach-process" },
              ]
            },
            
            { name: "Customer", path: "/admin/lms/customer"},
            { name: "Disbursement Detail", path: "/admin/lms/disbursement"},
            { name: "Schedule Re-Generate", path: "/admin/lms/schedule-regenerate"},
            { name: "Loan Reschedule", path: "/admin/lms/loan-reschedule"},
            { name: "Loan Closer", path: "/admin/lms/loan-closer"},
            { name: "DUE List", path: "/admin/lms/due-list"},
            { name: "Coll. Executive Assign", path: "/admin/lms/collection-assign"},
            { name: "Request & Task", path: "/admin/lms/request-task" },
            { name: "Legal", path: "/admin/lms/legal" },
            { name: "Waiver Request", path: "/admin/lms/waiver" },
            { name: "Repossess", path: "/admin/lms/repossess" },
          ]
        },
        
        { name: "Loan Requests", icon: <Banknote size={20} />, path: "/admin/loan-requests" },
        { name: "Borrowers", icon: <Users size={20} />, path: "/admin/borrowers" },
      ]
    },
    {
      category: "Finance",
      items: [
        { name: "Accounting", icon: <Calculator size={20} />, path: "/admin/accounting" },
        { name: "Reports", icon: <FileText size={20} />, path: "/admin/reports" },
      ]
    },
    {
      category: "Admin Control",
      items: [
        // --- CONFIGURATION (Updated with Sub-items) ---
        { 
          name: "Configuration", 
          icon: <Sliders size={20} />, 
          subItems: [
            { name: "Employee Add", path: "/admin/configuration/employee", icon: <UserPlus size={16} /> },
            { name: "Partner Add", path: "/admin/configuration/partner", icon: <Handshake size={16} /> },
          ]
        },
        { name: "Admin Roles", icon: <ShieldCheck size={20} />, path: "/admin/admin-roles" },
        { name: "System Settings", icon: <Settings size={20} />, path: "/admin/system-settings" },
      ]
    }
  ];

  return (
    <>
      {/* Mobile top menu button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-md"
      >
        <Menu size={22} />
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:relative z-50 h-full bg-[#0d1117] text-gray-400
          flex flex-col transition-all duration-300
          ${expanded ? "w-64" : "w-20"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >

        {/* LOGO SECTION */}
        <div className="h-16 flex items-center justify-center border-b border-gray-800 relative">
          <div className="flex items-center gap-2 text-white text-xl font-semibold">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">L</div>
            {expanded && <span>LoanAdmin</span>}
          </div>

          <button
            onClick={() => setExpanded(!expanded)}
            className="absolute -right-3 top-6 hidden lg:flex bg-blue-600 text-white p-1 rounded-full"
          >
            {expanded ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
          </button>

          <button
            onClick={() => setMobileOpen(false)}
            className="absolute right-4 top-5 text-gray-400 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* MENU LIST */}
        <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
          {menuItems.map((section, index) => (
            <div key={index} className="mb-6">

              {/* Category Label */}
              <div className="px-4 mb-2 text-xs uppercase font-semibold text-gray-500">
                {expanded ? section.category : <hr className="border-gray-700 w-10 mx-auto" />}
              </div>

              <div className="space-y-1 px-3">
                {section.items.map((item) => {
                  
                  // Level 1 Logic (LMS, Configuration, etc)
                  const hasSubMenu = item.subItems && item.subItems.length > 0;
                  const isMenuOpen = openMenu === item.name;
                  const isActive = !hasSubMenu && location.pathname === item.path;

                  return (
                    <div key={item.name}>
                      
                      {/* LEVEL 1 ITEM RENDER */}
                      {hasSubMenu ? (
                        <button
                          onClick={() => handleMenuClick(item.name)}
                          className={`
                            w-full flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer
                            ${isMenuOpen ? "bg-gray-800 text-white" : "hover:bg-gray-800 hover:text-white"}
                            ${expanded ? "" : "justify-center"}
                          `}
                        >
                           <div className={`flex items-center ${expanded ? "gap-3" : ""}`}>
                             <span className={isMenuOpen ? "text-blue-500" : ""}>{item.icon}</span>
                             {expanded && <span className="text-sm font-medium">{item.name}</span>}
                           </div>
                           
                           {expanded && (
                             <ChevronDown 
                               size={16} 
                               className={`transition-transform duration-200 ${isMenuOpen ? "rotate-180" : ""}`} 
                             />
                           )}
                        </button>
                      ) : (
                        <Link
                          to={item.path}
                          onClick={() => setMobileOpen(false)}
                          className={`
                            flex items-center p-3 rounded-xl transition-all 
                            ${expanded ? "gap-3" : "justify-center"}
                            ${isActive ? "bg-white text-gray-900 shadow" : "hover:bg-gray-800 hover:text-white"}
                          `}
                        >
                          <span className={isActive ? "text-blue-600" : ""}>{item.icon}</span>
                          {expanded && <span className="text-sm">{item.name}</span>}
                        </Link>
                      )}

                      {/* LEVEL 2 LIST (Inside LMS / Configuration) */}
                      {hasSubMenu && isMenuOpen && expanded && (
                        <div className="mt-1 ml-4 pl-4 border-l border-gray-700 space-y-1">
                          {item.subItems.map((subItem) => {
                             
                             // Check for Level 2 nesting (REPAYMENT logic)
                             const hasDeepMenu = subItem.subItems && subItem.subItems.length > 0;
                             const isDeepOpen = openSubMenu === subItem.name;
                             const isSubActive = !hasDeepMenu && location.pathname === subItem.path;

                             return (
                               <div key={subItem.name}>
                                 {hasDeepMenu ? (
                                    // REPAYMENT BUTTON (Dropdown Trigger)
                                    <button
                                      onClick={(e) => handleSubMenuClick(subItem.name, e)}
                                      className={`
                                        w-full flex items-center justify-between px-4 py-2 text-sm rounded-lg transition-colors
                                        ${isDeepOpen ? "text-white bg-gray-800" : "text-gray-500 hover:text-gray-300 hover:bg-gray-800/50"}
                                      `}
                                    >
                                       <span>{subItem.name}</span>
                                       <ChevronDown 
                                          size={14} 
                                          className={`transition-transform duration-200 ${isDeepOpen ? "rotate-180" : ""}`} 
                                       />
                                    </button>
                                 ) : (
                                    // NORMAL SUB-ITEMS (Employee Add, Partner Add, etc)
                                    <Link
                                      to={subItem.path}
                                      onClick={() => setMobileOpen(false)}
                                      className={`
                                        block px-4 py-2 text-sm rounded-lg transition-colors
                                        ${isSubActive ? "text-white bg-blue-600/20" : "text-gray-500 hover:text-gray-300 hover:bg-gray-800/50"}
                                      `}
                                    >
                                      {subItem.name}
                                    </Link>
                                 )}

                                 {/* LEVEL 3 LIST (Inside Repayment) */}
                                 {hasDeepMenu && isDeepOpen && (
                                    <div className="mt-1 ml-4 pl-4 border-l border-gray-700 space-y-1">
                                       {subItem.subItems.map((deepItem) => (
                                          <Link
                                            key={deepItem.name}
                                            to={deepItem.path}
                                            onClick={() => setMobileOpen(false)}
                                            className="block px-4 py-2 text-xs text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors"
                                          >
                                             {deepItem.name}
                                          </Link>
                                       ))}
                                    </div>
                                 )}
                               </div>
                             )
                          })}
                        </div>
                      )}

                    </div>
                  );
                })}
              </div>

            </div>
          ))}
        </div>

        {/* PROFILE SECTION */}
        <div className="p-4 border-t border-gray-800">
          <div className={`flex items-center p-2 rounded-xl bg-gray-800/40 ${expanded ? "gap-3" : "justify-center"}`}>
            <img
              src="https://i.pravatar.cc/100?img=11"
              alt="User"
              className="w-10 h-10 rounded-full border border-gray-700"
            />
            {expanded && (
              <div>
                <h4 className="text-white text-sm font-semibold">Rahul Kumar</h4>
                <p className="text-xs text-gray-400">Super Admin</p>
              </div>
            )}
          </div>
        </div>

      </aside>
    </>
  );
}