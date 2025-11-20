import { Buffer } from "buffer";
import { TripChecklist } from "@/types/trip";

const encode = (payload: unknown) =>
  typeof window === "undefined"
    ? Buffer.from(JSON.stringify(payload)).toString("base64url")
    : btoa(encodeURIComponent(JSON.stringify(payload)));

const decode = (token: string) => {
  const raw =
    typeof window === "undefined"
      ? Buffer.from(token, "base64url").toString()
      : decodeURIComponent(atob(token));
  return JSON.parse(raw);
};

export interface SharedChecklistPayload {
  destination: string;
  createdAt: string;
  days: number;
  tripType: string;
  weather: string;
  travelMode: string;
  categories: {
    title: string;
    items: { name: string; packed: boolean }[];
  }[];
}

export const encodeTrip = (trip: TripChecklist) => {
  const payload: SharedChecklistPayload = {
    destination: trip.values.destination,
    createdAt: trip.createdAt,
    days: trip.values.days,
    tripType: trip.values.tripType,
    weather: trip.values.weather,
    travelMode: trip.values.travelMode,
    categories: trip.categories.map((category) => ({
      title: category.title,
      items: category.items.map((item) => ({
        name: item.name,
        packed: item.packed,
      })),
    })),
  };
  return encode(payload);
};

export const decodeTrip = (token: string) =>
  decode(token) as SharedChecklistPayload;

