import React from 'react';

export default function ProjectSummaryStrip({ project, onEdit }) {
  if (!project) return null;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 mb-6 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <span className="font-bold text-slate-900 text-sm sm:text-base">{project.name}</span>
          <span className="bg-blue-50 text-[#1E4E8C] px-2.5 py-0.5 rounded-full font-bold text-[11px] border border-blue-200">
            {project.industry}
          </span>
        </div>

        {onEdit && (
          <button
            onClick={onEdit}
            className="text-xs font-bold text-[#1E4E8C] hover:text-[#143D6F] flex items-center gap-1 hover:underline"
          >
            <span>Edit Profile Parameters</span>
            <span>→</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-3 pt-3 border-t border-slate-100 text-xs">
        <div>
          <span className="text-slate-500 block text-[11px] uppercase tracking-wider font-bold">Location</span>
          <span className="font-bold text-slate-900 text-xs mt-0.5 block">{project.location?.district}, Maharashtra</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[11px] uppercase tracking-wider font-bold">Capital Outlay</span>
          <span className="font-bold text-slate-900 text-xs mt-0.5 block font-mono">{project.investment}</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[11px] uppercase tracking-wider font-bold">Workforce</span>
          <span className="font-bold text-slate-900 text-xs mt-0.5 block">{project.employees} Personnel</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[11px] uppercase tracking-wider font-bold">Site Area</span>
          <span className="font-bold text-slate-900 text-xs mt-0.5 block">{project.landArea}</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[11px] uppercase tracking-wider font-bold">Pollution Grade</span>
          <span className={`font-bold text-xs mt-0.5 block ${
            project.pollutionCategory === 'Red' ? 'text-red-700' :
            project.pollutionCategory === 'Orange' ? 'text-amber-700' : 'text-emerald-700'
          }`}>
            {project.pollutionCategory} Category
          </span>
        </div>
        <div>
          <span className="text-slate-500 block text-[11px] uppercase tracking-wider font-bold">Project Stage</span>
          <span className="font-bold text-slate-900 text-xs mt-0.5 block">{project.projectType}</span>
        </div>
      </div>
    </div>
  );
}
