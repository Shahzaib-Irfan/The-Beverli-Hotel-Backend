const cron = require("node-cron");
const { Bookings, Review } = require("../models/schema"); // Adjust the path as needed
const moment = require("moment");
const { DateTime } = require("luxon");
const { db } = require("../database/mongo");

// Schedule the task to run every minute
cron.schedule("*/10 * * * *", async () => {
  try {
    Bookings.find({}).then((res) => {
      if (res) {
        for (const booking of res) {
          console.log(
            moment(
              `${String(booking.departureDate).slice(0, 10)} ${
                booking.departureTime
              }`
            ).isBefore(
              String(moment()).slice(0, 10) +
                " " +
                String(moment()).slice(15, 21)
            )
          );
          const departureDatetime = moment(
            `${String(booking.departureDate).slice(0, 10)} ${
              booking.departureTime
            }`
          );
          const currentDatetime =
            String(moment()).slice(0, 10) +
            " " +
            String(moment()).slice(15, 21);
          if (departureDatetime.isBefore(currentDatetime)) {
            Bookings.deleteOne({ _id: booking._id }).then((result) => {
              if (result) console.log("Deleted");
              else {
                console.log("error");
              }
            });
          }
        }
      } else {
        console.log("error");
      }
    });
  } catch (err) {
    console.log(err);
  }
});
