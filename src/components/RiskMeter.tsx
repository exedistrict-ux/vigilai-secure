import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const VARIANTS = {
  destructive: { token: "destructive", text: "text-destructive", grad: "from-destructive to-destructive/60", border: "border-destructive/40", bg: "bg-destructive/10" },
  warning:     { token: "warning",     text: "text-warning",     grad: "from-warning to-warning/60",         border: "border-warning/40",     bg: "bg-warning/10" },
  success:     { token: "success",     text: "text-success",     grad: "from-success to-success/60",         border: "border-success/40",     bg: "bg-success/10" },
} as const;

export const RiskMeter = ({ score }: { score: number }) => {
  const [animated, setAnimated] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const dur = 1200;
    const step = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      setAnimated(score * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [score]);

  const key = score >= 61 ? "destructive" : score >= 31 ? "warning" : "success";
  const v = VARIANTS[key];
  const label = score >= 61 ? "HIGH RISK" : score >= 31 ? "MODERATE" : "LOW RISK";

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-48 h-48">
        <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
          <circle cx="100" cy="100" r="85" fill="none" stroke="hsl(var(--secondary))" strokeWidth="14" />
          <circle
            cx="100" cy="100" r="85" fill="none"
            stroke={`hsl(var(--${v.token}))`} strokeWidth="14" strokeLinecap="round"
            strokeDasharray={`${(animated / 100) * 534} 534`}
            style={{ filter: `drop-shadow(0 0 12px hsl(var(--${v.token}) / 0.6))` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className={cn("text-5xl font-bold bg-gradient-to-br bg-clip-text text-transparent", v.grad, v.text)}>
            {Math.round(animated)}
          </div>
          <div className="text-xs text-muted-foreground mt-1">RISK SCORE</div>
        </div>
      </div>
      <div className={cn("px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider border", v.text, v.border, v.bg)}>
        {label}
      </div>
    </div>
  );
};
