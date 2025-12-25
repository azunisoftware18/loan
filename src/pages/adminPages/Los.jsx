import React, { useState } from 'react';
import { Plus, X, MapPin, Home, Navigation } from 'lucide-react';
import LoanForm from '../../components/admin/AdminForm/LoanForm';
import LoansTable from '../../components/admin/LoansTable';

function Los() {
  const [activeSection, setActiveSection] = useState('tatReports');
  const [loans, setLoans] = useState([]);
  const [showFormPopup, setShowFormPopup] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Handle form submission from LoanForm
  const handleFormSubmit = (loanData) => {
    const newLoan = {
      ...loanData,
      id: `APP${String(loans.length + 1001).padStart(3, '0')}`,
      status: 'Pending',
      submittedDate: new Date().toISOString().split('T')[0],
      // Location data
      city: loanData.city,
      state: loanData.state,
      pincode: loanData.pincode,
      residentialAddress: loanData.residentialAddress,
      // Property location if applicable
      ...(loanData.propertyAddress && {
        propertyAddress: loanData.propertyAddress,
        propertyCity: loanData.propertyCity,
        propertyState: loanData.propertyState,
        propertyPincode: loanData.propertyPincode
      })
    };
    
    setLoans(prev => [newLoan, ...prev]);
    setShowFormPopup(false);
    setCurrentStep(1);
    setActiveSection('tatReports');
  };

  // Handle going back from LoanForm
  const handleCancelForm = () => {
    setShowFormPopup(false);
    setCurrentStep(1);
  };

  // Convert loans data to TAT reports format
  const getTATReportsFromLoans = () => {
    return loans.map((loan, index) => ({
      id: index + 1,
      applicationId: loan.id,
      applicantName: loan.borrower,
      department: getDepartmentFromLoanType(loan.type),
      submittedDate: loan.submittedDate || loan.disbursedDate,
      status: loan.status,
      tat: calculateTAT(loan.submittedDate || loan.disbursedDate, loan.status),
      loanDetails: loan // Include full loan details for reference
    }));
  };

  // Helper function to determine department based on loan type
  const getDepartmentFromLoanType = (loanType) => {
    const departmentMap = {
      'Home Loan': 'Housing Finance',
      'Car Loan': 'Vehicle Finance', 
      'Loan Against Property': 'Property Finance',
      'Gold Loan': 'Gold Finance',
      'Personal Loan': 'Personal Finance',
      'Education Loan': 'Education Finance',
      'Business Loan': 'Business Finance',
      'Credit Card Loan': 'Card Services'
    };
    return departmentMap[loanType] || 'General Banking';
  };

  // Calculate TAT based on submission date and status
  const calculateTAT = (submittedDate, status) => {
    const submitted = new Date(submittedDate);
    const today = new Date();
    const diffTime = Math.abs(today - submitted);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (status === 'Completed') {
      // For completed loans, assume it took 2-7 days
      return `${Math.min(7, Math.max(2, diffDays - 1))} days`;
    } else if (status === 'In Progress') {
      return `${diffDays} days (ongoing)`;
    } else {
      return `${diffDays} days (pending)`;
    }
  };

  // Get TAT statistics
  const getTATStatistics = () => {
    const reports = getTATReportsFromLoans();
    const completedLoans = reports.filter(report => report.status === 'Completed');
    const inProgressLoans = reports.filter(report => report.status === 'In Progress');
    const pendingLoans = reports.filter(report => report.status === 'Pending');
    
    // Calculate average TAT for completed loans
    const avgTAT = completedLoans.length > 0 
      ? completedLoans.reduce((sum, report) => {
          const days = parseInt(report.tat);
          return sum + (isNaN(days) ? 0 : days);
        }, 0) / completedLoans.length
      : 0;

    return {
      total: reports.length,
      completed: completedLoans.length,
      inProgress: inProgressLoans.length,
      pending: pendingLoans.length,
      averageTAT: avgTAT.toFixed(1)
    };
  };

  const tatStatistics = getTATStatistics();
  const tatReports = getTATReportsFromLoans();

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800 border border-green-200';
      case 'In Progress': return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  // If no loans data, show sample data in TAT reports
  const displayTATReports = loans.length > 0 ? tatReports : [
    { 
      id: 1, 
      applicationId: 'APP001', 
      applicantName: 'John Doe', 
      department: 'Housing Finance', 
      submittedDate: '2024-01-15', 
      status: 'Completed', 
      tat: '2 days',
      loanDetails: {
        type: 'Home Loan',
        amount: '5000000',
        city: 'Mumbai',
        state: 'Maharashtra'
      }
    },
    { 
      id: 2, 
      applicationId: 'APP002', 
      applicantName: 'Jane Smith', 
      department: 'Vehicle Finance', 
      submittedDate: '2024-01-16', 
      status: 'In Progress', 
      tat: '1 day',
      loanDetails: {
        type: 'Car Loan',
        amount: '800000',
        city: 'Delhi',
        state: 'Delhi'
      }
    },
    { 
      id: 3, 
      applicationId: 'APP003', 
      applicantName: 'Mike Johnson', 
      department: 'Personal Finance', 
      submittedDate: '2024-01-14', 
      status: 'Pending', 
      tat: '3 days',
      loanDetails: {
        type: 'Personal Loan',
        amount: '300000',
        city: 'Bangalore',
        state: 'Karnataka'
      }
    },
    { 
      id: 4, 
      applicationId: 'APP004', 
      applicantName: 'Sarah Wilson', 
      department: 'Business Finance', 
      submittedDate: '2024-01-17', 
      status: 'Completed', 
      tat: '1 day',
      loanDetails: {
        type: 'Business Loan',
        amount: '2000000',
        city: 'Chennai',
        state: 'Tamil Nadu'
      }
    },
  ];

  const displayStatistics = loans.length > 0 ? tatStatistics : {
    total: 4,
    completed: 2,
    inProgress: 1,
    pending: 1,
    averageTAT: '1.75'
  };

  // Format loan amount
  const formatAmount = (amount) => {
    if (!amount) return 'N/A';
    return `₹${parseFloat(amount).toLocaleString('en-IN')}`;
  };

  // Format location
  const formatLocation = (city, state) => {
    if (!city && !state) return 'N/A';
    return `${city || ''}${city && state ? ', ' : ''}${state || ''}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 relative">
      {/* FORM POPUP */}
      {showFormPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Popup Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                  <Plus size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">New Loan Application</h2>
                  <p className="text-sm text-gray-500">Create a new loan application</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setShowFormPopup(false);
                  setCurrentStep(1);
                }}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition"
              >
                <X size={24} />
              </button>
            </div>

            {/* Form Content */}
            <div className="p-6 overflow-y-auto">
              <LoanForm 
                onSubmit={handleFormSubmit}
                onCancel={handleCancelForm}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
              />
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto">
        {/* Header with New Application Button */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Loan Origination System</h1>
            <p className="text-gray-600">Manage applications and track turnaround time</p>
          </div>
          
          <button
            onClick={() => setShowFormPopup(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg transition-all font-medium"
          >
            <Plus size={20} /> New Application
          </button>
        </div>

        {/* Navigation Tabs - Now only TAT Reports */}
        <div className="flex space-x-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveSection('tatReports')}
            className={`px-4 py-2 font-medium text-sm rounded-t-lg transition-colors ${
              activeSection === 'tatReports'
                ? 'bg-white border-t border-l border-r border-gray-300 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            TAT Reports
          </button>
        </div>

        {/* TAT Reports Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">Turnaround Time Reports</h2>
              <p className="text-gray-600 text-sm mt-1">
                {loans.length > 0 
                  ? `Showing data from ${loans.length} loan applications` 
                  : 'Showing sample data - create loan applications to see real reports'
                }
              </p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-colors flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filter
              </button>
              <button className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export Report
              </button>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="text-sm text-blue-600 font-medium">Total Applications</div>
              <div className="text-2xl font-bold text-blue-900">{displayStatistics.total}</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="text-sm text-green-600 font-medium">Completed</div>
              <div className="text-2xl font-bold text-green-900">
                {displayStatistics.completed}
              </div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <div className="text-sm text-orange-600 font-medium">In Progress</div>
              <div className="text-2xl font-bold text-orange-900">
                {displayStatistics.inProgress}
              </div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <div className="text-sm text-red-600 font-medium">Average TAT</div>
              <div className="text-2xl font-bold text-red-900">
                {displayStatistics.averageTAT} days
              </div>
            </div>
          </div>

          {/* Loans Count */}
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">Loan Applications</h3>
            <span className="text-sm text-gray-500">
              {loans.length} {loans.length === 1 ? 'application' : 'applications'} found
            </span>
          </div>

          {/* Applications Table */}
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Application ID</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant Name</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loan Type</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted Date</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TAT</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {displayTATReports.map((report, index) => (
                  <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-blue-600">
                      {report.applicationId}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">
                          {report.applicantName?.charAt(0) || 'A'}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{report.applicantName}</div>
                          <div className="text-xs text-gray-500">{report.department}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {report.loanDetails?.type || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">
                      {formatAmount(report.loanDetails?.amount)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <div>
                          <div className="font-medium">{report.loanDetails?.city || 'N/A'}</div>
                          <div className="text-xs text-gray-500">{report.loanDetails?.state || ''}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {report.submittedDate}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {report.tat}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <button 
                          className="text-blue-600 hover:text-blue-900 font-medium px-3 py-1 hover:bg-blue-50 rounded transition-colors"
                          onClick={() => {
                            // View details logic here
                            alert(`Viewing details for ${report.applicationId}`);
                          }}
                        >
                          View
                        </button>
                        <button 
                          className="text-green-600 hover:text-green-900 font-medium px-3 py-1 hover:bg-green-50 rounded transition-colors"
                          onClick={() => {
                            // Download logic here
                            alert(`Downloading report for ${report.applicationId}`);
                          }}
                        >
                          Download
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* TAT Summary */}
          <div className="mt-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Turnaround Time Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="text-sm text-gray-600">Average Processing Time</div>
                <div className="text-2xl font-bold text-gray-900">{displayStatistics.averageTAT} days</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-gray-600">Completed Applications</div>
                <div className="text-2xl font-bold text-green-600">{displayStatistics.completed}</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-gray-600">Applications in Progress</div>
                <div className="text-2xl font-bold text-blue-600">{displayStatistics.inProgress}</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-gray-600">Pending Applications</div>
                <div className="text-2xl font-bold text-yellow-600">{displayStatistics.pending}</div>
              </div>
            </div>
            
            {loans.length === 0 && (
              <div className="mt-4 pt-4 border-t border-gray-300">
                <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <Home className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                  <p className="text-gray-700 mb-2">No loan applications created yet</p>
                  <p className="text-sm text-gray-500 mb-4">
                    Click the "New Application" button to create your first loan application
                  </p>
                  <button
                    onClick={() => setShowFormPopup(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 mx-auto"
                  >
                    <Plus size={16} /> Create First Application
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Recent Activity */}
          {loans.length > 0 && (
            <div className="mt-6 p-6 bg-white rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {loans.slice(0, 3).map((loan, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className={`w-2 h-2 rounded-full ${loan.status === 'Completed' ? 'bg-green-500' : loan.status === 'In Progress' ? 'bg-blue-500' : 'bg-yellow-500'}`}></div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{loan.borrower}</div>
                      <div className="text-sm text-gray-500">
                        Applied for {loan.type} • {loan.submittedDate}
                      </div>
                      <div className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                        <MapPin size={12} /> {formatLocation(loan.city, loan.state)}
                      </div>
                    </div>
                    <div className="text-sm font-medium text-gray-700">
                      {formatAmount(loan.amount)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Location Statistics */}
          {loans.length > 0 && (
            <div className="mt-6 p-6 bg-white rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Navigation size={20} /> Location Distribution
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-700">Top Cities</h4>
                  {Array.from(
                    new Map(
                      loans
                        .map(loan => loan.city)
                        .filter(city => city)
                        .reduce((acc, city) => {
                          acc[city] = (acc[city] || 0) + 1;
                          return acc;
                        }, {})
                    )
                  )
                  .sort(([,a], [,b]) => b - a)
                  .slice(0, 3)
                  .map(([city, count]) => (
                    <div key={city} className="flex justify-between items-center">
                      <span className="text-gray-600">{city}</span>
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                        {count} applications
                      </span>
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-700">Top States</h4>
                  {Array.from(
                    new Map(
                      loans
                        .map(loan => loan.state)
                        .filter(state => state)
                        .reduce((acc, state) => {
                          acc[state] = (acc[state] || 0) + 1;
                          return acc;
                        }, {})
                    )
                  )
                  .sort(([,a], [,b]) => b - a)
                  .slice(0, 3)
                  .map(([state, count]) => (
                    <div key={state} className="flex justify-between items-center">
                      <span className="text-gray-600">{state}</span>
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                        {count} applications
                      </span>
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-700">Loan Types by Location</h4>
                  {Array.from(
                    new Map(
                      loans
                        .filter(loan => loan.city)
                        .reduce((acc, loan) => {
                          const key = `${loan.type}-${loan.city}`;
                          acc[key] = (acc[key] || 0) + 1;
                          return acc;
                        }, {})
                    )
                  )
                  .sort(([,a], [,b]) => b - a)
                  .slice(0, 3)
                  .map(([key, count]) => {
                    const [type, city] = key.split('-');
                    return (
                      <div key={key} className="flex justify-between items-center">
                        <div>
                          <div className="text-gray-600">{type}</div>
                          <div className="text-xs text-gray-400">{city}</div>
                        </div>
                        <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded">
                          {count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Los;