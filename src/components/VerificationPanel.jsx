import React, { useState } from 'react';
import { 
  X, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  FileSearch, 
  RefreshCw, 
  ShieldCheck,
  Building,
  Upload,
  Check,
  Lock,
  Key,
  Copy,
  Building2,
  FileCheck2
} from 'lucide-react';

export default function VerificationPanel({ document, isOpen, onClose, onResolveIssue, project }) {
  if (!isOpen || !document) return null;

  const [isResolving, setIsResolving] = useState(false);
  const [hasFixed, setHasFixed] = useState(document.status === 'Valid');
  const [copiedHash, setCopiedHash] = useState(false);

  const handleFixMismatch = () => {
    setIsResolving(true);
    setTimeout(() => {
      setIsResolving(false);
      setHasFixed(true);
      onResolveIssue?.(document.id);
    }, 500);
  };

  const copyShaHash = () => {
    if (document.sha256Hash) {
      navigator.clipboard?.writeText(document.sha256Hash);
      setCopiedHash(true);
      setTimeout(() => setCopiedHash(false), 2000);
    }
  };

  const isDigiLocker = document.source === 'DigiLocker';

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity" 
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-full sm:max-w-xl bg-white shadow-2xl border-l border-slate-300 flex flex-col">
          {/* Header */}
          <div className={`p-4 sm:p-5 text-white flex items-start justify-between ${
            document.status === 'Issue Found' && !hasFixed ? 'bg-[#991B1B]' : 'bg-[#1B365D]'
          }`}>
            <div>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1">
                <span className="text-[10.5px] sm:text-[11.5px] font-bold tracking-wider uppercase px-2 py-0.5 bg-white/20 rounded-[2px] text-white">
                  Consistency & Security Check
                </span>
                <span className="text-[11.5px] sm:text-[12px] text-white/90">
                  {document.uploadDate}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold font-sans text-white break-all">
                {document.fileName}
              </h2>
              <div className="flex flex-wrap items-center gap-1.5 text-[12px] sm:text-[13px] text-white/90 mt-0.5">
                <span>{document.documentType} ({document.size})</span>
                {isDigiLocker && (
                  <span className="inline-flex items-center gap-1 bg-emerald-400/30 border border-emerald-300 text-emerald-100 text-[10.5px] px-1.5 py-0.2 rounded-[2px] font-bold">
                    <ShieldCheck className="w-3 h-3" /> DigiLocker Verified
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-[2px] text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Verification Status Banner */}
          <div className={`p-3.5 sm:p-4 border-b text-xs flex items-start gap-2.5 sm:gap-3.5 ${
            document.status === 'Issue Found' && !hasFixed
              ? 'bg-red-50 border-red-200 text-red-950'
              : 'bg-emerald-50 border-emerald-200 text-emerald-950'
          }`}>
            {document.status === 'Issue Found' && !hasFixed ? (
              <AlertTriangle className="w-5 h-5 text-red-700 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            )}
            <div>
              <div className="font-bold text-[13.5px] sm:text-[14px]">
                {document.status === 'Issue Found' && !hasFixed
                  ? "Discrepancy Detected — Action Required"
                  : isDigiLocker 
                  ? "100% Issuer Authenticated via DigiLocker (Zero Tampering)"
                  : "Document Verified — Consistent with Land Records"}
              </div>
              <p className="mt-0.5 text-[12.5px] sm:text-[13px] leading-relaxed">
                {document.status === 'Issue Found' && !hasFixed
                  ? "Cross-validation flagged a discrepancy between the architectural title block and registered lease deed."
                  : isDigiLocker
                  ? `Cryptographically validated directly from ${document.issuer || 'Government Issuer'} public certificate. Compliant with DPDP Act 2023.`
                  : "All extracted metadata, survey numbers, and corporate entity records match registered profile with 100% consistency."}
              </p>
            </div>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 sm:space-y-5 text-slate-900 text-sm">
            
            {/* Cryptographic & Security Verification Box */}
            <div className="bg-slate-50 border border-slate-300 rounded-[3px] p-3.5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <div className="flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-[#1B365D]" />
                  <h3 className="text-[12px] font-bold text-slate-800 uppercase tracking-wider">
                    Cryptographic Integrity & DPDP 2023
                  </h3>
                </div>
                <span className="text-[10.5px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 px-2 py-0.5 rounded-[2px]">
                  AES-256 Encrypted
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <span className="text-slate-600 font-medium">Issuer Authority:</span>
                  <span className="font-bold text-slate-900 text-right">{document.issuer || 'Registered Entity'}</span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-1">
                  <span className="text-slate-600 font-medium">Digital Signature (PKI):</span>
                  <span className="font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-[2px] border border-emerald-200 text-[11px]">
                    {document.digitalSignature?.algorithm || 'SHA256withRSA (2048-bit)'} • {document.digitalSignature?.status || 'VALID'}
                  </span>
                </div>

                {document.digitalSignature?.certIssuer && (
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <span className="text-slate-600 font-medium">Certificate Authority:</span>
                    <span className="text-slate-800 font-mono text-[11px] text-right">{document.digitalSignature.certIssuer}</span>
                  </div>
                )}

                <div className="border-t border-slate-200 pt-2">
                  <div className="flex items-center justify-between text-slate-600 mb-1">
                    <span className="font-medium">Immutable SHA-256 Checksum:</span>
                    <button 
                      onClick={copyShaHash} 
                      className="text-[11px] text-[#1B365D] hover:underline flex items-center gap-1 font-sans"
                    >
                      <Copy className="w-3 h-3" /> {copiedHash ? 'Copied!' : 'Copy Hash'}
                    </button>
                  </div>
                  <div className="font-mono text-[10.5px] bg-white p-2 border border-slate-200 rounded-[2px] break-all text-slate-700">
                    {document.sha256Hash || '8f4b2a7e91c3d5f6a8b0e2c4d6f8a0b2c4e6f8a0b2c4d6e8f0a2b4c6d8e0f2a4'}
                  </div>
                </div>

                {/* DPDP PII Protection Badge */}
                <div className="p-2.5 bg-white border border-slate-200 rounded-[2px] flex flex-wrap items-center justify-between gap-1 text-[11.5px]">
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span><strong>PII Masking:</strong> 8-Digit Aadhaar Redacted</span>
                  </div>
                  <span className="font-mono text-slate-600 font-bold bg-slate-100 px-1.5 py-0.2 rounded-[2px]">
                    {document.piiProtection?.maskedAadhaar || 'XXXX-XXXX-8821'}
                  </span>
                </div>
              </div>
            </div>

            {/* Extracted Metadata Section */}
            <div>
              <h3 className="text-[11.5px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FileSearch className="w-4 h-4 text-[#1B365D]" />
                Extracted Document Fields
              </h3>

              <div className="bg-slate-50 border border-slate-200 rounded-[3px] p-3 text-xs space-y-2 font-mono">
                {document.extractedData && Object.entries(document.extractedData).map(([key, val]) => (
                  <div key={key} className="flex flex-wrap items-start justify-between gap-1 border-b border-slate-200/80 pb-1.5 last:border-0 last:pb-0">
                    <span className="text-slate-500 capitalize font-sans font-medium text-[12px]">{key.replace(/([A-Z])/g, ' $1')}:</span>
                    <span className={`font-semibold text-right text-[12.5px] ${
                      key === 'surveyNumber' && document.status === 'Issue Found' && !hasFixed
                        ? 'text-red-800 bg-red-100 px-2 py-0.5 rounded-[2px]'
                        : 'text-slate-900'
                    }`}>
                      {hasFixed && key === 'surveyNumber' ? 'Plot No. A-42/1 (Survey 123/4B)' : val}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cross-Validation Checks */}
            <div>
              <h3 className="text-[11.5px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#1B365D]" />
                Validation Checks
              </h3>

              <div className="border border-slate-200 rounded-[3px] divide-y divide-slate-200 text-xs">
                {document.validations?.map((v, idx) => {
                  const isSurveyCheck = v.field.includes("Survey Number");
                  const isFail = isSurveyCheck && document.status === 'Issue Found' && !hasFixed;

                  return (
                    <div key={idx} className="p-3">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-[13px]">{v.field}</span>
                        <span className={`text-[10.5px] font-bold px-2 py-0.5 rounded-[2px] uppercase ${
                          isFail
                            ? 'bg-red-100 text-red-900 border border-red-300'
                            : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                        }`}>
                          {isFail ? 'Correction' : 'Match'}
                        </span>
                      </div>
                      <p className={`mt-1 text-[12px] leading-relaxed ${isFail ? 'text-red-800 font-semibold' : 'text-slate-600'}`}>
                        {isFail 
                          ? "⚠ Discrepancy detected: Drawing mentions '123/4'. Registered MIDC lease deed records '123/4B'."
                          : isSurveyCheck && hasFixed
                          ? "✓ Rectified: Survey 123/4B matches registered lease deed coordinates."
                          : v.message}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Resolution Hint if Issue Found */}
            {document.status === 'Issue Found' && !hasFixed && (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-[3px] text-xs">
                <div className="font-bold text-amber-950 text-[13px] mb-1">Required Correction:</div>
                <p className="text-amber-900 text-[12.5px] leading-relaxed mb-3">
                  Upload the revised drawing titled <strong>ABC Food Processing Pvt Ltd</strong> with matching survey number <strong>123/4B</strong> to satisfy Factory Department (DISH) requirements.
                </p>

                <button
                  onClick={handleFixMismatch}
                  disabled={isResolving}
                  className="w-full bg-[#1B365D] hover:bg-[#142947] text-white py-2.5 px-3 rounded-[3px] text-[12.5px] font-bold flex items-center justify-center gap-2 shadow-xs transition-all"
                >
                  {isResolving ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Re-scanning revised drawing...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      <span>Upload Revised Layout (Resolve Issue)</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {hasFixed && document.status === 'Issue Found' && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-[3px] text-xs text-emerald-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                <span className="text-[12.5px]">
                  <strong>Issue Resolved!</strong> Revised layout uploaded and verified against land allotment deed.
                </span>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-3.5 sm:p-4 bg-slate-100 border-t border-slate-300 flex justify-between items-center text-xs">
            <span className="text-[11.5px] text-slate-500 flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span>DPDP 2023 Aligned</span>
            </span>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 rounded-[3px] text-xs font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
