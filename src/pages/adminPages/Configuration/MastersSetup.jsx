import React, { useState } from "react";
import {
  Wallet,
  Package,
  Settings,
  Shield,
  Briefcase,
  Monitor,
  AreaChart,
  Search,
  Plus,
  Edit,
  Trash2,
  Download,
  Filter,
  Database,
  Layers,
  Building,
  Cpu
} from "lucide-react";

export default function MastersPage() {
  const [activeTab, setActiveTab] = useState("tax");
  const [searchQuery, setSearchQuery] = useState("");

  const masters = [
    { 
      key: "tax", 
      label: "Tax Slab", 
      icon: Wallet,
      count: 12,
      color: "bg-blue-100 text-blue-600"
    },
    { 
      key: "courier", 
      label: "Courier Master", 
      icon: Package,
      count: 8,
      color: "bg-green-100 text-green-600"
    },
    { 
      key: "company", 
      label: "Company Config", 
      icon: Settings,
      count: 1,
      color: "bg-purple-100 text-purple-600"
    },
    { 
      key: "insurance", 
      label: "Insurance Company", 
      icon: Shield,
      count: 24,
      color: "bg-red-100 text-red-600"
    },
    { 
      key: "branch", 
      label: "Insurance Branch", 
      icon: Briefcase,
      count: 156,
      color: "bg-indigo-100 text-indigo-600"
    },
    { 
      key: "mac", 
      label: "MAC Address", 
      icon: Monitor,
      count: 42,
      color: "bg-gray-100 text-gray-600"
    },
  ];

  const getMasterContent = () => {
    const content = {
      tax: {
        title: "Tax Slab Master",
        description: "Manage tax percentages, GST rates, and service tax configurations for different financial products.",
        icon: Layers,
        fields: ["Slab Name", "Tax Percentage", "GST Rate", "Effective From", "Status"],
        stats: [
          { label: "Active Slabs", value: "8", change: "+2" },
          { label: "Inactive", value: "4", change: "-1" }
        ]
      },
      courier: {
        title: "Courier Master",
        description: "Configure courier service providers, their rates, delivery timelines, and tracking systems.",
        icon: Package,
        fields: ["Courier Name", "Contact", "Delivery Zones", "Rate per KG", "Status"],
        stats: [
          { label: "Active Partners", value: "6", change: "+1" },
          { label: "Coverage Areas", value: "28", change: "+3" }
        ]
      },
      company: {
        title: "Company Configuration",
        description: "Set up company-wide settings, loan prefixes, charges, and default parameters for operations.",
        icon: Building,
        fields: ["Setting Type", "Value", "Description", "Last Updated"],
        stats: [
          { label: "Config Groups", value: "15", change: "0" },
          { label: "Active Rules", value: "89", change: "+5" }
        ]
      },
      insurance: {
        title: "Insurance Company",
        description: "Manage insurance company partnerships, commission structures, and policy integration settings.",
        icon: Shield,
        fields: ["Company Name", "Partner Since", "Commission %", "Products", "Status"],
        stats: [
          { label: "Active Partners", value: "18", change: "+2" },
          { label: "Products", value: "45", change: "+5" }
        ]
      },
      branch: {
        title: "Insurance Branch",
        description: "Configure insurance office locations, their managers, and operational territories.",
        icon: Briefcase,
        fields: ["Branch Code", "Location", "Manager", "Contact", "Territory"],
        stats: [
          { label: "Branches", value: "156", change: "+8" },
          { label: "Active Cities", value: "78", change: "+3" }
        ]
      },
      mac: {
        title: "Machine MAC Address",
        description: "Register and authorize computer MAC addresses for secure system access and device management.",
        icon: Cpu,
        fields: ["Device Name", "MAC Address", "User", "Department", "Last Active"],
        stats: [
          { label: "Active Devices", value: "38", change: "+4" },
          { label: "Pending Approval", value: "4", change: "-2" }
        ]
      }
    };

    return content[activeTab] || {
      title: "Select a Master",
      description: "Please select a master from the sidebar to view its configuration.",
      icon: Database,
      fields: [],
      stats: []
    };
  };

  const currentContent = getMasterContent();
  const ActiveIcon = currentContent.icon;

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-8 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Master Configuration</h1>
            <p className="text-gray-600 mt-2">Manage system-wide configurations and settings</p>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button className="px-3 sm:px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center text-sm sm:text-base">
              <Filter className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Filter</span>
            </button>
            <button className="px-3 sm:px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center text-sm sm:text-base">
              <Download className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-8 py-4">
        <div className="mb-4 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search masters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Tabs Container */}
        <div className="relative">
          <div className="flex overflow-x-auto pb-3 px-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div className="flex space-x-3 flex-nowrap">
              {masters.map((master) => (
                <button
                  key={master.key}
                  onClick={() => setActiveTab(master.key)}
                  className={`
                    flex-shrink-0 p-4 rounded-xl transition-all duration-200 flex items-center justify-between border
                    ${activeTab === master.key 
                      ? 'bg-blue-50 border-2 border-blue-100 shadow-sm' 
                      : 'bg-white border-gray-100 hover:bg-gray-50 hover:border-gray-200'
                    }
                  `}
                  style={{ minWidth: '180px' }}
                >
                  <div className="flex items-center">
                    <div className={`p-2.5 rounded-lg ${master.color} mr-3`}>
                      <master.icon className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <h3 className={`font-semibold text-sm ${activeTab === master.key ? 'text-blue-700' : 'text-gray-800'}`}>
                        {master.label}
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {master.count} entries
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Gradient overlay for scroll indication */}
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="overflow-auto h-[calc(100vh-240px)]">
        <div className="p-4 sm:p-8 max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-6 mb-8">
            <div className="flex-1">
              <div className="flex items-start sm:items-center mb-4">
                <div className="p-3 bg-blue-100 rounded-xl mr-4 flex-shrink-0">
                  <ActiveIcon className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{currentContent.title}</h2>
                  <p className="text-gray-600 mt-1 text-sm sm:text-base">{currentContent.description}</p>
                </div>
              </div>
              
              {/* Stats Cards */}
              <div className="flex flex-wrap gap-4 mt-6">
                {currentContent.stats.map((stat, index) => (
                  <div key={index} className="bg-white p-4 rounded-xl border border-gray-200 min-w-[140px] flex-1">
                    <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                    <div className="flex items-baseline">
                      <span className="text-2xl font-bold text-gray-900 mr-2">{stat.value}</span>
                      <span className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : stat.change.startsWith('-') ? 'text-red-600' : 'text-gray-500'}`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 shrink-0 w-full lg:w-auto">
              <button className="flex-1 lg:flex-none px-5 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center text-base">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </button>
              <button className="flex-1 lg:flex-none px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center text-base shadow-sm">
                <Plus className="w-4 h-4 mr-2" />
                Add New
              </button>
            </div>
          </div>

          {/* Content Card */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
            {/* Table Header */}
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h3 className="font-semibold text-gray-900 text-lg">Configuration Table</h3>
              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-none min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search in table..."
                    className="pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
                  />
                </div>
                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  <Filter className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Table Container */}
            <div className="overflow-x-auto">
              <div className="max-h-[500px] overflow-y-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        S.No
                      </th>
                      {currentContent.fields.map((field, index) => (
                        <th key={index} className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          {field}
                        </th>
                      ))}
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[1, 2, 3, 4, 5].map((row) => (
                      <tr key={row} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {row}
                        </td>
                        {currentContent.fields.map((field, index) => (
                          <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 max-w-[200px] truncate">
                            {field.toLowerCase().includes('status') ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Active
                              </span>
                            ) : (
                              `Sample ${field} ${row}`
                            )}
                          </td>
                        ))}
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex space-x-2">
                            <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Table Footer */}
            <div className="px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-500">
                Showing 5 of 156 entries
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors text-sm">
                  Previous
                </button>
                <button className="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm">
                  1
                </button>
                <button className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors text-sm">
                  2
                </button>
                <button className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors text-sm">
                  3
                </button>
                <span className="px-2 text-gray-500">...</span>
                <button className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors text-sm">
                  10
                </button>
                <button className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors text-sm">
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-5 rounded-xl border border-gray-200">
              <h4 className="font-semibold text-gray-900 text-base mb-3">Common Actions</h4>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                  Import from CSV
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                  Export Configuration
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                  View Change History
                </button>
              </div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-gray-200">
              <h4 className="font-semibold text-gray-900 text-base mb-3">Recent Updates</h4>
              <div className="space-y-3">
                <div className="text-sm">
                  <p className="text-gray-900">Updated Tax Slab #4</p>
                  <p className="text-gray-500 text-xs mt-1">2 hours ago</p>
                </div>
                <div className="text-sm">
                  <p className="text-gray-900">Added new Courier Partner</p>
                  <p className="text-gray-500 text-xs mt-1">Yesterday</p>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
              <h4 className="font-semibold text-blue-900 text-base mb-3">Need Help?</h4>
              <p className="text-blue-700 text-sm mb-4">
                Check our documentation for detailed guides on master configuration.
              </p>
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                View Documentation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}