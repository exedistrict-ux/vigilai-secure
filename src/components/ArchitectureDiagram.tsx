import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AGENTS } from "@/lib/agents";
import {
  Upload, ScanLine, Brain, Cpu, Gauge, FileText, Download,
  Cloud, Database, HardDrive, BarChart3, Sparkles, Eye, Activity, Workflow,
  ArrowRight, Monitor,
} from "lucide-react";

const Arrow = () => (
  <ArrowRight className="h-4 w-4 text-accent shrink-0 animate-pulse" />
);

const Node = ({
  icon: Icon,
  title,
  sub,
  tone = "primary",
}: {
  icon: any;
  title: string;
  sub?: string;
  tone?: "primary" | "accent" | "warning" | "muted";
}) => {
  const toneMap = {
    primary: "border-primary/40 bg-primary/5 text-primary",
    accent: "border-accent/40 bg-accent/5 text-accent",
    warning: "border-warning/40 bg-warning/5 text-warning",
    muted: "border-border bg-card text-muted-foreground",
  } as const;
  return (
    <div className={`rounded-xl border p-4 min-w-[160px] ${toneMap[tone]}`}>
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4" />
        <div className="text-sm font-semibold text-foreground">{title}</div>
      </div>
      {sub && <div className="text-xs text-muted-foreground mt-1">{sub}</div>}
    </div>
  );
};

const AgentFlow = () => (
  <div className="space-y-8">
    {/* Row 1 */}
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Node icon={Upload} title="User Input" sub="Text · URL · File" tone="muted" />
      <Arrow />
      <Node icon={Brain} title="Orchestrator" sub="Routes & coordinates" tone="primary" />
    </div>

    {/* Parallel agents */}
    <div>
      <div className="text-center text-xs uppercase tracking-widest text-accent font-semibold mb-4">
        8 Specialized Agents · Parallel Execution
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {AGENTS.slice(1, 9).map((a) => {
          const Icon = a.icon;
          return (
            <div
              key={a.id}
              className="rounded-lg border border-border bg-card/50 p-3 hover:border-accent/50 transition-colors text-center"
            >
              <Icon className="h-5 w-5 text-accent mx-auto mb-2 animate-float" />
              <div className="text-xs font-medium">{a.name.replace(" Agent", "")}</div>
            </div>
          );
        })}
      </div>
    </div>

    {/* Row 3 */}
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Node icon={FileText} title="Evidence & Report" sub="Aggregates findings" tone="primary" />
      <Arrow />
      <Node icon={Download} title="Download Report" sub="Forensic PDF/TXT" tone="accent" />
    </div>
  </div>
);

const CloudArch = () => (
  <div className="space-y-6">
    <div className="grid md:grid-cols-3 gap-4 items-stretch">
      <Node icon={Cpu} title="Frontend" sub="React + Vite + Tailwind" tone="primary" />
      <div className="flex items-center justify-center">
        <Arrow />
      </div>
      <Node icon={Cloud} title="Edge Functions" sub="Lovable Cloud · serverless" tone="accent" />
    </div>

    <div className="rounded-xl border border-border bg-gradient-to-br from-primary/5 to-accent/5 p-5">
      <div className="text-xs uppercase tracking-widest text-accent font-semibold mb-4 flex items-center gap-2">
        <Cloud className="h-3 w-3" /> Google Cloud Layer
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
        <Node icon={Sparkles} title="Gemini API" sub="Multimodal LLM" tone="primary" />
        <Node icon={Brain} title="Vertex AI" sub="Agent Builder" tone="primary" />
        <Node icon={Database} title="Firestore" sub="Reports DB" tone="primary" />
        <Node icon={HardDrive} title="Cloud Storage" sub="File uploads" tone="primary" />
        <Node icon={BarChart3} title="BigQuery" sub="Analytics" tone="primary" />
      </div>
    </div>

    <div className="rounded-xl border border-border bg-card/50 p-5">
      <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-4">
        Partner Layer
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <Node icon={Eye} title="Arize AI" sub="AI observability" tone="accent" />
        <Node icon={Monitor} title="Dynatrace" sub="Real-time performance monitoring for all 9 agents" tone="accent" />
        <Node icon={Activity} title="Elastic" sub="Security analytics" tone="accent" />
        <Node icon={Workflow} title="Fivetran" sub="Data pipeline" tone="accent" />
      </div>
    </div>
  </div>
);

const Workflow7 = () => {
  const steps = [
    { icon: Upload, title: "Upload", sub: "text/URL/file" },
    { icon: ScanLine, title: "OCR & Extract", sub: "Data parsing" },
    { icon: Brain, title: "Orchestrator", sub: "Activates agents" },
    { icon: Cpu, title: "Parallel Analysis", sub: "8 agents run" },
    { icon: Gauge, title: "Threat Score", sub: "0–100 risk" },
    { icon: FileText, title: "Report Gen", sub: "Findings compiled" },
    { icon: Download, title: "Download", sub: "Evidence PDF" },
  ];
  return (
    <div className="overflow-x-auto">
      <div className="flex items-stretch gap-3 min-w-max pb-2">
        {steps.map((s, i) => (
          <div key={s.title} className="flex items-center gap-3">
            <div className="rounded-xl border border-border bg-card p-4 w-[160px] hover:border-primary/50 transition-colors">
              <div className="text-[10px] text-muted-foreground mb-2">STEP {i + 1}</div>
              <div className="inline-flex p-2 rounded-lg bg-primary/10 text-primary mb-2">
                <s.icon className="h-4 w-4" />
              </div>
              <div className="text-sm font-semibold">{s.title}</div>
              <div className="text-xs text-muted-foreground">{s.sub}</div>
            </div>
            {i < steps.length - 1 && <Arrow />}
          </div>
        ))}
      </div>
    </div>
  );
};

export const ArchitectureDiagram = () => (
  <div className="rounded-2xl border border-border bg-card/30 p-6 md:p-8">
    <Tabs defaultValue="agent">
      <TabsList className="mb-6">
        <TabsTrigger value="agent">Agent Flow</TabsTrigger>
        <TabsTrigger value="cloud">Cloud Architecture</TabsTrigger>
        <TabsTrigger value="workflow">Workflow Pipeline</TabsTrigger>
      </TabsList>
      <TabsContent value="agent"><AgentFlow /></TabsContent>
      <TabsContent value="cloud"><CloudArch /></TabsContent>
      <TabsContent value="workflow"><Workflow7 /></TabsContent>
    </Tabs>
  </div>
);
