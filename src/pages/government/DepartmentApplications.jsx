import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  AlertOctagon, 
  CheckCircle2, 
  Building, 
  X
} from 'lucide-react';
import { departmentApplicationsList } from '../../data/departmentData';

export default function DepartmentApplications({ onSelectCase, showToast }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [selectedDistrict, setSelectedDistrict] = useState('ALL');
  const [delayedOnly, setDelayedOnly] = useState(false);
  const [activeModalCase, setActiveModalCase] = useState(null);
  const [officerNote, setOfficerNote] = useState('');

  const departments = ['ALL', 'Pollution (MPCB)', 'Factory (DISH)', 'Fire Dept (MFES)', 'Electricity (MSEDCL)', 'Planning (MIDC SPA)'];
  const districts = ['ALL', 'Pune', 'Thane', 'Nagpur', 'Raigad', 'Aurangabad', 'Nashik', 'Navi Mumbai'];

  const filtered = departmentApplicationsList.filter((item) => {
    const matchesSearch = item.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.approval.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'ALL' || item.department.includes(selectedDept) || item.department === selectedDept;
    const matchesDistrict = selectedDistrict === 'ALL' || item.district === selectedDistrict;
    const matchesDelayed = !delayedOnly || item.status === 'OVERDUE';

    return matchesSearch && matchesDept && matchesDistrict && matchesDelayed;
  });

  const handleOfficerAction = (action) => {
    showToast?.(`Case ${activeModalCase?.id}: Action '${action}' registered with officer remarks`, "success");
    setActiveModalCase(null);
    setOfficerNote('');
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3 pb-1">
        <div>
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
            <span>Industrial Applications Register</span>
            <span className="text-[#1E4E8C] bg-blue-50 text-[10.5px] px-2 py-0.5 rounded border border-blue-200 font-bold">
              {filtered.length} Case Files
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">
            Department Scrutiny Ledger
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Cross-departmental application records across Maharashtra industrial estates with statutory SLA tracking.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setDelayedOnly(!delayedOnly)}
            className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all flex items-center gap-1.5 shadow-2xs ${
              delayedOnly
                ? 'bg-red-800 text-white border-red-800'
                : 'bg-white text-red-800 border-red-300 hover:bg-red-50'
            }`}
          >
            <AlertOctagon className="w-3.5 h-3.5" />
            <span>{delayedOnly ? "Showing Delayed Only" : "Filter Overdue Only"}</span>
          </button>
        </div>
      </div>

      {/* Filter Control Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block font-bold text-slate-700 uppercase text-[11px] mb-1">Search Applications</label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search enterprise, application ID..."
                className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-xs focus:border-[#1E4E8C] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase text-[11px] mb-1">Department</label>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg font-bold text-slate-800 text-xs focus:border-[#1E4E8C] focus:outline-none"
            >
              {departments.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase text-[11px] mb-1">District</label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg font-bold text-slate-800 text-xs focus:border-[#1E4E8C] focus:outline-none"
            >
              {districts.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 border-b border-slate-200 uppercase text-[11px] font-bold tracking-wider">
                <th className="py-3 px-4">App ID</th>
                <th className="py-3 px-4">Enterprise Name</th>
                <th className="py-3 px-4">Industry</th>
                <th className="py-3 px-4">Risk Scrutiny</th>
                <th className="py-3 px-4">Approval Type</th>
                <th className="py-3 px-4 text-center">Age</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Assigned Officer</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filtered.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => setActiveModalCase(item)}
                  className={`hover:bg-slate-50 cursor-pointer transition-colors ${
                    item.status === 'OVERDUE' ? 'bg-red-50/30' : ''
                  }`}
                >
                  <td className="py-3.5 px-4 font-mono font-bold text-[#1E4E8C]">
                    {item.id}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    <div>{item.companyName}</div>
                    <span className="text-[11px] text-slate-500 font-normal">{item.district} District</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-medium">
                    {item.industry}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      item.riskLevel === 'GREEN' 
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
                        : item.riskLevel === 'RED' 
                        ? 'bg-red-50 text-red-900 border-red-300' 
                        : 'bg-amber-50 text-amber-900 border-amber-300'
                    }`}>
                      {item.riskLevel ? `${item.riskLevel} RISK` : 'MEDIUM'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-800 font-medium">
                    {item.approval}
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-slate-900 font-mono">
                    {item.daysPending}d
                  </td>
                  <td className="py-3.5 px-4">
                    {item.status === 'OVERDUE' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-bold bg-red-50 text-red-900 border border-red-300">
                        <AlertOctagon className="w-3.5 h-3.5 text-red-700" />
                        OVERDUE
                      </span>
                    ) : item.status === 'APPROVED' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-900 border border-emerald-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        APPROVED
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-bold bg-blue-50 text-blue-900 border border-blue-200">
                        IN PROGRESS
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-medium">
                    {item.assignedOfficer}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveModalCase(item);
                      }}
                      className="text-xs font-bold text-[#1E4E8C] hover:text-[#143D6F] hover:underline"
                    >
                      Inspect Case →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Officer Case Review Modal */}
      {activeModalCase && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-[4px] max-w-2xl w-full p-6 shadow-2xl border border-slate-300 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-3 border-b border-slate-200">
              <div>
                <span className="text-[11.5px] font-bold text-slate-500 uppercase tracking-wider block">
                  Scrutiny Record • {activeModalCase.id}
                </span>
                <h3 className="text-xl font-bold text-[#1B365D] mt-0.5">
                  {activeModalCase.companyName}
                </h3>
                <div className="text-[13px] text-slate-600 mt-0.5">
                  {activeModalCase.approval} • {activeModalCase.department}
                </div>
              </div>
              <button 
                onClick={() => setActiveModalCase(null)}
                className="p-1 rounded-[2px] text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs">
              <div className="grid grid-cols-3 gap-3 p-3 bg-slate-50 rounded-[2px] border border-slate-200">
                <div>
                  <span className="text-slate-500 block text-[11.5px]">Submission Date</span>
                  <span className="font-semibold text-slate-900 text-[13.5px]">{activeModalCase.submittedDate}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11.5px]">Days Pending</span>
                  <span className="font-bold text-slate-900 text-[13.5px]">{activeModalCase.daysPending} Days</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11.5px]">Statutory SLA</span>
                  <span className="font-semibold text-slate-900 text-[13.5px]">{activeModalCase.expectedSLA} Days</span>
                </div>
              </div>

              {activeModalCase.status === 'OVERDUE' && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-[2px] text-red-950">
                  <span className="font-bold block mb-0.5 text-[13px]">Bottleneck Diagnostic:</span>
                  <p className="text-[13px] leading-relaxed">{activeModalCase.bottleneckReason}</p>
                </div>
              )}

              <div>
                <label className="block font-bold text-slate-700 uppercase text-[11.5px] mb-1">
                  Department Scrutiny Remarks
                </label>
                <textarea
                  rows="3"
                  value={officerNote}
                  onChange={(e) => setOfficerNote(e.target.value)}
                  placeholder="Enter technical inspection observations, document queries, or sanction committee notes..."
                  className="w-full p-2.5 border border-slate-300 rounded-[3px] text-[13.5px] focus:border-[#1B365D] focus:outline-none"
                />
              </div>

              <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOfficerAction("Document Query Raised")}
                    className="px-3.5 py-1.5 bg-amber-700 hover:bg-amber-800 text-white rounded-[2px] text-[12.5px] font-bold shadow-sm"
                  >
                    Raise Document Query
                  </button>
                  <button
                    onClick={() => handleOfficerAction("Synchronize Central Joint Inspection (CIS)")}
                    className="px-3.5 py-1.5 bg-blue-800 hover:bg-blue-900 text-white rounded-[2px] text-[12.5px] font-bold shadow-sm"
                  >
                    Schedule CIS Joint Inspection
                  </button>
                </div>

                <button
                  onClick={() => handleOfficerAction("Statutory Approval Sanctioned")}
                  className="px-4 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-[2px] text-[13px] font-bold flex items-center gap-1.5 shadow-sm"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Grant Approval</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
