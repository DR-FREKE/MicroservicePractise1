const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const all_events = [];

app.get("/events", (req, res) => {
  res.send(all_events);
});

app.post("/events", (req, res) => {
  const data = req.body;

  try {
    all_events.push(data);
    console.log(data);
    axios.post("http://localhost:4000/events", data); // for post service
    axios.post("http://localhost:4001/events", data); // for comment service
    axios.post("http://localhost:4002/events", data); // for query service
    axios.post("http://localhost:4003/events", data); // for moderation service
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }

  //   await axios.post("http://localhost:4003", data)
});

app.listen(4005, () => {
  console.log("app started at 4005");
});
