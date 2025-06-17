import { Box, Typography } from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";

import ReservationTable from "../../components/ReservationTable.tsx";
import { getReservationListOpts } from "../../queries.ts";

export default function ReservationListRoute() {
  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant={"h3"} align={"left"}>
          Reservations
        </Typography>
      </Box>

      <ReservationsLoader />
    </>
  );
}

function ReservationsLoader() {
  const { data: reservations } = useSuspenseQuery(getReservationListOpts());
  //
  return <ReservationTable reservations={reservations} />;
}
