import { SettingsPanel } from "@/components/settings/settings-panel";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="card space-y-2">
        <p className="pill w-fit">
          Preferences
        </p>
        <h1 className="text-3xl font-semibold text-[var(--text-primary)]">
          Settings
        </h1>
        <p className="text-sm text-slate-500">Control theme, storage and data lifecycle for your travel assistant.</p>
      </div>
      <SettingsPanel />
      <div className="card space-y-3">
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">
          Updating travel data
        </h2>
        <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-600">
          <li>Open `data/travelData.json` in your editor.</li>
          <li>Add or modify country, weather, season or trip type entries.</li>
          <li>Restart the dev server (or redeploy). The generator automatically consumes the updated JSON with no backend code changes.</li>
        </ol>
      </div>
    </div>
  );
}

