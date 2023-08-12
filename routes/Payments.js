const express = require("express");
const router = express.Router();
const { db } = require("../database/mongo");
const { BookingHistory, Bookings, Payment } = require("../models/schema");

router.get("/getPayments", (req, response) => {
  const userName = req.query.userName;
  console.log(userName);
  Bookings.find({ userName: userName, isPaid: false }).then((res) => {
    if (res) {
      response.send(res);
    } else {
      console.log("error");
    }
  });
});

router.get("/getAllPayments", (req, response) => {
  Payment.find({}).then((res) => {
    if (res) {
      console.log(res);
      response.send(res);
    } else {
      console.log("error");
    }
  });
});
module.exports = router;
