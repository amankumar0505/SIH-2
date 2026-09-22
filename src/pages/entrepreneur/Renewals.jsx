import React, { useState } from 'react';
import { 
  Plus, 
  MessageSquare, 
  ChevronLeft, 
  ChevronRight,
  Star
} from 'lucide-react';

export default function Renewals({ project, renewals, onNavigate, showToast }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [feedbackNote, setFeedbackNote] = useState('');

  // Real feedback items matching Screenshot 3: "Feedback Report — List Of All Feedbacks Received On Maitri Portal"
  const feedbackData = [
    { sr: 1, dept: "Labour Department", service: "License under The Beedi and Cigar ...", rating: 10, total: 1 },
    { sr: 2, dept: "Energy Department", service: "Form C- Application form for Plan Ap...", rating: 4, total: 2 },
    { sr: 3, dept: "Directorate of Industrial Safety and H...", service: "Registration and Grant of License (Ha...", rating: 9, total: 16 },
    { sr: 4, dept: "Directorate of Boilers", service: "Transfer of Ownership", rating: 10, total: 1 },
    { sr: 5, dept: "Maharashtra Industrial Development ...", service: "Application for Mortgage Consent", rating: 1, total: 1 },
    { sr: 6, dept: "Directorate of Industries", service: "Application for availing Incentives for...", rating: 10, total: 1 },
    { sr: 7, dept: "Labour Department", service: "Amendment of Registration of establi...", rating: 10, total: 1 },
    { sr: 8, dept: "Legal Metrology Department", service: "Apply for Repairer License of Weight...", rating: 10, total: 2 },
    { sr: 9, dept: "Directorate of Industrial Safety and H...", service: "Registration and Grant of License (N...", rating: 6, total: 4 },
    { sr: 10, dept: "Labour Department", service: "Registration of Establishments under ...", rating: 10, total: 12 }
  ];

  const handleAddFeedback = () => {
    if (!feedbackNote.trim()) return;
    showToast?.("Feedback submitted successfully to Government of Maharashtra Directorate of Industries!", "success");
    setFeedbackNote('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header matching Screenshot 3 */}
      <div className="bg-white rounded-xl border border-[#DDE3EA] p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Feedback Report
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              List Of All Feedbacks Received On Single Window Portal
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-5 py-2 bg-[#1A65E5] hover:bg-[#1451B8] text-white rounded-md text-xs font-bold transition-colors shadow-xs"
          >
            Add Feedback
          </button>
        </div>

        {/* Feedback Data Table (Exact columns from Screenshot 3) */}
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-700 border-b border-slate-200 text-xs">
                <th className="py-3 px-4 font-bold text-center w-16">Sr No.</th>
                <th className="py-3 px-4 font-bold">Department</th>
                <th className="py-3 px-4 font-bold">Service</th>
                <th className="py-3 px-4 font-bold text-center">Average Rating</th>
                <th className="py-3 px-4 font-bold text-center">Total Feedback received</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {feedbackData.map((item) => (
                <tr key={item.sr} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 text-center font-medium text-slate-600">{item.sr}</td>
                  <td className="py-3 px-4 font-medium text-slate-800">{item.dept}</td>
                  <td className="py-3 px-4 text-slate-700 font-medium">{item.service}</td>
                  <td className="py-3 px-4 text-center">
                    <span className="inline-flex items-center gap-1 font-bold text-slate-900">
                      {item.rating}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center font-semibold text-slate-700">{item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Pagination Controls (Matching Screenshot 3) */}
        <div className="flex items-center justify-end gap-2 pt-4 mt-2 border-t border-slate-100 text-xs text-slate-600">
          <span className="mr-2 font-medium">Page {currentPage} of 5</span>
          <button 
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            className="p-1.5 rounded border border-slate-300 hover:bg-slate-100 disabled:opacity-40"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button 
            disabled={currentPage >= 5}
            onClick={() => setCurrentPage(prev => Math.min(5, prev + 1))}
            className="p-1.5 rounded border border-slate-300 hover:bg-slate-100 disabled:opacity-40"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Lower Section: Feedback from users */}
      <div className="bg-white rounded-xl border border-[#DDE3EA] p-5 sm:p-6 shadow-xs">
        <h2 className="text-lg font-bold text-slate-900">
          Feedback from users
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          All The Feedback Received From Users On The Portal.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-[#003366]">ABC Food Processing Pvt Ltd (Chakan MIDC)</span>
              <div className="flex items-center text-amber-500 text-xs font-bold">
                ★★★★★ (10/10)
              </div>
            </div>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              "Single-window pre-scrutiny highlighted our layout coordinate issue immediately before we submitted to DISH. Saved us at least 4 weeks of formal query ping-pong."
            </p>
            <span className="text-[11px] text-slate-400 mt-2 block">18 Sep 2026 • Verified Investor</span>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-[#003366]">Bharat Precision Works (Nagpur)</span>
              <div className="flex items-center text-amber-500 text-xs font-bold">
                ★★★★★ (9/10)
              </div>
            </div>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              "DigiLocker direct pull of corporate incorporation and land deed prevented having to notarize physical documents. Very efficient for large fabrication expansion."
            </p>
            <span className="text-[11px] text-slate-400 mt-2 block">12 Sep 2026 • Verified Investor</span>
          </div>
        </div>
      </div>

      {/* Add Feedback Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-2xl border border-slate-300">
            <h3 className="font-bold text-base text-slate-900">Submit Portal Feedback</h3>
            <p className="text-xs text-slate-500 mt-0.5">Share your experience with Maharashtra single-window approvals</p>

            <div className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Department</label>
                <select className="w-full border border-slate-300 rounded p-2 text-xs bg-white">
                  <option>Directorate of Industrial Safety and Health (DISH)</option>
                  <option>Maharashtra Pollution Control Board (MPCB)</option>
                  <option>Directorate of Industries</option>
                  <option>Maharashtra Industrial Development Corp (MIDC)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Rating (1 to 10)</label>
                <select className="w-full border border-slate-300 rounded p-2 text-xs bg-white">
                  <option>10 - Excellent</option>
                  <option>9 - Very Good</option>
                  <option>8 - Good</option>
                  <option>5 - Average</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Your Observations / Suggestions</label>
                <textarea 
                  rows={4}
                  value={feedbackNote}
                  onChange={(e) => setFeedbackNote(e.target.value)}
                  placeholder="Enter details about your approval processing speed, officer responsiveness, or portal UX..."
                  className="w-full border border-slate-300 rounded p-2 text-xs"
                />
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-2 text-xs">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-slate-300 rounded text-slate-700 font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleAddFeedback}
                className="px-4 py-2 bg-[#1A65E5] hover:bg-[#1451B8] text-white rounded font-bold"
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
