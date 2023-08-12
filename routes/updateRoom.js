const express = require("express");
const router = express.Router();
const { db } = require("../database/mongo");
const { Room } = require("../models/schema");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

var upload = multer({ storage });

router.post("/", upload.single("image"), (req, res, next) => {
  const id = req.query.id;
  const roomNo = req.body.roomNo;
  const description = req.body.description;
  const roomType = req.body.roomType;
  const servantName = req.body.servantName;
  const servantContact = req.body.servantContact;
  const rate = Number(req.body.rate);
  const image = req.file.filename;
  const availabilityStatus =
    req.body.availabilityStatus === "True" ? true : false;

  if (
    roomNo != "" &&
    roomType != "Room Type" &&
    servantContact != "" &&
    servantName != ""
  ) {
    Room.updateOne(
      { _id: id },
      {
        roomNo: roomNo,
        description: description,
        roomType: roomType,
        servantName: servantName,
        servantContact: servantContact,
        image: image,
        rate: rate,
        availabilityStatus: availabilityStatus,
      }
    )
      .then((result) => {
        if (result)
          res.redirect("https://the-beverli-hotel.vercel.app/managerooms");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    console.log("Room not updated due to invalid inputs");
    res.redirect("https://the-beverli-hotel.vercel.app");
  }
});

module.exports = router;
