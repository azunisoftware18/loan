import React from 'react';

// Props: title, value, subtext, icon (Component), iconColor (tailwinds color name)
function StatusCard({ title, value, subtext, icon: Icon, iconColor = "blue" }) {
  
  // Dynamic Background and Text colors for Icons
  const colorMap = {
    blue: "bg-blue-50 text-blue-600",
    red: "bg-red-50 text-red-600",
    green: "bg-green-50 text-green-600",
    orange: "bg-orange-50 text-orange-600",
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-xl ${colorMap[iconColor]}`}>
          {Icon && <Icon className="h-6 w-6" />}
        </div>
      </div>
      
      {subtext && (
        <div className="mt-3 text-sm text-gray-600 flex items-center">
          {subtext}
        </div>
      )}
    </div>
  );
}

export default StatusCard;