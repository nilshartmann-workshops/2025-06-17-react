import { z } from "zod/v4";
import dayjs from "dayjs";

export interface TimeRange {
  // datetime with timezone offset in ISO format
  start: string;

  // datetime with timezone offset in ISO format
  end: string;
}

// export type Reservation = {
//   id: string;
//   foodTruck: string;
//   customerName: string;
//   timeRange: TimeRange;
//   specialRequests?: string;
//   status: ReservationStatus;
// }

export const TimeRange = z
  .object({
    start: z.iso.datetime({ offset: true }),
    end: z.iso.datetime({ offset: true }),
  })
  .refine(
    (val) => {
      return dayjs(val.start).isBefore(val.end);
    },
    {
      message: "end must be after before",
      path: ["end"], // path of error
    },
  );

export const Reservation = z.object({
  id: z.string(),
  foodTruck: z.string(),
  customerName: z.string(),
  timeRange: TimeRange,
  expectedGuests: z.number(),
  specialRequests: z.string().nullish(),
  status: z.enum(["Requested", "Confirmed", "Rejected"]),
});

export type ReservationStatus = "Requested" | "Confirmed" | "Rejected";

export type Reservation = z.infer<typeof Reservation>;

export type OrderBy = "foodTruck" | "status" | "customerName" | "start" | "";

export const Foodtruck = z.object({ id: z.string(), name: z.string() });
export type Foodtruck = z.infer<typeof Foodtruck>;

export const GetFoodtrucksResponse = Foodtruck.array();

// Den Typen würde ich zur Verfügung stellen
export type NewReservation = Omit<Reservation, "id" | "status">;
