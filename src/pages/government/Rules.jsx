import React from 'react';
import { 
  Sliders, 
  BookOpen, 
  CheckCircle2, 
  ShieldCheck, 
  Plus
} from 'lucide-react';
import { approvalRules } from '../../data/rules';

export default function Rules({ showToast }) {
  const handleAddNewRule = () => {
    showToast?.("Department Policy Rule Repository (Prototype View)", "info");
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3 pb-1">
        <div>
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
            <span>Statutory Rules Repository</span>
            <span className="text-[#1E4E8C] bg-blue-50 text-[10.5px] px-2 py-0.5 rounded border border-blue-200 font-bold">
              {approvalRules.length} Active Rules
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">
            Approval Rules & Policy Knowledge Base
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Human-readable, deterministic policy rules that trigger mandatory clearances and document requirements.
          </p>
        </div>

        <button
          onClick={handleAddNewRule}
          className="px-4 py-2 bg-[#1E4E8C] hover:bg-[#143D6F] text-white rounded-lg text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Department Policy Rule</span>
        </button>
      </div>

      {/* Info Banner */}
      <div className="p-4 bg-blue-50/60 border border-blue-200 rounded-xl text-xs text-slate-700 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-[#1E4E8C] shrink-0" />
          <span className="leading-relaxed">
            <strong className="text-slate-900 font-bold">Deterministic Policy Management:</strong> Rules are mapped to statutory provisions and gazette notifications. Rules can be updated by department administrators without changing codebase logic.
          </span>
        </div>
      </div>

      {/* Policy Rules Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {approvalRules.map((r) => (
          <div
            key={r.id}
            className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-100">
                <div>
                  <span className="text-[11px] font-mono font-bold text-slate-500 uppercase">
                    {r.id} • {r.category}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-0.5">
                    {r.title}
                  </h3>
                </div>
                <span className="text-[11px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md shrink-0 border border-slate-200 font-mono">
                  {r.sourceAct}
                </span>
              </div>

              {/* IF Condition */}
              <div className="mt-3 bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs font-mono">
                <span className="text-slate-500 font-bold text-[10.5px] block uppercase mb-1 font-sans">
                  [Condition]
                </span>
                <div className="text-slate-900 text-xs">
                  <strong className="text-slate-800">IF</strong> {JSON.stringify(r.condition).replace(/[{"}]/g, '').replace(/,/g, ' AND ')}
                </div>
              </div>

              {/* THEN Action */}
              <div className="mt-2 bg-emerald-50/70 p-3 rounded-lg border border-emerald-300 text-xs font-mono">
                <span className="text-emerald-800 font-bold text-[10.5px] block uppercase mb-1 font-sans">
                  [Action]
                </span>
                <div className="text-emerald-950 font-bold text-xs">
                  <strong>THEN</strong> {r.action}
                </div>
              </div>

              {/* Legal Explanation */}
              <p className="mt-3 text-xs text-slate-600 leading-relaxed font-sans">
                <strong className="text-slate-900 font-bold">Legal Basis:</strong> {r.explanation}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="text-xs">Status: <strong className="text-emerald-700 font-bold">Active in Production</strong></span>
              <button
                onClick={handleAddNewRule}
                className="text-[#1E4E8C] font-bold text-xs hover:text-[#143D6F] hover:underline"
              >
                Inspect Gazette Reference →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
