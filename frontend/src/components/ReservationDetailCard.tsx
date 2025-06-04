import { Reservation } from "../types.ts";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import StatusChip from "./StatusChip.tsx";
import TimeRangeChip from "./TimeRangeChip.tsx";
import { fetchReservationOpts, useSetStatusMutation } from "../queries.ts";
import { Suspense } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";

type ReservationDetailCardProps = {
  reservation: Reservation;
};

// Könnte in einer Anwendung auch in ReservationDetailLoader sein
//   hier nur aufgeteilt, damit man in der Demo
//    eine Reservation auch ohne Suspense verwenden kann

export default function ReservationDetailCard({
  reservation,
}: ReservationDetailCardProps) {
  const mutation = useSetStatusMutation(reservation.id);

  return (
    <Card
      sx={{ minWidth: 600, maxWidth: 600, mx: "auto", mt: 4, boxShadow: 3 }}
    >
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Reservation for {reservation.customerName}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <StatusChip status={reservation.status} variant={"lg"} />
        </Box>

        <Grid container spacing={2}>
          <Grid size={6}>
            <Typography variant="subtitle2">Food Truck</Typography>
            <Typography>{reservation.foodTruck}</Typography>
          </Grid>

          <Grid size={6}>
            <Typography variant="subtitle2">Expected Guests</Typography>
            <Typography>{reservation.expectedGuests}</Typography>
          </Grid>

          <TimeRangeChip range={reservation.timeRange} variant={"full"} />

          {reservation.specialRequests && (
            <Grid size={12}>
              <Typography variant="subtitle2">Special Requests</Typography>
              <Typography>{reservation.specialRequests}</Typography>
            </Grid>
          )}
        </Grid>
        <Stack direction="row" spacing={2} mt={3}>
          <Button
            variant="contained"
            disabled={reservation.status === "Confirmed"}
            onClick={() => mutation.mutate("Confirmed")}
          >
            Confirm
          </Button>
          <Button
            variant="outlined"
            disabled={reservation.status === "Rejected"}
            onClick={() => mutation.mutate("Rejected")}
          >
            Reject
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
