import React from "react";
import { X } from "lucide-react";
import Button from "../common/Button";

const AddAccountForm = ({
  isOpen,
  onClose,
  modalMode,
  formData,
  onFormChange,
  onSave,
  branchOptions
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex  items-center justify-center z-50 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl border border-gray-200">
        <div className="flex items-center rounded-t-2xl bg-blue-600 justify-between border-b border-gray-200 px-6 py-4">
          <div >
            <h3 className="text-lg font-semibold text-white">
              {modalMode === "add" ? "Add New Account" : "Edit Account"}
            </h3>
            <p className="text-sm text-white mt-1">
              {modalMode === "add" ? "Create a new account entry" : "Update the account details"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:text-gray-200"
          >
            <X className="h-5 w-5 text-white" />
          </button>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Name *
                </label>
                <input
                  value={formData.name || ""}
                  onChange={(e) => onFormChange("name", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter account name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Group *
                </label>
                <input
                  value={formData.group || ""}
                  onChange={(e) => onFormChange("group", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter group name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Open Date
                  </label>
                  <input
                    type="date"
                    value={formData.openDate || ""}
                    onChange={(e) => onFormChange("openDate", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category || "Asset"}
                    onChange={(e) => onFormChange("category", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Asset">Asset</option>
                    <option value="Liability">Liability</option>
                    <option value="Income">Income</option>
                    <option value="Expense">Expense</option>
                    <option value="Creditor">Creditor</option>
                    <option value="Debtor">Debtor</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Opening Balance
                </label>
                <input
                  value={formData.openingBalance || ""}
                  onChange={(e) => onFormChange("openingBalance", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0.00"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Chargeable
                  </label>
                  <select
                    value={formData.loanChargeable || "No"}
                    onChange={(e) => onFormChange("loanChargeable", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GST Enable
                  </label>
                  <select
                    value={formData.gstEnable || "No"}
                    onChange={(e) => onFormChange("gstEnable", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Branch
                </label>
                <select
                  value={formData.branch || "Global"}
                  onChange={(e) => onFormChange("branch", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {branchOptions.filter(b => b !== "All").map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={formData.status || "active"}
                  onChange={(e) => onFormChange("status", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-gray-200 px-6 py-4">
          <Button
            onClick={onClose}
            className="bg-gray-500 border border-gray-300 rounded-xl text-white-700 font-medium hover:bg-red-500"
          >
            Cancel
          </Button>
          <Button
            onClick={onSave}
          >
            {modalMode === "add" ? "Create Account" : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddAccountForm;