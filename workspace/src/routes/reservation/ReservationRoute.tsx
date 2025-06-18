import { Box, Container } from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { useParams } from "react-router-dom";

import ReservationDetailCard from "../../components/ReservationDetailCard.tsx";
import ReservationDetailPlaceholder from "../../components/ReservationDetailPlaceholder.tsx";
import { getReservationByIdOpts } from "../../queries.ts";

export default function ReservationRoute() {
  const { reservationId } = useParams();

  if (reservationId === undefined) {
    throw new Error("Keine Reservation Id");
  }

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Suspense fallback={<ReservationDetailPlaceholder />}>
          <ReservationDetailLoader reservationId={reservationId} />
        </Suspense>
      </Box>
    </Container>
  );
}

type ReservationDetailLoaderProps = {
  reservationId: string;
};

function ReservationDetailLoader({
  reservationId,
}: ReservationDetailLoaderProps) {
  const { data: reservation } = useSuspenseQuery(
    // <--------------
    getReservationByIdOpts(reservationId),
  );

  return <ReservationDetailCard reservation={reservation} />; // <---
}
