import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

import TimeRangeChip from "./TimeRangeChip.tsx";

export default function ReservationDetailPlaceholder() {
  return (
    <Card
      sx={{ minWidth: 600, maxWidth: 600, mx: "auto", mt: 4, boxShadow: 3 }}
    >
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Reservation
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
        </Box>

        <Grid container spacing={2}>
          <Grid size={6}>
            <Typography variant="subtitle2">Food Truck</Typography>
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          </Grid>

          <Grid size={6}>
            <Typography variant="subtitle2">Expected Guests</Typography>
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          </Grid>

          <TimeRangeChip placeholder={true} variant={"full"} />
        </Grid>
        <Stack direction="row" spacing={2} mt={3}>
          <Button variant="contained" disabled={true}>
            Confirm
          </Button>
          <Button variant="outlined" disabled={true}>
            Reject
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
