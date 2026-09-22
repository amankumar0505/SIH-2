import React, { useState } from 'react';
import { 
  Upload, 
  CheckCircle2, 
  AlertTriangle, 
  Plus,
  ShieldCheck
} from 'lucide-react';

export default function Documents({ 
  project, 
  documents, 
  onSelectDocument, 
  onUploadSimulatedFile,
  onOpenDigiLocker,
  showToast 
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [filter, setFilter] = useState('All');

  const handleSimulateDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    onUploadSimulatedFile({ name: "Revised_Factory_Master_Plan_v2.pdf" });
    showToast?.("Uploaded Revised_Factory_Master_Plan_v2.pdf — Scrutiny Verified", "success");
  };

  const digiLockerCount = documents.filter(d => d.source === 'DigiLocker').length;
  const issuesCount = documents.filter(d => d.status === 'Issue Found').length;
  const validCount = documents.filter(d => d.status === 'Valid').length;

  const filteredDocs = filter === 'All'
    ? documents
    : filter === 'DigiLocker'
    ? documents.filter(d => d.source === 'DigiLocker')
    : filter === 'Issues'
    ? documents.filter(d => d.status === 'Issue Found')
    : documents.filter(d => d.status === 'Valid');

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3 pb-1">
        <div>
          <div className="text-[11px] font-semibold text-[#86868B] uppercase tracking-wider flex items-center gap-1.5">
            <span>Document Repository</span>
            <span className="text-[#14532D] bg-[#F0FDF4] text-[10.5px] px-1.5 py-0.2 rounded border border-[#A7F3D0] flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> DPDP Act 2023 Compliant
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] tracking-tight mt-0.5">
            Document Vault & Verification
          </h1>
          <p className="text-xs text-[#6E6E73] mt-1">
            Automated cross-field validation and authenticated pull from state registries via DigiLocker.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* DigiLocker Button */}
          <button
            onClick={onOpenDigiLocker}
            className="px-3.5 py-1.5 bg-[#003366] hover:bg-[#002244] text-white rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-white" />
            <span>Fetch via DigiLocker</span>
          </button>

          <button
            onClick={() => {
              onUploadSimulatedFile({ name: `Supplemental_Dossier_${Date.now().toString().slice(-4)}.pdf` });
              showToast?.("Simulated upload of supplementary compliance dossier", "info");
            }}
            className="px-3.5 py-1.5 bg-white border border-[#D2D2D7] hover:bg-[#F5F5F7] text-[#1D1D1F] rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Upload File</span>
          </button>
        </div>
      </div>

      {/* Upload Drop Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleSimulateDrop}
        className={`p-6 border border-dashed rounded-lg bg-white text-center transition-colors ${
          isDragging
            ? 'border-[#003366] bg-[#F5F5F7]'
            : 'border-[#D2D2D7] hover:border-[#86868B]'
        }`}
      >
        <div className="max-w-md mx-auto space-y-2">
          <div className="w-8 h-8 mx-auto rounded-md bg-[#F5F5F7] border border-[#E5E5EA] flex items-center justify-center text-[#003366]">
            <Upload className="w-4 h-4" />
          </div>
          <div className="text-xs font-semibold text-[#1D1D1F]">
            Direct Upload for Architectural Blueprints or Structural Drawings
          </div>
          <p className="text-[11.5px] text-[#6E6E73]">
            Uploaded documents undergo SHA-256 hashing and automated pre-scrutiny cross checks.
          </p>
          <div className="pt-1 flex justify-center gap-2">
            <button
              onClick={() => {
                onUploadSimulatedFile({ name: "Architect_Stability_Certificate_2026.pdf" });
                showToast?.("Uploaded Architect_Stability_Certificate_2026.pdf", "info");
              }}
              className="px-3 py-1 bg-white border border-[#D2D2D7] hover:bg-[#F5F5F7] text-[#1D1D1F] rounded-md text-xs font-medium transition-colors"
            >
              Select File from Computer
            </button>
            <button
              onClick={onOpenDigiLocker}
              className="px-3 py-1 bg-[#F5F5F7] border border-[#D2D2D7] hover:bg-[#E5E5EA] text-[#003366] rounded-md text-xs font-semibold transition-colors"
            >
              Pull from DigiLocker
            </button>
          </div>
        </div>
      </div>

      {/* Document Verification Table */}
      <div className="bg-white rounded-lg border border-[#D2D2D7] overflow-hidden">
        <div className="p-4 bg-[#FAFAFA] border-b border-[#E5E5EA] flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-[#1D1D1F]">
              Ingested Documents Register
            </h2>
            <p className="text-xs text-[#6E6E73] mt-0.5">
              Select any document row to view extracted metadata, cryptographic signature, and pre-scrutiny report.
            </p>
          </div>

          <div className="flex items-center gap-1 bg-white p-1 rounded-md border border-[#D2D2D7] text-xs">
            <button
              onClick={() => setFilter('All')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${filter === 'All' ? 'bg-[#003366] text-white' : 'text-[#6E6E73] hover:text-[#1D1D1F]'}`}
            >
              All ({documents.length})
            </button>
            <button
              onClick={() => setFilter('DigiLocker')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${filter === 'DigiLocker' ? 'bg-[#003366] text-white' : 'text-[#6E6E73] hover:text-[#1D1D1F]'}`}
            >
              DigiLocker ({digiLockerCount})
            </button>
            <button
              onClick={() => setFilter('Issues')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${filter === 'Issues' ? 'bg-[#991B1B] text-white' : 'text-[#6E6E73] hover:text-[#1D1D1F]'}`}
            >
              Issues ({issuesCount})
            </button>
            <button
              onClick={() => setFilter('Valid')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${filter === 'Valid' ? 'bg-[#14532D] text-white' : 'text-[#6E6E73] hover:text-[#1D1D1F]'}`}
            >
              Verified ({validCount})
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAFAFA] text-[#6E6E73] border-b border-[#E5E5EA]">
                <th className="py-2.5 px-4 font-semibold text-xs">Document Name</th>
                <th className="py-2.5 px-4 font-semibold text-xs">Source & Issuer</th>
                <th className="py-2.5 px-4 font-semibold text-xs">Category</th>
                <th className="py-2.5 px-4 text-center font-semibold text-xs">Digital Signature</th>
                <th className="py-2.5 px-4 font-semibold text-xs">Scrutiny Status</th>
                <th className="py-2.5 px-4 text-right font-semibold text-xs">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F0F2]">
              {filteredDocs.map((doc) => {
                const isIssue = doc.status === 'Issue Found';
                const isDL = doc.source === 'DigiLocker';

                return (
                  <tr
                    key={doc.id}
                    onClick={() => onSelectDocument(doc)}
                    className={`hover:bg-[#F5F5F7] cursor-pointer transition-colors ${
                      isIssue ? 'bg-[#FEF2F2]/30' : ''
                    }`}
                  >
                    <td className="py-3 px-4">
                      <div className="font-medium text-[#1D1D1F] text-xs">
                        {doc.documentType}
                      </div>
                      <div className="font-mono text-[#86868B] text-[11px] mt-0.5">
                        {doc.fileName} ({doc.size})
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      {isDL ? (
                        <div className="space-y-0.5">
                          <span className="inline-flex items-center gap-1 text-[10.5px] font-medium bg-[#F0FDF4] text-[#14532D] border border-[#A7F3D0] px-1.5 py-0.2 rounded">
                            <ShieldCheck className="w-3 h-3 text-[#1A7F37]" />
                            DigiLocker
                          </span>
                          <div className="text-[11px] text-[#6E6E73] truncate max-w-[180px]">
                            {doc.issuer || 'Government Registry'}
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-0.5">
                          <span className="inline-flex items-center gap-1 text-[10.5px] font-medium bg-[#F5F5F7] text-[#6E6E73] border border-[#E5E5EA] px-1.5 py-0.2 rounded">
                            Direct Upload
                          </span>
                          <div className="text-[11px] text-[#86868B] truncate max-w-[180px]">
                            {doc.issuer || 'Consultant Upload'}
                          </div>
                        </div>
                      )}
                    </td>

                    <td className="py-3 px-4 text-[#6E6E73] text-xs">
                      {doc.category}
                    </td>

                    <td className="py-3 px-4 text-center">
                      {doc.digitalSignature?.status === 'VALID' ? (
                        <span className="inline-flex items-center gap-1 text-[10.5px] font-mono font-medium text-[#14532D] bg-[#F0FDF4] border border-[#A7F3D0] px-1.5 py-0.2 rounded">
                          <CheckCircle2 className="w-3 h-3 text-[#1A7F37]" />
                          X.509 Valid
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10.5px] font-mono text-[#78350F] bg-[#FFFBEB] border border-[#FDE68A] px-1.5 py-0.2 rounded">
                          Pending Sig
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4">
                      {isIssue ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-[#FEF2F2] text-[#991B1B] border border-[#FECACA]">
                          <AlertTriangle className="w-3 h-3 text-[#CF222E]" />
                          Issue Found
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-[#F0FDF4] text-[#14532D] border border-[#A7F3D0]">
                          <CheckCircle2 className="w-3 h-3 text-[#1A7F37]" />
                          Valid
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectDocument(doc);
                        }}
                        className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                          isIssue
                            ? 'bg-[#003366] text-white'
                            : 'text-[#003366] hover:underline'
                        }`}
                      >
                        {isIssue ? 'Inspect & Rectify' : 'View Report'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
