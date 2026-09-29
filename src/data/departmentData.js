export const governmentKPIs = {
  applicationsReceived: 1250,
  pending: 310,
  underReview: 220,
  approved: 650,
  rejected: 70,
  totalClearanceRate: "52.0%",
  activeOfficers: 48,
  averagePortalSLA: "16.4 Days"
};

export const departmentProcessingTimes = [
  { department: "Pollution (MPCB)", avgDays: 12, standardSLA: 15, pending: 87, overdue: 42, color: "#991B1B" },
  { department: "Factory (DISH)", avgDays: 15, standardSLA: 20, pending: 64, overdue: 12, color: "#1B365D" },
  { department: "Fire Dept (MFES)", avgDays: 8, standardSLA: 10, pending: 45, overdue: 6, color: "#B45309" },
  { department: "Electricity (MSEDCL)", avgDays: 5, standardSLA: 7, pending: 38, overdue: 2, color: "#0369A1" },
  { department: "Planning (MIDC SPA)", avgDays: 10, standardSLA: 14, pending: 52, overdue: 8, color: "#166534" },
  { department: "Food Safety (FSSAI)", avgDays: 7, standardSLA: 10, pending: 24, overdue: 4, color: "#64748B" }
];

export const bottleneckSummary = {
  department: "Pollution Department (MPCB)",
  summary: "42 applications have exceeded their expected statutory processing time.",
  pendingCases: 87,
  overdueCases: 42,
  averageProcessingTime: "12 days (Simulated peak: 28 days for Orange/Red categories)",
  trend: "Increasing (+18% backlog vs previous month)",
  rootCause: "Delay in Consent Committee scheduling and pending technical review of industrial effluent treatment schemes.",
  recommendedIntervention: "Automate low-risk Green/White category clearances; reassign 3 additional scrutiny officers to Pune & Thane regional sub-divisions."
};

export const departmentApplicationsList = [
  {
    id: "APP-1042",
    companyName: "Sahyadri Chemical Formulations Ltd",
    industry: "Chemical & Petrochemical",
    district: "Thane",
    approval: "MPCB Consent to Establish (CTE)",
    department: "Pollution (MPCB)",
    submittedDate: "10 July 2026",
    daysPending: 52,
    expectedSLA: 30,
    delay: "+22 days",
    status: "OVERDUE",
    priority: "High",
    riskLevel: "RED", // RED (High Risk), ORANGE (Medium Risk), GREEN (Low Risk / Fast-track)
    assignedOfficer: "R. K. Verma (SRO Thane)",
    bottleneckReason: "Effluent treatment scheme vetting pending with Central Technical Committee."
  },
  {
    id: "APP-1048",
    companyName: "ABC Food Processing Pvt Ltd",
    industry: "Food Processing",
    district: "Pune",
    approval: "MPCB Consent to Establish (CTE)",
    department: "Pollution (MPCB)",
    submittedDate: "20 June 2026",
    daysPending: 68,
    expectedSLA: 30,
    delay: "+38 days",
    status: "OVERDUE",
    priority: "High",
    riskLevel: "ORANGE",
    assignedOfficer: "A. M. Patil (SRO Pune II)",
    bottleneckReason: "Awaiting final Consent Committee deliberation roster."
  },
  {
    id: "APP-1055",
    companyName: "Vidarbha Agro Bio-Tech",
    industry: "Food Processing",
    district: "Nagpur",
    approval: "MPCB Consent to Operate (CTO)",
    department: "Pollution (MPCB)",
    submittedDate: "02 July 2026",
    daysPending: 60,
    expectedSLA: 30,
    delay: "+30 days",
    status: "OVERDUE",
    priority: "High",
    riskLevel: "ORANGE",
    assignedOfficer: "S. N. Joshi (SRO Nagpur)",
    bottleneckReason: "Field inspection air sample analysis report delay."
  },
  {
    id: "APP-1061",
    companyName: "Deccan Steel & Alloys",
    industry: "Manufacturing",
    district: "Raigad",
    approval: "MPCB Consent to Establish (CTE)",
    department: "Pollution (MPCB)",
    submittedDate: "18 July 2026",
    daysPending: 44,
    expectedSLA: 30,
    delay: "+14 days",
    status: "OVERDUE",
    priority: "Urgent",
    riskLevel: "RED",
    assignedOfficer: "M. T. Kadam (SRO Raigad)",
    bottleneckReason: "Heavy Red category public hearing clearance document pending."
  },
  {
    id: "APP-1077",
    companyName: "Pinnacle Auto Components",
    industry: "Automobile",
    district: "Aurangabad",
    approval: "Factory Plan Approval",
    department: "Factory (DISH)",
    submittedDate: "22 July 2026",
    daysPending: 40,
    expectedSLA: 25,
    delay: "+15 days",
    status: "OVERDUE",
    priority: "Medium",
    riskLevel: "ORANGE",
    assignedOfficer: "B. P. Shinde (Dy. Director DISH)",
    bottleneckReason: "Structural engineer certification revision requested."
  },
  {
    id: "APP-1082",
    companyName: "Nexus Pharmaceuticals Hub",
    industry: "Pharmaceutical",
    district: "Pune",
    approval: "Fire Provisional NOC",
    department: "Fire Dept (MFES)",
    submittedDate: "04 August 2026",
    daysPending: 27,
    expectedSLA: 21,
    delay: "+6 days",
    status: "OVERDUE",
    priority: "High",
    riskLevel: "RED",
    assignedOfficer: "V. R. Joshi (Div. Fire Officer)",
    bottleneckReason: "Solvent storage sprinkler layout inspection pending."
  },
  {
    id: "APP-1090",
    companyName: "Maratha Logistics Park",
    industry: "Warehousing",
    district: "Navi Mumbai",
    approval: "Building Permission",
    department: "Planning (MIDC SPA)",
    submittedDate: "12 August 2026",
    daysPending: 19,
    expectedSLA: 25,
    delay: "0 days",
    status: "IN_REVIEW",
    priority: "Standard",
    riskLevel: "GREEN",
    assignedOfficer: "P. N. Shinde (Town Planner)",
    bottleneckReason: "Within standard SLA timeline."
  },
  {
    id: "APP-1095",
    companyName: "Godavari Solar Tech",
    industry: "Clean Energy",
    district: "Nashik",
    approval: "Industrial Electricity Connection",
    department: "Electricity (MSEDCL)",
    submittedDate: "16 August 2026",
    daysPending: 15,
    expectedSLA: 15,
    delay: "0 days",
    status: "IN_REVIEW",
    priority: "Standard",
    riskLevel: "GREEN",
    assignedOfficer: "K. R. Jagtap (EE MSEDCL)",
    bottleneckReason: "Within standard SLA timeline."
  },
  {
    id: "APP-1102",
    companyName: "Kalyani Precision Forgings",
    industry: "Manufacturing",
    district: "Pune",
    approval: "Boiler Registration",
    department: "Factory (DISH / Boilers)",
    submittedDate: "05 August 2026",
    daysPending: 26,
    expectedSLA: 20,
    delay: "+6 days",
    status: "OVERDUE",
    priority: "Medium",
    riskLevel: "ORANGE",
    assignedOfficer: "D. B. Gaikwad (Inspector of Boilers)",
    bottleneckReason: "Hydro-test witness date rescheduled."
  }
];

export const jointInspectionSchedules = [
  {
    id: "CIS-2026-PN-089",
    unitName: "ABC Food Processing Pvt Ltd",
    plotNumber: "Plot A-42/1, Chakan MIDC Phase II",
    scheduledDate: "04 September 2026",
    scheduledTime: "11:00 AM IST",
    participatingDepartments: [
      { name: "Maharashtra Fire Services (MFES)", officer: "V. R. Joshi (Div. Fire Officer)", status: "CONFIRMED" },
      { name: "Directorate of Industrial Safety (DISH)", officer: "D. B. Gaikwad (Dy. Director)", status: "CONFIRMED" },
      { name: "Pollution Control Board (MPCB)", officer: "A. M. Patil (SRO Pune II)", status: "CONFIRMED" }
    ],
    status: "SYNCHRONIZED",
    leadDepartment: "DISH (Factory Safety)",
    checklistItems: [
      "Effluent zero-discharge piping verification",
      "Fire hydrant static pressure test (7.5 bar minimum)",
      "Emergency escape route & ventilation audit",
      "Boiler room explosion-proof electrical fittings"
    ],
    singleReportMandate: "Mandatory unified inspection report upload within 48h under Maharashtra CIS Guidelines."
  },
  {
    id: "CIS-2026-TH-041",
    unitName: "Sahyadri Chemical Formulations Ltd",
    plotNumber: "Plot C-14, Tarapur MIDC",
    scheduledDate: "08 September 2026",
    scheduledTime: "10:30 AM IST",
    participatingDepartments: [
      { name: "Pollution Control Board (MPCB)", officer: "R. K. Verma (SRO Thane)", status: "CONFIRMED" },
      { name: "Directorate of Industrial Safety (DISH)", officer: "S. K. More (Inspector)", status: "AWAITING_CONFIRMATION" }
    ],
    status: "PENDING_OFFICER_ROSTER",
    leadDepartment: "MPCB (Pollution)",
    checklistItems: [
      "Scrubber emission online continuous monitoring",
      "Hazardous waste secured landfill transit manifests"
    ],
    singleReportMandate: "Mandatory unified inspection report upload within 48h."
  }
];

