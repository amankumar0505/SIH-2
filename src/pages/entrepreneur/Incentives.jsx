import React, { useState } from 'react';
import { 
  Gift, 
  CheckCircle2, 
  Building, 
  FileText, 
  IndianRupee, 
  AlertCircle,
  Sparkles,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import ProjectSummaryStrip from '../../components/ProjectSummaryStrip';

export default function Incentives({ project, onNavigate, showToast }) {
  const [appliedSchemes, setAppliedSchemes] = useState({});
  const [isApplyingId, setIsApplyingId] = useState(null);

  const schemes = [
    {
      id: "inc-psi-2019",
      name: "Maharashtra Package Scheme of Incentives (PSI 2019)",
      department: "Directorate of Industries, Government of Maharashtra",
      category: "State Industrial Policy",
      eligibilityStatus: "Potentially Eligible",
      estimatedBenefit: "₹1.80 Cr – ₹2.50 Cr over 7 years",
      eligibilityBasis: "New MSME Food Processing unit located in Chakan MIDC (Zone 'C' classification) with capital outlay > ₹1 Cr.",
      keyBenefits: [
        "40% – 50% Capital Subsidy on eligible plant & machinery investments",
        "100% SGST Reimbursement on eligible intra-state sales for 7 years",
        "5% Interest Subvention on term loans for 5 years",
        "Exemption from Electricity Duty for 7 years"
      ],
      requiredDocs: [
        { name: "Detailed Project Report (DPR)", source: "Chartered Engineer CE-ENG", autoFilled: true },
        { name: "MIDC Land Allotment Deed", source: "DigiLocker Mahabhumi", autoFilled: true },
        { name: "Company PAN Card", source: "DigiLocker ITD", autoFilled: true },
        { name: "Bank Term Loan Sanction Letter", source: "Direct Upload", autoFilled: false }
      ],
      applicationStatus: "Eligible / Window Active"
    },
    {
      id: "inc-pmksy",
      name: "PM Formalisation of Micro Food Processing Enterprises (PMFME) & PMKSY",
      department: "Ministry of Food Processing Industries (MoFPI), Govt of India",
      category: "Central Government Scheme",
      eligibilityStatus: "Potentially Eligible",
      estimatedBenefit: "35% Capital Grant (Up to ₹50.00 Lakhs)",
      eligibilityBasis: "Packaged agro-food processing unit adding local farmer produce value-chain linkages.",
      keyBenefits: [
        "Credit-linked capital subsidy @ 35% of eligible project cost",
        "Marketing and branding support grants",
        "Quality certification reimbursement"
      ],
      requiredDocs: [
        { name: "FSSAI License Dossier", source: "DigiLocker FSSAI", autoFilled: true },
        { name: "CA Capital Outlay Certificate", source: "Chartered Accountant Token", autoFilled: true },
        { name: "Bank Appraised Project Report", source: "Appraisal Cell", autoFilled: true }
      ],
      applicationStatus: "Eligible / Window Active"
    },
    {
      id: "inc-power-tariff",
      name: "Industrial Green Energy Power Tariff Concession",
      department: "MSEDCL & MEDA",
      category: "Utility Tariff Concession",
      eligibilityStatus: "Potentially Eligible",
      estimatedBenefit: "₹1.50 per unit rebate on HT tariff bill",
      eligibilityBasis: "Industrial units installing rooftop solar or committing to ≥20% renewable energy blend.",
      keyBenefits: [
        "Direct tariff rebate on monthly HT electricity consumption",
        "Net metering synchronization facility with MSEDCL grid"
      ],
      requiredDocs: [
        { name: "Roof Stability Certificate", source: "Structural Consultant", autoFilled: true },
        { name: "Solar Vendor EPC Agreement", source: "Direct Upload", autoFilled: false },
        { name: "MSEDCL Consumer Number", source: "MSEDCL Portal", autoFilled: true }
      ],
      applicationStatus: "Not Applied"
    }
  ];

  const handleApplyScheme = (sch) => {
    setIsApplyingId(sch.id);
    setTimeout(() => {
      setIsApplyingId(null);
      const appRef = `INC-MH-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setAppliedSchemes(prev => ({
        ...prev,
        [sch.id]: {
          appRef,
          date: 'Today',
          status: 'CLAIM_SUBMITTED'
        }
      }));
      showToast?.(`Success! Incentive Claim ${appRef} filed for ${sch.name} using reused DigiLocker verified data.`, "success");
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3 pb-1">
        <div>
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
            <span>Fiscal Benefits & Subsidies</span>
            <span className="text-emerald-800 bg-emerald-50 text-[10.5px] px-2 py-0.5 rounded border border-emerald-200 font-bold">
              3 Matched Schemes (Once-Only Data Reuse)
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">
            Incentives & Government Schemes
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Automated eligibility matching against Maharashtra State Industrial Policy (PSI 2019) and central MoFPI grants.
          </p>
        </div>
      </div>

      <ProjectSummaryStrip project={project} />

      {/* Official Disclaimer Banner */}
      <div className="p-4 bg-amber-50/70 border border-amber-300 rounded-xl text-xs text-amber-950 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" />
          <span className="text-xs leading-relaxed">
            <strong className="font-bold">Zero-Paperwork Subsidy Claiming:</strong> Verified certificates and DPR from your approval pipeline are automatically reused here. No need to re-upload company PAN, land allotment, or engineer estimates.
          </span>
        </div>
        <span className="font-bold text-[10.5px] uppercase bg-amber-200/80 text-amber-950 px-2.5 py-1 rounded-md shrink-0 border border-amber-300 font-mono ml-2">
          Statutory Policy Estimate
        </span>
      </div>

      {/* Schemes List */}
      <div className="space-y-4">
        {schemes.map((sch) => {
          const isApplied = Boolean(appliedSchemes[sch.id]);
          const applicationData = appliedSchemes[sch.id];

          return (
            <div
              key={sch.id}
              className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      {sch.category}
                    </span>
                    <span className="bg-emerald-50 text-emerald-800 border border-emerald-300 text-[11px] font-bold px-2 py-0.5 rounded">
                      ✓ {sch.eligibilityStatus}
                    </span>
                    {isApplied && (
                      <span className="bg-blue-50 text-blue-900 border border-blue-300 text-[11px] font-bold px-2 py-0.5 rounded">
                        Claim Lodged: {applicationData.appRef}
                      </span>
                    )}
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 leading-tight">
                    {sch.name}
                  </h2>
                  <div className="text-xs text-slate-600 mt-1 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    <span>{sch.department}</span>
                  </div>
                </div>

                <div className="sm:text-right bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-200 sm:border-0 sm:bg-transparent sm:p-0">
                  <span className="text-[11px] text-slate-500 block font-bold uppercase">Estimated Benefit Value</span>
                  <span className="text-base sm:text-lg font-extrabold text-emerald-800">{sch.estimatedBenefit}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                <div className="space-y-3">
                  <div className="font-bold text-slate-900">Eligibility Rationale:</div>
                  <p className="text-slate-700 bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-xs leading-relaxed">
                    {sch.eligibilityBasis}
                  </p>

                  <div className="font-bold text-slate-900 pt-1">Key Fiscal Provisions:</div>
                  <ul className="space-y-1.5 text-slate-700 text-xs">
                    {sch.keyBenefits.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-700 font-bold shrink-0">✓</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Reused Verified Documentation:</span>
                    <span className="text-[10.5px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Zero Manual Uploads
                    </span>
                  </div>
                  <div className="border border-slate-200 rounded-lg divide-y divide-slate-100 bg-slate-50/50 text-xs">
                    {sch.requiredDocs.map((doc, idx) => (
                      <div key={idx} className="p-2.5 px-3 flex items-center justify-between text-xs">
                        <div>
                          <div className="text-slate-800 font-semibold">{doc.name}</div>
                          <div className="text-[10.5px] text-slate-500">Source: {doc.source}</div>
                        </div>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded font-bold">
                          ✓ Reused
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex justify-end">
                    {isApplied ? (
                      <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                        <span>Claim Application {applicationData.appRef} Under Scrutiny at DIC</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleApplyScheme(sch)}
                        disabled={isApplyingId === sch.id}
                        className="px-4 py-2 bg-[#1E4E8C] hover:bg-[#143D6F] text-white rounded-lg text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-blue-200" />
                        <span>{isApplyingId === sch.id ? "Auto-Populating from DigiLocker..." : "1-Click Apply (Auto-Fill from DigiLocker) →"}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

