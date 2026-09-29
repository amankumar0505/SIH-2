import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Building, 
  FileText
} from 'lucide-react';
import { complianceCalendarEvents } from '../../data/renewals';
import ProjectSummaryStrip from '../../components/ProjectSummaryStrip';

export default function ComplianceCalendar({ project, onNavigate }) {
  const [activeMonth, setActiveMonth] = useState('September 2026');

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3 pb-1">
        <div>
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
            <span>Statutory Filings Schedule</span>
            <span className="text-[#1E4E8C] bg-blue-50 text-[10.5px] px-2 py-0.5 rounded border border-blue-200 font-bold">
              Annual Cycle 2026–27
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">
            Compliance Calendar
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Synchronized timeline of mandatory annual returns, testing certifications, and safety inspections.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('renewals')}
            className="px-4 py-2 bg-[#1E4E8C] hover:bg-[#143D6F] text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
          >
            Renewals Tracker →
          </button>
        </div>
      </div>

      <ProjectSummaryStrip project={project} />

      {/* Calendar Month Navigation Strip */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CalendarIcon className="w-5 h-5 text-[#1E4E8C]" />
          <span className="font-extrabold text-base text-slate-900 font-sans">
            {activeMonth}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs">
          <button
            onClick={() => setActiveMonth('August 2026')}
            className="p-1.5 rounded-lg hover:bg-slate-100 border border-slate-300 text-slate-700 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveMonth('September 2026')}
            className={`px-3 py-1.5 rounded-lg font-bold text-xs border transition-all ${
              activeMonth === 'September 2026' ? 'bg-[#1E4E8C] text-white border-[#1E4E8C] shadow-xs' : 'bg-slate-50 text-slate-700 border-slate-300'
            }`}
          >
            Sep 2026
          </button>
          <button
            onClick={() => setActiveMonth('October 2026')}
            className={`px-3 py-1.5 rounded-lg font-bold text-xs border transition-all ${
              activeMonth === 'October 2026' ? 'bg-[#1E4E8C] text-white border-[#1E4E8C] shadow-xs' : 'bg-slate-50 text-slate-700 border-slate-300'
            }`}
          >
            Oct 2026
          </button>
          <button
            onClick={() => setActiveMonth('October 2026')}
            className="p-1.5 rounded-lg hover:bg-slate-100 border border-slate-300 text-slate-700 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Events List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden divide-y divide-slate-100">
        <div className="p-4 bg-slate-50/70 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Scheduled Statutory Deadlines & Inspections
          </h2>
          <span className="text-xs text-slate-500 font-bold">
            {complianceCalendarEvents.length} Active Events
          </span>
        </div>

        {complianceCalendarEvents.map((evt) => (
          <div key={evt.id} className="p-4 hover:bg-slate-50 transition-colors flex items-start gap-4 text-xs">
            {/* Date Box */}
            <div className="w-14 h-14 bg-slate-100/70 rounded-lg border border-slate-300 flex flex-col items-center justify-center shrink-0">
              <span className="text-[10.5px] font-bold text-slate-500 uppercase">{evt.month}</span>
              <span className="text-xl font-extrabold text-[#1E4E8C] leading-none mt-0.5">{evt.day}</span>
            </div>

            {/* Event Info */}
            <div className="flex-1 space-y-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-slate-900">
                  {evt.title}
                </h3>
                <span className={`px-2.5 py-0.5 rounded text-[10.5px] font-bold border ${
                  evt.severity === 'Critical' 
                    ? 'bg-red-50 text-red-900 border-red-300' 
                    : evt.severity === 'High' 
                    ? 'bg-amber-50 text-amber-900 border-amber-300' 
                    : 'bg-blue-50 text-blue-900 border-blue-300'
                }`}>
                  {evt.type}
                </span>
              </div>

              <div className="flex items-center gap-3 text-slate-500 text-xs">
                <span className="flex items-center gap-1 font-medium">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  <span>{evt.department}</span>
                </span>
                <span>•</span>
                <span className="font-mono text-slate-600 font-medium">{evt.dueDate}</span>
              </div>

              <p className="text-xs text-slate-600 mt-1">
                {evt.description || evt.details}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
