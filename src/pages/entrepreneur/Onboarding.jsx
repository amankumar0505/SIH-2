import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  IndianRupee, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  AlertTriangle
} from 'lucide-react';

export default function Onboarding({ project, onSaveProject, onGeneratePlan, showToast }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: project.name || "ABC Food Processing Pvt Ltd",
    industry: project.industry || "Food Processing",
    district: project.location?.district || "Pune",
    taluka: project.location?.taluka || "Haveli",
    industrialArea: project.location?.industrialArea || "Chakan Industrial Zone (MIDC Phase II)",
    surveyNumber: project.location?.surveyNumber || "Plot No. A-42/1, Sector 3, Chakan MIDC",
    investmentValueCr: project.investmentValueCr || 5.0,
    employees: project.employees || 80,
    landArea: project.landArea || "2.0 Acres",
    projectType: project.projectType || "New Project",
    productionCapacity: project.productionCapacity || "1,200 MT/annum Packaged Foods",
    pollutionCategory: project.pollutionCategory || "Orange",
    waterRequirementKLD: project.waterRequirementKLD || 25,
    powerRequiredKVA: project.powerRequiredKVA || 150,
    hasHazardousMaterials: project.hasHazardousMaterials || false,
    hasBoiler: project.hasBoiler || false,
  });

  const industries = [
    { id: "Food Processing", desc: "Agro-processing, packaged foods, beverages, cold storage" },
    { id: "Manufacturing", desc: "Engineering, metal fabrication, machinery, assembly" },
    { id: "IT/ITES", desc: "Software development, data centers, IT services" },
    { id: "Pharmaceutical", desc: "Active pharmaceutical ingredients (API), formulations, drugs" },
    { id: "Textile", desc: "Spinning, weaving, garment manufacturing, dyeing" },
    { id: "Automobile", desc: "Auto components, EV manufacturing, vehicle chassis" },
    { id: "Chemical", desc: "Specialty chemicals, polymers, dyes, industrial solvents" },
    { id: "Other", desc: "General industrial and commercial operations" }
  ];

  const districts = ["Pune", "Nagpur", "Thane", "Nashik", "Aurangabad (Chh. Sambhajinagar)", "Raigad", "Kolhapur", "Solapur"];

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleApplyPreset = (presetKey) => {
    if (presetKey === 'food') {
      setFormData({
        name: "ABC Food Processing Pvt Ltd",
        industry: "Food Processing",
        district: "Pune",
        taluka: "Haveli",
        industrialArea: "Chakan Industrial Zone (MIDC Phase II)",
        surveyNumber: "Plot No. A-42/1, Sector 3, Chakan MIDC",
        investmentValueCr: 5.0,
        employees: 80,
        landArea: "2.0 Acres",
        projectType: "New Project",
        productionCapacity: "1,200 MT/annum Packaged Foods",
        pollutionCategory: "Orange",
        waterRequirementKLD: 25,
        powerRequiredKVA: 150,
        hasHazardousMaterials: false,
        hasBoiler: false
      });
      showToast?.("Loaded Preset: ABC Food Processing (Pune)", "info");
    } else if (presetKey === 'mfg') {
      setFormData({
        name: "Bharat Precision Engineering Works",
        industry: "Manufacturing",
        district: "Nagpur",
        taluka: "Hingna",
        industrialArea: "MIDC Hingna Industrial Estate",
        surveyNumber: "Plot No. C-18, Sector 4, Hingna MIDC",
        investmentValueCr: 20.0,
        employees: 250,
        landArea: "5.0 Acres",
        projectType: "Expansion",
        productionCapacity: "4,500 MT/annum Castings & Machined Components",
        pollutionCategory: "Red",
        waterRequirementKLD: 40,
        powerRequiredKVA: 450,
        hasHazardousMaterials: true,
        hasBoiler: true
      });
      showToast?.("Loaded Preset: Bharat Precision Engineering (Nagpur)", "info");
    } else if (presetKey === 'it') {
      setFormData({
        name: "Sahyadri Cloud Systems LLP",
        industry: "IT/ITES",
        district: "Pune",
        taluka: "Pune City",
        industrialArea: "Hinjawadi Rajiv Gandhi Infotech Park (Phase 1)",
        surveyNumber: "Building B4, Tech Zone, Hinjawadi",
        investmentValueCr: 10.0,
        employees: 150,
        landArea: "1.0 Acre (Built-up lease)",
        projectType: "New Project",
        productionCapacity: "N/A (Software Development Facility)",
        pollutionCategory: "White",
        waterRequirementKLD: 10,
        powerRequiredKVA: 80,
        hasHazardousMaterials: false,
        hasBoiler: false
      });
      showToast?.("Loaded Preset: Sahyadri IT Park (Pune)", "info");
    }
  };

  const handleFinish = () => {
    const updatedProject = {
      ...project,
      name: formData.name,
      industry: formData.industry,
      location: {
        state: "Maharashtra",
        district: formData.district,
        taluka: formData.taluka,
        industrialArea: formData.industrialArea,
        surveyNumber: formData.surveyNumber
      },
      investment: `₹${parseFloat(formData.investmentValueCr).toFixed(2)} Crore`,
      investmentValueCr: parseFloat(formData.investmentValueCr),
      employees: parseInt(formData.employees, 10),
      landArea: formData.landArea,
      projectType: formData.projectType,
      productionCapacity: formData.productionCapacity,
      pollutionCategory: formData.pollutionCategory,
      waterRequirementKLD: formData.waterRequirementKLD,
      powerRequiredKVA: formData.powerRequiredKVA,
      hasHazardousMaterials: formData.hasHazardousMaterials,
      hasBoiler: formData.hasBoiler
    };

    onSaveProject(updatedProject);
    onGeneratePlan(updatedProject);
    showToast?.("Approval Plan Generated Successfully", "success");
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Page Title & Preset Bar */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3 pb-1">
        <div>
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
            <span>Enterprise Onboarding Questionnaire</span>
            <span className="text-[#1E4E8C] bg-blue-50 text-[10.5px] px-2 py-0.5 rounded border border-blue-200 font-bold">
              Maharashtra Industrial Act Evaluation
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">
            Project Profile & Classification
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Answer the questionnaire to generate your statutory clearance checklist, dependency roadmap, and required document package.
          </p>
        </div>

        {/* Demo Presets Bar */}
        <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-lg border border-slate-300 shadow-2xs text-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase px-2">Load Demo:</span>
          <button
            type="button"
            onClick={() => handleApplyPreset('food')}
            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
              formData.industry === 'Food Processing' ? 'bg-[#1E4E8C] text-white shadow-2xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Food Unit (Pune)
          </button>
          <button
            type="button"
            onClick={() => handleApplyPreset('mfg')}
            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
              formData.industry === 'Manufacturing' ? 'bg-[#1E4E8C] text-white shadow-2xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Heavy Eng. (Nagpur)
          </button>
          <button
            type="button"
            onClick={() => handleApplyPreset('it')}
            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
              formData.industry === 'IT/ITES' ? 'bg-[#1E4E8C] text-white shadow-2xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            IT Office (Pune)
          </button>
        </div>
      </div>

      {/* Horizontal Step Indicator */}
      <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-xs">
        <div className="grid grid-cols-5 gap-2 text-xs">
          {[
            { num: 1, label: "1. Industry" },
            { num: 2, label: "2. Location" },
            { num: 3, label: "3. Business" },
            { num: 4, label: "4. Environment" },
            { num: 5, label: "5. Review" }
          ].map((s) => (
            <button
              key={s.num}
              onClick={() => setCurrentStep(s.num)}
              className={`py-2 px-2.5 rounded-lg text-center font-bold border transition-all text-xs ${
                currentStep === s.num
                  ? 'bg-[#1E4E8C] text-white border-[#1E4E8C] shadow-xs'
                  : currentStep > s.num
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div className="truncate">{s.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Form + Live Summary Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Form Area */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
          {/* STEP 1: INDUSTRY */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-[18px] font-bold text-slate-900">
                  Step 1: What are you setting up?
                </h2>
                <p className="text-[13.5px] text-slate-600 mt-0.5">
                  Select your primary industrial activity to determine applicable statutory acts.
                </p>
              </div>

              <div className="pt-2">
                <label className="block text-[12px] font-bold text-slate-700 uppercase mb-1">
                  Enterprise Registered Legal Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-[3px] text-[14px] font-semibold text-slate-900 focus:border-[#1B365D] focus:outline-none"
                  placeholder="e.g. ABC Food Processing Pvt Ltd"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {industries.map((ind) => (
                  <div
                    key={ind.id}
                    onClick={() => setFormData({ ...formData, industry: ind.id })}
                    className={`p-3.5 rounded-[3px] border cursor-pointer transition-all ${
                      formData.industry === ind.id
                        ? 'bg-blue-50/80 border-[#1B365D] ring-1 ring-[#1B365D] shadow-sm'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[14px] text-[#1B365D]">{ind.id}</span>
                      <input
                        type="radio"
                        name="industry"
                        checked={formData.industry === ind.id}
                        onChange={() => setFormData({ ...formData, industry: ind.id })}
                        className="text-[#1B365D]"
                      />
                    </div>
                    <p className="text-[12.5px] text-slate-600 mt-1 leading-snug">
                      {ind.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: LOCATION */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-[18px] font-bold text-slate-900">
                  Step 2: Proposed Location & Industrial Area
                </h2>
                <p className="text-[13.5px] text-slate-600 mt-0.5">
                  Identifies regional planning authorities (MIDC vs Municipal) and district jurisdiction.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 uppercase text-[11.5px] mb-1">
                    District
                  </label>
                  <select
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-[3px] font-semibold text-slate-900 text-[14px] focus:border-[#1B365D] focus:outline-none"
                  >
                    {districts.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase text-[11.5px] mb-1">
                    Taluka
                  </label>
                  <input
                    type="text"
                    value={formData.taluka}
                    onChange={(e) => setFormData({ ...formData, taluka: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-[3px] font-semibold text-slate-900 text-[14px] focus:border-[#1B365D] focus:outline-none"
                    placeholder="e.g. Haveli, Hingna"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase text-[11.5px] mb-1">
                    Industrial Area
                  </label>
                  <input
                    type="text"
                    value={formData.industrialArea}
                    onChange={(e) => setFormData({ ...formData, industrialArea: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-[3px] font-semibold text-slate-900 text-[14px] focus:border-[#1B365D] focus:outline-none"
                    placeholder="e.g. Chakan MIDC Phase II"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase text-[11.5px] mb-1">
                    Plot / Survey Number
                  </label>
                  <input
                    type="text"
                    value={formData.surveyNumber}
                    onChange={(e) => setFormData({ ...formData, surveyNumber: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-[3px] font-semibold text-slate-900 text-[14px] focus:border-[#1B365D] focus:outline-none"
                    placeholder="Plot No. A-42/1 (Survey 123/4B)"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: BUSINESS DETAILS */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-[18px] font-bold text-slate-900">
                  Step 3: Business Details & Capacity
                </h2>
                <p className="text-[13.5px] text-slate-600 mt-0.5">
                  Worker thresholds (≥10 with power) trigger Factories Act Section 2(m)(i); investment determines MSME status.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 uppercase text-[11.5px] mb-1">
                    Investment in Plant & Machinery (₹ Crore)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={formData.investmentValueCr}
                    onChange={(e) => setFormData({ ...formData, investmentValueCr: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-[3px] font-semibold text-slate-900 text-[14px] focus:border-[#1B365D] focus:outline-none"
                  />
                  <span className="text-[11.5px] text-slate-500 mt-0.5 block">
                    {formData.investmentValueCr <= 10 ? "MSME Small Enterprise Classification" : "Medium / Large Scale Classification"}
                  </span>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase text-[11.5px] mb-1">
                    Employees / Workforce
                  </label>
                  <input
                    type="number"
                    value={formData.employees}
                    onChange={(e) => setFormData({ ...formData, employees: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-[3px] font-semibold text-slate-900 text-[14px] focus:border-[#1B365D] focus:outline-none"
                  />
                  <span className={`text-[11.5px] mt-0.5 block font-medium ${
                    formData.employees >= 10 ? 'text-amber-800' : 'text-slate-500'
                  }`}>
                    {formData.employees >= 10 ? "Triggers Factories Act Section 2(m)(i) (≥10 workers)" : "Below factory threshold"}
                  </span>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase text-[11.5px] mb-1">
                    Land Area
                  </label>
                  <input
                    type="text"
                    value={formData.landArea}
                    onChange={(e) => setFormData({ ...formData, landArea: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-[3px] font-semibold text-slate-900 text-[14px] focus:border-[#1B365D] focus:outline-none"
                    placeholder="e.g. 2.0 Acres"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase text-[11.5px] mb-1">
                    New / Expansion
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-[3px] font-semibold text-slate-900 text-[14px] focus:border-[#1B365D] focus:outline-none"
                  >
                    <option value="New Project">New Project (Greenfield)</option>
                    <option value="Expansion">Expansion (Brownfield)</option>
                    <option value="Diversification">Product Line Diversification</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: ENVIRONMENTAL DETAILS */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-[18px] font-bold text-slate-900">
                  Step 4: Environmental & Safety Details
                </h2>
                <p className="text-[13.5px] text-slate-600 mt-0.5">
                  Determines MPCB Consent category (Red/Orange/Green/White) and hazardous waste clearance requirements.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 uppercase text-[11.5px] mb-1">
                    Pollution Category (CPCB / MPCB Classification)
                  </label>
                  <select
                    value={formData.pollutionCategory}
                    onChange={(e) => setFormData({ ...formData, pollutionCategory: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-[3px] font-semibold text-slate-900 text-[14px] focus:border-[#1B365D] focus:outline-none"
                  >
                    <option value="Orange">Orange Category (Moderate Pollution / Food, Textiles)</option>
                    <option value="Red">Red Category (Heavy Pollution / Chemicals, Heavy Mfg)</option>
                    <option value="Green">Green Category (Low Pollution / Light Fabrication)</option>
                    <option value="White">White Category (Non-polluting / IT, Solar)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase text-[11.5px] mb-1">
                    Power Load Requirement (kVA)
                  </label>
                  <input
                    type="number"
                    value={formData.powerRequiredKVA}
                    onChange={(e) => setFormData({ ...formData, powerRequiredKVA: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-[3px] font-semibold text-slate-900 text-[14px] focus:border-[#1B365D] focus:outline-none"
                  />
                </div>

                {/* Conditional Hazardous Materials Toggle */}
                <div className="sm:col-span-2 p-4 bg-slate-50 rounded-[3px] border border-slate-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900 text-[13.5px] block">
                        Does your project handle or store Hazardous Materials / Solvents / LPG?
                      </span>
                      <span className="text-[12.5px] text-slate-600 mt-0.5 block">
                        Petroleum fuels, LPG bulk storage, toxic chemicals, or scheduled hazardous waste.
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, hasHazardousMaterials: false })}
                        className={`px-3.5 py-1.5 rounded-[2px] text-[13px] font-bold border transition-colors ${
                          !formData.hasHazardousMaterials
                            ? 'bg-[#1B365D] text-white border-[#1B365D]'
                            : 'bg-white text-slate-700 border-slate-300'
                        }`}
                      >
                        NO
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, hasHazardousMaterials: true })}
                        className={`px-3.5 py-1.5 rounded-[2px] text-[13px] font-bold border transition-colors ${
                          formData.hasHazardousMaterials
                            ? 'bg-red-800 text-white border-red-800'
                            : 'bg-white text-slate-700 border-slate-300'
                        }`}
                      >
                        YES
                      </button>
                    </div>
                  </div>

                  {formData.hasHazardousMaterials && (
                    <div className="mt-3 pt-3 border-t border-slate-200 text-red-900 text-[12.5px] flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-700 shrink-0" />
                      <span>
                        <strong>Conditional Approvals Activated:</strong> Requires Hazardous Waste Authorization & PESO storage clearance.
                      </span>
                    </div>
                  )}
                </div>

                {/* Conditional Boiler Toggle */}
                <div className="sm:col-span-2 p-4 bg-slate-50 rounded-[3px] border border-slate-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900 text-[13.5px] block">
                        Does your facility install an Industrial Steam Boiler (&gt;22.75 L)?
                      </span>
                      <span className="text-[12.5px] text-slate-600 mt-0.5 block">
                        Pressurized steam vessels for heating, cooking, or thermal power.
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, hasBoiler: false })}
                        className={`px-3.5 py-1.5 rounded-[2px] text-[13px] font-bold border transition-colors ${
                          !formData.hasBoiler
                            ? 'bg-[#1B365D] text-white border-[#1B365D]'
                            : 'bg-white text-slate-700 border-slate-300'
                        }`}
                      >
                        NO
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, hasBoiler: true })}
                        className={`px-3.5 py-1.5 rounded-[2px] text-[13px] font-bold border transition-colors ${
                          formData.hasBoiler
                            ? 'bg-red-800 text-white border-red-800'
                            : 'bg-white text-slate-700 border-slate-300'
                        }`}
                      >
                        YES
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: REVIEW & GENERATE */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-[18px] font-bold text-slate-900">
                  Step 5: Review Profile & Generate Plan
                </h2>
                <p className="text-[13.5px] text-slate-600 mt-0.5">
                  Confirm parameters to generate statutory approvals, document checklist, and parallel roadmap.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-[3px] border border-slate-200 space-y-3 text-xs">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <span className="text-slate-500 block text-[11.5px] font-medium">Enterprise Name</span>
                    <span className="font-bold text-slate-900 text-[13.5px]">{formData.name}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11.5px] font-medium">Industry</span>
                    <span className="font-bold text-[#1B365D] text-[13.5px]">{formData.industry}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11.5px] font-medium">Location</span>
                    <span className="font-semibold text-slate-800 text-[13.5px]">{formData.district}, Maharashtra</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11.5px] font-medium">Investment</span>
                    <span className="font-semibold text-slate-800 text-[13.5px]">₹{formData.investmentValueCr} Crore</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11.5px] font-medium">Employees</span>
                    <span className="font-semibold text-slate-800 text-[13.5px]">{formData.employees} Workers</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11.5px] font-medium">Pollution Cat.</span>
                    <span className="font-semibold text-amber-800 text-[13.5px]">{formData.pollutionCategory} Category</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[12.5px] text-slate-600">
                  <span>Hazardous Materials: <strong>{formData.hasHazardousMaterials ? 'YES (Active)' : 'NO'}</strong></span>
                  <span>Boiler: <strong>{formData.hasBoiler ? 'YES (Active)' : 'NO'}</strong></span>
                </div>
              </div>

              <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-[3px] text-xs text-[#1B365D]">
                <span className="font-bold block mb-0.5 text-[13px]">Statutory Evaluation Readiness:</span>
                Will cross-reference the Factories Act 1948, Water/Air Acts, Food Safety Act 2006, and Maharashtra PSI 2019 scheme.
              </div>
            </div>
          )}

          {/* Wizard Navigation Buttons */}
          <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="px-4 py-2 bg-white border border-slate-300 rounded-[3px] text-[13px] font-semibold text-slate-800 hover:bg-slate-50 flex items-center gap-1.5 shadow-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous Step</span>
              </button>
            ) : <div></div>}

            {currentStep < 5 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-5 py-2.5 bg-[#1E4E8C] hover:bg-[#143D6F] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <span>Continue to Step {currentStep + 1}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinish}
                className="px-6 py-2.5 bg-[#1E4E8C] hover:bg-[#143D6F] text-white rounded-lg text-xs font-bold flex items-center gap-2 shadow-xs transition-colors"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>Generate Approval Plan</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Summary Panel */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs text-xs">
            <h3 className="font-bold text-slate-900 text-sm pb-2.5 border-b border-slate-100 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-[#1E4E8C]" />
              Project Live Summary
            </h3>

            <div className="mt-3.5 space-y-3">
              <div>
                <span className="text-slate-500 block text-[11px] font-bold uppercase">Enterprise Name</span>
                <span className="font-bold text-slate-900 text-xs mt-0.5 block">{formData.name}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px] font-bold uppercase">Industry Classification</span>
                <span className="font-bold text-[#1E4E8C] bg-blue-50 px-2 py-0.5 rounded text-[11px] border border-blue-200 inline-block mt-0.5">
                  {formData.industry}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px] font-bold uppercase">Location</span>
                <span className="font-bold text-slate-900 text-xs mt-0.5 block">{formData.district}, Maharashtra</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px] font-bold uppercase">Capital Outlay</span>
                <span className="font-bold text-slate-900 text-xs mt-0.5 block font-mono">₹{formData.investmentValueCr} Cr</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px] font-bold uppercase">Workforce</span>
                <span className="font-bold text-slate-900 text-xs mt-0.5 block">{formData.employees} Workers</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
              Deterministic single-window evaluation based on statutory threshold criteria.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
