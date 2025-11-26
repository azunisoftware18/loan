import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Settings, 
  ShieldCheck, 
  Banknote, 
  PieChart, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  Menu,
  X,            // Mobile close icon
  Briefcase,    // For LOS
  Calculator,   // For Accounting
  Sliders,      // For Configuration
  FilePlus2     // For LMS/Origination context
} from 'lucide-react';

const Sidebar = () => {
  // Sidebar open/close state (Desktop)
  const [expanded, setExpanded] = useState(true);
  // Mobile drawer state
  const [mobileOpen, setMobileOpen] = useState(false);
  // Active menu item tracking
  const [activeItem, setActiveItem] = useState("Dashboard");

  // --- UPDATED MENU STRUCTURE ---
  const menuItems = [
    {
      category: "Core",
      items: [
        { name: "Dashboard", icon: <LayoutDashboard size={20} /> },
        { name: "Analytics", icon: <PieChart size={20} /> },
      ]
    },
    {
      category: "Loan Operations",
      items: [
        { name: "LOS", icon: <FilePlus2 size={20} /> },    // Loan Origination System
        { name: "LMS", icon: <Briefcase size={20} /> },    // Loan Management System
        { name: "Loan Requests", icon: <Banknote size={20} /> },
        { name: "Borrowers", icon: <Users size={20} /> },
      ]
    },
    {
      category: "Finance & Data",
      items: [
        { name: "Accounting", icon: <Calculator size={20} /> }, // Accounting
        { name: "Reports", icon: <FileText size={20} /> },      // Reports
      ]
    },
    {
      category: "System & Admin",
      items: [
        { name: "Configuration", icon: <Sliders size={20} /> }, // Configuration
        { name: "Admin Roles", icon: <ShieldCheck size={20} /> },
        { name: "System Settings", icon: <Settings size={20} /> },
      ]
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      
      {/* 1. MOBILE OVERLAY (Backdrop) */}
      {/* Ye sirf mobile par dikhega jab menu open hoga */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* 2. SIDEBAR COMPONENT */}
      <aside 
        className={`
            bg-[#0d1117] text-gray-400 flex flex-col z-50
            transition-all duration-300 ease-in-out
            fixed lg:relative h-full
            ${expanded ? "w-64" : "w-20"} 
            ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo Section */}
        <div className="h-16 flex items-center justify-center relative border-b border-gray-800/50">
           <div className="flex items-center gap-2 font-bold text-white text-xl">
             <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">L</div>
             <span className={`overflow-hidden transition-all duration-300 ${expanded ? "w-auto opacity-100" : "w-0 opacity-0 hidden"}`}>
               LoanAdmin
             </span>
           </div>

           {/* Desktop Toggle Button (Chevron) */}
           <button 
            onClick={() => setExpanded(!expanded)}
            className="absolute -right-3 top-6 bg-blue-600 text-white p-1 rounded-full hidden lg:flex hover:bg-blue-500 shadow-lg border-2 border-[#0d1117]"
           >
             {expanded ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
           </button>

           {/* Mobile Close Button (X) */}
           <button 
            onClick={() => setMobileOpen(false)}
            className="absolute right-4 top-5 text-gray-400 hover:text-white lg:hidden"
           >
             <X size={20} />
           </button>
        </div>

        {/* Scrollable Menu Items */}
        <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
          {menuItems.map((section, idx) => (
            <div key={idx} className="mb-6">
              
              {/* Category Label */}
              <div className={`px-4 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 transition-all ${expanded ? "block" : "text-center"}`}>
                {expanded ? section.category : <hr className="border-gray-700 w-8 mx-auto"/>}
              </div>

              {/* Items List */}
              <div className="space-y-1 px-3">
                {section.items.map((item) => {
                  const isActive = activeItem === item.name;
                  return (
                    <button
                      key={item.name}
                      onClick={() => {
                        setActiveItem(item.name);
                        setMobileOpen(false); // Mobile pe click karne par menu band ho jayega
                      }}
                      className={`
                        flex items-center w-full p-3 rounded-xl transition-all duration-200 group relative
                        ${isActive ? "bg-white text-gray-900 shadow-md" : "hover:bg-gray-800 hover:text-white text-gray-400"}
                        ${expanded ? "justify-start gap-3" : "justify-center"}
                      `}
                    >
                      <span className={isActive ? "text-blue-600" : "group-hover:text-white"}>{item.icon}</span>
                      
                      {expanded && <span className="font-medium text-sm whitespace-nowrap">{item.name}</span>}
                      
                      {/* Tooltip for Collapsed Mode */}
                      {!expanded && (
                        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none z-50 whitespace-nowrap shadow-lg border border-gray-700">
                          {item.name}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* User Profile Section (Sticky Bottom) */}
        <div className="p-3 border-t border-gray-800/50">
          <div className={`flex items-center p-2 rounded-xl bg-gray-800/40 hover:bg-gray-800 cursor-pointer ${expanded ? "gap-3" : "justify-center"}`}>
            <img src="https://i.pravatar.cc/150?img=11" alt="Admin" className="w-10 h-10 rounded-full border-2 border-gray-700" />
            {expanded && (
              <div className="overflow-hidden">
                <h4 className="text-white text-sm font-semibold truncate">Rahul Kumar</h4>
                <p className="text-xs text-gray-500 truncate">Super Admin</p>
              </div>
            )}
            {expanded && <LogOut size={16} className="ml-auto text-gray-500 hover:text-red-400" />}
          </div>
        </div>
      </aside>

      {/* 3. MAIN CONTENT AREA (Responsive Wrapper) */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
         
         {/* Mobile Header (Only visible on Mobile) */}
         <header className="bg-white p-4 flex items-center shadow-sm lg:hidden z-10 sticky top-0">
            <button 
              onClick={() => setMobileOpen(true)} 
              className="p-2 bg-gray-100 rounded-md hover:bg-gray-200 text-gray-700 transition-colors"
            >
               <Menu size={24} />
            </button>
            <span className="ml-4 font-bold text-lg text-gray-800">LoanAdmin</span>
         </header>

         {/* Actual Page Content */}
         <main className="flex-1 overflow-y-auto p-4 lg:p-8 bg-gray-50">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">{activeItem}</h1>
            
            <div className="p-8 bg-white rounded-2xl border border-gray-200 border-dashed flex flex-col items-center justify-center text-center h-96">
                <div className="bg-blue-50 p-4 rounded-full mb-4">
                  <Settings className="text-blue-500" size={32} />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Page Content: {activeItem}</h3>
                <p className="text-gray-500 mt-2 max-w-md">
                  This is where the main content for the <b>{activeItem}</b> module will appear. The sidebar is fully responsive.
                </p>
            </div>
         </main>

      </div>
    </div>
  );
};

export default Sidebar;