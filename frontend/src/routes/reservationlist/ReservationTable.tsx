import { Link, useSearchParams } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchReservationListOpts } from "../../queries.ts";
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
import TimeRangeChip from "../../components/TimeRangeChip.tsx";
import StatusChip from "../../components/StatusChip.tsx";
import { useState } from "react";
import ReservationDetailDialog from "../../components/ReservationDetailDialog.tsx";

export default function ReservationTable() {
  const [p] = useSearchParams();
  const orderBy: any = p.get("orderBy") || "";

  const { data: reservations } = useSuspenseQuery(
    fetchReservationListOpts(orderBy),
  );

  const [selectedReservation, setSelectedReservation] = useState<string | null>(
    null,
  );

  const handleReservationSelected = (reservationId: string) => {
    if (selectedReservation === reservationId) {
      setSelectedReservation(null);
    } else {
      setSelectedReservation(reservationId);
    }
  };

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
            <TableCell>...</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reservations.map((r) => (
            <TableRow
              key={r.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                component="th"
                scope="row"
                onClick={() => handleReservationSelected(r.id)}
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
                <Button to={`/reservations/${r.id}`} component={Link}>
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedReservation && (
        <ReservationDetailDialog
          open={true}
          onClose={() => setSelectedReservation(null)}
          reservationId={selectedReservation}
        />
      )}
    </TableContainer>
  );
}
