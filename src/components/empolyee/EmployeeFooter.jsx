import React from 'react';

const EmployeeFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left Side: Copyright */}
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-500">
              © {currentYear} <span className="font-semibold text-gray-700">LoanAdmin System</span>. 
              <span className="hidden sm:inline"> All rights reserved.</span>
            </p>
          </div>

          {/* Right Side: Links & Version */}
          <div className="flex items-center gap-6">
            <div className="flex gap-4 text-sm text-gray-500">
              <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Support</a>
            </div>
            
            {/* Divider */}
            <div className="h-4 w-[1px] bg-gray-300 hidden md:block"></div>
            
            {/* Version Badge */}
            <span className="text-xs font-mono text-gray-400 bg-gray-100 px-2 py-1 rounded">
              v1.2.0
            </span>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default EmployeeFooter;