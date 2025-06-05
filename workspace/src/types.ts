export type TimeRange = {
  start: string;
  end: string;
};

export type Reservation = {
  id: string;
  foodTruck: string;
  customerName: string;
  timeRange: TimeRange;
  expectedGuests: number;
  specialRequests?: string;
  status: ReservationStatus;
};

export type ReservationStatus = "Requested" | "Confirmed" | "Rejected";

export type OrderBy = "foodTruck" | "status" | "customerName" | "start" | "";
