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
    queryKey: ["reservations", "list", { orderBy }],
    async queryFn() {
      const result = await apiKy.get("reservations?orderBy=" + orderBy).json();
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
        .put(`reservations/${reservationId}/status?slow=4000`, {
          json: { status },
        })
        .json();
    },
    onSuccess(data: unknown, input) {
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
    },
  });
};
