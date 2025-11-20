import Image from "next/image";
import { Plane } from "lucide-react";

export const HeroVisual = () => {
  return (
    <div className="hero-visual">
      <Image
        src="https://images.unsplash.com/photo-1501554728187-ce583db33af7?auto=format&fit=crop&w=1600&q=80"
        alt="Travel experience"
        fill
        priority
        sizes="(min-width: 1024px) 600px, 90vw"
        className="object-cover"
      />

      <div className="hero-flight">
        <svg width="100%" height="100%">
          <path
            d="M80,320 C210,260 320,220 460,200"
            stroke="rgba(255,255,255,0.8)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="8"
          />
        </svg>
        <Plane className="plane-icon absolute left-[35%] top-[40%] text-white opacity-90" />
        <div className="location-pulse left-[65%] top-[32%]" />
        <div className="location-pulse left-[25%] top-[55%] bg-[var(--brand-primary)]" />
      </div>
    </div>
  );
};

