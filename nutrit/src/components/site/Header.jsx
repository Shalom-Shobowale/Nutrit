import { useEffect, useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import Logo from "./Logo";
import { Button } from "../ui/Button";
import { navLinks } from "../../data/siteConfig";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled || open ? "bg-background/95 shadow-soft backdrop-blur" : "bg-background/80 backdrop-blur-sm"}`}>
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 py-3 sm:px-8">
        <a href="#home" aria-label="Nutrit home"><Logo /></a>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {navLinks.map((l) => (
            <a key={l.id} href={`#${l.id}`} className="text-sm font-medium text-foreground/80 transition-colors hover:text-accent">{l.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button as="a" href="#order" className="hidden sm:inline-flex"><MessageCircle className="h-4 w-4" />Order Now</Button>
          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-primary hover:bg-secondary lg:hidden"
            onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" className="border-t border-border px-5 pb-6 lg:hidden" aria-label="Mobile">
          {navLinks.map((l) => (
            <a key={l.id} href={`#${l.id}`} onClick={() => setOpen(false)} className="block border-b border-border/60 py-4 font-display text-lg text-primary">{l.label}</a>
          ))}
          <Button as="a" href="#order" onClick={() => setOpen(false)} className="mt-5 w-full"><MessageCircle className="h-4 w-4" />Order Now</Button>
        </nav>
      )}
    </header>
  );
}
