import dayjs from "dayjs";

import type { TimeRange } from "../types.ts";
import { useTimezoneContext } from "./TimezoneContext.tsx";

export function useDateFormatter() {
  const { timezone } = useTimezoneContext();

  return {
    shortTimeRange(range: TimeRange) {
      return `${dayjs(range.start).tz(timezone).format("DD.MM., HH:mm")} - ${dayjs(range.end).tz(timezone).format("DD.MM., HH:mm")}`;
    },

    longDateTime(dateTime: string) {
      return `${dayjs(dateTime).tz(timezone).format("DD. MMMM YYYY, HH:mm")}`;
    },
  };
}
