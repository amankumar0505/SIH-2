export const initialDocuments = [
  {
    id: "doc-pan",
    fileName: "PAN_Card_ABC_Food.pdf",
    documentType: "Company PAN",
    category: "Corporate",
    source: "DigiLocker",
    issuer: "Income Tax Department, Govt of India",
    issuerCode: "ITD",
    uploadDate: "12 May 2026",
    size: "420 KB",
    status: "Valid",
    sha256Hash: "8f4b2a7e91c3d5f6a8b0e2c4d6f8a0b2c4e6f8a0b2c4d6e8f0a2b4c6d8e0f2a4",
    digitalSignature: {
      status: "VALID",
      algorithm: "SHA256withRSA (2048-bit)",
      certIssuer: "e-Mudhra CA / Income Tax Sub-CA",
      validUntil: "31 Dec 2028",
      timestamp: "12 May 2026 10:14:22 IST"
    },
    piiProtection: {
      dpdpCompliant: true,
      maskedAadhaar: "XXXX-XXXX-8821",
      maskedPan: "AAACA****F",
      dataMinimization: "Statutory Identity Verification Only"
    },
    consentId: "DEPA-CONSENT-2026-MH-9941",
    extractedData: {
      entityName: "ABC Food Processing Private Limited",
      panNumber: "AAACA1234F",
      incorporationDate: "14/02/2024",
      entityType: "Private Limited Company"
    },
    validations: [
      { field: "DigiLocker X.509 PKI Signature", status: "PASS", message: "Cryptographically verified with Income Tax Department public key certificate" },
      { field: "Company Name Match", status: "PASS", message: "Matches registered company name with 100% confidence" },
      { field: "PAN Format & Checksum", status: "PASS", message: "Valid 10-digit alphanumeric structure" },
      { field: "Income Tax Verification", status: "PASS", message: "Active status verified on ITD database" }
    ]
  },
  {
    id: "doc-land",
    fileName: "MIDC_Lease_Deed_Chakan.pdf",
    documentType: "Land Allotment / Lease Deed",
    category: "Land & Site",
    source: "DigiLocker",
    issuer: "Mahabhumi & MIDC Land Registry Portal",
    issuerCode: "MIDC-REV",
    uploadDate: "18 May 2026",
    size: "2.4 MB",
    status: "Valid",
    sha256Hash: "d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4",
    digitalSignature: {
      status: "VALID",
      algorithm: "SHA256withRSA (2048-bit)",
      certIssuer: "National Informatics Centre (NIC) Sub-CA",
      validUntil: "15 Oct 2029",
      timestamp: "18 May 2026 14:32:05 IST"
    },
    piiProtection: {
      dpdpCompliant: true,
      maskedAadhaar: "XXXX-XXXX-8821",
      maskedPan: "AAACA****F",
      dataMinimization: "Land Allotment Schedule Verification"
    },
    consentId: "DEPA-CONSENT-2026-MH-9941",
    extractedData: {
      entityName: "ABC Food Processing Private Limited",
      plotNumber: "Plot No. A-42/1",
      sector: "Sector 3",
      industrialArea: "Chakan Industrial Zone, MIDC Phase II",
      areaSqM: "8093.71 Sq.M (2.00 Acres)",
      leaseTenure: "95 Years",
      executionDate: "05/03/2024"
    },
    validations: [
      { field: "Issuer Digital Signature", status: "PASS", message: "Digitally signed by MIDC Land Allotment Officer (NIC Class 3 Certificate)" },
      { field: "Title Holder Match", status: "PASS", message: "Allotment deed is in the name of ABC Food Processing Pvt Ltd" },
      { field: "Industrial Zoning", status: "PASS", message: "Permitted for Food Processing & Agro-industrial operations" },
      { field: "Registered Stamp Duty", status: "PASS", message: "Sub-Registrar registration stamp verified" }
    ]
  },
  {
    id: "doc-project-report",
    fileName: "Detailed_Project_Report_DPR.pdf",
    documentType: "Project Report",
    category: "Technical & Financial",
    source: "Direct Upload",
    issuer: "Empanelled Chartered Engineer",
    issuerCode: "CE-ENG",
    uploadDate: "20 May 2026",
    size: "5.1 MB",
    status: "Valid",
    sha256Hash: "1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b",
    digitalSignature: {
      status: "VALID",
      algorithm: "SHA256withRSA",
      certIssuer: "Chartered Engineer Digital Token",
      validUntil: "30 Jun 2027",
      timestamp: "20 May 2026 16:20:11 IST"
    },
    piiProtection: {
      dpdpCompliant: true,
      dataMinimization: "Financial & Machinery Schedule Only"
    },
    extractedData: {
      projectName: "Agro Packaged Snacks & Frozen Food Unit",
      totalCapitalOutlay: "₹500.00 Lakhs (₹5.00 Cr)",
      proposedEmployment: "80 Workers (Direct: 60, Indirect: 20)",
      installedCapacity: "1,200 MT/annum",
      powerRequirement: "150 kVA",
      waterRequirement: "25 KLD"
    },
    validations: [
      { field: "Capital Investment Alignment", status: "PASS", message: "Investment of ₹5 Cr aligns with MSME Small Enterprise threshold" },
      { field: "Process Flow Clarity", status: "PASS", message: "Raw material cleaning, freezing, vacuum packing described clearly" },
      { field: "Chartered Engineer Vetting", status: "PASS", message: "Endorsed by Empanelled Chartered Engineer" }
    ]
  },
  {
    id: "doc-building-plan",
    fileName: "Building_Plan.pdf",
    documentType: "Factory Building & Site Plan",
    category: "Engineering & Safety",
    source: "Direct Upload",
    issuer: "Licensed Structural Architect",
    issuerCode: "COA-ARCH",
    uploadDate: "15 June 2026",
    size: "8.6 MB",
    status: "Issue Found",
    issueType: "Survey & Coordinate Discrepancy",
    sha256Hash: "f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8",
    digitalSignature: {
      status: "UNVERIFIED",
      algorithm: "SHA256withRSA",
      certIssuer: "Council of Architecture Member Token",
      validUntil: "31 Dec 2026",
      timestamp: "15 Jun 2026 11:05:49 IST"
    },
    piiProtection: {
      dpdpCompliant: true,
      dataMinimization: "Site Drawing Coordinates"
    },
    extractedData: {
      companyName: "ABC Industries Pvt Ltd",
      plotNumber: "Plot No. A-42/1",
      surveyNumber: "123/4",
      siteAddress: "Chakan Industrial Zone, Pune",
      coveredAreaSqM: "4,820 Sq.M",
      architectLicense: "CA/2012/58912"
    },
    validations: [
      { field: "Company Name Match", status: "WARNING", message: "Drawing title block reads 'ABC Industries Pvt Ltd' instead of 'ABC Food Processing Pvt Ltd'" },
      { field: "Survey Number Consistency", status: "FAIL", message: "Survey number extracted as '123/4'. Lease deed records '123/4B'. Needs verification or correction." },
      { field: "Fire Setback Clearance", status: "PASS", message: "9-meter peripheral driveway complies with NBC fire norms" },
      { field: "Ventilation Ratio", status: "PASS", message: "Window-to-floor area ratio is 16.2% (>10% required under Factories Act)" }
    ],
    resolutionHint: "Re-upload the revised architectural layout drawing with matching corporate title 'ABC Food Processing Pvt Ltd' and rectified survey identifier '123/4B'."
  },
  {
    id: "doc-water-test",
    fileName: "NABL_Water_Quality_Analysis.pdf",
    documentType: "Water Test Report",
    category: "Environmental & Health",
    source: "Direct Upload",
    issuer: "SGS India NABL Accredited Laboratory",
    issuerCode: "NABL-LAB",
    uploadDate: "28 June 2026",
    size: "1.1 MB",
    status: "Valid",
    sha256Hash: "4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d",
    digitalSignature: {
      status: "VALID",
      algorithm: "SHA256withRSA",
      certIssuer: "NABL Authorized Signatory Token",
      validUntil: "30 Sep 2028",
      timestamp: "28 Jun 2026 09:45:00 IST"
    },
    piiProtection: {
      dpdpCompliant: true,
      dataMinimization: "Water Quality Potability Parameters"
    },
    extractedData: {
      laboratory: "SGS India NABL Accredited Lab",
      sampleSource: "MIDC Industrial Supply & Borewell Blend",
      potabilityStandard: "IS 10500:2012 Compliant",
      tdsMgL: "240 mg/L",
      coliformCount: "Nil / 100ml"
    },
    validations: [
      { field: "IS 10500 Potability Test", status: "PASS", message: "All chemical and microbiological parameters within permissible limits for food manufacturing" },
      { field: "Lab NABL Accreditation Validity", status: "PASS", message: "Certificate valid until 2028" }
    ]
  },
  {
    id: "doc-fire-layout",
    fileName: "Fire_Evacuation_Layout.pdf",
    documentType: "Fire Safety Drawings",
    category: "Safety & Emergency",
    source: "Direct Upload",
    issuer: "Certified Fire Safety Consultant (DISH/MFES)",
    issuerCode: "MFES-CONS",
    uploadDate: "05 July 2026",
    size: "4.8 MB",
    status: "Valid",
    sha256Hash: "7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c",
    digitalSignature: {
      status: "VALID",
      algorithm: "SHA256withRSA",
      certIssuer: "MFES Authorized Fire Auditor",
      validUntil: "14 Jan 2027",
      timestamp: "05 Jul 2026 15:18:30 IST"
    },
    piiProtection: {
      dpdpCompliant: true,
      dataMinimization: "Fire Egress & Hydrant Layout"
    },
    extractedData: {
      emergencyExits: "4 dedicated fire exits",
      hydrantRisers: "6 internal landing valves",
      undergroundStaticTank: "100,000 Litres",
      sprinklerCoverage: "100% processing and warehouse zones"
    },
    validations: [
      { field: "NBC 2016 Part 4 Compliance", status: "PASS", message: "Hydrant spacing and egress travel distances satisfy Part 4 norms" }
    ]
  }
];

export const availableDigiLockerDocs = [
  {
    id: "dl-coi",
    docCode: "MCA_COI",
    title: "Certificate of Incorporation (COI)",
    issuer: "Ministry of Corporate Affairs (MCA21)",
    issuerDept: "MCA, Govt of India",
    category: "Corporate",
    docType: "Certificate of Incorporation",
    fileName: "MCA_Certificate_Incorporation_ABC_Food.pdf",
    size: "820 KB",
    cinNumber: "U15400MH2024PTC392811",
    sha256: "e7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8",
    certIssuer: "MCA21 PKI Class 3 Sub-CA",
    extractedData: {
      companyName: "ABC Food Processing Private Limited",
      cin: "U15400MH2024PTC392811",
      incorporationDate: "14/02/2024",
      registeredOffice: "Chakan Industrial Zone, Pune - 410501",
      authorizedCapital: "₹10,00,000"
    }
  },
  {
    id: "dl-udyam",
    docCode: "MSME_UDYAM",
    title: "Udyam MSME Registration Certificate",
    issuer: "Ministry of Micro, Small & Medium Enterprises",
    issuerDept: "Ministry of MSME, Govt of India",
    category: "Corporate",
    docType: "MSME Registration",
    fileName: "Udyam_Registration_Certificate_ABC_Food.pdf",
    size: "650 KB",
    udyamNumber: "UDYAM-MH-26-0038912",
    sha256: "b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2",
    certIssuer: "Udyam Portal NIC Digital Signer",
    extractedData: {
      enterpriseName: "ABC Food Processing Private Limited",
      udyamRegNo: "UDYAM-MH-26-0038912",
      enterpriseCategory: "Small Enterprise",
      majorActivity: "Manufacturing",
      nic2Digit: "10 - Manufacture of food products"
    }
  },
  {
    id: "dl-pan",
    docCode: "ITD_PAN",
    title: "Verified e-PAN (Income Tax Department)",
    issuer: "Income Tax Department",
    issuerDept: "Ministry of Finance, Govt of India",
    category: "Corporate",
    docType: "Company PAN",
    fileName: "PAN_Card_ABC_Food.pdf",
    size: "420 KB",
    sha256: "8f4b2a7e91c3d5f6a8b0e2c4d6f8a0b2c4e6f8a0b2c4d6e8f0a2b4c6d8e0f2a4",
    certIssuer: "e-Mudhra CA / Income Tax Sub-CA",
    extractedData: {
      entityName: "ABC Food Processing Private Limited",
      panNumber: "AAACA1234F",
      incorporationDate: "14/02/2024",
      entityType: "Private Limited Company"
    }
  },
  {
    id: "dl-land",
    docCode: "MIDC_712",
    title: "Digital 7/12 Land Record & MIDC Lease Deed",
    issuer: "Mahabhumi State Revenue Portal & MIDC",
    issuerDept: "Govt of Maharashtra",
    category: "Land & Site",
    docType: "Land Allotment / Lease Deed",
    fileName: "MIDC_Lease_Deed_Chakan.pdf",
    size: "2.4 MB",
    sha256: "d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4",
    certIssuer: "NIC Mahabhumi Sub-CA",
    extractedData: {
      entityName: "ABC Food Processing Private Limited",
      plotNumber: "Plot No. A-42/1",
      sector: "Sector 3",
      industrialArea: "Chakan Industrial Zone, MIDC Phase II",
      areaSqM: "8093.71 Sq.M (2.00 Acres)",
      leaseTenure: "95 Years"
    }
  }
];

export const simulatedAuditLogs = [
  {
    id: "LOG-9021",
    timestamp: "11 Sep 2026 21:40:12 IST",
    actor: "OFFICER-MPCB-4491",
    role: "Sub-Regional Officer (MPCB)",
    department: "Maharashtra Pollution Control Board",
    action: "DECRYPT_VIEW_DOCUMENT",
    targetDoc: "NABL_Water_Quality_Analysis.pdf",
    tokenExpiry: "15 min (Ephemeral Token)",
    sha256State: "4c5d6e7f8a9b...2a3b",
    status: "AUTHORIZED",
    ipAddress: "10.42.18.91 (Govt Intranet)",
    purpose: "Consent to Establish (CTE) Scrutiny"
  },
  {
    id: "LOG-9020",
    timestamp: "11 Sep 2026 19:15:33 IST",
    actor: "SYSTEM_DIGILOCKER_GATEWAY",
    role: "DEPA Consent Consumer",
    department: "MeitY / Digital India Rail",
    action: "ISSUER_CRYPTOGRAPHIC_PULL",
    targetDoc: "PAN_Card_ABC_Food.pdf",
    tokenExpiry: "Direct X.509 Ingestion",
    sha256State: "8f4b2a7e91c3...e0f2",
    status: "X.509_VERIFIED",
    ipAddress: "164.100.128.45 (NIC Gateway)",
    purpose: "Consent Artefact: DEPA-CONSENT-2026-MH-9941"
  },
  {
    id: "LOG-9019",
    timestamp: "11 Sep 2026 16:50:04 IST",
    actor: "OFFICER-DISH-1024",
    role: "Joint Director of Industrial Safety",
    department: "Directorate of Industrial Safety & Health (DISH)",
    action: "SCRUTINY_QUERY_RAISED",
    targetDoc: "Building_Plan.pdf",
    tokenExpiry: "Session Closed",
    sha256State: "f9e8d7c6b5a4...b1a0",
    status: "FLAGGED_DISCREPANCY",
    ipAddress: "10.42.30.12 (DISH Mumbai HQ)",
    purpose: "Survey Number 123/4 vs 123/4B mismatch check"
  },
  {
    id: "LOG-9018",
    timestamp: "11 Sep 2026 11:22:18 IST",
    actor: "ENTREPRENEUR-USER-8821",
    role: "Applicant / Authorized Signatory",
    department: "ABC Food Processing Pvt Ltd",
    action: "DEPA_CONSENT_GRANTED",
    targetDoc: "Multi-Doc Issuer Consent Artefact",
    tokenExpiry: "Valid for 30 Days",
    sha256State: "e3b0c44298fc...b855",
    status: "OTP_AUTHENTICATED",
    ipAddress: "157.34.120.18 (Applicant Session)",
    purpose: "Industrial Single Window Clearance Dossier"
  }
];
