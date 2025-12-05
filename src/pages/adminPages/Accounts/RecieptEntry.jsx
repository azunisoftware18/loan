import React, { useState } from "react";
import {
  Save,
  X,
  Receipt,
  User,
  CreditCard,
  Calendar,
  IndianRupee,
  FileText,
  Banknote,
  TrendingUp,
  Download,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  Smartphone,
  Mail,
  Building,
  UserCheck,
  BarChart3,
  Printer,
  Send,
  Copy,
  AlertCircle
} from "lucide-react";

export default function ReceiptEntry() {
  const [form, setForm] = useState({
    receiptNo: `RCT-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
    receiptDate: new Date().toISOString().split("T")[0],
    payerName: "",
    paymentMode: "",
    amount: "",
    narration: "",
    loanAccountNo: "",
    contactNo: "",
    email: "",
    branch: "",
    collectedBy: "",
    transactionId: ""
  });

  const [receipts, setReceipts] = useState([
    { id: 1, receiptNo: "RCT-2024-001", receiptDate: "2024-03-15", payerName: "Ramesh Kumar", paymentMode: "UPI", amount: 25000, status: "success", loanAccountNo: "LA-1001", branch: "Delhi Main", collectedBy: "Amit Sharma" },
    { id: 2, receiptNo: "RCT-2024-002", receiptDate: "2024-03-14", payerName: "Sita Devi", paymentMode: "Cash", amount: 15000, status: "success", loanAccountNo: "LA-1002", branch: "Mumbai West", collectedBy: "Priya Patel" },
    { id: 3, receiptNo: "RCT-2024-003", receiptDate: "2024-03-13", payerName: "Ajay Singh", paymentMode: "Bank Transfer", amount: 35000, status: "pending", loanAccountNo: "LA-1003", branch: "Bangalore South", collectedBy: "Rajesh Kumar" },
  ]);

  const [stats, setStats] = useState({
    todayCollection: 125000,
    monthlyCollection: 1850000,
    pendingReceipts: 3,
    activeLoans: 42
  });

  const [activeTab, setActiveTab] = useState("create");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const resetForm = () =>
    setForm({
      receiptNo: `RCT-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      receiptDate: new Date().toISOString().split("T")[0],
      payerName: "",
      paymentMode: "",
      amount: "",
      narration: "",
      loanAccountNo: "",
      contactNo: "",
      email: "",
      branch: "",
      collectedBy: "",
      transactionId: ""
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReceipt = {
      id: receipts.length + 1,
      ...form,
      amount: parseFloat(form.amount),
      status: "success"
    };
    setReceipts([newReceipt, ...receipts]);
    
    setStats(prev => ({
      ...prev,
      todayCollection: prev.todayCollection + parseFloat(form.amount || 0),
      monthlyCollection: prev.monthlyCollection + parseFloat(form.amount || 0)
    }));
    
    alert("Receipt saved successfully!");
    resetForm();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this receipt?")) {
      setReceipts(receipts.filter(receipt => receipt.id !== id));
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const generateReceiptNo = () => {
    const newNo = `RCT-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
    setForm({...form, receiptNo: newNo});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6">
      
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl">
                <Receipt className="text-white" size={28} />
              </div>
              <span>Receipt Management</span>
            </h1>
            <p className="text-gray-600 mt-2">
              Create, view, and manage all loan payment receipts
            </p>
          </div>

          <div className="flex gap-3 mt-4 md:mt-0">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors">
              <Download size={18} />
              Export
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors">
              <Plus size={18} />
              New Receipt
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 border-l-4 border-blue-500 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Today's Collection</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{formatCurrency(stats.todayCollection)}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <Banknote className="text-blue-600" size={24} />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3">
              <TrendingUp size={16} className="text-green-500" />
              <span className="text-sm text-green-600">+12.5% from yesterday</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border-l-4 border-green-500 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Monthly Collection</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{formatCurrency(stats.monthlyCollection)}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <BarChart3 className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border-l-4 border-orange-500 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending Receipts</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{stats.pendingReceipts}</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg">
                <FileText className="text-orange-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border-l-4 border-purple-500 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Loans</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{stats.activeLoans}</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <UserCheck className="text-purple-600" size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Panel - Form */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200">
              <div className="flex">
                <button
                  onClick={() => setActiveTab("create")}
                  className={`px-6 py-4 font-medium transition-colors ${activeTab === "create" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
                >
                  Create New Receipt
                </button>
                <button
                  onClick={() => setActiveTab("recent")}
                  className={`px-6 py-4 font-medium transition-colors ${activeTab === "recent" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
                >
                  Recent Receipts
                </button>
              </div>
            </div>

            <div className="p-6">
              {activeTab === "create" ? (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Receipt Number */}
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block flex items-center gap-2">
                        <FileText size={16} className="text-gray-500" />
                        Receipt Number
                      </label>
                      <div className="flex gap-2">
                        <input
                          name="receiptNo"
                          value={form.receiptNo}
                          onChange={handleChange}
                          placeholder="Auto-generated or enter manually"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                          type="button"
                          onClick={generateReceiptNo}
                          className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 whitespace-nowrap"
                        >
                          Generate
                        </button>
                      </div>
                    </div>

                    {/* Receipt Date */}
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block flex items-center gap-2">
                        <Calendar size={16} className="text-gray-500" />
                        Receipt Date
                      </label>
                      <input
                        type="date"
                        name="receiptDate"
                        value={form.receiptDate}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    {/* Payer Name */}
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block flex items-center gap-2">
                        <User size={16} className="text-gray-500" />
                        Payer Name
                      </label>
                      <input
                        name="payerName"
                        value={form.payerName}
                        onChange={handleChange}
                        placeholder="Enter payer's full name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    {/* Loan Account No */}
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block flex items-center gap-2">
                        <FileText size={16} className="text-gray-500" />
                        Loan Account No
                      </label>
                      <input
                        name="loanAccountNo"
                        value={form.loanAccountNo}
                        onChange={handleChange}
                        placeholder="LA-XXXX"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    {/* Contact Number */}
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block flex items-center gap-2">
                        <Smartphone size={16} className="text-gray-500" />
                        Contact Number
                      </label>
                      <input
                        name="contactNo"
                        value={form.contactNo}
                        onChange={handleChange}
                        placeholder="+91 XXXXXXXXXX"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    {/* Email Address */}
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block flex items-center gap-2">
                        <Mail size={16} className="text-gray-500" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="payer@example.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    {/* Payment Mode */}
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block flex items-center gap-2">
                        <CreditCard size={16} className="text-gray-500" />
                        Payment Mode
                      </label>
                      <select
                        name="paymentMode"
                        value={form.paymentMode}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select payment mode</option>
                        <option value="Cash">Cash</option>
                        <option value="UPI">UPI</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                        <option value="Cheque">Cheque</option>
                        <option value="Credit Card">Credit Card</option>
                        <option value="Debit Card">Debit Card</option>
                      </select>
                    </div>

                    {/* Branch */}
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block flex items-center gap-2">
                        <Building size={16} className="text-gray-500" />
                        Branch
                      </label>
                      <select
                        name="branch"
                        value={form.branch}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select branch</option>
                        <option value="Delhi Main">Delhi Main</option>
                        <option value="Mumbai West">Mumbai West</option>
                        <option value="Bangalore South">Bangalore South</option>
                        <option value="Chennai Central">Chennai Central</option>
                      </select>
                    </div>

                    {/* Amount */}
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block flex items-center gap-2">
                        <IndianRupee size={16} className="text-gray-500" />
                        Amount (₹)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2 text-gray-500">₹</span>
                        <input
                          type="number"
                          name="amount"
                          value={form.amount}
                          onChange={handleChange}
                          placeholder="Enter amount"
                          className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    {/* Collected By */}
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block flex items-center gap-2">
                        <UserCheck size={16} className="text-gray-500" />
                        Collected By
                      </label>
                      <input
                        name="collectedBy"
                        value={form.collectedBy}
                        onChange={handleChange}
                        placeholder="Collector's name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    {/* Transaction ID */}
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block flex items-center gap-2">
                        <Copy size={16} className="text-gray-500" />
                        Transaction ID (Optional)
                      </label>
                      <input
                        name="transactionId"
                        value={form.transactionId}
                        onChange={handleChange}
                        placeholder="For UPI/Bank transfers"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    {/* Narration */}
                    <div className="md:col-span-2">
                      <label className="text-sm font-medium text-gray-700 mb-2 block flex items-center gap-2">
                        <FileText size={16} className="text-gray-500" />
                        Narration
                      </label>
                      <textarea
                        name="narration"
                        value={form.narration}
                        onChange={handleChange}
                        placeholder="Additional notes or description"
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
                    <button
                      onClick={resetForm}
                      type="button"
                      className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center gap-2 font-medium transition-colors"
                    >
                      <X size={18} /> Clear All
                    </button>

                    <button
                      type="submit"
                      className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 flex items-center gap-2 font-medium shadow-md transition-all hover:shadow-lg"
                    >
                      <Save size={18} /> Save Receipt
                    </button>
                  </div>
                </form>
              ) : (
                /* Recent Receipts Tab */
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        placeholder="Search receipts..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>All Status</option>
                      <option>Completed</option>
                      <option>Pending</option>
                    </select>
                  </div>
                  
                  <div className="space-y-4">
                    {receipts.map((receipt) => (
                      <div key={receipt.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-gray-800">{receipt.receiptNo}</span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${receipt.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                {receipt.status === 'success' ? 'Completed' : 'Pending'}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{receipt.payerName} • {receipt.loanAccountNo}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg text-gray-800">{formatCurrency(receipt.amount)}</p>
                            <p className="text-sm text-gray-500">{receipt.paymentMode}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar size={14} />
                              {receipt.receiptDate}
                            </span>
                            <span className="flex items-center gap-1">
                              <Building size={14} />
                              {receipt.branch}
                            </span>
                            <span className="flex items-center gap-1">
                              <UserCheck size={14} />
                              {receipt.collectedBy}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors">
                              <Eye size={18} />
                            </button>
                            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded transition-colors">
                              <Edit size={18} />
                            </button>
                            <button 
                              onClick={() => handleDelete(receipt.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel - Summary & Actions */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <CheckCircle size={20} className="text-blue-600" />
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button className="w-full p-3 border border-gray-300 rounded-lg text-left hover:bg-gray-50 flex items-center gap-3 transition-colors">
                <div className="p-2 bg-blue-50 rounded">
                  <Download size={18} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Download All Receipts</p>
                  <p className="text-sm text-gray-500">PDF & Excel format</p>
                </div>
              </button>
              <button className="w-full p-3 border border-gray-300 rounded-lg text-left hover:bg-gray-50 flex items-center gap-3 transition-colors">
                <div className="p-2 bg-green-50 rounded">
                  <Printer size={18} className="text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Print Receipt</p>
                  <p className="text-sm text-gray-500">Current receipt</p>
                </div>
              </button>
              <button className="w-full p-3 border border-gray-300 rounded-lg text-left hover:bg-gray-50 flex items-center gap-3 transition-colors">
                <div className="p-2 bg-purple-50 rounded">
                  <Send size={18} className="text-purple-600" />
                </div>
                <div>
                  <p className="font-medium">Email Receipt</p>
                  <p className="text-sm text-gray-500">Send to payer</p>
                </div>
              </button>
              <button className="w-full p-3 border border-gray-300 rounded-lg text-left hover:bg-gray-50 flex items-center gap-3 transition-colors">
                <div className="p-2 bg-orange-50 rounded">
                  <Filter size={18} className="text-orange-600" />
                </div>
                <div>
                  <p className="font-medium">Filter Receipts</p>
                  <p className="text-sm text-gray-500">By date, branch, status</p>
                </div>
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-lg p-6 text-white mb-6">
            <h3 className="font-bold text-xl mb-4">Receipt Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Total Receipts Today</span>
                <span className="font-bold">5</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Total Amount Today</span>
                <span className="font-bold">{formatCurrency(stats.todayCollection)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Average Receipt Value</span>
                <span className="font-bold">{formatCurrency(stats.todayCollection / 5)}</span>
              </div>
              <div className="pt-4 border-t border-blue-500">
                <div className="flex justify-between items-center">
                  <span>Monthly Target</span>
                  <span className="font-bold">{formatCurrency(2000000)}</span>
                </div>
                <div className="w-full bg-blue-800 rounded-full h-2 mt-2">
                  <div 
                    className="bg-green-400 h-2 rounded-full" 
                    style={{ width: `${(stats.monthlyCollection / 2000000) * 100}%` }}
                  ></div>
                </div>
                <div className="text-sm text-blue-200 mt-1">
                  {((stats.monthlyCollection / 2000000) * 100).toFixed(1)}% completed
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <AlertCircle size={20} className="text-orange-600" />
              Important Notes
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-gray-600">
                <div className="mt-1">•</div>
                <p>Always verify payer identity and loan account details</p>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-600">
                <div className="mt-1">•</div>
                <p>Keep digital copies for minimum 7 years as per regulations</p>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-600">
                <div className="mt-1">•</div>
                <p>Send payment confirmation SMS/Email immediately after receipt</p>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-600">
                <div className="mt-1">•</div>
                <p>Reconcile receipts with bank statements daily</p>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-600">
                <div className="mt-1">•</div>
                <p>Report any discrepancies to branch manager immediately</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}