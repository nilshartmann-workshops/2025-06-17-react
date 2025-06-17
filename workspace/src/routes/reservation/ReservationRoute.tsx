import { Box, Container } from "@mui/material";
import { useParams } from "react-router-dom";

export default function ReservationRoute() {
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        todo: Reservation anzeigen!
      </Box>
    </Container>
  );
}

function ReservationLoader() {
  const { reservationId } = useParams();

  if (reservationId === undefined) {
    throw new Error("Keine Reservation Id");
  }

  // queries.ts: queryOptions
  // <ReservationCard />
}
