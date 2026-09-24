import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Building, 
  FileText, 
  Upload, 
  Send, 
  Calendar, 
  ShieldAlert, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function ApplicationTimeline({ application, isOpen, onClose, onResolveQuery, onRaiseGrievance, showToast }) {
  if (!isOpen || !application) return null;

  const [replyText, setReplyText] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('');
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);
  const [grievanceText, setGrievanceText] = useState('');
  const [showGrievanceBox, setShowGrievanceBox] = useState(false);
  const [isSubmittingGrievance, setIsSubmittingGrievance] = useState(false);
  const [grievanceSubmitted, setGrievanceSubmitted] = useState(false);

  const statusColors = {
    'APPROVED': 'bg-emerald-50 text-emerald-800 border-emerald-300',
    'UNDER REVIEW': 'bg-amber-50 text-amber-900 border-amber-300',
    'INSPECTION': 'bg-blue-50 text-blue-900 border-blue-300',
    'ACTION REQUIRED': 'bg-red-50 text-red-900 border-red-300',
    'NOT STARTED': 'bg-slate-100 text-slate-700 border-slate-300'
  };

  const riskBadges = {
    'GREEN': 'bg-emerald-50 text-emerald-800 border-emerald-300',
    'ORANGE': 'bg-amber-50 text-amber-900 border-amber-300',
    'RED': 'bg-red-50 text-red-900 border-red-300'
  };

  const handleSendReply = () => {
    if (!replyText.trim() && !selectedFileName) {
      showToast?.("Please enter a response note or select a file to submit.", "error");
      return;
    }
    setIsSubmittingReply(true);
    setTimeout(() => {
      setIsSubmittingReply(false);
      onResolveQuery?.(application.id, {
        note: replyText,
        fileName: selectedFileName || application.queryDetails?.requestedDocName || "Rectified_Document.pdf"
      });
      showToast?.(`Query response & document submitted to ${application.department}`, "success");
      setReplyText('');
      setSelectedFileName('');
    }, 700);
  };

  const handleFileGrievance = () => {
    setIsSubmittingGrievance(true);
    setTimeout(() => {
      setIsSubmittingGrievance(false);
      setGrievanceSubmitted(true);
      const token = `GRV-MH-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      onRaiseGrievance?.(application.id, token);
      showToast?.(`Statutory Grievance ${token} lodged with District Collector / Industry Secretary under Maharashtra Right to Public Services Act`, "success");
      setShowGrievanceBox(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity" 
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-full sm:max-w-2xl bg-white shadow-2xl border-l border-slate-300 flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-5 bg-[#1B365D] text-white flex items-start justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1">
                <span className="text-[10.5px] sm:text-[11.5px] font-bold tracking-wider uppercase px-2 py-0.5 bg-white/20 rounded-[2px]">
                  {application.id}
                </span>
                <span className="text-[11.5px] sm:text-[12px] text-blue-200">
                  Filed: {application.submittedDate}
                </span>
                {application.riskLevel && (
                  <span className={`text-[10.5px] font-bold px-2 py-0.5 rounded border ${riskBadges[application.riskLevel]}`}>
                    {application.riskLevel === 'GREEN' ? 'Low Risk (Auto-Track)' : application.riskLevel === 'ORANGE' ? 'Medium Risk Scrutiny' : 'High Risk Detailed Audit'}
                  </span>
                )}
              </div>
              <h2 className="text-lg sm:text-xl font-bold font-sans text-white">
                {application.approvalName}
              </h2>
              <div className="flex items-center gap-2 mt-1.5 text-[12.5px] sm:text-[13px] text-slate-200">
                <Building className="w-4 h-4 text-blue-200 shrink-0" />
                <span className="truncate">{application.department}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-[2px] text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Current Status & Assigned Officer */}
          <div className="p-3.5 sm:p-4 bg-slate-50 border-b border-slate-200 text-xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-slate-500 text-[11px] font-bold uppercase block">Current Stage</span>
                <span className={`inline-block px-2.5 py-0.5 rounded-[2px] font-bold border mt-0.5 text-[11.5px] ${statusColors[application.status] || 'bg-slate-100 text-slate-700'}`}>
                  {application.status} — {application.stage}
                </span>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-slate-500 text-[11px] font-bold uppercase block">Scrutiny Officer</span>
                <span className="font-bold text-slate-800 text-[12.5px]">{application.assignedOfficer || "Pending Assignment"}</span>
              </div>
            </div>

            {application.isDelayed && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-[3px] text-red-950 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-1 text-[12px]">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-700 shrink-0" />
                    <span>Statutory SLA Exceeded by <strong>{application.delayDays || 38} days</strong></span>
                  </div>
                  <span className="font-bold text-red-800 uppercase text-[10.5px] bg-red-100 px-2 py-0.5 rounded-[2px] border border-red-200">
                    Overdue
                  </span>
                </div>
                
                {grievanceSubmitted ? (
                  <div className="p-2 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>Statutory Grievance active. Escalated to District Level Industry Committee.</span>
                  </div>
                ) : (
                  <div>
                    {!showGrievanceBox ? (
                      <button
                        onClick={() => setShowGrievanceBox(true)}
                        className="text-[11.5px] font-bold text-red-800 hover:text-red-950 underline flex items-center gap-1 mt-1"
                      >
                        <ShieldAlert className="w-3.5 h-3.5" />
                        <span>File Statutory Grievance / Appeal (Right to Public Services Act) →</span>
                      </button>
                    ) : (
                      <div className="mt-2 p-2.5 bg-white border border-red-300 rounded space-y-2 text-xs">
                        <label className="block font-bold text-slate-800 text-[11.5px]">
                          Grounds for Appeal / Grievance Statement:
                        </label>
                        <textarea
                          rows="2"
                          value={grievanceText}
                          onChange={(e) => setGrievanceText(e.target.value)}
                          placeholder="Application has been pending beyond statutory 30-day mandate without formal query notice..."
                          className="w-full p-2 border border-slate-300 rounded text-xs focus:outline-none focus:border-red-600"
                        />
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setShowGrievanceBox(false)}
                            className="px-2.5 py-1 text-slate-600 hover:text-slate-800 font-bold"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleFileGrievance}
                            disabled={isSubmittingGrievance}
                            className="px-3 py-1 bg-red-800 hover:bg-red-900 text-white rounded font-bold shadow-xs flex items-center gap-1"
                          >
                            {isSubmittingGrievance ? "Escalating..." : "Submit Formal Grievance"}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Central Inspection System (CIS) Joint Site Visit Card */}
            {application.jointInspectionId && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-[3px] text-blue-950 text-xs space-y-2">
                <div className="flex items-center justify-between font-bold text-[12px] text-blue-900">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-blue-700" />
                    <span>Central Inspection System (CIS) Scheduled</span>
                  </div>
                  <span className="font-mono text-[11px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded border border-blue-200">
                    {application.jointInspectionId}
                  </span>
                </div>
                <p className="text-slate-700 text-[11.5px] leading-relaxed">
                  A synchronized single joint inspection visit is scheduled for <strong>04 September 2026, 11:00 AM IST</strong>. 
                  Officers from <strong>MFES, DISH, and MPCB</strong> will conduct joint inspection to avoid repetitive visits.
                </p>

                {/* Unified Joint Inspection Protocol Checklist */}
                <div className="mt-2 pt-2 border-t border-blue-200/80">
                  <div className="font-bold text-blue-950 text-[11.5px] mb-1 flex items-center justify-between">
                    <span>Synchronized CIS Protocol Checklist (Combined Act):</span>
                    <span className="text-[10px] bg-blue-200/70 text-blue-900 font-mono px-1.5 py-0.2 rounded font-bold">
                      Single Report Mandate
                    </span>
                  </div>
                  <div className="space-y-1 bg-white p-2 rounded border border-blue-200 text-[11px]">
                    <div className="flex items-center gap-2 text-slate-800">
                      <span className="w-3.5 h-3.5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-[9px]">1</span>
                      <span><strong>Fire Services (MFES):</strong> Hydrant pressure test & emergency staircase clearance</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-800">
                      <span className="w-3.5 h-3.5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-[9px]">2</span>
                      <span><strong>Factory Safety (DISH):</strong> Machinery guard shielding & worker PPE ventilation audit</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-800">
                      <span className="w-3.5 h-3.5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-[9px]">3</span>
                      <span><strong>Pollution Board (MPCB):</strong> Effluent treatment plant zero-liquid discharge piping verification</span>
                    </div>
                  </div>
                  <div className="text-[10.5px] text-slate-500 italic mt-1">
                    * Single combined inspection report must be uploaded to the portal within 48 hours under Maharashtra CIS Guidelines.
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Interactive Query Ping-Pong Resolver */}
          {application.queryDetails && !application.queryDetails.isResolved && (
            <div className="p-4 bg-amber-50/80 border-b border-amber-200 text-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                  <span className="font-bold text-amber-950 text-[12.5px]">Official Department Query Pending Response</span>
                </div>
                <span className="font-mono text-[10.5px] text-amber-800 bg-amber-100 px-2 py-0.5 rounded border border-amber-300 font-bold">
                  {application.queryDetails.queryId}
                </span>
              </div>

              <div className="bg-white p-3 rounded border border-amber-200 space-y-1.5">
                <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                  <span>From: {application.queryDetails.officerName}</span>
                  <span className="text-red-700 font-bold">Respond by: {application.queryDetails.deadline}</span>
                </div>
                <p className="font-semibold text-slate-800 text-[12px]">{application.queryDetails.subject}</p>
                <p className="text-slate-600 text-[11.5px] leading-relaxed italic bg-slate-50 p-2 rounded border border-slate-100">
                  "{application.queryDetails.queryText}"
                </p>
              </div>

              <div className="space-y-2">
                <label className="block font-bold text-slate-700 text-[11.5px]">
                  Provide Applicant Clarification & Re-upload Document:
                </label>
                <textarea
                  rows="2"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="State your clarification or reference to the rectified drawing..."
                  className="w-full p-2 border border-slate-300 rounded text-xs focus:outline-none focus:border-blue-700"
                />
                
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <div className="flex items-center gap-2">
                    <label className="cursor-pointer px-3 py-1.5 bg-white border border-slate-300 rounded text-slate-700 hover:bg-slate-50 font-bold text-[11.5px] flex items-center gap-1.5 shadow-2xs">
                      <Upload className="w-3.5 h-3.5 text-slate-500" />
                      <span>{selectedFileName || `Select ${application.queryDetails.requestedDocName}`}</span>
                      <input 
                        type="file" 
                        className="hidden" 
                        onChange={(e) => setSelectedFileName(e.target.files[0]?.name || application.queryDetails.requestedDocName)}
                      />
                    </label>
                  </div>

                  <button
                    onClick={handleSendReply}
                    disabled={isSubmittingReply}
                    className="px-4 py-1.5 bg-[#1B365D] hover:bg-[#142947] text-white rounded font-bold text-xs flex items-center gap-1.5 shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmittingReply ? "Submitting Clarification..." : "Submit Clarification to Officer"}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Chronological Milestone Timeline */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            <h3 className="text-[11.5px] font-bold text-slate-500 uppercase tracking-wider mb-3">
              Application Milestones Timeline
            </h3>

            <div className="relative pl-6 space-y-5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-300">
              {application.timeline?.map((step, idx) => {
                const isDone = step.status === 'COMPLETED';
                const isCurrent = step.status === 'IN_PROGRESS' || step.status === 'ACTION_REQUIRED' || step.status === 'PENDING';
                const isActionRequired = step.status === 'ACTION_REQUIRED';

                return (
                  <div key={idx} className="relative">
                    {/* Node Dot */}
                    <div className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      isDone
                        ? 'bg-emerald-700 text-white'
                        : isActionRequired
                        ? 'bg-red-700 text-white ring-4 ring-red-100'
                        : isCurrent
                        ? 'bg-[#1B365D] text-white ring-4 ring-blue-100'
                        : 'bg-white border-2 border-slate-400 text-slate-500'
                    }`}>
                      {isDone ? '✓' : isActionRequired ? '!' : idx + 1}
                    </div>

                    {/* Content */}
                    <div className="text-xs">
                      <div className="flex flex-wrap items-center justify-between gap-1">
                        <span className={`font-bold text-[13px] ${isActionRequired ? 'text-red-800' : isCurrent ? 'text-[#1B365D]' : 'text-slate-900'}`}>
                          {step.step}
                        </span>
                        <span className="text-[11.5px] text-slate-500 font-mono">
                          {step.date}
                        </span>
                      </div>
                      <p className="mt-1 text-slate-700 text-[12px] leading-normal bg-slate-50 p-2.5 rounded-[3px] border border-slate-200">
                        {step.remarks}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="p-3.5 sm:p-4 bg-slate-100 border-t border-slate-300 flex justify-between items-center text-xs">
            <span className="text-slate-500 text-[11.5px]">
              Last Synced: Today (Blockchain Audit Log Verified)
            </span>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#1B365D] text-white rounded-[3px] font-semibold hover:bg-[#142947]"
            >
              Close Timeline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

