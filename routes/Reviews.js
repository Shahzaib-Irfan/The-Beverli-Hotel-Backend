const express = require("express");
const router = express.Router();
const { db } = require("../database/mongo");
const { Review } = require("../models/schema");

router.post("/addreview", (req, res, next) => {
  const bookingId = req.query.bookingId;
  const userName = req.query.userName;
  const reviewBase = {
    userName: userName,
    bookingId: bookingId,
    stars: 5,
    review: "",
    isGiven: false,
  };

  db.collection("reviews").insertOne(reviewBase, (err, result) => {
    if (err) throw err;
    else {
    }
  });
});

router.get("/getAllReviews", (req, response) => {
  Review.find({ isGiven: true }).then((res) => {
    if (res) response.send(res);
    else {
      console.log("error fetching reviews");
    }
  });
});

router.get("/getreviewforaddingreview", (req, response) => {
  const bookingId = req.query.bookingId;
  const userName = req.query.userName;
  Review.find({ bookingId: bookingId, userName: userName }).then((res) => {
    if (res) {
      response.send(res);
    } else {
      console.log("error");
    }
  });
});

router.get("/getreviews", (req, response) => {
  const userName = req.query.userName;
  Review.find({ userName: userName, isGiven: false }).then((res) => {
    if (res) {
      response.send(res);
    } else {
      console.log("error");
    }
  });
});

router.get("/getsinglereview", (req, response) => {
  const id = req.query.id;
  const userName = req.query.userName;
  Review.find({ _id: id, userName: userName }).then((res) => {
    if (res) {
      response.send(res);
    } else {
      console.log("error");
    }
  });
});

router.post("/updatereview", (req, res, next) => {
  const id = req.query.id;
  const stars = req.body.stars;
  const reviewText = req.body.review;

  if (reviewText != "") {
    Review.updateOne(
      { _id: id },
      { stars: Number(stars), review: reviewText, isGiven: true }
    ).then((result) => {
      if (result) {
        res.redirect("https://the-beverli-hotel.vercel.app/userreviews");
      } else {
        console.log("error updating review");
      }
    });
  } else {
    res.redirect("https://the-beverli-hotel.vercel.app/userreviews");
  }
});
module.exports = router;
