import React from 'react';
import { 
  Gift, 
  CheckCircle2, 
  Building, 
  FileText, 
  IndianRupee, 
  AlertCircle
} from 'lucide-react';
import ProjectSummaryStrip from '../../components/ProjectSummaryStrip';

export default function Incentives({ project, onNavigate, showToast }) {
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
      requiredDocs: ["Detailed Project Report (DPR)", "Bank Term Loan Sanction", "Udyam Certificate", "Land Allotment Deed"],
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
      requiredDocs: ["FSSAI License Copy", "CA Capital Outlay Certificate", "Bank Appraised Project Report"],
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
      requiredDocs: ["Roof Stability Certificate", "Solar Vendor EPC Agreement", "MSEDCL Consumer Number"],
      applicationStatus: "Not Applied"
    }
  ];

  const handleApplyScheme = (scheme) => {
    showToast?.(`Initiated incentive application for ${scheme.name}`, "success");
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3 pb-1">
        <div>
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
            <span>Fiscal Benefits & Subsidies</span>
            <span className="text-emerald-800 bg-emerald-50 text-[10.5px] px-2 py-0.5 rounded border border-emerald-200 font-bold">
              3 Matched Schemes
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">
            Incentives & Government Schemes
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Automated eligibility matching against Maharashtra State Industrial Policy (PSI 2019) and central grants.
          </p>
        </div>
      </div>

      <ProjectSummaryStrip project={project} />

      {/* Official Disclaimer Banner */}
      <div className="p-4 bg-amber-50/70 border border-amber-300 rounded-xl text-xs text-amber-950 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" />
          <span className="text-xs leading-relaxed">
            <strong className="font-bold">Policy Note:</strong> Eligibility is indicated as <em className="font-semibold">"Potentially Eligible"</em> based on rule parameters. Final financial disbursement requires bank term loan documentation and physical verification by District Industries Centre (DIC).
          </span>
        </div>
        <span className="font-bold text-[10.5px] uppercase bg-amber-200/80 text-amber-950 px-2.5 py-1 rounded-md shrink-0 border border-amber-300 font-mono ml-2">
          Statutory Policy Estimate
        </span>
      </div>

      {/* Schemes List */}
      <div className="space-y-4">
        {schemes.map((sch) => (
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
                <div className="font-bold text-slate-900">Required Documentation:</div>
                <div className="border border-slate-200 rounded-lg divide-y divide-slate-100 bg-slate-50/50 text-xs">
                  {sch.requiredDocs.map((doc, idx) => (
                    <div key={idx} className="p-2.5 px-3 flex items-center justify-between text-xs">
                      <span className="text-slate-800 font-medium">{doc}</span>
                      <span className="text-[10.5px] bg-slate-200/80 text-slate-700 px-2 py-0.5 rounded font-bold">
                        Ready
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => handleApplyScheme(sch)}
                    className="px-4 py-2 bg-[#1E4E8C] hover:bg-[#143D6F] text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
                  >
                    Apply for Incentive Scheme →
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
