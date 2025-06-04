import jwt from "jsonwebtoken";


import express from "express";

import bodyParser from "body-parser";

import {setupReservationApi}  from "./reserverations-api.js";

const app = express();

const slowEnabled = process.env.USE_SLOW === "true";

app.use(bodyParser.json());

app.use((_, res, next) => {
  res.header(
    "Access-Control-Allow-Methods",
    "OPTIONS,GET,PUT,POST,PATCH,DELETE"
  );
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use((req, _res, next) => {
  if (req.query.slow !== undefined || slowEnabled) {
    const timeout = parseInt(req.query.slow) || 1200;
    console.log(`Slow down ${timeout}ms`);
    setTimeout(next, timeout);
  } else {
    next();
  }
});

setupReservationApi(app);
//
//app.get("/api/cards", (req, res) => {
//  let result = [...cards];
//
//  const orderBy = req.query.orderBy || "date";
//
//  if (orderBy === "date") {
//    result.sort((a, b) => {
//      const numA = parseInt(a.id.slice(1), 10); // Removes the first letter and converts the rest to number
//      const numB = parseInt(b.id.slice(1), 10);
//
//      // Compare the numbers and return the result
//      if (numA > numB) {
//        return -1; // a comes first if its number is higher
//      } else if (numA < numB) {
//        return 1; // b comes first if its number is higher
//      } else {
//        return 0; // numbers are equal, maintain original order
//      }
//    });
//  } else if (orderBy === "likes") {
//    result.sort((a, b) => b.likes - a.likes);
//  }
//
//  if (req.query.fail !== undefined) {
//    result = result.map((a, ix) =>
//      ix === 1
//        ? {
//            ...a,
//            message: null,
//          }
//        : a
//    );
//  }
//
//  res.status(200).json(result);
//});
//
//const getCardById = (cardId) => cards.find((c) => c.id === cardId);
//
//// Return card with specified id (or 404)
//app.get("/api/cards/:id", (req, res) => {
//  const card = getCardById(req.params.id);
//
//  if (!card) {
//    return res.status(404).json({ error: `Card '${req.params.id}' not found` });
//  }
//
//  return res.status(200).json(card);
//});
//
//app.get("/api/cards/:id/comments", (req, res) => {
//  const thisComments = comments.filter((c) => c.cardId === req.params.id);
//
//  console.log("COMMENTS", thisComments);
//
//  return res.status(200).json(thisComments);
//});
//
//app.post("/api/cards", (req, res) => {
//  const card = req.body;
//  if (!card) {
//    return res.status(400).json({ error: "Card must be defined" });
//  }
//
//  if (!card.message) {
//    return res
//      .status(400)
//      .json({ error: "card.message must be defined and not empty" });
//  }
//
//  if (!card.title) {
//    return res
//      .status(400)
//      .json({ error: "card.title must be defined and not empty" });
//  }
//
//  if (card.title.length < 4) {
//    return res
//      .status(400)
//      .json({ error: "card.title must have at least four chars" });
//  }
//
//  if (card.message.startsWith("fail")) {
//    return res
//      .status(400)
//      .json({ error: "card.message should not start with 'fail'" });
//  }
//
//  if (!card.image) {
//    return res
//      .status(400)
//      .json({ error: "card.image must be defined and not empty" });
//  }
//
//  const newCard = {
//    id: `C${cards.length + 1}`,
//    message: card.message,
//    title: card.title,
//    image: card.image,
//    likes: 0,
//  };
//
//  cards = [...cards, newCard];
//
//  res.status(201).json(newCard);
//});
//
//app.post("/api/cards/:id/likes", (req, res) => {
//  const card = getCardById(req.params.id);
//
//  if (!card) {
//    return res.status(404).json({ error: `Card '${req.params.id}' not found` });
//  }
//
//  if (card.id === "C5") {
//    // simluation: error in processing
//    return res.status(400).json({ error: "Could not handle request" });
//  }
//
//  const likedCard = { ...card, likes: card.likes + 1 };
//
//  cards = cards.map((c) => (c.id === card.id ? likedCard : c));
//
//  res.status(200).json(likedCard);
//});

const port = process.env.SERVER_PORT || 7200;

app.listen(port, () => {
  console.log(`
    📞    Reservations API Server listening on port ${port}
    👉    Try http://localhost:${port}/api/reservations
`);
});
