import { queryOptions } from "@tanstack/react-query";
import __dont_use_ky from "ky";

import { OrderBy, Reservation } from "./types.ts";

export const apiKy = __dont_use_ky.extend({
  // retries im Fehlerfall besser über TanStack Query machen
  // (kann in der QueryClient-Konfiguration angepasst werden)
  retry: 0,

  // 🤔 Welche Möglichkeiten gibt es, diesen Wert z.B. Deployment-abhängig
  //    zu setzen?
  // prefixUrl: "http://localhost:7200/api",
});

export function getReservationListOpts(orderBy: OrderBy) {
  return queryOptions({
    queryKey: ["reservations", "list", { orderBy }],
    async queryFn() {
      const reservations = apiKy
        .get<
          Reservation[]
        >("http://localhost:7200/api/reservations?orderBy=" + orderBy)
        .json();
      return reservations;
    },
  });
}
