export type ReservationStatus = 'Requested' | 'Confirmed' | 'Rejected';

export interface TimeRange {
  // datetime with timezone offset in ISO format
  start: string;

  // datetime with timezone offset in ISO format
  end: string;
}

export type Reservation = {
  id: string;
  foodTruck: string;
  customerName: string;
  timeRange: TimeRange;
  specialRequests?: string;
  status: ReservationStatus;
}
