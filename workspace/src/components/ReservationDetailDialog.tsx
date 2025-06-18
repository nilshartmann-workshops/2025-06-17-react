import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";

import { getReservationByIdOpts } from "../queries.ts";
import ReservationDetailCard from "./ReservationDetailCard.tsx";

type ReservationDetailDialogProps = {
  onClose: () => void;
  reservationId: string;
};

export default function ReservationDetailDialog({
  onClose,
  reservationId,
}: ReservationDetailDialogProps) {
  const { data: reservation } = useSuspenseQuery(
    getReservationByIdOpts(reservationId),
  );

  return (
    <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Reservation Details
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Box sx={{ mt: 1 }}>
          <ReservationDetailCard reservation={reservation} />
          {/*

          TODO:
          - mit getByReservationId-Query die Reservation laden
          - die geladene Reservation mit <ReservationDetailCard /> hier anzeigen

          */}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
