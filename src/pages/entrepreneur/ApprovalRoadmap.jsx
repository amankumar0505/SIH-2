import React, { useState } from 'react';
import { 
  GitBranch, 
  ArrowDown, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Building2, 
  Zap, 
  ShieldCheck, 
  FileText,
  TrendingDown
} from 'lucide-react';
import { getApprovalDependencyGraph } from '../../services/dependencyEngine';
import ProjectSummaryStrip from '../../components/ProjectSummaryStrip';

export default function ApprovalRoadmap({ project, onSelectApprovalById, onNavigate }) {
  const graph = getApprovalDependencyGraph(project);

  const statusBadges = {
    'APPROVED': 'bg-emerald-50 text-emerald-800 border-emerald-300',
    'UNDER_REVIEW': 'bg-amber-50 text-amber-900 border-amber-300',
    'INSPECTION': 'bg-blue-50 text-blue-900 border-blue-300',
    'ACTION_REQUIRED': 'bg-red-50 text-red-900 border-red-300',
    'NOT_STARTED': 'bg-slate-100 text-slate-700 border-slate-300'
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3 pb-1">
        <div>
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
            <span>Workflow Sequencing & Process Optimization</span>
            <span className="text-[#1E4E8C] bg-blue-50 text-[10.5px] px-2 py-0.5 rounded border border-blue-200 font-bold">
              53.5% Time Saved
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">
            Approval Dependency Roadmap
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Sequential prerequisite stages versus parallel departmental tracks in Maharashtra.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('required-approvals')}
            className="px-4 py-2 bg-[#1E4E8C] hover:bg-[#143D6F] text-white rounded-lg text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <span>Clearances Checklist</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <ProjectSummaryStrip project={project} onEdit={() => onNavigate('onboarding')} />

      {/* Sequential vs Parallel Time Comparison */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 space-y-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900">
              Turnaround Comparison: Sequential Portals vs. Single-Window Parallel Tracks
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Eliminates sequential queuing by activating 4 departmental clearances concurrently after land allotment.
            </p>
          </div>

          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-300 font-mono">
            75 Working Days Saved
          </span>
        </div>

        {/* 2 Comparison Progress Bars */}
        <div className="space-y-4 pt-1">
          {/* Traditional Way */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1.5 text-slate-600">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
                <span>Traditional Sequential Portals (1-by-1 Queue)</span>
              </span>
              <span className="font-bold text-slate-800 font-mono">140 Working Days</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
              <div 
                className="bg-slate-400 h-full rounded-full"
                style={{ width: '100%' }}
              ></div>
            </div>
          </div>

          {/* Single-Window Way */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1.5 text-[#1E4E8C]">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                <span className="font-bold text-slate-900">Maharashtra Single-Window Parallel Workflow</span>
              </span>
              <span className="font-bold text-emerald-700 font-mono">65 Working Days (53.5% Time Saved)</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200 relative">
              <div 
                className="bg-[#1E4E8C] h-full transition-all duration-700 rounded-full"
                style={{ width: '46.4%' }}
              ></div>
            </div>
          </div>
        </div>

        {/* 3 Metric Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="text-slate-500 text-[11px] block font-bold uppercase">Prerequisite Anchor</span>
            <span className="font-bold text-slate-900 text-xs mt-0.5 block">MIDC Land Allotment (Stage 1)</span>
          </div>
          <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-lg">
            <span className="text-blue-800 text-[11px] block font-bold uppercase">Parallel Tracks</span>
            <span className="font-bold text-slate-900 text-xs mt-0.5 block">4 Department Clearances (Stage 2)</span>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="text-slate-500 text-[11px] block font-bold uppercase">Commercial Operation</span>
            <span className="font-bold text-slate-900 text-xs mt-0.5 block">Factory Licence & Power Energization</span>
          </div>
        </div>
      </div>

      {/* STAGES FLOW */}
      <div className="space-y-4">
        {/* STAGE 1 */}
        {graph.stages[0] && (
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="bg-[#1E4E8C] text-white px-2.5 py-0.5 rounded text-xs font-bold font-mono">
                  STAGE 1
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wide">
                  {graph.stages[0].title || "Entity & Land Foundation (Sequential Anchor)"}
                </span>
              </div>
              <span className="text-xs text-slate-500">Prerequisite</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              {graph.stages[0].nodes.map((node) => (
                <div
                  key={node.id}
                  onClick={() => onSelectApprovalById?.(node.id)}
                  className="bg-slate-50 border border-emerald-300 rounded-lg p-4 hover:border-emerald-600 transition-all cursor-pointer shadow-2xs"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-slate-500 uppercase">{node.department}</span>
                      <h3 className="text-sm font-bold text-slate-900 mt-0.5">{node.name}</h3>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                      ✓ {node.statusLabel || "Approved"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Down Connector */}
        <div className="flex justify-center text-slate-400">
          <div className="flex flex-col items-center">
            <div className="w-0.5 h-5 bg-slate-300"></div>
            <ArrowDown className="w-4 h-4 text-slate-400 -mt-1" />
          </div>
        </div>

        {/* STAGE 2: PARALLEL DEPARTMENTAL TRACKS */}
        {graph.stages[1] && (
          <div className="bg-blue-50/40 p-5 rounded-xl border-2 border-blue-400/80 border-dashed space-y-3 relative overflow-hidden shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-blue-200">
              <div className="flex items-center gap-2">
                <span className="bg-[#1E4E8C] text-white px-2.5 py-0.5 rounded text-xs font-bold font-mono">
                  STAGE 2
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#1E4E8C] uppercase tracking-wide">
                  Concurrent Departmental Scrutiny (Parallel Tracks)
                </span>
              </div>
              <span className="text-xs font-bold text-blue-900 bg-blue-100 px-2.5 py-1 rounded-md border border-blue-200 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                <span>4 Clearances Running Concurrently</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
              {graph.stages[1].nodes.map((node) => (
                <div
                  key={node.id}
                  onClick={() => onSelectApprovalById?.(node.id)}
                  className="bg-white border border-slate-300 hover:border-[#1E4E8C] rounded-lg p-3.5 shadow-2xs hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10.5px] font-bold text-slate-500 uppercase block">{node.department}</span>
                    <h4 className="text-xs font-bold text-slate-900 mt-0.5 leading-snug">{node.name}</h4>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className={`px-2 py-0.5 rounded text-[10.5px] font-bold border ${statusBadges[node.status] || statusBadges['NOT_STARTED']}`}>
                      {node.statusLabel}
                    </span>
                    <span className="text-[10.5px] text-[#1E4E8C] bg-blue-50 px-1.5 py-0.2 rounded font-bold uppercase">
                      Parallel
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Down Connector */}
        <div className="flex justify-center text-slate-400">
          <div className="flex flex-col items-center">
            <div className="w-0.5 h-5 bg-slate-300"></div>
            <ArrowDown className="w-4 h-4 text-slate-400 -mt-1" />
          </div>
        </div>

        {/* STAGE 3 */}
        {graph.stages[2] && (
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="bg-[#1E4E8C] text-white px-2.5 py-0.5 rounded text-xs font-bold font-mono">
                  STAGE 3
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wide">
                  {graph.stages[2].title || "Plant Setup, Factory Licensing & Power Energization"}
                </span>
              </div>
              <span className="text-xs text-slate-500">Inspection & Setup</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              {graph.stages[2].nodes.map((node) => (
                <div
                  key={node.id}
                  onClick={() => onSelectApprovalById?.(node.id)}
                  className={`rounded-lg p-4 shadow-2xs hover:shadow-sm transition-all cursor-pointer border ${
                    node.status === 'ACTION_REQUIRED' 
                      ? 'border-red-400 bg-red-50/30' 
                      : 'border-slate-300 bg-white hover:border-[#1E4E8C]'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-slate-500 uppercase">{node.department}</span>
                      <h3 className="text-sm font-bold text-slate-900 mt-0.5">{node.name}</h3>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${statusBadges[node.status] || statusBadges['NOT_STARTED']}`}>
                      {node.statusLabel}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Down Connector */}
        <div className="flex justify-center text-slate-400">
          <div className="flex flex-col items-center">
            <div className="w-0.5 h-5 bg-slate-300"></div>
            <ArrowDown className="w-4 h-4 text-slate-400 -mt-1" />
          </div>
        </div>

        {/* STAGE 4 */}
        {graph.stages[3] && (
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="bg-slate-700 text-white px-2.5 py-0.5 rounded text-xs font-bold font-mono">
                  STAGE 4
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wide">
                  {graph.stages[3].title || "Trial Production & Commercial Launch"}
                </span>
              </div>
              <span className="text-xs text-slate-500">Commercial Operation</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              {graph.stages[3].nodes.map((node) => (
                <div
                  key={node.id}
                  className="bg-slate-50 border border-slate-300 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-slate-500 uppercase">{node.department}</span>
                      <h3 className="text-sm font-bold text-slate-800 mt-0.5">{node.name}</h3>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${statusBadges[node.status] || statusBadges['NOT_STARTED']}`}>
                      {node.statusLabel}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
