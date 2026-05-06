import { AGENTS } from "@/lib/agents";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = { activeIndex: number; doneIndices: number[] };

export const AgentPipeline = ({ activeIndex, doneIndices }: Props) => (
  <div className="grid gap-3 md:grid-cols-3">
    {AGENTS.map((a, i) => {
      const Icon = a.icon;
      const isActive = i === activeIndex;
      const isDone = doneIndices.includes(i);
      return (
        <div
          key={a.id}
          className={cn(
            "relative rounded-xl border p-4 transition-all duration-300 overflow-hidden",
            isActive && "border-primary glow-primary bg-primary/5",
            isDone && !isActive && "border-success/40 bg-success/5",
            !isActive && !isDone && "border-border bg-card"
          )}
        >
          {isActive && (
            <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent animate-scan" />
          )}
          <div className="flex items-start gap-3">
            <div className={cn(
              "p-2 rounded-lg shrink-0",
              isActive && "bg-primary text-primary-foreground animate-pulse-ring",
              isDone && !isActive && "bg-success/20 text-success",
              !isActive && !isDone && "bg-secondary text-muted-foreground"
            )}>
              {isActive ? <Loader2 className="h-4 w-4 animate-spin" />
                : isDone ? <Check className="h-4 w-4" />
                : <Icon className="h-4 w-4" />}
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold truncate">{a.name}</div>
              <div className="text-xs text-muted-foreground truncate">{a.short}</div>
            </div>
          </div>
        </div>
      );
    })}
  </div>
);
