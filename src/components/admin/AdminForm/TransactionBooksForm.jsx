import React, { useState } from 'react';
import Button from '../common/Button';

const TransactionBooksForm = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex  items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 px-6 py-4 flex justify-between items-center">
          <h2 className="text-white text-xl font-semibold">New Transaction</h2>
          <button onClick={onClose} className="text-white hover:text-gray-200 text-2xl">&times;</button>
        </div>

        {/* Form */}
        <form className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Date Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" defaultValue="2024-03-15" />
            </div>
            
            {/* Voucher No */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Voucher No</label>
              <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="CB-002" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Book Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Book</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none">
                <option>Cash Book</option>
                <option>Bank Book</option>
              </select>
            </div>

            {/* Transaction Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none">
                <option className="text-green-600">Credit (Incoming)</option>
                <option className="text-red-600">Debit (Outgoing)</option>
              </select>
            </div>
          </div>

          {/* Particulars */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Particulars</label>
            <textarea rows="3" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Enter transaction details..."></textarea>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
            <input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none font-bold text-lg" placeholder="0.00" />
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
            <Button 
              type="button"
              onClick={onClose}
              className="bg-gray-500 border border-gray-300 rounded-xl text-white-700 font-medium hover:bg-red-500"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-md transition-all"
            >
              Save Transaction
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionBooksForm;