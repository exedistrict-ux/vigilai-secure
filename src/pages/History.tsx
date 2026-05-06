import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getReports, ThreatCategory } from "@/lib/storage";
import { ArrowRight, History as HistoryIcon, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const History = () => {
  const reports = getReports();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<string>("all");

  const filtered = useMemo(() => reports.filter(r =>
    (filter === "all" || r.category === filter) &&
    (q === "" || r.inputPreview.toLowerCase().includes(q.toLowerCase()))
  ), [reports, q, filter]);

  const categories: (ThreatCategory | "all")[] = ["all", "Scam", "Deepfake", "Fake News", "Digital Arrest", "Social Engineering", "Phishing", "Safe"];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-10">
        <div className="flex items-center gap-3 mb-2">
          <HistoryIcon className="h-6 w-6 text-accent" />
          <h1 className="text-3xl font-bold">Report History</h1>
        </div>
        <p className="text-muted-foreground mb-8">{reports.length} analyses on record</p>

        <div className="flex flex-wrap gap-3 mb-6">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search reports…" value={q} onChange={e => setQ(e.target.value)} className="pl-9 bg-card" />
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[200px] bg-card"><SelectValue /></SelectTrigger>
            <SelectContent>
              {categories.map(c => <SelectItem key={c} value={c}>{c === "all" ? "All Categories" : c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          {filtered.length === 0 ? (
            <div className="p-16 text-center">
              <HistoryIcon className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
              <p className="text-muted-foreground mb-4">No reports yet</p>
              <Button asChild variant="hero"><Link to="/dashboard">Run your first analysis</Link></Button>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-secondary/50 text-xs uppercase tracking-widest text-muted-foreground">
                <tr>
                  <th className="text-left p-4 font-medium">Date</th>
                  <th className="text-left p-4 font-medium">Category</th>
                  <th className="text-left p-4 font-medium">Risk</th>
                  <th className="text-left p-4 font-medium hidden md:table-cell">Input</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(r => {
                  const high = r.riskScore >= 70, mid = r.riskScore >= 40;
                  const badge = high
                    ? "border-destructive/40 bg-destructive/10 text-destructive"
                    : mid
                      ? "border-warning/40 bg-warning/10 text-warning"
                      : "border-success/40 bg-success/10 text-success";
                  const dot = high ? "bg-destructive" : mid ? "bg-warning" : "bg-success";
                  return (
                    <tr key={r.id} className="border-t border-border hover:bg-secondary/30 transition-colors">
                      <td className="p-4 text-sm text-muted-foreground whitespace-nowrap">{new Date(r.createdAt).toLocaleString()}</td>
                      <td className="p-4 text-sm font-medium">{r.category}</td>
                      <td className="p-4">
                        <div className={cn("inline-flex items-center gap-2 px-2.5 py-1 rounded-md border text-xs font-semibold", badge)}>
                          <span className={cn("h-1.5 w-1.5 rounded-full", dot)} />
                          {r.riskScore}
                        </div>
                      </td>
                      <td className="p-4 text-sm text-muted-foreground max-w-md truncate hidden md:table-cell">{r.inputPreview}</td>
                      <td className="p-4 text-right">
                        <Button asChild size="sm" variant="ghost">
                          <Link to={`/result?id=${r.id}`}>View <ArrowRight className="h-3 w-3" /></Link>
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
