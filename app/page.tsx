import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera, CalendarClock, Globe2, ShieldCheck } from "lucide-react";
import { TestimonialCarousel } from "@/components/home/testimonial-carousel";
import { HeroVisual } from "@/components/home/hero-visual";
import { BackpackHighlight } from "@/components/home/backpack-highlight";

const STEPS = [
  { title: "Plan once", detail: "Tell us where, when and how you're travelling." },
  { title: "Smart checklist", detail: "We blend country data, weather advice and travel rules." },
  { title: "Pack with confidence", detail: "Save, share or download in one click." },
];

const QUICK_FACTS = [
  { label: "Destinations covered", value: "200+" },
  { label: "Checklist templates", value: "50+" },
  { label: "Offline trips saved", value: "Unlimited" },
];

const LOGOS = ["MakeMyTrip", "Cleartrip", "Airbnb", "IndiGo", "Vistara", "Expedia"];

const TRENDING_DESTINATIONS = [
  {
    title: "Cherry Blossom, Kyoto",
    season: "Spring",
    image: "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Beach escape, Maldives",
    season: "Summer",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Northern Lights, Tromsø",
    season: "Winter",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=80",
  },
];

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="hero-gradient grid gap-10 p-10 md:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-8 fade-in-up relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[var(--brand-primary)] shadow-sm">
            <Globe2 className="size-4" />
            One checklist, every journey
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold leading-tight text-[var(--text-primary)] sm:text-5xl">
              Plan. Pack. Go. <span className="text-[var(--brand-primary)]">Zero guesswork.</span>
            </h1>
            <p className="text-lg text-slate-600">
              Tap into curated travel intelligence—weather, seasons, transport rules and country quirks—wrapped in a
              MakeMyTrip-inspired interface.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/plan" className="btn-primary">
              Plan a trip <ArrowRight className="size-4" />
            </Link>
            <Link href="/checklist" className="btn-secondary">
              View checklist
            </Link>
          </div>
          <div className="grid gap-4 rounded-2xl bg-white/80 p-4 text-sm text-slate-600 shadow-sm md:grid-cols-3">
            {QUICK_FACTS.map((fact) => (
              <div key={fact.label}>
                <p className="text-xs uppercase tracking-wide text-slate-400">{fact.label}</p>
                <p className="text-lg font-semibold text-[var(--text-primary)]">{fact.value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <HeroVisual />
          <div className="absolute left-6 top-6 flex flex-col gap-3">
            <div className="rounded-2xl bg-white/90 px-4 py-3 shadow-lg">
              <p className="text-xs uppercase tracking-wide text-slate-400">Live departures</p>
              <p className="text-sm font-semibold text-[var(--brand-primary)]">Flight to Paris · 05 hrs</p>
            </div>
            <div className="rounded-2xl bg-white/90 px-4 py-3 shadow-lg">
              <p className="text-xs uppercase tracking-wide text-slate-400">Weather trigger</p>
              <p className="text-sm font-semibold text-[var(--brand-primary)]">Rainy in Bali → Umbrella packed</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {STEPS.map((step) => (
          <div key={step.title} className="card space-y-2">
            <p className="text-sm font-semibold text-[var(--brand-primary)]">{step.title}</p>
            <p className="text-sm text-slate-600">{step.detail}</p>
          </div>
        ))}
      </section>

      <section className="rounded-[32px] border border-[var(--border-muted)] bg-white/80 p-6 shadow-sm">
        <div className="marquee-gradient overflow-hidden">
          <div className="marquee-track flex gap-10 text-base font-semibold uppercase tracking-wide text-slate-400">
            {[...LOGOS, ...LOGOS].map((logo, idx) => (
              <span key={`${logo}-${idx}`} className="text-[var(--text-primary)]/70">
                {logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-8 rounded-[32px] border border-[var(--border-muted)] bg-white/80 p-8 shadow-sm md:grid-cols-2">
        <div className="space-y-4">
          <p className="pill w-fit">See it before you pack</p>
          <h2 className="text-3xl font-semibold text-[var(--text-primary)]">Live checklist view</h2>
          <p className="text-sm text-slate-600">
            Preview categories, collapse sections, drag to reorder and drop in custom items. Everything syncs locally
            until you export or share.
          </p>
          <ul className="space-y-2 text-sm text-slate-500">
            <li>• Sticky header keeps trip summary & CTA always accessible</li>
            <li>• Category chips mirror MakeMyTrip cards with simple actions</li>
            <li>• Add-ons like PDF export and share links stay one tap away</li>
          </ul>
          <div className="flex gap-3">
            <Link href="/checklist" className="btn-primary">
              Jump into checklist
            </Link>
            <Link href="/plan" className="btn-secondary">
              Plan another trip
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -left-6 top-6 z-10 rounded-2xl border border-[var(--border-muted)] bg-white/90 p-3 shadow-lg">
            <p className="text-xs uppercase tracking-wide text-slate-400">Smart trigger</p>
            <p className="text-sm font-semibold text-[var(--brand-primary)]">Rainy in Bali → Umbrella added</p>
          </div>
          <Image
            src="https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80"
            alt="App preview"
            width={640}
            height={420}
            className="w-full rounded-[28px] border border-[var(--border-muted)] object-cover shadow-xl"
          />
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="pill w-fit">Trending inspirations</p>
            <h2 className="text-2xl font-semibold text-[var(--text-primary)]">Popular routes right now</h2>
          </div>
          <Link href="/plan" className="btn-secondary text-xs">
            <Camera className="size-4" />
              Pick a destination
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {TRENDING_DESTINATIONS.map((spot) => (
            <div key={spot.title} className="overflow-hidden rounded-[28px] border border-[var(--border-muted)] bg-white shadow-sm">
              <div className="relative h-48 w-full">
                <Image src={spot.image} alt={spot.title} fill className="object-cover" />
              </div>
              <div className="space-y-1 p-4">
                <p className="text-xs uppercase tracking-wide text-[var(--brand-primary)]">{spot.season}</p>
                <p className="text-lg font-semibold text-[var(--text-primary)]">{spot.title}</p>
                <p className="text-sm text-slate-500">Checklist auto-adds climate + regional essentials.</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <BackpackHighlight />

      <TestimonialCarousel />

      <section className="rounded-[32px] border border-[var(--border-muted)] bg-white/80 p-6 shadow-sm">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="pill w-fit">One tap actions</p>
            <h2 className="text-2xl font-semibold text-[var(--text-primary)]">Save • Export • Share</h2>
            <p className="text-sm text-slate-600">
              Inspired by booking confirmations—your checklist has the same clarity. Save versions, download PDFs or send a read-only link instantly.
            </p>
          </div>
          <div className="flex flex-col gap-3 text-sm text-slate-600">
            <span className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2 shadow-sm">
              <CalendarClock className="size-4 text-[var(--brand-primary)]" />
              Trip history stays offline in your browser.
            </span>
            <span className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2 shadow-sm">
              <ShieldCheck className="size-4 text-[var(--brand-primary)]" />
              No paid APIs—only curated JSON & rule logic.
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
