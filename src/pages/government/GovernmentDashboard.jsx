import React, { useState } from 'react';
import { 
  AlertOctagon, 
  CheckCircle2, 
  Send, 
  RefreshCw,
  Clock
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { 
  governmentKPIs, 
  departmentProcessingTimes, 
  bottleneckSummary, 
  departmentApplicationsList 
} from '../../data/departmentData';

export default function GovernmentDashboard({ onNavigate, onSelectCase, showToast }) {
  const delayedCases = departmentApplicationsList.filter(c => c.status === 'OVERDUE');
  const [isEscalating, setIsEscalating] = useState(false);
  const [isEscalated, setIsEscalated] = useState(false);
  const [escalationRef, setEscalationRef] = useState(null);

  const handleDispatchSlaNotice = () => {
    setIsEscalating(true);
    setTimeout(() => {
      setIsEscalating(false);
      setIsEscalated(true);
      const refCode = `SECY-IND-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setEscalationRef(refCode);
      showToast?.(`Urgent SLA Notice ${refCode} dispatched to MPCB Regional Officer. 48h resolution clock initiated.`, "success");
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3 pb-1">
        <div>
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
            <span>Department Operations & Scrutiny Command</span>
            <span className="text-red-800 bg-red-50 text-[10.5px] px-2 py-0.5 rounded border border-red-200 font-bold">
              Real-time SLA Monitoring
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">
            Government Clearance Oversight
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Inter-departmental application monitoring, bottleneck diagnostics, and statutory SLA compliance across Maharashtra.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('gov-delayed')}
            className="px-4 py-2 bg-red-50 border border-red-300 hover:bg-red-100 text-red-900 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <AlertOctagon className="w-3.5 h-3.5 text-red-700" />
            <span>42 Overdue Applications</span>
          </button>
        </div>
      </div>

      {/* KPI Cards: 1,250 / 310 / 220 / 650 / 70 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Applications Received</span>
          <span className="text-2xl font-extrabold text-slate-900 font-mono block mt-1">
            {governmentKPIs.applicationsReceived.toLocaleString()}
          </span>
          <span className="text-[11px] text-slate-500 mt-0.5 block font-medium">Total across departments</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Pending Scrutiny</span>
          <span className="text-2xl font-extrabold text-amber-700 font-mono block mt-1">
            {governmentKPIs.pending}
          </span>
          <span className="text-[11px] text-amber-700 mt-0.5 block font-medium">Awaiting officer review</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Under Active Review</span>
          <span className="text-2xl font-extrabold text-[#1E4E8C] font-mono block mt-1">
            {governmentKPIs.underReview}
          </span>
          <span className="text-[11px] text-[#1E4E8C] mt-0.5 block font-medium">Field visits & tests</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Clearances Granted</span>
          <span className="text-2xl font-extrabold text-emerald-800 font-mono block mt-1">
            {governmentKPIs.approved}
          </span>
          <span className="text-[11px] text-emerald-700 mt-0.5 block font-medium">Sanctions completed</span>
        </div>

        <div className="bg-red-50/50 p-4 rounded-xl border border-red-300 shadow-xs">
          <span className="text-[11px] font-bold text-red-900 uppercase tracking-wider block">SLA Overdue</span>
          <span className="text-2xl font-extrabold text-red-800 font-mono block mt-1">
            {governmentKPIs.delayed}
          </span>
          <span className="text-[11px] text-red-700 mt-0.5 block font-medium">Exceeds statutory limit</span>
        </div>
      </div>

      {/* 2-Column Analytics & Bottleneck Diagnostic */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Department Turnaround Bar Chart */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-5 sm:p-6 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm sm:text-base font-bold text-slate-900">
                  Processing Time vs. Statutory Mandate
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Average calendar days taken by department compared to statutory SLA limits
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-slate-500 font-medium">
                  <span className="w-2.5 h-2.5 rounded bg-slate-300"></span> Mandated SLA
                </span>
                <span className="flex items-center gap-1.5 text-slate-900 font-bold">
                  <span className="w-2.5 h-2.5 rounded bg-[#1E4E8C]"></span> Actual Average
                </span>
              </div>
            </div>

            <div className="h-64 mt-4 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentProcessingTimes} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis 
                    dataKey="dept" 
                    tick={{ fill: '#64748B', fontSize: 11 }} 
                    angle={-15} 
                    textAnchor="end"
                    interval={0}
                  />
                  <YAxis tick={{ fill: '#64748B', fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', borderRadius: '8px', fontSize: '11px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} 
                  />
                  <Bar dataKey="slaDays" name="Mandated SLA" fill="#CBD5E1" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="avgDays" name="Actual Average" radius={[3, 3, 0, 0]}>
                    {departmentProcessingTimes.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.avgDays > entry.slaDays ? '#DC2626' : '#1E4E8C'} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Red bars indicate departments exceeding mandated statutory turnaround</span>
            <button
              onClick={() => onNavigate('gov-analytics')}
              className="text-[#1E4E8C] hover:text-[#143D6F] font-bold hover:underline"
            >
              Detailed Analytics →
            </button>
          </div>
        </div>

        {/* Right: Primary Bottleneck Diagnostic & SLA Dispatch */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 flex flex-col justify-between overflow-hidden shadow-xs">
          <div>
            <div className="p-4 sm:p-5 bg-slate-50/70 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
                <h2 className="text-sm font-bold text-slate-900">
                  Critical Bottleneck Diagnostic
                </h2>
              </div>
              <span className="text-[10.5px] font-mono font-bold text-red-900 bg-red-100 border border-red-300 px-2 py-0.5 rounded">
                42 Days Average
              </span>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div>
                <div className="text-base font-bold text-slate-900">
                  {bottleneckSummary.department}
                </div>
                <p className="text-xs text-red-700 font-semibold mt-0.5">
                  {bottleneckSummary.summary}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2.5 text-center">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-slate-500 text-[10.5px] block font-bold uppercase">Pending</span>
                  <span className="text-base font-bold text-slate-900 font-mono mt-0.5 block">{bottleneckSummary.pendingCases}</span>
                </div>
                <div className="p-3 bg-red-50/50 rounded-lg border border-red-200">
                  <span className="text-red-700 text-[10.5px] block font-bold uppercase">SLA Overdue</span>
                  <span className="text-base font-bold text-red-800 font-mono mt-0.5 block">{bottleneckSummary.overdueCases}</span>
                </div>
                <div className="p-3 bg-amber-50/50 rounded-lg border border-amber-200">
                  <span className="text-amber-800 text-[10.5px] block font-bold uppercase">Trend</span>
                  <span className="text-xs font-bold text-amber-800 block mt-1">+18% vs Last Mo</span>
                </div>
              </div>

              <div className="space-y-2.5 text-slate-700 leading-relaxed text-xs">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <strong className="text-slate-900 block mb-0.5 font-bold">Root Cause:</strong>
                  {bottleneckSummary.rootCause}
                </div>
                <div className="p-3 bg-blue-50/50 rounded-lg border border-blue-200 text-slate-800">
                  <strong className="block mb-0.5 font-bold text-[#1E4E8C]">Recommended Intervention:</strong>
                  {bottleneckSummary.recommendedIntervention}
                </div>
              </div>

              {/* SLA Notice Action */}
              <div className="pt-1">
                {isEscalated ? (
                  <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-lg text-xs text-emerald-900 shadow-2xs">
                    <div className="flex items-center gap-1.5 font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Formal Statutory Notice Dispatched</span>
                    </div>
                    <p className="text-[11px] mt-0.5 font-mono text-emerald-800">
                      Ref: <strong>{escalationRef}</strong> • Dispatched to MPCB Regional Officer.
                    </p>
                  </div>
                ) : (
                  <button
                    onClick={handleDispatchSlaNotice}
                    disabled={isEscalating}
                    className="w-full bg-[#1E4E8C] hover:bg-[#143D6F] text-white py-2.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs"
                  >
                    {isEscalating ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Dispatching Notice to Regional Officer...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 text-white" />
                        <span>Dispatch Urgent SLA Notice to MPCB</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50/70 border-t border-slate-200 flex justify-between items-center text-xs">
            <span className="text-slate-500 font-medium text-[11px]">SLA variance analytics engine</span>
            <button
              onClick={() => onNavigate('gov-delayed')}
              className="text-[#1E4E8C] hover:text-[#143D6F] font-bold hover:underline text-xs"
            >
              Inspect 42 Overdue Cases →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
