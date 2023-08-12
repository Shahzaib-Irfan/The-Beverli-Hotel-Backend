const express = require("express");
const router = express.Router();
const { db } = require("../database/mongo");
const { Bookings } = require("../models/schema");
const { transporter } = require("../nodemailer/nodemailer");

router.put("/", (req, res, next) => {
  console.log("hello");
  const id = req.query.id;
  const mode = req.query.mode;
  const email = req.query.email;
  const name = req.query.name;
  const roomNo = req.query.roomNo;
  const arrivalDate = req.query.arrivalDate;
  const arrivalTime = req.query.arrivalTime;
  const departureDate = req.query.departureDate;
  const departureTime = req.query.departureTime;
  console.log(arrivalDate, arrivalTime, departureDate, departureTime);
  mode === "Approve"
    ? Bookings.updateOne({ _id: id }, { approvedStatus: true })
        .then((result) => {
          if (result) {
            const mailOption = {
              from: `The Beverli Hills <shahzaibirfan1012@gmail.com>`,
              to: email,
              subject: "Room Booking Confirmation",
              html: `<p>Dear ${name},<br/>Your booking for ${roomNo}, arrival on: ${
                arrivalDate.slice(0, 10) + " " + arrivalTime
              } and departure on: ${
                departureDate.slice(0, 10) + " " + departureTime
              } has been approved`,
            };
            transporter.sendMail(mailOption, (err, info) => {
              if (err) throw err;
              else console.log("email sent");
            });
            res.redirect("https://the-beverli-hotel.vercel.app/pendingbooking");
          }
        })
        .catch((err) => {
          console.log(err);
        })
    : Bookings.deleteOne({ _id: id })
        .then((result) => {
          if (result) {
            res.redirect("https://the-beverli-hotel.vercel.app/pendingbooking");
            const mailOption = {
              from: `The Beverli Hills <shahzaibirfan1012@gmail.com>`,
              to: email,
              subject: "Room Booking Confirmation",
              html: `<p>Dear ${name},<br/>Your booking for ${roomNo}, arrival on: ${
                arrivalDate.slice(0, 10) + " " + arrivalTime
              } and departure on: ${
                departureDate.slice(0, 10) + " " + departureTime
              } has been rejected`,
            };
            transporter.sendMail(mailOption, (err, info) => {
              if (err) throw err;
              else console.log("email sent");
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
});
module.exports = router;
