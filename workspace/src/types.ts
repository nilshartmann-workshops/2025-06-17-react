// type ID = string;
// type CallbackFunction = (newValue: string) => void
// type YesOrNo = "yes" | "no";

import { z } from "zod/v4"; // <-- auf v4 achten!

// export type TimeRange = {
//   start: string;
//   end: string;
// };

export const IsoDateTime = z.iso.datetime({ offset: true });

export type IsoDateTime = z.infer<typeof IsoDateTime>;

export const TimeRange = z.object({
  start: IsoDateTime,
  end: IsoDateTime,
});

export type TimeRange = z.infer<typeof TimeRange>;

//
// export const Reservation = z.object({
//   timeRange: TimeRange
// })
//
// export type Reservation = z.infer<typeof Reservation>;

function printTime(t: TimeRange) {}

//
// const t: TimeRange = {
//   start: "a",
//   end: "b",
// };

// export type Reservation = {
//   id: string;
//   foodTruck: string;
//   customerName: string;
//   timeRange: TimeRange;
//   expectedGuests: number;
//   specialRequests?: string;
//   status: ReservationStatus;
// };
const ReservationStatus = z.enum(["Requested", "Confirmed", "Rejected"]);
// export type ReservationStatus = "Requested" | "Confirmed" | "Rejected";
export type ReservationStatus = z.infer<typeof ReservationStatus>;

export const Reservation = z.object({
  id: z.string(),
  foodTruck: z.string(),
  customerName: z.string(),
  timeRange: TimeRange,
  expectedGuests: z.number().min(1),
  specialRequests: z.string().nullish(),
  status: ReservationStatus,
});
export type Reservation = z.infer<typeof Reservation>;

export type OrderBy = "foodTruck" | "status" | "customerName" | "start" | "";
