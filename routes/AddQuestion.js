const express = require("express");
const router = express.Router();
const { db } = require("../database/mongo");
const { Review } = require("../models/schema");
const { transporter } = require("../nodemailer/nodemailer");

router.post("/addquestion", (req, res, next) => {
  const username = req.body.username;
  const questionText = req.body.questionText;
  const question = {
    userName: username,
    question: questionText,
  };

  if (questionText != "" && username != "") {
    db.collection("questions").insertOne(question, (err, result) => {
      if (err) throw err;
      else {
        const mailOption = {
          from: `The Beverli Hills <shahzaibirfan1012@gmail.com>`,
          to: "shahzaibirfan1012@gmail.com",
          subject: "Contact Us Query",
          html: `<p>${questionText}</p>`,
        };
        transporter.sendMail(mailOption, (err, info) => {
          if (err) throw err;
          else console.log("email sent");
        });
        res.redirect("https://the-beverli-hotel.vercel.app");
      }
    });
  } else {
    console.log("Booking not added due to invalid inputs");
    res.redirect("https://the-beverli-hotel.vercel.app");
  }
});

module.exports = router;
