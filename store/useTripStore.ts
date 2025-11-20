import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ChecklistCategory, TripChecklist } from "@/types/trip";
import { createId } from "@/utils/id";

const cloneTrip = (trip: TripChecklist, resetPacked = false): TripChecklist => ({
  ...trip,
  categories: trip.categories.map((category) => ({
    ...category,
    items: category.items.map((item) => ({
      ...item,
      packed: resetPacked ? false : item.packed,
    })),
  })),
});

interface TripState {
  currentTrip: TripChecklist | null;
  trips: TripChecklist[];
  setCurrentTrip: (trip: TripChecklist) => void;
  clearCurrentTrip: () => void;
  updateCategories: (categories: ChecklistCategory[]) => void;
  togglePacked: (categoryId: string, itemId: string) => void;
  addCustomItem: (categoryId: string, name: string) => void;
  editItem: (categoryId: string, itemId: string, name: string) => void;
  deleteItem: (categoryId: string, itemId: string) => void;
  addCategory: (title: string) => void;
  reorderCategories: (order: string[]) => void;
  saveTrip: () => TripChecklist | null;
  deleteTrip: (id: string) => void;
  duplicateTrip: (id: string) => TripChecklist | undefined;
  loadTrip: (id: string) => TripChecklist | undefined;
  resetTrips: () => void;
}

const memoryStorage = (): Storage => {
  const store = new Map<string, string>();
  return {
    get length() {
      return store.size;
    },
    clear: () => store.clear(),
    getItem: (key: string) => store.get(key) ?? null,
    key: (index: number) => Array.from(store.keys())[index] ?? null,
    removeItem: (key: string) => store.delete(key),
    setItem: (key: string, value: string) => store.set(key, value),
  };
};

const resolvedStorage = () =>
  typeof window === "undefined" ? memoryStorage() : window.localStorage;

const updateCategoryItems = (
  categories: ChecklistCategory[],
  categoryId: string,
  updater: (items: ChecklistCategory["items"]) => ChecklistCategory["items"]
) =>
  categories.map((category) =>
    category.id === categoryId
      ? { ...category, items: updater(category.items) }
      : category
  );

export const useTripStore = create<TripState>()(
  persist(
    (set, get) => ({
      currentTrip: null,
      trips: [],
      setCurrentTrip: (trip) => set({ currentTrip: cloneTrip(trip) }),
      clearCurrentTrip: () => set({ currentTrip: null }),
      updateCategories: (categories) =>
        set((state) =>
          state.currentTrip
            ? { currentTrip: { ...state.currentTrip, categories } }
            : state
        ),
      togglePacked: (categoryId, itemId) =>
        set((state) => {
          if (!state.currentTrip) return state;
          const categories = updateCategoryItems(
            state.currentTrip.categories,
            categoryId,
            (items) =>
              items.map((item) =>
                item.id === itemId ? { ...item, packed: !item.packed } : item
              )
          );
          return { currentTrip: { ...state.currentTrip, categories } };
        }),
      addCustomItem: (categoryId, name) =>
        set((state) => {
          if (!state.currentTrip) return state;
          const categories = updateCategoryItems(
            state.currentTrip.categories,
            categoryId,
            (items) => [
              ...items,
              { id: createId(), name, packed: false, source: "custom" },
            ]
          );
          return { currentTrip: { ...state.currentTrip, categories } };
        }),
      editItem: (categoryId, itemId, name) =>
        set((state) => {
          if (!state.currentTrip) return state;
          const categories = updateCategoryItems(
            state.currentTrip.categories,
            categoryId,
            (items) =>
              items.map((item) =>
                item.id === itemId ? { ...item, name } : item
              )
          );
          return { currentTrip: { ...state.currentTrip, categories } };
        }),
      deleteItem: (categoryId, itemId) =>
        set((state) => {
          if (!state.currentTrip) return state;
          const categories = updateCategoryItems(
            state.currentTrip.categories,
            categoryId,
            (items) => items.filter((item) => item.id !== itemId)
          );
          return { currentTrip: { ...state.currentTrip, categories } };
        }),
      addCategory: (title) =>
        set((state) => {
          if (!state.currentTrip) return state;
          const newCategory: ChecklistCategory = {
            id: createId(),
            title,
            items: [],
          };
          return {
            currentTrip: {
              ...state.currentTrip,
              categories: [...state.currentTrip.categories, newCategory],
            },
          };
        }),
      reorderCategories: (order) =>
        set((state) => {
          if (!state.currentTrip) return state;
          const orderMap = new Map(order.map((id, index) => [id, index]));
          const sorted = [...state.currentTrip.categories].sort(
            (a, b) =>
              (orderMap.get(a.id) ?? Number.MAX_SAFE_INTEGER) -
              (orderMap.get(b.id) ?? Number.MAX_SAFE_INTEGER)
          );
          return { currentTrip: { ...state.currentTrip, categories: sorted } };
        }),
      saveTrip: () => {
        const { currentTrip } = get();
        if (!currentTrip) return null;
        const storedTrip = cloneTrip(currentTrip);
        set((state) => ({
          trips: [
            {
              ...storedTrip,
              id: createId(),
              createdAt: new Date().toISOString(),
            },
            ...state.trips,
          ],
        }));
        return currentTrip;
      },
      deleteTrip: (id) =>
        set((state) => ({
          trips: state.trips.filter((trip) => trip.id !== id),
          currentTrip:
            state.currentTrip?.id === id ? null : state.currentTrip,
        })),
      duplicateTrip: (id) => {
        const target = get().trips.find((trip) => trip.id === id);
        if (!target) return undefined;
        const duplicated: TripChecklist = {
          ...target,
          id: createId(),
          createdAt: new Date().toISOString(),
          categories: target.categories.map((category) => ({
            ...category,
            id: createId(),
            items: category.items.map((item) => ({
              ...item,
              id: createId(),
              packed: false,
            })),
          })),
        };
        set({ currentTrip: cloneTrip(duplicated) });
        return duplicated;
      },
      loadTrip: (id) => {
        const target = get().trips.find((trip) => trip.id === id);
        if (!target) return undefined;
        const cloned = cloneTrip(target);
        set({ currentTrip: cloned });
        return cloned;
      },
      resetTrips: () => set({ trips: [], currentTrip: null }),
    }),
    {
      name: "travelbag-trips",
      storage: createJSONStorage(resolvedStorage),
      partialize: (state) => ({ trips: state.trips }),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error("Failed to hydrate trip store", error);
        }
      },
    }
  )
);

