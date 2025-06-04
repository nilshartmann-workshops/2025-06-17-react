import _ky from "ky";
import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  GetFoodtrucksResponse,
  type NewReservation,
  type OrderBy,
  Reservation,
} from "./types.ts";

export const apiKy = _ky.extend({
  retry: 0,
  timeout: 10_000,
  prefixUrl: "http://localhost:7200/api",
});

export const fetchReservationListOpts = (orderBy: OrderBy = "") =>
  queryOptions({
    queryKey: ["reservations", "list", { orderBy }],
    async queryFn() {
      const result = await apiKy
        .get(`reservations?orderBy=${orderBy}&slow=2400`)
        .json();
      return Reservation.array().parse(result);
    },
  });

export const fetchReservationOpts = (reservationId: string) =>
  queryOptions({
    queryKey: ["reservations", "detail", reservationId],
    async queryFn() {
      const result = await apiKy
        .get(`reservations/${reservationId}?slow=2400`)
        .json();
      return Reservation.parse(result);
    },
  });

export const fetchFoodTrucksOpts = () =>
  queryOptions({
    queryKey: ["foodtrucks", "list"],
    async queryFn() {
      const result = await apiKy.get(`foodtrucks`).json();
      return GetFoodtrucksResponse.parse(result);
    },
  });

export const useSetStatusMutation = (reservationId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn(status: string) {
      const result = await apiKy
        .put(`reservations/${reservationId}/status`, {
          json: { status },
        })
        .json();
      return Reservation.parse(result);
    },
    onSuccess(data: Reservation) {
      queryClient.setQueryData(
        fetchReservationOpts(reservationId).queryKey,
        data,
      );
      queryClient.invalidateQueries({
        queryKey: ["reservations", "list"],
      });
    },
  });
};

export const useCreateReservationMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn(newReservation: NewReservation) {
      const result = await apiKy
        .post(`reservations`, {
          json: newReservation,
        })
        .json();
      return Reservation.parse(result);
    },
    onSuccess(data: Reservation) {
      queryClient.setQueryData(fetchReservationOpts(data.id).queryKey, data);
      queryClient.invalidateQueries({
        queryKey: ["reservations", "list"],
      });
    },
  });
};
