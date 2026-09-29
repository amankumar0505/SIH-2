import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  AlertOctagon, 
  Building, 
  CheckCircle2, 
  Users, 
  ShieldCheck 
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
  Cell 
} from 'recharts';
import { departmentProcessingTimes, governmentKPIs } from '../../data/departmentData';

export default function Analytics() {
  const workloadData = [
    { name: 'Pollution (MPCB)', total: 340, pending: 87, overdue: 42 },
    { name: 'Factory (DISH)', total: 280, pending: 64, overdue: 12 },
    { name: 'Planning (MIDC SPA)', total: 220, pending: 52, overdue: 8 },
    { name: 'Fire Dept (MFES)', total: 195, pending: 45, overdue: 6 },
    { name: 'Electricity (MSEDCL)', total: 150, pending: 38, overdue: 2 },
    { name: 'FSSAI FoSCoS', total: 65, pending: 24, overdue: 4 }
  ];

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3 pb-1">
        <div>
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
            <span>Operational Intelligence & SLA Monitoring</span>
            <span className="text-[#1E4E8C] bg-blue-50 text-[10.5px] px-2 py-0.5 rounded border border-blue-200 font-bold">
              6 Regulatory Authorities
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">
            Processing Time & Workload Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Inter-departmental clearance throughput, officer allocation efficiency, and bottleneck diagnostics.
          </p>
        </div>

        <span className="text-xs uppercase font-bold bg-slate-100 text-slate-800 border border-slate-300 px-3 py-1.5 rounded-lg shadow-2xs font-mono">
          State Clearance Dataset
        </span>
      </div>

      {/* 2-Column Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Chart 1: Average Processing Time vs Standard SLA */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900">
                Department Average Processing Time (Days)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Average actual turnaround days vs standard benchmarks</p>
            </div>
            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded font-mono">Benchmark: ≤14d</span>
          </div>

          <div className="h-64 mt-4 text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentProcessingTimes} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="department" tick={{ fontSize: 10.5, fill: '#64748B' }} angle={-15} textAnchor="end" />
                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} />
                <Tooltip 
                  formatter={(v) => [`${v} Days`, 'Turnaround Time']}
                  contentStyle={{ backgroundColor: '#07172C', color: '#fff', fontSize: '11px', borderRadius: '8px', border: 'none' }}
                />
                <Bar dataKey="avgDays" radius={[3, 3, 0, 0]}>
                  {departmentProcessingTimes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color || '#1E4E8C'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Department Workload & Overdue Backlog */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900">
                Department Caseload & Overdue Backlog
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Active pending reviews vs overdue cases</p>
            </div>
            <span className="text-xs font-bold text-red-800 bg-red-50 border border-red-200 px-2 py-0.5 rounded font-mono">42 Overdue Total</span>
          </div>

          <div className="h-64 mt-4 text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={workloadData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" tick={{ fontSize: 10.5, fill: '#64748B' }} angle={-15} textAnchor="end" />
                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#07172C', color: '#fff', fontSize: '11px', borderRadius: '8px', border: 'none' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar dataKey="pending" name="Pending Scrutiny" fill="#1E4E8C" radius={[3, 3, 0, 0]} />
                <Bar dataKey="overdue" name="SLA Overdue" fill="#DC2626" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detailed Workload Breakdown Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 bg-slate-50/70 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Inter-Departmental SLA Adherence Matrix
          </h2>
          <span className="text-xs text-slate-500 font-bold">6 Integrated Regulatory Authorities</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 border-b border-slate-200 uppercase text-[11px] font-bold tracking-wider">
                <th className="py-3 px-4">Department Name</th>
                <th className="py-3 px-4 text-center">Total Inflow</th>
                <th className="py-3 px-4 text-center">Pending Scrutiny</th>
                <th className="py-3 px-4 text-center">SLA Overdue</th>
                <th className="py-3 px-4 text-center">Avg Days</th>
                <th className="py-3 px-4 text-center">Benchmark SLA</th>
                <th className="py-3 px-4">Bottleneck Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {departmentProcessingTimes.map((d, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    {d.department}
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-slate-900 font-mono">
                    {d.pending + d.overdue * 2 + 100}
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-slate-700 font-mono">
                    {d.pending}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`font-bold px-2 py-0.5 rounded text-[10.5px] font-mono ${
                      d.overdue > 10 ? 'bg-red-100 text-red-950 border border-red-300' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {d.overdue}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono font-bold text-[#1E4E8C]">
                    {d.avgDays}d
                  </td>
                  <td className="py-3.5 px-4 text-center text-slate-500 font-mono">
                    {d.standardSLA}d
                  </td>
                  <td className="py-3.5 px-4">
                    {d.overdue > 20 ? (
                      <span className="text-red-700 font-bold text-xs flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                        Primary Bottleneck
                      </span>
                    ) : d.overdue > 5 ? (
                      <span className="text-amber-700 font-bold text-xs">Moderate Backlog</span>
                    ) : (
                      <span className="text-emerald-700 font-bold text-xs">Healthy Flow</span>
                    )}
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
