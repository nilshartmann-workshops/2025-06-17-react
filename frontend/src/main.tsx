import "./index.css";
import "./setup-dayjs.ts";

import { CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import AppLayout from "./components/AppLayout.tsx";
import TimezoneContextProvider from "./components/TimezoneContext.tsx";
import { createQueryClient } from "./create-query-client.tsx";
import CreateReservationRoute from "./routes/create/CreateReservationRoute.tsx";
import ReservationRoute from "./routes/reservation/ReservationRoute.tsx";
import ReservationListRoute from "./routes/reservationlist/ReservationListRoute.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={"/"} element={<AppLayout />}>
      <Route index element={<ReservationListRoute />} />
      <Route
        path="reservations/:reservationId"
        element={<ReservationRoute />}
      />
      <Route path="create" element={<CreateReservationRoute />} />
    </Route>,
  ),
);

const queryClient = createQueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
      <TimezoneContextProvider>
        <CssBaseline />
        <RouterProvider router={router} />
        <ReactQueryDevtools />
      </TimezoneContextProvider>
    </LocalizationProvider>
  </QueryClientProvider>,
);
