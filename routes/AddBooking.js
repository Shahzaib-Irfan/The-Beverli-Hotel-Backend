const express = require("express");
const router = express.Router();
const { db } = require("../database/mongo");
const { Bookings, Room } = require("../models/schema");
var stripe = require("stripe")(
  "sk_test_51NdYl1BYQ4BHBkBzagwXHqFWzpPHzzotKdSE7KIZILc0IrfNgCGLrLnMBtvAQtbPaB6r5bkiUImTtcLNbJQr1Xhw008Jca4LL1"
);

router.post("/", (req, res, next) => {
  const id = req.query.id;
  const name = req.query.personName;
  const userName = req.query.userName;
  const email = req.query.email;
  const contact = req.query.contact;
  const arrivalDate = req.query.arrivalDate;
  const arrivalTime = req.query.arrivalTime;
  const departureDate = req.query.departureDate;
  const departureTime = req.query.departureTime;
  const children = req.query.children;
  const adults = req.query.adults;
  const booking = {
    roomId: id,
    name: name,
    userName: userName,
    email: email,
    contact: contact,
    arrivalDate: arrivalDate,
    arrivalTime: arrivalTime,
    departureDate: departureDate,
    departureTime: departureTime,
    children: children,
    adults: adults,
    approvedStatus: null,
    isPaid: false,
  };

  const emailProviders = [
    "@gmail.com",
    "@yahoo.com",
    "@hotmail.com",
    "@outlook.com",
    "@aol.com",
    "@icloud.com",
    "@protonmail.com",
    "@live.com",
    "@inbox.com",
    "@zoho.com",
    "@gmx.com",
    "@yandex.com",
    "@mail.com",
    "@rocketmail.com",
    "@fastmail.com",
    "@mailinator.com",
    "@rediffmail.com",
    "@tutanota.com",
    "@dispostable.com",
    "@europe.com",
    "@hushmail.com",
    "@aim.com",
    "@msn.com",
    "@comcast.net",
    "@sbcglobal.net",
    "@cox.net",
    "@verizon.net",
    "@att.net",
    "@bellsouth.net",
    "@charter.net",
    "@earthlink.net",
    "@juno.com",
    "@netzero.net",
    "@me.com",
    "@mac.com",
  ];

  const regex = new RegExp(`(${emailProviders.join("|")})`, "i");
  if (regex.test(email) && userName != "" && contact != "" && name != "") {
    db.collection("bookinghistories").insertOne(booking, (err, result) => {
      if (err) throw err;
      else {
      }
    });

    db.collection("bookings").insertOne(booking, (err, result) => {
      if (err) throw err;
      else {
        res.redirect("https://the-beverli-hotel.vercel.app/viewrooms");
      }
    });
  } else {
    console.log("Booking not added due to wrong email");
    res.redirect("https://the-beverli-hotel.vercel.app/");
  }
});

module.exports = router;
