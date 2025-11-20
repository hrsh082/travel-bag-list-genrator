import travelData from "@/data/travelData.json";
import {
  ChecklistCategory,
  TripChecklist,
  TripFormValues,
} from "@/types/trip";
import { createId } from "@/utils/id";

type TravelData = typeof travelData;

const withCategory = (
  map: Map<string, Set<string>>,
  title: string,
  items: string[] = []
) => {
  if (!map.has(title)) {
    map.set(title, new Set());
  }
  const set = map.get(title)!;
  items.forEach((item) => {
    if (item) {
      set.add(item);
    }
  });
};

const normalize = (value: string) => value.trim().toLowerCase();

const pickCountryMatch = (countryMap: Record<string, string[]>, destination: string) => {
  const normalizedDest = normalize(destination);
  return Object.entries(countryMap).find(([country]) =>
    normalizedDest.includes(country)
  );
};

const isInRegion = (
  keywordList: string[],
  destination: string
) => {
  const normalizedDest = normalize(destination);
  return keywordList.some((keyword) => normalizedDest.includes(keyword));
};

export const generateChecklist = (
  values: TripFormValues,
  data: TravelData = travelData
): TripChecklist => {
  const categories = new Map<string, Set<string>>();

  Object.entries(data.universal).forEach(([title, items]) =>
    withCategory(categories, title, items)
  );

  const normalizedDestination = normalize(values.destination);

  // Days rule
  if (values.days > 5) {
    withCategory(categories, "Clothing", [
      "Extra outfits for extended stay",
      "Laundry detergent sheets",
    ]);
  }

  // Weather & season rules
  withCategory(categories, "Weather Ready", data.weather[values.weather]);
  withCategory(categories, "Seasonal Picks", data.seasons[values.season]);

  // Trip type logic
  withCategory(
    categories,
    values.tripType === "business" ? "Business Gear" : "Trip Highlights",
    data.tripTypes[values.tripType]
  );

  // Travel mode
  withCategory(categories, "On The Move", data.travelModes[values.travelMode]);

  if (values.travelMode === "flight") {
    withCategory(categories, "On The Move", [
      "Travel charger organizer",
      "Passport copies",
    ]);
  }
  if (values.travelMode === "train") {
    withCategory(categories, "On The Move", [
      "Lightweight blanket",
      "Pocket sanitizer",
    ]);
  }
  if (values.travelMode === "car") {
    withCategory(categories, "On The Road", [
      "Car snacks",
      "Extra power bank",
      "Reusable bottles",
    ]);
  }

  // Country specific
  const matchedCountry = pickCountryMatch(data.countrySpecific, normalizedDestination);
  if (matchedCountry) {
    withCategory(
      categories,
      "Destination Intel",
      matchedCountry[1]
    );
  }

  // Region logic
  const { regions } = data;
  if (regions.europe.countries.some((country) => normalizedDestination.includes(country))) {
    withCategory(categories, "Region Specials", regions.europe.items);
  }
  if (isInRegion(regions.southIndia.keywords, normalizedDestination)) {
    withCategory(categories, "Region Specials", regions.southIndia.items);
  }
  if (isInRegion(regions.hillStation.keywords, normalizedDestination)) {
    withCategory(categories, "Region Specials", regions.hillStation.items);
  }

  // Additional logic from spec
  if (values.weather === "cold") {
    withCategory(categories, "Weather Ready", [
      "Woollen gloves",
      "Heavy jacket",
      "Thermal leggings",
    ]);
  }
  if (values.weather === "rainy") {
    withCategory(categories, "Weather Ready", [
      "Waterproof backpack cover",
      "Quick-dry socks",
    ]);
  }
  if (values.weather === "hot") {
    withCategory(categories, "Weather Ready", [
      "Cooling mist spray",
      "Hydration tablets",
    ]);
  }

  // Adventure extras
  if (values.tripType === "adventure") {
    withCategory(categories, "Safety & Gear", [
      "Compact multi-tool",
      "Dry-fit towels",
    ]);
  }

  const categoryList: ChecklistCategory[] = Array.from(
    categories.entries()
  ).map(([title, items]) => ({
    id: createId(),
    title,
    items: Array.from(items).map((name) => ({
      id: createId(),
      name,
      packed: false,
      source: "rule",
    })),
  }));

  return {
    id: createId(),
    createdAt: new Date().toISOString(),
    values,
    categories: categoryList,
  };
};

