import dayjs from "dayjs";
import { z } from "zod/v4";

// export type Reservation = {
//   id: string;
//   foodTruck: string;
//   customerName: string;
//   timeRange: TimeRange;
//   specialRequests?: string;
//   status: ReservationStatus;
// }

export const IsoDateTimeWithOffset = z.iso.datetime({ offset: true });

export const TimeRange = z
  .object({
    start: IsoDateTimeWithOffset,
    end: IsoDateTimeWithOffset,
  })
  .refine(
    (val) => {
      return dayjs(val.start).isBefore(val.end);
    },
    {
      message: "end must be after before",
      path: ["end"],
    },
  );

export type TimeRange = z.infer<typeof TimeRange>;

export const ReservationStatus = z.enum(["Requested", "Confirmed", "Rejected"]);
export type ReservationStatus = z.infer<typeof ReservationStatus>;

export const Reservation = z.object({
  id: z.string(),
  foodTruck: z.string(),
  customerName: z.string(),
  timeRange: TimeRange,
  expectedGuests: z.number(),
  specialRequests: z.string().nullish(),
  status: ReservationStatus,
});

export type Reservation = z.infer<typeof Reservation>;

export type OrderBy = "foodTruck" | "status" | "customerName" | "start" | "";

export const Foodtruck = z.object({ id: z.string(), name: z.string() });
export type Foodtruck = z.infer<typeof Foodtruck>;

export const GetFoodtrucksResponse = Foodtruck.array();

// Den Typen würde ich zur Verfügung stellen
export type NewReservation = Omit<Reservation, "id" | "status">;
