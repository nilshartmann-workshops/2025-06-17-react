import { Box, Container } from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import ReservationDetailCard from "../../components/ReservationDetailCard.tsx";
import { getReservationByIdOpts } from "../../queries.ts";

export default function ReservationRoute() {
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ReservationLoader />
      </Box>
    </Container>
  );
}

function ReservationLoader() {
  const { reservationId } = useParams();

  if (reservationId === undefined) {
    throw new Error("Keine Reservation Id");
  }

  return <ReservationDetailLoader reservationId={reservationId} />;

  // queries.ts: queryOptions
  // <ReservationCard />
}

type ReservationDetailLoaderProps = {
  reservationId: string;
};

function ReservationDetailLoader({
  reservationId,
}: ReservationDetailLoaderProps) {
  const { data: reservation } = useSuspenseQuery(
    getReservationByIdOpts(reservationId),
  );

  return <ReservationDetailCard reservation={reservation} />;
}
