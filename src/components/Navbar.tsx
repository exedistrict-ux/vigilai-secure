import { Link, NavLink } from "react-router-dom";
import { Logo } from "./Logo";
import { Button } from "./ui/button";

export const Navbar = () => {
  const link = "text-sm text-muted-foreground hover:text-foreground transition-colors";
  const active = "text-foreground";
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <Logo />
        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/" end className={({isActive}) => isActive ? active : link}>Home</NavLink>
          <NavLink to="/dashboard" className={({isActive}) => isActive ? active : link}>Dashboard</NavLink>
          <NavLink to="/history" className={({isActive}) => isActive ? active : link}>History</NavLink>
          <NavLink to="/architecture" className={({isActive}) => isActive ? active : link}>Architecture</NavLink>
        </nav>
        <Button asChild variant="hero" size="sm">
          <Link to="/dashboard">Launch App</Link>
        </Button>
      </div>
    </header>
  );
};
