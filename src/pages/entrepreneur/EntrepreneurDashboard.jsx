import React, { useState } from 'react';
import { 
  Calendar, 
  Briefcase, 
  FileText, 
  User, 
  MessageSquare, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  ShieldAlert,
  ArrowUpRight,
  GitBranch
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export default function EntrepreneurDashboard({ 
  project, 
  approvals, 
  onSelectApproval, 
  onNavigate, 
  onOpenDocumentMismatch,
  documentsFixed
}) {
  const [fromDate, setFromDate] = useState('01 Jan 2016');
  const [toDate, setToDate] = useState('22 Sep 2026');
  const [selectedYear, setSelectedYear] = useState('2026');

  // Performance Trend Line Chart Data
  const performanceTrendData = [
    { month: 'Jan', applications: 2500, disposed: 1800, services: 1200 },
    { month: 'Feb', applications: 3200, disposed: 2400, services: 1500 },
    { month: 'Mar', applications: 4100, disposed: 3800, services: 2200 },
    { month: 'Apr', applications: 4300, disposed: 4000, services: 2500 },
    { month: 'May', applications: 18000, disposed: 14000, services: 9000 },
    { month: 'Jun', applications: 35000, disposed: 32000, services: 21000 },
    { month: 'Jul', applications: 37000, disposed: 33000, services: 22500 },
    { month: 'Aug', applications: 42000, disposed: 39500, services: 28000 },
    { month: 'Sep', applications: 29000, disposed: 28500, services: 19000 },
    { month: 'Oct', applications: 1000, disposed: 950, services: 800 },
    { month: 'Nov', applications: 500, disposed: 480, services: 400 },
    { month: 'Dec', applications: 400, disposed: 390, services: 350 }
  ];

  // Grievances Donut Data
  const grievanceStatusData = [
    { name: 'Replied & Resolved', value: 45, color: '#0D9488' },
    { name: 'Under Review', value: 25, color: '#1E4E8C' },
    { name: 'Overdue / Pending', value: documentsFixed ? 0 : 5, color: '#EA580C' },
    { name: 'Total Dossiers', value: 55, color: '#F59E0B' }
  ];

  const totalApprovalsCount = approvals.length || 9;
  const inReviewCount = approvals.filter(a => a.status === 'Under Review' || a.status === 'Inspection').length || 2;
  const grievancesCount = documentsFixed ? 0 : 1;
  const queriesCount = 4;

  return (
    <div className="space-y-6">
      {/* Top Banner: Enterprise Context & Quick Nav */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-1">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#1E4E8C] uppercase tracking-wider bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
              {project.location?.district || "Pune"} Industrial Zone
            </span>
            <span className="text-xs font-semibold text-slate-500">• {project.industry}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            {project.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Single-window clearance tracking, pre-scrutiny compliance & department milestones.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('roadmap')}
            className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 rounded-lg text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <GitBranch className="w-3.5 h-3.5 text-[#1E4E8C]" />
            <span>Parallel Roadmap</span>
          </button>
          <button
            onClick={() => onNavigate('required-approvals')}
            className="px-4 py-2 bg-[#1E4E8C] hover:bg-[#143D6F] text-white rounded-lg text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <span>Clearance Matrix</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Modern Filter & Timeline Control */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          {/* From Date */}
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs">
            <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-500 font-medium">From:</span>
            <input
              type="text"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="bg-transparent font-semibold text-slate-800 focus:outline-none w-28"
            />
          </div>

          {/* To Date */}
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs">
            <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-500 font-medium">To:</span>
            <input
              type="text"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="bg-transparent font-semibold text-slate-800 focus:outline-none w-28"
            />
          </div>

          {/* Filter Preset Chips */}
          <div className="hidden sm:flex items-center gap-1 text-xs">
            <button 
              onClick={() => { setFromDate('01 Jan 2026'); setToDate('22 Sep 2026'); }}
              className="px-2.5 py-1 rounded-md hover:bg-slate-100 text-slate-600 font-medium"
            >
              This Year
            </button>
            <button 
              onClick={() => { setFromDate('01 Jul 2026'); setToDate('22 Sep 2026'); }}
              className="px-2.5 py-1 rounded-md hover:bg-slate-100 text-slate-600 font-medium"
            >
              Current Quarter
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            className="px-4 py-2 bg-[#1E4E8C] hover:bg-[#143D6F] text-white rounded-lg text-xs font-bold transition-colors shadow-xs"
          >
            Apply Range
          </button>
          <button 
            onClick={() => {
              setFromDate('01 Jan 2016');
              setToDate('22 Sep 2026');
            }}
            className="px-3 py-2 text-slate-600 hover:text-slate-900 rounded-lg text-xs font-medium hover:bg-slate-100 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {/* 4 Modern Stat Cards (Preserves visual inspiration from MAITRI layout with refined gradients & borders) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Services Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between relative overflow-hidden group hover:border-[#1E4E8C] transition-all">
          <div className="flex items-start justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Statutory Services</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#1E4E8C] flex items-center justify-center border border-blue-100">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-slate-900 font-sans tracking-tight">
              {totalApprovalsCount} Clearances
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-slate-600">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>4 Approved • 2 In Review</span>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-1.5 h-full bg-[#1E4E8C]"></div>
        </div>

        {/* Active Applications Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between relative overflow-hidden group hover:border-[#6366F1] transition-all">
          <div className="flex items-start justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Filed Applications</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-[#6366F1] flex items-center justify-center border border-indigo-100">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-slate-900 font-sans tracking-tight">
              6 Department Files
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-slate-600">
              <span className="inline-block w-2 h-2 rounded-full bg-indigo-500"></span>
              <span>Across MPCB, DISH, MFES</span>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-1.5 h-full bg-[#6366F1]"></div>
        </div>

        {/* Grievances & Flags Card */}
        <div 
          onClick={onOpenDocumentMismatch}
          className={`rounded-xl border p-5 shadow-xs flex flex-col justify-between relative overflow-hidden cursor-pointer transition-all ${
            documentsFixed
              ? 'bg-white border-slate-200 hover:border-emerald-500'
              : 'bg-amber-50/40 border-amber-300 hover:border-amber-500'
          }`}
        >
          <div className="flex items-start justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Pending Flags</span>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${
              documentsFixed 
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                : 'bg-amber-100 text-amber-900 border-amber-300'
            }`}>
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-slate-900 font-sans tracking-tight">
              {grievancesCount} {documentsFixed ? "Issues" : "Action Required"}
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs font-medium">
              {documentsFixed ? (
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Coordinates Verified
                </span>
              ) : (
                <span className="text-amber-800 font-bold hover:underline">
                  Survey 123/4 Discrepancy →
                </span>
              )}
            </div>
          </div>
          <div className={`absolute top-0 right-0 w-1.5 h-full ${documentsFixed ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
        </div>

        {/* Queries Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between relative overflow-hidden group hover:border-[#0D9488] transition-all">
          <div className="flex items-start justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Scrutiny Queries</span>
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-[#0D9488] flex items-center justify-center border border-teal-100">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-slate-900 font-sans tracking-tight">
              {queriesCount} Inquiries
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-slate-600">
              <span className="inline-block w-2 h-2 rounded-full bg-teal-500"></span>
              <span>All Clarified Promptly</span>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-1.5 h-full bg-[#0D9488]"></div>
        </div>
      </div>

      {/* Discrepancy Banner */}
      {!documentsFixed && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 rounded-xl p-4.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 text-sm">
                Next Action Required: Survey Coordinate Discrepancy in Layout Drawing
              </div>
              <p className="text-xs text-slate-700 mt-0.5 leading-relaxed">
                Building Plan layout specifies Survey '123/4' while registered MIDC lease deed reads '123/4B'. Click to upload the corrected drawing and proceed with DISH scrutiny.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenDocumentMismatch}
            className="px-4 py-2 bg-[#EA580C] hover:bg-[#C2410C] text-white rounded-lg text-xs font-bold transition-colors shrink-0 shadow-xs"
          >
            Inspect & Resolve
          </button>
        </div>
      )}

      {/* Analytics: Performance Trend & Grievance Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Services Performance Trend */}
        <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h2 className="font-bold text-slate-900 text-base">Clearance Performance Throughput</h2>
                <p className="text-xs text-slate-500 mt-0.5">Application inflow, disposals, and approved sanctions</p>
              </div>

              <div className="flex items-center gap-2">
                <select 
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="text-xs font-semibold border border-slate-300 rounded-md px-2 py-1 bg-white text-slate-700"
                >
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                </select>
              </div>
            </div>

            {/* Line Chart */}
            <div className="h-64 mt-4 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceTrendData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="month" tick={{ fill: '#64748B', fontSize: 11 }} />
                  <YAxis tick={{ fill: '#64748B', fontSize: 11 }} tickFormatter={(val) => `${val / 1000}K`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#CBD5E1', borderRadius: '8px', fontSize: '12px' }} 
                  />
                  <Line type="monotone" dataKey="applications" stroke="#EA580C" strokeWidth={2.5} dot={false} name="Applications" />
                  <Line type="monotone" dataKey="disposed" stroke="#0D9488" strokeWidth={2.5} dot={false} name="Disposed" />
                  <Line type="monotone" dataKey="services" stroke="#1E4E8C" strokeWidth={2} dot={false} name="Services" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Custom Chart Legend */}
            <div className="flex items-center justify-center gap-6 mt-4 text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-[#EA580C]"></span>
                <span>Applications Inflow</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-[#0D9488]"></span>
                <span>Files Disposed</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-[#1E4E8C]"></span>
                <span>Services Granted</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Grievances Status Donut Chart */}
        <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h2 className="font-bold text-slate-900 text-base">Grievance & Scrutiny Status</h2>
                <p className="text-xs text-slate-500 mt-0.5">Distribution across resolution milestones</p>
              </div>
              <User className="w-4 h-4 text-slate-400" />
            </div>

            {/* Donut Chart */}
            <div className="h-64 mt-2 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={grievanceStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={95}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {grievanceStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Donut Legend */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-slate-600">
              {grievanceStatusData.map((item, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Clearances Table Overview */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-bold text-slate-900 text-base">
              Mandatory Clearances Progression
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Live tracking across DISH, MPCB, MFES, MSEDCL, and MIDC Planning
            </p>
          </div>
          <button
            onClick={() => onNavigate('required-approvals')}
            className="text-xs font-bold text-[#1E4E8C] hover:underline flex items-center gap-1"
          >
            <span>Full Checklist Matrix</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-700 border-b border-slate-200 text-xs">
                <th className="py-3 px-4 font-bold">Sr No.</th>
                <th className="py-3 px-4 font-bold">Department</th>
                <th className="py-3 px-4 font-bold">Clearance Name</th>
                <th className="py-3 px-4 font-bold">Status</th>
                <th className="py-3 px-4 font-bold">Turnaround SLA</th>
                <th className="py-3 px-4 text-right font-bold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {approvals.slice(0, 6).map((app, index) => (
                <tr key={app.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-medium text-slate-600">{index + 1}</td>
                  <td className="py-3 px-4 font-semibold text-slate-800">{app.department}</td>
                  <td className="py-3 px-4 text-slate-700">
                    <div className="font-semibold text-slate-900">{app.name}</div>
                    {app.isParallel && (
                      <span className="text-[10px] bg-blue-50 text-[#1E4E8C] px-1.5 py-0.2 rounded border border-blue-200 font-semibold inline-block mt-0.5">
                        Parallel Clearance
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-bold ${
                      app.status === 'Approved' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                      app.status === 'Under Review' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                      app.status === 'Action Required' && !documentsFixed ? 'bg-red-100 text-red-800 border border-red-300' :
                      'bg-slate-100 text-slate-700 border border-slate-300'
                    }`}>
                      {app.status === 'Action Required' && documentsFixed ? 'Under Review' : app.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono font-semibold text-slate-600">{app.estimatedDays} Days</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => onSelectApproval(app)}
                      className="px-3 py-1 bg-white hover:bg-slate-100 border border-slate-300 text-[#1E4E8C] rounded-md text-xs font-bold transition-colors"
                    >
                      Inspect
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
