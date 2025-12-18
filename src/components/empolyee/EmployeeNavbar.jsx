

import React from 'react';
import { 
  Bell, 
  Search, 
  Menu, 
  User, 
  LogOut, 
  Settings 
} from 'lucide-react';

const EmployeeNavbar = ({ toggleSidebar }) => {
  return (
    <nav className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-10">
      
      {/* LEFT SIDE: Mobile Menu & Search */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button - Visible only on mobile */}
        <button 
          onClick={toggleSidebar} 
          className="p-2 rounded-md hover:bg-gray-100 lg:hidden text-gray-600"
        >
          <Menu size={24} />
        </button>

        {/* Search Bar */}
       
      </div>

      {/* RIGHT SIDE: Icons & Profile */}
      <div className="flex items-center gap-4 lg:gap-6">
        
        {/* Notification Bell with Badge */}
        <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
          <Bell size={20} />
          {/* Red Dot for unread notifications */}
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>

        {/* Separator */}
        <div className="h-8 w-[1px] bg-gray-200 hidden md:block"></div>

        {/* User Profile Dropdown Area */}
        <div className="flex items-center gap-3 cursor-pointer group relative">
          <div className="hidden md:block text-right">
            <p className="text-sm font-semibold text-gray-700">Sohail
              
            </p>
            <p className="text-xs text-gray-500">Employee</p>
          </div>
          
          <img 
            src="https://media-del2-2.cdn.whatsapp.net/v/t61.24694-24/537553419_3146051388910556_1101542131903776876_n.jpg?ccb=11-4&oh=01_Q5Aa3QFnF_tR3L9pRhjNu9WXrYUxAKiDfn6HE5YrF5ogqh_Msg&oe=694917E6&_nc_sid=5e03e0&_nc_cat=101" 
            alt="User" 
            className="w-9 h-9 rounded-full border border-gray-200 shadow-sm"
          />

          {/* Simple Dropdown on Hover */}
          <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 hidden group-hover:block animate-in fade-in slide-in-from-top-2">
            <a href="#" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
              <User size={16} /> Profile
            </a>
            <a href="#" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
              <Settings size={16} /> Settings
            </a>
            <hr className="my-1 border-gray-100" />
            <a href="#" className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
              <LogOut size={16} /> Logout
            </a>
          </div>
        </div>

      </div>
    </nav>
  );
};

export default EmployeeNavbar;