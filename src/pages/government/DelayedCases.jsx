import React from 'react';
import { 
  AlertOctagon, 
  Clock, 
  Building, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronRight,
  FileText
} from 'lucide-react';
import { departmentApplicationsList, bottleneckSummary } from '../../data/departmentData';

export default function DelayedCases({ onSelectCase, showToast }) {
  const delayedCases = departmentApplicationsList.filter(c => c.status === 'OVERDUE');

  const handleExpedite = (c) => {
    showToast?.(`Priority Notice sent to ${c.assignedOfficer} for ${c.id}`, "warning");
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3 pb-1">
        <div>
          <div className="text-[11px] font-bold text-red-800 uppercase tracking-wider flex items-center gap-2">
            <span>SLA Variance Oversight</span>
            <span className="bg-red-100 text-red-900 text-[10.5px] px-2 py-0.5 rounded border border-red-200 font-bold font-mono">
              Escalation Mode
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">
            Delayed Applications & Escalations
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Applications exceeding statutory clearance timelines across regional industrial sub-divisions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="bg-red-100 text-red-950 border border-red-300 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-2xs">
            <AlertOctagon className="w-4 h-4 text-red-700" />
            <span>42 State Overdue Cases</span>
          </span>
        </div>
      </div>

      {/* Bottleneck Diagnostic Summary Box */}
      <div className="p-5 bg-red-50/60 border border-red-300 rounded-xl shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-red-800 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
            <AlertTriangle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-base font-bold text-red-950">
              Primary Bottleneck: {bottleneckSummary.department}
            </h2>
            <p className="text-xs text-red-900 mt-0.5 leading-relaxed">
              {bottleneckSummary.summary} Root cause: {bottleneckSummary.rootCause}
            </p>
          </div>
        </div>

        <div className="text-xs text-red-950 font-semibold shrink-0 bg-red-100/90 px-3.5 py-2 rounded-lg border border-red-300">
          Average Delay: <span className="font-extrabold text-sm text-red-950 block sm:inline font-mono">+18.4 Days</span>
        </div>
      </div>

      {/* Delayed Applications Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 bg-slate-50/70 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Overdue Applications Awaiting Expedited Review ({delayedCases.length})
          </h2>
          <span className="text-xs text-slate-500 font-bold">Sorted by Days Overdue</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 border-b border-slate-200 uppercase text-[11px] font-bold tracking-wider">
                <th className="py-3 px-4">Case ID</th>
                <th className="py-3 px-4">Enterprise Name</th>
                <th className="py-3 px-4">Approval Type</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4 text-center">Days Pending</th>
                <th className="py-3 px-4 text-center">Standard SLA</th>
                <th className="py-3 px-4 text-center">Delay</th>
                <th className="py-3 px-4">Bottleneck Reason</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {delayedCases.map((c) => (
                <tr key={c.id} className="hover:bg-red-50/30 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#1E4E8C]">
                    {c.id}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    {c.companyName}
                    <span className="block text-[11px] text-slate-500 font-normal">{c.district}, Maharashtra</span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-800">
                    {c.approval}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-medium">
                    {c.department}
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-slate-900 font-mono">
                    {c.daysPending}d
                  </td>
                  <td className="py-3.5 px-4 text-center text-slate-500 font-mono">
                    {c.expectedSLA}d
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-flex px-2 py-0.5 rounded text-[10.5px] font-bold bg-red-100 text-red-950 border border-red-300 font-mono">
                      {c.delay}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 text-xs max-w-xs leading-snug">
                    {c.bottleneckReason}
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                    <button
                      onClick={() => handleExpedite(c)}
                      className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-md text-xs font-bold shadow-2xs"
                    >
                      Expedite
                    </button>
                    <button
                      onClick={() => onSelectCase?.(c)}
                      className="px-2.5 py-1 bg-[#1E4E8C] hover:bg-[#143D6F] text-white rounded-md text-xs font-bold shadow-2xs"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
