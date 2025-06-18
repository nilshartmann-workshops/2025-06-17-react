import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  useQueryErrorResetBoundary,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { useParams } from "react-router-dom";

import ReservationDetailCard from "../../components/ReservationDetailCard.tsx";
import ReservationDetailPlaceholder from "../../components/ReservationDetailPlaceholder.tsx";
import { getReservationByIdOpts } from "../../queries.ts";

function MyErrorFallback(props: FallbackProps) {
  console.error("fallback", props);
  return (
    <Paper>
      <Stack padding={2}>
        <Typography variant={"h2"}>Error!</Typography>
        {props.error.toString()}
        <Button
          variant={"contained"}
          onClick={() => props.resetErrorBoundary()}
        >
          Retry!
        </Button>
      </Stack>
    </Paper>
  );
}

export default function ReservationRoute() {
  const { reservationId } = useParams();
  const { reset } = useQueryErrorResetBoundary();

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
        <ErrorBoundary FallbackComponent={MyErrorFallback} onReset={reset}>
          <Suspense fallback={<ReservationDetailPlaceholder />}>
            <ReservationDetailLoader reservationId={reservationId} />
          </Suspense>
        </ErrorBoundary>
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
