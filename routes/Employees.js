const express = require("express");
const router = express.Router();
const multer = require("multer");
const { db } = require("../database/mongo");
const { Employee } = require("../models/schema");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

var upload = multer({ storage });

router.post("/addemployee", upload.single("image"), (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const contact = req.body.contact;
  const cnic = req.body.cnic;
  const salary = Number(req.body.salary);
  const image = req.file.filename;
  const employee = {
    name: name,
    email: email,
    contact: contact,
    cnic: cnic,
    image: image,
    salary: salary,
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
  if (regex.test(email) && name != "" && contact != "" && cnic != "") {
    db.collection("employees").insertOne(employee, (err, result) => {
      if (err) throw err;
      else {
        res.redirect("http://localhost:3000/manageemployees");
      }
    });
  } else {
    console.log("Booking not added due to wrong email or inputs");
    res.redirect("http://localhost:3000");
  }
});

router.get("/getemployees", (req, response) => {
  Employee.find({}).then((res) => {
    if (res) response.send(res);
    else {
      console.log("error");
    }
  });
});

router.get("/getSingleEmployee", (req, response) => {
  const id = req.query.id;
  Employee.find({ _id: id }).then((res) => {
    if (res) response.send(res);
    else {
      console.log("error");
    }
  });
});

router.post("/UpdateEmployee", upload.single("image"), (req, res, next) => {
  const id = req.query.id;
  const name = req.body.name;
  const email = req.body.email;
  const contact = req.body.contact;
  const cnic = req.body.cnic;
  const salary = Number(req.body.salary);
  const image = req.file.filename;

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
  if (regex.test(email) && name != "" && contact != "" && cnic != "") {
    Employee.updateOne(
      { _id: id },
      {
        name: name,
        email: email,
        contact: contact,
        cnic: cnic,
        image: image,
        salary: salary,
      }
    )
      .then((result) => {
        if (result)
          res.redirect("https://the-beverli-hotel.vercel.app/manageemployees");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    console.log("Booking not added due to wrong email or inputs");
    res.redirect("https://the-beverli-hotel.vercel.app");
  }
});

router.get("/deleteemployee", (req, response) => {
  const id = req.query.id;
  Employee.deleteOne({ _id: id })
    .then((res) => {
      console.log("Deleted");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
