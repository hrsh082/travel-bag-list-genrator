"use client";

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

export const TestimonialCarousel = () => {
  return (
    <section className="rounded-2xl border border-[var(--border-muted)] bg-white p-6">
      <div className="mb-4">
        <p className="text-sm text-slate-500">Loved by planners</p>
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">Every checklist feels curated</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {testimonials.map((t) => (
          <figure key={t.name} className="rounded-xl border border-[var(--border-muted)] bg-white p-4">
            <blockquote className="text-sm text-[var(--text-primary)]">“{t.quote}”</blockquote>
            <figcaption className="mt-4 flex items-center gap-3">
              <Image
                src={t.avatar}
                alt={t.name}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
              <div>
                <div className="text-sm font-medium text-[var(--text-primary)]">{t.name}</div>
                <div className="text-xs text-slate-400">{t.role}</div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};

