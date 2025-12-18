import React, { useState } from "react";
import {
  Users, FileText, Settings, ShieldCheck, Banknote, PieChart,
  ChevronLeft, ChevronRight, Menu, X, Briefcase,
  Calculator, Sliders, FilePlus2, ChevronDown, UserPlus, Handshake,
  Plus, ArrowRight, List
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function EmployeeSidebar() {
  const [expanded, setExpanded] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  
  // State for Level 1 Menu (like LMS, Configuration, Reports)
  const [openMenu, setOpenMenu] = useState(null); 
  
  // State for Level 2 Menu (like Repayment inside LMS)
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const location = useLocation();

  // Handle Level 1 Click (LMS, Configuration, Reports etc.)
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
            { name: "Loan Entry", path: "/admin/loanEntry"},
            
            // --- REPAYMENT (Dropdown) ---
            { 
              name: "Repayment", 
              subItems: [
                { name: "NACH Registration", path: "/admin/nach" },
                { name: "PDC Receipt", path: "/admin/PdcReceipts" },
              ]
            },
            
            { name: "Customer", path: "/admin/customer"},
            { name: "Disbursement", path: "/admin/disbursement"},
            { name: "Schedule", path: "/admin/schedule"},
            { name: "Loan Closer", path: "/admin/loan-closer"},
            { name: "Task", path: "/admin/task" },
            { name: "Waiver", path: "/admin/waiver" },
            { name: "Repossess", path: "/admin/repossess" },
          ]
        },
        
        { name: "Loan Requests", icon: <Banknote size={20} />, path: "/admin/loan-requests" },
        { name: "Borrowers", icon: <Users size={20} />, path: "/admin/borrowers" },
      ]
    },
    {
      category: "Finance",
      items: [
        {
          name: "Accounting",
          icon: <Calculator size={20} />,
          subItems: [
            { name: "Account Group Masters", path: "/admin/accounting/account-group-masters" },
            { name: "Transaction Books", path: "/admin/accounting/transaction-books" },
            { name: "Profit And Loss Balances", path: "/admin/accounting/profit-loss-balances" },
            { name: "Vouchers", path: "/admin/accounting/vouchers" },
            { name: "GST Detail", path: "/admin/accounting/gst" },
            { name: "Schedule Transaction", path: "/admin/accounting/schedule-transaction" },
            { name: "Topup Refund", path: "/admin/accounting/topup-refund" },
            { name: "Balance Report", path: "/admin/accounting/balance-report" },
            { name: "Reconcile Bank Balance", path: "/admin/accounting/reconcile" },
            { name: "IMD Authorization", path: "/admin/accounting/imd-authorization" },
            { name: "Reciept Entry", path: "/admin/accounting/reciept-entry" },
            { name: "Trial Balance", path: "/admin/accounting/trial-balance" },
          ] 
        },
        
        // --- REPORTS SECTION (Updated with List) ---
        { 
          name: "Reports", 
          icon: <FileText size={20} />, 
          subItems: [
           { name: "DUE List", path: "/admin/due-list"},
            
            // --- BUSINESS REPORTS (Dropdown) ---
            { 
              name: "Business Reports"
              ,
              subItems: [
                { name: "Disburs & Collection", path: "/admin/reports/disburs-collection" },
                { name: "Customer And Booking List", path: "/admin/reports/customer-and-booking-list" },
                { name: "Sales Target/Achievement", path: "/admin/reports/sales-target-and-achievement" },
              ]
            },
            { name: "NPA Reports", path: "/admin/reports/npa-reports" },
            { name: "CRC Report", path: "/admin/reports/crc-report" },
          ]
        },
      ]
    },
    {
      category: "Admin Control",
      items: [
        // --- CONFIGURATION ---
        { 
          name: "Configuration", 
          icon: <Sliders size={20} />, 
          subItems: [
            { name: "Employee Add", path: "/admin/configuration/employee" },
            { name: "Partner Add", path: "/admin/configuration/partner" },
            { name: "Branch Management", path: "/admin/configuration/BranchManagement" },
            { name: "Loan Swap", path: "/admin/configuration/loan-swap" },
            { name: "Loan Product", path: "/admin/configuration/loan-product" },
            { name: "Location", path: "/admin/configuration/location" },
            { name: "masters setup", path: "/admin/configuration/masters-setup" },
            { name: "Kyc Verification", path: "/admin/configuration/kyc-verification" },
            { name: "Vehicle Masters", path: "/admin/configuration/vehicle-masters" },
            { name: "Consumer Durable", path: "/admin/configuration/consumer-durable" },
          ]
        },
        //{ name: "Admin Roles", icon: <ShieldCheck size={20} />, path: "/admin/admin-roles" },

        {
          name: "System Settings",
          icon: <Settings size={20} />, 
          subItems: [
            { name: "Company Details", path: "/admin/system-setting/company-details" },
            { name: "Loan Configuration", path: "/admin/system-setting/loan-configuration" },
            { name: "Security Settings", path: "/admin/system-setting/security-settings" },
            { name: "Payment Settings", path: "/admin/system-setting/payment-settings" },
          ]
        },
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
                  
                  // Level 1 Logic
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

                      {/* LEVEL 2 LIST (Inside Reports, LMS, Configuration) */}
                      {hasSubMenu && isMenuOpen && expanded && (
                        <div className="mt-1 ml-4 pl-4 border-l border-gray-700 space-y-1">
                          {item.subItems.map((subItem) => {
                             
                             // Check for Level 2 nesting
                             const hasDeepMenu = subItem.subItems && subItem.subItems.length > 0;
                             const isDeepOpen = openSubMenu === subItem.name;
                             const isSubActive = !hasDeepMenu && location.pathname === subItem.path;

                             return (
                               <div key={subItem.name}>
                                 {hasDeepMenu ? (
                                    // BUTTON (Dropdown Trigger)
                                    <button
                                      onClick={(e) => handleSubMenuClick(subItem.name, e)}
                                      className={`
                                        w-full flex items-center justify-between px-4 py-2 text-sm rounded-lg transition-colors
                                        ${isDeepOpen ? "text-white bg-gray-800" : "text-gray-500 hover:text-gray-300 hover:bg-gray-800/50"}
                                      `}
                                    >
                                       <div className="flex items-center gap-2">
                                         {subItem.icon && <span className="text-current opacity-70">{subItem.icon}</span>}
                                         <span>{subItem.name}</span>
                                       </div>
                                       <ChevronDown 
                                          size={14} 
                                          className={`transition-transform duration-200 ${isDeepOpen ? "rotate-180" : ""}`} 
                                       />
                                    </button>
                                 ) : (
                                    // NORMAL LINK (With Optional Icon Support)
                                    <Link
                                      to={subItem.path}
                                      onClick={() => setMobileOpen(false)}
                                      className={`
                                        flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-colors
                                        ${isSubActive ? "text-white bg-blue-600/20" : "text-gray-500 hover:text-gray-300 hover:bg-gray-800/50"}
                                      `}
                                    >
                                      {/* Render Icon if present (e.g. for Reports/Configuration) */}
                                      {subItem.icon && <span className="text-current opacity-70">{subItem.icon}</span>}
                                      {subItem.name}
                                    </Link>
                                 )}

                                 {/* LEVEL 3 LIST */}
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