import React, { useState } from 'react';
import { 
  FileCheck, 
  Building2, 
  Clock, 
  FileText, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle,
  GitBranch,
  ShieldCheck,
  ChevronRight,
  Filter
} from 'lucide-react';
import ProjectSummaryStrip from '../../components/ProjectSummaryStrip';

export default function RequiredApprovals({ project, approvals, onSelectApproval, onNavigate }) {
  const [filterCategory, setFilterCategory] = useState('All');

  const categories = ['All', 'Corporate & Legal', 'Land & Infrastructure', 'Construction & Infrastructure', 'Environmental', 'Safety & Emergency', 'Labour & Safety', 'Food Safety', 'Utilities & Power', 'Financial Subsidies & Incentives'];

  const filteredApprovals = filterCategory === 'All' 
    ? approvals 
    : approvals.filter(a => a.category === filterCategory);

  const statusBadgeStyles = {
    'Approved': 'bg-emerald-50 text-emerald-800 border-emerald-300',
    'Under Review': 'bg-amber-50 text-amber-900 border-amber-300',
    'Inspection': 'bg-blue-50 text-blue-900 border-blue-300',
    'Action Required': 'bg-red-50 text-red-900 border-red-300',
    'Not Started': 'bg-slate-100 text-slate-700 border-slate-300',
    'Eligible / Not Applied': 'bg-blue-50 text-blue-900 border-blue-300'
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3 pb-1">
        <div>
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
            <span>Statutory Clearance Matrix</span>
            <span className="text-[#1E4E8C] bg-blue-50 text-[10.5px] px-2 py-0.5 rounded border border-blue-200 font-bold">
              {filteredApprovals.length} Mandated Clearances
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">
            Required Approvals
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Dynamic statutory clearance checklist calibrated to your business profile, location, and scale.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('engine')}
            className="px-3.5 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <span>Decision Rules</span>
          </button>
          <button
            onClick={() => onNavigate('roadmap')}
            className="px-4 py-2 bg-[#1E4E8C] hover:bg-[#143D6F] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>Parallel Roadmap</span>
          </button>
        </div>
      </div>

      {/* Project Parameters Strip */}
      <ProjectSummaryStrip project={project} onEdit={() => onNavigate('onboarding')} />

      {/* Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-500 font-bold uppercase text-[11px] shrink-0">Filter By:</span>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap text-xs font-semibold transition-all ${
              filterCategory === cat
                ? 'bg-[#1E4E8C] text-white font-bold shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Approvals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredApprovals.map((app, idx) => {
          const uploadedDocs = app.documents?.filter(d => d.uploaded).length || 0;
          const totalDocs = app.documents?.length || 0;

          return (
            <div
              key={app.id}
              onClick={() => onSelectApproval(app)}
              className="bg-white rounded-xl border border-slate-200 p-5 hover:border-[#1E4E8C] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between shadow-xs group"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      {idx + 1}. {app.category}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-[#1E4E8C] transition-colors">
                      {app.name}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{app.department}</span>
                    </p>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold border shrink-0 ${statusBadgeStyles[app.status] || 'bg-slate-100 text-slate-700 border-slate-300'}`}>
                    {app.status}
                  </span>
                </div>

                <div className="mt-3.5 p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700 leading-relaxed">
                  <strong className="text-slate-900 font-bold">Why required: </strong>
                  {app.ruleReason || app.whyRequired}
                </div>
              </div>

              <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3 text-slate-600">
                  <span className="flex items-center gap-1 text-xs">
                    <FileText className="w-3.5 h-3.5 text-slate-400" />
                    <strong className="text-slate-900">{uploadedDocs}/{totalDocs}</strong> Documents
                  </span>
                  <span className="text-slate-300">|</span>
                  <span className="flex items-center gap-1 text-xs">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{app.estimatedTime ? app.estimatedTime.replace('Prototype estimate: ', '') : '15–20 working days'}</span>
                  </span>
                </div>

                <span className="text-[#1E4E8C] font-bold flex items-center gap-1 text-xs group-hover:translate-x-0.5 transition-transform">
                  <span>View Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
