const express = require("express");
const router = express.Router();
const multer = require("multer");
const { db } = require("../database/mongo");

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
  const roomNo = req.body.roomNo;
  const description = req.body.description;
  const roomType = req.body.roomType;
  const servantName = req.body.servantName;
  const servantContact = req.body.servantContact;
  const rate = Number(req.body.rate);
  const image = req.file.filename;
  const availabilityStatus =
    req.body.availabilityStatus === "True" ? true : false;
  const room = {
    roomNo: roomNo,
    description: description,
    roomType: roomType,
    servantName: servantName,
    servantContact: servantContact,
    image: image,
    rate: rate,

    availabilityStatus: availabilityStatus,
  };

  if (
    roomNo != "" &&
    roomType != "Room Type" &&
    servantContact != "" &&
    servantName != ""
  ) {
    db.collection("rooms").insertOne(room, (err, result) => {
      if (err) throw err;
      else {
        res.redirect("https://the-beverli-hotel.vercel.app/managerooms");
      }
    });
  } else {
    console.log("Room not added due to invalid inputs");
    res.redirect("https://the-beverli-hotel.vercel.app");
  }
});

module.exports = router;
