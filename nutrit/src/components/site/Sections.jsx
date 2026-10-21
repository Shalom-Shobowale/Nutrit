import { ArrowRight, MessageCircle, Search, ListChecks, Send, Mail, PartyPopper, Users, Briefcase } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
// import heroImg from "@/assets/hero.jpg";
// import bulkImg from "@/assets/bulk.jpg";
import { products } from "../../data/product";
import { siteConfig, navLinks } from "../../data/siteConfig";
import { formatPrice, whatsappLink, introMessage } from "../../lib/order-utils";
import { Btn, SectionHeading, scrollToId } from "./ui";
import Logo from "./Logo";

export function Hero() {
  return (
    <section id="home" className="relative flex min-h-[92vh] items-center overflow-hidden pt-20">
      <img src="/hero.jpg" alt="Golden meat pies and sausage rolls on a rustic wooden board" width={1600} height={1008} className="absolute inset-0 h-full w-full object-cover object-[70%_center]" fetchPriority="high" />
      <div className="absolute inset-0 bg-hero-overlay" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-7xl px-5 py-20 sm:px-8">
        <div className="max-w-xl animate-fade-up">
          <p className="eyebrow flex items-center gap-3"><span className="h-px w-10 bg-accent" />Freshly baked by Nutrit</p>
          <h1 className="mt-5 text-4xl font-medium leading-[1.05] text-primary-foreground sm:text-6xl">
            A Little Taste of <em className="text-accent">Happiness</em>, Baked Fresh.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-primary-foreground/85 sm:text-lg">
            Discover delicious pastries made for everyday treats, special celebrations and memorable moments. Whatever the occasion, Nutrit has something delicious for you.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Btn variant="accent" onClick={() => scrollToId("pastries")}>Explore Our Pastries <ArrowRight className="h-4 w-4" /></Btn>
            <Btn as="a" variant="ghostLight" href={whatsappLink(introMessage)} target="_blank" rel="noopener noreferrer"><MessageCircle className="h-4 w-4" />Order on WhatsApp</Btn>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Gallery({ onOrder }) {
  return (
    <section id="pastries" className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <SectionHeading eyebrow="Our Pastries" title="Delicious Treats, Made to Be Enjoyed." text="Explore our selection of delicious pastries, perfect for sharing, celebrations and everyday enjoyment." />
      <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <article key={p.id} className="group flex flex-col overflow-hidden rounded-3xl bg-card shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
            <div className="aspect-[4/3] overflow-hidden bg-muted">
              <img src={p.image} alt={p.name} loading="lazy" width={816} height={816} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-2xl font-medium text-primary">{p.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
              <div className="mt-5 flex items-end justify-between border-t border-border pt-5">
                <div>
                  <p className="font-display text-xl font-semibold text-primary">{formatPrice(p)}</p>
                  {p.price != null && <p className="text-xs text-muted-foreground">per {p.priceUnit}</p>}
                </div>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">Min. {p.minimumQuantity} {p.minimumQuantity === 1 ? p.priceUnit : p.unitPlural}</span>
              </div>
              <Btn className="mt-5 w-full" disabled={!p.available} onClick={() => onOrder(p.id)}>{p.available ? "Order Now" : "Currently unavailable"}</Btn>
            </div>
          </article>
        ))}
      </div>
      <p className="mt-10 text-center text-xs text-muted-foreground">Prices and quantities are indicative and will be confirmed on WhatsApp.</p>
    </section>
  );
}

const steps = [
  { icon: Search, title: "Explore Our Menu", text: "Discover our pastries and find your favourites." },
  { icon: ListChecks, title: "Choose Your Quantity", text: "Select your products, check the minimum order requirements and tell us when you need them." },
  { icon: Send, title: "Confirm on WhatsApp", text: "Send your order request to Nutrit and let us confirm availability and final pricing." },
];

export function HowToOrder() {
  return (
    <section id="how-to-order" className="bg-secondary/60 py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow="How to Order" title="Three simple steps to something delicious." />
        <ol className="relative mt-16 grid gap-12 md:grid-cols-3">
          <div className="absolute left-[16%] right-[16%] top-8 hidden border-t border-dashed border-accent/60 md:block" aria-hidden="true" />
          {steps.map((s, i) => (
            <li key={s.title} className="relative text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-background text-accent shadow-soft ring-8 ring-secondary/60">
                <s.icon className="h-6 w-6" />
              </div>
              <p className="mt-6 eyebrow">Step {i + 1}</p>
              <h3 className="mt-2 text-2xl font-medium text-primary">{s.title}</h3>
              <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function BulkOrders({ onBulk }) {
  const opts = [
    { icon: PartyPopper, label: "Birthdays & weddings" },
    { icon: Briefcase, label: "Office meetings" },
    { icon: Users, label: "Parties & gatherings" },
  ];
  return (
    <section id="bulk-orders" className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <div className="grid items-center gap-12 overflow-hidden rounded-[2rem] bg-primary lg:grid-cols-2">
        <img src="/bulk.jpg" alt="Celebration table with assorted pastries on tiered stands" loading="lazy" width={1200} height={912} className="h-72 w-full object-cover sm:h-96 lg:h-full" />
        <div className="px-6 pb-12 sm:px-12 lg:py-16 lg:pl-0">
          <p className="eyebrow">Bulk Orders</p>
          <h2 className="mt-3 text-3xl font-medium text-primary-foreground sm:text-4xl">Making Memories? Let Nutrit Handle the Treats.</h2>
          <p className="mt-5 leading-relaxed text-primary-foreground/80">
            Planning a birthday, wedding, office meeting, party or special celebration? Place a bulk order for delicious pastries prepared for your occasion.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {opts.map((o) => (
              <li key={o.label} className="flex items-center gap-2 text-sm text-primary-foreground/90"><o.icon className="h-4 w-4 text-accent" />{o.label}</li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-primary-foreground/70">Share your event details, quantities and preferred date — we'll tailor platters and packs to suit.</p>
          <Btn variant="accent" className="mt-8" onClick={onBulk}>Request a Bulk Order <ArrowRight className="h-4 w-4" /></Btn>
        </div>
      </div>
    </section>
  );
}

const contacts = [
  { icon: MessageCircle, label: "WhatsApp", value: siteConfig.whatsappDisplay, href: whatsappLink() },
  { icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { icon: FaInstagram, label: "Instagram", value: siteConfig.instagramHandle, href: siteConfig.instagramUrl },
];

export function Contact() {
  return (
    <section id="contact" className="bg-secondary/60 py-24">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeading eyebrow="Contact" title="We'd love to hear from you." text="Questions, special requests or event enquiries — reach out any way you like." />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {contacts.map((c) => (
            <a key={c.label} href={c.href} target={c.label === "Email" ? undefined : "_blank"} rel="noopener noreferrer"
              className="group flex flex-col items-center rounded-3xl bg-card p-8 text-center shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground"><c.icon className="h-6 w-6" /></span>
              <span className="mt-5 eyebrow">{c.label}</span>
              <span className="mt-2 break-all font-medium text-primary">{c.value}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-3">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-primary-foreground/70">Freshly baked pastries for everyday treats, celebrations and memorable moments.</p>
        </div>
        <nav aria-label="Footer">
          <p className="eyebrow">Explore</p>
          <ul className="mt-4 space-y-2">
            {navLinks.map((l) => <li key={l.id}><a href={`#${l.id}`} className="text-sm text-primary-foreground/80 hover:text-accent">{l.label}</a></li>)}
          </ul>
        </nav>
        <div>
          <p className="eyebrow">Get in touch</p>
          <ul className="mt-4 space-y-3">
            {contacts.map((c) => (
              <li key={c.label}><a href={c.href} target={c.label === "Email" ? undefined : "_blank"} rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-accent"><c.icon className="h-4 w-4" />{c.value}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 py-6 text-center text-xs text-primary-foreground/60">© {new Date().getFullYear()} Nutrit. All rights reserved.</div>
    </footer>
  );
}
