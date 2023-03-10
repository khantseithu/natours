const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(express.json());

// app.get("/", (req, res) => {
//   res.status(200).json({ message: "Hello World!", app: "natours" });
// });

// app.post("/", (req, res) => {
//   res.send("Got a POST request");
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, "utf-8")
);

app.get("/api/v1/tours/:id", (req, res) => {
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
});

app.post("/api/v1/tours", (req, res) => {
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
});

app.patch("/api/v1/tours:id");

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
