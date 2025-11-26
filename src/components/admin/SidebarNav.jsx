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
  Menu
} from 'lucide-react';

// NOTE: This component assumes that you have set up a global CSS file or a dedicated CSS module 
// for the custom-scrollbar class if you want the scrollbar styling to work consistently across browsers.
// A common approach for custom scrollbar in Tailwind is:
/* In your global CSS file (e.g., index.css):
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #4a5568; // dark gray for scrollbar track
    border-radius: 3px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background-color: #1a202c; // very dark gray/black for track
  }
*/

const Sidebar = () => {
  // Sidebar open/close state (Desktop)
  const [expanded, setExpanded] = useState(true);
  // Mobile drawer state
  const [mobileOpen, setMobileOpen] = useState(false);
  // Active menu item tracking
  const [activeItem, setActiveItem] = useState("Loan Requests");

  const menuItems = [
    {
      category: "Main Menu",
      items: [
        { name: "Dashboard", icon: <LayoutDashboard size={20} /> },
        { name: "Analytics", icon: <PieChart size={20} /> },
      ]
    },
    {
      category: "Loan Management",
      items: [
        { name: "Loan Requests", icon: <Banknote size={20} /> }, // Active Item Example
        { name: "Borrowers", icon: <Users size={20} /> },
        { name: "Reports", icon: <FileText size={20} /> },
      ]
    },
    {
      category: "Super Admin",
      items: [
        { name: "Admin Roles", icon: <ShieldCheck size={20} /> },
        { name: "System Settings", icon: <Settings size={20} /> },
      ]
    }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* SIDEBAR COMPONENT */}
      <aside 
        className={`
            bg-[#0d1117] text-gray-400 flex flex-col transition-all duration-300 ease-in-out z-30
            fixed lg:relative h-full
            ${expanded ? "w-64" : "w-20"} 
            ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo Section */}
        <div className="h-16 flex items-center justify-center relative border-b border-gray-800/50">
           {/* Logo Icon */}
           <div className="flex items-center gap-2 font-bold text-white text-xl">
             <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
               L
             </div>
             {/* Hide text if collapsed */}
             <span className={`overflow-hidden transition-all duration-300 ${expanded ? "w-auto opacity-100" : "w-0 opacity-0 hidden"}`}>
               LoanAdmin
             </span>
           </div>

           {/* Toggle Button (Desktop only) */}
           <button 
           onClick={() => setExpanded(!expanded)}
           className="absolute -right-3 top-6 bg-blue-600 text-white p-1 rounded-full hidden lg:flex hover:bg-blue-500 shadow-lg"
           >
             {expanded ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
           </button>
        </div>

        {/* Scrollable Menu Items */}
        <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
          {menuItems.map((section, idx) => (
            <div key={idx} className="mb-6">
              
              {/* Category Label (Line if collapsed) */}
              <div className={`px-4 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 transition-all ${expanded ? "block" : "text-center"}`}>
                {expanded ? section.category : <hr className="border-gray-700 w-8 mx-auto"/>}
              </div>

              {/* Items */}
              <div className="space-y-1 px-3">
                {section.items.map((item) => {
                  const isActive = activeItem === item.name;
                  return (
                    <button
                      key={item.name}
                      onClick={() => {
                        setActiveItem(item.name);
                        setMobileOpen(false); // Close mobile menu on item click
                      }}
                      className={`
                        flex items-center w-full p-3 rounded-xl transition-all duration-200 group relative
                        ${isActive 
                            ? "bg-white text-gray-900 shadow-md" 
                            : "hover:bg-gray-800 hover:text-white text-gray-400"}
                        ${expanded ? "justify-start gap-3" : "justify-center"}
                      `}
                    >
                      <span className={isActive ? "text-blue-600" : "group-hover:text-white"}>
                        {item.icon}
                      </span>
                      
                      {expanded && (
                        <span className="font-medium text-sm whitespace-nowrap">
                            {item.name}
                        </span>
                      )}

                      {/* Tooltip for collapsed mode */}
                      {!expanded && (
                        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
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

        {/* User Profile Section (Bottom) */}
        <div className="p-3 border-t border-gray-800/50">
          <div className={`
             flex items-center p-2 rounded-xl bg-gray-800/40 hover:bg-gray-800 transition-colors cursor-pointer
             ${expanded ? "gap-3" : "justify-center"}
          `}>
            <img 
              src="https://i.pravatar.cc/150?img=11" 
              alt="Admin" 
              className="w-10 h-10 rounded-full border-2 border-gray-700"
            />
            
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

      {/* Main Content Area Demo */}
      {/* <main className="flex-1 p-8">
           <button onClick={() => setMobileOpen(true)} className="lg:hidden mb-4 p-2 bg-white rounded-md shadow">
              <Menu />
           </button>
           <h1 className="text-2xl font-bold text-gray-800">Loan Management Dashboard</h1>
           <p className="text-gray-500 mt-2">Currently viewing: **{activeItem}**</p>
           <div className="mt-8 p-6 bg-white rounded-xl shadow-lg">
             <h2 className="text-xl font-semibold">Welcome Back, Rahul!</h2>
             <p className="text-gray-600 mt-2">This area represents the main content of your application. The sidebar is fully responsive.</p>
             <ul className="mt-4 space-y-2 text-gray-700 list-disc list-inside">
                <li>**Desktop:** Sidebar collapses/expands using the toggle button.</li>
                <li>**Mobile/Tablet:** Sidebar opens as a full-height drawer on top of an overlay, controlled by the <Menu /> button.</li>
                <li>**Active State:** The **{activeItem}** item is highlighted.</li>
             </ul>
           </div>
      </main> */}
    </div>
  );
};

export default Sidebar;