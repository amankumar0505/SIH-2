import React, { useState } from 'react';
import { 
  Layers, 
  Cpu, 
  ShieldCheck, 
  Database, 
  CheckCircle2, 
  UserCheck, 
  FileText, 
  BarChart3,
  Lock,
  KeyRound,
  Eye,
  FileCheck2,
  Terminal,
  RefreshCw,
  Clock
} from 'lucide-react';
import { trustAndGovernancePrinciples } from '../../data/rules';
import { simulatedAuditLogs } from '../../data/documents';

export default function Architecture() {
  const [activeLogs, setActiveLogs] = useState(simulatedAuditLogs);
  const [isRefreshingLogs, setIsRefreshingLogs] = useState(false);

  const pipelineSteps = [
    { step: 1, title: "1. Entrepreneur Input", desc: "Industry, Location, Employees, Investment, Hazardous flag", type: "Input" },
    { step: 2, title: "2. Project Profile", desc: "Normalized parameters & classification metadata", type: "Input" },
    { step: 3, title: "3. Rule Engine", desc: "Evaluates statutory acts & worker/power thresholds", type: "Deterministic Rule" },
    { step: 4, title: "4. DigiLocker & IndiaStack", desc: "Direct pull from ITD, MCA, Mahabhumi with X.509 signature verification", type: "Security" },
    { step: 5, title: "5. Dependency Graph", desc: "Calculates prerequisite stages and parallel opportunities", type: "Deterministic Rule" },
    { step: 6, title: "6. Document Intelligence", desc: "Cross-checks title consistency & survey coordinates", type: "AI-Assisted" },
    { step: 7, title: "7. Single Window Vault", desc: "AES-256 encrypted dossier with DPDP 2023 PII masking", type: "Security" },
    { step: 8, title: "8. Compliance & Renewals", desc: "Multi-tier proactive expiry monitoring (30d/15d/7d)", type: "Compliance" },
    { step: 9, title: "9. Department Analytics", desc: "SLA variance tracking & bottleneck diagnostics", type: "Government" }
  ];

  const refreshAuditLogs = () => {
    setIsRefreshingLogs(true);
    setTimeout(() => {
      setIsRefreshingLogs(false);
      const newEntry = {
        id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: "Just now (Live Event)",
        actor: "OFFICER-POLLUTION-9812",
        role: "Regional Officer (MPCB Pune)",
        department: "Maharashtra Pollution Control Board",
        action: "EPHEMERAL_TOKEN_ACCESSED",
        targetDoc: "NABL_Water_Quality_Analysis.pdf",
        tokenExpiry: "14m 58s remaining",
        sha256State: "4c5d6e7f...2a3b",
        status: "AUTHORIZED",
        ipAddress: "10.42.18.110 (Govt Cloud)",
        purpose: "Consent to Establish Pre-Scrutiny Verification"
      };
      setActiveLogs(prev => [newEntry, ...prev.slice(0, 4)]);
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3 pb-1">
        <div>
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
            <span>System Design, Security & Governance</span>
            <span className="text-emerald-800 font-bold bg-emerald-50 text-[10.5px] px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> DPDP Act 2023 Certified
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">
            System Architecture & Security Matrix
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Zero-Trust DigiLocker Ingestion, Deterministic Legal Rules, and End-to-End Cryptographic Protection.
          </p>
        </div>
      </div>

      {/* 4-Pillar Security Framework */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <Lock className="w-5 h-5 text-[#1E4E8C]" />
            <h2 className="text-base font-bold text-slate-900">
              Enterprise Data Security & DPDP Act 2023 Matrix
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10.5px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded">
              AES-256-GCM
            </span>
            <span className="text-[10.5px] font-mono font-bold bg-blue-50 text-[#1E4E8C] border border-blue-200 px-2 py-0.5 rounded">
              TLS 1.3
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {/* Pillar 1 */}
          <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-lg space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-blue-100 text-blue-900 flex items-center justify-center font-bold text-xs">
                🔐
              </div>
              <h3 className="font-bold text-slate-900 text-sm">
                1. Data Encryption (At-Rest & In-Transit)
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong>In-Transit:</strong> All API communication is strictly encrypted over <strong>TLS 1.3</strong> with Perfect Forward Secrecy.<br />
              <strong>At-Rest:</strong> Files are stored in an encrypted vault using <strong>AES-256-GCM Envelope Encryption</strong> with keys managed via AWS / NIC Key Management Service (KMS).
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-lg space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold text-xs">
                🛡️
              </div>
              <h3 className="font-bold text-slate-900 text-sm">
                2. PII Protection & Data Minimization (DPDP 2023)
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong>Aadhaar Redaction:</strong> First 8 digits are automatically masked (<code>XXXX-XXXX-8821</code>) as mandated by UIDAI.<br />
              <strong>Data Minimization:</strong> Stores cryptographic hashes and verification booleans rather than unencrypted financial balances.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-4 bg-slate-50/80 border border-slate-200 rounded-[3px] space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-[2px] bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-xs">
                👥
              </div>
              <h3 className="font-bold text-slate-900 text-[14.5px]">
                3. Granular Role-Based Access Control (RBAC)
              </h3>
            </div>
            <p className="text-[13px] text-slate-600 leading-relaxed">
              <strong>Department Data Silos:</strong> A Fire Officer (MFES) cannot view unrelated company financial ledgers or IT returns.<br />
              <strong>Ephemeral Tokens:</strong> Officers receive time-bound signed URLs (15-minute expiry) strictly during active scrutiny sessions.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="p-4 bg-slate-50/80 border border-slate-200 rounded-[3px] space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-[2px] bg-purple-100 text-purple-900 flex items-center justify-center font-bold text-xs">
                📜
              </div>
              <h3 className="font-bold text-slate-900 text-[14.5px]">
                4. Immutable Tamper-Proof Audit Trail
              </h3>
            </div>
            <p className="text-[13px] text-slate-600 leading-relaxed">
              <strong>Cryptographic Event Logging:</strong> Every document access, status transition, and query is hashed with <strong>SHA-256</strong>.<br />
              <strong>SIEM Integration:</strong> Audit logs are append-only and ready for government CERT-In forensic monitoring.
            </p>
          </div>
        </div>
      </div>

      {/* Live Cryptographic Audit Trail Ledger */}
      <div className="bg-white rounded-[3px] border border-[#CBD5E1] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-[#1B365D]" />
            <h2 className="text-[18px] font-bold text-slate-900">
              Live Tamper-Proof Audit Trail Ledger (SIEM Integration)
            </h2>
          </div>

          <button
            onClick={refreshAuditLogs}
            disabled={isRefreshingLogs}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 rounded-[3px] text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshingLogs ? 'animate-spin' : ''}`} />
            <span>Simulate Access Event</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="bg-slate-100 text-slate-700 border-b border-slate-300">
                <th className="py-2.5 px-3 font-bold">Log ID & Time</th>
                <th className="py-2.5 px-3 font-bold">Actor / Role</th>
                <th className="py-2.5 px-3 font-bold">Action</th>
                <th className="py-2.5 px-3 font-bold">Target File</th>
                <th className="py-2.5 px-3 font-bold">SHA-256 State</th>
                <th className="py-2.5 px-3 text-right font-bold">Integrity Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {activeLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3">
                    <span className="font-bold text-slate-900">{log.id}</span>
                    <div className="text-[11px] text-slate-500 font-sans">{log.timestamp}</div>
                  </td>
                  <td className="py-2.5 px-3 font-sans">
                    <div className="font-bold text-slate-900">{log.actor}</div>
                    <div className="text-[11px] text-slate-500">{log.role}</div>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="font-bold text-[#1B365D] bg-blue-50 px-1.5 py-0.5 rounded-[2px] border border-blue-200">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-sans text-slate-700">
                    {log.targetDoc}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-600">
                    {log.sha256State}
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <span className="inline-flex items-center gap-1 font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-[2px] border border-emerald-300 text-[11px]">
                      <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI vs Deterministic Comparison Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-[3px] border-2 border-emerald-600/80 shadow-xs">
          <div className="flex items-center gap-2.5 mb-2">
            <span className="w-6 h-6 rounded-[2px] bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold text-xs">
              ✓
            </span>
            <h2 className="text-[17px] font-bold text-slate-900">
              Rule-Based & Deterministic Components
            </h2>
          </div>
          <p className="text-[13px] text-slate-600 mb-3 leading-relaxed">
            Statutory legal compliance requires 100% precision without probabilistic hallucinations.
          </p>
          <ul className="space-y-1.5 text-[13px] text-slate-800 font-medium">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-700"></span>
              <span><strong>Approval Applicability:</strong> Factories Act, Water/Air Acts, FSSAI rules</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-700"></span>
              <span><strong>Dependency Mapping:</strong> Prerequisites and parallel processing sequences</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-700"></span>
              <span><strong>Subsidy Matching:</strong> Maharashtra PSI 2019 eligibility thresholds</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-5 rounded-[3px] border-2 border-blue-600/80 shadow-xs">
          <div className="flex items-center gap-2.5 mb-2">
            <span className="w-6 h-6 rounded-[2px] bg-blue-100 text-blue-900 flex items-center justify-center font-bold text-xs">
              AI
            </span>
            <h2 className="text-[17px] font-bold text-slate-900">
              AI-Assisted Decision Support Components
            </h2>
          </div>
          <p className="text-[13px] text-slate-600 mb-3 leading-relaxed">
            AI is deployed specifically where human review is slow or unstructured data needs extraction.
          </p>
          <ul className="space-y-1.5 text-[13px] text-slate-800 font-medium">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1B365D]"></span>
              <span><strong>Document Intelligence:</strong> OCR metadata extraction & survey mismatch checks</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1B365D]"></span>
              <span><strong>Guidance Assistant:</strong> RAG retrieval on government knowledge base</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1B365D]"></span>
              <span><strong>Bottleneck Diagnostics:</strong> Predictive backlog trend analytics</span>
            </li>
          </ul>
        </div>
      </div>

      {/* End-to-End System Processing Flow */}
      <div className="bg-white rounded-[3px] border border-[#CBD5E1] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] space-y-4">
        <h2 className="text-[17px] font-bold text-slate-900 pb-2 border-b border-slate-200">
          End-to-End System Processing Flow (9-Stage Architecture)
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
          {pipelineSteps.map((s) => (
            <div key={s.step} className="p-3.5 bg-slate-50 rounded-[2px] border border-slate-200 text-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-[#1B365D] text-[13px]">{s.title}</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-[2px] uppercase ${
                    s.type === 'AI-Assisted' ? 'bg-blue-100 text-blue-900 border border-blue-200' :
                    s.type === 'Deterministic Rule' ? 'bg-emerald-100 text-emerald-900 border border-emerald-200' :
                    s.type === 'Security' ? 'bg-purple-100 text-purple-900 border border-purple-200' :
                    'bg-slate-200 text-slate-800'
                  }`}>
                    {s.type}
                  </span>
                </div>
                <p className="text-[12.5px] text-slate-600 leading-normal mt-1">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust & Governance Principles Grid */}
      <div className="bg-white rounded-[3px] border border-[#CBD5E1] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
          <ShieldCheck className="w-5 h-5 text-[#1B365D]" />
          <h2 className="text-[17px] font-bold text-slate-900">
            Trust & Governance Principles
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {trustAndGovernancePrinciples.map((p, idx) => (
            <div key={idx} className="p-4 rounded-[2px] border border-slate-200 bg-slate-50/70 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-[14px]">{p.title}</h3>
                <span className="text-[11px] font-bold bg-white border border-slate-300 text-slate-700 px-2 py-0.5 rounded-[2px]">
                  {p.badge}
                </span>
              </div>
              <p className="text-slate-600 text-[13px] leading-relaxed">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
