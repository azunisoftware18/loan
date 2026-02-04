import { MoreVertical } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

const ActionMenu = ({ 
  actions = [], 
  containerClassName = "", 
  menuClassName = "" 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative inline-block text-left ${containerClassName}`} ref={menuRef}>
      {/* Three Dot Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200"
        aria-label="Actions"
      >
        <MoreVertical/>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div 
  className={`absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md 
  bg-white shadow-lg focus:outline-none ${menuClassName}`}
>

          <div className="py-1">
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={() => {
                  action.onClick();
                  setIsOpen(false);
                }}
                className={`flex w-full items-center px-4 py-2 text-sm transition-colors ${
                  action.isDanger 
                    ? "text-red-600 hover:bg-red-50" 
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {action.icon && <span className="mr-3">{action.icon}</span>}
                {action.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionMenu;