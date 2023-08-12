const express = require("express");
const router = express.Router();
const { db } = require("../database/mongo");
const { Bookings } = require("../models/schema");

router.get("/", (req, response) => {
  const id = req.query.id;
  console.log(id);
  Bookings.find({ roomId: id }).then((res) => {
    if (res) response.send(res);
    else {
      console.log("error");
    }
  });
});

module.exports = router;
