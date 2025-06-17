import { queryOptions } from "@tanstack/react-query";
import __dont_use_ky from "ky";

import { OrderBy, Reservation } from "./types.ts";

export const apiKy = __dont_use_ky.extend({
  // retries im Fehlerfall besser über TanStack Query machen
  // (kann in der QueryClient-Konfiguration angepasst werden)
  retry: 0,

  // 🤔 Welche Möglichkeiten gibt es, diesen Wert z.B. Deployment-abhängig
  //    zu setzen?
  prefixUrl: "http://localhost:7200/api",
});

export function getReservationListOpts(orderBy: OrderBy) {
  return queryOptions({
    queryKey: ["reservations", "list", { orderBy }],
    async queryFn() {
      const result = apiKy.get("reservations?orderBy=" + orderBy).json();
      return Reservation.array().parse(result);
    },
  });
}

export const getReservationByIdOpts = (reservationId: string) =>
  queryOptions({
    queryKey: ["reservations", "detail", reservationId],
    async queryFn() {
      const result = await apiKy.get(`reservations/${reservationId}`).json();
      return Reservation.parse(result);
    },
  });
