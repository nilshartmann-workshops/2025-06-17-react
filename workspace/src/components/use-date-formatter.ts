import dayjs from "dayjs";

import type { TimeRange } from "../types.ts";

export function getDateFormatter() {
  return {
    shortTimeRange(range: TimeRange) {
      return `${dayjs(range.start).format("DD.MM., HH:mm")} - ${dayjs(range.end).format("DD.MM., HH:mm")}`;
    },

    longDateTime(dateTime: string) {
      return `${dayjs(dateTime).format("DD. MMMM YYYY, HH:mm")}`;
    },
  };
}
