"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className="inline-flex items-center rounded-2xl border border-[var(--border-muted)] bg-white/80 p-2 text-[var(--text-primary)] shadow-sm transition hover:border-[var(--brand-primary)] hover:bg-[var(--brand-primary)]/10 focus-visible:outline-2 focus-visible:outline-[var(--brand-primary)] focus-visible:outline-offset-2"
    >
      {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
};

