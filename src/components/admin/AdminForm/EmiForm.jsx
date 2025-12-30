// components/admin/EMIVoucherModal.jsx
import React from 'react';
import { 
  Users, 
  Calendar, 
  Clock,
  Repeat,
  AlertCircle,
  XCircle
} from 'lucide-react';

const EmiForm = ({ 
  isOpen, 
  onClose, 
  mode = 'add', 
  emiVoucher, 
  onEmiVoucherChange,
  emiPlans,
  calculateEmiPreview,
  formatCurrency,
  formatDate,
  onSave
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
      <div className="w-full max-w-4xl  rounded-2xl bg-white shadow-2xl   max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 bg-blue-600">
          <div>
            <h3 className="text-lg rounded-T-2xl font-semibold text-white">
              {mode === 'add' ? 'Create New EMI Voucher' : 'Edit EMI Voucher'}
            </h3>
            <p className="text-sm text-white mt-1">
              Configure customer loan EMI payment schedule
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-300"
          >
            <XCircle className="h-5 w-5 text-white" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="space-y-8">
            {/* Customer Information */}
            <div>
              <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                Customer Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    value={emiVoucher.customerName}
                    onChange={(e) => onEmiVoucherChange('customerName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter customer full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    EMI Plan Type
                  </label>
                  <select
                    value={emiVoucher.planName}
                    onChange={(e) => onEmiVoucherChange('planName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select EMI Plan</option>
                    {emiPlans.map(plan => (
                      <option key={plan.id} value={plan.name}>{plan.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    EMI Amount (₹) *
                  </label>
                  <input
                    type="number"
                    value={emiVoucher.amount}
                    onChange={(e) => onEmiVoucherChange('amount', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter monthly EMI amount"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tenure (Months) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="360"
                    value={emiVoucher.tenure}
                    onChange={(e) => onEmiVoucherChange('tenure', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter loan tenure in months"
                  />
                </div>
              </div>
            </div>

            {/* EMI Schedule Settings */}
            <div>
              <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                EMI Schedule Settings
              </h4>
              
              {/* EMI Preview */}
              {emiVoucher.startDate && emiVoucher.emiTime && emiVoucher.amount && (
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-800">EMI Schedule Preview</p>
                      <p className="text-sm text-blue-600 mt-1">
                        {calculateEmiPreview()}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* EMI Start Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    EMI Start Date *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="date"
                      value={emiVoucher.startDate}
                      onChange={(e) => onEmiVoucherChange('startDate', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    First EMI payment date
                  </p>
                </div>

                {/* EMI Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Exact EMI Time (HH:MM) *
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="time"
                      value={emiVoucher.emiTime}
                      onChange={(e) => onEmiVoucherChange('emiTime', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Time when EMI will be debited
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {/* Frequency */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Frequency *
                  </label>
                  <select
                    value={emiVoucher.frequency}
                    onChange={(e) => onEmiVoucherChange('frequency', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="halfYearly">Half-Yearly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-2">
                    EMI payment frequency
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interest Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={emiVoucher.interestRate}
                    onChange={(e) => onEmiVoucherChange('interestRate', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter annual interest rate"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Loan Amount (₹)
                </label>
                <input
                  type="number"
                  value={emiVoucher.loanAmount}
                  onChange={(e) => onEmiVoucherChange('loanAmount', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter total loan amount"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Calculated total: {formatCurrency(emiVoucher.amount * emiVoucher.tenure)}
                </p>
              </div>

              {/* Validation Message */}
              {(!emiVoucher.startDate || !emiVoucher.emiTime || !emiVoucher.customerName || !emiVoucher.amount) && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-800">Required Fields Missing</p>
                      <p className="text-sm text-red-600 mt-1">
                        Please fill all required fields including Customer Name, EMI Amount, Start Date, and EMI Time.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-gray-200 px-6 py-4 bg-gray-50">
          <button
            onClick={onClose}
            className="px-5 py-2.5 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            disabled={!emiVoucher.startDate || !emiVoucher.emiTime || !emiVoucher.customerName || !emiVoucher.amount}
            className={`px-5 py-2.5 rounded-xl font-medium shadow-sm transition-all ${
              (!emiVoucher.startDate || !emiVoucher.emiTime || !emiVoucher.customerName || !emiVoucher.amount) 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800'
            }`}
          >
            {mode === 'add' ? 'Create EMI Voucher' : 'Update EMI Voucher'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmiForm;