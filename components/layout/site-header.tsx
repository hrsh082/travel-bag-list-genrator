"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { PlaneTakeoff } from "lucide-react";
import { cn } from "@/utils/styles";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/plan", label: "Plan Trip" },
  { href: "/checklist", label: "Generated Checklist" },
  { href: "/history", label: "Trip History" },
  { href: "/settings", label: "Settings" },
];

export const SiteHeader = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 bg-white/95 shadow-sm backdrop-blur dark:bg-slate-950/80">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight text-[var(--brand-primary)]">
          <PlaneTakeoff className="size-6" />
          Travel Bag
        </Link>
        <nav className="hidden items-center gap-1 text-sm font-medium md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-2xl px-4 py-2 transition-colors",
                pathname === link.href
                  ? "bg-[var(--brand-primary)]/10 text-[var(--brand-primary)]"
                  : "text-slate-500 hover:text-slate-900"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/plan"
            className="btn-secondary hidden text-sm md:inline-flex"
          >
            Plan Trip
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

