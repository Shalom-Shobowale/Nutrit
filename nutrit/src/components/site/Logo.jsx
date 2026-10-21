/*
 * TEMPORARY text logo. To use a real logo image:
 *   import logo from "@/assets/logo.png";
 *   return <img src={logo} alt="Nutrit" className="h-10 w-auto" />;
 * (h-* with w-auto preserves the original proportions)
 */
export default function Logo({ light = false }) {
  return (
    <span className="inline-flex items-baseline gap-0.5 select-none" aria-label="Nutrit">
      <span className={`font-display text-2xl font-semibold italic tracking-tight ${light ? "text-primary-foreground" : "text-primary"}`}>
        Nutrit
      </span>
      <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
    </span>
  );
}
