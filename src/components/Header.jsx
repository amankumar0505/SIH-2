import React, { useState } from 'react';
import { 
  Building2, 
  HelpCircle, 
  Bell, 
  RefreshCw, 
  ChevronDown,
  Menu,
  X,
  FileCheck,
  ShieldCheck
} from 'lucide-react';
import MaitriLogo from './MaitriLogo';

export default function Header({ 
  currentRole, 
  currentRoute,
  onRoleChange, 
  activeProject, 
  onSelectProject, 
  onNavigate,
  onResetData,
  showToast,
  isMobileMenuOpen,
  onToggleMobileMenu
}) {
  const [showProjectMenu, setShowProjectMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, title: "Factory Department (DISH) Discrepancy", text: "Survey coordinate discrepancy in layout drawing requires re-submission.", time: "10 mins ago", urgent: true },
    { id: 2, title: "MPCB CTE Application Update", text: "Application under Consent Committee review at Pune Regional Office.", time: "2 hours ago", urgent: false },
    { id: 3, title: "FSSAI Licence Renewal Due", text: "Annual renewal window open for FoSCoS licence (Expires 28 Sep 2026).", time: "1 day ago", urgent: false }
  ];

  return (
    <header className="bg-white border-b border-[#E2E8F0] sticky top-0 z-40 shadow-xs">
      <div className="px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileMenu}
            className="md:hidden p-1.5 rounded-lg hover:bg-slate-100 text-slate-700 border border-slate-300 flex items-center justify-center transition-colors"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div 
            onClick={() => onNavigate('landing')}
            className="cursor-pointer hover:opacity-95 transition-opacity"
            title="Maharashtra Single-Window Industrial Portal"
          >
            <MaitriLogo />
          </div>
        </div>

        {/* Center: Top Category Tabs */}
        <div className="hidden lg:flex items-center gap-1.5 text-[13px] font-semibold text-slate-600 bg-slate-100/80 p-1 rounded-xl border border-slate-200">
          <button 
            onClick={() => onNavigate('dashboard')}
            className={`px-4 py-1.5 rounded-lg font-bold transition-all ${
              currentRoute === 'dashboard' 
                ? 'bg-white text-[#1E4E8C] shadow-xs' 
                : 'hover:text-[#1E4E8C]'
            }`}
          >
            Application Metrics
          </button>
          <button 
            onClick={() => onNavigate('applications')}
            className={`px-4 py-1.5 rounded-lg font-bold transition-all ${
              currentRoute === 'applications' 
                ? 'bg-white text-[#1E4E8C] shadow-xs' 
                : 'hover:text-[#1E4E8C]'
            }`}
          >
            Applications Register
          </button>
          <button 
            onClick={() => onNavigate('required-approvals')}
            className={`px-4 py-1.5 rounded-lg font-bold transition-all ${
              currentRoute === 'required-approvals' 
                ? 'bg-white text-[#1E4E8C] shadow-xs' 
                : 'hover:text-[#1E4E8C]'
            }`}
          >
            Clearance Matrix
          </button>
          <button 
            onClick={() => onNavigate('gov-dashboard')}
            className={`px-4 py-1.5 rounded-lg font-bold transition-all ${
              currentRoute === 'gov-dashboard' || currentRoute === 'gov-applications' || currentRoute === 'gov-delayed'
                ? 'bg-white text-[#1E4E8C] shadow-xs' 
                : 'hover:text-[#1E4E8C]'
            }`}
          >
            Department SLA
          </button>
        </div>

        {/* Right Side: Scenario & Role Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Project Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowProjectMenu(!showProjectMenu)}
              className="bg-slate-50 hover:bg-slate-100 border border-slate-300 text-slate-800 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors shadow-2xs"
              title="Change Test Enterprise"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="truncate max-w-[140px] sm:max-w-[190px]">
                {activeProject?.name || "ABC Food Processing"}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {showProjectMenu && (
              <div className="absolute right-0 mt-2 w-80 bg-white text-slate-900 rounded-xl shadow-xl border border-slate-200 py-1.5 z-50">
                <div className="px-3.5 py-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100 bg-slate-50/50">
                  Select Enterprise Scenario
                </div>
                <button
                  onClick={() => {
                    onSelectProject('food_processing');
                    setShowProjectMenu(false);
                    showToast?.("Loaded: ABC Food Processing (Pune)", "info");
                  }}
                  className="w-full text-left px-3.5 py-2.5 text-xs hover:bg-slate-50 flex flex-col transition-colors"
                >
                  <span className="font-bold text-[#1E4E8C] text-[13px]">1. ABC Food Processing Pvt Ltd</span>
                  <span className="text-[11.5px] text-slate-600 mt-0.5">Chakan MIDC, Pune • ₹5 Cr (Orange Category)</span>
                </button>
                <button
                  onClick={() => {
                    onSelectProject('manufacturing');
                    setShowProjectMenu(false);
                    showToast?.("Loaded: Heavy Engineering (Nagpur)", "info");
                  }}
                  className="w-full text-left px-3.5 py-2.5 text-xs hover:bg-slate-50 flex flex-col border-t border-slate-100 transition-colors"
                >
                  <span className="font-bold text-[#1E4E8C] text-[13px]">2. Heavy Engineering Works</span>
                  <span className="text-[11.5px] text-slate-600 mt-0.5">Nagpur MIDC • ₹20 Cr (Red Category)</span>
                </button>
                <button
                  onClick={() => {
                    onSelectProject('it_ites');
                    setShowProjectMenu(false);
                    showToast?.("Loaded: Sahyadri IT Park (Pune)", "info");
                  }}
                  className="w-full text-left px-3.5 py-2.5 text-xs hover:bg-slate-50 flex flex-col border-t border-slate-100 transition-colors"
                >
                  <span className="font-bold text-[#1E4E8C] text-[13px]">3. Sahyadri Cloud Systems LLP</span>
                  <span className="text-[11.5px] text-slate-600 mt-0.5">Hinjawadi, Pune • White Category</span>
                </button>
              </div>
            )}
          </div>

          {/* Role Switcher */}
          <div className="bg-slate-100 p-1 rounded-lg border border-slate-200 flex items-center text-xs">
            <button
              onClick={() => {
                onRoleChange('entrepreneur');
                showToast?.("Switched to Investor Workspace", "info");
              }}
              className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                currentRole === 'entrepreneur'
                  ? 'bg-[#1E4E8C] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Investor
            </button>
            <button
              onClick={() => {
                onRoleChange('government');
                showToast?.("Switched to Officer Console", "info");
              }}
              className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                currentRole === 'government'
                  ? 'bg-[#1E4E8C] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Officer
            </button>
          </div>

          {/* Reset Demo Data */}
          <button
            onClick={() => {
              onResetData?.();
              showToast?.("Mock data restored to initial state", "info");
            }}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors border border-transparent hover:border-slate-200"
            title="Reset Mock Data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
