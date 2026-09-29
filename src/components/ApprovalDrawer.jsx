import React from 'react';
import { X, Building2, FileText, CheckCircle2, Clock, AlertTriangle, ExternalLink, ShieldCheck } from 'lucide-react';

export default function ApprovalDrawer({ approval, isOpen, onClose, onActionClick }) {
  if (!isOpen || !approval) return null;

  const statusBadgeStyles = {
    'Approved': 'bg-emerald-50 text-emerald-800 border-emerald-300',
    'Under Review': 'bg-amber-50 text-amber-900 border-amber-300',
    'Inspection': 'bg-blue-50 text-blue-900 border-blue-300',
    'Action Required': 'bg-red-50 text-red-900 border-red-300',
    'Not Started': 'bg-slate-100 text-slate-700 border-slate-300',
    'Eligible / Not Applied': 'bg-blue-50 text-blue-900 border-blue-300'
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity" 
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-full sm:max-w-xl bg-white shadow-2xl border-l border-slate-300 flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-5 bg-[#1B365D] text-white flex items-start justify-between">
            <div>
              <span className="text-[11px] sm:text-[12px] font-bold tracking-wider text-blue-200 uppercase block mb-1">
                {approval.category || "Statutory Clearance"}
              </span>
              <h2 className="text-lg sm:text-xl font-bold font-sans text-white leading-tight">
                {approval.name}
              </h2>
              <div className="flex items-center gap-2 mt-1.5 text-[12.5px] sm:text-[13px] text-slate-200">
                <Building2 className="w-4 h-4 text-blue-200" />
                <span>{approval.department}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-[2px] text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 sm:space-y-5 text-slate-900 text-sm">
            {/* Status & Governing Act */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-3.5 bg-slate-50 rounded-[3px] border border-slate-200 text-xs">
              <div>
                <span className="text-[11px] text-slate-500 font-bold uppercase block">Current Status</span>
                <span className={`inline-block px-2.5 py-0.5 rounded-[2px] text-[12px] font-bold border mt-0.5 ${statusBadgeStyles[approval.status] || 'bg-slate-100 text-slate-700'}`}>
                  {approval.status}
                </span>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-[11px] text-slate-500 font-bold uppercase block">Governing Act</span>
                <span className="text-[12.5px] font-semibold text-slate-800">{approval.statutoryAct || "State Regulatory Act"}</span>
              </div>
            </div>

            {/* Why Required */}
            <div>
              <h3 className="text-[11.5px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#1B365D]" />
                Statutory Rationale
              </h3>
              <div className="p-3.5 bg-[#F0F4F8] border border-blue-200 rounded-[3px] text-[13px] text-slate-800 leading-relaxed">
                {approval.whyRequired || approval.ruleReason || "Applicable based on statutory worker, activity, and environmental thresholds."}
              </div>
            </div>

            {/* Processing Timeline */}
            <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-[3px] flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2.5 text-amber-950">
                <Clock className="w-4 h-4 text-amber-800 shrink-0" />
                <div>
                  <span className="font-bold text-[13px] block">Standard Processing Timeline</span>
                  <span className="text-[12px] text-amber-900">{approval.estimatedTime || "Prototype estimate: 15–20 working days"}</span>
                </div>
              </div>
              <span className="text-[10.5px] uppercase font-bold bg-amber-200 text-amber-950 px-2 py-0.5 rounded-[2px]">
                Prototype Estimate
              </span>
            </div>

            {/* Required Documents Checklist */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-[11.5px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-[#1B365D]" />
                  Required Document Package
                </h3>
                <span className="text-[11.5px] text-slate-600 font-semibold">
                  {approval.documents?.filter(d => d.uploaded).length || 0} of {approval.documents?.length || 0} Uploaded
                </span>
              </div>

              <div className="border border-slate-200 rounded-[3px] divide-y divide-slate-200 text-xs">
                {approval.documents?.map((doc, idx) => (
                  <div key={idx} className="p-3 flex items-start justify-between gap-2 hover:bg-slate-50">
                    <div className="flex items-start gap-2">
                      <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] shrink-0 mt-0.5 font-bold ${
                        doc.uploaded && doc.valid !== false
                          ? 'bg-emerald-100 text-emerald-800'
                          : doc.valid === false
                          ? 'bg-red-100 text-red-800'
                          : 'bg-slate-100 text-slate-500'
                      }`}>
                        {doc.uploaded && doc.valid !== false ? '✓' : doc.valid === false ? '!' : '○'}
                      </span>
                      <div>
                        <span className="font-semibold text-slate-900 text-[13px] block">{doc.name}</span>
                        {doc.note && (
                          <span className="text-[11.5px] text-red-700 block mt-0.5 font-medium">
                            ⚠ {doc.note}
                          </span>
                        )}
                      </div>
                    </div>

                    <span className={`text-[10.5px] px-2 py-0.5 rounded-[2px] font-semibold shrink-0 ${
                      doc.uploaded && doc.valid !== false
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                        : doc.valid === false
                        ? 'bg-red-50 text-red-900 border border-red-300'
                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}>
                      {doc.uploaded && doc.valid !== false ? 'Verified' : doc.valid === false ? 'Issue' : 'Pending'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Department Portal Source */}
            {approval.officialPortal && (
              <div className="text-[11.5px] text-slate-500 pt-2 flex flex-wrap items-center justify-between gap-1 border-t border-slate-200">
                <span>Integrated Department System:</span>
                <span className="font-semibold text-slate-800">{approval.officialPortal}</span>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-3.5 sm:p-4 bg-slate-100 border-t border-slate-300 flex items-center justify-between gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-2 bg-white border border-slate-300 rounded-[3px] text-xs font-semibold text-slate-800 hover:bg-slate-50"
            >
              Close
            </button>
            <button
              onClick={() => {
                onActionClick?.(approval);
                onClose();
              }}
              className="px-4 py-2 bg-[#1B365D] hover:bg-[#142947] text-white rounded-[3px] text-xs font-semibold shadow-xs flex items-center gap-1.5"
            >
              <span>{approval.status === 'Approved' ? 'View Certificate' : approval.status === 'Action Required' ? 'Resolve Flagged Issue' : 'Track Status'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
