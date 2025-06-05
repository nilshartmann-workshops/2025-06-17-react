import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { Reservation } from "../types.ts";
import ReservationDetailDialog from "./ReservationDetailDialog.tsx";
import StatusChip from "./StatusChip.tsx";
import TimeRangeChip from "./TimeRangeChip.tsx";

type ReservationTableProps = {
  reservations: Reservation[];
};
export default function ReservationTable({
  reservations,
}: ReservationTableProps) {
  const [searchParams] = useSearchParams();
  const [selectedReservationId, setSelectedReservationId] = useState<
    string | null
  >(null);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="Reservations">
        <TableHead>
          <TableRow>
            <TableCell>Food Truck</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Guests</TableCell>
            <TableCell>Specials</TableCell>
            <TableCell>Status</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reservations.map((r) => (
            <TableRow
              key={r.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedReservationId(r.id)}
              >
                {r.foodTruck}
              </TableCell>
              <TableCell>{r.customerName}</TableCell>
              <TableCell>
                <TimeRangeChip range={r.timeRange} />
              </TableCell>
              <TableCell>{r.expectedGuests}</TableCell>
              <TableCell>{r.specialRequests}</TableCell>
              <TableCell>
                <StatusChip status={r.status} />
              </TableCell>
              <TableCell>
                <Button
                  to={`/reservations/${r.id}?${searchParams.toString()}`}
                  component={Link}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedReservationId && (
        <ReservationDetailDialog
          onClose={() => setSelectedReservationId(null)}
          reservationId={selectedReservationId}
        />
      )}
    </TableContainer>
  );
}
