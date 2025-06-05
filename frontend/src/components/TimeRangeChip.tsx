import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Chip, Grid, Skeleton, Typography } from "@mui/material";

import type { TimeRange } from "../types.ts";
import { useDateFormatter } from "./use-date-formatter.ts";

type TimeRangeChipRegularProps = {
  range: TimeRange;
  variant?: "compact" | "full";
  placeholder?: false;
};

type TimeRangeChipPlaceholderProps = {
  variant?: "compact" | "full";
  range?: undefined;
  placeholder: true;
};

type TimeRangeChipProps =
  | TimeRangeChipRegularProps
  | TimeRangeChipPlaceholderProps;

// Diskutieren:
//  ist der Komponentenschnitt so gut?
//   -> vielleicht lieber zwei Komponenten

export default function TimeRangeChip(props: TimeRangeChipProps) {
  const dateFormatter = useDateFormatter();

  const variant = props.variant || "compact";

  if (variant === "compact") {
    return (
      <Chip
        size={"small"}
        label={
          props.placeholder ? (
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          ) : (
            dateFormatter.shortTimeRange(props.range)
          )
        }
        variant={"outlined"}
        color={"default"}
        icon={<CalendarMonthIcon />}
      />
    );
  }

  return (
    <>
      <Grid size={6}>
        <Typography
          variant="subtitle2"
          display="flex"
          alignItems="center"
          gap={1}
        >
          <AccessTimeIcon fontSize="small" />
          Start Time
        </Typography>
        {props.placeholder ? (
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        ) : (
          <Typography>
            {dateFormatter.longDateTime(props.range.start)}
          </Typography>
        )}
      </Grid>

      <Grid size={6}>
        <Typography
          variant="subtitle2"
          display="flex"
          alignItems="center"
          gap={1}
        >
          <AccessTimeIcon fontSize="small" />
          End Time
        </Typography>
        {props.placeholder ? (
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        ) : (
          <Typography>{dateFormatter.longDateTime(props.range.end)}</Typography>
        )}
      </Grid>
    </>
  );
}
