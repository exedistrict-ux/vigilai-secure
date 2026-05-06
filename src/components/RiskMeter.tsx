import { cn } from "@/lib/utils";

export const RiskMeter = ({ score }: { score: number }) => {
  const color = score >= 70 ? "destructive" : score >= 40 ? "warning" : "success";
  const colorMap = {
    destructive: "from-destructive to-destructive/60 text-destructive",
    warning: "from-warning to-warning/60 text-warning",
    success: "from-success to-success/60 text-success",
  } as const;
  const label = score >= 70 ? "HIGH RISK" : score >= 40 ? "MODERATE" : "LOW RISK";
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-48 h-48">
        <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
          <circle cx="100" cy="100" r="85" fill="none" stroke="hsl(var(--secondary))" strokeWidth="14" />
          <circle
            cx="100" cy="100" r="85" fill="none"
            stroke={`hsl(var(--${color}))`} strokeWidth="14" strokeLinecap="round"
            strokeDasharray={`${(score / 100) * 534} 534`}
            style={{ transition: "stroke-dasharray 1s ease-out", filter: `drop-shadow(0 0 12px hsl(var(--${color}) / 0.6))` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className={cn("text-5xl font-bold bg-gradient-to-br bg-clip-text text-transparent", colorMap[color])}>
            {score}
          </div>
          <div className="text-xs text-muted-foreground mt-1">RISK SCORE</div>
        </div>
      </div>
      <div className={cn("px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider border", `text-${color} border-${color}/40 bg-${color}/10`)}>
        {label}
      </div>
    </div>
  );
};
