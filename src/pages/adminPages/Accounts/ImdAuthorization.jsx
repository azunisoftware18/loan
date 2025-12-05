import React from "react";
import {
  ShieldCheck,
  FileText,
  Users,
  Building2,
  CheckCircle,
  AlertCircle
} from "lucide-react";

export default function ImdAuthorization() {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          IMD Authorization
        </h1>
        <p className="text-gray-500 text-sm">
          Insurance Marketing Director / Firm Approval Information
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <InfoCard
          title="Authority"
          value="IRDAI"
          icon={<ShieldCheck size={22} className="text-blue-600" />}
        />
        <InfoCard
          title="Applicable To"
          value="IMD / IMF"
          icon={<Users size={22} className="text-blue-600" />}
        />
        <InfoCard
          title="Business Type"
          value="Insurance Marketing"
          icon={<Building2 size={22} className="text-blue-600" />}
        />
        <InfoCard
          title="Requirement"
          value="Mandatory"
          icon={<AlertCircle size={22} className="text-red-500" />}
        />
      </div>

      {/* Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* What is IMD */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="text-blue-600" size={18} />
            <h2 className="text-lg font-semibold text-gray-700">
              What is IMD Authorization?
            </h2>
          </div>
          <p className="text-gray-600 text-sm">
            IMD Authorization is an official approval issued by IRDAI that allows
            companies or individuals to legally market and sell insurance
            products.
          </p>
        </div>

        {/* Why Required */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="text-blue-600" size={18} />
            <h2 className="text-lg font-semibold text-gray-700">
              Why is it Required?
            </h2>
          </div>
          <ul className="text-sm text-gray-600 space-y-1">
            <li> Legal authorization to operate insurance business</li>
            <li> Builds customer trust and confidence</li>
            <li> Ensures regulatory compliance</li>
            <li> Reduces risk of fraud</li>
          </ul>
        </div>

        {/* Who Needs */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center gap-2 mb-2">
            <Users className="text-blue-600" size={18} />
            <h2 className="text-lg font-semibold text-gray-700">
              Who Needs IMD Authorization?
            </h2>
          </div>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Insurance Marketing Firms</li>
            <li>• Financial Service Providers</li>
            <li>• Insurance Distribution Offices</li>
            <li>• Multi-Insurance Businesses</li>
          </ul>
        </div>

        {/* Difference Table */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="text-blue-600" size={18} />
            <h2 className="text-lg font-semibold text-gray-700">
              IMD vs Insurance Agent
            </h2>
          </div>
          <table className="w-full text-sm text-gray-600 border">
            <thead className="bg-slate-100 text-gray-700">
              <tr>
                <th className="border px-2 py-1">IMD Authorization</th>
                <th className="border px-2 py-1">Insurance Agent</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-2 py-1">Company Approval</td>
                <td className="border px-2 py-1">Personal License</td>
              </tr>
              <tr>
                <td className="border px-2 py-1">Marketing and Operations</td>
                <td className="border px-2 py-1">Sales Activity Only</td>
              </tr>
              <tr>
                <td className="border px-2 py-1">Issued by IRDAI</td>
                <td className="border px-2 py-1">Issued by Insurer</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

      {/* Footer Note */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
        <CheckCircle className="text-blue-600" />
        <p className="text-sm text-blue-800">
          Note: Operating without IMD Authorization is illegal under IRDAI rules.
        </p>
      </div>

    </div>
  );
}

function InfoCard({ title, value, icon }) {
  return (
    <div className="bg-white shadow-sm rounded-xl p-4 flex items-center gap-4">
      <div className="bg-blue-50 p-2 rounded-lg">{icon}</div>
      <div>
        <p className="text-xs text-gray-500">{title}</p>
        <p className="text-sm font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
}
