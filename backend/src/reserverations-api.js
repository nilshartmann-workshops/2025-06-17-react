import { foodtrucks, reservations } from "./reservations.js";
import dayjs from "dayjs";

export function setupReservationApi(app) {
  app.get("/api/reservations", (req, res) => {
    const orderBy = req.query.orderBy || "start";

    const allowedOrderBy = ["foodTruck", "customerName", "status", "start"];

    if (!allowedOrderBy.includes(orderBy)) {
      return res
        .status(400)
        .json({
          error: `Invalid 'orderBy' search param '${orderBy}' Allowed values: '${allowedOrderBy}'`,
        });
    }
    return res.status(200).json(sortReservations(reservations, orderBy));
  });

  const allowedProperties = [
    "foodTruckId",
    "customerName",
    "timeRange",
    "expectedGuests",
    "specialRequests",
  ]

  app.post("/api/reservations", (req, res) => {
    const errors = [];

    const {
      foodTruckId,
      customerName,
      timeRange,
      expectedGuests,
      specialRequests,
    } = req.body || {};

    const invalidProperties = Object
      .keys(req.body || {})
      .filter(key => !allowedProperties.includes(key));
    if (invalidProperties.length) {
      errors.push({"error": `Invalid properties in payload: '${invalidProperties}'. Only properties '${allowedProperties}' allowed`})
    }


    if (!foodTruckId) {
      errors.push({ error: "'foodTruckId' must be specified" });
    }

    const foodTruck = foodtrucks.find((f) => f.id === foodTruckId);

    if (!foodTruck) {
      errors.push({
        error:
          `Given 'foodTruckId' with value '${foodTruckId}' does not exists. Valid foodTruckIds: ${foodtrucks.map((f) => `'${f.id}'`).join(", ")}`
      });
    }

    if (!timeRange || typeof timeRange !== "object") {
      errors.push({ error: "'timeRange' must be an object" });
    } else {
      if (typeof timeRange.start !== "string") {
        errors.push({ error: "'timeRange.start' must be a string" });
      }
      if (typeof timeRange.end !== "string") {
        errors.push({ error: "'timeRange.end' must be a string" });
      }

      if (!dayjs(timeRange.start).isValid()) {
        errors.push({
          error: "'timeRange.start' must be a valid ISO date time",
        });
      }

      if (!dayjs(timeRange.end).isValid()) {
        errors.push({ error: "'timeRange.end' must be a valid ISO date time" });
      }

      if (!dayjs(timeRange.start).isBefore(timeRange.end)) {
        errors.push({ error: "'timeRange.end' must before 'timeRange.start'" });
      }
    }

    if (!customerName) {
      errors.push({ error: "'customerName' must be an non-empty string" });
    }

    if (typeof expectedGuests !== "number") {
      errors.push({ error: "'expectedGuests' must be number" });
    } else {
      if (expectedGuests < 1) {
        errors.push({ error: "'expectedGuests' must be positive number" });
      }

      if (expectedGuests > 200) {
        errors.push({ error: "'expectedGuests' must be equal or less than 200" });
      }
    }

    if (typeof specialRequests === "string" && specialRequests.length===0) {
      errors.push({ error: "'specialRequests' must either be a non empty string or undefined" });
    }

    if (errors.length) {
      return res.status(400).json(errors);
    }

    const newReservation = {
      id: String(reservations.length + 1),
      foodTruck: foodTruck.name,
      customerName,
      timeRange,
      expectedGuests,
      specialRequests,
      status: "Requested",
    };

    reservations.push(newReservation);

    return res.status(201).json(newReservation);
  });

  app.get("/api/reservations/:reservationId", (req, res) => {
    const reservation = reservations.find(
      (d) => d.id === req.params.reservationId,
    );
    if (!reservation) {
      return res
        .status(404)
        .json({
          error: `Reservation not found with id '${req.params.reservationId}'`,
        });
    }

    return res.status(200).json(reservation);
  });

  app.put("/api/reservations/:reservationId/status", (req, res) => {
    const reservation = reservations.find(
      (d) => d.id === req.params.reservationId,
    );
    if (!reservation) {
      return res
        .status(404)
        .json({
          error: `Reservation not found with id '${req.params.reservationId}'`,
        });
    }

    const newStatus = req.body?.status;

    if (newStatus !== "Rejected" && newStatus !== "Confirmed") {
      return res
        .status(400)
        .json({
          error: `Invalid Status ${newStatus}. Please use 'Rejected' or 'Confirmed'`,
        });
    }

    reservation.status = newStatus;

    return res.status(200).json(reservation);
  });

  app.get("/api/foodtrucks", (req, res) => {
    return res.status(200).json(foodtrucks);
  });

  //
  //  app.get("/api/donuts/:donutId/comments", (req, res) => {
  //    const thisComments = allComments.filter((c) => c.donut_id === req.params.donutId);
  //
  //    console.log("COMMENTS", thisComments);
  //
  //    return res.status(200).json(thisComments);
  //  });
}

function sortReservations(reservations, sortBy) {
  const statusOrder = {
    Requested: 0,
    Confirmed: 1,
    Rejected: 2,
  };

  const sorted = [...reservations]; // create a shallow copy

  sorted.sort((a, b) => {
    switch (sortBy) {
      case "foodTruck":
        return a.foodTruck.localeCompare(b.foodTruck);
      case "customerName":
        return a.customerName.localeCompare(b.customerName);
      case "status":
        return statusOrder[a.status] - statusOrder[b.status];
      case "start":
        return new Date(b.timeRange.start) - new Date(a.timeRange.start); // newest first
      default:
        return 0;
    }
  });

  return sorted;
}
