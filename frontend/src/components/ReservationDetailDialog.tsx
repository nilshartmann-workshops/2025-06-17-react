import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ReservationDetailLoader from "./ReservationDetailLoader.tsx";

type ReservationDetailDialogProps = {
  open: boolean;
  onClose: () => void;
  reservationId: string;
};

export default function ReservationDetailDialog({
  open,
  onClose,
  reservationId,
}: ReservationDetailDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
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
          <ReservationDetailLoader reservationId={reservationId} />
        </Box>
      </DialogContent>
    </Dialog>
  );
}
