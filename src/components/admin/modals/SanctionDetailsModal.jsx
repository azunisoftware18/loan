import React, { useEffect } from 'react';
import {
  X,
  User,
  Building2,
  DollarSign,
  Percent,
  Calendar,
  FileText,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
  Home,
  Briefcase,
  CreditCard,
  Download,
  Eye,
  Mail,
  Printer,
  IndianRupee
} from 'lucide-react';

const SanctionDetailsModal = ({ isOpen, onClose, sanction }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !sanction) return null;

  const getStatusIcon = (status) => {
    switch (status) {
      case 'sanctioned':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'conditional':
        return <AlertCircle className="w-5 h-5 text-blue-600" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'sanctioned':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'conditional':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'rejected':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const formatCurrency = (value) => {
    return value;
  };

  const DetailCard = ({ title, children, className = '' }) => (
    <div className={`bg-white rounded-xl border border-slate-200 p-5 ${className}`}>
      <h3 className="text-sm font-semibold text-slate-700 mb-4">{title}</h3>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );

  const DetailRow = ({ label, value, icon: Icon, className = '' }) => (
    <div className={`flex items-start gap-3 ${className}`}>
      {Icon && (
        <div className="p-2 bg-slate-50 rounded-lg">
          <Icon className="w-4 h-4 text-slate-500" />
        </div>
      )}
      <div className="flex-1">
        <p className="text-xs text-slate-500 mb-1">{label}</p>
        <p className="text-sm font-medium text-slate-800">{value || '—'}</p>
      </div>
    </div>
  );

  const DetailGrid = ({ children }) => (
    <div className="grid grid-cols-2 gap-4">
      {children}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-4xl my-8 animate-in fade-in zoom-in duration-300">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <div className="flex items-center gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Sanction Details</h2>
                <p className="text-sm text-slate-500 mt-1">Loan Sanction Reference: {sanction.loanNumber}</p>
              </div>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${getStatusColor(sanction.status)}`}>
                {getStatusIcon(sanction.status)}
                <span className="text-sm font-medium capitalize">{sanction.status}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Applicant Information */}
              <DetailCard title="Applicant Information">
                <DetailRow 
                  label="Applicant Name" 
                  value={sanction.applicantName} 
                  icon={User}
                />
                <DetailRow 
                  label="Loan Number" 
                  value={sanction.loanNumber} 
                  icon={FileText}
                />
                <DetailRow 
                  label="Loan Type" 
                  value={sanction.loanType} 
                  icon={Home}
                />
                <DetailRow 
                  label="Branch" 
                  value={sanction.branch} 
                  icon={Building2}
                />
              </DetailCard>

              {/* Loan Request Summary */}
              <DetailCard title="Loan Request Summary">
                <DetailRow 
                  label="Requested Amount" 
                  value={formatCurrency(sanction.requestedAmount)} 
                  icon={IndianRupee}
                />
                <DetailRow 
                  label="Requested Tenure" 
                  value={sanction.requestedTenure} 
                  icon={Calendar}
                />
                <DetailRow 
                  label="Requested Interest Rate" 
                  value={sanction.requestedInterest || sanction.interestRate} 
                  icon={Percent}
                />
              </DetailCard>

              {/* Sanction Summary */}
              <DetailCard title="Sanction Summary" className="lg:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <DetailRow 
                    label="Sanctioned Amount" 
                    value={formatCurrency(sanction.sanctionedAmount)} 
                    icon={IndianRupee}
                  />
                  <DetailRow 
                    label="Sanctioned Tenure" 
                    value={sanction.tenure} 
                    icon={Calendar}
                  />
                  <DetailRow 
                    label="Interest Rate" 
                    value={sanction.interestRate} 
                    icon={Percent}
                  />
                  <DetailRow 
                    label="EMI Amount" 
                    value={sanction.emiAmount} 
                    icon={CreditCard}
                  />
                  <DetailRow 
                    label="Processing Fee" 
                    value={formatCurrency(sanction.processingFee)} 
                    icon={IndianRupee}
                  />
                  <DetailRow 
                    label="Insurance" 
                    value={formatCurrency(sanction.insuranceAmount)} 
                    icon={IndianRupee}
                  />
                </div>
              </DetailCard>

              {/* Approval Details */}
              <DetailCard title="Approval Details">
                <DetailRow 
                  label="Sanction Authority" 
                  value={sanction.sanctionAuthority} 
                  icon={User}
                />
                <DetailRow 
                  label="Sanction Date" 
                  value={sanction.sanctionDate} 
                  icon={Calendar}
                />
                <DetailRow 
                  label="Valid Until" 
                  value={sanction.validityDate} 
                  icon={Calendar}
                />
              </DetailCard>

              {/* Conditions & Remarks */}
              <DetailCard title="Conditions & Remarks">
                <DetailRow 
                  label="Conditions" 
                  value={sanction.conditions || 'No conditions specified'} 
                  icon={AlertCircle}
                  className="items-start"
                />
                <DetailRow 
                  label="Internal Remarks" 
                  value={sanction.remarks || 'No remarks'} 
                  icon={FileText}
                  className="items-start"
                />
              </DetailCard>

              {/* Documents Section */}
              <DetailCard title="Documents" className="lg:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium text-slate-700">Sanction Letter</p>
                        <p className="text-xs text-slate-500">Click to download</p>
                      </div>
                    </div>
                    <Download className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                  </button>

                  <button className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg">
                        <Eye className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium text-slate-700">Approval Document</p>
                        <p className="text-xs text-slate-500">Click to view</p>
                      </div>
                    </div>
                    <Eye className="w-4 h-4 text-slate-400 group-hover:text-green-600 transition-colors" />
                  </button>
                </div>
              </DetailCard>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-slate-200 bg-slate-50 rounded-b-2xl">
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-white rounded-lg transition-colors" title="Print">
                <Printer className="w-4 h-4 text-slate-600" />
              </button>
              <button className="p-2 hover:bg-white rounded-lg transition-colors" title="Email">
                <Mail className="w-4 h-4 text-slate-600" />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 text-sm font-medium text-slate-600 hover:bg-white rounded-lg transition-colors"
              >
                Close
              </button>
              <button className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm">
                <Download className="w-4 h-4 inline mr-2" />
                Download Letter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SanctionDetailsModal;