import React, { useEffect } from 'react';
import {
  X,
  User,
  Building2,
  Home,
  MapPin,
  DollarSign,
  Calendar,
  FileText,
  Camera,
  CheckCircle,
  Clock,
  XCircle,
  ExternalLink,
  IndianRupee
} from 'lucide-react';

const TechnicalReportDetailsModal = ({ isOpen, onClose, report }) => {
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

  if (!isOpen || !report) return null;

  const getStatusIcon = (status) => {
    switch(status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'approved':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
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
    <div className={`bg-white rounded-2xl border border-slate-200 p-6 ${className}`}>
      <h3 className="text-sm font-semibold text-slate-700 mb-4">{title}</h3>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );

  const DetailRow = ({ label, value, icon: Icon }) => (
    <div className="flex items-start gap-3">
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
                <h2 className="text-xl font-bold text-slate-800">Technical Report Details</h2>
                <p className="text-sm text-slate-500 mt-1">Report ID: #{report.id}</p>
              </div>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${getStatusColor(report.status)}`}>
                {getStatusIcon(report.status)}
                <span className="text-sm font-medium capitalize">{report.status}</span>
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
              {/* Engineer Information */}
              <DetailCard title="Engineer Information">
                <DetailRow 
                  label="Engineer Name" 
                  value={report.engineerName} 
                  icon={User}
                />
                <DetailRow 
                  label="Agency Name" 
                  value={report.agencyName} 
                  icon={Building2}
                />
              </DetailCard>

              {/* Property Information */}
              <DetailCard title="Property Information">
                <DetailRow 
                  label="Property Type" 
                  value={report.propertyType} 
                  icon={Home}
                />
                <DetailRow 
                  label="Address" 
                  value={report.address} 
                  icon={MapPin}
                />
                <DetailRow 
                  label="City/State" 
                  value={`${report.city}, ${report.state}`} 
                  icon={MapPin}
                />
                <DetailRow 
                  label="Pincode" 
                  value={report.pincode} 
                  icon={MapPin}
                />
              </DetailCard>

              {/* Valuation Summary */}
              <DetailCard title="Valuation Summary">
                <DetailRow 
                  label="Market Value" 
                  value={formatCurrency(report.marketValue)} 
                  icon={IndianRupee}
                />
                <DetailRow 
                  label="Discussion Value" 
                  value={formatCurrency(report.discussionValue)} 
                  icon={IndianRupee}
                />
                <DetailRow 
                  label="Forced Sale Value" 
                  value={formatCurrency(report.forcesdSaleValue)} 
                  icon={IndianRupee}
                />
                <DetailRow 
                  label="Recommended LTV" 
                  value={report.recommendedLtv} 
                  icon={IndianRupee}
                />
              </DetailCard>

              {/* Construction Details */}
              <DetailCard title="Construction Details">
                <DetailRow 
                  label="Construction Status" 
                  value={report.constructionStatus} 
                  icon={Calendar}
                />
                <DetailRow 
                  label="Property Age" 
                  value={`${report.propertyAge} Years`} 
                  icon={Calendar}
                />
                <DetailRow 
                  label="Residual Life" 
                  value={`${report.residualLife} Years`} 
                  icon={Calendar}
                />
                <DetailRow 
                  label="Quality of Construction" 
                  value={report.qualityOfConstruction} 
                  icon={Home}
                />
              </DetailCard>

              {/* Documents */}
              <DetailCard title="Documents" className="lg:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <a 
                    href={report.reportUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-700">Technical Report</p>
                        <p className="text-xs text-slate-500">Click to view document</p>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                  </a>

                  <a 
                    href={report.sitePhotographs}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg">
                        <Camera className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-700">Site Photographs</p>
                        <p className="text-xs text-slate-500">Click to view images</p>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-green-600 transition-colors" />
                  </a>
                </div>
              </DetailCard>

              {/* Remarks */}
              <DetailCard title="Technical Remarks" className="lg:col-span-2">
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {report.remarks || 'No remarks provided'}
                  </p>
                </div>
              </DetailCard>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end p-6 border-t border-slate-200 bg-slate-50 rounded-b-2xl">
            <button
              onClick={onClose}
              className="px-6 py-3 text-sm font-medium text-slate-600 hover:bg-white rounded-xl transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalReportDetailsModal;