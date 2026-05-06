import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { AGENTS } from "@/lib/agents";
import { ShieldAlert, Newspaper, Phone, Video, Users, Globe, ArrowRight, Sparkles, Zap, Lock, Activity } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { DigitalArrestHighlight } from "@/components/DigitalArrestHighlight";
import { ScreenshotsGallery } from "@/components/ScreenshotsGallery";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";

const detections = [
  { icon: ShieldAlert, title: "Scam Detection", desc: "Phishing, fraud & impersonation patterns" },
  { icon: Video, title: "Deepfake Analysis", desc: "Synthetic media & voice clone detection" },
  { icon: Newspaper, title: "Fake News Verification", desc: "Cross-source claim validation" },
  { icon: Phone, title: "Digital Arrest Scams", desc: "Authority impersonation & extortion" },
  { icon: Users, title: "Social Engineering", desc: "Manipulation tactic profiling" },
  { icon: Globe, title: "Threat Intelligence", desc: "Live threat feed correlation" },
  { icon: Lock, title: "Phishing Defense", desc: "Malicious URL & payload scanning" },
  { icon: Activity, title: "Real-time Reports", desc: "Forensic evidence compilation" },
];

const partners = ["Arize AI", "Elastic", "Fivetran", "Google Cloud"];

const Counter = ({ end, label, suffix = "" }: { end: number; label: string; suffix?: string }) => {
  const [n, setN] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const dur = 1800;
    const step = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      setN(Math.floor(end * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end]);
  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-gradient">{n.toLocaleString()}{suffix}</div>
      <div className="text-sm text-muted-foreground mt-2">{label}</div>
    </div>
  );
};

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-glow)" }} />
        <div className="container relative py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-card/50 backdrop-blur text-xs text-muted-foreground mb-8 animate-fade-in-up">
              <Sparkles className="h-3 w-3 text-accent" />
              Powered by 9 specialized AI agents
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight animate-fade-in-up">
              The AI Shield Against<br />
              <span className="text-gradient">Modern Cyber Threats</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mt-6 mb-2 animate-fade-in-up">
              <span className="font-semibold text-foreground">Detect. Verify. Protect.</span>
            </p>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto animate-fade-in-up">
              VigilAI orchestrates a multi-agent intelligence pipeline to detect scams, deepfakes,
              fake news, and digital arrest fraud — in seconds.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-10 animate-fade-in-up">
              <Button asChild variant="hero" size="lg">
                <Link to="/dashboard">Start Protecting Yourself <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/history">View Reports</Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-20">
            <Counter end={2847291} label="Threats Analyzed" />
            <Counter end={98} label="Detection Accuracy" suffix="%" />
            <Counter end={9} label="AI Agents Active" />
          </div>
        </div>
      </section>

      {/* Detections */}
      <section className="container py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-widest text-accent font-semibold mb-3">Detection Suite</div>
          <h2 className="text-3xl md:text-4xl font-bold">8 Threat Categories. One Platform.</h2>
          <p className="text-muted-foreground mt-4">Comprehensive coverage across the modern threat landscape.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {detections.map((d, i) => {
            const Icon = d.icon;
            return (
              <div key={i} className="group relative rounded-xl border border-border bg-card p-6 hover:border-primary/50 transition-all hover:-translate-y-1 duration-300">
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                     style={{ background: "var(--gradient-hero)" }} />
                <div className="relative">
                  <div className="inline-flex p-2.5 rounded-lg bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold mb-1">{d.title}</h3>
                  <p className="text-sm text-muted-foreground">{d.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Agent Pipeline */}
      <section className="container py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-widest text-accent font-semibold mb-3">Architecture</div>
          <h2 className="text-3xl md:text-4xl font-bold">9-Agent Intelligence Pipeline</h2>
          <p className="text-muted-foreground mt-4">Each agent specializes in a single threat vector. Together they form an unbreakable line of defense.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-3 max-w-5xl mx-auto">
          {AGENTS.map((a, i) => {
            const Icon = a.icon;
            return (
              <div key={a.id} className="rounded-xl border border-border bg-card/50 p-4 flex items-start gap-3 hover:border-accent/40 transition-colors">
                <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 text-accent shrink-0">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-muted-foreground">Agent {String(i+1).padStart(2,"0")}</div>
                  <div className="font-medium text-sm">{a.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">{a.short}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Partners */}
      <section className="container py-16 border-t border-border">
        <div className="text-xs uppercase tracking-widest text-muted-foreground text-center mb-8">Powered by industry leaders</div>
        <div className="flex flex-wrap justify-center gap-3">
          {partners.map(p => (
            <div key={p} className="px-5 py-2.5 rounded-full border border-border bg-card text-sm text-muted-foreground hover:border-accent/40 hover:text-foreground transition-colors">
              {p}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container py-20">
        <div className="relative rounded-2xl border border-border overflow-hidden p-12 md:p-16 text-center"
             style={{ background: "var(--gradient-hero)" }}>
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="relative">
            <Zap className="h-10 w-10 mx-auto text-accent mb-4 animate-float" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to outsmart the scammers?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">Run your first analysis in under 10 seconds. No signup required.</p>
            <Button asChild variant="hero" size="lg">
              <Link to="/dashboard">Launch VigilAI <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} VigilAI · Detect. Verify. Protect.
        </div>
      </footer>
    </div>
  );
};

export default Landing;
