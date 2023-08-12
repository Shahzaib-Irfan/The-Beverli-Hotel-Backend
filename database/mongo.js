const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose.connect(
  "mongodb+srv://shahzaibirfan1012:ZK9ZAkMR8xlyKXo2@project.97kyhnz.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

var db = mongoose.connection;
db.on("error", () => console.log("error"));
db.once("open", () => console.log("Database Connected"));

module.exports = { db };
