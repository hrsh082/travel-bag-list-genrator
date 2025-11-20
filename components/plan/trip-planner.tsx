"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { generateChecklist } from "@/lib/generateChecklist";
import { TripChecklist, TripFormValues } from "@/types/trip";
import { useTripStore } from "@/store/useTripStore";
import travelData from "@/data/travelData.json";
import { Loader2, MapPin } from "lucide-react";

const defaultValues: TripFormValues = {
  destination: "",
  days: 5,
  tripType: "casual",
  weather: "mixed",
  season: "summer",
  travelMode: "flight",
  gender: undefined,
};

const fieldClass =
  "rounded-2xl border border-[var(--border-muted)] bg-white px-4 py-3 text-sm text-slate-700 focus:border-[var(--brand-primary)] focus:outline-none";

export const TripPlanner = () => {
  const [values, setValues] = useState<TripFormValues>(defaultValues);
  const [preview, setPreview] = useState<TripChecklist | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const setCurrentTrip = useTripStore((state) => state.setCurrentTrip);

  const handleChange = (
    field: keyof TripFormValues,
    value: TripFormValues[typeof field]
  ) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleGenerate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!values.destination.trim()) {
      alert("Please enter a destination city or country.");
      return;
    }
    setLoading(true);
    const generated = generateChecklist(values, travelData);
    setPreview(generated);
    setLoading(false);
  };

  const handleUseChecklist = () => {
    if (!preview) return;
    setCurrentTrip(preview);
    router.push("/checklist");
  };

  return (
    <div className="space-y-6">
      <form className="card space-y-6" onSubmit={handleGenerate}>
        <div className="flex flex-col gap-2">
          <p className="pill w-fit">Plan a new trip</p>
          <h1 className="text-2xl font-semibold text-[var(--text-primary)]">
            Tell us the basics, we’ll do the packing math.
          </h1>
          <p className="text-sm text-slate-500">
            Built similar to MakeMyTrip search cards—simple, structured and friendly.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-600">
              Destination (city or country)
            </span>
            <div className="relative">
              <input
                type="text"
                required
                className={`${fieldClass} w-full pl-10`}
                placeholder="e.g. Paris, France"
                value={values.destination}
                onChange={(event) => handleChange("destination", event.target.value)}
              />
              <MapPin className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            </div>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-600">Number of days</span>
            <input
              type="number"
              min={1}
              className={fieldClass}
              value={values.days}
              onChange={(event) => handleChange("days", Number(event.target.value))}
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-600">Trip type</span>
            <select
              className={fieldClass}
              value={values.tripType}
              onChange={(event) =>
                handleChange("tripType", event.target.value as TripFormValues["tripType"])
              }
            >
              <option value="business">Business</option>
              <option value="casual">Casual</option>
              <option value="adventure">Adventure</option>
              <option value="family">Family</option>
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-600">Weather expectation</span>
            <select
              className={fieldClass}
              value={values.weather}
              onChange={(event) =>
                handleChange("weather", event.target.value as TripFormValues["weather"])
              }
            >
              <option value="hot">Hot</option>
              <option value="cold">Cold</option>
              <option value="rainy">Rainy</option>
              <option value="mixed">Mixed</option>
              <option value="unknown">Unknown</option>
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-600">Season</span>
            <select
              className={fieldClass}
              value={values.season}
              onChange={(event) =>
                handleChange("season", event.target.value as TripFormValues["season"])
              }
            >
              <option value="winter">Winter</option>
              <option value="summer">Summer</option>
              <option value="spring">Spring</option>
              <option value="monsoon">Monsoon</option>
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-600">Travel mode</span>
            <select
              className={fieldClass}
              value={values.travelMode}
              onChange={(event) =>
                handleChange(
                  "travelMode",
                  event.target.value as TripFormValues["travelMode"]
                )
              }
            >
              <option value="flight">Flight</option>
              <option value="train">Train</option>
              <option value="car">Car</option>
            </select>
          </label>

          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-medium text-slate-600">
              Gender (optional)
            </span>
            <select
              className={fieldClass}
              value={values.gender ?? ""}
              onChange={(event) =>
                handleChange(
                  "gender",
                  event.target.value
                    ? (event.target.value as TripFormValues["gender"])
                    : undefined
                )
              }
            >
              <option value="">Prefer not to say</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="non-binary">Non-binary</option>
            </select>
          </label>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            className="btn-primary disabled:opacity-60"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Generating...
              </>
            ) : (
              "Generate checklist"
            )}
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => setValues(defaultValues)}
          >
            Reset
          </button>
        </div>
      </form>

      {preview && (
        <div className="card space-y-6 border-[var(--border-muted)]">
          <div className="flex flex-col gap-2">
            <div className="pill w-fit">Preview</div>
            <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
              {preview.values.destination}
            </h2>
            <p className="text-sm text-slate-500">
              {preview.categories.length} categories · {preview.values.days} days ·{" "}
              {preview.values.tripType} · {preview.values.weather} weather
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {preview.categories.slice(0, 4).map((category) => (
              <div
                key={category.id}
                className="rounded-2xl border border-[var(--border-muted)] bg-white p-4 text-sm"
              >
                <p className="font-semibold text-[var(--text-primary)]">{category.title}</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-slate-500">
                  {category.items.slice(0, 4).map((item) => (
                    <li key={item.id}>{item.name}</li>
                  ))}
                  {category.items.length > 4 && <li>+ {category.items.length - 4} more</li>}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleUseChecklist}
              className="btn-primary"
            >
              Use this checklist
            </button>
            <button
              className="btn-secondary"
              onClick={() => setPreview(null)}
            >
              Close preview
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

