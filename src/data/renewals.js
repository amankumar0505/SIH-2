export const renewalsDatabase = [
  {
    id: "ren-factory",
    approvalName: "Factory Licence",
    department: "Directorate of Industrial Safety & Health (DISH)",
    licenceNumber: "MH-DISH-PUN-2024-8841",
    unitName: "ABC Food Processing Pvt Ltd",
    expiryDate: "20 Dec 2026",
    daysRemaining: 111,
    status: "ACTIVE",
    renewalWindow: "60 Days before expiry",
    urgencyTier: "NORMAL", // NORMAL, REMINDER (30d), WARNING (15d), URGENT (7d), EXPIRED
    annualFee: "₹18,500",
    prerequisiteDocs: ["Annual Safety Audit", "Worker Medical Fitness Certificates", "Machine Test Register"],
    autoRenewalEligible: true
  },
  {
    id: "ren-mpcb",
    approvalName: "MPCB Consent to Operate (CTO)",
    department: "Maharashtra Pollution Control Board (MPCB)",
    licenceNumber: "MPCB/SRO-PUN-II/CTO-2024-00412",
    unitName: "ABC Food Processing Pvt Ltd",
    expiryDate: "15 Jan 2027",
    daysRemaining: 137,
    status: "ACTIVE",
    renewalWindow: "90 Days before expiry",
    urgencyTier: "NORMAL",
    annualFee: "₹45,000",
    prerequisiteDocs: ["Quarterly Effluent Analysis", "Hazardous Waste Manifest Return (Form 4)", "Water Cess Returns"],
    autoRenewalEligible: false
  },
  {
    id: "ren-fire",
    approvalName: "Fire Final NOC & Annual Maintenance",
    department: "Maharashtra Fire & Emergency Services",
    licenceNumber: "MFES-NOC-PUN-2024-1024",
    unitName: "ABC Food Processing Pvt Ltd",
    expiryDate: "10 Feb 2027",
    daysRemaining: 163,
    status: "ACTIVE",
    renewalWindow: "30 Days before expiry",
    urgencyTier: "NORMAL",
    annualFee: "₹12,000",
    prerequisiteDocs: ["Licensed Agency Form B Safety Certificate", "Extinguisher Refilling Test Certificates"],
    autoRenewalEligible: true
  },
  {
    id: "ren-fssai",
    approvalName: "FSSAI Food Manufacturing Licence",
    department: "Food Safety and Standards Authority of India (FSSAI)",
    licenceNumber: "11524002000492",
    unitName: "ABC Food Processing Pvt Ltd",
    expiryDate: "28 Sep 2026",
    daysRemaining: 28,
    status: "RENEWAL_DUE",
    renewalWindow: "30 Days before expiry",
    urgencyTier: "REMINDER", // 30 days reminder!
    annualFee: "₹7,500",
    prerequisiteDocs: ["Annual Return (Form D-1)", "Potable Water Test Report", "Food Handler Medical Certificates"],
    autoRenewalEligible: true
  },
  {
    id: "ren-boiler",
    approvalName: "Annual Boiler Steam Certificate",
    department: "Directorate of Steam Boilers, Maharashtra",
    licenceNumber: "DSB-MH-2023-4102",
    unitName: "Bharat Precision Engineering Works",
    expiryDate: "14 Sep 2026",
    daysRemaining: 14,
    status: "CRITICAL_RENEWAL",
    renewalWindow: "30 Days before expiry",
    urgencyTier: "WARNING", // 15 days warning!
    annualFee: "₹24,000",
    prerequisiteDocs: ["Hydraulic Test Witness Certificate", "Ultrasonic Thickness Report", "Boiler Attendant Competency"],
    autoRenewalEligible: false
  },
  {
    id: "ren-hazardous",
    approvalName: "Hazardous Waste Authorization",
    department: "Maharashtra Pollution Control Board (MPCB)",
    licenceNumber: "MPCB-HWA-NGP-2021-0089",
    unitName: "Bharat Precision Engineering Works",
    expiryDate: "05 Sep 2026",
    daysRemaining: 5,
    status: "URGENT_ACTION",
    renewalWindow: "60 Days before expiry",
    urgencyTier: "URGENT", // 7 days urgent!
    annualFee: "₹30,000",
    prerequisiteDocs: ["Form 4 Annual Return", "Agreement with MEPL / TSDF Facility", "Emergency Response Plan"],
    autoRenewalEligible: false
  }
];

export const complianceCalendarEvents = [
  {
    id: "cal-cis-joint",
    date: "04 Sep 2026",
    day: "04",
    month: "SEP",
    title: "Central Inspection System (CIS) Joint Site Visit",
    department: "Joint: MFES (Fire) + DISH (Factory) + MPCB (Pollution)",
    type: "Joint Inspection",
    unit: "ABC Food Processing Pvt Ltd",
    severity: "Critical",
    details: "Synchronized multi-departmental field visit (CIS-2026-PN-089) for fire hydrants, worker safety guards, and zero-liquid effluent lines. Single combined report mandate."
  },
  {
    id: "cal-1",
    date: "12 Sep 2026",
    day: "12",
    month: "SEP",
    title: "Factory Safety & Labour Compliance Review",
    department: "Labour Department (DISH)",
    type: "Inspection & Audit",
    unit: "ABC Food Processing Pvt Ltd",
    severity: "Medium",
    details: "Semi-annual statutory review of worker health logs, machine guards, and shift rosters under Factories Act."
  },
  {
    id: "cal-2",
    date: "20 Sep 2026",
    day: "20",
    month: "SEP",
    title: "Pollution Consent Quarterly Monitoring Submission",
    department: "MPCB Regional Office",
    type: "Document Filing",
    unit: "ABC Food Processing Pvt Ltd",
    severity: "High",
    details: "Upload certified effluent analysis report and air emissions stack monitoring logs on e-Consent portal."
  },
  {
    id: "cal-3",
    date: "28 Sep 2026",
    day: "28",
    month: "SEP",
    title: "FSSAI Annual Renewal Application Deadline",
    department: "FSSAI FoSCoS",
    type: "Renewal Due",
    unit: "ABC Food Processing Pvt Ltd",
    severity: "Critical",
    details: "Submit Form D-1 and pay annual license fee to avoid statutory late penalty charges."
  },
  {
    id: "cal-4",
    date: "15 Oct 2026",
    day: "15",
    month: "OCT",
    title: "Fire Safety Audit & Hydrant Pressure Verification",
    department: "Maharashtra Fire Services",
    type: "Safety Audit",
    unit: "ABC Food Processing Pvt Ltd",
    severity: "Medium",
    details: "Licensed fire agency mandatory bi-annual testing of static tank pressure and hose reel flow rates."
  },
  {
    id: "cal-5",
    date: "31 Oct 2026",
    day: "31",
    month: "OCT",
    title: "GST Annual Reconciliation (GSTR-9/9C)",
    department: "State GST Dept",
    type: "Tax Compliance",
    unit: "ABC Food Processing Pvt Ltd",
    severity: "Standard",
    details: "Upload audited annual accounts and tax liability reconciliation statement."
  }
];
