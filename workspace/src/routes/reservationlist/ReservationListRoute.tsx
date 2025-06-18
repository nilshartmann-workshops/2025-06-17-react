import { Box, Button, Typography } from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
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
  useEffect(() => {
    console.log("ReservationsLoader mounted");

    return () => {
      console.log("ReservationsLoader unmounted");
    };
  }, []);
  //                         v------ React Router!
  const [searchParams] = useSearchParams({ orderBy: "start" });
  const orderBy = searchParams.get("orderBy") as OrderBy;
  const [count, setCount] = useState(0);

  const { data: reservations, refetch } = useSuspenseQuery(
    getReservationListOpts(orderBy),
  );
  //
  return (
    <div>
      <Button onClick={() => setCount(count + 1)}>{count}</Button>
      <Button onClick={() => refetch()}>Aktualisieren</Button>
      <ReservationTable reservations={reservations} />
    </div>
  );
}
