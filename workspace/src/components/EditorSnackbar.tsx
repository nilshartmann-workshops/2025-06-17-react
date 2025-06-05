import { Alert, Snackbar } from "@mui/material";
import { ReactNode } from "react";

type EditorSnackbarProps = {
  severity: "success" | "error";
  children: ReactNode;
};

export default function EditorSnackbar({
  severity,
  children,
}: EditorSnackbarProps) {
  return (
    <Snackbar
      open={true}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert severity={severity} variant="filled">
        {children}
      </Alert>
    </Snackbar>
  );
}
