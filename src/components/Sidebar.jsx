import React from 'react';
import {
  LayoutDashboard,
  Sparkles,
  HelpCircle,
  FileCheck,
  Calculator,
  Search,
  MessageSquare,
  CheckSquare,
  ShieldCheck,
  Building,
  Files,
  Clock,
  GitBranch,
  X,
  ChevronRight
} from 'lucide-react';

export default function Sidebar({ 
  currentRole, 
  currentRoute, 
  onNavigate, 
  activeProject,
  isMobileMenuOpen,
  onCloseMobileMenu
}) {
  // Balanced professional navigation tailored to current role
  const entrepreneurSections = [
    {
      title: "Core Portal",
      items: [
        { id: "dashboard", label: "Dashboard Overview", icon: LayoutDashboard },
        { id: "onboarding", label: "Investor Wizard", icon: Sparkles },
      ]
    },
    {
      title: "Clearance Pipeline",
      items: [
        { id: "required-approvals", label: "Clearance Matrix", icon: FileCheck, badge: "9 Active" },
        { id: "roadmap", label: "Approval Roadmap", icon: GitBranch, pill: "53% Faster" },
        { id: "documents", label: "Document Verification", icon: Files, alert: true },
        { id: "incentives", label: "Incentive Calculator", icon: Calculator },
      ]
    },
    {
      title: "Monitoring & Redressal",
      items: [
        { id: "applications", label: "Applications Tracker", icon: MessageSquare },
        { id: "renewals", label: "Feedback & Grievances", icon: CheckSquare },
        { id: "assistant", label: "Statutory Assistant", icon: Search },
      ]
    }
  ];

  const governmentSections = [
    {
      title: "Oversight Desk",
      items: [
        { id: "gov-dashboard", label: "State SLA Dashboard", icon: LayoutDashboard },
        { id: "gov-applications", label: "Application Matrix", icon: Files, badge: "All State" },
      ]
    },
    {
      title: "Enforcement & SLA",
      items: [
        { id: "gov-delayed", label: "Overdue Cases", icon: Clock, alert: true, badge: "42 Cases" },
        { id: "gov-analytics", label: "Throughput Analytics", icon: GitBranch },
        { id: "gov-rules", label: "Statutory Policy Rules", icon: FileCheck },
      ]
    },
    {
      title: "System & Architecture",
      items: [
        { id: "architecture", label: "DPDP & Architecture", icon: ShieldCheck },
      ]
    }
  ];

  const navSections = currentRole === 'government' ? governmentSections : entrepreneurSections;

  const handleNavClick = (routeId) => {
    onNavigate(routeId);
    onCloseMobileMenu?.();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div 
          onClick={onCloseMobileMenu}
          className="md:hidden fixed inset-0 bg-slate-900/40 z-30 backdrop-blur-xs"
          aria-hidden="true"
        />
      )}

      {/* Modern Maharashtra Left Sidebar (Persistent Desktop, Drawer on Mobile) */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-30
        w-64 shrink-0 min-h-screen md:min-h-full
        bg-white border-r border-[#E2E8F0]
        flex flex-col justify-between
        transition-transform duration-200 ease-out
        ${isMobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Mobile Header Inside Drawer */}
        <div className="md:hidden p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <span className="font-bold text-sm text-[#0F2942]">Single-Window Portal</span>
          <button
            onClick={onCloseMobileMenu}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Grouped Nav Items */}
        <div className="p-3.5 space-y-5 flex-1">
          {navSections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-1.5">
              <div className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                {section.title}
              </div>

              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentRoute === item.id || (item.id === 'dashboard' && currentRoute === 'gov-dashboard');

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`
                        w-full text-left px-3 py-2.5 rounded-lg text-[13.5px] font-semibold flex items-center justify-between transition-all group
                        ${isActive 
                          ? 'bg-[#1E4E8C] text-white shadow-sm' 
                          : 'text-slate-700 hover:bg-slate-50 hover:text-[#1E4E8C]'
                        }
                      `}
                    >
                      <div className="flex items-center gap-3 truncate">
                        <Icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-amber-300' : 'text-slate-500 group-hover:text-[#1E4E8C]'}`} />
                        <span className="truncate">{item.label}</span>
                      </div>

                      {item.badge && (
                        <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                          {item.badge}
                        </span>
                      )}

                      {item.pill && (
                        <span className={`text-[10.5px] font-bold px-1.5 py-0.2 rounded ${isActive ? 'bg-emerald-500/30 text-emerald-100 border border-emerald-400/40' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}`}>
                          {item.pill}
                        </span>
                      )}

                      {item.alert && (
                        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Footer Info */}
        <div className="p-3.5 m-3 rounded-xl border border-slate-200 bg-slate-50/80 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] text-slate-500 font-bold uppercase tracking-wider">Active Enterprise</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </div>
          <div className="font-bold text-slate-900 truncate text-[13px] mt-1">
            {activeProject?.name || "ABC Food Processing"}
          </div>
          <div className="text-[11.5px] text-slate-500 mt-0.5">
            {activeProject?.location?.district || "Pune"} MIDC • ₹5 Cr
          </div>
        </div>
      </aside>
    </>
  );
}
