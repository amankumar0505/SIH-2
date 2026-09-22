import React from 'react';

export default function ProjectSummaryStrip({ project, onEdit }) {
  if (!project) return null;

  return (
    <div className="bg-white rounded-lg border border-[#D2D2D7] p-4 sm:p-5 mb-6">
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <span className="font-semibold text-[#1D1D1F] text-[15px]">{project.name}</span>
          <span className="bg-[#F5F5F7] text-[#003366] px-2 py-0.5 rounded font-medium text-[12px] border border-[#E5E5EA]">
            {project.industry}
          </span>
        </div>

        {onEdit && (
          <button
            onClick={onEdit}
            className="text-[12.5px] font-medium text-[#003366] hover:underline"
          >
            Edit Profile Parameters →
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-3 pt-3 border-t border-[#E5E5EA] text-xs">
        <div>
          <span className="text-[#86868B] block text-[11px] uppercase tracking-wider font-medium">Location</span>
          <span className="font-medium text-[#1D1D1F] text-[13px] mt-0.5 block">{project.location?.district}, Maharashtra</span>
        </div>
        <div>
          <span className="text-[#86868B] block text-[11px] uppercase tracking-wider font-medium">Capital Investment</span>
          <span className="font-medium text-[#1D1D1F] text-[13px] mt-0.5 block font-mono">{project.investment}</span>
        </div>
        <div>
          <span className="text-[#86868B] block text-[11px] uppercase tracking-wider font-medium">Workforce</span>
          <span className="font-medium text-[#1D1D1F] text-[13px] mt-0.5 block">{project.employees} Personnel</span>
        </div>
        <div>
          <span className="text-[#86868B] block text-[11px] uppercase tracking-wider font-medium">Site Area</span>
          <span className="font-medium text-[#1D1D1F] text-[13px] mt-0.5 block">{project.landArea}</span>
        </div>
        <div>
          <span className="text-[#86868B] block text-[11px] uppercase tracking-wider font-medium">Pollution Grade</span>
          <span className={`font-medium text-[13px] mt-0.5 block ${
            project.pollutionCategory === 'Red' ? 'text-[#991B1B]' :
            project.pollutionCategory === 'Orange' ? 'text-[#78350F]' : 'text-[#14532D]'
          }`}>
            {project.pollutionCategory} Category
          </span>
        </div>
        <div>
          <span className="text-[#86868B] block text-[11px] uppercase tracking-wider font-medium">Project Stage</span>
          <span className="font-medium text-[#1D1D1F] text-[13px] mt-0.5 block">{project.projectType}</span>
        </div>
      </div>
    </div>
  );
}
