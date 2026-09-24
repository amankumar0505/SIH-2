import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Building, 
  ChevronRight
} from 'lucide-react';
import ProjectSummaryStrip from '../../components/ProjectSummaryStrip';

export default function Applications({ project, applications, onSelectApplication }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filtered = applications.filter((app) => {
    const matchesSearch = app.approvalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          app.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          app.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusBadges = {
    'APPROVED': 'bg-emerald-50 text-emerald-800 border-emerald-300',
    'UNDER REVIEW': 'bg-amber-50 text-amber-900 border-amber-300',
    'INSPECTION': 'bg-blue-50 text-blue-900 border-blue-300',
    'ACTION REQUIRED': 'bg-red-50 text-red-900 border-red-300',
    'NOT STARTED': 'bg-slate-100 text-slate-700 border-slate-300',
    'REJECTED': 'bg-red-100 text-red-900 border-red-300'
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3 pb-1">
        <div>
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
            <span>Single-Window Applications Ledger</span>
            <span className="text-[#1E4E8C] bg-blue-50 text-[10.5px] px-2 py-0.5 rounded border border-blue-200 font-bold">
              {filtered.length} Active Records
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">
            My Applications
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Real-time status tracking and department milestone progression across all filed permissions.
          </p>
        </div>
      </div>

      <ProjectSummaryStrip project={project} />

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search application ID, department, clearance..."
              className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:border-[#1E4E8C] focus:outline-none text-xs"
            />
          </div>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          <span className="text-slate-500 font-bold uppercase text-[11px]">Status:</span>
          {['ALL', 'APPROVED', 'UNDER REVIEW', 'INSPECTION', 'ACTION REQUIRED', 'NOT STARTED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg font-bold text-xs whitespace-nowrap transition-all ${
                statusFilter === st
                  ? 'bg-[#1E4E8C] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 border-b border-slate-200 uppercase text-[11px] font-bold tracking-wider">
                <th className="py-3 px-4">Application ID</th>
                <th className="py-3 px-4">Clearance Name</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Risk Category</th>
                <th className="py-3 px-4">Submitted Date</th>
                <th className="py-3 px-4">Statutory SLA</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filtered.map((app) => (
                <tr
                  key={app.id}
                  onClick={() => onSelectApplication?.(app)}
                  className="hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <td className="py-3.5 px-4 font-mono font-bold text-[#1E4E8C]">
                    <div>{app.id}</div>
                    {app.jointInspectionId && (
                      <span className="text-[10px] font-sans font-bold bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded border border-blue-200 block w-max mt-0.5">
                        CIS Joint Site Visit
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    <div>{app.approvalName}</div>
                    {app.queryDetails && !app.queryDetails.isResolved && (
                      <span className="text-[10px] text-amber-800 font-bold bg-amber-100 px-1.5 py-0.5 rounded border border-amber-300 inline-flex items-center gap-1 mt-0.5">
                        <AlertTriangle className="w-2.5 h-2.5 text-amber-700" />
                        Query Pending Response
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-medium">
                    {app.department}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10.5px] font-bold border ${
                      app.riskLevel === 'GREEN' 
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
                        : app.riskLevel === 'RED' 
                        ? 'bg-red-50 text-red-900 border-red-300' 
                        : 'bg-amber-50 text-amber-900 border-amber-300'
                    }`}>
                      {app.riskLevel ? `${app.riskLevel} RISK` : 'STANDARD'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-500">
                    {app.submittedDate || '—'}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-700 font-bold">
                    {app.slaDays ? `${app.slaDays} Days` : '15 Days'}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold border ${statusBadges[app.status] || 'bg-slate-100 text-slate-700 border-slate-300'}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectApplication?.(app);
                      }}
                      className="text-xs font-bold text-[#1E4E8C] hover:text-[#143D6F] hover:underline"
                    >
                      {app.queryDetails && !app.queryDetails.isResolved ? "Respond to Query →" : "Track Details →"}
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
