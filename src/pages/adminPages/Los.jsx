import React, { useState } from 'react';
import LoanForm from '../../components/admin/AdminForm/LoanForm';
import LoansTable from '../../components/admin/LoansTable';

function Los() {
  const [activeSection, setActiveSection] = useState('newApplication');
  const [loans, setLoans] = useState([]);

  // Handle form submission from LoanForm
  const handleFormSubmit = (loanData) => {
    setLoans(prev => [loanData, ...prev]);
    // Optionally switch to TAT reports after submission
    // setActiveSection('tatReports');
  };

  // Handle going back from LoanForm
  const handleCancelForm = () => {
    setActiveSection('tatReports');
  };

  // Convert loans data to TAT reports format
  const getTATReportsFromLoans = () => {
    return loans.map((loan, index) => ({
      id: index + 1,
      applicationId: loan.id,
      applicantName: loan.borrower,
      department: getDepartmentFromLoanType(loan.type),
      submittedDate: loan.disbursedDate,
      status: loan.status,
      tat: calculateTAT(loan.disbursedDate, loan.status),
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
    { id: 1, applicationId: 'APP001', applicantName: 'John Doe', department: 'Finance', submittedDate: '2024-01-15', status: 'Completed', tat: '2 days' },
    { id: 2, applicationId: 'APP002', applicantName: 'Jane Smith', department: 'HR', submittedDate: '2024-01-16', status: 'In Progress', tat: '1 day' },
    { id: 3, applicationId: 'APP003', applicantName: 'Mike Johnson', department: 'IT', submittedDate: '2024-01-14', status: 'Pending', tat: '3 days' },
    { id: 4, applicationId: 'APP004', applicantName: 'Sarah Wilson', department: 'Operations', submittedDate: '2024-01-17', status: 'Completed', tat: '1 day' },
  ];

  const displayStatistics = loans.length > 0 ? tatStatistics : {
    total: 4,
    completed: 2,
    inProgress: 1,
    pending: 1,
    averageTAT: '1.75'
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Loan Origination System</h1>
        <p className="text-gray-600 mb-8">Manage applications and track turnaround time</p>

        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveSection('newApplication')}
            className={`px-4 py-2 font-medium text-sm rounded-t-lg transition-colors ${
              activeSection === 'newApplication'
                ? 'bg-white border-t border-l border-r border-gray-300 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            New Application
          </button>
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

        {/* New Application Section */}
        {activeSection === 'newApplication' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">New Loan Application</h2>
            <LoanForm 
              onSubmit={handleFormSubmit}
              onCancel={handleCancelForm}
            />
          </div>
        )}

        {/* TAT Reports Section */}
        {activeSection === 'tatReports' && (
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
              <button className="px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors">
                Export Report
              </button>
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

            {/* Reports Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Application ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TAT</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loan Type</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {displayTATReports.map((report) => (
                    <tr key={report.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-blue-600">{report.applicationId}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{report.applicantName}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{report.department}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{report.submittedDate}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(report.status)}`}>
                          {report.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{report.tat}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {report.loanDetails?.type || 'N/A'}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
                        {report.loanDetails?.amount || 'N/A'}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <button className="text-blue-600 hover:text-blue-900 font-medium mr-3">View</button>
                        <button className="text-green-600 hover:text-green-900 font-medium">Download</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* TAT Summary */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">TAT Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Average Processing Time:</span>
                  <span className="font-medium">{displayStatistics.averageTAT} days</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Completed Applications:</span>
                  <span className="font-medium text-green-600">{displayStatistics.completed}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Applications in Progress:</span>
                  <span className="font-medium text-blue-600">{displayStatistics.inProgress}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Pending Applications:</span>
                  <span className="font-medium text-yellow-600">{displayStatistics.pending}</span>
                </div>
                {loans.length === 0 && (
                  <div className="pt-2 border-t border-gray-200">
                    <p className="text-xs text-gray-500 text-center">
                      Create loan applications to see real-time TAT reports and analytics
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

   
      </div>
    </div>
  );
}

export default Los;