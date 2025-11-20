"use client";

import { useTripStore } from "@/store/useTripStore";
import { useTheme } from "@/components/providers/theme-provider";
import { useState } from "react";
import { DownloadCloud, Trash } from "lucide-react";

export const SettingsPanel = () => {
  const { theme, setTheme } = useTheme();
  const trips = useTripStore((state) => state.trips);
  const resetTrips = useTripStore((state) => state.resetTrips);
  const [status, setStatus] = useState<string | null>(null);

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(trips, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const element = document.createElement("a");
    element.href = url;
    element.download = "travelbag-history.json";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    const confirmed = confirm(
      "This will remove all saved trips from this device. Continue?"
    );
    if (!confirmed) return;
    resetTrips();
    setStatus("Cleared local data");
    setTimeout(() => setStatus(null), 2000);
  };

  return (
    <div className="card space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">Preferences</h2>
        <p className="text-sm text-slate-500">Local-first settings synced via browser storage.</p>
      </div>

      <div className="space-y-4">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-600">Theme</span>
          <select
            value={theme}
            onChange={(event) => setTheme(event.target.value as "light" | "dark")}
            className="rounded-2xl border border-[var(--border-muted)] bg-white px-4 py-3 text-sm text-slate-700"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>

        <div className="rounded-2xl border border-[var(--border-muted)] p-4 text-sm">
          <p className="font-semibold text-[var(--text-primary)]">Storage</p>
          <p className="text-slate-500">
            All trips reside in browser LocalStorage (`travelbag-trips`). Export JSON for backups or updates.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button onClick={handleExport} className="btn-secondary text-xs">
              <DownloadCloud className="size-4" />
              Export history
            </button>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-2xl border border-red-200 px-4 py-2 text-xs font-semibold text-red-500"
            >
              <Trash className="size-4" />
              Reset data
            </button>
          </div>
          {status && <p className="mt-2 text-xs text-emerald-500">{status}</p>}
        </div>
      </div>
    </div>
  );
};

