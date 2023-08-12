const express = require("express");
const router = express.Router();
const { Room, BookingHistory, Bookings } = require("../models/schema");
const { db } = require("../database/mongo");
const stripe = require("stripe")(
  "sk_test_51NdYl1BYQ4BHBkBzagwXHqFWzpPHzzotKdSE7KIZILc0IrfNgCGLrLnMBtvAQtbPaB6r5bkiUImTtcLNbJQr1Xhw008Jca4LL1"
);

router.post("/", async (req, res) => {
  try {
    const id = req.query.id;
    const roomId = req.query.roomId;
    const arrivalDate = req.query.arrivalDate;
    const departureDate = req.query.departureDate;
    const room = await Room.findOne({ _id: roomId });
    BookingHistory.updateOne({ _id: id }, { isPaid: true });

    if (!room) {
      console.log("Room not found");
      return res.status(404).send("Room not found");
    }

    let SessionId = "";
    async function checkout(room, departureDate, arrivalDate) {
      const { roomNo, rate, image } = room;

      const unitAmount = 100 * Number(rate);
      const dayDifference =
        Number(departureDate.slice(8, 10)) - Number(arrivalDate.slice(8, 10));

      const quantity = dayDifference <= 0 ? 1 : dayDifference;
      const payment = {
        bookingId: id,
        amount: quantity * Number(rate),
      };
      db.collection("payments")
        .insertOne(payment)
        .then((res) => {
          if (res) console.log("Payment Added");
          else console.log("Payment Error");
        });

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "pkr",
              product_data: {
                name: String(roomNo),
                images: [`http://localhost:4000/images/${image}`], // Corrected image URL
              },
              unit_amount: unitAmount,
            },
            quantity,
          },
        ],
        mode: "payment",
        success_url: `https://the-beverli-hotel.vercel.app/viewrooms`,
        cancel_url: "https://the-beverli-hotel.vercel.app/viewrooms",
      });
      SessionId = session.id;

      return session.url;
    }
    Bookings.updateOne({ _id: id }, { isPaid: true }).then((res) => {
      if (res) console.log("Booking History Updated");
      else console.log("error");
    });
    BookingHistory.updateOne({ _id: id }, { isPaid: true }).then((res) => {
      if (res) console.log("Booking History Updated");
      else console.log("error");
    });
    const url = await checkout(room, departureDate, arrivalDate);
    res.redirect(url);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred");
  }
});

module.exports = router;
