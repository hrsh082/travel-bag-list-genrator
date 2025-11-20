import Image from "next/image";

const PACK_ITEMS = [
  "Noise-cancelling earbuds",
  "Universal adapter",
  "Compact raincoat",
  "Travel pillow",
  "First-aid mini kit",
  "Power bank",
  "Waterproof pouch",
];

export const BackpackHighlight = () => {
  return (
    <section className="grid gap-8 rounded-[32px] border border-[var(--border-muted)] bg-white/85 p-8 shadow-sm md:grid-cols-[0.9fr_1.1fr]">
      <div className="space-y-4">
        <p className="pill w-fit">Pack smarter</p>
        <h2 className="text-3xl font-semibold text-[var(--text-primary)]">Meeting the backpack whisperer</h2>
        <p className="text-sm text-slate-600">
          Every recommendation knows where it sits in your bag. Essentials rotate based on destination, weather and
          travel mode—then animate in a quick glance card.
        </p>
        <div className="rounded-2xl border border-[var(--border-muted)] p-4 text-sm text-slate-600">
          <p className="font-semibold text-[var(--text-primary)]">Rule stack in play</p>
          <ul className="mt-3 space-y-2 text-slate-500">
            <li>• Cold + flight → thermals, extra docs, compression socks</li>
            <li>• Rainy + adventure → rain cover, dry bags, trekking torch</li>
            <li>• Europe + business → EU plugs, suits, laptop essentials</li>
          </ul>
        </div>
      </div>
      <div className="backpack-card p-5">
        <div className="absolute left-6 top-6 sparkle" />
        <div className="absolute right-12 top-12 sparkle" />
        <div className="absolute right-8 bottom-10 sparkle" />
        <div className="rounded-[24px] bg-gradient-to-br from-[rgba(0,103,255,0.15)] to-white p-4 shadow-inner">
          <div className="flex items-center gap-3 rounded-2xl bg-white/80 px-4 py-3 shadow glow">
            <Image
              src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=400&q=80"
              alt="Backpack"
              width={64}
              height={64}
              className="rounded-2xl object-cover"
            />
            <div>
              <p className="text-sm font-semibold text-[var(--text-primary)]">Carry-on ready</p>
              <p className="text-xs text-slate-500">Smart alerts for overpacking</p>
            </div>
          </div>
          <div className="mt-5 overflow-hidden rounded-2xl border border-[var(--border-muted)] bg-white/80 p-4">
            <div className="pack-items">
              {[...PACK_ITEMS, ...PACK_ITEMS].map((item, index) => (
                <span
                  key={`${item}-${index}`}
                  className="rounded-full border border-[var(--border-muted)] px-3 py-1 text-xs font-semibold text-slate-500"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

