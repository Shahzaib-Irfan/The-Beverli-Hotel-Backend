var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var database = require("./database/mongo");

var cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var addRoomRouter = require("./routes/AddRoom");
var getRoomRouter = require("./routes/getRooms");
var getSingleRoomRouter = require("./routes/getSingleRoom");
var updateRoomRouter = require("./routes/updateRoom");
var deleteRoomRouter = require("./routes/deleteRoom");
var bookingRoomRouter = require("./routes/AddBooking");
var getBookingRoomRouter = require("./routes/getBookingRoom");
var getPendingBookingsRouter = require("./routes/getPendingBookings");
var approveBookingsRouter = require("./routes/ApproveBooking");
var approvedBookingsRouter = require("./routes/getApprovedBokokings");
var getSingleApprovedRouter = require("./routes/SingleApprovedBooking");
var employeesRouter = require("./routes/Employees");
var userBookingsRouter = require("./routes/getUserBookings");
var nodeCronRouter = require("./routes/node_cron");
var paymentRouter = require("./routes/stripe");
var pendingPaymentsRouter = require("./routes/Payments");
var reviewsRouter = require("./routes/Reviews");
var featuredRouter = require("./routes/getFeaturedRooms");
var contactUsRouter = require("./routes/AddQuestion");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://the-beverli-hotel.vercel.app"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Header", "Centent-Types");
  next();
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/AddRoom", addRoomRouter);
app.use("/getRooms", getRoomRouter);
app.use("/getSingleRoom", getSingleRoomRouter);
app.use("/UpdateRoom", updateRoomRouter);
app.use("/deleteRoom", deleteRoomRouter);
app.use("/BookRoom", bookingRoomRouter);
app.use("/getBookedRoom", getBookingRoomRouter);
app.use("/getPendingBookings", getPendingBookingsRouter);
app.use("/approvebooking", approveBookingsRouter);
app.use("/getapprovedbookings", approvedBookingsRouter);
app.use("/getSingleApprovedBooking", getSingleApprovedRouter);
app.use("/employees", employeesRouter);
app.use("/userbookings", userBookingsRouter);
app.use("/pay", paymentRouter);
app.use("/payments", pendingPaymentsRouter);
app.use("/reviews", reviewsRouter);
app.use("/featured", featuredRouter);
app.use("/contactus", contactUsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
