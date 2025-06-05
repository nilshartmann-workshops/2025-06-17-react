import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import type { Reservation } from "../types.ts";
import StatusChip from "./StatusChip.tsx";
import TimeRangeChip from "./TimeRangeChip.tsx";

type ReservationDetailCardProps = {
  reservation: Reservation;
};

export default function ReservationDetailCard({
  reservation,
}: ReservationDetailCardProps) {
  return (
    <Card
      sx={{ minWidth: 600, maxWidth: 600, mx: "auto", mt: 4, boxShadow: 3 }}
    >
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Reservation for {reservation.customerName}
        </Typography>

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
          <Box sx={{ mb: 2 }}>
            <StatusChip status={reservation.status} variant={"lg"} />
          </Box>
          <Button variant="text" disabled={reservation.status === "Confirmed"}>
            Confirm
          </Button>
          <Button variant="text" disabled={reservation.status === "Rejected"}>
            Reject
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
