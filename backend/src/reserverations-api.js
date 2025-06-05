import { foodtrucks, reservations } from "./reservations.js";
import dayjs from "dayjs";

export function setupReservationApi(app) {
  app.get("/api/reservations", (req, res) => {
    const orderBy = req.query.orderBy;
    if (!orderBy) {
      return res.status(200).json(reservations);
    }

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

  app.post("/api/reservations", (req, res) => {
    const {
      foodTruck,
      customerName,
      timeRange,
      expectedGuests,
      specialRequests,
    } = req.body || {};

    const errors = [];
    if (!foodTruck) {
      errors.push({ error: "'foodTruck' must be specified" });
    }

    if (!foodtrucks.find((f) => f.name === foodTruck)) {
      errors.push({
        error:
          "'foodTruck' must be valid foodtruck, one of: " +
          foodtrucks.map((f) => f.name).join(", "),
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
    }

    if (errors.length) {
      return res.status(400).json(errors);
    }

    const newReservation = {
      id: String(reservations.length + 1),
      foodTruck,
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
