"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const testimonials = [
  {
    name: "Priya Menon",
    role: "Product Manager, Bengaluru",
    quote:
      "Packing for Europe with changing weather was stressful. Travel Bag layered jackets, adapters and flight docs automatically—felt like a personal concierge.",
    avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Miguel Alvarez",
    role: "Adventure Filmmaker, Madrid",
    quote:
      "I saved a Himalayan trek preset and reuse it every season. Extra thermals, first-aid, power banks—everything toggles on with one click.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Sarah Johnson",
    role: "CXO, New York",
    quote:
      "Love the PDF export before every flight. My assistant prints it, I tick items on the go and share a read-only link with family.",
    avatar: "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=200&q=80",
  },
];

const INTERVAL = 6000;

export const TestimonialCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="rounded-[32px] border border-[var(--border-muted)] bg-white/85 p-6 shadow-sm">
      <div className="flex flex-col gap-1">
        <p className="pill w-fit">Loved by planners</p>
        <h2 className="text-2xl font-semibold text-[var(--text-primary)]">Every checklist feels curated</h2>
        <p className="text-sm text-slate-500">98% of travellers save at least one trip for reuse.</p>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
        <div className="relative overflow-hidden rounded-3xl border border-[var(--border-muted)] bg-white p-6">
          {testimonials.map((item, index) => (
            <div
              key={item.name}
              className={`space-y-4 transition-all duration-500 ${
                index === activeIndex ? "opacity-100 translate-y-0" : "pointer-events-none -translate-y-4 opacity-0"
              }`}
            >
              <p className="text-lg font-medium text-[var(--text-primary)]">“{item.quote}”</p>
              <div className="flex items-center gap-3">
                <Image
                  src={item.avatar}
                  alt={item.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{item.name}</p>
                  <p className="text-xs uppercase tracking-wide text-slate-400">{item.role}</p>
                </div>
              </div>
            </div>
          ))}

          <div className="mt-6 flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                aria-label={`Show testimonial ${index + 1}`}
                onClick={() => setActiveIndex(index)}
                className={`h-2 w-8 rounded-full transition ${
                  index === activeIndex ? "bg-[var(--brand-primary)]" : "bg-slate-200"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-[var(--border-muted)] bg-gradient-to-br from-[rgba(0,103,255,0.08)] to-white p-6 text-sm text-slate-600">
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">What changes?</h3>
          <ul className="mt-3 space-y-3">
            <li>• Region tags auto-load essentials (EU plugs, hill thermals, coastal cotton)</li>
            <li>• Modes like flight/train/car add docs, snacks, or travel pillows instantly</li>
            <li>• Seasonal JSON tweaks redeploy recommendations without touching code</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

