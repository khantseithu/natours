const express = require("express");
const fs = require("fs");
const morgan = require("morgan");

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(express.json());

app.use((req, res, next) => {
  console.log("Helloo from the middleware!");
  next();
});

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

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, "utf-8")
);

// Route Handlers
const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    createAt: req.requestTime,
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  //   if (id > tours.length) {
  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours: tour,
    },
  });
};

const createTour = (req, res) => {
  //   console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        // 201 is the status code for created
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  res.status(200).json({
    status: "success",
    tour: "<Updated tour here..>",
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
};

// route handler for routes
const getAllUsers = (req, res) => {
  res
    .status(500)
    .json({ status: "error", message: "This route is not defined yet" });
};

const getUser = (req, res) => {
  res
    .status(500)
    .json({ status: "error", message: "This route is not defined yet" });
};

const createUser = (req, res) => {
  res
    .status(500)
    .json({ status: "error", message: "This route is not defined yet" });
};

const updateUser = (req, res) => {
  res
    .status(500)
    .json({ status: "error", message: "This route is not defined yet" });
};

const deleteUser = (req, res) => {
  res
    .status(500)
    .json({ status: "error", message: "This route is not defined yet" });
};

// routes
app.route("/api/v1/tours").get(getAllTours).get(getTour).post(createTour);

app
  .route("/api/v1/tours/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

app.route("/api/v1/users").get(getAllUsers).get(getUser).post(createUser);

app
  .route("/api/v1/users/:id")
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

// server start

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
