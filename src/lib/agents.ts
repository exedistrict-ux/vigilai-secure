import { Brain, ShieldAlert, Newspaper, Phone, Video, Users, Globe, BookOpen, FileText, LucideIcon } from "lucide-react";

export type Agent = {
  id: string;
  name: string;
  short: string;
  description: string;
  icon: LucideIcon;
};

export const AGENTS: Agent[] = [
  { id: "orchestrator", name: "Orchestrator Agent", short: "Routes & coordinates analysis", description: "Coordinates the multi-agent pipeline and aggregates verdicts.", icon: Brain },
  { id: "scam", name: "Scam Detection Agent", short: "Identifies scam patterns", description: "Detects phishing, fraud, and impersonation attempts.", icon: ShieldAlert },
  { id: "fakenews", name: "Fake News Verification Agent", short: "Verifies claims & sources", description: "Cross-references claims with trusted sources.", icon: Newspaper },
  { id: "arrest", name: "Digital Arrest Scam Agent", short: "Detects authority impersonation", description: "Spots fake police/court/CBI extortion patterns.", icon: Phone },
  { id: "deepfake", name: "Deepfake Detection Agent", short: "Audio/video manipulation check", description: "Analyzes media for synthetic generation artifacts.", icon: Video },
  { id: "social", name: "Social Engineering Agent", short: "Manipulation tactic analysis", description: "Identifies urgency, fear, and trust-exploitation cues.", icon: Users },
  { id: "intel", name: "Threat Intelligence Agent", short: "Cross-references threat DBs", description: "Checks indicators against threat intelligence feeds.", icon: Globe },
  { id: "guidance", name: "User Guidance Agent", short: "Actionable safety advice", description: "Generates personalized recommendations.", icon: BookOpen },
  { id: "report", name: "Evidence & Report Agent", short: "Compiles forensic report", description: "Builds the final downloadable evidence report.", icon: FileText },
];
