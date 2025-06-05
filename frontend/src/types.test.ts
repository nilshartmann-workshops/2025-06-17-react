import { describe, expect, it } from "vitest";

import { IsoDateTimeWithOffset, TimeRange } from "./types.ts";

describe("IsoDateTimeWithOffset", () => {
  it("should work", () => {
    expect(
      IsoDateTimeWithOffset.safeParse("2025-06-04T15:05:20.308Z").data,
    ).toBe("2025-06-04T15:05:20.308Z");
    expect(
      IsoDateTimeWithOffset.safeParse("2024-03-07T12:07:00.123+02:00").data,
    ).toBe("2024-03-07T12:07:00.123+02:00");

    expect(IsoDateTimeWithOffset.safeParse("2024-03-07").data).toBeUndefined();
    expect(
      IsoDateTimeWithOffset.safeParse("15:05:20.308").data,
    ).toBeUndefined();
  });
});

describe("TimeRange", () => {
  it("should work", async () => {
    const tr = {
      start: "2025-06-04T15:05:20.308Z",
      end: "2025-06-05T15:05:20.308Z",
    };

    const result = TimeRange.safeParse(tr);

    expect(result.data).toEqual({
      start: "2025-06-04T15:05:20.308Z",
      end: "2025-06-05T15:05:20.308Z",
    });
    expect(result.error).toBeUndefined();
  });

  it("end must be after start", async () => {
    const tr = {
      start: "2025-06-05T15:05:20.308Z",
      end: "2025-06-04T15:05:20.308Z",
    };

    const result = TimeRange.safeParse(tr);
    console.log(result.error);
    expect(result.data).toBeUndefined();
    expect(result.error).toBeDefined();
    expect(result.error?.issues).toHaveLength(1);
    expect(result.error?.issues[0].path).toEqual(["end"]);
    expect(result.error?.issues[0].message).toBe("end must be after before");
  });
});
