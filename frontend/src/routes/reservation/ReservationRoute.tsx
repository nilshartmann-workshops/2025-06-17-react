import { Box, Container } from "@mui/material";
import { useParams } from "react-router-dom";

import ReservationDetailLoader from "../../components/ReservationDetailLoader.tsx";

export default function ReservationRoute() {
  const { reservationId } = useParams();

  if (!reservationId) {
    throw new Error("Invalid reservationId");
  }

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ReservationDetailLoader reservationId={reservationId} />
      </Box>
    </Container>
  );
}
