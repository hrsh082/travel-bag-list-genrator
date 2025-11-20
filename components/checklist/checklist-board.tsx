"use client";

import { useState } from "react";
import { useTripStore } from "@/store/useTripStore";
import { useHydrated } from "@/hooks/useHydrated";
import { downloadChecklistPdf } from "@/utils/pdf";
import { encodeTrip } from "@/utils/share";
import {
  Download,
  FilePlus2,
  Link2,
  Plus,
  Save,
} from "lucide-react";

export const ChecklistBoard = () => {
  const hydrated = useHydrated();
  const {
    currentTrip,
    togglePacked,
    addCustomItem,
    deleteItem,
    editItem,
    addCategory,
    reorderCategories,
    updateCategories,
    saveTrip,
  } = useTripStore();
  const [newItem, setNewItem] = useState<Record<string, string>>({});
  const [shareStatus, setShareStatus] = useState<"idle" | "copied" | "error">(
    "idle"
  );
  const [pdfLoading, setPdfLoading] = useState(false);

  if (!hydrated) {
    return <div className="card animate-pulse text-center text-slate-400">Loading your checklist...</div>;
  }

  if (!currentTrip) {
    return (
      <div className="card text-center">
        <h2 className="text-2xl font-semibold text-[var(--text-primary)]">No checklist yet</h2>
        <p className="mt-2 text-sm text-slate-500">Start by creating a trip on the Plan Trip page.</p>
        <a href="/plan" className="btn-primary mt-4 inline-flex">
          Open planner
        </a>
      </div>
    );
  }

  const handleAddItem = (categoryId: string) => {
    const value = newItem[categoryId]?.trim();
    if (!value) return;
    addCustomItem(categoryId, value);
    setNewItem((prev) => ({ ...prev, [categoryId]: "" }));
  };

  const handleShare = async () => {
    try {
      const token = encodeTrip(currentTrip);
      const origin =
        process.env.NEXT_PUBLIC_SITE_URL ||
        (typeof window !== "undefined" ? window.location.origin : "");
      const url = `${origin}/share/${token}`;
      await navigator.clipboard.writeText(url);
      setShareStatus("copied");
      setTimeout(() => setShareStatus("idle"), 2500);
    } catch (error) {
      console.error(error);
      setShareStatus("error");
    }
  };

  const handleDownload = async () => {
    setPdfLoading(true);
    await downloadChecklistPdf(currentTrip);
    setPdfLoading(false);
  };

  const handleSave = () => {
    saveTrip();
    setShareStatus("idle");
  };

  const moveCategory = (categoryId: string, direction: "up" | "down") => {
    const ids = currentTrip.categories.map((category) => category.id);
    const index = ids.indexOf(categoryId);
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= ids.length) return;
    [ids[index], ids[swapIndex]] = [ids[swapIndex], ids[index]];
    reorderCategories(ids);
  };

  const toggleCollapse = (categoryId: string) => {
    const categories = currentTrip.categories;
    const updated = categories.map((category) =>
      category.id === categoryId
        ? { ...category, collapsed: !category.collapsed }
        : category
    );
    updateCategories(updated);
  };

  return (
    <div className="space-y-5">
      <div className="sticky top-20 z-30 card border-[var(--border-muted)] bg-white/90 backdrop-blur">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">Current trip</p>
            <p className="text-xl font-semibold text-[var(--text-primary)]">
              {currentTrip.values.destination}
            </p>
            <p className="text-sm text-slate-500">
              {currentTrip.values.days} days · {currentTrip.values.tripType} · {currentTrip.values.weather} ·{" "}
              {currentTrip.values.travelMode}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-sm">
            <button onClick={handleSave} className="btn-secondary">
              <Save className="size-4" />
              Save
            </button>
            <button onClick={handleDownload} className="btn-secondary" disabled={pdfLoading}>
              <Download className="size-4" />
              {pdfLoading ? "Preparing..." : "PDF"}
            </button>
            <button onClick={handleShare} className="btn-primary text-sm">
              <Link2 className="size-4" />
              {shareStatus === "copied"
                ? "Link copied"
                : shareStatus === "error"
                ? "Retry share"
                : "Share checklist"}
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => addCategory("Custom category")}
          className="inline-flex items-center gap-2 rounded-2xl border border-dashed border-[var(--border-muted)] px-4 py-2 text-sm text-slate-600"
        >
          <FilePlus2 className="size-4" />
          Add category
        </button>
      </div>

      <div className="space-y-4">
        {currentTrip.categories.map((category) => (
          <div key={category.id} className="rounded-3xl border border-[var(--border-muted)] bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-[var(--text-primary)]">{category.title}</h2>
                <p className="text-xs uppercase tracking-wide text-slate-400">{category.items.length} items</p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                <button onClick={() => moveCategory(category.id, "up")} className="rounded-full border border-[var(--border-muted)] px-3 py-1">
                  Move up
                </button>
                <button onClick={() => moveCategory(category.id, "down")} className="rounded-full border border-[var(--border-muted)] px-3 py-1">
                  Move down
                </button>
                <button onClick={() => toggleCollapse(category.id)} className="rounded-full border border-[var(--border-muted)] px-3 py-1">
                  {category.collapsed ? "Expand" : "Collapse"}
                </button>
              </div>
            </div>

            {!category.collapsed && (
              <>
                <ul className="mt-4 space-y-2">
                  {category.items.map((item) => (
                    <li key={item.id} className="flex items-center justify-between rounded-2xl border border-[var(--border-muted)] bg-white px-4 py-2 text-sm">
                      <label className="flex flex-1 items-center gap-3">
                        <input
                          type="checkbox"
                          checked={item.packed}
                          onChange={() => togglePacked(category.id, item.id)}
                          className="size-4 rounded border-[var(--border-muted)] text-[var(--brand-primary)] focus:ring-[var(--brand-primary)]"
                        />
                        <span className={item.packed ? "line-through text-slate-400" : ""}>{item.name}</span>
                      </label>
                      <div className="flex gap-2 text-xs text-slate-500">
                        <button
                          onClick={() => {
                            const nextName = prompt("Edit item", item.name);
                            if (nextName) {
                              editItem(category.id, item.id, nextName);
                            }
                          }}
                          className="rounded-full border border-[var(--border-muted)] px-3 py-1"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteItem(category.id, item.id)}
                          className="rounded-full border border-red-200 px-3 py-1 text-red-500"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap gap-2">
                  <input
                    type="text"
                    placeholder="Add custom item"
                    value={newItem[category.id] ?? ""}
                    onChange={(event) =>
                      setNewItem((prev) => ({
                        ...prev,
                        [category.id]: event.target.value,
                      }))
                    }
                    className="flex-1 rounded-2xl border border-[var(--border-muted)] px-4 py-2 text-sm"
                  />
                  <button onClick={() => handleAddItem(category.id)} className="btn-secondary text-sm">
                    <Plus className="size-4" />
                    Add
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

