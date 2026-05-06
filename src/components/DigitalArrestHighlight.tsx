import { ShieldOff, AlertTriangle, Eye, Brain, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export const DigitalArrestHighlight = () => (
  <section className="container py-16">
    <div className="relative rounded-2xl border border-destructive/40 overflow-hidden p-8 md:p-12"
         style={{ background: "linear-gradient(135deg, hsl(0 84% 60% / 0.08), hsl(38 92% 50% / 0.05))" }}>
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="relative grid md:grid-cols-[auto,1fr] gap-8 items-center">
        {/* Badge icon */}
        <div className="relative mx-auto md:mx-0">
          <div className="absolute inset-0 bg-destructive/30 blur-2xl rounded-full" />
          <div className="relative w-32 h-32 rounded-full border-2 border-destructive/60 bg-card flex items-center justify-center">
            <ShieldOff className="h-14 w-14 text-destructive" strokeWidth={1.5} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[120%] h-1 bg-destructive rotate-45 rounded-full opacity-90" />
            </div>
          </div>
          <div className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold uppercase">
            Fake
          </div>
        </div>

        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-destructive/40 bg-destructive/10 text-destructive text-xs font-semibold mb-3">
            <AlertTriangle className="h-3 w-3" />
            Fighting India's #1 Digital Crime
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Digital Arrest Scams</h2>
          <p className="text-muted-foreground mb-6">
            Fraudsters impersonate CBI, ED, or Police officers via video call and extort victims
            with fake arrest warrants. VigilAI catches them before they catch you.
          </p>

          <div className="grid sm:grid-cols-3 gap-3 mb-6">
            {[
              { icon: Brain, t: "Authority impersonation pattern recognition" },
              { icon: Eye, t: "Voice stress & video deepfake metadata analysis" },
              { icon: AlertTriangle, t: "Real-time urgency & threat-language scoring" },
            ].map((b, i) => (
              <div key={i} className="rounded-lg border border-destructive/20 bg-card/60 p-3 flex items-start gap-2">
                <b.icon className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                <div className="text-xs">{b.t}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="rounded-lg border border-warning/40 bg-warning/10 px-4 py-2">
              <div className="text-2xl font-bold text-warning">1 in 3</div>
              <div className="text-xs text-muted-foreground">Indians have received a digital arrest call</div>
            </div>
            <Button asChild variant="hero" size="lg">
              <Link to="/dashboard">Check Your Message Now <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
);
