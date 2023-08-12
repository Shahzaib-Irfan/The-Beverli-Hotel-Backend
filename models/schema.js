const mongoose = require("mongoose");

const Room = mongoose.model("rooms", {
  roomNo: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  roomType: {
    type: String,
    required: true,
  },
  servantName: {
    type: String,
    required: true,
  },
  servantContact: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  availabilityStatus: {
    type: Boolean,
    required: true,
  },
});

const Bookings = mongoose.model("bookings", {
  roomId: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  personEmail: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  arrivalDate: {
    type: Date,
    required: true,
  },
  arrivalTime: {
    type: String,
    required: true,
  },
  departureDate: {
    type: Date,
    required: true,
  },
  departureTime: {
    type: String,
    required: true,
  },
  children: {
    type: Number,
    required: true,
  },
  adults: {
    type: Number,
    required: true,
  },
  approvedStatus: {
    type: Boolean,
  },
  isPaid: {
    type: Boolean,
  },
});

const BookingHistory = mongoose.model("bookinghistories", {
  roomId: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  personEmail: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  arrivalDate: {
    type: Date,
    required: true,
  },
  arrivalTime: {
    type: String,
    required: true,
  },
  departureDate: {
    type: Date,
    required: true,
  },
  departureTime: {
    type: String,
    required: true,
  },
  children: {
    type: Number,
    required: true,
  },
  adults: {
    type: Number,
    required: true,
  },
  approvedStatus: {
    type: Boolean,
  },
  isPaid: {
    type: Boolean,
  },
});

const Employee = mongoose.model("employees", {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  cnic: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
});

const Review = mongoose.model("reviews", {
  userName: {
    type: String,
    required: true,
  },
  bookingId: {
    type: String,
    required: true,
  },
  stars: {
    type: Number,
  },
  review: {
    type: String,
  },
  isGiven: {
    type: Boolean,
  },
});

const Payment = mongoose.model("payments", {
  bookingId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

const Question = mongoose.model("questions", {
  username: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
});

module.exports = {
  Room,
  Bookings,
  Employee,
  BookingHistory,
  Review,
  Payment,
  Question,
};
