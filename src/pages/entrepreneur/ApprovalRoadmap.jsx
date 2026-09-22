import React, { useState } from 'react';
import { 
  GitBranch, 
  ArrowRight, 
  CheckCircle2, 
  Building2, 
  ShieldCheck, 
  TrendingDown
} from 'lucide-react';
import { getApprovalDependencyGraph } from '../../services/dependencyEngine';
import ProjectSummaryStrip from '../../components/ProjectSummaryStrip';

export default function ApprovalRoadmap({ project, onSelectApprovalById, onNavigate }) {
  const graph = getApprovalDependencyGraph(project);
  const [activeTab, setActiveTab] = useState('roadmap'); // 'roadmap' | 'comparison'

  const statusBadges = {
    'APPROVED': 'bg-[#F0FDF4] text-[#14532D] border-[#A7F3D0]',
    'UNDER_REVIEW': 'bg-[#FFFBEB] text-[#78350F] border-[#FDE68A]',
    'INSPECTION': 'bg-[#EBF2FA] text-[#003366] border-[#CBD5E1]',
    'ACTION_REQUIRED': 'bg-[#FEF2F2] text-[#991B1B] border-[#FECACA]',
    'NOT_STARTED': 'bg-[#F5F5F7] text-[#6E6E73] border-[#E5E5EA]'
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3 pb-1">
        <div>
          <div className="text-[11px] font-semibold text-[#86868B] uppercase tracking-wider flex items-center gap-2">
            <span>Workflow Sequencing</span>
            <span className="text-[#14532D] bg-[#F0FDF4] text-[10.5px] px-1.5 py-0.2 rounded border border-[#A7F3D0]">
              53.5% Turnaround Reduction
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] tracking-tight mt-0.5">
            Approval Dependency Roadmap
          </h1>
          <p className="text-xs text-[#6E6E73] mt-1">
            Prerequisite foundation stages mapped against parallel departmental clearance tracks.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('required-approvals')}
            className="px-3.5 py-1.5 bg-[#003366] hover:bg-[#002244] text-white rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <span>Clearances Checklist</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <ProjectSummaryStrip project={project} onEdit={() => onNavigate('onboarding')} />

      {/* Sequential vs Parallel Time Comparison */}
      <div className="bg-white rounded-lg border border-[#D2D2D7] p-5 sm:p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#E5E5EA]">
          <div>
            <h2 className="text-sm font-semibold text-[#1D1D1F]">
              Turnaround Comparison: Sequential vs. Parallel Execution
            </h2>
            <p className="text-xs text-[#6E6E73] mt-0.5">
              Traditional single-queue portals versus simultaneous multi-department submission.
            </p>
          </div>

          <span className="text-xs font-semibold text-[#14532D] bg-[#F0FDF4] px-2.5 py-1 rounded border border-[#A7F3D0] font-mono">
            75 Working Days Saved
          </span>
        </div>

        {/* 2 Comparison Progress Bars */}
        <div className="space-y-4 pt-1">
          {/* Traditional Way */}
          <div>
            <div className="flex justify-between text-xs font-medium mb-1.5 text-[#6E6E73]">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#86868B]"></span>
                <span>Traditional Sequential Portals (1-by-1 Queue)</span>
              </span>
              <span className="text-[#1D1D1F] font-mono">140 Working Days</span>
            </div>
            <div className="w-full bg-[#E5E5EA] rounded-full h-3 overflow-hidden">
              <div 
                className="bg-[#86868B] h-full"
                style={{ width: '100%' }}
              ></div>
            </div>
          </div>

          {/* INDUSTRIA Way */}
          <div>
            <div className="flex justify-between text-xs font-medium mb-1.5 text-[#003366]">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#1A7F37]"></span>
                <span className="font-semibold text-[#1D1D1F]">INDUSTRIA Single-Window Parallel Workflow</span>
              </span>
              <span className="text-[#14532D] font-semibold font-mono">65 Working Days (53.5% Time Saved)</span>
            </div>
            <div className="w-full bg-[#E5E5EA] rounded-full h-3 overflow-hidden relative">
              <div 
                className="bg-[#003366] h-full transition-all duration-700"
                style={{ width: '46.4%' }}
              ></div>
            </div>
          </div>
        </div>

        {/* 3 Metric Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="p-3 bg-[#FAFAFA] border border-[#E5E5EA] rounded-md">
            <span className="text-[#86868B] text-[11px] block uppercase font-medium">Prerequisite Anchor</span>
            <span className="font-semibold text-[#1D1D1F] text-xs mt-0.5 block">MIDC Land Allotment (Stage 1)</span>
          </div>
          <div className="p-3 bg-[#FAFAFA] border border-[#E5E5EA] rounded-md">
            <span className="text-[#86868B] text-[11px] block uppercase font-medium">Parallel Clearances</span>
            <span className="font-semibold text-[#1D1D1F] text-xs mt-0.5 block">4 Departmental Tracks (Stage 2)</span>
          </div>
          <div className="p-3 bg-[#FAFAFA] border border-[#E5E5EA] rounded-md">
            <span className="text-[#86868B] text-[11px] block uppercase font-medium">Commercial Operation</span>
            <span className="font-semibold text-[#1D1D1F] text-xs mt-0.5 block">Final Factory Licence & Power Sync</span>
          </div>
        </div>
      </div>

      {/* Stage-by-Stage Workflow Breakdown */}
      <div className="space-y-4">
        <h2 className="text-base font-semibold text-[#1D1D1F]">
          Phased Statutory Stages
        </h2>

        <div className="space-y-4">
          {graph.stages.map((stg) => (
            <div 
              key={stg.stage}
              className="bg-white rounded-lg border border-[#D2D2D7] p-5 space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#E5E5EA]">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#F5F5F7] border border-[#D2D2D7] text-[#003366] font-semibold text-xs flex items-center justify-center font-mono">
                    {stg.stage}
                  </span>
                  <h3 className="font-semibold text-sm text-[#1D1D1F]">
                    {stg.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="text-[#6E6E73] font-mono">{stg.turnaroundDays} Days</span>
                  <span className={`px-2 py-0.5 rounded text-[11px] font-medium border ${
                    stg.status === 'COMPLETED' ? 'bg-[#F0FDF4] text-[#14532D] border-[#A7F3D0]' :
                    stg.status === 'IN_PROGRESS' ? 'bg-[#FFFBEB] text-[#78350F] border-[#FDE68A]' :
                    'bg-[#F5F5F7] text-[#6E6E73] border-[#E5E5EA]'
                  }`}>
                    {stg.status === 'COMPLETED' ? '✓ Completed' : stg.status === 'IN_PROGRESS' ? 'In Progress' : 'Upcoming'}
                  </span>
                </div>
              </div>

              {/* Clearances in this stage */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                {stg.approvals.map((app) => (
                  <div 
                    key={app.id}
                    onClick={() => onSelectApprovalById(app.id)}
                    className="p-3 rounded-md border border-[#E5E5EA] hover:border-[#003366] bg-[#FAFAFA] hover:bg-white cursor-pointer transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="font-medium text-xs text-[#1D1D1F]">{app.name}</span>
                        <span className={`text-[10.5px] px-1.5 py-0.2 rounded border font-mono shrink-0 ${statusBadges[app.status] || statusBadges['NOT_STARTED']}`}>
                          {app.status.replace('_', ' ')}
                        </span>
                      </div>
                      <span className="text-[11.5px] text-[#6E6E73] block mt-0.5">{app.department}</span>
                    </div>

                    <div className="mt-2 pt-2 border-t border-[#E5E5EA] flex items-center justify-between text-[11px] text-[#86868B]">
                      <span className="font-mono">{app.days} Days SLA</span>
                      <span className="text-[#003366] hover:underline font-medium">Inspect Clearance →</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
