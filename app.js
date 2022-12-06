const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded());

let stats = {
  mind: 0,
  strength: 0,
  stamina: 0,
  speed: 0,
};

app.post("/add-exp", (req, res) => {
  const type = req.body.type;
  const value = req.body.value;
  console.log(req.body);
  if (type in stats) {
    stats[type] += parseInt(value);
    res.send(req.body);
  } else {
    res.status(400);
    res.send(`${type} is not a valid experience type`);
  }
});

app.get("/stats", (req, res) => {
  res.send(stats);
});

app.get("/", (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
