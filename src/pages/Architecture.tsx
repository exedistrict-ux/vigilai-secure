import { Navbar } from "@/components/Navbar";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { GitBranch, CheckCircle2, TestTube, Package, Rocket, Globe } from "lucide-react";

const cicdSteps = [
  { icon: GitBranch, title: "Code Push", sub: "GitLab repo" },
  { icon: TestTube, title: "Test", sub: "Unit & integration" },
  { icon: Package, title: "Build", sub: "Vite production bundle" },
  { icon: Rocket, title: "Deploy", sub: "Edge deployment" },
  { icon: Globe, title: "Live", sub: "vigilai-secure.lovable.app" },
];

const Architecture = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <section className="container py-16">
      <div className="max-w-3xl mb-10">
        <div className="text-xs uppercase tracking-widest text-accent font-semibold mb-3">System Design</div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Architecture</h1>
        <p className="text-muted-foreground">
          How VigilAI orchestrates a multi-agent intelligence pipeline across Google Cloud and partner platforms.
        </p>
      </div>
      <div data-tour="arch"><ArchitectureDiagram /></div>

      {/* CI/CD Pipeline */}
      <div className="mt-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="inline-flex p-2 rounded-lg" style={{ backgroundColor: "#fc6d2620", color: "#fc6d26" }}>
            <GitBranch className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">CI/CD Pipeline</h2>
            <p className="text-sm text-muted-foreground">Powered by GitLab — every push validated, built, and deployed automatically.</p>
          </div>
        </div>
        <div className="rounded-2xl border p-6 md:p-8" style={{ borderColor: "#fc6d2640", background: "linear-gradient(135deg, #fc6d2608, transparent)" }}>
          <div className="overflow-x-auto">
            <div className="flex items-stretch gap-3 min-w-max pb-2">
              {cicdSteps.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={s.title} className="flex items-center gap-3">
                    <div className="rounded-xl border bg-card p-4 w-[170px] relative" style={{ borderColor: "#fc6d2640" }}>
                      <CheckCircle2 className="absolute top-2 right-2 h-4 w-4 text-success" />
                      <div className="text-[10px] text-muted-foreground mb-2">STAGE {i + 1}</div>
                      <div className="inline-flex p-2 rounded-lg mb-2" style={{ backgroundColor: "#fc6d2620", color: "#fc6d26" }}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="text-sm font-semibold">{s.title}</div>
                      <div className="text-xs text-muted-foreground">{s.sub}</div>
                    </div>
                    {i < cicdSteps.length - 1 && (
                      <div className="text-2xl" style={{ color: "#fc6d26" }}>→</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default Architecture;
