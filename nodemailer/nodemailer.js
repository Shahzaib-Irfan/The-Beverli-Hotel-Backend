const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "shahzaibirfan1012@gmail.com",
    pass: "ijxveayzchiujybb",
  },
});

module.exports = { transporter };
