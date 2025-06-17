import { describe, expect, it } from "vitest";

import { IsoDateTime, Reservation, TimeRange } from "./types.ts";

it("...:", () => {
  const r: any = {
    id: "1",
    foodTruck: "Curry Cruiser",
    timeRange: {
      start: "heute!",
      end: null,
    },
    expectedGuests: -10,
    status: "Confirmed",
    customerName: "Lara Carlson",
    specialRequests: "Extra pizza toppings please",
  };

  try {
    const result = Reservation.safeParse(r);
    if (result.success) {
      console.log(result.data);
    } else {
      console.log(result.error.issues[0].code);
    }
    console.log("result", result);
  } catch (err) {
    console.log("ERROR", err);
  }
});

describe("IsoDateTime Type", () => {
  it("should allow iso date time values with time zone", () => {
    expect(IsoDateTime.safeParse("2020-01-01T00:00:00+02:00")).toBeZodSuccess();
    expect(
      IsoDateTime.safeParse("2020-01-01T00:00:00.123+02:00"),
    ).toBeZodSuccess();
    expect(
      IsoDateTime.safeParse("2020-01-01T00:00:00.123+0200"),
    ).toBeZodSuccess();
    expect(IsoDateTime.safeParse("2020-01-01T00:00:00Z")).toBeZodSuccess();
  });
  it("should not allow without timezone", () => {
    expect(IsoDateTime.safeParse("2020-01-01T00:00:00")).toBeZodFailure(
      /Invalid ISO datetime/,
    );
  });
  it("should not allow time only", () => {
    expect(IsoDateTime.safeParse("08:30:00")).toBeZodFailure(
      /Invalid ISO datetime/,
    );
  });
  it("should not allow date only", () => {
    expect(IsoDateTime.safeParse("2025-06-12")).toBeZodFailure(
      /Invalid ISO datetime/,
    );
  });
});
describe("TimeRange Type", () => {
  it("should have two iso dates", () => {
    expect(
      TimeRange.safeParse({
        start: "2025-06-09T09:30:00+02:00",
        end: "2025-06-09T12:30:00+02:00",
      }),
    ).toBeZodSuccess();
  });
  it("should not allow non iso start", () => {
    expect(
      TimeRange.safeParse({
        start: "2025-06-09T09:30:00",
        end: "2025-06-09T12:30:00+02:00",
      }),
    ).toBeZodFailure(/invalid iso/i);
  });
  it("should not allow non iso end", () => {
    expect(
      TimeRange.safeParse({
        start: "2025-06-09T12:30:00+02:00",
        end: "2025-06-09T12:30:00",
      }),
    ).toBeZodFailure(/invalid iso/i);
  });
});
describe("Reservation Type", () => {
  it("should allow valid reservations", () => {
    expect(baseReservation().validate()).toBeZodSuccess();
  });
  it("should only allow positive expectedGuests", () => {
    expect(
      baseReservation().with("expectedGuests", 25).validate(),
    ).toBeZodSuccess();
    expect(
      baseReservation().with("expectedGuests", 0).validate(),
    ).toBeZodFailure(/Too small: expected number to be >=1/);
    expect(
      baseReservation().with("expectedGuests", -1).validate(),
    ).toBeZodFailure(/Too small: expected number to be >=1/);
  });
  it("should only allow known status", () => {
    expect(
      baseReservation().with("status", "Requested").validate(),
    ).toBeZodSuccess();
    expect(
      baseReservation().with("status", "Confirmed").validate(),
    ).toBeZodSuccess();
    expect(
      baseReservation().with("status", "Rejected").validate(),
    ).toBeZodSuccess();
    expect(
      baseReservation().with("status", "Dislike").validate(),
    ).toBeZodFailure(/Invalid option/);
  });
  describe("timeRange property", () => {
    it("should only allow iso values for start", () => {
      const result = baseReservation()
        .with("timeRange", {
          start: "2025-06-09",
          end: "2025-06-09T12:30:00+02:00",
        })
        .validate();
      expect(result).toBeZodFailure(/Invalid ISO datetime/);
    });
  });
  it("should only allow iso values for end", () => {
    const result = baseReservation()
      .with("timeRange", {
        start: "2025-06-0912:30:00+02:00",
        end: "2025-06-10",
      })
      .validate();
    expect(result).toBeZodFailure(/Invalid ISO datetime/);
  });
});
const baseReservation = () => {
  const r: any = {
    id: "1",
    foodTruck: "Curry Cruiser",
    timeRange: {
      start: "2025-06-09T08:30:00+02:00",
      end: "2025-06-09T12:30:00+02:00",
    },
    expectedGuests: 10,
    status: "Confirmed",
    customerName: "Lara Carlson",
    specialRequests: "Extra pizza toppings please",
  };
  return {
    with(prop: keyof Reservation, value: any) {
      r[prop] = value;
      return this;
    },
    validate() {
      return Reservation.safeParse(r);
    },
  };
};
