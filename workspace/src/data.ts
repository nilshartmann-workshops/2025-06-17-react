// In einer echten Anwendung würden wir die Daten vom Server lesen...
import dayjs from "dayjs";

import { TimeRange } from "./types.ts";

export const foodTrucks = [
  { id: "1", name: "Burger Beast" },
  { id: "2", name: "Curry Cruiser" },
  { id: "3", name: "Pizza Palace" },
  { id: "4", name: "Tasty Tacos" },
  {
    id: "5",
    name: "Wrap it Up",
  },
];

/**
 * Liefert einen ungefähren Preis für eine Reservierung zurück
 *
 * In einer richtigen Anwendung wäre diese Geschäftslogik eventuell Teil des
 * Backends und würde über einen API-Call ermittelt
 */
export const calculatePrice = (
  timeRange: TimeRange,
  expectedGuests?: number,
) => {
  if (!timeRange || !timeRange.start || !timeRange.end) {
    return "n/a: TimeRange is missing or incomplete";
  }

  if (typeof expectedGuests !== "number" || isNaN(expectedGuests)) {
    return "n/a: expected guests unknown";
  }
  const start = dayjs(timeRange.start);
  const end = dayjs(timeRange.end);

  const startOfStartDay = start.startOf("day");
  const startOfEndDay = end.startOf("day");
  const diffInDays = startOfEndDay.diff(startOfStartDay, "day");

  const price = diffInDays * expectedGuests * 10;
  if (price < 0) {
    return "n/a: data is incomplete or invalid";
  }

  return `${price} EUR`;
};

/**
 * Entspricht dem Typen, der beim Speichern einer Reservierung
 * benötigt wird
 */
export type NewReservation = {
  foodTruckId: string;
  customerName: string;
  timeRange: TimeRange;
  expectedGuests: number;
  specialRequests?: string | null;
};
