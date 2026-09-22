import React, { useState } from 'react';
import { 
  Building2, 
  HelpCircle, 
  Bell, 
  ChevronDown, 
  Search, 
  PhoneCall, 
  Menu, 
  X,
  LayoutGrid,
  CheckCircle2
} from 'lucide-react';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleTabClick = (routeId) => {
    onNavigate(routeId);
    setOpenDropdown(null);
  };

  const toggleDropdown = (name) => {
    setOpenDropdown(prev => prev === name ? null : name);
  };

  const initials = activeProject?.name
    ? activeProject.name
        .split(' ')
        .slice(0, 2)
        .map(w => w[0])
        .join('')
        .toUpperCase()
    : 'SC';

  const panNumber = activeProject?.id === 'PROJ-MH-2026-0312'
    ? 'AABCS4902K'
    : activeProject?.id === 'PROJ-MH-2026-1109'
    ? 'AAACB1109M'
    : 'AAACA8821F';

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    onNavigate('required-approvals');
    showToast?.(`Filtering approvals & acts for "${searchQuery}"`, 'info');
  };

  return (
    <header className="bg-white border-b border-[#DDE3EA] sticky top-0 z-40 shadow-xs select-none">
      {/* 1. TOP UTILITY STRIP (Dark Navy: #07172C) */}
      <div className="bg-[#07172C] text-slate-300 text-[11px] sm:text-[12px] px-3 sm:px-6 py-1.5 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800">
        <div className="flex items-center gap-2 truncate">
          <span className="text-amber-400 font-bold tracking-wide">महाराष्ट्र शासन</span>
          <span className="text-slate-600">|</span>
          <span className="font-semibold text-slate-200 truncate">Government of Maharashtra</span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="text-slate-300 hidden md:inline truncate">Department of Industries</span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 text-slate-300 font-medium ml-auto">
          {/* Text size accessibility pill */}
          <div className="hidden sm:flex items-center gap-1.5 bg-[#0D223F] border border-blue-900/60 px-2 py-0.5 rounded text-[11px]">
            <span className="text-slate-400 text-[10px]">Text:</span>
            <button className="hover:text-white px-0.5">A-</button>
            <button className="text-white font-bold px-0.5">A</button>
            <button className="hover:text-white px-0.5">A+</button>
          </div>

          <span className="text-slate-700 hidden sm:inline">|</span>

          {/* Screen reader option */}
          <button className="hidden sm:flex items-center gap-1 hover:text-white transition-colors text-[11px]">
            <span>Screen Reader</span>
          </button>

          <span className="text-slate-700 hidden sm:inline">|</span>

          {/* Language Toggle */}
          <div className="flex items-center gap-1 text-[11px]">
            <button className="text-white font-bold underline">English</button>
            <span>/</span>
            <button className="text-slate-300 hover:text-white">मराठी</button>
          </div>

          <span className="text-slate-700 hidden xs:inline">|</span>

          {/* Contact / Help */}
          <div className="hidden xs:flex items-center gap-3 text-[11px]">
            <button 
              onClick={() => onNavigate('assistant')}
              className="hover:text-white transition-colors"
            >
              Help
            </button>
            <button 
              onClick={() => onNavigate('renewals')}
              className="hover:text-white transition-colors"
            >
              Contact
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN LOGO, ROLE & PROFILE BANNER */}
      <div className="bg-white px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3 sm:gap-6 border-b border-slate-100">
        {/* Left: Emblem + Brand Identity */}
        <div className="flex items-center gap-2 sm:gap-3.5">
          {/* Mobile hamburger menu toggle */}
          <button
            onClick={onToggleMobileMenu}
            className="md:hidden p-1.5 rounded-md hover:bg-slate-100 text-slate-700 border border-slate-300 flex items-center justify-center transition-colors"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>

          {/* Authentic Bank/Gov Style Emblem Circle */}
          <div 
            onClick={() => onNavigate('landing')} 
            className="cursor-pointer flex items-center gap-3 group"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#081F38] border-2 border-[#1E4E8C] flex items-center justify-center text-amber-400 shrink-0 shadow-xs">
              {/* Classical Government Pillars Emblem */}
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                <path d="M12 2L2 7V9H22V7L12 2ZM4 11V18H7V11H4ZM10 11V18H14V11H10ZM17 11V18H20V11H17ZM2 20V22H22V20H2Z" />
              </svg>
            </div>

            <div className="leading-tight">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                  महाराष्ट्र शासन • GOVERNMENT OF MAHARASHTRA
                </span>
                <span className="text-[9.5px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 border border-amber-300 font-mono">
                  SINGLE WINDOW 2.0
                </span>
              </div>

              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="font-extrabold text-xl sm:text-2xl text-[#081F38] tracking-tight font-sans">
                  MAITRI<span className="text-amber-500">+</span>
                </span>
                <span className="text-xs sm:text-[13px] font-semibold text-slate-700 hidden sm:inline">
                  Maharashtra Industry, Trade & Investment Facilitation Cell
                </span>
              </div>

              <p className="text-[10.5px] text-slate-500 hidden md:block">
                Under Maharashtra Right to Public Services Act (RTS 2015)
              </p>
            </div>
          </div>
        </div>
        {/* Center: Search input in the top header */}
        <div className="flex-1 max-w-md mx-2 sm:mx-4 hidden md:block">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search approvals, acts, NOCs..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 hover:bg-white border border-slate-300 rounded-lg text-xs placeholder:text-slate-400 focus:outline-none focus:border-[#1E4E8C] focus:bg-white shadow-2xs transition-colors"
            />
          </form>
        </div>

        {/* Right: Role Switcher Pill, Notifications, Help Desk & Entity Profile */}
        <div className="flex items-center gap-2 sm:gap-3.5 shrink-0">
          {/* Role Toggle Pill (Entrepreneur / Desk Officer) */}
          <div className="bg-[#EDF2F7] p-0.5 rounded-md border border-slate-300 flex items-center text-xs">
            <button
              onClick={() => {
                onRoleChange('entrepreneur');
                showToast?.("Switched to Entrepreneur Workspace", "info");
              }}
              className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                currentRole === 'entrepreneur'
                  ? 'bg-[#081F38] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Entrepreneur
            </button>
            <button
              onClick={() => {
                onRoleChange('government');
                showToast?.("Switched to Desk Officer Workspace", "info");
              }}
              className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                currentRole === 'government'
                  ? 'bg-[#081F38] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Desk Officer
            </button>
          </div>

          {/* Notifications Bell with Counter (matches screenshot pill) */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="w-8 h-8 rounded-md bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 flex items-center justify-center relative transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4 text-slate-600" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#E11D48] text-white text-[10px] font-bold flex items-center justify-center border-2 border-white shadow-xs">
                1
              </span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white text-slate-900 rounded-lg shadow-xl border border-slate-300 py-1.5 z-50">
                <div className="px-4 py-2 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                  <span className="font-bold text-xs text-[#081F38]">Portal Alerts</span>
                  <span className="text-[11px] bg-red-100 text-red-800 border border-red-200 px-1.5 py-0.2 rounded font-semibold">1 Action Required</span>
                </div>
                <div className="p-3 text-xs hover:bg-slate-50">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                    Factory Department (DISH) Discrepancy
                  </div>
                  <p className="text-slate-600 mt-1 leading-relaxed">
                    Survey coordinate inconsistency detected in layout drawing against registered lease deed.
                  </p>
                  <span className="text-[10.5px] text-slate-400 mt-1 block">10 mins ago</span>
                </div>
              </div>
            )}
          </div>

          {/* Help Desk Button with Headset Icon */}
          <button
            onClick={() => onNavigate('assistant')}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 text-amber-600" />
            <span>Help Desk</span>
          </button>

          {/* Entity Profile Avatar & Details Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProjectMenu(!showProjectMenu)}
              className="flex items-center gap-2.5 p-1 sm:px-2 sm:py-1 rounded-md hover:bg-slate-50 border border-transparent hover:border-slate-300 transition-colors text-left"
              title="Select Enterprise Scenario"
            >
              <div className="w-8 h-8 rounded-full bg-[#081F38] text-amber-400 font-bold flex items-center justify-center text-xs shrink-0 border border-slate-700">
                {initials}
              </div>

              <div className="hidden xl:block leading-tight max-w-[170px]">
                <div className="font-bold text-slate-900 text-xs truncate">
                  {activeProject?.name || "Sahyadri Cloud Systems LLP"}
                </div>
                <div className="text-[10.5px] text-slate-500 font-mono truncate">
                  PAN: {panNumber} • {activeProject?.location?.district || "Pune"}
                </div>
              </div>

              <ChevronDown className="w-3 h-3 text-slate-400 hidden xl:block" />
            </button>

            {showProjectMenu && (
              <div className="absolute right-0 mt-2 w-80 bg-white text-slate-900 rounded-lg shadow-xl border border-slate-300 py-1 z-50">
                <div className="px-3.5 py-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100 bg-slate-50">
                  Switch Industrial Project
                </div>
                <button
                  onClick={() => {
                    onSelectProject('it_ites');
                    setShowProjectMenu(false);
                    showToast?.("Loaded: Sahyadri Cloud Systems LLP (Pune)", "info");
                  }}
                  className="w-full text-left px-3.5 py-2.5 text-xs hover:bg-slate-50 flex flex-col transition-colors"
                >
                  <span className="font-bold text-[#081F38] text-[13px]">1. Sahyadri Cloud Systems LLP (Default)</span>
                  <span className="text-[11.5px] text-slate-600 mt-0.5">PAN: AABCS4902K • Hinjawadi IT Park, Pune</span>
                </button>
                <button
                  onClick={() => {
                    onSelectProject('food_processing');
                    setShowProjectMenu(false);
                    showToast?.("Loaded: ABC Food Processing Pvt Ltd (Pune)", "info");
                  }}
                  className="w-full text-left px-3.5 py-2.5 text-xs hover:bg-slate-50 flex flex-col border-t border-slate-100 transition-colors"
                >
                  <span className="font-bold text-[#081F38] text-[13px]">2. ABC Food Processing Pvt Ltd</span>
                  <span className="text-[11.5px] text-slate-600 mt-0.5">PAN: AAACA8821F • Chakan MIDC, Pune (₹5 Cr)</span>
                </button>
                <button
                  onClick={() => {
                    onSelectProject('manufacturing');
                    setShowProjectMenu(false);
                    showToast?.("Loaded: Bharat Precision Engineering (Nagpur)", "info");
                  }}
                  className="w-full text-left px-3.5 py-2.5 text-xs hover:bg-slate-50 flex flex-col border-t border-slate-100 transition-colors"
                >
                  <span className="font-bold text-[#081F38] text-[13px]">3. Bharat Precision Engineering Works</span>
                  <span className="text-[11.5px] text-slate-600 mt-0.5">PAN: AAACB1109M • Hingna MIDC, Nagpur (₹20 Cr)</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search bar row (below md screens) */}
      <div className="md:hidden px-3 py-2 bg-slate-50 border-b border-slate-200">
        <form onSubmit={handleSearchSubmit} className="relative w-full">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search approvals, acts, NOCs..."
            className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs placeholder:text-slate-400 focus:outline-none focus:border-[#1E4E8C]"
          />
        </form>
      </div>
    </header>
  );
}
