const variants = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft",
  accent: "bg-accent text-accent-foreground hover:brightness-105 shadow-soft",
  outline: "border border-primary/20 text-primary hover:bg-secondary",
  ghostLight: "border border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10",
};

export function Btn({ as: Tag = "button", variant = "primary", className = "", ...props }) {
  return (
    <Tag
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${variants[variant]} ${className}`}
      {...props}
    />
  );
}

export function SectionHeading({ eyebrow, title, text, center = true }) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-3 text-3xl font-medium text-primary sm:text-4xl md:text-5xl">{title}</h2>
      {text && <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{text}</p>}
    </div>
  );
}

export function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
