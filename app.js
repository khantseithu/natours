const express = require("express");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World!", app: "natours" });
});

app.post("/", (req, res) => {
  res.send("Got a POST request");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
