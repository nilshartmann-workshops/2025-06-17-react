import { Box, Typography } from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import OrderButtonBar from "../../components/OrderButtonBar.tsx";
import ReservationTable from "../../components/ReservationTable.tsx";
import { getReservationListOpts } from "../../queries.ts";
import { OrderBy } from "../../types.ts";

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
        <OrderButtonBar />
      </Box>

      <ReservationsLoader />
    </>
  );
}

function ReservationsLoader() {
  //                         v------ React Router!
  const [searchParams] = useSearchParams({ orderBy: "start" });
  const orderBy = searchParams.get("orderBy") as OrderBy;

  const { data: reservations } = useSuspenseQuery(
    getReservationListOpts(orderBy),
  );
  //
  return <ReservationTable reservations={reservations} />;
}
