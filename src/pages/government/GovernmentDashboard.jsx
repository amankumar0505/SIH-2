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
          <div className="text-[11px] font-semibold text-[#86868B] uppercase tracking-wider">
            Government of Maharashtra • Department Operations
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] tracking-tight mt-0.5">
            Department Operations & Scrutiny Command
          </h1>
          <p className="text-xs text-[#6E6E73] mt-1">
            Inter-departmental application monitoring, bottleneck diagnostics, and statutory SLA compliance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('gov-delayed')}
            className="px-3.5 py-1.5 bg-[#FEF2F2] border border-[#FECACA] hover:bg-[#FEE2E2] text-[#991B1B] rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <AlertOctagon className="w-3.5 h-3.5 text-[#CF222E]" />
            <span>42 Overdue Applications</span>
          </button>
        </div>
      </div>

      {/* KPI Cards: 1,250 / 310 / 220 / 650 / 70 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <div className="bg-white p-4 rounded-lg border border-[#D2D2D7]">
          <span className="text-[11px] font-medium text-[#86868B] uppercase tracking-wider block">Applications Received</span>
          <span className="text-2xl font-semibold text-[#1D1D1F] font-mono block mt-1">
            {governmentKPIs.applicationsReceived.toLocaleString()}
          </span>
          <span className="text-[11px] text-[#6E6E73] mt-0.5 block">Total across departments</span>
        </div>

        <div className="bg-white p-4 rounded-lg border border-[#D2D2D7]">
          <span className="text-[11px] font-medium text-[#86868B] uppercase tracking-wider block">Pending Scrutiny</span>
          <span className="text-2xl font-semibold text-[#78350F] font-mono block mt-1">
            {governmentKPIs.pending}
          </span>
          <span className="text-[11px] text-[#78350F] mt-0.5 block">Awaiting officer review</span>
        </div>

        <div className="bg-white p-4 rounded-lg border border-[#D2D2D7]">
          <span className="text-[11px] font-medium text-[#86868B] uppercase tracking-wider block">Under Active Review</span>
          <span className="text-2xl font-semibold text-[#003366] font-mono block mt-1">
            {governmentKPIs.underReview}
          </span>
          <span className="text-[11px] text-[#003366] mt-0.5 block">Field visits & tests</span>
        </div>

        <div className="bg-white p-4 rounded-lg border border-[#D2D2D7]">
          <span className="text-[11px] font-medium text-[#86868B] uppercase tracking-wider block">Clearances Granted</span>
          <span className="text-2xl font-semibold text-[#14532D] font-mono block mt-1">
            {governmentKPIs.approved}
          </span>
          <span className="text-[11px] text-[#14532D] mt-0.5 block">Sanctions completed</span>
        </div>

        <div className="bg-white p-4 rounded-lg border border-[#FECACA] bg-[#FEF2F2]/30">
          <span className="text-[11px] font-medium text-[#991B1B] uppercase tracking-wider block">SLA Overdue</span>
          <span className="text-2xl font-semibold text-[#991B1B] font-mono block mt-1">
            {governmentKPIs.delayed}
          </span>
          <span className="text-[11px] text-[#991B1B] mt-0.5 block">Exceeds statutory limit</span>
        </div>
      </div>

      {/* 2-Column Analytics & Bottleneck Diagnostic */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Department Turnaround Bar Chart */}
        <div className="lg:col-span-7 bg-white rounded-lg border border-[#D2D2D7] p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-[#1D1D1F]">
                  Processing Time vs. Statutory Mandate
                </h2>
                <p className="text-xs text-[#6E6E73] mt-0.5">
                  Average calendar days taken by department compared to statutory SLA limits
                </p>
              </div>
              <div className="flex items-center gap-3 text-[11px]">
                <span className="flex items-center gap-1.5 text-[#6E6E73]">
                  <span className="w-2.5 h-2.5 rounded bg-[#86868B]"></span> Mandated SLA
                </span>
                <span className="flex items-center gap-1.5 text-[#1D1D1F]">
                  <span className="w-2.5 h-2.5 rounded bg-[#003366]"></span> Actual Average
                </span>
              </div>
            </div>

            <div className="h-64 mt-4 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentProcessingTimes} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E5EA" />
                  <XAxis 
                    dataKey="dept" 
                    tick={{ fill: '#6E6E73', fontSize: 11 }} 
                    angle={-15} 
                    textAnchor="end"
                    interval={0}
                  />
                  <YAxis tick={{ fill: '#6E6E73', fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#D2D2D7', borderRadius: '6px', fontSize: '11px' }} 
                  />
                  <Bar dataKey="slaDays" name="Mandated SLA" fill="#D2D2D7" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="avgDays" name="Actual Average" radius={[2, 2, 0, 0]}>
                    {departmentProcessingTimes.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.avgDays > entry.slaDays ? '#CF222E' : '#003366'} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="pt-3 border-t border-[#E5E5EA] flex items-center justify-between text-xs text-[#6E6E73]">
            <span>Red bars indicate departments exceeding mandated statutory turnaround</span>
            <button
              onClick={() => onNavigate('gov-analytics')}
              className="text-[#003366] hover:underline font-medium"
            >
              Detailed Analytics →
            </button>
          </div>
        </div>

        {/* Right: Primary Bottleneck Diagnostic & SLA Dispatch */}
        <div className="lg:col-span-5 bg-white rounded-lg border border-[#D2D2D7] flex flex-col justify-between overflow-hidden">
          <div>
            <div className="p-4 bg-[#FAFAFA] border-b border-[#E5E5EA] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#CF222E]"></span>
                <h2 className="text-sm font-semibold text-[#1D1D1F]">
                  Identified Bottleneck
                </h2>
              </div>
              <span className="text-[11px] font-mono text-[#991B1B] bg-[#FEF2F2] border border-[#FECACA] px-2 py-0.5 rounded">
                42 Days Average
              </span>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div>
                <div className="text-base font-semibold text-[#1D1D1F]">
                  {bottleneckSummary.department}
                </div>
                <p className="text-xs text-[#991B1B] font-medium mt-0.5">
                  {bottleneckSummary.summary}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2.5 text-center">
                <div className="p-2.5 bg-[#FAFAFA] rounded-md border border-[#E5E5EA]">
                  <span className="text-[#86868B] text-[10.5px] block">Pending</span>
                  <span className="text-base font-semibold text-[#1D1D1F] font-mono">{bottleneckSummary.pendingCases}</span>
                </div>
                <div className="p-2.5 bg-[#FEF2F2] rounded-md border border-[#FECACA]">
                  <span className="text-[#991B1B] text-[10.5px] block">SLA Overdue</span>
                  <span className="text-base font-semibold text-[#991B1B] font-mono">{bottleneckSummary.overdueCases}</span>
                </div>
                <div className="p-2.5 bg-[#FFFBEB] rounded-md border border-[#FDE68A]">
                  <span className="text-[#78350F] text-[10.5px] block">Trend</span>
                  <span className="text-xs font-semibold text-[#78350F] block mt-1">+18%</span>
                </div>
              </div>

              <div className="space-y-2 text-[#424245] leading-relaxed text-xs">
                <div className="p-3 bg-[#FAFAFA] rounded-md border border-[#E5E5EA]">
                  <strong className="text-[#1D1D1F] block mb-0.5 font-medium">Root Cause:</strong>
                  {bottleneckSummary.rootCause}
                </div>
                <div className="p-3 bg-[#F5F5F7] rounded-md border border-[#E5E5EA] text-[#003366]">
                  <strong className="block mb-0.5 font-medium text-[#1D1D1F]">Recommended Intervention:</strong>
                  {bottleneckSummary.recommendedIntervention}
                </div>
              </div>

              {/* SLA Notice Action */}
              <div className="pt-1">
                {isEscalated ? (
                  <div className="p-3 bg-[#F0FDF4] border border-[#A7F3D0] rounded-md text-xs text-[#14532D]">
                    <div className="flex items-center gap-1.5 font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-[#1A7F37] shrink-0" />
                      <span>Formal Statutory Notice Dispatched</span>
                    </div>
                    <p className="text-[11.5px] mt-0.5 font-mono text-[#14532D]">
                      Ref: <strong>{escalationRef}</strong> • Dispatched to MPCB Regional Officer.
                    </p>
                  </div>
                ) : (
                  <button
                    onClick={handleDispatchSlaNotice}
                    disabled={isEscalating}
                    className="w-full bg-[#003366] hover:bg-[#002244] text-white py-2 px-3 rounded-md text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
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

          <div className="p-3 bg-[#FAFAFA] border-t border-[#E5E5EA] flex justify-between items-center text-xs">
            <span className="text-[#86868B] text-[11px]">SLA variance analytics engine</span>
            <button
              onClick={() => onNavigate('gov-delayed')}
              className="text-[#003366] font-medium hover:underline text-xs"
            >
              Inspect 42 Overdue Cases →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
