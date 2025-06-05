import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { Chip } from "@mui/material";

import type { ReservationStatus } from "../types.ts";

type StatusChipProps = {
  status: ReservationStatus;
  onClick?: () => void;
  variant?: "sm" | "lg";
};
export default function StatusChip({
  variant = "sm",
  status,
  onClick,
}: StatusChipProps) {
  const chipSize = variant === "lg" ? "medium" : "small";
  const chipVariant = variant === "lg" ? "filled" : "outlined";
  switch (status) {
    case "Confirmed":
      return (
        <Chip
          onClick={onClick}
          color="success"
          size={chipSize}
          icon={<CheckCircleIcon />}
          variant={chipVariant}
          label={"Confirmed"}
        />
      );
    case "Rejected":
      return (
        <Chip
          color="error"
          variant={chipVariant}
          size={chipSize}
          icon={<CancelIcon />}
          label={"Rejected"}
          // sx={sx}
        />
      );

    case "Requested":
      return (
        <Chip
          color="warning"
          variant={chipVariant}
          size={chipSize}
          icon={<PriorityHighIcon />}
          label={"Requested"}
        />
      );
  }
}
