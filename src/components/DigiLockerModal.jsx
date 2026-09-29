import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  FileCheck2, 
  ArrowRight, 
  RefreshCw, 
  Building2, 
  Smartphone, 
  Check, 
  ExternalLink,
  KeyRound,
  FileText
} from 'lucide-react';
import { availableDigiLockerDocs } from '../data/documents';

export default function DigiLockerModal({ isOpen, onClose, onFetchSuccess, showToast }) {
  if (!isOpen) return null;

  // Steps: 1 = Auth/OTP, 2 = Consent Artefact, 3 = Select Docs, 4 = Fetching/Verifying, 5 = Done
  const [step, setStep] = useState(1);
  const [mobileNumber, setMobileNumber] = useState('9876543210');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [selectedDocIds, setSelectedDocIds] = useState(['dl-coi', 'dl-udyam', 'dl-pan', 'dl-land']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyProgress, setVerifyProgress] = useState(0);

  const handleSendOtp = () => {
    setOtpSent(true);
    setOtp('123456'); // auto-fill for smooth hackathon demo
    showToast?.("DigiLocker Demo OTP sent: 123456", "info");
  };

  const handleVerifyOtp = () => {
    if (otp.length < 6) {
      showToast?.("Please enter 6-digit OTP", "error");
      return;
    }
    setStep(2);
  };

  const handleConsentApprove = () => {
    setStep(3);
  };

  const toggleDocSelect = (id) => {
    setSelectedDocIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleStartIngestion = () => {
    if (selectedDocIds.length === 0) {
      showToast?.("Please select at least one document to fetch", "error");
      return;
    }

    setStep(4);
    setIsVerifying(true);
    setVerifyProgress(20);

    setTimeout(() => setVerifyProgress(50), 600);
    setTimeout(() => setVerifyProgress(80), 1200);
    setTimeout(() => {
      setVerifyProgress(100);
      setIsVerifying(false);
      setStep(5);
    }, 1800);
  };

  const handleFinish = () => {
    const fetchedDocs = availableDigiLockerDocs.filter(d => selectedDocIds.includes(d.id));
    onFetchSuccess?.(fetchedDocs);
    showToast?.(`Successfully fetched & cryptographically verified ${fetchedDocs.length} documents via DigiLocker!`, "success");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" 
        onClick={onClose}
      />

      <div className="relative bg-white rounded-[4px] border border-slate-300 shadow-2xl w-full max-w-2xl overflow-hidden z-10 flex flex-col">
        {/* DigiLocker Official Government Banner Header */}
        <div className="bg-[#1B365D] text-white p-4.5 flex items-center justify-between border-b border-blue-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[3px] bg-white p-1 flex items-center justify-center shadow-inner">
              <span className="text-[#1B365D] font-extrabold text-sm tracking-tighter">DL</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider bg-white/20 text-white px-2 py-0.5 rounded-[2px]">
                  IndiaStack • MeitY
                </span>
                <span className="text-[11.5px] text-emerald-300 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> 256-Bit Encrypted
                </span>
              </div>
              <h2 className="text-[18px] font-bold text-white mt-0.5">
                DigiLocker Document Gateway
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-[2px] text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator Bar */}
        <div className="bg-slate-100 px-3 sm:px-5 py-2.5 border-b border-slate-200 flex items-center justify-between text-xs font-semibold overflow-x-auto">
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${
              step >= 1 ? 'bg-[#1B365D] text-white font-bold' : 'bg-slate-300 text-slate-700'
            }`}>1</span>
            <span className={`text-[11px] sm:text-xs ${step === 1 ? 'text-[#1B365D] font-bold' : 'text-slate-600'}`}>
              <span className="hidden xs:inline">Auth</span><span className="hidden sm:inline">enticate</span>
            </span>
          </div>
          <ArrowRight className="w-3 h-3 text-slate-400 shrink-0 mx-1" />

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${
              step >= 2 ? 'bg-[#1B365D] text-white font-bold' : 'bg-slate-300 text-slate-700'
            }`}>2</span>
            <span className={`text-[11px] sm:text-xs ${step === 2 ? 'text-[#1B365D] font-bold' : 'text-slate-600'}`}>
              Consent
            </span>
          </div>
          <ArrowRight className="w-3 h-3 text-slate-400 shrink-0 mx-1" />

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${
              step >= 3 ? 'bg-[#1B365D] text-white font-bold' : 'bg-slate-300 text-slate-700'
            }`}>3</span>
            <span className={`text-[11px] sm:text-xs ${step === 3 ? 'text-[#1B365D] font-bold' : 'text-slate-600'}`}>
              Select
            </span>
          </div>
          <ArrowRight className="w-3 h-3 text-slate-400 shrink-0 mx-1" />

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${
              step >= 4 ? 'bg-emerald-700 text-white font-bold' : 'bg-slate-300 text-slate-700'
            }`}>4</span>
            <span className={`text-[11px] sm:text-xs ${step >= 4 ? 'text-emerald-800 font-bold' : 'text-slate-600'}`}>
              Verify
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 text-slate-800 text-sm overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* STEP 1: AUTH / OTP */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3.5 bg-blue-50/80 border border-blue-200 rounded-[3px]">
                <KeyRound className="w-5 h-5 text-[#1B365D] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <div className="font-bold text-[#1B365D] text-[13px]">Aadhaar / Mobile OTP Authentication</div>
                  <p className="text-slate-600 mt-0.5 leading-relaxed">
                    Authenticate via registered DigiLocker mobile or Aadhaar linked number to authorize INDUSTRIA as a certified Requester Entity.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Registered Mobile / Aadhaar Linked Number:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      placeholder="Enter 10-digit mobile number"
                      className="flex-1 px-3 py-2 border border-slate-300 rounded-[3px] text-sm font-mono focus:outline-hidden focus:border-[#1B365D]"
                    />
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 rounded-[3px] text-xs font-semibold"
                    >
                      {otpSent ? 'Resend OTP' : 'Send OTP'}
                    </button>
                  </div>
                </div>

                {otpSent && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-[3px] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-emerald-900">Enter 6-Digit OTP:</span>
                      <span className="text-emerald-700 font-mono text-[11px]">Demo OTP: 123456</span>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="123456"
                        className="w-full tracking-widest text-center text-lg font-mono font-bold px-3 py-1.5 border border-emerald-300 rounded-[3px] bg-white focus:outline-hidden"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-[3px] text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  disabled={!otpSent}
                  className="px-5 py-2 bg-[#1B365D] hover:bg-[#142947] disabled:opacity-50 text-white rounded-[3px] text-xs font-bold flex items-center gap-1.5"
                >
                  <span>Verify & Proceed</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: DEPA CONSENT ARTEFACT */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-[3px] space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-700" />
                    <span className="font-bold text-slate-900 text-[14px]">Electronic Consent Artefact</span>
                  </div>
                  <span className="text-[11px] font-mono font-bold bg-white border border-slate-300 px-2 py-0.5 rounded-[2px] text-slate-600">
                    DEPA-CONSENT-2026-MH-9941
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 font-semibold">Requester Entity:</span>
                    <div className="font-bold text-slate-900">INDUSTRIA Single-Window Portal</div>
                  </div>
                  <div>
                    <span className="text-slate-500 font-semibold">Purpose of Access:</span>
                    <div className="font-bold text-slate-900">Industrial Clearances & Pre-Scrutiny</div>
                  </div>
                  <div>
                    <span className="text-slate-500 font-semibold">Consent Validity:</span>
                    <div className="font-bold text-slate-900">30 Days (Revocable anytime)</div>
                  </div>
                  <div>
                    <span className="text-slate-500 font-semibold">Access Permission:</span>
                    <div className="font-bold text-slate-900">View & Verify Only (Ephemeral)</div>
                  </div>
                </div>

                <div className="p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-[2px] text-xs text-emerald-900">
                  <p className="font-semibold">
                    ✓ DPDP Act 2023 Compliant: Personal identifiers (Aadhaar/PAN) will be automatically masked. No raw copies shared with unassigned officers.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-700">
                <input type="checkbox" id="consent-check" defaultChecked className="rounded-[2px] text-[#1B365D]" />
                <label htmlFor="consent-check" className="cursor-pointer">
                  I hereby authorize INDUSTRIA to fetch and cryptographically verify my selected statutory documents from certified DigiLocker Issuers.
                </label>
              </div>

              <div className="pt-2 flex justify-between border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-[3px] text-xs font-semibold"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleConsentApprove}
                  className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-[3px] text-xs font-bold flex items-center gap-1.5"
                >
                  <span>Grant Consent & Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: DOCUMENT SELECTOR */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-slate-900 text-[14px]">
                  Select Available Issuer Documents to Fetch:
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  These records are retrieved directly from verified government databases with X.509 digital certificates.
                </p>
              </div>

              <div className="space-y-2.5 max-h-[260px] overflow-y-auto pr-1">
                {availableDigiLockerDocs.map((doc) => {
                  const isSelected = selectedDocIds.includes(doc.id);

                  return (
                    <div
                      key={doc.id}
                      onClick={() => toggleDocSelect(doc.id)}
                      className={`p-3 rounded-[3px] border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected 
                          ? 'border-[#1B365D] bg-blue-50/60 shadow-xs' 
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-[2px] flex items-center justify-center text-xs font-bold ${
                          isSelected ? 'bg-[#1B365D] text-white' : 'border border-slate-300 bg-white'
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-[13.5px] flex items-center gap-2">
                            <span>{doc.title}</span>
                            <span className="text-[10.5px] font-mono bg-white border border-slate-300 px-1.5 py-0.2 text-slate-600 rounded-[2px]">
                              {doc.size}
                            </span>
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                            <Building2 className="w-3 h-3 text-slate-400" />
                            <span>Issuer: <strong>{doc.issuer}</strong></span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-[2px] border border-emerald-200">
                          <ShieldCheck className="w-3 h-3" />
                          Issuer Signed
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 flex justify-between border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-[3px] text-xs font-semibold"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleStartIngestion}
                  className="px-5 py-2 bg-[#1B365D] hover:bg-[#142947] text-white rounded-[3px] text-xs font-bold flex items-center gap-1.5 shadow-sm"
                >
                  <span>Fetch & Verify ({selectedDocIds.length}) Documents</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: FETCHING & CRYPTOGRAPHIC VERIFICATION PROGRESS */}
          {step === 4 && (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-blue-50 border-2 border-[#1B365D] flex items-center justify-center">
                <RefreshCw className="w-7 h-7 text-[#1B365D] animate-spin" />
              </div>

              <div className="space-y-1">
                <h3 className="text-[17px] font-bold text-slate-900">
                  Cryptographic Ingestion in Progress...
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Pulling signed binary streams from Government Issuers, checking X.509 PKI certificates, and generating SHA-256 state hashes.
                </p>
              </div>

              <div className="max-w-md mx-auto space-y-2">
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#1B365D] h-full transition-all duration-500 rounded-full" 
                    style={{ width: `${verifyProgress}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] font-mono text-slate-600">
                  <span>TLS 1.3 Secure Rail</span>
                  <span>{verifyProgress}% Complete</span>
                  <span>AES-256 Envelope KMS</span>
                </div>
              </div>

              <div className="pt-2 text-[12px] font-mono text-slate-600 space-y-1 bg-slate-50 p-3 rounded-[3px] max-w-md mx-auto border border-slate-200 text-left">
                <div className="flex items-center gap-2 text-emerald-800">
                  <Check className="w-3.5 h-3.5" />
                  <span>Validating MCA21 X.509 Certificate Chain...</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-800">
                  <Check className="w-3.5 h-3.5" />
                  <span>Masking Aadhaar 8-Digits (XXXX-XXXX-8821)...</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-800">
                  <Check className="w-3.5 h-3.5" />
                  <span>Writing to Immutable Audit Ledger (LOG-9020)...</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: COMPLETED */}
          {step === 5 && (
            <div className="py-4 text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-[18px] font-bold text-emerald-950">
                  All Selected Documents Verified & Loaded!
                </h3>
                <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto">
                  Fetched directly from authoritative government registries. Zero manual tampering risk. Cross-consistency checks against statutory approval rules have been satisfied.
                </p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-[3px] text-xs font-mono text-slate-700 max-w-md mx-auto text-left space-y-1">
                <div><strong>DEPA Consent ID:</strong> DEPA-CONSENT-2026-MH-9941</div>
                <div><strong>Digital Signature:</strong> SHA256withRSA (2048-bit Verified)</div>
                <div><strong>Audit Hash:</strong> e7b8c9d0e1f2...a7b8</div>
              </div>

              <div className="pt-2 flex justify-center">
                <button
                  type="button"
                  onClick={handleFinish}
                  className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-[3px] text-xs font-bold flex items-center gap-2 shadow-sm"
                >
                  <span>View Verified Dossier</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
