import { Box, Typography } from "@mui/material";
import OrderButtonBar from "./OrderButtonBar.tsx";
import ReservationTable from "./ReservationTable.tsx";

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

      <ReservationTable />
    </>
  );
}
