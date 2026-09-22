import React, { useState } from 'react';
import { 
  Building2, 
  ArrowRight, 
  Factory,
  Check,
  Calendar,
  Briefcase,
  FileText,
  User,
  MessageSquare
} from 'lucide-react';
import MaitriLogo from '../components/MaitriLogo';

export default function Landing({ onSelectRole, onSelectScenario, onOpenLegal }) {
  return (
    <div className="min-h-screen bg-[#F0F4F9] flex flex-col justify-between text-slate-800">
      {/* Official Government Strip */}
      <div className="bg-white border-b border-[#DDE3EA] px-6 py-3 flex flex-wrap items-center justify-between gap-4">
        <MaitriLogo />
        <div className="flex items-center gap-3">
          <span className="bg-orange-100 text-orange-800 px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wide border border-orange-200">
            Government of Maharashtra
          </span>
          <span className="text-xs text-slate-500 font-mono">SIH 2026</span>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-6 py-12 flex-1 flex flex-col justify-center w-full">
        {/* Title */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-[#1A65E5] uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-200 inline-block">
            Maharashtra Industrial Investment Facilitation Portal
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Single Window Industrial Clearances & Regulatory Compliance
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed pt-1">
            Official single point of contact for investors and enterprises in Maharashtra. Transparent, time-bound statutory clearances across state departments.
          </p>
        </div>

        {/* Primary Workspaces: 2 Product Surfaces */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 w-full">
          {/* Investor Workspace */}
          <div
            onClick={() => onSelectRole('entrepreneur')}
            className="bg-white rounded-xl border-2 border-slate-200 hover:border-[#1A65E5] p-7 transition-all cursor-pointer flex flex-col justify-between shadow-xs hover:shadow-md group"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1A65E5] flex items-center justify-center border border-blue-200 group-hover:bg-[#1A65E5] group-hover:text-white transition-colors">
                <Factory className="w-6 h-6" />
              </div>
              
              <div>
                <h2 className="text-xl font-bold text-slate-900 group-hover:text-[#1A65E5] transition-colors">
                  Investor & Entrepreneur Workspace
                </h2>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  For industrial founders to apply for clearances, inspect document inconsistencies, track parallel processing, and review statutory feedback.
                </p>
              </div>

              <ul className="space-y-2 pt-2 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-[11px]">✓</span>
                  <span>Interactive Dashboard with Performance Trends & Date Filtering</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-[11px]">✓</span>
                  <span>Parallel clearance roadmap saving 75 working days</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-[11px]">✓</span>
                  <span>Document pre-scrutiny and DigiLocker direct ingestion</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-[#1A65E5]">
                Enter Investor Portal
              </span>
              <div className="w-7 h-7 rounded-md bg-[#1A65E5] text-white flex items-center justify-center">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Government Officer Workspace */}
          <div
            onClick={() => onSelectRole('government')}
            className="bg-white rounded-xl border-2 border-slate-200 hover:border-[#1A65E5] p-7 transition-all cursor-pointer flex flex-col justify-between shadow-xs hover:shadow-md group"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#EA580C] flex items-center justify-center border border-orange-200 group-hover:bg-[#EA580C] group-hover:text-white transition-colors">
                <Building2 className="w-6 h-6" />
              </div>
              
              <div>
                <h2 className="text-xl font-bold text-slate-900 group-hover:text-[#EA580C] transition-colors">
                  Department Scrutiny Console
                </h2>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  For MPCB, DISH, MFES, and MSEDCL officers to review 1,250 applications, resolve bottlenecks, and issue SLA compliance directives.
                </p>
              </div>

              <ul className="space-y-2 pt-2 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-orange-100 text-[#EA580C] font-bold flex items-center justify-center text-[11px]">✓</span>
                  <span>Real-time oversight over 1,250 department applications</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-orange-100 text-[#EA580C] font-bold flex items-center justify-center text-[11px]">✓</span>
                  <span>SLA bottleneck diagnostics and turnaround analytics</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-orange-100 text-[#EA580C] font-bold flex items-center justify-center text-[11px]">✓</span>
                  <span>42 Overdue Cases with direct SLA notice dispatch</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-[#EA580C]">
                Enter Department Console
              </span>
              <div className="w-7 h-7 rounded-md bg-[#EA580C] text-white flex items-center justify-center">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Real Test Presets */}
        <div className="mt-8 bg-white p-5 rounded-xl border border-[#DDE3EA] shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 pb-3 border-b border-slate-100">
            <span className="font-bold text-slate-900 text-xs">Quick Test Scenarios (Maharashtra Industrial Estates)</span>
            <span className="text-slate-500 text-[11px]">Click to launch pre-loaded profile</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3 text-xs">
            <button
              onClick={() => onSelectScenario('food_processing')}
              className="p-3 rounded-lg border border-slate-200 hover:border-[#1A65E5] bg-slate-50 hover:bg-white text-left transition-all"
            >
              <div className="font-bold text-[#1A65E5]">1. ABC Food Processing Pvt Ltd</div>
              <div className="text-[11px] text-slate-600 mt-0.5">Chakan MIDC, Pune • ₹5 Cr, 80 Employees</div>
            </button>

            <button
              onClick={() => onSelectScenario('manufacturing')}
              className="p-3 rounded-lg border border-slate-200 hover:border-[#1A65E5] bg-slate-50 hover:bg-white text-left transition-all"
            >
              <div className="font-bold text-[#1A65E5]">2. Heavy Engineering Works</div>
              <div className="text-[11px] text-slate-600 mt-0.5">Hingna MIDC, Nagpur • ₹20 Cr, 250 Employees</div>
            </button>

            <button
              onClick={() => onSelectScenario('it_ites')}
              className="p-3 rounded-lg border border-slate-200 hover:border-[#1A65E5] bg-slate-50 hover:bg-white text-left transition-all"
            >
              <div className="font-bold text-[#1A65E5]">3. Sahyadri Cloud Systems LLP</div>
              <div className="text-[11px] text-slate-600 mt-0.5">Hinjawadi IT Park, Pune • ₹10 Cr</div>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#DDE3EA] bg-white py-4 px-6 text-xs text-slate-500">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            INDUSTRIA • Industrial Approvals & Regulatory Compliance Single-Window Portal • Government of Maharashtra
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <button
              onClick={() => onOpenLegal?.('terms')}
              className="hover:text-[#1A65E5] hover:underline"
            >
              Terms of Service
            </button>
            <span>|</span>
            <button
              onClick={() => onOpenLegal?.('privacy')}
              className="hover:text-[#1A65E5] hover:underline"
            >
              DPDP & Privacy Policy
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
