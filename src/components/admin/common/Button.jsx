import React from 'react';

// Props: children (text), onClick (function), type (button/submit), aur className (extra styles)
function Button({ children, onClick, type = "button", className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg 
                  hover:bg-blue-700 active:bg-blue-800 transition-colors 
                  duration-200 shadow-md focus:outline-none focus:ring-2 
                  focus:ring-blue-400 focus:ring-opacity-75 ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;