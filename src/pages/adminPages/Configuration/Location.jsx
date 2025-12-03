import React, { useState } from 'react';
import {
  MapPin,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Download,
  Upload,
  Globe,
  Building,
  Navigation,
  Users,
  Phone,
  Mail,
  Clock,
  Shield,
  CheckCircle,
  XCircle,
  MoreVertical,
  ChevronRight,
  Star,
  Eye,
  Copy,
  Share2,
  Maximize2,
  Minimize2,
  Layers,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const Location = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Sample location data
  const locations = [
    {
      id: 1,
      name: 'Headquarters Office',
      type: 'Office',
      address: '123 Business Ave, New York, NY 10001',
      coordinates: { lat: 40.7128, lng: -74.0060 },
      contact: {
        phone: '+1 (555) 123-4567',
        email: 'hq@company.com',
        manager: 'John Smith'
      },
      status: 'active',
      employees: 245,
      area: '5000 sq ft',
      lastUpdated: '2024-01-15',
      tags: ['Main Office', 'Management', 'Operations'],
      rating: 4.8
    },
    {
      id: 2,
      name: 'Downtown Branch',
      type: 'Retail',
      address: '456 Commerce St, New York, NY 10002',
      coordinates: { lat: 40.7234, lng: -73.9895 },
      contact: {
        phone: '+1 (555) 987-6543',
        email: 'downtown@company.com',
        manager: 'Sarah Johnson'
      },
      status: 'active',
      employees: 89,
      area: '2500 sq ft',
      lastUpdated: '2024-01-10',
      tags: ['Retail', 'Customer Service', 'Sales'],
      rating: 4.5
    },
    {
      id: 3,
      name: 'Warehouse Facility',
      type: 'Warehouse',
      address: '789 Industrial Rd, Brooklyn, NY 11201',
      coordinates: { lat: 40.6782, lng: -73.9442 },
      contact: {
        phone: '+1 (555) 456-7890',
        email: 'warehouse@company.com',
        manager: 'Mike Wilson'
      },
      status: 'active',
      employees: 56,
      area: '15000 sq ft',
      lastUpdated: '2024-01-05',
      tags: ['Storage', 'Logistics', 'Distribution'],
      rating: 4.2
    },
    {
      id: 4,
      name: 'Westside Outlet',
      type: 'Retail',
      address: '321 Market St, Jersey City, NJ 07302',
      coordinates: { lat: 40.7178, lng: -74.0431 },
      contact: {
        phone: '+1 (555) 234-5678',
        email: 'westside@company.com',
        manager: 'Emma Davis'
      },
      status: 'inactive',
      employees: 45,
      area: '1800 sq ft',
      lastUpdated: '2024-01-02',
      tags: ['Outlet', 'Clearance', 'Sales'],
      rating: 4.0
    },
    {
      id: 5,
      name: 'Training Center',
      type: 'Training',
      address: '654 Education Blvd, Newark, NJ 07102',
      coordinates: { lat: 40.7357, lng: -74.1724 },
      contact: {
        phone: '+1 (555) 345-6789',
        email: 'training@company.com',
        manager: 'Robert Brown'
      },
      status: 'active',
      employees: 12,
      area: '3500 sq ft',
      lastUpdated: '2024-01-08',
      tags: ['Training', 'Development', 'Workshops'],
      rating: 4.7
    },
    {
      id: 6,
      name: 'Call Center',
      type: 'Office',
      address: '987 Support Ave, Philadelphia, PA 19103',
      coordinates: { lat: 39.9526, lng: -75.1652 },
      contact: {
        phone: '+1 (555) 567-8901',
        email: 'support@company.com',
        manager: 'Lisa Anderson'
      },
      status: 'active',
      employees: 156,
      area: '8000 sq ft',
      lastUpdated: '2024-01-12',
      tags: ['Support', 'Customer Care', '24/7'],
      rating: 4.3
    }
  ];

  const locationTypes = [
    { id: 'all', label: 'All Types', count: 6, color: 'bg-blue-500' },
    { id: 'office', label: 'Office', count: 2, color: 'bg-green-500' },
    { id: 'retail', label: 'Retail', count: 2, color: 'bg-purple-500' },
    { id: 'warehouse', label: 'Warehouse', count: 1, color: 'bg-orange-500' },
    { id: 'training', label: 'Training', count: 1, color: 'bg-red-500' }
  ];

  const statusFilters = [
    { id: 'all', label: 'All Status', count: 6 },
    { id: 'active', label: 'Active', count: 5, icon: CheckCircle, color: 'text-green-600' },
    { id: 'inactive', label: 'Inactive', count: 1, icon: XCircle, color: 'text-red-600' }
  ];

  // Filter locations based on search query
  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleAddLocation = () => {
    setShowAddModal(true);
  };

  const handleDeleteLocation = (id) => {
    if (window.confirm('Are you sure you want to delete this location?')) {
      console.log('Deleting location:', id);
      // API call would go here
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Locations</h1>
            <p className="text-gray-600 mt-2">Manage all business locations and facilities</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
              <Upload className="w-4 h-4 mr-2" />
              Import
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
            <button
              onClick={handleAddLocation}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Location
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Locations</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">6</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center mt-3">
              <span className="text-sm text-green-600 flex items-center">
                <ChevronUp className="w-4 h-4 mr-1" />
                2 new this month
              </span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Locations</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">5</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-3">83% active rate</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Employees</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">603</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="flex items-center mt-3">
              <span className="text-sm text-gray-500">Avg: 100/location</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Area</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">35,800</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <Building className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-3">sq ft across all locations</p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search locations by name, address, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
              {showFilters ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
            </button>
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-3 ${viewMode === 'grid' ? 'bg-gray-100' : 'bg-white'} hover:bg-gray-50 transition-colors`}
              >
                <Layers className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-3 ${viewMode === 'list' ? 'bg-gray-100' : 'bg-white'} hover:bg-gray-50 transition-colors border-l border-gray-300`}
              >
                <ListIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="mt-4 p-4 bg-white rounded-xl border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Location Types */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Location Type</h3>
                <div className="space-y-2">
                  {locationTypes.map((type) => (
                    <button
                      key={type.id}
                      className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full ${type.color} mr-3`}></div>
                        <span className="text-gray-700">{type.label}</span>
                      </div>
                      <span className="text-sm text-gray-500">{type.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Status</h3>
                <div className="space-y-2">
                  {statusFilters.map((status) => (
                    <button
                      key={status.id}
                      className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className="flex items-center">
                        {status.icon && (
                          <status.icon className={`w-4 h-4 mr-3 ${status.color || 'text-gray-400'}`} />
                        )}
                        <span className="text-gray-700">{status.label}</span>
                      </div>
                      <span className="text-sm text-gray-500">{status.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {['Office', 'Retail', 'Warehouse', 'Training', 'Support', 'Management'].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 cursor-pointer transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Location Cards/Grid */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
        {filteredLocations.map((location) => (
          <div
            key={location.id}
            className={`bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 ${
              viewMode === 'list' ? 'flex flex-col md:flex-row' : ''
            }`}
          >
            {/* Map Preview */}
            <div className={`relative ${viewMode === 'list' ? 'md:w-48 flex-shrink-0' : 'h-48'}`}>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                <Globe className="w-12 h-12 text-blue-300" />
              </div>
              <div className="absolute top-4 right-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    location.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {location.status === 'active' ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 flex items-center">
                <div className="flex items-center bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                  <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                  <span className="text-sm font-medium">{location.rating}</span>
                </div>
              </div>
            </div>

            {/* Location Details */}
            <div className={`p-5 ${viewMode === 'list' ? 'flex-1' : ''}`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{location.name}</h3>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {location.type}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="line-clamp-1">{location.address}</span>
                  </div>
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>

              {/* Stats */}
              <div className={`grid ${viewMode === 'list' ? 'grid-cols-3' : 'grid-cols-2'} gap-3 mb-4`}>
                <div className="flex items-center">
                  <Users className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">{location.employees} employees</span>
                </div>
                <div className="flex items-center">
                  <Building className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">{location.area}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">Updated {location.lastUpdated}</span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="mb-4">
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Phone className="w-4 h-4 mr-2" />
                  {location.contact.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  {location.contact.email}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {location.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedLocation(location)}
                  className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteLocation(location.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredLocations.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <MapPin className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No locations found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setShowFilters(false);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Add Location Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Add New Location</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <XCircle className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location Name *
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter location name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location Type *
                    </label>
                    <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option value="">Select type</option>
                      <option value="office">Office</option>
                      <option value="retail">Retail</option>
                      <option value="warehouse">Warehouse</option>
                      <option value="training">Training Center</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address *
                  </label>
                  <textarea
                    rows="2"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Full address"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Phone
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="location@company.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Manager Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter manager name"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Employees
                    </label>
                    <input
                      type="number"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Area (sq ft)
                    </label>
                    <input
                      type="number"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0"
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Add Location
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper component for list view icon
const ListIcon = (props) => (
  <svg
    {...props}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
      clipRule="evenodd"
    />
  </svg>
);

export default Location;