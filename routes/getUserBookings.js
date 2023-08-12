const express = require("express");
const router = express.Router();
const { db } = require("../database/mongo");
const { BookingHistory, Bookings } = require("../models/schema");

router.get("/getBookings", (req, response) => {
  const userName = req.query.userName;
  console.log(userName);
  Bookings.find({ userName: userName })
    .then((res) => {
      if (res) {
        console.log(res);
        response.send(res);
      } else {
        console.log("error");
      }
    });
});

router.get("/getSingleBookings", (req, response) => {
  const id = req.query.id;
  const userName = req.query.userName;
  console.log(id, userName);
  Bookings.find({ _id: id, userName: userName }).then((res) => {
    if (res) {
      console.log(res);
      response.send(res);
    } else {
      console.log("error");
    }
  });
});

router.get("/getBookingsHistory", (req, response) => {
  const userName = req.query.userName;
  BookingHistory.find({ userName: userName }).then((res) => {
    if (res) {
      response.send(res);
    } else {
      console.log("error");
    }
  });
});

module.exports = router;
