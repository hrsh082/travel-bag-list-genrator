import { TripHistoryList } from "@/components/history/trip-history-list";

export default function HistoryPage() {
  return (
    <div className="space-y-6">
      <div className="card space-y-2">
        <p className="pill w-fit">Offline archive</p>
        <h1 className="text-3xl font-semibold text-[var(--text-primary)]">Trip history</h1>
        <p className="text-sm text-slate-500">All trips live in LocalStorage—duplicate, delete or refresh with the latest JSON updates.</p>
      </div>
      <TripHistoryList />
    </div>
  );
}

