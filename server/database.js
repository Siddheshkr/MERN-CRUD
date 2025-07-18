const mongoose = require("mongoose");

const databaseConnection = () => {
  mongoose
    .connect("mongodb://localhost:27017/bookstore")
    .then(() => {
      console.log("Database Connected");
    })
    .catch((err) => {
      console.log("DB connection failed !", err);
    });
};

module.exports = databaseConnection;
