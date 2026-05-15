import { Navbar } from "@/components/Navbar";
import { RiskMeter } from "@/components/RiskMeter";
import { Button } from "@/components/ui/button";
import { AGENTS } from "@/lib/agents";
import { getReport, type Report } from "@/lib/storage";
import { Link, useSearchParams } from "react-router-dom";
import { AlertTriangle, ArrowLeft, Check, Download, FileText, Lightbulb, ShieldAlert } from "lucide-react";
import jsPDF from "jspdf";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const statusStyle = {
  clear: "text-success border-success/30 bg-success/10",
  suspicious: "text-warning border-warning/30 bg-warning/10",
  malicious: "text-destructive border-destructive/30 bg-destructive/10",
} as const;

const Result = () => {
  const [params] = useSearchParams();
  const id = params.get("id") || "";
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    getReport(id).then(r => { if (active) { setReport(r); setLoading(false); } });
    return () => { active = false; };
  }, [id]);

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

  const downloadPdf = () => {
    if (!report) return;
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const margin = 40;
    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    let y = margin;

    const addLine = (text: string, opts: { size?: number; bold?: boolean; color?: [number, number, number] } = {}) => {
      const { size = 10, bold = false, color = [30, 30, 30] } = opts;
      doc.setFont("helvetica", bold ? "bold" : "normal");
      doc.setFontSize(size);
      doc.setTextColor(...color);
      const lines = doc.splitTextToSize(text, pageW - margin * 2);
      for (const ln of lines) {
        if (y > pageH - margin) { doc.addPage(); y = margin; }
        doc.text(ln, margin, y);
        y += size + 4;
      }
    };

    addLine("VigilAI Threat Analysis Report", { size: 18, bold: true, color: [20, 100, 200] });
    addLine(`Report ID: ${report.id}`, { size: 9, color: [120, 120, 120] });
    addLine(`Generated: ${new Date(report.createdAt).toLocaleString()}`, { size: 9, color: [120, 120, 120] });
    y += 8;
    const high = report.riskScore >= 61;
    addLine(`Category: ${report.category}`, { size: 12, bold: true });
    addLine(`Risk Score: ${report.riskScore}/100`, { size: 12, bold: true, color: high ? [200, 40, 40] : [40, 160, 80] });
    y += 6;
    addLine("Analyzed Input", { size: 11, bold: true });
    addLine(report.inputPreview);
    y += 6;
    addLine("Summary", { size: 11, bold: true });
    addLine(report.summary);
    y += 6;
    addLine("Agent Findings", { size: 11, bold: true });
    report.findings.forEach(f => {
      const a = AGENTS.find(x => x.id === f.agentId);
      const color: [number, number, number] = f.status === "malicious" ? [200, 40, 40] : f.status === "suspicious" ? [200, 140, 40] : [40, 160, 80];
      addLine(`[${f.status.toUpperCase()}] ${a?.name} (${f.confidence}%)`, { bold: true, color });
      addLine(`  ${f.notes}`);
    });
    y += 6;
    addLine("Recommendations", { size: 11, bold: true });
    report.recommendations.forEach((r, i) => addLine(`${i + 1}. ${r}`));
    y += 12;
    addLine("— VigilAI · Detect. Verify. Protect.", { size: 9, color: [120, 120, 120] });

    doc.save(`vigilai-report-${report.id.slice(0, 8)}.pdf`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-20 text-center text-muted-foreground">Loading report…</div>
      </div>
    );
  }

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

  const high = report.riskScore >= 61;

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
