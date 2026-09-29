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
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
            <span>Document Repository</span>
            <span className="text-emerald-800 bg-emerald-50 text-[10.5px] px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1 font-bold">
              <ShieldCheck className="w-3 h-3" /> DPDP Act 2023 Compliant
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">
            Document Vault & Verification
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Automated cross-field validation, OCR inconsistency checks, and authenticated pull from DigiLocker.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* DigiLocker Button */}
          <button
            onClick={onOpenDigiLocker}
            className="px-4 py-2 bg-[#1E4E8C] hover:bg-[#143D6F] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-white" />
            <span>Fetch via DigiLocker</span>
          </button>

          <button
            onClick={() => {
              onUploadSimulatedFile({ name: `Supplemental_Dossier_${Date.now().toString().slice(-4)}.pdf` });
              showToast?.("Simulated upload of supplementary compliance dossier", "info");
            }}
            className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
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
        className={`p-6 border-2 border-dashed rounded-xl bg-white text-center transition-all shadow-xs ${
          isDragging
            ? 'border-[#1E4E8C] bg-blue-50/50'
            : 'border-slate-300 hover:border-[#1E4E8C]'
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
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 sm:p-5 bg-slate-50/70 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900">
              Ingested Documents Register
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Select any document row to view extracted metadata, cryptographic signature, and pre-scrutiny report.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-white p-1 rounded-lg border border-slate-300 text-xs shadow-2xs">
            <button
              onClick={() => setFilter('All')}
              className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${filter === 'All' ? 'bg-[#1E4E8C] text-white' : 'text-slate-600 hover:text-slate-900'}`}
            >
              All ({documents.length})
            </button>
            <button
              onClick={() => setFilter('DigiLocker')}
              className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${filter === 'DigiLocker' ? 'bg-[#1E4E8C] text-white' : 'text-slate-600 hover:text-slate-900'}`}
            >
              DigiLocker ({digiLockerCount})
            </button>
            <button
              onClick={() => setFilter('Issues')}
              className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${filter === 'Issues' ? 'bg-red-700 text-white' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Issues ({issuesCount})
            </button>
            <button
              onClick={() => setFilter('Valid')}
              className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${filter === 'Valid' ? 'bg-emerald-700 text-white' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Verified ({validCount})
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 border-b border-slate-200 uppercase text-[11px] font-bold tracking-wider">
                <th className="py-3 px-4">Document Name</th>
                <th className="py-3 px-4">Source & Issuer</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4 text-center">Digital Signature</th>
                <th className="py-3 px-4">Scrutiny Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredDocs.map((doc) => {
                const isIssue = doc.status === 'Issue Found';
                const isDL = doc.source === 'DigiLocker';

                return (
                  <tr
                    key={doc.id}
                    onClick={() => onSelectDocument(doc)}
                    className={`hover:bg-slate-50 cursor-pointer transition-colors ${
                      isIssue ? 'bg-red-50/30' : ''
                    }`}
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 text-xs">
                        {doc.documentType}
                      </div>
                      <div className="font-mono text-slate-500 text-[11px] mt-0.5">
                        {doc.fileName} ({doc.size})
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      {isDL ? (
                        <div className="space-y-0.5">
                          <span className="inline-flex items-center gap-1 text-[10.5px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded">
                            <ShieldCheck className="w-3 h-3 text-emerald-600" />
                            DigiLocker
                          </span>
                          <div className="text-[11px] text-slate-500 truncate max-w-[180px]">
                            {doc.issuer || 'Government Registry'}
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-0.5">
                          <span className="inline-flex items-center gap-1 text-[10.5px] font-medium bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded">
                            Direct Upload
                          </span>
                          <div className="text-[11px] text-slate-500 truncate max-w-[180px]">
                            {doc.issuer || 'Consultant Upload'}
                          </div>
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-slate-600 font-medium">
                      {doc.category}
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      {doc.digitalSignature?.status === 'VALID' ? (
                        <span className="inline-flex items-center gap-1 text-[10.5px] font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          X.509 Valid
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10.5px] font-mono text-amber-800 bg-amber-50 border border-amber-300 px-2 py-0.5 rounded">
                          Pending Sig
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      {isIssue ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-bold bg-red-50 text-red-800 border border-red-300">
                          <AlertTriangle className="w-3 h-3 text-red-600" />
                          Issue Found
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-300">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Valid
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectDocument(doc);
                        }}
                        className={`px-3 py-1 rounded-md text-xs font-bold transition-colors ${
                          isIssue
                            ? 'bg-[#1E4E8C] hover:bg-[#143D6F] text-white shadow-2xs'
                            : 'text-[#1E4E8C] hover:text-[#143D6F] hover:underline'
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
