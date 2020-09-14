const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51HQJMXActt51VOE3ggJkRlPWhBczYlm9gkWX28vvlzHyLiVhiyMqnlrLCrVbG4k4jsBLHB0UzPVdhSCfnonV4VLj00p3DreCya"
);

// API - Setting it UP:

// 1- App Config
const app = express();

// 2- Middlewares

app.use(cors({ origin: true }));
app.use(express.json()); // This here is to send data and pass it in json format.

// 3- API Routes
app.get("/", (request, response) => response.status(200).send("Hello World"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total; // Getting the basket total

  console.log("Payment Request Recieved! For This Amount >>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // Sub-units of the currency
    currency: "usd"
  });
  // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret
  });
});

// 4 - Listen Command
exports.api = functions.https.onRequest(app);

// Below is the example endpoint:
// http://localhost:5001/clone-f2299/us-central1/api
