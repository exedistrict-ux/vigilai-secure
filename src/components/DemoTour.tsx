import { createContext, useContext, useEffect, useRef, useState, ReactNode, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { MousePointer2, X, Play } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

type Stop = {
  id: string;
  route?: string;
  selector?: string;
  duration: number; // seconds
  title: string;
  body: string;
  cursorAction?: "type" | "click" | "scroll";
  typeText?: string;
  typeSelector?: string;
  clickSelector?: string;
  ctaLabel?: string;
};

const STOPS: Stop[] = [
  { id: "1", route: "/", selector: '[data-tour="hero"]', duration: 10,
    title: "Welcome to VigilAI",
    body: "India's first autonomous cyber defense platform — Detect. Verify. Protect." },
  { id: "2", route: "/", selector: '[data-tour="stats"]', duration: 15,
    title: "Proven at Scale",
    body: "2.8M+ threats analyzed with 98% detection accuracy across 9 specialized AI agents." },
  { id: "3", route: "/", selector: '[data-tour="features"]', duration: 10,
    title: "8 Threat Categories",
    body: "From scams and deepfakes to fake news and digital arrest fraud — all in one platform." },
  { id: "4", route: "/dashboard", selector: '[data-tour="dash-input"]', duration: 15,
    title: "Upload Suspicious Content",
    body: "Paste any text, URL, or file. Watch the agents go to work.",
    cursorAction: "type",
    typeSelector: 'textarea',
    typeText: "You have won ₹50,000! Click here to claim your prize now.",
    clickSelector: '[data-tour="dash-analyze"]' },
  { id: "5", route: "/dashboard", selector: '[data-tour="dash-pipeline"]', duration: 15,
    title: "9 AI Agents Analyzing in Parallel",
    body: "Orchestrator routes the input. Each specialist agent reports its verdict." },
  { id: "6", route: "/result", selector: '[data-tour="risk-meter"]', duration: 10,
    title: "HIGH THREAT DETECTED",
    body: "Risk score 94/100 — Classic prize-scam pattern with urgency cues." },
  { id: "7", route: "/architecture", selector: '[data-tour="arch"]', duration: 10,
    title: "Built on Best-in-Class",
    body: "Powered by Google Cloud · Gemini · Arize AI · Elastic · Fivetran." },
  { id: "8", route: "/", selector: '[data-tour="cta"]', duration: 5,
    title: "VigilAI — Detect. Verify. Protect.",
    body: "Try it yourself. Run your first analysis in under 10 seconds.",
    ctaLabel: "Try it yourself" },
];

type TourCtx = { start: () => void; active: boolean };
const Ctx = createContext<TourCtx>({ start: () => {}, active: false });
export const useDemoTour = () => useContext(Ctx);

export const DemoTourProvider = ({ children }: { children: ReactNode }) => {
  const [active, setActive] = useState(false);
  const [idx, setIdx] = useState(0);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [cursor, setCursor] = useState({ x: 100, y: 100 });
  const [elapsed, setElapsed] = useState(0);
  const navigate = useNavigate();
  const stopTimer = useRef<number | null>(null);
  const tickTimer = useRef<number | null>(null);
  const cancelled = useRef(false);

  const stop = STOPS[idx];

  const cleanup = useCallback(() => {
    if (stopTimer.current) window.clearTimeout(stopTimer.current);
    if (tickTimer.current) window.clearInterval(tickTimer.current);
  }, []);

  const finish = useCallback(() => {
    cancelled.current = true;
    cleanup();
    setActive(false);
    setIdx(0);
    setElapsed(0);
  }, [cleanup]);

  const start = useCallback(() => {
    cancelled.current = false;
    setIdx(0);
    setElapsed(0);
    setActive(true);
  }, []);

  // Seed a sample report so STOP 6 can show the result page
  const seedReport = useCallback(async () => {
    const { runMockAnalysis, saveReport } = await import("@/lib/storage");
    const report = runMockAnalysis("text", "You have won ₹50,000! Click here to claim your prize now.");
    report.id = "demo-tour-report";
    report.riskScore = 94;
    saveReport(report);
    return report.id;
  }, []);

  // Run a stop: navigate, wait for element, position highlight, run cursor actions, schedule next
  useEffect(() => {
    if (!active) return;
    cancelled.current = false;
    let aborted = false;
    let interval: number | null = null;

    const run = async () => {
      const s = STOPS[idx];

      // Navigate
      if (s.route === "/result") {
        const id = await seedReport();
        navigate(`/result?id=${id}`);
      } else if (s.route) {
        navigate(s.route);
      }

      // Wait for target element
      let target: Element | null = null;
      for (let i = 0; i < 40 && !aborted; i++) {
        target = s.selector ? document.querySelector(s.selector) : null;
        if (target) break;
        await new Promise(r => setTimeout(r, 100));
      }
      if (aborted) return;

      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
        await new Promise(r => setTimeout(r, 500));
        const r = (target as HTMLElement).getBoundingClientRect();
        setRect(r);
        setCursor({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
      } else {
        setRect(null);
      }

      // Cursor scripted actions
      if (s.cursorAction === "type" && s.typeSelector && s.typeText) {
        const ta = document.querySelector(s.typeSelector) as HTMLTextAreaElement | null;
        if (ta) {
          const tr = ta.getBoundingClientRect();
          setCursor({ x: tr.left + 20, y: tr.top + 20 });
          ta.focus();
          const setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value")?.set;
          for (let i = 1; i <= s.typeText.length && !aborted; i++) {
            setter?.call(ta, s.typeText.slice(0, i));
            ta.dispatchEvent(new Event("input", { bubbles: true }));
            await new Promise(r => setTimeout(r, 35));
          }
        }
        if (s.clickSelector && !aborted) {
          await new Promise(r => setTimeout(r, 600));
          const btn = document.querySelector(s.clickSelector) as HTMLButtonElement | null;
          if (btn) {
            const br = btn.getBoundingClientRect();
            setCursor({ x: br.left + br.width / 2, y: br.top + br.height / 2 });
            await new Promise(r => setTimeout(r, 400));
            btn.click();
          }
        }
      }

      // Tick progress + recompute rect periodically (in case of layout shift)
      const startedAt = performance.now();
      interval = window.setInterval(() => {
        if (aborted) return;
        setElapsed((performance.now() - startedAt) / 1000);
        if (target && document.body.contains(target)) {
          const r = (target as HTMLElement).getBoundingClientRect();
          setRect(r);
        }
      }, 200);
      tickTimer.current = interval;

      // Schedule next stop
      stopTimer.current = window.setTimeout(() => {
        if (aborted) return;
        if (idx < STOPS.length - 1) {
          setElapsed(0);
          setIdx(i => i + 1);
        } else {
          finish();
        }
      }, s.duration * 1000);
    };

    run();
    return () => {
      aborted = true;
      cleanup();
    };
  }, [active, idx, navigate, seedReport, finish, cleanup]);

  if (!active) {
    return (
      <Ctx.Provider value={{ start, active }}>
        {children}
      </Ctx.Provider>
    );
  }

  const totalDuration = STOPS.reduce((a, s) => a + s.duration, 0);
  const completedTime = STOPS.slice(0, idx).reduce((a, s) => a + s.duration, 0) + Math.min(elapsed, stop.duration);
  const progress = (completedTime / totalDuration) * 100;

  // Tooltip placement
  const tooltipPos = (() => {
    if (!rect) return { top: 100, left: 100 };
    const vw = window.innerWidth, vh = window.innerHeight;
    const tooltipW = 360, tooltipH = 160;
    let top = rect.bottom + 16;
    let left = rect.left + rect.width / 2 - tooltipW / 2;
    if (top + tooltipH > vh - 100) top = Math.max(20, rect.top - tooltipH - 16);
    left = Math.max(16, Math.min(left, vw - tooltipW - 16));
    return { top, left, width: tooltipW };
  })();

  return (
    <Ctx.Provider value={{ start, active }}>
      {children}
      {/* Overlay using SVG mask for spotlight */}
      <div className="fixed inset-0 z-[100] pointer-events-none">
        <svg className="absolute inset-0 w-full h-full pointer-events-auto" onClick={(e) => e.stopPropagation()}>
          <defs>
            <mask id="tour-mask">
              <rect width="100%" height="100%" fill="white" />
              {rect && (
                <rect
                  x={rect.left - 8}
                  y={rect.top - 8}
                  width={rect.width + 16}
                  height={rect.height + 16}
                  rx="12"
                  fill="black"
                />
              )}
            </mask>
          </defs>
          <rect width="100%" height="100%" fill="rgba(2, 6, 23, 0.78)" mask="url(#tour-mask)" />
        </svg>

        {/* Glowing highlight border */}
        {rect && (
          <div
            className="absolute rounded-xl border-2 border-accent transition-all duration-500 ease-out"
            style={{
              top: rect.top - 8,
              left: rect.left - 8,
              width: rect.width + 16,
              height: rect.height + 16,
              boxShadow: "0 0 0 4px hsl(var(--accent) / 0.15), 0 0 40px hsl(var(--accent) / 0.5)",
            }}
          />
        )}

        {/* Tooltip */}
        <div
          className="absolute pointer-events-auto rounded-xl border border-accent/40 bg-card/95 backdrop-blur-xl p-5 shadow-2xl transition-all duration-500 animate-fade-in-up"
          style={tooltipPos}
        >
          <div className="text-[10px] uppercase tracking-widest text-accent font-semibold mb-2">
            Stop {idx + 1} of {STOPS.length}
          </div>
          <div className="font-bold text-base mb-1.5">{stop.title}</div>
          <p className="text-sm text-muted-foreground">{stop.body}</p>
          {stop.ctaLabel && (
            <Button size="sm" variant="hero" className="mt-3" onClick={finish}>
              {stop.ctaLabel}
            </Button>
          )}
        </div>

        {/* Animated cursor */}
        <div
          className="absolute transition-all duration-700 ease-out"
          style={{ top: cursor.y, left: cursor.x, transform: "translate(-4px, -4px)" }}
        >
          <div className="absolute -inset-3 rounded-full bg-accent/30 animate-pulse-ring" />
          <MousePointer2 className="h-6 w-6 text-accent fill-accent drop-shadow-[0_0_8px_hsl(var(--accent))]" />
        </div>

        {/* Bottom bar */}
        <div className="absolute bottom-0 inset-x-0 pointer-events-auto">
          <div className="bg-background/90 backdrop-blur-xl border-t border-border">
            <div className="container py-3 flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs">
                <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                <span className="font-semibold tracking-wide uppercase">Demo Tour</span>
              </div>
              <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground tabular-nums">
                {Math.floor(completedTime)}s / {totalDuration}s
              </span>
              <Button size="sm" variant="ghost" onClick={finish}>
                <X className="h-4 w-4" /> Skip
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Ctx.Provider>
  );
};

export const WatchDemoButton = ({ className }: { className?: string }) => {
  const { start } = useDemoTour();
  return (
    <Button variant="outline" size="lg" onClick={start} className={cn("group", className)}>
      <Play className="h-4 w-4 group-hover:text-accent transition-colors" />
      Watch Demo
    </Button>
  );
};
