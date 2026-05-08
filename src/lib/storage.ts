import { supabase } from "@/integrations/supabase/client";

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

type Row = {
  id: string;
  created_at: string;
  input_type: string;
  input_content: string;
  threat_category: string;
  risk_score: number;
  summary: string;
  findings: unknown;
  recommendations: unknown;
};

const rowToReport = (r: Row): Report => ({
  id: r.id,
  createdAt: new Date(r.created_at).getTime(),
  inputType: r.input_type as Report["inputType"],
  inputPreview: r.input_content,
  category: r.threat_category as ThreatCategory,
  riskScore: r.risk_score,
  summary: r.summary,
  findings: (r.findings as AgentFinding[]) || [],
  recommendations: (r.recommendations as string[]) || [],
});

export const getReports = async (): Promise<Report[]> => {
  const { data, error } = await supabase
    .from("threat_analyses")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);
  if (error) { console.error(error); return []; }
  return (data as Row[]).map(rowToReport);
};

export const getReport = async (id: string): Promise<Report | null> => {
  if (!id) return null;
  const { data, error } = await supabase
    .from("threat_analyses")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error || !data) return null;
  return rowToReport(data as Row);
};

export const saveReport = async (r: Report): Promise<Report> => {
  const { data, error } = await supabase
    .from("threat_analyses")
    .insert({
      input_type: r.inputType,
      input_content: r.inputPreview,
      threat_category: r.category,
      risk_score: r.riskScore,
      summary: r.summary,
      findings: r.findings as never,
      recommendations: r.recommendations as never,
    })
    .select()
    .single();
  if (error || !data) { console.error(error); return r; }
  return rowToReport(data as Row);
};

// Mock analysis — replace with real Gemini call via edge function later
export const runMockAnalysis = (inputType: Report["inputType"], input: string): Report => {
  const lower = input.toLowerCase();
  let category: ThreatCategory = "Safe";
  let risk = 10;

  const suspiciousUrl = inputType === "url" && /\.(xyz|tk|ml|ga|cf|top|click)(\/|$)|bit\.ly|tinyurl|free-|winner|claim-now/.test(lower);

  if (/police|arrest|cbi|warrant|court|custody/.test(lower)) { category = "Digital Arrest"; risk = 92; }
  else if (/deepfake|ai.generated|synthetic|cloned voice/.test(lower)) { category = "Deepfake"; risk = 84; }
  else if (/lottery|winner|prize|claim.*reward|otp|urgent.*pay|sbi|bank.*block|account.*block/.test(lower)) { category = "Scam"; risk = 88; }
  else if (suspiciousUrl) { category = "Phishing"; risk = 65; }
  else if (/click here|verify.*account|suspended|bank.*confirm/.test(lower)) { category = "Phishing"; risk = 79; }
  else if (/breaking|shocking|they don.t want you|cure|miracle/.test(lower)) { category = "Fake News"; risk = 71; }
  else if (/trust me|secret|don.t tell|act now|limited time/.test(lower)) { category = "Social Engineering"; risk = 64; }
  else { risk = Math.floor(Math.random() * 20) + 5; }


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
