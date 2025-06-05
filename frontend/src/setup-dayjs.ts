import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/de";

// https://day.js.org/docs/en/plugin/timezone#docsNav
dayjs.extend(utc);
dayjs.extend(timezone);
