import React from "react";
import { X } from "lucide-react";

const Field = ({ label, value }) => (
  <div>
    <p className="text-xs text-slate-500">{label}</p>
    <p className="text-sm font-medium text-slate-800">
      {value || "-"}
    </p>
  </div>
);

const LegalComplianceViewModal = ({ isOpen, onClose, report }) => {
  if (!isOpen || !report) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-xl w-full max-w-3xl shadow-xl">

        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-lg font-semibold">
            Legal Report Details
          </h2>

          <button onClick={onClose}>
            <X className="w-5 h-5 text-slate-500"/>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">

          <Field label="Engineer Name" value={report.engineerName} />
          <Field label="Agency Name" value={report.agencyName} />
          <Field label="Property Type" value={report.propertyType} />
          <Field label="City" value={report.city} />
          <Field label="Market Value" value={report.marketValue} />
          <Field label="Recommended LTV" value={report.recommendedLtv} />
          <Field label="Construction Status" value={report.constructionStatus} />
          <Field label="Quality" value={report.qualityOfConstruction} />
          <Field label="Status" value={report.status} />

        </div>

        {/* Footer */}
        <div className="flex justify-end p-5 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 rounded-lg"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default LegalComplianceViewModal;