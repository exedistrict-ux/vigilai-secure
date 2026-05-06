import { ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

export const Logo = ({ className = "" }: { className?: string }) => (
  <Link to="/" className={`flex items-center gap-2 ${className}`}>
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent blur-md opacity-60" />
      <div className="relative bg-gradient-to-br from-primary to-accent p-2 rounded-lg">
        <ShieldCheck className="h-5 w-5 text-primary-foreground" />
      </div>
    </div>
    <span className="text-xl font-bold tracking-tight">
      Vigil<span className="text-gradient">AI</span>
    </span>
  </Link>
);
