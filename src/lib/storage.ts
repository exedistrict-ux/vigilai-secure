export type ThreatCategory = "Scam" | "Deepfake" | "Fake News" | "Digital Arrest" | "Social Engineering" | "Phishing" | "Safe";

export type AgentFinding = {
  agentId: string;
  status: "clear" | "suspicious" | "malicious";
  confidence: number;
  notes: string;
};

export type Report = {
  id: string;
  createdAt: number;
  inputType: "text" | "url" | "file";
  inputPreview: string;
  category: ThreatCategory;
  riskScore: number;
  summary: string;
  findings: AgentFinding[];
  recommendations: string[];
};

const KEY = "vigilai_reports_v1";

export const getReports = (): Report[] => {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
};

export const saveReport = (r: Report) => {
  const all = getReports();
  all.unshift(r);
  localStorage.setItem(KEY, JSON.stringify(all.slice(0, 100)));
};

export const getReport = (id: string) => getReports().find(r => r.id === id);

// Mock analysis — replace with real Gemini call via edge function later
export const runMockAnalysis = (inputType: Report["inputType"], input: string): Report => {
  const lower = input.toLowerCase();
  let category: ThreatCategory = "Safe";
  let risk = 10;

  if (/police|arrest|cbi|warrant|court|custody/.test(lower)) { category = "Digital Arrest"; risk = 92; }
  else if (/deepfake|ai.generated|synthetic|cloned voice/.test(lower)) { category = "Deepfake"; risk = 84; }
  else if (/lottery|winner|prize|claim.*reward|otp|urgent.*pay/.test(lower)) { category = "Scam"; risk = 88; }
  else if (/click here|verify.*account|suspended|bank.*confirm/.test(lower)) { category = "Phishing"; risk = 79; }
  else if (/breaking|shocking|they don.t want you|cure|miracle/.test(lower)) { category = "Fake News"; risk = 71; }
  else if (/trust me|secret|don.t tell|act now|limited time/.test(lower)) { category = "Social Engineering"; risk = 64; }
  else { risk = Math.floor(Math.random() * 25) + 5; }

  const findings: AgentFinding[] = [
    { agentId: "orchestrator", status: "clear", confidence: 99, notes: "Pipeline executed across 8 specialist agents." },
    { agentId: "scam", status: category === "Scam" || category === "Phishing" ? "malicious" : "clear", confidence: category === "Scam" ? 94 : 22, notes: category === "Scam" ? "Matches known scam patterns: urgency + monetary lure." : "No scam indicators." },
    { agentId: "fakenews", status: category === "Fake News" ? "malicious" : "clear", confidence: category === "Fake News" ? 87 : 18, notes: category === "Fake News" ? "Claims unverified across trusted sources." : "No misinformation detected." },
    { agentId: "arrest", status: category === "Digital Arrest" ? "malicious" : "clear", confidence: category === "Digital Arrest" ? 96 : 12, notes: category === "Digital Arrest" ? "Authority impersonation + custody threat detected." : "No impersonation patterns." },
    { agentId: "deepfake", status: category === "Deepfake" ? "malicious" : "clear", confidence: category === "Deepfake" ? 89 : 15, notes: category === "Deepfake" ? "Synthetic generation artifacts identified." : "No manipulation signals." },
    { agentId: "social", status: risk > 60 ? "suspicious" : "clear", confidence: risk > 60 ? 78 : 25, notes: risk > 60 ? "Manipulation cues: urgency, fear-induction." : "Neutral language." },
    { agentId: "intel", status: risk > 70 ? "suspicious" : "clear", confidence: risk > 70 ? 72 : 30, notes: risk > 70 ? "Indicators correlate with active campaigns." : "No threat-intel matches." },
    { agentId: "guidance", status: "clear", confidence: 100, notes: "Recommendations generated." },
    { agentId: "report", status: "clear", confidence: 100, notes: "Forensic report compiled." },
  ];

  const recommendations = risk > 60 ? [
    "Do not respond, click links, or share OTPs / personal data.",
    "Report to cybercrime.gov.in or your local cybercrime cell.",
    "Block the sender and preserve screenshots as evidence.",
    "Verify any 'authority' claim via official channels independently.",
  ] : [
    "Content appears low-risk, but stay vigilant.",
    "Continue verifying senders before sharing sensitive information.",
  ];

  return {
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    inputType,
    inputPreview: input.slice(0, 200),
    category,
    riskScore: risk,
    summary: risk > 60
      ? `High-confidence ${category} threat detected. Multiple agents flagged malicious indicators.`
      : `No significant threats detected. Content classified as ${category}.`,
    findings,
    recommendations,
  };
};
