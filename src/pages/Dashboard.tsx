import { Navbar } from "@/components/Navbar";
import { AgentPipeline } from "@/components/AgentPipeline";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Upload, FileText, Link2, Sparkles, ShieldCheck } from "lucide-react";
import { runMockAnalysis, saveReport } from "@/lib/storage";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [tab, setTab] = useState("text");
  const [running, setRunning] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [done, setDone] = useState<number[]>([]);

  const start = async () => {
    let input = "";
    let type: "text" | "url" | "file" = "text";
    if (tab === "text") { input = text.trim(); type = "text"; }
    else if (tab === "url") { input = url.trim(); type = "url"; }
    else if (tab === "file" && file) { input = file.name; type = "file"; }

    if (!input) { toast.error("Provide content to analyze"); return; }

    setRunning(true);
    setDone([]);
    setActiveIdx(0);

    for (let i = 0; i < 9; i++) {
      setActiveIdx(i);
      await new Promise(r => setTimeout(r, 450 + Math.random() * 350));
      setDone(prev => [...prev, i]);
    }

    const report = runMockAnalysis(type, input);
    const saved = await saveReport(report);
    setRunning(false);
    setActiveIdx(-1);
    toast.success("Analysis complete");
    navigate(`/result?id=${saved.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-10">
        <div className="flex items-center gap-3 mb-2">
          <ShieldCheck className="h-6 w-6 text-accent" />
          <h1 className="text-3xl font-bold">Threat Analysis Console</h1>
        </div>
        <p className="text-muted-foreground mb-8">Submit any suspicious content. The 9-agent pipeline will run in real-time.</p>

        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2 space-y-6" data-tour="dash-input">
            <div className="rounded-2xl border border-border bg-card p-6">
              <Tabs value={tab} onValueChange={setTab}>
                <TabsList className="grid grid-cols-3 w-full mb-5">
                  <TabsTrigger value="text"><FileText className="h-4 w-4 mr-2" />Text</TabsTrigger>
                  <TabsTrigger value="url"><Link2 className="h-4 w-4 mr-2" />URL</TabsTrigger>
                  <TabsTrigger value="file"><Upload className="h-4 w-4 mr-2" />File</TabsTrigger>
                </TabsList>
                <TabsContent value="text">
                  <Textarea
                    placeholder="Paste suspicious message, email, or text here..."
                    value={text} onChange={e => setText(e.target.value)}
                    className="min-h-[180px] bg-background resize-none"
                  />
                </TabsContent>
                <TabsContent value="url">
                  <Input placeholder="https://suspicious-site.com" value={url} onChange={e => setUrl(e.target.value)} className="bg-background" />
                </TabsContent>
                <TabsContent value="file">
                  <label className="flex flex-col items-center justify-center min-h-[180px] border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 hover:bg-secondary/30 transition-all">
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <div className="text-sm text-muted-foreground">{file?.name || "Click to upload audio, video, image or document"}</div>
                    <input type="file" className="hidden" onChange={e => setFile(e.target.files?.[0] || null)} />
                  </label>
                </TabsContent>
              </Tabs>

              <Button data-tour="dash-analyze" variant="hero" size="lg" className="w-full mt-5" onClick={start} disabled={running}>
                <Sparkles className="h-4 w-4" />
                {running ? "Analyzing…" : "Run Analysis"}
              </Button>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="text-xs uppercase tracking-widest text-accent font-semibold mb-2">Sample threats</div>
              <p className="text-sm text-muted-foreground mb-3">Try one of these to see the pipeline in action:</p>
              <div className="space-y-2">
                {[
                  "URGENT: Your account is suspended. Click here to verify your bank details immediately.",
                  "This is CBI officer Singh. A warrant has been issued for your arrest. Pay to avoid custody.",
                  "Congratulations! You won a lottery of $1,000,000. Share your OTP to claim the prize.",
                ].map((s, i) => (
                  <button key={i} onClick={() => { setTab("text"); setText(s); }}
                          className="w-full text-left text-xs p-3 rounded-lg bg-secondary hover:bg-secondary/70 text-muted-foreground hover:text-foreground transition-colors">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3" data-tour="dash-pipeline">
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <div className="text-xs uppercase tracking-widest text-accent font-semibold">Live Pipeline</div>
                  <h2 className="text-lg font-semibold mt-1">Agent Status</h2>
                </div>
                <div className={`flex items-center gap-2 text-xs ${running ? "text-accent" : "text-muted-foreground"}`}>
                  <span className={`h-2 w-2 rounded-full ${running ? "bg-accent animate-pulse" : "bg-muted-foreground"}`} />
                  {running ? "ANALYZING" : "STANDBY"}
                </div>
              </div>
              <AgentPipeline activeIndex={activeIdx} doneIndices={done} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
