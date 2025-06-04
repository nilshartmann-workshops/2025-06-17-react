import { describe, expect, it } from "vitest";
import { TimeRange } from "./types.ts";
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
