import { Navbar } from "@/components/Navbar";
import { RiskMeter } from "@/components/RiskMeter";
import { Button } from "@/components/ui/button";
import { AGENTS } from "@/lib/agents";
import { getReport } from "@/lib/storage";
import { Link, useSearchParams } from "react-router-dom";
import { AlertTriangle, ArrowLeft, Check, Download, Lightbulb, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

const statusStyle = {
  clear: "text-success border-success/30 bg-success/10",
  suspicious: "text-warning border-warning/30 bg-warning/10",
  malicious: "text-destructive border-destructive/30 bg-destructive/10",
} as const;

const Result = () => {
  const [params] = useSearchParams();
  const id = params.get("id") || "";
  const report = getReport(id);

  const downloadReport = () => {
    if (!report) return;
    const txt = `VIGILAI THREAT ANALYSIS REPORT
================================
Report ID: ${report.id}
Generated: ${new Date(report.createdAt).toLocaleString()}

Category: ${report.category}
Risk Score: ${report.riskScore}/100

INPUT
-----
${report.inputPreview}

SUMMARY
-------
${report.summary}

AGENT FINDINGS
--------------
${report.findings.map(f => {
  const a = AGENTS.find(x => x.id === f.agentId);
  return `[${f.status.toUpperCase()}] ${a?.name} (${f.confidence}%)\n  ${f.notes}`;
}).join("\n\n")}

RECOMMENDATIONS
---------------
${report.recommendations.map((r, i) => `${i+1}. ${r}`).join("\n")}

— VigilAI · Detect. Verify. Protect.`;
    const blob = new Blob([txt], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `vigilai-report-${report.id.slice(0,8)}.txt`;
    a.click();
  };

  if (!report) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Report not found</h1>
          <Button asChild variant="hero"><Link to="/dashboard">Run a new analysis</Link></Button>
        </div>
      </div>
    );
  }

  const high = report.riskScore >= 70;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-10">
        <Button asChild variant="ghost" size="sm" className="mb-6">
          <Link to="/dashboard"><ArrowLeft className="h-4 w-4" /> New Analysis</Link>
        </Button>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-8">
            <div className={cn("inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold mb-4",
              high ? "border-destructive/40 bg-destructive/10 text-destructive" : "border-success/40 bg-success/10 text-success")}>
              {high ? <AlertTriangle className="h-3.5 w-3.5" /> : <Check className="h-3.5 w-3.5" />}
              THREAT CATEGORY: {report.category.toUpperCase()}
            </div>
            <h1 className="text-3xl font-bold mb-3">{high ? "Threat Detected" : "Content Verified Safe"}</h1>
            <p className="text-muted-foreground mb-6">{report.summary}</p>
            <div className="rounded-lg bg-secondary/50 border border-border p-4 mb-6">
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Analyzed Input</div>
              <p className="text-sm">{report.inputPreview}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="hero" onClick={downloadReport}><Download className="h-4 w-4" /> Download Report</Button>
              <Button asChild variant="outline"><Link to="/history">View History</Link></Button>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8 flex items-center justify-center" data-tour="risk-meter">
            <RiskMeter score={report.riskScore} />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 mb-5">
              <ShieldAlert className="h-5 w-5 text-accent" />
              <h2 className="text-lg font-semibold">Agent Breakdown</h2>
            </div>
            <div className="space-y-3">
              {report.findings.map(f => {
                const a = AGENTS.find(x => x.id === f.agentId)!;
                const Icon = a.icon;
                return (
                  <div key={f.agentId} className="flex items-start gap-4 p-4 rounded-lg border border-border bg-secondary/30">
                    <div className="p-2 rounded-lg bg-secondary text-accent shrink-0">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-3 mb-1 flex-wrap">
                        <div className="font-medium text-sm">{a.name}</div>
                        <div className={cn("px-2 py-0.5 rounded text-[10px] font-semibold border uppercase tracking-wider", statusStyle[f.status])}>
                          {f.status} · {f.confidence}%
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">{f.notes}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 h-fit">
            <div className="flex items-center gap-2 mb-5">
              <Lightbulb className="h-5 w-5 text-accent" />
              <h2 className="text-lg font-semibold">Safety Recommendations</h2>
            </div>
            <ul className="space-y-3">
              {report.recommendations.map((r, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <div className="h-5 w-5 rounded-full bg-primary/20 text-primary text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">{i+1}</div>
                  <span className="text-muted-foreground">{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
