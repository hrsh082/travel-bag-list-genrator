"use client";

import { useRouter } from "next/navigation";
import { useTripStore } from "@/store/useTripStore";
import travelData from "@/data/travelData.json";
import { generateChecklist } from "@/lib/generateChecklist";
import { Calendar, Copy, RefreshCcw, Trash2 } from "lucide-react";

export const TripHistoryList = () => {
  const router = useRouter();
  const trips = useTripStore((state) => state.trips);
  const deleteTrip = useTripStore((state) => state.deleteTrip);
  const setCurrentTrip = useTripStore((state) => state.setCurrentTrip);
  const duplicateTrip = useTripStore((state) => state.duplicateTrip);

  if (trips.length === 0) {
    return (
      <div className="card text-center">
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">No saved trips yet</h2>
        <p className="text-sm text-slate-500">
          Hit “Save” on a checklist to see it here, just like your past bookings.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {trips.map((trip) => (
        <div
          key={trip.id}
          className="rounded-3xl border border-[var(--border-muted)] bg-white p-5 shadow-sm"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-xl font-semibold text-[var(--text-primary)]">{trip.values.destination}</h3>
              <p className="text-sm text-slate-500">
                {trip.values.days} days · {trip.values.tripType} · {trip.values.weather} · {trip.values.travelMode}
              </p>
              <p className="mt-1 flex items-center gap-1 text-xs uppercase tracking-wide text-slate-400">
                <Calendar className="size-4" /> {new Date(trip.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-sm">
              <button
                onClick={() => {
                  setCurrentTrip(trip);
                  router.push("/checklist");
                }}
                className="btn-secondary text-xs"
              >
                Open
              </button>
              <button
                onClick={() => {
                  const regenerated = generateChecklist(trip.values, travelData);
                  setCurrentTrip(regenerated);
                  router.push("/checklist");
                }}
                className="inline-flex items-center gap-1 rounded-2xl border border-[var(--border-muted)] px-3 py-1 text-xs text-slate-600"
              >
                <RefreshCcw className="size-3.5" />
                Regenerate
              </button>
              <button
                onClick={() => {
                  const duplicate = duplicateTrip(trip.id);
                  if (duplicate) {
                    router.push("/checklist");
                  }
                }}
                className="inline-flex items-center gap-1 rounded-2xl border border-[var(--border-muted)] px-3 py-1 text-xs text-slate-600"
              >
                <Copy className="size-3.5" />
                Duplicate
              </button>
              <button
                onClick={() => deleteTrip(trip.id)}
                className="inline-flex items-center gap-1 rounded-2xl border border-red-200 px-3 py-1 text-xs text-red-500"
              >
                <Trash2 className="size-3.5" />
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

