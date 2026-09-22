import React from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';

export default function LegalModal({ isOpen, onClose, documentType = 'terms' }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="bg-white rounded-lg border border-[#D2D2D7] max-w-2xl w-full p-6 sm:p-8 max-h-[85vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-[#E5E5EA]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-[#F5F5F7] border border-[#D2D2D7] flex items-center justify-center text-[#003366]">
              {documentType === 'terms' ? <FileText className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-[#1D1D1F]">
                {documentType === 'terms' ? 'Terms of Service' : 'Privacy & Data Governance Policy'}
              </h2>
              <span className="text-[11px] font-mono text-[#86868B] uppercase tracking-wider">
                Official Draft for Department Review • SIH 2026 Prototype
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-md hover:bg-[#F5F5F7] text-[#6E6E73] hover:text-[#1D1D1F] flex items-center justify-center transition-colors text-sm"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-5 space-y-4 text-xs text-[#424245] leading-relaxed">
          {documentType === 'terms' ? (
            <>
              <div>
                <h3 className="text-[13px] font-semibold text-[#1D1D1F] mb-1">1. Statutory Single-Window Mandate</h3>
                <p>
                  INDUSTRIA is operated under the single-window facilitation framework of the Department of Industries, Government of Maharashtra. Clearances, licences, and statutory approvals processed through this platform remain governed by applicable central and state enactments including the Maharashtra Regional and Town Planning Act, the Factories Act 1948, and the Water & Air Pollution Control Acts.
                </p>
              </div>

              <div>
                <h3 className="text-[13px] font-semibold text-[#1D1D1F] mb-1">2. Authenticity of Filings & Pre-Scrutiny Checks</h3>
                <p>
                  Automated pre-scrutiny checks, cross-field title validations, and coordinate verifications are diagnostic aids provided to prevent departmental query cycles. Final legal approval and site inspection authority remain exclusively with authorized department officers.
                </p>
              </div>

              <div>
                <h3 className="text-[13px] font-semibold text-[#1D1D1F] mb-1">3. Immutable Audit Logging</h3>
                <p>
                  Every document view, token access, and state modification is recorded on a tamper-evident audit ledger with actor identifiers, timestamped in accordance with administrative transparency requirements.
                </p>
              </div>

              <div>
                <h3 className="text-[13px] font-semibold text-[#1D1D1F] mb-1">4. Prototype Status & Review Disclaimer</h3>
                <p className="bg-[#F5F5F7] p-3 rounded-md border border-[#E5E5EA] text-[#6E6E73]">
                  <strong>Notice:</strong> This deployment represents a high-fidelity prototype created for evaluation during the Smart India Hackathon. Legal terms and administrative commitments are draft specifications subject to state gazette notification.
                </p>
              </div>
            </>
          ) : (
            <>
              <div>
                <h3 className="text-[13px] font-semibold text-[#1D1D1F] mb-1">1. Digital Personal Data Protection (DPDP) Act 2023 Compliance</h3>
                <p>
                  The portal implements data minimization and purpose specification principles. Personally Identifiable Information (PII) such as Aadhaar tokens and PAN credentials are masked at ingestion and stored in encrypted form.
                </p>
              </div>

              <div>
                <h3 className="text-[13px] font-semibold text-[#1D1D1F] mb-1">2. DigiLocker & IndiaStack Integration</h3>
                <p>
                  Documents fetched from DigiLocker (MCA Certificate of Incorporation, Udyam Registration, Land Records) are authenticated using X.509 PKI signatures issued by licensed Certifying Authorities. Citizen consent is logged under the DEPA (Data Empowerment and Protection Architecture) specification.
                </p>
              </div>

              <div>
                <h3 className="text-[13px] font-semibold text-[#1D1D1F] mb-1">3. Ephemeral Department Access</h3>
                <p>
                  Department scrutiny officers receive time-bounded ephemeral access tokens (15-minute expiry) to review submitted engineering drawings and test certificates. Documents are not replicated or stored outside state cloud infrastructure.
                </p>
              </div>

              <div>
                <h3 className="text-[13px] font-semibold text-[#1D1D1F] mb-1">4. Data Retention & Erasure</h3>
                <p>
                  Enterprise dossiers are retained strictly for the statutory validity period of the respective clearances. Revocation of consent triggers unlinking of credentials in compliance with DPDP provisions.
                </p>
              </div>
            </>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-[#E5E5EA] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-md bg-[#003366] hover:bg-[#002244] text-white text-xs font-semibold transition-colors"
          >
            Close Document
          </button>
        </div>
      </div>
    </div>
  );
}
