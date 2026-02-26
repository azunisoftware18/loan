import React, { useState } from 'react';
import { X, Plus, Trash2, Upload, FileText, CheckCircle2 } from 'lucide-react';
import useDocuments from '../../../hooks/useDocuments';
import toast from 'react-hot-toast';

const DynamicDocumentUpload = ({
  isOpen,
  onClose,
  loanId,
  coApplicants = [],   // NEW
  onUploadSuccess
}) => {

  // Initial state: ek khali row document select karne ke liye
  const [rows, setRows] = useState([
    {
      id: Date.now(),
      docType: '',
      file: null,
      applicantType: "APPLICANT",   // NEW
      coApplicantId: ""             // NEW
    }
  ]);

  const documentOptions = [
    "Aadhaar Card",
    "PAN Card",
    "Electricity Bill",
    "Driving License",
    "Voter ID",
    "Passport",
    "Photo"
  ];




  const { uploadDocumentsBulk } = useDocuments();

  const handleUploadAll = async () => {
    if (!loanId) {
      alert("LoanId missing ❌");
      return;
    }

    try {
      await uploadDocumentsBulk(loanId, rows);

      toast.success("All documents uploaded successfully");

      onUploadSuccess?.(); 
      onClose();

    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    }
  };


  // Naya row add karne ke liye
  const addNewRow = () => {
    setRows([
      ...rows,
      {
        id: Date.now(),
        docType: '',
        file: null,
        applicantType: "APPLICANT",
        coApplicantId: ""
      }
    ]);
  };

  // Row remove karne ke liye
  const removeRow = (id) => {
    if (rows.length > 1) {
      setRows(rows.filter(row => row.id !== id));
    }
  };

  // Dropdown change handle karne ke liye
  const handleTypeChange = (id, value) => {
    setRows(rows.map(row => row.id === id ? { ...row, docType: value } : row));
  };

  // File attach handle karne ke liye
  const handleFileChange = (id, selectedFile) => {
    setRows(rows.map(row => row.id === id ? { ...row, file: selectedFile } : row));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="p-5 border-b flex justify-between items-center bg-gray-50">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Attach Documents</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-all">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto space-y-4 custom-scrollbar">
          {rows.map((row, index) => (
            <div key={row.id} className="flex flex-col md:flex-row items-end md:items-center gap-4 p-4 border border-gray-100 rounded-xl bg-gray-50/50 hover:bg-gray-50 transition-colors">
              {/* Applicant Type */}
              <div className="w-full md:w-1/4">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">
                  Applicant
                </label>

                <select
                  value={row.applicantType}
                  onChange={(e) =>
                    setRows(rows.map(r =>
                      r.id === row.id
                        ? { ...r, applicantType: e.target.value }
                        : r
                    ))
                  }
                  className="w-full p-2.5 border border-gray-300 rounded-lg"
                >
                  <option value="APPLICANT">Primary</option>
                  <option value="CO_APPLICANT">Co-Applicant</option>
                </select>
              </div>
              {row.applicantType === "CO_APPLICANT" && (
                <div className="w-full md:w-1/4">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">
                    Select Co-Applicant
                  </label>

                  <select
                    value={row.coApplicantId}
                    onChange={(e) =>
                      setRows(rows.map(r =>
                        r.id === row.id
                          ? { ...r, coApplicantId: e.target.value }
                          : r
                      ))
                    }
                    className="w-full p-2.5 border border-gray-300 rounded-lg"
                  >
                    <option value="">Select</option>

                    {coApplicants?.map(ca => (
                      <option key={ca.id} value={ca.id}>
                        {ca.firstName} {ca.lastName}
                      </option>
                    ))}

                  </select>
                </div>
              )}

              {/* Step 1: Document Type Select */}
              <div className="w-full md:w-1/3">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Document Type</label>
                <select
                  value={row.docType}
                  onChange={(e) => handleTypeChange(row.id, e.target.value)}
                  className="w-full p-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                >
                  <option value="">Select Type</option>
                  {documentOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Step 2: File Attach */}
              <div className="w-full md:flex-1">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Attach File</label>
                <div className="relative group">
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(row.id, e.target.files[0])}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className={`flex items-center gap-2 p-2.5 bg-white border border-gray-300 rounded-lg transition-all ${row.file ? 'border-green-500 bg-green-50' : 'group-hover:border-blue-400'}`}>
                    {row.file ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                    ) : (
                      <Upload className="w-5 h-5 text-gray-400 shrink-0" />
                    )}
                    <span className={`text-sm truncate ${row.file ? 'text-green-700 font-medium' : 'text-gray-500'}`}>
                      {row.file ? row.file.name : "Choose file..."}
                    </span>
                  </div>
                </div>
              </div>

              {/* Step 3: Remove Button */}
              <button
                onClick={() => removeRow(row.id)}
                disabled={rows.length === 1}
                className={`p-2.5 rounded-lg border transition-all ${rows.length === 1 ? 'border-gray-200 text-gray-300 cursor-not-allowed' : 'border-red-100 text-red-500 hover:bg-red-50 hover:border-red-200'}`}
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}

          {/* Add More Button */}
          <button
            onClick={addNewRow}
            className="flex items-center gap-2 text-blue-600 font-semibold text-sm hover:bg-blue-50 px-4 py-2 rounded-lg transition-all border border-dashed border-blue-200"
          >
            <Plus className="w-4 h-4" />
            Add Another Document
          </button>
        </div>

        {/* Footer */}
        <div className="p-6 border-t flex gap-3 bg-white">
          <button onClick={onClose} className="flex-1 py-3 text-gray-700 font-medium hover:bg-gray-100 rounded-xl transition-all border border-gray-200">
            Cancel
          </button>
          <button
            onClick={handleUploadAll}
            className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all disabled:opacity-50 disabled:shadow-none"
            disabled={rows.some(r =>
              !r.docType ||
              !r.file ||
              (r.applicantType === "CO_APPLICANT" && !r.coApplicantId)
            )}

          >
            Upload All Documents
          </button>

        </div>
      </div>
    </div>
  );
};

export default DynamicDocumentUpload;