import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Toast from './components/Toast';
import ApprovalDrawer from './components/ApprovalDrawer';
import VerificationPanel from './components/VerificationPanel';
import ApplicationTimeline from './components/ApplicationTimeline';
import DigiLockerModal from './components/DigiLockerModal';
import LegalModal from './components/LegalModal';

// Pages
import Landing from './pages/Landing';
import EntrepreneurDashboard from './pages/entrepreneur/EntrepreneurDashboard';
import Onboarding from './pages/entrepreneur/Onboarding';
import RequiredApprovals from './pages/entrepreneur/RequiredApprovals';
import RecommendationEngine from './pages/entrepreneur/RecommendationEngine';
import ApprovalRoadmap from './pages/entrepreneur/ApprovalRoadmap';
import Documents from './pages/entrepreneur/Documents';
import Applications from './pages/entrepreneur/Applications';
import Renewals from './pages/entrepreneur/Renewals';
import ComplianceCalendar from './pages/entrepreneur/ComplianceCalendar';
import Incentives from './pages/entrepreneur/Incentives';
import ApprovalAssistant from './pages/entrepreneur/ApprovalAssistant';

import GovernmentDashboard from './pages/government/GovernmentDashboard';
import DepartmentApplications from './pages/government/DepartmentApplications';
import DelayedCases from './pages/government/DelayedCases';
import Analytics from './pages/government/Analytics';
import Rules from './pages/government/Rules';
import Architecture from './pages/government/Architecture';

// Datasets & Services
import { demoProjects } from './data/projects';
import { initialDocuments } from './data/documents';
import { initialApplications } from './data/applications';
import { renewalsDatabase } from './data/renewals';
import { getRequiredApprovals } from './services/approvalEngine';
import { simulateUploadVerification } from './services/documentVerification';

export default function App() {
  // Navigation State
  const [currentRole, setCurrentRole] = useState('entrepreneur'); // 'landing', 'entrepreneur', 'government'
  const [currentRoute, setCurrentRoute] = useState('dashboard');
  const [isLandingVisible, setIsLandingVisible] = useState(false); // Can open landing if clicked brand

  // Active Project State
  const [activeProject, setActiveProject] = useState(demoProjects.food_processing);

  // Dynamic Datasets State
  const [approvalsState, setApprovalsState] = useState(() => getRequiredApprovals(demoProjects.food_processing).approvals);
  const [documentsState, setDocumentsState] = useState(initialDocuments);
  const [applicationsState, setApplicationsState] = useState(initialApplications);
  const [renewalsState, setRenewalsState] = useState(renewalsDatabase);
  const [documentsFixed, setDocumentsFixed] = useState(false);

  // Modal / Drawer Selection States
  const [selectedApproval, setSelectedApproval] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isDigiLockerOpen, setIsDigiLockerOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState('terms');

  // Toast Notification State
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  // Switch Scenario Handler
  const handleSelectProject = (projectKey) => {
    const project = demoProjects[projectKey] || demoProjects.food_processing;
    setActiveProject(project);
    const result = getRequiredApprovals(project);
    setApprovalsState(result.approvals);
    setDocumentsFixed(false);
  };

  // Reset Demo State Handler
  const handleResetData = () => {
    setActiveProject(demoProjects.food_processing);
    const result = getRequiredApprovals(demoProjects.food_processing);
    setApprovalsState(result.approvals);
    setDocumentsState(initialDocuments);
    setApplicationsState(initialApplications);
    setRenewalsState(renewalsDatabase);
    setDocumentsFixed(false);
    setSelectedApproval(null);
    setSelectedDocument(null);
    setSelectedApplication(null);
    setIsDigiLockerOpen(false);
  };

  // Document Issue Resolution Handler
  const handleResolveDocumentMismatch = (docId) => {
    setDocumentsState(prev => prev.map(d => {
      if (d.id === docId || d.fileName === 'Building_Plan.pdf') {
        return {
          ...d,
          status: 'Valid',
          validations: d.validations.map(v => ({
            ...v,
            status: 'PASS',
            message: v.field.includes('Survey')
              ? '✓ Rectified: Survey 123/4B matches registered lease deed coordinates.'
              : v.field.includes('Company')
              ? '✓ Exact match with registered corporate title'
              : v.message
          }))
        };
      }
      return d;
    }));

    setApprovalsState(prev => prev.map(a => {
      if (a.id === 'app-factory-licence') {
        return {
          ...a,
          status: 'Under Review',
          documents: a.documents.map(d => d.name.includes('Factory Master Plan') ? { ...d, valid: true, note: null } : d)
        };
      }
      return a;
    }));

    setApplicationsState(prev => prev.map(a => {
      if (a.id === 'APP-MH-2026-0518') {
        return {
          ...a,
          status: 'UNDER REVIEW',
          stage: 'Revised Drawing Scrutiny in Progress',
          nextActionText: 'Safety Inspector Site Audit being scheduled'
        };
      }
      return a;
    }));

    setDocumentsFixed(true);
    showToast("Discrepancy Rectified! Revised drawing uploaded. Next Action resolved on dashboard.", "success");
  };

  // Handle Simulated Upload of New Files
  const handleUploadSimulatedFile = (fileObj) => {
    const verified = simulateUploadVerification(fileObj);
    setDocumentsState(prev => [verified, ...prev]);
  };

  // Handle Ingestion of DigiLocker Documents
  const handleDigiLockerFetch = (fetchedDocs) => {
    const formattedDocs = fetchedDocs.map(item => ({
      id: item.id || `doc-${Date.now()}`,
      fileName: item.fileName,
      documentType: item.docType || item.title,
      category: item.category || 'Corporate',
      source: 'DigiLocker',
      issuer: item.issuer,
      issuerCode: item.docCode,
      uploadDate: '11 Sep 2026',
      size: item.size || '650 KB',
      status: 'Valid',
      sha256Hash: item.sha256 || 'e7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8',
      digitalSignature: {
        status: 'VALID',
        algorithm: 'SHA256withRSA (2048-bit)',
        certIssuer: item.certIssuer || 'Government Sub-CA Certificate',
        validUntil: '31 Dec 2028',
        timestamp: '11 Sep 2026 21:50:00 IST'
      },
      piiProtection: {
        dpdpCompliant: true,
        maskedAadhaar: 'XXXX-XXXX-8821',
        maskedPan: 'AAACA****F',
        dataMinimization: 'Statutory Verification Only'
      },
      consentId: 'DEPA-CONSENT-2026-MH-9941',
      extractedData: item.extractedData || {},
      validations: [
        { field: 'DigiLocker X.509 PKI Signature', status: 'PASS', message: `Cryptographically verified with ${item.issuer} public certificate` },
        { field: 'Corporate Title Match', status: 'PASS', message: 'Matches registered entity name: ABC Food Processing Private Limited' },
        { field: 'DPDP Act 2023 Compliance', status: 'PASS', message: 'PII tokens masked. Consent logged on immutable audit ledger.' }
      ]
    }));

    // Merge without duplicating existing fileNames
    setDocumentsState(prev => {
      const existingNames = new Set(prev.map(p => p.fileName));
      const newItems = formattedDocs.filter(f => !existingNames.has(f.fileName));
      return [...newItems, ...prev];
    });
  };

  // Navigation Handler
  const handleNavigate = (routeId) => {
    if (routeId === 'landing') {
      setIsLandingVisible(true);
      return;
    }
    setIsLandingVisible(false);
    
    // Automatically switch role if navigating across workspace domains
    if (routeId.startsWith('gov-')) {
      setCurrentRole('government');
    } else if (currentRole === 'government' && !routeId.startsWith('gov-') && routeId !== 'architecture') {
      setCurrentRole('entrepreneur');
    }

    setCurrentRoute(routeId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Role Switcher Handler
  const handleRoleChange = (role) => {
    setCurrentRole(role);
    setIsLandingVisible(false);
    if (role === 'entrepreneur') {
      setCurrentRoute('dashboard');
    } else {
      setCurrentRoute('gov-dashboard');
    }
  };

  // Landing Page Scenario Selection
  const handleLandingScenario = (scenarioKey) => {
    handleSelectProject(scenarioKey);
    setCurrentRole('entrepreneur');
    setCurrentRoute('dashboard');
    setIsLandingVisible(false);
    showToast(`Loaded ${demoProjects[scenarioKey].name}`, "info");
  };

  const handleOpenLegal = (type) => {
    setLegalModalType(type);
    setLegalModalOpen(true);
  };

  if (isLandingVisible) {
    return (
      <>
        <Landing
          onSelectRole={(role) => handleRoleChange(role)}
          onSelectScenario={(sc) => handleLandingScenario(sc)}
          onOpenLegal={handleOpenLegal}
        />
        <LegalModal
          isOpen={legalModalOpen}
          onClose={() => setLegalModalOpen(false)}
          documentType={legalModalType}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex flex-col font-sans text-[#1D1D1F] selection:bg-[#003366] selection:text-white">
      {/* Global Portal Header */}
      <Header
        currentRole={currentRole}
        currentRoute={currentRoute}
        onRoleChange={handleRoleChange}
        activeProject={activeProject}
        onSelectProject={(key) => handleSelectProject(key)}
        onNavigate={handleNavigate}
        onResetData={handleResetData}
        showToast={showToast}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      {/* Main Workspace Layout */}
      <div className="flex-1 flex max-w-[1920px] w-full mx-auto">
        {/* Left Sidebar Navigation */}
        <Sidebar
          currentRole={currentRole}
          currentRoute={currentRoute}
          onNavigate={handleNavigate}
          activeProject={activeProject}
          isMobileMenuOpen={isMobileMenuOpen}
          onCloseMobileMenu={() => setIsMobileMenuOpen(false)}
        />

        {/* Dynamic Page Content with Generous Enterprise Padding */}
        <main className="flex-1 p-6 sm:p-7 md:p-8 lg:p-9 overflow-x-hidden min-w-0">
          {/* ENTREPRENEUR ROUTES */}
          {currentRole === 'entrepreneur' && (
            <>
              {currentRoute === 'dashboard' && (
                <EntrepreneurDashboard
                  project={activeProject}
                  approvals={approvalsState}
                  onSelectApproval={(app) => setSelectedApproval(app)}
                  onNavigate={handleNavigate}
                  onOpenDocumentMismatch={() => {
                    const buildingDoc = documentsState.find(d => d.fileName === 'Building_Plan.pdf');
                    setSelectedDocument(buildingDoc || documentsState[3]);
                  }}
                  documentsFixed={documentsFixed}
                />
              )}

              {currentRoute === 'onboarding' && (
                <Onboarding
                  project={activeProject}
                  onSaveProject={(upd) => setActiveProject(upd)}
                  onGeneratePlan={(upd) => {
                    const result = getRequiredApprovals(upd);
                    setApprovalsState(result.approvals);
                    handleNavigate('required-approvals');
                  }}
                  showToast={showToast}
                />
              )}

              {currentRoute === 'required-approvals' && (
                <RequiredApprovals
                  project={activeProject}
                  approvals={approvalsState}
                  onSelectApproval={(app) => setSelectedApproval(app)}
                  onNavigate={handleNavigate}
                />
              )}

              {currentRoute === 'engine' && (
                <RecommendationEngine
                  project={activeProject}
                  onNavigate={handleNavigate}
                />
              )}

              {currentRoute === 'roadmap' && (
                <ApprovalRoadmap
                  project={activeProject}
                  onSelectApprovalById={(id) => {
                    const found = approvalsState.find(a => a.id === id);
                    if (found) setSelectedApproval(found);
                  }}
                  onNavigate={handleNavigate}
                />
              )}

              {currentRoute === 'documents' && (
                <Documents
                  project={activeProject}
                  documents={documentsState}
                  onSelectDocument={(doc) => setSelectedDocument(doc)}
                  onUploadSimulatedFile={handleUploadSimulatedFile}
                  onOpenDigiLocker={() => setIsDigiLockerOpen(true)}
                  showToast={showToast}
                />
              )}

              {currentRoute === 'applications' && (
                <Applications
                  project={activeProject}
                  applications={applicationsState}
                  onSelectApplication={(app) => setSelectedApplication(app)}
                />
              )}

              {currentRoute === 'renewals' && (
                <Renewals
                  project={activeProject}
                  renewals={renewalsState}
                  onNavigate={handleNavigate}
                  showToast={showToast}
                />
              )}

              {currentRoute === 'calendar' && (
                <ComplianceCalendar
                  project={activeProject}
                  onNavigate={handleNavigate}
                />
              )}

              {currentRoute === 'incentives' && (
                <Incentives
                  project={activeProject}
                  onNavigate={handleNavigate}
                  showToast={showToast}
                />
              )}

              {currentRoute === 'assistant' && (
                <ApprovalAssistant
                  project={activeProject}
                  onNavigate={handleNavigate}
                  onFixDocumentIssue={() => {
                    const doc = documentsState.find(d => d.fileName === 'Building_Plan.pdf');
                    setSelectedDocument(doc);
                  }}
                />
              )}

              {currentRoute === 'architecture' && (
                <Architecture />
              )}
            </>
          )}

          {/* GOVERNMENT OFFICER ROUTES */}
          {currentRole === 'government' && (
            <>
              {currentRoute === 'gov-dashboard' && (
                <GovernmentDashboard
                  onNavigate={handleNavigate}
                  onSelectCase={(c) => {
                    handleNavigate('gov-applications');
                  }}
                  showToast={showToast}
                />
              )}

              {currentRoute === 'gov-applications' && (
                <DepartmentApplications
                  onSelectCase={(c) => {}}
                  showToast={showToast}
                />
              )}

              {currentRoute === 'gov-delayed' && (
                <DelayedCases
                  onSelectCase={(c) => {
                    handleNavigate('gov-applications');
                  }}
                  showToast={showToast}
                />
              )}

              {currentRoute === 'gov-analytics' && (
                <Analytics />
              )}

              {currentRoute === 'gov-rules' && (
                <Rules showToast={showToast} />
              )}

              {currentRoute === 'architecture' && (
                <Architecture />
              )}
            </>
          )}
        </main>
      </div>

      {/* Global Modals / Drawers */}
      <ApprovalDrawer
        approval={selectedApproval}
        isOpen={Boolean(selectedApproval)}
        onClose={() => setSelectedApproval(null)}
        onActionClick={(app) => {
          if (app.status === 'Action Required') {
            const doc = documentsState.find(d => d.fileName === 'Building_Plan.pdf');
            setSelectedDocument(doc);
          } else {
            handleNavigate('applications');
          }
        }}
      />

      <VerificationPanel
        document={selectedDocument}
        isOpen={Boolean(selectedDocument)}
        onClose={() => setSelectedDocument(null)}
        onResolveIssue={handleResolveDocumentMismatch}
        project={activeProject}
      />

      <DigiLockerModal
        isOpen={isDigiLockerOpen}
        onClose={() => setIsDigiLockerOpen(false)}
        onFetchSuccess={handleDigiLockerFetch}
        showToast={showToast}
      />

      <ApplicationTimeline
        application={selectedApplication}
        isOpen={Boolean(selectedApplication)}
        onClose={() => setSelectedApplication(null)}
      />

      <LegalModal
        isOpen={legalModalOpen}
        onClose={() => setLegalModalOpen(false)}
        documentType={legalModalType}
      />

      {/* Global Footer */}
      <footer className="border-t border-[#D2D2D7] bg-white py-3 px-6 text-xs text-[#6E6E73] mt-auto">
        <div className="max-w-[1920px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            INDUSTRIA • Government of Maharashtra Single Window Portal • Prototype Environment (SIH 2026)
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => handleOpenLegal('terms')}
              className="hover:text-[#1D1D1F] hover:underline"
            >
              Terms of Service
            </button>
            <span className="text-[#D2D2D7]">|</span>
            <button 
              onClick={() => handleOpenLegal('privacy')}
              className="hover:text-[#1D1D1F] hover:underline"
            >
              Privacy & DPDP Policy
            </button>
          </div>
        </div>
      </footer>

      {/* Toast Notification Container */}
      <Toast
        message={toast?.message}
        type={toast?.type}
        onClose={() => setToast(null)}
      />
    </div>
  );
}
