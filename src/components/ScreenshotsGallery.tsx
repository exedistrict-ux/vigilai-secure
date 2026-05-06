import { ShieldCheck, Cpu, Gauge, Upload } from "lucide-react";

const BrowserFrame = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="rounded-xl border border-border bg-card overflow-hidden shadow-card hover:-translate-y-1 transition-transform duration-300">
    <div className="flex items-center gap-2 px-3 py-2 border-b border-border bg-secondary/40">
      <div className="flex gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-destructive/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-warning/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-success/70" />
      </div>
      <div className="flex-1 text-center text-[10px] text-muted-foreground truncate">
        vigilai.app/{label.toLowerCase().replace(/\s+/g, "-")}
      </div>
    </div>
    <div className="aspect-video bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute inset-0" style={{ background: "var(--gradient-glow)" }} />
      <div className="relative h-full flex items-center justify-center p-6">
        {children}
      </div>
    </div>
    <div className="px-4 py-3 border-t border-border text-xs">
      <div className="font-semibold">{label}</div>
    </div>
  </div>
);

export const ScreenshotsGallery = () => (
  <section className="container py-20">
    <div className="text-center max-w-2xl mx-auto mb-12">
      <div className="text-xs uppercase tracking-widest text-accent font-semibold mb-3">Product Tour</div>
      <h2 className="text-3xl md:text-4xl font-bold">See VigilAI in Action</h2>
      <p className="text-muted-foreground mt-4">A glimpse of the experience — from upload to verdict.</p>
    </div>

    <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
      <BrowserFrame label="Homepage Hero">
        <div className="text-center">
          <ShieldCheck className="h-10 w-10 text-primary mx-auto mb-3 animate-float" />
          <div className="text-xl font-bold">The AI Shield</div>
          <div className="text-xs text-gradient font-semibold mt-1">Detect. Verify. Protect.</div>
        </div>
      </BrowserFrame>

      <BrowserFrame label="Dashboard · 9-Agent Pipeline">
        <div className="grid grid-cols-3 gap-2 w-full max-w-xs">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-md border border-primary/30 bg-primary/10 flex items-center justify-center"
            >
              <Cpu className="h-3 w-3 text-primary" />
            </div>
          ))}
        </div>
      </BrowserFrame>

      <BrowserFrame label="Result · Risk Meter">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-border" />
            <div className="absolute inset-0 rounded-full border-4 border-destructive border-r-transparent border-b-transparent rotate-45" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Gauge className="h-8 w-8 text-destructive" />
            </div>
          </div>
          <div className="text-xs text-destructive font-semibold mt-2">High Risk · 87</div>
        </div>
      </BrowserFrame>

      <BrowserFrame label="Upload Workflow">
        <div className="border-2 border-dashed border-accent/40 rounded-lg w-full max-w-xs p-6 text-center">
          <Upload className="h-8 w-8 text-accent mx-auto mb-2 animate-float" />
          <div className="text-xs text-muted-foreground">Drop a file, paste a URL, or type a message</div>
        </div>
      </BrowserFrame>
    </div>
  </section>
);
