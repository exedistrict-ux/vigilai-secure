import { Link, NavLink } from "react-router-dom";
import { Logo } from "./Logo";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const link = "text-sm text-muted-foreground hover:text-foreground transition-colors";
  const active = "text-foreground";
  const items = [
    { to: "/", label: "Home", end: true },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/history", label: "History" },
    { to: "/architecture", label: "Architecture" },
  ];
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <Logo />
        <nav className="hidden md:flex items-center gap-8">
          {items.map(i => (
            <NavLink key={i.to} to={i.to} end={i.end} className={({isActive}) => isActive ? active : link}>{i.label}</NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="hero" size="sm">
            <Link to="/dashboard">Launch App</Link>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <nav className="flex flex-col gap-4 mt-8">
                {items.map(i => (
                  <NavLink
                    key={i.to}
                    to={i.to}
                    end={i.end}
                    onClick={() => setOpen(false)}
                    className={({isActive}) => `text-base ${isActive ? "text-foreground font-semibold" : "text-muted-foreground"}`}
                  >
                    {i.label}
                  </NavLink>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
