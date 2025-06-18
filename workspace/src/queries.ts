import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import __dont_use_ky from "ky";

import { OrderBy, Reservation, ReservationStatus } from "./types.ts";

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
    // staleTime: 5000,
    // gcTime: 7000,
    queryKey: ["reservations", "list", { orderBy }],
    async queryFn() {
      const result = await apiKy
        .get("reservations?orderBy=" + orderBy + "&slow=2400")
        .json();
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

export const useSetStatusMutation = (reservationId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    // mutationKey: ["setReservationStatus"],
    //                  v---- Achtung! Immer nur ein Parameter,
    //                         sonst Objekt verwenden
    // async mutationFn(data: { status: ReservationStatus; comment: string }) {
    async mutationFn(status: ReservationStatus) {
      return apiKy
        .put(`reservations/${reservationId}/status`, {
          json: { status },
        })
        .json();
    },
    // // OPTIMISTIC UPDATE Variante "Cache optimistisch aktualisieren und ggf. zurückrollen"
    // onMutate() {
    //   // ggf. aktuelle Mutation canceln
    //   // OPTIMISTIC UPDATE 1:
    //   // aktuelle Reservation aus dem Cache holen
    //   // aktuelle Reservation hier zurückliefern ("Context")
    //   //   -> für Rollback
    //   // "neue" Daten mit geänderten Daten in den Cache setzten
    //   //  (queryClient.setData(...))
    // },
    // onError() {
    //   // OPTIMISTIC UPDATE 2:
    //   // hier wird der "context" (=> Rückgabe-Wert aus onMutate)
    //   // übergeben,
    //   // d.h. hier können wir den Context ("alte" Reserveration)
    //   //   verwenden, um die "alte" Reservation wieder in den
    //   //   Cache setzen ("Rollback")
    // },
    onSuccess(data: unknown, input) {
      // OPTIMISTIC UPDATE 3: hier u.U. nichts mehr notwendig,
      //   weil in Schritt 1 die Daten im Cache schon
      //   aktuell sind
      const currentReservation = queryClient.getQueryData(
        getReservationByIdOpts(reservationId).queryKey,
      );

      if (!currentReservation) {
        return;
      }

      queryClient.setQueryData(getReservationByIdOpts(reservationId).queryKey, {
        ...currentReservation,
        status: input,
      });

      queryClient.invalidateQueries({
        queryKey: ["reservations", "list"],
      });
    },
  });
};
