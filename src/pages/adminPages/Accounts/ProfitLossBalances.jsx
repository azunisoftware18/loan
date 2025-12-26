import React, { useState } from "react";
import { Download, Printer, TrendingUp, IndianRupee, Building, BarChart3, PieChart, FileText, Calendar, ChevronRight, RefreshCw, DownloadCloud, Share2, Target, AlertCircle, CheckCircle, } from "lucide-react";
import ExportButton from "../../../components/admin/AdminButtons/ExportButton";
import StatusCard from "../../../components/admin/common/StatusCard";
import Button from "../../../components/admin/common/Button";

const ProfitLossBalances = () => {
  const [activeTab, setActiveTab] = useState("profitLoss"); // 'profitLoss', 'balanceSheet', 'branchwise'
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [dateRange, setDateRange] = useState("thisMonth");
  const [expandedSections, setExpandedSections] = useState({
    revenue: true,
    expenses: true,
    assets: true,
    liabilities: true,
  });

  // Branch options
  const branches = [
    { id: "all", name: "All Branches", revenue: 2450000, profit: 365000 },
    { id: "main", name: "Main Branch", revenue: 1200000, profit: 185000 },
    { id: "north", name: "North Branch", revenue: 750000, profit: 110000 },
    { id: "south", name: "South Branch", revenue: 500000, profit: 70000 },
  ];

  // Profit & Loss Data
  const profitLossData = {
    revenue: [
      { id: 1, name: "Sales Revenue", amount: 1500000, growth: 12.5 },
      { id: 2, name: "Service Revenue", amount: 750000, growth: 8.2 },
      { id: 3, name: "Other Income", amount: 200000, growth: -3.4 },
    ],
    cogs: [{ id: 4, name: "Cost of Goods Sold", amount: 900000, growth: 10.2 }],
    expenses: [
      { id: 5, name: "Employee Salaries", amount: 450000, growth: 15.0 },
      { id: 6, name: "Rent & Utilities", amount: 120000, growth: 5.0 },
      { id: 7, name: "Marketing & Advertising", amount: 75000, growth: 25.0 },
      { id: 8, name: "Office Expenses", amount: 30000, growth: 8.0 },
      { id: 9, name: "Depreciation", amount: 50000, growth: 0.0 },
      { id: 10, name: "Other Expenses", amount: 20000, growth: 3.0 },
    ],
    summary: {
      totalRevenue: 2450000,
      totalCOGS: 900000,
      grossProfit: 1550000,
      totalExpenses: 745000,
      netProfit: 805000,
      profitMargin: 32.86,
    },
  };

  // Balance Sheet Data
  const balanceSheetData = {
    currentDate: "31 Mar 2024",
    assets: {
      currentAssets: [
        { id: 1, name: "Cash & Cash Equivalents", amount: 850000 },
        { id: 2, name: "Accounts Receivable", amount: 450000 },
        { id: 3, name: "Inventory", amount: 600000 },
        { id: 4, name: "Prepaid Expenses", amount: 75000 },
      ],
      fixedAssets: [
        { id: 5, name: "Property, Plant & Equipment", amount: 2500000 },
        {
          id: 6,
          name: "Less: Accumulated Depreciation",
          amount: 500000,
          isNegative: true,
        },
        { id: 7, name: "Intangible Assets", amount: 150000 },
      ],
      totalAssets: 4025000,
    },
    liabilities: {
      currentLiabilities: [
        { id: 8, name: "Accounts Payable", amount: 350000 },
        { id: 9, name: "Short-term Loans", amount: 200000 },
        { id: 10, name: "Accrued Expenses", amount: 125000 },
      ],
      longTermLiabilities: [
        { id: 11, name: "Long-term Debt", amount: 1500000 },
        { id: 12, name: "Deferred Tax Liability", amount: 75000 },
      ],
      totalLiabilities: 2250000,
    },
    equity: [
      { id: 13, name: "Share Capital", amount: 1000000 },
      { id: 14, name: "Retained Earnings", amount: 775000 },
      { id: 15, name: "Current Year Profit", amount: 805000 },
    ],
    totalEquity: 2580000,
    totalLiabilitiesAndEquity: 4830000,
  };

  // Branch-wise Comparison Data
  const branchComparisonData = [
    {
      branch: "Main Branch",
      revenue: 1200000,
      expenses: 1015000,
      netProfit: 185000,
      profitMargin: 15.42,
      assets: 2100000,
      liabilities: 1200000,
      equity: 900000,
      performance: "excellent",
    },
    {
      branch: "North Branch",
      revenue: 750000,
      expenses: 640000,
      netProfit: 110000,
      profitMargin: 14.67,
      assets: 1250000,
      liabilities: 750000,
      equity: 500000,
      performance: "good",
    },
    {
      branch: "South Branch",
      revenue: 500000,
      expenses: 430000,
      netProfit: 70000,
      profitMargin: 14.0,
      assets: 850000,
      liabilities: 550000,
      equity: 300000,
      performance: "satisfactory",
    },
    {
      branch: "East Branch",
      revenue: 0,
      expenses: 0,
      netProfit: 0,
      profitMargin: 0,
      assets: 0,
      liabilities: 0,
      equity: 0,
      performance: "inactive",
    },
  ];

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format percentage
  const formatPercentage = (value) => {
    return `${value.toFixed(2)}%`;
  };

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Render Profit & Loss section
  const renderProfitLoss = () => (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatusCard
          title="Total Revenue"
          value={formatCurrency(profitLossData.summary.totalRevenue)}
          icon={TrendingUp}
          iconColor="green"
          subtext={
            <span className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-xs text-green-600 font-medium">
                +12.5% from last month
              </span>
            </span>
          }
        />

        <StatusCard
          title="Gross Profit"
          value={formatCurrency(profitLossData.summary.grossProfit)}
          icon={BarChart3}
          iconColor="orange"
          subtext={
            <span className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-xs text-green-600 font-medium">
                +8.7% from last month
              </span>
            </span>
          }
        />

        <StatusCard
          title="Net Profit"
          value={formatCurrency(profitLossData.summary.netProfit)}
          icon={IndianRupee}
          iconColor="blue"
          subtext={
            <span className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-xs text-green-600 font-medium">
                +15.2% from last month
              </span>
            </span>
          }
        />

        <StatusCard
          title="Profit Margin"
          value={formatPercentage(profitLossData.summary.profitMargin)}
          icon={Target}
          iconColor="red"
          subtext={
            <span className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-xs text-green-600 font-medium">
                +2.1% from last month
              </span>
            </span>
          }
        />
      </div>

      {/* Detailed P&L Statement */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Profit & Loss Statement
              </h3>
              <p className="text-sm text-gray-600">
                For the period ending 31 Mar 2024
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button >
                Compare Periods
              </Button>
              <Button >
                Detailed View
              </Button>
            </div>
          </div>
        </div>

        {/* Revenue Section */}
        <div className="border-b border-gray-200">
          <button
            onClick={() => toggleSection("revenue")}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <ChevronRight
                className={`h-4 w-4 transition-transform ${expandedSections.revenue ? "rotate-90" : ""
                  }`}
              />
              <h4 className="font-semibold text-gray-900">Revenue</h4>
              <span className="text-sm text-gray-600">(Operating Income)</span>
            </div>
            <div className="text-lg font-bold text-green-600">
              {formatCurrency(profitLossData.summary.totalRevenue)}
            </div>
          </button>

          {expandedSections.revenue && (
            <div className="px-6 pb-4">
              {profitLossData.revenue.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex items-center gap-3 pl-6">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`text-sm ${item.growth >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                    >
                      {item.growth >= 0 ? "+" : ""}
                      {item.growth}%
                    </span>
                    <span className="font-medium">
                      {formatCurrency(item.amount)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cost of Goods Sold */}
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-gray-700">Cost of Goods Sold</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-red-600">+10.2%</span>
              <span className="font-medium text-red-600">
                {formatCurrency(profitLossData.cogs[0].amount)}
              </span>
            </div>
          </div>
        </div>

        {/* Gross Profit */}
        <div className="border-b border-gray-200 px-6 py-4 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span className="font-semibold text-gray-900">Gross Profit</span>
            </div>
            <div className="text-lg font-bold text-emerald-600">
              {formatCurrency(profitLossData.summary.grossProfit)}
            </div>
          </div>
        </div>

        {/* Expenses Section */}
        <div className="border-b border-gray-200">
          <button
            onClick={() => toggleSection("expenses")}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <ChevronRight
                className={`h-4 w-4 transition-transform ${expandedSections.expenses ? "rotate-90" : ""
                  }`}
              />
              <h4 className="font-semibold text-gray-900">
                Operating Expenses
              </h4>
            </div>
            <div className="text-lg font-bold text-red-600">
              {formatCurrency(profitLossData.summary.totalExpenses)}
            </div>
          </button>

          {expandedSections.expenses && (
            <div className="px-6 pb-4">
              {profitLossData.expenses.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex items-center gap-3 pl-6">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-700">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`text-sm ${item.growth >= 0 ? "text-red-600" : "text-green-600"
                        }`}
                    >
                      {item.growth >= 0 ? "+" : ""}
                      {item.growth}%
                    </span>
                    <span className="font-medium">
                      {formatCurrency(item.amount)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Net Profit */}
        <div className="px-6 py-6 bg-blue-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              <h4 className="text-lg font-bold text-gray-900">
                Net Profit / (Loss)
              </h4>
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {formatCurrency(profitLossData.summary.netProfit)}
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            Profit Margin:{" "}
            {formatPercentage(profitLossData.summary.profitMargin)}
          </div>
        </div>
      </div>


    </div>
  );

  // Render Balance Sheet
  const renderBalanceSheet = () => (
    <div className="space-y-6">
      {/* Balance Sheet Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Balance Sheet
            </h3>
            <p className="text-sm text-gray-600">
              As of {balanceSheetData.currentDate}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button>
              Previous Period
            </Button>
            <Button >
              Generate Report
            </Button>
          </div>
        </div>

        {/* Balance Sheet Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Assets */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900">ASSETS</h4>
              <div className="text-lg font-bold text-blue-600">
                {formatCurrency(balanceSheetData.assets.totalAssets)}
              </div>
            </div>

            {/* Current Assets */}
            <div className="mb-6">
              <button
                onClick={() => toggleSection("assets")}
                className="w-full flex items-center justify-between py-2 hover:bg-gray-50 rounded-lg px-2"
              >
                <div className="flex items-center gap-2">
                  <ChevronRight
                    className={`h-4 w-4 transition-transform ${expandedSections.assets ? "rotate-90" : ""
                      }`}
                  />
                  <span className="font-medium text-gray-700">
                    Current Assets
                  </span>
                </div>
                <span className="font-medium">
                  {formatCurrency(
                    balanceSheetData.assets.currentAssets.reduce(
                      (sum, asset) => sum + asset.amount,
                      0
                    )
                  )}
                </span>
              </button>

              {expandedSections.assets && (
                <div className="pl-6 space-y-2 mt-2">
                  {balanceSheetData.assets.currentAssets.map((asset) => (
                    <div
                      key={asset.id}
                      className="flex items-center justify-between py-1"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-700">{asset.name}</span>
                      </div>
                      <span className="font-medium">
                        {formatCurrency(asset.amount)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Fixed Assets */}
            <div>
              <div className="flex items-center justify-between py-2 px-2">
                <span className="font-medium text-gray-700">Fixed Assets</span>
                <span className="font-medium">
                  {formatCurrency(
                    balanceSheetData.assets.fixedAssets.reduce(
                      (sum, asset) =>
                        sum + (asset.isNegative ? -asset.amount : asset.amount),
                      0
                    )
                  )}
                </span>
              </div>
              <div className="pl-6 space-y-2">
                {balanceSheetData.assets.fixedAssets.map((asset) => (
                  <div
                    key={asset.id}
                    className="flex items-center justify-between py-1"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      <span
                        className={`${asset.isNegative ? "text-red-600" : "text-gray-700"
                          }`}
                      >
                        {asset.name}
                      </span>
                    </div>
                    <span
                      className={`font-medium ${asset.isNegative ? "text-red-600" : ""
                        }`}
                    >
                      {asset.isNegative ? "-" : ""}
                      {formatCurrency(asset.amount)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Liabilities & Equity */}
          <div>
            {/* Liabilities */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-900">LIABILITIES</h4>
                <div className="text-lg font-bold text-orange-600">
                  {formatCurrency(
                    balanceSheetData.liabilities.totalLiabilities
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between py-2 px-2">
                  <span className="font-medium text-gray-700">
                    Current Liabilities
                  </span>
                  <span className="font-medium">
                    {formatCurrency(
                      balanceSheetData.liabilities.currentLiabilities.reduce(
                        (sum, liability) => sum + liability.amount,
                        0
                      )
                    )}
                  </span>
                </div>
                <div className="pl-6 space-y-2">
                  {balanceSheetData.liabilities.currentLiabilities.map(
                    (liability) => (
                      <div
                        key={liability.id}
                        className="flex items-center justify-between py-1"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                          <span className="text-gray-700">
                            {liability.name}
                          </span>
                        </div>
                        <span className="font-medium">
                          {formatCurrency(liability.amount)}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between py-2 px-2">
                  <span className="font-medium text-gray-700">
                    Long-term Liabilities
                  </span>
                  <span className="font-medium">
                    {formatCurrency(
                      balanceSheetData.liabilities.longTermLiabilities.reduce(
                        (sum, liability) => sum + liability.amount,
                        0
                      )
                    )}
                  </span>
                </div>
                <div className="pl-6 space-y-2">
                  {balanceSheetData.liabilities.longTermLiabilities.map(
                    (liability) => (
                      <div
                        key={liability.id}
                        className="flex items-center justify-between py-1"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                          <span className="text-gray-700">
                            {liability.name}
                          </span>
                        </div>
                        <span className="font-medium">
                          {formatCurrency(liability.amount)}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Equity */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-900">EQUITY</h4>
                <div className="text-lg font-bold text-green-600">
                  {formatCurrency(balanceSheetData.totalEquity)}
                </div>
              </div>

              <div className="space-y-2">
                {balanceSheetData.equity.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between py-1"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700">{item.name}</span>
                    </div>
                    <span className="font-medium">
                      {formatCurrency(item.amount)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Totals */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {formatCurrency(balanceSheetData.assets.totalAssets)}
              </div>
              <div className="text-sm font-medium text-gray-700">
                Total Assets
              </div>
            </div>
            <div className="text-center p-4 bg-emerald-50 rounded-lg">
              <div className="text-2xl font-bold text-emerald-600">
                {formatCurrency(balanceSheetData.totalLiabilitiesAndEquity)}
              </div>
              <div className="text-sm font-medium text-gray-700">
                Total Liabilities & Equity
              </div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <div
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${Math.abs(
                balanceSheetData.assets.totalAssets -
                balanceSheetData.totalLiabilitiesAndEquity
              ) < 1000
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
                }`}
            >
              {Math.abs(
                balanceSheetData.assets.totalAssets -
                balanceSheetData.totalLiabilitiesAndEquity
              ) < 1000 ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-1" /> Balance Sheet Matches
                </>
              ) : (
                <>
                  <AlertCircle className="h-4 w-4 mr-1" /> Balance Sheet Does
                  Not Match
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render Branch-wise Comparison
  const renderBranchwise = () => (
    <div className="space-y-6">
      {/* Branch Selection */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Branch-wise Financial Comparison
            </h3>
            <p className="text-sm text-gray-600">
              Performance analysis across all branches
            </p>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
            >
              {branches.map((branch) => (
                <option key={branch.id} value={branch.id}>
                  {branch.name}
                </option>
              ))}
            </select>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
            >
              <option value="thisMonth">This Month</option>
              <option value="lastMonth">Last Month</option>
              <option value="thisQuarter">This Quarter</option>
              <option value="thisYear">This Year</option>
            </select>
          </div>
        </div>

        {/* Branch Performance Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {branches.map((branch) => (
            <div
              key={branch.id}
              className={`p-4 rounded-lg border ${selectedBranch === branch.id || selectedBranch === "all"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 bg-white"
                }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">{branch.name}</span>
                {selectedBranch === branch.id && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {formatCurrency(branch.revenue)}
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-gray-600">Profit</span>
                <span className="text-sm font-medium text-green-600">
                  {formatCurrency(branch.profit)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Performance Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                  Branch
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                  Revenue
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                  Expenses
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                  Net Profit
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                  Profit Margin
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                  Performance
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {branchComparisonData.map((branch, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">{branch.branch}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium">
                    {formatCurrency(branch.revenue)}
                  </td>
                  <td className="px-4 py-3 font-medium text-red-600">
                    {formatCurrency(branch.expenses)}
                  </td>
                  <td className="px-4 py-3 font-bold text-green-600">
                    {formatCurrency(branch.netProfit)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`font-medium ${branch.profitMargin > 15
                        ? "text-green-600"
                        : branch.profitMargin > 10
                          ? "text-yellow-600"
                          : "text-red-600"
                        }`}
                    >
                      {formatPercentage(branch.profitMargin)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${branch.performance === "excellent"
                        ? "bg-green-100 text-green-800"
                        : branch.performance === "good"
                          ? "bg-blue-100 text-blue-800"
                          : branch.performance === "satisfactory"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                    >
                      {branch.performance.charAt(0).toUpperCase() +
                        branch.performance.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


    </div>
  );


  const handleExport = () => {
    let headers = [];
    let rows = [];
    let fileName = "";

    // ---------------- PROFIT & LOSS ----------------
    if (activeTab === "profitLoss") {
      fileName = "Profit_and_Loss_Report";

      headers = ["Category", "Name", "Amount", "Growth %"];

      const revenueRows = profitLossData.revenue.map(item => [
        "Revenue",
        item.name,
        item.amount,
        item.growth,
      ]);

      const expenseRows = profitLossData.expenses.map(item => [
        "Expense",
        item.name,
        item.amount,
        item.growth,
      ]);

      const summaryRows = [
        ["Summary", "Total Revenue", profitLossData.summary.totalRevenue, ""],
        ["Summary", "Gross Profit", profitLossData.summary.grossProfit, ""],
        ["Summary", "Total Expenses", profitLossData.summary.totalExpenses, ""],
        ["Summary", "Net Profit", profitLossData.summary.netProfit, ""],
        ["Summary", "Profit Margin (%)", profitLossData.summary.profitMargin, ""],
      ];

      rows = [...revenueRows, ...expenseRows, ...summaryRows];
    }

    // ---------------- BALANCE SHEET ----------------
    if (activeTab === "balanceSheet") {
      fileName = "Balance_Sheet_Report";

      headers = ["Type", "Name", "Amount"];

      const assetRows = [
        ...balanceSheetData.assets.currentAssets.map(a => [
          "Current Asset",
          a.name,
          a.amount,
        ]),
        ...balanceSheetData.assets.fixedAssets.map(a => [
          "Fixed Asset",
          a.name,
          a.isNegative ? -a.amount : a.amount,
        ]),
      ];

      const liabilityRows = [
        ...balanceSheetData.liabilities.currentLiabilities.map(l => [
          "Current Liability",
          l.name,
          l.amount,
        ]),
        ...balanceSheetData.liabilities.longTermLiabilities.map(l => [
          "Long Term Liability",
          l.name,
          l.amount,
        ]),
      ];

      const equityRows = balanceSheetData.equity.map(e => [
        "Equity",
        e.name,
        e.amount,
      ]);

      rows = [
        ...assetRows,
        ...liabilityRows,
        ...equityRows,
        ["Total", "Total Assets", balanceSheetData.assets.totalAssets],
        [
          "Total",
          "Total Liabilities & Equity",
          balanceSheetData.totalLiabilitiesAndEquity,
        ],
      ];
    }

    // ---------------- BRANCH WISE ----------------
    if (activeTab === "branchwise") {
      fileName = "Branchwise_Financial_Report";

      headers = [
        "Branch",
        "Revenue",
        "Expenses",
        "Net Profit",
        "Profit Margin %",
        "Performance",
      ];

      rows = branchComparisonData.map(branch => [
        branch.branch,
        branch.revenue,
        branch.expenses,
        branch.netProfit,
        branch.profitMargin,
        branch.performance,
      ]);
    }

    if (!rows.length) {
      alert("No data available for export");
      return;
    }

    // ---------------- CSV CREATE ----------------
    const csvContent =
      [headers, ...rows]
        .map(row => row.map(col => `"${col ?? ""}"`).join(","))
        .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${fileName}_${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-blue-600" />
              Financial Reports
            </h1>
            <p className="text-gray-600 mt-1">
              Profit & Loss, Balance Sheet, and Branch-wise Analysis
            </p>
          </div>

          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <ExportButton onClick={handleExport} />
          </div>
        </div>


      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab("profitLoss")}
              className={`
                flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2
                ${activeTab === "profitLoss"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }
              `}
            >
              <TrendingUp className="h-4 w-4" />
              Profit & Loss
            </button>
            <button
              onClick={() => setActiveTab("balanceSheet")}
              className={`
                flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2
                ${activeTab === "balanceSheet"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }
              `}
            >
              <FileText className="h-4 w-4" />
              Balance Sheet
            </button>
            <button
              onClick={() => setActiveTab("branchwise")}
              className={`
                flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2
                ${activeTab === "branchwise"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }
              `}
            >
              <Building className="h-4 w-4" />
              Branch-wise Report
              <span className="ml-1 bg-gray-100 text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full">
                {branches.length - 1}
              </span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      {activeTab === "profitLoss" && renderProfitLoss()}
      {activeTab === "balanceSheet" && renderBalanceSheet()}
      {activeTab === "branchwise" && renderBranchwise()}



      {/* Footer Notes */}
      <div className="mt-6 text-sm text-gray-500">
        <p>
          Note: All figures are in Indian Rupees (₹). Reports are generated
          based on accounting period settings.
        </p>
        <p className="mt-1">Last updated: Today at 10:30 AM</p>
      </div>
    </div>
  );
};

export default ProfitLossBalances;