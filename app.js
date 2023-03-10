const express = require("express");
const fs = require("fs");
const morgan = require("morgan");

const app = express();

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

// Middleware
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(morgan("dev"));
app.use(express.json());

app.use(express.static(`${__dirname}/public`));

// app.use((req, res, next) => {
//   console.log("Helloo from the middleware!");
//   next();
// });

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
// app.get("/", (req, res) => {
//   res.status(200).json({ message: "Hello World!", app: "natours" });
// });

// app.post("/", (req, res) => {
//   res.send("Got a POST request");
// });

// routes

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

// server start
module.exports = app;
