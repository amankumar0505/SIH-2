import React from 'react';
import { 
  Sliders, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  BookOpen, 
  Layers
} from 'lucide-react';
import { getRequiredApprovals } from '../../services/approvalEngine';
import ProjectSummaryStrip from '../../components/ProjectSummaryStrip';

export default function RecommendationEngine({ project, onNavigate }) {
  const result = getRequiredApprovals(project);

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3 pb-1">
        <div>
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
            <span>Decision Logic Breakdown</span>
            <span className="text-[#1E4E8C] bg-blue-50 text-[10.5px] px-2 py-0.5 rounded border border-blue-200 font-bold">
              Deterministic Rule Engine
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">
            Approval Recommendation Logic
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Transparent statutory policy evaluation mapping business parameters directly to legal requirements.
          </p>
        </div>

        <button
          onClick={() => onNavigate('required-approvals')}
          className="px-4 py-2 bg-[#1E4E8C] hover:bg-[#143D6F] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
        >
          <span>View Clearance Checklist</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <ProjectSummaryStrip project={project} onEdit={() => onNavigate('onboarding')} />

      {/* Engine Architecture Header Banner */}
      <div className="p-5 bg-gradient-to-r from-[#07172C] to-[#1E4E8C] text-white rounded-xl shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">
              Rule Engine + Maharashtra Statutory Policy Database
            </h2>
            <p className="text-xs text-slate-200 mt-0.5 leading-relaxed">
              Eliminates administrative ambiguity by executing deterministic statutory policy rules backed by official government gazettes.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs shrink-0">
          <span className="bg-white/10 text-emerald-300 px-3 py-1 rounded-md border border-emerald-400/30 font-bold text-xs font-mono">
            ✓ Statutory Rule Execution Active
          </span>
        </div>
      </div>

      {/* 3-Column Decision Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Column 1: Input Parameters */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Step 1</span>
              <span className="text-sm font-bold text-slate-900">Business Parameters</span>
            </div>

            <div className="mt-4 space-y-2.5 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 block text-[11px] font-bold uppercase">Industry Classification</span>
                <span className="font-bold text-slate-900 text-xs mt-0.5 block">{project.industry}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 block text-[11px] font-bold uppercase">Workforce Count</span>
                <span className="font-bold text-slate-900 text-xs mt-0.5 block">{project.employees} Employees</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 block text-[11px] font-bold uppercase">Capital Outlay</span>
                <span className="font-bold text-slate-900 text-xs mt-0.5 block font-mono">{project.investment}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 block text-[11px] font-bold uppercase">Location</span>
                <span className="font-bold text-slate-900 text-xs mt-0.5 block">{project.location?.district} (MIDC Zone)</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 block text-[11px] font-bold uppercase">Hazardous Materials</span>
                <span className={`font-bold text-xs mt-0.5 block ${project.hasHazardousMaterials ? 'text-red-700' : 'text-slate-900'}`}>
                  {project.hasHazardousMaterials ? 'YES (Prescribed Schedule)' : 'NO'}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-center">
            <span className="text-[11px] text-slate-500 font-medium">Inputs cross-checked against statutory acts</span>
          </div>
        </div>

        {/* Column 2: Evaluated Rules */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Step 2</span>
            <span className="text-sm font-bold text-slate-900">Statutory Rules Evaluated</span>
          </div>

          <div className="mt-4 space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
            {result.rulesEvaluated.map((r, idx) => (
              <div 
                key={idx}
                className={`p-3.5 rounded-lg border text-xs ${
                  r.matched 
                    ? 'bg-emerald-50/50 border-emerald-300 text-slate-900'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                    {r.matched ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <span className="w-3.5 h-3.5 rounded-full border border-slate-400 inline-block shrink-0"></span>
                    )}
                    {r.rule}
                  </span>
                  <span className={`text-[10.5px] font-bold px-2 py-0.5 rounded uppercase ${
                    r.matched ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {r.matched ? 'Applicable' : 'Exempt'}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1 font-mono">
                  CONDITION: {r.condition}
                </div>
                <div className="text-xs font-bold text-[#1E4E8C] mt-1">
                  DECISION: {r.result}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 3: Resulting Clearance Package */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Step 3</span>
              <span className="text-sm font-bold text-slate-900">Compiled Package</span>
            </div>

            <div className="mt-4 text-center p-5 bg-blue-50/50 rounded-xl border border-blue-200">
              <span className="text-4xl font-extrabold text-[#1E4E8C] font-mono block">
                {result.totalCount}
              </span>
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wide block mt-1">
                Mandated Clearances
              </span>
              <span className="text-[11px] text-slate-500 block mt-0.5">
                Calculated from enterprise profile
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <button
              onClick={() => onNavigate('required-approvals')}
              className="w-full py-2.5 bg-[#1E4E8C] hover:bg-[#143D6F] text-white rounded-lg text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Open All {result.totalCount} Clearances</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
