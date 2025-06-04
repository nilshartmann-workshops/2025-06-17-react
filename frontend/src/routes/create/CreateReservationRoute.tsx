import { Box, Button, MenuItem, Select, TextField } from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchFoodTrucksOpts } from "../../queries.ts";
import ReservationEditor from "./ReservationEditor.tsx";

export default function CreateReservationRoute() {
  return <ReservationEditor />;
}
