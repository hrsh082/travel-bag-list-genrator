export type TripType = "business" | "casual" | "adventure" | "family";
export type WeatherType = "hot" | "cold" | "rainy" | "mixed" | "unknown";
export type SeasonType = "winter" | "summer" | "spring" | "monsoon";
export type TravelMode = "flight" | "train" | "car";

export interface TripFormValues {
  destination: string;
  days: number;
  tripType: TripType;
  weather: WeatherType;
  season: SeasonType;
  travelMode: TravelMode;
  gender?: "female" | "male" | "non-binary" | "prefer-not";
}

export interface ChecklistItem {
  id: string;
  name: string;
  packed: boolean;
  source: "universal" | "rule" | "custom" | "data";
}

export interface ChecklistCategory {
  id: string;
  title: string;
  items: ChecklistItem[];
  collapsed?: boolean;
}

export interface TripChecklist {
  id: string;
  createdAt: string;
  values: TripFormValues;
  categories: ChecklistCategory[];
  note?: string;
}

