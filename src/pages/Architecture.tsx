import { Navbar } from "@/components/Navbar";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";

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
      <ArchitectureDiagram />
    </section>
  </div>
);

export default Architecture;
